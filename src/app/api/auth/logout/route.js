import { NextResponse } from "next/server";
import { destroySessionCookie } from "@/lib/auth/session";

export async function POST() {
  try {
    await destroySessionCookie();
    return NextResponse.json({
      success: true,
      message: "Successfully logged out",
    });
  } catch (error) {
    console.error("Logout API error:", error);
    return NextResponse.json(
      { error: "Internal server error during logout" },
      { status: 500 }
    );
  }
}
