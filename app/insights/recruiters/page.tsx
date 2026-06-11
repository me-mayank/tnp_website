"use client";

import "./recruiters.css";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

// ─── Real recruiter data from IET Lucknow Placement Report 2025-26 ───────────
// Source: IET_Lucknow_Placement_2025_26.pdf  |  Grand Total Offers: 526
// Recruitments are aggregated across all sub-categories per company.
const recruiterLogos = [
  // TCS: Ninja (47) + Digital (12) + Prime (1) = 60
  { src: "/images/pastRecruiter/tcs.png", alt: "TCS logo", recruitments: 60 },
  { src: "/images/pastRecruiter/averixis.png", alt: "Averixis Solutions logo", recruitments: 33 },
  { src: "/images/pastRecruiter/eduveda.png", alt: "Eduveda Academy logo", recruitments: 32 },
  { src: "/images/pastRecruiter/Launched.png", alt: "Launched Global logo", recruitments: 31 },
  // Torrent: Torrent Power (20) + Torrent Gas (8) = 28
  { src: "/images/pastRecruiter/torrent.png", alt: "Torrent logo", recruitments: 28 },
  { src: "/images/pastRecruiter/elythra.jpg", alt: "Elythra Edufyi Tech logo", recruitments: 20 },
  { src: "/images/pastRecruiter/persevex.png", alt: "Persevex logo", recruitments: 18 },
  // Reliance: RIL (16) + Reliance Industries (3) = 19
  { src: "/images/pastRecruiter/reliance.png", alt: "Reliance Industries logo", recruitments: 16 },
  { src: "/images/pastRecruiter/glowlogics.jpg", alt: "GlowLogics logo", recruitments: 17 },
  { src: "/images/pastRecruiter/usefulbi.png", alt: "UsefulBI logo", recruitments: 15 },
  { src: "/images/pastRecruiter/simpel.png", alt: "Simpel Techlabs logo", recruitments: 15 },
  { src: "/images/pastRecruiter/Mindseekers.jpg", alt: "Mindseekers logo", recruitments: 14 },
  // IBM: IBM (8) + IBM Diversity (6) = 14
  { src: "/images/pastRecruiter/ibm-logo-hd.png", alt: "IBM logo", recruitments: 14 },
  { src: "/images/pastRecruiter/mycaptain.png", alt: "MyCaptain logo", recruitments: 11 },
  { src: "/images/pastRecruiter/globalautotech.png", alt: "Global Autotech logo", recruitments: 10 },
  { src: "/images/pastRecruiter/soti.png", alt: "SOTI logo", recruitments: 9 },
  { src: "/images/pastRecruiter/dcmshriram.png", alt: "DCM Shriram Sugar logo", recruitments: 8 },
  { src: "/images/pastRecruiter/ncc.jpg", alt: "NCC logo", recruitments: 8 },
  { src: "/images/pastRecruiter/ioagpl.gif", alt: "IOAGPL logo", recruitments: 8 },
  // IndiaMART: FSF (7) + Tele (1) = 8
  { src: "/images/pastRecruiter/indiamart.png", alt: "IndiaMART logo", recruitments: 8 },
  { src: "/images/pastRecruiter/lawsikho.jpg", alt: "LawSikho & Skill Arbitrage logo", recruitments: 7 },
  { src: "/images/pastRecruiter/zeta.png", alt: "Zeta logo", recruitments: 7 },
  { src: "/images/pastRecruiter/InMobi.png", alt: "InMobi Group logo", recruitments: 7 },
  { src: "/images/pastRecruiter/inox.jpg", alt: "INOX logo", recruitments: 7 },
  { src: "/images/pastRecruiter/bharatelectronics.png", alt: "BEL logo", recruitments: 7 },
  { src: "/images/pastRecruiter/arcad.png", alt: "Arcad Software logo", recruitments: 7 },
  { src: "/images/pastRecruiter/hightechnext.jpg", alt: "High Technext logo", recruitments: 6 },
  { src: "/images/pastRecruiter/paramount.jpg", alt: "Paramount Powders logo", recruitments: 6 },
  // NewGenesis: NewGenesis (5) + NewGenesis PG (1) = 6
  { src: "/images/pastRecruiter/newgen.avif", alt: "NewGenesis logo", recruitments: 6 },
  { src: "/images/pastRecruiter/dlf.png", alt: "DLF logo", recruitments: 5 },
  { src: "/images/pastRecruiter/balrampur.jpg", alt: "Balrampur Chini Mills logo", recruitments: 5 },
  { src: "/images/pastRecruiter/vecv.png", alt: "VECV logo", recruitments: 5 },
  { src: "/images/pastRecruiter/PlanetSpark.jpg", alt: "PlanetSpark logo", recruitments: 5 },
  { src: "/images/pastRecruiter/bot.jpg", alt: "BOT logo", recruitments: 5 },
  { src: "/images/pastRecruiter/cemtics.jpg", alt: "Cemtics logo", recruitments: 5 },
  { src: "/images/pastRecruiter/sagardefence.png", alt: "Sagar Defence logo", recruitments: 5 },
  { src: "/images/pastRecruiter/lognormalanalytics.jpg", alt: "Lognormal Analytics logo", recruitments: 4 },
  { src: "/images/pastRecruiter/adrosonic.png", alt: "Adrosonic logo", recruitments: 4 },
  { src: "/images/pastRecruiter/meghaeng.jpg", alt: "Megha Engineering logo", recruitments: 4 },
  // L&T: Larsen & Toubro (2) + Larsen & Toubro PG (1) = 3
  { src: "/images/pastRecruiter/LT.avif", alt: "Larsen & Toubro logo", recruitments: 3 },
  { src: "/images/pastRecruiter/airtel.jpg", alt: "Bharti Airtel logo", recruitments: 3 },
  { src: "/images/pastRecruiter/fundsaudit.jpg", alt: "FundsAudit logo", recruitments: 3 },
  { src: "/images/pastRecruiter/hul.png", alt: "Hindustan Unilever logo", recruitments: 2 },
  { src: "/images/pastRecruiter/Apollo_Tyres.jpg", alt: "Apollo Tyres logo", recruitments: 2 },
  { src: "/images/pastRecruiter/walmart.jpg", alt: "Walmart logo", recruitments: 2 },
  { src: "/images/pastRecruiter/deloitte.png", alt: "Deloitte logo", recruitments: 2 },
  { src: "/images/pastRecruiter/inteligenai.jpg", alt: "InteligenAI logo", recruitments: 2 },
  { src: "/images/pastRecruiter/jyesta.jpg", alt: "Jyesta Corporate Entity logo", recruitments: 2 },
  { src: "/images/pastRecruiter/npcl.png", alt: "NPCL logo", recruitments: 2 },
  { src: "/images/pastRecruiter/innoknowvex.jpg", alt: "Innoknowvex logo", recruitments: 2 },
  { src: "/images/pastRecruiter/intellipaat.jpg", alt: "Intellipaat logo", recruitments: 2 },
  { src: "/images/pastRecruiter/bacl.jpg", alt: "BACL logo", recruitments: 2 },
  { src: "/images/pastRecruiter/triveni.webp", alt: "Triveni Almirah logo", recruitments: 2 },
  { src: "/images/pastRecruiter/escorts.jpg", alt: "Escorts Kubota logo", recruitments: 1 },
  { src: "/images/pastRecruiter/jaroeducation.png", alt: "Jaro Education logo", recruitments: 1 },
  { src: "/images/pastRecruiter/forbes.png", alt: "Forbes Marshall logo", recruitments: 1 },
  { src: "/images/pastRecruiter/assaabloy.jpg", alt: "ASSA ABLOY logo", recruitments: 1 },
  { src: "/images/pastRecruiter/gocomet.svg", alt: "GoComet logo", recruitments: 1 },
  { src: "/images/pastRecruiter/faceprep.svg", alt: "FACE Prep logo", recruitments: 1 },
  { src: "/images/pastRecruiter/biopetro.jpg", alt: "Bio Petro Clean India logo", recruitments: 1 },
  { src: "/images/pastRecruiter/carnation.png", alt: "Carnation Infotech logo", recruitments: 1 },
  { src: "/images/pastRecruiter/garism.jpg", alt: "Grasim Industries logo", recruitments: 1 },
  { src: "/images/pastRecruiter/asahi.jpg", alt: "Asahi India Glass logo", recruitments: 1 },
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

                        <div className="flip-card-front">
                          <Image
                            src={logo.src}
                            alt={logo.alt}
                            className="w-full h-full object-contain relative z-10"
                            width={240}
                            height={140}
                            sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 16vw"
                            loading="lazy"
                          />
                        </div>

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
                          className={`group relative rounded-[26px] p-[1px] ${isActive
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
                    className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === index ? "w-8 bg-blue-900" : "w-2.5 bg-blue-200 hover:bg-blue-400"
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
