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
  ShieldAlert,
  Sparkles,
  Clock,
  Heart,
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
    <div className="min-h-screen bg-white flex flex-col justify-between relative overflow-hidden">
      {/* Dynamic ambient blur */}
      <div className="absolute top-0 right-10 h-96 w-96 rounded-full bg-brand-vibrant/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-brand-burgundy/10 blur-[90px] pointer-events-none" />

      {/* Top Header */}
      <header className="border-b border-brand-border bg-white/90 backdrop-blur-md py-4 px-4 sm:px-8 relative z-10">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link
            href="/assessment/start"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-gray hover:text-brand-vibrant transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Ubah Data Identitas</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-brand-vibrant/30 p-0.5">
              <Image src="/images/logo.png" alt="Logo" width={32} height={32} className="object-contain" />
            </div>
            <span className="font-black text-xs sm:text-sm text-brand-charcoal tracking-tight">
              Personal Soul Blueprint™
            </span>
          </div>
        </div>
      </header>

      {/* Main Instructions */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10">
        <div className="w-full max-w-2xl space-y-6">
          <Card className="border-2 border-brand-border shadow-elevated bg-white rounded-3xl">
            <CardHeader className="text-center pb-6 border-b border-brand-border">
              <div className="flex justify-center mb-2">
                <Badge className="bg-brand-rose text-brand-burgundy border-brand-vibrant/20 gap-1.5 px-4 py-1 text-xs font-black uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5 text-brand-vibrant" />
                  <span>Langkah 2 dari 3: Panduan & Simulasi Skala</span>
                </Badge>
              </div>
              <CardTitle className="font-black text-2xl sm:text-3xl text-brand-charcoal tracking-tight">
                Petunjuk Mengisi Asesmen
              </CardTitle>
              {participantName ? (
                <p className="text-sm font-black text-brand-vibrant pt-1">
                  Selamat datang, {participantName}
                </p>
              ) : (
                <p className="text-xs text-brand-gray font-medium pt-1">
                  Luangkan waktu hening sekitar 5-7 menit untuk diri Anda sendiri.
                </p>
              )}
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              {/* 3 Core Guidelines */}
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-brand-rose/40 border-2 border-brand-vibrant/20">
                  <div className="h-9 w-9 rounded-xl bg-brand-vibrant flex items-center justify-center text-white shrink-0 font-black text-sm shadow-sm">
                    1
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-black text-brand-charcoal">
                      Fokus Pada Reaksi Nyata Saat Konflik
                    </h4>
                    <p className="text-xs text-brand-gray font-medium leading-relaxed">
                      Bayangkan momen ketika Anda merasa diserang, dikritik, tertekan, atau berbeda pendapat dalam relasi kerja maupun personal beberapa bulan terakhir.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-brand-rose/40 border-2 border-brand-vibrant/20">
                  <div className="h-9 w-9 rounded-xl bg-brand-vibrant flex items-center justify-center text-white shrink-0 font-black text-sm shadow-sm">
                    2
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-black text-brand-charcoal">
                      Pilih Apa yang Terjadi, Bukan yang Diinginkan
                    </h4>
                    <p className="text-xs text-brand-gray font-medium leading-relaxed">
                      Tidak ada jawaban yang dinilai &ldquo;salah&rdquo; atau &ldquo;benar&rdquo;. Kejujuran spontan Anda adalah kompas terbaik untuk memetakan pola komunikasi yang sejati.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-brand-rose/40 border-2 border-brand-vibrant/20">
                  <div className="h-9 w-9 rounded-xl bg-brand-vibrant flex items-center justify-center text-white shrink-0 font-black text-sm shadow-sm">
                    3
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-black text-brand-charcoal">
                      Penyimpanan Otomatis (Autosave) & Navigasi Keyboard
                    </h4>
                    <p className="text-xs text-brand-gray font-medium leading-relaxed">
                      Tekan angka <strong>1 - 5</strong> di keyboard untuk langsung memilih jawaban dan lanjut otomatis. Gunakan tombol panah kiri/kanan untuk berpindah soal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Scale Preview */}
              <div className="rounded-2xl border-2 border-brand-vibrant/30 bg-brand-rose/30 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-brand-burgundy flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-brand-vibrant" />
                    <span>Coba Klik Skala Pilihan (1 - 5)</span>
                  </h4>
                  <span className="text-[11px] text-brand-vibrant font-bold">
                    Simulasi interaktif
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2 pt-1">
                  {LIKERT_OPTIONS.map((opt) => {
                    const isSelected = previewSelection === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setPreviewSelection(opt.value)}
                        className={`rounded-2xl border-2 p-3 text-center flex flex-col items-center justify-center transition-all ${
                          isSelected
                            ? "bg-gradient-to-r from-brand-burgundy to-brand-vibrant text-white border-transparent shadow-bold scale-105"
                            : "bg-white text-brand-charcoal border-brand-border hover:border-brand-vibrant/50"
                        }`}
                      >
                        <span className="font-black text-lg sm:text-xl">
                          {opt.value}
                        </span>
                        <span className="text-[10px] font-bold mt-0.5 leading-tight truncate w-full">
                          {opt.label.split(" ")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs text-brand-charcoal text-center pt-1 font-semibold">
                  Contoh Terpilih: <strong className="text-brand-burgundy">{previewSelection} — {LIKERT_OPTIONS.find(o => o.value === previewSelection)?.label}</strong> ({LIKERT_OPTIONS.find(o => o.value === previewSelection)?.description})
                </p>
              </div>

              {/* Clarification Disclaimer */}
              <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 p-4 text-xs text-amber-900 flex items-start gap-2.5 font-medium">
                <ShieldAlert className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>Catatan Etis:</strong> Hasil Personal Soul Blueprint™ adalah instrumen refleksi diri dan psikoedukasi komunikasi, bukan diagnosis klinis profesional.
                </span>
              </div>

              {/* CTA button */}
              <div className="pt-2">
                <Button
                  onClick={handleStart}
                  size="lg"
                  className="w-full gap-3 rounded-2xl bg-gradient-to-r from-brand-burgundy to-brand-vibrant hover:brightness-110 text-white shadow-bold py-7 text-base font-black transition-all hover:scale-[1.02]"
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

      <footer className="py-4 text-center text-xs font-semibold text-brand-gray border-t border-brand-border">
        © {new Date().getFullYear()} The Soul of Speaking Indonesia • Personal Soul Blueprint™
      </footer>
    </div>
  );
}

export default function AssessmentInstructionsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-bold text-brand-charcoal">
          Memuat panduan asesmen...
        </div>
      }
    >
      <InstructionsContent />
    </Suspense>
  );
}
