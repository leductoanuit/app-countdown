"use client";

import { useState, useMemo } from "react";
import MaiTree from "./mai-tree";
import LiXiEnvelope from "./li-xi-envelope";

/* Vietnamese New Year blessings — 7 options, 6 used per visit */
const BLESSINGS = [
  "Phát Tài Phát Lộc",
  "An Khang Thịnh Vượng",
  "Vạn Sự Như Ý",
  "Sức Khỏe Dồi Dào",
  "Năm Mới Phát Tài",
  "Tấn Tài Tấn Lộc",
  "Cung Chúc Tân Xuân",
];

/* Envelope positions (%) aligned to mai tree branch endpoints (SVG viewBox 400x500) */
const ENVELOPE_POSITIONS = [
  { top: "22%", left: "30%" },  // upper-left branch
  { top: "18%", left: "68%" },  // upper-right branch
  { top: "38%", left: "20%" },  // mid-left branch
  { top: "35%", left: "78%" },  // mid-right branch
  { top: "52%", left: "38%" },  // lower-left twig
  { top: "50%", left: "62%" },  // lower-right twig
];

/* Fisher-Yates shuffle — returns new array */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MaiTreeLiXiSection() {
  const [pickedId, setPickedId] = useState<number | null>(null);

  /* Shuffle blessings on mount, take first 6 for 6 envelopes */
  const shuffledBlessings = useMemo(() => shuffle(BLESSINGS).slice(0, 6), []);

  const handlePick = (id: number) => {
    if (pickedId === null) setPickedId(id);
  };

  return (
    <section className="w-full py-12 text-center">
      {/* Section heading */}
      <h2
        className="text-2xl md:text-4xl font-bold text-tet-gold-primary mb-2"
        style={{ animation: "glow 3s ease-in-out infinite" }}
      >
        🧧 Bốc Lì Xì Trên Cây Mai
      </h2>
      <p className="text-sm md:text-base text-tet-gold-secondary/70 mb-8">
        Chọn một phong bao để nhận lời chúc may mắn
      </p>

      {/* Tree + envelopes container */}
      <div className="relative mx-auto w-full max-w-sm md:max-w-md aspect-[4/5]">
        {/* Mai tree backdrop */}
        <MaiTree className="absolute inset-0 w-full h-full" />

        {/* Envelopes positioned on branches */}
        {ENVELOPE_POSITIONS.map((pos, i) => (
          <LiXiEnvelope
            key={i}
            id={i}
            position={pos}
            blessing={shuffledBlessings[i]}
            isOpened={pickedId === i}
            isDisabled={pickedId !== null && pickedId !== i}
            onPick={handlePick}
          />
        ))}
      </div>

      {/* Picked blessing display — larger text below tree */}
      {pickedId !== null && (
        <div
          className="mt-8"
          style={{ animation: "blessing-reveal 0.8s ease-out 0.5s both" }}
        >
          <p
            className="text-xl md:text-3xl font-bold text-tet-gold-primary"
            style={{ textShadow: "0 0 20px var(--tet-glow-gold)" }}
          >
            ✨ {shuffledBlessings[pickedId]} ✨
          </p>
        </div>
      )}
    </section>
  );
}
