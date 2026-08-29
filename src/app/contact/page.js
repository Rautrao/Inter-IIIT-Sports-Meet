import SectionHeading from '@/components/SectionHeading';

export default function Contact() {
  return (
    <div className="bg-brand-surface min-h-screen">
      {/* Header Section */}
      <div className="bg-brand-dark py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-widest mb-6">
            Contact <span className="text-brand-accent">Us</span>
          </h1>
          <div className="w-24 h-1 bg-brand-highlight mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300 font-light leading-relaxed">
            "Got questions? We've got answers! Reach out and let's make magic happen together. Your thoughts matter, and so do you."
          </p>
        </div>
      </div>

      {/* Contact Info Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          
          {/* Phone */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-brand-accent hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mx-auto bg-brand-surface text-brand-primary rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-brand-dark mb-4 uppercase tracking-wider">Phone No.</h3>
            <div className="text-gray-600 text-sm space-y-4">
              <div>
                <strong className="block text-brand-primary mb-1">Overall Coordinator:</strong>
                +91 89192 54574 - Nimish Rajurkar
              </div>
              <div>
                <strong className="block text-brand-primary mb-1">Overall Coordinator:</strong>
                +91 8102863704 - Harsh
              </div>
              <div className="w-12 h-px bg-gray-200 mx-auto my-4"></div>
              <div>
                <strong className="block text-brand-primary mb-1">Sponsorship:</strong>
                +91 9407148751 - Vanshika Garg<br />
                +91 9398865783 - Kiran Sai Reddy
              </div>
              <div className="w-12 h-px bg-gray-200 mx-auto my-4"></div>
              <div>
                <strong className="block text-brand-primary mb-1">Public Relations:</strong>
                +91 9571107999 - Anant Sharma
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-brand-primary hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mx-auto bg-brand-surface text-brand-primary rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-brand-dark mb-4 uppercase tracking-wider">E-mail</h3>
            <a href="mailto:contact@interiiit.ac.in" className="text-brand-primary font-bold hover:text-brand-accent transition-colors">
              contact@interiiit.ac.in
            </a>
          </div>

          {/* Address */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-brand-accent hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mx-auto bg-brand-surface text-brand-primary rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-brand-dark mb-4 uppercase tracking-wider">Address</h3>
            <p className="text-gray-600">
              Host IIIT Campus<br />
              India
            </p>
          </div>

          {/* Dates */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-brand-primary hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mx-auto bg-brand-surface text-brand-primary rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-brand-dark mb-4 uppercase tracking-wider">Sports Meet Dates</h3>
            <p className="text-brand-primary font-bold">
              9th March 2026<br />to<br />15th March 2026
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
