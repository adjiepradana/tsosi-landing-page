import fs from "fs";
import path from "path";
import crypto from "crypto";
import {
  AssessmentCalculationResult,
  PatternCode,
  PatternScoreResult,
  ReflectionData,
  SubmissionData,
} from "@/types/assessment";
import { calculateAssessmentScores } from "@/modules/assessment/scoring";
import { generateResultToken, hashResultToken } from "@/lib/security/token";
import { ASSESSMENT_PATTERNS } from "@/modules/assessment/pattern-config";
import { ASSESSMENT_ITEMS } from "@/modules/assessment/item-config";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "tsosi_db.json");

interface LocalDB {
  participants: Array<{
    id: string;
    fullName: string;
    email: string;
    phone: string;
    consentAt: string;
    createdAt: string;
  }>;
  submissions: Array<{
    id: string;
    participantId: string;
    assessmentVersion: string;
    scoringVersion: string;
    status: "in_progress" | "completed" | "abandoned";
    currentStep: number;
    startedAt: string;
    submittedAt?: string;
    resultToken: string;
    resultTokenHash: string;
    overallScore?: number;
    overallCategory?: string;
    primaryPatternCode?: string;
    createdAt: string;
    updatedAt: string;
  }>;
  answers: Array<{
    id: string;
    submissionId: string;
    itemNumber: number;
    questionCode: string;
    answerValue: number;
    createdAt: string;
  }>;
  patternResults: Array<{
    id: string;
    submissionId: string;
    patternCode: PatternCode;
    score: number;
    interpretationCategory: string;
    level: "RENDAH" | "SEDANG" | "TINGGI";
    interpretationText: string;
    rank: number;
    isPriority: boolean;
    createdAt: string;
  }>;
  reflections: Array<{
    id: string;
    submissionId: string;
    patternCode?: string;
    triggerSituation: string;
    automaticThoughts: string;
    emotions: string;
    responseTaken: string;
    alternativeResponse: string;
    notes?: string;
    createdAt: string;
  }>;
}

function ensureDB(): LocalDB {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialDB: LocalDB = {
      participants: [],
      submissions: [],
      answers: [],
      patternResults: [],
      reflections: [],
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDB, null, 2), "utf8");
    seedInitialAuthenticRecords(initialDB);
    return initialDB;
  }

  try {
    const content = fs.readFileSync(DB_FILE, "utf8");
    const parsed = JSON.parse(content) as LocalDB;
    if (parsed.submissions.length === 0) {
      seedInitialAuthenticRecords(parsed);
    }
    return parsed;
  } catch {
    const fallbackDB: LocalDB = {
      participants: [],
      submissions: [],
      answers: [],
      patternResults: [],
      reflections: [],
    };
    seedInitialAuthenticRecords(fallbackDB);
    return fallbackDB;
  }
}

function saveDB(db: LocalDB): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf8");
}

/**
 * Seeds authentic participant records from the verified PDF assessment reports
 */
