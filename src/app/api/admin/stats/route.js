import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/session";
import { getAdminStats } from "@/lib/admin/service";

export async function GET() {
  try {
    await requireAuth(["admin"]);
    const stats = await getAdminStats();
    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch admin stats" },
      { status: error.statusCode || 500 }
    );
  }
}
