import React from "react";
import { PATTERNS_LIST } from "@/modules/assessment/pattern-config";
import { Badge } from "@/components/ui/badge";
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

export function PatternGrid() {
  return (
    <section id="patterns" className="py-20 bg-brand-ivory/60 border-t border-brand-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="secondary" className="px-3.5 py-1 text-xs">
            Pemetaan Inti Asesmen
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-charcoal">
            Sembilan Pola Komunikasi Saat Konflik
          </h2>
          <p className="text-base sm:text-lg text-brand-gray leading-relaxed">
            Setiap pola merepresentasikan kecenderungan perilaku bawah sadar yang kerap muncul ketika situasi menegang atau menghadapi perbedaan.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PATTERNS_LIST.map((pattern, idx) => {
            const Icon = PATTERN_ICONS[pattern.code] || Flame;
            return (
              <div
                key={pattern.code}
                className="group relative rounded-2xl border border-brand-border bg-white p-7 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-11 w-11 rounded-xl bg-brand-rose flex items-center justify-center text-brand-burgundy group-hover:bg-brand-burgundy group-hover:text-white transition-colors duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-serif font-bold text-sm text-brand-gray/50 group-hover:text-brand-burgundy/60 transition-colors">
                      Pola #0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold text-brand-charcoal group-hover:text-brand-burgundy transition-colors">
                      {pattern.name}
                    </h3>
                    <p className="text-xs font-semibold text-brand-burgundy mt-0.5">
                      {pattern.indonesianTitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
                    {pattern.definition}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-border/60">
                  <div className="text-[11px] font-medium text-brand-charcoal/80 flex items-start gap-1.5">
                    <span className="text-brand-burgundy font-bold">Fokus:</span>
                    <span>{pattern.actionAdvice}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
