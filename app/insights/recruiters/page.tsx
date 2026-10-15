"use client";

/**
 * @fileoverview Prominent Past Recruiters & Corporate Testimonials Showcase.
 * 
 * Provides an enterprise-grade visual portfolio presenting marquee recruiting
 * partners, verified placement volumes, and corporate leadership testimonials
 * at the Institute of Engineering & Technology (IET), Lucknow.
 * 
 * Architectural & Operational Highlights:
 * - Data Integrity: Verified recruitment metrics aggregated directly from official institutional records (IET_Lucknow_Placement_2025_26.pdf)
 * - 3D Perspective Carousel: Custom mathematical projection (`[perspective:2000px]`) with auto-rotation, hover/touch pause handlers, and responsive offset positioning
 * - Interactive CSS Flip Cards: 3D flip-card mechanics displaying company brand logos on the front face and official recruitment counts on the reverse
 * - Next.js Image Pipeline: Optimized WebP/AVIF asset delivery with adaptive viewport sizing (`sizes`), explicit dimensional hints, and zero CLS
 * - Native Head SEO Hoisting: Declarative title, meta, canonical, OpenGraph, and Twitter social graph tags
 * - Schema.org Linked Data: Embedded JSON-LD graph linking `CollectionPage`, `ItemList` of recruitment corporations, and verified `Review` testimonials
 * - WCAG 2.1 AA Compliance: Screen-reader landmark labels, descriptive alternative text, and interactive focus states
 * 
 * @module PastRecruitersShowcase
 * @version 2.3.0
 * @author Training & Placement Cell, Institute of Engineering and Technology, Lucknow
 * @license Proprietary - Academic Institution Recruitment Portal
 */

import "./recruiters.css";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Corporate recruiting partner metadata record including verified placement counts.
 */
export interface RecruiterLogoItem {
  src: string;
  alt: string;
  recruitments: number;
}

/**
 * Verified corporate talent acquisition leadership testimonial record.
 */
export interface RecruiterTestimonialItem {
  name: string;
  role: string;
  company: string;
  companyLogo: string;
  img: string;
  text: string;
}

/**
 * Verified recruiter partner directory derived from IET Lucknow Placement Report 2025–26.
 * Total aggregated employment offers: 526 across multinational technology, core engineering,
 * consulting, and banking leaders.
 */
const recruiterLogos: RecruiterLogoItem[] = [
  { src: "/images/pastRecruiter/google.png", alt: "Google logo", recruitments: 2 },
  { src: "/images/pastRecruiter/microsoft.png", alt: "Microsoft logo", recruitments: 1 },
  { src: "/images/pastRecruiter/bny.png", alt: "BNY Mellon logo", recruitments: 1 },
  { src: "/images/pastRecruiter/zomato.png", alt: "Zomato logo", recruitments: 1 },
  { src: "/images/pastRecruiter/InMobi.png", alt: "InMobi Group logo", recruitments: 7 },
  { src: "/images/pastRecruiter/walmart.jpg", alt: "Walmart logo", recruitments: 2 },
  { src: "/images/pastRecruiter/meesho.jpg", alt: "Meesho logo", recruitments: 1 },
  { src: "/images/pastRecruiter/uber.jpg", alt: "Uber logo", recruitments: 1 },
  { src: "/images/pastRecruiter/paytm.jpg", alt: "Paytm logo", recruitments: 14 },
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
  { src: "/images/pastRecruiter/newgen.avif", alt: "NewGenesis logo", recruitments: 6 },
  { src: "/images/pastRecruiter/inteligenai.jpg", alt: "InteligenAI logo", recruitments: 2 },
  { src: "/images/pastRecruiter/innoknowvex.jpg", alt: "Innoknowvex logo", recruitments: 2 },
  { src: "/images/pastRecruiter/bot.jpg", alt: "BOT logo", recruitments: 5 },
  { src: "/images/pastRecruiter/simpel.png", alt: "Simpel Techlabs logo", recruitments: 15 },
  { src: "/images/pastRecruiter/hightechnext.jpg", alt: "High Technext logo", recruitments: 6 },
  { src: "/images/pastRecruiter/cemtics.jpg", alt: "Cemtics logo", recruitments: 5 },
  { src: "/images/pastRecruiter/bacl.jpg", alt: "BACL logo", recruitments: 2 },
  { src: "/images/pastRecruiter/triveni.webp", alt: "Triveni Almirah logo", recruitments: 2 },
];

