/* Stylized mai (apricot blossom) tree — pure SVG, no external assets */
import MaiTreeFilters from "./mai-tree-filters";

interface MaiTreeProps {
  className?: string;
}

/* Individual 5-petal blossom at given center with size tiers */
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
        fill="url(#petal-gradient)"
        opacity={0.92}
      />
    );
  });
  return (
    <g className="mai-blossom" filter="url(#blossom-glow)">
      {petals}
      <circle cx={cx} cy={cy} r={r * 0.25} fill="#f59e0b" />
    </g>
  );
}

/* Small bud accent */
function Bud({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={3} ry={4.5} fill="#fbbf24" opacity={0.7} />
      <ellipse cx={cx} cy={cy - 2} rx={2} ry={2.5} fill="#f59e0b" opacity={0.5} />
    </g>
  );
}

/* Small leaf on sub-branches */
function Leaf({ cx, cy, angle = 0 }: { cx: number; cy: number; angle?: number }) {
  return (
    <g className="mai-leaf" transform={`rotate(${angle}, ${cx}, ${cy})`}>
      <ellipse cx={cx} cy={cy} rx={3} ry={6} fill="#4a7c3f" opacity={0.7} />
      <ellipse cx={cx + 1} cy={cy} rx={2} ry={5} fill="#6aad5a" opacity={0.5} />
    </g>
  );
}

/* 22 blossom positions: 5 large, 10 medium, 7 small */
const BLOSSOMS = [
  /* Large — branch tips */
  { cx: 105, cy: 85, r: 12 }, { cx: 290, cy: 95, r: 11 },
  { cx: 175, cy: 50, r: 11 }, { cx: 65, cy: 140, r: 10 }, { cx: 330, cy: 150, r: 10 },
  /* Medium — along branches */
  { cx: 140, cy: 120, r: 9 }, { cx: 250, cy: 130, r: 8 }, { cx: 195, cy: 90, r: 8 },
  { cx: 85, cy: 185, r: 9 }, { cx: 310, cy: 190, r: 8 }, { cx: 160, cy: 170, r: 8 },
  { cx: 240, cy: 175, r: 9 }, { cx: 120, cy: 230, r: 8 }, { cx: 280, cy: 225, r: 8 },
  { cx: 210, cy: 145, r: 7 },
  /* Small — near junctions */
  { cx: 185, cy: 195, r: 6 }, { cx: 215, cy: 200, r: 6 }, { cx: 130, cy: 155, r: 5 },
  { cx: 270, cy: 160, r: 6 }, { cx: 150, cy: 250, r: 5 }, { cx: 260, cy: 245, r: 6 },
  { cx: 200, cy: 225, r: 5 },
];

/* 12 bud positions */
const BUDS = [
  { cx: 115, cy: 110 }, { cx: 275, cy: 115 }, { cx: 190, cy: 75 },
  { cx: 75, cy: 165 }, { cx: 325, cy: 170 }, { cx: 155, cy: 140 },
  { cx: 245, cy: 150 }, { cx: 100, cy: 215 }, { cx: 305, cy: 210 },
  { cx: 170, cy: 210 }, { cx: 230, cy: 210 }, { cx: 200, cy: 175 },
];

/* 9 leaf positions on sub-branches */
const LEAVES = [
  { cx: 95, cy: 195, angle: -30 }, { cx: 315, cy: 200, angle: 25 },
  { cx: 135, cy: 245, angle: -20 }, { cx: 265, cy: 240, angle: 15 },
  { cx: 165, cy: 265, angle: -10 }, { cx: 235, cy: 260, angle: 10 },
  { cx: 75, cy: 235, angle: -35 }, { cx: 320, cy: 235, angle: 30 },
  { cx: 200, cy: 55, angle: 5 },
];

/* 4 falling petals */
const FALLING_PETALS = [
  { cx: 130, cy: 30, delay: "0s" }, { cx: 250, cy: 15, delay: "1.2s" },
  { cx: 180, cy: 20, delay: "2.5s" }, { cx: 300, cy: 35, delay: "3.8s" },
];