function seedInitialAuthenticRecords(db: LocalDB) {
  const seedParticipants: Array<{
    name: string;
    email: string;
    phone: string;
    answers: Record<number, number>;
    token: string;
    date: string;
  }> = [
    {
      name: "Irwansyah Asadullah",
      email: "irwansyah.asadullah@example.com",
      phone: "081234567891",
      answers: {
        1: 3, 2: 3, 3: 3, 4: 2, 5: 2, 6: 3, 7: 2, 8: 2, 9: 3,
        10: 2, 11: 3, 12: 3, 13: 3, 14: 3, 15: 3, 16: 2, 17: 3, 18: 3,
        19: 2, 20: 2, 21: 3, 22: 3, 23: 3, 24: 3, 25: 2, 26: 3, 27: 3
      },
      token: "demo_irwansyah_token_99182348",
      date: new Date(Date.now() - 3600 * 1000 * 48).toISOString()
    },
    {
      name: "Sani Gunawan",
      email: "sani.gunawan@example.com",
      phone: "081398765432",
      answers: {
        1: 2, 2: 2, 3: 3, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 3,
        10: 1, 11: 2, 12: 2, 13: 3, 14: 3, 15: 3, 16: 3, 17: 3, 18: 3,
        19: 2, 20: 3, 21: 3, 22: 2, 23: 2, 24: 2, 25: 2, 26: 3, 27: 3
      },
      token: "demo_sani_token_48291047",
      date: new Date(Date.now() - 3600 * 1000 * 72).toISOString()
    },
    {
      name: "M. Khufron",
      email: "m.khufron@example.com",
      phone: "081523456789",
      answers: {
        1: 2, 2: 2, 3: 3, 4: 3, 5: 3, 6: 3, 7: 2, 8: 2, 9: 3,
        10: 3, 11: 3, 12: 3, 13: 3, 14: 3, 15: 2, 16: 3, 17: 3, 18: 3,
        19: 2, 20: 2, 21: 3, 22: 3, 23: 3, 24: 2, 25: 2, 26: 3, 27: 3
      },
      token: "demo_khufron_token_88291039",
      date: new Date(Date.now() - 3600 * 1000 * 24).toISOString()
    },
    {
      name: "Rafly Amanda",
      email: "rafly.amanda@example.com",
      phone: "081789123456",
      answers: {
        1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 3, 7: 1, 8: 2, 9: 2,
        10: 2, 11: 2, 12: 3, 13: 2, 14: 2, 15: 3, 16: 3, 17: 3, 18: 3,
        19: 2, 20: 2, 21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 2, 27: 2
      },
      token: "demo_rafly_token_33819204",
      date: new Date(Date.now() - 3600 * 1000 * 12).toISOString()
    }
  ];

  for (const item of seedParticipants) {
    const pId = crypto.randomUUID();
    const sId = crypto.randomUUID();

    db.participants.push({
      id: pId,
      fullName: item.name,
      email: item.email,
      phone: item.phone,
      consentAt: item.date,
      createdAt: item.date,
    });

    const scores = calculateAssessmentScores(item.answers);
    const primaryPattern = scores.priorityPatterns[0]?.patternCode || "REACTIVE";

    db.submissions.push({
      id: sId,
      participantId: pId,
      assessmentVersion: "1.0.0",
      scoringVersion: "1.0.0",
      status: "completed",
      currentStep: 27,
      startedAt: item.date,
      submittedAt: item.date,
      resultToken: item.token,
      resultTokenHash: hashResultToken(item.token),
      overallScore: scores.overallScore,
      overallCategory: scores.overallCategory,
      primaryPatternCode: primaryPattern,
      createdAt: item.date,
      updatedAt: item.date,
    });

    for (let q = 1; q <= 27; q++) {
      db.answers.push({
        id: crypto.randomUUID(),
        submissionId: sId,
        itemNumber: q,
        questionCode: `Q${q.toString().padStart(2, "0")}`,
        answerValue: (item.answers as Record<number, number>)[q],
        createdAt: item.date,
      });
    }

    for (const pr of scores.patternResults) {
      db.patternResults.push({
        id: crypto.randomUUID(),
        submissionId: sId,
        patternCode: pr.patternCode,
        score: pr.score,
        interpretationCategory: pr.category,
        level: pr.level,
        interpretationText: pr.interpretationText,
        rank: pr.rank,
        isPriority: pr.isPriority,
        createdAt: item.date,
      });
    }

    // Add sample reflections for demonstration
    db.reflections.push({
      id: crypto.randomUUID(),
      submissionId: sId,
      patternCode: primaryPattern,
      triggerSituation: "Ketika mendapatkan kritik di depan rapat tim tanpa pemberitahuan sebelumnya.",
      automaticThoughts: "Mereka mencoba mempermalukan saya dan tidak menghargai usaha saya.",
      emotions: "Detak jantung meningkat, dada sesak, rasa kesal dan tersudut.",
      responseTaken: "Langsung memotong pembicaraan dan membela diri dengan suara meninggi.",
      alternativeResponse: "Tarik nafas 3 kali, dengarkan sampai selesai, catat poin masukan, lalu minta waktu 10 menit untuk menanggapi secara objektif.",
      notes: "Perlu latihan memberi jeda dan mengatur nafas saat emosi mulai naik.",
      createdAt: item.date,
    });
  }

  saveDB(db);
}

export class AssessmentRepository {
  /**
   * Initializes a new participant and draft submission
   */
  static async startSubmission(info: {
    fullName: string;
    email: string;
    phone: string;
  }): Promise<{ submissionId: string; resultToken: string }> {
    const db = ensureDB();
    const participantId = crypto.randomUUID();
    const submissionId = crypto.randomUUID();
    const resultToken = generateResultToken();
    const resultTokenHash = hashResultToken(resultToken);
    const now = new Date().toISOString();

    db.participants.push({
      id: participantId,
      fullName: info.fullName.trim(),
      email: info.email.trim().toLowerCase(),
      phone: info.phone.trim(),
      consentAt: now,
      createdAt: now,
    });

    db.submissions.push({
      id: submissionId,
      participantId,
      assessmentVersion: "1.0.0",
      scoringVersion: "1.0.0",
      status: "in_progress",
      currentStep: 1,
      startedAt: now,
      resultToken,
      resultTokenHash,
      createdAt: now,
      updatedAt: now,
    });

    saveDB(db);
    return { submissionId, resultToken };
  }

