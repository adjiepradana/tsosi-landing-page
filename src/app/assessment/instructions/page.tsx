"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LIKERT_OPTIONS } from "@/modules/assessment/item-config";
import { ArrowRight, ArrowLeft, CheckCircle2, ShieldAlert, Sparkles, Clock, Heart } from "lucide-react";

function InstructionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submissionId, setSubmissionId] = useState<string>("");
  const [participantName, setParticipantName] = useState<string>("");

  useEffect(() => {
    const sid = searchParams.get("sid") || (typeof window !== "undefined" ? sessionStorage.getItem("tsosi_submission_id") : "");
    const name = typeof window !== "undefined" ? sessionStorage.getItem("tsosi_participant_name") || "" : "";
    
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
    <div className="min-h-screen bg-brand-ivory flex flex-col justify-between">
      {/* Top Header */}
      <header className="border-b border-brand-border/60 bg-white/90 backdrop-blur-md py-4 px-4 sm:px-8">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link href="/assessment/start" className="inline-flex items-center gap-2 text-xs font-medium text-brand-gray hover:text-brand-burgundy transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Ubah Data Partisipan</span>
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
        <div className="w-full max-w-2xl">
          <Card className="border border-brand-border shadow-elevated bg-white">
            <CardHeader className="text-center pb-6 border-b border-brand-border/60">
              <div className="flex justify-center mb-2">
                <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-xs">
                  <Sparkles className="h-3 w-3" />
                  <span>Langkah 2 dari 3: Petunjuk & Skala Asesmen</span>
                </Badge>
              </div>
              <CardTitle className="font-serif text-2xl sm:text-3xl text-brand-charcoal">
                Petunjuk Refleksi Diri
              </CardTitle>
              {participantName && (
                <p className="text-sm font-medium text-brand-burgundy pt-1">
                  Selamat datang, {participantName}
                </p>
              )}
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              {/* Guidelines */}
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="h-8 w-8 rounded-full bg-brand-rose flex items-center justify-center text-brand-burgundy shrink-0 mt-0.5 font-bold text-xs">
                    1
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-brand-charcoal">
                      Fokus Pada Respon Spontan Saat Konflik
                    </h4>
                    <p className="text-xs text-brand-gray leading-relaxed">
                      Bayangkan situasi ketika Anda sedang menghadapi ketegangan, kritik, perbedaan pendapat penting, atau percakapan sulit dalam beberapa bulan terakhir.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="h-8 w-8 rounded-full bg-brand-rose flex items-center justify-center text-brand-burgundy shrink-0 mt-0.5 font-bold text-xs">
                    2
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-brand-charcoal">
                      Tidak Ada Jawaban Benar Maupun Salah
                    </h4>
                    <p className="text-xs text-brand-gray leading-relaxed">
                      Jawablah berdasarkan apa yang <em>benar-benar Anda lakukan atau rasakan</em>, bukan apa yang idealnya seharusnya Anda lakukan. Kejujuran adalah kunci pemahaman diri yang sejati.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="h-8 w-8 rounded-full bg-brand-rose flex items-center justify-center text-brand-burgundy shrink-0 mt-0.5 font-bold text-xs">
                    3
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-brand-charcoal">
                      27 Pernyataan Refleksi Terstruktur
                    </h4>
                    <p className="text-xs text-brand-gray leading-relaxed">
                      Setiap pernyataan mengukur satu dimensi kecenderungan komunikasi. Asesmen ini dapat diselesaikan dalam 7-10 menit.
                    </p>
                  </div>
                </div>
              </div>

              {/* 5-Point Likert Scale Reference */}
              <div className="rounded-2xl border border-brand-border bg-brand-ivory/50 p-5 space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-brand-burgundy" />
                  <span>Skala Penilaian Jawaban (1 - 5)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-1">
                  {LIKERT_OPTIONS.map((opt) => (
                    <div
                      key={opt.value}
                      className="rounded-xl border border-brand-border/80 bg-white p-2.5 text-center flex flex-col justify-between"
                    >
                      <span className="font-serif text-lg font-bold text-brand-burgundy">
                        {opt.value}
                      </span>
                      <span className="text-xs font-bold text-brand-charcoal mt-1">
                        {opt.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clarification Notice */}
              <div className="rounded-xl bg-brand-rose/40 border border-brand-border/60 p-4 text-xs text-brand-gray flex items-start gap-2.5">
                <ShieldAlert className="h-4 w-4 text-brand-burgundy shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>Bukan Alat Diagnosis:</strong> Hasil asesmen ini berfungsi sebagai media refleksi diri dan psikoedukasi awal, bukan pengganti asesmen klinis profesional.
                </span>
              </div>

              {/* CTA button */}
              <div className="pt-2">
                <Button
                  onClick={handleStart}
                  size="lg"
                  className="w-full gap-2.5 bg-brand-burgundy hover:bg-brand-plum text-white shadow-card text-base font-semibold"
                >
                  <Heart className="h-5 w-5" />
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Memuat petunjuk...</div>}>
      <InstructionsContent />
    </Suspense>
  );
}
