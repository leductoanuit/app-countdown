"use client";

import { useSyncExternalStore } from "react";
import { LunarCalendar } from "@dqcai/vn-lunar";

/** Vietnamese lunar month names */
const LUNAR_MONTH_NAMES = [
  "Giêng", "Hai", "Ba", "Tư", "Năm", "Sáu",
  "Bảy", "Tám", "Chín", "Mười", "Mười Một", "Chạp",
];

/** Format lunar date as Vietnamese string, e.g. "Ngày 20 tháng Giêng năm Bính Ngọ" */
function formatVietnameseLunarDate(cal: LunarCalendar): string {
  const lunar = cal.lunarDate;
  const monthName = LUNAR_MONTH_NAMES[lunar.month - 1] ?? `${lunar.month}`;
  const leapSuffix = lunar.leap ? " (nhuận)" : "";
  return `Ngày ${lunar.day} tháng ${monthName}${leapSuffix} năm ${cal.yearCanChi}`;
}

/** Cached lunar date string — computed once on client */
let cachedLunarDate: string | null = null;

function subscribe() {
  return () => {};
}

function getSnapshot(): string | null {
  if (!cachedLunarDate) {
    cachedLunarDate = formatVietnameseLunarDate(LunarCalendar.today());
  }
  return cachedLunarDate;
}

function getServerSnapshot(): string | null {
  return null;
}

/**
 * Returns the current Vietnamese lunar date string.
 * Returns null on server to avoid hydration mismatch.
 */
export function useLunarDate(): string | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
