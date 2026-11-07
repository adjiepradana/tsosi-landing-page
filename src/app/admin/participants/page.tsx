import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AdminNav } from "@/components/admin/admin-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AssessmentRepository } from "@/lib/db/assessment-repository";
import { PATTERNS_LIST } from "@/modules/assessment/pattern-config";
import { formatDate } from "@/lib/utils";
import { Search, Filter, ExternalLink, Download, ArrowLeft } from "lucide-react";

interface ParticipantsPageProps {
  searchParams: Promise<{
    search?: string;
    pattern?: string;
    category?: string;
    page?: string;
  }>;
}

export default async function ParticipantsManagementPage({
  searchParams,
}: ParticipantsPageProps) {
  const cookieStore = await cookies();
  const session = cookieStore.get("tsosi_admin_session");

  if (!session || session.value !== "authenticated_admin_user") {
    redirect("/admin/login");
  }

  const resolvedParams = await searchParams;
  const search = resolvedParams.search || "";
  const pattern = resolvedParams.pattern || "all";
  const category = resolvedParams.category || "all";
  const page = parseInt(resolvedParams.page || "1", 10);

  const { participants, total, totalPages } =
    await AssessmentRepository.getParticipantsList({
      search,
      pattern,
      category,
      page,
      limit: 10,
    });

  return (
    <div className="min-h-screen bg-brand-ivory flex flex-col justify-between">
      <div>
        <AdminNav />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border/60 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Link
                  href="/admin"
                  className="text-xs text-brand-gray hover:text-brand-burgundy inline-flex items-center gap-1"
                >
                  <ArrowLeft className="h-3 w-3" />
                  <span>Kembali ke Dashboard</span>
                </Link>
              </div>
              <h1 className="font-black text-3xl text-brand-charcoal tracking-tight">
                Kelola Partisipan Asesmen
              </h1>
              <p className="text-xs sm:text-sm text-brand-gray pt-1">
                Total {total} asesmen telah diselesaikan oleh responden.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/api/admin/export-csv"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-burgundy hover:bg-brand-plum text-white px-4 py-2.5 text-xs font-semibold shadow-soft transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Ekspor Semua Data (CSV)</span>
              </a>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <Card className="border border-brand-border bg-white shadow-soft">
            <CardContent className="p-4 sm:p-6">
              <form method="GET" className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                {/* Search Box */}
                <div className="sm:col-span-5 relative">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-brand-gray" />
                  <input
                    type="text"
                    name="search"
                    defaultValue={search}
                    placeholder="Cari nama, email, atau no. WhatsApp..."
                    className="w-full rounded-xl border border-brand-border bg-brand-ivory/30 pl-10 pr-4 py-2 text-xs sm:text-sm text-brand-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-burgundy/40"
                  />
                </div>

                {/* Pattern Filter */}
                <div className="sm:col-span-3">
                  <select
                    name="pattern"
                    defaultValue={pattern}
                    className="w-full rounded-xl border border-brand-border bg-brand-ivory/30 px-3 py-2 text-xs sm:text-sm text-brand-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-burgundy/40"
                  >
                    <option value="all">Semua Pola Prioritas</option>
                    {PATTERNS_LIST.map((p) => (
                      <option key={p.code} value={p.code}>
                        {p.name.replace(" Pattern", "")}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Filter */}
                <div className="sm:col-span-3">
                  <select
                    name="category"
                    defaultValue={category}
                    className="w-full rounded-xl border border-brand-border bg-brand-ivory/30 px-3 py-2 text-xs sm:text-sm text-brand-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-burgundy/40"
                  >
                    <option value="all">Semua Kategori Skor</option>
                    <option value="Hampir tidak pernah">Hampir tidak pernah</option>
                    <option value="Jarang dilaporkan">Jarang dilaporkan</option>
                    <option value="Kadang-kadang muncul">Kadang-kadang muncul</option>
                    <option value="Sering muncul">Sering muncul</option>
                    <option value="Sangat sering muncul">Sangat sering muncul</option>
                  </select>
                </div>

                {/* Submit button */}
                <div className="sm:col-span-1">
                  <Button type="submit" size="sm" className="w-full bg-brand-plum text-white text-xs">
                    Filter
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Table of Participants */}
          <Card className="border border-brand-border bg-white shadow-soft overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-brand-border bg-brand-rose/30 text-brand-gray uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-6">Nama Partisipan</th>
                      <th className="py-3 px-4">Kontak Responden</th>
                      <th className="py-3 px-4">Tanggal Pengisian</th>
                      <th className="py-3 px-4">Skor Rata-rata</th>
                      <th className="py-3 px-4">Kategori Hasil</th>
                      <th className="py-3 px-4">Pola Dominan</th>
                      <th className="py-3 px-6 text-right">Tindakan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/40">
                    {participants.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-xs text-brand-gray">
                          Tidak ditemukan partisipan dengan kriteria pencarian ini.
                        </td>
                      </tr>
                    ) : (
                      participants.map((p) => (
                        <tr key={p.submissionId} className="hover:bg-brand-ivory/40">
                          <td className="py-3.5 px-6 font-bold text-brand-charcoal">
                            {p.name}
                          </td>
                          <td className="py-3.5 px-4 text-brand-gray">
                            <div>{p.email}</div>
                            <div className="text-[11px] text-brand-gray/80">{p.phone}</div>
                          </td>
                          <td className="py-3.5 px-4 text-brand-gray">
                            {formatDate(p.submittedAt)}
                          </td>
                          <td className="py-3.5 px-4 font-black text-brand-vibrant text-sm">
                            {p.overallScore.toFixed(2)}/5
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-block rounded-md bg-brand-rose/60 px-2 py-0.5 text-[11px] font-medium text-brand-burgundy">
                              {p.overallCategory}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <Badge variant="secondary" className="text-[10px]">
                              {p.primaryPatternCode}
                            </Badge>
                          </td>
                          <td className="py-3.5 px-6 text-right space-x-3">
                            <Link
                              href={`/admin/participants/${p.submissionId}`}
                              className="inline-flex items-center gap-1 text-xs text-brand-burgundy font-bold hover:underline"
                            >
                              Detail Jawaban
                            </Link>
                            <Link
                              href={`/assessment/result/${p.resultToken}`}
                              target="_blank"
                              title="Buka laporan publik peserta"
                              className="inline-flex items-center text-brand-gray hover:text-brand-burgundy"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-4 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-gray">
                  <span>
                    Halaman {page} dari {totalPages}
                  </span>
                  <div className="flex gap-2">
                    {page > 1 && (
                      <Link
                        href={`/admin/participants?search=${search}&pattern=${pattern}&category=${category}&page=${page - 1}`}
                      >
                        <Button variant="outline" size="sm" className="text-xs">
                          Sebelumnya
                        </Button>
                      </Link>
                    )}
                    {page < totalPages && (
                      <Link
                        href={`/admin/participants?search=${search}&pattern=${pattern}&category=${category}&page=${page + 1}`}
                      >
                        <Button variant="outline" size="sm" className="text-xs">
                          Selanjutnya
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              )}
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
