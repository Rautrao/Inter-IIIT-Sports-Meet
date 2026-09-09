"use client";

export default function ParticipantSlot({ label, slotData, onChange, fixedGender, isReserve, knownName }) {
  const rollNumber = slotData?.rollNumber || "";
  const name = slotData?.name || "";
  const gender = slotData?.gender || fixedGender || "M";

  // Use the known name from registry if our local name is empty but roll number matches
  const displayName = name || (knownName ? knownName : "");

  const handleChange = (field, value) => {
    onChange({
      rollNumber: field === "rollNumber" ? value.toUpperCase() : rollNumber,
      name: field === "name" ? value.toUpperCase() : name,
      gender: field === "gender" ? value : gender,
    });
  };

  return (
    <div className={`p-3 rounded-lg border flex flex-col md:flex-row gap-3 items-start md:items-center transition-colors ${isReserve ? 'bg-amber-50/40 border-amber-200/60' : 'bg-gray-50/60 border-gray-200/80 hover:bg-gray-50'}`}>
      <div className="w-24 shrink-0 font-bold text-xs uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
        {isReserve && <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>}
        {label}
      </div>
      
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        <div>
          <input
            type="text"
            placeholder="Roll Number"
            aria-label={`${label} Roll Number`}
            value={rollNumber}
            onChange={(e) => handleChange("rollNumber", e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 uppercase placeholder:normal-case font-mono transition-all text-gray-900"
            maxLength={64}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder={knownName ? `Auto: ${knownName}` : "Student Name"}
            aria-label={`${label} Student Name`}
            value={name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 uppercase placeholder:normal-case transition-all text-gray-900"
            maxLength={128}
          />
          {knownName && !name && rollNumber && (
            <p className="text-[10px] text-green-700 mt-1 font-semibold flex items-center gap-1">
              <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              Auto-linked: {knownName}
            </p>
          )}
        </div>
      </div>
      
      {!fixedGender && (
        <div className="w-full md:w-28 shrink-0 mt-2 md:mt-0">
          <select
            value={gender}
            aria-label={`${label} Gender`}
            onChange={(e) => handleChange("gender", e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 bg-white font-medium text-gray-800 transition-all"
          >
            <option value="M">Male (M)</option>
            <option value="F">Female (F)</option>
          </select>
        </div>
      )}
    </div>
  );
}
