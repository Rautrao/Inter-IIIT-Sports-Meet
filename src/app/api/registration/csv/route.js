import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/session";
import { generateIIITRegistrationCSV } from "@/lib/csv/generator";
import { getRegistrationForIIIT } from "@/lib/registration/service";

export async function GET() {
  try {
    const session = await requireAuth(["iiit"]);

    if (!session.iiitCode) {
      return NextResponse.json(
        { error: "No IIIT code linked to session" },
        { status: 400 }
      );
    }

    const regData = await getRegistrationForIIIT(session.iiitCode);
    if (!regData.submitted) {
      return NextResponse.json(
        {
          error:
            "No submitted registration found for this IIIT. Please submit registration before downloading CSV.",
        },
        { status: 400 }
      );
    }

    const csvContent = await generateIIITRegistrationCSV(session.iiitCode);
    const filename = `${session.iiitCode}_inter_iiit_registration_2026.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("IIIT CSV export error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate CSV export" },
      { status: error.statusCode || 500 }
    );
  }
}
