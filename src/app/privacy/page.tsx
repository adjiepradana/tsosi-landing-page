import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
              Kebijakan Privasi Data
            </Badge>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-charcoal">
              Perlindungan & Privasi Data Partisipan
            </h1>
            <p className="text-xs text-brand-gray">
              Berlaku sejak 1 November 2026 • The Soul of Speaking Indonesia
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-brand-gray leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-brand-charcoal">
                1. Komitmen Privasi
              </h2>
              <p>
                The Soul of Speaking Indonesia menghormati sepenuhnya privasi Anda. Kami menyadari bahwa kejujuran dalam mengisi instrumen refleksi diri seperti <strong>Personal Soul Blueprint™</strong> memerlukan rasa aman emosional dan jaminan kerahasiaan data yang ketat.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-brand-charcoal">
                2. Data yang Kami Kumpulkan
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Identitas Dasar:</strong> Nama lengkap, alamat email aktif, dan nomor kontak (WhatsApp).</li>
                <li><strong>Respons Asesmen:</strong> Nilai jawaban (skala 1-5) dari 27 pernyataan reflektif.</li>
                <li><strong>Refleksi Mandiri:</strong> Catatan situasi pemicu, pikiran otomatis, dan alternatif respons yang Anda inputkan secara sukarela pada formulir refleksi.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-brand-charcoal">
                3. Tujuan Pemrosesan Data
              </h2>
              <p>
                Informasi Anda diproses semata-mata untuk:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Menghitung skor dan memetakan 9 pola komunikasi Anda secara akurat melalui mesin skoring kami.</li>
                <li>Menghasilkan tautan laporan personal ber-token aman yang dapat Anda simpan atau cetak.</li>
                <li>Analisis statistik agregat (tanpa identitas pribadi) untuk peningkatan kualitas program pembelajaran The Soul of Speaking Indonesia.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-brand-charcoal">
                4. Keamanan Akses & Tokenisasi
              </h2>
              <p>
                Hasil asesmen Anda tidak dipublikasikan ke daftar publik dan tidak dapat diakses oleh partisipan lain. Akses menuju laporan Anda dilindungi oleh <strong>token acak kriptografis unik</strong> yang disimpan dalam bentuk hash (SHA-256) pada basis data kami.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-brand-charcoal">
                5. Tidak Ada Penjualan Data
              </h2>
              <p>
                Kami tidak pernah dan tidak akan pernah menjual, menyewakan, atau membagikan data identitas pribadi maupun hasil refleksi Anda kepada pihak ketiga untuk kepentingan periklanan atau komersialisasi apa pun.
              </p>
            </section>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
