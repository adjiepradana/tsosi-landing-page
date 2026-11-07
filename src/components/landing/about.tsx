import React from "react";
import Image from "next/image";
import { MessageSquare, Heart, Compass, Sparkles } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 bg-white border-t border-brand-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-rose px-4 py-1 text-xs font-black uppercase tracking-wider text-brand-burgundy border border-brand-vibrant/20">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Filosofi & Pendekatan Asesmen</span>
          </div>
          <h2 className="font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-brand-charcoal">
            Mengapa Kita Bereaksi Berbeda Saat Menghadapi Tekanan?
          </h2>
          <p className="text-base sm:text-lg text-brand-gray font-medium leading-relaxed">
            Dalam situasi santai, berbicara terasa terkendali dan mudah. Namun saat kritik tajam datang, ekspektasi tidak terpenuhi, atau perbedaan prinsip meruncing, sistem pertahanan bawah sadar kita sering kali bereaksi lebih cepat daripada akal sehat kita.
          </p>
        </div>

        {/* 3 Pillars - Bold High Contrast */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="group rounded-3xl border-2 border-brand-border bg-white p-8 space-y-4 shadow-soft hover:shadow-bold hover:border-brand-vibrant hover:-translate-y-1.5 transition-all duration-300">
            <div className="h-14 w-14 rounded-2xl bg-brand-rose flex items-center justify-center text-brand-burgundy shadow-sm group-hover:bg-gradient-to-r group-hover:from-brand-burgundy group-hover:to-brand-vibrant group-hover:text-white transition-all duration-300 border border-brand-vibrant/20">
              <MessageSquare className="h-7 w-7" />
            </div>
            <h3 className="font-black text-xl sm:text-2xl text-brand-charcoal tracking-tight">
              Mengenali Pola Bawah Sadar
            </h3>
            <p className="text-xs sm:text-sm text-brand-gray font-medium leading-relaxed">
              Sebagian orang otomatis membalas sebelum memahami lawan bicara, sebagian segera membela diri, ada yang memilih diam membeku, atau mengorbankan batasan pribadinya. Memetakan pola ini adalah gerbang utama menuju transformasi.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="group rounded-3xl border-2 border-brand-border bg-white p-8 space-y-4 shadow-soft hover:shadow-bold hover:border-brand-vibrant hover:-translate-y-1.5 transition-all duration-300">
            <div className="h-14 w-14 rounded-2xl bg-brand-rose flex items-center justify-center text-brand-burgundy shadow-sm group-hover:bg-gradient-to-r group-hover:from-brand-burgundy group-hover:to-brand-vibrant group-hover:text-white transition-all duration-300 border border-brand-vibrant/20">
              <Compass className="h-7 w-7" />
            </div>
            <h3 className="font-black text-xl sm:text-2xl text-brand-charcoal tracking-tight">
              Memberi Ruang Jeda Sadar
            </h3>
            <p className="text-xs sm:text-sm text-brand-gray font-medium leading-relaxed">
              Di antara stimulus pemicu dan reaksi kita, selalu ada celah hening. Personal Soul Blueprint™ membantu Anda mengenali dan memperpanjang jeda 3-5 detik tersebut agar Anda dapat memilih respons yang penuh kesadaran.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="group rounded-3xl border-2 border-brand-border bg-white p-8 space-y-4 shadow-soft hover:shadow-bold hover:border-brand-vibrant hover:-translate-y-1.5 transition-all duration-300">
            <div className="h-14 w-14 rounded-2xl bg-brand-rose flex items-center justify-center text-brand-burgundy shadow-sm group-hover:bg-gradient-to-r group-hover:from-brand-burgundy group-hover:to-brand-vibrant group-hover:text-white transition-all duration-300 border border-brand-vibrant/20">
              <Heart className="h-7 w-7" />
            </div>
            <h3 className="font-black text-xl sm:text-2xl text-brand-charcoal tracking-tight">
              Memulihkan Kualitas Relasi
            </h3>
            <p className="text-xs sm:text-sm text-brand-gray font-medium leading-relaxed">
              Tujuan asesmen ini bukan untuk menghakimi atau memberi label kaku pada kepribadian Anda, melainkan menjadi kompas kejujuran batin untuk memulihkan kedamaian diri dan kehangatan relasi dengan orang-orang terdekat.
            </p>
          </div>
        </div>

        {/* Brand Promise Callout */}
        <div className="mt-14 rounded-3xl bg-brand-rose/40 border-2 border-brand-vibrant/20 p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-brand-vibrant bg-white p-1 shadow-card">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={96}
              height={96}
              className="object-contain"
            />
          </div>
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-black text-xl sm:text-2xl text-brand-charcoal tracking-tight">
              Komitmen Integritas The Soul of Speaking Indonesia
            </h4>
            <p className="text-xs sm:text-sm text-brand-gray font-medium leading-relaxed">
              Asesmen ini dibangun atas prinsip penghormatan martabat manusia. Jawaban Anda tidak digunakan untuk penilaian kerja klinis, diagnosis kejiwaan, atau label moral. Seluruh hasil diarahkan untuk pertumbuhan kesadaran komunikasi mandiri.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