  /**
   * Saves partial progress/draft answers
   */
  static async saveProgress(
    submissionId: string,
    answers: Record<number, number>,
    currentStep?: number
  ): Promise<boolean> {
    const db = ensureDB();
    const submission = db.submissions.find((s) => s.id === submissionId);
    if (!submission) return false;

    if (submission.status === "completed") {
      throw new Error("Asesmen sudah diselesaikan dan tidak dapat diubah lagi.");
    }

    const now = new Date().toISOString();
    submission.updatedAt = now;
    if (currentStep) {
      submission.currentStep = currentStep;
    }

    // Upsert answers
    for (const [key, value] of Object.entries(answers)) {
      const itemNum = parseInt(key, 10);
      if (itemNum >= 1 && itemNum <= 27 && value >= 1 && value <= 5) {
        const existingIdx = db.answers.findIndex(
          (a) => a.submissionId === submissionId && a.itemNumber === itemNum
        );
        if (existingIdx >= 0) {
          db.answers[existingIdx].answerValue = value;
          db.answers[existingIdx].createdAt = now;
        } else {
          db.answers.push({
            id: crypto.randomUUID(),
            submissionId,
            itemNumber: itemNum,
            questionCode: `Q${itemNum.toString().padStart(2, "0")}`,
            answerValue: value,
            createdAt: now,
          });
        }
      }
    }

    saveDB(db);
    return true;
  }

  /**
   * Finalizes assessment submission, runs authoritative scoring engine, and saves results
   */
  static async submitAssessment(
    submissionId: string,
    answers: Record<number, number>
  ): Promise<{ resultToken: string; scores: AssessmentCalculationResult }> {
    const db = ensureDB();
    const submission = db.submissions.find((s) => s.id === submissionId);
    if (!submission) {
      throw new Error("Sesi asesmen tidak ditemukan.");
    }

    if (submission.status === "completed") {
      // Already completed, return existing token
      const existingScores = await this.getScoresForSubmission(submissionId);
      return { resultToken: submission.resultToken, scores: existingScores };
    }

    // 1. Calculate authoritative scores
    const scores = calculateAssessmentScores(answers);
    const now = new Date().toISOString();

    // 2. Persist answers directly
    for (const [key, value] of Object.entries(answers)) {
      const itemNum = parseInt(key, 10);
      if (itemNum >= 1 && itemNum <= 27 && value >= 1 && value <= 5) {
        const existingIdx = db.answers.findIndex(
          (a) => a.submissionId === submissionId && a.itemNumber === itemNum
        );
        if (existingIdx >= 0) {
          db.answers[existingIdx].answerValue = value;
          db.answers[existingIdx].createdAt = now;
        } else {
          db.answers.push({
            id: crypto.randomUUID(),
            submissionId,
            itemNumber: itemNum,
            questionCode: `Q${itemNum.toString().padStart(2, "0")}`,
            answerValue: value,
            createdAt: now,
          });
        }
      }
    }

    // 3. Persist Pattern Results
    const primaryPattern = scores.priorityPatterns[0]?.patternCode || "REACTIVE";

    // Clean any prior results for this submission
    db.patternResults = db.patternResults.filter(
      (pr) => pr.submissionId !== submissionId
    );

    for (const pr of scores.patternResults) {
      db.patternResults.push({
        id: crypto.randomUUID(),
        submissionId,
        patternCode: pr.patternCode,
        score: pr.score,
        interpretationCategory: pr.category,
        level: pr.level,
        interpretationText: pr.interpretationText,
        rank: pr.rank,
        isPriority: pr.isPriority,
        createdAt: now,
      });
    }

    // 4. Update Submission status
    submission.status = "completed";
    submission.submittedAt = now;
    submission.updatedAt = now;
    submission.overallScore = scores.overallScore;
    submission.overallCategory = scores.overallCategory;
    submission.primaryPatternCode = primaryPattern;

    saveDB(db);

    return {
      resultToken: submission.resultToken,
      scores,
    };
  }

