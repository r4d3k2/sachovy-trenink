import { useMemo } from "react";
import { previousWeekDates, dayKeyForDate } from "../lib/dates";
import { allTaskIdsForDay } from "../data/plan";
import { rangeProgress, type ProgressMap } from "../lib/storage";

interface LastWeekSummaryProps {
  progress: ProgressMap;
}

export function LastWeekSummary({ progress }: LastWeekSummaryProps) {
  const stats = useMemo(() => {
    const dates = previousWeekDates();
    return rangeProgress(progress, dates, (iso) => allTaskIdsForDay(dayKeyForDate(iso)));
  }, [progress]);

  if (stats.totalDone === 0) return null;

  return (
    <div
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 10,
        padding: "12px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: 0.6,
          color: "var(--text-muted)",
        }}
      >
        Minulý týden
      </span>
      <span
        style={{
          fontSize: 14,
          color: "var(--text-primary)",
          lineHeight: 1.4,
        }}
      >
        {stats.daysWithTraining} ze 7 dní s tréninkem · {stats.totalDone} ze {stats.totalPossible} úkolů
      </span>
    </div>
  );
}
