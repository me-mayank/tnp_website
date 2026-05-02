'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileInsightsOpen, setMobileInsightsOpen] = useState(false);
  const [mobileRecruiterOpen, setMobileRecruiterOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileInsightsOpen(false);
    setMobileRecruiterOpen(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-4 mb-2 sticky top-4 z-[100] pointer-events-none">
        <header id="top" className={`mx-auto max-w-7xl pointer-events-auto backdrop-blur-xl bg-white/80 border border-white/50 shadow-xl shadow-brand-900/5 transition-all duration-300 ${mobileMenuOpen ? 'rounded-3xl' : 'rounded-full'}`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 sm:py-3">
            <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
              <div className="bg-white p-1 rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                <Image
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  src="/images/logo.png"
                  alt="ietlogo"
                  width={48}
                  height={48}
                  sizes="(max-width: 640px) 40px, 48px"
                  priority
                />
              </div>
              <div className="min-w-0">
                <div className="sm:text-xl text-sm font-extrabold text-brand-800 tracking-tight">Training & Placement Cell</div>
                <div className="text-[9px] sm:text-[11px] font-medium text-brand-accent uppercase tracking-wider">Institute of Engineering & Technology, Lucknow</div>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold relative">
              <Link href="/tpc/aboutus" className="text-brand-900/70 hover:text-brand-accent transition-colors">
                About Us
              </Link>

              {/* INSIGHTS DROPDOWN */}
              <div className="relative group">
                <button className="inline-flex items-center gap-1.5 text-brand-900/70 hover:text-brand-accent transition-colors">
                  INSIGHTS
                  <svg className="w-4 h-4 text-brand-900/40 group-hover:text-brand-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="absolute left-1/2 -translate-x-1/2 mt-4 w-[280px] bg-white/95 backdrop-blur-md border border-white shadow-2xl rounded-2xl z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="absolute inset-x-0 -top-4 h-4 bg-transparent"></div>
                  <div className="p-2 space-y-1">
                    <Link href="/insights/aboutiet" className="block px-4 py-2.5 hover:bg-brand-50 rounded-xl text-sm text-brand-800 font-medium transition-colors">
                      ABOUT IET
                    </Link>
                    <Link href="/insights/message" className="block px-4 py-2.5 hover:bg-brand-50 rounded-xl text-sm text-brand-800 font-medium transition-colors">
                      MESSAGE
                    </Link>
                    <Link href="/insights/recruiters" className="block px-4 py-2.5 hover:bg-brand-50 rounded-xl text-sm text-brand-800 font-medium transition-colors">
                      PAST RECRUITERS
                    </Link>
                  </div>
                </div>
              </div>

              {/* RECRUITER DROPDOWN */}
              <div className="relative group">
                <button className="inline-flex items-center gap-1.5 text-brand-900/70 hover:text-brand-accent transition-colors">
                  FOR RECRUITER
                  <svg className="w-4 h-4 text-brand-900/40 group-hover:text-brand-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="absolute left-1/2 -translate-x-1/2 mt-4 w-[340px] bg-white/95 backdrop-blur-md border border-white shadow-2xl rounded-2xl z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="absolute inset-x-0 -top-4 h-4 bg-transparent"></div>
                  <div className="p-2 space-y-1">
                    <Link href="/recruiters/invitation" className="block px-4 py-2.5 hover:bg-brand-50 rounded-xl text-sm text-brand-800 font-medium transition-colors">
                      INVITATION
                    </Link>
                    <Link href="/recruiters/procedure" className="block px-4 py-2.5 hover:bg-brand-50 rounded-xl text-sm text-brand-800 font-medium transition-colors">
                      PROCEDURE
                    </Link>
                    <Link href="/recruiters/contactform" className="block px-4 py-2.5 hover:bg-brand-50 rounded-xl text-sm text-brand-800 font-medium transition-colors">
                      COMPANY CONTACT FORM
                    </Link>
                    <Link href="/recruiters/demographic" className="block px-4 py-2.5 hover:bg-brand-50 rounded-xl text-sm text-brand-800 font-medium transition-colors">
                      STATISTICS
                    </Link>

                    <div className="pt-3 pb-1 mt-2 border-t border-gray-100">
                      <div className="text-[10px] font-bold tracking-widest text-brand-accent/60 mb-2 px-4 uppercase">Downloads</div>
                      <a href="/files/Placement_Brouchure_2025-26.pdf" className="block px-4 py-2 hover:bg-brand-50 rounded-xl text-sm text-brand-700 transition-colors">
                        Placement Brochure
                      </a>
                      <a href="/files/JNF_IET_Lucknow_2025-26.docx" className="block px-4 py-2 hover:bg-brand-50 rounded-xl text-sm text-brand-700 transition-colors">
                        Job Notification Form
                      </a>
                      <a href="/files/Company_Guidlines_21-22.pdf" className="block px-4 py-2 hover:bg-brand-50 rounded-xl text-sm text-brand-700 transition-colors">
                        Company Guidelines
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/gallery" className="text-brand-900/70 hover:text-brand-accent transition-colors">
                Gallery
              </Link>
              <Link href="/downloads" className="text-brand-900/70 hover:text-brand-accent transition-colors">
                Downloads
              </Link>
              <Link href="/tpc/contactus" className="ml-2 bg-gradient-to-r from-brand-700 to-brand-800 hover:from-brand-600 hover:to-brand-700 text-white px-6 py-2.5 rounded-full shadow-lg shadow-brand-800/20 transform hover:-translate-y-0.5 transition-all">
                Contact Us
              </Link>
            </nav>

            {/* MOBILE BUTTON */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-full text-brand-800 bg-brand-50 hover:bg-brand-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-auto max-w-7xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white/50 pointer-events-auto rounded-3xl overflow-hidden">
          <div className="px-6 py-4 space-y-3">
            <Link href="/tpc/aboutus" className="block py-2 text-brand-800 font-bold hover:text-brand-accent transition-colors" onClick={closeMobileMenu}>
              About
            </Link>

            {/* Insights */}
            <div className="border-t border-gray-100 pt-2">
              <button
                onClick={() => setMobileInsightsOpen(!mobileInsightsOpen)}
                className="w-full flex items-center justify-between py-2 text-brand-800 font-bold hover:text-brand-accent transition-colors"
              >
                Insights
                <svg className={`w-4 h-4 transition-transform ${mobileInsightsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {mobileInsightsOpen && (
                <div className="pl-4 mt-2 space-y-1 border-l-2 border-brand-50 ml-2">
                  <Link href="/insights/aboutiet" className="block py-2 text-muted hover:text-brand-800 transition-colors font-medium text-sm" onClick={closeMobileMenu}>
                    About IET
                  </Link>
                  <Link href="/insights/message" className="block py-2 text-muted hover:text-brand-800 transition-colors font-medium text-sm" onClick={closeMobileMenu}>
                    Message
                  </Link>
                  <Link href="/insights/recruiters" className="block py-2 text-muted hover:text-brand-800 transition-colors font-medium text-sm" onClick={closeMobileMenu}>
                    Past Recruiters
                  </Link>
                </div>
              )}
            </div>

            {/* Recruiter */}
            <div className="border-t border-gray-100 pt-2">
              <button
                onClick={() => setMobileRecruiterOpen(!mobileRecruiterOpen)}
                className="w-full flex items-center justify-between py-2 text-brand-800 font-bold hover:text-brand-accent transition-colors"
              >
                For Recruiter
                <svg className={`w-4 h-4 transition-transform ${mobileRecruiterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {mobileRecruiterOpen && (
                <div className="pl-4 mt-2 space-y-1 border-l-2 border-brand-50 ml-2">
                  <Link href="/recruiters/invitation" className="block py-2 text-muted hover:text-brand-800 transition-colors font-medium text-sm" onClick={closeMobileMenu}>
                    Invitation
                  </Link>
                  <Link href="/recruiters/procedure" className="block py-2 text-muted hover:text-brand-800 transition-colors font-medium text-sm" onClick={closeMobileMenu}>
                    Procedure
                  </Link>
                  <Link href="/recruiters/contactform" className="block py-2 text-muted hover:text-brand-800 transition-colors font-medium text-sm" onClick={closeMobileMenu}>
                    Company Contact Form
                  </Link>
                  <Link href="/recruiters/demographic" className="block py-2 text-muted hover:text-brand-800 transition-colors font-medium text-sm" onClick={closeMobileMenu}>
                    Statistics
                  </Link>
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 pt-2">
              <Link href="/gallery" className="block py-2 text-brand-800 font-bold hover:text-brand-accent transition-colors" onClick={closeMobileMenu}>
                Gallery
              </Link>
              <Link href="/downloads" className="block py-2 text-brand-800 font-bold hover:text-brand-accent transition-colors" onClick={closeMobileMenu}>
                Downloads
              </Link>
            </div>
            
            <div className="pt-2">
              <Link
                href="/tpc/contactus"
                className="block bg-gradient-to-r from-brand-700 to-brand-800 text-white px-4 py-3 rounded-xl text-center font-bold shadow-lg shadow-brand-800/20 active:scale-95 transition-all"
                onClick={closeMobileMenu}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
