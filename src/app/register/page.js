"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Register() {
  const [isLogin, setIsLogin] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#faf6ee' }}>
      {/* Left panel - branding */}
      <div className="hidden md:flex flex-col justify-between w-[42%] p-12 relative overflow-hidden"
        style={{ background: '#0a2112' }}>
        {/* background texture */}
        <div className="absolute inset-0 opacity-20">
          <Image src="/assets/hero/hero-placeholder.png" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,33,18,0.7) 0%, rgba(10,33,18,0.95) 100%)' }} />

        <div className="relative z-10">
          <div className="w-14 h-14 relative bg-white rounded-full p-1">
            <Image src="/assets/brand/inter-iiit-logo.png" alt="Logo" fill className="object-contain p-1" />
          </div>
        </div>

        <div className="relative z-10">
          <div className="text-xs font-black tracking-[0.2em] uppercase mb-3" style={{ color: '#f5c518' }}>
            9th Edition
          </div>
          <h2 className="font-black text-white text-3xl leading-tight mb-4">
            Inter-IIIT<br />Sports Meet<br />2026
          </h2>
          <div className="w-10 h-0.5 rounded-full mb-6" style={{ background: '#c9972f' }} />
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
            19–23 December 2026<br />
            IIITDM Kancheepuram, India
          </p>
        </div>

        <div className="relative z-10 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
          © 2026 Inter-IIIT Sports Meet
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          {submitted ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ background: '#1b5e20' }}>
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-black text-2xl mb-3" style={{ color: '#0a2112' }}>
                {isLogin ? 'Welcome back!' : 'You\'re registered!'}
              </h2>
              <p className="text-sm mb-8" style={{ color: '#666' }}>
                {isLogin ? 'You have successfully logged in.' : 'Welcome to the 9th Inter-IIIT Sports Meet 2026.'}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
                style={{ background: '#1b5e20', color: '#fff' }}>
                Go Back
              </button>
              <Link href="/" className="block mt-4 text-sm font-semibold" style={{ color: '#1b5e20' }}>
                Return to Home
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="font-black text-2xl" style={{ color: '#0a2112' }}>
                  {isLogin ? 'Sign in' : 'Create account'}
                </h1>
                <p className="text-sm mt-1.5" style={{ color: '#777' }}>
                  {isLogin ? 'Access your participant portal' : 'Register for Inter-IIIT Sports Meet 2026'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider mb-1.5" style={{ color: '#444' }}>
                    Username / IIIT ID
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    placeholder="e.g. 2021BCS001"
                    style={{
                      border: '1.5px solid rgba(27,94,32,0.2)',
                      background: '#fff',
                      color: '#0a2112',
                    }}
                    onFocus={e => { e.target.style.borderColor = '#1b5e20'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(27,94,32,0.2)'; }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider mb-1.5" style={{ color: '#444' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    placeholder="Enter your password"
                    style={{
                      border: '1.5px solid rgba(27,94,32,0.2)',
                      background: '#fff',
                      color: '#0a2112',
                    }}
                    onFocus={e => { e.target.style.borderColor = '#1b5e20'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(27,94,32,0.2)'; }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-black text-sm tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-md mt-2"
                  style={{ background: '#f5c518', color: '#0a2112' }}>
                  {isLogin ? 'Sign In →' : 'Register Now →'}
                </button>
              </form>

              <div className="mt-7 text-center text-sm" style={{ color: '#888' }}>
                {isLogin ? "Don't have an account? " : "Already registered? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-bold transition-colors"
                  style={{ color: '#1b5e20' }}>
                  {isLogin ? 'Register' : 'Sign in'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
