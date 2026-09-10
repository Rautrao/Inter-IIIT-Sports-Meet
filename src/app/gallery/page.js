import Image from 'next/image';
import { gallery } from '@/data/gallery';
import Link from 'next/link';

export default function Gallery() {
  const featured = gallery[0];
  const rest = gallery.slice(1);

  return (
    <div style={{ background: '#faf6ee', minHeight: '100vh' }}>
      {/* Page header */}
      <div className="green-page-header py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="page-eyebrow text-xs font-black tracking-[0.25em] uppercase">
            Glimpses of Glory
          </span>
          <h1 className="mt-3 font-black" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#0a2112' }}>
            Gallery
          </h1>
          <div className="page-rule mt-3 w-12 h-1 rounded-full" />
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            A visual collection of the energy, teamwork, and unforgettable moments behind the Inter-IIIT Sports Meet.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Featured image */}
        <div className="relative w-full overflow-hidden rounded-2xl mb-4 group h-[260px] sm:h-[420px]">
          <Image
            src={featured}
            alt="Gallery featured"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,33,18,0.5) 0%, transparent 50%)' }} />
        </div>

        {/* Remaining grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {rest.map((img, idx) => (
            <div key={idx}
              className={`relative overflow-hidden rounded-xl group h-[140px] sm:h-[200px] ${idx === 0 ? 'md:col-span-2' : ''}`}>
              <Image
                src={img}
                alt={`Gallery image ${idx + 2}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'rgba(10,33,18,0.3)' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
