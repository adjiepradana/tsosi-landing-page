import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AssessmentRepository } from "@/lib/db/assessment-repository";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("tsosi_admin_session");

  if (!session || session.value !== "authenticated_admin_user") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const csv = await AssessmentRepository.generateCSVExport();

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="TSOSI_Personal_Soul_Blueprint_Export_${Date.now()}.csv"`,
    },
  });
}
