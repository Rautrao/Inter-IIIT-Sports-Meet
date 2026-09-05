'use client';

import { useEffect } from 'react';
import SectionHeading from '@/components/SectionHeading';
import { sports } from '@/data/sports';
import Image from 'next/image';
import Link from 'next/link';

export default function Events() {
  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-reveal]');

    if (!revealItems.length) return;

    const activate = (element) => {
      element.classList.add('is-visible');
      element.dataset.visible = 'true';
    };

    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => activate(item));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    revealItems.forEach((item) => {
      if (item.getBoundingClientRect().top < window.innerHeight + 120) {
        activate(item);
        return;
      }
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: '#faf6ee', minHeight: '100vh' }}>
      {/* Page header */}
      <div className="py-16 px-4" style={{ background: '#0a2112' }}>
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-black tracking-[0.25em] uppercase" style={{ color: '#f5c518' }}>
            9th Inter-IIIT Sports Meet · 2026
          </span>
          <h1 className="mt-3 font-black text-white" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
            Sporting Events
          </h1>
          <div className="mt-3 w-12 h-1 rounded-full" style={{ background: '#c9972f' }} />
          <p className="mt-4 text-sm max-w-xl" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {sports.length} competitive disciplines testing speed, skill, strength, and strategy.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <div data-reveal className="reveal rulebook-panel rounded-[28px] border p-6 sm:p-8 md:p-10 shadow-sm"
          style={{ background: 'linear-gradient(135deg, rgba(245,197,24,0.12), rgba(255,255,255,0.9)), #fff', borderColor: 'rgba(27,94,32,0.14)' }}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-[10px] font-black tracking-[0.25em] uppercase" style={{ color: '#c9972f' }}>
                Rule Book
              </span>
              <h2 className="mt-3 font-black text-2xl sm:text-3xl" style={{ color: '#0a2112' }}>
                Competition rules, eligibility criteria, event regulations, and participation guidelines will be published here.
              </h2>
            </div>
            <Link
              href="#"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: '#0a2112', color: '#f5c518', letterSpacing: '0.04em' }}
            >
              View Rule Book (Coming Soon)
            </Link>
          </div>
        </div>
      </div>

      {/* Events grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sports.map((sport, idx) => (
            <div
              key={idx}
              data-reveal
              className="reveal sport-card group relative overflow-hidden rounded-xl cursor-pointer border border-transparent"
              style={{ height: '220px', animationDelay: `${idx * 60}ms` }}
            >
              <Image
                src={sport.image}
                alt={sport.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, rgba(10,20,10,0.86) 0%, rgba(10,20,10,0.24) 52%, rgba(10,20,10,0.12) 100%)' }} />
              <div className="absolute inset-0 bg-gradient-to-br from-[#f5c518]/10 via-transparent to-[#1b5e20]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <h3 className="font-black text-white text-base leading-tight transition-transform duration-300 group-hover:translate-y-[-2px]">{sport.name}</h3>
                <div className="mt-2 h-0.5 w-6 rounded-full transition-all duration-300 group-hover:w-16 group-hover:bg-[#f5c518]"
                  style={{ background: '#f5c518' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
