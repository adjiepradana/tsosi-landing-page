import {
  AssessmentCalculationResult,
  PatternCode,
  PatternScoreResult,
} from "../../types/assessment";
import { ASSESSMENT_PATTERNS, PATTERNS_LIST } from "./pattern-config";
import {
  getCategoryFromScore,
  getLevelFromScore,
  PATTERN_INTERPRETATIONS,
} from "./interpretation";

export interface CalculateScoreOptions {
  answers: Record<number, number>; // itemNumber (1..27) -> answer (1..5)
}

export class ScoringError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ScoringError";
  }
}

/**
 * Validates the answers map for complete 27 items with 1..5 range
 */
export function validateAnswers(answers: Record<number, number>): void {
  if (!answers || typeof answers !== "object") {
    throw new ScoringError("Jawaban asesmen tidak ditemukan atau berformat tidak valid.");
  }

  const answeredNumbers = Object.keys(answers).map(Number);

  if (answeredNumbers.length !== 27) {
    throw new ScoringError(
      `Asesmen membutuhkan tepat 27 jawaban lengkap. Saat ini hanya ada ${answeredNumbers.length} jawaban.`
    );
  }

  for (let i = 1; i <= 27; i++) {
    const val = answers[i];
    if (typeof val !== "number" || isNaN(val)) {
      throw new ScoringError(`Pertanyaan nomor ${i} belum memiliki nilai jawaban valid.`);
    }
    if (val < 1 || val > 5) {
      throw new ScoringError(
        `Nilai jawaban pertanyaan nomor ${i} (${val}) berada di luar skala 1 hingga 5.`
      );
    }
    if (!Number.isInteger(val)) {
      throw new ScoringError(
        `Nilai jawaban pertanyaan nomor ${i} harus berupa bilangan bulat antara 1 dan 5.`
      );
    }
  }
}

/**
 * Authoritative Server-side Scoring Engine
 */
export function calculateAssessmentScores(
  answers: Record<number, number>
): AssessmentCalculationResult {
  // 1. Strict Validation
  validateAnswers(answers);

  // 2. Calculate Pattern Scores (each pattern has 3 items)
  const patternScores: Array<{
    code: PatternCode;
    score: number;
    rawSum: number;
  }> = [];

  for (const pattern of PATTERNS_LIST) {
    let sum = 0;
    for (const itemNum of pattern.itemNumbers) {
      sum += answers[itemNum];
    }
    const avg = sum / pattern.itemNumbers.length;
    // Round to 2 decimal places strictly
    const roundedScore = Math.round(avg * 100) / 100;
    patternScores.push({
      code: pattern.code,
      score: roundedScore,
      rawSum: sum,
    });
  }

  // 3. Calculate Overall Score
  let totalSum = 0;
  for (let i = 1; i <= 27; i++) {
    totalSum += answers[i];
  }
  const overallAvg = totalSum / 27;
  const roundedOverallScore = Math.round(overallAvg * 100) / 100;
  const overallCategoryInfo = getCategoryFromScore(roundedOverallScore);

  // 4. Rank Patterns (Highest score = Rank 1)
  // Tie-breaker: preserve deterministic order based on sortOrder
  const sortedByScore = [...patternScores].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return (
      ASSESSMENT_PATTERNS[a.code].sortOrder - ASSESSMENT_PATTERNS[b.code].sortOrder
    );
  });

  const rankMap = new Map<PatternCode, number>();
  sortedByScore.forEach((item, index) => {
    rankMap.set(item.code, index + 1);
  });

  // 5. Build Detailed Pattern Results
  const patternResults: PatternScoreResult[] = PATTERNS_LIST.map((pattern) => {
    const pScore = patternScores.find((p) => p.code === pattern.code)!;
    const catInfo = getCategoryFromScore(pScore.score);
    const level = getLevelFromScore(pScore.score);
    const narrative = PATTERN_INTERPRETATIONS[pattern.code][level];
    const rank = rankMap.get(pattern.code)!;
    const isPriority = rank <= 3 && pScore.score >= 2.6; // Top 3 priority with notable presence

    return {
      patternCode: pattern.code,
      patternName: pattern.name,
      indonesianTitle: pattern.indonesianTitle,
      score: pScore.score,
      category: catInfo.category,
      categoryRangeDescription: catInfo.rangeDescription,
      level,
      interpretationText: narrative.text,
      actionAdvice: pattern.actionAdvice,
      rank,
      isPriority,
    };
  });

  // 6. Identify Priority Patterns (Top 3 highest scores)
  const priorityPatterns = [...patternResults]
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 3);

  // 7. Identify Strengths (Low scores, lowest rankings)
  const strengthPatterns = [...patternResults]
    .filter((p) => p.score < 2.0)
    .sort((a, b) => a.score - b.score);

  return {
    overallScore: roundedOverallScore,
    overallCategory: overallCategoryInfo.category,
    overallCategoryDescription: overallCategoryInfo.rangeDescription,
    patternResults,
    priorityPatterns,
    strengthPatterns,
    calculatedAt: new Date().toISOString(),
  };
}
