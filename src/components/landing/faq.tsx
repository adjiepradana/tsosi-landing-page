"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Apa itu Personal Soul Blueprint™?",
      a: "Personal Soul Blueprint™ adalah platform asesmen refleksi diri yang dikembangkan oleh The Soul of Speaking Indonesia. Tujuannya adalah memetakan 9 kecenderungan pola komunikasi Anda saat menghadapi konflik, kritik, perbedaan pendapat, atau situasi tegang, sehingga Anda dapat membangun respons komunikasi yang lebih sadar dan sehat.",
    },
    {
      q: "Berapa lama waktu yang dibutuhkan untuk menyelesaikan asesmen?",
      a: "Asesmen ini terdiri dari 27 pernyataan reflektif terstruktur. Rata-rata peserta menyelesaikannya dalam waktu 7 hingga 10 menit tanpa terburu-buru.",
    },
    {
      q: "Apakah asesmen ini berbayar atau memerlukan langganan?",
      a: "Asesmen ini 100% bebas biaya (gratis). Tidak ada biaya pendaftaran, tidak ada paywall berbayar, dan tidak memerlukan informasi kartu kredit atau dompet digital.",
    },
    {
      q: "Apakah informasi pribadi dan data refleksi saya aman?",
      a: "Sangat aman. Data Anda diproses dengan standar keamanan server terenkripsi. Hasil asesmen Anda dilindungi dengan token akses acak yang unik, sehingga hanya Anda yang memegang tautan tersebut yang dapat melihat laporan lengkap Anda.",
    },
    {
      q: "Apakah hasil asesmen ini merupakan diagnosis psikologis profesional?",
      a: "Bukan. Instrumen ini dirancang sebagai sarana refleksi diri dan psikoedukasi awal untuk perkembangan komunikasi interpersonal. Asesmen ini bukan alat diagnosis klinis, bukan pengukuran gelombang otak, dan bukan pengganti konsultasi psikolog atau psikiater profesional.",
    },
    {
      q: "Dapatkah saya mengulang asesmen ini di masa mendatang?",
      a: "Tentu bisa. Pola komunikasi seseorang sangat dinamis dan dapat berkembang seiring bertambahnya kesadaran diri serta latihan. Anda disarankan melakukan refleksi ulang setelah beberapa minggu atau bulan mempraktikkan komunikasi sadar.",
    },
    {
      q: "Bagaimana cara saya mengakses kembali laporan hasil saya?",
      a: "Setiap kali asesmen selesai, sistem membuat tautan pribadi unik dengan token rahasia (contoh: /assessment/result/[token]). Anda dapat menyimpan tautan tersebut, menandainya di peramban (bookmark), atau mencetak/menyimpannya dalam format PDF melalui tombol Cetak Laporan.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-brand-ivory/50 border-t border-brand-border/60">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="px-3.5 py-1 text-xs">
            Pertanyaan Umum
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-charcoal">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-brand-gray">
            Temukan jawaban atas hal-hal penting seputar asesmen dan metodologi Personal Soul Blueprint™.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-brand-border bg-white transition-all duration-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-brand-charcoal pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-brand-burgundy shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-brand-gray leading-relaxed border-t border-brand-border/40 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
