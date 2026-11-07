import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AssessmentRepository } from "@/lib/db/assessment-repository";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PatternChart } from "@/components/results/pattern-chart";
import { ReflectionForm } from "@/components/results/reflection-form";
import { SevenDayPlan } from "@/components/results/seven-day-plan";
import { formatDate } from "@/lib/utils";
import {
  Printer,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
} from "lucide-react";

interface ResultPageProps {
  params: Promise<{ token: string }>;
}

export default async function AssessmentResultPage({ params }: ResultPageProps) {
  const resolvedParams = await params;
  const token = resolvedParams.token;

  const resultData = await AssessmentRepository.getResultByToken(token);

  if (!resultData) {
    notFound();
  }

  const { participant, submission, scores, reflection } = resultData;
  const topPriority = scores.priorityPatterns[0];

  return (
    <div className="min-h-screen bg-brand-ivory pb-20">
      {/* Top action bar (hidden during print) */}
      <header className="sticky top-0 z-40 border-b border-brand-border/60 bg-white/95 backdrop-blur-md py-3.5 px-4 sm:px-8 no-print">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-brand-burgundy/20">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-serif font-bold text-xs sm:text-sm text-brand-charcoal block leading-none">
                The Soul of Speaking Indonesia
              </span>
              <span className="text-[10px] text-brand-burgundy font-medium uppercase tracking-wider">
                Personal Soul Blueprint™
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs text-brand-gray hover:text-brand-burgundy hidden sm:inline-block">
              Beranda
            </Link>
            {/* Native print button */}
            <a
              href="javascript:window.print()"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-burgundy hover:bg-brand-plum text-white px-4 py-2 text-xs font-semibold shadow-soft transition-colors"
            >
              <Printer className="h-4 w-4" />
              <span>Cetak / Simpan PDF</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Report Body */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        {/* Cover / Header Section */}
        <section className="rounded-3xl border border-brand-border bg-white p-8 sm:p-12 shadow-card print:border-none print:shadow-none print:p-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-brand-border/60 pb-8">
            <div className="space-y-2">
              <Badge variant="secondary" className="px-3.5 py-1 text-xs font-semibold">
                Laporan Refleksi Personal
              </Badge>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-charcoal leading-tight">
                Personal Soul Blueprint™
              </h1>
              <p className="text-xs sm:text-sm font-semibold tracking-wider text-brand-burgundy uppercase">
                Conflict Pattern Self-Assessment • Hasil Skoring & Interpretasi
              </p>
            </div>

            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-brand-burgundy/30 shrink-0">
              <Image
                src="/images/logo.png"
                alt="Brand Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </div>

          {/* Participant Info Banner */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl bg-brand-ivory/60 p-5 border border-brand-border/60">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-gray block">
                Nama Responden
              </span>
              <span className="font-serif text-lg font-bold text-brand-charcoal">
                {participant.fullName}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-gray block">
                Tanggal Asesmen
              </span>
              <span className="text-sm font-medium text-brand-charcoal">
                {formatDate(submission.submittedAt)}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-gray block">
                Penyelenggara
              </span>
              <span className="text-sm font-medium text-brand-burgundy">
                The Soul of Speaking Indonesia
              </span>
            </div>
          </div>

          <p className="mt-4 text-xs text-brand-gray italic text-center sm:text-left">
            Pemetaan sembilan pola komunikasi saat konflik berdasarkan 27 pernyataan refleksi diri. Dokumen refleksi diri • Bukan alat diagnosis.
          </p>
        </section>

        {/* Overall Profile Card */}
        <section className="rounded-3xl border border-brand-border bg-white p-8 shadow-card print:border-none print:shadow-none">
          <div className="border-b border-brand-border/60 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
                Profil Hasil Asesmen
              </h2>
              <p className="text-xs sm:text-sm text-brand-gray">
                Gambaran umum tingkat kemunculan respons pola komunikasi Anda saat menghadapi situasi tegang.
              </p>
            </div>
          </div>

          {/* Overall score metric box */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 rounded-2xl border border-brand-burgundy/20 bg-brand-rose/40 p-6 text-center space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-gray">
                Rata-rata Keseluruhan
              </span>
              <div className="font-serif text-4xl sm:text-5xl font-bold text-brand-burgundy">
                {scores.overallScore.toFixed(2)}{" "}
                <span className="text-lg font-normal text-brand-charcoal/60">/ 5</span>
              </div>
              <div className="pt-2">
                <span className="inline-block rounded-full bg-white px-4 py-1 text-xs font-bold text-brand-burgundy border border-brand-burgundy/20">
                  {scores.overallCategory}
                </span>
              </div>
            </div>

            <div className="md:col-span-7 space-y-3">
              <h3 className="font-serif text-lg font-bold text-brand-charcoal">
                Kategori Deskriptif Keseluruhan
              </h3>
              <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
                {scores.overallCategoryDescription}
              </p>
              {topPriority && (
                <div className="rounded-xl bg-brand-ivory p-3.5 border border-brand-border/60 text-xs text-brand-charcoal">
                  <span className="font-bold text-brand-burgundy">Prioritas Refleksi Utama: </span>
                  <span>
                    <strong>{topPriority.patternName}</strong> ({topPriority.indonesianTitle}) dengan skor {topPriority.score.toFixed(2)}/5.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Horizontal Chart for 9 Patterns */}
          <div className="mt-10 pt-8 border-t border-brand-border/60">
            <h3 className="font-serif text-xl font-bold text-brand-charcoal mb-2">
              Bagan Profil Sembilan Pola Komunikasi
            </h3>
            <p className="text-xs text-brand-gray mb-4">
              Nilai rating 1.00 hingga 5.00 pada masing-masing pola komunikasi saat menghadapi konflik:
            </p>
            <PatternChart patterns={scores.patternResults} />
          </div>
        </section>

        {/* Priority Patterns Highlights */}
        {scores.priorityPatterns.length > 0 && (
          <section className="rounded-3xl border border-brand-border bg-gradient-to-br from-brand-rose/30 via-white to-brand-ivory/40 p-8 shadow-card print:border-none print:shadow-none">
            <div className="space-y-2 mb-6">
              <Badge variant="default" className="text-xs font-semibold">
                Fokus Pengembangan
              </Badge>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
                Pola yang Menjadi Prioritas Refleksi
              </h2>
              <p className="text-xs sm:text-sm text-brand-gray">
                Pola dengan skor tertinggi yang cenderung paling sering terpicu secara otomatis ketika Anda merasa terancam, dikritik, atau berselisih.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {scores.priorityPatterns.map((priority, idx) => (
                <div
                  key={priority.patternCode}
                  className="rounded-2xl border border-brand-border bg-white p-6 shadow-soft space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-burgundy uppercase tracking-wider">
                        Prioritas #{idx + 1}
                      </span>
                      <span className="font-serif font-bold text-base text-brand-charcoal">
                        {priority.score.toFixed(2)} / 5
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-brand-charcoal">
                      {priority.patternName}
                    </h3>
                    <p className="text-xs font-semibold text-brand-burgundy italic">
                      {priority.indonesianTitle}
                    </p>
                    <p className="text-xs text-brand-gray leading-relaxed pt-1">
                      {priority.categoryRangeDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-brand-border/60 text-xs">
                    <span className="font-bold text-brand-charcoal block mb-1">
                      Latihan Kunci:
                    </span>
                    <span className="text-brand-gray leading-relaxed">
                      {priority.actionAdvice}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Detailed Interpretations for all 9 Patterns */}
        <section className="space-y-6">
          <div className="space-y-2">
            <Badge variant="secondary" className="text-xs font-semibold">
              Interpretasi Mendalam
            </Badge>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
              Interpretasi Setiap Pola Komunikasi
            </h2>
            <p className="text-xs sm:text-sm text-brand-gray">
              Penjelasan lengkap mengenai definisi, rating hasil asesmen Anda, serta arti skor bagi pengembangan kesadaran komunikasi Anda.
            </p>
          </div>

          <div className="space-y-6">
            {scores.patternResults.map((pattern, idx) => (
              <Card
                key={pattern.patternCode}
                className="border border-brand-border bg-white shadow-soft rounded-2xl overflow-hidden print-card"
              >
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Pattern Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-border/60 pb-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gray">
                        Pola #0{idx + 1}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-charcoal">
                        {pattern.patternName} —{" "}
                        <span className="text-brand-burgundy font-normal italic">
                          {pattern.indonesianTitle}
                        </span>
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          pattern.level === "TINGGI"
                            ? "default"
                            : pattern.level === "SEDANG"
                            ? "secondary"
                            : "outline"
                        }
                        className="text-xs font-bold"
                      >
                        {pattern.score.toFixed(2)} / 5 • {pattern.category}
                      </Badge>
                    </div>
                  </div>

                  {/* 1. Definisi */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-burgundy">
                      1. Definisi :
                    </h4>
                    <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
                      {pattern.interpretationText.split("Definisi :")[0] && pattern.actionAdvice
                        ? `${pattern.patternName} berkaitan dengan respons terhadap ketegangan interpersonal. ${pattern.actionAdvice}`
                        : pattern.interpretationText}
                    </p>
                  </div>

                  {/* 2. Interpretasi rating */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-burgundy">
                      2. Interpretasi Rating : {pattern.score.toFixed(2)}/5 • {pattern.category}
                    </h4>
                    <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
                      {pattern.categoryRangeDescription}
                    </p>
                  </div>

                  {/* 3. Arti skor bagi Anda */}
                  <div className="rounded-2xl bg-brand-ivory/50 border border-brand-border/60 p-5 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">
                      3. Arti Skor Bagi Anda :
                    </h4>
                    <p className="text-xs sm:text-sm text-brand-charcoal/90 leading-relaxed">
                      {pattern.interpretationText}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Score Summary Table (Matching PDF Page 5) */}
        <section className="rounded-3xl border border-brand-border bg-white p-8 shadow-card print-card">
          <h2 className="font-serif text-2xl font-bold text-brand-charcoal mb-4">
            Ringkasan Skor Keseluruhan
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-brand-border bg-brand-rose/30">
                  <th className="py-3 px-4 font-serif font-bold text-brand-charcoal">
                    Pola Komunikasi
                  </th>
                  <th className="py-3 px-4 font-serif font-bold text-brand-charcoal">
                    Skor
                  </th>
                  <th className="py-3 px-4 font-serif font-bold text-brand-charcoal">
                    Kategori Deskriptif
                  </th>
                </tr>
              </thead>
              <tbody>
                {scores.patternResults.map((p) => (
                  <tr
                    key={p.patternCode}
                    className="border-b border-brand-border/40 hover:bg-brand-ivory/30"
                  >
                    <td className="py-2.5 px-4 font-medium text-brand-charcoal">
                      {p.patternName.replace(" Pattern", "")}
                    </td>
                    <td className="py-2.5 px-4 font-bold text-brand-burgundy">
                      {p.score.toFixed(2)}/5
                    </td>
                    <td className="py-2.5 px-4 text-brand-gray">{p.category}</td>
                  </tr>
                ))}
                <tr className="bg-brand-rose/40 font-bold">
                  <td className="py-3 px-4 text-brand-burgundy font-serif">
                    Keseluruhan (Rata-rata 27 Item)
                  </td>
                  <td className="py-3 px-4 text-brand-burgundy font-serif">
                    {scores.overallScore.toFixed(2)}/5
                  </td>
                  <td className="py-3 px-4 text-brand-burgundy">
                    {scores.overallCategory}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Authentic Methodology & Limitations Disclaimer (PDF Page 5) */}
        <section className="rounded-3xl border border-brand-border bg-brand-ivory p-8 shadow-soft print-card">
          <h3 className="font-serif text-xl font-bold text-brand-charcoal mb-3 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-brand-burgundy" />
            <span>Metode Skoring dan Batas Penggunaan</span>
          </h3>
          <div className="space-y-3 text-xs sm:text-sm text-brand-gray leading-relaxed">
            <p>
              Setiap pola terdiri dari tiga item. Skor pola dihitung dengan menjumlahkan skor tiga item lalu membaginya dengan tiga. Skor keseluruhan dihitung dari jumlah 27 jawaban dibagi 27. Kategori rating merupakan rentang deskriptif sementara.
            </p>
            <p>
              Instrumen ini merupakan alat refleksi diri/psikoedukasi awal, bukan alat diagnosis, bukan pengukuran aktivitas otak, dan bukan pengganti asesmen psikologis profesional. Instrumen belum memiliki norma populasi atau bukti validitas-reliabilitas psikometrik.
            </p>
            <p>
              Gunakan hasil sebagai titik awal percakapan dan refleksi. Konteks, intensitas, dampak pada hubungan, serta kemampuan memperbaiki hubungan setelah konflik tetap perlu dipertimbangkan.
            </p>
          </div>
        </section>

        {/* Seven-Day Conscious Communication Practice */}
        <SevenDayPlan />

        {/* Interactive Participant Reflection Form */}
        <ReflectionForm
          token={token}
          initialReflection={reflection}
          topPatternTitle={topPriority ? `${topPriority.patternName} (${topPriority.indonesianTitle})` : undefined}
        />

        {/* Bottom CTA to home or repeat */}
        <div className="text-center pt-8 space-y-4 no-print">
          <p className="text-xs text-brand-gray">
            Simpan tautan halaman ini untuk mengakses kembali hasil asesmen Anda sewaktu-waktu.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <span>Kembali ke Beranda Utama</span>
              </Button>
            </Link>
            <a
              href="javascript:window.print()"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-burgundy hover:bg-brand-plum text-white px-6 py-3 text-sm font-semibold shadow-soft"
            >
              <Printer className="h-4 w-4" />
              <span>Cetak Hasil Asesmen</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="mt-16 py-6 text-center text-xs text-brand-gray border-t border-brand-border/60">
        © {new Date().getFullYear()} The Soul of Speaking Indonesia • Personal Soul Blueprint™ • Dokumen refleksi diri
      </footer>
    </div>
  );
}
