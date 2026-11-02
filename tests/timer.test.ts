import { describe, expect, it } from "vitest";
import {
  flowBreakMs,
  formatElapsed,
  formatRemaining,
  lapRows,
  lapsToCsv,
  parseDuration,
  pomodoroPhases,
  remainingMs,
  scheduleTotalMs,
} from "@/tools/_lib/timer";

/**
 * 手算基准(与引擎 UI 无关,全部纯函数):
 * - 标准 Pomodoro 25/5 ×4 / 15:8 步,总 130 分钟(4×25 + 3×5 + 15)。
 * - 59 999ms 距 1 分钟差 1ms → 向下取整显示 "59:59"。
 */
describe("formatRemaining", () => {
  it("floors to seconds and renders MM:SS below one hour", () => {
    expect(formatRemaining(0)).toBe("00:00");
    expect(formatRemaining(1000)).toBe("00:01");
    expect(formatRemaining(59_999)).toBe("00:59"); // 59.999s 向下取整
    expect(formatRemaining(3_599_999)).toBe("59:59"); // 差 1ms 满 1 小时
    expect(formatRemaining(60_000)).toBe("01:00");
    expect(formatRemaining(61_500)).toBe("01:01");
  });

  it("switches to H:MM:SS at and above one hour", () => {
    expect(formatRemaining(3_600_000)).toBe("1:00:00");
    expect(formatRemaining(3_661_000)).toBe("1:01:01");
    expect(formatRemaining(86_400_000)).toBe("24:00:00");
  });

  it("clamps negative and non-finite input to 00:00", () => {
    expect(formatRemaining(-1)).toBe("00:00");
    expect(formatRemaining(-3_600_000)).toBe("00:00");
    expect(formatRemaining(Number.NaN)).toBe("00:00");
    expect(formatRemaining(Number.POSITIVE_INFINITY)).toBe("00:00");
  });
});

describe("formatElapsed", () => {
  it("renders centiseconds for the stopwatch", () => {
    expect(formatElapsed(0)).toBe("0:00.00");
    expect(formatElapsed(1_234)).toBe("0:01.23");
    expect(formatElapsed(61_000)).toBe("1:01.00");
    expect(formatElapsed(3_600_000)).toBe("1:00:00.00");
  });

  it("returns — for negative or non-finite input", () => {
    expect(formatElapsed(-1)).toBe("—");
    expect(formatElapsed(Number.NaN)).toBe("—");
    expect(formatElapsed(Number.POSITIVE_INFINITY)).toBe("—");
  });
});

describe("parseDuration", () => {
  it("converts h/m/s to whole milliseconds", () => {
    expect(parseDuration(0, 25, 0)).toBe(1_500_000);
    expect(parseDuration(1, 0, 0)).toBe(3_600_000);
    expect(parseDuration(0, 0, 30)).toBe(30_000);
    expect(parseDuration(0, 0, 0)).toBe(0);
    expect(parseDuration(2, 30, 45)).toBe(9_045_000);
  });

  it("returns NaN for negative, fractional or non-finite parts", () => {
    expect(parseDuration(-1, 0, 0)).toBe(Number.NaN);
    expect(parseDuration(0, 1.5, 0)).toBe(Number.NaN);
    expect(parseDuration(0, 0, Number.NaN)).toBe(Number.NaN);
    expect(parseDuration(Number.POSITIVE_INFINITY, 0, 0)).toBe(Number.NaN);
  });

  it("round-trips with formatRemaining", () => {
    for (const [h, m, s] of [[0, 5, 0], [0, 25, 0], [1, 0, 0], [2, 15, 30]] as const) {
      expect(formatRemaining(parseDuration(h, m, s))).toBe(
        h > 0 ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}` : `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
      );
    }
  });
});

