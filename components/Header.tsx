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
    <header id="top" className="sticky top-0 z-50 backdrop-blur bg-white/90 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-1">
          <Link href="/" className="flex items-center gap-3 sm:gap-3">
            <div>
              <Image
                className="w-10 h-10 sm:w-20 sm:h-20"
                src="/images/logo.png"
                alt="ietlogo"
                width={80}
                height={80}
                sizes="(max-width: 640px) 40px, 80px"
                priority
              />
            </div>
            <div className="min-w-0">
              <div className="sm:text-2xl text-xs font-extrabold text-brand-800">Training & Placement Cell</div>
              <div className="text-[10px] sm:text-sm text-muted">Institute of Engineering & Technology, Lucknow</div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium relative">
            <Link href="/tpc/aboutus" className="text-muted hover:text-brand-800 transition-colors">
              About Us
            </Link>

            {/* INSIGHTS DROPDOWN */}
            <div className="relative group  ">
              <button className="inline-flex items-center gap-2 text-muted hover:text-brand-800 transition">
                INSIGHTS
                <svg className="w-3 h-3 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute left-1/2 -translate-x-1/2 mt-4 w-[320px] bg-white border border-gray-100 rounded-xl shadow-lg z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
                <div className="absolute inset-x-0 -top-4 h-4 bg-transparent"></div>
                <div className="divide-y">
                  <Link href="/insights/aboutiet" className="block px-6 py-3 hover:bg-gray-50 text-sm text-brand-800">
                    ABOUT IET
                  </Link>
                  <Link href="/insights/message" className="block px-6 py-3 hover:bg-gray-50 text-sm text-muted">
                    MESSAGE
                  </Link>
                  
                  <Link href="/insights/recruiters" className="block px-6 py-3 hover:bg-gray-50 text-sm text-muted">
                    PAST RECRUITERS
                  </Link>
                </div>
              </div>
            </div>

            {/* RECRUITER DROPDOWN */}
            <div className="relative group">
              <button className="inline-flex items-center gap-2 text-muted hover:text-brand-800 transition">
                FOR RECRUITER
                <svg className="w-3 h-3 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute left-1/2 -translate-x-1/2 mt-4 w-[380px] bg-white border border-gray-100 rounded-xl shadow-lg z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
                <div className="absolute inset-x-0 -top-4 h-4 bg-transparent"></div>
                <div className="p-4 space-y-1">
                  <Link href="/recruiters/invitation" className="block px-4 py-2 hover:bg-gray-50 text-sm text-brand-800">
                    INVITATION
                  </Link>
                  <Link href="/recruiters/procedure" className="block px-4 py-2 hover:bg-gray-50 text-sm text-muted">
                    PROCEDURE
                  </Link>
                  <Link href="/recruiters/contactform" className="block px-4 py-2 hover:bg-gray-50 text-sm text-muted">
                    COMPANY CONTACT FORM
                  </Link>
                  <Link href="/recruiters/demographic" className="block px-4 py-2 hover:bg-gray-50 text-sm text-muted">
                    STATISTICS
                  </Link>

                  <div className="pt-3 border-t">
                    <div className="text-xs font-semibold text-muted mb-2 px-1">Downloads</div>
                    <a href="/files/Placement_Brouchure_2025-26.pdf" className="block px-2 py-2 hover:bg-gray-50 text-sm">
                      Placement Brochure
                    </a>
                    <a href="/files/JNF_IET_Lucknow_2025-26.docx" className="block px-2 py-2 hover:bg-gray-50 text-sm">
                      Job Notification Form
                    </a>
                    <a href="/files/Company_Guidlines_21-22.pdf" className="block px-2 py-2 hover:bg-gray-50 text-sm">
                      Company Guidelines
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/gallery" className="text-muted hover:text-brand-800 transition-colors">
              Gallery
            </Link>
            <Link href="/downloads" className="text-muted hover:text-brand-800 transition-colors">
              Downloads
            </Link>
            <Link href="/tpc/contactus" className="bg-brand-700 hover:bg-brand-800 text-white px-4 py-2 rounded-full shadow transition-all">
              Contact Us
            </Link>
          </nav>

          {/* MOBILE BUTTON */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-brand-800 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white shadow-md">
          <div className="px-6 py-4 space-y-3">
            <Link href="/tpc/aboutus" className="block py-2 text-brand-800 font-medium" onClick={closeMobileMenu}>
              About
            </Link>

            {/* Insights */}
            <div>
              <button
                onClick={() => setMobileInsightsOpen(!mobileInsightsOpen)}
                className="w-full flex justify-between py-2 text-brand-800 font-medium"
              >
                Insights
                <span>▼</span>
              </button>

              {mobileInsightsOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link href="/insights/aboutiet" className="block py-2 text-muted" onClick={closeMobileMenu}>
                    About IET
                  </Link>
                  <Link href="/insights/message" className="block py-2 text-muted" onClick={closeMobileMenu}>
                    Message
                  </Link>
                  
                  <Link href="/insights/recruiters" className="block py-2 text-muted" onClick={closeMobileMenu}>
                    Past Recruiters
                  </Link>
                </div>
              )}
            </div>

            {/* Recruiter */}
            <div>
              <button
                onClick={() => setMobileRecruiterOpen(!mobileRecruiterOpen)}
                className="w-full flex justify-between py-2 text-brand-800 font-medium"
              >
                For Recruiter
                <span>▼</span>
              </button>

              {mobileRecruiterOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link href="/recruiters/invitation" className="block py-2 text-muted" onClick={closeMobileMenu}>
                    Invitation
                  </Link>
                  <Link href="/recruiters/procedure" className="block py-2 text-muted" onClick={closeMobileMenu}>
                    Procedure
                  </Link>
                  <Link href="/recruiters/contactform" className="block py-2 text-muted" onClick={closeMobileMenu}>
                    Company Contact Form
                  </Link>
                  <Link href="/recruiters/demographic" className="block py-2 text-muted" onClick={closeMobileMenu}>
                    Statistics
                  </Link>
                </div>
              )}
            </div>

            <Link href="/gallery" className="block py-2 text-brand-800 font-medium" onClick={closeMobileMenu}>
              Gallery
            </Link>
            <Link href="/downloads" className="block py-2 text-brand-800 font-medium" onClick={closeMobileMenu}>
              Downloads
            </Link>
            <Link
              href="/tpc/contactus"
              className="block bg-brand-700 text-white px-4 py-2 rounded-md text-center font-medium"
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
