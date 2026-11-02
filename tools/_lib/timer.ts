/**
 * FocusDash 计时核心纯逻辑(全部 Node 可测,不碰 Date.now / setInterval —— 引擎负责)。
 *
 * 设计约定:
 * - 引擎一律用 Date.now() 锚定(endsAt = 锚点 + 时长),不累计 interval 滴答,
 *   所以此处只做"毫秒 ↔ 显示"与"调度表"的纯换算,切后台/切标签页不掉秒。
 * - 非法输入(非有限、负数、乱序)不抛异常,返回 "00:00" / NaN / [] 等文档化值。
 */

/** 毫秒 → "H:MM:SS"(≥1 小时)或 "MM:SS"(不足 1 小时)。秒向下取整:
 *  59 999ms → "59:59",负数 / NaN / Infinity → "00:00"。 */
export function formatRemaining(ms: number): string {
  if (!Number.isFinite(ms) || ms <= 0) return "00:00";
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const two = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${two(m)}:${two(s)}` : `${two(m)}:${two(s)}`;
}

/** 毫秒 → 秒表精度显示:"M:SS.cc"(不足 1 小时)或 "H:MM:SS.cc"(百分之一秒)。
 *  负数 / 非有限 → "—"。 */
export function formatElapsed(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return "—";
  const total = Math.floor(ms / 10); // 百分之一秒
  const cs = total % 100;
  const whole = Math.floor(total / 100);
  const s = whole % 60;
  const m = Math.floor(whole / 60) % 60;
  const h = Math.floor(whole / 3600);
  const two = (n: number) => String(n).padStart(2, "0");
  // 不足 1 小时:"M:SS.cc";达到 1 小时:"H:MM:SS.cc"(分钟补零)
  return h > 0 ? `${h}:${two(m)}:${two(s)}.${two(cs)}` : `${m}:${two(s)}.${two(cs)}`;
}

/** 时/分/秒 → 毫秒。三者都必须是非负整数,否则 NaN(与 countdown.ts 的 totalSeconds 同约定)。 */
export function parseDuration(hours: number, minutes: number, seconds: number): number {
  const parts = [hours, minutes, seconds];
  if (!parts.every((n) => Number.isInteger(n) && n >= 0)) return NaN;
  const ms = (hours * 3600 + minutes * 60 + seconds) * 1000;
  return Number.isFinite(ms) ? ms : NaN;
}

export type PomodoroPhase = "work" | "break" | "long";

export type PomodoroStep = {
  /** 第几步,从 1 开始(调度表顺序) */
  step: number;
  /** 阶段:专注 / 短休息 / 长休息 */
  phase: PomodoroPhase;
  /** 该步时长(分钟) */
  minutes: number;
  /** 该步时长(毫秒) */
  ms: number;
  /** 本步对应的专注段序号(1 起);休息步 = 刚结束的专注段序号 */
  session: number;
};

/**
 * Pomodoro 调度表:intervals 个专注段,每段后接短休息,
 * 最后一段后接长休息(25/5×4/15 → work, break, …, work, long)。
 * work/break/long 必须 ≥1 且有限(分钟),intervals 必须是 1–20 的整数;非法 → []。
 */
export function pomodoroPhases(
  work: number,
  brk: number,
  long: number,
  intervals: number,
): PomodoroStep[] {
  const ok =
    [work, brk, long].every((n) => Number.isFinite(n) && n >= 1) &&
    Number.isInteger(intervals) &&
    intervals >= 1 &&
    intervals <= 20;
  if (!ok) return [];
  const steps: PomodoroStep[] = [];
  for (let i = 1; i <= intervals; i++) {
    steps.push({ step: steps.length + 1, phase: "work", minutes: work, ms: work * 60_000, session: i });
    const isLast = i === intervals;
    steps.push({
      step: steps.length + 1,
      phase: isLast ? "long" : "break",
      minutes: isLast ? long : brk,
      ms: (isLast ? long : brk) * 60_000,
      session: i,
    });
  }
  return steps;
}

/** 调度表总时长(毫秒);空表 → 0。 */
export function scheduleTotalMs(steps: readonly PomodoroStep[]): number {
  return steps.reduce((sum, s) => sum + s.ms, 0);
}

export type LapRow = {
  /** 本段用时(毫秒)= 该次累计 − 上一次累计 */
  lap: number;
  /** 自开始的累计毫秒(按表时刻) */
  total: number;
};

/**
 * 由每次按表的累计毫秒序列求每段用时:第 n 段 = cumulative[n] − cumulative[n−1](第 1 段从 0 起)。
 * 输入必须非递减(允许重复值 = 0 段用时);空表 / 含负数或非有限值 / 乱序 → []
 * (不抛异常,也不重排——真实秒表不会乱序,乱序即坏数据)。
 */
export function lapRows(cumulative: number[]): LapRow[] {
  if (!Array.isArray(cumulative) || cumulative.length === 0) return [];
  if (!cumulative.every((t) => Number.isFinite(t) && t >= 0)) return [];
  for (let i = 1; i < cumulative.length; i++) {
    if (cumulative[i] < cumulative[i - 1]) return [];
  }
  const rows: LapRow[] = [];
  let prev = 0;
  cumulative.forEach((total) => {
    rows.push({ lap: total - prev, total });
    prev = total;
  });
  return rows;
}

/** LapRow[] → CSV 文本:"lap,split,total" 表头 + 每段一行(split/total 用秒表格式)。
 *  空表 → 空串(lapsToCsv(lapRows([])) === "")。 */
export function lapsToCsv(rows: readonly LapRow[]): string {
  if (rows.length === 0) return "";
  const lines = ["lap,split,total"];
  rows.forEach((r, i) => {
    lines.push(`${i + 1},${formatElapsed(r.lap)},${formatElapsed(r.total)}`);
  });
  return lines.join("\n");
}

/** Flowtime 休息建议:休息 = 专注时长 ÷ 5,取整到秒;非法 / 负数 → 0。 */
export function flowBreakMs(focusMs: number): number {
  if (!Number.isFinite(focusMs) || focusMs <= 0) return 0;
  return Math.round(focusMs / 5 / 1000) * 1000;
}

/** Date.now 锚定的剩余毫秒:Math.max(0, endsAt − now)。非有限 → 0。 */
export function remainingMs(endsAt: number, now: number): number {
  if (!Number.isFinite(endsAt) || !Number.isFinite(now)) return 0;
  return Math.max(0, endsAt - now);
}
