"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, Sparkles, Shield, Heart } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border/60 bg-white/85 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-brand-burgundy/20 bg-white p-0.5 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-brand-burgundy">
            <Image
              src="/images/logo.png"
              alt="The Soul of Speaking Indonesia Logo"
              width={48}
              height={48}
              priority
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-lg font-bold tracking-tight text-brand-charcoal group-hover:text-brand-burgundy transition-colors">
                The Soul of Speaking
              </span>
              <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-brand-burgundy" />
              <span className="hidden sm:inline-block text-[10px] font-semibold text-brand-burgundy/80 uppercase tracking-widest">
                Indonesia
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-brand-burgundy">
                Personal Soul Blueprint™
              </span>
              <span className="hidden lg:inline-flex rounded-full bg-brand-rose px-2 py-0.5 text-[9px] font-bold text-brand-burgundy">
                Self-Assessment
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          <Link
            href="/#about"
            className="text-sm font-medium text-brand-charcoal/80 hover:text-brand-burgundy transition-colors"
          >
            Filosofi
          </Link>
          <Link
            href="/#patterns"
            className="text-sm font-medium text-brand-charcoal/80 hover:text-brand-burgundy transition-colors"
          >
            9 Pola Komunikasi
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm font-medium text-brand-charcoal/80 hover:text-brand-burgundy transition-colors"
          >
            Alur Asesmen
          </Link>
          <Link
            href="/#faq"
            className="text-sm font-medium text-brand-charcoal/80 hover:text-brand-burgundy transition-colors"
          >
            FAQ
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/assessment/start">
            <Button className="group gap-2 rounded-xl bg-brand-burgundy hover:bg-brand-plum text-white shadow-soft font-semibold transition-all duration-300 hover:shadow-card hover:-translate-y-0.5">
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
            className="inline-flex items-center justify-center rounded-xl p-2.5 text-brand-charcoal hover:bg-brand-rose/60 transition-colors"
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-brand-burgundy" />
            ) : (
              <Menu className="h-6 w-6 text-brand-charcoal" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-brand-border bg-white px-5 pt-3 pb-6 space-y-4 shadow-card animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 text-sm font-semibold text-brand-charcoal hover:bg-brand-rose/50 rounded-xl transition-colors"
            >
              Filosofi & Pendekatan
            </Link>
            <Link
              href="/#patterns"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 text-sm font-semibold text-brand-charcoal hover:bg-brand-rose/50 rounded-xl transition-colors"
            >
              Sembilan Pola Komunikasi
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 text-sm font-semibold text-brand-charcoal hover:bg-brand-rose/50 rounded-xl transition-colors"
            >
              Alur Pengisian & Cara Kerja
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 text-sm font-semibold text-brand-charcoal hover:bg-brand-rose/50 rounded-xl transition-colors"
            >
              Pertanyaan Umum (FAQ)
            </Link>
          </div>

          <div className="pt-2 border-t border-brand-border/60">
            <Link href="/assessment/start" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full gap-2 rounded-xl bg-brand-burgundy hover:bg-brand-plum text-white justify-center shadow-card py-3">
                <Sparkles className="h-4 w-4" />
                <span>Mulai Personal Soul Blueprint™</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
