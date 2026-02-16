"use client";

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
      style={{ top: position.top, left: position.left, perspective: "400px" }}
    >
      <button
        onClick={handleClick}
        disabled={isDisabled}
        aria-label={isOpened ? `Lì xì: ${blessing}` : "Bốc lì xì"}
        className={`
          relative block transition-all duration-300 outline-none
          ${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"}
          ${isDisabled ? "opacity-30" : ""}
        `}
        style={{
          animation: interactive ? "wobble 2s ease-in-out infinite" : undefined,
        }}
      >
        {/* Envelope SVG */}
        <svg
          width="56"
          height="72"
          viewBox="0 0 56 72"
          className="drop-shadow-lg md:w-[64px] md:h-[82px]"
        >
          {/* Envelope body */}
          <rect
            x="2"
            y="16"
            width="52"
            height="54"
            rx="4"
            fill="var(--tet-red-primary)"
            stroke="var(--tet-gold-primary)"
            strokeWidth="1.5"
          />
          {/* Gold border accent */}
          <rect
            x="8"
            y="22"
            width="40"
            height="42"
            rx="2"
            fill="none"
            stroke="var(--tet-gold-primary)"
            strokeWidth="0.8"
            opacity="0.5"
          />
          {/* Center gold decoration — diamond */}
          <path
            d="M28 33 L34 43 L28 53 L22 43 Z"
            fill="var(--tet-gold-primary)"
            opacity="0.8"
          />
          {/* Small "Phúc" dot accent */}
          <circle cx="28" cy="43" r="3" fill="var(--tet-gold-secondary)" />

          {/* Envelope flap — triangle at top */}
          <path
            d="M2 16 L28 0 L54 16 Z"
            fill={isOpened ? "var(--tet-red-secondary)" : "var(--tet-red-primary)"}
            stroke="var(--tet-gold-primary)"
            strokeWidth="1.5"
            className="origin-bottom transition-transform duration-500"
            style={{
              transformOrigin: "50% 100%",
              transform: isOpened ? "rotateX(180deg)" : "rotateX(0deg)",
            }}
          />
        </svg>

        {/* Blessing text — revealed after open */}
        {isOpened && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ animation: "blessing-reveal 0.6s ease-out 0.3s both" }}
          >
            <span
              className="text-tet-gold-primary font-bold text-[10px] md:text-xs text-center leading-tight px-1 drop-shadow-md"
              style={{
                textShadow: "0 0 12px var(--tet-glow-gold)",
              }}
            >
              {blessing}
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
