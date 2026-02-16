import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tết Bính Ngọ 2026 | Lunar New Year Countdown",
  description: "Countdown to Vietnamese Lunar New Year 2026 - Year of the Horse. Chúc Mừng Năm Mới!",
  keywords: ["Tết", "Lunar New Year", "2026", "Year of the Horse", "Vietnamese New Year"],
  openGraph: {
    title: "Tết Bính Ngọ 2026 | Lunar New Year Countdown",
    description: "Countdown to Vietnamese Lunar New Year 2026 - Year of the Horse 🐴",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
