/* Stylized mai (apricot blossom) tree — pure SVG, no external assets */
interface MaiTreeProps {
  className?: string;
}

/* Individual 5-petal blossom at given center */
function Blossom({ cx, cy, r = 8 }: { cx: number; cy: number; r?: number }) {
  const petals = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    const px = cx + Math.cos(angle) * r;
    const py = cy + Math.sin(angle) * r;
    return (
      <ellipse
        key={i}
        cx={px}
        cy={py}
        rx={r * 0.6}
        ry={r * 0.4}
        transform={`rotate(${i * 72}, ${px}, ${py})`}
        fill="#fbbf24"
        opacity={0.9}
      />
    );
  });

  return (
    <g>
      {petals}
      {/* Center pistil */}
      <circle cx={cx} cy={cy} r={r * 0.25} fill="#f59e0b" />
    </g>
  );
}

/* Small bud — simpler than full blossom */
function Bud({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={3} ry={4.5} fill="#fbbf24" opacity={0.7} />
      <ellipse cx={cx} cy={cy - 2} rx={2} ry={2.5} fill="#f59e0b" opacity={0.5} />
    </g>
  );
}

/* Blossom positions on branches */
const BLOSSOMS = [
  { cx: 120, cy: 100, r: 10 },
  { cx: 80, cy: 160, r: 8 },
  { cx: 150, cy: 180, r: 9 },
  { cx: 280, cy: 110, r: 10 },
  { cx: 310, cy: 170, r: 8 },
  { cx: 250, cy: 200, r: 9 },
  { cx: 180, cy: 60, r: 8 },
  { cx: 230, cy: 90, r: 7 },
  { cx: 100, cy: 250, r: 7 },
  { cx: 300, cy: 240, r: 8 },
];

/* Bud positions — smaller accents */
const BUDS = [
  { cx: 140, cy: 130 },
  { cx: 270, cy: 140 },
  { cx: 195, cy: 100 },
  { cx: 90, cy: 200 },
  { cx: 320, cy: 210 },
];

export default function MaiTree({ className }: MaiTreeProps) {
  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Trunk — curved brown path from bottom center upward */}
      <path
        d="M200 490 Q195 400 190 340 Q185 280 200 240"
        stroke="#8B4513"
        strokeWidth="18"
        fill="none"
        strokeLinecap="round"
      />
      {/* Secondary trunk thickness */}
      <path
        d="M200 490 Q205 400 205 340 Q200 280 200 240"
        stroke="#654321"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        opacity={0.5}
      />

      {/* Main branches */}
      {/* Left upper branch */}
      <path
        d="M200 240 Q160 200 120 100"
        stroke="#8B4513"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      {/* Right upper branch */}
      <path
        d="M200 240 Q240 190 280 110"
        stroke="#8B4513"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      {/* Left middle branch */}
      <path
        d="M195 300 Q150 260 80 160"
        stroke="#8B4513"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {/* Right middle branch */}
      <path
        d="M205 300 Q260 250 310 170"
        stroke="#8B4513"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {/* Center top branch */}
      <path
        d="M200 240 Q195 180 180 60"
        stroke="#8B4513"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Lower left twig */}
      <path
        d="M192 330 Q140 300 100 250"
        stroke="#8B4513"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Lower right twig */}
      <path
        d="M208 330 Q260 300 300 240"
        stroke="#8B4513"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* Blossoms */}
      {BLOSSOMS.map((b, i) => (
        <Blossom key={`blossom-${i}`} cx={b.cx} cy={b.cy} r={b.r} />
      ))}

      {/* Buds */}
      {BUDS.map((b, i) => (
        <Bud key={`bud-${i}`} cx={b.cx} cy={b.cy} />
      ))}
    </svg>
  );
}
