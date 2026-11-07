"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PATTERNS_LIST } from "@/modules/assessment/pattern-config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Flame,
  HelpCircle,
  ShieldAlert,
  EyeOff,
  UserCheck,
  Sliders,
  Scale,
  EarOff,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Info,
  ChevronRight,
} from "lucide-react";

const PATTERN_ICONS: Record<string, React.ElementType> = {
  REACTIVE: Flame,
  ASSUMPTION: HelpCircle,
  DEFENSIVE: ShieldAlert,
  AVOIDANCE: EyeOff,
  PEOPLE_PLEASING: UserCheck,
  CONTROL: Sliders,
  JUDGMENT: Scale,
  LISTENING_GAP: EarOff,
  ESCALATION: TrendingUp,
};

type CategoryFilter = "ALL" | "EMOTION" | "THOUGHT" | "RELATION";

export function PatternGrid() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("ALL");
  const [expandedPattern, setExpandedPattern] = useState<string | null>(null);

  const filterCategoryMap: Record<string, CategoryFilter> = {
    REACTIVE: "EMOTION",
    DEFENSIVE: "EMOTION",
    ESCALATION: "EMOTION",
    ASSUMPTION: "THOUGHT",
    JUDGMENT: "THOUGHT",
    LISTENING_GAP: "THOUGHT",
    AVOIDANCE: "RELATION",
    PEOPLE_PLEASING: "RELATION",
    CONTROL: "RELATION",
  };

  const filteredPatterns = PATTERNS_LIST.filter((p) => {
    if (activeFilter === "ALL") return true;
    return filterCategoryMap[p.code] === activeFilter;
  });

  return (
    <section id="patterns" className="py-24 bg-gradient-to-b from-brand-ivory/60 via-white to-brand-ivory/40 border-t border-brand-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-rose px-3.5 py-1 text-xs font-semibold text-brand-burgundy">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Peta Dinamika Komunikasi</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-charcoal">
            Sembilan Pola Komunikasi Saat Konflik
          </h2>
          <p className="text-base sm:text-lg text-brand-gray leading-relaxed">
            Setiap manusia memiliki kombinasi unik dari pola-pola ini saat menghadapi situasi tegang, perbedaan pendapat, atau kritik yang memicu rasa tidak aman.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setActiveFilter("ALL")}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
              activeFilter === "ALL"
                ? "bg-brand-burgundy text-white shadow-soft"
                : "bg-white text-brand-charcoal hover:bg-brand-rose/60 border border-brand-border/80"
            }`}
          >
            Semua (9 Pola)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("EMOTION")}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
              activeFilter === "EMOTION"
                ? "bg-brand-burgundy text-white shadow-soft"
                : "bg-white text-brand-charcoal hover:bg-brand-rose/60 border border-brand-border/80"
            }`}
          >
            Respon Emosional & Pembelaan
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("THOUGHT")}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
              activeFilter === "THOUGHT"
                ? "bg-brand-burgundy text-white shadow-soft"
                : "bg-white text-brand-charcoal hover:bg-brand-rose/60 border border-brand-border/80"
            }`}
          >
            Persepsi & Penilaian Pikiran
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("RELATION")}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
              activeFilter === "RELATION"
                ? "bg-brand-burgundy text-white shadow-soft"
                : "bg-white text-brand-charcoal hover:bg-brand-rose/60 border border-brand-border/80"
            }`}
          >
            Relasi & Batasan Pribadi
          </button>
        </div>

        {/* Grid of Pattern Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPatterns.map((pattern) => {
            const Icon = PATTERN_ICONS[pattern.code] || Flame;
            const isExpanded = expandedPattern === pattern.code;

            return (
              <div
                key={pattern.code}
                className="group relative rounded-3xl border border-brand-border/80 bg-white p-7 shadow-soft hover:shadow-card hover:border-brand-burgundy/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-2xl bg-brand-rose/70 flex items-center justify-center text-brand-burgundy group-hover:bg-brand-burgundy group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="outline" className="text-[11px] font-mono text-brand-gray border-brand-border">
                      Pola #0{pattern.sortOrder}
                    </Badge>
                  </div>

                  {/* Titles */}
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-charcoal group-hover:text-brand-burgundy transition-colors">
                      {pattern.name}
                    </h3>
                    <p className="text-xs font-semibold text-brand-burgundy mt-1 italic">
                      &ldquo;{pattern.indonesianTitle}&rdquo;
                    </p>
                  </div>

                  {/* Core Definition */}
                  <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
                    {pattern.definition}
                  </p>

                  {/* Expandable Details Accordion */}
                  {isExpanded && (
                    <div className="pt-3 space-y-3 border-t border-brand-border/60 text-xs animate-in fade-in duration-200">
                      {pattern.sampleTrigger && (
                        <div className="p-3 rounded-xl bg-brand-ivory border border-brand-border/50">
                          <span className="font-bold text-brand-burgundy block mb-0.5">
                            Pemicu Khas:
                          </span>
                          <span className="text-brand-charcoal leading-relaxed">
                            {pattern.sampleTrigger}
                          </span>
                        </div>
                      )}

                      {pattern.impactNote && (
                        <div className="p-3 rounded-xl bg-brand-rose/30 border border-brand-border/50">
                          <span className="font-bold text-brand-plum block mb-0.5">
                            Dampak pada Relasi:
                          </span>
                          <span className="text-brand-charcoal leading-relaxed">
                            {pattern.impactNote}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Footer Actions */}
                <div className="mt-6 pt-4 border-t border-brand-border/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedPattern(isExpanded ? null : pattern.code)
                      }
                      className="text-xs font-bold text-brand-burgundy hover:underline inline-flex items-center gap-1"
                    >
                      <span>{isExpanded ? "Tutup Detail" : "Pelajari Pemicu"}</span>
                      <ChevronRight
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    <Link
                      href="/assessment/start"
                      className="text-[11px] font-semibold text-brand-gray hover:text-brand-burgundy"
                    >
                      Uji Pola Saya →
                    </Link>
                  </div>

                  <div className="text-[11px] text-brand-charcoal/80 bg-brand-ivory/80 p-2.5 rounded-xl border border-brand-border/40">
                    <span className="font-bold text-brand-burgundy">Latihan: </span>
                    <span>{pattern.actionAdvice}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-brand-plum via-brand-burgundy to-brand-plum p-8 sm:p-10 text-white shadow-elevated flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Manakah Pola yang Paling Dominan Pada Diri Anda?
            </h3>
            <p className="text-xs sm:text-sm text-brand-rose/90 max-w-xl">
              Cari tahu urutan peringkat dan tingkat kemunculan 9 pola komunikasi Anda secara objektif melalui 27 pernyataan refleksi diri.
            </p>
          </div>
          <Link href="/assessment/start" className="shrink-0">
            <Button
              size="lg"
              className="gap-2 rounded-xl bg-white text-brand-burgundy hover:bg-brand-rose hover:text-brand-plum font-bold shadow-soft py-6 px-8"
            >
              <span>Mulai Asesmen Gratis</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
