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
      <header id="top" className={`mx-auto max-w-7xl pointer-events-auto bg-white border border-brand-800/40 shadow-xl shadow-brand-900/5 transition-all duration-300 ${mobileMenuOpen ? 'rounded-3xl' : 'rounded-full'}`}>
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
              <Link href="/tpc/aboutus" className="text-brand-900/70 hover:text-brand-accent transition-colors nav-link-underline">
                About Us
              </Link>

              {/* INSIGHTS DROPDOWN */}
              <div className="relative group">
                <button className="inline-flex items-center gap-1.5 text-brand-900/70 hover:text-brand-accent transition-colors">
                  <span className="nav-link-underline uppercase">INSIGHTS</span>
                  <svg className="w-4 h-4 text-brand-900/40 group-hover:text-brand-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="absolute left-1/2 -translate-x-1/2 pt-4 w-[640px] z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="bg-white border-2 border-brand-accent/20 shadow-2xl rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-[1.4fr_1fr]">
                      {/* LEFT COLUMN: LINKS & DESCRIPTIONS */}
                      <div className="p-4 space-y-1 border-r border-gray-100">
                        <Link href="/insights/aboutiet" className="group/item block px-4 py-3 hover:bg-brand-50 rounded-xl transition-all duration-200">
                          <div className="text-sm text-brand-800 font-semibold uppercase tracking-wide group-hover/item:text-brand-accent transition-colors">About IET</div>
                          <div className="text-[11px] text-brand-accent/70 mt-1 leading-relaxed font-medium">Heritage, infrastructure, and academic excellence</div>
                        </Link>
                        <Link href="/insights/message" className="group/item block px-4 py-3 hover:bg-brand-50 rounded-xl transition-all duration-200">
                          <div className="text-sm text-brand-800 font-semibold uppercase tracking-wide group-hover/item:text-brand-accent transition-colors">Messages</div>
                          <div className="text-[11px] text-brand-accent/70 mt-1 leading-relaxed font-medium">Vision from our Director and T&P Cell</div>
                        </Link>
                        <Link href="/insights/recruiters" className="group/item block px-4 py-3 hover:bg-brand-50 rounded-xl transition-all duration-200">
                          <div className="text-sm text-brand-800 font-semibold uppercase tracking-wide group-hover/item:text-brand-accent transition-colors">Past Recruiters</div>
                          <div className="text-[11px] text-brand-accent/70 mt-1 leading-relaxed font-medium">Organizations that trust and hire our graduates</div>
                        </Link>
                        <Link href="/recruiters/demographic" className="group/item block px-4 py-3 hover:bg-brand-50 rounded-xl transition-all duration-200">
                          <div className="text-sm text-brand-800 font-semibold uppercase tracking-wide group-hover/item:text-brand-accent transition-colors">Statistics</div>
                          <div className="text-[11px] text-brand-accent/70 mt-1 leading-relaxed font-medium">Year-wise placement data and performance</div>
                        </Link>
                      </div>

                      {/* RIGHT COLUMN: STUDENT RESOURCES */}
                      <div className="bg-gray-50 p-4">
                        <div className="px-4 pt-2 pb-4 text-[10px] font-bold tracking-[0.2em] text-brand-accent/60 uppercase">Student Resources</div>
                        <div className="space-y-1">
                          <Link href="/downloads#departmental-brochures" className="block px-4 py-3 hover:bg-white hover:shadow-md rounded-xl text-sm text-brand-700 font-semibold transition-all duration-200">
                            Departmental Brochures
                          </Link>
                          <a href="/files/SUMMER_INTERNSHIP_NOC.pdf" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-white hover:shadow-md rounded-xl text-sm text-brand-700 font-semibold transition-all duration-200">
                            Training Form
                          </a>
                          <a href="/files/FINAL_SEMESTER_INTERNSHIP_NOC.pdf" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-white hover:shadow-md rounded-xl text-sm text-brand-700 font-semibold transition-all duration-200">
                            Internship NOC
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RECRUITER DROPDOWN */}
              <div className="relative group">
                <button className="inline-flex items-center gap-1.5 text-brand-900/70 hover:text-brand-accent transition-colors">
                  <span className="nav-link-underline uppercase">FOR RECRUITER</span>
                  <svg className="w-4 h-4 text-brand-900/40 group-hover:text-brand-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="absolute left-1/2 -translate-x-1/2 pt-4 w-[640px] z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="bg-white border-2 border-brand-accent/20 shadow-2xl rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-[1.4fr_1fr]">
                      {/* LEFT COLUMN: LINKS & DESCRIPTIONS */}
                      <div className="p-4 space-y-1 border-r border-gray-100">
                        <Link href="/recruiters/invitation" className="group/item block px-4 py-3 hover:bg-brand-50 rounded-xl transition-all duration-200">
                          <div className="text-sm text-brand-800 font-semibold uppercase tracking-wide group-hover/item:text-brand-accent transition-colors">Invitation</div>
                          <div className="text-[11px] text-brand-accent/70 mt-1 leading-relaxed font-medium">Campus recruitment invitation and overview</div>
                        </Link>
                        <Link href="/recruiters/procedure" className="group/item block px-4 py-3 hover:bg-brand-50 rounded-xl transition-all duration-200">
                          <div className="text-sm text-brand-800 font-semibold uppercase tracking-wide group-hover/item:text-brand-accent transition-colors">Procedure</div>
                          <div className="text-[11px] text-brand-accent/70 mt-1 leading-relaxed font-medium">Drive flow, schedules, and process details</div>
                        </Link>
                        <Link href="/recruiters/contactform" className="group/item block px-4 py-3 hover:bg-brand-50 rounded-xl transition-all duration-200">
                          <div className="text-sm text-brand-800 font-semibold uppercase tracking-wide group-hover/item:text-brand-accent transition-colors">Company Contact Form</div>
                          <div className="text-[11px] text-brand-accent/70 mt-1 leading-relaxed font-medium">Share requirements directly with the cell</div>
                        </Link>
                        <Link href="/recruiters/demographic" className="group/item block px-4 py-3 hover:bg-brand-50 rounded-xl transition-all duration-200">
                          <div className="text-sm text-brand-800 font-semibold uppercase tracking-wide group-hover/item:text-brand-accent transition-colors">Statistics</div>
                          <div className="text-[11px] text-brand-accent/70 mt-1 leading-relaxed font-medium">Placement data, demographics and performance</div>
                        </Link>
                      </div>

                      {/* RIGHT COLUMN: DOWNLOADS */}
                      <div className="bg-gray-50 p-4">
                        <div className="px-4 pt-2 pb-4 text-[10px] font-bold tracking-[0.2em] text-brand-accent/60 uppercase">Downloads</div>
                        <div className="space-y-1">
                          <a href="/files/Placement_Brouchure_2025-26.pdf" className="block px-4 py-3 hover:bg-white hover:shadow-md rounded-xl text-sm text-brand-700 font-semibold transition-all duration-200">
                            Placement Brochure
                          </a>
                          <a href="/files/JNF_IET_Lucknow_2025-26.docx" className="block px-4 py-3 hover:bg-white hover:shadow-md rounded-xl text-sm text-brand-700 font-semibold transition-all duration-200">
                            Job Notification Form
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/gallery" className="text-brand-900/70 hover:text-brand-accent transition-colors nav-link-underline">
                Gallery
              </Link>
              <Link href="/downloads" className="text-brand-900/70 hover:text-brand-accent transition-colors nav-link-underline">
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
        <div className="lg:hidden mt-2 mx-auto max-w-7xl bg-white shadow-2xl border border-white/50 pointer-events-auto rounded-3xl overflow-hidden">
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
                  <Link href="/recruiters/demographic" className="block py-2 text-muted hover:text-brand-800 transition-colors font-medium text-sm" onClick={closeMobileMenu}>
                    Statistics
                  </Link>

                  <div className="pt-2 pb-1 px-2 text-[10px] font-bold text-brand-accent/60 uppercase tracking-wider">Resources</div>
                  <Link href="/downloads#departmental-brochures" className="block py-2 text-muted hover:text-brand-800 transition-colors font-medium text-sm" onClick={closeMobileMenu}>
                    Departmental Brochures
                  </Link>
                  <a href="/files/SUMMER_INTERNSHIP_NOC.pdf" target="_blank" rel="noopener noreferrer" className="block py-2 text-muted hover:text-brand-800 transition-colors font-medium text-sm" onClick={closeMobileMenu}>
                    Training Form
                  </a>
                  <a href="/files/FINAL_SEMESTER_INTERNSHIP_NOC.pdf" target="_blank" rel="noopener noreferrer" className="block py-2 text-muted hover:text-brand-800 transition-colors font-medium text-sm" onClick={closeMobileMenu}>
                    Internship NOC
                  </a>
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
