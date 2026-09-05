"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed. Please check your credentials.");
      }

      if (data.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/register");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#faf6ee" }}>
      {/* Left panel - branding */}
      <div
        className="hidden md:flex flex-col justify-between w-[42%] p-12 relative overflow-hidden"
        style={{ background: "#0a2112" }}
      >
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/assets/hero/hero-placeholder.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,33,18,0.7) 0%, rgba(10,33,18,0.95) 100%)",
          }}
        />

        <div className="relative z-10">
          <div className="w-14 h-14 relative">
            <Image
              src="/assets/brand/inter-iiit-logo.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="relative z-10">
          <div
            className="text-xs font-black tracking-[0.2em] uppercase mb-3"
            style={{ color: "#f5c518" }}
          >
            9th Edition
          </div>
          <h2 className="font-black text-white text-3xl leading-tight mb-4">
            Inter-IIIT
            <br />
            Sports Meet
            <br />
            2026
          </h2>
          <div
            className="w-10 h-0.5 rounded-full mb-6"
            style={{ background: "#c9972f" }}
          />
          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            19–23 December 2026
            <br />
            IIITDM Kancheepuram, India
          </p>
        </div>

        <div
          className="relative z-10 text-xs"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          © 2026 Inter-IIIT Sports Meet
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="font-black text-2xl" style={{ color: "#0a2112" }}>
              Sign In
            </h1>
            <p className="text-sm mt-1.5" style={{ color: "#777" }}>
              Access the IIIT Registration Portal or Admin Console
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium leading-relaxed">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                className="block text-xs font-black uppercase tracking-wider mb-1.5"
                style={{ color: "#444" }}
              >
                Username (IIIT Code or Admin)
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                placeholder="e.g. iiitdm-kancheepuram or admin"
                style={{
                  border: "1.5px solid rgba(27,94,32,0.2)",
                  background: "#fff",
                  color: "#0a2112",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#1b5e20";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(27,94,32,0.2)";
                }}
              />
            </div>
            <div>
              <label
                className="block text-xs font-black uppercase tracking-wider mb-1.5"
                style={{ color: "#444" }}
              >
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                placeholder="Enter password"
                style={{
                  border: "1.5px solid rgba(27,94,32,0.2)",
                  background: "#fff",
                  color: "#0a2112",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#1b5e20";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(27,94,32,0.2)";
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-black text-sm tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-md mt-2 disabled:opacity-50"
              style={{ background: "#f5c518", color: "#0a2112" }}
            >
              {loading ? "Signing In..." : "Sign In →"}
            </button>
          </form>

          <div className="mt-7 text-center text-sm" style={{ color: "#888" }}>
            <Link
              href="/"
              className="font-bold transition-colors"
              style={{ color: "#1b5e20" }}
            >
              ← Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
