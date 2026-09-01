import Link from 'next/link';
import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';
import { eventInfo } from '@/data/info';
import { iiits } from '@/data/iiits';

export default function Home() {
  return (
    <div style={{ background: '#faf6ee' }}>

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[92vh] flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f5c518 0%, #fcd958 30%, #faf6ee 60%, #faf6ee 100%)' }}>

        {/* Green right-side slab */}
        <div className="absolute right-0 top-0 h-full w-[45%] hidden md:block"
          style={{ background: '#0d3b1a', clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0% 100%)' }}>
          <div className="absolute inset-0 opacity-30">
            <Image src="/assets/hero/hero-placeholder.png" alt="" fill className="object-cover" />
          </div>
          {/* Hero logo centered in green panel */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-52 h-52 opacity-80">
              <Image src="/assets/brand/inter-iiit-logo.png" alt="Inter-IIIT Logo" fill className="object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>

        {/* Yellow decorative arch top-left */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #fbc02d 0%, transparent 70%)' }} />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="animate-fadeUp flex items-center gap-3 mb-6">
              <span className="inline-block w-8 h-0.5 bg-brand-dark rounded-full" />
              <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-dark/70">
                9th Edition · {eventInfo.host}
              </span>
            </div>

            {/* Title */}
            <h1 className="animate-fadeUp animation-delay-100 font-black leading-[1.0] tracking-tight mb-5"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', color: '#0a2112' }}>
              INTER-IIIT<br />
              <span style={{ color: '#1b5e20' }}>SPORTS</span><br />
              <span style={{ color: '#1b5e20' }}>MEET</span>
            </h1>

            {/* Date + Host block */}
            <div className="animate-fadeUp animation-delay-200 flex items-start gap-4 mb-10">
              <div className="w-1 h-14 rounded-full shrink-0" style={{ background: '#1b5e20' }} />
              <div>
                <div className="font-black text-2xl" style={{ color: '#1b5e20' }}>
                  19 – 23 December 2026
                </div>
                <div className="text-sm font-semibold mt-0.5" style={{ color: '#0a2112', opacity: 0.65 }}>
                  {eventInfo.host}, India
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="animate-fadeUp animation-delay-300 flex flex-wrap gap-3">
              <Link href="/register"
                className="px-8 py-3.5 font-black text-sm rounded-full transition-all hover:-translate-y-0.5 shadow-md"
                style={{ background: '#0a2112', color: '#f5c518', letterSpacing: '0.06em' }}>
                REGISTER NOW
              </Link>
              <Link href="/events"
                className="px-8 py-3.5 font-bold text-sm rounded-full border-2 transition-all hover:-translate-y-0.5"
                style={{ borderColor: '#1b5e20', color: '#1b5e20', background: 'transparent' }}>
                View Events →
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile logo (shown below content on small screens) */}
        <div className="md:hidden absolute bottom-16 right-6 w-24 h-24 opacity-30">
          <Image src="/assets/brand/inter-iiit-logo.png" alt="" fill className="object-contain" />
        </div>

        {/* Scrolling Ticker */}
        <div className="absolute bottom-0 w-full py-2.5 overflow-hidden z-20"
          style={{ background: '#0a2112', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex whitespace-nowrap" style={{ animation: 'marquee 28s linear infinite' }}>
            {[...Array(8)].map((_, i) => (
              <span key={i} className="text-[11px] font-black tracking-[0.2em] uppercase mx-8 flex items-center gap-4" style={{ color: '#f5c518' }}>
                {eventInfo.dates}
                <span style={{ color: 'rgba(245,197,24,0.4)' }}>◆</span>
                {eventInfo.host}
                <span style={{ color: 'rgba(245,197,24,0.4)' }}>◆</span>
                9th Inter-IIIT Sports Meet
                <span style={{ color: 'rgba(245,197,24,0.4)' }}>◆</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS BAND ──────────────────────────────────────── */}
      <section style={{ background: '#1b5e20' }} className="py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
            {eventInfo.stats.map((stat, idx) => (
              <div key={idx} className="px-8 py-4 text-center">
                <div className="font-black text-white" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div className="mt-1.5 text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: 'rgba(245,197,24,0.85)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ───────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: '#faf6ee' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-black tracking-[0.2em] uppercase" style={{ color: '#c9972f' }}>About the Meet</span>
              <h2 className="mt-3 font-black leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: '#0a2112' }}>
                A Legacy of<br />
                <span style={{ color: '#1b5e20' }}>Sportsmanship</span>
              </h2>
              <div className="mt-4 w-10 h-1 rounded-full" style={{ background: '#c9972f' }} />
              <p className="mt-6 text-base leading-relaxed" style={{ color: '#3a3a3a' }}>
                {eventInfo.description}
              </p>
              <p className="mt-4 text-base leading-relaxed" style={{ color: '#3a3a3a' }}>
                This unique sports event brings together elite athletes and teams, solidifying its position as a premier competition in the IIIT community. Celebrating a shared passion for sportsmanship and athleticism.
              </p>
              <Link href="/about"
                className="inline-flex items-center gap-2 mt-8 font-bold text-sm group transition-all"
                style={{ color: '#1b5e20' }}>
                Read More
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl"
                style={{ background: '#f5c518', opacity: 0.25 }} />
              <div className="relative w-full h-[380px] rounded-2xl overflow-hidden shadow-lg">
                <Image src="/assets/gallery/gallery-01.jpg" alt="About the meet" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PARTICIPATING IIITs ─────────────────────────────── */}
      <section className="section-pad" style={{ background: '#f3ead8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-black tracking-[0.2em] uppercase" style={{ color: '#c9972f' }}>Participating Institutes</span>
            <h2 className="mt-3 font-black text-4xl" style={{ color: '#0a2112' }}>25+ IIITs · 1 Champion</h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
            {iiits.map((iiit, idx) => (
              <div key={idx}
                className="group flex flex-col items-center text-center p-3 rounded-xl border transition-all hover:-translate-y-0.5 hover:shadow-md cursor-default"
                style={{ background: '#faf6ee', borderColor: 'rgba(27,94,32,0.12)' }}>
                <div className="relative w-12 h-12 mb-2">
                  <Image src={iiit.logo} alt={iiit.name} fill className="object-contain" />
                </div>
                <span className="text-[10px] font-semibold leading-tight" style={{ color: '#2e3a2e' }}>
                  {iiit.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STUDENTS' & EMPLOYEES' MEET ─────────────────────── */}
      <section className="flex flex-col md:flex-row">
        {/* Students */}
        <div className="flex-1 relative min-h-[380px] flex items-end" style={{ background: '#0a2112' }}>
          <div className="absolute inset-0 opacity-25">
            <Image src="/assets/gallery/gallery-02.jpg" alt="Students Meet" fill className="object-cover" />
          </div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,33,18,0.95) 0%, rgba(10,33,18,0.3) 100%)' }} />
          <div className="relative z-10 p-10 md:p-14">
            <div className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4"
              style={{ background: '#f5c518', color: '#0a2112' }}>Students</div>
            <h2 className="font-black text-white text-3xl md:text-4xl leading-tight mb-3">Students&apos; <br />Sports Meet</h2>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
              2,000+ athletes from 25+ IIITs competing across 15+ disciplines over 5 thrilling days.
            </p>
          </div>
        </div>
        {/* Employees */}
        <div className="flex-1 relative min-h-[380px] flex items-end" style={{ background: '#1b5e20' }}>
          <div className="absolute inset-0 opacity-25">
            <Image src="/assets/gallery/gallery-03.jpg" alt="Employees Meet" fill className="object-cover" />
          </div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,60,20,0.95) 0%, rgba(10,60,20,0.3) 100%)' }} />
          <div className="relative z-10 p-10 md:p-14">
            <div className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4"
              style={{ background: '#c9972f', color: '#fff' }}>Faculty & Staff</div>
            <h2 className="font-black text-white text-3xl md:text-4xl leading-tight mb-3">Employees&apos; <br />Sports Meet</h2>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Faculty and staff from IIITs unite in friendly competition, camaraderie, and community.
            </p>
          </div>
        </div>
      </section>

      {/* ─── GALLERY PREVIEW ─────────────────────────────────── */}
      <section className="section-pad" style={{ background: '#faf6ee' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-black tracking-[0.2em] uppercase" style={{ color: '#c9972f' }}>Glimpses</span>
              <h2 className="mt-2 font-black text-3xl md:text-4xl" style={{ color: '#0a2112' }}>Gallery</h2>
            </div>
            <Link href="/gallery" className="text-sm font-bold hidden sm:inline-flex items-center gap-1.5 group" style={{ color: '#1b5e20' }}>
              View All <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[4, 5, 6].map((num) => (
              <div key={num} className="relative overflow-hidden rounded-xl group" style={{ height: '220px' }}>
                <Image
                  src={`/assets/gallery/gallery-0${num}.jpg`}
                  alt={`Gallery ${num}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(10,33,18,0.35)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SPONSORS ────────────────────────────────────────── */}
      <section className="py-14" style={{ background: '#f3ead8', borderTop: '1px solid rgba(27,94,32,0.1)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-black tracking-[0.2em] uppercase" style={{ color: '#c9972f' }}>Partners & Sponsors</span>
            <h2 className="mt-2 font-black text-2xl" style={{ color: '#0a2112' }}>Our Supporters</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-5 items-center">
            {[1, 2, 3, 4, 5].map(num => (
              <div key={num}
                className="relative h-16 w-36 rounded-xl flex items-center justify-center border transition-shadow hover:shadow-md"
                style={{ background: '#faf6ee', borderColor: 'rgba(201,151,47,0.25)' }}>
                <Image src={`/assets/sponsors/sponsor-0${num}.png`} alt={`Sponsor ${num}`} fill className="object-contain p-3" />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-sm mb-4" style={{ color: '#555' }}>Interested in sponsoring the 9th Inter-IIIT Sports Meet?</p>
            <a href="mailto:sports@iiitdm.ac.in"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:-translate-y-0.5 shadow-sm"
              style={{ background: '#1b5e20', color: '#fff' }}>
              Contact us → sports@iiitdm.ac.in
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
