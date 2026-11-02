"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import type { Locale } from "@/lib/site";
import { formatRemaining, pomodoroPhases, remainingMs, type PomodoroStep } from "../_lib/timer";
import { chime, Field, GhostButton, NumBox, Note, pick, PrimaryButton, RingProgress, warmAudio } from "./timer-ui";

/**
 * Pomodoro 引擎(精选):25/5 ×4 + 15 分钟长休息,四项均可调。
 * 计时用 Date.now 锚定(endsAt),不累计 interval 滴答——切标签页/休眠回来不掉秒。
 * 阶段切换时响铃(WebAudio),阶段自动推进;整组跑完进入 done。
 */

const S = {
  work: { en: "Focus", zh: "专注", ja: "集中", es: "Enfoque", pt: "Foco" },
  brk: { en: "Short break", zh: "短休息", ja: "休憩", es: "Pausa corta", pt: "Pausa curta" },
  longBrk: { en: "Long break", zh: "长休息", ja: "長い休憩", es: "Pausa larga", pt: "Pausa longa" },
  start: { en: "Start", zh: "开始", ja: "スタート", es: "Empezar", pt: "Começar" },
  pause: { en: "Pause", zh: "暂停", ja: "一時停止", es: "Pausar", pt: "Pausar" },
  resume: { en: "Resume", zh: "继续", ja: "再開", es: "Continuar", pt: "Retomar" },
  skip: { en: "Skip phase", zh: "跳过本段", ja: "スキップ", es: "Saltar fase", pt: "Saltar fase" },
  reset: { en: "Reset", zh: "重置", ja: "リセット", es: "Reiniciar", pt: "Zerar" },
  done: { en: "Set complete — nice work", zh: "整组完成,干得漂亮", ja: "1セット完了、お疲れさま", es: "Serie completa — bien hecho", pt: "Série completa — bom trabalho" },
  ready: { en: "Ready when you are", zh: "准备好了就开始", ja: "準備ができたら開始", es: "Empezar cuando quieras", pt: "Comece quando quiser" },
  pausedNote: { en: "Paused — the clock holds", zh: "已暂停,时间冻结", ja: "一時停止中", es: "En pausa", pt: "Em pausa" },
  settings: { en: "Durations (minutes) & intervals", zh: "时长(分钟)与轮数", ja: "時間(分)とセット数", es: "Duraciones (min) e intervalos", pt: "Durações (min) e intervalos" },
  workMin: { en: "Focus", zh: "专注", ja: "集中", es: "Enfoque", pt: "Foco" },
  breakMin: { en: "Break", zh: "短休息", ja: "休憩", es: "Pausa", pt: "Pausa" },
  longMin: { en: "Long break", zh: "长休息", ja: "長休憩", es: "Pausa larga", pt: "Pausa longa" },
  intervals: { en: "Intervals", zh: "轮数", ja: "セット数", es: "Intervalos", pt: "Intervalos" },
  sessions: { en: "Focus sessions completed", zh: "已完成的专注段", ja: "完了した集中セッション", es: "Sesiones de enfoque completadas", pt: "Sessões de foco concluídas" },
  ringOf: { en: "phase progress", zh: "阶段进度", ja: "フェーズ進捗", es: "progreso de fase", pt: "progresso da fase" },
  autoNote: {
    en: "Phases advance automatically with a chime; skipping one moves straight to the next. Timers stay exact across tab switches because they are anchored to the clock, not to a ticking counter.",
    zh: "阶段自动推进并响铃;跳过即进入下一段。计时锚定系统时钟而不是滴答计数,切标签页、休眠回来依然分秒不差。",
    ja: "フェーズは自動で進み、切替時に通知音が鳴ります。タイマーはシステム時計に固定されているため、タブを切り替えても正確です。",
    es: "Las fases avanzan solas con un aviso sonoro; saltar pasa a la siguiente. El tiempo se ancla al reloj del sistema, no a un contador: cambiar de pestaña no lo desvía.",
    pt: "As fases avançam sozinhas com um toque; pular passa à seguinte. O tempo fica ancorado no relógio do sistema, não num contador: trocar de aba não atrasa nada.",
  },
};

