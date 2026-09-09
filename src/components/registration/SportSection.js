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
    <div className={`bg-white rounded-xl shadow-sm border transition-all overflow-hidden mb-4 ${filledCount > 0 ? 'border-green-200/90 ring-1 ring-green-700/10' : 'border-gray-200/80 hover:border-gray-300'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50/80 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm transition-colors ${filledCount > 0 ? 'bg-[#1b5e20] text-white shadow-xs' : 'bg-gray-100 text-gray-600'}`}>
            {sportConfig.name.substring(0, 1)}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base sm:text-lg text-left leading-tight">{sportConfig.name}</h3>
            {sportConfig.type === 'team' || sportConfig.type === 'combined_team' ? (
              <span className="text-[11px] font-semibold text-gray-400 block">Team Discipline</span>
            ) : (
              <span className="text-[11px] font-semibold text-gray-400 block justify-self-start">{sportConfig.events[actualGender]?.length || 0} Events</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          {filledCount > 0 && (
            <span className="text-xs font-bold text-green-800 bg-green-100/80 border border-green-200 px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
              {filledCount} {filledCount === 1 ? 'Entry' : 'Entries'}
            </span>
          )}
          <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-green-700' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      {isOpen && (
        <div className="px-4 sm:px-6 pb-6 pt-4 border-t border-gray-100 bg-gray-50/40">
          {content}
        </div>
      )}
    </div>
  );
}
