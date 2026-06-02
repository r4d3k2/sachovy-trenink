import { useState } from "react";
import type { ReactNode } from "react";

interface TipProps {
  children: ReactNode;
  href?: string;
}

const BASE_STYLE: React.CSSProperties = {
  position: "relative",
  background: "rgba(253, 243, 217, 0.5)",
  borderLeft: "4px solid var(--accent-gold)",
  padding: "8px 12px",
  borderRadius: "0 6px 6px 0",
  fontSize: 11,
  lineHeight: 1.5,
  color: "var(--badge-limited-text)",
  display: "block",
};

export function Tip({ children, href }: TipProps) {
  const [hover, setHover] = useState(false);
  if (!href) {
    return <div style={BASE_STYLE}>{children}</div>;
  }
  const linkStyle: React.CSSProperties = {
    ...BASE_STYLE,
    background: hover ? "rgba(234, 217, 160, 0.6)" : BASE_STYLE.background,
    cursor: "pointer",
    textDecoration: "none",
    transition: "background 150ms ease",
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
      <span>{children}</span>
      <span
        aria-hidden="true"
        style={{
          marginLeft: 4,
          opacity: hover ? 1 : 0.7,
          transition: "opacity 150ms ease",
        }}
      >
        ↗
      </span>
    </a>
  );
}
