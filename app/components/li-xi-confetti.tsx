/* CSS-only confetti burst — 10 particles radiating outward on envelope open */

interface LiXiConfettiProps {
  isActive: boolean;
}

/* Pre-computed particle trajectories (avoiding CSS trig functions for compatibility) */
const PARTICLES = [
  { tx: "40px", ty: "-50px", color: "#FFD700", delay: "0s" },
  { tx: "-35px", ty: "-45px", color: "#DC2626", delay: "0.03s" },
  { tx: "50px", ty: "-15px", color: "#FFD700", delay: "0.06s" },
  { tx: "-50px", ty: "-20px", color: "#DC2626", delay: "0.09s" },
  { tx: "25px", ty: "-60px", color: "#FFD700", delay: "0.12s" },
  { tx: "-20px", ty: "-55px", color: "#DC2626", delay: "0.15s" },
  { tx: "55px", ty: "10px", color: "#FFD700", delay: "0.18s" },
  { tx: "-45px", ty: "5px", color: "#DC2626", delay: "0.21s" },
  { tx: "10px", ty: "-65px", color: "#FFD700", delay: "0.24s" },
  { tx: "-10px", ty: "20px", color: "#DC2626", delay: "0.27s" },
];

export default function LiXiConfetti({ isActive }: LiXiConfettiProps) {
  if (!isActive) return null;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute w-[6px] h-[6px] rounded-sm envelope-confetti-particle"
          style={{
            backgroundColor: p.color,
            animationDelay: p.delay,
            "--tx-start": "0px",
            "--ty-start": "0px",
            "--tx-end": p.tx,
            "--ty-end": p.ty,
            animation: `confetti-burst 0.8s ease-out ${p.delay} forwards`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
