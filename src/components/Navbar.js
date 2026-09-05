'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { eventInfo } from '@/data/info';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/events', label: 'Events' },
    { href: '/team', label: 'Team' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full" style={{ background: 'rgba(10,33,18,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[68px]">

          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-11 h-11 relative shrink-0 overflow-hidden rounded-xl">
              <Image src="/assets/brand/inter-iiit-logo.png" alt="Inter-IIIT" fill unoptimized className="object-contain" />
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="text-white font-black text-base tracking-wide">INTER IIIT</div>
              <div className="text-amber-400 font-semibold text-[10px] tracking-[0.18em] uppercase opacity-90">Sports Meet 2026</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-3.5 py-2 text-[13px] font-semibold tracking-wide rounded-md transition-all duration-200 ${
                    active
                      ? 'text-amber-400'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {label}
                  {active && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-amber-400" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/register"
              className="hidden md:inline-flex items-center px-5 py-2 text-[13px] font-bold text-brand-dark bg-brand-highlight hover:bg-amber-300 rounded-full transition-colors shadow-sm"
            >
              Register
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-dark border-t border-white/5 px-4 py-4 space-y-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                pathname === href
                  ? 'bg-brand-primary/40 text-amber-400'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/register"
            onClick={() => setMobileOpen(false)}
            className="block mt-3 px-4 py-3 text-center text-sm font-bold text-brand-dark bg-brand-highlight hover:bg-amber-300 rounded-full transition-colors"
          >
            Register Now
          </Link>
        </div>
      )}
    </nav>
  );
}
