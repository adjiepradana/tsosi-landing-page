import React from "react";
import Link from "next/link";
import { UserCheck, CheckSquare, BarChart3, HeartPulse, ArrowRight, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Identitas Ringkas",
      desc: "Isi nama, email, dan nomor WhatsApp. Cepat, aman, dan tanpa perlu mendaftarkan password atau menunggu kode OTP.",
      icon: UserCheck,
      highlight: "Tanpa Akun",
    },
    {
      num: "02",
      title: "27 Pernyataan Refleksi",
      desc: "Beri rating kesesuaian pada skala 1-5 berdasarkan respons nyata Anda saat mengalami ketegangan interpersonal.",
      icon: CheckSquare,
      highlight: "Skala 1 - 5",
    },
    {
      num: "03",
      title: "Kalkulasi Skor Instan",
      desc: "Mesin skoring server secara otomatis memetakan rata-rata keseluruhan dan 9 pola komunikasi beserta peringkat prioritas.",
      icon: BarChart3,
      highlight: "Skoring Otomatis",
    },
    {
      num: "04",
      title: "Latihan Komunikasi Sadar",
      desc: "Akses lembar refleksi personal interaktif dan panduan praktik 7 hari untuk mentransformasi kebiasaan bicara Anda.",
      icon: HeartPulse,
      highlight: "Aksi Nyata",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white border-t border-brand-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="secondary" className="px-3.5 py-1 text-xs font-semibold">
            Alur Langkah Sederhana
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-charcoal">
            Pengalaman Refleksi yang Menenangkan & Terarah
          </h2>
          <p className="text-base sm:text-lg text-brand-gray leading-relaxed">
            Hanya membutuhkan waktu 7 hingga 10 menit tanpa gangguan untuk memperoleh pemahaman mendalam tentang diri Anda.
          </p>
        </div>

        {/* Step Cards with connecting line effect */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative rounded-3xl border border-brand-border/90 bg-gradient-to-b from-brand-ivory/60 via-white to-brand-ivory/30 p-7 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-extrabold text-brand-burgundy/30 group-hover:text-brand-burgundy transition-colors">
                      {step.num}
                    </span>
                    <div className="h-12 w-12 rounded-2xl bg-brand-rose flex items-center justify-center text-brand-burgundy shadow-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  <span className="inline-block rounded-md bg-brand-rose/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-burgundy mb-2">
                    {step.highlight}
                  </span>

                  <h3 className="font-serif text-xl font-bold text-brand-charcoal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-border/60 text-[11px] font-semibold text-brand-charcoal/70 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-brand-burgundy" />
                  <span>Langkah #{idx + 1} Terpandu</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action button */}
        <div className="mt-14 text-center">
          <Link href="/assessment/start">
            <Button
              size="lg"
              className="gap-2.5 rounded-xl bg-brand-burgundy hover:bg-brand-plum text-white font-semibold py-6 px-8 shadow-card hover:shadow-elevated transition-all"
            >
              <span>Langkah Pertama: Isi Identitas Peserta</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
