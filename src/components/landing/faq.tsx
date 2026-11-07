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
      a: "Asesmen ini terdiri dari 27 pernyataan reflektif terstruktur. Rata-rata peserta menyelesaikannya dalam waktu 5 hingga 7 menit tanpa terburu-buru.",
    },
    {
      q: "Apakah asesmen ini berbayar atau memerlukan langganan?",
      a: "Asesmen ini 100% bebas biaya (gratis). Tidak ada biaya pendaftaran, tidak ada paywall berbayar, dan tidak memerlukan informasi kartu kredit atau dompet digital.",
    },
    {
      q: "Apakah informasi pribadi dan data refleksi saya aman?",
      a: "Sangat aman. Data Anda diproses dengan standar enkripsi server. Hasil asesmen Anda dilindungi dengan token akses acak yang unik, sehingga hanya Anda yang memegang tautan tersebut yang dapat melihat laporan lengkap Anda.",
    },
    {
      q: "Apakah hasil asesmen ini merupakan diagnosis psikologis profesional?",
      a: "Bukan. Instrumen ini dirancang sebagai sarana refleksi diri dan psikoedukasi untuk perkembangan komunikasi interpersonal. Asesmen ini bukan alat diagnosis klinis dan bukan pengganti konsultasi psikolog atau psikiater profesional.",
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
    <section id="faq" className="py-24 bg-white border-t border-brand-border">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-brand-rose text-brand-burgundy border-brand-vibrant/20 px-4 py-1 text-xs font-black uppercase tracking-wider">
            Pertanyaan Umum
          </Badge>
          <h2 className="font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-brand-charcoal">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-brand-gray font-medium">
            Temukan jawaban atas hal-hal penting seputar asesmen dan metodologi Personal Soul Blueprint™.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border-2 border-brand-border bg-white transition-all duration-200 overflow-hidden hover:border-brand-vibrant/50 shadow-soft"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-extrabold text-base sm:text-lg text-brand-charcoal pr-4 tracking-tight">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-brand-vibrant shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-brand-gray font-medium leading-relaxed border-t border-brand-border pt-4">
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
