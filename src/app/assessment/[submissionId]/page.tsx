"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ASSESSMENT_ITEMS, LIKERT_OPTIONS } from "@/modules/assessment/item-config";
import { PATTERNS_LIST } from "@/modules/assessment/pattern-config";
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Grid3X3,
  Keyboard,
} from "lucide-react";

export default function AssessmentTakePage() {
  const params = useParams();
  const router = useRouter();
  const submissionId = params.submissionId as string;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorNotice, setErrorNotice] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showQuickMap, setShowQuickMap] = useState(false);

  // Load existing answers or submission state
  useEffect(() => {
    async function loadAssessment() {
      try {
        const storedName =
          typeof window !== "undefined"
            ? sessionStorage.getItem("tsosi_participant_name") || ""
            : "";
        if (storedName) setParticipantName(storedName);

        const res = await fetch(`/api/assessment/save-progress?sid=${submissionId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.submission) {
            if (data.submission.answers && typeof data.submission.answers === "object") {
              setAnswers(data.submission.answers);
              const answeredKeys = Object.keys(data.submission.answers).map(Number);
              if (answeredKeys.length > 0 && answeredKeys.length < 27) {
                const firstUnanswered = ASSESSMENT_ITEMS.findIndex(
                  (item) => !data.submission.answers[item.itemNumber]
                );
                if (firstUnanswered !== -1) {
                  setCurrentIndex(firstUnanswered);
                }
              }
            }
            if (data.submission.fullName) {
              setParticipantName(data.submission.fullName);
            }
          }
        }
      } catch (err) {
        console.error("Failed to restore progress", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (submissionId) {
      loadAssessment();
    }
  }, [submissionId]);

  // Debounced server autosave
  const persistAnswerToServer = useCallback(
    async (updatedAnswers: Record<number, number>) => {
      try {
        setIsSaving(true);
        await fetch("/api/assessment/save-progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            submissionId,
            answers: updatedAnswers,
          }),
        });
      } catch (err) {
        console.error("Autosave failed", err);
      } finally {
        setIsSaving(false);
      }
    },
    [submissionId]
  );

  const currentItem = ASSESSMENT_ITEMS[currentIndex];
  const currentPattern = PATTERNS_LIST.find((p) => p.code === currentItem.patternCode);
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / 27) * 100);

  // Handle single answer selection
  const handleSelectAnswer = (value: number) => {
    const updated = {
      ...answers,
      [currentItem.itemNumber]: value,
    };
    setAnswers(updated);
    setErrorNotice("");

    // Persist to server
    persistAnswerToServer(updated);

    // Auto advance smoothly to next item after 220ms if not the last item
    if (currentIndex < 26) {
      setTimeout(() => {
        setCurrentIndex((prev) => Math.min(26, prev + 1));
      }, 220);
    }
  };

  const handleNext = () => {
    if (!answers[currentItem.itemNumber]) {
      setErrorNotice("Silakan pilih salah satu skala penilaian untuk melanjutkan.");
      return;
    }
    setErrorNotice("");
    if (currentIndex < 26) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setErrorNotice("");
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Keyboard shortcut listener (1-5, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showReviewModal || showQuickMap) return;

      if (e.key >= "1" && e.key <= "5") {
        const val = parseInt(e.key, 10);
        handleSelectAnswer(val);
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        if (answers[currentItem.itemNumber]) {
          handleNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, answers, showReviewModal, showQuickMap]);

  // Final submission handler
  const handleSubmitFinal = async () => {
    if (answeredCount < 27) {
      setErrorNotice(
        `Anda baru menjawab ${answeredCount} dari 27 pernyataan. Lengkapi seluruh pernyataan untuk melihat hasil.`
      );
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
        setErrorNotice(data.message || "Gagal mengirimkan asesmen.");
        setIsSubmitting(false);
        return;
      }

      router.push(data.redirectUrl);
    } catch {
      setErrorNotice("Terjadi gangguan jaringan saat pengiriman hasil.");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-brand-vibrant" />
        <p className="text-sm font-bold text-brand-charcoal text-center">
          Memuat instrumen asesmen Personal Soul Blueprint™...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between relative overflow-hidden">
      {/* Dynamic ambient blur */}
      <div className="absolute top-0 right-10 h-72 sm:h-96 w-72 sm:w-96 rounded-full bg-brand-vibrant/10 blur-[80px] sm:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 h-64 sm:h-80 w-64 sm:w-80 rounded-full bg-brand-burgundy/10 blur-[70px] sm:blur-[90px] pointer-events-none" />

      {/* Questionnaire Top Bar - Mobile Responsive */}
      <header className="border-b border-brand-border bg-white/95 backdrop-blur-xl sticky top-0 z-40 py-3 px-3 sm:px-8">
        <div className="mx-auto max-w-4xl flex items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="relative h-8 w-8 sm:h-9 sm:w-9 shrink-0 overflow-hidden rounded-full border-2 border-brand-vibrant/30 p-0.5">
              <Image src="/images/logo.png" alt="Logo" width={36} height={36} className="object-contain" />
            </div>
            <div className="min-w-0">
              <span className="font-black text-xs sm:text-sm text-brand-charcoal block leading-none tracking-tight truncate">
                Personal Soul Blueprint™
              </span>
              <span className="hidden xs:inline-block text-[10px] text-brand-vibrant font-extrabold uppercase tracking-wider truncate">
                The Soul of Speaking Indonesia
              </span>
            </div>
          </div>

          {/* Autosave & Quick Jump Controls */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs shrink-0">
            <button
              type="button"
              onClick={() => setShowQuickMap(!showQuickMap)}
              className="inline-flex items-center gap-1.5 rounded-xl border-2 border-brand-border bg-white px-2.5 sm:px-3 py-1.5 font-bold text-brand-charcoal hover:border-brand-vibrant hover:text-brand-vibrant transition-all shadow-sm text-xs"
              title="Buka peta seluruh pertanyaan"
            >
              <Grid3X3 className="h-3.5 w-3.5 text-brand-vibrant shrink-0" />
              <span className="hidden sm:inline">Peta Soal</span>
              <span className="text-brand-vibrant font-black">({answeredCount}/27)</span>
            </button>

            <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-brand-gray">
              {isSaving ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-brand-vibrant" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Tersimpan</span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mx-auto max-w-4xl pt-2 sm:pt-3">
          <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold text-brand-gray mb-1">
            <span>Kemajuan Asesmen</span>
            <span className="font-black text-brand-vibrant">{progressPercent}% Selesai</span>
          </div>
          <Progress value={answeredCount} max={27} className="h-2 sm:h-2.5 rounded-full" />
        </div>
      </header>

      {/* Main Question Display */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-6 lg:p-8 relative z-10">
        <div className="w-full max-w-2xl space-y-4 sm:space-y-6">
          <Card className="border-2 border-brand-border bg-white shadow-elevated rounded-3xl overflow-hidden">
            <CardContent className="p-4 sm:p-10 space-y-6 sm:space-y-8">
              {/* Question metadata badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 border-b border-brand-border pb-3 sm:pb-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-brand-rose text-brand-burgundy border-brand-vibrant/20 px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-black uppercase tracking-wider">
                    Pernyataan {currentIndex + 1} dari 27
                  </Badge>
                  {currentPattern && (
                    <span className="text-[11px] sm:text-xs text-brand-gray font-bold truncate">
                      {currentPattern.name}
                    </span>
                  )}
                </div>
                <span className="text-[11px] sm:text-xs font-mono font-black text-brand-vibrant">
                  {currentItem.questionCode}
                </span>
              </div>

              {/* Statement Text - Responsive Typography */}
              <div className="space-y-2 min-h-[70px] sm:min-h-[95px] flex items-center">
                <h2 className="font-black text-lg sm:text-2xl lg:text-3xl text-brand-charcoal leading-snug tracking-tight">
                  &ldquo;{currentItem.questionText}&rdquo;
                </h2>
              </div>

              {/* Likert Scale Cards (1 to 5) - Touch Friendly Tap Targets */}
              <div className="space-y-2 pt-1 sm:pt-2">
                <div className="flex items-center justify-between text-xs mb-1.5 sm:mb-2">
                  <span className="font-black uppercase tracking-wider text-brand-charcoal text-[11px] sm:text-xs">
                    Tingkat Kesesuaian Respons:
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-brand-vibrant">
                    <Keyboard className="h-3.5 w-3.5" />
                    <span>Tekan angka 1 - 5</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:gap-2.5">
                  {LIKERT_OPTIONS.map((opt) => {
                    const isSelected = answers[currentItem.itemNumber] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSelectAnswer(opt.value)}
                        className={`group flex items-center justify-between rounded-xl sm:rounded-2xl border-2 p-3 sm:p-4 text-left transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "border-brand-vibrant bg-brand-rose/60 shadow-bold ring-2 ring-brand-vibrant/30 scale-[1.01]"
                            : "border-brand-border bg-white hover:border-brand-vibrant/50 hover:bg-brand-rose/20 active:bg-brand-rose/40"
                        }`}
                      >
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0 pr-2">
                          <span
                            className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg sm:rounded-xl font-black text-sm sm:text-base transition-all ${
                              isSelected
                                ? "bg-gradient-to-r from-brand-burgundy to-brand-vibrant text-white shadow-sm"
                                : "bg-brand-rose text-brand-burgundy group-hover:bg-brand-vibrant group-hover:text-white"
                            }`}
                          >
                            {opt.value}
                          </span>
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-black text-brand-charcoal group-hover:text-brand-vibrant transition-colors truncate">
                              {opt.label}
                            </div>
                            <div className="text-[10px] sm:text-xs font-medium text-brand-gray truncate">
                              {opt.description}
                            </div>
                          </div>
                        </div>

                        <div
                          className={`h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-brand-vibrant bg-brand-vibrant text-white shadow-sm"
                              : "border-brand-border group-hover:border-brand-vibrant"
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
              <div className="pt-4 sm:pt-6 border-t border-brand-border flex items-center justify-between gap-3 sm:gap-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="gap-1.5 sm:gap-2 rounded-xl border-2 border-brand-border text-brand-charcoal hover:border-brand-vibrant text-xs sm:text-sm font-bold py-2.5 sm:py-3 px-3 sm:px-5"
                >
                  <ArrowLeft className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                  <span>Sebelumnya</span>
                </Button>

                {currentIndex < 26 ? (
                  <Button
                    onClick={handleNext}
                    className="gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-brand-burgundy to-brand-vibrant hover:brightness-110 text-white text-xs sm:text-sm font-extrabold shadow-bold py-2.5 sm:py-3 px-4 sm:px-6"
                  >
                    <span>Selanjutnya</span>
                    <ArrowRight className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowReviewModal(true)}
                    className="gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-brand-burgundy to-brand-vibrant hover:brightness-110 text-white text-xs sm:text-sm font-black shadow-bold py-2.5 sm:py-3 px-4 sm:px-6"
                  >
                    <Sparkles className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-brand-rose" />
                    <span>Tinjau & Selesai</span>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Keyboard tip footer (hidden on touch phones) */}
          <div className="hidden sm:flex text-center text-xs font-semibold text-brand-gray items-center justify-center gap-1.5">
            <Keyboard className="h-3.5 w-3.5 text-brand-vibrant" />
            <span>Gunakan tombol angka <strong>1 - 5</strong> atau tombol panah keyboard untuk navigasi cepat</span>
          </div>
        </div>
      </main>

      {/* Quick Jump Map Modal - Responsive 6 Columns on Mobile, 9 Columns on Desktop */}
      {showQuickMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-5 sm:p-6 shadow-elevated border-2 border-brand-border space-y-4 sm:space-y-5 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <div>
                <h3 className="font-black text-lg sm:text-xl text-brand-charcoal tracking-tight">
                  Peta 27 Pernyataan
                </h3>
                <p className="text-[11px] sm:text-xs text-brand-gray font-medium">
                  Klik nomor untuk langsung melompat ke soal terkait.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowQuickMap(false)}
                className="text-xs font-black text-brand-vibrant hover:underline px-2 py-1"
              >
                Tutup
              </button>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-9 gap-1.5 sm:gap-2">
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
                    className={`h-11 sm:h-11 rounded-xl flex flex-col items-center justify-center font-black text-xs transition-all ${
                      isCurrent
                        ? "ring-2 ring-brand-vibrant bg-gradient-to-r from-brand-burgundy to-brand-vibrant text-white shadow-bold"
                        : isAnswered
                        ? "bg-brand-rose text-brand-burgundy border-2 border-brand-vibrant/30 hover:border-brand-vibrant"
                        : "bg-white text-brand-gray border-2 border-brand-border hover:border-brand-charcoal"
                    }`}
                  >
                    <span>{item.itemNumber}</span>
                    <span className="text-[9px] font-bold opacity-80">{val || "-"}</span>
                  </button>
                );
              })}
            </div>

            <div className="text-xs font-bold text-brand-gray flex items-center justify-between pt-2 border-t border-brand-border">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-vibrant" />
                <span>Terjawab ({answeredCount})</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-border" />
                <span>Belum ({27 - answeredCount})</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal Dialog - Responsive 6 Columns on Mobile, 9 Columns on Desktop */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white p-5 sm:p-8 shadow-elevated border-2 border-brand-border space-y-4 sm:space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-brand-border pb-3 sm:pb-4">
              <div>
                <h3 className="font-black text-xl sm:text-2xl text-brand-charcoal tracking-tight">
                  Tinjauan Asesmen
                </h3>
                <p className="text-[11px] sm:text-xs text-brand-gray font-medium">
                  Pastikan 27 jawaban lengkap sebelum dikalkulasi.
                </p>
              </div>
              <Badge className="bg-brand-burgundy text-white font-black text-xs shrink-0">
                {answeredCount}/27 Terjawab
              </Badge>
            </div>

            {errorNotice && (
              <div className="rounded-2xl bg-red-50 border-2 border-red-200 p-3 sm:p-3.5 text-xs text-red-700 font-bold flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorNotice}</span>
              </div>
            )}

            {/* Grid of 27 statements numbers */}
            <div className="grid grid-cols-6 sm:grid-cols-9 gap-1.5 sm:gap-2">
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
                    className={`h-11 rounded-xl flex flex-col items-center justify-center font-black text-xs transition-all ${
                      isAnswered
                        ? "bg-brand-rose text-brand-burgundy border-2 border-brand-vibrant/30 hover:bg-brand-vibrant hover:text-white"
                        : "bg-red-50 text-red-600 border-2 border-red-200 hover:bg-red-100"
                    }`}
                  >
                    <span>{item.itemNumber}</span>
                    <span className="text-[9px] font-bold opacity-80">{val ? val : "-"}</span>
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] sm:text-xs font-bold text-brand-gray flex items-center justify-between pt-1">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-md bg-brand-rose border border-brand-vibrant/30 inline-block" />
                <span>Sudah dijawab</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-md bg-red-50 border border-red-200 inline-block" />
                <span>Belum dijawab</span>
              </span>
            </div>

            <div className="pt-3 sm:pt-4 border-t border-brand-border flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <Button
                variant="outline"
                onClick={() => setShowReviewModal(false)}
                className="w-full sm:w-1/2 rounded-xl border-2 text-xs sm:text-sm font-bold py-3"
                disabled={isSubmitting}
              >
                Kembali Memeriksa
              </Button>

              <Button
                onClick={handleSubmitFinal}
                disabled={isSubmitting || answeredCount < 27}
                className="w-full sm:w-1/2 rounded-xl bg-gradient-to-r from-brand-burgundy to-brand-vibrant hover:brightness-110 text-white font-black gap-2 shadow-bold text-xs sm:text-sm py-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Mengkalkulasi...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-brand-rose" />
                    <span>Kirim & Lihat Hasil</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Minimal */}
      <footer className="py-3 text-center text-[11px] sm:text-xs font-semibold text-brand-gray border-t border-brand-border bg-white">
        The Soul of Speaking Indonesia • Dokumen refleksi diri
      </footer>
    </div>
  );
}
