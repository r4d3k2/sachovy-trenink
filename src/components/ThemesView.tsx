import { themeGroups, themesIntro } from "../data/plan";
import type { ThemeRow } from "../data/types";
import { Badge } from "./Badge";
import { Path } from "./Path";

export function ThemesView() {
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
          Témata puzzlů
        </h1>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
          {themesIntro}
        </p>
      </header>

      {themeGroups.map((group, idx) => (
        <section
          key={idx}
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 12,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            overflow: "hidden",
          }}
        >
          <header
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                fontWeight: 600,
                color: "var(--text-primary)",
                margin: 0,
                lineHeight: 1.25,
              }}
            >
              {group.heading}
            </h2>
            {group.intro && (
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  lineHeight: 1.5,
                }}
              >
                {group.intro}
              </p>
            )}
          </header>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {group.rows.map((row, rowIdx) => (
              <ThemeItem key={rowIdx} row={row} isFirst={rowIdx === 0} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

interface ThemeItemProps {
  row: ThemeRow;
  isFirst: boolean;
}

function ThemeItem({ row, isFirst }: ThemeItemProps) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "12px 16px",
        borderTop: isFirst ? "none" : "1px solid var(--border-subtle)",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 28,
          height: 28,
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
        {row.dayShort}
      </div>
      <div style={{ flexGrow: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 6 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "var(--text-primary)",
            lineHeight: 1.4,
          }}
        >
          {row.title}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
          <Badge kind={row.badge} label={row.badgeLabel} />
        </div>
        <div style={{ marginTop: 2 }}>
          <Path segments={row.path} />
        </div>
        {row.description && (
          <div
            style={{
              fontSize: 12,
              lineHeight: 1.5,
              color: "var(--text-secondary)",
              marginTop: 2,
            }}
          >
            {row.description}
          </div>
        )}
      </div>
    </li>
  );
}
