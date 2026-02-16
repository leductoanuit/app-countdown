"use client";

const WISHES = [
  "Phúc – Lộc – Thọ",
  "An Khang Thịnh Vượng",
  "Vạn Sự Như Ý",
];

/* Staggered fade-in delay per section (in ms) */
const STAGGER = [0, 200, 400, 600, 800];

export default function TetGreetingContent() {
  return (
    <div className="text-center space-y-8 px-4 max-w-2xl mx-auto">
      {/* Decorative top */}
      <p
        className="text-4xl md:text-5xl"
        style={{ animation: `fadeIn 0.8s ease-out ${STAGGER[0]}ms both` }}
      >
        🏮✨🏮
      </p>

      {/* Main heading */}
      <h1
        className="text-5xl md:text-8xl font-bold text-tet-gold-primary leading-tight"
        style={{ animation: `fadeIn 0.8s ease-out ${STAGGER[1]}ms both, glow 2s ease-in-out infinite` }}
      >
        Chúc Mừng Năm Mới
      </h1>

      {/* Subheading with horse */}
      <div
        className="space-y-2"
        style={{ animation: `fadeIn 0.8s ease-out ${STAGGER[2]}ms both` }}
      >
        <p className="text-3xl md:text-5xl">🐴</p>
        <p className="text-2xl md:text-4xl text-tet-red-primary font-semibold">
          Tết Bính Ngọ 2026
        </p>
        <p className="text-lg md:text-xl text-tet-gold-secondary">
          Year of the Horse
        </p>
      </div>

      {/* Wishes */}
      <div
        className="space-y-3 py-6 border-y border-tet-gold-primary/20"
        style={{ animation: `fadeIn 0.8s ease-out ${STAGGER[3]}ms both` }}
      >
        {WISHES.map((wish) => (
          <p
            key={wish}
            className="text-xl md:text-2xl text-tet-gold-primary font-medium tracking-wide"
          >
            🌸 {wish} 🌸
          </p>
        ))}
      </div>

      {/* Bottom greeting */}
      <p
        className="text-base md:text-lg text-tet-red-secondary/80 italic"
        style={{ animation: `fadeIn 0.8s ease-out ${STAGGER[4]}ms both` }}
      >
        Năm mới bình an, hạnh phúc và thành công! 🎊
      </p>
    </div>
  );
}
