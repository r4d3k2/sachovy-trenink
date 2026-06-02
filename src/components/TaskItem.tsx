import { useEffect, useRef, useState } from "react";
import type { Task } from "../data/types";
import { Badge } from "./Badge";
import { Path } from "./Path";
import { Tip } from "./Tip";

interface TaskItemProps {
  task: Task;
  index: number;
  done: boolean;
  onToggle: () => void;
}

export function TaskItem({ task, index, done, onToggle }: TaskItemProps) {
  const [pulse, setPulse] = useState(false);
  const wasDoneRef = useRef(done);

  useEffect(() => {
    if (!wasDoneRef.current && done) {
      setPulse(true);
      const t = window.setTimeout(() => setPulse(false), 160);
      wasDoneRef.current = done;
      return () => window.clearTimeout(t);
    }
    wasDoneRef.current = done;
  }, [done]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "14px 0",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 500,
          color: "var(--text-secondary)",
          marginTop: 1,
        }}
      >
        {index}
      </div>
      <div style={{ flexGrow: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 6 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "var(--text-primary)",
            opacity: done ? 0.55 : 1,
            textDecoration: done ? "line-through" : "none",
            lineHeight: 1.4,
          }}
        >
          {task.title}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
          <Badge kind={task.badge} label={task.badgeLabel} />
        </div>
        <div style={{ marginTop: 2 }}>
          <Path segments={task.path} href={task.linkUrl} />
        </div>
        {task.description && (
          <div
            style={{
              fontSize: 12,
              lineHeight: 1.5,
              color: "var(--text-secondary)",
              marginTop: 2,
            }}
          >
            {task.description}
          </div>
        )}
        {task.tip && (
          <div style={{ marginTop: 4 }}>
            <Tip href={task.tipLinkUrl}>{task.tip}</Tip>
          </div>
        )}
      </div>
      <button
        type="button"
        aria-label={done ? "Odškrtnout úkol" : "Označit úkol jako splněný"}
        aria-pressed={done}
        onClick={onToggle}
        style={{
          position: "relative",
          flexShrink: 0,
          width: 44,
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: -6,
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            borderRadius: 6,
            border: done ? "1.5px solid var(--accent-gold)" : "1.5px solid var(--border-strong)",
            background: done ? "var(--accent-gold)" : "var(--bg-card)",
            color: "#ffffff",
            fontSize: 16,
            fontWeight: 700,
            lineHeight: 1,
            transition: "background 200ms ease, border-color 200ms ease",
            animation: pulse ? "checkbox-pulse 150ms ease-out" : "none",
          }}
        >
          {done ? "✓" : ""}
        </span>
      </button>
    </div>
  );
}
