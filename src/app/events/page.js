'use client';

import { useEffect, useRef } from 'react';
import CircularGallery from './CircularGallery';
import InteractiveHeading from './InteractiveHeading';
import { sports } from '@/data/sports';

const galleryItems = sports.map((sport) => ({
  image: sport.image,
  text: sport.name,
}));

export default function Events() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, isHovered: false });

  const handleHeaderMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovered: true,
    };
  };

  const handleHeaderTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseRef.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
        isHovered: true,
      };
    }
  };

  const handleHeaderLeave = () => {
    mouseRef.current = { x: -1000, y: -1000, isHovered: false };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -10;
        this.radius = Math.random() * 1.5 + 0.8;
        this.baseVy = Math.random() * 0.4 + 0.25;
        this.vy = this.baseVy;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.alpha = Math.random() * 0.25 + 0.15;
        const colorType = Math.random();
        if (colorType > 0.6) {
          this.color = '245, 197, 24'; // Gold
        } else if (colorType > 0.3) {
          this.color = '110, 231, 183'; // Light emerald
        } else {
          this.color = '255, 255, 255'; // Soft white
        }
      }

      update(mouse) {
        // Slow downward float
        this.y += this.vy;
        this.x += this.vx;

        // Smooth cursor repulsion / dispersion
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 110;

        if (dist < repelRadius && mouse.isHovered) {
          const force = (repelRadius - dist) / repelRadius;
          const dirX = (dx / dist) * force * 1.8;
          const dirY = (dy / dist) * force * 1.8;
          this.vx -= dirX;
          this.vy -= dirY;
        } else {
          // Smooth return to normal downward drift
          this.vx *= 0.96;
          this.vy = this.vy * 0.95 + this.baseVy * 0.05;
        }

        // Screen boundary wrapping
        if (this.y > height + 10) this.reset();
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.fill();
      }
    }

    const count = Math.min(60, Math.max(30, Math.floor(width / 22)));
    const particles = Array.from({ length: count }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(mouseRef.current);
        particles[i].draw();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // ── 3D Perspective Scroll ──────────────────────────────────────────────────
  const headerBannerRef = useRef(null);
  const contentSectionRef = useRef(null);
  const scrollRafRef = useRef(null);

  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;
    let currentProgress = 0;

    const tick = () => {
      const header = headerBannerRef.current;
      const content = contentSectionRef.current;
      if (!header) { scrollRafRef.current = requestAnimationFrame(tick); return; }

      const headerH = header.offsetHeight;
      const rawProgress = Math.min(Math.max(window.scrollY / (headerH * 0.85), 0), 1);
      // Smooth lerp so the transform eases rather than snapping
      currentProgress = lerp(currentProgress, rawProgress, 0.1);
      const p = currentProgress;

      // Header: recede in 3D
      const rotateX = p * 14;          // 0 → 14deg tilt away
      const scale = 1 - p * 0.1;     // 1 → 0.9
      const translateZ = -p * 100;      // 0 → -100px push back
      const opacity = 1 - p * 0.62;   // 1 → 0.38

      header.style.transformOrigin = '50% 0%';
      header.style.transform =
        `perspective(1200px) rotateX(${rotateX}deg) scale(${scale}) translateZ(${translateZ}px)`;
      header.style.opacity = opacity;

      // Content: slide up over the receding header
      if (content) {
        const slideUp = p * 60;          // shift up by up to 60px
        content.style.transform = `translateY(-${slideUp}px)`;
      }

      scrollRafRef.current = requestAnimationFrame(tick);
    };

    scrollRafRef.current = requestAnimationFrame(tick);
    return () => {
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
  }, []);
  // ──────────────────────────────────────────────────────────────────────────

  return (
    <div style={{ background: '#F4F5EB', minHeight: '100vh', perspective: '1200px' }}>
      {/* Google Font Cinzel & Cinzel Decorative */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Cinzel+Decorative:wght@700;900&display=swap"
      />

      {/* Page header banner with falling & repelling particles and crisp boundary */}
      <div
        ref={headerBannerRef}
        onMouseMove={handleHeaderMouseMove}
        onTouchMove={handleHeaderTouchMove}
        onMouseLeave={handleHeaderLeave}
        onTouchEnd={handleHeaderLeave}
        className="relative py-16 md:py-24 px-4 overflow-hidden border-b border-emerald-900/30"
        style={{
          background: '#0a2112',
          willChange: 'transform, opacity',
          transformOrigin: '50% 0%',
          zIndex: 1,
        }}
      >
        {/* Falling & repelling header particles canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        <div className="relative max-w-7xl mx-auto z-20">
          {/* Square Sticky Note Patch Tag */}
          <div
            className="relative inline-flex flex-col items-center justify-center w-24 h-24 -rotate-3 select-none mb-6 shadow-[4px_4px_14px_rgba(0,0,0,0.45)] hover:rotate-0 hover:scale-105 transition-all duration-300 ease-out cursor-default"
            style={{ background: '#d7e6afff' }}
          >
            {/* Tape strip at top */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-4 bg-white/50 backdrop-blur-[1px] rotate-1 border border-white/60 shadow-sm z-10" />
            <span className="text-[10px] font-black tracking-widest uppercase text-[#0a2112] text-center leading-snug px-2">
              EXPLORE<br />
              <span className="text-2xl font-black leading-none">{sports.length}</span><br />
              EVENTS
            </span>
          </div>

          <div className="block">
            <span className="text-xs font-bold tracking-widest uppercase text-[#f5c518]/90">
              9th Inter-IIIT Sports Meet · 2026
            </span>
          </div>

          {/* Interactive Heading with character hover & yellow cursor effect */}
          <div className="mt-4 max-w-4xl">
            <InteractiveHeading text="SPORTING  EVENTS" />
          </div>

          <div className="mt-4 w-14 h-1 rounded-full" style={{ background: '#c9972f' }} />

          <p className="mt-4 text-sm sm:text-base max-w-xl text-white/70 font-normal leading-relaxed">
            {sports.length} competitive events testing speed, skill, strength, and strategy.
          </p>
        </div>
      </div>

      {/* Events content – slides up over the receding header */}
      <div
        ref={contentSectionRef}
        style={{ willChange: 'transform', position: 'relative', zIndex: 2 }}
      >
        {/* Circular Gallery Section */}
        <div className="max-w-7xl mx-auto py-10 px-4">
          <div className="w-full">
            <CircularGallery
              items={galleryItems}
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.12}
              fontUrl="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Cinzel+Decorative:wght@700;900&display=swap"
              font="bold 24px 'Cinzel', serif"
              scrollSpeed={1.5}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
