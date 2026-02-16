"use client";

import { useState, useMemo, useCallback } from "react";
import MaiTree from "./mai-tree";
import LiXiEnvelope from "./li-xi-envelope";

/* 20 Vietnamese New Year blessings — shuffle 10 per session */
const BLESSINGS = [
  "Sức Khỏe Dồi Dào",
  "Năm Mới Dồi Dào Sức Khỏe",
  "Sống Lâu Trăm Tuổi",
  "Trường Thọ Khang Ninh",
  "Tài Lộc Đầy Nhà",
  "Phát Tài Phát Lộc",
  "Tấn Tài Tấn Lộc",
  "Năm Mới Tấn Tài Tấn Lộc",
  "Vạn Sự Hanh Thông",
  "Tiền Vô Như Nước",
  "An Khang Thịnh Vượng",
  "Vạn Sự Như Ý",
  "Năm Mới Toàn Gia Bình An",
  "Cung Chúc Tân Xuân",
  "Thăng Quan Tiến Chức",
  "Công Thành Danh Toại",
  "Vui Vẻ Hạnh Phúc",
  "Gia Đình Sum Vầy",
  "Học Tập Tốt, Tiến Bộ",
  "Chúc Hay Ăn Chóng Lớn",
];

/* 10 envelope positions aligned to redesigned tree branch tips */
const ENVELOPE_POSITIONS = [
  { top: "18%", left: "27%" },  // upper-left branch tip
  { top: "12%", left: "45%" },  // center-top branch tip
  { top: "18%", left: "72%" },  // upper-right branch tip
  { top: "30%", left: "17%" },  // mid-left branch
  { top: "28%", left: "38%" },  // mid-left inner
  { top: "28%", left: "62%" },  // mid-right inner
  { top: "30%", left: "83%" },  // mid-right branch
  { top: "45%", left: "22%" },  // lower-left sub-branch
  { top: "42%", left: "50%" },  // lower-center
  { top: "45%", left: "78%" },  // lower-right sub-branch
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

  /* Shuffle blessings on mount, take first 10 for 10 envelopes */
  const shuffledBlessings = useMemo(() => shuffle(BLESSINGS).slice(0, 10), []);

  const handlePick = useCallback((id: number) => {
    setPickedId((prev) => (prev === null ? id : prev));
  }, []);

  return (
    <section className="w-full py-12 text-center">
      <h2
        className="text-2xl md:text-4xl font-bold text-tet-gold-primary mb-2"
        style={{ animation: "glow 3s ease-in-out infinite" }}
      >
        🧧 Bốc Lì Xì Trên Cây Mai
      </h2>
      <p className="text-sm md:text-base text-tet-gold-secondary/70 mb-8">
        Chọn một phong bao để nhận lời chúc may mắn
      </p>

      {/* Tree + envelopes container — wider for 10 envelopes */}
      <div className="relative mx-auto w-full max-w-md md:max-w-lg aspect-[4/5]">
        <MaiTree className="absolute inset-0 w-full h-full" />

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

      {/* Picked blessing display */}
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
