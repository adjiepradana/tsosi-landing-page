import { NextRequest, NextResponse } from "next/server";
import { ParticipantInfoSchema } from "@/lib/validation/assessment.schema";
import { AssessmentRepository } from "@/lib/db/assessment-repository";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = ParticipantInfoSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validated.error.flatten().fieldErrors,
          message: "Data peserta tidak valid.",
        },
        { status: 400 }
      );
    }

    const { submissionId, resultToken } =
      await AssessmentRepository.startSubmission(validated.data);

    return NextResponse.json({
      success: true,
      submissionId,
      resultToken,
      redirectUrl: `/assessment/instructions?sid=${submissionId}`,
    });
  } catch (error: any) {
    console.error("Error starting assessment:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Gagal memulai sesi asesmen. Silakan coba kembali.",
      },
      { status: 500 }
    );
  }
}
