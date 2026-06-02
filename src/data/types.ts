export type BadgeKind =
  | "ok"
  | "limited"
  | "web-only"
  | "diamond-app"
  | "diamond-web";

export type AppId = "lichess" | "chesscom" | "duolingo";

export interface Task {
  id: string;
  title: string;
  badge: BadgeKind;
  badgeLabel?: string;
  path: string[];
  description?: string;
  tip?: string;
  linkUrl?: string;
  tipLinkUrl?: string;
}

export interface AppSection {
  app: AppId;
  durationLabel: string;
  tasks: Task[];
}

export type DayKey = "po-pa" | "st" | "ut-ct" | "so-ne";

export interface DayPlan {
  key: DayKey;
  tabLabel: string;
  title: string;
  note: string;
  summary: {
    label: string;
    value: string;
  }[];
  sections: AppSection[];
}

export interface ThemeRow {
  dayShort: string;
  title: string;
  badge: BadgeKind;
  badgeLabel?: string;
  path: string[];
  description?: string;
  tip?: string;
}

export interface ThemeGroup {
  heading: string;
  intro?: string;
  rows: ThemeRow[];
}

export interface FeatureRow {
  feature: string;
  availability: BadgeKind;
  availabilityLabel: string;
  pathOrUrl: string;
  url?: string;
  isDiamond?: boolean;
}

export interface FeatureGroup {
  heading: string;
  rows: FeatureRow[];
}

export type TabKey = DayKey | "themes" | "features" | "history";
