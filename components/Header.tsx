'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const insightsLinks = [
  { href: '/insights/aboutiet', label: 'About IET', description: 'Institution profile and academic legacy' },
  { href: '/insights/message', label: 'Message', description: 'Leadership note and placement vision' },
  { href: '/insights/recruiters', label: 'Past Recruiters', description: 'Trusted hiring partners across sectors' },
];

const recruiterLinks = [
  { href: '/recruiters/invitation', label: 'Invitation', description: 'Campus recruitment invite and overview' },
  { href: '/recruiters/procedure', label: 'Procedure', description: 'Drive flow, schedules, and process details' },
  { href: '/recruiters/contactform', label: 'Company Contact Form', description: 'Share requirements directly with the cell' },
  { href: '/recruiters/demographic', label: 'Statistics', description: 'Placement data, demographics, and performance' },
];

const downloadLinks = [
  { href: '/files/Placement_Brouchure_2025-26.pdf', label: 'Placement Brochure' },
  { href: '/files/JNF_IET_Lucknow_2025-26.docx', label: 'Job Notification Form' },
  { href: '/files/Company_Guidlines_21-22.pdf', label: 'Company Guidelines' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileInsightsOpen, setMobileInsightsOpen] = useState(false);
  const [mobileRecruiterOpen, setMobileRecruiterOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileInsightsOpen(false);
    setMobileRecruiterOpen(false);
  }, [pathname]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileInsightsOpen(false);
    setMobileRecruiterOpen(false);
  };

  return (
    <header
      id="top"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 h-16 lg:h-[72px]">
        <Link href="/" className="flex items-center gap-3.5 min-w-0">
          <Image
            className="h-11 w-11 sm:h-14 sm:w-14 shrink-0"
            src="/images/logo.png"
            alt="IET Lucknow logo"
            width={56}
            height={56}
            sizes="56px"
            priority
          />
          <div className="min-w-0 hidden sm:block">
            <div className="text-[15px] font-bold text-slate-900 tracking-tight leading-tight truncate">
              Training &amp; Placement Cell
            </div>
            <div className="text-[13px] font-medium text-slate-500 tracking-tight truncate">
              IET Lucknow
            </div>
          </div>
        </Link>

        {/* ─── Desktop Nav ─── */}
        <nav className="hidden lg:flex items-center gap-1 text-[13px] font-medium text-slate-600">
          <Link
            href="/tpc/aboutus"
            className="px-3.5 py-2 rounded-lg transition-colors hover:text-slate-900 hover:bg-slate-50"
          >
            About
          </Link>

          {/* Insights dropdown */}
          <div className="group relative">
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors hover:text-slate-900 hover:bg-slate-50">
              Insights
              <svg className="h-3 w-3 text-slate-400 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-2 opacity-0 pointer-events-none transition-all duration-300 delay-150 group-hover:delay-0 group-hover:pointer-events-auto group-hover:opacity-100">
              <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-lg translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                {insightsLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-50"
                  >
                    <div className="text-sm font-medium text-slate-900">{item.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{item.description}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recruiters dropdown */}
          <div className="group relative">
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors hover:text-slate-900 hover:bg-slate-50">
              Recruiters
              <svg className="h-3 w-3 text-slate-400 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className="absolute right-0 top-full z-50 w-[26rem] pt-2 opacity-0 pointer-events-none transition-all duration-300 delay-150 group-hover:delay-0 group-hover:pointer-events-auto group-hover:opacity-100">
              <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-lg translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                <div className="grid grid-cols-[1.2fr_0.8fr] gap-2">
                  <div className="space-y-0.5">
                    {recruiterLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-50"
                      >
                        <div className="text-sm font-medium text-slate-900">{item.label}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{item.description}</div>
                      </Link>
                    ))}
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold mb-3">Downloads</div>
                    {downloadLinks.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="block rounded-md px-2.5 py-2 text-sm text-slate-600 transition-colors hover:text-slate-900 hover:bg-white"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/gallery"
            className="px-3.5 py-2 rounded-lg transition-colors hover:text-slate-900 hover:bg-slate-50"
          >
            Gallery
          </Link>
          <Link
            href="/downloads"
            className="px-3.5 py-2 rounded-lg transition-colors hover:text-slate-900 hover:bg-slate-50"
          >
            Downloads
          </Link>

          {/* CTA */}
          <Link
            href="/tpc/contactus"
            className="ml-4 inline-flex items-center px-5 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold transition-all hover:bg-slate-800 hover:-translate-y-px hover:shadow-md"
          >
            Contact
          </Link>
        </nav>

        {/* ─── Mobile hamburger ─── */}
        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-50 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* ─── Mobile menu panel ─── */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-6 pb-6 pt-4">
          <div className="space-y-1">
            <Link href="/tpc/aboutus" className="block rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={closeMobileMenu}>
              About
            </Link>

            {/* Insights accordion */}
            <div className="rounded-lg overflow-hidden">
              <button
                onClick={() => setMobileInsightsOpen((v) => !v)}
                className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                Insights
                <svg className={`h-3.5 w-3.5 text-slate-400 transition-transform ${mobileInsightsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileInsightsOpen && (
                <div className="pl-4 pb-2 space-y-0.5">
                  {insightsLinks.map((item) => (
                    <Link key={item.href} href={item.href} className="block rounded-lg px-4 py-2 text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50" onClick={closeMobileMenu}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Recruiters accordion */}
            <div className="rounded-lg overflow-hidden">
              <button
                onClick={() => setMobileRecruiterOpen((v) => !v)}
                className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                Recruiters
                <svg className={`h-3.5 w-3.5 text-slate-400 transition-transform ${mobileRecruiterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileRecruiterOpen && (
                <div className="pl-4 pb-2 space-y-0.5">
                  {recruiterLinks.map((item) => (
                    <Link key={item.href} href={item.href} className="block rounded-lg px-4 py-2 text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50" onClick={closeMobileMenu}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/gallery" className="block rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={closeMobileMenu}>
              Gallery
            </Link>
            <Link href="/downloads" className="block rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={closeMobileMenu}>
              Downloads
            </Link>

            <div className="pt-3">
              <Link
                href="/tpc/contactus"
                className="block rounded-lg bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white"
                onClick={closeMobileMenu}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
