import { NextRequest, NextResponse } from "next/server";
import { AdminLoginSchema } from "@/lib/validation/assessment.schema";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = AdminLoginSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Email atau password tidak valid.",
        },
        { status: 400 }
      );
    }

    const { email, password } = validated.data;
    const adminEmail = process.env.ADMIN_DEFAULT_EMAIL || "admin@thesoulofspeaking.id";
    const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || "SoulSpeaking2026!";

    // Verify credentials
    if (
      email.toLowerCase() !== adminEmail.toLowerCase() ||
      password !== adminPassword
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Email atau password admin salah.",
        },
        { status: 401 }
      );
    }

    // Set secure httpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set("tsosi_admin_session", "authenticated_admin_user", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600 * 24, // 24 hours
      path: "/",
    });

    return NextResponse.json({
      success: true,
      redirectUrl: "/admin",
    });
  } catch (error: any) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal server." },
      { status: 500 }
    );
  }
}
