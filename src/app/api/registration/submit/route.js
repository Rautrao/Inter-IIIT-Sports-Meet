import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/session";
import { submitRegistration } from "@/lib/registration/service";

export async function POST(request) {
  try {
    // Only logged-in IIIT users can submit registration
    const session = await requireAuth(["iiit"]);

    if (!session.iiitCode) {
      return NextResponse.json(
        { error: "No IIIT code linked to this session" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const result = await submitRegistration(
      session.iiitCode,
      body,
      session.username
    );

    return NextResponse.json({
      success: true,
      message: "Registration submitted and locked successfully",
      data: result,
    });
  } catch (error) {
    console.error("Submit registration error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to submit registration",
        details: error.details || undefined,
      },
      { status: error.statusCode || 500 }
    );
  }
}
