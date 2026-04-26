"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  {
    src: "/images/PI.jpg",
    alt: "Placement interview at IET Lucknow",
    //title: "Interview Readiness",
    //description: "",
    stat: " interview spaces",
  },
  {
    src: "/images/gd.jpg",
    alt: "Group discussion round",
    //title: "Assessment Process",
    //description: "Structured group discussions and evaluation stages managed on campus.",
    stat: "GD and screening rounds",
  },
  {
    src: "/images/training session.jpg",
    alt: "Training session at IET Lucknow",
    //title: "Student Preparation",
    //description: "Training sessions designed to improve confidence, aptitude, and placement outcomes.",
    stat: "Pre-placement training",
  },
  {
    src: "/images/presentation.jpg",
    alt: "Company presentation at IET Lucknow",
    //title: "Industry Engagement",
    //description: "Pre-placement talks and company presentations that connect students with opportunity.",
    stat: "Recruiter interaction",
  },
];

export default function PlacementGallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    // Heading reveal
    gsap.from(".placement-overview-copy > *", {
      opacity: 0,
      y: 40,
      stagger: 0.12,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
      },
    });

    // Cards stagger reveal
    gsap.from(".placement-highlight-card", {
      opacity: 0,
      y: 50,
      scale: 0.95,
      stagger: 0.12,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".placement-highlight-grid",
        start: "top 80%",
        once: true,
      },
    });
  }, [], sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      <div className="absolute left-0 top-20 h-64 w-64 rounded-full bg-blue-50/50 blur-3xl" />
      <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-slate-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 lg:items-center">
          <div className="placement-overview-copy flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-blue-600 shadow-sm">
              Our Ecosystem
            </div>
            <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              A Complete Hiring Ecosystem
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-500 md:text-lg max-w-lg">
              Bridging academia and industry. We provide seamless, end-to-end support for both our students and visiting recruiters.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gallery"
                className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
              >
                Explore Gallery
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/recruiters/procedure"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:bg-slate-50 hover:border-slate-300"
              >
                Recruitment Process
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg lg:max-w-none lg:ml-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-blue-200">
              <div className="relative z-10">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-2.5">Prepared For</div>
                <div className="text-xl font-bold tracking-tight text-slate-900 mb-1.5">Campus Drives</div>
                <div className="text-xs leading-relaxed text-slate-600">From pre-placement talks to final interviews, fully equipped for all procedures.</div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-xl border border-blue-700 bg-gradient-to-br from-blue-600 to-blue-800 p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-500">
              <div className="relative z-10">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200 mb-2.5">Professional Tone</div>
                <div className="text-xl font-bold tracking-tight text-white mb-1.5">Institution First</div>
                <div className="text-xs leading-relaxed text-blue-100">Representing the public face of the college with the highest professional standards.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="placement-highlight-grid mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {GALLERY_IMAGES.map((item) => (
            <article
              key={item.title}
              className="placement-highlight-card group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 shadow-sm"
            >
              <div className="relative aspect-[4/4.8] overflow-hidden rounded-xl">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/15 to-transparent" />
                <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-2">
                  <span className="rounded-full border border-white/15 bg-white/14 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                    {item.stat}
                  </span>
                </div>
                <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/10 bg-black/25 p-4 backdrop-blur-md">
                  <div className="text-lg font-semibold text-white">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-white/78">{item.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