export default function MaiTree({ className }: MaiTreeProps) {
  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <MaiTreeFilters />

      {/* Trunk — curved path with gradient */}
      <path
        d="M200 490 Q195 400 190 340 Q185 280 200 240"
        stroke="url(#trunk-gradient)" strokeWidth="18" fill="none" strokeLinecap="round"
      />
      <path
        d="M200 490 Q205 400 205 340 Q200 280 200 240"
        stroke="#654321" strokeWidth="10" fill="none" strokeLinecap="round" opacity={0.4}
      />

      {/* Main branches — 11 total with sway animation */}
      <g className="mai-branch" style={{ transformOrigin: "200px 240px", animationDelay: "0s" }}>
        <path d="M200 240 Q160 195 105 85" stroke="url(#trunk-gradient)" strokeWidth="8" fill="none" strokeLinecap="round" />
      </g>
      <g className="mai-branch" style={{ transformOrigin: "200px 240px", animationDelay: "0.3s" }}>
        <path d="M200 240 Q245 185 290 95" stroke="url(#trunk-gradient)" strokeWidth="8" fill="none" strokeLinecap="round" />
      </g>
      <g className="mai-branch" style={{ transformOrigin: "195px 300px", animationDelay: "0.6s" }}>
        <path d="M195 300 Q145 255 65 140" stroke="url(#branch-gradient)" strokeWidth="6" fill="none" strokeLinecap="round" />
      </g>
      <g className="mai-branch" style={{ transformOrigin: "205px 300px", animationDelay: "0.9s" }}>
        <path d="M205 300 Q265 245 330 150" stroke="url(#branch-gradient)" strokeWidth="6" fill="none" strokeLinecap="round" />
      </g>
      <g className="mai-branch" style={{ transformOrigin: "200px 240px", animationDelay: "0.15s" }}>
        <path d="M200 240 Q192 175 175 50" stroke="url(#branch-gradient)" strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>
      {/* Lower branches */}
      <g className="mai-branch" style={{ transformOrigin: "192px 330px", animationDelay: "1.1s" }}>
        <path d="M192 330 Q140 295 80 235" stroke="url(#branch-gradient)" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      <g className="mai-branch" style={{ transformOrigin: "208px 330px", animationDelay: "1.3s" }}>
        <path d="M208 330 Q260 295 320 235" stroke="url(#branch-gradient)" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      {/* Sub-branches for fullness */}
      <path d="M150 185 Q130 165 110 170" stroke="url(#branch-gradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M250 180 Q270 160 290 165" stroke="url(#branch-gradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M120 220 Q100 230 75 235" stroke="url(#branch-gradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M280 215 Q300 225 320 235" stroke="url(#branch-gradient)" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Blossoms with staggered shimmer */}
      {BLOSSOMS.map((b, i) => (
        <g key={`b-${i}`} className="mai-shimmer" style={{ animationDelay: `${(i * 0.2) % 3}s` }}>
          <Blossom cx={b.cx} cy={b.cy} r={b.r} />
        </g>
      ))}

      {/* Buds */}
      {BUDS.map((b, i) => (
        <Bud key={`bud-${i}`} cx={b.cx} cy={b.cy} />
      ))}

      {/* Leaves */}
      {LEAVES.map((l, i) => (
        <Leaf key={`leaf-${i}`} cx={l.cx} cy={l.cy} angle={l.angle} />
      ))}

      {/* Falling petals */}
      {FALLING_PETALS.map((p, i) => (
        <ellipse
          key={`petal-${i}`}
          cx={p.cx}
          cy={p.cy}
          rx={4}
          ry={2.5}
          fill="url(#falling-petal-gradient)"
          className="mai-falling-petal"
          style={{ animationDelay: p.delay }}
        />
      ))}
    </svg>
  );
}
