"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Shield,
  BarChart2,
  Clock,
  Quote,
  Eye,
  Zap,
} from "lucide-react";

export function Hero() {
  // Interactive mini preview state for visitor engagement
  const [activePreviewPattern, setActivePreviewPattern] = useState<
    "reactive" | "pleasing" | "listening"
  >("reactive");

  const previewData = {
    reactive: {
      name: "Reactive Pattern",
      sub: "Bereaksi sebelum sadar penuh",
      score: 3.0,
      category: "Kadang-kadang muncul",
      barWidth: "60%",
      advice: "Beri jeda 3-5 detik, sadari sensasi nafas dan detak jantung sebelum membalas kritik.",
    },
    pleasing: {
      name: "People-Pleasing",
      sub: "Mengabaikan batas demi harmoni semu",
      score: 3.33,
      category: "Kadang-kadang muncul",
      barWidth: "66%",
      advice: "Tunda persetujuan instan. Latih kalimat: 'Beri saya waktu mempertimbangkannya ya.'",
    },
    listening: {
      name: "Listening Gap",
      sub: "Mendengar untuk membalas argumen",
      score: 2.33,
      category: "Jarang dilaporkan",
      barWidth: "46%",
      advice: "Fokuskan telinga seutuhnya. Buat 1 parafrase ringkas sebelum menyampaikan pandangan Anda.",
    },
  };

  const current = previewData[activePreviewPattern];

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-20 lg:py-28">
      {/* High-energy modern ambient light glow */}
      <div className="absolute top-0 right-1/4 -mt-24 h-72 sm:h-[500px] w-72 sm:w-[500px] rounded-full bg-brand-vibrant/15 blur-[80px] sm:blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 left-0 -ml-24 h-64 sm:h-[400px] w-64 sm:w-[400px] rounded-full bg-brand-burgundy/15 blur-[70px] sm:blur-[100px] pointer-events-none" />

      {/* Modern subtle grid texture overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#110D1308_1px,transparent_1px),linear-gradient(to_bottom,#110D1308_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          {/* Left Column: Headlines, Highlights & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-center lg:text-left">
            {/* Top kicker badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-vibrant/30 bg-brand-rose/70 px-3.5 py-1.5 shadow-sm backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-brand-vibrant animate-ping" />
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-brand-burgundy">
                The Soul of Speaking Indonesia
              </span>
              <span className="h-3 w-px bg-brand-burgundy/30" />
              <span className="text-[11px] sm:text-xs font-bold text-brand-charcoal">
                Refleksi 2026
              </span>
            </div>

            {/* Main Headline - Responsive Modern Display Typography */}
            <h1 className="font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-brand-charcoal leading-[1.12]">
              Understand Your Patterns.{" "}
              <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-brand-vibrant via-brand-burgundy to-brand-magenta">
                Transform the Way You Communicate.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-xl text-brand-charcoal/90 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Kenali pola reaksi bawah sadar Anda saat menghadapi konflik, kritik, dan percakapan sulit. Buka potensi komunikasi yang lebih sadar, jujur, dan berdaya.
            </p>

            <p className="text-xs sm:text-sm text-brand-gray font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              Bukan diagnosis klinis, melainkan cermin jernih untuk mengeksplorasi kecenderungan batin dan membangun kecerdasan komunikasi autentik.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
              <Link href="/assessment/start" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-3 rounded-2xl bg-gradient-to-r from-brand-burgundy via-brand-vibrant to-brand-burgundy hover:brightness-110 text-white shadow-bold text-sm sm:text-base font-extrabold py-6 sm:py-7 px-6 sm:px-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-glow"
                >
                  <Sparkles className="h-4 sm:h-5 w-4 sm:w-5 text-brand-rose" />
                  <span>Mulai Personal Soul Blueprint™</span>
                  <ArrowRight className="h-4 sm:h-5 w-4 sm:w-5" />
                </Button>
              </Link>
              <Link href="/#patterns" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-2xl border-2 border-brand-charcoal/20 bg-white hover:border-brand-vibrant hover:text-brand-vibrant py-6 sm:py-7 px-6 sm:px-7 text-xs sm:text-sm font-bold transition-all shadow-sm"
                >
                  <Eye className="h-4 w-4 mr-2 text-brand-vibrant" />
                  Jelajahi 9 Pola
                </Button>
              </Link>
            </div>

            {/* Trust Badges - Fully Responsive Grid */}
            <div className="pt-6 sm:pt-7 border-t border-brand-border grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-left">
              <div className="flex items-center gap-3 p-2.5 sm:p-0 rounded-xl bg-brand-rose/20 sm:bg-transparent">
                <div className="h-10 w-10 rounded-xl bg-brand-rose flex items-center justify-center text-brand-burgundy shrink-0 shadow-sm border border-brand-vibrant/20">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-extrabold text-sm sm:text-base text-brand-charcoal">
                    5-7 Menit
                  </div>
                  <div className="text-[11px] sm:text-xs text-brand-gray font-semibold">27 Pernyataan</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 sm:p-0 rounded-xl bg-emerald-50/50 sm:bg-transparent">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0 shadow-sm border border-emerald-200">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-extrabold text-sm sm:text-base text-brand-charcoal">
                    100% Bebas Biaya
                  </div>
                  <div className="text-[11px] sm:text-xs text-brand-gray font-semibold">Tanpa Perlu Akun</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 sm:p-0 rounded-xl bg-amber-50/50 sm:bg-transparent">
                <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 shrink-0 shadow-sm border border-amber-200">
                  <BarChart2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-extrabold text-sm sm:text-base text-brand-charcoal">
                    Laporan Instan
                  </div>
                  <div className="text-[11px] sm:text-xs text-brand-gray font-semibold">Skoring Otomatis</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Live Interactive Preview Card */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative w-full max-w-md mx-auto">
              {/* Floating Quote Badge (visible on tablet and desktop) */}
              <div className="absolute -top-4 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-2xl bg-brand-charcoal text-white px-3.5 py-2 shadow-bold border border-brand-vibrant/40 backdrop-blur-md animate-float">
                <div className="h-6 w-6 rounded-full bg-brand-vibrant flex items-center justify-center text-white shrink-0">
                  <Quote className="h-3 w-3" />
                </div>
                <span className="text-xs font-bold tracking-tight">
                  Jeda sadar sebelum membalas kritik
                </span>
              </div>

              {/* Main Preview Card - Crisp, Bold & Mobile-Optimized */}
              <div className="relative rounded-3xl border-2 border-brand-border bg-white p-5 sm:p-7 shadow-elevated backdrop-blur-xl hover:border-brand-vibrant/60 transition-all duration-300">
                {/* Header of preview card */}
                <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 sm:h-12 w-10 sm:w-12 shrink-0 overflow-hidden rounded-full border-2 border-brand-vibrant bg-white p-0.5 shadow-md">
                      <Image
                        src="/images/logo.png"
                        alt="The Soul of Speaking"
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-extrabold text-brand-charcoal text-sm sm:text-base leading-tight">
                        Personal Soul Blueprint™
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-brand-vibrant font-extrabold uppercase tracking-wider">
                        Contoh Cuplikan Laporan
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-brand-burgundy text-white hover:bg-brand-burgundy font-bold text-[10px] px-2 py-0.5">
                    Live Demo
                  </Badge>
                </div>

                {/* Interactive Pattern Tab Switcher */}
                <div className="pt-4 space-y-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-brand-charcoal uppercase tracking-wider text-[11px]">
                      Pilih Pola Simulasi:
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-brand-vibrant font-bold flex items-center gap-1">
                      <Zap className="h-3 w-3" /> Klik untuk ganti
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-brand-rose/60 border border-brand-vibrant/20 text-xs">
                    <button
                      type="button"
                      onClick={() => setActivePreviewPattern("reactive")}
                      className={`py-1.5 sm:py-2 px-1.5 sm:px-2 rounded-xl text-xs font-bold transition-all ${
                        activePreviewPattern === "reactive"
                          ? "bg-gradient-to-r from-brand-burgundy to-brand-vibrant text-white shadow-md"
                          : "text-brand-charcoal hover:text-brand-burgundy"
                      }`}
                    >
                      Reactive
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePreviewPattern("pleasing")}
                      className={`py-1.5 sm:py-2 px-1.5 sm:px-2 rounded-xl text-xs font-bold transition-all ${
                        activePreviewPattern === "pleasing"
                          ? "bg-gradient-to-r from-brand-burgundy to-brand-vibrant text-white shadow-md"
                          : "text-brand-charcoal hover:text-brand-burgundy"
                      }`}
                    >
                      Pleasing
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePreviewPattern("listening")}
                      className={`py-1.5 sm:py-2 px-1.5 sm:px-2 rounded-xl text-xs font-bold transition-all ${
                        activePreviewPattern === "listening"
                          ? "bg-gradient-to-r from-brand-burgundy to-brand-vibrant text-white shadow-md"
                          : "text-brand-charcoal hover:text-brand-burgundy"
                      }`}
                    >
                      Listening
                    </button>
                  </div>

                  {/* Dynamic Pattern Card */}
                  <div className="rounded-2xl bg-gradient-to-br from-brand-rose/40 to-white p-4 sm:p-5 border-2 border-brand-vibrant/30 space-y-3 shadow-sm transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-black text-base sm:text-lg text-brand-charcoal">
                          {current.name}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-brand-vibrant font-bold">
                          {current.sub}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-xl sm:text-2xl text-brand-burgundy">
                          {current.score.toFixed(2)}
                        </span>
                        <span className="text-[11px] text-brand-gray font-semibold"> / 5.00</span>
                      </div>
                    </div>

                    {/* Bold Progress Bar */}
                    <div className="space-y-1">
                      <div className="w-full bg-brand-rose h-2.5 sm:h-3 rounded-full overflow-hidden p-0.5 border border-brand-vibrant/20">
                        <div
                          className="bg-gradient-to-r from-brand-burgundy via-brand-vibrant to-brand-magenta h-full rounded-full transition-all duration-500 shadow-sm"
                          style={{ width: current.barWidth }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] sm:text-[11px] font-bold">
                        <span className="text-brand-gray">Status: <strong className="text-brand-burgundy">{current.category}</strong></span>
                        <span className="text-brand-gray">Skala 1 - 5</span>
                      </div>
                    </div>

                    {/* Advice note */}
                    <div className="pt-2 text-xs text-brand-charcoal leading-relaxed bg-white p-2.5 sm:p-3 rounded-xl border border-brand-border shadow-sm">
                      <span className="font-extrabold text-brand-vibrant block mb-0.5">
                        Fokus Latihan Sadar:
                      </span>
                      <span className="font-medium text-[11px] sm:text-xs">{current.advice}</span>
                    </div>
                  </div>

                  {/* Summary bullets */}
                  <div className="space-y-1.5 pt-1 text-xs text-brand-charcoal font-semibold">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-vibrant shrink-0" />
                      <span className="text-[11px] sm:text-xs">Grafik batang komparatif 9 pola komunikasi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-vibrant shrink-0" />
                      <span className="text-[11px] sm:text-xs">Panduan latihan komunikasi sadar 7 hari</span>
                    </div>
                  </div>
                </div>

                {/* Bottom preview footer */}
                <div className="mt-5 pt-3.5 border-t border-brand-border flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-brand-charcoal text-[11px]">
                    <Shield className="h-3.5 w-3.5 text-brand-vibrant" />
                    Dokumen refleksi diri
                  </span>
                  <Link
                    href="/assessment/start"
                    className="text-brand-vibrant font-extrabold hover:underline inline-flex items-center gap-1 text-[11px] sm:text-xs"
                  >
                    <span>Coba Asesmen Sekarang</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
