import CountdownTimer from "./components/countdown-timer";
import FallingParticles from "./components/falling-particles";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Decorative falling flowers — background layer */}
      <FallingParticles />

      {/* Main countdown content — foreground layer */}
      <main className="relative z-10 w-full max-w-4xl">
        <CountdownTimer />
      </main>
    </div>
  );
}