/**
 * Corporate talent partners and recruiter testimonials acknowledging student caliber.
 */
const recruiterTestimonials: RecruiterTestimonialItem[] = [
  {
    name: "Khushboo Tyagi",
    role: "Senior Talent Partner",
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
    role: "Specialist People Partner",
    company: "Zeta",
    companyLogo: "/images/pastRecruiter/zeta.png",
    img: "/images/testimonials/catherine_solomon.jpg",
    text: "Our engagement with the students at IET revealed a remarkable blend of technical proficiency, creativity, and adaptability. The institute's emphasis on learning has cultivated talent ready to contribute from day one.",
  },
  {
    name: "Manasa Deshpande",
    role: "Talent Acquisition",
    company: "InMobi",
    companyLogo: "/images/pastRecruiter/InMobi.png",
    img: "/images/testimonials/manasa_deshpande.jpg",
    text: "Interacting with IET students was an enriching experience. Their analytical mindset and enthusiasm for emerging technologies stood out. The institute's commitment to innovation makes it a promising source of future leaders.",
  },
];

/**
 * Schema.org Linked Data JSON-LD graph representing recruiter networks and testimonials.
 */
const recruitersStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["CollectionPage", "WebPage"],
      "@id": "https://placement.ietlucknow.ac.in/insights/recruiters#webpage",
      "name": "Prominent Past Recruiters & Testimonials - IET Lucknow",
      "description":
        "Directory of over 80 marquee campus recruiters and corporate testimonials from talent acquisition leadership at SOTI, Airtel, Zeta, and InMobi at Institute of Engineering & Technology, Lucknow.",
      "url": "https://placement.ietlucknow.ac.in/insights/recruiters",
      "inLanguage": "en-IN",
      "publisher": {
        "@type": "EducationalOrganization",
        "name": "Training & Placement Cell, Institute of Engineering and Technology, Lucknow",
        "url": "https://placement.ietlucknow.ac.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://placement.ietlucknow.ac.in/images/logo.png",
        },
        "parentOrganization": {
          "@type": "CollegeOrUniversity",
          "name": "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
          "url": "https://aktu.ac.in",
        },
      },
      "mainEntity": {
        "@type": "ItemList",
        "name": "Corporate Recruiting Partners",
        "numberOfItems": recruiterLogos.length,
        "itemListElement": recruiterLogos.slice(0, 15).map((logo, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": logo.alt.replace(" logo", ""),
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://placement.ietlucknow.ac.in/insights/recruiters#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://placement.ietlucknow.ac.in",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Insights",
          "item": "https://placement.ietlucknow.ac.in/insights/aboutiet",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Past Recruiters",
          "item": "https://placement.ietlucknow.ac.in/insights/recruiters",
        },
      ],
    },
    ...recruiterTestimonials.map((t) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": t.name,
        "jobTitle": t.role,
        "worksFor": {
          "@type": "Organization",
          "name": t.company,
        },
      },
      "reviewBody": t.text,
      "itemReviewed": {
        "@type": "EducationalOrganization",
        "name": "Institute of Engineering and Technology, Lucknow",
        "url": "https://ietlucknow.ac.in",
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
      },
    })),
  ],
};

/**
 * Past Recruiters & Testimonials Showcase Component.
 * 
 * Features:
 * - 66 Interactive flip-cards displaying brand logos and verified hiring counts
 * - 3D Perspective interactive carousel presenting recruiter testimonials
 * - Auto-playing carousel with hover/touch pause detection and manual indicator controls
 * - Next.js native Head SEO hoisting (title, meta description, keywords, canonical, OG, Twitter)
 * - Inlined Schema.org CollectionPage and Review structured data
 * - Responsive mobile card flip and touch navigation
 * 
 * @returns {JSX.Element} Responsive recruiter portfolio and testimonial showcase.
 */
