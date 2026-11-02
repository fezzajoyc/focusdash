"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import type { Locale } from "@/lib/site";
import { formatElapsed, lapRows, lapsToCsv } from "../_lib/timer";
import { downloadBlob } from "@/components/client-ui";
import { GhostButton, Note, pick, PrimaryButton } from "./timer-ui";

/**
 * 秒表引擎:启动/暂停/计段/清零,毫秒精度由 Date.now 锚定(分段时间不丢)。
 * 分段表可导出 CSV(lap,split,total)。
 */

const S = {
  start: { en: "Start", zh: "启动", ja: "スタート", es: "Iniciar", pt: "Iniciar" },
  pause: { en: "Pause", zh: "暂停", ja: "一時停止", es: "Pausar", pt: "Pausar" },
  resume: { en: "Resume", zh: "继续", ja: "再開", es: "Continuar", pt: "Retomar" },
  lap: { en: "Lap", zh: "计段", ja: "ラップ", es: "Vuelta", pt: "Volta" },
  reset: { en: "Reset", zh: "清零", ja: "リセット", es: "Reiniciar", pt: "Zerar" },
  csv: { en: "Export CSV", zh: "导出 CSV", ja: "CSV を書き出す", es: "Exportar CSV", pt: "Exportar CSV" },
  lapCol: { en: "Lap", zh: "段", ja: "周回", es: "Vuelta", pt: "Volta" },
  splitCol: { en: "Split", zh: "分段", ja: "ラップ", es: "Parcial", pt: "Parcial" },
  totalCol: { en: "Total", zh: "累计", ja: "累計", es: "Total", pt: "Total" },
  empty: { en: "Press Lap while running to record a split.", zh: "运行中按“计段”记录分段时间。", ja: "実行中に「ラップ」を押すと区間を記録します。", es: "Pulse «Vuelta» en marcha para registrar un parcial.", pt: "Pressione «Volta» em andamento para registrar um parcial." },
  anchorNote: {
    en: "Timing is anchored to the system clock (Date.now), not a ticking counter — background tabs, sleep and CPU hiccups never distort a split. Exports include both the per-lap split and the running total.",
    zh: "计时锚定系统时钟(Date.now),不依赖滴答计数——后台标签、休眠、卡顿都不会让分段失真。导出内容包含每段用时与累计时间。",
    ja: "計時はシステム時計(Date.now)に固定され、ティック計算に依存しません。バックグラウンドやスリープでも区間は狂いません。書き出しには各区間と累計の両方を含めます。",
    es: "La medición se ancla al reloj del sistema (Date.now), no a un contador: pestañas en segundo plano, suspensión o tirones de CPU no distorsionan ningún parcial. La exportación incluye el parcial y el total acumulado.",
    pt: "A medição fica ancorada no relógio do sistema (Date.now), não num contador — abas em segundo plano, suspensão ou travadas da CPU não distorcem nenhum parcial. A exportação inclui o parcial e o total acumulado.",
  },
};

type Status = "idle" | "running" | "paused";

export function StopwatchEngine() {
  const { locale } = useI18n();
  const [status, setStatus] = useState<Status>("idle");
  const [startedAt, setStartedAt] = useState(0);
  const [baseMs, setBaseMs] = useState(0);
  const [laps, setLaps] = useState<number[]>([]); // 每次按表的累计毫秒
  const [now, setNow] = useState(() => Date.now());

  const elapsed = status === "running" ? baseMs + (now - startedAt) : baseMs;
  const rows = lapRows(laps);

  useEffect(() => {
    if (status !== "running") return;
    // 30ms 心跳 ≈ 百分之一秒显示粒度;真实数值永远由 startedAt 推算
    const id = window.setInterval(() => setNow(Date.now()), 30);
    return () => window.clearInterval(id);
  }, [status]);

  const resumeRef = useRef<() => void>(() => {});
  function resume() {
    setStartedAt(Date.now());
    setStatus("running");
    setNow(Date.now());
  }
  resumeRef.current = resume;

  function start() {
    setStartedAt(Date.now());
    setBaseMs(0);
    setLaps([]);
    setStatus("running");
    setNow(Date.now());
  }

  function pause() {
    setBaseMs(baseMs + (now - startedAt));
    setStatus("paused");
  }

  function recordLap() {
    setLaps((xs) => [...xs, elapsed]);
  }

  function reset() {
    setStatus("idle");
    setStartedAt(0);
    setBaseMs(0);
    setLaps([]);
    setNow(Date.now());
  }

  function exportCsv() {
    const csv = lapsToCsv(rows);
    if (!csv) return;
    downloadBlob(new Blob([csv], { type: "text/csv;charset=utf-8" }), "focusdash-laps.csv");
  }

  return (
    <ToolPanel>
      <div className="flex flex-col items-center gap-5">
        <output aria-live="polite" className="mono text-[56px] font-bold leading-none tabular-nums">
          {formatElapsed(elapsed)}
        </output>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {status === "running" ? (
            <PrimaryButton onClick={pause} aria={pick(locale, S.pause)}>{pick(locale, S.pause)}</PrimaryButton>
          ) : (
            <PrimaryButton
              onClick={() => (status === "paused" ? resumeRef.current() : start())}
              aria={status === "paused" ? pick(locale, S.resume) : pick(locale, S.start)}
            >
              {status === "paused" ? pick(locale, S.resume) : pick(locale, S.start)}
            </PrimaryButton>
          )}
          <GhostButton onClick={recordLap} aria={pick(locale, S.lap)} disabled={status !== "running"}>
            {pick(locale, S.lap)}
          </GhostButton>
          <GhostButton onClick={reset} aria={pick(locale, S.reset)} disabled={elapsed === 0 && laps.length === 0}>
            {pick(locale, S.reset)}
          </GhostButton>
          {rows.length > 0 ? (
            <GhostButton onClick={exportCsv} aria={pick(locale, S.csv)}>{pick(locale, S.csv)}</GhostButton>
          ) : null}
        </div>
      </div>

      <div className="mt-7">
        {rows.length === 0 ? (
          <Note>{pick(locale, S.empty)}</Note>
        ) : (
          <div className="overflow-hidden rounded-xl border hairline">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="bg-[var(--color-surface)] text-left text-[12px] uppercase tracking-wide text-[var(--color-sub)]">
                  <th scope="col" className="px-3.5 py-2 font-semibold">{pick(locale, S.lapCol)}</th>
                  <th scope="col" className="px-3.5 py-2 font-semibold">{pick(locale, S.splitCol)}</th>
                  <th scope="col" className="px-3.5 py-2 text-right font-semibold">{pick(locale, S.totalCol)}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => ({ r, idx })).reverse().map(({ r, idx }, i) => (
                  <tr key={idx} className={i % 2 ? "bg-[var(--color-surface)]" : ""}>
                    <td className="mono px-3.5 py-2 font-semibold">{idx + 1}</td>
                    <td className="mono px-3.5 py-2 tabular-nums">{formatElapsed(r.lap)}</td>
                    <td className="mono px-3.5 py-2 text-right tabular-nums text-[var(--color-sub)]">{formatElapsed(r.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-5">
        <Note>{pick(locale, S.anchorNote)}</Note>
      </div>
    </ToolPanel>
  );
}
