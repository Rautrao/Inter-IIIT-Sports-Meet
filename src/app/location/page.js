import Link from 'next/link';
import { eventInfo } from '@/data/info';

/**
 * Location Page Component
 * 
 * Purpose:
 * Provides visiting sports contingents, officials, and attendees with complete
 * geographical, travel, and campus facility information for IIITDM Kancheepuram.
 * 
 * Features:
 * - Direct "Get Directions" action integrating with Google Maps navigation
 * - Structured travel cards for Airport, Railway, Bus, and Local Cabs
 * - Interactive embedded Google Map with pan/zoom and direct link to full app
 * - Campus sports facilities breakdown and contingent check-in instructions
 * - Fully responsive layout adhering to the warm ivory (#faf6ee) and brand green design system
 */
export default function Location() {
  const { location } = eventInfo;

  return (
    <div style={{ background: '#faf6ee', minHeight: '100vh' }}>
      
      {/* ─── 1. PAGE HERO & HEADER ──────────────────────────────────────── */}
      {/* Deep Forest Green header band matching the site's primary branding */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: '#0a2112' }}>
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-black tracking-[0.25em] uppercase" style={{ color: '#f5c518' }}>
            Venue & Connectivity Guide
          </span>
          <h1 className="mt-3 font-black text-white" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
            Location & How to Reach
          </h1>
          <div className="mt-3 w-12 h-1 rounded-full" style={{ background: '#c9972f' }} />
          
          <p className="mt-6 text-base sm:text-lg max-w-3xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
            The 9th All India Inter-IIIT Sports Meet is proudly hosted at the scenic 51-acre green campus of{' '}
            <strong className="text-white font-bold">{location.institute}</strong>.
          </p>

          {/* Quick Actions & Coordinates Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {/* Primary "Get Directions" Button */}
            <a
              href={location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-black transition-all hover:-translate-y-0.5 shadow-lg"
              style={{ background: '#f5c518', color: '#0a2112' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Get Directions</span>
              <span className="text-xs opacity-75">↗</span>
            </a>

            {/* GPS Coordinates Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full text-xs font-bold border"
              style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.15)', color: '#f5c518' }}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              GPS: {location.coordinates.latitude}, {location.coordinates.longitude}
            </div>

            {/* Address snippet */}
            <span className="text-xs sm:text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Melakottaiyur, Chennai 600127, Tamil Nadu
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* ─── 2. TRAVEL INFORMATION CARDS ──────────────────────────────── */}
        {/* Responsive grid displaying transit modes with accurate distance benchmarks */}
        <div className="mb-14">
          <div className="mb-8">
            <span className="text-xs font-black tracking-[0.2em] uppercase" style={{ color: '#c9972f' }}>
              Transit Options
            </span>
            <h2 className="mt-2 font-black text-2xl sm:text-3xl" style={{ color: '#0a2112' }}>
              Travel & Distance Matrix
            </h2>
            <p className="mt-2 text-sm" style={{ color: '#555' }}>
              Clear connectivity pathways from all major air, rail, and road transit terminals in the Chennai metropolitan area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Airport */}
            <div
              className="rounded-2xl p-7 border transition-all duration-300 hover:shadow-md flex flex-col justify-between"
              style={{ background: '#fff', borderColor: 'rgba(27,94,32,0.14)' }}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#0a2112' }}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#f5c518">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider" style={{ background: '#f5c518', color: '#0a2112' }}>
                    ~{location.airport.distance}
                  </span>
                </div>

                <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-1" style={{ color: '#c9972f' }}>
                  By Flight
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0a2112' }}>
                  {location.airport.name}
                </h3>
                <p className="text-xs font-semibold mb-4" style={{ color: '#1b5e20' }}>
                  Approx. {location.airport.time} drive via Vandalur-Kelambakkam Road
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#444' }}>
                  {location.airport.details}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <span className="text-xs font-semibold" style={{ color: '#666' }}>
                  Recommended: Prepaid Airport Taxi or App Cabs (Uber/Ola)
                </span>
              </div>
            </div>

            {/* Card 2: Railway Stations */}
            <div
              className="rounded-2xl p-7 border transition-all duration-300 hover:shadow-md flex flex-col justify-between"
              style={{ background: '#fff', borderColor: 'rgba(27,94,32,0.14)' }}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#0a2112' }}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#f5c518">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider" style={{ background: '#1b5e20', color: '#fff' }}>
                    Rail Hubs
                  </span>
                </div>

                <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-1" style={{ color: '#c9972f' }}>
                  By Train
                </div>
                <h3 className="font-bold text-lg mb-3" style={{ color: '#0a2112' }}>
                  Major Railway Terminals
                </h3>

                <ul className="space-y-3">
                  {location.railway.stations.map((stn, idx) => (
                    <li key={idx} className="text-xs leading-relaxed" style={{ color: '#444' }}>
                      <span className="font-bold block text-sm" style={{ color: '#1b5e20' }}>
                        {stn.name} &bull; {stn.distance}
                      </span>
                      {stn.details}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <span className="text-xs font-semibold" style={{ color: '#666' }}>
                  Tambaram (TBM) is the most convenient station for arriving teams.
                </span>
              </div>
            </div>

            {/* Card 3: Bus & Interstate Terminus */}
            <div
              className="rounded-2xl p-7 border transition-all duration-300 hover:shadow-md flex flex-col justify-between"
              style={{ background: '#fff', borderColor: 'rgba(27,94,32,0.14)' }}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#0a2112' }}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#f5c518">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider" style={{ background: '#f5c518', color: '#0a2112' }}>
                    ~{location.bus.distance}
                  </span>
                </div>

                <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-1" style={{ color: '#c9972f' }}>
                  By Bus & Road
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0a2112' }}>
                  {location.bus.hub}
                </h3>
                <p className="text-xs font-semibold mb-4" style={{ color: '#1b5e20' }}>
                  Direct interstate connection from all regions
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#444' }}>
                  {location.bus.routes}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <span className="text-xs font-semibold" style={{ color: '#666' }}>
                  MTC Bus Stop: &quot;Melakottaiyur / IIITDM&quot; right at main entrance
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ─── 3. INTERACTIVE MAP SECTION ────────────────────────────────── */}
        {/* Full-width interactive Google Maps embed with location context panel */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
            <div>
              <span className="text-xs font-black tracking-[0.2em] uppercase" style={{ color: '#c9972f' }}>
                Interactive Campus Locator
              </span>
              <h2 className="mt-2 font-black text-2xl sm:text-3xl" style={{ color: '#0a2112' }}>
                Campus Map & Navigation
              </h2>
            </div>
            
            {/* Direct Google Maps Action */}
            <a
              href={location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold transition-colors hover:underline"
              style={{ color: '#1b5e20' }}
            >
              Open in Google Maps App ↗
            </a>
          </div>

          <div
            className="rounded-3xl overflow-hidden border shadow-sm grid grid-cols-1 lg:grid-cols-3"
            style={{ background: '#fff', borderColor: 'rgba(27,94,32,0.15)' }}
          >
            {/* Interactive Map Iframe */}
            <div className="lg:col-span-2 relative min-h-[380px] sm:min-h-[460px] w-full bg-gray-100">
              <iframe
                title="IIITDM Kancheepuram Google Map"
                src={location.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Campus Facilities & Entry Guide Panel */}
            <div className="p-8 flex flex-col justify-between" style={{ background: '#faf6ee' }}>
              <div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: '#c9972f' }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: '#1b5e20' }} />
                  Campus Layout
                </div>
                <h3 className="font-black text-xl mb-4" style={{ color: '#0a2112' }}>
                  Sports Facilities Hub
                </h3>
                
                <p className="text-xs leading-relaxed mb-6" style={{ color: '#555' }}>
                  All sports arenas are centrally situated within the campus within short walking distance from student hostels.
                </p>

                <div className="space-y-3.5">
                  {[
                    { icon: '🏟️', name: 'Main Athletic Ground', desc: 'Synthetic running track, field events & football stadium' },
                    { icon: '🏀', name: 'Indoor Sports Arena', desc: 'Badminton courts, table tennis & basketball complex' },
                    { icon: '🎾', name: 'Outdoor Courts', desc: 'Floodlit lawn tennis and volleyball arenas' },
                    { icon: '🏊', name: 'Aquatics Complex', desc: 'Olympic-size competition swimming pool' },
                    { icon: '🏏', name: 'Cricket Arena', desc: 'Full turf pitch with practice net facilities' },
                  ].map((facility, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-base shrink-0">{facility.icon}</span>
                      <div>
                        <div className="text-xs font-bold" style={{ color: '#0a2112' }}>{facility.name}</div>
                        <div className="text-[11px]" style={{ color: '#777' }}>{facility.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contingent Arrival Notice */}
              <div
                className="mt-8 p-4 rounded-xl border text-xs"
                style={{ background: '#fff', borderColor: 'rgba(201,151,47,0.3)', color: '#444' }}
              >
                <div className="font-bold mb-1" style={{ color: '#1b5e20' }}>
                  ℹ️ Contingent Reporting Desk
                </div>
                Arriving IIIT teams must report directly to the Sports Council Desk located in the Admin Foyer for kit collection and room allocation.
              </div>
            </div>

          </div>
        </div>

        {/* ─── 4. LOCAL TIPS & CONTACT FOOTNOTE ──────────────────────────── */}
        <div
          className="rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: '#0a2112' }}
        >
          <div>
            <span className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: '#f5c518' }}>
              Support For Traveling Teams
            </span>
            <h3 className="mt-1 font-black text-2xl">Need Local Transport Assistance?</h3>
            <p className="mt-2 text-sm max-w-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Dedicated student volunteer transport marshals will be stationed at Tambaram Railway Station and Kilambakkam Bus Terminus during peak arrival hours (18–19 Dec 2026).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full text-sm font-bold transition-all hover:-translate-y-0.5"
              style={{ background: '#f5c518', color: '#0a2112' }}
            >
              Contact Sports Cell
            </Link>
            <a
              href="mailto:sports@iiitdm.ac.in"
              className="px-6 py-3 rounded-full text-sm font-bold border transition-all hover:bg-white/10"
              style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}
            >
              sports@iiitdm.ac.in
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
