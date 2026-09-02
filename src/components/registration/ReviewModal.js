"use client";

/**
 * Converts raw validation error strings into clean, human-readable messages.
 * Business-rule errors from rules.js are already well-formed.
 * Schema errors from Zod (e.g. "contactDetails.contactEmail: Invalid email") are cleaned up.
 */
function formatError(raw) {
  // Zod schema path prefix cleanup
  const schemaMap = {
    "contactDetails.contactName:": "Contact Form — Name:",
    "contactDetails.contactEmail:": "Contact Form — Email:",
    "contactDetails.contactPhone:": "Contact Form — Phone:",
    "students.": "Student roster —",
    "entries.": "Event entry —",
  };
  for (const [prefix, label] of Object.entries(schemaMap)) {
    if (raw.startsWith(prefix)) {
      return label + " " + raw.slice(prefix.length).trim();
    }
  }
  return raw;
}

export default function ReviewModal({ isOpen, onClose, onSubmit, isSubmitting, payload, errors, submitError, uniqueStudentsCount }) {
  if (!isOpen) return null;

  const hasErrors = errors && errors.length > 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose} style={{ pointerEvents: 'auto' }}></div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full" style={{ pointerEvents: 'auto' }}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-xl leading-6 font-black text-gray-900" id="modal-title">
                  Review &amp; Submit Registration
                </h3>
                <div className="mt-4">
                  {/* API submission error */}
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start gap-3">
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
                    <div className="bg-red-50 border border-red-200 rounded-xl overflow-hidden mb-2">
                      <div className="flex items-center gap-2 px-4 py-3 border-b border-red-200 bg-red-100">
                        <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-red-800 font-bold text-sm">
                          {errors.length} issue{errors.length !== 1 ? 's' : ''} must be fixed before submitting
                        </span>
                      </div>
                      <ul className="divide-y divide-red-100 max-h-64 overflow-y-auto">
                        {errors.map((err, idx) => (
                          <li key={idx} className="flex items-start gap-3 px-4 py-2.5">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-200 text-red-700 text-[10px] font-black flex items-center justify-center mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="text-sm text-red-800 leading-snug">{formatError(err)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <>
                      {/* Permanent action warning */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-bold text-blue-800">Permanent Action Warning</h3>
                            <div className="mt-2 text-sm text-blue-700">
                              <p>Once submitted, this registration will be <strong>permanently locked</strong> and cannot be edited. For corrections after submission, you must contact IIITDM Kancheepuram Sports Cell.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Unique Students</p>
                          <p className="text-2xl font-black text-gray-900">{uniqueStudentsCount || 0}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Event Entries</p>
                          <p className="text-2xl font-black text-gray-900">{payload?.entries?.length || 0}</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                         <h4 className="text-sm font-bold text-gray-900 mb-2">Contact Details</h4>
                         <p className="text-sm text-gray-700"><strong>Name:</strong> {payload?.contactDetails?.contactName || "N/A"}</p>
                         <p className="text-sm text-gray-700"><strong>Email:</strong> {payload?.contactDetails?.contactEmail || "N/A"}</p>
                         <p className="text-sm text-gray-700"><strong>Phone:</strong> {payload?.contactDetails?.contactPhone || "N/A"}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200">
            {!hasErrors && (
              <button
                type="button"
                disabled={isSubmitting}
                className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-green-700 text-base font-medium text-white hover:bg-green-800 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                onClick={onSubmit}
              >
                {isSubmitting ? "Submitting..." : "Confirm & Final Submit"}
              </button>
            )}
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
