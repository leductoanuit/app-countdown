"use client";

import { useLunarDate } from "../hooks/use-lunar-date";

/** Displays current Vietnamese lunar date at the top of the page */
export default function LunarDateHeader() {
  const lunarDate = useLunarDate();

  if (!lunarDate) return null;

  return (
    <div className="relative z-10 w-full text-center pt-4 pb-2">
      <p className="text-sm md:text-base text-tet-gold-secondary/80 tracking-wide">
        🌙 {lunarDate}
      </p>
    </div>
  );
}
