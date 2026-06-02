import {
  dayKeyForDate,
  mondayOfWeek,
  parseISODate,
  shiftWeekStart,
  toISODate,
  todayISO,
} from "./dates";
import type { Weekday } from "./dates";
import { allTaskIdsForDay } from "../data/plan";
import { dayProgress, type ProgressMap } from "./storage";

export const HISTORY_WEEKS = 12;
export const HISTORY_DAYS = HISTORY_WEEKS * 7;

export interface HistoryCell {
  dateISO: string;
  weekday: Weekday;
  weekIndex: number;
  done: number;
  total: number;
  percent: number;
  level: 0 | 1 | 2 | 3 | 4;
  isFuture: boolean;
  isToday: boolean;
}

export interface HistoryStats {
  daysWithTraining: number;
  totalDone: number;
  averagePerTrainingDay: number;
}

function levelFor(percent: number): 0 | 1 | 2 | 3 | 4 {
  if (percent <= 0) return 0;
  if (percent <= 25) return 1;
  if (percent <= 50) return 2;
  if (percent <= 75) return 3;
  return 4;
}

export function buildHistoryGrid(progress: ProgressMap): {
  weekStarts: string[];
  cells: HistoryCell[];
} {
  const today = todayISO();
  const currentWeekMonday = toISODate(mondayOfWeek(new Date()));
  const oldestWeekStart = shiftWeekStart(currentWeekMonday, -(HISTORY_WEEKS - 1));
  const weekStarts: string[] = [];
  for (let i = 0; i < HISTORY_WEEKS; i++) {
    weekStarts.push(shiftWeekStart(oldestWeekStart, i));
  }
  const cells: HistoryCell[] = [];
  for (let weekIndex = 0; weekIndex < HISTORY_WEEKS; weekIndex++) {
    const monday = parseISODate(weekStarts[weekIndex]);
    for (let d = 0; d < 7; d++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + d);
      const dateISO = toISODate(date);
      const weekday = d as Weekday;
      const dayKey = dayKeyForDate(dateISO);
      const taskIds = allTaskIdsForDay(dayKey);
      const { done, total } = dayProgress(progress, dateISO, taskIds);
      const percent = total > 0 ? (done / total) * 100 : 0;
      cells.push({
        dateISO,
        weekday,
        weekIndex,
        done,
        total,
        percent,
        level: levelFor(percent),
        isFuture: dateISO > today,
        isToday: dateISO === today,
      });
    }
  }
  return { weekStarts, cells };
}

export function historyStats(cells: HistoryCell[]): HistoryStats {
  let daysWithTraining = 0;
  let totalDone = 0;
  for (const cell of cells) {
    if (cell.isFuture) continue;
    if (cell.done > 0) daysWithTraining += 1;
    totalDone += cell.done;
  }
  const averagePerTrainingDay = daysWithTraining > 0 ? totalDone / daysWithTraining : 0;
  return { daysWithTraining, totalDone, averagePerTrainingDay };
}

const CZECH_MONTH_SHORT = [
  "led",
  "úno",
  "bře",
  "dub",
  "kvě",
  "čer",
  "čvc",
  "srp",
  "zář",
  "říj",
  "lis",
  "pro",
];

export function monthLabelForWeek(weekStartISO: string): string | null {
  const monday = parseISODate(weekStartISO);
  for (let d = 0; d < 7; d++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + d);
    if (date.getDate() === 1) {
      return CZECH_MONTH_SHORT[date.getMonth()];
    }
  }
  return null;
}
