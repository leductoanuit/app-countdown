"use client";

import Link from "next/link";
import { useTetCountdown } from "./hooks/use-tet-countdown";
import CountdownTimer from "./components/countdown-timer";
import FallingParticles from "./components/falling-particles";
import FireworksConfetti from "./components/fireworks-confetti";
import MaiTreeLiXiSection from "./components/mai-tree-li-xi-section";
import TetGreetingContent from "./components/tet-greeting-content";
import LunarDateHeader from "./components/lunar-date-header";

export default function Home() {
  const { timeLeft, isTet, mounted } = useTetCountdown();

  /* Avoid hydration mismatch — render nothing until client-mounted */
  if (!mounted) return null;

  return (
    <div className="relative min-h-screen flex flex-col items-center px-4 overflow-hidden">
      {/* Lunar calendar date */}
      <LunarDateHeader />

      {/* Background layer: fireworks when Tet, falling flowers otherwise */}
      {isTet ? <FireworksConfetti /> : <FallingParticles />}

      {/* Main content — centered in viewport */}
      <main className="relative z-10 w-full max-w-4xl flex-1 flex items-center justify-center">
        {isTet ? (
          <TetGreetingContent />
        ) : (
          timeLeft && <CountdownTimer timeLeft={timeLeft} />
        )}
      </main>

      {/* Lì xì section */}
      <section className="relative z-10 w-full max-w-4xl pb-16">
        <MaiTreeLiXiSection />
      </section>

      {/* Fortune telling CTA */}
      <section className="relative z-10 w-full max-w-4xl pb-16 text-center">
        <Link
          href="/xem-boi"
          className="inline-block px-8 py-4 rounded-xl border-2 border-tet-gold-primary/60 bg-black/40 backdrop-blur-sm text-tet-gold-primary font-bold text-xl hover:border-tet-gold-primary hover:bg-tet-gold-primary/10 transition-all"
          style={{ animation: "pulse 2s ease-in-out infinite" }}
        >
          🔮 Xem Bói Năm Mới
        </Link>
        <p className="text-sm text-tet-gold-secondary/50 mt-3">
          Khám phá vận mệnh năm Bính Ngọ 2026
        </p>
      </section>
    </div>
  );
}
