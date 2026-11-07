import React from "react";
import Link from "next/link";
import { AdminNav } from "@/components/admin/admin-nav";
import { AssessmentRepository } from "@/lib/db/assessment-repository";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  CheckCircle2,
  Calendar,
  Flame,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const stats = await AssessmentRepository.getDashboardStats();
  const recentList = await AssessmentRepository.getParticipantsList({
    page: 1,
    limit: 5,
  });

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

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <div>
        <AdminNav />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-brand-border pb-6">
            <div>
              <h1 className="font-black text-3xl text-brand-charcoal tracking-tight">
                Ringkasan Eksekutif Asesmen
              </h1>
              <p className="text-xs sm:text-sm text-brand-gray font-medium pt-1">
                Monitoring metrik partisipan, pola komunikasi dominan, dan tren hasil Personal Soul Blueprint™.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/admin/participants">
                <Button className="gap-2.5 rounded-xl bg-gradient-to-r from-brand-burgundy to-brand-vibrant hover:brightness-110 text-white text-xs font-black shadow-bold py-2.5 px-4">
                  <Users className="h-4 w-4" />
                  <span>Daftar Semua Partisipan</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="border-2 border-brand-border bg-white shadow-soft">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-brand-gray">
                    Total Partisipan
                  </span>
                  <div className="font-black text-3xl text-brand-charcoal mt-1 tracking-tight">
                    {stats.totalParticipants}
                  </div>
                  <span className="text-[11px] text-brand-gray font-medium">Terdaftar di sistem</span>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-brand-rose flex items-center justify-center text-brand-burgundy border border-brand-vibrant/20">
                  <Users className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-brand-border bg-white shadow-soft">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-brand-gray">
                    Asesmen Selesai
                  </span>
                  <div className="font-black text-3xl text-emerald-700 mt-1 tracking-tight">
                    {stats.totalCompleted}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-bold">Laporan terbit</span>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-brand-border bg-white shadow-soft">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-brand-gray">
                    Hari Ini / Minggu Ini
                  </span>
                  <div className="font-black text-3xl text-brand-burgundy mt-1 tracking-tight">
                    {stats.submittedToday} <span className="text-base text-brand-gray font-semibold">/ {stats.submittedThisWeek}</span>
                  </div>
                  <span className="text-[11px] text-brand-gray font-medium">Aktivitas terkini</span>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-brand-rose flex items-center justify-center text-brand-burgundy border border-brand-vibrant/20">
                  <Calendar className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-brand-border bg-white shadow-soft">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-brand-gray">
                    Pola Terbanyak
                  </span>
                  <div className="font-black text-lg text-brand-vibrant mt-1 truncate max-w-[140px] tracking-tight">
                    {stats.topPattern.name.replace(" Pattern", "")}
                  </div>
                  <span className="text-[11px] text-brand-gray font-bold">
                    {stats.topPatternFrequency} responden dominan
                  </span>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700 border border-amber-200">
                  <Flame className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Visuals: Pattern Averages */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Card className="lg:col-span-8 border-2 border-brand-border bg-white shadow-soft">
              <CardHeader className="border-b border-brand-border pb-4">
                <CardTitle className="font-black text-xl text-brand-charcoal tracking-tight">
                  Rata-rata Skor Sembilan Pola Komunikasi (Agregat)
                </CardTitle>
                <p className="text-xs text-brand-gray font-medium">
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
                          <span className="font-bold text-brand-charcoal">{item.patternName}</span>
                          <span className="font-black text-brand-vibrant">
                            {item.average.toFixed(2)} / 5.00
                          </span>
                        </div>
                        <div className="w-full bg-brand-rose h-3 rounded-full overflow-hidden p-0.5 border border-brand-vibrant/20">
                          <div
                            className="bg-gradient-to-r from-brand-burgundy to-brand-vibrant h-full rounded-full transition-all duration-300"
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
            <Card className="lg:col-span-4 border-2 border-brand-border bg-white shadow-soft">
              <CardHeader className="border-b border-brand-border pb-4">
                <CardTitle className="font-black text-xl text-brand-charcoal tracking-tight">
                  Frekuensi Pola Prioritas Utama
                </CardTitle>
                <p className="text-xs text-brand-gray font-medium">
                  Jumlah partisipan yang memiliki pola tersebut sebagai peringkat pertama.
                </p>
              </CardHeader>
              <CardContent className="pt-6 space-y-3">
                {Object.entries(stats.patternDistribution).map(([code, count]) => (
                  <div
                    key={code}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-brand-rose/40 border-2 border-brand-vibrant/20 text-xs font-bold"
                  >
                    <span className="text-brand-charcoal truncate">{code}</span>
                    <Badge className="bg-brand-burgundy text-white font-black">
                      {Number(count)} orang
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Submissions Table */}
          <Card className="border-2 border-brand-border bg-white shadow-soft">
            <CardHeader className="border-b border-brand-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="font-black text-xl text-brand-charcoal tracking-tight">
                  Partisipan Terkini
                </CardTitle>
                <p className="text-xs text-brand-gray font-medium">
                  5 asesmen terakhir yang berhasil diselesaikan oleh responden.
                </p>
              </div>
              <Link href="/admin/participants" className="text-xs font-black text-brand-vibrant hover:underline flex items-center gap-1">
                <span>Lihat semua partisipan</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardHeader>

            <CardContent className="pt-4 p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b-2 border-brand-border bg-brand-rose/40 text-brand-gray uppercase text-[10px] font-black tracking-wider">
                      <th className="py-3 px-6">Nama Partisipan</th>
                      <th className="py-3 px-4">Kontak</th>
                      <th className="py-3 px-4">Waktu Selesai</th>
                      <th className="py-3 px-4">Skor / Kategori</th>
                      <th className="py-3 px-4">Pola Utama</th>
                      <th className="py-3 px-6 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y border-brand-border/40 font-medium">
                    {recentList.participants.map((p) => (
                      <tr key={p.submissionId} className="hover:bg-brand-rose/20 transition-colors">
                        <td className="py-3 px-6 font-black text-brand-charcoal">
                          {p.name}
                        </td>
                        <td className="py-3 px-4 text-brand-gray font-semibold">
                          <div>{p.email}</div>
                          <div className="text-[11px] text-brand-gray/80">{p.phone}</div>
                        </td>
                        <td className="py-3 px-4 text-brand-gray font-semibold">
                          {formatDate(p.submittedAt)}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-black text-brand-vibrant">
                            {p.overallScore.toFixed(2)}/5
                          </span>
                          <span className="block text-[10px] text-brand-gray font-bold">
                            {p.overallCategory}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className="bg-brand-rose text-brand-burgundy font-black text-[10px] border border-brand-vibrant/20">
                            {p.primaryPatternCode}
                          </Badge>
                        </td>
                        <td className="py-3 px-6 text-right space-x-2">
                          <Link
                            href={`/admin/participants/${p.submissionId}`}
                            className="inline-flex items-center gap-1 text-xs text-brand-vibrant font-black hover:underline"
                          >
                            <span>Detail</span>
                          </Link>
                          <Link
                            href={`/assessment/result/${p.resultToken}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-xs text-brand-gray hover:text-brand-vibrant"
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

      <footer className="py-4 text-center text-xs font-semibold text-brand-gray border-t border-brand-border bg-white">
        © {new Date().getFullYear()} The Soul of Speaking Indonesia • Personal Soul Blueprint™
      </footer>
    </div>
  );
}
