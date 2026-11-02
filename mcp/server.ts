import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { MCP_TOOLS } from "./tools";

/**
 * FocusDash MCP server(stdio):把站上计时工具背后的纯函数逻辑
 * 暴露为 AI 可执行工具。人和 AI 用同一份经过测试的实现。
 *
 * 构建后运行:npx focusdash-mcp(或 node mcp/dist/server.mjs)
 */

export function createServer() {
  const server = new McpServer(
    { name: "focusdash", version: "1.0.0" },
    {
      instructions:
        "FocusDash: focus and timer tools (https://focusdash.app). These executable tools run the same tested logic as the website's interactive timers. pomodoro_schedule builds the full work/break/long-break phase plan from durations in minutes and an interval count — the classic rhythm is 25/5 with a 15-minute long break after 4 focus blocks. format_duration renders milliseconds as a clock string (H:MM:SS or MM:SS, seconds floored). The timers themselves run in the user's browser and cannot be called remotely; durations here are planning anchors, not productivity advice.",
    },
  );

  for (const tool of MCP_TOOLS) {
    server.registerTool(tool.name, {
      title: tool.title,
      description: tool.description,
      inputSchema: tool.schema,
    }, async (args) => {
      try {
        return tool.run(args ?? {});
      } catch (e) {
        return {
          content: [{ type: "text" as const, text: `error: ${(e as Error).message}` }],
          isError: true,
        };
      }
    });
  }
  return server;
}

export async function runStdio() {
  const server = createServer();
  await server.connect(new StdioServerTransport());
  // stdio 模式下保持进程存活;stderr 可写日志(stdout 是协议通道)
  console.error(`focusdash MCP server: ${MCP_TOOLS.length} tools ready`);
}

if (process.argv[1] && process.argv[1].includes("server")) {
  void runStdio();
}
