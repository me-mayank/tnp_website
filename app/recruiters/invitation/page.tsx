"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

type RecruiterKey =
  | "adobe"
  | "amazon"
  | "arcad"
  | "ashok"
  | "atlassian"
  | "bajaj"
  | "bharatelectronics"
  | "birlasoft"
  | "bny"
  | "capgemini"
  | "cisco"
  | "cognizant"
  | "dlf"
  | "eicher"
  | "ericsson"
  | "escorts"
  | "essar"
  | "forbes"
  | "gainsight"
  | "goldman"
  | "google"
  | "groupon"
  | "hcl"
  | "hero"
  | "honda"
  | "hul"
  | "ibm-logo-hd"
  | "infosys"
  | "InMobi"
  | "inox"
  | "Intuit"
  | "jaroeducation"
  | "lntinfotech"
  | "LT"
  | "mahindra"
  | "meesho"
  | "microsoft"
  | "morgan"
  | "newgen"
  | "oracle"
  | "paytm"
  | "persistant"
  | "prism"
  | "rippling"
  | "salesforce"
  | "samsung"
  | "servicenow"
  | "shapoorji"
  | "slice"
  | "soti"
  | "tactai"
  | "tata_motors"
  | "tcs"
  | "torrent"
  | "uber"
  | "unacademy"
  | "upstox"
  | "usefulbi"
  | "volvo"
  | "wayfair"
  | "wipro"
  | "zeta"
  | "zomato"
  | "zs"
  | "zscaler";

interface Testimonial {
  name: string;
  role: string;
  company: RecruiterKey;
  img: string;
  text: string;
}

// =============================================================================
// HERO SECTION
// =============================================================================

function HeroSection(): JSX.Element {
  return (
    <section className="relative w-full h-[60vh]">
      <Image
        src="/images/college.png"
        alt="IET Lucknow College"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
    </section>
  );
}

// =============================================================================
// INVITATION LETTER SECTION
// =============================================================================

