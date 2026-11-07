import { NextRequest, NextResponse } from "next/server";
import { SaveReflectionSchema } from "@/lib/validation/assessment.schema";
import { AssessmentRepository } from "@/lib/db/assessment-repository";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = SaveReflectionSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validated.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { token, ...reflectionData } = validated.data;
    const ok = await AssessmentRepository.saveReflection(token, reflectionData);

    if (!ok) {
      return NextResponse.json(
        { success: false, message: "Sesi asesmen tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Refleksi diri berhasil disimpan.",
    });
  } catch (error: any) {
    console.error("Error saving reflection:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Gagal menyimpan refleksi." },
      { status: 500 }
    );
  }
}
