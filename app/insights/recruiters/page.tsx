"use client";

import "./recruiters.css";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Real recruiter data from IET Lucknow Placement Report 2025-26 ───────────
// Source: IET_Lucknow_Placement_2025_26.pdf  |  Grand Total Offers: 526
// Recruitments are aggregated across all sub-categories per company.
const recruiterLogos = [
  { src: "/images/pastRecruiter/google.png", alt: "Google logo", recruitments: 2 },
  { src: "/images/pastRecruiter/microsoft.png", alt: "Microsoft logo", recruitments: 1 },
  { src: "/images/pastRecruiter/bny.png", alt: "BNY Mellon logo", recruitments: 1 },
  { src: "/images/pastRecruiter/zomato.png", alt: "Zomato logo", recruitments: 1 },
  { src: "/images/pastRecruiter/InMobi.png", alt: "InMobi Group logo", recruitments: 7 },
  { src: "/images/pastRecruiter/walmart.jpg", alt: "Walmart logo", recruitments: 2 },
  { src: "/images/pastRecruiter/hul.png", alt: "Hindustan Unilever logo", recruitments: 2 },
  { src: "/images/pastRecruiter/reliance.png", alt: "Reliance Industries logo", recruitments: 16 },
  { src: "/images/pastRecruiter/ibm-logo-hd.png", alt: "IBM logo", recruitments: 14 },
  { src: "/images/pastRecruiter/indiamart.png", alt: "IndiaMART logo", recruitments: 8 },
  { src: "/images/pastRecruiter/deloitte.png", alt: "Deloitte logo", recruitments: 2 },
  { src: "/images/pastRecruiter/soti.png", alt: "SOTI logo", recruitments: 9 },
  { src: "/images/pastRecruiter/zeta.png", alt: "Zeta logo", recruitments: 7 },
  { src: "/images/pastRecruiter/tcs.png", alt: "TCS logo", recruitments: 60 },
  { src: "/images/pastRecruiter/LT.avif", alt: "Larsen & Toubro logo", recruitments: 3 },
  { src: "/images/pastRecruiter/airtel.jpg", alt: "Bharti Airtel logo", recruitments: 3 },
  { src: "/images/pastRecruiter/bharatelectronics.png", alt: "BEL logo", recruitments: 7 },
  { src: "/images/pastRecruiter/Apollo_Tyres.jpg", alt: "Apollo Tyres logo", recruitments: 2 },
  { src: "/images/pastRecruiter/dlf.png", alt: "DLF logo", recruitments: 5 },
  { src: "/images/pastRecruiter/garism.jpg", alt: "Grasim Industries logo", recruitments: 1 },
  { src: "/images/pastRecruiter/assaabloy.jpg", alt: "ASSA ABLOY logo", recruitments: 1 },
  { src: "/images/pastRecruiter/escorts.jpg", alt: "Escorts Kubota logo", recruitments: 1 },
  { src: "/images/pastRecruiter/vecv.png", alt: "VECV logo", recruitments: 5 },
  { src: "/images/pastRecruiter/torrent.png", alt: "Torrent logo", recruitments: 28 },
  { src: "/images/pastRecruiter/ncc.jpg", alt: "NCC logo", recruitments: 8 },
  { src: "/images/pastRecruiter/dcmshriram.png", alt: "DCM Shriram Sugar logo", recruitments: 8 },
  { src: "/images/pastRecruiter/forbes.png", alt: "Forbes Marshall logo", recruitments: 1 },
  { src: "/images/pastRecruiter/npcl.png", alt: "NPCL logo", recruitments: 2 },
  { src: "/images/pastRecruiter/asahi.jpg", alt: "Asahi India Glass logo", recruitments: 1 },
  { src: "/images/pastRecruiter/ioagpl.gif", alt: "IOAGPL logo", recruitments: 8 },
  { src: "/images/pastRecruiter/balrampur.jpg", alt: "Balrampur Chini Mills logo", recruitments: 5 },
  { src: "/images/pastRecruiter/jaroeducation.png", alt: "Jaro Education logo", recruitments: 1 },
  { src: "/images/pastRecruiter/PlanetSpark.jpg", alt: "PlanetSpark logo", recruitments: 5 },
  { src: "/images/pastRecruiter/intellipaat.jpg", alt: "Intellipaat logo", recruitments: 2 },
  { src: "/images/pastRecruiter/mycaptain.png", alt: "MyCaptain logo", recruitments: 11 },
  { src: "/images/pastRecruiter/gocomet.svg", alt: "GoComet logo", recruitments: 1 },
  { src: "/images/pastRecruiter/usefulbi.png", alt: "UsefulBI logo", recruitments: 15 },
  { src: "/images/pastRecruiter/adrosonic.png", alt: "Adrosonic logo", recruitments: 4 },
  { src: "/images/pastRecruiter/averixis.png", alt: "Averixis Solutions logo", recruitments: 33 },
  { src: "/images/pastRecruiter/Mindseekers.jpg", alt: "Mindseekers logo", recruitments: 14 },
  { src: "/images/pastRecruiter/lawsikho.jpg", alt: "LawSikho & Skill Arbitrage logo", recruitments: 7 },
  { src: "/images/pastRecruiter/elythra.jpg", alt: "Elythra Edufyi Tech logo", recruitments: 20 },
  { src: "/images/pastRecruiter/eduveda.png", alt: "Eduveda Academy logo", recruitments: 32 },
  { src: "/images/pastRecruiter/Launched.png", alt: "Launched Global logo", recruitments: 31 },
  { src: "/images/pastRecruiter/persevex.png", alt: "Persevex logo", recruitments: 18 },
  { src: "/images/pastRecruiter/lognormalanalytics.jpg", alt: "Lognormal Analytics logo", recruitments: 4 },
  { src: "/images/pastRecruiter/glowlogics.jpg", alt: "GlowLogics logo", recruitments: 17 },
  { src: "/images/pastRecruiter/arcad.png", alt: "Arcad Software logo", recruitments: 7 },
  { src: "/images/pastRecruiter/sagardefence.png", alt: "Sagar Defence logo", recruitments: 5 },
  { src: "/images/pastRecruiter/inox.jpg", alt: "INOX logo", recruitments: 7 },
  { src: "/images/pastRecruiter/globalautotech.png", alt: "Global Autotech logo", recruitments: 10 },
  { src: "/images/pastRecruiter/meghaeng.jpg", alt: "Megha Engineering logo", recruitments: 4 },
  { src: "/images/pastRecruiter/paramount.jpg", alt: "Paramount Powders logo", recruitments: 6 },
  { src: "/images/pastRecruiter/biopetro.jpg", alt: "Bio Petro Clean India logo", recruitments: 1 },
  { src: "/images/pastRecruiter/jyesta.jpg", alt: "Jyesta Corporate Entity logo", recruitments: 2 },
  { src: "/images/pastRecruiter/faceprep.svg", alt: "FACE Prep logo", recruitments: 1 },
  { src: "/images/pastRecruiter/fundsaudit.jpg", alt: "FundsAudit logo", recruitments: 3 },
  { src: "/images/pastRecruiter/newgen.avif", alt: "NewGenesis logo", recruitments: 6 },
  { src: "/images/pastRecruiter/inteligenai.jpg", alt: "InteligenAI logo", recruitments: 2 },
  { src: "/images/pastRecruiter/innoknowvex.jpg", alt: "Innoknowvex logo", recruitments: 2 },
  { src: "/images/pastRecruiter/bot.jpg", alt: "BOT logo", recruitments: 5 },
  { src: "/images/pastRecruiter/simpel.png", alt: "Simpel Techlabs logo", recruitments: 15 },
  { src: "/images/pastRecruiter/hightechnext.jpg", alt: "High Technext logo", recruitments: 6 },
  { src: "/images/pastRecruiter/cemtics.jpg", alt: "Cemtics logo", recruitments: 5 },
  { src: "/images/pastRecruiter/carnation.png", alt: "Carnation Infotech logo", recruitments: 1 },
  { src: "/images/pastRecruiter/bacl.jpg", alt: "BACL logo", recruitments: 2 },
  { src: "/images/pastRecruiter/triveni.webp", alt: "Triveni Almirah logo", recruitments: 2 },
];

