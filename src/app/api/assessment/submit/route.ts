import { NextRequest, NextResponse } from "next/server";
import { SubmitAssessmentSchema } from "@/lib/validation/assessment.schema";
import { AssessmentRepository } from "@/lib/db/assessment-repository";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = SubmitAssessmentSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validated.error.flatten().fieldErrors,
          message: "Jawaban belum lengkap (wajib 27 pernyataan).",
        },
        { status: 400 }
      );
    }

    const { submissionId, answers } = validated.data;
    const numericAnswers: Record<number, number> = {};
    for (const [k, v] of Object.entries(answers)) {
      numericAnswers[parseInt(k, 10)] = v;
    }

    // Call authoritative scoring & persistence
    const { resultToken } = await AssessmentRepository.submitAssessment(
      submissionId,
      numericAnswers
    );

    return NextResponse.json({
      success: true,
      resultToken,
      redirectUrl: `/assessment/result/${resultToken}`,
    });
  } catch (error: any) {
    console.error("Error submitting assessment:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Gagal memproses hasil asesmen.",
      },
      { status: 500 }
    );
  }
}
