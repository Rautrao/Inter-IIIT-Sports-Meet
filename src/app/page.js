import Link from 'next/link';
import PlaceholderImage from '@/components/PlaceholderImage';
import SectionHeading from '@/components/SectionHeading';

const participatingIIITs = [
  "IIIT Allahabad", "IIIT Gwalior", "IIITDM Kancheepuram", "IIITDM Jabalpur",
  "IIITDM Kurnool", "IIIT Chittoor", "IIIT Guwahati", "IIIT Kalyani",
  "IIIT Una", "IIIT Vadodara", "IIIT Kota", "IIIT Tiruchirappalli",
  "IIIT Kottayam", "IIIT Sonepat", "IIIT Manipur", "IIIT Lucknow",
  "IIIT Dharwad", "IIIT Ranchi", "IIIT Nagpur", "IIIT Pune",
  "IIIT Bhopal", "IIIT Surat", "IIIT Agartala", "IIIT Raichur", "IIIT Bhagalpur"
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center bg-brand-dark overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-primary/80 z-10"></div>
          <div className="absolute right-0 top-0 w-2/3 h-full bg-brand-secondary/20 skew-x-12 transform origin-top-right"></div>
          <PlaceholderImage text="" className="w-full h-full object-cover opacity-30" gradient="bg-brand-dark" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/20 border border-brand-accent/50 text-brand-highlight font-bold tracking-wider text-sm mb-6 uppercase backdrop-blur-sm">
              The 9th Edition
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6">
              INTER IIIT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-highlight to-brand-accent">
                SPORTS MEET
              </span>
            </h1>
            <p className="text-xl md:text-3xl font-light text-gray-200 mb-8 border-l-4 border-brand-highlight pl-4">
              9 - 15 MARCH, 2026
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/register" 
                className="px-8 py-3.5 bg-brand-accent hover:bg-brand-highlight text-brand-dark font-bold rounded-full transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(251,192,45,0.5)] transform hover:-translate-y-1"
              >
                Register Now
              </Link>
              <Link 
                href="/events" 
                className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold border border-white/30 rounded-full transition-all backdrop-blur-md"
              >
                View Events
              </Link>
            </div>
          </div>
        </div>

        {/* Scrolling Ticker */}
        <div className="absolute bottom-0 w-full bg-brand-primary/90 backdrop-blur-md border-y border-white/10 py-3 overflow-hidden z-20">
          <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="text-white font-bold tracking-widest uppercase mx-8 text-sm flex items-center gap-4">
                9 - 15 MARCH 2026 
                <svg className="w-3 h-3 text-brand-highlight" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3.7 8.3L24 9l-6 5.8 1.4 8.2L12 19.3l-7.4 3.7L6 14.8 0 9l8.3-.7z"/></svg>
                IIIT
                <svg className="w-3 h-3 text-brand-highlight" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l3.7 8.3L24 9l-6 5.8 1.4 8.2L12 19.3l-7.4 3.7L6 14.8 0 9l8.3-.7z"/></svg>
              </span>
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
                Inter IIIT, hosted once every four years, serves as a paramount display of unity and competition among the 25 government funded IIITs spread across the nation. 
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                This unique sports event brings together elite athletes and teams, solidifying its position as a premier competition in the IIIT community. Celebrating a shared passion for sportsmanship and athleticism, Inter IIIT fosters lasting bonds and leaves an enduring mark on intercollegiate sports within the IIIT ecosystem.
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
              <PlaceholderImage text="Event Torch Relay" className="w-full h-80 rounded-2xl shadow-xl relative z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Participating IIITs */}
      <section className="py-24 bg-gradient-to-b from-brand-secondary/10 to-brand-surface relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Participating IIITs" subtitle="25 Institutions. 1 Champion." />
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8 mt-12">
            {participatingIIITs.map((iiit, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-brand-primary/10 hover:shadow-md hover:border-brand-accent/50 transition-all group flex flex-col items-center text-center">
                <div className="w-20 h-20 mb-4 rounded-full overflow-hidden bg-brand-surface border-2 border-transparent group-hover:border-brand-accent transition-colors flex items-center justify-center p-2">
                   <div className="w-full h-full rounded-full bg-brand-primary/10 flex items-center justify-center font-bold text-brand-primary text-xs">
                     LOGO
                   </div>
                </div>
                <h3 className="font-bold text-brand-dark text-sm leading-tight group-hover:text-brand-primary transition-colors">{iiit}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Students' & Employees' Meet */}
      <section className="py-0 flex flex-col md:flex-row w-full">
        <div className="flex-1 bg-brand-dark text-white p-12 md:p-24 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
            <PlaceholderImage text="" gradient="bg-gradient-to-r from-brand-primary to-brand-dark" className="w-full h-full" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic mb-6">STUDENTS' MEET</h2>
            <div className="inline-block px-4 py-1 bg-brand-primary text-white font-bold rounded text-sm mb-6">9 - 12 March, 2026</div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
              The upcoming student's sports meet promises an exhilarating four-day fest, featuring over 15 events that will showcase the athletic prowess of more than 1200 participants. Among them, a contingent of 25 spirited IIIT students will passionately compete, adding a dynamic edge to the competitions.
            </p>
          </div>
        </div>
        
        <div className="flex-1 bg-brand-primary text-white p-12 md:p-24 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
            <PlaceholderImage text="" gradient="bg-gradient-to-l from-brand-secondary to-brand-primary" className="w-full h-full" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic mb-6">EMPLOYEES' MEET</h2>
            <div className="inline-block px-4 py-1 bg-brand-dark text-brand-highlight font-bold rounded text-sm mb-6">13 - 15 March, 2026</div>
            <p className="text-gray-100 text-lg leading-relaxed max-w-xl">
              Not just this, Inter IIIT transcends athletic competitions, fostering community through Employee Meets. These gatherings unite faculty and staff, emphasizing active participation, teamwork, and friendly competition. This gathering enables faculty and staff from diverse IIITs to engage in collaborative discussions.
            </p>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 rounded-2xl overflow-hidden shadow-2xl border-4 border-brand-surface">
               <PlaceholderImage text="Campus Map" className="w-full h-[400px]" gradient="bg-gradient-to-tr from-gray-200 to-gray-300 text-gray-600" />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tight italic mb-8 relative inline-block">
                LOCATION
                <div className="absolute -bottom-2 left-0 h-1 bg-brand-accent w-24"></div>
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                The hosting IIIT campus is well connected by air, rail and road to near by metros. Railway services to this city from all the mega cities of the country are excellent and quite comfortable.
              </p>
              <div className="flex items-center gap-4 text-brand-primary font-bold">
                <svg className="w-8 h-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Host IIIT Campus, India</span>
              </div>
            </div>
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
                This year marks the exciting transition to Inter-IIIT 2026, where the host team takes the helm. Inter-IIIT, a yearly tradition, continues to unite top players and teams from different IIITs, transforming the sports field into a stage for spirited competition and camaraderie.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1">
                  <h4 className="font-bold text-brand-dark mb-2">Student Coordinators</h4>
                  <p className="text-gray-600 text-sm">Vanshika Garg: +91 9407148751</p>
                  <p className="text-gray-600 text-sm">Kiran Sai Reddy: +91 9398865783</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1">
                  <h4 className="font-bold text-brand-dark mb-2">Faculty Advisors</h4>
                  <p className="text-gray-600 text-sm">Prof. Example Advisor</p>
                  <p className="text-gray-600 text-sm">Dr. Example Advisor</p>
                </div>
              </div>

              <button className="px-8 py-3.5 bg-brand-dark hover:bg-brand-primary text-white font-bold rounded-full transition-all shadow-lg transform hover:-translate-y-1">
                Download Brochure
              </button>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative w-full max-w-md aspect-square">
                 <PlaceholderImage text="Sponsor Graphics" className="w-full h-full rounded-full shadow-2xl" />
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
