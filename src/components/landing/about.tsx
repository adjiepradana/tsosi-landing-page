import React from "react";
import { MessageSquare, Heart, Compass, Sparkles } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-20 bg-white border-t border-brand-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-rose px-3.5 py-1 text-xs font-semibold text-brand-burgundy">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Filosofi & Pendekatan</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-charcoal">
            Mengapa Kita Bereaksi Berbeda Saat Menghadapi Tekanan?
          </h2>
          <p className="text-base sm:text-lg text-brand-gray leading-relaxed">
            Dalam situasi normal, berbicara terasa mudah dan terkendali. Namun ketika kritik datang, perbedaan pendapat menajam, atau emosi meningkat, pola bawah sadar kita mengambil alih.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="rounded-2xl border border-brand-border bg-brand-ivory/50 p-8 space-y-4 hover:shadow-card transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-brand-rose flex items-center justify-center text-brand-burgundy">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-brand-charcoal">
              Mengenali Pola Bawah Sadar
            </h3>
            <p className="text-sm text-brand-gray leading-relaxed">
              Sebagian orang cenderung langsung membalas sebelum memahami, sebagian membela diri, menarik diri dalam diam, atau mengorbankan batasan pribadinya. Memetakan pola ini adalah langkah pertama menuju perubahan.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-2xl border border-brand-border bg-brand-ivory/50 p-8 space-y-4 hover:shadow-card transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-brand-rose flex items-center justify-center text-brand-burgundy">
              <Compass className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-brand-charcoal">
              Memberi Jeda Sebelum Memilih
            </h3>
            <p className="text-sm text-brand-gray leading-relaxed">
              Di antara stimulus pemicu dan respons kita, selalu ada ruang jeda. Personal Soul Blueprint™ membantu Anda memperpanjang jeda tersebut agar Anda dapat memilih respons sadar ketimbang reaksi reaktif.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-2xl border border-brand-border bg-brand-ivory/50 p-8 space-y-4 hover:shadow-card transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-brand-rose flex items-center justify-center text-brand-burgundy">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-brand-charcoal">
              Komunikasi yang Memulihkan Relasi
            </h3>
            <p className="text-sm text-brand-gray leading-relaxed">
              Tujuan asesmen ini bukan untuk menghakimi atau memberi label kaku, melainkan menjadi kompas refleksi yang menumbuhkan kejujuran diri, kedewasaan emosi, dan kehangatan relasi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
