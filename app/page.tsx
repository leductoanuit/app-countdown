import Link from "next/link";
import CountdownTimer from "./components/countdown-timer";
import FallingParticles from "./components/falling-particles";
import MaiTreeLiXiSection from "./components/mai-tree-li-xi-section";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center px-4 overflow-hidden">
      {/* Decorative falling flowers — background layer */}
      <FallingParticles />

      {/* Countdown section — centered in viewport */}
      <main className="relative z-10 w-full max-w-4xl flex-1 flex items-center justify-center">
        <CountdownTimer />
      </main>

      {/* Lì xì section — below countdown */}
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
