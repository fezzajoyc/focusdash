"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import type { Locale } from "@/lib/site";
import { flowBreakMs, formatRemaining, remainingMs } from "../_lib/timer";
import { chime, GhostButton, Note, pick, PrimaryButton, warmAudio } from "./timer-ui";

/**
 * Flowtime 引擎:不预设番茄段,按下开始一路向上计时;
 * 到自然停点按下"停下休息",工具按 专注时长 ÷ 5 建议休息时长并开始倒数。
 * 计时全程 Date.now 锚定,切标签页不掉秒。
 */

const S = {
  start: { en: "Start focusing", zh: "开始专注", ja: "集中スタート", es: "Empezar a enfocar", pt: "Começar a focar" },
  stopRest: { en: "Stop & rest", zh: "停下休息", ja: "止めて休憩", es: "Parar y descansar", pt: "Parar e descansar" },
  discard: { en: "Discard session", zh: "丢弃本段", ja: "破棄", es: "Descartar sesión", pt: "Descartar sessão" },
  pause: { en: "Pause", zh: "暂停", ja: "一時停止", es: "Pausar", pt: "Pausar" },
  resume: { en: "Resume", zh: "继续", ja: "再開", es: "Continuar", pt: "Retomar" },
  focusing: { en: "In flow — the clock runs up", zh: "心流中——时间向上走", ja: "フロー中——時計は上がり続けます", es: "En flujo — el reloj sube", pt: "Em fluxo — o relógio sobe" },
  pausedNote: { en: "Paused", zh: "已暂停", ja: "一時停止中", es: "En pausa", pt: "Em pausa" },
  ready: {
    en: "Work with no preset intervals. Stop whenever you reach a natural break — the suggested rest is one minute for every five minutes of focus.",
    zh: "不预设番茄段,想专注多久就专注多久。到了自然停点再停——每专注 5 分钟,建议休息 1 分钟。",
    ja: "プリセットなしで、そのまま作業に集中。区切りのいいところで止めると、集中時間の 5 分につき 1 分の休憩を提案します。",
    es: "Trabaje sin intervalos prefijados. Pare cuando llegue a un punto natural de corte — se sugiere un minuto de descanso por cada cinco de enfoque.",
    pt: "Trabalhe sem intervalos predefinidos. Pare quando chegar a um ponto natural — sugere-se um minuto de descanso a cada cinco de foco.",
  },
  breakSug: { en: "Suggested break", zh: "建议休息", ja: "休憩の目安", es: "Descanso sugerido", pt: "Descanso sugerido" },
  breakFor: { en: "for a focus session of", zh: "对应专注", ja: "集中時間", es: "por una sesión de enfoque de", pt: "para uma sessão de foco de" },
  startBreak: { en: "Start break", zh: "开始休息", ja: "休憩スタート", es: "Empezar descanso", pt: "Começar pausa" },
  breakLeft: { en: "Break — time left", zh: "休息剩余", ja: "休憩——残り", es: "Descanso — queda", pt: "Pausa — falta" },
  breakOver: { en: "Break over. Ready for another round?", zh: "休息结束。来下一轮?", ja: "休憩終了。次のラウンドへ?", es: "Fin del descanso. ¿Otra ronda?", pt: "Pausa acabou. Outra rodada?" },
  today: { en: "Focused this visit", zh: "本次累计专注", ja: "このセッションの集中合計", es: "Enfocado en esta visita", pt: "Foco nesta visita" },
  rounds: { en: "rounds", zh: "轮", ja: "ラウンド", es: "rondas", pt: "rodadas" },
  elapsed: { en: "Elapsed focus", zh: "已专注", ja: "経過集中時間", es: "Enfoque transcurrido", pt: "Foco decorrido" },
};

type Status = "idle" | "running" | "paused" | "breaking" | "breakdone";

