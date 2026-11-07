"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border/70 bg-white/95 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group max-w-[78%] sm:max-w-none">
          <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-full border-2 border-brand-vibrant/30 bg-white p-0.5 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-brand-vibrant group-hover:shadow-glow">
            <Image
              src="/images/logo.png"
              alt="The Soul of Speaking Indonesia Logo"
              width={48}
              height={48}
              priority
              className="object-contain"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-sm sm:text-lg tracking-tight text-brand-charcoal group-hover:text-brand-vibrant transition-colors truncate">
                The Soul of Speaking
              </span>
              <span className="hidden md:inline-block h-1.5 w-1.5 rounded-full bg-brand-vibrant" />
              <span className="hidden md:inline-block text-[11px] font-bold text-brand-vibrant uppercase tracking-widest">
                Indonesia
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-[11px] font-black tracking-wider uppercase text-brand-burgundy truncate">
                Personal Soul Blueprint™
              </span>
              <span className="hidden lg:inline-flex rounded-full bg-brand-rose px-2.5 py-0.5 text-[9px] font-extrabold text-brand-burgundy border border-brand-vibrant/20">
                Self-Assessment
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link
            href="/#about"
            className="text-sm font-semibold text-brand-charcoal/80 hover:text-brand-vibrant transition-colors tracking-tight"
          >
            Filosofi
          </Link>
          <Link
            href="/#patterns"
            className="text-sm font-semibold text-brand-charcoal/80 hover:text-brand-vibrant transition-colors tracking-tight"
          >
            9 Pola Komunikasi
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm font-semibold text-brand-charcoal/80 hover:text-brand-vibrant transition-colors tracking-tight"
          >
            Alur Asesmen
          </Link>
          <Link
            href="/#faq"
            className="text-sm font-semibold text-brand-charcoal/80 hover:text-brand-vibrant transition-colors tracking-tight"
          >
            FAQ
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/assessment/start">
            <Button className="group gap-2.5 rounded-xl bg-gradient-to-r from-brand-burgundy via-brand-vibrant to-brand-burgundy hover:brightness-110 text-white shadow-bold font-bold transition-all duration-300 hover:-translate-y-0.5 px-5 py-2.5">
              <Sparkles className="h-4 w-4 text-brand-rose transition-transform group-hover:rotate-12" />
              <span>Mulai Asesmen</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-xl p-2 text-brand-charcoal hover:bg-brand-rose/60 transition-colors focus:outline-none"
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-brand-vibrant" />
            ) : (
              <Menu className="h-6 w-6 text-brand-charcoal" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-brand-border bg-white px-4 pt-3 pb-6 space-y-4 shadow-card animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1.5">
            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 text-sm font-bold text-brand-charcoal hover:bg-brand-rose/50 rounded-xl transition-colors"
            >
              Filosofi & Pendekatan
            </Link>
            <Link
              href="/#patterns"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 text-sm font-bold text-brand-charcoal hover:bg-brand-rose/50 rounded-xl transition-colors"
            >
              Sembilan Pola Komunikasi
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 text-sm font-bold text-brand-charcoal hover:bg-brand-rose/50 rounded-xl transition-colors"
            >
              Langkah Penyelesaian
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 text-sm font-bold text-brand-charcoal hover:bg-brand-rose/50 rounded-xl transition-colors"
            >
              Pertanyaan Umum (FAQ)
            </Link>
          </div>

          <div className="pt-2 border-t border-brand-border">
            <Link
              href="/assessment/start"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full"
            >
              <Button className="w-full gap-2 rounded-xl bg-gradient-to-r from-brand-burgundy to-brand-vibrant text-white font-bold py-5 text-sm shadow-bold">
                <Sparkles className="h-4 w-4 text-brand-rose" />
                <span>Mulai Asesmen Personal</span>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