  /**
   * Retrieves full result report by secret participant token
   */
  static async getResultByToken(token: string): Promise<{
    participant: { fullName: string; email: string; phone: string };
    submission: {
      id: string;
      submittedAt: string;
      overallScore: number;
      overallCategory: string;
    };
    scores: AssessmentCalculationResult;
    answers: Record<number, number>;
    reflection?: ReflectionData;
  } | null> {
    const db = ensureDB();
    const tokenHash = hashResultToken(token);

    const submission = db.submissions.find(
      (s) => s.resultToken === token || s.resultTokenHash === tokenHash
    );

    if (!submission || submission.status !== "completed") {
      return null;
    }

    const participant = db.participants.find((p) => p.id === submission.participantId);
    if (!participant) return null;

    // Load answers
    const answersMap: Record<number, number> = {};
    db.answers
      .filter((a) => a.submissionId === submission.id)
      .forEach((a) => {
        answersMap[a.itemNumber] = a.answerValue;
      });

    // Re-calculate or format scores
    const scores = calculateAssessmentScores(answersMap);

    const reflection = db.reflections.find((r) => r.submissionId === submission.id);

    return {
      participant: {
        fullName: participant.fullName,
        email: participant.email,
        phone: participant.phone,
      },
      submission: {
        id: submission.id,
        submittedAt: submission.submittedAt || submission.createdAt,
        overallScore: submission.overallScore ?? scores.overallScore,
        overallCategory: submission.overallCategory ?? scores.overallCategory,
      },
      scores,
      answers: answersMap,
      reflection,
    };
  }

  /**
   * Saves or updates reflection for a completed submission
   */
  static async saveReflection(
    token: string,
    data: Omit<ReflectionData, "submissionId" | "createdAt" | "id">
  ): Promise<boolean> {
    const db = ensureDB();
    const tokenHash = hashResultToken(token);

    const submission = db.submissions.find(
      (s) => s.resultToken === token || s.resultTokenHash === tokenHash
    );

    if (!submission) return false;

    const existingIdx = db.reflections.findIndex(
      (r) => r.submissionId === submission.id
    );

    const now = new Date().toISOString();

    if (existingIdx >= 0) {
      db.reflections[existingIdx] = {
        ...db.reflections[existingIdx],
        ...data,
      };
    } else {
      db.reflections.push({
        id: crypto.randomUUID(),
        submissionId: submission.id,
        ...data,
        createdAt: now,
      });
    }

    saveDB(db);
    return true;
  }

  /**
   * Helper to fetch scores for an existing submission
   */
  private static async getScoresForSubmission(
    submissionId: string
  ): Promise<AssessmentCalculationResult> {
    const db = ensureDB();
    const answersMap: Record<number, number> = {};
    db.answers
      .filter((a) => a.submissionId === submissionId)
      .forEach((a) => {
        answersMap[a.itemNumber] = a.answerValue;
      });
    return calculateAssessmentScores(answersMap);
  }

  /**
   * Admin: Get high level KPI dashboard metrics
   */
  static async getDashboardStats() {
    const db = ensureDB();
    const totalParticipants = db.participants.length;
    const completedSubmissions = db.submissions.filter(
      (s) => s.status === "completed"
    );
    const incompleteSubmissions = db.submissions.filter(
      (s) => s.status === "in_progress"
    );

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const weekStart = todayStart - 7 * 24 * 3600 * 1000;

    const submittedToday = completedSubmissions.filter(
      (s) => new Date(s.submittedAt || s.createdAt).getTime() >= todayStart
    ).length;

    const submittedThisWeek = completedSubmissions.filter(
      (s) => new Date(s.submittedAt || s.createdAt).getTime() >= weekStart
    ).length;

    let totalScoreSum = 0;
    completedSubmissions.forEach((s) => {
      totalScoreSum += s.overallScore || 0;
    });

    const averageOverallScore =
      completedSubmissions.length > 0
        ? Math.round((totalScoreSum / completedSubmissions.length) * 100) / 100
        : 0;

    // Pattern frequencies
    const patternCount: Record<string, number> = {};
    completedSubmissions.forEach((s) => {
      if (s.primaryPatternCode) {
        patternCount[s.primaryPatternCode] =
          (patternCount[s.primaryPatternCode] || 0) + 1;
      }
    });

    let topPatternCode = "REACTIVE";
    let maxCount = -1;
    for (const [code, count] of Object.entries(patternCount)) {
      if (count > maxCount) {
        maxCount = count;
        topPatternCode = code;
      }
    }

    // Pattern averages
    const patternAverages: Array<{ patternName: string; average: number; code: string }> = [];
    for (const [code, pattern] of Object.entries(ASSESSMENT_PATTERNS)) {
      const prs = db.patternResults.filter((pr) => pr.patternCode === code);
      const avg =
        prs.length > 0
          ? Math.round(
              (prs.reduce((acc, curr) => acc + curr.score, 0) / prs.length) * 100
            ) / 100
          : 0;
      patternAverages.push({
        code,
        patternName: pattern.name,
        average: avg,
      });
    }

    return {
      totalParticipants,
      totalCompleted: completedSubmissions.length,
      totalIncomplete: incompleteSubmissions.length,
      submittedToday,
      submittedThisWeek,
      averageOverallScore,
      topPattern: ASSESSMENT_PATTERNS[topPatternCode as PatternCode] || ASSESSMENT_PATTERNS.REACTIVE,
      topPatternFrequency: maxCount > 0 ? maxCount : 0,
      patternAverages,
      patternDistribution: patternCount,
    };
  }

