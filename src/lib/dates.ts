import type { DayKey } from "../data/types";

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const SHORT_WEEKDAYS: Record<Weekday, string> = {
  0: "Po",
  1: "Út",
  2: "St",
  3: "Čt",
  4: "Pá",
  5: "So",
  6: "Ne",
};

const LONG_WEEKDAYS: Record<Weekday, string> = {
  0: "pondělí",
  1: "úterý",
  2: "středa",
  3: "čtvrtek",
  4: "pátek",
  5: "sobota",
  6: "neděle",
};

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function fromISODate(iso: string): Date {
  return parseISODate(iso);
}

export function todayISO(): string {
  return toISODate(new Date());
}

function jsDayToWeekday(jsDay: number): Weekday {
  return ((jsDay + 6) % 7) as Weekday;
}

export function weekdayOf(dateISO: string): Weekday {
  return jsDayToWeekday(parseISODate(dateISO).getDay());
}

export function todayWeekday(): Weekday {
  return jsDayToWeekday(new Date().getDay());
}

export function mondayOfWeek(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const w = jsDayToWeekday(d.getDay());
  d.setDate(d.getDate() - w);
  return d;
}

export function weekDatesFor(date: Date): string[] {
  const monday = mondayOfWeek(date);
  const out: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    out.push(toISODate(d));
  }
  return out;
}

export function currentWeekDates(): string[] {
  return weekDatesFor(new Date());
}

export function previousWeekDates(): string[] {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  return weekDatesFor(d);
}

export function currentWeekMondayISO(): string {
  return toISODate(mondayOfWeek(new Date()));
}

export function shiftWeekStart(weekStartISO: string, deltaWeeks: number): string {
  const d = parseISODate(weekStartISO);
  d.setDate(d.getDate() + deltaWeeks * 7);
  return toISODate(d);
}

export function lastNDays(n: number): string[] {
  const out: string[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    out.push(toISODate(d));
  }
  return out;
}

export function isoWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - dayNum + 3);
  const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const firstThursdayDayNum = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstThursdayDayNum + 3);
  const diff = d.getTime() - firstThursday.getTime();
  return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000));
}

export function dayKeyForWeekday(w: Weekday): DayKey {
  switch (w) {
    case 0: return "po-pa";
    case 1: return "ut-ct";
    case 2: return "st";
    case 3: return "ut-ct";
    case 4: return "po-pa";
    case 5: return "so-ne";
    case 6: return "so-ne";
  }
}

export function dayKeyForDate(dateISO: string): DayKey {
  return dayKeyForWeekday(weekdayOf(dateISO));
}

export function defaultTabForToday(): DayKey {
  return dayKeyForWeekday(todayWeekday());
}

export function shortWeekday(w: Weekday): string {
  return SHORT_WEEKDAYS[w];
}

export function longWeekday(w: Weekday): string {
  return LONG_WEEKDAYS[w];
}

export function formatDayLabel(dateISO: string): string {
  if (dateISO === todayISO()) {
    const w = weekdayOf(dateISO);
    return `Dnes je ${LONG_WEEKDAYS[w]}`;
  }
  const d = parseISODate(dateISO);
  return `Vybráno: ${d.getDate()}. ${d.getMonth() + 1}.`;
}

export function formatWeekRange(weekDates: string[]): string {
  if (weekDates.length === 0) return "";
  const first = parseISODate(weekDates[0]);
  const last = parseISODate(weekDates[weekDates.length - 1]);
  const wn = isoWeekNumber(first);
  const from = `${first.getDate()}. ${first.getMonth() + 1}.`;
  const to = `${last.getDate()}. ${last.getMonth() + 1}.`;
  return `Týden ${wn} · ${from} – ${to}`;
}

export function formatShortDate(dateISO: string): string {
  const d = parseISODate(dateISO);
  return `${d.getDate()}. ${d.getMonth() + 1}.`;
}
