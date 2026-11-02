"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import type { Locale } from "@/lib/site";
import { formatRemaining, parseDuration, remainingMs } from "../_lib/timer";
import { chime, Field, GhostButton, Note, NumBox, pick, warmAudio } from "./timer-ui";

/**
 * 多路倒计时引擎:任意多个命名倒计时同时独立运行(茶 3:00、代码评审 15:00…)。
 * 每个倒计时各自用 Date.now 锚定 endsAt,暂停冻结剩余、继续重新锚定;
 * 归零进入提醒态(闪烁 + 一次响铃),按剩余时间升序排列。
 */

const S = {
  name: { en: "Name", zh: "名称", ja: "名前", es: "Nombre", pt: "Nome" },
  hours: { en: "Hours", zh: "时", ja: "時", es: "Horas", pt: "Horas" },
  minutes: { en: "Minutes", zh: "分", ja: "分", es: "Minutos", pt: "Minutos" },
  seconds: { en: "Seconds", zh: "秒", ja: "秒", es: "Segundos", pt: "Segundos" },
  add: { en: "Add countdown", zh: "添加倒计时", ja: "カウントダウンを追加", es: "Añadir cuenta atrás", pt: "Adicionar contagem" },
  start: { en: "Start", zh: "开始", ja: "スタート", es: "Iniciar", pt: "Iniciar" },
  pause: { en: "Pause", zh: "暂停", ja: "一時停止", es: "Pausar", pt: "Pausar" },
  resume: { en: "Resume", zh: "继续", ja: "再開", es: "Continuar", pt: "Retomar" },
  reset: { en: "Reset", zh: "复位", ja: "リセット", es: "Reiniciar", pt: "Zerar" },
  delete: { en: "Delete", zh: "删除", ja: "削除", es: "Eliminar", pt: "Excluir" },
  timeUp: { en: "Time is up", zh: "时间到", ja: "時間です", es: "Tiempo cumplido", pt: "Tempo esgotado" },
  invalid: { en: "Set at least 1 second, with a name.", zh: "请填写名称,并设置至少 1 秒。", ja: "名前を入れ、1 秒以上を設定してください。", es: "Escriba un nombre y fije al menos 1 segundo.", pt: "Dê um nome e defina pelo menos 1 segundo." },
  empty: {
    en: "No countdowns yet. Add one above — each runs on its own clock, and they are sorted by the time remaining.",
    zh: "还没有倒计时。在上方添加——每个倒计时各走各的表,按剩余时间排序。",
    ja: "まだカウントダウンはありません。上から追加を。それぞれ独立した時計で動き、残り時間の短い順に並びます。",
    es: "Aún no hay cuentas atrás. Añada una arriba — cada una corre con su propio reloj y se ordenan por tiempo restante.",
    pt: "Nenhuma contagem ainda. Adicione uma acima — cada uma corre no próprio relógio e ficam ordenadas pelo tempo restante.",
  },
  note: {
    en: "Every countdown is anchored to the system clock, so background tabs and device sleep never skew them. When one reaches zero it chimes once and flashes until you dismiss or delete it.",
    zh: "每个倒计时都锚定系统时钟,后台标签、设备休眠都不会让它失真。归零时响一声铃并闪烁,直到你复位或删除。",
    ja: "各カウントダウンはシステム時計に固定されるため、バックグラウンドやスリープでも狂いません。ゼロになると一度鳴って、リセットか削除まで点滅します。",
    es: "Cada cuenta atrás se ancla al reloj del sistema: pestañas en segundo plano o suspender el equipo no las desvían. Al llegar a cero suena una vez y parpadea hasta que la reinicie o la elimine.",
    pt: "Cada contagem fica ancorada no relógio do sistema — abas em segundo plano ou suspensão não as atrasam. Ao chegar a zero toca uma vez e pisca até você zerar ou excluir.",
  },
  minutesAria: { en: "duration in minutes", zh: "时长(分)", ja: "時間(分)", es: "duración en minutos", pt: "duração em minutos" },
};

type Item = {
  id: number;
  name: string;
  durMs: number;
  /** 运行锚点:running 时为结束时刻;暂停时 0 */
  endsAt: number;
  /** 暂停/未开始时冻结的剩余毫秒 */
  leftMs: number;
  running: boolean;
  alerted: boolean;
};

let nextId = 1;

