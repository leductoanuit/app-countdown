import type { Metadata } from "next";
import Link from "next/link";
import FallingParticles from "../components/falling-particles";
import FortuneForm from "../components/fortune-form";

export const metadata: Metadata = {
  title: "Xem Bói Tết 2026 | Vận Mệnh Năm Bính Ngọ",
  description: "Xem bói tổng quan năm mới Tết Bính Ngọ 2026 - Tài Lộc, Tình Duyên, Sức Khỏe, Sự Nghiệp",
};

export default function XemBoiPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center px-4 overflow-hidden">
      <FallingParticles />

      <main className="relative z-10 w-full max-w-lg flex-1 flex flex-col items-center justify-center py-12">
        {/* Back link */}
        <Link
          href="/"
          className="self-start mb-8 text-sm text-tet-gold-secondary/60 hover:text-tet-gold-primary transition-colors"
        >
          ← Về trang chủ
        </Link>

        {/* Heading */}
        <h1
          className="text-3xl md:text-5xl font-bold text-tet-red-primary text-center mb-2"
          style={{ animation: "glow 3s ease-in-out infinite" }}
        >
          🔮 Xem Bói Năm Mới
        </h1>
        <p className="text-sm md:text-base text-tet-gold-secondary/70 text-center mb-10">
          Nhập tên và ngày sinh để xem vận mệnh năm Bính Ngọ 2026
        </p>

        {/* Fortune form + results */}
        <div className="w-full">
          <FortuneForm />
        </div>
      </main>
    </div>
  );
}
