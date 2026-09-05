'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * CinematicIntro Component
 * 
 * Purpose:
 * A one-time-per-session cinematic intro sequence inspired by the Twaran IIIT sports meet
 * digital experience.
 * 
 * 4-Phase Progression:
 * 1. Road Animation: A perspective-driven 3D track emerging from darkness in a forest-green arena.
 * 2. Text Reveal: "ROAD TO GLORY" scaling with gold/emerald chromatic glow.
 * 3. Champions Moment: Athlete silhouettes, rising championship trophy, and celebratory particles.
 * 4. Seamless Transition: Smooth dissolve into the main landing page without abrupt cuts.
 * 
 * Controls:
 * - Automatically skips if already played in the current browser session.
 * - Accessible "Skip Intro ✕" button and Escape key support.
 * - Hardware-accelerated GPU transforms and lightweight native Canvas particle engine.
 */
export default function CinematicIntro() {
  // Intro lifecycle states: 'checking', 'playing', 'fading', 'done'
  const [stage, setStage] = useState('checking');
  // Sub-phases: 1 = Road, 2 = Text Reveal, 3 = Champions Moment
  const [phase, setPhase] = useState(1);
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);

  useEffect(() => {
    // 1. Session Storage Check
    try {
      const alreadyPlayed = sessionStorage.getItem('inter_iiit_intro_played');
      if (alreadyPlayed === 'true') {
        setStage('done');
        return;
      }
    } catch {
      // Fallback if sessionStorage is disabled or restricted
    }

    // Mark as played so it runs only once per session
    try {
      sessionStorage.setItem('inter_iiit_intro_played', 'true');
    } catch {}

    setStage('playing');

    // 2. Timeline Progression
    // Phase 1 -> 2: Text Reveal after 1.8s
    const timer1 = setTimeout(() => setPhase(2), 1800);
    // Phase 2 -> 3: Champions Trophy after 3.3s
    const timer2 = setTimeout(() => setPhase(3), 3300);
    // Phase 3 -> Fade out after 5.2s
    const timer3 = setTimeout(() => setStage('fading'), 5200);
    // Complete and unmount after 6.0s
    const timer4 = setTimeout(() => setStage('done'), 6000);

    // 3. Escape key to skip
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      window.removeEventListener('keydown', handleKeyDown);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  // 4. Celebration Particle Canvas (Activates in Phase 3)
  useEffect(() => {
    if (stage !== 'playing' && stage !== 'fading') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool
    const particles = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * 80,
      size: Math.random() * 3.5 + 1.5,
      speedY: Math.random() * 2.8 + 1.2,
      speedX: (Math.random() - 0.5) * 1.6,
      opacity: Math.random() * 0.8 + 0.2,
      color: Math.random() > 0.4 ? '#f5c518' : '#2e7d32',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [stage]);

  const handleSkip = () => {
    setStage('fading');
    setTimeout(() => setStage('done'), 400);
  };

  if (stage === 'done' || stage === 'checking') {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Cinematic Event Intro"
      className={`fixed inset-0 z-50 overflow-hidden flex items-center justify-center transition-opacity duration-700 select-none ${
        stage === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #0a2112 0%, #041108 70%, #020804 100%)',
      }}
    >
      {/* ─── SKIP BUTTON ────────────────────────────────────────────── */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-50 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(245, 197, 24, 0.35)',
          color: '#f5c518',
          backdropFilter: 'blur(10px)',
        }}
      >
        Skip Intro &times;
      </button>

      {/* ─── BACKGROUND GLOW HORIZON ─────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 55%, rgba(245, 197, 24, 0.15) 0%, transparent 60%)',
        }}
      />

      {/* ─── STEP 1: PARALLAX PERSPECTIVE ROAD ──────────────────────── */}
      <div
        className="absolute bottom-0 w-full flex justify-center pointer-events-none"
        style={{
          height: '65vh',
          perspective: '600px',
          overflow: 'hidden',
        }}
      >
        {/* Road Surface */}
        <div
          className="relative w-[340px] sm:w-[500px] h-full"
          style={{
            transform: 'rotateX(72deg)',
            transformOrigin: 'bottom center',
            background: 'linear-gradient(to top, #0d3319 0%, #06190c 70%, #030d06 100%)',
            boxShadow: '0 0 50px rgba(27, 94, 32, 0.5)',
            borderLeft: '4px solid rgba(245, 197, 24, 0.6)',
            borderRight: '4px solid rgba(245, 197, 24, 0.6)',
          }}
        >
          {/* Animated Center Dashed Line */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-3 h-full"
            style={{
              backgroundImage: 'linear-gradient(to bottom, #f5c518 40%, transparent 40%)',
              backgroundSize: '12px 60px',
              animation: 'roadDash 0.75s linear infinite',
            }}
          />

          {/* Running Track Lane Markers */}
          <div className="absolute left-1/4 w-0.5 h-full bg-white/20" />
          <div className="absolute right-1/4 w-0.5 h-full bg-white/20" />
        </div>
      </div>

      {/* ─── PARTICLE CANVAS ────────────────────────────────────────── */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-20" />

      {/* ─── STEP 2 & 3: CENTER VISUAL SEQUENCE ─────────────────────── */}
      <div className="relative z-30 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Eyebrow: 9th Edition */}
        <div
          className={`transition-all duration-700 transform mb-3 ${
            phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
          }`}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] border"
            style={{
              background: 'rgba(27, 94, 32, 0.4)',
              borderColor: 'rgba(245, 197, 24, 0.4)',
              color: '#f5c518',
            }}
          >
            9th All India Inter-IIIT Sports Meet &bull; 2026
          </span>
        </div>

        {/* STEP 2: "ROAD TO GLORY" REVEAL */}
        <div
          className={`transition-all duration-1000 transform ${
            phase >= 2 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-8'
          }`}
        >
          <h1
            className="font-black text-transparent bg-clip-text leading-none tracking-tight mb-4 select-none animate-glowPulse"
            style={{
              fontSize: 'clamp(3rem, 9vw, 6.5rem)',
              backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #f5c518 55%, #c9972f 100%)',
              textShadow: '0 0 35px rgba(245, 197, 24, 0.5)',
            }}
          >
            ROAD TO GLORY
          </h1>
          <p
            className={`text-sm sm:text-base font-semibold tracking-[0.25em] uppercase text-white/80 transition-all duration-700 delay-200 ${
              phase >= 2 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            25+ Institutes &bull; 2,000+ Athletes &bull; One Champion
          </p>
        </div>

        {/* STEP 3: CHAMPIONS TROPHY & ATHLETES MOMENT */}
        {phase >= 3 && (
          <div className="mt-8 flex flex-col items-center animate-trophyRise">
            {/* Radiant Trophy Icon / Emblem */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
              {/* Radial Light Halo */}
              <div
                className="absolute inset-0 rounded-full animate-ping opacity-30"
                style={{ background: 'radial-gradient(circle, #f5c518 0%, transparent 70%)' }}
              />
              
              {/* Trophy SVG Graphic */}
              <svg
                className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_0_25px_rgba(245,197,24,0.85)]"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2L14.5 7.5L20.5 8.5L16 13L17 19L12 16L7 19L8 13L3.5 8.5L9.5 7.5L12 2Z"
                  fill="#f5c518"
                  opacity="0.25"
                />
                <path
                  d="M6 3H18V8C18 11.31 15.31 14 12 14C8.69 14 6 11.31 6 8V3Z"
                  fill="#f5c518"
                  stroke="#c9972f"
                  strokeWidth="1.5"
                />
                <path
                  d="M6 5H3C2.45 5 2 5.45 2 6C2 8.5 3.79 10.58 6 10.93V5Z"
                  fill="#f5c518"
                />
                <path
                  d="M18 5H21C21.55 5 22 5.45 22 6C22 8.5 20.21 10.58 18 10.93V5Z"
                  fill="#f5c518"
                />
                <path
                  d="M10 14V18H14V14"
                  stroke="#c9972f"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M7 21H17V18H7V21Z"
                  fill="#f5c518"
                  stroke="#c9972f"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            {/* Victory Subtitle */}
            <div className="mt-3 text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-amber-300">
              Where Champions Rise
            </div>
          </div>
        )}

      </div>

      {/* ─── BOTTOM PROGRESS BAR ────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
        <div
          className="h-full transition-all ease-linear"
          style={{
            background: 'linear-gradient(90deg, #1b5e20 0%, #f5c518 100%)',
            width: phase === 1 ? '30%' : phase === 2 ? '65%' : '100%',
            transitionDuration: phase === 1 ? '1.8s' : phase === 2 ? '1.5s' : '1.7s',
          }}
        />
      </div>

    </div>
  );
}
