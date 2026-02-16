"use client";

import { useEffect, useRef } from "react";

/* Tet color palette for particles */
const COLORS = ["#dc2626", "#fbbf24", "#f59e0b", "#ef4444", "#fcd34d", "#ff6b35"];
const MAX_PARTICLES = 180;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
  /* 'firework' = rising rocket, 'spark' = explosion piece, 'confetti' = falling piece */
  type: "firework" | "spark" | "confetti";
  rotation: number;
  rotationSpeed: number;
}

function createConfettiParticle(canvasW: number): Particle {
  return {
    x: Math.random() * canvasW,
    y: -10,
    vx: (Math.random() - 0.5) * 1.5,
    vy: 1.5 + Math.random() * 2,
    alpha: 0.8 + Math.random() * 0.2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 3 + Math.random() * 4,
    decay: 0.0003,
    type: "confetti",
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.1,
  };
}

function createFireworkRocket(canvasW: number, canvasH: number): Particle {
  return {
    x: canvasW * 0.2 + Math.random() * canvasW * 0.6,
    y: canvasH,
    vx: (Math.random() - 0.5) * 2,
    vy: -(8 + Math.random() * 4),
    alpha: 1,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 3,
    decay: 0,
    type: "firework",
    rotation: 0,
    rotationSpeed: 0,
  };
}

function explodeFirework(p: Particle): Particle[] {
  const sparks: Particle[] = [];
  const count = 25 + Math.floor(Math.random() * 20);
  const baseColor = COLORS[Math.floor(Math.random() * COLORS.length)];
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
    const speed = 2 + Math.random() * 4;
    sparks.push({
      x: p.x,
      y: p.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color: Math.random() > 0.3 ? baseColor : COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 1.5 + Math.random() * 2,
      decay: 0.015 + Math.random() * 0.01,
      type: "spark",
      rotation: 0,
      rotationSpeed: 0,
    });
  }
  return sparks;
}

export default function FireworksConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    let fireworkTimer = 0;
    let confettiTimer = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* Spawn initial confetti burst */
    for (let i = 0; i < 30; i++) {
      const p = createConfettiParticle(canvas.width);
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* Spawn fireworks every ~80 frames */
      fireworkTimer++;
      if (fireworkTimer > 60 + Math.random() * 60) {
        fireworkTimer = 0;
        if (particles.length < MAX_PARTICLES) {
          particles.push(createFireworkRocket(canvas.width, canvas.height));
        }
      }

      /* Spawn confetti steadily */
      confettiTimer++;
      if (confettiTimer > 8 && particles.length < MAX_PARTICLES) {
        confettiTimer = 0;
        particles.push(createConfettiParticle(canvas.width));
      }

      /* Update and draw each particle */
      const alive: Particle[] = [];
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.rotationSpeed;

        if (p.type === "firework") {
          /* Rocket decelerates; explode when slow enough */
          p.vy += 0.15;
          if (p.vy >= -1) {
            const sparks = explodeFirework(p);
            alive.push(...sparks);
            continue; /* remove rocket */
          }
          /* Draw rocket trail */
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        } else if (p.type === "spark") {
          /* Gravity on sparks */
          p.vy += 0.06;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
          ctx.globalAlpha = 1;
        } else {
          /* Confetti: small falling rectangles */
          p.vy += 0.01;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          ctx.restore();
          ctx.globalAlpha = 1;
        }

        /* Keep alive if visible */
        const inBounds = p.y < canvas.height + 20 && p.x > -20 && p.x < canvas.width + 20;
        if (p.alpha > 0.01 && inBounds) {
          alive.push(p);
        }
      }
      particles = alive;

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
