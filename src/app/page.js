import Link from 'next/link';
import Image from 'next/image';
import { eventInfo } from '@/data/info';
import { iiits } from '@/data/iiits';

/**
 * Landing Page Component (Home)
 * 
 * Purpose:
 * Flagship entry point for the 9th All India Inter-IIIT Sports Meet 2026.
 * Provides high-impact event identity, key logistics, participating institutes showcase,
 * host institute spotlight (IIITDM Kancheepuram), and quick navigation to all sub-pages.
 * 
 * Design Standards:
 * - Built on the warm ivory (#faf6ee) primary surface
 * - Forest green (#0a2112 / #1b5e20) and athletic gold (#c9972f / #f5c518) accents
 * - Fully responsive with high-contrast, accessible typography
 */
export default function Home() {
  const { hostInstitute } = eventInfo;

  return (
    <div style={{ background: '#faf6ee' }}>

      {/* ─── 1. HERO SECTION ────────────────────────────────────────────── */}
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
            <div className="relative w-52 h-52 opacity-85">
              <Image src="/assets/brand/inter-iiit-logo.png" alt="Inter-IIIT Logo" fill className="object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>

        {/* Yellow decorative arch top-left */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #fbc02d 0%, transparent 70%)' }} />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="animate-fadeUp flex items-center gap-3 mb-6">
              <span className="inline-block w-8 h-0.5 bg-brand-dark rounded-full" />
              <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-dark/80">
                9th Edition &bull; {eventInfo.host}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="animate-fadeUp animation-delay-100 font-black leading-[1.0] tracking-tight mb-5"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', color: '#0a2112' }}>
              INTER-IIIT<br />
              <span style={{ color: '#1b5e20' }}>SPORTS</span><br />
              <span style={{ color: '#1b5e20' }}>MEET</span>
            </h1>

            {/* Date + Host benchmark */}
            <div className="animate-fadeUp animation-delay-200 flex items-start gap-4 mb-10">
              <div className="w-1 h-14 rounded-full shrink-0" style={{ background: '#1b5e20' }} />
              <div>
                <div className="font-black text-2xl" style={{ color: '#1b5e20' }}>
                  19 – 23 December 2026
                </div>
                <Link
                  href="/location"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold mt-0.5 hover:underline group"
                  style={{ color: '#0a2112', opacity: 0.85 }}
                  title="View Campus & Travel Guide"
                >
                  <span>{eventInfo.host}, Chennai</span>
                  <span className="text-xs group-hover:translate-x-0.5 transition-transform" style={{ color: '#1b5e20' }}>📍</span>
                </Link>
              </div>
            </div>

            {/* CTAs */}
            <div className="animate-fadeUp animation-delay-300 flex flex-wrap gap-3">
              <Link href="/register"
                className="px-8 py-3.5 font-black text-sm rounded-full transition-all hover:-translate-y-0.5 shadow-md"
                style={{ background: '#0a2112', color: '#f5c518', letterSpacing: '0.06em' }}>
                REGISTER ROSTER
              </Link>
              <Link href="/location"
                className="px-8 py-3.5 font-bold text-sm rounded-full border-2 transition-all hover:-translate-y-0.5"
                style={{ borderColor: '#1b5e20', color: '#1b5e20', background: 'transparent' }}>
                Campus &amp; Directions &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile logo (shown below content on small screens) */}
        <div className="md:hidden absolute bottom-16 right-6 w-24 h-24 opacity-30">
          <Image src="/assets/brand/inter-iiit-logo.png" alt="" fill className="object-contain" />
        </div>

        {/* Scrolling Marquee Ticker */}
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
                25+ Participating Institutes
                <span style={{ color: 'rgba(245,197,24,0.4)' }}>◆</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 2. QUICK LOGISTICS INFORMATION CARDS ───────────────────────── */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 -mt-2">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="rounded-2xl p-6 border transition-all duration-300 hover:shadow-sm"
              style={{ background: '#fff', borderColor: 'rgba(27,94,32,0.12)' }}>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-1" style={{ color: '#c9972f' }}>
                Tournament Dates
              </div>
              <div className="font-black text-xl mb-1" style={{ color: '#0a2112' }}>
                19 – 23 Dec 2026
              </div>
              <div className="text-xs text-gray-600">
                5 Championship Days of track, court, and field competition.
              </div>
            </div>

            <div className="rounded-2xl p-6 border transition-all duration-300 hover:shadow-sm"
              style={{ background: '#fff', borderColor: 'rgba(27,94,32,0.12)' }}>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-1" style={{ color: '#c9972f' }}>
                Host Campus
              </div>
              <div className="font-black text-xl mb-1" style={{ color: '#0a2112' }}>
                IIITDM Kancheepuram
              </div>
              <div className="text-xs text-gray-600">
                51-Acre Green Campus on Vandalur-Kelambakkam Road, Chennai.
              </div>
            </div>

            <div className="rounded-2xl p-6 border transition-all duration-300 hover:shadow-sm"
              style={{ background: '#fff', borderColor: 'rgba(27,94,32,0.12)' }}>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-1" style={{ color: '#c9972f' }}>
                National Scale
              </div>
              <div className="font-black text-xl mb-1" style={{ color: '#0a2112' }}>
                25+ IIITs Nationwide
              </div>
              <div className="text-xs text-gray-600">
                Over 2,000 student-athletes and staff delegations participating.
              </div>
            </div>

            <div className="rounded-2xl p-6 border transition-all duration-300 hover:shadow-sm"
              style={{ background: '#fff', borderColor: 'rgba(27,94,32,0.12)' }}>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-1" style={{ color: '#c9972f' }}>
                Championship Disciplines
              </div>
              <div className="font-black text-xl mb-1" style={{ color: '#0a2112' }}>
                15+ Sports Categories
              </div>
              <div className="text-xs text-gray-600">
                Athletics, Aquatics, Racquet, Team, and Combat disciplines.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 3. STATS BAND ──────────────────────────────────────────────── */}
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

      {/* ─── 4. ABOUT PREVIEW ────────────────────────────────────────────── */}
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
              <p className="mt-6 text-base leading-relaxed text-gray-700">
                {eventInfo.description}
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-700">
                Organized every four years, the Inter-IIIT Meet serves as the flagship arena for student-athletes to demonstrate teamwork, athletic excellence, and sportsmanship. The 9th edition celebrates this tradition at IIITDM Kancheepuram.
              </p>
              <Link href="/about"
                className="inline-flex items-center gap-2 mt-8 font-bold text-sm group transition-all"
                style={{ color: '#1b5e20' }}>
                Read Full History &amp; Legacy
                <span className="group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl"
                style={{ background: '#f5c518', opacity: 0.25 }} />
              <div className="relative w-full h-[380px] rounded-2xl overflow-hidden shadow-lg">
                <Image src="/assets/gallery/gallery-01.jpg" alt="Athletic championship meet" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. HOST INSTITUTE SPOTLIGHT BANNER ─────────────────────────── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8" style={{ background: '#f3ead8' }}>
        <div className="max-w-7xl mx-auto rounded-3xl p-8 sm:p-12 border flex flex-col lg:flex-row items-center justify-between gap-8"
          style={{ background: '#fff', borderColor: 'rgba(27,94,32,0.12)' }}>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: '#c9972f' }}>
              <span>🏛️</span>
              <span>Host Institute Spotlight</span>
            </div>
            <h3 className="font-black text-2xl sm:text-3xl mb-3" style={{ color: '#0a2112' }}>
              Welcome to {hostInstitute.shortName}
            </h3>
            <p className="text-sm leading-relaxed text-gray-700 mb-4">
              An Institute of National Importance under the Ministry of Education, Government of India. Set across a 51-acre green campus in Melakottaiyur, Chennai, the institute features an athletic stadium, indoor sports complex, competition swimming pool, and floodlit courts ready to host visiting delegations.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-emerald-900">
              <span className="bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">✓ 51-Acre Eco Campus</span>
              <span className="bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">✓ Comprehensive Sports Arenas</span>
              <span className="bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">✓ 21 km from Chennai Airport</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
            <Link
              href="/location"
              className="w-full sm:w-auto text-center px-7 py-3.5 rounded-full text-xs font-black transition-all hover:-translate-y-0.5 shadow-sm"
              style={{ background: '#1b5e20', color: '#fff' }}
            >
              View Campus &amp; Travel Guide &rarr;
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto text-center px-7 py-3.5 rounded-full text-xs font-bold border transition-all hover:bg-gray-50"
              style={{ borderColor: 'rgba(27,94,32,0.3)', color: '#0a2112' }}
            >
              About the Host
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 6. PARTICIPATING IIITs ──────────────────────────────────────── */}
      <section className="section-pad" style={{ background: '#faf6ee' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-black tracking-[0.2em] uppercase" style={{ color: '#c9972f' }}>Participating Institutes</span>
            <h2 className="mt-3 font-black text-4xl" style={{ color: '#0a2112' }}>25+ IIITs &bull; 1 Champion</h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
            {iiits.map((iiit, idx) => (
              <div key={idx}
                className="group flex flex-col items-center text-center p-3 rounded-xl border transition-all hover:-translate-y-0.5 hover:shadow-md cursor-default"
                style={{ background: '#fff', borderColor: 'rgba(27,94,32,0.12)' }}>
                <div className="relative w-12 h-12 mb-2">
                  <Image src={iiit.logo} alt={iiit.name} fill className="object-contain" />
                </div>
                <span className="text-[10px] font-semibold leading-tight text-gray-700">
                  {iiit.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. STUDENTS' & EMPLOYEES' MEET ──────────────────────────────── */}
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
            <p className="text-sm leading-relaxed max-w-sm text-white/75">
              2,000+ student-athletes from 25+ IIITs competing across 15+ disciplines over 5 championship days.
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
              style={{ background: '#c9972f', color: '#fff' }}>Faculty &amp; Staff</div>
            <h2 className="font-black text-white text-3xl md:text-4xl leading-tight mb-3">Employees&apos; <br />Sports Meet</h2>
            <p className="text-sm leading-relaxed max-w-sm text-white/75">
              Faculty and staff from IIITs unite in friendly competition, camaraderie, and community health.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 8. GALLERY PREVIEW ──────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: '#faf6ee' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-black tracking-[0.2em] uppercase" style={{ color: '#c9972f' }}>Glimpses</span>
              <h2 className="mt-2 font-black text-3xl md:text-4xl" style={{ color: '#0a2112' }}>Gallery</h2>
            </div>
            <Link href="/gallery" className="text-sm font-bold hidden sm:inline-flex items-center gap-1.5 group" style={{ color: '#1b5e20' }}>
              View All Photos <span className="group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[4, 5, 6].map((num) => (
              <div key={num} className="relative overflow-hidden rounded-xl group" style={{ height: '220px' }}>
                <Image
                  src={`/assets/gallery/gallery-0${num}.jpg`}
                  alt={`Gallery moment ${num}`}
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

      {/* ─── 9. PARTNERS & SUPPORTERS ───────────────────────────────────── */}
      <section className="py-14" style={{ background: '#f3ead8', borderTop: '1px solid rgba(27,94,32,0.1)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-black tracking-[0.2em] uppercase" style={{ color: '#c9972f' }}>Partners &amp; Sponsors</span>
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
            <p className="text-sm mb-4 text-gray-600">Interested in supporting the 9th Inter-IIIT Sports Meet?</p>
            <a href="mailto:sports@iiitdm.ac.in"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:-translate-y-0.5 shadow-sm"
              style={{ background: '#1b5e20', color: '#fff' }}>
              Contact us &rarr; sports@iiitdm.ac.in
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
