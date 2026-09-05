"use client";

import { formatValidationError } from "@/lib/registration/client-utils";

export default function ReviewModal({ isOpen, onClose, onSubmit, isSubmitting, payload, errors, submitError, uniqueStudentsCount }) {
  if (!isOpen) return null;

  const hasErrors = errors && errors.length > 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-xs transition-opacity" aria-hidden="true" onClick={onClose} style={{ pointerEvents: 'auto' }}></div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border border-gray-100" style={{ pointerEvents: 'auto' }}>
            {/* Green Header Banner */}
            <div className="bg-[#0a2112] px-6 py-4 flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2 tracking-wide" id="modal-title">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f5c518] shrink-0"></span>
                <span className="text-white">Review &amp; Submit Registration</span>
              </h3>
              <button 
                onClick={onClose} 
                disabled={isSubmitting}
                className="text-gray-300 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="bg-white px-6 pt-5 pb-6">
              {/* API submission error */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex items-start gap-3">
                  <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <h4 className="text-red-800 font-bold text-sm">Submission Failed</h4>
                    <p className="text-sm text-red-700 mt-0.5">{submitError}</p>
                  </div>
                </div>
              )}

              {hasErrors ? (
                /* Validation error list */
                <div className="bg-red-50/80 border border-red-200/90 rounded-xl overflow-hidden mb-2">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-red-200/80 bg-red-100/80">
                    <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-red-800 font-bold text-sm">
                      {errors.length} issue{errors.length !== 1 ? 's' : ''} must be fixed before submitting
                    </span>
                  </div>
                  <ul className="divide-y divide-red-100 max-h-72 overflow-y-auto">
                    {errors.map((err, idx) => (
                      <li key={idx} className="flex items-start gap-3 px-4 py-2.5">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-200 text-red-800 text-[10px] font-black flex items-center justify-center mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-sm text-red-900 leading-snug font-semibold">{formatValidationError(err)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <>
                  {/* Permanent action warning */}
                  <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <svg className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="text-sm font-bold text-amber-900">Permanent Action Warning</h4>
                        <p className="mt-1 text-sm text-amber-800 leading-relaxed">
                          Once submitted, this contingent registration will be <strong>permanently locked</strong> and cannot be edited online. For corrections after submission, you must contact IIITDM Kancheepuram Sports Cell.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200/80">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Unique Students</p>
                      <p className="text-2xl font-black text-[#1b5e20]">{uniqueStudentsCount || 0}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200/80">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Event Entries</p>
                      <p className="text-2xl font-black text-gray-900">{payload?.entries?.length || 0}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200/80 space-y-1">
                     <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Contact Details</h4>
                     <p className="text-sm text-gray-700"><strong>Name:</strong> {payload?.contactDetails?.contactName || "N/A"}</p>
                     <p className="text-sm text-gray-700"><strong>Email:</strong> {payload?.contactDetails?.contactEmail || "N/A"}</p>
                     <p className="text-sm text-gray-700"><strong>Phone:</strong> {payload?.contactDetails?.contactPhone || "N/A"}</p>
                  </div>
                </>
              )}
            </div>

            {/* Footer with Centered Buttons */}
            <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 border-t border-gray-200">
              {!hasErrors && (
                <button
                  type="button"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-2.5 bg-[#1b5e20] text-sm font-bold text-white rounded-xl hover:bg-[#144718] transition-colors shadow-xs disabled:opacity-50"
                  onClick={onSubmit}
                >
                  {isSubmitting ? "Submitting..." : "Confirm & Final Submit"}
                </button>
              )}
              <button
                type="button"
                className="w-full sm:w-auto px-8 py-2.5 bg-white border border-gray-300 rounded-xl font-bold text-sm text-gray-700 hover:bg-gray-100 transition-colors shadow-xs"
                onClick={onClose}
                disabled={isSubmitting}
              >
                {hasErrors ? "Close & Fix Issues" : "Cancel & Continue Editing"}
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}
