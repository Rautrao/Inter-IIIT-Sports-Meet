"use client";

import { useState } from "react";
import EventBlock from "./EventBlock";

export default function SportSection({ sportConfig, gender, slotsMap, onChangeSlot, studentRegistry }) {
  const [isOpen, setIsOpen] = useState(false);

  // If this sport doesn't support this gender (and it's not mixed), don't render it.
  if (!sportConfig.genders.includes(gender) && !sportConfig.genders.includes('mixed')) {
    return null;
  }
  
  // Actually, for combined teams, the gender section passed down might be 'mixed' or we place it in a special "Combined" tab.
  const actualGender = sportConfig.type === 'combined_team' ? 'mixed' : gender;
  
  let content = null;
  
  if (sportConfig.type === "team" || sportConfig.type === "combined_team") {
    const limit = sportConfig.teamLimits[actualGender] || 0;
    content = (
      <EventBlock
        sportConfig={sportConfig}
        eventId="team"
        eventName={`${sportConfig.name} Squad`}
        gender={actualGender}
        slotsMap={slotsMap}
        onChangeSlot={onChangeSlot}
        maxParticipants={limit}
        maxReserves={0}
        studentRegistry={studentRegistry}
      />
    );
  } else if (sportConfig.type === "event_based" || sportConfig.type === "weight_category_based") {
    const events = sportConfig.events[actualGender] || [];
    content = events.map(ev => (
      <EventBlock
        key={ev.id}
        sportConfig={sportConfig}
        eventId={ev.id}
        eventName={ev.name}
        gender={actualGender}
        slotsMap={slotsMap}
        onChangeSlot={onChangeSlot}
        maxParticipants={ev.maxParticipants}
        maxReserves={ev.maxReserves || 0}
        studentRegistry={studentRegistry}
      />
    ));
  }

  // Count filled slots for this sport & gender
  let filledCount = 0;
  for (const [key, val] of Object.entries(slotsMap)) {
    if (key.startsWith(`${sportConfig.id}|`) && val?.rollNumber?.trim()) {
      // Check if it's the correct gender section
      if (key.includes(`|${actualGender}|`)) {
        filledCount++;
      }
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 sm:px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${filledCount > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
            {sportConfig.name.substring(0, 1)}
          </div>
          <h3 className="font-bold text-gray-900 text-base sm:text-lg text-left">{sportConfig.name}</h3>
        </div>
        <div className="flex items-center gap-4">
          {filledCount > 0 && (
            <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
              {filledCount} Entries
            </span>
          )}
          <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      {isOpen && (
        <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-gray-100 bg-gray-50/30">
          {content}
        </div>
      )}
    </div>
  );
}
