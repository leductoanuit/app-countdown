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
    </div>
  );
}
