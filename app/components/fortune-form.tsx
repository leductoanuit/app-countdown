"use client";

import { useState } from "react";
import FortuneResult from "./fortune-result";

interface FortuneData {
  categories: { name: string; icon: string; rating: number; description: string }[];
  summary?: string;
}

export default function FortuneForm() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FortuneData | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/xem-boi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), birthDate }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Có lỗi xảy ra. Vui lòng thử lại.");
        return;
      }

      setResult(data);
    } catch {
      setError("Không thể kết nối. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setName("");
    setBirthDate("");
  };

  /* Show result if available */
  if (result) {
    return <FortuneResult categories={result.categories} summary={result.summary} onReset={handleReset} />;
  }

  /* Loading state */
  if (loading) {
    return (
      <div className="text-center py-12" style={{ animation: "pulse 1.5s ease-in-out infinite" }}>
        <p className="text-4xl mb-4">🔮</p>
        <p className="text-xl text-tet-gold-primary font-semibold">Đang xem bói...</p>
        <p className="text-sm text-tet-gold-secondary/60 mt-2">Thầy đang luận quẻ cho bạn</p>
      </div>
    );
  }

  /* Form */
  return (
    <form onSubmit={handleSubmit} className="space-y-5" style={{ animation: "fadeIn 0.6s ease-out" }}>
      {/* Name input */}
      <div>
        <label htmlFor="fortune-name" className="block text-sm text-tet-gold-secondary mb-1">
          Tên của bạn
        </label>
        <input
          id="fortune-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên của bạn"
          required
          maxLength={50}
          className="w-full px-4 py-3 rounded-lg bg-black/50 border-2 border-tet-gold-primary/40 text-foreground placeholder:text-foreground/30 focus:border-tet-gold-primary focus:outline-none transition-colors"
        />
      </div>

      {/* Birth date input */}
      <div>
        <label htmlFor="fortune-date" className="block text-sm text-tet-gold-secondary mb-1">
          Ngày sinh
        </label>
        <input
          id="fortune-date"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
          max="2026-02-16"
          className="w-full px-4 py-3 rounded-lg bg-black/50 border-2 border-tet-gold-primary/40 text-foreground focus:border-tet-gold-primary focus:outline-none transition-colors"
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="text-tet-red-primary text-sm">{error}</p>
      )}

      {/* Submit button */}
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-tet-red-primary hover:bg-tet-red-secondary text-white font-bold text-lg transition-colors cursor-pointer"
        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
      >
        🔮 Xem Bói
      </button>
    </form>
  );
}
