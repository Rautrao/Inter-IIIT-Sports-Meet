"use client";

export default function ContactForm({ contactDetails, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...contactDetails,
      [field]: value,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 overflow-hidden mb-8">
      <div className="bg-[#0a2112] px-6 py-4 flex items-center justify-between">
        <h2 className="font-black text-white text-base tracking-wide uppercase flex items-center gap-2" style={{ color: '#ffffff' }}>
          <span className="w-2 h-2 rounded-full bg-[#f5c518]"></span>
          Contingent Contact Details
        </h2>
        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400/90">Required for official correspondence</span>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contactName" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Faculty In-Charge / Contact Name <span className="text-red-500">*</span></label>
          <input
            id="contactName"
            type="text"
            required
            value={contactDetails.contactName}
            onChange={(e) => handleChange("contactName", e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 focus:bg-white transition-all text-sm font-medium text-gray-900 placeholder:text-gray-400"
            placeholder="E.g., Dr. Rajesh Kumar"
          />
        </div>
        <div>
          <label htmlFor="contactEmail" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Official Email <span className="text-red-500">*</span></label>
          <input
            id="contactEmail"
            type="email"
            required
            value={contactDetails.contactEmail}
            onChange={(e) => handleChange("contactEmail", e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 focus:bg-white transition-all text-sm font-medium text-gray-900 placeholder:text-gray-400"
            placeholder="sports@iiit.ac.in"
          />
        </div>
        <div>
          <label htmlFor="contactPhone" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Contact Phone <span className="text-red-500">*</span></label>
          <input
            id="contactPhone"
            type="tel"
            required
            value={contactDetails.contactPhone}
            onChange={(e) => handleChange("contactPhone", e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 focus:bg-white transition-all text-sm font-medium text-gray-900 placeholder:text-gray-400"
            placeholder="+91 9876543210"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="contactNotes" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Special Arrival Notes (Optional)</label>
          <textarea
            id="contactNotes"
            value={contactDetails.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 focus:bg-white transition-all text-sm font-medium text-gray-900 placeholder:text-gray-400 min-h-[80px]"
            placeholder="E.g., Contingent arrives on 18th Dec morning via train..."
          />
        </div>
      </div>
    </div>
  );
}
