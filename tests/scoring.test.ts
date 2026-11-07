import test from "node:test";
import assert from "node:assert/strict";

import { calculateAssessmentScores, validateAnswers } from "../src/modules/assessment/scoring";
import { getCategoryFromScore, getLevelFromScore } from "../src/modules/assessment/interpretation";

test("Scoring Engine - Minimum Score (All 1s)", () => {
  const answers: Record<number, number> = {};
  for (let i = 1; i <= 27; i++) answers[i] = 1;

  const result = calculateAssessmentScores(answers);
  assert.equal(result.overallScore, 1.0);
  assert.equal(result.overallCategory, "Hampir tidak pernah");
  assert.equal(result.patternResults.length, 9);
  result.patternResults.forEach((p) => {
    assert.equal(p.score, 1.0);
    assert.equal(p.level, "RENDAH");
    assert.equal(p.category, "Hampir tidak pernah");
  });
});

test("Scoring Engine - Maximum Score (All 5s)", () => {
  const answers: Record<number, number> = {};
  for (let i = 1; i <= 27; i++) answers[i] = 5;

  const result = calculateAssessmentScores(answers);
  assert.equal(result.overallScore, 5.0);
  assert.equal(result.overallCategory, "Sangat sering muncul");
  result.patternResults.forEach((p) => {
    assert.equal(p.score, 5.0);
    assert.equal(p.level, "TINGGI");
    assert.equal(p.category, "Sangat sering muncul");
  });
});

test("Scoring Engine - Midpoint Score (All 3s)", () => {
  const answers: Record<number, number> = {};
  for (let i = 1; i <= 27; i++) answers[i] = 3;

  const result = calculateAssessmentScores(answers);
  assert.equal(result.overallScore, 3.0);
  assert.equal(result.overallCategory, "Kadang-kadang muncul");
  result.patternResults.forEach((p) => {
    assert.equal(p.score, 3.0);
    assert.equal(p.level, "TINGGI");
    assert.equal(p.category, "Kadang-kadang muncul");
  });
});

test("Scoring Engine - Boundary Thresholds", () => {
  assert.equal(getCategoryFromScore(1.79).category, "Hampir tidak pernah");
  assert.equal(getCategoryFromScore(1.8).category, "Jarang dilaporkan");
  assert.equal(getCategoryFromScore(2.59).category, "Jarang dilaporkan");
  assert.equal(getCategoryFromScore(2.6).category, "Kadang-kadang muncul");
  assert.equal(getCategoryFromScore(3.39).category, "Kadang-kadang muncul");
  assert.equal(getCategoryFromScore(3.4).category, "Sering muncul");
  assert.equal(getCategoryFromScore(4.19).category, "Sering muncul");
  assert.equal(getCategoryFromScore(4.2).category, "Sangat sering muncul");

  assert.equal(getLevelFromScore(1.79), "RENDAH");
  assert.equal(getLevelFromScore(1.8), "SEDANG");
  assert.equal(getLevelFromScore(2.99), "SEDANG");
  assert.equal(getLevelFromScore(3.0), "TINGGI");
});

test("Scoring Engine - Authentic Report Replication (Irwansyah Asadullah)", () => {
  // Irwansyah:
  // Reactive: 3.00 (sum=9)
  // Assumption: 2.33 (sum=7)
  // Defensive: 2.33 (sum=7)
  // Avoidance: 2.67 (sum=8)
  // People-Pleasing: 3.00 (sum=9)
  // Control: 2.67 (sum=8)
  // Judgment: 2.33 (sum=7)
  // Listening Gap: 3.00 (sum=9)
  // Escalation: 2.67 (sum=8)
  // Overall sum = 72. 72 / 27 = 2.6666... -> 2.67
  const answers: Record<number, number> = {
    // Reactive: 3, 3, 3
    1: 3, 2: 3, 3: 3,
    // Assumption: 2, 2, 3
    4: 2, 5: 2, 6: 3,
    // Defensive: 2, 2, 3
    7: 2, 8: 2, 9: 3,
    // Avoidance: 2, 3, 3
    10: 2, 11: 3, 12: 3,
    // People-Pleasing: 3, 3, 3
    13: 3, 14: 3, 15: 3,
    // Control: 2, 3, 3
    16: 2, 17: 3, 18: 3,
    // Judgment: 2, 2, 3
    19: 2, 20: 2, 21: 3,
    // Listening Gap: 3, 3, 3
    22: 3, 23: 3, 24: 3,
    // Escalation: 2, 3, 3
    25: 2, 26: 3, 27: 3,
  };

  const result = calculateAssessmentScores(answers);
  assert.equal(result.overallScore, 2.67);
  assert.equal(result.overallCategory, "Kadang-kadang muncul");

  const reactive = result.patternResults.find((p) => p.patternCode === "REACTIVE")!;
  assert.equal(reactive.score, 3.0);
  assert.equal(reactive.category, "Kadang-kadang muncul");
  assert.equal(reactive.level, "TINGGI");

  const assumption = result.patternResults.find((p) => p.patternCode === "ASSUMPTION")!;
  assert.equal(assumption.score, 2.33);
  assert.equal(assumption.category, "Jarang dilaporkan");
  assert.equal(assumption.level, "SEDANG");

  const defensive = result.patternResults.find((p) => p.patternCode === "DEFENSIVE")!;
  assert.equal(defensive.score, 2.33);
  assert.equal(defensive.category, "Jarang dilaporkan");
  assert.equal(defensive.level, "SEDANG");

  const avoidance = result.patternResults.find((p) => p.patternCode === "AVOIDANCE")!;
  assert.equal(avoidance.score, 2.67);
  assert.equal(avoidance.category, "Kadang-kadang muncul");
  assert.equal(avoidance.level, "SEDANG");
});