  /**
   * Admin: Filterable & Searchable participants table
   */
  static async getParticipantsList(params: {
    search?: string;
    pattern?: string;
    category?: string;
    page?: number;
    limit?: number;
  }) {
    const db = ensureDB();
    const search = params.search?.toLowerCase().trim() || "";
    const pattern = params.pattern || "";
    const category = params.category || "";
    const page = Math.max(1, params.page || 1);
    const limit = Math.max(1, params.limit || 10);

    let rows = db.submissions
      .filter((s) => s.status === "completed")
      .map((s) => {
        const p = db.participants.find((item) => item.id === s.participantId);
        return {
          submissionId: s.id,
          participantId: s.participantId,
          name: p?.fullName || "Anonim",
          email: p?.email || "-",
          phone: p?.phone || "-",
          submittedAt: s.submittedAt || s.createdAt,
          overallScore: s.overallScore || 0,
          overallCategory: s.overallCategory || "-",
          primaryPatternCode: s.primaryPatternCode || "REACTIVE",
          resultToken: s.resultToken,
        };
      });

    // Apply Filters
    if (search) {
      rows = rows.filter(
        (r) =>
          r.name.toLowerCase().includes(search) ||
          r.email.toLowerCase().includes(search) ||
          r.phone.includes(search)
      );
    }

    if (pattern && pattern !== "all") {
      rows = rows.filter((r) => r.primaryPatternCode === pattern);
    }

    if (category && category !== "all") {
      rows = rows.filter((r) => r.overallCategory === category);
    }

    // Sort descending by date
    rows.sort(
      (a, b) =>
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );

    const total = rows.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginated = rows.slice(startIndex, startIndex + limit);

    return {
      participants: paginated,
      total,
      page,
      totalPages,
    };
  }

  /**
   * Admin: Get single participant full inspection record
   */
  static async getParticipantDetail(submissionId: string) {
    const db = ensureDB();
    const submission = db.submissions.find((s) => s.id === submissionId);
    if (!submission) return null;

    const participant = db.participants.find((p) => p.id === submission.participantId);
    if (!participant) return null;

    const answersMap: Record<number, number> = {};
    db.answers
      .filter((a) => a.submissionId === submission.id)
      .forEach((a) => {
        answersMap[a.itemNumber] = a.answerValue;
      });

    const scores = calculateAssessmentScores(answersMap);
    const reflection = db.reflections.find((r) => r.submissionId === submission.id);

    return {
      submission,
      participant,
      scores,
      answers: answersMap,
      reflection,
      questions: ASSESSMENT_ITEMS,
    };
  }

  /**
   * Admin: Generate CSV export string
   */
  static async generateCSVExport(): Promise<string> {
    const db = ensureDB();
    const rows = db.submissions
      .filter((s) => s.status === "completed")
      .map((s) => {
        const p = db.participants.find((item) => item.id === s.participantId);
        return [
          `"${p?.fullName || ""}"`,
          `"${p?.email || ""}"`,
          `"${p?.phone || ""}"`,
          `"${s.submittedAt || s.createdAt}"`,
          (s.overallScore || 0).toFixed(2),
          `"${s.overallCategory || ""}"`,
          `"${s.primaryPatternCode || ""}"`,
          `"${s.resultToken}"`,
        ].join(",");
      });

    const header = [
      "Nama Lengkap",
      "Email",
      "Nomor HP/WA",
      "Tanggal Selesai",
      "Skor Rata-rata",
      "Kategori Deskriptif",
      "Pola Prioritas Utama",
      "Token Hasil",
    ].join(",");

    return [header, ...rows].join("\r\n");
  }
}
