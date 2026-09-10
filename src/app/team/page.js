const teamSections = [
  {
    title: "Our Patron",
    members: [{ name: "Prof. Example Name", role: "Director, IIITDM Kancheepuram", initial: "P" }]
  },
  {
    title: "Advisory / Monitoring Committee",
    members: [
      { name: "Prof. ABC", role: "Dean (R&D)", initial: "A" },
      { name: "Prof. XYZ", role: "Dean (Academics)", initial: "X" },
      { name: "Dr. DEF", role: "Dean (Student Affairs)", initial: "D" },
      { name: "Dr. PQR", role: "Registrar", initial: "P" }
    ]
  },
  {
    title: "Employee Core Team",
    members: [
      { name: "Dr. John Doe", role: "Chairman, Finance", initial: "J" },
      { name: "Dr. Jane Smith", role: "Chairman, Security", initial: "J" },
      { name: "Mr. Alan Wake", role: "Accommodation & Food", initial: "A" },
      { name: "Mrs. Sarah Connor", role: "Web & App Ops", initial: "S" }
    ]
  },
  {
    title: "Student Core Team",
    members: [
      { name: "Alex Johnson", role: "President, Gymkhana", initial: "A" },
      { name: "Sam Wilson", role: "Sports Secretary", initial: "S" },
      { name: "Taylor Swift", role: "General Secretary", initial: "T" }
    ]
  }
];

export default function Team() {
  return (
    <div style={{ background: '#faf6ee', minHeight: '100vh' }}>
      {/* Page header */}
      <div className="green-page-header py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="page-eyebrow text-xs font-black tracking-[0.25em] uppercase">
            The People Behind It
          </span>
          <h1 className="mt-3 font-black" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#0a2112' }}>
            Meet the Team
          </h1>
          <div className="page-rule mt-3 w-12 h-1 rounded-full" />
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            Dedicated individuals working tirelessly to make the 9th Inter-IIIT Sports Meet a reality.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {teamSections.map((section, sIdx) => (
          <div key={sIdx}>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1" style={{ background: 'rgba(27,94,32,0.15)' }} />
              <h3 className="text-xs font-black uppercase tracking-[0.25em] px-4" style={{ color: '#c9972f' }}>
                {section.title}
              </h3>
              <div className="h-px flex-1" style={{ background: 'rgba(27,94,32,0.15)' }} />
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {section.members.map((member, mIdx) => (
                <div key={mIdx} className="text-center group" style={{ width: '180px' }}>
                  {/* Avatar */}
                  <div
                    className="dark-surface w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg"
                    style={{ background: '#1b5e20', border: '2px solid rgba(201,151,47,0.3)' }}>
                    <span className="font-black text-2xl" style={{ color: '#f5c518' }}>
                      {member.initial}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm" style={{ color: '#0a2112' }}>{member.name}</h4>
                  <p className="text-xs mt-0.5" style={{ color: '#888' }}>{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
