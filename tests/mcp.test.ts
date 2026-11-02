import { describe, expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "@/mcp/server";

async function connect() {
  const server = createServer();
  const client = new Client({ name: "test", version: "0.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  return client;
}

/**
 * 手算基准(与 tests/timer.test.ts 同源):
 * 25/5 ×4 /15 → 8 步(work, break ×3 …, work, long),
 * 专注合计 100 分钟,总时长 130 分钟;3 599 999ms = 59:59。
 */
describe("focusdash MCP server", () => {
  it("exposes exactly the two FocusDash tools", async () => {
    const client = await connect();
    const { tools } = await client.listTools();
    expect(tools.length).toBe(2);
    expect(new Set(tools.map((t) => t.name))).toEqual(new Set(["pomodoro_schedule", "format_duration"]));
    // 每个工具都有 schema 与说明,AI 客户端靠它们路由
    for (const tool of tools) {
      expect(tool.description?.length ?? 0).toBeGreaterThan(20);
      expect(tool.inputSchema).toBeTruthy();
    }
    await client.close();
  });

  it("builds the classic 25/5 ×4 schedule with focus and total sums", async () => {
    const client = await connect();
    const r = await client.callTool({ name: "pomodoro_schedule", arguments: {} });
    expect((r as any).isError).toBeUndefined();
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.settings).toEqual({
      work_minutes: 25,
      break_minutes: 5,
      long_break_minutes: 15,
      intervals: 4,
    });
    expect(parsed.schedule.map((s: any) => s.phase)).toEqual([
      "work", "break", "work", "break", "work", "break", "work", "long",
    ]);
    expect(parsed.schedule.map((s: any) => s.minutes)).toEqual([25, 5, 25, 5, 25, 5, 25, 15]);
    expect(parsed.schedule[0]).toMatchObject({ step: 1, phase: "work", ms: 1_500_000 });
    expect(parsed.schedule[7]).toMatchObject({ step: 8, phase: "long", ms: 900_000 });
    expect(parsed.focus_minutes).toBe(100);
    expect(parsed.total_minutes).toBe(130);
    await client.close();
  });

  it("builds custom schedules with explicit settings", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "pomodoro_schedule",
      arguments: { work_minutes: 50, break_minutes: 10, long_break_minutes: 30, intervals: 2 },
    });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.schedule.map((s: any) => `${s.phase}:${s.minutes}`)).toEqual([
      "work:50", "break:10", "work:50", "long:30",
    ]);
    expect(parsed.focus_minutes).toBe(100);
    expect(parsed.total_minutes).toBe(140);
    const single = await client.callTool({
      name: "pomodoro_schedule",
      arguments: { work_minutes: 15, break_minutes: 3, long_break_minutes: 10, intervals: 1 },
    });
    const singleParsed = JSON.parse((single.content as any)[0].text);
    expect(singleParsed.schedule.map((s: any) => s.phase)).toEqual(["work", "long"]);
    await client.close();
  });

  it("formats durations with floored seconds across the hour boundary", async () => {
    const client = await connect();
    const cases: [number, string][] = [
      [0, "00:00"],
      [59_999, "00:59"],
      [3_599_999, "59:59"],
      [3_600_000, "1:00:00"],
      [3_661_500, "1:01:01"],
    ];
    for (const [ms, expected] of cases) {
      const r = await client.callTool({ name: "format_duration", arguments: { milliseconds: ms } });
      expect((r.content as any)[0].text).toBe(expected);
    }
    await client.close();
  });

  it("treats negative durations as zero", async () => {
    const client = await connect();
    const r = await client.callTool({ name: "format_duration", arguments: { milliseconds: -5_000 } });
    expect((r.content as any)[0].text).toBe("00:00");
    await client.close();
  });

  it("guards both layers: schema violations and invalid logic input", async () => {
    const client = await connect();
    // schema 层:work_minutes 低于下限被 zod 拒绝 → SDK 返回 isError(-32602)
    const lowWork = await client.callTool({ name: "pomodoro_schedule", arguments: { work_minutes: 0 } });
    expect((lowWork as any).isError).toBe(true);
    expect((lowWork.content as any)[0].text).toContain("-32602");
    // schema 层:非整数 intervals 被拒绝
    const fracIntervals = await client.callTool({ name: "pomodoro_schedule", arguments: { intervals: 2.5 } });
    expect((fracIntervals as any).isError).toBe(true);
    // schema 层:非法毫秒(NaN)被 zod 的 z.number() 拒绝 → isError,而非静默输出
    const nanMs = await client.callTool({ name: "format_duration", arguments: { milliseconds: Number.NaN } });
    expect((nanMs as any).isError).toBe(true);
    await client.close();
  });
});
