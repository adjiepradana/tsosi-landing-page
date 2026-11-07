// Assessment Types for Personal Soul Blueprint™
// The Soul of Speaking Indonesia

export type PatternCode =
  | 'REACTIVE'
  | 'ASSUMPTION'
  | 'DEFENSIVE'
  | 'AVOIDANCE'
  | 'PEOPLE_PLEASING'
  | 'CONTROL'
  | 'JUDGMENT'
  | 'LISTENING_GAP'
  | 'ESCALATION';

export type InterpretationLevel = 'RENDAH' | 'SEDANG' | 'TINGGI';

export type RatingCategory =
  | 'Hampir tidak pernah'
  | 'Jarang dilaporkan'
  | 'Kadang-kadang muncul'
  | 'Sering muncul'
  | 'Sangat sering muncul';

export interface AssessmentPattern {
  code: PatternCode;
  name: string;
  indonesianTitle: string;
  definition: string;
  description: string;
  actionAdvice: string;
  sortOrder: number;
  itemNumbers: number[]; // 3 items per pattern
  sampleTrigger?: string;
  impactNote?: string;
}

export interface AssessmentItem {
  itemNumber: number;
  questionCode: string;
  questionText: string;
  patternCode: PatternCode;
  sortOrder: number;
}

export interface AnswerItem {
  itemNumber: number;
  questionCode: string;
  answerValue: number; // 1 to 5
}

export interface PatternScoreResult {
  patternCode: PatternCode;
  patternName: string;
  indonesianTitle: string;
  score: number; // Average of 3 items (e.g. 2.67)
  category: RatingCategory;
  categoryRangeDescription: string;
  level: InterpretationLevel;
  interpretationText: string;
  actionAdvice: string;
  rank: number;
  isPriority: boolean; // Top priority patterns needing attention
}

export interface AssessmentCalculationResult {
  overallScore: number;
  overallCategory: RatingCategory;
  overallCategoryDescription: string;
  patternResults: PatternScoreResult[];
  priorityPatterns: PatternScoreResult[];
  strengthPatterns: PatternScoreResult[]; // Patterns with low scores (natural strengths)
  calculatedAt: string;
}

export interface ParticipantInfo {
  fullName: string;
  email: string;
  phone: string;
  consent: boolean;
}

export interface SubmissionData {
  id: string;
  participantId: string;
  participantName: string;
  participantEmail: string;
  participantPhone: string;
  status: 'in_progress' | 'completed' | 'abandoned';
  currentStep: number;
  startedAt: string;
  submittedAt?: string;
  resultToken: string;
  overallScore?: number;
  overallCategory?: string;
  primaryPatternCode?: string;
  answers: Record<number, number>; // itemNumber -> value
  patternResults?: PatternScoreResult[];
  reflection?: ReflectionData;
}

export interface ReflectionData {
  id?: string;
  submissionId: string;
  patternCode?: string;
  triggerSituation: string;
  automaticThoughts: string;
  emotions: string;
  responseTaken: string;
  alternativeResponse: string;
  notes?: string;
  createdAt?: string;
}
