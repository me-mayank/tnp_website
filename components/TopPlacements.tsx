"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGSAP";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  { src: "/TCS/IMG-20260119-WA0047.jpg", label: "TCS Placement Drive 2025", year: "Batch 2025", badge: "6 LPA" },
  { src: "/images/training session.jpg", label: "Technical Training Sessions", year: "Pre-Placement Prep", badge: null },
  { src: "/images/gd.jpg", label: "Group Discussion Rounds", year: "Selection Process", badge: null },
  { src: "/images/PI.jpg", label: "Personal Interview Round", year: "Final Selection", badge: null },
  { src: "/images/auditorium.png", label: "Pre-Placement Talk – Auditorium", year: "Company Interaction", badge: null },
  { src: "/images/presentation.jpg", label: "Company Presentations", year: "Industry Connect", badge: "54 LPA Highest" },
];

export default function TopPlacements() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useGSAP(() => {
    if (!sectionRef.current || !trackRef.current) return;

    if (!isMobile) {
      // 1. PIN the section and horizontal scroll
      const horizontalScrollTween = gsap.to(trackRef.current, {
        x: () => -(trackRef.current!.scrollWidth - window.innerWidth + 96), // 96px padding
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${trackRef.current!.scrollWidth - window.innerWidth + 800}`,
          pin: true,
          pinSpacing: true,
          scrub: 1.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (counterRef.current) {
              const index = Math.round(self.progress * (CARDS.length - 1));
              counterRef.current.textContent = `0${index + 1} / 0${CARDS.length}`;
            }
            if (dotRef.current) {
              dotRef.current.style.left = `${self.progress * 100}%`;
            }
          }
        }
      });

      // 2. Each card: scale + opacity reveal
      gsap.utils.toArray<HTMLElement>(".placement-card").forEach((card) => {
        gsap.fromTo(card,
          { scale: 0.88, opacity: 0.3, filter: "blur(4px)" },
          {
            scale: 1, opacity: 1, filter: "blur(0px)",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalScrollTween,
              start: "left 90%",
              end: "left 45%",
              scrub: true,
            }
          }
        );
      });
    } else {
      // Mobile Behavior: Vertical stack animations
      gsap.utils.toArray<HTMLElement>(".placement-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            }
          }
        );
      });
    }

    // 3. Section heading stagger reveal
    gsap.fromTo([eyebrowRef.current, headingRef.current],
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        }
      }
    );

    // 4. Underline draw animation
    gsap.fromTo(underlineRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1,
        duration: 0.9,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        }
      }
    );

    // Refresh ScrollTrigger after setup
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isMobile], sectionRef);

  return (
    <section 
      ref={sectionRef} 
      className={`relative ${isMobile ? "py-20 h-auto" : "h-screen"} overflow-hidden bg-[#0a1628] flex flex-col justify-center`}
    >
      {/* Header */}
      <div className={`${isMobile ? "relative px-6 mb-12" : "absolute top-12 left-16 z-10"}`}>
        <p ref={eyebrowRef} className="text-blue-400 text-xs tracking-[0.25em] uppercase font-semibold mb-2">
          Top Placements 2024–25
        </p>
        <h2 ref={headingRef} className="text-white text-4xl md:text-5xl font-bold leading-tight">
          Their Hard Work.<br />Their Moment.
        </h2>
        <div ref={underlineRef} className="mt-3 h-[3px] w-48 bg-blue-500 rounded-full" />
      </div>

      {!isMobile && (
        <div className="absolute top-12 right-16 z-10 text-right">
          <span ref={counterRef} className="text-white/40 text-sm font-mono tracking-widest">01 / 06</span>
        </div>
      )}

      {/* Cards track */}
      <div 
        ref={trackRef} 
        className={`${isMobile ? "flex flex-col gap-8 px-6" : "flex gap-8 px-24 mt-8"}`}
        style={{ width: isMobile ? "100%" : "max-content" }}
      >
        {CARDS.map((card, i) => (
          <div 
            key={i} 
            className="placement-card relative flex-shrink-0 w-full md:w-[500px] h-[300px] md:h-[360px] rounded-[20px] overflow-hidden cursor-pointer group"
            style={{ transition: "box-shadow 0.3s, transform 0.3s" }}
            onMouseEnter={e => { 
              if (!isMobile) {
                e.currentTarget.style.boxShadow = "0 20px 60px rgba(59,130,246,0.3)"; 
                const img = e.currentTarget.querySelector("img");
                if (img) img.style.transform = "scale(1.05)"; 
              }
            }}
            onMouseLeave={e => { 
              if (!isMobile) {
                e.currentTarget.style.boxShadow = "none"; 
                const img = e.currentTarget.querySelector("img");
                if (img) img.style.transform = "scale(1)"; 
              }
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={card.src} 
              alt={card.label} 
              className="w-full h-full object-cover" 
              style={{ transition: "transform 0.5s ease" }} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            {card.badge && (
              <div className="absolute top-4 right-4 bg-blue-600 text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-lg shadow-blue-500/30">
                {card.badge}
              </div>
            )}
            <div className="absolute bottom-5 left-5">
              <p className="text-white font-semibold text-lg leading-tight">{card.label}</p>
              <p className="text-blue-300 text-xs tracking-widest uppercase mt-1">{card.year}</p>
            </div>
          </div>
        ))}
      </div>

      {!isMobile && (
        <div className="absolute bottom-10 left-16 right-16">
          <div className="relative h-[2px] bg-white/10 rounded-full">
            <div 
              ref={dotRef} 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_12px_rgba(96,165,250,0.8)]" 
              style={{ left: "0%", transition: "left 0.05s linear" }} 
            />
          </div>
          <p className="text-white/25 text-xs mt-3 tracking-widest">SCROLL TO EXPLORE →</p>
        </div>
      )}
    </section>
  );
}
