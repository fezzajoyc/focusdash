# FocusDash

专注与计时工具站(pomodoro / flowtime / stopwatch-laps / countdown-multi),全部客户端运行,
标准见 workspace 的 site-engineering skill。#10 in `docs/portfolio-plan.md`(Round 2)。

## 结构

- `tools/timer/` — 4 个工具定义(引擎接线 + 5 语内联文案)
- `tools/_engines/` — 客户端引擎 + `timer-ui.tsx` 共用原语(RingProgress / chime / 按钮与输入)
- `tools/_lib/timer.ts` — 计时纯逻辑(formatRemaining / parseDuration / pomodoroPhases / lapRows …),`tests/timer.test.ts` 锁定
- `mcp/` — 2 个 AI 可执行工具(pomodoro_schedule、format_duration),`npm run build:mcp` 打包

## 下一步

1. 域名拍板后配 `.env.local`,跑 `BASE=<url> npm run audit:seo` 门禁,再按 launch-runbook 提交。
2. 新工具照 pomodoro-timer 的模式加:定义文件 + 引擎 + `tests/timer.test.ts` 补纯函数用例 + 15 语字典键不动。
