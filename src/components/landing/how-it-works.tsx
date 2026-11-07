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
    <section id="how-it-works" className="py-24 bg-white border-t border-brand-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge className="bg-brand-rose text-brand-burgundy border-brand-vibrant/20 px-4 py-1 text-xs font-black uppercase tracking-wider">
            Alur Langkah Sederhana
          </Badge>
          <h2 className="font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-brand-charcoal">
            Pengalaman Refleksi Terarah & Berdaya
          </h2>
          <p className="text-base sm:text-lg text-brand-gray font-medium leading-relaxed">
            Hanya membutuhkan waktu 5 hingga 7 menit untuk memperoleh peta komprehensif tentang dinamika komunikasi Anda.
          </p>
        </div>

        {/* Step Cards with connecting line effect */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="group relative rounded-3xl border-2 border-brand-border bg-white p-7 shadow-soft hover:shadow-bold hover:border-brand-vibrant hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-black text-4xl text-brand-border group-hover:text-brand-vibrant transition-colors">
                      {step.num}
                    </span>
                    <div className="h-12 w-12 rounded-2xl bg-brand-rose flex items-center justify-center text-brand-burgundy shadow-sm group-hover:bg-gradient-to-r group-hover:from-brand-burgundy group-hover:to-brand-vibrant group-hover:text-white transition-all duration-300 border border-brand-vibrant/20">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  <span className="inline-block rounded-lg bg-brand-rose px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-brand-burgundy mb-2 border border-brand-vibrant/20">
                    {step.highlight}
                  </span>

                  <h3 className="font-extrabold text-xl text-brand-charcoal mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-gray font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-border text-[11px] font-bold text-brand-charcoal/80 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-brand-vibrant" />
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
              className="gap-3 rounded-2xl bg-gradient-to-r from-brand-burgundy to-brand-vibrant hover:brightness-110 text-white font-extrabold py-7 px-9 text-base shadow-bold hover:scale-105 transition-all"
            >
              <span>Langkah Pertama: Mulai Isi Identitas</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