test("Scoring Engine - Authentic Report Replication (Sani Gunawan)", () => {
  // Sani Gunawan:
  // Avoidance: 1.67 (sum=5) -> Hampir tidak pernah
  // Defensive: 2.33 (sum=7)
  // People-Pleasing: 3.00 (sum=9)
  // Control: 3.00 (sum=9)
  // Listening Gap: 2.00 (sum=6)
  // Overall = 2.41 (sum=65)
  const answers: Record<number, number> = {
    // Reactive: 2.33 (sum=7)
    1: 2, 2: 2, 3: 3,
    // Assumption: 2.00 (sum=6)
    4: 2, 5: 2, 6: 2,
    // Defensive: 2.33 (sum=7)
    7: 2, 8: 2, 9: 3,
    // Avoidance: 1.67 (sum=5)
    10: 1, 11: 2, 12: 2,
    // People-Pleasing: 3.00 (sum=9)
    13: 3, 14: 3, 15: 3,
    // Control: 3.00 (sum=9)
    16: 3, 17: 3, 18: 3,
    // Judgment: 2.67 (sum=8)
    19: 2, 20: 3, 21: 3,
    // Listening Gap: 2.00 (sum=6)
    22: 2, 23: 2, 24: 2,
    // Escalation: 2.67 (sum=8)
    25: 2, 26: 3, 27: 3,
  };

  const result = calculateAssessmentScores(answers);
  assert.equal(result.overallScore, 2.41);
  assert.equal(result.overallCategory, "Jarang dilaporkan");

  const avoidance = result.patternResults.find((p) => p.patternCode === "AVOIDANCE")!;
  assert.equal(avoidance.score, 1.67);
  assert.equal(avoidance.category, "Hampir tidak pernah");
  assert.equal(avoidance.level, "RENDAH");
});

test("Scoring Engine - Validation against invalid inputs", () => {
  // Missing questions
  assert.throws(() => validateAnswers({ 1: 3, 2: 4 }), /27 jawaban/);

  // Out of range (6)
  const invalidHigh: Record<number, number> = {};
  for (let i = 1; i <= 27; i++) invalidHigh[i] = 3;
  invalidHigh[10] = 6;
  assert.throws(() => validateAnswers(invalidHigh), /di luar skala 1 hingga 5/);

  // Out of range (0)
  invalidHigh[10] = 0;
  assert.throws(() => validateAnswers(invalidHigh), /di luar skala 1 hingga 5/);

  // Non-integer
  invalidHigh[10] = 3.5;
  assert.throws(() => validateAnswers(invalidHigh), /harus berupa bilangan bulat/);
});

test("Scoring Engine - Deterministic Tie Breaking", () => {
  const answers: Record<number, number> = {};
  for (let i = 1; i <= 27; i++) answers[i] = 3;

  const result = calculateAssessmentScores(answers);
  assert.equal(result.overallScore, 3.0);
  assert.equal(result.overallCategory, "Kadang-kadang muncul");

  // When all have score 3.00, ranks should follow sortOrder (1..9)
  for (let i = 0; i < 9; i++) {
    assert.equal(result.patternResults[i].rank, i + 1);
  }
});
