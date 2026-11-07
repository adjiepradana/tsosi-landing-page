"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ReflectionData } from "@/types/assessment";
import { Save, CheckCircle2, Loader2, Sparkles, AlertCircle } from "lucide-react";

interface ReflectionFormProps {
  token: string;
  initialReflection?: ReflectionData;
  topPatternTitle?: string;
}

export function ReflectionForm({
  token,
  initialReflection,
  topPatternTitle,
}: ReflectionFormProps) {
  const [formData, setFormData] = useState({
    triggerSituation: initialReflection?.triggerSituation || "",
    automaticThoughts: initialReflection?.automaticThoughts || "",
    emotions: initialReflection?.emotions || "",
    responseTaken: initialReflection?.responseTaken || "",
    alternativeResponse: initialReflection?.alternativeResponse || "",
    notes: initialReflection?.notes || "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setErrorMessage("");

    try {
      const res = await fetch("/api/assessment/reflection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          ...formData,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMessage(data.message || "Gagal menyimpan refleksi.");
        setIsSaving(false);
        return;
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 5000);
    } catch {
      setErrorMessage("Koneksi gagal. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="border border-brand-border bg-white shadow-soft print:hidden">
      <CardHeader className="border-b border-brand-border/60 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-burgundy mb-1">
          <Sparkles className="h-4 w-4" />
          <span>Lembar Refleksi Personal</span>
        </div>
        <CardTitle className="font-serif text-2xl text-brand-charcoal">
          Ubah Kesadaran Menjadi Tindakan Nyata
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm text-brand-gray pt-1">
          Gunakan format refleksi mandiri ini untuk mengurai salah satu situasi konflik atau percakapan sulit yang baru saja atau kerap Anda alami (terutama terkait pola {topPatternTitle || "dominan Anda"}).
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        {saveSuccess && (
          <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs sm:text-sm text-emerald-800 flex items-center gap-2.5">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
            <span>Refleksi personal Anda berhasil disimpan dan ditautkan ke laporan ini!</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-xs sm:text-sm text-red-800 flex items-center gap-2.5">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. Trigger */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal">
              1. Situasi Pemicu (Trigger Situation)
            </label>
            <textarea
              rows={2}
              placeholder="Contoh: Saat rekan kerja mengkritik hasil laporan saya di hadapan forum rapat..."
              value={formData.triggerSituation}
              onChange={(e) =>
                setFormData({ ...formData, triggerSituation: e.target.value })
              }
              className="w-full rounded-xl border border-brand-border bg-brand-ivory/30 p-3.5 text-xs sm:text-sm text-brand-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-burgundy/40"
            />
          </div>

          {/* 2. Automatic Thoughts */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal">
              2. Pikiran Otomatis yang Muncul (Automatic Thoughts)
            </label>
            <textarea
              rows={2}
              placeholder="Contoh: Dia sengaja ingin menjatuhkan wibawa saya dan menganggap saya tidak kompeten..."
              value={formData.automaticThoughts}
              onChange={(e) =>
                setFormData({ ...formData, automaticThoughts: e.target.value })
              }
              className="w-full rounded-xl border border-brand-border bg-brand-ivory/30 p-3.5 text-xs sm:text-sm text-brand-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-burgundy/40"
            />
          </div>

          {/* 3. Emotions & Physical Sensations */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal">
              3. Emosi & Sensasi Tubuh (Emotions & Bodily Sensations)
            </label>
            <input
              type="text"
              placeholder="Contoh: Detak jantung memburu, dada panas, rasa tersinggung dan malu..."
              value={formData.emotions}
              onChange={(e) =>
                setFormData({ ...formData, emotions: e.target.value })
              }
              className="w-full rounded-xl border border-brand-border bg-brand-ivory/30 px-3.5 py-2.5 text-xs sm:text-sm text-brand-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-burgundy/40"
            />
          </div>

          {/* 4. Response Taken */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal">
              4. Respons yang Biasanya Saya Ambil (Reaksi Otomatis)
            </label>
            <textarea
              rows={2}
              placeholder="Contoh: Langsung memotong bicaranya dan membela diri dengan nada tinggi..."
              value={formData.responseTaken}
              onChange={(e) =>
                setFormData({ ...formData, responseTaken: e.target.value })
              }
              className="w-full rounded-xl border border-brand-border bg-brand-ivory/30 p-3.5 text-xs sm:text-sm text-brand-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-burgundy/40"
            />
          </div>

          {/* 5. Alternative Conscious Response */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal text-brand-burgundy">
              5. Respons Sadar Alternatif yang Ingin Saya Pilih (Conscious Response)
            </label>
            <textarea
              rows={2}
              placeholder="Contoh: Menarik nafas dalam 3 detik, mengucapkan terima kasih atas masukan, dan meminta waktu membahas detailnya secara privat..."
              value={formData.alternativeResponse}
              onChange={(e) =>
                setFormData({ ...formData, alternativeResponse: e.target.value })
              }
              className="w-full rounded-xl border border-brand-burgundy/30 bg-brand-rose/20 p-3.5 text-xs sm:text-sm text-brand-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-burgundy/40"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSaving}
              className="gap-2 bg-brand-burgundy hover:bg-brand-plum text-white font-medium"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Menyimpan Refleksi...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Simpan Lembar Refleksi</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
