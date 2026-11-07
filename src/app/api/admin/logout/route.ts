import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("tsosi_admin_session");

  return NextResponse.json({
    success: true,
    redirectUrl: "/admin/login",
  });
}
