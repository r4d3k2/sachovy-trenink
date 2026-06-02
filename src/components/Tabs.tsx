import type { TabKey } from "../data/types";

interface TabsProps {
  active: TabKey;
  onChange: (next: TabKey) => void;
}

const TABS: { key: TabKey; label: string }[] = [
  { key: "po-pa", label: "Po / Pá" },
  { key: "st", label: "St" },
  { key: "ut-ct", label: "Út / Čt" },
  { key: "so-ne", label: "So / Ne" },
  { key: "themes", label: "Témata puzzlů" },
  { key: "features", label: "Přehled funkcí" },
  { key: "history", label: "Historie" },
];

export function Tabs({ active, onChange }: TabsProps) {
  return (
    <nav
      className="no-scrollbar"
      style={{
        display: "flex",
        gap: 4,
        overflowX: "auto",
        padding: "0 12px",
        borderBottom: "1px solid var(--border-subtle)",
        background: "var(--bg-page)",
      }}
    >
      {TABS.map((t) => {
        const isActive = t.key === active;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={`tab-btn ${isActive ? "tab-btn-active" : "tab-btn-inactive"}`}
          >
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}
