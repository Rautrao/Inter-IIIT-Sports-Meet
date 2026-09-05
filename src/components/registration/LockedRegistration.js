"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LockedRegistration({ iiitCode, registrationData }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  const { registration, students, entries } = registrationData;

  const downloadCsv = () => {
    const a = document.createElement("a");
    a.href = "/api/registration/csv";
    a.download = "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-[#faf6ee] font-sans pb-20">
      <div className="bg-[#0a2112] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#c9972f] block">9th Inter-IIIT Sports Meet</span>
              <span className="font-bold text-white text-lg">{registration.iiitName}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-green-50 border-b border-green-100 px-8 py-10 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">Registration Submitted</h1>
            <p className="text-green-800 font-medium">Your contingent registration has been successfully received and locked.</p>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium text-sm">Total Unique Students</span>
                    <span className="font-black text-gray-900">{students?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium text-sm">Total Event Entries</span>
                    <span className="font-black text-gray-900">{entries?.length || 0}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="text-gray-600 font-medium text-sm">Submitted At</span>
                    <span className="font-bold text-gray-900 text-sm">
                      {registration.submittedAt ? new Date(registration.submittedAt).toLocaleString() : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium text-sm">Submitted By</span>
                    <span className="font-bold text-gray-900 text-sm">{registration.submittedBy || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Contact Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="block text-xs font-bold text-gray-500 uppercase">Faculty In-Charge</span>
                    <span className="font-bold text-gray-900 text-sm">{registration.contactName || "—"}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-500 uppercase">Email</span>
                    <span className="font-bold text-gray-900 text-sm">{registration.contactEmail || "—"}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-500 uppercase">Phone</span>
                    <span className="font-bold text-gray-900 text-sm">{registration.contactPhone || "—"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-6 border border-amber-100 mb-8 flex items-start gap-4">
              <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h4 className="font-bold text-amber-900">Registration is permanently locked</h4>
                <p className="text-amber-800 text-sm mt-1">
                  For any corrections, additions, or modifications, you must officially contact the IIITDM Kancheepuram Sports Cell.
                </p>
                <a href="mailto:sports@iiitdm.ac.in" className="inline-block mt-3 text-sm font-bold text-amber-700 hover:underline">
                  sports@iiitdm.ac.in
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={downloadCsv}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1b5e20] text-white rounded-full font-bold text-sm shadow-md hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Contingent CSV
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-gray-100 text-gray-700 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
