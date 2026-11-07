import React from "react";
import { UserCheck, CheckSquare, BarChart3, HeartPulse } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Masukkan Informasi Anda",
      desc: "Cukup lengkapi nama lengkap, email, dan WhatsApp. Tanpa pendaftaran password yang rumit atau biaya apapun.",
      icon: UserCheck,
    },
    {
      num: "02",
      title: "Jawab 27 Pernyataan Refleksi",
      desc: "Merespons setiap pernyataan berdasarkan kecenderungan nyata Anda saat mengalami situasi konflik atau kritik.",
      icon: CheckSquare,
    },
    {
      num: "03",
      title: "Dapatkan Hasil & Profil Instan",
      desc: "Sistem menghitung skor rata-rata keseluruhan serta memetakan 9 pola komunikasi dengan kategori deskriptif jelas.",
      icon: BarChart3,
    },
    {
      num: "04",
      title: "Mulai Refleksi & Tindakan Sadar",
      desc: "Gunakan panduan latihan komunikasi sadar dan lembar refleksi personal untuk mentransformasi cara Anda berbicara.",
      icon: HeartPulse,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-t border-brand-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="secondary" className="px-3.5 py-1 text-xs">
            Alur Partisipasi
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-charcoal">
            Pengalaman Refleksi Sederhana & Menyeluruh
          </h2>
          <p className="text-base sm:text-lg text-brand-gray leading-relaxed">
            Hanya membutuhkan waktu 7-10 menit untuk menemukan pemahaman mendalam tentang cara Anda terhubung dengan orang lain.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative rounded-2xl border border-brand-border/80 bg-brand-ivory/30 p-7 hover:bg-white hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-bold text-brand-burgundy/40">
                      {step.num}
                    </span>
                    <div className="h-10 w-10 rounded-xl bg-brand-rose flex items-center justify-center text-brand-burgundy">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-brand-charcoal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
