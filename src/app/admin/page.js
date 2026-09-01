"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'entries'

  // Overview data
  const [registrations, setRegistrations] = useState([]);
  const [stats, setStats] = useState(null);

  // Entries search filters & data
  const [entriesData, setEntriesData] = useState({ rows: [], total: 0, page: 1, totalPages: 1 });
  const [filters, setFilters] = useState({
    iiit: "",
    sport: "",
    event: "",
    gender: "",
    rollNumber: "",
    name: "",
  });
  const [entriesLoading, setEntriesLoading] = useState(false);

  useEffect(() => {
    async function checkAuthAndLoadData() {
      try {
        const authRes = await fetch("/api/auth/me");
        const authData = await authRes.json();

        if (!authData.authenticated || authData.user?.role !== "admin") {
          router.push("/login");
          return;
        }

        setCurrentUser(authData.user);

        // Fetch overview data
        const [regsRes, statsRes] = await Promise.all([
          fetch("/api/admin/registrations"),
          fetch("/api/admin/stats"),
        ]);

        if (regsRes.ok) {
          const rData = await regsRes.json();
          setRegistrations(rData.data || []);
        }

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

  const loadEntries = async (page = 1) => {
    setEntriesLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("limit", "25");
      if (filters.iiit) params.set("iiit", filters.iiit);
      if (filters.sport) params.set("sport", filters.sport);
      if (filters.event) params.set("event", filters.event);
      if (filters.gender) params.set("gender", filters.gender);
      if (filters.rollNumber) params.set("rollNumber", filters.rollNumber);
      if (filters.name) params.set("name", filters.name);

      const res = await fetch(`/api/admin/entries?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setEntriesData(data.data);
      }
    } catch (err) {
      console.error("Failed to filter entries:", err);
    } finally {
      setEntriesLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadEntries(1);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const downloadMasterCsv = () => {
    const params = new URLSearchParams();
    if (filters.iiit) params.set("iiit", filters.iiit);
    if (filters.sport) params.set("sport", filters.sport);
    if (filters.event) params.set("event", filters.event);
    if (filters.gender) params.set("gender", filters.gender);
    const downloadUrl = `/api/admin/csv?${params.toString()}`;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
              9th Inter-IIIT Sports Meet 2026 — Master Console
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-gray-300">
              Logged in as <strong className="text-white">{currentUser?.username}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="text-xs font-bold px-3 py-1.5 rounded-lg border border-red-500/40 text-red-300 hover:bg-red-500/10 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* KPI Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500">Submitted IIITs</div>
              <div className="text-3xl font-black mt-2" style={{ color: "#1b5e20" }}>
                {stats.submittedIIITs} / {stats.totalIIITs}
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Athletes</div>
              <div className="text-3xl font-black mt-2" style={{ color: "#0a2112" }}>
                {stats.totalStudents}
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500">Men Athletes</div>
              <div className="text-3xl font-black mt-2" style={{ color: "#2e7d32" }}>
                {stats.genderBreakdown.M}
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500">Women Athletes</div>
              <div className="text-3xl font-black mt-2" style={{ color: "#c9972f" }}>
                {stats.genderBreakdown.F}
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation & CSV Action */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-gray-200 pb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-colors ${
                activeTab === "overview"
                  ? "bg-[#1b5e20] text-white shadow-xs"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              IIIT Contingents ({registrations.length})
            </button>
            <button
              onClick={() => {
                setActiveTab("entries");
                if (entriesData.rows.length === 0) loadEntries(1);
              }}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-colors ${
                activeTab === "entries"
                  ? "bg-[#1b5e20] text-white shadow-xs"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Search & Filter Entries
            </button>
          </div>

          <button
            onClick={downloadMasterCsv}
            className="px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-xs hover:-translate-y-0.5"
            style={{ background: "#f5c518", color: "#0a2112" }}
          >
            Export Master CSV ↓
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/80 text-xs font-black text-gray-600 uppercase tracking-wider">
                    <th className="px-6 py-3.5">IIIT Name</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5">Athletes</th>
                    <th className="px-6 py-3.5">Contact Person</th>
                    <th className="px-6 py-3.5">Contact Email</th>
                    <th className="px-6 py-3.5">Submitted At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {registrations.map((reg, idx) => (
                    <tr key={reg.iiitCode || idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900">{reg.iiitName}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                            reg.isSubmitted || reg.id
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {reg.isSubmitted || reg.id ? "Submitted (Locked)" : "Not Submitted"}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {reg.totalStudentsCount || 0}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{reg.contactName || "—"}</td>
                      <td className="px-6 py-4 text-gray-600">{reg.contactEmail || "—"}</td>
                      <td className="px-6 py-4 text-xs text-gray-500">
                        {reg.submittedAt ? new Date(reg.submittedAt).toLocaleDateString() : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Filter Entries */}
        {activeTab === "entries" && (
          <div className="space-y-6">
            {/* Filter Form */}
            <form onSubmit={handleSearchSubmit} className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-gray-500 mb-1">IIIT</label>
                  <input
                    type="text"
                    value={filters.iiit}
                    onChange={(e) => setFilters({ ...filters, iiit: e.target.value })}
                    placeholder="e.g. Kancheepuram"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 outline-none focus:border-[#1b5e20]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-gray-500 mb-1">Sport</label>
                  <input
                    type="text"
                    value={filters.sport}
                    onChange={(e) => setFilters({ ...filters, sport: e.target.value })}
                    placeholder="e.g. athletics"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 outline-none focus:border-[#1b5e20]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-gray-500 mb-1">Event</label>
                  <input
                    type="text"
                    value={filters.event}
                    onChange={(e) => setFilters({ ...filters, event: e.target.value })}
                    placeholder="e.g. 100m"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 outline-none focus:border-[#1b5e20]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-gray-500 mb-1">Gender</label>
                  <select
                    value={filters.gender}
                    onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 outline-none focus:border-[#1b5e20] bg-white"
                  >
                    <option value="">All</option>
                    <option value="M">Men (M)</option>
                    <option value="F">Women (F)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-gray-500 mb-1">Roll Number</label>
                  <input
                    type="text"
                    value={filters.rollNumber}
                    onChange={(e) => setFilters({ ...filters, rollNumber: e.target.value })}
                    placeholder="Search roll..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 outline-none focus:border-[#1b5e20]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-gray-500 mb-1">Student Name</label>
                  <input
                    type="text"
                    value={filters.name}
                    onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                    placeholder="Search name..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 outline-none focus:border-[#1b5e20]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    const empty = { iiit: "", sport: "", event: "", gender: "", rollNumber: "", name: "" };
                    setFilters(empty);
                    loadEntries(1);
                  }}
                  className="px-4 py-2 rounded-lg text-xs font-bold border border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={entriesLoading}
                  className="px-5 py-2 rounded-lg text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-green-800"
                  style={{ background: "#1b5e20" }}
                >
                  {entriesLoading ? "Searching..." : "Apply Filters"}
                </button>
              </div>
            </form>

            {/* Entries Table */}
            <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs">
              <div className="p-4 border-b border-gray-200 bg-gray-50/80 flex justify-between items-center text-xs text-gray-600">
                <span className="font-bold">Matching Entries: {entriesData.total}</span>
                <span>Page {entriesData.page} of {entriesData.totalPages}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/50 text-[11px] font-black text-gray-500 uppercase tracking-wider">
                      <th className="px-4 py-3">IIIT Name</th>
                      <th className="px-4 py-3">Roll Number</th>
                      <th className="px-4 py-3">Student Name</th>
                      <th className="px-4 py-3">Gender</th>
                      <th className="px-4 py-3">Sport</th>
                      <th className="px-4 py-3">Event</th>
                      <th className="px-4 py-3">Slot Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {entriesData.rows.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-gray-400">
                          {entriesLoading ? "Searching database..." : "No submitted entries found matching criteria."}
                        </td>
                      </tr>
                    ) : (
                      entriesData.rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50/50">
                          <td className="px-4 py-3 font-semibold text-gray-900">{row.iiitName}</td>
                          <td className="px-4 py-3 font-mono text-gray-700">{row.rollNumber}</td>
                          <td className="px-4 py-3 font-bold text-gray-900">{row.studentName}</td>
                          <td className="px-4 py-3 text-gray-600">{row.studentGender}</td>
                          <td className="px-4 py-3 capitalize text-gray-800">{row.sportId}</td>
                          <td className="px-4 py-3 text-gray-800">{row.eventId}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                              row.isReserve ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
                            }`}>
                              {row.isReserve ? "Reserve" : "Main"}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {entriesData.totalPages > 1 && (
                <div className="p-4 border-t border-gray-200 flex justify-between items-center text-xs">
                  <button
                    disabled={entriesData.page <= 1}
                    onClick={() => loadEntries(entriesData.page - 1)}
                    className="px-3 py-1.5 rounded border border-gray-300 disabled:opacity-40"
                  >
                    ← Previous
                  </button>
                  <span>Page {entriesData.page} of {entriesData.totalPages}</span>
                  <button
                    disabled={entriesData.page >= entriesData.totalPages}
                    onClick={() => loadEntries(entriesData.page + 1)}
                    className="px-3 py-1.5 rounded border border-gray-300 disabled:opacity-40"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
