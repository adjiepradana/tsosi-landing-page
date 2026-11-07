import test from "node:test";
import assert from "node:assert/strict";

import { AssessmentRepository } from "../src/lib/db/assessment-repository";
import { hashResultToken } from "../src/lib/security/token";

test("E2E Journey - Complete Participant Assessment & Scoring", async () => {
  // 1. Participant registration
  const participantInfo = {
    fullName: "Ahmad Fauzi Test",
    email: "ahmad.fauzi@example.com",
    phone: "081234567890",
  };

  const { submissionId, resultToken } =
    await AssessmentRepository.startSubmission(participantInfo);

  assert.ok(submissionId, "Submission ID must be generated");
  assert.ok(resultToken, "Result token must be generated");

  // 2. Save partial progress
  const partialAnswers = { 1: 4, 2: 4, 3: 5 };
  const savedPartial = await AssessmentRepository.saveProgress(
    submissionId,
    partialAnswers,
    3
  );
  assert.equal(savedPartial, true);

  // 3. Complete all 27 statements
  const fullAnswers: Record<number, number> = {};
  for (let i = 1; i <= 27; i++) {
    // Alternate scores between 2, 3, and 4
    fullAnswers[i] = (i % 3) + 2;
  }

  const { resultToken: finalToken, scores } =
    await AssessmentRepository.submitAssessment(submissionId, fullAnswers);

  assert.equal(finalToken, resultToken);
  assert.ok(scores.overallScore >= 1 && scores.overallScore <= 5);
  assert.equal(scores.patternResults.length, 9);
  assert.ok(scores.priorityPatterns.length > 0);

  // 4. Retrieve result using valid token
  const retrievedResult = await AssessmentRepository.getResultByToken(resultToken);
  assert.ok(retrievedResult, "Report should be retrieved by valid token");
  assert.equal(retrievedResult?.participant.fullName, "Ahmad Fauzi Test");
  assert.equal(retrievedResult?.scores.overallScore, scores.overallScore);
  assert.equal(Object.keys(retrievedResult!.answers).length, 27);

  // 5. Test reflection submission
  const reflectionSaved = await AssessmentRepository.saveReflection(resultToken, {
    triggerSituation: "Ketika dikritik secara mendadak di hadapan tim.",
    automaticThoughts: "Saya merasa tidak dihargai.",
    emotions: "Dada berdebar dan kesal.",
    responseTaken: "Membela diri dengan cepat.",
    alternativeResponse: "Memberi jeda 3 detik dan mendengarkan masukan hingga tuntas.",
    notes: "Latihan rutin hari ke-2.",
  });
  assert.equal(reflectionSaved, true);

  // 6. Verify reflection is attached to result
  const refreshedResult = await AssessmentRepository.getResultByToken(resultToken);
  assert.equal(
    refreshedResult?.reflection?.triggerSituation,
    "Ketika dikritik secara mendadak di hadapan tim."
  );

  // 7. Security: Invalid token lookup returns null
  const invalidResult = await AssessmentRepository.getResultByToken("invalid_fake_token_12345");
  assert.equal(invalidResult, null, "Invalid token must return null");
});

test("E2E Journey - Admin Dashboard Metrics & Filtering", async () => {
  // 1. Dashboard statistics
  const stats = await AssessmentRepository.getDashboardStats();
  assert.ok(stats.totalParticipants >= 4, "Should have seed participants");
  assert.ok(stats.totalCompleted >= 4, "Should have completed submissions");
  assert.ok(stats.averageOverallScore > 0, "Average overall score should be computed");
  assert.equal(stats.patternAverages.length, 9, "All 9 patterns should have averages");

  // 2. Filter & Search by Name
  const searchIrwansyah = await AssessmentRepository.getParticipantsList({
    search: "Irwansyah",
  });
  assert.ok(searchIrwansyah.participants.length >= 1);
  assert.equal(searchIrwansyah.participants[0].name, "Irwansyah Asadullah");

  // 3. Search by Phone
  const searchPhone = await AssessmentRepository.getParticipantsList({
    search: "081398765432",
  });
  assert.ok(searchPhone.participants.length >= 1);
  assert.equal(searchPhone.participants[0].name, "Sani Gunawan");

  // 4. Detail inspection for admin
  const detail = await AssessmentRepository.getParticipantDetail(
    searchIrwansyah.participants[0].submissionId
  );
  assert.ok(detail, "Detail should exist");
  assert.equal(detail?.participant.fullName, "Irwansyah Asadullah");
  assert.equal(Object.keys(detail!.answers).length, 27);
  assert.equal(detail?.scores.overallScore, 2.67);

  // 5. CSV Export generation
  const csv = await AssessmentRepository.generateCSVExport();
  assert.ok(csv.includes("Nama Lengkap,Email,Nomor HP/WA"));
  assert.ok(csv.includes("Irwansyah Asadullah"));
  assert.ok(csv.includes("Sani Gunawan"));
});
