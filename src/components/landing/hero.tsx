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
  Heart,
  BarChart2,
  Clock,
  Quote,
  Eye,
} from "lucide-react";

export function Hero() {
  // Interactive mini preview state for visitor engagement
  const [activePreviewPattern, setActivePreviewPattern] = useState<
    "reactive" | "pleasing" | "listening"
  >("reactive");

  const previewData = {
    reactive: {
      name: "Reactive Pattern",
      sub: "Bereaksi sebelum sadar",
      score: 3.0,
      category: "Kadang-kadang muncul",
      barWidth: "60%",
      advice: "Beri jeda 3-5 detik, sadari sensasi nafas dan detak jantung sebelum membalas kritik.",
    },
    pleasing: {
      name: "People-Pleasing",
      sub: "Mengabaikan kebutuhan diri",
      score: 3.33,
      category: "Kadang-kadang muncul",
      barWidth: "66%",
      advice: "Tunda persetujuan instan. Latih kalimat: 'Beri saya waktu mempertimbangkannya ya.'",
    },
    listening: {
      name: "Listening Gap",
      sub: "Mendengar untuk membalas",
      score: 2.33,
      category: "Jarang dilaporkan",
      barWidth: "46%",
      advice: "Fokuskan telinga sepenuhnya. Buat 1 parafrase ringkas sebelum menyampaikan pandangan Anda.",
    },
  };

  const current = previewData[activePreviewPattern];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-rose/50 via-brand-ivory to-white py-16 sm:py-24 lg:py-28">
      {/* Decorative organic background aura */}
      <div className="absolute top-0 right-10 -mr-20 -mt-20 h-96 w-96 rounded-full bg-brand-burgundy/10 blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 left-10 -ml-20 -mb-20 h-96 w-96 rounded-full bg-brand-plum/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 h-64 w-64 rounded-full bg-brand-rose/60 blur-2xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines, Highlights & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-burgundy/20 bg-white/90 px-4 py-1.5 shadow-sm backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-brand-burgundy animate-ping" />
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-burgundy">
                The Soul of Speaking Indonesia
              </span>
              <span className="h-3 w-px bg-brand-border" />
              <span className="text-xs text-brand-gray font-medium">
                Refleksi Diri 2026
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-charcoal leading-[1.12]">
              Understand Your Patterns.{" "}
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-brand-burgundy via-brand-plum to-brand-burgundy italic">
                Transform the Way You Communicate.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-brand-charcoal/90 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Temukan bagaimana respons bawah sadar Anda terbentuk saat menghadapi ketegangan, kritik, dan percakapan sulit melalui pemetaan 9 pola komunikasi personal.
            </p>

            <p className="text-xs sm:text-sm text-brand-gray leading-relaxed max-w-xl mx-auto lg:mx-0">
              Tanpa diagnosis kaku. Tanpa penghakiman. Platform ini hadir sebagai cermin jernih untuk mengenali kebiasaan bicara dan membangun relasi yang lebih hangat, jujur, serta berdaya.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/assessment/start" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-3 rounded-xl bg-brand-burgundy hover:bg-brand-plum text-white shadow-elevated text-base font-semibold py-6 px-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                >
                  <Sparkles className="h-5 w-5 text-brand-rose" />
                  <span>Mulai Asesmen Personal</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/#patterns" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-xl border-brand-border bg-white/80 hover:bg-brand-rose/40 hover:text-brand-burgundy py-6 px-6 text-sm font-semibold"
                >
                  <Eye className="h-4 w-4 mr-2 text-brand-burgundy" />
                  Jelajahi 9 Pola
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-brand-border/60 grid grid-cols-3 gap-3 text-center lg:text-left">
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-2">
                <div className="h-9 w-9 rounded-lg bg-brand-rose flex items-center justify-center text-brand-burgundy shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-serif font-bold text-sm sm:text-base text-brand-charcoal">
                    7-10 Menit
                  </div>
                  <div className="text-[11px] text-brand-gray">27 Pernyataan</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-2">
                <div className="h-9 w-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-serif font-bold text-sm sm:text-base text-brand-charcoal">
                    100% Bebas Biaya
                  </div>
                  <div className="text-[11px] text-brand-gray">Tanpa Buat Akun</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-2">
                <div className="h-9 w-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700 shrink-0">
                  <BarChart2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-serif font-bold text-sm sm:text-base text-brand-charcoal">
                    Laporan Instan
                  </div>
                  <div className="text-[11px] text-brand-gray">Skoring Otomatis</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live Report Preview Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Floating Quote Badge */}
              <div className="absolute -top-5 -left-4 z-20 hidden sm:flex items-center gap-2.5 rounded-2xl bg-white/95 px-4 py-2.5 shadow-card border border-brand-border/80 backdrop-blur-md animate-float">
                <div className="h-7 w-7 rounded-full bg-brand-rose flex items-center justify-center text-brand-burgundy">
                  <Quote className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-medium text-brand-charcoal">
                  Mengenali jeda sadar sebelum membalas
                </span>
              </div>

              {/* Main Preview Glass Card */}
              <div className="relative rounded-3xl border border-brand-border bg-white p-7 sm:p-8 shadow-elevated backdrop-blur-xl">
                {/* Header of preview card */}
                <div className="flex items-center justify-between pb-5 border-b border-brand-border/60">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-brand-burgundy/30 bg-white p-0.5 shadow-sm">
                      <Image
                        src="/images/logo.png"
                        alt="The Soul of Speaking"
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-serif font-bold text-brand-charcoal text-base leading-tight">
                        Personal Soul Blueprint™
                      </div>
                      <div className="text-[11px] text-brand-burgundy font-semibold uppercase tracking-wider">
                        Contoh Cuplikan Laporan
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-[10px] font-bold">
                    Refleksi Diri
                  </Badge>
                </div>

                {/* Interactive Pattern Tab Switcher */}
                <div className="pt-5 space-y-4">
                  <div className="flex items-center justify-between text-xs text-brand-gray">
                    <span className="font-semibold text-brand-charcoal">
                      Pilih Pola Simulasi:
                    </span>
                    <span className="text-[11px] text-brand-burgundy italic">
                      Klik untuk preview
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-brand-ivory border border-brand-border/60 text-xs">
                    <button
                      type="button"
                      onClick={() => setActivePreviewPattern("reactive")}
                      className={`py-1.5 px-2 rounded-lg font-medium transition-all ${
                        activePreviewPattern === "reactive"
                          ? "bg-white text-brand-burgundy font-bold shadow-sm"
                          : "text-brand-gray hover:text-brand-charcoal"
                      }`}
                    >
                      Reactive
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePreviewPattern("pleasing")}
                      className={`py-1.5 px-2 rounded-lg font-medium transition-all ${
                        activePreviewPattern === "pleasing"
                          ? "bg-white text-brand-burgundy font-bold shadow-sm"
                          : "text-brand-gray hover:text-brand-charcoal"
                      }`}
                    >
                      Pleasing
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePreviewPattern("listening")}
                      className={`py-1.5 px-2 rounded-lg font-medium transition-all ${
                        activePreviewPattern === "listening"
                          ? "bg-white text-brand-burgundy font-bold shadow-sm"
                          : "text-brand-gray hover:text-brand-charcoal"
                      }`}
                    >
                      Listening
                    </button>
                  </div>

                  {/* Dynamic Pattern Card */}
                  <div className="rounded-2xl bg-gradient-to-br from-brand-rose/40 via-brand-ivory/60 to-white p-5 border border-brand-burgundy/20 space-y-3.5 shadow-sm transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-serif font-bold text-base text-brand-charcoal">
                          {current.name}
                        </h4>
                        <p className="text-xs text-brand-burgundy font-medium italic">
                          {current.sub}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-serif text-xl font-bold text-brand-burgundy">
                          {current.score.toFixed(2)}
                        </span>
                        <span className="text-xs text-brand-gray font-normal"> / 5</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="w-full bg-brand-rose h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-brand-burgundy to-brand-plum h-full rounded-full transition-all duration-500"
                          style={{ width: current.barWidth }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-brand-gray">
                        <span>Status: <strong className="text-brand-charcoal">{current.category}</strong></span>
                        <span>Rentang 1.00 – 5.00</span>
                      </div>
                    </div>

                    {/* Advice note */}
                    <div className="pt-2 border-t border-brand-border/60 text-xs text-brand-charcoal/90 leading-relaxed bg-white/70 p-2.5 rounded-xl border border-white">
                      <span className="font-bold text-brand-burgundy">Fokus Latihan: </span>
                      <span>{current.advice}</span>
                    </div>
                  </div>

                  {/* Summary bullets */}
                  <div className="space-y-2 pt-1 text-xs text-brand-charcoal">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>Grafik batang komparatif sembilan pola komunikasi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>Panduan latihan komunikasi sadar selama 7 hari</span>
                    </div>
                  </div>
                </div>

                {/* Bottom preview footer */}
                <div className="mt-6 pt-4 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-gray">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Shield className="h-3.5 w-3.5 text-brand-burgundy" />
                    Dokumen refleksi diri
                  </span>
                  <Link
                    href="/assessment/start"
                    className="text-brand-burgundy font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Coba Asesmen</span>
                    <ArrowRight className="h-3 w-3" />
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
