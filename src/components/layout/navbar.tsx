"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border/60 bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-brand-burgundy/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
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
            <span className="font-serif text-lg font-bold tracking-tight text-brand-charcoal group-hover:text-brand-burgundy transition-colors">
              The Soul of Speaking
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wider text-brand-burgundy">
              Personal Soul Blueprint™
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/#about"
            className="text-sm font-medium text-brand-gray hover:text-brand-burgundy transition-colors"
          >
            Tentang Asesmen
          </Link>
          <Link
            href="/#patterns"
            className="text-sm font-medium text-brand-gray hover:text-brand-burgundy transition-colors"
          >
            9 Pola Komunikasi
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm font-medium text-brand-gray hover:text-brand-burgundy transition-colors"
          >
            Cara Kerja
          </Link>
          <Link
            href="/#faq"
            className="text-sm font-medium text-brand-gray hover:text-brand-burgundy transition-colors"
          >
            FAQ
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/assessment/start">
            <Button className="group gap-2 bg-brand-burgundy hover:bg-brand-plum text-white shadow-soft font-medium">
              <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
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
            className="inline-flex items-center justify-center rounded-lg p-2 text-brand-charcoal hover:bg-brand-rose/60"
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-brand-border bg-white px-4 pt-2 pb-6 space-y-4 shadow-card">
          <div className="flex flex-col space-y-3">
            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-brand-charcoal hover:bg-brand-rose/50 rounded-lg"
            >
              Tentang Asesmen
            </Link>
            <Link
              href="/#patterns"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-brand-charcoal hover:bg-brand-rose/50 rounded-lg"
            >
              9 Pola Komunikasi
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-brand-charcoal hover:bg-brand-rose/50 rounded-lg"
            >
              Cara Kerja
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-brand-charcoal hover:bg-brand-rose/50 rounded-lg"
            >
              FAQ
            </Link>
          </div>
          <div className="pt-2">
            <Link href="/assessment/start" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full gap-2 bg-brand-burgundy hover:bg-brand-plum text-white justify-center">
                <Sparkles className="h-4 w-4" />
                <span>Mulai Asesmen Personal</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