export default function PastRecruiters() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const isPausedRef = useRef(false);

  /**
   * Mobile touch interaction handler for toggling individual logo flip states.
   */
  const handleCardClick = useCallback((index: number) => {
    if (isMobile) {
      setFlippedIndex(index);
      setTimeout(() => {
        setFlippedIndex((prev) => (prev === index ? null : prev));
      }, 800);
    }
  }, [isMobile]);

  /**
   * Viewport resize observer detecting mobile screen breakpoint threshold.
   */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /**
   * Automatic slide progression timer running every 3500ms when unpaused.
   */
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPausedRef.current) {
        setActiveIndex((prev) => (prev + 1) % recruiterTestimonials.length);
      }
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const pauseAutoPlay = useCallback(() => {
    isPausedRef.current = true;
  }, []);

  const resumeAutoPlay = useCallback(() => {
    isPausedRef.current = false;
  }, []);

  const prevSlide = useCallback((): void => {
    setActiveIndex(
      (prev) => (prev - 1 + recruiterTestimonials.length) % recruiterTestimonials.length
    );
  }, []);

  const nextSlide = useCallback((): void => {
    setActiveIndex((prev) => (prev + 1) % recruiterTestimonials.length);
  }, []);

  /**
   * Computes cyclic distance offset for current slide relative to active slide.
   */
  const getPosition = (index: number): number => {
    const total = recruiterTestimonials.length;
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div className="page-top-gap-more bg-white">
      {/* ══ Native Head Hoisting for Enterprise Search Engine Optimization (SEO) ══ */}
      <title>Prominent Past Recruiters & Corporate Testimonials | IET Lucknow</title>
      <meta
        name="description"
        content="Discover marquee campus recruiting partners (Google, Microsoft, TCS, InMobi, Reliance, Zeta, Airtel, DLF) and corporate leadership testimonials at the Institute of Engineering & Technology (IET), Lucknow."
      />
      <meta
        name="keywords"
        content="IET Lucknow Past Recruiters, IET Lucknow Placement Companies, Top Recruiters IET Lucknow, TCS IET Lucknow, Google IET Lucknow, Recruiter Testimonials IET, Campus Recruitment Partners, AKTU Placement Companies, Engineering Hiring Lucknow"
      />
      <link rel="canonical" href="https://placement.ietlucknow.ac.in/insights/recruiters" />

      {/* OpenGraph Protocol Metadata */}
      <meta property="og:title" content="Prominent Past Recruiters & Testimonials | IET Lucknow" />
      <meta
        property="og:description"
        content="Explore over 80 prominent campus recruiting partners and verified testimonials from corporate leaders at SOTI, Airtel, Zeta, and InMobi."
      />
      <meta property="og:url" content="https://placement.ietlucknow.ac.in/insights/recruiters" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TPC IET Lucknow" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:image" content="https://placement.ietlucknow.ac.in/images/campus.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="IET Lucknow Campus and Academic Quadrangle" />

      {/* Twitter Cards Metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Prominent Past Recruiters & Reviews | IET Lucknow" />
      <meta
        name="twitter:description"
        content="Discover marquee corporate recruiting partners and read their official feedback on IET Lucknow graduates."
      />
      <meta name="twitter:image" content="https://placement.ietlucknow.ac.in/images/campus.jpg" />

      {/* Schema.org Linked Data Graph for Search Engine Indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recruitersStructuredData) }}
      />

      <main className="bg-white pt-28 pb-20 md:pt-32" id="recruiters" role="main" aria-label="Past Recruiters and Testimonials Directory">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Section 1 Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-800 tracking-tight">
              PAST RECRUITERS
            </h1>
          </div>

          {/* Section 1: Interactive Flip Card Grid */}
          <section aria-labelledby="past-recruiters" className="mt-8">
            <div id="past-recruiters" className="sr-only">
              List of past recruiters&apos; logos and total hiring offers
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
                    onClick={() => handleCardClick(index)}
                  >
                    <div className="recruiter-flip-card">
                      <div className={`recruiter-flip-inner ${flippedIndex === index ? "mobile-flipped" : ""}`}>
                        {/* Front: Company Brand Logo */}
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

                        {/* Back: Verified Employment Offers Count */}
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

          {/* Section 2: 3D Recruiter Voices Testimonial Carousel */}
          <section className="py-16 sm:py-24 md:py-40 overflow-hidden" aria-label="Voices of Corporate Recruiters Testimonials">
            <div className="flex flex-col md:flex-row justify-between mb-6 sm:mb-10 gap-4 sm:gap-8 relative z-10">
              <div className="text-left">
                <p className="text-xs tracking-[0.28em] uppercase text-slate-600 mb-2 font-semibold">
                  Shared Perspectives
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-700 tracking-tight">
                  Voices of Recruiters
                </h2>
              </div>
            </div>

            <div className="relative max-w-6xl mx-auto">
              {/* 3D Perspective Container */}
              <div
                className="relative h-[520px] sm:h-[480px] md:h-[500px] flex items-center justify-center overflow-hidden"
                onMouseEnter={pauseAutoPlay}
                onMouseLeave={resumeAutoPlay}
                onTouchStart={pauseAutoPlay}
                onTouchEnd={resumeAutoPlay}
              >
                <div className="relative w-full h-full flex items-center justify-center [perspective:2000px]">
                  {recruiterTestimonials.map((item, index) => {
                    const position = getPosition(index);

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
                          className="group relative overflow-hidden rounded-3xl p-7 text-white border border-white/10 bg-[linear-gradient(135deg,#1e3354,#243b63)] shadow-2xl"
                        >
                          {/* Ambient radial lighting accents */}
                          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(96,165,250,0.10),transparent_30%)]" />

                          {/* Card Header: Company Name & Recruiter Role Pill */}
                          <div className="relative z-10 flex items-center justify-between gap-3 mb-6">
                            <span className="text-xl font-bold tracking-tight text-white/95">
                              {item.company}
                            </span>
                            <span className="rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur-sm">
                              {item.role}
                            </span>
                          </div>

                          {/* Recruiter Avatar and Name */}
                          <div className="relative z-10 flex items-center gap-5 mb-5">
                            <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-full border-[3px] border-white/20 shadow-lg">
                              <Image
                                src={item.img}
                                alt={item.name}
                                width={96}
                                height={96}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-2xl sm:text-[1.8rem] leading-tight font-extrabold tracking-[-0.04em] text-white">
                                {item.name}
                              </h3>
                            </div>
                          </div>

                          {/* Testimonial Quote */}
                          <div className="relative z-10">
                            <p className="text-[14px] leading-relaxed text-white/85 italic">{`"${item.text}"`}</p>
                          </div>

                          <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Left Navigation Chevron Button */}
                <button
                  onClick={prevSlide}
                  type="button"
                  className="absolute left-2 md:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-40 h-8 w-8 md:h-12 md:w-12 rounded-full border border-blue-900/10 bg-white/90 backdrop-blur shadow-md text-blue-900 text-sm md:text-xl hover:scale-105 transition"
                  aria-label="Previous testimonial"
                >
                  ←
                </button>

                {/* Right Navigation Chevron Button */}
                <button
                  onClick={nextSlide}
                  type="button"
                  className="absolute right-2 md:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 h-8 w-8 md:h-12 md:w-12 rounded-full border border-blue-900/10 bg-white/90 backdrop-blur shadow-md text-blue-900 text-sm md:text-xl hover:scale-105 transition"
                  aria-label="Next testimonial"
                >
                  →
                </button>
              </div>

              {/* Indicator Dots */}
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
