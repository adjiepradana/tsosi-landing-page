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
    <Card className="border-2 border-brand-border bg-white shadow-soft print-card">
      <CardHeader className="border-b border-brand-border pb-5">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-vibrant mb-1">
          <Sparkles className="h-4 w-4" />
          <span>Lembar Refleksi Diri Terpandu</span>
        </div>
        <CardTitle className="font-black text-2xl text-brand-charcoal tracking-tight">
          Jurnal Eksplorasi Situasi Konflik
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm text-brand-gray font-medium pt-1">
          Gunakan panduan berikut untuk mendokumentasikan salah satu peristiwa nyata di mana pola komunikasi dominan Anda terpicu.
        </CardDescription>
        {topPatternTitle && (
          <div className="mt-2 text-xs font-bold text-brand-burgundy bg-brand-rose/60 p-2.5 rounded-xl border border-brand-vibrant/20 inline-block">
            Pola Utama Anda: {topPatternTitle}
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-6">
        {saveSuccess && (
          <div className="mb-6 rounded-2xl bg-emerald-50 border-2 border-emerald-200 p-4 text-xs sm:text-sm text-emerald-800 flex items-center gap-2.5 font-bold">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>Catatan refleksi Anda berhasil disimpan dengan aman ke tautan personal ini.</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 rounded-2xl bg-red-50 border-2 border-red-200 p-4 text-xs sm:text-sm text-red-700 flex items-center gap-2 font-bold">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Situasi Pemicu */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase tracking-wider text-brand-charcoal">
                1. Situasi Pemicu (Trigger)
              </label>
              <textarea
                rows={3}
                placeholder="Apa yang terjadi? Siapa yang terlibat? Kata-kata atau tindakan apa yang memicu reaksi Anda?"
                value={formData.triggerSituation}
                onChange={(e) =>
                  setFormData({ ...formData, triggerSituation: e.target.value })
                }
                className="w-full rounded-2xl border-2 border-brand-border p-3.5 text-xs sm:text-sm font-medium text-brand-charcoal focus:border-brand-vibrant focus:outline-none focus:ring-4 focus:ring-brand-vibrant/10 bg-white"
              />
            </div>

            {/* 2. Pikiran Otomatis */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase tracking-wider text-brand-charcoal">
                2. Pikiran Otomatis Saat Itu
              </label>
              <textarea
                rows={3}
                placeholder="Kalimat apa yang langsung melintas di kepala Anda saat itu? (misal: 'Dia meremehkanku', 'Harus kubuktikan ia salah')"
                value={formData.automaticThoughts}
                onChange={(e) =>
                  setFormData({ ...formData, automaticThoughts: e.target.value })
                }
                className="w-full rounded-2xl border-2 border-brand-border p-3.5 text-xs sm:text-sm font-medium text-brand-charcoal focus:border-brand-vibrant focus:outline-none focus:ring-4 focus:ring-brand-vibrant/10 bg-white"
              />
            </div>

            {/* 3. Emosi & Sensasi Tubuh */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase tracking-wider text-brand-charcoal">
                3. Emosi & Sensasi Fisik
              </label>
              <textarea
                rows={3}
                placeholder="Apa emosi yang dirasakan (marah, malu, takut, cemas)? Bagian tubuh mana yang bereaksi (dada berdebar, pundak tegang)?"
                value={formData.emotions}
                onChange={(e) =>
                  setFormData({ ...formData, emotions: e.target.value })
                }
                className="w-full rounded-2xl border-2 border-brand-border p-3.5 text-xs sm:text-sm font-medium text-brand-charcoal focus:border-brand-vibrant focus:outline-none focus:ring-4 focus:ring-brand-vibrant/10 bg-white"
              />
            </div>

            {/* 4. Respon Nyata */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase tracking-wider text-brand-charcoal">
                4. Tindakan / Respon Nyata Anda
              </label>
              <textarea
                rows={3}
                placeholder="Apa yang akhirnya Anda katakan atau lakukan saat itu? (misal: mendebat cepat, bungkam, meminta maaf buru-buru)"
                value={formData.responseTaken}
                onChange={(e) =>
                  setFormData({ ...formData, responseTaken: e.target.value })
                }
                className="w-full rounded-2xl border-2 border-brand-border p-3.5 text-xs sm:text-sm font-medium text-brand-charcoal focus:border-brand-vibrant focus:outline-none focus:ring-4 focus:ring-brand-vibrant/10 bg-white"
              />
            </div>
          </div>

          {/* 5. Alternatif Respon Sadar */}
          <div className="space-y-1.5">
            <label className="block text-xs font-black uppercase tracking-wider text-brand-vibrant">
              5. Alternatif Respons Sadar di Masa Depan
            </label>
            <textarea
              rows={3}
              placeholder="Jika situasi serupa terjadi lagi nanti, jeda hening atau kalimat apa yang ingin Anda pilih dengan penuh kesadaran?"
              value={formData.alternativeResponse}
              onChange={(e) =>
                setFormData({ ...formData, alternativeResponse: e.target.value })
              }
              className="w-full rounded-2xl border-2 border-brand-vibrant/40 p-3.5 text-xs sm:text-sm font-medium text-brand-charcoal focus:border-brand-vibrant focus:outline-none focus:ring-4 focus:ring-brand-vibrant/10 bg-brand-rose/20"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-3 flex justify-end no-print">
            <Button
              type="submit"
              disabled={isSaving}
              className="gap-2.5 rounded-2xl bg-gradient-to-r from-brand-burgundy to-brand-vibrant hover:brightness-110 text-white font-black shadow-bold py-6 px-8 text-sm"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Menyimpan Jurnal...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Simpan Catatan Refleksi</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
