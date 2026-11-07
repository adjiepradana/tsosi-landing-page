"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ASSESSMENT_ITEMS, LIKERT_OPTIONS } from "@/modules/assessment/item-config";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Save,
  HelpCircle,
} from "lucide-react";

interface QuestionnaireProps {
  params: Promise<{ submissionId: string }>;
}

export default function QuestionnairePage({ params }: QuestionnaireProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const submissionId = resolvedParams.submissionId;

  // Active question index (0 to 26)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [errorNotice, setErrorNotice] = useState("");

  const currentItem = ASSESSMENT_ITEMS[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / 27) * 100);

  // Load any previously saved answers from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`tsosi_answers_${submissionId}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === "object") {
            setAnswers(parsed);
          }
        } catch {}
      }
    }
  }, [submissionId]);

  // Debounced autosave
  const triggerAutosave = async (newAnswers: Record<number, number>) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`tsosi_answers_${submissionId}`, JSON.stringify(newAnswers));
    }

    try {
      setIsSaving(true);
      await fetch("/api/assessment/save-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId,
          answers: newAnswers,
          currentStep: currentIndex + 1,
        }),
      });
    } catch {
      // Background save failure is silent, cached in localStorage
    } finally {
      setIsSaving(false);
    }
  };

  const handleSelectAnswer = (value: number) => {
    const newAnswers = { ...answers, [currentItem.itemNumber]: value };
    setAnswers(newAnswers);
    triggerAutosave(newAnswers);

    // Auto advance smoothly after brief 250ms delay for feedback delight
    if (currentIndex < 26) {
      setTimeout(() => {
        setCurrentIndex((prev) => Math.min(26, prev + 1));
      }, 250);
    } else {
      // Reached the last question, show review modal if ready
      setTimeout(() => {
        setShowReviewModal(true);
      }, 350);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < 26) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowReviewModal(true);
    }
  };

  const handleSubmitFinal = async () => {
    if (answeredCount < 27) {
      setErrorNotice("Masih ada pernyataan yang belum Anda jawab. Silakan periksa kembali.");
      return;
    }

    setIsSubmitting(true);
    setErrorNotice("");

    try {
      const res = await fetch("/api/assessment/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId,
          answers,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorNotice(data.message || "Gagal memproses penilaian.");
        setIsSubmitting(false);
        return;
      }

      if (typeof window !== "undefined") {
        localStorage.removeItem(`tsosi_answers_${submissionId}`);
      }

      router.push(data.redirectUrl);
    } catch {
      setErrorNotice("Terjadi kendala jaringan saat mengirimkan jawaban. Coba lagi.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-ivory flex flex-col justify-between">
      {/* Questionnaire Top Bar */}
      <header className="border-b border-brand-border/60 bg-white/95 backdrop-blur-md sticky top-0 z-40 py-3.5 px-4 sm:px-8">
        <div className="mx-auto max-w-4xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-brand-burgundy/20">
              <Image src="/images/logo.png" alt="Logo" width={36} height={36} className="object-contain" />
            </div>
            <div>
              <span className="font-serif font-bold text-xs sm:text-sm text-brand-charcoal block leading-none">
                Personal Soul Blueprint™
              </span>
              <span className="text-[10px] text-brand-burgundy font-medium uppercase tracking-wider">
                Conflict Pattern Assessment
              </span>
            </div>
          </div>

          {/* Autosave & Progress Indicator */}
          <div className="flex items-center gap-4 text-xs text-brand-gray">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px]">
              {isSaving ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin text-brand-burgundy" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="h-3 w-3 text-emerald-600" />
                  <span>Tersimpan otomatis</span>
                </>
              )}
            </span>
            <button
              onClick={() => setShowReviewModal(true)}
              className="text-xs font-semibold text-brand-burgundy hover:underline flex items-center gap-1"
            >
              <span>{answeredCount}/27 Selesai</span>
              <span className="font-bold">({progressPercent}%)</span>
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mx-auto max-w-4xl pt-3">
          <Progress value={answeredCount} max={27} className="h-2" />
        </div>
      </header>

      {/* Main Question Display */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl">
          <Card className="border border-brand-border bg-white shadow-elevated overflow-hidden">
            <CardContent className="p-6 sm:p-10 space-y-8">
              {/* Question metadata badge */}
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="px-3.5 py-1 text-xs font-semibold">
                  Pernyataan {currentIndex + 1} dari 27
                </Badge>
                <span className="text-xs font-mono font-medium text-brand-gray">
                  Kode: {currentItem.questionCode}
                </span>
              </div>

              {/* Statement Text */}
              <div className="space-y-3 min-h-[90px] flex items-center">
                <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-brand-charcoal leading-snug">
                  &ldquo;{currentItem.questionText}&rdquo;
                </h2>
              </div>

              {/* Likert Scale Cards (1 to 5) */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-brand-gray mb-3">
                  Pilih tingkat kesesuaian dengan diri Anda:
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {LIKERT_OPTIONS.map((opt) => {
                    const isSelected = answers[currentItem.itemNumber] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSelectAnswer(opt.value)}
                        className={`group flex items-center justify-between rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "border-brand-burgundy bg-brand-rose/60 shadow-sm ring-2 ring-brand-burgundy/30"
                            : "border-brand-border/80 bg-white hover:border-brand-burgundy/40 hover:bg-brand-ivory/50"
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <span
                            className={`flex h-8 w-8 items-center justify-center rounded-lg font-serif text-sm font-bold transition-colors ${
                              isSelected
                                ? "bg-brand-burgundy text-white"
                                : "bg-brand-ivory text-brand-charcoal group-hover:bg-brand-rose group-hover:text-brand-burgundy"
                            }`}
                          >
                            {opt.value}
                          </span>
                          <div>
                            <div className="text-sm font-bold text-brand-charcoal">
                              {opt.label}
                            </div>
                            <div className="text-xs text-brand-gray">
                              {opt.description}
                            </div>
                          </div>
                        </div>

                        <div
                          className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            isSelected
                              ? "border-brand-burgundy bg-brand-burgundy text-white"
                              : "border-brand-border group-hover:border-brand-burgundy/60"
                          }`}
                        >
                          {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="pt-6 border-t border-brand-border/60 flex items-center justify-between gap-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Sebelumnya</span>
                </Button>

                {currentIndex < 26 ? (
                  <Button
                    onClick={handleNext}
                    className="gap-2 bg-brand-burgundy hover:bg-brand-plum text-white"
                  >
                    <span>Selanjutnya</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowReviewModal(true)}
                    className="gap-2 bg-brand-plum hover:bg-brand-burgundy text-white font-semibold"
                  >
                    <span>Tinjau & Selesaikan</span>
                    <Sparkles className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Review Modal Dialog */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 shadow-elevated border border-brand-border space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-brand-border/60 pb-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-brand-charcoal">
                  Tinjauan Pernyataan Asesmen
                </h3>
                <p className="text-xs text-brand-gray">
                  Periksa kelengkapan 27 jawaban Anda sebelum dikalkulasi oleh sistem skoring.
                </p>
              </div>
              <Badge variant={answeredCount === 27 ? "success" : "warning"} className="text-xs">
                {answeredCount}/27 Terjawab
              </Badge>
            </div>

            {errorNotice && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorNotice}</span>
              </div>
            )}

            {/* Grid of 27 statements numbers */}
            <div className="grid grid-cols-9 gap-2">
              {ASSESSMENT_ITEMS.map((item) => {
                const val = answers[item.itemNumber];
                const isAnswered = typeof val === "number";
                return (
                  <button
                    key={item.itemNumber}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(item.itemNumber - 1);
                      setShowReviewModal(false);
                    }}
                    title={`Pernyataan ${item.itemNumber}: ${isAnswered ? `Nilai ${val}` : "Belum dijawab"}`}
                    className={`h-10 rounded-xl flex flex-col items-center justify-center font-bold text-xs transition-all ${
                      isAnswered
                        ? "bg-brand-rose text-brand-burgundy border border-brand-burgundy/30 hover:bg-brand-burgundy hover:text-white"
                        : "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                    }`}
                  >
                    <span>{item.itemNumber}</span>
                    <span className="text-[9px] font-normal opacity-80">{val ? val : "-"}</span>
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-brand-gray flex items-center justify-between pt-2">
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded bg-brand-rose border border-brand-burgundy/30 inline-block" />
                <span>Sudah dijawab</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded bg-red-50 border border-red-200 inline-block" />
                <span>Belum dijawab</span>
              </span>
            </div>

            <div className="pt-4 border-t border-brand-border/60 flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => setShowReviewModal(false)}
                className="w-full sm:w-1/2"
                disabled={isSubmitting}
              >
                Kembali Memeriksa
              </Button>

              <Button
                onClick={handleSubmitFinal}
                disabled={isSubmitting || answeredCount < 27}
                className="w-full sm:w-1/2 bg-brand-burgundy hover:bg-brand-plum text-white font-semibold gap-2 shadow-card"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Mengkalkulasi Hasil...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Kirim & Lihat Hasil</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Minimal */}
      <footer className="py-3 text-center text-xs text-brand-gray border-t border-brand-border/40">
        The Soul of Speaking Indonesia • Dokumen refleksi diri • Bukan alat diagnosis
      </footer>
    </div>
  );
}
