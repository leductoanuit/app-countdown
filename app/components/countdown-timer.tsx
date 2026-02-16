"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/* Target: Tết Bính Ngọ - Feb 17, 2026 00:00:00 Vietnam time (UTC+7) */
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

const TIME_UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Ngày" },
  { key: "hours", label: "Giờ" },
  { key: "minutes", label: "Phút" },
  { key: "seconds", label: "Giây" },
];

export default function CountdownTimer() {
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

  /* Avoid hydration mismatch — render nothing until client-mounted */
  if (!mounted) return null;

  /* Celebration state: countdown reached zero */
  if (timeLeft === null) {
    return (
      <div
        className="text-center space-y-6"
        style={{ animation: "fadeIn 1s ease-out" }}
      >
        <h1
          className="text-4xl md:text-7xl font-bold text-tet-gold-primary"
          style={{ animation: "glow 2s ease-in-out infinite" }}
        >
          🐴 Chúc Mừng Năm Mới! 🐴
        </h1>
        <p className="text-2xl md:text-4xl text-tet-red-primary font-semibold">
          Tết Bính Ngọ 2026
        </p>
        <p className="text-lg md:text-xl text-tet-gold-secondary">
          Happy Lunar New Year &mdash; Year of the Horse!
        </p>
      </div>
    );
  }

  /* Active countdown */
  return (
    <div
      className="text-center space-y-10"
      style={{ animation: "fadeIn 0.8s ease-out" }}
    >
      {/* Greeting */}
      <div className="space-y-3">
        <h1
          className="text-3xl md:text-6xl font-bold text-tet-red-primary"
          style={{ animation: "glow 3s ease-in-out infinite" }}
        >
          Chúc Mừng Năm Mới
        </h1>
        <p className="text-xl md:text-3xl text-tet-gold-primary font-semibold">
          🐴 Tết Bính Ngọ 2026
        </p>
      </div>

      {/* Countdown grid */}
      <div
        className="grid grid-cols-4 gap-3 md:gap-6 max-w-3xl mx-auto"
        role="timer"
        aria-label="Countdown to Lunar New Year 2026"
      >
        {TIME_UNITS.map(({ key, label }) => (
          <div
            key={key}
            className="rounded-xl border-2 border-tet-gold-primary/40 bg-black/40 backdrop-blur-sm p-3 md:p-6"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          >
            <span className="block text-3xl md:text-6xl font-bold text-tet-gold-primary tabular-nums">
              {String(timeLeft[key]).padStart(2, "0")}
            </span>
            <span className="block text-xs md:text-base text-tet-gold-secondary mt-1 uppercase tracking-wider">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Subheading */}
      <p className="text-base md:text-lg text-tet-red-secondary/80">
        Year of the Horse
      </p>
    </div>
  );
}
