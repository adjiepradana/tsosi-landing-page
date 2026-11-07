import { z } from "zod";

export const ParticipantInfoSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Nama lengkap harus diisi minimal 2 karakter")
    .max(100, "Nama lengkap maksimal 100 karakter"),
  email: z
    .string()
    .trim()
    .email("Format alamat email tidak valid")
    .max(120, "Alamat email terlalu panjang"),
  phone: z
    .string()
    .trim()
    .regex(
      /^(\+62|62|0)8[0-9]{7,12}$/,
      "Nomor WhatsApp/HP tidak valid (contoh: 08123456789 atau +628123456789)"
    ),
  consent: z.literal(true, {
    errorMap: () => ({
      message: "Anda harus menyetujui pemrosesan data untuk melanjutkan asesmen",
    }),
  }),
});

export const SaveAnswersSchema = z.object({
  submissionId: z.string().uuid("ID asesmen tidak valid"),
  answers: z.record(
    z.string().regex(/^[1-9]|1[0-9]|2[0-7]$/),
    z.number().int().min(1).max(5)
  ),
  currentStep: z.number().int().min(1).max(27).optional(),
});

export const SubmitAssessmentSchema = z.object({
  submissionId: z.string().uuid("ID asesmen tidak valid"),
  answers: z
    .record(
      z.string().regex(/^[1-9]|1[0-9]|2[0-7]$/),
      z.number().int().min(1).max(5)
    )
    .refine((val) => Object.keys(val).length === 27, {
      message: "Seluruh 27 pernyataan harus dijawab sebelum menyelesaikan asesmen",
    }),
});

export const SaveReflectionSchema = z.object({
  token: z.string().min(10, "Token hasil tidak valid"),
  patternCode: z.string().optional(),
  triggerSituation: z.string().trim().min(3, "Situasi pemicu harus diisi"),
  automaticThoughts: z.string().trim().min(3, "Pikiran otomatis harus diisi"),
  emotions: z.string().trim().min(2, "Emosi/sensasi tubuh harus diisi"),
  responseTaken: z.string().trim().min(3, "Respons yang biasanya diambil harus diisi"),
  alternativeResponse: z.string().trim().min(3, "Respons sadar alternatif harus diisi"),
  notes: z.string().optional(),
});

export const AdminLoginSchema = z.object({
  email: z.string().trim().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export type ParticipantInfoInput = z.infer<typeof ParticipantInfoSchema>;
export type SaveAnswersInput = z.infer<typeof SaveAnswersSchema>;
export type SubmitAssessmentInput = z.infer<typeof SubmitAssessmentSchema>;
export type SaveReflectionInput = z.infer<typeof SaveReflectionSchema>;
export type AdminLoginInput = z.infer<typeof AdminLoginSchema>;
