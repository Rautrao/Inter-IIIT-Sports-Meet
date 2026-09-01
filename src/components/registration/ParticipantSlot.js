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
    <div className={`p-3 rounded-lg border flex flex-col md:flex-row gap-3 items-start md:items-center ${isReserve ? 'bg-orange-50/50 border-orange-100' : 'bg-gray-50/50 border-gray-200'}`}>
      <div className="w-24 shrink-0 font-bold text-xs uppercase tracking-wider text-gray-500">
        {label}
      </div>
      
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        <div>
          <input
            type="text"
            placeholder="Roll Number"
            value={rollNumber}
            onChange={(e) => handleChange("rollNumber", e.target.value)}
            className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:outline-none focus:border-green-700 uppercase placeholder:normal-case font-mono"
            maxLength={64}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder={knownName ? `Auto: ${knownName}` : "Student Name"}
            value={name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:outline-none focus:border-green-700 uppercase placeholder:normal-case"
            maxLength={128}
          />
          {knownName && !name && rollNumber && (
            <p className="text-[10px] text-green-700 mt-1 font-medium">Using existing name</p>
          )}
        </div>
      </div>
      
      {!fixedGender && (
        <div className="w-full md:w-28 shrink-0 mt-2 md:mt-0">
          <select
            value={gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:outline-none focus:border-green-700 bg-white"
          >
            <option value="M">Male (M)</option>
            <option value="F">Female (F)</option>
          </select>
        </div>
      )}
    </div>
  );
}
