import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/session";
import { getAdminRegistrationsOverview } from "@/lib/admin/service";

export async function GET() {
  try {
    await requireAuth(["admin"]);
    const list = await getAdminRegistrationsOverview();
    return NextResponse.json({
      success: true,
      data: list,
    });
  } catch (error) {
    console.error("Admin registrations list error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch registrations overview" },
      { status: error.statusCode || 500 }
    );
  }
}
