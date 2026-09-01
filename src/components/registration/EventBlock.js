"use client";

import ParticipantSlot from "./ParticipantSlot";
import { getSlotKey } from "@/lib/registration/client-utils";

export default function EventBlock({ sportConfig, eventId, eventName, gender, slotsMap, onChangeSlot, maxParticipants, maxReserves, studentRegistry }) {
  
  // Is it a combined event like Chess where gender is mixed?
  const isCombined = sportConfig.type === "combined_team" || gender === "mixed";
  // The actual fixed gender for slots. If combined, it's null so the selector appears.
  const fixedSlotGender = isCombined ? null : gender;

  const mainSlots = Array.from({ length: maxParticipants }).map((_, i) => {
    const key = getSlotKey(sportConfig.id, eventId, gender, "main", i);
    const data = slotsMap[key];
    const knownName = data?.rollNumber ? studentRegistry.get(data.rollNumber.trim().toUpperCase())?.name : null;
    return (
      <ParticipantSlot
        key={key}
        label={`Slot ${i + 1}`}
        slotData={data}
        onChange={(val) => onChangeSlot(key, val)}
        fixedGender={fixedSlotGender}
        isReserve={false}
        knownName={knownName}
      />
    );
  });

  const reserveSlots = Array.from({ length: maxReserves || 0 }).map((_, i) => {
    const key = getSlotKey(sportConfig.id, eventId, gender, "reserve", i);
    const data = slotsMap[key];
    const knownName = data?.rollNumber ? studentRegistry.get(data.rollNumber.trim().toUpperCase())?.name : null;
    return (
      <ParticipantSlot
        key={key}
        label={`Reserve ${i + 1}`}
        slotData={data}
        onChange={(val) => onChangeSlot(key, val)}
        fixedGender={fixedSlotGender}
        isReserve={true}
        knownName={knownName}
      />
    );
  });

  return (
    <div className="mb-6 last:mb-0">
      <div className="mb-3">
        <h4 className="font-bold text-gray-800 text-sm">{eventName}</h4>
        <p className="text-xs text-gray-500">Max {maxParticipants} participants{maxReserves ? ` + ${maxReserves} reserves` : ''}</p>
      </div>
      <div className="space-y-2">
        {mainSlots}
        {reserveSlots.length > 0 && (
          <div className="pt-2 border-t border-dashed border-gray-200 mt-2 space-y-2">
            {reserveSlots}
          </div>
        )}
      </div>
    </div>
  );
}
