'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { sports } from '@/data/sports';

function EventCard({ sport, index, featured = false }) {
  return (
    <article
      data-reveal
      className={`reveal sport-card group relative overflow-hidden rounded-2xl border border-brand-dark/10 bg-brand-dark ${
        featured ? 'min-h-[26rem] md:min-h-[34rem]' : 'min-h-[15rem] sm:min-h-[18rem]'
      }`}
    >
      <Image
        src={sport.image}
        alt={`${sport.name} event`}
        fill
        priority={featured}
        sizes={featured ? '(max-width: 768px) 100vw, 58vw' : '(max-width: 768px) 100vw, 30vw'}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07150c]/95 via-[#07150c]/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-brand-highlight">
          <span className="h-px w-7 bg-brand-highlight" />
          Event {String(index + 1).padStart(2, '0')}
        </div>
        <h2 className={`${featured ? 'text-3xl sm:text-5xl' : 'text-xl sm:text-2xl'} font-black tracking-tight text-white`}>
          {sport.name}
        </h2>
        {featured && (
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">
            Speed, skill and strategy take center stage at the 9th Inter-IIIT Sports Meet.
          </p>
        )}
      </div>
    </article>
  );
}

export default function Events() {
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]');
    const activate = (item) => {
      item.classList.add('is-visible');
      item.dataset.visible = 'true';
    };

    if (!('IntersectionObserver' in window)) {
      items.forEach(activate);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activate(entry.target);
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const [featured, ...remaining] = sports;

  return (
    <main className="min-h-screen bg-ivory">
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <div className="absolute inset-0 opacity-20">
          <Image src={featured.image} alt="" fill priority className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/95 to-brand-dark/55" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.28em] text-brand-highlight">
            9th Inter-IIIT Sports Meet · 2026
          </p>
          <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-7xl">
            Every event has a story.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Explore the competitive programme, from track and field to team sports and precision disciplines.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold">
            <span className="rounded-full border border-brand-highlight/50 px-4 py-2 text-brand-highlight">
              {sports.length} events
            </span>
            <Link href="/register" className="yellow-button rounded-full bg-brand-highlight px-5 py-2 text-brand-dark transition-transform hover:-translate-y-0.5">
              Register your roster
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-brand-accent">The programme</p>
            <h2 className="mt-2 text-3xl font-black text-brand-dark sm:text-4xl">Find your arena</h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm leading-relaxed text-brand-dark/60 sm:block">
            Natural imagery, bold moments, and a clear view of every sporting discipline.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-[1.25fr_0.75fr]">
          <EventCard sport={featured} index={0} featured />
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-1">
            {remaining.slice(0, 2).map((sport, index) => (
              <EventCard key={sport.name} sport={sport} index={index + 1} />
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {remaining.slice(2).map((sport, index) => (
            <EventCard key={sport.name} sport={sport} index={index + 3} />
          ))}
        </div>
      </section>
    </main>
  );
}
