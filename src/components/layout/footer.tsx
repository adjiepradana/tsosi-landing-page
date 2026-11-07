import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-brand-border bg-white text-brand-charcoal">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-brand-vibrant/30 p-0.5">
                <Image
                  src="/images/logo.png"
                  alt="The Soul of Speaking Indonesia"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-black text-lg text-brand-charcoal tracking-tight">
                  The Soul of Speaking Indonesia
                </h3>
                <p className="text-xs font-extrabold uppercase tracking-wider text-brand-vibrant">
                  Personal Soul Blueprint™
                </p>
              </div>
            </div>
            <p className="text-sm text-brand-gray font-medium leading-relaxed max-w-md">
              Platform refleksi diri dan komunikasi untuk mengenali kecenderungan respons saat menghadapi konflik, kritik, dan percakapan sulit. Bangun kesadaran diri dan temukan cara baru untuk berkomunikasi dengan lebih sehat dan berdaya.
            </p>
            <div className="inline-flex items-center gap-2 rounded-xl bg-brand-rose px-3.5 py-2 text-xs text-brand-burgundy font-bold border border-brand-vibrant/20">
              <ShieldCheck className="h-4 w-4 shrink-0 text-brand-vibrant" />
              <span>Dokumen refleksi diri • Bukan alat diagnosis medis atau psikologis</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-vibrant mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-brand-gray">
              <li>
                <Link href="/#about" className="hover:text-brand-vibrant transition-colors">
                  Tentang Blueprint
                </Link>
              </li>
              <li>
                <Link href="/#patterns" className="hover:text-brand-vibrant transition-colors">
                  9 Pola Komunikasi
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-brand-vibrant transition-colors">
                  Langkah & Cara Kerja
                </Link>
              </li>
              <li>
                <Link href="/assessment/start" className="hover:text-brand-burgundy font-bold text-brand-vibrant transition-colors">
                  Mulai Asesmen →
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Administration */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-vibrant mb-4">
              Privasi & Akses
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-brand-gray">
              <li>
                <Link href="/privacy" className="hover:text-brand-vibrant transition-colors">
                  Kebijakan Privasi Data
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-vibrant transition-colors">
                  Syarat & Batasan Penggunaan
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-brand-vibrant transition-colors text-xs text-brand-gray/80">
                  Portal Fasilitator / Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-brand-gray">
          <p>© {currentYear} The Soul of Speaking Indonesia. All rights reserved.</p>
          <p className="flex items-center gap-1.5 font-semibold">
            <span>Didedikasikan untuk komunikasi sadar dan berdaya</span>
            <Heart className="h-3.5 w-3.5 text-brand-vibrant fill-brand-vibrant" />
          </p>
        </div>
      </div>
    </footer>
  );
}
