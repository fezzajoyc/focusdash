import { z } from "zod";
import { formatRemaining, pomodoroPhases, scheduleTotalMs } from "../tools/_lib/timer";

/**
 * FocusDash MCP 工具注册表:把 tools/_lib 的纯函数暴露为 AI 可执行工具。
 * 计时器本身是交互式 UI,不可远程调用;这里只暴露可执行的纯逻辑——
 * 给定设置的 Pomodoro 调度表,与毫秒→时钟显示的换算。
 * 站上引擎跑的是同一份经过测试的实现(tools/_lib/timer.ts)。
 */

const json = (v: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(v, null, 2) }] });
const text = (t: string) => ({ content: [{ type: "text" as const, text: t }] });
const bad = (t: string) => ({ content: [{ type: "text" as const, text: t }], isError: true as const });

export type McpToolDef = {
  name: string;
  title: string;
  description: string;
  schema: Record<string, any>;
  run: (args: any) => { content: { type: "text"; text: string }[]; isError?: boolean };
};

export const MCP_TOOLS: McpToolDef[] = [
  {
    name: "pomodoro_schedule",
    title: "Pomodoro phase schedule",
    description:
      "Build the full Pomodoro phase schedule for given settings: n focus blocks, each followed by a short break, the last one followed by a long break. Returns every step with its phase (work/break/long), duration in minutes and milliseconds, plus focus-time and total-time sums. Classic default: 25/5 with a 15-minute long break after 4 intervals. Durations are minutes (1-180; long break up to 240), intervals is a whole count 1-20.",
    schema: {
      work_minutes: z.number().min(1).max(180).default(25).describe("focus block length in minutes"),
      break_minutes: z.number().min(1).max(60).default(5).describe("short break length in minutes"),
      long_break_minutes: z.number().min(1).max(240).default(15).describe("long break length after the final focus block"),
      intervals: z.number().int().min(1).max(20).default(4).describe("number of focus blocks before the set completes"),
    },
    run: (a) => {
      const steps = pomodoroPhases(a.work_minutes, a.break_minutes, a.long_break_minutes, a.intervals);
      // pomodoroPhases 对非法输入返回 [](文档化行为);schema 已挡住绝大多数,这里兜底
      if (steps.length === 0) {
        return bad(
          "invalid settings — work/break/long-break must be at least 1 minute (long break up to 240) and intervals a whole number from 1 to 20",
        );
      }
      const focusMs = steps.filter((s) => s.phase === "work").reduce((sum, s) => sum + s.ms, 0);
      return json({
        settings: {
          work_minutes: a.work_minutes,
          break_minutes: a.break_minutes,
          long_break_minutes: a.long_break_minutes,
          intervals: a.intervals,
        },
        schedule: steps.map((s) => ({ step: s.step, phase: s.phase, minutes: s.minutes, ms: s.ms })),
        focus_minutes: focusMs / 60_000,
        total_minutes: scheduleTotalMs(steps) / 60_000,
      });
    },
  },
  {
    name: "format_duration",
    title: "Format milliseconds as a clock time",
    description:
      "Convert a duration in milliseconds to a clock string: 'H:MM:SS' at or above one hour, 'MM:SS' below it. Seconds are floored, so 59 999 ms is 00:59; negative or non-finite input yields 00:00. Useful for rendering timer values returned by other tools.",
    schema: {
      milliseconds: z.number().describe("duration in milliseconds; negative values are treated as 0"),
    },
    run: (a) => {
      if (!Number.isFinite(a.milliseconds)) {
        return bad("milliseconds must be a finite number");
      }
      return text(formatRemaining(a.milliseconds));
    },
  },
];
