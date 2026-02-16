"use client";

import { useMemo } from "react";

interface Particle {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: number;
  symbol: string;
}

const FLOWERS = ["🌸", "🏵️", "🌺"];
const PARTICLE_COUNT = 18;

export default function FallingParticles() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      left: `${(i / PARTICLE_COUNT) * 100 + Math.random() * 5}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${8 + Math.random() * 7}s`,
      size: 1.2 + Math.random() * 1,
      symbol: FLOWERS[i % FLOWERS.length],
    }));
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute opacity-60"
          style={{
            left: p.left,
            top: "-5%",
            fontSize: `${p.size}rem`,
            animation: `fall ${p.duration} linear ${p.delay} infinite`,
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}
