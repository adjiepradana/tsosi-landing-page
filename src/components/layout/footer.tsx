import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-border bg-white text-brand-charcoal">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-brand-burgundy/20">
                <Image
                  src="/images/logo.png"
                  alt="The Soul of Speaking Indonesia"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-charcoal">
                  The Soul of Speaking Indonesia
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-burgundy">
                  Personal Soul Blueprint™
                </p>
              </div>
            </div>
            <p className="text-sm text-brand-gray leading-relaxed max-w-md">
              Platform refleksi diri dan komunikasi untuk mengenali kecenderungan respons saat menghadapi konflik, kritik, dan percakapan sulit. Bangun kesadaran diri dan temukan cara baru untuk berkomunikasi dengan lebih sehat dan penuh jiwa.
            </p>
            <div className="inline-flex items-center gap-2 rounded-lg bg-brand-rose/60 px-3 py-1.5 text-xs text-brand-burgundy font-medium">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>Dokumen refleksi diri • Bukan alat diagnosis medis atau psikologis</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-burgundy mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-gray">
              <li>
                <Link href="/#about" className="hover:text-brand-burgundy transition-colors">
                  Tentang Blueprint
                </Link>
              </li>
              <li>
                <Link href="/#patterns" className="hover:text-brand-burgundy transition-colors">
                  9 Pola Komunikasi
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-brand-burgundy transition-colors">
                  Langkah & Cara Kerja
                </Link>
              </li>
              <li>
                <Link href="/assessment/start" className="hover:text-brand-burgundy font-medium text-brand-burgundy transition-colors">
                  Mulai Asesmen
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Administration */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-burgundy mb-4">
              Privasi & Akses
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-gray">
              <li>
                <Link href="/privacy" className="hover:text-brand-burgundy transition-colors">
                  Kebijakan Privasi Data
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-burgundy transition-colors">
                  Syarat & Batasan Penggunaan
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-brand-burgundy transition-colors text-xs text-brand-gray/80">
                  Portal Fasilitator / Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-border/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-gray">
          <p>© {currentYear} The Soul of Speaking Indonesia. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Didedikasikan untuk komunikasi sadar dan penuh empati</span>
            <Heart className="h-3.5 w-3.5 text-brand-burgundy fill-brand-burgundy/20" />
          </p>
        </div>
      </div>
    </footer>
  );
}
