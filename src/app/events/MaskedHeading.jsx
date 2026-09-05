'use client';

import { useState, useEffect, useRef, useId, useCallback } from 'react';
import './MaskedHeading.css';

/**
 * Loads GSAP safely on the client side without breaking Next.js compile-time imports
 */
const loadGsap = async () => {
  if (typeof window === 'undefined') return null;
  if (window.gsap) return window.gsap;

  return new Promise((resolve) => {
    const existing = document.querySelector('script[src*="gsap"]');
    if (existing) {
      const interval = setInterval(() => {
        if (window.gsap) {
          clearInterval(interval);
          resolve(window.gsap);
        }
      }, 30);
      setTimeout(() => {
        clearInterval(interval);
        resolve(window.gsap || null);
      }, 1500);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
    script.async = true;
    script.onload = () => resolve(window.gsap || null);
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });
};

/**
 * MaskedHeading Component
 *
 * Renders high-impact heading typography where media (image or video) is masked
 * through the text characters with full fallback fill (#A3E635), GSAP entrance
 * animations, and interactive cursor parallax.
 */
export default function MaskedHeading({
  text = 'SPORTING EVENTS',
  mediaType = 'image',
  src = '/assets/events/athletics.jpg',
  fillScale = 1.25,
  parallax = 26,
  reveal = 'rise',
  trigger = 'view',
  align = 'left',
  weight = 800,
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const mediaRef = useRef(null);
  const revealGroupRef = useRef(null);
  const rawId = useId();
  const clipId = `masked-heading-clip-${rawId.replace(/[^a-zA-Z0-9-_]/g, '')}`;

  const [activeSrc, setActiveSrc] = useState(src || '/assets/events/athletics.jpg');
  const [dimensions, setDimensions] = useState({ width: 900, height: 140 });
  const words = text ? text.split(' ') : [];

  // Font dimensions calculation
  const sync = useCallback(() => {
    if (!measureRef.current) return;
    const rect = measureRef.current.getBoundingClientRect();
    const w = Math.round(rect.width) || containerRef.current?.offsetWidth || 900;
    const h = Math.round(rect.height) || 140;
    setDimensions({
      width: Math.max(280, w),
      height: Math.max(60, h),
    });
  }, []);

  // Force initial call to sync() after initial render and on resize
  useEffect(() => {
    sync();
    const rafId = requestAnimationFrame(() => {
      sync();
    });
    window.addEventListener('resize', sync);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  // Fallback probing if src fails (e.g. /hero.jpg not found)
  useEffect(() => {
    if (!src || mediaType !== 'image') return;
    const probe = new window.Image();
    probe.onload = () => setActiveSrc(src);
    probe.onerror = () => {
      // Fallback to verified local athletic photography
      setActiveSrc('/assets/events/athletics.jpg');
    };
    probe.src = src;
  }, [src, mediaType]);

  // Entrance / Reveal animation with GSAP (or native fallback)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cleanup = () => {};

    const runReveal = async () => {
      const gsap = await loadGsap();
      const target = revealGroupRef.current;
      if (!target) return;

      if (gsap) {
        if (reveal === 'rise') {
          gsap.fromTo(
            target.querySelectorAll('.masked-heading__word'),
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: 'power3.out',
              stagger: 0.12,
            }
          );
        } else if (reveal === 'wipe') {
          gsap.fromTo(
            target,
            { clipPath: 'inset(0 100% 0 0)' },
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: 1.0,
              ease: 'power2.inOut',
            }
          );
        } else if (reveal === 'fade') {
          gsap.fromTo(
            target,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
            }
          );
        }
      } else {
        const wordEls = target.querySelectorAll('.masked-heading__word');
        wordEls.forEach((el, idx) => {
          el.style.transition = `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 100}ms, opacity 0.8s ease ${idx * 100}ms`;
          el.style.transform = 'translateY(0)';
          el.style.opacity = '1';
        });
      }
    };

    if (trigger === 'view') {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0] && entries[0].isIntersecting) {
            runReveal();
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(container);
      cleanup = () => observer.disconnect();
    } else {
      runReveal();
    }

    return cleanup;
  }, [reveal, trigger]);

  // Interactive pointer parallax
  useEffect(() => {
    const container = containerRef.current;
    if (!container || parallax <= 0) return;

    let animId = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : rect.left + rect.width / 2);
      const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : rect.top + rect.height / 2);

      const normX = ((clientX - rect.left) / rect.width - 0.5) * 2;
      const normY = ((clientY - rect.top) / rect.height - 0.5) * 2;

      targetX = -normX * parallax;
      targetY = -normY * parallax;
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      if (mediaRef.current) {
        mediaRef.current.style.transform = `scale(${fillScale}) translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      }
      animId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    container.addEventListener('mouseleave', handlePointerLeave);
    animId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      container.removeEventListener('mouseleave', handlePointerLeave);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [parallax, fillScale]);

  const alignmentClass =
    align === 'center'
      ? 'masked-heading--center'
      : align === 'right'
      ? 'masked-heading--right'
      : 'masked-heading--left';

  const textX = align === 'center' ? '50%' : align === 'right' ? '100%' : '0%';
  const textAnchor = align === 'center' ? 'middle' : align === 'right' ? 'end' : 'start';

  return (
    <div
      ref={containerRef}
      className={`masked-heading ${alignmentClass} ${className}`}
      style={{
        display: 'block',
        position: 'relative',
        minHeight: '1.2em',
        fontWeight: weight,
        ...style,
      }}
    >
      {/* Offscreen measurement & fallback text (color #A3E635 ensures visibility) */}
      <div
        ref={measureRef}
        className="masked-heading__measure"
        style={{
          fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
          fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
          fontWeight: weight,
          color: '#A3E635',
          textShadow: '0 0 16px rgba(163, 230, 53, 0.4), 0 2px 10px rgba(0,0,0,0.8)',
        }}
      >
        {words.map((word, idx) => (
          <span key={idx} className="masked-heading__word">
            {word}{' '}
          </span>
        ))}
        <span className="masked-heading__baseline" />
      </div>

      {/* Masked SVG Heading Layer positioned over the text */}
      <svg
        className="masked-heading__svg"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible',
          pointerEvents: 'none',
        }}
      >
        <defs className="masked-heading__defs">
          <clipPath id={clipId} className="masked-heading__clip">
            <g ref={revealGroupRef} className="masked-heading__reveal">
              <text
                x={textX}
                y={dimensions.height * 0.78}
                textAnchor={textAnchor}
                className="masked-heading__word"
                style={{
                  fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
                  fontSize: `${dimensions.height * 0.74}px`,
                  fontWeight: weight,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {text}
              </text>
            </g>
          </clipPath>
        </defs>

        {/* Media fill layer clipped to text characters */}
        <g className="masked-heading__media" clipPath={`url(#${clipId})`}>
          {/* Base solid color so text is never empty */}
          <rect width="100%" height="100%" fill="#A3E635" />

          {mediaType === 'video' ? (
            <foreignObject width="100%" height="100%">
              <video
                ref={mediaRef}
                src={activeSrc}
                autoPlay
                loop
                muted
                playsInline
                className="masked-heading__source"
                style={{
                  transform: `scale(${fillScale})`,
                }}
              />
            </foreignObject>
          ) : (
            <image
              ref={mediaRef}
              href={activeSrc}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              className="masked-heading__source"
              style={{
                transform: `scale(${fillScale})`,
              }}
            />
          )}
        </g>
      </svg>
    </div>
  );
}
