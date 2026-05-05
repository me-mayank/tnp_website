"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus_Jakarta_Sans, Poppins, Inter } from "next/font/google";
import MagneticButton from "./MagneticButton";
import AnimatedCounter from "./AnimatedCounter";
import dynamic from 'next/dynamic';
const LogoLoop = dynamic(() => import('./LogoLoop'), { ssr: false }) as any;

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const poppins = Poppins({ weight: ["700", "800"], subsets: ["latin"] });
const inter = Inter({ weight: ["400", "500"], subsets: ["latin"] });

gsap.registerPlugin(ScrollTrigger);

/* ── Two key story slides ───────────────────────────── */
const STORY_SLIDES = [
  {
    image: "/images/main-4-placement.png",
    tag: "The Beginning",
    headline: "Where It All Starts",
    body: "IET Lucknow — a legacy of 42 years nurturing engineering excellence and building future-ready professionals.",
  },
  {
    image: "/images/main-3-placement-2.jpeg",
    tag: "The Result",
    headline: "Placement Success",
    body: "500+ students placed in 2024-25 with packages up to 54 LPA. Their hard work meets its well-earned moment.",
  },
];

const MARQUEE_ITEMS = [
  { node: <span className="text-sm md:text-base font-bold tracking-widest uppercase whitespace-nowrap text-slate-700">SINCE 1984</span> },
  { node: <span className="text-sm md:text-base font-bold tracking-widest text-slate-300">|</span> },
  { node: <span className="text-sm md:text-base font-bold tracking-widest uppercase whitespace-nowrap text-slate-700">COMPANIES 90+</span> },
  { node: <span className="text-sm md:text-base font-bold tracking-widest text-slate-300">|</span> },
  { node: <span className="text-sm md:text-base font-bold tracking-widest uppercase whitespace-nowrap text-slate-700">NAAC A+ ACCREDITED</span> },
  { node: <span className="text-sm md:text-base font-bold tracking-widest text-slate-300">|</span> },
  { node: <span className="text-sm md:text-base font-bold tracking-widest uppercase whitespace-nowrap text-slate-700">500+ (2024-2025)</span> },
  { node: <span className="text-sm md:text-base font-bold tracking-widest text-slate-300">|</span> },
];

