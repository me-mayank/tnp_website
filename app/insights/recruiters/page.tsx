"use client";
 
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
 
const recruiterLogos = [
  { src: "/images/pastRecruiter/dlf.png", alt: "DLF logo", recruitments: 48 },
  { src: "/images/pastRecruiter/zeta.png", alt: "Zeta logo", recruitments: 22 },
  { src: "/images/pastRecruiter/InMobi.png", alt: "InMobi logo", recruitments: 31 },
  { src: "/images/pastRecruiter/amazon.png", alt: "Amazon logo", recruitments: 64 },
  { src: "/images/pastRecruiter/Intuit.png", alt: "Intuit logo", recruitments: 19 },
  { src: "/images/pastRecruiter/soti.png", alt: "SOTI logo", recruitments: 17 },
  { src: "/images/pastRecruiter/meesho.webp", alt: "Meesho logo", recruitments: 26 },
  { src: "/images/pastRecruiter/uber.svg", alt: "Uber logo", recruitments: 14 },
  { src: "/images/pastRecruiter/bharatelectronics.png", alt: "Bharat Electronics logo", recruitments: 37 },
  { src: "/images/pastRecruiter/adobe.png", alt: "Adobe logo", recruitments: 24 },
  { src: "/images/pastRecruiter/forbes.png", alt: "Forbes logo", recruitments: 8 },
  { src: "/images/pastRecruiter/google.png", alt: "Google logo", recruitments: 29 },
  { src: "/images/pastRecruiter/arcad.png", alt: "ARCAD logo", recruitments: 11 },
  { src: "/images/pastRecruiter/microsoft.png", alt: "Microsoft logo", recruitments: 34 },
  { src: "/images/pastRecruiter/paytm.png", alt: "Paytm logo", recruitments: 27 },
  { src: "/images/pastRecruiter/volvo.png", alt: "Volvo logo", recruitments: 15 },
  { src: "/images/pastRecruiter/zscaler.svg", alt: "Zscaler logo", recruitments: 18 },
  { src: "/images/pastRecruiter/zomato.png", alt: "Zomato logo", recruitments: 21 },
  { src: "/images/pastRecruiter/wayfair.png", alt: "Wayfair logo", recruitments: 16 },
  { src: "/images/pastRecruiter/upstox.png", alt: "Upstox logo", recruitments: 13 },
  { src: "/images/pastRecruiter/tactai.png", alt: "Tact.ai logo", recruitments: 9 },
  { src: "/images/pastRecruiter/eicher.png", alt: "Eicher logo", recruitments: 28 },
  { src: "/images/pastRecruiter/slice.jpg", alt: "Slice logo", recruitments: 12 },
  { src: "/images/pastRecruiter/servicenow.png", alt: "ServiceNow logo", recruitments: 20 },
  { src: "/images/pastRecruiter/salesforce.png", alt: "Salesforce logo", recruitments: 23 },
  { src: "/images/pastRecruiter/rippling.png", alt: "Rippling logo", recruitments: 10 },
  { src: "/images/pastRecruiter/persistant.png", alt: "Persistent logo", recruitments: 42 },
  { src: "/images/pastRecruiter/hul.png", alt: "HUL logo", recruitments: 30 },
  { src: "/images/pastRecruiter/groupon.png", alt: "Groupon logo", recruitments: 7 },
  { src: "/images/pastRecruiter/goldman.webp", alt: "Goldman Sachs logo", recruitments: 25 },
  { src: "/images/pastRecruiter/gainsight.png", alt: "Gainsight logo", recruitments: 14 },
  { src: "/images/pastRecruiter/cisco.png", alt: "Cisco logo", recruitments: 33 },
  { src: "/images/pastRecruiter/capgemini.png", alt: "Capgemini logo", recruitments: 58 },
  { src: "/images/pastRecruiter/bny.png", alt: "BNY logo", recruitments: 18 },
  { src: "/images/pastRecruiter/inox.jpg", alt: "INOX logo", recruitments: 6 },
  { src: "/images/pastRecruiter/atlassian.png", alt: "Atlassian logo", recruitments: 17 },
  { src: "/images/pastRecruiter/wayfair.png", alt: "Wayfair logo", recruitments: 16 },
  { src: "/images/pastRecruiter/morgan.png", alt: "Morgan Stanley logo", recruitments: 22 },
  { src: "/images/pastRecruiter/LT.avif", alt: "L&T logo", recruitments: 46 },
  { src: "/images/pastRecruiter/newgen.avif", alt: "Newgen logo", recruitments: 24 },
  { src: "/images/pastRecruiter/samsung.svg", alt: "Samsung logo", recruitments: 27 },
  { src: "/images/pastRecruiter/shapoorji.png", alt: "Shapoorji Pallonji logo", recruitments: 19 },
  { src: "/images/pastRecruiter/tcs.png", alt: "TCS logo", recruitments: 72 },
  { src: "/images/pastRecruiter/intel.svg", alt: "Intel logo", recruitments: 20 },
  { src: "/images/pastRecruiter/ashok.png", alt: "Ashok Leyland logo", recruitments: 26 },
  { src: "/images/pastRecruiter/bajaj.jpg", alt: "Bajaj logo", recruitments: 31 },
  { src: "/images/pastRecruiter/escorts.jpg", alt: "Escorts logo", recruitments: 15 },
  { src: "/images/pastRecruiter/cognizant.jpg", alt: "Cognizant logo", recruitments: 61 },
  { src: "/images/pastRecruiter/ericsson.png", alt: "Ericsson logo", recruitments: 18 },
  { src: "/images/pastRecruiter/essar.png", alt: "Essar logo", recruitments: 12 },
  { src: "/images/pastRecruiter/hcl.png", alt: "HCL logo", recruitments: 55 },
  { src: "/images/pastRecruiter/hero.png", alt: "Hero logo", recruitments: 29 },
  { src: "/images/pastRecruiter/honda.svg", alt: "Honda logo", recruitments: 21 },
  { src: "/images/pastRecruiter/mahindra.png", alt: "Mahindra logo", recruitments: 39 },
  { src: "/images/pastRecruiter/oracle.png", alt: "Oracle logo", recruitments: 28 },
  { src: "/images/pastRecruiter/prism.png", alt: "Prism logo", recruitments: 9 },
  { src: "/images/pastRecruiter/tata_motors.png", alt: "Tata Motors logo", recruitments: 44 },
  { src: "/images/pastRecruiter/torrent.png", alt: "Torrent logo", recruitments: 13 },
  { src: "/images/pastRecruiter/unacademy.png", alt: "Unacademy logo", recruitments: 11 },
  { src: "/images/pastRecruiter/wipro.png", alt: "Wipro logo", recruitments: 67 },
  { src: "/images/pastRecruiter/zs.png", alt: "ZS logo", recruitments: 32 },
  { src: "/images/pastRecruiter/birlasoft.png", alt: "Birlasoft logo", recruitments: 36 },
  { src: "/images/pastRecruiter/jaroeducation.png", alt: "Jaro Education logo", recruitments: 14 },
  { src: "/images/pastRecruiter/infosys.jpg", alt: "Infosys logo", recruitments: 74 },
  { src: "/images/pastRecruiter/lntinfotech.jpg", alt: "L&T Infotech logo", recruitments: 41 },
  { src: "/images/pastRecruiter/usefulbi.png", alt: "UsefulBI logo", recruitments: 8 },
];
 
