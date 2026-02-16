"use client";

import LiXiConfetti from "./li-xi-confetti";

interface LiXiEnvelopeProps {
  id: number;
  position: { top: string; left: string };
  blessing: string;
  isOpened: boolean;
  isDisabled: boolean;
  onPick: (id: number) => void;
}

export default function LiXiEnvelope({
  id,
  position,
  blessing,
  isOpened,
  isDisabled,
  onPick,
}: LiXiEnvelopeProps) {
  const interactive = !isOpened && !isDisabled;

  const handleClick = () => {
    if (interactive) onPick(id);
  };

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ top: position.top, left: position.left, perspective: "600px" }}
    >
      <button
        onClick={handleClick}
        disabled={isDisabled}
        aria-label={isOpened ? `Lì xì: ${blessing}` : "Bốc lì xì"}
        className={`
          relative block transition-all duration-300 outline-none
          focus-visible:ring-4 focus-visible:ring-tet-gold-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded
          ${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"}
          ${isDisabled ? "opacity-30" : ""}
        `}
        style={{
          animation: isOpened
            ? "envelope-scale 0.5s ease-out forwards"
            : interactive
              ? "wobble 2s ease-in-out infinite"
              : undefined,
        }}
      >
        {/* Envelope SVG — enhanced with gradients, ornate border, 福 character */}
        <svg
          width="56"
          height="72"
          viewBox="0 0 56 72"
          className="drop-shadow-lg md:w-[64px] md:h-[82px]"
        >
          <defs>
            <linearGradient id={`gold-g-${id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FFA500" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
            <linearGradient id={`red-g-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
          </defs>

          {/* Envelope body with red gradient */}
          <rect
            x="2" y="16" width="52" height="54" rx="4"
            fill={`url(#red-g-${id})`}
            stroke={`url(#gold-g-${id})`}
            strokeWidth="1.5"
          />

          {/* Ornate gold inner border — dashed */}
          <rect
            x="8" y="22" width="40" height="42" rx="2"
            fill="none"
            stroke={`url(#gold-g-${id})`}
            strokeWidth="0.8"
            strokeDasharray="3 2"
            opacity="0.6"
          />

          {/* Corner decorations — small circles at 4 corners of inner border */}
          <circle cx="10" cy="24" r="2" fill="#FFD700" opacity="0.5" />
          <circle cx="46" cy="24" r="2" fill="#FFD700" opacity="0.5" />
          <circle cx="10" cy="62" r="2" fill="#FFD700" opacity="0.5" />
          <circle cx="46" cy="62" r="2" fill="#FFD700" opacity="0.5" />

          {/* Inner glow line */}
          <rect
            x="5" y="19" width="46" height="48" rx="3"
            fill="none" stroke="#FFD700" strokeWidth="0.3" opacity="0.3"
          />

          {/* Centered 福 character */}
          <text
            x="28" y="46"
            fontSize="18"
            fill={`url(#gold-g-${id})`}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="serif"
            fontWeight="bold"
          >
            福
          </text>

          {/* Envelope flap — triangle with multi-stage opening */}
          <path
            d="M2 16 L28 0 L54 16 Z"
            fill={isOpened ? "#991B1B" : `url(#red-g-${id})`}
            stroke={`url(#gold-g-${id})`}
            strokeWidth="1.5"
            style={{
              transformOrigin: "50% 100%",
              animation: isOpened ? "envelope-open 0.6s ease-out forwards" : undefined,
            }}
          />
        </svg>

        {/* Confetti burst on open */}
        <LiXiConfetti isActive={isOpened} />

        {/* Blessing text — revealed after flap animation */}
        {isOpened && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ animation: "blessing-reveal 0.6s ease-out 0.5s both" }}
          >
            <span
              className="text-tet-gold-primary font-bold text-[11px] md:text-xs text-center leading-tight px-1 drop-shadow-md line-clamp-2"
              style={{ textShadow: "0 0 12px var(--tet-glow-gold)" }}
            >
              {blessing}
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
