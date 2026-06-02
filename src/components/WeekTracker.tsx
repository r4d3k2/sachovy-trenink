import { useMemo } from "react";
import {
  currentWeekMondayISO,
  formatShortDate,
  formatWeekRange,
  parseISODate,
  shiftWeekStart,
  shortWeekday,
  todayISO,
  weekDatesFor,
  weekdayOf,
} from "../lib/dates";
import { allTaskIdsForDay } from "../data/plan";
import { dayKeyForDate } from "../lib/dates";
import { dayProgress, type ProgressMap } from "../lib/storage";

interface WeekTrackerProps {
  progress: ProgressMap;
  selectedDate: string;
  displayedWeekStart: string;
  onSelectDate: (dateISO: string) => void;
  onChangeWeek: (newWeekStartISO: string) => void;
  onGoToToday: () => void;
}

interface DayDot {
  dateISO: string;
  weekdayShort: string;
  isToday: boolean;
  isSelected: boolean;
  done: number;
  total: number;
  ratio: number;
}

export function WeekTracker({
  progress,
  selectedDate,
  displayedWeekStart,
  onSelectDate,
  onChangeWeek,
  onGoToToday,
}: WeekTrackerProps) {
  const today = todayISO();
  const currentMonday = currentWeekMondayISO();
  const isCurrentWeek = displayedWeekStart === currentMonday;

  const week = useMemo(
    () => weekDatesFor(parseISODate(displayedWeekStart)),
    [displayedWeekStart],
  );

  const dots: DayDot[] = week.map((dateISO) => {
    const dayKey = dayKeyForDate(dateISO);
    const taskIds = allTaskIdsForDay(dayKey);
    const { done, total } = dayProgress(progress, dateISO, taskIds);
    const ratio = total > 0 ? done / total : 0;
    return {
      dateISO,
      weekdayShort: shortWeekday(weekdayOf(dateISO)),
      isToday: dateISO === today,
      isSelected: dateISO === selectedDate,
      done,
      total,
      ratio,
    };
  });

  let labelText: string;
  if (selectedDate === today) {
    const w = weekdayOf(selectedDate);
    const longNames = ["pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota", "neděle"];
    labelText = `Dnes je ${longNames[w]}`;
  } else {
    labelText = `Vybráno: ${formatShortDate(selectedDate)}`;
  }

  const selectedDayKey = dayKeyForDate(selectedDate);
  const selectedTaskIds = allTaskIdsForDay(selectedDayKey);
  const selectedProgress = dayProgress(progress, selectedDate, selectedTaskIds);
  const countText = `splněno ${selectedProgress.done} ze ${selectedProgress.total} úkolů`;

  const showTodayButton = selectedDate !== today || !isCurrentWeek;

  const weekHeaderBg = isCurrentWeek
    ? "transparent"
    : "rgba(212, 168, 75, 0.08)";

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 12,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        padding: "10px 8px 12px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "6px 4px",
          borderRadius: 8,
          background: weekHeaderBg,
          transition: "background 200ms ease",
        }}
      >
        <button
          type="button"
          className="week-arrow"
          onClick={() => onChangeWeek(shiftWeekStart(displayedWeekStart, -1))}
          aria-label="Předchozí týden"
          style={{
            minWidth: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            color: "var(--text-secondary)",
            borderRadius: 6,
            flexShrink: 0,
          }}
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => onChangeWeek(currentMonday)}
          aria-label="Přejít na aktuální týden"
          style={{
            flexGrow: 1,
            minHeight: 36,
            fontSize: 12,
            fontWeight: 500,
            color: isCurrentWeek ? "var(--text-primary)" : "var(--accent-gold-dark)",
            padding: "0 6px",
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={isCurrentWeek ? undefined : "Zpět na aktuální týden"}
        >
          {formatWeekRange(week)}
        </button>
        <button
          type="button"
          className="week-arrow"
          onClick={() => onChangeWeek(shiftWeekStart(displayedWeekStart, 1))}
          aria-label="Následující týden"
          style={{
            minWidth: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            color: "var(--text-secondary)",
            borderRadius: 6,
            flexShrink: 0,
          }}
        >
          ›
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 4,
          padding: "0 4px",
        }}
      >
        {dots.map((d) => (
          <button
            key={d.dateISO}
            type="button"
            className="day-dot-btn"
            onClick={() => onSelectDate(d.dateISO)}
            aria-label={`${d.weekdayShort} – ${d.done} z ${d.total}`}
            aria-pressed={d.isSelected}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              padding: "4px 0",
              minHeight: 44,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: d.isToday ? 600 : 500,
                color: d.isToday ? "var(--accent-gold-dark)" : "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {d.weekdayShort}
            </span>
            <ProgressDot
              ratio={d.ratio}
              isToday={d.isToday}
              isSelected={d.isSelected}
            />
          </button>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 12,
          color: "var(--text-secondary)",
          paddingTop: 4,
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <span style={{ flexGrow: 1, lineHeight: 1.4, paddingLeft: 4 }}>
          {labelText}
          <span style={{ color: "var(--text-muted)" }}> — </span>
          {countText}
        </span>
        {showTodayButton && (
          <button
            type="button"
            className="today-btn"
            onClick={onGoToToday}
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: "var(--accent-gold-dark)",
              border: "1px solid var(--border-strong)",
              padding: "4px 10px",
              borderRadius: 999,
              background: "var(--bg-card)",
              flexShrink: 0,
              minHeight: 28,
            }}
          >
            Dnes
          </button>
        )}
      </div>
    </div>
  );
}

interface DotProps {
  ratio: number;
  isToday: boolean;
  isSelected: boolean;
}

function ProgressDot({ ratio, isToday, isSelected }: DotProps) {
  const size = 18;
  const clamped = Math.max(0, Math.min(1, ratio));
  let borderColor = "var(--border-strong)";
  if (isToday) borderColor = "var(--accent-gold)";
  if (isSelected && !isToday) borderColor = "var(--text-primary)";
  const borderWidth = isToday || isSelected ? 2 : 1.5;

  const isFull = clamped >= 1;
  const isEmpty = clamped <= 0;

  return (
    <span
      className="progress-dot"
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        border: `${borderWidth}px solid ${borderColor}`,
        background: isFull ? "var(--accent-gold)" : "var(--bg-card)",
        display: "inline-block",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {!isEmpty && !isFull && (
        <span
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: `${clamped * 100}%`,
            background: "var(--accent-gold)",
            opacity: 0.85,
          }}
        />
      )}
    </span>
  );
}
