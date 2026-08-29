import Link from 'next/link';
import Image from 'next/image';
import PlaceholderImage from '@/components/PlaceholderImage';
import SectionHeading from '@/components/SectionHeading';
import { eventInfo } from '@/data/info';
import { iiits } from '@/data/iiits';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center bg-brand-highlight overflow-hidden">
        {/* Background Decorative Elements - Strong Yellow & Green */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-highlight via-brand-highlight/90 to-brand-primary/90 z-10"></div>
          <div className="absolute right-0 top-0 w-1/2 h-full bg-brand-primary skew-x-12 transform origin-top-right shadow-2xl"></div>
          <Image src="/assets/hero/hero-placeholder.png" alt="Hero Background" fill className="object-cover opacity-20 mix-blend-overlay" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1.5 rounded-full bg-brand-primary border border-brand-primary/50 text-white font-bold tracking-wider text-sm mb-6 uppercase shadow-md">
              Hosted by {eventInfo.host}
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-brand-dark leading-[1.1] tracking-tight mb-6 uppercase">
              {eventInfo.name.split(' Inter-IIIT ')[0]} <br />
              <span className="text-white drop-shadow-md">
                Inter-IIIT Sports Meet
              </span>
            </h1>
            <p className="text-xl md:text-3xl font-bold text-brand-dark mb-8 border-l-4 border-white pl-4">
              {eventInfo.dates}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/register" 
                className="px-8 py-3.5 bg-brand-dark hover:bg-brand-primary text-white font-bold rounded-full transition-all shadow-lg transform hover:-translate-y-1"
              >
                Register Now
              </Link>
              <Link 
                href="/events" 
                className="px-8 py-3.5 bg-white/20 hover:bg-white/30 text-brand-dark font-bold border border-brand-dark/30 rounded-full transition-all backdrop-blur-md hover:border-brand-dark"
              >
                View Events
              </Link>
            </div>
          </div>
        </div>

        {/* Scrolling Ticker */}
        <div className="absolute bottom-0 w-full bg-brand-dark backdrop-blur-md border-y border-white/10 py-3 overflow-hidden z-20">
          <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="text-white font-bold tracking-widest uppercase mx-8 text-sm flex items-center gap-4">
                {eventInfo.dates} 
                <svg className="w-3 h-3 text-brand-highlight" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3.7 8.3L24 9l-6 5.8 1.4 8.2L12 19.3l-7.4 3.7L6 14.8 0 9l8.3-.7z"/></svg>
                {eventInfo.host}
                <svg className="w-3 h-3 text-brand-highlight" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3.7 8.3L24 9l-6 5.8 1.4 8.2L12 19.3l-7.4 3.7L6 14.8 0 9l8.3-.7z"/></svg>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100 relative z-30 -mt-8 mx-4 sm:mx-8 rounded-2xl shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {eventInfo.stats.map((stat, idx) => (
              <div key={idx} className="p-4">
                <div className="text-4xl md:text-5xl font-black text-brand-primary mb-2">{stat.value}</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-brand-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8 text-left">
                <h2 className="text-4xl md:text-5xl font-black text-brand-primary uppercase tracking-tight relative inline-block italic">
                  ABOUT
                  <div className="absolute -bottom-2 left-0 h-1 bg-brand-accent w-16"></div>
                </h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {eventInfo.description}
              </p>
              <Link href="/about" className="text-brand-primary font-bold hover:text-brand-accent flex items-center gap-2 group transition-colors">
                Read More 
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-brand-accent transform translate-x-4 translate-y-4 rounded-2xl"></div>
              <div className="relative w-full h-80 rounded-2xl shadow-xl z-10 overflow-hidden">
                 <Image src="/assets/gallery/gallery-01.jpg" alt="About" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Participating IIITs */}
      <section className="py-24 bg-gradient-to-b from-brand-secondary/10 to-brand-surface relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Participating IIITs" subtitle={`${eventInfo.stats.find(s => s.label === 'Participating IIITs')?.value || '25'} Institutions. 1 Champion.`} />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8 mt-12">
            {iiits.map((iiit, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-brand-primary/10 hover:shadow-md hover:border-brand-accent/50 transition-all group flex flex-col items-center text-center">
                <div className="w-20 h-20 mb-4 rounded-full overflow-hidden bg-brand-surface border-2 border-transparent group-hover:border-brand-accent transition-colors flex items-center justify-center relative p-2">
                   <Image src={iiit.logo} alt={iiit.name} fill className="object-contain p-2" />
                </div>
                <h3 className="font-bold text-brand-dark text-sm leading-tight group-hover:text-brand-primary transition-colors">{iiit.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Students' & Employees' Meet */}
      <section className="py-0 flex flex-col md:flex-row w-full">
        <div className="flex-1 bg-brand-dark text-white p-12 md:p-24 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
            <Image src="/assets/gallery/gallery-02.jpg" alt="Students Meet" fill className="object-cover" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic mb-6">STUDENTS' MEET</h2>
            <div className="inline-block px-4 py-1 bg-brand-primary text-white font-bold rounded text-sm mb-6">{eventInfo.dates}</div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
              The upcoming student's sports meet promises an exhilarating fest, featuring over 15 events that will showcase the athletic prowess of more than 2000 participants. Among them, contingents of spirited IIIT students will passionately compete.
            </p>
          </div>
        </div>
        
        <div className="flex-1 bg-brand-primary text-white p-12 md:p-24 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
            <Image src="/assets/gallery/gallery-03.jpg" alt="Employees Meet" fill className="object-cover" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic mb-6">EMPLOYEES' MEET</h2>
            <div className="inline-block px-4 py-1 bg-brand-dark text-brand-highlight font-bold rounded text-sm mb-6">{eventInfo.dates}</div>
            <p className="text-gray-100 text-lg leading-relaxed max-w-xl">
              Not just this, Inter IIIT transcends athletic competitions, fostering community through Employee Meets. These gatherings unite faculty and staff, emphasizing active participation, teamwork, and friendly competition.
            </p>
          </div>
        </div>
      </section>

      {/* Sponsor Us */}
      <section className="py-24 bg-brand-surface relative overflow-hidden">
        <div className="absolute -right-64 -top-64 w-[800px] h-[800px] bg-brand-secondary/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-brand-primary uppercase tracking-tight italic mb-8 relative inline-block">
                SPONSOR US
                <div className="absolute -bottom-2 left-0 h-1 bg-brand-accent w-24"></div>
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                This year marks the exciting transition to Inter-IIIT 2026, where {eventInfo.host} takes the helm. Inter-IIIT continues to unite top players and teams from different IIITs, transforming the sports field into a stage for spirited competition and camaraderie.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1">
                  <h4 className="font-bold text-brand-dark mb-2">Get in Touch</h4>
                  <p className="text-gray-600 text-sm">For sponsorship inquiries, please contact us at:</p>
                  <p className="text-brand-primary font-bold mt-2">sports@iiitdm.ac.in</p>
                </div>
              </div>

              <button className="px-8 py-3.5 bg-brand-dark hover:bg-brand-primary text-white font-bold rounded-full transition-all shadow-lg transform hover:-translate-y-1">
                Download Brochure
              </button>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative w-full max-w-md">
                 <div className="grid grid-cols-2 gap-4">
                   {[1, 2, 3, 4].map(num => (
                     <div key={num} className="bg-white rounded-xl shadow-md p-4 flex items-center justify-center h-24 relative">
                       <Image src={`/assets/sponsors/sponsor-0${num}.png`} alt={`Sponsor ${num}`} fill className="object-contain p-4" />
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Marquee CSS for tailwind */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
}
