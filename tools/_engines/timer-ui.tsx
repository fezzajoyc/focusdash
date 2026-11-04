"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/lib/site";

/** FocusDash 计时引擎共用的轻量 UI 原语与取词助手(全部客户端组件)。 */

export const INTL_LOCALES: Record<Locale, string> = {
  en: "en-US",
  zh: "zh-CN",
  ja: "ja-JP",
  es: "es-ES",
  pt: "pt-BR",
  fr: "fr-FR",
  de: "de-DE",
  ru: "ru-RU",
  it: "it-IT",
  tr: "tr-TR",
  ko: "ko-KR",
  ar: "ar-SA",
  hi: "hi-IN",
  id: "id-ID",
  vi: "vi-VN",
};

/** 引擎内的每语言短文案:按 locale 取,缺省回退英文。 */
export function pick(locale: Locale, rec: Record<string, string>): string {
  return rec[locale] ?? rec.en;
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <span className="block text-[13px] font-medium text-[var(--color-sub)]">{label}</span>
      {children}
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="text-[13px] leading-5 text-[var(--color-sub)]">{children}</p>;
}

/** 分段胶囊切换。 */
export function Tabs({
  options,
  value,
  onChange,
}: {
  options: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="mb-4 flex flex-wrap gap-2" role="tablist">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="tab"
          aria-selected={value === o.id}
          onClick={() => onChange(o.id)}
          className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
            value === o.id
              ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
              : "hairline hover:bg-[var(--color-surface)]"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** 主按钮(实底)。 */
export function PrimaryButton({
  children,
  onClick,
  aria,
  disabled,
}: {
  children: ReactNode;
  onClick: () => void;
  aria: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={aria}
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

/** 次按钮(描边)。 */
export function GhostButton({
  children,
  onClick,
  aria,
  disabled,
}: {
  children: ReactNode;
  onClick: () => void;
  aria: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={aria}
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-full border hairline px-4 py-2.5 text-[14px] font-medium transition-colors hover:bg-[var(--color-surface)] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

/** 分钟/秒数字输入(引擎内小步进器)。 */
export function NumBox({
  value,
  onChange,
  min = 0,
  max = 999,
  aria,
  disabled,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  aria: string;
  disabled?: boolean;
}) {
  return (
    <input
      type="number"
      inputMode="numeric"
      min={min}
      max={max}
      disabled={disabled}
      value={value}
      onChange={(e) => {
        const n = Number(e.target.value);
        if (Number.isFinite(n)) onChange(Math.min(max, Math.max(min, Math.round(n))));
      }}
      aria-label={aria}
      className="field mono w-20 text-center"
    />
  );
}

/** SVG 进度环:0..1 的已完成比例;children 渲染在圆心。 */
export function RingProgress({
  fraction,
  size = 220,
  stroke = 12,
  color = "var(--color-ink)",
  trackColor = "var(--color-surface)",
  label,
  children,
}: {
  fraction: number;
  size?: number;
  stroke?: number;
  color?: string;
  trackColor?: string;
  label: string;
  children: ReactNode;
}) {
  const clamped = Math.min(1, Math.max(0, fraction));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative inline-flex items-center justify-center" role="img" aria-label={label}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - clamped)}
          style={{ transition: "stroke-dashoffset 0.25s linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  );
}

/** 共享 AudioContext:在用户手势(启动按钮)里预热,规避浏览器自动播放限制。 */
let sharedCtx: AudioContext | null = null;

export function warmAudio() {
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    if (!sharedCtx) sharedCtx = new Ctx();
    if (sharedCtx.state === "suspended") void sharedCtx.resume().catch(() => {});
  } catch {
    /* 无 WebAudio 时静默 */
  }
}

/** 双音/三连音提示音:up = 进入休息(上行),down = 回到专注(下行),done = 整组完成。 */
export function chime(kind: "up" | "down" | "done") {
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    if (!sharedCtx) sharedCtx = new Ctx();
    const ctx = sharedCtx;
    if (ctx.state === "suspended") void ctx.resume().catch(() => {});
    const seq: [number, number][] =
      kind === "up" ? [[523.25, 0], [783.99, 0.18]]
      : kind === "down" ? [[783.99, 0], [523.25, 0.18]]
      : [[523.25, 0], [659.25, 0.15], [783.99, 0.3]];
    for (const [freq, at] of seq) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const t0 = ctx.currentTime + at;
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.22, t0 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.42);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 0.45);
    }
  } catch {
    /* 音频不可用时静默 */
  }
}
