"use client";

import React, { useState, useEffect, use, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ASSESSMENT_ITEMS, LIKERT_OPTIONS } from "@/modules/assessment/item-config";
import { ASSESSMENT_PATTERNS } from "@/modules/assessment/pattern-config";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Save,
  Grid3X3,
  Keyboard,
  Clock,
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
  const [showQuickMap, setShowQuickMap] = useState(false);
  const [errorNotice, setErrorNotice] = useState("");

  const currentItem = ASSESSMENT_ITEMS[currentIndex];
  const currentPattern = currentItem ? ASSESSMENT_PATTERNS[currentItem.patternCode] : null;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / 27) * 100);

  // Load any previously saved answers from localStorage
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
  const triggerAutosave = useCallback(
    async (newAnswers: Record<number, number>) => {
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
        // Silent network fallback, data preserved in localStorage
      } finally {
        setIsSaving(false);
      }
    },
    [submissionId, currentIndex]
  );

  const handleSelectAnswer = useCallback(
    (value: number) => {
      if (!currentItem) return;
      const newAnswers = { ...answers, [currentItem.itemNumber]: value };
      setAnswers(newAnswers);
      triggerAutosave(newAnswers);

      // Auto advance smoothly after brief 250ms feedback delay
      if (currentIndex < 26) {
        setTimeout(() => {
          setCurrentIndex((prev) => Math.min(26, prev + 1));
        }, 220);
      } else {
        setTimeout(() => {
          setShowReviewModal(true);
        }, 300);
      }
    },
    [answers, currentItem, currentIndex, triggerAutosave]
  );

  // Keyboard navigation support (1-5 to answer, ArrowLeft/ArrowRight to navigate)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if review modal or map is open
      if (showReviewModal || showQuickMap) return;

      if (e.key >= "1" && e.key <= "5") {
        e.preventDefault();
        handleSelectAnswer(parseInt(e.key, 10));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (currentIndex < 26) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          setShowReviewModal(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, handleSelectAnswer, showReviewModal, showQuickMap]);

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
    <div className="min-h-screen bg-gradient-to-b from-brand-rose/30 via-brand-ivory to-white flex flex-col justify-between">
      {/* Questionnaire Top Bar */}
      <header className="border-b border-brand-border/60 bg-white/95 backdrop-blur-xl sticky top-0 z-40 py-3.5 px-4 sm:px-8">
        <div className="mx-auto max-w-4xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-brand-burgundy/20">
              <Image src="/images/logo.png" alt="Logo" width={36} height={36} className="object-contain" />
            </div>
            <div>
              <span className="font-serif font-bold text-xs sm:text-sm text-brand-charcoal block leading-none">
                Personal Soul Blueprint™
              </span>
              <span className="text-[10px] text-brand-burgundy font-semibold uppercase tracking-wider">
                The Soul of Speaking Indonesia
              </span>
            </div>
          </div>

          {/* Autosave & Quick Jump Controls */}
          <div className="flex items-center gap-3 text-xs">
            <button
              type="button"
              onClick={() => setShowQuickMap(!showQuickMap)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-brand-border bg-white px-3 py-1.5 font-semibold text-brand-charcoal hover:bg-brand-rose/60 transition-colors shadow-sm"
              title="Buka peta seluruh pertanyaan"
            >
              <Grid3X3 className="h-3.5 w-3.5 text-brand-burgundy" />
              <span className="hidden sm:inline">Peta Soal</span>
              <span className="text-brand-burgundy font-bold">({answeredCount}/27)</span>
            </button>

            <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-brand-gray">
              {isSaving ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin text-brand-burgundy" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  <span>Tersimpan</span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mx-auto max-w-4xl pt-3">
          <div className="flex items-center justify-between text-[11px] text-brand-gray mb-1">
            <span>Kemajuan Asesmen</span>
            <span className="font-bold text-brand-burgundy">{progressPercent}% Selesai</span>
          </div>
          <Progress value={answeredCount} max={27} className="h-2 rounded-full" />
        </div>
      </header>

      {/* Main Question Display */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl space-y-6">
          <Card className="border border-brand-border bg-white/95 shadow-elevated rounded-3xl overflow-hidden backdrop-blur-xl">
            <CardContent className="p-6 sm:p-10 space-y-8">
              {/* Question metadata badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-border/60 pb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="px-3 py-1 text-xs font-bold text-brand-burgundy">
                    Pernyataan {currentIndex + 1} dari 27
                  </Badge>
                  {currentPattern && (
                    <span className="text-[11px] text-brand-gray font-medium hidden sm:inline">
                      {currentPattern.name}
                    </span>
                  )}
                </div>
                <span className="text-xs font-mono font-bold text-brand-burgundy/80">
                  {currentItem.questionCode}
                </span>
              </div>

              {/* Statement Statement Text */}
              <div className="space-y-3 min-h-[95px] flex items-center">
                <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-brand-charcoal leading-snug">
                  &ldquo;{currentItem.questionText}&rdquo;
                </h2>
              </div>

              {/* Likert Scale Cards (1 to 5) */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between text-xs text-brand-gray mb-2">
                  <span className="font-bold uppercase tracking-wider text-brand-charcoal">
                    Tingkat Kesesuaian Respons Anda:
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-brand-gray">
                    <Keyboard className="h-3.5 w-3.5 text-brand-burgundy" />
                    <span>Tekan tombol 1 - 5</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {LIKERT_OPTIONS.map((opt) => {
                    const isSelected = answers[currentItem.itemNumber] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSelectAnswer(opt.value)}
                        className={`group flex items-center justify-between rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "border-brand-burgundy bg-gradient-to-r from-brand-rose/80 to-white shadow-soft ring-2 ring-brand-burgundy/30 scale-[1.01]"
                            : "border-brand-border/80 bg-white hover:border-brand-burgundy/40 hover:bg-brand-ivory/50"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className={`flex h-9 w-9 items-center justify-center rounded-xl font-serif text-base font-bold transition-all ${
                              isSelected
                                ? "bg-brand-burgundy text-white shadow-sm"
                                : "bg-brand-ivory text-brand-charcoal group-hover:bg-brand-rose group-hover:text-brand-burgundy"
                            }`}
                          >
                            {opt.value}
                          </span>
                          <div>
                            <div className="text-sm font-bold text-brand-charcoal group-hover:text-brand-burgundy transition-colors">
                              {opt.label}
                            </div>
                            <div className="text-xs text-brand-gray">
                              {opt.description}
                            </div>
                          </div>
                        </div>

                        <div
                          className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-brand-burgundy bg-brand-burgundy text-white shadow-sm"
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
                  className="gap-2 rounded-xl border-brand-border text-brand-charcoal hover:bg-brand-rose/40 text-xs sm:text-sm font-semibold"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Sebelumnya</span>
                </Button>

                {currentIndex < 26 ? (
                  <Button
                    onClick={handleNext}
                    className="gap-2 rounded-xl bg-brand-burgundy hover:bg-brand-plum text-white text-xs sm:text-sm font-semibold shadow-soft"
                  >
                    <span>Selanjutnya</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowReviewModal(true)}
                    className="gap-2 rounded-xl bg-brand-plum hover:bg-brand-burgundy text-white text-xs sm:text-sm font-bold shadow-card"
                  >
                    <Sparkles className="h-4 w-4 text-brand-rose" />
                    <span>Tinjau & Selesaikan</span>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Keyboard tip footer */}
          <div className="text-center text-[11px] text-brand-gray flex items-center justify-center gap-1.5">
            <Keyboard className="h-3.5 w-3.5 text-brand-burgundy" />
            <span>Gunakan tombol angka <strong>1 - 5</strong> atau tombol panah keyboard untuk navigasi cepat</span>
          </div>
        </div>
      </main>

      {/* Quick Jump Map Drawer */}
      {showQuickMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-elevated border border-brand-border space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-brand-charcoal">
                  Peta 27 Pernyataan
                </h3>
                <p className="text-xs text-brand-gray">
                  Klik nomor berapa pun untuk langsung berpindah ke pertanyaan tersebut.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowQuickMap(false)}
                className="text-xs font-bold text-brand-gray hover:text-brand-burgundy"
              >
                Tutup
              </button>
            </div>

            <div className="grid grid-cols-9 gap-2">
              {ASSESSMENT_ITEMS.map((item) => {
                const val = answers[item.itemNumber];
                const isAnswered = typeof val === "number";
                const isCurrent = currentIndex === item.itemNumber - 1;
                return (
                  <button
                    key={item.itemNumber}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(item.itemNumber - 1);
                      setShowQuickMap(false);
                    }}
                    className={`h-11 rounded-xl flex flex-col items-center justify-center font-bold text-xs transition-all ${
                      isCurrent
                        ? "ring-2 ring-brand-burgundy bg-brand-burgundy text-white shadow-sm"
                        : isAnswered
                        ? "bg-brand-rose text-brand-burgundy border border-brand-burgundy/30 hover:bg-brand-burgundy/20"
                        : "bg-brand-ivory text-brand-gray border border-brand-border hover:bg-white"
                    }`}
                  >
                    <span>{item.itemNumber}</span>
                    <span className="text-[9px] font-normal opacity-80">{val || "-"}</span>
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-brand-gray flex items-center justify-between pt-2 border-t border-brand-border/60">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-rose border border-brand-burgundy/40" />
                <span>Terjawab ({answeredCount})</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-ivory border border-brand-border" />
                <span>Belum ({27 - answeredCount})</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal Dialog */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 shadow-elevated border border-brand-border space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-brand-border/60 pb-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-brand-charcoal">
                  Tinjauan Pernyataan Asesmen
                </h3>
                <p className="text-xs text-brand-gray">
                  Periksa kelengkapan 27 jawaban Anda sebelum dikalkulasi oleh sistem skoring.
                </p>
              </div>
              <Badge variant={answeredCount === 27 ? "success" : "warning"} className="text-xs font-bold">
                {answeredCount}/27 Terjawab
              </Badge>
            </div>

            {errorNotice && (
              <div className="rounded-2xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-700 flex items-center gap-2">
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
                    className={`h-11 rounded-xl flex flex-col items-center justify-center font-bold text-xs transition-all ${
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

            <div className="text-xs text-brand-gray flex items-center justify-between pt-1">
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-md bg-brand-rose border border-brand-burgundy/30 inline-block" />
                <span>Sudah dijawab</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-md bg-red-50 border border-red-200 inline-block" />
                <span>Belum dijawab</span>
              </span>
            </div>

            <div className="pt-4 border-t border-brand-border/60 flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => setShowReviewModal(false)}
                className="w-full sm:w-1/2 rounded-xl text-xs sm:text-sm font-semibold"
                disabled={isSubmitting}
              >
                Kembali Memeriksa
              </Button>

              <Button
                onClick={handleSubmitFinal}
                disabled={isSubmitting || answeredCount < 27}
                className="w-full sm:w-1/2 rounded-xl bg-brand-burgundy hover:bg-brand-plum text-white font-bold gap-2 shadow-card text-xs sm:text-sm py-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Mengkalkulasi Hasil...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-brand-rose" />
                    <span>Kirim & Terbitkan Laporan</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Minimal */}
      <footer className="py-3.5 text-center text-xs text-brand-gray border-t border-brand-border/40 bg-white/60">
        The Soul of Speaking Indonesia • Dokumen refleksi diri • Bukan alat diagnosis
      </footer>
    </div>
  );
}
