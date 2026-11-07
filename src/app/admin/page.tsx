import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AdminNav } from "@/components/admin/admin-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AssessmentRepository } from "@/lib/db/assessment-repository";
import { formatDate } from "@/lib/utils";
import {
  Users,
  CheckCircle2,
  Clock,
  Calendar,
  TrendingUp,
  Flame,
  ArrowRight,
  ExternalLink,
  Download,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("tsosi_admin_session");

  if (!session || session.value !== "authenticated_admin_user") {
    redirect("/admin/login");
  }

  const stats = await AssessmentRepository.getDashboardStats();
  const recentList = await AssessmentRepository.getParticipantsList({ limit: 5 });

  return (
    <div className="min-h-screen bg-brand-ivory flex flex-col justify-between">
      <div>
        <AdminNav />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border/60 pb-6">
            <div>
              <h1 className="font-serif text-3xl font-bold text-brand-charcoal">
                Ringkasan Eksekutif Asesmen
              </h1>
              <p className="text-xs sm:text-sm text-brand-gray pt-1">
                Monitoring metrik partisipan, pola komunikasi dominan, dan tren hasil Personal Soul Blueprint™.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/admin/participants">
                <Button className="gap-2 bg-brand-burgundy hover:bg-brand-plum text-white text-xs font-semibold">
                  <Users className="h-4 w-4" />
                  <span>Daftar Semua Partisipan</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="border border-brand-border bg-white shadow-soft">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-gray">
                    Total Partisipan
                  </span>
                  <div className="font-serif text-3xl font-bold text-brand-charcoal mt-1">
                    {stats.totalParticipants}
                  </div>
                  <span className="text-[11px] text-brand-gray">Terdaftar di sistem</span>
                </div>
                <div className="h-12 w-12 rounded-xl bg-brand-rose flex items-center justify-center text-brand-burgundy">
                  <Users className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-brand-border bg-white shadow-soft">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-gray">
                    Asesmen Selesai
                  </span>
                  <div className="font-serif text-3xl font-bold text-emerald-700 mt-1">
                    {stats.totalCompleted}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium">Laporan terbit</span>
                </div>
                <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-brand-border bg-white shadow-soft">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-gray">
                    Hari Ini / Minggu Ini
                  </span>
                  <div className="font-serif text-3xl font-bold text-brand-plum mt-1">
                    {stats.submittedToday} <span className="text-base text-brand-gray font-normal">/ {stats.submittedThisWeek}</span>
                  </div>
                  <span className="text-[11px] text-brand-gray">Aktivitas terkini</span>
                </div>
                <div className="h-12 w-12 rounded-xl bg-brand-rose flex items-center justify-center text-brand-burgundy">
                  <Calendar className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-brand-border bg-white shadow-soft">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-gray">
                    Pola Terbanyak
                  </span>
                  <div className="font-serif text-lg font-bold text-brand-burgundy mt-1 truncate max-w-[140px]">
                    {stats.topPattern.name.replace(" Pattern", "")}
                  </div>
                  <span className="text-[11px] text-brand-gray font-medium">
                    {stats.topPatternFrequency} responden dominan
                  </span>
                </div>
                <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700">
                  <Flame className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Visuals: Pattern Averages */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Card className="lg:col-span-8 border border-brand-border bg-white shadow-soft">
              <CardHeader className="border-b border-brand-border/60 pb-4">
                <CardTitle className="font-serif text-xl text-brand-charcoal">
                  Rata-rata Skor Sembilan Pola Komunikasi (Agregat)
                </CardTitle>
                <p className="text-xs text-brand-gray">
                  Tingkat kemunculan masing-masing pola dari seluruh partisipan yang telah menyelesaikan asesmen.
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3.5">
                  {stats.patternAverages.map((item) => {
                    const pct = (item.average / 5) * 100;
                    return (
                      <div key={item.code} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-semibold text-brand-charcoal">{item.patternName}</span>
                          <span className="font-bold text-brand-burgundy">
                            {item.average.toFixed(2)} / 5.00
                          </span>
                        </div>
                        <div className="w-full bg-brand-rose h-2.5 rounded-full overflow-hidden">
                          <div
                            className="bg-brand-burgundy h-full rounded-full transition-all duration-300"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Pattern Distribution Sidebar */}
            <Card className="lg:col-span-4 border border-brand-border bg-white shadow-soft">
              <CardHeader className="border-b border-brand-border/60 pb-4">
                <CardTitle className="font-serif text-xl text-brand-charcoal">
                  Frekuensi Pola Prioritas Utama
                </CardTitle>
                <p className="text-xs text-brand-gray">
                  Jumlah partisipan yang memiliki pola tersebut sebagai peringkat pertama.
                </p>
              </CardHeader>
              <CardContent className="pt-6 space-y-3">
                {Object.entries(stats.patternDistribution).map(([code, count]) => (
                  <div
                    key={code}
                    className="flex items-center justify-between p-3 rounded-xl bg-brand-ivory/60 border border-brand-border/40 text-xs"
                  >
                    <span className="font-medium text-brand-charcoal truncate">{code}</span>
                    <Badge variant="secondary" className="font-bold">
                      {count} orang
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Submissions Table */}
          <Card className="border border-brand-border bg-white shadow-soft">
            <CardHeader className="border-b border-brand-border/60 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="font-serif text-xl text-brand-charcoal">
                  Partisipan Terkini
                </CardTitle>
                <p className="text-xs text-brand-gray">
                  5 asesmen terakhir yang berhasil diselesaikan oleh responden.
                </p>
              </div>
              <Link href="/admin/participants" className="text-xs font-semibold text-brand-burgundy hover:underline flex items-center gap-1">
                <span>Lihat semua partisipan</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardHeader>

            <CardContent className="pt-4 p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-brand-border bg-brand-rose/20 text-brand-gray uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-6">Nama Partisipan</th>
                      <th className="py-3 px-4">Kontak</th>
                      <th className="py-3 px-4">Waktu Selesai</th>
                      <th className="py-3 px-4">Skor / Kategori</th>
                      <th className="py-3 px-4">Pola Utama</th>
                      <th className="py-3 px-6 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/40">
                    {recentList.participants.map((p) => (
                      <tr key={p.submissionId} className="hover:bg-brand-ivory/40">
                        <td className="py-3 px-6 font-bold text-brand-charcoal">
                          {p.name}
                        </td>
                        <td className="py-3 px-4 text-brand-gray">
                          <div>{p.email}</div>
                          <div className="text-[11px] text-brand-gray/80">{p.phone}</div>
                        </td>
                        <td className="py-3 px-4 text-brand-gray">
                          {formatDate(p.submittedAt)}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-brand-burgundy">
                            {p.overallScore.toFixed(2)}/5
                          </span>
                          <span className="block text-[10px] text-brand-gray">
                            {p.overallCategory}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className="text-[10px]">
                            {p.primaryPatternCode}
                          </Badge>
                        </td>
                        <td className="py-3 px-6 text-right space-x-2">
                          <Link
                            href={`/admin/participants/${p.submissionId}`}
                            className="inline-flex items-center gap-1 text-xs text-brand-burgundy font-semibold hover:underline"
                          >
                            <span>Detail</span>
                          </Link>
                          <Link
                            href={`/assessment/result/${p.resultToken}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-xs text-brand-gray hover:text-brand-burgundy"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      <footer className="py-4 text-center text-xs text-brand-gray border-t border-brand-border/60 bg-white">
        © {new Date().getFullYear()} The Soul of Speaking Indonesia • Personal Soul Blueprint™
      </footer>
    </div>
  );
}
