/* SVG filter definitions and gradients for the mai tree */
export default function MaiTreeFilters() {
  return (
    <defs>
      {/* Soft glow filter for blossoms */}
      <filter id="blossom-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      {/* Trunk gradient: dark brown base to medium brown */}
      <linearGradient id="trunk-gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#5D3A1A" />
        <stop offset="50%" stopColor="#8B4513" />
        <stop offset="100%" stopColor="#6B3410" />
      </linearGradient>

      {/* Branch gradient: medium to lighter brown for thinner branches */}
      <linearGradient id="branch-gradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#8B4513" />
        <stop offset="100%" stopColor="#A0522D" />
      </linearGradient>

      {/* Petal radial gradient: bright center to warm edge */}
      <radialGradient id="petal-gradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFED4A" />
        <stop offset="100%" stopColor="#F59E0B" />
      </radialGradient>

      {/* Petal fill for falling petals */}
      <radialGradient id="falling-petal-gradient" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.7" />
      </radialGradient>
    </defs>
  );
}
