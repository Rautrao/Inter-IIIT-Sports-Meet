import SectionHeading from '@/components/SectionHeading';
import PlaceholderImage from '@/components/PlaceholderImage';

const teamSections = [
  {
    title: "Our Patron",
    members: [{ name: "Prof. Example Name", role: "Director, Host IIIT" }]
  },
  {
    title: "Advisory / Monitoring Committee",
    members: [
      { name: "Prof. ABC", role: "Dean (R&D)" },
      { name: "Prof. XYZ", role: "Dean (Academics)" },
      { name: "Dr. DEF", role: "Dean (Student Affairs)" },
      { name: "Dr. PQR", role: "Registrar" }
    ]
  },
  {
    title: "Employee Core Team",
    members: [
      { name: "Dr. John Doe", role: "Chairman, Finance" },
      { name: "Dr. Jane Smith", role: "Chairman, Security" },
      { name: "Mr. Alan Wake", role: "Accomodation & Food" },
      { name: "Mrs. Sarah Connor", role: "Web & App Ops" }
    ]
  },
  {
    title: "Student Core Team",
    members: [
      { name: "Alex Johnson", role: "President, Gymkhana" },
      { name: "Sam Wilson", role: "Sports Secretary" },
      { name: "Taylor Swift", role: "General Secretary" }
    ]
  }
];

export default function Team() {
  return (
    <div className="py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-brand-dark mb-4 tracking-tight">
            Meet The <span className="text-brand-highlight">Team</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            The dedicated individuals working tirelessly behind the scenes to make this mega event a reality.
          </p>
        </div>

        <div className="space-y-24">
          {teamSections.map((section, sIdx) => (
            <section key={sIdx}>
              <h3 className="text-2xl font-bold text-center text-brand-primary mb-12 uppercase tracking-widest border-b border-brand-primary/20 pb-4 max-w-3xl mx-auto">
                {section.title}
              </h3>
              <div className="flex flex-wrap justify-center gap-8">
                {section.members.map((member, mIdx) => (
                  <div key={mIdx} className="w-64 text-center group">
                    <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden mb-6 shadow-md group-hover:shadow-xl group-hover:-translate-y-2 transition-all border-4 border-transparent group-hover:border-brand-accent">
                      <PlaceholderImage text="Photo" className="w-full h-full" gradient="bg-gradient-to-b from-gray-200 to-gray-300 text-gray-500" />
                    </div>
                    <h4 className="font-bold text-lg text-brand-dark group-hover:text-brand-primary transition-colors">{member.name}</h4>
                    <p className="text-sm text-brand-secondary font-medium mt-1">{member.role}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
