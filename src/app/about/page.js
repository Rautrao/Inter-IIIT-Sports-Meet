import Image from 'next/image';
import { eventInfo } from '@/data/info';

export default function About() {
  return (
    <div style={{ background: '#faf6ee', minHeight: '100vh' }}>
      {/* Page header */}
      <div className="py-16 px-4" style={{ background: '#f0d574' }}>
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-black tracking-[0.25em] uppercase" style={{ color: '#000000' }}>
            Our Legacy
          </span>
          <h1 className="mt-3 font-black text-white" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
            About the Meet
          </h1>
          <div className="mt-3 w-12 h-1 rounded-full" style={{ background: '#000000' }} />
        </div>
      </div>

      {/* About content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-black text-3xl mb-6" style={{ color: '#0a2112' }}>
              History & <span style={{ color: '#1b5e20' }}>Legacy</span>
            </h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: '#3a3a3a' }}>
              {eventInfo.description}
            </p>
            <p className="text-base leading-relaxed mb-5" style={{ color: '#3a3a3a' }}>
              This unique sports event brings together elite athletes and teams, solidifying its position as a premier competition in the IIIT community. Celebrating a shared passion for sportsmanship and athleticism, Inter IIIT fosters lasting bonds and leaves an enduring mark on intercollegiate sports within the IIIT ecosystem.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {eventInfo.stats.map((stat, idx) => (
                <div key={idx} className="rounded-xl p-5 border" style={{ background: '#fff', borderColor: 'rgba(27,94,32,0.15)' }}>
                  <div className="font-black text-3xl" style={{ color: '#1b5e20' }}>{stat.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider mt-1" style={{ color: '#888' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <div className="relative w-full overflow-hidden rounded-2xl shadow-md" style={{ height: '280px' }}>
              <Image src="/assets/gallery/gallery-04.jpg" alt="Torch Relay" fill className="object-cover" />
            </div>
            <div className="relative w-full overflow-hidden rounded-2xl shadow-md" style={{ height: '200px' }}>
              <Image src="/assets/gallery/gallery-05.jpg" alt="Opening Ceremony" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Vision block */}
        <div className="mt-20 rounded-3xl overflow-hidden"
          style={{ background: '#0a2112' }}>
          <div className="grid md:grid-cols-2">
            <div className="p-12 md:p-16">
              <span className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: '#f5c518' }}>Vision</span>
              <h2 className="mt-3 font-black text-3xl text-white mb-5">Beyond the Field</h2>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Not just this, Inter IIIT transcends athletic competitions, fostering community through both Student and Employee Meets. These gatherings unite students, faculty, and staff, emphasizing active participation, teamwork, and friendly competition across disciplines.
              </p>
            </div>
            <div className="relative min-h-[280px] md:min-h-0 opacity-40">
              <Image src="/assets/gallery/gallery-06.jpg" alt="Beyond the field" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
