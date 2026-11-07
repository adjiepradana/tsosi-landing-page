import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, CheckCircle2, Shield, HeartHandshake } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-rose/40 via-white to-brand-ivory py-16 sm:py-24 lg:py-28">
      {/* Decorative organic background aura */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-brand-burgundy/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-brand-plum/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-burgundy/20 bg-white/80 px-4 py-1.5 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-burgundy animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-burgundy">
                The Soul of Speaking Indonesia
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-charcoal leading-[1.15]">
              Understand Your Patterns.{" "}
              <span className="text-brand-burgundy italic">
                Transform the Way You Communicate.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-brand-charcoal/90 font-medium leading-relaxed">
              Discover the communication patterns that shape the way you respond, listen, and connect when conversations become difficult.
            </p>

            <p className="text-sm sm:text-base text-brand-gray leading-relaxed">
              Kenali pola komunikasi yang muncul ketika menghadapi konflik. Bangun kesadaran diri dan temukan cara baru untuk berkomunikasi dengan lebih sehat, tenang, dan bermakna.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/assessment/start" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2.5 bg-brand-burgundy hover:bg-brand-plum text-white shadow-elevated">
                  <Sparkles className="h-5 w-5" />
                  <span>Mulai Personal Soul Blueprint™</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/#about" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 border-t border-brand-border/60 grid grid-cols-3 gap-3 text-center lg:text-left">
              <div>
                <div className="font-serif text-2xl font-bold text-brand-burgundy">27</div>
                <div className="text-xs text-brand-gray">Pernyataan Refleksi</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-brand-plum">9</div>
                <div className="text-xs text-brand-gray">Pola Saat Konflik</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-brand-burgundy">100%</div>
                <div className="text-xs text-brand-gray">Bebas Biaya & Instan</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Card Presentation */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Card Container */}
              <div className="relative rounded-3xl border border-brand-border/80 bg-white/95 p-8 shadow-elevated backdrop-blur-sm">
                <div className="flex items-center justify-between pb-6 border-b border-brand-border/60">
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-brand-burgundy/30 shadow-sm">
                      <Image
                        src="/images/logo.png"
                        alt="The Soul of Speaking"
                        width={56}
                        height={56}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-serif font-bold text-brand-charcoal text-base">
                        Personal Soul Blueprint™
                      </div>
                      <div className="text-xs text-brand-burgundy font-medium">
                        Conflict Pattern Self-Assessment
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">
                    Refleksi Diri
                  </Badge>
                </div>

                {/* Simulated Preview Box */}
                <div className="py-6 space-y-4">
                  <div className="rounded-xl bg-brand-ivory p-4 border border-brand-border/40 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-brand-charcoal">Reactive Pattern</span>
                      <span className="text-brand-burgundy font-bold">Prioritas Refleksi</span>
                    </div>
                    <div className="w-full bg-brand-rose h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-burgundy h-full rounded-full" style={{ width: "70%" }} />
                    </div>
                    <p className="text-[11px] text-brand-gray">
                      Respons spontan saat emosi meningkat dapat membuat jawaban lebih tajam. Latihan utama: memberi jeda sadar.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-center gap-2.5 text-xs text-brand-charcoal">
                      <CheckCircle2 className="h-4 w-4 text-brand-burgundy shrink-0" />
                      <span>Tanpa pendaftaran akun atau kata sandi</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-brand-charcoal">
                      <CheckCircle2 className="h-4 w-4 text-brand-burgundy shrink-0" />
                      <span>Skoring otomatis & laporan grafis mendalam</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-brand-charcoal">
                      <CheckCircle2 className="h-4 w-4 text-brand-burgundy shrink-0" />
                      <span>Rekomendasi latihan sadar 7 hari</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-gray">
                  <span className="flex items-center gap-1">
                    <Shield className="h-3.5 w-3.5 text-brand-burgundy" />
                    Data terjaga & privat
                  </span>
                  <span className="font-serif italic text-brand-burgundy font-medium">
                    The Soul of Speaking
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
