"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { PatternScoreResult } from "@/types/assessment";

interface PatternChartProps {
  patterns: PatternScoreResult[];
}

export function PatternChart({ patterns }: PatternChartProps) {
  // Format data for Recharts
  const data = patterns.map((p) => ({
    name: p.patternName.replace(" Pattern", ""),
    fullName: p.patternName,
    title: p.indonesianTitle,
    score: p.score,
    category: p.category,
    level: p.level,
  }));

  const getBarColor = (score: number) => {
    if (score >= 3.0) return "#9B1B5A"; // Brand Burgundy for High
    if (score >= 2.6) return "#BE4E89"; // Medium-High Rose Burgundy
    if (score >= 1.8) return "#7E1447"; // Medium Deep Burgundy
    return "#4B1735"; // Deep Plum
  };

  return (
    <div className="w-full h-[400px] pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 10, right: 40, left: 20, bottom: 20 }}
        >
          <XAxis
            type="number"
            domain={[0, 5]}
            ticks={[0, 1, 2, 3, 4, 5]}
            tick={{ fill: "#756D73", fontSize: 12, fontWeight: 500 }}
            axisLine={{ stroke: "#E9DDE3" }}
            tickLine={{ stroke: "#E9DDE3" }}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={110}
            tick={{ fill: "#29242A", fontSize: 12, fontWeight: 600 }}
            axisLine={{ stroke: "#E9DDE3" }}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "rgba(245, 232, 239, 0.4)" }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="rounded-2xl border border-brand-burgundy/20 bg-white p-4 shadow-card text-xs space-y-1.5 backdrop-blur-md">
                    <p className="font-bold text-brand-charcoal text-sm">{item.fullName}</p>
                    <p className="text-brand-burgundy font-semibold italic text-xs">
                      &ldquo;{item.title}&rdquo;
                    </p>
                    <div className="pt-1 border-t border-brand-border/60">
                      <p className="text-brand-gray">
                        Skor: <span className="font-bold text-brand-charcoal font-serif text-sm">{item.score.toFixed(2)}</span> / 5.00
                      </p>
                      <p className="text-brand-gray">
                        Status: <span className="font-semibold text-brand-burgundy">{item.category}</span>
                      </p>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={20}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
