"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Lock, Mail, ArrowLeft, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@thesoulofspeaking.id");
  const [password, setPassword] = useState("");
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
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <header className="py-4 px-6 border-b-2 border-brand-border bg-white">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-brand-gray hover:text-brand-vibrant">
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Beranda Publik</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-black text-brand-charcoal tracking-tight">
            The Soul of Speaking Indonesia
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md">
          <Card className="border-2 border-brand-border bg-white shadow-elevated">
            <CardHeader className="text-center pb-6 border-b border-brand-border">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-brand-vibrant/30 bg-brand-rose">
                <Shield className="h-7 w-7 text-brand-vibrant" />
              </div>
              <CardTitle className="font-black text-2xl text-brand-charcoal tracking-tight">
                Portal Fasilitator & Admin
              </CardTitle>
              <CardDescription className="text-xs text-brand-gray font-medium pt-1">
                Akses terbatas untuk monitoring partisipan dan hasil asesmen Personal Soul Blueprint™.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              {errorMessage && (
                <div className="mb-4 rounded-2xl bg-red-50 border-2 border-red-200 p-3.5 text-xs text-red-700 font-bold">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-black uppercase tracking-wider text-brand-charcoal">
                    Email Admin
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-brand-vibrant" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-2xl border-2 border-brand-border pl-10 pr-4 py-3 text-xs sm:text-sm font-semibold text-brand-charcoal focus:border-brand-vibrant focus:outline-none focus:ring-4 focus:ring-brand-vibrant/10"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-black uppercase tracking-wider text-brand-charcoal">
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-brand-vibrant" />
                    <input
                      type="password"
                      placeholder="Masukkan kata sandi admin"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full rounded-2xl border-2 border-brand-border pl-10 pr-4 py-3 text-xs sm:text-sm font-semibold text-brand-charcoal focus:border-brand-vibrant focus:outline-none focus:ring-4 focus:ring-brand-vibrant/10"
                    />
                  </div>
                  <p className="text-[11px] text-brand-gray font-medium">
                    Kredensial default: <code className="font-mono text-brand-burgundy font-bold">admin@thesoulofspeaking.id</code> / <code className="font-mono text-brand-burgundy font-bold">admin123</code>
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gap-2 rounded-2xl bg-gradient-to-r from-brand-burgundy to-brand-vibrant hover:brightness-110 text-white font-black py-6 text-sm shadow-bold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Memverifikasi...</span>
                    </>
                  ) : (
                    <span>Masuk ke Dashboard</span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="py-4 text-center text-xs font-semibold text-brand-gray border-t border-brand-border">
        The Soul of Speaking Indonesia • Secure Admin Area
      </footer>
    </div>
  );
}
