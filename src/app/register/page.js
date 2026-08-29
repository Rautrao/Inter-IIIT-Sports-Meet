"use client";

import { useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import Link from 'next/link';

export default function Register() {
  const [isLogin, setIsLogin] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-24 bg-brand-surface min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        {submitted ? (
          <div className="bg-white p-8 rounded-3xl shadow-2xl text-center border-t-8 border-brand-primary">
            <div className="w-20 h-20 bg-brand-surface rounded-full flex items-center justify-center mx-auto mb-6 text-brand-primary">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-brand-dark mb-4">Success!</h2>
            <p className="text-gray-600 mb-8">
              {isLogin ? "You have successfully logged in to the portal." : "Your registration was successful. Welcome to the Inter IIIT 2026 portal."}
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="px-8 py-3 bg-brand-primary text-white font-bold rounded-full hover:bg-brand-dark transition-colors w-full"
            >
              Go Back
            </button>
            <div className="mt-4">
              <Link href="/" className="text-brand-primary font-medium hover:underline">
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-brand-accent">
                <span className="text-brand-accent font-bold text-xl">IIIT</span>
              </div>
              <h1 className="text-2xl font-black text-brand-dark uppercase tracking-tight">
                {isLogin ? "Welcome Back" : "Join The Meet"}
              </h1>
              <p className="text-gray-500 text-sm mt-2">
                {isLogin ? "Log in to your participant portal" : "Register for the 9th Inter IIIT Sports Meet"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-brand-dark mb-1">Username / ID</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder="Enter your IIIT ID"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-dark mb-1">Password</label>
                <input 
                  type="password" 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder="Enter your password"
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full py-3.5 bg-brand-accent hover:bg-brand-highlight text-brand-dark font-bold rounded-xl transition-colors shadow-lg mt-4"
              >
                {isLogin ? "Log In" : "Register Now"}
              </button>
            </form>

            <div className="mt-8 text-center border-t border-gray-100 pt-6">
              <p className="text-gray-600 text-sm">
                {isLogin ? "Don't have an account?" : "Already registered?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-brand-primary font-bold hover:text-brand-dark transition-colors"
                >
                  {isLogin ? "Register" : "Log In"}
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
