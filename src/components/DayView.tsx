import type { DayPlan } from "../data/types";
import { AppSection } from "./AppSection";
import { WeekTracker } from "./WeekTracker";
import { LastWeekSummary } from "./LastWeekSummary";
import { isTaskDone, toggleTask, type ProgressMap } from "../lib/storage";
import {
  currentWeekMondayISO,
  todayISO,
  todayWeekday,
} from "../lib/dates";

interface DayViewProps {
  plan: DayPlan;
  selectedDate: string;
  displayedWeekStart: string;
  progress: ProgressMap;
  onProgressChange: (next: ProgressMap) => void;
  onSelectDate: (dateISO: string) => void;
  onChangeWeek: (newWeekStartISO: string) => void;
  onGoToToday: () => void;
}

export function DayView({
  plan,
  selectedDate,
  displayedWeekStart,
  progress,
  onProgressChange,
  onSelectDate,
  onChangeWeek,
  onGoToToday,
}: DayViewProps) {
  const handleToggle = (taskId: string) => {
    onProgressChange(toggleTask(progress, selectedDate, taskId));
  };

  const today = todayISO();
  const currentMonday = currentWeekMondayISO();
  const w = todayWeekday();
  const showLastWeek =
    selectedDate === today &&
    displayedWeekStart === currentMonday &&
    (w === 0 || w === 6);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
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
          {plan.title}
        </h1>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
          {plan.note}
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 8,
        }}
      >
        {plan.summary.map((box, idx) => (
          <div
            key={idx}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 10,
              padding: "10px 6px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: 2,
              minHeight: 64,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 600,
                color: "var(--accent-gold-dark)",
                lineHeight: 1,
              }}
            >
              {box.value}
            </span>
            <span
              style={{
                fontSize: 10,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: 0.4,
                lineHeight: 1.2,
              }}
            >
              {box.label}
            </span>
          </div>
        ))}
      </div>

      <WeekTracker
        progress={progress}
        selectedDate={selectedDate}
        displayedWeekStart={displayedWeekStart}
        onSelectDate={onSelectDate}
        onChangeWeek={onChangeWeek}
        onGoToToday={onGoToToday}
      />

      {showLastWeek && <LastWeekSummary progress={progress} />}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {plan.sections.map((section, idx) => (
          <AppSection
            key={idx}
            section={section}
            dateISO={selectedDate}
            isTaskDone={(taskId) => isTaskDone(progress, selectedDate, taskId)}
            onToggleTask={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}
