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
    <section id="patterns" className="py-24 bg-white border-t border-brand-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-rose px-4 py-1 text-xs font-black uppercase tracking-wider text-brand-burgundy border border-brand-vibrant/20">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Peta Dinamika Komunikasi</span>
          </div>
          <h2 className="font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-brand-charcoal">
            Sembilan Pola Komunikasi Saat Konflik
          </h2>
          <p className="text-base sm:text-lg text-brand-gray font-medium leading-relaxed">
            Setiap manusia memiliki kombinasi unik dari pola-pola ini saat menghadapi situasi tegang, perbedaan pendapat, atau kritik yang memicu rasa tidak aman.
          </p>
        </div>

        {/* Filter Pills - Bold & Modern */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={() => setActiveFilter("ALL")}
            className={`rounded-xl px-5 py-2.5 text-xs font-extrabold transition-all ${
              activeFilter === "ALL"
                ? "bg-gradient-to-r from-brand-burgundy to-brand-vibrant text-white shadow-bold"
                : "bg-white text-brand-charcoal hover:text-brand-vibrant border-2 border-brand-border"
            }`}
          >
            Semua (9 Pola)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("EMOTION")}
            className={`rounded-xl px-5 py-2.5 text-xs font-extrabold transition-all ${
              activeFilter === "EMOTION"
                ? "bg-gradient-to-r from-brand-burgundy to-brand-vibrant text-white shadow-bold"
                : "bg-white text-brand-charcoal hover:text-brand-vibrant border-2 border-brand-border"
            }`}
          >
            Respon Emosional & Pembelaan
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("THOUGHT")}
            className={`rounded-xl px-5 py-2.5 text-xs font-extrabold transition-all ${
              activeFilter === "THOUGHT"
                ? "bg-gradient-to-r from-brand-burgundy to-brand-vibrant text-white shadow-bold"
                : "bg-white text-brand-charcoal hover:text-brand-vibrant border-2 border-brand-border"
            }`}
          >
            Persepsi & Penilaian Pikiran
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("RELATION")}
            className={`rounded-xl px-5 py-2.5 text-xs font-extrabold transition-all ${
              activeFilter === "RELATION"
                ? "bg-gradient-to-r from-brand-burgundy to-brand-vibrant text-white shadow-bold"
                : "bg-white text-brand-charcoal hover:text-brand-vibrant border-2 border-brand-border"
            }`}
          >
            Relasi & Batasan Pribadi
          </button>
        </div>

        {/* Grid of Pattern Cards - High Contrast, Bold & Modern */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPatterns.map((pattern) => {
            const Icon = PATTERN_ICONS[pattern.code] || Flame;
            const isExpanded = expandedPattern === pattern.code;

            return (
              <div
                key={pattern.code}
                className="group relative rounded-3xl border-2 border-brand-border bg-white p-7 shadow-soft hover:shadow-bold hover:border-brand-vibrant transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-2xl bg-brand-rose flex items-center justify-center text-brand-burgundy group-hover:bg-gradient-to-r group-hover:from-brand-burgundy group-hover:to-brand-vibrant group-hover:text-white transition-all duration-300 shadow-sm border border-brand-vibrant/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="outline" className="text-[11px] font-mono font-bold text-brand-burgundy border-brand-vibrant/30 bg-brand-rose/40">
                      Pola #0{pattern.sortOrder}
                    </Badge>
                  </div>

                  {/* Titles */}
                  <div>
                    <h3 className="font-extrabold text-xl sm:text-2xl text-brand-charcoal group-hover:text-brand-vibrant transition-colors tracking-tight">
                      {pattern.name}
                    </h3>
                    <p className="text-xs font-bold text-brand-vibrant mt-1">
                      &ldquo;{pattern.indonesianTitle}&rdquo;
                    </p>
                  </div>

                  {/* Core Definition */}
                  <p className="text-xs sm:text-sm text-brand-gray font-medium leading-relaxed">
                    {pattern.definition}
                  </p>

                  {/* Expandable Details Accordion */}
                  {isExpanded && (
                    <div className="pt-3 space-y-3 border-t border-brand-border text-xs animate-in fade-in duration-200">
                      {pattern.sampleTrigger && (
                        <div className="p-3 rounded-2xl bg-brand-rose/40 border border-brand-vibrant/20">
                          <span className="font-black text-brand-burgundy block mb-1 uppercase tracking-wider text-[10px]">
                            Pemicu Khas:
                          </span>
                          <span className="text-brand-charcoal font-medium leading-relaxed">
                            {pattern.sampleTrigger}
                          </span>
                        </div>
                      )}

                      {pattern.impactNote && (
                        <div className="p-3 rounded-2xl bg-white border-2 border-brand-border">
                          <span className="font-black text-brand-vibrant block mb-1 uppercase tracking-wider text-[10px]">
                            Dampak pada Relasi:
                          </span>
                          <span className="text-brand-charcoal font-medium leading-relaxed">
                            {pattern.impactNote}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Footer Actions */}
                <div className="mt-6 pt-4 border-t border-brand-border space-y-3">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedPattern(isExpanded ? null : pattern.code)
                      }
                      className="text-xs font-extrabold text-brand-vibrant hover:underline inline-flex items-center gap-1"
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
                      className="text-[11px] font-bold text-brand-charcoal hover:text-brand-vibrant"
                    >
                      Uji Pola Saya →
                    </Link>
                  </div>

                  <div className="text-[11px] text-brand-charcoal bg-brand-rose/50 p-3 rounded-2xl border border-brand-vibrant/20 font-medium">
                    <span className="font-black text-brand-burgundy">Latihan: </span>
                    <span>{pattern.actionAdvice}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout banner - High Energy & Bold */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-brand-plum via-brand-burgundy to-brand-deep p-8 sm:p-12 text-white shadow-bold flex flex-col sm:flex-row items-center justify-between gap-6 border border-brand-magenta/30">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-black text-2xl sm:text-3xl tracking-tight">
              Manakah Pola yang Paling Dominan Pada Diri Anda?
            </h3>
            <p className="text-sm text-brand-rose font-medium max-w-xl">
              Cari tahu urutan peringkat dan tingkat kemunculan 9 pola komunikasi Anda secara objektif melalui 27 pernyataan refleksi diri.
            </p>
          </div>
          <Link href="/assessment/start" className="shrink-0">
            <Button
              size="lg"
              className="gap-2.5 rounded-2xl bg-white text-brand-burgundy hover:bg-brand-rose hover:text-brand-plum font-extrabold shadow-elevated py-7 px-8 text-base transition-all hover:scale-105"
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
