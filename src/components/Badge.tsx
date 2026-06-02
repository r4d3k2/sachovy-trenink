import type { BadgeKind } from "../data/types";

interface BadgeProps {
  kind: BadgeKind;
  label?: string;
  compact?: boolean;
}

const DEFAULT_LABELS: Record<BadgeKind, string> = {
  ok: "V appce",
  limited: "Omezeno v appce",
  "web-only": "Pouze web",
  "diamond-app": "💎 Diamond – appka",
  "diamond-web": "💎 Diamond – web",
};

export function Badge({ kind, label, compact = false }: BadgeProps) {
  const text = label ?? DEFAULT_LABELS[kind];
  let colorStyle: React.CSSProperties = {};
  switch (kind) {
    case "ok":
      colorStyle = {
        background: "var(--badge-ok-bg)",
        color: "var(--badge-ok-text)",
        borderColor: "var(--badge-ok-border)",
      };
      break;
    case "limited":
      colorStyle = {
        background: "var(--badge-limited-bg)",
        color: "var(--badge-limited-text)",
        borderColor: "var(--badge-limited-border)",
      };
      break;
    case "web-only":
      colorStyle = {
        background: "var(--badge-web-bg)",
        color: "var(--badge-web-text)",
        borderColor: "var(--badge-web-border)",
      };
      break;
    case "diamond-app":
      colorStyle = {
        background: "var(--badge-diamond-gradient)",
        color: "#ffffff",
        borderColor: "transparent",
      };
      break;
    case "diamond-web":
      colorStyle = {
        background: "var(--badge-diamond-web-gradient)",
        color: "#ffffff",
        borderColor: "transparent",
      };
      break;
  }
  return (
    <span className={compact ? "badge badge-sm" : "badge"} style={colorStyle}>
      {text}
    </span>
  );
}
