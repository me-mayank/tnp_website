"use client";

import React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-[#0B1A2E] text-white pt-16 pb-10 overflow-hidden">
      {/* Decorative Top Border Glow */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left Section: Links and Map */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Insights Column */}
              <div className="group/col">
                <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
                  Insights
                  <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-brand-accent rounded-full transition-all duration-500 group-hover/col:w-full group-hover/col:shadow-[0_0_8px_rgba(56,189,248,0.8)]"></span>
                </h4>
                <ul className="space-y-4 text-[15px] font-medium text-white/70">
                  <li><Link href="/insights/aboutiet" className="hover:text-brand-accent inline-block hover:translate-x-1.5 transition-all duration-300">About IET</Link></li>
                  <li><Link href="/insights/message" className="hover:text-brand-accent inline-block hover:translate-x-1.5 transition-all duration-300">TPO&apos;s Message</Link></li>
                  <li><Link href="/insights/recruiters" className="hover:text-brand-accent inline-block hover:translate-x-1.5 transition-all duration-300">Past Recruiters</Link></li>
                </ul>
              </div>

              {/* For Recruiters Column */}
              <div className="group/col">
                <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
                  For Recruiters
                  <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-brand-accent rounded-full transition-all duration-500 group-hover/col:w-full group-hover/col:shadow-[0_0_8px_rgba(56,189,248,0.8)]"></span>
                </h4>
                <ul className="space-y-4 text-[15px] font-medium text-white/70">
                  <li><Link href="/recruiters/procedure" className="hover:text-brand-accent inline-block hover:translate-x-1.5 transition-all duration-300">Procedure</Link></li>
                  <li><Link href="/recruiters/invitation" className="hover:text-brand-accent inline-block hover:translate-x-1.5 transition-all duration-300">Invitation</Link></li>
                  <li><Link href="/recruiters/contactform" className="hover:text-brand-accent inline-block hover:translate-x-1.5 transition-all duration-300">Company Contact Form</Link></li>
                  <li><Link href="/recruiters/demographic" className="hover:text-brand-accent inline-block hover:translate-x-1.5 transition-all duration-300">Statistics</Link></li>
                </ul>
              </div>

              {/* For Students Column */}
              <div className="group/col">
                <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
                  For Students
                  <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-brand-accent rounded-full transition-all duration-500 group-hover/col:w-full group-hover/col:shadow-[0_0_8px_rgba(56,189,248,0.8)]"></span>
                </h4>
                <ul className="space-y-4 text-[15px] font-medium text-white/70">
                  <li><Link href="/files/Student_Placement_Policy.pdf" className="hover:text-brand-accent inline-block hover:translate-x-1.5 transition-all duration-300">Placement Policy</Link></li>
                  <li><Link href="/files/Internship_Guidelines.pdf" className="hover:text-brand-accent inline-block hover:translate-x-1.5 transition-all duration-300">Internship Guidelines</Link></li>
                  <li><Link href="/downloads" className="hover:text-brand-accent inline-block hover:translate-x-1.5 transition-all duration-300">Downloads</Link></li>
                </ul>
              </div>
            </div>

            {/* Campus Map Section */}
            <a
              href="https://www.google.com/maps/search/IET+Lucknow+226021"
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-xl overflow-hidden border border-white/10 group cursor-pointer h-[160px] shadow-lg shadow-black/20 block"
            >
              <img
                src="/images/campus-map-minimal.png"
                alt="IET Lucknow Campus Map"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-[#0B1A2E]/40 group-hover:bg-transparent transition-colors duration-500"></div>

              {/* Hover Overlay Text */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-brand-900/40 backdrop-blur-[2px]">
                <div className="bg-brand-accent text-brand-900 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                  Open in Google Maps
                </div>
              </div>

              <div className="absolute bottom-4 left-5 flex items-center gap-3 transition-transform duration-500 group-hover:translate-x-1">
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-accent"></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">IET Campus Location</span>
                  <span className="text-[9px] text-white/50 font-medium tracking-tight">Lucknow - 226021</span>
                </div>
              </div>
            </a>
          </div>

          {/* Right Section: Contact Card */}
          <div className="lg:col-span-4 group/card perspective-1000">
            <div className="bg-gradient-to-br from-white/[0.08] to-transparent p-8 md:p-10 rounded-2xl border border-white/10 shadow-xl backdrop-blur-sm relative overflow-hidden h-full flex flex-col justify-center transition-all duration-500 hover:shadow-2xl hover:shadow-brand-900/20 hover:border-brand-accent/30 hover:-translate-y-1 hover:bg-white/[0.12]">
              {/* Decorative circle */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover/card:scale-150 animate-[pulse_4s_ease-in-out_infinite]"></div>

              <h4 className="font-bold text-xl mb-4 text-white transition-transform duration-300 group-hover/card:translate-x-1">
                Training & Placement Office
              </h4>
              <p className="text-[14px] text-white/70 leading-relaxed mb-6 font-medium transition-transform duration-300 group-hover/card:translate-x-1">
                Institute of Engineering and Technology,<br />Lucknow - 226021
              </p>

              <div className="space-y-4 text-[14px] font-medium">
                <a href="mailto:placement@ietlucknow.ac.in" className="flex items-center gap-2 text-white/80 hover:text-brand-accent group/email transition-all duration-300">
                  <div className="text-brand-accent transition-all duration-300 group-hover/email:scale-110 group-hover/email:text-white animate-mail">
                    <Mail size={14} />
                  </div>
                  <span className="group-hover/email:translate-x-1 transition-transform duration-300">placement@ietlucknow.ac.in</span>
                </a>

                <div className="pt-5 border-t border-white/10 transition-colors duration-500 group-hover/card:border-white/20">
                  <div className="text-[13px] text-white/90 font-bold mb-1.5">Officer Incharge</div>
                  <div className="text-[14px] text-white/70 mb-3">Dr. Arun Kumar Tiwari</div>
                  <a href="mailto:aruntiwari@ietlucknow.ac.in" className="flex items-center gap-2 text-white/80 hover:text-brand-accent group/email2 transition-all duration-300">
                    <div className="text-brand-accent transition-all duration-300 group-hover/email2:scale-110 group-hover/email2:text-white animate-mail">
                      <Mail size={14} />
                    </div>
                    <span className="group-hover/email2:translate-x-1 transition-transform duration-300">aruntiwari@ietlucknow.ac.in</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 order-2 md:order-1">
            <a href="mailto:placement@ietlucknow.ac.in" className="text-white/70 hover:text-brand-accent transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </a>
            <a href="https://www.facebook.com/ietplacementcell/" className="text-white/70 hover:text-brand-accent transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
            <a href="https://x.com/iet_lucknow" className="text-white/70 hover:text-brand-accent transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.033 10.033 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" /></svg>
            </a>
            <a href="https://www.linkedin.com/in/placement-cell-iet-lucknow-439a1357" className="text-white/70 hover:text-brand-accent transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 10.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
          </div>

          <div className="text-xs text-white/50 font-medium text-center order-3 md:order-2">
            © 2025 Institute of Engineering & Technology, Lucknow. All Rights Reserved.
          </div>

          <div className="flex items-center group/top order-1 md:order-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-6 py-2.5 bg-brand-accent text-[#0B1A2E] rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-white hover:scale-105 shadow-[0_0_15px_rgba(56,189,248,0.3)] active:scale-95"
            >
              Back to Top
              <svg className="w-4 h-4 transition-transform duration-300 group-hover/top:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