export default function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Ensure initial state is ready for animation
      gsap.set(".hero-cta", { opacity: 0, y: 20 });
      gsap.set(".hero-title span", { opacity: 0, y: 60 });
      gsap.set(".hero-subtitle", { opacity: 0, y: 30 });

      // ── 1. OPENING — staggered entrance ────────────
      const openTl = gsap.timeline();
      openTl
        .fromTo(".hero-bg-svg", 
          { scale: 1.1, opacity: 0, filter: "blur(15px)" }, 
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out" }
        )
        .to(".hero-title span", { y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: "expo.out" }, "-=0.8")
        .to(".hero-subtitle", { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.7")
        .to(".hero-cta", { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "back.out(1.5)" }, "-=0.6")
        .from(".hero-scroll-hint", { opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.2");

      // ── 2. STACKING PANELS EFFECT ──
      const panels = gsap.utils.toArray<HTMLElement>(".sticky-panel");
      
      panels.forEach((panel, index) => {
        const imgContainer = panel.querySelector(".story-img-container");
        const img = panel.querySelector(".story-img");
        const content = panel.querySelector(".story-text");
        const tag = panel.querySelector(".story-tag");
        const counter = panel.querySelector(".story-counter");

        if (imgContainer && img) {
          gsap.fromTo(imgContainer,
            { clipPath: "inset(15% 5% 15% 5% round 24px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 0px)",
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: panel,
                start: "top 80%",
                end: "top 20%",
                scrub: 1.5,
              },
            }
          );

          gsap.fromTo(img,
            { yPercent: -10, scale: 1.1 },
            {
              yPercent: 10,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        if (content) {
          gsap.fromTo(content.children, 
            { y: 50, opacity: 0, filter: "blur(8px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              stagger: 0.12,
              duration: 1.2,
              ease: "expo.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 65%",
                once: true,
              },
            }
          );
        }

        if (tag) {
          gsap.from(tag, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.6,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: panel,
              start: "top 80%",
              once: true,
            },
          });
        }

        if (counter) {
          gsap.from(counter, {
            opacity: 0,
            x: -15,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 85%",
              once: true,
            },
          });
        }

        // The fade & scale down effect as the NEXT panel covers this one
        // We add a delay to the exit so the user can actually read the content
        if (index < panels.length - 1) {
          const nextPanel = panels[index + 1];
          gsap.to(panel, {
            scale: 0.95,
            opacity: 0, // Fade out completely to avoid overlapping ghosts
            yPercent: -10,
            ease: "power2.in",
            scrollTrigger: {
              trigger: nextPanel,
              start: "top bottom",
              end: "top 50%", // Finish fade halfway through the next section's entrance
              scrub: true,
            }
          });
        }
      });

      // Refresh after layout settles
      const timeout = setTimeout(() => ScrollTrigger.refresh(), 1000);
      return () => clearTimeout(timeout);
    }, wrapperRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full pb-[10vh]">
      {/* ═══════════════════════════════════════════════
          OPENING SCENE — Full-viewport intro
          ═══════════════════════════════════════════════ */}
      <section className="sticky-panel sticky top-0 h-[100dvh] flex items-center bg-gradient-to-br from-white via-sky-50 to-blue-100 overflow-hidden origin-top z-10 shadow-xl">
        {/* Continuous horizontal scrolling stats */}
        <div suppressHydrationWarning className="absolute top-[-1px] left-0 w-full z-20 " style={{ height: '50px' }}>
          <LogoLoop
            logos={MARQUEE_ITEMS}
            speed={80}
            direction="left"
            logoHeight={50}
            gap={40}
            hoverSpeed={20}
            fadeOut={false}
            ariaLabel="Placement highlights"
          />
        </div>

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.35]" style={{
          backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.4)_100%)]" />

        <div className="hero-opening-content relative z-10 max-w-7xl mx-auto px-6 lg:pl-0 lg:pr-8 w-full py-24">
          {/* Background College Image SVG (balanced sizing and opacity) */}
          <div className="hero-bg-svg absolute right-[-9%] top-1/2 -translate-y-1/2 w-[120%] h-[110%] opacity-[1] pointer-events-none select-none z-[-1]">
            <Image
              src="/images/5th.png"
              alt="IET Lucknow Campus"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="max-w-3xl">


            {/* Headline */}
            <h1 className={`hero-title text-[clamp(2.2rem,5.3vw,4.3rem)] font-[700] tracking-tight leading-[1.15] mb-10 ${poppins.className}`}>
              <span className="block text-[#0B1F3A]">Architecting Careers </span>
              <span className="block text-[#2563EB]">Fostering Innovation</span>
            </h1>

            {/* Subtitle */}
            <p className={`hero-subtitle text-[#4B5563] text-lg md:text-xl max-w-2xl leading-relaxed mb-10 font-medium ${inter.className}`}>
              Empowering Talent. Enabling Careers. Inspiring Excellence.<br />
              <span className="font-normal text-gray-500 mt-2 block">The IET Lucknow T&P Cell — Defining your path to professional distinction.</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-5 mb-16">
              <Link href="/recruiters/invitation"
                className="hero-cta group inline-flex items-center justify-center gap-2 w-[180px] py-4 rounded-xl bg-[#111827] text-white text-[15px] font-semibold transition-all hover:bg-gray-800 hover:shadow-xl hover:-translate-y-1">
                For Recruiters
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/insights/recruiters"
                className="hero-cta inline-flex items-center justify-center gap-2 w-[180px] py-4 rounded-xl bg-[#0B1F3A] text-white text-[15px] font-semibold transition-all hover:bg-gray-800 hover:shadow-xl hover:-translate-y-1">
                For Students
              </Link>
            </div>


          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">Scroll to explore</span>
          <div className="w-[1px] h-8 bg-slate-300 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-full bg-slate-900 animate-[scrollDown_1.8s_ease-in-out_infinite]" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          STORY — 2 scroll panels
          ═══════════════════════════════════════════════ */}
      {STORY_SLIDES.map((slide, index) => (
        <section
          key={index}
          className={`sticky-panel story-panel sticky top-0 h-[100dvh] flex items-center overflow-hidden origin-top shadow-2xl ${
            index % 2 === 0 ? "bg-slate-50" : "bg-white"
          }`}
          style={{ zIndex: 20 + index }}
        >
          {/* Background image */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="story-img-container absolute inset-0 overflow-hidden">
              <div className="story-img absolute inset-[-10%]">
                <Image
                  src={slide.image}
                  alt={slide.headline}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </div>
            <div className={`absolute inset-0 ${
              index % 2 === 0 
                ? "bg-gradient-to-r from-slate-50 via-slate-50/95 to-blue-50/40 pointer-events-none" 
                : "bg-gradient-to-l from-white via-white/95 to-white/40 pointer-events-none"
            }`} />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-24 md:py-32">
            <div className={`max-w-xl ${index % 2 !== 0 ? "ml-auto text-right" : ""}`}>
              {/* Counter */}
              <div className={`story-counter flex items-center gap-3 mb-6 ${index % 2 !== 0 ? "justify-end" : ""}`}>
                <span className="text-[11px] font-mono text-slate-400 tracking-widest">
                  {String(index + 1).padStart(2, "0")} / {String(STORY_SLIDES.length).padStart(2, "0")}
                </span>
                <div className="h-[1px] w-12 bg-slate-300" />
              </div>

              {/* Tag */}
              <div className="story-tag inline-block mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {slide.tag}
                </span>
              </div>

              {/* Text */}
              <div className="story-text">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
                  {slide.headline}
                </h2>
                <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-md font-light">
                  {slide.body}
                </p>

                {/* CTA on last slide */}
                {index === STORY_SLIDES.length - 1 && (
                  <div className={`mt-10 flex gap-4 ${index % 2 !== 0 ? "justify-end" : ""}`}>
                    <Link href="/recruiters/invitation"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white text-sm font-semibold transition-all hover:bg-blue-700 hover:shadow-lg">
                      Hire Our Talent
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <Link href="/downloads"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 text-slate-700 text-sm font-semibold transition-all hover:bg-slate-50">
                      Download Brochure
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      <style jsx>{`
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
}
