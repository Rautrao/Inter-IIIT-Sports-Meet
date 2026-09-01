import SectionHeading from '@/components/SectionHeading';
import { sports } from '@/data/sports';
import Image from 'next/image';

export default function Events() {
  return (
    <div style={{ background: '#faf6ee', minHeight: '100vh' }}>
      {/* Page header */}
      <div className="py-16 px-4" style={{ background: '#f0d574' }}>
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-black tracking-[0.25em] uppercase" style={{ color: '#000000' }}>
            9th Inter-IIIT Sports Meet · 2026
          </span>
          <h1 className="mt-3 font-black text-white" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
            Sporting Events
          </h1>
          <div className="mt-3 w-12 h-1 rounded-full" style={{ background: '#040404' }} />
          <p className="mt-4 text-sm max-w-xl" style={{ color: 'rgba(12, 12, 12, 0.6)' }}>
            {sports.length} competitive disciplines testing speed, skill, strength, and strategy.
          </p>
        </div>
      </div>

      {/* Events grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sports.map((sport, idx) => (
            <div key={idx}
              className="group relative overflow-hidden rounded-xl cursor-pointer"
              style={{ height: '220px' }}>
              {/* Natural image - no green tint */}
              <Image
                src={sport.image}
                alt={sport.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Subtle dark gradient for readability only */}
              <div className="absolute inset-0 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, rgba(10,20,10,0.82) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }} />

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-black text-white text-base leading-tight">{sport.name}</h3>
                <div className="mt-1.5 h-0.5 w-6 rounded-full transition-all duration-300 group-hover:w-12"
                  style={{ background: '#f5c518' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
