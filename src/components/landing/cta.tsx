import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-brand-plum py-20 px-4 sm:px-6 lg:px-8 text-white">
      {/* Decorative aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-brand-burgundy/40 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-4xl text-center space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-rose border border-white/20 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Transformasi Dimulai dari Kesadaran</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight tracking-tight">
          Start Understanding Yourself Today.
        </h2>

        <p className="text-base sm:text-lg text-brand-rose/90 max-w-2xl mx-auto leading-relaxed">
          Temukan pola komunikasi Anda dan bangun keberanian untuk hadir lebih utuh, jujur, dan berdaya dalam setiap percakapan bermakna.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/assessment/start" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto gap-2.5 bg-brand-burgundy hover:bg-white hover:text-brand-burgundy text-white shadow-elevated text-base font-semibold transition-all duration-300"
            >
              <span>Mulai Asesmen Sekarang</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        <p className="text-xs text-brand-rose/60 pt-4">
          27 Pernyataan • 10 Menit • Laporan Lengkap Instan
        </p>
      </div>
    </section>
  );
}
