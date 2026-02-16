interface FortuneCategory {
  name: string;
  icon: string;
  rating: number;
  description: string;
}

interface FortuneResultProps {
  categories: FortuneCategory[];
  summary?: string;
  onReset: () => void;
}

/** Render star rating as filled/empty stars */
function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-tet-gold-primary text-lg" aria-label={`${rating} trên 5 sao`}>
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
}

export default function FortuneResult({ categories, summary, onReset }: FortuneResultProps) {
  return (
    <div style={{ animation: "fadeIn 0.8s ease-out" }}>
      {/* Category cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="rounded-xl border-2 border-tet-gold-primary/40 bg-black/40 backdrop-blur-sm p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{cat.icon}</span>
              <h3 className="text-lg font-bold text-tet-gold-primary">{cat.name}</h3>
            </div>
            <StarRating rating={Math.min(5, Math.max(1, cat.rating))} />
            <p className="mt-2 text-sm text-tet-gold-secondary/80 leading-relaxed">
              {cat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Summary */}
      {summary && (
        <p
          className="text-center text-lg text-tet-gold-primary font-semibold mb-6"
          style={{ textShadow: "0 0 15px var(--tet-glow-gold)" }}
        >
          ✨ {summary} ✨
        </p>
      )}

      {/* Reset button */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="px-6 py-2 rounded-lg border-2 border-tet-red-primary/60 text-tet-red-primary hover:bg-tet-red-primary/10 transition-colors cursor-pointer"
        >
          Xem lại cho người khác
        </button>
      </div>
    </div>
  );
}
