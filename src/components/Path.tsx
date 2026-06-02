import { useState } from "react";

interface PathProps {
  segments: string[];
  href?: string;
  size?: "sm" | "md";
}

function baseStyle(size: "sm" | "md"): React.CSSProperties {
  const isSm = size === "sm";
  return {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "var(--font-mono)",
    fontSize: isSm ? 10 : 11,
    padding: isSm ? "2px 6px" : "3px 8px",
    background: "var(--bg-elevated)",
    border: "1px solid var(--border-subtle)",
    borderRadius: 4,
    color: "var(--text-secondary)",
    lineHeight: 1.5,
    wordBreak: "break-word",
    maxWidth: "100%",
  };
}

export function Path({ segments, href, size = "md" }: PathProps) {
  const [hover, setHover] = useState(false);
  if (segments.length === 0) return null;
  const text = segments.join(" → ");
  const style = baseStyle(size);
  if (!href) {
    return <span style={style}>{text}</span>;
  }
  const isSm = size === "sm";
  const linkStyle: React.CSSProperties = {
    ...style,
    padding: isSm ? "4px 8px" : "6px 10px",
    minHeight: isSm ? 26 : 32,
    cursor: "pointer",
    textDecoration: "none",
    borderColor: hover ? "var(--accent-gold)" : "var(--border-subtle)",
    background: hover ? "rgba(212,168,75,0.08)" : "var(--bg-elevated)",
    transition: "border-color 150ms ease, background 150ms ease",
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={linkStyle}
    >
      <span style={{ wordBreak: "break-word" }}>{text}</span>
      <span
        aria-hidden="true"
        style={{
          marginLeft: 4,
          opacity: hover ? 1 : 0.7,
          transition: "opacity 150ms ease",
          flexShrink: 0,
        }}
      >
        ↗
      </span>
    </a>
  );
}
