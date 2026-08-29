import Link from 'next/link';
import Image from 'next/image';
import { eventInfo } from '@/data/info';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-brand-dark/95 backdrop-blur-md border-b border-brand-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 relative flex items-center justify-center group-hover:scale-105 transition-transform bg-white rounded-full p-1 border-2 border-brand-accent">
                <Image src="/assets/brand/inter-iiit-logo.png" alt="Inter-IIIT Logo" fill className="object-contain p-1" />
              </div>
              <div className="hidden sm:block">
                <div className="text-white font-bold text-xl leading-tight tracking-wide">
                  INTER IIIT
                </div>
                <div className="text-brand-accent font-medium text-xs tracking-[0.2em] uppercase">
                  {eventInfo.shortName}
                </div>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/events">Events</NavLink>
            <NavLink href="/team">Team</NavLink>
            <NavLink href="/gallery">Gallery</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/register" 
              className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-brand-dark bg-brand-accent hover:bg-brand-highlight rounded-full transition-colors shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            >
              REGISTER
            </Link>
            
            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-brand-primary transition-colors focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }) {
  return (
    <Link 
      href={href} 
      className="px-3 py-2 text-sm font-medium text-gray-200 hover:text-brand-highlight hover:bg-brand-primary/50 rounded-md transition-all relative group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-highlight scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
    </Link>
  );
}
