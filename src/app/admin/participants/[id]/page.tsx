import React from "react";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { AdminNav } from "@/components/admin/admin-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AssessmentRepository } from "@/lib/db/assessment-repository";
import { formatDate } from "@/lib/utils";
import { PatternChart } from "@/components/results/pattern-chart";
import {
  ArrowLeft,
  ExternalLink,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  User,
} from "lucide-react";

interface ParticipantDetailProps {
  params: Promise<{ id: string }>;
}

export default async function ParticipantDetailPage({
  params,
}: ParticipantDetailProps) {
  const cookieStore = await cookies();
  const session = cookieStore.get("tsosi_admin_session");

  if (!session || session.value !== "authenticated_admin_user") {
    redirect("/admin/login");
  }

  const resolvedParams = await params;
  const submissionId = resolvedParams.id;

  const data = await AssessmentRepository.getParticipantDetail(submissionId);

  if (!data) {
    notFound();
  }

  const { participant, submission, scores, answers, reflection, questions } = data;

  return (
    <div className="min-h-screen bg-brand-ivory flex flex-col justify-between">
      <div>
        <AdminNav />

        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Header & Breadcrumb */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border/60 pb-6">
            <div className="space-y-1">
              <Link
                href="/admin/participants"
                className="text-xs text-brand-gray hover:text-brand-burgundy inline-flex items-center gap-1"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>Kembali ke Daftar Partisipan</span>
              </Link>
              <h1 className="font-serif text-3xl font-bold text-brand-charcoal">
                Detail Asesmen: {participant.fullName}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/assessment/result/${submission.resultToken}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 rounded-xl border border-brand-border bg-white px-4 py-2 text-xs font-semibold text-brand-charcoal hover:bg-brand-ivory transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5 text-brand-burgundy" />
                <span>Buka Laporan Publik</span>
              </Link>
            </div>
          </div>

          {/* Profile Overview Card */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card className="border border-brand-border bg-white p-5 shadow-soft">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-gray block">
                Nama Lengkap
              </span>
              <div className="font-serif text-lg font-bold text-brand-charcoal mt-1 flex items-center gap-2">
                <User className="h-4 w-4 text-brand-burgundy" />
                <span>{participant.fullName}</span>
              </div>
            </Card>

            <Card className="border border-brand-border bg-white p-5 shadow-soft">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-gray block">
                Email
              </span>
              <div className="text-xs sm:text-sm font-medium text-brand-charcoal mt-1 flex items-center gap-2 truncate">
                <Mail className="h-4 w-4 text-brand-burgundy shrink-0" />
                <span className="truncate">{participant.email}</span>
              </div>
            </Card>

            <Card className="border border-brand-border bg-white p-5 shadow-soft">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-gray block">
                Nomor WhatsApp
              </span>
              <div className="text-xs sm:text-sm font-medium text-brand-charcoal mt-1 flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-burgundy" />
                <span>{participant.phone}</span>
              </div>
            </Card>

            <Card className="border border-brand-border bg-white p-5 shadow-soft">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-gray block">
                Waktu Submit
              </span>
              <div className="text-xs sm:text-sm font-medium text-brand-charcoal mt-1 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand-burgundy" />
                <span>{formatDate(submission.submittedAt || submission.createdAt)}</span>
              </div>
            </Card>
          </div>

          {/* Scores & Horizontal Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <Card className="lg:col-span-5 border border-brand-border bg-white p-6 shadow-soft flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-brand-charcoal">
                  Ringkasan Nilai Asesmen
                </h3>
                <div className="rounded-2xl bg-brand-rose/40 border border-brand-burgundy/20 p-6 text-center space-y-2">
                  <span className="text-xs uppercase font-semibold text-brand-gray">
                    Skor Rata-rata Keseluruhan
                  </span>
                  <div className="font-serif text-4xl font-bold text-brand-burgundy">
                    {scores.overallScore.toFixed(2)}{" "}
                    <span className="text-sm font-normal text-brand-charcoal/60">/ 5</span>
                  </div>
                  <Badge variant="secondary" className="font-bold">
                    {scores.overallCategory}
                  </Badge>
                </div>
                <p className="text-xs text-brand-gray leading-relaxed">
                  {scores.overallCategoryDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-brand-border/60">
                <span className="text-xs font-bold text-brand-charcoal block mb-1">
                  Pola Prioritas Tertinggi:
                </span>
                <span className="text-xs text-brand-burgundy font-bold">
                  {scores.priorityPatterns[0]?.patternName} ({scores.priorityPatterns[0]?.indonesianTitle})
                </span>
              </div>
            </Card>

            <Card className="lg:col-span-7 border border-brand-border bg-white p-6 shadow-soft">
              <h3 className="font-serif text-xl font-bold text-brand-charcoal mb-2">
                Distribusi 9 Pola Komunikasi
              </h3>
              <PatternChart patterns={scores.patternResults} />
            </Card>
          </div>

          {/* All 27 Questions Responses Audit Table */}
          <Card className="border border-brand-border bg-white shadow-soft">
            <CardHeader className="border-b border-brand-border/60 pb-4">
              <CardTitle className="font-serif text-xl text-brand-charcoal">
                Audit Lengkap 27 Jawaban Pernyataan
              </CardTitle>
              <p className="text-xs text-brand-gray">
                Rekapitulasi jawaban asli yang dipilih responden pada setiap pernyataan (Skala 1 - 5).
              </p>
            </CardHeader>
            <CardContent className="pt-4 p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-brand-border bg-brand-rose/20 text-brand-gray uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-4 text-center w-12">No</th>
                      <th className="py-3 px-3 w-16">Kode</th>
                      <th className="py-3 px-4">Pernyataan Asesmen</th>
                      <th className="py-3 px-4 w-40">Pola Terkait</th>
                      <th className="py-3 px-6 text-center w-24">Nilai (1-5)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/40">
                    {questions.map((q) => {
                      const val = answers[q.itemNumber] || "-";
                      return (
                        <tr key={q.itemNumber} className="hover:bg-brand-ivory/30">
                          <td className="py-3 px-4 text-center font-bold text-brand-gray">
                            {q.itemNumber}
                          </td>
                          <td className="py-3 px-3 font-mono font-bold text-brand-burgundy">
                            {q.questionCode}
                          </td>
                          <td className="py-3 px-4 text-brand-charcoal leading-relaxed">
                            {q.questionText}
                          </td>
                          <td className="py-3 px-4 text-brand-gray text-[11px]">
                            {q.patternCode}
                          </td>
                          <td className="py-3 px-6 text-center">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-rose text-brand-burgundy font-bold">
                              {val}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Participant Reflection if exists */}
          {reflection && (
            <Card className="border border-brand-border bg-white shadow-soft">
              <CardHeader className="border-b border-brand-border/60 pb-4">
                <CardTitle className="font-serif text-xl text-brand-charcoal">
                  Catatan Refleksi Mandiri Partisipan
                </CardTitle>
                <p className="text-xs text-brand-gray">
                  Jawaban formulir refleksi diri yang diinput oleh responden setelah menerima laporan hasil.
                </p>
              </CardHeader>
              <CardContent className="pt-6 space-y-4 text-xs sm:text-sm">
                <div>
                  <span className="font-bold text-brand-burgundy block">1. Situasi Pemicu:</span>
                  <p className="text-brand-charcoal mt-1 bg-brand-ivory/60 p-3 rounded-xl border border-brand-border/40">
                    {reflection.triggerSituation || "-"}
                  </p>
                </div>
                <div>
                  <span className="font-bold text-brand-burgundy block">2. Pikiran Otomatis:</span>
                  <p className="text-brand-charcoal mt-1 bg-brand-ivory/60 p-3 rounded-xl border border-brand-border/40">
                    {reflection.automaticThoughts || "-"}
                  </p>
                </div>
                <div>
                  <span className="font-bold text-brand-burgundy block">3. Emosi & Sensasi Tubuh:</span>
                  <p className="text-brand-charcoal mt-1 bg-brand-ivory/60 p-3 rounded-xl border border-brand-border/40">
                    {reflection.emotions || "-"}
                  </p>
                </div>
                <div>
                  <span className="font-bold text-brand-burgundy block">4. Respons yang Diambil:</span>
                  <p className="text-brand-charcoal mt-1 bg-brand-ivory/60 p-3 rounded-xl border border-brand-border/40">
                    {reflection.responseTaken || "-"}
                  </p>
                </div>
                <div>
                  <span className="font-bold text-brand-burgundy block">5. Respons Alternatif yang Sadar:</span>
                  <p className="text-brand-charcoal mt-1 bg-brand-rose/30 p-3 rounded-xl border border-brand-burgundy/20">
                    {reflection.alternativeResponse || "-"}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>

      <footer className="py-4 text-center text-xs text-brand-gray border-t border-brand-border/60 bg-white">
        © {new Date().getFullYear()} The Soul of Speaking Indonesia • Personal Soul Blueprint™
      </footer>
    </div>
  );
}
