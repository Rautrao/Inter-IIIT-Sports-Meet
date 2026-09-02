"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    async function checkAuthAndLoadData() {
      try {
        const authRes = await fetch("/api/auth/me");
        if (!authRes.ok) {
          router.push("/login");
          return;
        }
        
        const authData = await authRes.json();

        // Null-safe check and authorization
        if (!authData || !authData.user || authData.user.role !== "admin") {
          router.push("/login");
          return;
        }

        setCurrentUser(authData.user);

        // Fetch overview stats
        const statsRes = await fetch("/api/admin/stats");
        if (statsRes.ok) {
          const sData = await statsRes.json();
          setStats(sData.data || null);
        }
      } catch (err) {
        console.error("Failed to load admin data:", err);
      } finally {
        setLoading(false);
      }
    }

    checkAuthAndLoadData();
  }, [router]);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    }
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#faf6ee" }}>
        <div className="text-sm font-bold" style={{ color: "#0a2112" }}>
          Loading Admin Control Center...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16" style={{ background: "#faf6ee" }}>
      {/* Header */}
      <header className="border-b" style={{ background: "#0a2112", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded text-xs font-black uppercase tracking-wider" style={{ background: "#f5c518", color: "#0a2112" }}>
              Admin
            </span>
            <h1 className="text-white text-base font-black tracking-wide">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-gray-300">
              Logged in as <strong className="text-white">{currentUser?.username}</strong>
            </span>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="text-xs font-bold px-3 py-1.5 rounded-lg border border-red-500/40 text-red-300 hover:bg-red-500/10 transition-colors disabled:opacity-50"
            >
              {isLoggingOut ? "Logging out..." : "Sign Out"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* KPI Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500">Submitted IIITs</div>
              <div className="text-3xl font-black mt-2" style={{ color: "#1b5e20" }}>
                {stats.submittedIIITs} / {stats.totalIIITs}
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500">Unique Students</div>
              <div className="text-3xl font-black mt-2" style={{ color: "#0a2112" }}>
                {stats.totalStudents}
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Event Entries</div>
              <div className="text-3xl font-black mt-2" style={{ color: "#c9972f" }}>
                {stats.totalEventEntries}
              </div>
            </div>
          </div>
        )}

        {/* Initial Data Area */}
        <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs p-16 text-center">
          <p className="text-gray-500 font-medium">Registration data will appear here.</p>
        </div>
      </main>
    </div>
  );
}