const recruiterTestimonials = [
  {
    name: "Khushboo Tyagi",
    role: "Campus Recruiter",
    company: "SOTI",
    companyLogo: "/images/pastRecruiter/soti.png",
    img: "/images/testimonials/khushboo_tyagi.jpg",
    text: "We had a great time at IET for campus placements. The number and quality of corporate-ready students is astounding. The placement team worked well together to carry out the recruitment drive.",
  },
  {
    name: "Tanzila",
    role: "Campus Recruiter",
    company: "Airtel",
    companyLogo: "/images/pastRecruiter/airtel.jpg",
    img: "/images/testimonials/tanzila.jpg",
    text: "The students at IET demonstrate strong technical foundations, professional maturity, and a practical approach to problem-solving. Their industry readiness make IET a preferred destination for recruiting talent.",
  },
  {
    name: "Catherine Solomon",
    role: "Campus Recruiter",
    company: "Zeta",
    companyLogo: "/images/pastRecruiter/zeta.png",
    img: "/images/testimonials/catherine_solomon.jpg",
    text: "Our engagement with the students at IET revealed a remarkable blend of technical proficiency, creativity, and adaptability. The institute's emphasis on learning has cultivated talent ready to contribute from day one.",
  },
  {
    name: "Manasa Deshpande",
    role: "Campus Recruiter",
    company: "InMobi",
    companyLogo: "/images/pastRecruiter/InMobi.png",
    img: "/images/testimonials/manasa_deshpande.jpg",
    text: "Interacting with IET students was an enriching experience. Their analytical mindset and enthusiasm for emerging technologies stood out. The institute's commitment to innovation makes it a promising source of future leaders.",
  },
];


