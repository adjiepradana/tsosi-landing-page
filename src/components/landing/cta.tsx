import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-plum via-brand-burgundy to-brand-deep py-24 px-4 sm:px-6 lg:px-8 text-white border-t border-brand-magenta/20">
      {/* High energy decorative aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-brand-magenta/20 blur-[130px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl text-center space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-brand-rose border border-white/20 backdrop-blur-md shadow-sm">
          <Sparkles className="h-4 w-4 text-brand-rose" />
          <span>Transformasi Dimulai dari Kesadaran</span>
        </div>

        <h2 className="font-black text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tighter">
          Start Understanding <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-rose to-brand-magenta">
            Yourself Today.
          </span>
        </h2>

        <p className="text-lg sm:text-xl text-brand-rose font-medium max-w-2xl mx-auto leading-relaxed">
          Temukan pola komunikasi Anda dan bangun keberanian untuk hadir lebih utuh, jujur, dan berdaya dalam setiap percakapan bermakna.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/assessment/start" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto gap-3 bg-white text-brand-burgundy hover:bg-brand-rose hover:text-brand-plum font-black shadow-elevated text-base py-7 px-10 rounded-2xl transition-all duration-300 hover:scale-105"
            >
              <span>Mulai Asesmen Sekarang</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        <p className="text-xs text-brand-rose/70 pt-4 font-bold tracking-wide uppercase">
          27 Pernyataan • 5-7 Menit • Laporan Lengkap Instan
        </p>
      </div>
    </section>
  );
}
