"use client";

import { useState, useEffect } from "react";

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/* Target: Tết Bính Ngọ — Feb 17, 2026 00:00:00 Vietnam time (UTC+7) */
const TARGET_DATE = new Date("2026-02-17T00:00:00+07:00");

function calculateTimeLeft(): TimeLeft | null {
  const difference = TARGET_DATE.getTime() - Date.now();
  if (difference <= 0) return null;

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

/**
 * Shared countdown hook.
 * Returns { timeLeft, isTet, mounted } so page can conditionally render
 * greeting vs countdown layout.
 */
export function useTetCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return {
    timeLeft,
    isTet: mounted && timeLeft === null,
    mounted,
  };
}