describe("pomodoroPhases", () => {
  it("builds the standard 25/5 ×4 with a 15-minute long break", () => {
    const steps = pomodoroPhases(25, 5, 15, 4);
    expect(steps.map((s) => s.phase)).toEqual(["work", "break", "work", "break", "work", "break", "work", "long"]);
    expect(steps.map((s) => s.minutes)).toEqual([25, 5, 25, 5, 25, 5, 25, 15]);
    expect(steps.map((s) => s.step)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    // 专注段序号在 work 步上递增,休息步记刚结束的段
    expect(steps.filter((s) => s.phase === "work").map((s) => s.session)).toEqual([1, 2, 3, 4]);
    expect(steps[7].session).toBe(4);
    expect(scheduleTotalMs(steps)).toBe((4 * 25 + 3 * 5 + 15) * 60_000);
  });

  it("builds custom schedules (50/10 ×2 / 30)", () => {
    const steps = pomodoroPhases(50, 10, 30, 2);
    expect(steps.map((s) => `${s.phase}:${s.minutes}`)).toEqual(["work:50", "break:10", "work:50", "long:30"]);
    expect(scheduleTotalMs(steps)).toBe(140 * 60_000);
  });

  it("uses the long break after a single interval", () => {
    expect(pomodoroPhases(25, 5, 15, 1).map((s) => s.phase)).toEqual(["work", "long"]);
  });

  it("returns [] for invalid settings", () => {
    expect(pomodoroPhases(0, 5, 15, 4)).toEqual([]); // work < 1
    expect(pomodoroPhases(25, 0, 15, 4)).toEqual([]); // break < 1
    expect(pomodoroPhases(25, 5, 0, 4)).toEqual([]); // long < 1
    expect(pomodoroPhases(25, 5, 15, 0)).toEqual([]); // 0 个专注段
    expect(pomodoroPhases(25, 5, 15, -1)).toEqual([]);
    expect(pomodoroPhases(25, 5, 15, 2.5)).toEqual([]); // 非整数段数
    expect(pomodoroPhases(25, 5, 15, 21)).toEqual([]); // 超出上限
    expect(pomodoroPhases(Number.NaN, 5, 15, 4)).toEqual([]);
    expect(pomodoroPhases(25, 5, Number.POSITIVE_INFINITY, 4)).toEqual([]);
  });
});

describe("lapRows", () => {
  it("splits cumulative times into per-lap rows", () => {
    const rows = lapRows([25_000, 60_000, 90_500]);
    expect(rows).toEqual([
      { lap: 25_000, total: 25_000 },
      { lap: 35_000, total: 60_000 },
      { lap: 30_500, total: 90_500 },
    ]);
  });

  it("treats the first lap as starting from zero and allows duplicates (0 split)", () => {
    expect(lapRows([1_000])).toEqual([{ lap: 1_000, total: 1_000 }]);
    expect(lapRows([1_000, 1_000])).toEqual([
      { lap: 1_000, total: 1_000 },
      { lap: 0, total: 1_000 },
    ]);
  });

  it("returns [] for empty, invalid or out-of-order input", () => {
    expect(lapRows([])).toEqual([]);
    expect(lapRows([-1])).toEqual([]);
    expect(lapRows([1_000, Number.NaN])).toEqual([]);
    expect(lapRows([2_000, 1_000])).toEqual([]); // 乱序 = 坏数据,不重排
    expect(lapRows(Number.NaN as unknown as number[])).toEqual([]);
  });
});

describe("lapsToCsv", () => {
  it("renders a header plus one row per lap with stopwatch-formatted cells", () => {
    const csv = lapsToCsv(lapRows([25_000, 60_000]));
    expect(csv).toBe("lap,split,total\n1,0:25.00,0:25.00\n2,0:35.00,1:00.00");
  });

  it("returns an empty string for an empty lap table", () => {
    expect(lapsToCsv([])).toBe("");
    expect(lapsToCsv(lapRows([]))).toBe("");
  });
});

describe("flowBreakMs", () => {
  it("suggests a break of focus ÷ 5, rounded to whole seconds", () => {
    expect(flowBreakMs(25 * 60_000)).toBe(5 * 60_000);
    expect(flowBreakMs(50 * 60_000)).toBe(10 * 60_000);
    expect(flowBreakMs(7_349)).toBe(1_000); // 1.4698s → 1s
    expect(flowBreakMs(2_500)).toBe(1_000); // 0.5s → 1s(四舍五入)
  });

  it("returns 0 for zero, negative or non-finite focus time", () => {
    expect(flowBreakMs(0)).toBe(0);
    expect(flowBreakMs(-5_000)).toBe(0);
    expect(flowBreakMs(Number.NaN)).toBe(0);
    expect(flowBreakMs(Number.POSITIVE_INFINITY)).toBe(0);
  });
});

describe("remainingMs", () => {
  it("anchors on Date.now-style timestamps without interval drift", () => {
    const now = 1_000_000;
    expect(remainingMs(now + 90_000, now)).toBe(90_000);
    expect(remainingMs(now + 90_000, now + 30_000)).toBe(60_000);
  });

  it("clamps to 0 once the deadline has passed", () => {
    expect(remainingMs(1_000, 2_000)).toBe(0);
    expect(remainingMs(Number.NaN, 1_000)).toBe(0);
  });
});
