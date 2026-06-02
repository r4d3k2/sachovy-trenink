import { useEffect, useMemo, useState } from "react";
import {
  buildHistoryGrid,
  historyStats,
  monthLabelForWeek,
  HISTORY_DAYS,
  HISTORY_WEEKS,
  type HistoryCell,
} from "../lib/history";
import {
  formatShortDate,
  longWeekday,
  shortWeekday,
} from "../lib/dates";
import type { Weekday } from "../lib/dates";
import type { ProgressMap } from "../lib/storage";

interface HistoryViewProps {
  progress: ProgressMap;
  onSelectCell: (dateISO: string) => void;
}

const WEEKDAYS: Weekday[] = [0, 1, 2, 3, 4, 5, 6];

export function HistoryView({ progress, onSelectCell }: HistoryViewProps) {
  const { weekStarts, cells } = useMemo(
    () => buildHistoryGrid(progress),
    [progress],
  );
  const stats = useMemo(() => historyStats(cells), [cells]);

  const monthLabels = useMemo(
    () => weekStarts.map((iso) => monthLabelForWeek(iso)),
    [weekStarts],
  );

  const [activeCell, setActiveCell] = useState<HistoryCell | null>(null);

  useEffect(() => {
    if (!activeCell) return;
    const t = window.setTimeout(() => setActiveCell(null), 2200);
    return () => window.clearTimeout(t);
  }, [activeCell]);

  const grouped: HistoryCell[][] = WEEKDAYS.map((w) =>
    cells.filter((c) => c.weekday === w),
  );

  const handleCellAction = (cell: HistoryCell) => {
    if (cell.isFuture) return;
    onSelectCell(cell.dateISO);
  };

  const avgFormatted = stats.averagePerTrainingDay.toLocaleString("cs-CZ", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          padding: "4px 4px 0",
        }}
      >
        <h1
          style={{
            fontSize: 22,
            color: "var(--accent-gold-dark)",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            letterSpacing: -0.2,
            lineHeight: 1.2,
          }}
        >
          Historie tréninku
        </h1>
        <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
          Posledních {HISTORY_WEEKS} týdnů
        </p>
      </header>

      <section
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          borderRadius: 12,
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          padding: "14px 14px 16px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "22px 1fr",
            columnGap: 6,
            rowGap: 4,
          }}
        >
          <div />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${HISTORY_WEEKS}, 1fr)`,
              gap: 3,
              fontSize: 10,
              color: "var(--text-muted)",
              textAlign: "center",
              lineHeight: 1,
              minHeight: 12,
            }}
          >
            {monthLabels.map((label, idx) => (
              <span key={idx}>{label ?? ""}</span>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateRows: `repeat(7, 1fr)`,
              gap: 3,
              fontSize: 10,
              color: "var(--text-muted)",
              textAlign: "right",
              lineHeight: 1,
              alignItems: "center",
              paddingRight: 2,
            }}
          >
            {WEEKDAYS.map((w) => (
              <span key={w}>{shortWeekday(w)}</span>
            ))}
          </div>
          <div className="heatmap-grid">
            {grouped.map((row) =>
              row.map((cell) => (
                <HeatCell
                  key={cell.dateISO}
                  cell={cell}
                  onPick={(c) => {
                    setActiveCell(c);
                  }}
                  onActivate={handleCellAction}
                />
              )),
            )}
          </div>
        </div>

        {activeCell && (
          <div
            role="status"
            style={{
              marginTop: 14,
              padding: "8px 12px",
              borderRadius: 8,
              background: "var(--text-primary)",
              color: "#ffffff",
              fontSize: 11,
              lineHeight: 1.5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: 260,
            }}
          >
            <span style={{ fontWeight: 500 }}>
              {longWeekday(activeCell.weekday)}, {formatShortDate(activeCell.dateISO)}
            </span>
            <span style={{ opacity: 0.85 }}>
              {activeCell.isFuture
                ? "Budoucí den"
                : `Splněno ${activeCell.done} ze ${activeCell.total} úkolů`}
            </span>
          </div>
        )}

        <div
          style={{
            marginTop: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            fontSize: 10,
            color: "var(--text-muted)",
          }}
        >
          <span>Méně</span>
          {[0, 1, 2, 3, 4].map((lvl) => (
            <span
              key={lvl}
              className={`heat-cell level-${lvl}`}
              style={{
                display: "inline-block",
                width: 14,
                height: 14,
                cursor: "default",
              }}
              aria-hidden="true"
            />
          ))}
          <span>Více</span>
        </div>
      </section>

      <section
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          borderRadius: 12,
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          padding: "14px 16px 16px",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 16,
            fontWeight: 600,
            color: "var(--text-primary)",
            margin: 0,
            marginBottom: 8,
            lineHeight: 1.25,
          }}
        >
          Souhrn za posledních {HISTORY_DAYS} dní
        </h2>
        {stats.daysWithTraining === 0 ? (
          <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Zatím žádný záznam.
          </p>
        ) : (
          <ul
            style={{
              listStyle: "disc",
              paddingLeft: 20,
              margin: 0,
              fontSize: 13,
              color: "var(--text-secondary)",
              lineHeight: 1.6,
            }}
          >
            <li>
              <strong style={{ color: "var(--text-primary)" }}>
                {stats.daysWithTraining}
              </strong>{" "}
              dní s tréninkem
            </li>
            <li>
              <strong style={{ color: "var(--text-primary)" }}>
                {stats.totalDone}
              </strong>{" "}
              splněných úkolů
            </li>
            <li>
              průměr{" "}
              <strong style={{ color: "var(--text-primary)" }}>
                {avgFormatted}
              </strong>{" "}
              úkolů na trénink
            </li>
          </ul>
        )}
      </section>
    </div>
  );
}

interface HeatCellProps {
  cell: HistoryCell;
  onPick: (cell: HistoryCell) => void;
  onActivate: (cell: HistoryCell) => void;
}

function HeatCell({ cell, onPick, onActivate }: HeatCellProps) {
  const classes = ["heat-cell", `level-${cell.level}`];
  if (cell.isFuture) classes.push("future");
  const title = cell.isFuture
    ? `${shortWeekday(cell.weekday)} ${formatShortDate(cell.dateISO)} (budoucí)`
    : `${shortWeekday(cell.weekday)} ${formatShortDate(cell.dateISO)} — ${cell.done} z ${cell.total}`;
  return (
    <button
      type="button"
      className={classes.join(" ")}
      title={title}
      aria-label={title}
      disabled={cell.isFuture}
      onMouseEnter={() => onPick(cell)}
      onFocus={() => onPick(cell)}
      onClick={() => {
        onPick(cell);
        onActivate(cell);
      }}
      style={
        cell.isToday
          ? { outline: "1.5px solid var(--accent-gold-dark)", outlineOffset: 1 }
          : undefined
      }
    />
  );
}