export default function PastRecruiters() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPausedRef.current) {
        setActiveIndex((prev) => (prev + 1) % recruiterTestimonials.length);
      }
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const pauseAutoPlay = useCallback(() => { isPausedRef.current = true; }, []);
  const resumeAutoPlay = useCallback(() => { isPausedRef.current = false; }, []);

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
                    className="recruiter-card-wrapper"
                    style={{ "--card-delay": delay } as React.CSSProperties}
                  >
                    <div className="recruiter-flip-card">
                      <div className="recruiter-flip-inner">

                        <div className="recruiter-flip-front">
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

                        <div className="recruiter-flip-back">
                          <div className="recruiter-flip-back-content">
                            <div className="recruiter-flip-count">{logo.recruitments}</div>
                            <div className="recruiter-flip-divider" />
                            <div className="recruiter-flip-label">Recruitments</div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="py-16 sm:py-24 md:py-40 overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between mb-6 sm:mb-10 gap-4 sm:gap-8 relative z-[50]">
              <div className="text-left">
                <p className="text-xs tracking-[0.28em] uppercase text-slate-600 mb-2">
                  Shared Perspectives
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-700">
                  Voices of Recruiters
                </h2>
              </div>
            </div>

            <div className="relative max-w-6xl mx-auto">
              <div
                className="relative h-[620px] sm:h-[580px] md:h-[590px] flex items-start sm:items-center justify-center overflow-hidden"
                onMouseEnter={pauseAutoPlay}
                onMouseLeave={resumeAutoPlay}
                onTouchStart={pauseAutoPlay}
                onTouchEnd={resumeAutoPlay}
              >
                <div className="relative w-full h-full flex items-start sm:items-center justify-center [perspective:2000px] pt-4 sm:pt-0">
                  {recruiterTestimonials.map((item, index) => {
                    const position = getPosition(index);
                    const isActive = position === 0;

                    let cardStyle: React.CSSProperties = {};
                    if (position === 0) {
                      cardStyle = { transform: "translateX(0px) scale(1) rotateY(0deg)", opacity: 1, zIndex: 30 };
                    } else if (position === -1) {
                      cardStyle = isMobile
                        ? { transform: "translateX(-110%) scale(0.85)", opacity: 0, zIndex: 10 }
                        : { transform: "translateX(-76%) scale(0.92) rotateY(16deg)", opacity: 0.96, zIndex: 20 };
                    } else if (position === 1) {
                      cardStyle = isMobile
                        ? { transform: "translateX(110%) scale(0.85)", opacity: 0, zIndex: 10 }
                        : { transform: "translateX(76%) scale(0.92) rotateY(-16deg)", opacity: 0.96, zIndex: 20 };
                    } else if (position < 0) {
                      cardStyle = { transform: "translateX(-102%) scale(0.82) rotateY(18deg)", opacity: 0, zIndex: 10 };
                    } else {
                      cardStyle = { transform: "translateX(102%) scale(0.82) rotateY(-18deg)", opacity: 0, zIndex: 10 };
                    }

                    return (
                      <div
                        key={`${item.name}-${index}`}
                        className="absolute w-[min(88vw,320px)] sm:w-[340px] md:w-[380px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={cardStyle}
                      >
                        <div
                          className={`group relative overflow-hidden rounded-3xl p-7 text-white border border-white/10 bg-[linear-gradient(135deg,#1e3354,#243b63)]`}
                        >
                          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(96,165,250,0.10),transparent_30%)]" />

                          <div className="relative z-10 flex items-center justify-between gap-3 mb-5">
                            <span className="text-xl font-bold tracking-tight text-white/95">
                              {item.company}
                            </span>
                            <span className="rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur-sm">
                              {item.role}
                            </span>
                          </div>

                          <div className="relative z-10 mb-5 overflow-hidden rounded-2xl">
                            <img
                              src={item.img}
                              alt={item.name}
                              className="h-48 w-full object-cover object-[center_25%] transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          </div>

                          <div className="relative z-10">
                            <h3 className="text-[1.8rem] leading-tight font-extrabold tracking-[-0.04em] text-white">
                              {item.name}
                            </h3>
                            <p className="mt-2 text-[14px] text-white/75">{item.role}</p>
                            <p className="mt-4 text-[14px] leading-7 text-white/85">{`"${item.text}"`}</p>
                          </div>

                          <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
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
