"use client";

import type { TimeLeft } from "@/app/hooks/use-tet-countdown";

const TIME_UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Ngày" },
  { key: "hours", label: "Giờ" },
  { key: "minutes", label: "Phút" },
  { key: "seconds", label: "Giây" },
];

interface CountdownTimerProps {
  timeLeft: TimeLeft;
}

/** Presentational countdown — receives timeLeft from parent via hook */
export default function CountdownTimer({ timeLeft }: CountdownTimerProps) {
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
