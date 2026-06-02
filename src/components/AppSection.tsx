import type { AppId, AppSection as AppSectionData } from "../data/types";
import { TaskItem } from "./TaskItem";

interface AppSectionProps {
  section: AppSectionData;
  dateISO: string;
  isTaskDone: (taskId: string) => boolean;
  onToggleTask: (taskId: string) => void;
}

const APP_META: Record<
  AppId,
  { name: string; letter: string; colorVar: string }
> = {
  lichess: { name: "Lichess", letter: "L", colorVar: "var(--color-lichess)" },
  chesscom: { name: "Chess.com", letter: "C", colorVar: "var(--color-chesscom)" },
  duolingo: { name: "Duolingo Chess", letter: "D", colorVar: "var(--color-duolingo)" },
};

export function AppSection({ section, isTaskDone, onToggleTask }: AppSectionProps) {
  const meta = APP_META[section.app];
  return (
    <section
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 12,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        padding: 16,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          paddingBottom: 4,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: meta.colorVar,
            color: "#ffffff",
            fontWeight: 700,
            fontSize: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {meta.letter}
        </div>
        <h2
          style={{
            flexGrow: 1,
            fontSize: 16,
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          {meta.name}
        </h2>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
          {section.durationLabel}
        </span>
      </header>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {section.tasks.map((task, idx) => (
          <TaskItem
            key={task.id}
            task={task}
            index={idx + 1}
            done={isTaskDone(task.id)}
            onToggle={() => onToggleTask(task.id)}
          />
        ))}
      </div>
    </section>
  );
}
