"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import RegistrationHeader from "@/components/registration/RegistrationHeader";
import ContactForm from "@/components/registration/ContactForm";
import SportSection from "@/components/registration/SportSection";
import ReviewModal from "@/components/registration/ReviewModal";
import LockedRegistration from "@/components/registration/LockedRegistration";
import { getAllSportsList } from "@/lib/sports/config";
import { getLiveValidationErrors, getStudentRegistry } from "@/lib/registration/client-utils";

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
      />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <ContactForm 
          contactDetails={contactDetails} 
          onChange={setContactDetails} 
        />
        
        {/* Navigation Tabs for Gender Sections */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-6 flex flex-wrap sm:flex-nowrap gap-2">
          <button 
            onClick={() => setActiveTab("M")}
            className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-colors ${activeTab === "M" ? "bg-[#1b5e20] text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
          >
            Men&apos;s Events
          </button>
          <button 
            onClick={() => setActiveTab("F")}
            className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-colors ${activeTab === "F" ? "bg-[#1b5e20] text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
          >
            Women&apos;s Events
          </button>
          <button 
            onClick={() => setActiveTab("mixed")}
            className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-colors ${activeTab === "mixed" ? "bg-[#1b5e20] text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
          >
            Combined Events
          </button>
        </div>
        
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
          <div className="flex-1">
            {submitError && <div className="text-red-600 text-sm font-bold bg-red-50 px-3 py-1.5 rounded inline-block">{submitError}</div>}
            {!isValid && !submitError && <div className="text-red-600 text-sm font-bold bg-red-50 px-3 py-1.5 rounded inline-block">{errors.length} Issue(s) found. See review modal.</div>}
            {isValid && !submitError && <div className="text-green-700 text-sm font-bold bg-green-50 px-3 py-1.5 rounded inline-block">All validation rules passed</div>}
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button 
              onClick={() => setIsReviewOpen(true)}
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
