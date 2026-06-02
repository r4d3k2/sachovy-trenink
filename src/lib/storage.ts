const STORAGE_KEY = "chess-trainer-progress";
const MIGRATION_V2_KEY = "chess-trainer-migration-v2";
const MAX_DAYS = 90;

export type ProgressMap = Record<string, Record<string, boolean>>;

function readStorage(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object") {
      return parsed as ProgressMap;
    }
    return {};
  } catch {
    return {};
  }
}

function writeStorage(map: ProgressMap): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    /* localStorage may be unavailable in private mode */
  }
}

export function loadProgress(): ProgressMap {
  return readStorage();
}

export function saveProgress(map: ProgressMap): void {
  writeStorage(map);
}

export function isTaskDone(
  map: ProgressMap,
  dateISO: string,
  taskId: string,
): boolean {
  return Boolean(map[dateISO]?.[taskId]);
}

export function toggleTask(
  map: ProgressMap,
  dateISO: string,
  taskId: string,
): ProgressMap {
  const dayMap = { ...(map[dateISO] ?? {}) };
  if (dayMap[taskId]) {
    delete dayMap[taskId];
  } else {
    dayMap[taskId] = true;
  }
  const next = { ...map, [dateISO]: dayMap };
  if (Object.keys(dayMap).length === 0) {
    delete next[dateISO];
  }
  return next;
}

export function dayProgress(
  map: ProgressMap,
  dateISO: string,
  allTaskIds: string[],
): { done: number; total: number } {
  const dayMap = map[dateISO] ?? {};
  let done = 0;
  for (const id of allTaskIds) {
    if (dayMap[id]) done += 1;
  }
  return { done, total: allTaskIds.length };
}

export function rangeProgress(
  map: ProgressMap,
  dateISOs: string[],
  taskIdsForDate: (dateISO: string) => string[],
): { daysWithTraining: number; totalDone: number; totalPossible: number } {
  let daysWithTraining = 0;
  let totalDone = 0;
  let totalPossible = 0;
  for (const iso of dateISOs) {
    const ids = taskIdsForDate(iso);
    const dayMap = map[iso] ?? {};
    let done = 0;
    for (const id of ids) {
      if (dayMap[id]) done += 1;
    }
    if (done > 0) daysWithTraining += 1;
    totalDone += done;
    totalPossible += ids.length;
  }
  return { daysWithTraining, totalDone, totalPossible };
}

export function pruneOldProgress(): void {
  const map = readStorage();
  const cutoff = new Date();
  cutoff.setHours(0, 0, 0, 0);
  cutoff.setDate(cutoff.getDate() - MAX_DAYS);
  const cutoffISO = isoDate(cutoff);
  const next: ProgressMap = {};
  let changed = false;
  for (const [dateISO, value] of Object.entries(map)) {
    if (dateISO >= cutoffISO) {
      next[dateISO] = value;
    } else {
      changed = true;
    }
  }
  if (changed) writeStorage(next);
}

function isoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const ID_RENAMES_UT_CT: Record<string, string> = {
  "ut.chesscom.lesson": "ut-ct.chesscom.lekce",
  "ut.chesscom.daily": "ut-ct.chesscom.daily",
  "ut.chesscom.themes": "ut-ct.chesscom.puzzles",
  "ut.chesscom.rush": "ut-ct.chesscom.rush",
  "ut.chesscom.video": "ut-ct.chesscom.video",
  "ut.lichess.puzzles": "ut-ct.lichess.puzzles",
  "ut.lichess.openings": "ut-ct.lichess.opening",
  "ut.duo.lessons": "ut-ct.duolingo.lekce",
};

const ID_RENAMES_SO_NE: Record<string, string> = {
  "so.lichess.classical": "so-ne.lichess.classical",
  "so.lichess.fullanalysis": "so-ne.lichess.analyza",
  "so.lichess.dashboard": "so-ne.lichess.dashboard",
  "so.chesscom.review": "so-ne.chesscom.review",
  "so.chesscom.openings": "so-ne.chesscom.practice-openings",
  "so.chesscom.drills": "so-ne.chesscom.practice-drills",
  "so.chesscom.lesson": "so-ne.chesscom.lekce",
};

const ID_RENAMES_PO_PA: Record<string, string> = {
  "po.lichess.puzzles": "po-pa.lichess.puzzles",
  "po.lichess.rapid": "po-pa.lichess.rapid",
  "po.lichess.analysis": "po-pa.lichess.analyza",
  "po.duo.lessons": "po-pa.duolingo.lekce",
};

function weekdayMondayFirst(dateISO: string): number {
  const [y, m, d] = dateISO.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return (date.getDay() + 6) % 7;
}

export function migrateProgressV2(): void {
  if (typeof window === "undefined") return;
  try {
    if (window.localStorage.getItem(MIGRATION_V2_KEY) === "done") return;
  } catch {
    return;
  }

  const map = readStorage();
  let modified = false;

  for (const dateISO of Object.keys(map)) {
    const dayMap = map[dateISO];
    const weekday = weekdayMondayFirst(dateISO);

    for (const oldId of Object.keys(dayMap)) {
      let newId: string | null = null;
      let drop = false;

      if (oldId.startsWith("po.") || oldId.startsWith("po-st-pa.")) {
        if (weekday === 2) {
          drop = true;
        } else if (weekday === 0 || weekday === 4) {
          const lookup = oldId.startsWith("po-st-pa.")
            ? ID_RENAMES_PO_PA[oldId.replace("po-st-pa.", "po.")]
            : ID_RENAMES_PO_PA[oldId];
          if (lookup) newId = lookup;
        } else {
          drop = true;
        }
      } else if (oldId.startsWith("ut.")) {
        newId = ID_RENAMES_UT_CT[oldId] ?? null;
      } else if (oldId.startsWith("so.")) {
        newId = ID_RENAMES_SO_NE[oldId] ?? null;
      }

      if (drop) {
        delete dayMap[oldId];
        modified = true;
      } else if (newId && newId !== oldId) {
        dayMap[newId] = dayMap[oldId];
        delete dayMap[oldId];
        modified = true;
      }
    }

    if (Object.keys(dayMap).length === 0) {
      delete map[dateISO];
      modified = true;
    }
  }

  if (modified) writeStorage(map);
  try {
    window.localStorage.setItem(MIGRATION_V2_KEY, "done");
  } catch {
    /* ignore */
  }
}
