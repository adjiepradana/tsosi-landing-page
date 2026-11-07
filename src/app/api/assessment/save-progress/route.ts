import { NextRequest, NextResponse } from "next/server";
import { SaveAnswersSchema } from "@/lib/validation/assessment.schema";
import { AssessmentRepository } from "@/lib/db/assessment-repository";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = SaveAnswersSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validated.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { submissionId, answers, currentStep } = validated.data;
    const numericAnswers: Record<number, number> = {};
    for (const [k, v] of Object.entries(answers)) {
      numericAnswers[parseInt(k, 10)] = v;
    }

    await AssessmentRepository.saveProgress(
      submissionId,
      numericAnswers,
      currentStep
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error saving progress:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Gagal menyimpan progres." },
      { status: 500 }
    );
  }
}
