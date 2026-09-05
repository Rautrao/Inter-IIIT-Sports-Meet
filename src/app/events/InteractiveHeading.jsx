'use client';

import React from 'react';

/**
 * InteractiveHeading
 *
 * Renders the section heading where letters dynamically turn vibrant yellow
 * under cursor hover/proximity while maintaining a crisp green base color.
 */
const InteractiveHeading = ({ text = 'SPORTING EVENTS', className = '' }) => {
  return (
    <h1
      className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight select-none flex flex-wrap gap-x-4 sm:gap-x-5 leading-none uppercase ${className}`}
      style={{
        fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
      }}
    >
      {text.split(' ').map((word, wIdx) => (
        <span key={wIdx} className="inline-flex whitespace-nowrap">
          {word.split('').map((char, cIdx) => (
            <span
              key={cIdx}
              className="inline-block transition-all duration-200 ease-out text-[#84CC16] hover:text-[#FACC15] hover:scale-110 hover:-translate-y-0.5 cursor-default"
              style={{
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow =
                  '0 0 16px rgba(250, 204, 21, 0.85), 0 0 30px rgba(250, 204, 21, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = '0 2px 8px rgba(0,0,0,0.8)';
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
};

export default InteractiveHeading;
