"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LIKERT_OPTIONS } from "@/modules/assessment/item-config";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  Clock,
  Heart,
  HelpCircle,
} from "lucide-react";

function InstructionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submissionId, setSubmissionId] = useState<string>("");
  const [participantName, setParticipantName] = useState<string>("");
  const [previewSelection, setPreviewSelection] = useState<number>(3);

  useEffect(() => {
    const sid =
      searchParams.get("sid") ||
      (typeof window !== "undefined"
        ? sessionStorage.getItem("tsosi_submission_id")
        : "");
    const name =
      typeof window !== "undefined"
        ? sessionStorage.getItem("tsosi_participant_name") || ""
        : "";

    if (sid) {
      setSubmissionId(sid);
    }
    if (name) {
      setParticipantName(name);
    }
  }, [searchParams]);

  const handleStart = () => {
    if (submissionId) {
      router.push(`/assessment/${submissionId}`);
    } else {
      router.push("/assessment/start");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-rose/40 via-brand-ivory to-white flex flex-col justify-between">
      {/* Top Header */}
      <header className="border-b border-brand-border/60 bg-white/90 backdrop-blur-md py-4 px-4 sm:px-8">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link
            href="/assessment/start"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand-gray hover:text-brand-burgundy transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Ubah Data Identitas</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-brand-burgundy/20">
              <Image src="/images/logo.png" alt="Logo" width={32} height={32} className="object-contain" />
            </div>
            <span className="font-serif font-bold text-xs sm:text-sm text-brand-charcoal">
              Personal Soul Blueprint™
            </span>
          </div>
        </div>
      </header>

      {/* Main Instructions */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl space-y-6">
          <Card className="border border-brand-border shadow-elevated bg-white/95 rounded-3xl backdrop-blur-xl">
            <CardHeader className="text-center pb-6 border-b border-brand-border/60">
              <div className="flex justify-center mb-2">
                <Badge variant="secondary" className="gap-1.5 px-3.5 py-1 text-xs font-semibold">
                  <Sparkles className="h-3.5 w-3.5 text-brand-burgundy" />
                  <span>Langkah 2 dari 3: Panduan & Simulasi Skala</span>
                </Badge>
              </div>
              <CardTitle className="font-serif text-2xl sm:text-3xl text-brand-charcoal">
                Petunjuk Mengisi Asesmen
              </CardTitle>
              {participantName ? (
                <p className="text-sm font-semibold text-brand-burgundy pt-1">
                  Selamat datang, {participantName}
                </p>
              ) : (
                <p className="text-xs text-brand-gray pt-1">
                  Luangkan waktu hening sekitar 7-10 menit untuk diri Anda sendiri.
                </p>
              )}
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              {/* 3 Core Guidelines */}
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-brand-ivory/60 border border-brand-border/60">
                  <div className="h-8 w-8 rounded-xl bg-brand-rose flex items-center justify-center text-brand-burgundy shrink-0 font-bold text-xs">
                    1
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-brand-charcoal">
                      Fokus Pada Reaksi Nyata Saat Konflik
                    </h4>
                    <p className="text-xs text-brand-gray leading-relaxed">
                      Bayangkan momen ketika Anda merasa diserang, dikritik, tertekan, atau berbeda pendapat dalam relasi kerja maupun personal beberapa bulan terakhir.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-brand-ivory/60 border border-brand-border/60">
                  <div className="h-8 w-8 rounded-xl bg-brand-rose flex items-center justify-center text-brand-burgundy shrink-0 font-bold text-xs">
                    2
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-brand-charcoal">
                      Pilih Apa yang Terjadi, Bukan yang Diinginkan
                    </h4>
                    <p className="text-xs text-brand-gray leading-relaxed">
                      Tidak ada jawaban yang dinilai &ldquo;salah&rdquo; atau &ldquo;benar&rdquo;. Kejujuran spontan Anda adalah kompas terbaik untuk memetakan pola komunikasi yang sejati.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-brand-ivory/60 border border-brand-border/60">
                  <div className="h-8 w-8 rounded-xl bg-brand-rose flex items-center justify-center text-brand-burgundy shrink-0 font-bold text-xs">
                    3
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-brand-charcoal">
                      Penyimpanan Otomatis (Autosave)
                    </h4>
                    <p className="text-xs text-brand-gray leading-relaxed">
                      Setiap jawaban Anda otomatis tersimpan di server. Anda dapat kembali ke pertanyaan sebelumnya kapan saja sebelum mengklik tombol final.
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Scale Preview */}
              <div className="rounded-2xl border border-brand-burgundy/20 bg-brand-rose/30 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-burgundy flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>Coba Klik Skala Pilihan (1 - 5)</span>
                  </h4>
                  <span className="text-[11px] text-brand-gray italic">
                    Simulasi tombol
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-1.5 pt-1">
                  {LIKERT_OPTIONS.map((opt) => {
                    const isSelected = previewSelection === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setPreviewSelection(opt.value)}
                        className={`rounded-xl border p-2 text-center flex flex-col items-center justify-center transition-all ${
                          isSelected
                            ? "bg-brand-burgundy text-white border-brand-burgundy shadow-sm scale-105"
                            : "bg-white text-brand-charcoal border-brand-border/80 hover:border-brand-burgundy/40"
                        }`}
                      >
                        <span className="font-serif text-base sm:text-lg font-bold">
                          {opt.value}
                        </span>
                        <span className="text-[10px] font-semibold mt-0.5 leading-tight truncate w-full">
                          {opt.label.split(" ")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="text-[11px] text-brand-charcoal/80 text-center pt-1 font-medium">
                  Contoh Terpilih: <strong>{previewSelection} — {LIKERT_OPTIONS.find(o => o.value === previewSelection)?.label}</strong> ({LIKERT_OPTIONS.find(o => o.value === previewSelection)?.description})
                </p>
              </div>

              {/* Clarification Disclaimer */}
              <div className="rounded-2xl bg-amber-50/70 border border-amber-200/80 p-4 text-xs text-amber-900 flex items-start gap-2.5">
                <ShieldAlert className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>Catatan Etis:</strong> Hasil Personal Soul Blueprint™ adalah alat bantu refleksi diri dan psikoedukasi komunikasi, bukan diagnosis klinis profesional.
                </span>
              </div>

              {/* CTA button */}
              <div className="pt-2">
                <Button
                  onClick={handleStart}
                  size="lg"
                  className="w-full gap-2.5 rounded-xl bg-brand-burgundy hover:bg-brand-plum text-white shadow-elevated py-6 text-base font-semibold transition-all hover:scale-[1.01]"
                >
                  <Heart className="h-5 w-5 text-brand-rose" />
                  <span>Mulai Menjawab 27 Pernyataan</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-brand-gray border-t border-brand-border/40">
        © {new Date().getFullYear()} The Soul of Speaking Indonesia • Personal Soul Blueprint™
      </footer>
    </div>
  );
}

export default function AssessmentInstructionsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-serif text-brand-charcoal">
          Memuat panduan asesmen...
        </div>
      }
    >
      <InstructionsContent />
    </Suspense>
  );
}
