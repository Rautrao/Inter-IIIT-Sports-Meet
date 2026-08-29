import SectionHeading from '@/components/SectionHeading';
import PlaceholderImage from '@/components/PlaceholderImage';
import { sports } from '@/data/sports';

const categories = ["All", "Aquatics", "Athletics", "Powerlifting"];

export default function Events() {
  return (
    <div className="py-24 bg-brand-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Events" 
          subtitle="16 competitive events testing strength, endurance, and strategy."
        />

        {/* Filters - Static prototype */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat, idx) => (
            <button 
              key={idx}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                idx === 0 
                  ? 'bg-brand-primary text-white shadow-md' 
                  : 'bg-white text-brand-dark hover:bg-brand-secondary/10 border border-brand-primary/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sports.map((sport, idx) => (
            <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all h-64 bg-brand-dark cursor-pointer transform hover:-translate-y-1">
              <div className="absolute inset-0 opacity-40 group-hover:opacity-20 transition-opacity">
                 <PlaceholderImage text={sport.name} gradient="bg-gradient-to-tr from-brand-dark to-brand-primary" className="w-full h-full" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent"></div>
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-highlight transition-colors">{sport.name}</h3>
                <div className="flex items-center gap-2 text-brand-accent text-sm font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  <span>View Details</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