export function CountdownMultiEngine() {
  const { locale } = useI18n();
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [h, setH] = useState(0);
  const [m, setM] = useState(3);
  const [s, setS] = useState(0);
  const [error, setError] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const chimeRef = useRef<(kind: "up" | "down" | "done") => void>(() => {});
  chimeRef.current = chime;

  const anyRunning = items.some((it) => it.running);
  useEffect(() => {
    if (!anyRunning) return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [anyRunning]);

  // 归零检测:每个倒计时只响一次铃,进入提醒态(闪烁)直到复位/删除
  useEffect(() => {
    const hitZero = items.filter((it) => it.running && remainingMs(it.endsAt, now) === 0);
    if (hitZero.length === 0) return;
    chimeRef.current("done");
    setItems((xs) => xs.map((it) => (hitZero.some((z) => z.id === it.id) ? { ...it, running: false, leftMs: 0, alerted: true } : it)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now]);

  function addItem() {
    const ms = parseDuration(h, m, s);
    const trimmed = name.trim();
    if (!Number.isFinite(ms) || ms < 1000 || trimmed.length === 0) {
      setError(true);
      return;
    }
    setError(false);
    setItems((xs) => [...xs, { id: nextId++, name: trimmed, durMs: ms, endsAt: 0, leftMs: ms, running: false, alerted: false }]);
    setName("");
  }

  function toggle(it: Item) {
    warmAudio();
    setItems((xs) =>
      xs.map((x) => {
        if (x.id !== it.id || x.alerted) return x;
        if (x.running) return { ...x, running: false, leftMs: remainingMs(x.endsAt, Date.now()), endsAt: 0 };
        return { ...x, running: true, endsAt: Date.now() + (x.leftMs || x.durMs), leftMs: 0 };
      }),
    );
    setNow(Date.now());
  }

  function resetOne(it: Item) {
    setItems((xs) => xs.map((x) => (x.id === it.id ? { ...x, running: false, leftMs: x.durMs, endsAt: 0, alerted: false } : x)));
  }

  function remove(it: Item) {
    setItems((xs) => xs.filter((x) => x.id !== it.id));
  }

  function remainingOf(it: Item): number {
    return it.running ? remainingMs(it.endsAt, now) : it.leftMs;
  }

  // 按剩余时间升序;同剩余(如都为 0)按加入顺序
  const sorted = [...items]
    .map((it, i) => ({ it, i, left: remainingOf(it) }))
    .sort((a, b) => a.left - b.left || a.i - b.i);

  return (
    <ToolPanel>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
        <Field label={pick(locale, S.name)}>
          <input
            type="text"
            className="field"
            value={name}
            maxLength={60}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addItem();
            }}
            aria-label={pick(locale, S.name)}
            placeholder="Tea · 3:00"
          />
        </Field>
        <div className="grid grid-cols-3 gap-2">
          <Field label={pick(locale, S.hours)}>
            <NumBox value={h} onChange={setH} min={0} max={99} aria={pick(locale, S.hours)} />
          </Field>
          <Field label={pick(locale, S.minutes)}>
            <NumBox value={m} onChange={setM} min={0} max={59} aria={pick(locale, S.minutes)} />
          </Field>
          <Field label={pick(locale, S.seconds)}>
            <NumBox value={s} onChange={setS} min={0} max={59} aria={pick(locale, S.seconds)} />
          </Field>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={addItem}
          aria-label={pick(locale, S.add)}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          + {pick(locale, S.add)}
        </button>
        {error ? <Note>{pick(locale, S.invalid)}</Note> : null}
      </div>

      <div className="mt-7 space-y-2.5">
        {sorted.length === 0 ? (
          <Note>{pick(locale, S.empty)}</Note>
        ) : (
          sorted.map(({ it, left }) => {
            const done = it.alerted;
            return (
              <div
                key={it.id}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                  done ? "border-[#c0392b] bg-[#c0392b]/5" : "hairline"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className={`truncate text-[14px] font-semibold ${done ? "text-[#c0392b]" : ""}`}>
                    {it.name}
                    {done ? <span className="animate-pulse"> · {pick(locale, S.timeUp)}</span> : null}
                  </p>
                </div>
                <output
                  aria-live={done ? "assertive" : "off"}
                  className={`mono text-[22px] font-bold tabular-nums ${done ? "animate-pulse text-[#c0392b]" : ""}`}
                >
                  {formatRemaining(left)}
                </output>
                <div className="flex flex-none items-center gap-1.5">
                  {done ? (
                    <GhostButton onClick={() => resetOne(it)} aria={`${pick(locale, S.reset)} — ${it.name}`}>
                      {pick(locale, S.reset)}
                    </GhostButton>
                  ) : it.running ? (
                    <GhostButton onClick={() => toggle(it)} aria={`${pick(locale, S.pause)} — ${it.name}`}>
                      {pick(locale, S.pause)}
                    </GhostButton>
                  ) : (
                    <GhostButton
                      onClick={() => toggle(it)}
                      aria={`${it.leftMs === it.durMs ? pick(locale, S.start) : pick(locale, S.resume)} — ${it.name}`}
                    >
                      {it.leftMs === it.durMs ? pick(locale, S.start) : pick(locale, S.resume)}
                    </GhostButton>
                  )}
                  {!done && !it.running && it.leftMs < it.durMs ? (
                    <GhostButton onClick={() => resetOne(it)} aria={`${pick(locale, S.reset)} — ${it.name}`}>
                      {pick(locale, S.reset)}
                    </GhostButton>
                  ) : null}
                  <GhostButton onClick={() => remove(it)} aria={`${pick(locale, S.delete)} — ${it.name}`}>
                    {pick(locale, S.delete)}
                  </GhostButton>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-6">
        <Note>{pick(locale, S.note)}</Note>
      </div>
    </ToolPanel>
  );
}
