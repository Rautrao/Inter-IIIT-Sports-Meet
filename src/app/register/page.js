"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import RegistrationHeader from "@/components/registration/RegistrationHeader";
import ContactForm from "@/components/registration/ContactForm";
import SportSection from "@/components/registration/SportSection";
import ReviewModal from "@/components/registration/ReviewModal";
import LockedRegistration from "@/components/registration/LockedRegistration";
import { getAllSportsList } from "@/lib/sports/config";
import { getLiveValidationErrors, getStudentRegistry, formatValidationError } from "@/lib/registration/client-utils";

export default function RegisterPage() {
  const router = useRouter();
  
  // Auth & API state
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [lockedRegistrationData, setLockedRegistrationData] = useState(null);
  
  // Form State
  const [contactDetails, setContactDetails] = useState({
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    notes: ""
  });
  const [slotsMap, setSlotsMap] = useState({});
  const [lastSaved, setLastSaved] = useState(null);
  
  // UI State
  const [activeTab, setActiveTab] = useState("M");
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isErrorsOpen, setIsErrorsOpen] = useState(false);
  const [hasAttemptedReview, setHasAttemptedReview] = useState(false);
  const errorsPopupRef = useRef(null);

  // Initialize and check auth/registration status
  useEffect(() => {
    const init = async () => {
      try {
        const authRes = await fetch("/api/auth/me");
        if (!authRes.ok) {
          router.push("/login");
          return;
        }
        const authData = await authRes.json();
        if (!authData || !authData.user) {
          router.push("/login");
          return;
        }
        if (authData.user.role === "admin") {
          router.push("/admin");
          return;
        }
        setUser(authData.user);

        const regRes = await fetch("/api/registration");
        if (regRes.ok) {
          const regData = await regRes.json();
          if (regData.data && regData.data.submitted) {
            setLockedRegistrationData(regData.data);
            setLoading(false);
            return;
          }
        }
        
        // Not submitted → load draft from localStorage
        const draftKey = `inter_iiit_registration_${authData.user.username}`;
        const saved = localStorage.getItem(draftKey);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (parsed.contactDetails) setContactDetails(parsed.contactDetails);
            if (parsed.slotsMap) setSlotsMap(parsed.slotsMap);
          } catch (e) {
            console.error("Failed to parse local draft", e);
          }
        }
        setLoading(false);
      } catch (err) {
        console.error("Initialization error:", err);
        router.push("/login");
      }
    };
    init();
  }, [router]);

  // Auto-save to localStorage
  useEffect(() => {
    if (loading || lockedRegistrationData || !user) return;
    
    const draftKey = `inter_iiit_registration_${user.username}`;
    const timer = setTimeout(() => {
      localStorage.setItem(draftKey, JSON.stringify({ contactDetails, slotsMap }));
      setLastSaved(new Date());
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [contactDetails, slotsMap, loading, lockedRegistrationData, user]);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout error:", e);
    }
    // Do NOT clear localStorage — draft must survive logout/login cycle
    router.push("/login");
  };

  const handleSlotChange = useCallback((key, newSlotData) => {
    setSlotsMap(prev => ({
      ...prev,
      [key]: newSlotData
    }));
  }, []);

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      const { payload, isValid, errors } = getLiveValidationErrors(contactDetails, slotsMap);
      
      if (!isValid) {
        setSubmitError("Please fix validation errors before submitting.");
        setIsSubmitting(false);
        return;
      }

      const res = await fetch("/api/registration/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json().catch(() => null);
      
      if (!res.ok) {
        throw new Error((data && data.error) ? data.error : `Submission failed with status ${res.status}`);
      }
      
      // Success — clear local draft and reload to show locked state
      localStorage.removeItem(`inter_iiit_registration_${user.username}`);
      window.location.reload();
      
    } catch (err) {
      setSubmitError(err.message || "An unexpected error occurred during submission.");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf6ee] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800"></div>
      </div>
    );
  }

  // If locked, show the readonly locked view
  if (lockedRegistrationData) {
    return <LockedRegistration iiitCode={user.username} registrationData={lockedRegistrationData} />;
  }

  // Compute live validation state for the form UI
  let isValid = false;
  let errors = [];
  let totalUniqueStudents = 0;
  let payload = null;
  try {
    const result = getLiveValidationErrors(contactDetails, slotsMap);
    isValid = result.isValid;
    errors = result.errors;
    totalUniqueStudents = result.totalUniqueStudents;
    payload = result.payload;
  } catch (e) {
    console.error("Render-time validation error:", e);
    errors = ["Internal validation error — please refresh the page."];
  }

  const studentRegistry = getStudentRegistry(slotsMap);

  return (
    <div className="min-h-screen bg-[#faf6ee] font-sans pb-32">
      <RegistrationHeader 
        iiitName={user.iiitName || user.username} 
        uniqueStudentsCount={totalUniqueStudents} 
        lastSaved={lastSaved}
        onLogout={handleLogout}
        isLoggingOut={isLoggingOut}
      />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <ContactForm 
          contactDetails={contactDetails} 
          onChange={setContactDetails} 
        />
        
        {(() => {
          let mCount = 0;
          let fCount = 0;
          let mixedCount = 0;
          for (const [k, v] of Object.entries(slotsMap)) {
            if (v?.rollNumber?.trim()) {
              if (k.includes("|M|")) mCount++;
              else if (k.includes("|F|")) fCount++;
              else if (k.includes("|mixed|")) mixedCount++;
            }
          }

          return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 p-2 mb-6 flex flex-wrap sm:flex-nowrap gap-2">
              <button 
                onClick={() => setActiveTab("M")}
                className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  activeTab === "M" 
                    ? "bg-[#1b5e20] text-white shadow-sm" 
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>Men&apos;s Events</span>
                {mCount > 0 && (
                  <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${activeTab === "M" ? "bg-white/20 text-white" : "bg-green-100 text-green-800"}`}>
                    {mCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setActiveTab("F")}
                className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  activeTab === "F" 
                    ? "bg-[#1b5e20] text-white shadow-sm" 
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>Women&apos;s Events</span>
                {fCount > 0 && (
                  <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${activeTab === "F" ? "bg-white/20 text-white" : "bg-green-100 text-green-800"}`}>
                    {fCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setActiveTab("mixed")}
                className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  activeTab === "mixed" 
                    ? "bg-[#1b5e20] text-white shadow-sm" 
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>Combined Events</span>
                {mixedCount > 0 && (
                  <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${activeTab === "mixed" ? "bg-white/20 text-white" : "bg-green-100 text-green-800"}`}>
                    {mixedCount}
                  </span>
                )}
              </button>
            </div>
          );
        })()}
        
        {/* Render sports for the active tab */}
        <div className="space-y-4">
          {getAllSportsList().map(sport => (
            <SportSection
              key={sport.id}
              sportConfig={sport}
              gender={activeTab}
              slotsMap={slotsMap}
              onChangeSlot={handleSlotChange}
              studentRegistry={studentRegistry}
            />
          ))}
        </div>
      </main>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            {submitError && (
              <div className="text-red-600 text-sm font-bold bg-red-50 px-3 py-1.5 rounded inline-flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                {submitError}
              </div>
            )}
            {hasAttemptedReview && !isValid && !submitError && (
              <div className="relative inline-block" ref={errorsPopupRef}>
                {/* Click-outside handler overlay */}
                {isErrorsOpen && (
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsErrorsOpen(false)}
                  />
                )}

                {/* Popup */}
                {isErrorsOpen && (
                  <div className="absolute bottom-full left-0 mb-2 w-80 sm:w-[440px] z-50">
                    <div className="bg-white rounded-2xl shadow-2xl border border-red-200/90 overflow-hidden">
                      <div className="bg-[#0a2112] px-4 py-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                          <span className="font-black text-white text-xs uppercase tracking-wider">
                            {errors.length} {errors.length === 1 ? 'Issue' : 'Issues'} to Fix
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Live Check</span>
                      </div>
                      <div className="p-2.5 space-y-1.5 bg-gray-50/50">
                        {errors.map((err, idx) => (
                          <div key={idx} className="px-3 py-2 rounded-xl bg-white border border-red-100/90 flex items-center gap-2.5 text-xs text-red-900 shadow-2xs">
                            <span className="shrink-0 w-4.5 h-4.5 rounded-full bg-red-100 text-red-700 text-[10px] font-black flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span className="font-semibold truncate flex-1 min-w-0" title={formatValidationError(err)}>
                              {formatValidationError(err)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Multi-segment Pill Trigger */}
                <div
                  onClick={() => setIsErrorsOpen(prev => !prev)}
                  className={`cursor-pointer bg-red-50/90 hover:bg-red-100/90 border rounded-full p-1.5 pr-4 flex items-center gap-2.5 shadow-xs transition-all duration-200 ${
                    isErrorsOpen ? 'border-red-300 bg-red-100/90' : 'border-red-200/90'
                  }`}
                >
                  <div className="bg-red-600 text-white font-black text-xs px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    <span>{errors.length} {errors.length === 1 ? 'Issue' : 'Issues'}</span>
                  </div>
                  <span className="text-xs font-bold text-red-900 tracking-wide hidden sm:inline">Action Required</span>
                  <span className="text-[11px] font-semibold text-red-700 bg-white/90 border border-red-200/80 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs transition-all">
                    <span>View details</span>
                    <svg
                      className={`w-3 h-3 text-red-500 transition-transform ${
                        isErrorsOpen ? 'rotate-180' : ''
                      }`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            )}
            {hasAttemptedReview && isValid && !submitError && (
              <div className="text-green-700 text-sm font-bold bg-green-50 px-3 py-1.5 rounded inline-flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                All validation rules passed
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button 
              onClick={() => {
                setHasAttemptedReview(true);
                setIsReviewOpen(true);
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#f5c518] text-[#0a2112] font-black rounded-xl shadow hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wide"
            >
              Review &amp; Submit
            </button>
          </div>
        </div>
      </div>

      <ReviewModal 
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onSubmit={handleFinalSubmit}
        isSubmitting={isSubmitting}
        payload={payload}
        errors={errors}
        submitError={submitError}
        uniqueStudentsCount={totalUniqueStudents}
      />
    </div>
  );
}
