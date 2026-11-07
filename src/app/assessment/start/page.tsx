"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ShieldCheck, ArrowLeft, Loader2, Sparkles, CheckCircle } from "lucide-react";

export default function AssessmentStartPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = "Nama lengkap wajib diisi minimal 2 karakter";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Format alamat email tidak valid (contoh: nama@domain.com)";
    }

    const phoneClean = formData.phone.trim().replace(/\D/g, "");
    if (!phoneClean || phoneClean.length < 9 || phoneClean.length > 14) {
      newErrors.phone = "Nomor WhatsApp/HP tidak valid (contoh: 08123456789 atau +628123456789)";
    }

    if (!formData.consent) {
      newErrors.consent = "Anda wajib menyetujui pemrosesan data untuk melanjutkan.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/assessment/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setGeneralError(data.message || "Terjadi kesalahan saat memulai sesi.");
        setIsSubmitting(false);
        return;
      }

      // Store local submission session ID in session storage as fallback
      if (typeof window !== "undefined") {
        sessionStorage.setItem("tsosi_submission_id", data.submissionId);
        sessionStorage.setItem("tsosi_participant_name", formData.fullName);
      }

      router.push(data.redirectUrl);
    } catch {
      setGeneralError("Koneksi gagal. Silakan periksa jaringan Anda.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-ivory flex flex-col justify-between">
      {/* Top Header */}
      <header className="border-b border-brand-border/60 bg-white/90 backdrop-blur-md py-4 px-4 sm:px-8">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-medium text-brand-gray hover:text-brand-burgundy transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Beranda</span>
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

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-xl">
          <Card className="border border-brand-border shadow-elevated bg-white">
            <CardHeader className="text-center pb-6 border-b border-brand-border/60">
              <div className="flex justify-center mb-2">
                <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-xs">
                  <Sparkles className="h-3 w-3" />
                  <span>Langkah 1 dari 3: Identitas Partisipan</span>
                </Badge>
              </div>
              <CardTitle className="font-serif text-2xl sm:text-3xl text-brand-charcoal">
                Mulai Refleksi Personal Anda
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-brand-gray pt-1">
                Data Anda digunakan semata-mata untuk mengadministrasikan asesmen dan menghasilkan laporan refleksi personal.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              {generalError && (
                <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-xs sm:text-sm text-red-700">
                  {generalError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal">
                    Nama Lengkap <span className="text-brand-burgundy">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Contoh: Irwansyah Asadullah"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className={`w-full rounded-xl border bg-brand-ivory/30 px-4 py-3 text-sm text-brand-charcoal transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-burgundy/40 ${
                      errors.fullName ? "border-red-400" : "border-brand-border"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal">
                    Alamat Email Aktif <span className="text-brand-burgundy">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full rounded-xl border bg-brand-ivory/30 px-4 py-3 text-sm text-brand-charcoal transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-burgundy/40 ${
                      errors.email ? "border-red-400" : "border-brand-border"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                  )}
                  <p className="text-[11px] text-brand-gray">
                    Tautan laporan hasil asesmen akan dikaitkan dengan alamat email ini.
                  </p>
                </div>

                {/* WhatsApp/Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal">
                    Nomor WhatsApp / HP <span className="text-brand-burgundy">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="08123456789 atau +628123456789"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className={`w-full rounded-xl border bg-brand-ivory/30 px-4 py-3 text-sm text-brand-charcoal transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-burgundy/40 ${
                      errors.phone ? "border-red-400" : "border-brand-border"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Privacy Consent */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) =>
                        setFormData({ ...formData, consent: e.target.checked })
                      }
                      className="mt-1 h-4 w-4 rounded border-brand-border text-brand-burgundy focus:ring-brand-burgundy accent-brand-burgundy"
                    />
                    <span className="text-xs text-brand-gray group-hover:text-brand-charcoal leading-relaxed">
                      Saya memahami bahwa asesmen ini adalah alat psikoedukasi dan refleksi diri (bukan diagnosis psikologis klinis), dan saya menyetujui pemrosesan data saya sesuai{" "}
                      <Link href="/privacy" target="_blank" className="text-brand-burgundy underline">
                        Kebijakan Privasi
                      </Link>.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-xs text-red-600 mt-1 pl-7">{errors.consent}</p>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full gap-2 bg-brand-burgundy hover:bg-brand-plum text-white shadow-card text-base font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Menyiapkan Lembar Asesmen...</span>
                      </>
                    ) : (
                      <>
                        <span>Lanjut ke Petunjuk Pengisian</span>
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>

              <div className="mt-6 pt-4 border-t border-brand-border/60 flex items-center justify-center gap-2 text-xs text-brand-gray">
                <ShieldCheck className="h-4 w-4 text-brand-burgundy" />
                <span>Tanpa kata sandi • Tanpa OTP • 100% Akses Langsung</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="py-4 text-center text-xs text-brand-gray border-t border-brand-border/40">
        © {new Date().getFullYear()} The Soul of Speaking Indonesia • Personal Soul Blueprint™
      </footer>
    </div>
  );
}
