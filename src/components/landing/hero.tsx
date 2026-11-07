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
    <section className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-28">
      {/* High-energy modern ambient light glow */}
      <div className="absolute top-0 right-1/4 -mt-24 h-[500px] w-[500px] rounded-full bg-brand-vibrant/15 blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 left-0 -ml-24 h-[400px] w-[400px] rounded-full bg-brand-burgundy/15 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-brand-magenta/10 blur-[90px] pointer-events-none" />

      {/* Modern subtle grid texture overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#110D1308_1px,transparent_1px),linear-gradient(to_bottom,#110D1308_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Headlines, Highlights & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            {/* Top kicker badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-vibrant/30 bg-brand-rose/70 px-4 py-1.5 shadow-sm backdrop-blur-md">
              <span className="flex h-2.5 w-2.5 rounded-full bg-brand-vibrant animate-ping" />
              <span className="text-xs font-black uppercase tracking-wider text-brand-burgundy">
                The Soul of Speaking Indonesia
              </span>
              <span className="h-3.5 w-px bg-brand-burgundy/30" />
              <span className="text-xs font-bold text-brand-charcoal">
                Refleksi 2026
              </span>
            </div>

            {/* Main Headline - Bold Modern Display Typography */}
            <h1 className="font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-brand-charcoal leading-[1.08]">
              Understand Your Patterns.{" "}
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-brand-vibrant via-brand-burgundy to-brand-magenta">
                Transform the Way You Communicate.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-brand-charcoal/90 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Kenali pola reaksi bawah sadar Anda saat menghadapi konflik, kritik, dan percakapan sulit. Buka potensi komunikasi yang lebih sadar, jujur, dan berdaya.
            </p>

            <p className="text-sm text-brand-gray leading-relaxed max-w-xl mx-auto lg:mx-0">
              Bukan diagnosis klinis, melainkan cermin jernih untuk mengeksplorasi kecenderungan batin dan membangun kecerdasan komunikasi autentik.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/assessment/start" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-3 rounded-2xl bg-gradient-to-r from-brand-burgundy via-brand-vibrant to-brand-burgundy hover:brightness-110 text-white shadow-bold text-base font-extrabold py-7 px-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-glow"
                >
                  <Sparkles className="h-5 w-5 text-brand-rose" />
                  <span>Mulai Personal Soul Blueprint™</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/#patterns" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-2xl border-2 border-brand-charcoal/20 bg-white hover:border-brand-vibrant hover:text-brand-vibrant py-7 px-7 text-sm font-bold transition-all shadow-sm"
                >
                  <Eye className="h-4 w-4 mr-2 text-brand-vibrant" />
                  Jelajahi 9 Pola
                </Button>
              </Link>
            </div>

            {/* Trust Badges - Modern High Contrast */}
            <div className="pt-7 border-t border-brand-border grid grid-cols-3 gap-4 text-center lg:text-left">
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-brand-rose flex items-center justify-center text-brand-burgundy shrink-0 shadow-sm border border-brand-vibrant/20">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-extrabold text-base sm:text-lg text-brand-charcoal">
                    5-7 Menit
                  </div>
                  <div className="text-xs text-brand-gray font-semibold">27 Pernyataan</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0 shadow-sm border border-emerald-200">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-extrabold text-base sm:text-lg text-brand-charcoal">
                    100% Bebas Biaya
                  </div>
                  <div className="text-xs text-brand-gray font-semibold">Tanpa Perlu Akun</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 shrink-0 shadow-sm border border-amber-200">
                  <BarChart2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-extrabold text-base sm:text-lg text-brand-charcoal">
                    Laporan Instan
                  </div>
                  <div className="text-xs text-brand-gray font-semibold">Skoring Otomatis</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Live Interactive Preview Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Floating Quote Badge */}
              <div className="absolute -top-5 -left-4 z-20 hidden sm:flex items-center gap-2.5 rounded-2xl bg-brand-charcoal text-white px-4 py-2.5 shadow-bold border border-brand-vibrant/40 backdrop-blur-md animate-float">
                <div className="h-7 w-7 rounded-full bg-brand-vibrant flex items-center justify-center text-white">
                  <Quote className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-bold tracking-tight">
                  Jeda sadar sebelum membalas kritik
                </span>
              </div>

              {/* Main Preview Card - Crisp, Bold & Modern */}
              <div className="relative rounded-3xl border-2 border-brand-border bg-white p-7 sm:p-8 shadow-elevated backdrop-blur-xl hover:border-brand-vibrant/60 transition-all duration-300">
                {/* Header of preview card */}
                <div className="flex items-center justify-between pb-5 border-b border-brand-border">
                  <div className="flex items-center gap-3.5">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-brand-vibrant bg-white p-0.5 shadow-md">
                      <Image
                        src="/images/logo.png"
                        alt="The Soul of Speaking"
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-extrabold text-brand-charcoal text-base leading-tight">
                        Personal Soul Blueprint™
                      </div>
                      <div className="text-[11px] text-brand-vibrant font-extrabold uppercase tracking-wider">
                        Contoh Cuplikan Laporan
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-brand-burgundy text-white hover:bg-brand-burgundy font-bold text-[10px] px-2.5 py-1">
                    Live Demo
                  </Badge>
                </div>

                {/* Interactive Pattern Tab Switcher */}
                <div className="pt-5 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-brand-charcoal uppercase tracking-wider">
                      Pilih Pola Simulasi:
                    </span>
                    <span className="text-[11px] text-brand-vibrant font-bold flex items-center gap-1">
                      <Zap className="h-3 w-3" /> Klik untuk ganti
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-brand-rose/60 border border-brand-vibrant/20 text-xs">
                    <button
                      type="button"
                      onClick={() => setActivePreviewPattern("reactive")}
                      className={`py-2 px-2.5 rounded-xl font-bold transition-all ${
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
                      className={`py-2 px-2.5 rounded-xl font-bold transition-all ${
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
                      className={`py-2 px-2.5 rounded-xl font-bold transition-all ${
                        activePreviewPattern === "listening"
                          ? "bg-gradient-to-r from-brand-burgundy to-brand-vibrant text-white shadow-md"
                          : "text-brand-charcoal hover:text-brand-burgundy"
                      }`}
                    >
                      Listening
                    </button>
                  </div>

                  {/* Dynamic Pattern Card */}
                  <div className="rounded-2xl bg-gradient-to-br from-brand-rose/40 to-white p-5 border-2 border-brand-vibrant/30 space-y-3.5 shadow-sm transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-black text-lg text-brand-charcoal">
                          {current.name}
                        </h4>
                        <p className="text-xs text-brand-vibrant font-bold">
                          {current.sub}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-2xl text-brand-burgundy">
                          {current.score.toFixed(2)}
                        </span>
                        <span className="text-xs text-brand-gray font-semibold"> / 5.00</span>
                      </div>
                    </div>

                    {/* Bold Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="w-full bg-brand-rose h-3 rounded-full overflow-hidden p-0.5 border border-brand-vibrant/20">
                        <div
                          className="bg-gradient-to-r from-brand-burgundy via-brand-vibrant to-brand-magenta h-full rounded-full transition-all duration-500 shadow-sm"
                          style={{ width: current.barWidth }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-brand-gray">Status: <strong className="text-brand-burgundy">{current.category}</strong></span>
                        <span className="text-brand-gray">Skala 1 - 5</span>
                      </div>
                    </div>

                    {/* Advice note */}
                    <div className="pt-2 text-xs text-brand-charcoal leading-relaxed bg-white p-3 rounded-xl border border-brand-border shadow-sm">
                      <span className="font-extrabold text-brand-vibrant block mb-1">
                        Fokus Latihan Sadar:
                      </span>
                      <span className="font-medium">{current.advice}</span>
                    </div>
                  </div>

                  {/* Summary bullets */}
                  <div className="space-y-2 pt-1 text-xs text-brand-charcoal font-semibold">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-vibrant shrink-0" />
                      <span>Grafik batang komparatif 9 pola komunikasi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-vibrant shrink-0" />
                      <span>Panduan latihan komunikasi sadar 7 hari</span>
                    </div>
                  </div>
                </div>

                {/* Bottom preview footer */}
                <div className="mt-6 pt-4 border-t border-brand-border flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-brand-charcoal">
                    <Shield className="h-4 w-4 text-brand-vibrant" />
                    Dokumen refleksi diri
                  </span>
                  <Link
                    href="/assessment/start"
                    className="text-brand-vibrant font-extrabold hover:underline inline-flex items-center gap-1"
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
