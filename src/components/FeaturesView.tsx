import { featureGroups, featureIntro, featureNotes } from "../data/plan";
import type { FeatureGroup, FeatureRow } from "../data/types";
import { Badge } from "./Badge";
import { Path } from "./Path";

export function FeaturesView() {
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
          Přehled funkcí
        </h1>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
          {featureIntro}
        </p>
      </header>

      {featureGroups.map((group, idx) => (
        <FeatureCard key={idx} group={group} />
      ))}

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
            fontSize: 18,
            fontWeight: 600,
            color: "var(--text-primary)",
            margin: 0,
            marginBottom: 8,
            lineHeight: 1.25,
          }}
        >
          Poznámky
        </h2>
        <ul
          style={{
            listStyle: "disc",
            paddingLeft: 20,
            margin: 0,
            fontSize: 12,
            color: "var(--text-secondary)",
            lineHeight: 1.6,
          }}
        >
          {featureNotes.map((note, i) => (
            <li key={i} style={{ marginBottom: 6 }}>
              {note}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function FeatureCard({ group }: { group: FeatureGroup }) {
  return (
    <section
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
      </header>
      <table className="feature-table">
        <colgroup>
          <col className="col-feature" />
          <col className="col-iphone" />
          <col className="col-path" />
        </colgroup>
        <thead>
          <tr>
            <th>Funkce</th>
            <th>iPhone</th>
            <th>Cesta / URL</th>
          </tr>
        </thead>
        <tbody>
          {group.rows.map((row, i) => (
            <FeatureRowItem key={i} row={row} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

function FeatureRowItem({ row }: { row: FeatureRow }) {
  const segments = row.pathOrUrl.split(" → ").map((s) => s.trim()).filter(Boolean);
  return (
    <tr className={row.isDiamond ? "diamond-row" : undefined}>
      <td
        style={{
          fontWeight: 500,
          color: "var(--text-primary)",
          lineHeight: 1.4,
        }}
      >
        {row.feature}
      </td>
      <td>
        <span className="badge-cell">
          <Badge kind={row.availability} label={row.availabilityLabel} compact />
        </span>
      </td>
      <td>
        <Path segments={segments} href={row.url} size="sm" />
      </td>
    </tr>
  );
}
