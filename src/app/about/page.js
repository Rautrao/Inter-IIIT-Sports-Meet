import SectionHeading from '@/components/SectionHeading';
import PlaceholderImage from '@/components/PlaceholderImage';
import { eventInfo } from '@/data/info';

export default function About() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="About The Meet" 
          subtitle="A legacy of sportsmanship, unity, and excellence among the Indian Institutes of Information Technology."
          centered={true}
        />

        <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-brand-dark mb-4">Our History & Legacy</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              The {eventInfo.name}, hosted once every four years, serves as a paramount display of unity and competition among the government-funded IIITs spread across the nation. 
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              This unique sports event brings together elite athletes and teams, solidifying its position as a premier competition in the IIIT community. Celebrating a shared passion for sportsmanship and athleticism, Inter IIIT fosters lasting bonds and leaves an enduring mark on intercollegiate sports within the IIIT ecosystem.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-brand-surface p-6 rounded-xl border-l-4 border-brand-primary">
                <div className="text-4xl font-black text-brand-primary mb-2">
                  {eventInfo.stats.find(s => s.label === "Participating IIITs")?.value || "25+"}
                </div>
                <div className="text-sm font-bold text-gray-600 uppercase tracking-wider">Institutes</div>
              </div>
              <div className="bg-brand-surface p-6 rounded-xl border-l-4 border-brand-accent">
                <div className="text-4xl font-black text-brand-accent mb-2">
                  {eventInfo.stats.find(s => s.label === "Student-Athletes")?.value || "2000+"}
                </div>
                <div className="text-sm font-bold text-gray-600 uppercase tracking-wider">Athletes</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <PlaceholderImage text="Torch Relay" className="h-64 rounded-2xl" />
            <PlaceholderImage text="Opening Ceremony" className="h-64 rounded-2xl mt-12" />
          </div>
        </div>

        <div className="mt-24">
          <SectionHeading title="The Vision" centered={false} />
          <div className="bg-brand-dark text-white p-12 rounded-3xl relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary rounded-full filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10 max-w-3xl">
              <h4 className="text-2xl font-bold mb-4 text-brand-highlight">Beyond the Field</h4>
              <p className="text-lg text-gray-300 leading-relaxed">
                Not just this, Inter IIIT transcends athletic competitions, fostering community through both Student and Employee Meets. These gatherings unite students, faculty, and staff, emphasizing active participation, teamwork, and friendly competition. It enables participants from diverse IIITs to engage in collaborative discussions and share insights, creating a parallel camaraderie off the sports field.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
