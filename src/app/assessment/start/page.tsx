"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  Sparkles,
  User,
  Mail,
  Phone,
  CheckCircle2,
  Lock,
} from "lucide-react";

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
    <div className="min-h-screen bg-white flex flex-col justify-between relative overflow-hidden">
      {/* Dynamic ambient blur */}
      <div className="absolute top-0 right-10 h-96 w-96 rounded-full bg-brand-vibrant/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-brand-burgundy/10 blur-[90px] pointer-events-none" />

      {/* Top Header */}
      <header className="border-b border-brand-border bg-white/90 backdrop-blur-md py-4 px-4 sm:px-8 relative z-10">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-gray hover:text-brand-vibrant transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Beranda</span>
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

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10">
        <div className="w-full max-w-xl space-y-6">
          <Card className="border-2 border-brand-border shadow-elevated bg-white rounded-3xl">
            <CardHeader className="text-center pb-6 border-b border-brand-border">
              <div className="flex justify-center mb-2">
                <Badge className="bg-brand-rose text-brand-burgundy border-brand-vibrant/20 gap-1.5 px-4 py-1 text-xs font-black uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5 text-brand-vibrant" />
                  <span>Langkah 1 dari 3: Registrasi Singkat</span>
                </Badge>
              </div>
              <CardTitle className="font-black text-2xl sm:text-3xl text-brand-charcoal tracking-tight">
                Mulai Refleksi Personal Anda
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-brand-gray font-medium pt-1 max-w-md mx-auto">
                Cukup isi data dasar berikut untuk mengadministrasikan asesmen dan menautkan laporan personal Anda.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              {generalError && (
                <div className="mb-6 rounded-2xl bg-red-50 border-2 border-red-200 p-4 text-xs sm:text-sm text-red-700 font-bold">
                  {generalError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="block text-xs font-black uppercase tracking-wider text-brand-charcoal">
                    Nama Lengkap <span className="text-brand-vibrant">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 h-4 w-4 text-brand-vibrant" />
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Contoh: Irwansyah Asadullah"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className={`w-full rounded-2xl border-2 pl-11 pr-4 py-3.5 text-sm font-semibold text-brand-charcoal transition-all focus:bg-white focus:outline-none focus:border-brand-vibrant focus:ring-4 focus:ring-brand-vibrant/10 ${
                        errors.fullName ? "border-red-400 bg-red-50/30" : "border-brand-border bg-white"
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-red-600 font-bold mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-black uppercase tracking-wider text-brand-charcoal">
                    Alamat Email Aktif <span className="text-brand-vibrant">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-brand-vibrant" />
                    <input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`w-full rounded-2xl border-2 pl-11 pr-4 py-3.5 text-sm font-semibold text-brand-charcoal transition-all focus:bg-white focus:outline-none focus:border-brand-vibrant focus:ring-4 focus:ring-brand-vibrant/10 ${
                        errors.email ? "border-red-400 bg-red-50/30" : "border-brand-border bg-white"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-600 font-bold mt-1">{errors.email}</p>
                  )}
                  <p className="text-[11px] text-brand-gray font-medium">
                    Tautan laporan hasil asesmen akan ditautkan ke alamat email ini.
                  </p>
                </div>

                {/* Phone / WhatsApp */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-xs font-black uppercase tracking-wider text-brand-charcoal">
                    Nomor WhatsApp / HP <span className="text-brand-vibrant">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-brand-vibrant" />
                    <input
                      id="phone"
                      type="tel"
                      placeholder="08123456789 atau +628123456789"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={`w-full rounded-2xl border-2 pl-11 pr-4 py-3.5 text-sm font-semibold text-brand-charcoal transition-all focus:bg-white focus:outline-none focus:border-brand-vibrant focus:ring-4 focus:ring-brand-vibrant/10 ${
                        errors.phone ? "border-red-400 bg-red-50/30" : "border-brand-border bg-white"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-600 font-bold mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Privacy Consent */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group bg-brand-rose/40 p-4 rounded-2xl border-2 border-brand-vibrant/20">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) =>
                        setFormData({ ...formData, consent: e.target.checked })
                      }
                      className="mt-0.5 h-4 w-4 rounded border-brand-border text-brand-vibrant focus:ring-brand-vibrant accent-brand-burgundy"
                    />
                    <span className="text-xs text-brand-charcoal font-medium leading-relaxed">
                      Saya memahami bahwa asesmen ini adalah sarana psikoedukasi dan refleksi diri (bukan diagnosis klinis), dan saya menyetujui pemrosesan data saya sesuai{" "}
                      <Link href="/privacy" target="_blank" className="text-brand-vibrant font-black underline">
                        Kebijakan Privasi
                      </Link>.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-xs text-red-600 font-bold mt-1 pl-1">{errors.consent}</p>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-3">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full gap-3 rounded-2xl bg-gradient-to-r from-brand-burgundy to-brand-vibrant hover:brightness-110 text-white shadow-bold py-7 text-base font-black transition-all hover:scale-[1.02]"
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

              {/* Security reassurance */}
              <div className="mt-6 pt-4 border-t border-brand-border grid grid-cols-2 gap-2 text-center text-xs font-bold text-brand-charcoal">
                <span className="flex items-center justify-center gap-1.5">
                  <Lock className="h-4 w-4 text-brand-vibrant" />
                  Privat & Terenkripsi
                </span>
                <span className="flex items-center justify-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Tanpa Kata Sandi / OTP
                </span>
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
