"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, Mail, ArrowRight, Loader2, ArrowLeft, Shield } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@thesoulofspeaking.id");
  const [password, setPassword] = useState("SoulSpeaking2026!");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || "Email atau kata sandi tidak valid.");
        setIsSubmitting(false);
        return;
      }

      router.push("/admin");
    } catch {
      setErrorMessage("Koneksi gagal. Silakan coba kembali.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-ivory flex flex-col justify-between">
      <header className="py-4 px-6 border-b border-brand-border/60 bg-white">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-xs text-brand-gray hover:text-brand-burgundy">
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Beranda Publik</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-serif font-bold text-brand-charcoal">
            The Soul of Speaking Indonesia
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md">
          <Card className="border border-brand-border bg-white shadow-elevated">
            <CardHeader className="text-center pb-6 border-b border-brand-border/60">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-burgundy/30 bg-brand-rose/50">
                <Shield className="h-7 w-7 text-brand-burgundy" />
              </div>
              <CardTitle className="font-serif text-2xl text-brand-charcoal">
                Portal Fasilitator & Admin
              </CardTitle>
              <CardDescription className="text-xs text-brand-gray pt-1">
                Akses terbatas untuk monitoring partisipan dan hasil asesmen Personal Soul Blueprint™.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              {errorMessage && (
                <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal">
                    Email Admin
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-brand-gray" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-xl border border-brand-border bg-brand-ivory/30 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-brand-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-burgundy/40"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal">
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-brand-gray" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full rounded-xl border border-brand-border bg-brand-ivory/30 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-brand-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-burgundy/40"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-burgundy hover:bg-brand-plum text-white gap-2 font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Memverifikasi Akses...</span>
                      </>
                    ) : (
                      <>
                        <span>Masuk ke Dashboard</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>

              <div className="mt-6 rounded-xl bg-brand-rose/40 border border-brand-border/60 p-3 text-[11px] text-brand-gray text-center">
                <span>Kredensial Default: </span>
                <span className="font-mono text-brand-charcoal font-semibold">admin@thesoulofspeaking.id</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-brand-gray border-t border-brand-border/40">
        © {new Date().getFullYear()} The Soul of Speaking Indonesia
      </footer>
    </div>
  );
}
