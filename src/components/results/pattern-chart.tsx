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
    if (score >= 3.0) return "#B8125C"; // Bold Vibrant Crimson
    if (score >= 2.6) return "#9B1B5A"; // Rich Burgundy
    if (score >= 1.8) return "#7E1447"; // Deep Plum
    return "#1E0616"; // Midnight Plum
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
            tick={{ fill: "#4B444D", fontSize: 12, fontWeight: 700 }}
            axisLine={{ stroke: "#E5D5DF" }}
            tickLine={{ stroke: "#E5D5DF" }}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={120}
            tick={{ fill: "#110D13", fontSize: 12, fontWeight: 800 }}
            axisLine={{ stroke: "#E5D5DF" }}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "rgba(252, 231, 241, 0.5)" }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="rounded-2xl border-2 border-brand-vibrant/30 bg-white p-4 shadow-bold text-xs space-y-1.5 backdrop-blur-md">
                    <p className="font-black text-brand-charcoal text-sm">{item.fullName}</p>
                    <p className="text-brand-vibrant font-bold text-xs">
                      &ldquo;{item.title}&rdquo;
                    </p>
                    <div className="pt-1.5 border-t border-brand-border">
                      <p className="text-brand-gray font-semibold">
                        Skor: <span className="font-black text-brand-charcoal text-sm">{item.score.toFixed(2)}</span> / 5.00
                      </p>
                      <p className="text-brand-gray font-semibold">
                        Status: <span className="font-extrabold text-brand-burgundy">{item.category}</span>
                      </p>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={22}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