const recruiterTestimonials = [
  {
    name: "Sarah Chen",
    role: "University Relations Manager",
    company: "Google",
    companyLogo: "/images/pastRecruiter/google.png",
    img: "/images/testimonials/r1.jpg",
    text: "We find exceptional talent at this university. Students are highly collaborative and problem solvers.",
  },
  {
    name: "David Rodriguez",
    role: "Senior Tech Recruiter",
    company: "Microsoft",
    companyLogo: "/images/pastRecruiter/microsoft.png",
    img: "/images/testimonials/r2.jpeg",
    text: "Graduates come prepared with practical knowledge and a strong drive to make impact.",
  },
  {
    name: "Priya Sharma",
    role: "HR Executive",
    company: "TCS",
    companyLogo: "/images/pastRecruiter/tcs.png",
    img: "/images/testimonials/r3.webp",
    text: "Students quickly grow into leadership roles. Their adaptability is impressive.",
  },
];
 
export default function PastRecruiters() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
 
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % recruiterTestimonials.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);
 
  const prevSlide = useCallback((): void => {
    setActiveIndex(
      (prev) => (prev - 1 + recruiterTestimonials.length) % recruiterTestimonials.length
    );
  }, []);
 
  const nextSlide = useCallback((): void => {
    setActiveIndex((prev) => (prev + 1) % recruiterTestimonials.length);
  }, []);
 
  const getPosition = (index: number): number => {
    const total = recruiterTestimonials.length;
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };
 
  return (
    <div className="bg-white">
      <style jsx>{`
 
        /* ══════════════════════════════════════════
           KEYFRAMES
        ══════════════════════════════════════════ */

        /* Cards fade + slide up from below on page load */
        @keyframes cardEntrance {
          0%   { opacity: 0; transform: translateY(24px) scale(0.94); }
          100% { opacity: 1; transform: translateY(0px)  scale(1);    }
        }
 
        /* Subtle breathing float when idle */
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-5px); }
        }

        /* Diagonal shimmer sweep over the glass face */
        @keyframes shimmerSweep {
          0%   { left: -80%; opacity: 0;   }
          20%  { opacity: 1;               }
          80%  { opacity: 1;               }
          100% { left: 120%; opacity: 0;   }
        }
 
        /* ══════════════════════════════════════════
           CARD WRAPPER — height lock + animations
        ══════════════════════════════════════════ */
        .card-wrapper {
          height: 144px !important;
          min-height: 144px !important;
          max-height: 144px !important;
          overflow: visible;
          position: relative;

          /* Entrance — delay set via inline style */
          animation: cardEntrance 0.55s cubic-bezier(0.22, 1, 0.36, 1) both,
                     cardFloat 4s ease-in-out infinite;
          animation-delay: var(--card-delay, 0ms), calc(var(--card-delay, 0ms) + 0.6s);
        }
 
        /* Stop floating on hover so flip feels stable */
        .card-wrapper:hover {
          animation: cardEntrance 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: var(--card-delay, 0ms);
        }
 
        /* ══════════════════════════════════════════
           FLIP CARD SHELL
        ══════════════════════════════════════════ */
        .flip-card {
          perspective: 1000px;
          display: block;
          width: 100%;
          height: 144px !important;
          min-height: 144px !important;
          max-height: 144px !important;
        }
 
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 144px !important;
          min-height: 144px !important;
          max-height: 144px !important;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          transition: transform 0.72s cubic-bezier(0.22, 1, 0.36, 1);
        }
 
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
 
        /* ══════════════════════════════════════════
           SHARED FACE BASE
        ══════════════════════════════════════════ */
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 14px;
          overflow: hidden;
        }
 
        /* ══════════════════════════════════════════
           FRONT FACE — clean white with shadow
        ══════════════════════════════════════════ */
        .flip-card-front {
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          z-index: 1;
          box-shadow:
            0 2px 6px rgba(0, 0, 0, 0.07),
            0 6px 20px rgba(0, 0, 0, 0.11),
            0 14px 36px rgba(0, 0, 0, 0.08);
        }

        /* Deepen shadow on hover */
        .card-wrapper:hover .flip-card-front {
          box-shadow:
            0 4px 10px rgba(0, 0, 0, 0.10),
            0 10px 28px rgba(0, 0, 0, 0.15),
            0 22px 48px rgba(0, 0, 0, 0.11);
        }

        /* Shimmer sweep — diagonal white beam */
        .flip-card-front::after {
          content: "";
          position: absolute;
          top: 0;
          left: -80%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            105deg,
            transparent 30%,
            rgba(255, 255, 255, 0.60) 50%,
            transparent 70%
          );
          transform: skewX(-12deg);
          animation: shimmerSweep 3.8s ease-in-out infinite;
          pointer-events: none;
        }
 
        /* ══════════════════════════════════════════
           BACK FACE — deep navy
        ══════════════════════════════════════════ */
        .flip-card-back {
          background: linear-gradient(145deg, #0f1e3d 0%, #1a3060 60%, #0d1a35 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 1rem;
          transform: rotateY(180deg);
          z-index: 1;
          box-shadow:
            0 2px 6px rgba(0, 0, 0, 0.07),
            0 6px 20px rgba(0, 0, 0, 0.11),
            0 14px 36px rgba(0, 0, 0, 0.08);
        }
 
        .flip-card-back::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 20% 20%, rgba(99,102,241,0.24) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 80%, rgba(59,130,246,0.20) 0%, transparent 55%);
          pointer-events: none;
        }
 
        /* ══════════════════════════════════════════
           BACK FACE CONTENT
        ══════════════════════════════════════════ */
        .flip-card-back-content {
          position: relative;
          z-index: 2;
          color: white;
        }
 
        .flip-card-count {
          font-size: 1.75rem;
          line-height: 1;
          font-weight: 800;
          letter-spacing: -0.04em;
          background: linear-gradient(135deg, #ffffff 20%, #93c5fd 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 10px rgba(147, 197, 253, 0.55));
        }
 
        .flip-card-divider {
          width: 32px;
          height: 1.5px;
          margin: 0.45rem auto;
          background: linear-gradient(90deg, transparent, rgba(147, 197, 253, 0.75), transparent);
          border-radius: 99px;
        }
 
        .flip-card-label {
          font-size: 0.76rem;
          color: rgba(255, 255, 255, 0.68);
          letter-spacing: 0.10em;
          text-transform: uppercase;
          font-weight: 500;
        }
 
        @media (max-width: 640px) {
          .flip-card-count { font-size: 1.4rem; }
          .flip-card-label { font-size: 0.68rem; }
        }
      `}</style>
 
      <main className="bg-white py-20" id="recruiters">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
 
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-800">
              PAST RECRUITERS
            </h1>
          </div>
 
          <section aria-labelledby="past-recruiters" className="mt-8">
            <div id="past-recruiters" className="sr-only">
              List of past recruiters&apos; logos
            </div>
 
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
              style={{ gridAutoRows: "144px", alignItems: "start" }}
            >
              {recruiterLogos.map((logo, index) => {
                const delay = `${Math.min(index * 35, 800)}ms`;
 
                return (
                  <div
                    key={`${logo.src}-${index}`}
                    className="card-wrapper"
                    style={{ "--card-delay": delay } as React.CSSProperties}
                  >
                    <div className="flip-card">
                      <div className="flip-card-inner">
 
                        {/* ── FRONT ─────────────────────────────── */}
                        <div className="flip-card-front">
                          <Image
                            src={logo.src}
                            alt={logo.alt}
                            className="max-h-full max-w-full object-contain relative z-10"
                            width={200}
                            height={120}
                            sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 16vw"
                            loading="lazy"
                          />
                        </div>
 
                        {/* ── BACK ──────────────────────────────── */}
                        <div className="flip-card-back">
                          <div className="flip-card-back-content">
                            <div className="flip-card-count">{logo.recruitments}</div>
                            <div className="flip-card-divider" />
                            <div className="flip-card-label">Recruitments</div>
                          </div>
                        </div>
 
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
 
          {/* ── TESTIMONIALS CAROUSEL ─────────────────────────── */}
          <section className="py-40 overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between mb-10 gap-8">
              <div className="text-left">
                <p className="text-xs tracking-[0.28em] uppercase text-slate-600 mb-2">
                  Shared Perspectives
                </p>
                <h2 className="text-4xl font-bold text-slate-700">
                  Voices of Recruiters
                </h2>
              </div>
            </div>
 
            <div className="relative max-w-6xl mx-auto">
              <div className="relative h-[560px] md:h-[590px] flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center [perspective:2000px]">
                  {recruiterTestimonials.map((item, index) => {
                    const position = getPosition(index);
                    const isActive = position === 0;
 
                    let cardStyle: React.CSSProperties = {};
                    if (position === 0) {
                      cardStyle = { transform: "translateX(0px) scale(1) rotateY(0deg)", opacity: 1, zIndex: 30 };
                    } else if (position === -1) {
                      cardStyle = { transform: "translateX(-76%) scale(0.92) rotateY(16deg)", opacity: 0.96, zIndex: 20 };
                    } else if (position === 1) {
                      cardStyle = { transform: "translateX(76%) scale(0.92) rotateY(-16deg)", opacity: 0.96, zIndex: 20 };
                    } else if (position < 0) {
                      cardStyle = { transform: "translateX(-102%) scale(0.82) rotateY(18deg)", opacity: 0, zIndex: 10 };
                    } else {
                      cardStyle = { transform: "translateX(102%) scale(0.82) rotateY(-18deg)", opacity: 0, zIndex: 10 };
                    }
 
                    return (
                      <div
                        key={`${item.name}-${index}`}
                        className="absolute w-[330px] sm:w-[360px] md:w-[410px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={cardStyle}
                      >
                        <div
                          className={`group relative rounded-[26px] p-[1px] ${
                            isActive
                              ? "shadow-[0_25px_80px_rgba(10,25,60,0.28)]"
                              : "shadow-[0_18px_50px_rgba(10,25,60,0.16)]"
                          }`}
                        >
                          <div className="relative overflow-hidden rounded-2xl p-8 text-white border border-white/10 bg-[linear-gradient(135deg,#1e3354,#243b63)]">
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(96,165,250,0.10),transparent_30%)]" />
                            <div className="pointer-events-none absolute inset-[1px] rounded-2xl border border-white/5" />
 
                            <div className="relative z-10 flex items-center justify-between gap-3 mb-5">
                              <img src={item.companyLogo} alt={`${item.company} logo`} className="h-7 object-contain brightness-110" />
                              <span className="rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur-sm">
                                {item.role}
                              </span>
                            </div>
 
                            <div className="relative z-10 mb-5 overflow-hidden rounded-xl border border-white/10 bg-black/10">
                              <img
                                src={item.img}
                                alt={item.name}
                                className="h-40 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
 
                            <div className="relative z-10">
                              <h3 className="text-[2rem] leading-none font-extrabold tracking-[-0.04em] text-white">
                                {item.name}
                              </h3>
                              <p className="mt-2 text-[15px] text-white/75">{item.role}</p>
                              <p className="mt-5 text-[15px] leading-8 text-white/85">{`"${item.text}"`}</p>
                            </div>
 
                            <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
 
                <button
                  onClick={prevSlide}
                  type="button"
                  className="absolute left-2 md:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-40 h-12 w-12 rounded-full border border-blue-900/10 bg-white/90 backdrop-blur shadow-md text-blue-900 text-xl hover:scale-105 transition"
                  aria-label="Previous testimonial"
                >←</button>
 
                <button
                  onClick={nextSlide}
                  type="button"
                  className="absolute right-2 md:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 h-12 w-12 rounded-full border border-blue-900/10 bg-white/90 backdrop-blur shadow-md text-blue-900 text-xl hover:scale-105 transition"
                  aria-label="Next testimonial"
                >→</button>
              </div>
 
              <div className="mt-10 flex justify-center gap-3">
                {recruiterTestimonials.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === index ? "w-8 bg-blue-900" : "w-2.5 bg-blue-200 hover:bg-blue-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>
 
        </div>
      </main>
    </div>
  );
}