type Status = "idle" | "running" | "paused" | "done";

const DEFAULTS = { work: 25, brk: 5, long: 15, intervals: 4 };

export function PomodoroEngine() {
  const { locale } = useI18n();
  const [work, setWork] = useState(DEFAULTS.work);
  const [brk, setBrk] = useState(DEFAULTS.brk);
  const [long, setLong] = useState(DEFAULTS.long);
  const [intervals, setIntervals] = useState(DEFAULTS.intervals);
  const [status, setStatus] = useState<Status>("idle");
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [endsAt, setEndsAt] = useState(0);
  const [leftMs, setLeftMs] = useState(() => phaseLen(DEFAULTS.work));
  const [now, setNow] = useState(() => Date.now());
  const chimeRef = useRef<(kind: "up" | "down" | "done") => void>(() => {});
  chimeRef.current = chime;

  const phases: PomodoroStep[] = useMemo(() => pomodoroPhases(work, brk, long, intervals), [work, brk, long, intervals]);
  const current = phases[Math.min(phaseIndex, Math.max(0, phases.length - 1))];
  const total = current ? current.ms : 0;
  const remaining = status === "running" ? remainingMs(endsAt, now) : leftMs;

  // 运行中以 250ms 心跳驱动渲染;剩余时间永远由 endsAt 推算,心跳只负责刷新
  useEffect(() => {
    if (status !== "running") return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [status]);

  // 剩余归零 → 响铃并推进阶段(自动续跑)
  useEffect(() => {
    if (status !== "running" || remaining > 0) return;
    const nextIndex = phaseIndex + 1;
    if (current?.phase === "work") chimeRef.current("up");
    else if (nextIndex < phases.length) chimeRef.current("down");
    if (nextIndex >= phases.length) {
      chimeRef.current("done");
      setStatus("done");
      setLeftMs(0);
      return;
    }
    const next = phases[nextIndex];
    setPhaseIndex(nextIndex);
    setLeftMs(next.ms);
    setEndsAt(Date.now() + next.ms);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, remaining]);

  function start() {
    warmAudio();
    const ms = status === "idle" || status === "done" ? (phases[0]?.ms ?? 0) : leftMs;
    const idx = status === "idle" || status === "done" ? 0 : phaseIndex;
    if (status === "idle" || status === "done") chimeRef.current("down"); // 上一段已响 up;开始时轻提示
    setStatus("running");
    setPhaseIndex(idx);
    setLeftMs(ms);
    setEndsAt(Date.now() + ms);
    setNow(Date.now());
  }

  function pause() {
    setLeftMs(remainingMs(endsAt, Date.now()));
    setStatus("paused");
  }

  function skip() {
    const nextIndex = phaseIndex + 1;
    if (nextIndex >= phases.length) {
      setStatus("done");
      setLeftMs(0);
      return;
    }
    const next = phases[nextIndex];
    setPhaseIndex(nextIndex);
    if (status === "running") {
      setEndsAt(Date.now() + next.ms);
      setLeftMs(next.ms);
      setNow(Date.now());
    } else {
      setLeftMs(next.ms);
    }
  }

  function reset() {
    setStatus("idle");
    setPhaseIndex(0);
    setLeftMs(phases[0]?.ms ?? phaseLen(work));
    setEndsAt(0);
  }

  // 设置仅在整组未开跑时可调(跑动中改时长会让锚点失义)
  const editable = status === "idle" || status === "done";
  const sessionsDone = current ? current.session - (current.phase === "work" && status !== "done" ? 1 : 0) : 0;
  const fraction = total > 0 ? 1 - remaining / total : 0;
  const phaseLabel = !current
    ? pick(locale, S.work)
    : current.phase === "work"
      ? pick(locale, S.work)
      : current.phase === "break"
        ? pick(locale, S.brk)
        : pick(locale, S.longBrk);

  const statusText =
    status === "done" ? pick(locale, S.done)
    : status === "paused" ? pick(locale, S.pausedNote)
    : status === "idle" ? pick(locale, S.ready)
    : "";

  return (
    <ToolPanel>
      <div className="flex flex-col items-center gap-5">
        <RingProgress
          fraction={fraction}
          color={current?.phase === "work" ? "var(--color-ink)" : "var(--color-accent-strong, #0071e3)"}
          label={`${phaseLabel} · ${pick(locale, S.ringOf)}`}
        >
          <span className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{phaseLabel}</span>
          <output aria-live="polite" className="mono mt-1 text-[44px] font-bold leading-none tabular-nums">
            {formatRemaining(remaining)}
          </output>
          <span className="mt-2 text-[12.5px] text-[var(--color-sub)]">
            {Math.min(Math.max(sessionsDone, 0), intervals)}/{intervals}
          </span>
        </RingProgress>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {status === "running" ? (
            <PrimaryButton onClick={pause} aria={pick(locale, S.pause)}>{pick(locale, S.pause)}</PrimaryButton>
          ) : (
            <PrimaryButton onClick={start} aria={status === "paused" ? pick(locale, S.resume) : pick(locale, S.start)}>
              {status === "paused" ? pick(locale, S.resume) : pick(locale, S.start)}
            </PrimaryButton>
          )}
          <GhostButton onClick={skip} aria={pick(locale, S.skip)} disabled={status === "done"}>
            {pick(locale, S.skip)}
          </GhostButton>
          <GhostButton onClick={reset} aria={pick(locale, S.reset)}>{pick(locale, S.reset)}</GhostButton>
        </div>

        <p className="text-[13.5px] font-medium text-[var(--color-sub)]" aria-live="polite">{statusText}</p>

        {/* 专注段圆点:完成实心、进行中半透、未开始描边 */}
        <div className="flex items-center gap-1.5" aria-label={pick(locale, S.sessions)}>
          {Array.from({ length: intervals }, (_, i) => (
            <span
              key={i}
              className={`h-2.5 w-2.5 rounded-full ${
                i < sessionsDone
                  ? "bg-[var(--color-ink)]"
                  : i === sessionsDone && status !== "done"
                    ? "bg-[var(--color-ink)] opacity-40"
                    : "border hairline"
              }`}
            />
          ))}
          <span className="ml-2 text-[12.5px] text-[var(--color-sub)]">
            {pick(locale, S.sessions)}: {Math.min(Math.max(sessionsDone, 0), intervals)}/{intervals}
          </span>
        </div>
      </div>

      <div className="mt-8 grid gap-4 border-t hairline pt-6 sm:grid-cols-4">
        <Field label={`${pick(locale, S.settings)} — ${pick(locale, S.workMin)}`}>
          <NumBox value={work} onChange={setWork} min={1} max={180} aria={pick(locale, S.workMin)} disabled={!editable} />
        </Field>
        <Field label={pick(locale, S.breakMin)}>
          <NumBox value={brk} onChange={setBrk} min={1} max={60} aria={pick(locale, S.breakMin)} disabled={!editable} />
        </Field>
        <Field label={pick(locale, S.longMin)}>
          <NumBox value={long} onChange={setLong} min={1} max={90} aria={pick(locale, S.longMin)} disabled={!editable} />
        </Field>
        <Field label={pick(locale, S.intervals)}>
          <NumBox value={intervals} onChange={setIntervals} min={1} max={20} aria={pick(locale, S.intervals)} disabled={!editable} />
        </Field>
      </div>
      {phases.length === 0 ? (
        <div className="mt-3">
          <Note>{pick(locale, S.ready)}</Note>
        </div>
      ) : null}

      <div className="mt-4">
        <Note>{pick(locale, S.autoNote)}</Note>
      </div>
    </ToolPanel>
  );
}

function phaseLen(minutes: number): number {
  return minutes * 60_000;
}