function Letter(): JSX.Element {
  return (
    <section className="relative -mt-[40vh] md:-mt-[30vh] z-10 px-4 md:px-6 mb-32">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#efeee9] border border-black/10 rounded-[26px] shadow-[0_24px_70px_rgba(0,0,0,0.14)] md:p-14 px-2">
          <div className="relative max-w-5xl mx-auto w-full bg-white border border-gray-300 rounded-[18px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] px-6 sm:px-8 md:px-12 py-8 md:py-10 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[5px] bg-slate-700" />

            <div className="pb-5 border-b border-gray-300">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                <div>
                  <p className="text-[2rem] md:text-[2.15rem] font-bold uppercase tracking-tight text-slate-800 leading-none">
                    Invitation
                  </p>

                  <h2 className="mt-3 text-[11px] md:text-xs uppercase tracking-[0.24em] text-gray-500">
                    Institute of Engineering and Technology, Lucknow
                  </h2>

                  <p className="mt-2 text-sm font-medium text-gray-700">
                    Training and Placement Cell • Uttar Pradesh, India
                  </p>
                </div>

                <div className="md:text-right text-sm leading-6 text-gray-600 md:pt-1">
                  <p className="font-semibold text-slate-700">
                    Official Communication
                  </p>
                  <p>
                    E-Mail:{" "}
                    <a
                      href="mailto:placement@ietlucknow.ac.in"
                      className="text-slate-700 underline underline-offset-2 hover:text-slate-900"
                    >
                      placement@ietlucknow.ac.in
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 space-y-5 text-[15px] md:text-[15.2px] leading-[1.82] text-gray-800">
              <p className="font-medium text-gray-900">Dear Sir / Madam,</p>

              <p>
                It gives me immense pleasure to extend to you the most cordial
                invitation to participate in the Campus Recruitment programme of
                our Institute. Now, more than ever, the emphasis is on
                Institute-Industry Interaction, and both the Institute and the
                participating Industry are bound to find it mutually beneficial.
              </p>

              <p>
                IET Lucknow, a government institute established in the year 1984,
                is one of the oldest and finest engineering institutes in the
                state of Uttar Pradesh. Over the years, we have developed a strong
                foundation in academics, technology, innovation, and leadership
                in North India. We are among the elite technical institutions of
                the country and have consistently achieved excellence in
                academics and research.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4">
                <p className="font-semibold text-gray-900 mb-2">
                  The Institute offers the following programs:
                </p>

                <ul className="list-disc pl-6 space-y-1.5 text-gray-700 marker:text-slate-700">
                  <li>8 programs for Bachelor of Technology (B.Tech)</li>
                  <li>6 programs for Master of Technology (M.Tech)</li>
                  <li>Master of Business Administration (MBA)</li>
                  <li>Master of Computer Application (MCA)</li>
                </ul>
              </div>

              <p>
                We make continuous efforts to groom our students not only in
                their chosen disciplines but also to broaden their perspectives
                and develop a positive professional attitude. Undergraduate
                students undergo an eight-week industrial training, while MCA
                students complete a six-month training during their final
                semester.
              </p>

              <p>
                We are delighted to invite you to participate in the Campus
                Recruitment Drive for the graduating batch of 2026. It would be
                our privilege if you provide an opportunity to our students for
                campus placements. Additionally, we invite you to participate in
                our Summer Internship Drive for the 2027 batch, allowing you to
                evaluate potential future employees.
              </p>

              <p>
                Enclosed are the Placement Brochure and Department brochures,
                providing detailed insights into our academic programs. Also
                included are the Job Notification Form (JNF) and Internship
                Notification Form (INF). Kindly fill and share them with us so
                that we can schedule your visit at a mutually convenient time.
              </p>

              <p>
                Please feel free to contact us for any further information or
                clarification.
              </p>

              <p>
                We look forward to building a mutually beneficial relationship.
              </p>

              <p className="pt-2 font-medium text-gray-900">Thanks & Regards,</p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-300 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
              <div>
                <p className="font-semibold text-gray-900 text-[15.5px]">
                  Dr. Arun Kumar Tiwari
                </p>
                <p className="mt-1 text-sm text-gray-500">Officer in Charge</p>
                <p className="text-sm text-gray-500">
                  Training and Placement Cell
                </p>
              </div>

              <div className="sm:min-w-[150px]">
                <div className="h-10 border-b border-gray-400" />
                <p className="mt-2 text-right text-sm italic text-gray-400">
                  Signature
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// RECRUITERS SECTION
// =============================================================================

function Recruiters(): JSX.Element {
  const recruiterRows: RecruiterKey[][] = [
    ["adobe", "amazon", "arcad", "ashok", "atlassian"],
    ["bajaj", "bharatelectronics", "birlasoft", "bny", "capgemini"],
    ["cisco", "cognizant", "dlf", "eicher", "ericsson"],
    ["escorts", "essar", "forbes", "gainsight", "goldman"],
    ["google", "groupon", "hcl", "hero", "honda"],
    ["hul", "ibm-logo-hd", "infosys", "InMobi", "inox"],
    ["Intuit", "jaroeducation", "lntinfotech", "LT", "mahindra"],
    ["meesho", "microsoft", "morgan", "newgen", "oracle"],
    ["paytm", "persistant", "prism", "rippling", "salesforce"],
    ["samsung", "servicenow", "shapoorji", "slice", "soti"],
    ["tactai", "tata_motors", "tcs", "torrent", "uber"],
    ["unacademy", "upstox", "usefulbi", "volvo", "wayfair"],
    ["wipro", "zeta", "zomato", "zs", "zscaler"],
  ];

  const recruiterLogos: Record<RecruiterKey, string> = {
    adobe: "adobe.png",
    amazon: "amazon.png",
    arcad: "arcad.png",
    ashok: "ashok.png",
    atlassian: "atlassian.png",
    bajaj: "bajaj.jpg",
    bharatelectronics: "bharatelectronics.png",
    birlasoft: "birlasoft.png",
    bny: "bny.png",
    capgemini: "capgemini.png",
    cisco: "cisco.png",
    cognizant: "cognizant.jpg",
    dlf: "dlf.png",
    eicher: "eicher.png",
    ericsson: "ericsson.png",
    escorts: "escorts.jpg",
    essar: "essar.png",
    forbes: "forbes.png",
    gainsight: "gainsight.png",
    goldman: "goldman.png",
    google: "google.png",
    groupon: "groupon.png",
    hcl: "hcl.png",
    hero: "hero.png",
    honda: "honda.svg",
    hul: "hul.png",
    "ibm-logo-hd": "ibm-logo-hd.png",
    infosys: "infosys.jpg",
    InMobi: "InMobi.png",
    inox: "inox.jpg",
    Intuit: "Intuit.png",
    jaroeducation: "jaroeducation.png",
    lntinfotech: "lntinfotech.jpg",
    LT: "LT.avif",
    mahindra: "mahindra.png",
    meesho: "meesho.webp",
    microsoft: "microsoft.png",
    morgan: "morgan.png",
    newgen: "newgen.avif",
    oracle: "oracle.png",
    paytm: "paytm.png",
    persistant: "persistant.png",
    prism: "prism.png",
    rippling: "rippling.png",
    salesforce: "salesforce.png",
    samsung: "samsung.svg",
    servicenow: "servicenow.png",
    shapoorji: "shapoorji.png",
    slice: "slice.jpg",
    soti: "soti.png",
    tactai: "tactai.png",
    tata_motors: "tata_motors.png",
    tcs: "tcs.png",
    torrent: "torrent.png",
    uber: "uber.svg",
    unacademy: "unacademy.png",
    upstox: "upstox.png",
    usefulbi: "usefulbi.png",
    volvo: "volvo.png",
    wayfair: "wayfair.png",
    wipro: "wipro.png",
    zeta: "zeta.png",
    zomato: "zomato.png",
    zs: "zs.png",
    zscaler: "zscaler.svg",
  };

  const [visibleRows, setVisibleRows] = useState<number>(1);

  const showMore = useCallback((): void => {
    setVisibleRows((prev) =>
      prev < recruiterRows.length ? prev + 1 : prev
    );
  }, [recruiterRows.length]);

  const showLess = useCallback((): void => {
    setVisibleRows(1);
  }, []);

  const isLastRowVisible = visibleRows === recruiterRows.length;

  return (
    <section className="py-24 border-blue-900/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-slate-700">
            Our Esteemed Recruiters
          </h2>
          <p className="text-gray-500 mt-2">
            Trusted by leading global organizations
          </p>
        </div>

        <div className="space-y-8 py-4 overflow-visible">
          {recruiterRows.slice(0, visibleRows).map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-2 md:grid-cols-5 gap-6 animate-fadeIn overflow-visible"
            >
              {row.map((name, i) => {
                const fileName = recruiterLogos[name];

                return (
                  <div
                    key={`${name}-${i}`}
                    className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.04] hover:z-20"
                  >
                    <div className="relative min-h-[110px] bg-white/70 backdrop-blur-xl border border-blue-900/10 rounded-2xl p-6 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:shadow-[0_25px_60px_rgba(0,33,71,0.2)] group-hover:border-blue-900/30">
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-200/40 via-white to-purple-200/40 blur-2xl transition-all duration-700" />

                      <span className="absolute inset-0 overflow-hidden">
                        <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-white/30 blur-md rotate-12 translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-1000" />
                      </span>

                      <img
                        src={`/images/pastRecruiter/${fileName}`}
                        alt={`${name} logo`}
                        className="relative z-10 h-16 md:h-20 w-full max-w-[180px] object-contain  opacity-70 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          {!isLastRowVisible ? (
            <button
              onClick={showMore}
              type="button"
              className="flex flex-col items-center text-blue-900 hover:opacity-70 transition"
              aria-label="Show more recruiters"
            >
              <span className="text-xs uppercase tracking-widest">
                View More
              </span>
              <span className="text-3xl animate-bounce">⌄</span>
            </button>
          ) : (
            <button
              onClick={showLess}
              type="button"
              className="flex flex-col items-center text-blue-900 hover:opacity-70 transition"
              aria-label="Show less recruiters"
            >
              <span className="text-xs uppercase tracking-widest">
                View Less
              </span>
              <span className="text-3xl">⌃</span>
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

// =============================================================================
// TESTIMONIALS SECTION
// =============================================================================

function Testimonials(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const alumniTestimonials: Testimonial[] = [
    {
      name: "Rahul Sharma",
      role: "SDE @ Google",
      company: "google",
      img: "/images/testimonials/a1.webp",
      text: "This institute completely shaped my career.",
    },
    {
      name: "Priya Verma",
      role: "PM @ Amazon",
      company: "amazon",
      img: "/images/testimonials/a2.jpg",
      text: "Amazing exposure and mentorship.",
    },
    {
      name: "Rahul Sharma",
      role: "SDE @ Google",
      company: "google",
      img: "/images/testimonials/a3.avif",
      text: "This institute completely shaped my career.",
    },
    {
      name: "Priya Verma",
      role: "PM @ Amazon",
      company: "amazon",
      img: "/images/testimonials/a4.jpg",
      text: "Amazing exposure and mentorship.",
    },
  ];

  const data: Testimonial[] = alumniTestimonials;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [data.length]);

  const prevSlide = useCallback((): void => {
    setActiveIndex((prev) => (prev - 1 + data.length) % data.length);
  }, [data.length]);

  const nextSlide = useCallback((): void => {
    setActiveIndex((prev) => (prev + 1) % data.length);
  }, [data.length]);

  const getPosition = (index: number): number => {
    const total = data.length;
    let diff = index - activeIndex;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    return diff;
  };

  const getCompanyLogo = (company: RecruiterKey): string => {
    switch (company) {
      case "google":
        return "google.png";
      case "amazon":
        return "amazon.png";
      case "microsoft":
        return "microsoft.png";
      case "tcs":
        return "tcs.png";
      default:
        return "";
    }
  };

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between  gap-8 ">
          <div>
            <p className="text-xs tracking-[0.28em] uppercase text-slate-600 mb-2 ">
              Alumni Perspectives
            </p>

            <h2 className="text-4xl font-bold text-slate-700">
              Voices of Leaders
            </h2>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="relative h-[560px] md:h-[590px] flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center [perspective:2000px]">
              {data.map((item: Testimonial, index: number) => {
                const position = getPosition(index);
                const isActive = position === 0;

                let cardStyle: React.CSSProperties = {};

                if (position === 0) {
                  cardStyle = {
                    transform: "translateX(0px) scale(1) rotateY(0deg)",
                    opacity: 1,
                    zIndex: 30,
                  };
                } else if (position === -1) {
                  cardStyle = {
                    transform: "translateX(-76%) scale(0.92) rotateY(16deg)",
                    opacity: 0.96,
                    zIndex: 20,
                  };
                } else if (position === 1) {
                  cardStyle = {
                    transform: "translateX(76%) scale(0.92) rotateY(-16deg)",
                    opacity: 0.96,
                    zIndex: 20,
                  };
                } else if (position < 0) {
                  cardStyle = {
                    transform: "translateX(-102%) scale(0.82) rotateY(18deg)",
                    opacity: 0,
                    zIndex: 10,
                  };
                } else {
                  cardStyle = {
                    transform: "translateX(102%) scale(0.82) rotateY(-18deg)",
                    opacity: 0,
                    zIndex: 10,
                  };
                }

                return (
                  <div
                    key={`alumni-${index}`}
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
                          <img
                            src={`/images/pastRecruiter/${getCompanyLogo(
                              item.company
                            )}`}
                            alt={`${item.company} logo`}
                            className="h-7 object-contain brightness-110"
                          />

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

                          <p className="mt-2 text-[15px] text-white/75">
                            {item.role}
                          </p>

                          <p className="mt-5 text-[15px] leading-8 text-white/85">
                            "{item.text}"
                          </p>
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
              className="absolute left-0 sm:left-2 md:left-6 lg:left-12 top-1/2 -translate-y-1/2 z-40 h-12 w-12 rounded-full border border-blue-900/10 bg-white/90 backdrop-blur shadow-md text-blue-900 text-xl hover:scale-105 transition"
              aria-label="Previous testimonial"
            >
              ←
            </button>

            <button
              onClick={nextSlide}
              type="button"
              className="absolute right-0 sm:right-2 md:right-6 lg:right-12 top-1/2 -translate-y-1/2 z-40 h-12 w-12 rounded-full border border-blue-900/10 bg-white/90 backdrop-blur shadow-md text-blue-900 text-xl hover:scale-105 transition"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>

          <div className="mt-10 flex justify-center gap-3">
            {data.map((_, index: number) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-8 bg-blue-900"
                    : "w-2.5 bg-blue-200 hover:bg-blue-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function PlacementPage(): JSX.Element {
  return (
    <>
      <HeroSection />
      <Letter />
      <Recruiters />
      <Testimonials />
    </>
  );
}