export function FlowtimeEngine() {
  const { locale } = useI18n();
  const [status, setStatus] = useState<Status>("idle");
  const [startedAt, setStartedAt] = useState(0);
  const [baseMs, setBaseMs] = useState(0); // 暂停时冻结的已专注时长
  const [breakEndsAt, setBreakEndsAt] = useState(0);
  const [suggestion, setSuggestion] = useState<{ focus: number; brk: number } | null>(null);
  const [accumMs, setAccumMs] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const chimeRef = useRef<(kind: "up" | "down" | "done") => void>(() => {});
  chimeRef.current = chime;

  const elapsed = status === "running" ? baseMs + (now - startedAt) : baseMs;
  const breakLeft = status === "breaking" ? remainingMs(breakEndsAt, now) : 0;

  useEffect(() => {
    if (status !== "running" && status !== "breaking") return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [status]);

  // 休息倒数归零 → 收尾铃声
  useEffect(() => {
    if (status !== "breaking" || breakLeft > 0) return;
    chimeRef.current("done");
    setStatus("breakdone");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, breakLeft]);

  function startFocus() {
    warmAudio();
    setStatus("running");
    setStartedAt(Date.now());
    setBaseMs(0);
    setSuggestion(null);
    setNow(Date.now());
  }

  function pauseFocus() {
    setBaseMs(elapsed);
    setStatus("paused");
  }

  function resumeFocus() {
    setStartedAt(Date.now());
    setStatus("running");
    setNow(Date.now());
  }

  /** 到达自然停点:结算本段,给出休息建议 */
  function stopAndRest(discard = false) {
    const focus = elapsed;
    if (discard || focus <= 0) {
      setStatus("idle");
      setBaseMs(0);
      setSuggestion(null);
      return;
    }
    chimeRef.current("up");
    setAccumMs((m) => m + focus);
    setRounds((r) => r + 1);
    setSuggestion({ focus, brk: flowBreakMs(focus) });
    setStatus("idle");
    setBaseMs(0);
  }

  function startBreak() {
    if (!suggestion) return;
    chimeRef.current("down");
    setBreakEndsAt(Date.now() + suggestion.brk);
    setStatus("breaking");
    setNow(Date.now());
  }

  const heading =
    status === "running" ? pick(locale, S.focusing)
    : status === "paused" ? pick(locale, S.pausedNote)
    : status === "breaking" ? `${pick(locale, S.breakLeft)}`
    : status === "breakdone" ? pick(locale, S.breakOver)
    : "";

  return (
    <ToolPanel>
      <div className="flex flex-col items-center gap-5">
        {status === "breaking" || status === "breakdone" ? (
          <>
            <span className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
              {status === "breaking" ? pick(locale, S.breakLeft) : pick(locale, S.breakOver)}
            </span>
            <output aria-live="polite" className="mono text-[52px] font-bold leading-none tabular-nums">
              {status === "breaking" ? formatRemaining(breakLeft) : "00:00"}
            </output>
            <PrimaryButton onClick={startFocus} aria={pick(locale, S.start)}>
              {pick(locale, S.start)}
            </PrimaryButton>
          </>
        ) : (
          <>
            <span className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
              {pick(locale, S.elapsed)}
            </span>
            <output aria-live="polite" className="mono text-[52px] font-bold leading-none tabular-nums">
              {formatRemaining(elapsed)}
            </output>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {status === "running" ? (
                <PrimaryButton onClick={pauseFocus} aria={pick(locale, S.pause)}>{pick(locale, S.pause)}</PrimaryButton>
              ) : status === "paused" ? (
                <PrimaryButton onClick={resumeFocus} aria={pick(locale, S.resume)}>{pick(locale, S.resume)}</PrimaryButton>
              ) : (
                <PrimaryButton onClick={startFocus} aria={pick(locale, S.start)}>{pick(locale, S.start)}</PrimaryButton>
              )}
              {status !== "idle" ? (
                <>
                  <GhostButton onClick={() => stopAndRest(false)} aria={pick(locale, S.stopRest)}>
                    {pick(locale, S.stopRest)}
                  </GhostButton>
                  <GhostButton onClick={() => stopAndRest(true)} aria={pick(locale, S.discard)}>
                    {pick(locale, S.discard)}
                  </GhostButton>
                </>
              ) : null}
            </div>
          </>
        )}

        <p className="min-h-5 text-center text-[13.5px] font-medium text-[var(--color-sub)]" aria-live="polite">
          {heading}
        </p>

        {suggestion && status !== "breaking" && status !== "breakdone" ? (
          <div className="w-full rounded-xl border hairline bg-[var(--color-surface)] px-4 py-3.5 text-center">
            <p className="text-[13px] font-medium text-[var(--color-sub)]">
              {pick(locale, S.breakSug)} · {pick(locale, S.breakFor)} {formatRemaining(suggestion.focus)}
            </p>
            <p className="mono mt-1 text-[24px] font-bold">{formatRemaining(suggestion.brk)}</p>
            <div className="mt-3">
              <PrimaryButton onClick={startBreak} aria={pick(locale, S.startBreak)}>
                {pick(locale, S.startBreak)}
              </PrimaryButton>
            </div>
          </div>
        ) : null}

        {rounds > 0 ? (
          <p className="text-[13px] text-[var(--color-sub)]">
            {pick(locale, S.today)}: <span className="mono font-semibold">{formatRemaining(accumMs)}</span> · {rounds} {pick(locale, S.rounds)}
          </p>
        ) : null}
      </div>

      <div className="mt-8 border-t hairline pt-5">
        <Note>{pick(locale, S.ready)}</Note>
      </div>
    </ToolPanel>
  );
}
