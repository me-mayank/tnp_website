"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Poppins } from "next/font/google";
import dynamic from "next/dynamic";
import ContrastMarqueeText from "./ContrastMarqueeText";

const LogoLoop = dynamic(() => import("./LogoLoop"), { ssr: false }) as any;

const poppins = Poppins({ weight: ["700", "800"], subsets: ["latin"] });

gsap.registerPlugin(ScrollTrigger);

const HERO_BG = {
  image: "/images/Hero_Image.png",
  objectPosition: "68% top",
};

const MARQUEE_ITEMS = [
  {
    node: "SINCE 1984",
    className: "text-sm font-bold uppercase tracking-widest whitespace-nowrap md:text-base",
  },
  {
    node: "|",
    className: "text-sm font-bold tracking-widest md:text-base",
  },
  {
    node: "COMPANIES 90+",
    className: "text-sm font-bold uppercase tracking-widest whitespace-nowrap md:text-base",
  },
  {
    node: "|",
    className: "text-sm font-bold tracking-widest md:text-base",
  },
  {
    node: "NAAC A+ ACCREDITED",
    className: "text-sm font-bold uppercase tracking-widest whitespace-nowrap md:text-base",
  },
  {
    node: "|",
    className: "text-sm font-bold tracking-widest md:text-base",
  },
  {
    node: "500+ (2024-2025)",
    className: "text-sm font-bold uppercase tracking-widest whitespace-nowrap md:text-base",
  },
  {
    node: "|",
    className: "text-sm font-bold tracking-widest md:text-base",
  },
];

export default function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".hero-cta", { opacity: 0, y: 20 });
      gsap.set(".hero-title span", { opacity: 0, y: 60 });

      gsap
        .timeline()
        .fromTo(
          ".hero-bg-svg",
          { scale: 1.08, opacity: 0, filter: "blur(12px)" },
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out" }
        )
        .to(".hero-title span", { y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: "expo.out" }, "-=0.8")
        .to(".hero-cta", { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "back.out(1.5)" }, "-=0.6")
        .from(".hero-scroll-hint", { opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.2");

      const timeout = setTimeout(() => ScrollTrigger.refresh(), 1000);
      return () => clearTimeout(timeout);
    }, wrapperRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full -mt-[92px] md:-mt-[104px]">
      <section ref={heroSectionRef} className="relative overflow-hidden bg-slate-950 shadow-xl md:sticky md:top-0 md:min-h-[100svh] md:h-[100dvh]">
        <div
          suppressHydrationWarning
          className="absolute left-0 top-[76px] z-20 w-full md:top-[80px]"
          style={{ height: "50px" }}
        >
          <LogoLoop
            className="hero-marquee-loop"
            logos={MARQUEE_ITEMS.map((item) => ({
              node: (
                <ContrastMarqueeText
                  text={item.node}
                  className={item.className}
                  heroRef={heroSectionRef}
                  imageSrc={HERO_BG.image}
                  objectPosition={HERO_BG.objectPosition}
                />
              ),
            }))}
            speed={80}
            direction="left"
            logoHeight={50}
            gap={40}
            hoverSpeed={20}
            fadeOut={false}
            ariaLabel="Placement highlights"
          />
        </div>

        <div className="hero-bg-svg pointer-events-none select-none relative w-screen aspect-[5/4] md:absolute md:inset-0 md:w-auto md:aspect-auto">
          <Image
            src={HERO_BG.image}
            alt="IET Lucknow placements hero"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: HERO_BG.objectPosition }}
          />

          <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-950/70 via-slate-950/20 to-transparent px-4 pb-[9%] pt-[128px] md:hidden">
            <h1 className={`hero-title flex h-[60%] max-w-[58%] flex-col justify-between text-left text-[clamp(1.05rem,5.5vw,1.8rem)] font-[700] leading-[0.94] ${poppins.className}`}>
              <span className="block w-full text-[#2563EB] [text-shadow:0_2px_10px_rgba(255,255,255,0.35)]">Architecting</span>
              <span className="block w-full text-white [text-shadow:0_2px_10px_rgba(15,23,42,0.3)]">Careers</span>
              <span className="block w-full text-[#2563EB] [text-shadow:0_2px_10px_rgba(255,255,255,0.35)]">Fostering</span>
              <span className="block w-full text-white [text-shadow:0_2px_10px_rgba(15,23,42,0.3)]">Innovation</span>
            </h1>
          </div>
        </div>

        <div className="hero-opening-content relative z-10 hidden min-h-[100svh] items-start pb-16 pl-[clamp(24px,3.8vw,56px)] pr-4 pt-[180px] sm:pr-6 md:flex md:pt-[168px] lg:pb-12">
          <div className="w-full">
            <div className="max-w-[min(40rem,92vw)]">
              <h1 className={`hero-title max-w-[12ch] text-[clamp(0.5rem,1.65vw,1.225rem)] font-[700] leading-[0.94] ${poppins.className}`}>
                <span className="block text-[#2563EB] [text-shadow:0_2px_10px_rgba(255,255,255,0.35)]">Architecting</span>
                <span className="block text-[#0B1F3A] [text-shadow:0_2px_10px_rgba(255,255,255,0.28)]">Careers</span>
                <span className="block text-[#2563EB] [text-shadow:0_2px_10px_rgba(255,255,255,0.35)]">Fostering</span>
                <span className="block text-[#0B1F3A] [text-shadow:0_2px_10px_rgba(255,255,255,0.28)]">Innovation</span>
              </h1>

              <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
                <Link
                  href="/recruiters/invitation"
                  className="hero-cta inline-flex items-center justify-center gap-2 w-[180px] py-4 rounded-xl bg-[#0B1F3A] text-white text-[15px] font-semibold transition-all hover:bg-gray-800 hover:shadow-xl hover:-translate-y-1"
                >
                  Hire Our Talent
                </Link>
                <Link
                  href="/downloads"
                  className="hero-cta group inline-flex items-center justify-center gap-2 w-[180px] py-4 rounded-xl bg-[#111827] text-white text-[15px] font-semibold transition-all hover:bg-gray-800 hover:shadow-xl hover:-translate-y-1"
                >
                  Our Brochure
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white px-4 py-5 shadow-[0_-1px_0_rgba(226,232,240,0.8)] sm:px-6 md:hidden">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/recruiters/invitation"
              className="hero-cta inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B1F3A] px-5 py-4 text-[15px] font-semibold text-white transition-all hover:-translate-y-1 hover:bg-gray-800 hover:shadow-xl sm:w-[180px]"
            >
              Hire Our Talent
            </Link>
            <Link
              href="/downloads"
              className="hero-cta group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#111827] px-5 py-4 text-[15px] font-semibold text-white transition-all hover:-translate-y-1 hover:bg-gray-800 hover:shadow-xl sm:w-[180px]"
            >
              Our Brochure
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="hero-scroll-hint absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-500 md:flex">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">Scroll to explore</span>
          <div className="w-[1px] h-8 bg-slate-300 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-full bg-slate-900 animate-[scrollDown_1.8s_ease-in-out_infinite]" />
          </div>
        </div>
      </section>

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
