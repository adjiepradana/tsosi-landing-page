import React from "react";
import Image from "next/image";
import { MessageSquare, Heart, Compass, Sparkles, CheckCircle2, Flame, ShieldAlert } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 bg-white border-t border-brand-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-rose px-3.5 py-1 text-xs font-semibold text-brand-burgundy">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Filosofi & Pendekatan Asesmen</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-charcoal">
            Mengapa Kita Bereaksi Berbeda Saat Menghadapi Tekanan?
          </h2>
          <p className="text-base sm:text-lg text-brand-gray leading-relaxed">
            Dalam situasi santai, berbicara terasa terkendali dan mudah. Namun saat kritik tajam datang, ekspektasi tidak terpenuhi, atau perbedaan prinsip meruncing, sistem pertahanan bawah sadar kita sering kali bereaksi lebih cepat daripada akal sehat kita.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="rounded-3xl border border-brand-border bg-gradient-to-b from-brand-ivory/60 to-white p-8 space-y-4 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300">
            <div className="h-14 w-14 rounded-2xl bg-brand-rose flex items-center justify-center text-brand-burgundy shadow-sm">
              <MessageSquare className="h-7 w-7" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-charcoal">
              Mengenali Pola Bawah Sadar
            </h3>
            <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
              Sebagian orang otomatis membalas sebelum memahami lawan bicara, sebagian segera membela diri, ada yang memilih diam membeku, atau mengorbankan batasan pribadinya. Memetakan pola ini adalah gerbang utama menuju transformasi.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-3xl border border-brand-border bg-gradient-to-b from-brand-ivory/60 to-white p-8 space-y-4 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300">
            <div className="h-14 w-14 rounded-2xl bg-brand-rose flex items-center justify-center text-brand-burgundy shadow-sm">
              <Compass className="h-7 w-7" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-charcoal">
              Memberi Ruang Jeda Sadar
            </h3>
            <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
              Di antara stimulus pemicu dan reaksi kita, selalu ada celah hening. Personal Soul Blueprint™ membantu Anda mengenali dan memperpanjang jeda 3-5 detik tersebut agar Anda dapat memilih respons yang penuh kesadaran.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-3xl border border-brand-border bg-gradient-to-b from-brand-ivory/60 to-white p-8 space-y-4 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300">
            <div className="h-14 w-14 rounded-2xl bg-brand-rose flex items-center justify-center text-brand-burgundy shadow-sm">
              <Heart className="h-7 w-7" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-charcoal">
              Memulihkan Kualitas Relasi
            </h3>
            <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
              Tujuan asesmen ini bukan untuk menghakimi atau memberi label kaku pada kepribadian Anda, melainkan menjadi kompas kejujuran batin untuk memulihkan kedamaian diri dan kehangatan relasi dengan orang-orang terdekat.
            </p>
          </div>
        </div>

        {/* Brand Promise Callout */}
        <div className="mt-14 rounded-3xl bg-brand-ivory/80 border border-brand-border/80 p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-brand-burgundy/30 bg-white p-1 shadow-card">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={96}
              height={96}
              className="object-contain"
            />
          </div>
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-brand-charcoal">
              Komitmen Integritas The Soul of Speaking Indonesia
            </h4>
            <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
              Asesmen ini dibangun atas prinsip penghormatan martabat manusia. Jawaban Anda tidak digunakan untuk penilaian kerja klinis, diagnosis kejiwaan, atau label moral. Seluruh hasil diarahkan untuk pertumbuhan kesadaran komunikasi mandiri.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
