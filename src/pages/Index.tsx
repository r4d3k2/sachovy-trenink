import { useEffect, useMemo, useRef, useState } from "react";
import { Tabs } from "../components/Tabs";
import { DayView } from "../components/DayView";
import { ThemesView } from "../components/ThemesView";
import { FeaturesView } from "../components/FeaturesView";
import { HistoryView } from "../components/HistoryView";
import { KingAccent } from "../components/ChessAccents";
import { Badge } from "../components/Badge";
import { getDayPlan } from "../data/plan";
import type { TabKey } from "../data/types";
import {
  currentWeekMondayISO,
  dayKeyForDate,
  defaultTabForToday,
  mondayOfWeek,
  parseISODate,
  toISODate,
  todayISO,
} from "../lib/dates";
import {
  loadProgress,
  migrateProgressV2,
  pruneOldProgress,
  saveProgress,
  type ProgressMap,
} from "../lib/storage";

export function Index() {
  const [progress, setProgress] = useState<ProgressMap>(() => {
    migrateProgressV2();
    pruneOldProgress();
    return loadProgress();
  });
  const [selectedDate, setSelectedDate] = useState<string>(() => todayISO());
  const [activeTab, setActiveTab] = useState<TabKey>(() => defaultTabForToday());
  const [displayedWeekStart, setDisplayedWeekStart] = useState<string>(() =>
    currentWeekMondayISO(),
  );

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const lastTodayRef = useRef<string>(todayISO());
  const lastMondayRef = useRef<string>(currentWeekMondayISO());
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleFocus = () => {
      const newToday = todayISO();
      const newMonday = currentWeekMondayISO();
      if (newToday === lastTodayRef.current) return;
      const oldToday = lastTodayRef.current;
      const oldMonday = lastMondayRef.current;
      lastTodayRef.current = newToday;
      lastMondayRef.current = newMonday;
      setSelectedDate((prev) => (prev === oldToday ? newToday : prev));
      setDisplayedWeekStart((prev) => (prev === oldMonday ? newMonday : prev));
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleSelectDate = (dateISO: string) => {
    setSelectedDate(dateISO);
    setActiveTab(dayKeyForDate(dateISO));
    const monday = toISODate(mondayOfWeek(parseISODate(dateISO)));
    setDisplayedWeekStart(monday);
  };

  const handleChangeTab = (next: TabKey) => {
    setActiveTab(next);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleChangeWeek = (newWeekStartISO: string) => {
    setDisplayedWeekStart(newWeekStartISO);
  };

  const handleGoToToday = () => {
    const today = todayISO();
    setSelectedDate(today);
    setDisplayedWeekStart(currentWeekMondayISO());
    setActiveTab(defaultTabForToday());
  };

  const handleHistoryCellSelect = (dateISO: string) => {
    handleSelectDate(dateISO);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const dayKey = useMemo(() => {
    if (activeTab === "themes" || activeTab === "features" || activeTab === "history") {
      return null;
    }
    return activeTab;
  }, [activeTab]);

  return (
    <div
      style={{
        minHeight: "100svh",
        background: "var(--bg-page)",
        paddingBottom: "calc(80px + env(safe-area-inset-bottom))",
      }}
    >
      <Header />
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "var(--bg-page)",
          boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
        }}
      >
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <Tabs active={activeTab} onChange={handleChangeTab} />
        </div>
      </div>

      <main
        style={{
          maxWidth: 480,
          margin: "0 auto",
          padding: "16px",
        }}
      >
        <div key={activeTab} className="view-fade-in">
          {dayKey && (
            <DayView
              plan={getDayPlan(dayKey)}
              selectedDate={selectedDate}
              displayedWeekStart={displayedWeekStart}
              progress={progress}
              onProgressChange={setProgress}
              onSelectDate={handleSelectDate}
              onChangeWeek={handleChangeWeek}
              onGoToToday={handleGoToToday}
            />
          )}
          {activeTab === "themes" && <ThemesView />}
          {activeTab === "features" && <FeaturesView />}
          {activeTab === "history" && (
            <HistoryView progress={progress} onSelectCell={handleHistoryCellSelect} />
          )}
        </div>
      </main>
    </div>
  );
}

function Header() {
  return (
    <div
      className="chess-pattern"
      style={{
        paddingTop: "calc(env(safe-area-inset-top) + 12px)",
        background: "var(--bg-page)",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          margin: "0 auto",
          padding: "0 16px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <KingAccent />
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 19,
                fontWeight: 600,
                color: "var(--text-primary)",
                letterSpacing: -0.2,
                lineHeight: 1.1,
              }}
            >
              Šachový tréninkový plán
            </h1>
            <span style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: 0.2 }}>
              Chess.com Diamond · Duolingo
            </span>
          </div>
        </div>
        <Legend />
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 6,
        padding: "8px 10px",
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 10,
      }}
    >
      <Badge kind="ok" compact />
      <Badge kind="limited" compact />
      <Badge kind="web-only" compact />
      <Badge kind="diamond-app" compact />
      <Badge kind="diamond-web" compact />
    </div>
  );
}
