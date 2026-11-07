import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AssessmentRepository } from "@/lib/db/assessment-repository";
import { PatternChart } from "@/components/results/pattern-chart";
import { SevenDayPlan } from "@/components/results/seven-day-plan";
import { ReflectionForm } from "@/components/results/reflection-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Printer,
  Sparkles,
  ShieldCheck,
  Flame,
} from "lucide-react";

interface ResultPageProps {
  params: Promise<{ token: string }>;
}

export default async function AssessmentResultPage({ params }: ResultPageProps) {
  const { token } = await params;
  const result = await AssessmentRepository.getResultByToken(token);

  if (!result || !result.scores) {
    notFound();
  }

  const { submission, participant, scores, reflection } = result;

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  const topPriority = scores.priorityPatterns[0];

  return (
    <div className="min-h-screen bg-white text-brand-charcoal print:bg-white print:text-black">
      {/* Top Floating App Bar */}
      <header className="sticky top-0 z-30 border-b border-brand-border bg-white/95 backdrop-blur-xl py-3 px-3 sm:px-8 no-print">
        <div className="mx-auto max-w-5xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="relative h-8 w-8 sm:h-9 sm:w-9 shrink-0 overflow-hidden rounded-full border-2 border-brand-vibrant/30 p-0.5">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div className="min-w-0">
              <span className="font-black text-xs sm:text-sm text-brand-charcoal block leading-none tracking-tight truncate">
                The Soul of Speaking Indonesia
              </span>
              <span className="hidden xs:inline-block text-[10px] text-brand-vibrant font-extrabold uppercase tracking-wider truncate">
                Personal Soul Blueprint™
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/"
              className="text-xs font-bold text-brand-gray hover:text-brand-vibrant hidden md:inline-block transition-colors"
            >
              Beranda
            </Link>
            {/* Native print button */}
            <a
              href="javascript:window.print()"
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-brand-burgundy to-brand-vibrant hover:brightness-110 text-white px-3 sm:px-4 py-2 text-xs font-black shadow-bold transition-all hover:scale-105"
            >
              <Printer className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
              <span>Cetak / PDF</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Report Body */}
      <main className="mx-auto max-w-5xl px-3 sm:px-6 lg:px-8 pt-5 sm:pt-8 space-y-6 sm:space-y-10">
        {/* Cover / Header Section */}
        <section className="rounded-3xl border-2 border-brand-border bg-white p-5 sm:p-10 lg:p-12 shadow-card print:border-none print:shadow-none print:p-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 border-b border-brand-border pb-6 sm:pb-8">
            <div className="space-y-2 sm:space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-rose px-3.5 py-1 text-[11px] sm:text-xs font-black uppercase tracking-wider text-brand-burgundy border border-brand-vibrant/20">
                <Sparkles className="h-3.5 w-3.5 text-brand-vibrant" />
                <span>Laporan Refleksi Personal Diri</span>
              </div>
              <h1 className="font-black text-2xl sm:text-4xl lg:text-5xl text-brand-charcoal leading-tight tracking-tight">
                Personal Soul Blueprint™
              </h1>
              <p className="text-[11px] sm:text-xs font-black tracking-wider text-brand-vibrant uppercase">
                Conflict Pattern Self-Assessment • Hasil Skoring & Interpretasi
              </p>
            </div>

            <div className="relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-full border-2 border-brand-vibrant bg-white p-1 shadow-md shrink-0">
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
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 rounded-2xl bg-brand-rose/40 p-4 sm:p-5 border-2 border-brand-vibrant/20">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-gray block">
                Nama Responden
              </span>
              <span className="font-black text-base sm:text-lg text-brand-charcoal tracking-tight">
                {participant.fullName}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-gray block">
                Waktu Penyelesaian
              </span>
              <span className="text-xs sm:text-sm font-bold text-brand-charcoal">
                {formatDate(submission.submittedAt)}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-gray block">
                Penyelenggara Resmi
              </span>
              <span className="text-xs sm:text-sm font-black text-brand-vibrant">
                The Soul of Speaking Indonesia
              </span>
            </div>
          </div>

          <p className="mt-3.5 text-[11px] sm:text-xs text-brand-gray italic text-center sm:text-left font-medium">
            Pemetaan sembilan pola komunikasi saat konflik berdasarkan 27 pernyataan refleksi diri. Dokumen refleksi diri • Bukan alat diagnosis.
          </p>
        </section>

        {/* Overall Profile Card */}
        <section className="rounded-3xl border-2 border-brand-border bg-white p-5 sm:p-8 lg:p-10 shadow-card print:border-none print:shadow-none">
          <div className="border-b border-brand-border pb-4 sm:pb-6 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <div>
              <h2 className="font-black text-xl sm:text-3xl text-brand-charcoal tracking-tight">
                Profil Hasil Asesmen
              </h2>
              <p className="text-xs sm:text-sm text-brand-gray font-medium">
                Gambaran umum tingkat kemunculan respons pola komunikasi Anda saat menghadapi situasi tegang.
              </p>
            </div>
          </div>

          {/* Overall score metric box */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
            <div className="md:col-span-5 rounded-3xl border-2 border-brand-vibrant/30 bg-gradient-to-br from-brand-rose/80 via-brand-rose/40 to-white p-5 sm:p-7 text-center space-y-2 sm:space-y-3 shadow-bold">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-brand-gray">
                Rata-rata Keseluruhan
              </span>
              <div className="font-black text-4xl sm:text-5xl text-brand-burgundy tracking-tight">
                {scores.overallScore.toFixed(2)}{" "}
                <span className="text-lg sm:text-xl font-bold text-brand-charcoal/50">/ 5.00</span>
              </div>
              <div className="pt-1">
                <span className="inline-block rounded-xl bg-gradient-to-r from-brand-burgundy to-brand-vibrant text-white px-4 sm:px-5 py-1.5 text-[11px] sm:text-xs font-black shadow-sm uppercase tracking-wider">
                  {scores.overallCategory}
                </span>
              </div>
            </div>

            <div className="md:col-span-7 space-y-3 sm:space-y-3.5">
              <h3 className="font-black text-base sm:text-lg text-brand-charcoal tracking-tight">
                Kategori Deskriptif Keseluruhan
              </h3>
              <p className="text-xs sm:text-sm text-brand-gray font-medium leading-relaxed">
                {scores.overallCategoryDescription}
              </p>
              {topPriority && (
                <div className="rounded-2xl bg-brand-rose/60 p-3.5 sm:p-4 border-2 border-brand-vibrant/30 text-xs text-brand-charcoal flex items-start gap-3">
                  <Flame className="h-5 w-5 text-brand-vibrant shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black text-brand-burgundy block mb-0.5 uppercase tracking-wider text-[10px] sm:text-[11px]">
                      Prioritas Refleksi Utama:
                    </span>
                    <span className="font-medium text-xs">
                      Pola <strong>{topPriority.patternName}</strong> (&ldquo;{topPriority.indonesianTitle}&rdquo;) dengan rating {topPriority.score.toFixed(2)}/5.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Horizontal Chart for 9 Patterns */}
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-brand-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-3 sm:mb-4">
              <div>
                <h3 className="font-black text-lg sm:text-xl text-brand-charcoal tracking-tight">
                  Bagan Profil Sembilan Pola Komunikasi
                </h3>
                <p className="text-[11px] sm:text-xs text-brand-gray font-medium">
                  Skala rating 1.00 hingga 5.00 pada masing-masing pola komunikasi saat menghadapi konflik:
                </p>
              </div>
              <span className="text-[10px] sm:text-[11px] text-brand-vibrant font-bold">
                *Skor lebih tinggi = kecenderungan lebih sering muncul
              </span>
            </div>

            <PatternChart patterns={scores.patternResults} />
          </div>
        </section>

        {/* Priority Patterns Highlights */}
        {scores.priorityPatterns.length > 0 && (
          <section className="rounded-3xl border-2 border-brand-border bg-white p-5 sm:p-8 lg:p-10 shadow-card print:border-none print:shadow-none">
            <div className="space-y-1.5 sm:space-y-2 mb-5 sm:mb-6">
              <Badge className="bg-brand-burgundy text-white text-[10px] sm:text-xs font-black px-3.5 py-1 uppercase tracking-wider">
                Fokus Pengembangan Diri
              </Badge>
              <h2 className="font-black text-xl sm:text-3xl text-brand-charcoal tracking-tight">
                Pola yang Menjadi Prioritas Refleksi
              </h2>
              <p className="text-xs sm:text-sm text-brand-gray font-medium">
                Pola dengan skor tertinggi yang cenderung paling otomatis terpicu ketika Anda merasa terancam, dikritik, atau berselisih paham.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {scores.priorityPatterns.map((priority, idx) => (
                <div
                  key={priority.patternCode}
                  className="rounded-3xl border-2 border-brand-border bg-white p-5 sm:p-7 shadow-soft space-y-3 sm:space-y-4 flex flex-col justify-between hover:shadow-bold hover:border-brand-vibrant transition-all"
                >
                  <div className="space-y-2.5 sm:space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex rounded-lg bg-brand-rose px-2.5 py-1 text-[11px] sm:text-xs font-black text-brand-burgundy uppercase tracking-wider border border-brand-vibrant/20">
                        Prioritas #{idx + 1}
                      </span>
                      <span className="font-black text-base sm:text-lg text-brand-charcoal">
                        {priority.score.toFixed(2)} / 5
                      </span>
                    </div>
                    <div>
                      <h3 className="font-black text-base sm:text-lg text-brand-charcoal tracking-tight">
                        {priority.patternName}
                      </h3>
                      <p className="text-[11px] sm:text-xs font-bold text-brand-vibrant">
                        &ldquo;{priority.indonesianTitle}&rdquo;
                      </p>
                    </div>
                    <p className="text-xs text-brand-gray font-medium leading-relaxed pt-0.5">
                      {priority.categoryRangeDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-brand-border text-xs bg-brand-rose/40 p-3 rounded-2xl border border-brand-vibrant/20">
                    <span className="font-black text-brand-burgundy block mb-1 uppercase tracking-wider text-[10px]">
                      Latihan Kunci:
                    </span>
                    <span className="text-brand-charcoal font-medium leading-relaxed text-[11px] sm:text-xs">
                      {priority.actionAdvice}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Detailed Interpretations for all 9 Patterns */}
        <section className="space-y-4 sm:space-y-6">
          <div className="space-y-1.5 sm:space-y-2">
            <Badge className="bg-brand-rose text-brand-burgundy border-brand-vibrant/20 text-[10px] sm:text-xs font-black px-3.5 sm:px-4 py-1 uppercase tracking-wider">
              Interpretasi Mendalam
            </Badge>
            <h2 className="font-black text-xl sm:text-3xl text-brand-charcoal tracking-tight">
              Interpretasi Setiap Pola Komunikasi
            </h2>
            <p className="text-xs sm:text-sm text-brand-gray font-medium">
              Penjelasan lengkap mengenai definisi baku, rating hasil asesmen Anda, serta arti skor bagi pengembangan kesadaran komunikasi Anda.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {scores.patternResults.map((pattern, idx) => (
              <Card
                key={pattern.patternCode}
                className="border-2 border-brand-border bg-white shadow-soft rounded-3xl overflow-hidden print-card hover:shadow-bold hover:border-brand-vibrant transition-all duration-300"
              >
                <div className="p-5 sm:p-8 space-y-4 sm:space-y-6">
                  {/* Pattern Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 border-b border-brand-border pb-3 sm:pb-4">
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-brand-gray">
                        Pola #0{idx + 1}
                      </span>
                      <h3 className="font-black text-lg sm:text-2xl text-brand-charcoal tracking-tight">
                        {pattern.patternName} —{" "}
                        <span className="text-brand-vibrant font-extrabold">
                          {pattern.indonesianTitle}
                        </span>
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge
                        className={`text-[11px] sm:text-xs font-black px-3 sm:px-3.5 py-1 ${
                          pattern.level === "TINGGI"
                            ? "bg-brand-burgundy text-white"
                            : pattern.level === "SEDANG"
                            ? "bg-brand-rose text-brand-burgundy border border-brand-vibrant/30"
                            : "bg-gray-100 text-gray-700 border border-gray-200"
                        }`}
                      >
                        {pattern.score.toFixed(2)} / 5 • {pattern.category}
                      </Badge>
                    </div>
                  </div>

                  {/* 1. Definisi */}
                  <div className="space-y-1">
                    <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-brand-vibrant">
                      1. Definisi :
                    </h4>
                    <p className="text-xs sm:text-sm text-brand-gray font-medium leading-relaxed">
                      {pattern.interpretationText.split("Definisi :")[0] && pattern.actionAdvice
                        ? `${pattern.patternName} berkaitan dengan respons terhadap ketegangan interpersonal. ${pattern.actionAdvice}`
                        : pattern.interpretationText}
                    </p>
                  </div>

                  {/* 2. Interpretasi rating */}
                  <div className="space-y-1">
                    <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-brand-vibrant">
                      2. Interpretasi Rating : {pattern.score.toFixed(2)}/5 • {pattern.category}
                    </h4>
                    <p className="text-xs sm:text-sm text-brand-gray font-medium leading-relaxed">
                      {pattern.categoryRangeDescription}
                    </p>
                  </div>

                  {/* 3. Arti skor bagi Anda */}
                  <div className="rounded-2xl bg-brand-rose/40 border-2 border-brand-vibrant/20 p-4 sm:p-5 space-y-1.5 sm:space-y-2">
                    <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-brand-charcoal">
                      3. Arti Skor Bagi Anda :
                    </h4>
                    <p className="text-xs sm:text-sm text-brand-charcoal font-medium leading-relaxed">
                      {pattern.interpretationText}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Score Summary Table (Matching PDF Page 5) - Touch Scrollable on Mobile */}
        <section className="rounded-3xl border-2 border-brand-border bg-white p-5 sm:p-8 shadow-card print-card overflow-hidden">
          <h2 className="font-black text-xl sm:text-2xl text-brand-charcoal mb-4 tracking-tight">
            Ringkasan Skor Keseluruhan
          </h2>
          <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
            <table className="w-full min-w-[500px] text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b-2 border-brand-border bg-brand-rose/50">
                  <th className="py-3 px-4 font-black text-brand-charcoal">
                    Pola Komunikasi
                  </th>
                  <th className="py-3 px-4 font-black text-brand-charcoal">
                    Skor Rating
                  </th>
                  <th className="py-3 px-4 font-black text-brand-charcoal">
                    Kategori Deskriptif
                  </th>
                </tr>
              </thead>
              <tbody>
                {scores.patternResults.map((p) => (
                  <tr
                    key={p.patternCode}
                    className="border-b border-brand-border/60 hover:bg-brand-rose/20 transition-colors"
                  >
                    <td className="py-3 px-4 font-bold text-brand-charcoal">
                      {p.patternName.replace(" Pattern", "")}
                    </td>
                    <td className="py-3 px-4 font-black text-brand-vibrant">
                      {p.score.toFixed(2)} / 5
                    </td>
                    <td className="py-3 px-4 font-semibold text-brand-gray">{p.category}</td>
                  </tr>
                ))}
                <tr className="bg-brand-rose/70 font-black">
                  <td className="py-3.5 px-4 text-brand-burgundy font-black">
                    Rata-rata Keseluruhan (27 Pernyataan)
                  </td>
                  <td className="py-3.5 px-4 text-brand-burgundy font-black">
                    {scores.overallScore.toFixed(2)} / 5
                  </td>
                  <td className="py-3.5 px-4 text-brand-burgundy font-black">
                    {scores.overallCategory}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Authentic Methodology & Limitations Disclaimer (PDF Page 5) */}
        <section className="rounded-3xl border-2 border-brand-border bg-white p-5 sm:p-8 lg:p-10 shadow-soft print-card">
          <h3 className="font-black text-lg sm:text-xl text-brand-charcoal mb-2.5 sm:mb-3 flex items-center gap-2 tracking-tight">
            <ShieldCheck className="h-5 w-5 text-brand-vibrant shrink-0" />
            <span>Metode Skoring dan Batas Penggunaan</span>
          </h3>
          <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-brand-gray font-medium leading-relaxed">
            <p>
              Setiap pola terdiri dari tiga item. Skor pola dihitung dengan menjumlahkan skor tiga item lalu membaginya dengan tiga. Skor keseluruhan dihitung dari jumlah 27 jawaban dibagi 27. Kategori rating merupakan rentang deskriptif sementara.
            </p>
            <p>
              Instrumen ini merupakan alat refleksi diri/psikoedukasi awal, bukan alat diagnosis klinis, bukan pengukuran aktivitas otak, dan bukan pengganti asesmen psikologis profesional. Instrumen belum memiliki norma populasi atau bukti validitas-reliabilitas psikometrik.
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
          topPatternTitle={
            topPriority
              ? `${topPriority.patternName} (${topPriority.indonesianTitle})`
              : undefined
          }
        />

        {/* Bottom CTA to home or repeat */}
        <div className="text-center pt-6 sm:pt-8 space-y-4 no-print">
          <p className="text-xs font-medium text-brand-gray">
            Simpan tautan halaman ini untuk mengakses kembali hasil asesmen Anda sewaktu-waktu.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto gap-2 rounded-2xl border-2 text-xs sm:text-sm font-bold py-5 sm:py-6 px-6">
                <span>Kembali ke Beranda Utama</span>
              </Button>
            </Link>
            <a
              href="javascript:window.print()"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-burgundy to-brand-vibrant hover:brightness-110 text-white px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-black shadow-bold transition-all hover:scale-105"
            >
              <Printer className="h-4 w-4" />
              <span>Cetak / Simpan Laporan PDF</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="mt-12 sm:mt-16 py-6 text-center text-xs font-semibold text-brand-gray border-t border-brand-border">
        © {new Date().getFullYear()} The Soul of Speaking Indonesia • Personal Soul Blueprint™ • Dokumen refleksi diri
      </footer>
    </div>
  );
}
