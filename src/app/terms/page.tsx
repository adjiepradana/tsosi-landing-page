import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-ivory">
      <Navbar />
      <main className="flex-1 mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-brand-gray hover:text-brand-burgundy"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        <Card className="border border-brand-border bg-white shadow-soft p-6 sm:p-10 space-y-6">
          <div className="space-y-2 border-b border-brand-border/60 pb-6">
            <Badge variant="secondary" className="text-xs font-semibold">
              Syarat & Batasan Penggunaan
            </Badge>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-charcoal">
              Ketentuan Penggunaan Personal Soul Blueprint™
            </h1>
            <p className="text-xs text-brand-gray">
              The Soul of Speaking Indonesia
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-brand-gray leading-relaxed">
            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <ShieldAlert className="h-5 w-5 text-amber-700" />
                <span>Pernyataan Batasan Non-Diagnosis (Penting)</span>
              </div>
              <p className="text-xs leading-relaxed">
                Personal Soul Blueprint™ adalah instrumen psikoedukasi awal dan refleksi diri. Instrumen ini <strong>bukan alat diagnosis psikologis klinis, bukan diagnosis gangguan kejiwaan, bukan pengukuran aktivitas biologis/otak</strong>, dan bukan pengganti konsultasi dengan psikolog klinis atau psikiater berlisensi.
              </p>
            </div>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-brand-charcoal">
                1. Sifat Penggunaan
              </h2>
              <p>
                Platform ini disediakan gratis untuk memfasilitasi peningkatan kesadaran diri (self-awareness) dan pengembangan keterampilan komunikasi interpersonal saat menghadapi situasi konflik, perbedaan pendapat, atau kritik.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-brand-charcoal">
                2. Hak Kekayaan Intelektual
              </h2>
              <p>
                Seluruh metodologi pemetaan 9 pola komunikasi, formulasi pernyataan asesmen, teks interpretasi, desain grafis, logo resmi, dan merek dagang <strong>Personal Soul Blueprint™</strong> serta <strong>The Soul of Speaking Indonesia</strong> adalah hak milik eksklusif The Soul of Speaking Indonesia dan dilindungi oleh undang-undang hak cipta yang berlaku.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-brand-charcoal">
                3. Batasan Tanggung Jawab
              </h2>
              <p>
                Hasil asesmen mencerminkan respons subjektif yang Anda laporkan sendiri pada saat pengisian. Pengambilan keputusan pribadi, relasional, maupun profesional setelah menerima laporan ini sepenuhnya merupakan tanggung jawab mandiri masing-masing individu.
              </p>
            </section>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
