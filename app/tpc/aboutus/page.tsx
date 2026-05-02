"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const facilities = [
  { src: "/images/facilities/workspace.webp", title: "Workspace", desc: "A modern workspace for all official placement processes." },
  { src: "/images/facilities/interview.jpg", title: "Interview Rooms", desc: "6 air-conditioned interview cabins equipped with WiFi-enabled PCs and printing facilities." },
  { src: "/images/facilities/gd.jpg", title: "Group Discussion Room", desc: "A dedicated Group Discussion Hall for placement procedure rounds by visiting companies." },
  { src: "/images/facilities/computer.png", title: "Computer Center", desc: "Department labs with modern systems for conducting online technical rounds." },
  { src: "/images/facilities/presentation.jpg", title: "Presentation Room", desc: "A connected lecture theatre with AC, projector, sound system and seating for 120." },
  { src: "/images/facilities/audi.jpg", title: "Auditorium", desc: "State of art auditorium (850 capacity) for Pre-Placement Talks and Seminars." },
  { src: "/images/facilities/training.jpg", title: "Training Classroom", desc: "Dedicated training space for technical and professional skill development." },
  { src: "/images/facilities/other_facilities.png", title: "Other Facilities", desc: "Lodging & transport for HR teams along with customized meal options." },
];

export default function AboutUsPage() {
  const [activeFacility, setActiveFacility] = useState(0);

  const prevFacility = () => setActiveFacility((prev) => (prev - 1 + facilities.length) % facilities.length);
  const nextFacility = () => setActiveFacility((prev) => (prev + 1) % facilities.length);

  // Auto-scroll effect
  useEffect(() => {
    let timer = setInterval(() => {
      setActiveFacility((prev) => (prev + 1) % facilities.length);
    }, 3000);
    
    return () => {
      clearInterval(timer);
    };
  }, [activeFacility]);
  const records = [
    {
      year: "2024",
      description: "500+ students placed across leading product & service companies.",
      highest: "52 LPA",
      average: "12 LPA",
      recruiters: [
        { name: "Amazon", logo: "https://www.google.com/s2/favicons?domain=amazon.com&sz=128" },
        { name: "Microsoft", logo: "https://www.google.com/s2/favicons?domain=microsoft.com&sz=128" },
        { name: "TCS", logo: "/images/pastRecruiter/tcs1.png" },
      ]
    },
    {
      year: "2023",
      description: "470+ offers across multiple engineering branches.",
      highest: "45 LPA",
      average: "8.5 LPA",
      recruiters: [
        { name: "Wipro", logo: "https://www.google.com/s2/favicons?domain=wipro.com&sz=128" },
        { name: "HCL", logo: "/images/pastRecruiter/hcl1.png" },
        { name: "Capgemini", logo: "https://www.google.com/s2/favicons?domain=capgemini.com&sz=128" }
      ]
    },
    {
      year: "2022",
      description: "Strong campus presence with core and IT companies.",
      highest: "38 LPA",
      average: "7.8 LPA",
      recruiters: [
        { name: "TCS", logo: "/images/pastRecruiter/tcs1.png" },
        { name: "Infosys", logo: "https://www.google.com/s2/favicons?domain=infosys.com&sz=128" },
        { name: "IBM", logo: "/images/pastRecruiter/ibm-logo-hd.png" }
      ]
    },
    {
      year: "2021",
      description: "Resilient performance despite global challenges.",
      highest: "32 LPA",
      average: "7.1 LPA",
      recruiters: [
        { name: "Accenture", logo: "https://www.google.com/s2/favicons?domain=accenture.com&sz=128" },
        { name: "Cognizant", logo: "https://www.google.com/s2/favicons?domain=cognizant.com&sz=128" },
        { name: "Tech Mahindra", logo: "https://www.google.com/s2/favicons?domain=techmahindra.com&sz=128" }
      ]
    }
  ];

  return (
    <>
      <main className="bg-white py-20" id="about">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-brand-800">Training &amp; Placement Cell</h1>
            <p className="mt-4 text-muted max-w-3xl mx-auto leading-relaxed">
              The Placement Office at IET Lucknow is dedicated to connecting students with recruiters
              and ensuring smooth execution of all placement activities through a structured,
              well-equipped system and a highly coordinated student team.
            </p>
          </div>

          <div className="relative bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] shadow-glow-md rounded-3xl p-8 md:p-12 mb-20 overflow-hidden border border-[#e2e8f0]">
            {/* Animated SVG Border Two-Pointers Effect */}
            <motion.svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              initial="hidden"
              animate="visible"
              preserveAspectRatio="none"
            >
              <motion.rect
                x="0" y="0" width="100%" height="100%"
                rx="24" ry="24"
                fill="none"
                stroke="#2C74B3"
                strokeWidth="4"
                variants={{
                  hidden: { pathLength: 0, pathOffset: 0, opacity: 0 },
                  visible: { 
                    pathLength: 0.2, 
                    pathOffset: [0, 1], 
                    opacity: [0, 1, 1, 0],
                    transition: { duration: 3, ease: "linear", repeat: Infinity } 
                  }
                }}
              />
              <motion.rect
                x="0" y="0" width="100%" height="100%"
                rx="24" ry="24"
                fill="none"
                stroke="#2C74B3"
                strokeWidth="3"
                variants={{
                  hidden: { pathLength: 0, pathOffset: 0.5, opacity: 0 },
                  visible: { 
                    pathLength: 0.2, 
                    pathOffset: [0.5, 1.5], 
                    opacity: [0, 1, 1, 0],
                    transition: { duration: 3, ease: "linear", repeat: Infinity } 
                  }
                }}
              />
            </motion.svg>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
              <div className="shrink-0 hidden md:flex items-center justify-center w-16 h-16 bg-[#eef5fc] text-brand-accent rounded-2xl shadow-sm border border-[#d6e6f5]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-brand-800 mb-4 flex items-center">
                  The Cell
                  <span className="ml-4 h-[2px] w-12 bg-brand-accent rounded-full inline-block"></span>
                </h2>
                <p className="text-muted text-base leading-relaxed text-justify relative">
                  The Placement Office is responsible for campus placement at IET Lucknow. The Placement-in-Charge,
                  the Assistant Placement Officer, the Placement Office staff and the student representatives handle
                  various crucial tasks like reaching out to companies, scheduling activities and managing all official
                  communication. The team strives to create a balance between recruiter expectations and student aspirations.
                  The Placement Managers, Company Coordinators and Department Placement Coordinators ensure policies are
                  followed, recruiters are assisted, and students are industry-ready. The office is supported with excellent
                  infrastructure to handle every stage of the placement process smoothly.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 relative">
            <h2 className="text-3xl font-extrabold text-brand-800 mb-10 text-center">
              Facilities
            </h2>

            <div className="relative flex justify-center items-center h-[260px] sm:h-[340px] md:h-[400px] lg:h-[480px] mt-8 [perspective:1400px] overflow-hidden">
              {facilities.map((fac, idx) => {
                const offset = (idx - activeFacility + facilities.length) % facilities.length;
                let normalizedOffset = offset;
                if (offset > facilities.length / 2) {
                   normalizedOffset -= facilities.length;
                }
                
                const isCenter = normalizedOffset === 0;
                const absOffset = Math.abs(normalizedOffset);

                return (
                  <motion.div 
                    key={idx} 
                    className={`absolute w-[300px] sm:w-[420px] md:w-[500px] lg:w-[600px] group bg-white rounded-3xl shadow-glow-sm border border-gray-100 overflow-hidden cursor-pointer ${isCenter ? 'shadow-2xl shadow-brand-900/15 border-brand-accent/20' : ''}`}
                    onClick={() => setActiveFacility(idx)}
                    initial={false}
                    animate={{
                      x: normalizedOffset * (typeof window !== 'undefined' && window.innerWidth < 640 ? 180 : 280), 
                      z: isCenter ? 0 : -absOffset * 180, 
                      rotateY: normalizedOffset * -25, 
                      scale: isCenter ? 1 : Math.max(0.8, 1 - absOffset * 0.12),
                      opacity: isCenter ? 1 : Math.max(0, 0.85 - absOffset * 0.3),
                      zIndex: 10 - absOffset
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ pointerEvents: absOffset > 2 ? 'none' : 'auto' }}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 relative">
                      <Image
                        src={fac.src}
                        alt={fac.title}
                        className={`object-cover transition-transform duration-700 ${isCenter ? 'group-hover:scale-110' : ''}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-6 md:p-8 bg-white/95 backdrop-blur absolute bottom-0 inset-x-0 border-t border-gray-100/50">
                      <h3 className="text-xl md:text-2xl font-extrabold text-brand-800 mb-2 md:mb-3">{fac.title}</h3>
                      <p className="text-muted text-sm md:text-base line-clamp-3">
                        {fac.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <button 
              onClick={prevFacility} 
              className="absolute left-0 top-1/2 translate-y-4 -ml-2 md:ml-4 z-20 bg-white shadow-md p-3 rounded-full text-brand-800 hover:text-white hover:bg-brand-accent hover:scale-110 transition-all border border-gray-100"
              aria-label="Previous"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            </button>
            
            <button 
              onClick={nextFacility} 
              className="absolute right-0 top-1/2 translate-y-4 -mr-2 md:mr-4 z-20 bg-white shadow-md p-3 rounded-full text-brand-800 hover:text-white hover:bg-brand-accent hover:scale-110 transition-all border border-gray-100"
              aria-label="Next"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>

          <section id="records" className="py-20 mt-10 bg-gray-50/50 rounded-3xl">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-800">Past Impressive Records</h2>
                <div className="h-1.5 w-20 bg-brand-accent rounded-full mx-auto mt-4"></div>
                <p className="text-muted mt-6 max-w-2xl mx-auto text-lg">
                  IET Lucknow has consistently delivered excellent placement outcomes, showcasing a steady upward trajectory
                  in salary packages and recruiter trust.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {records.map((record, index) => (
                  <div key={index} className="group h-[180px] hover:h-[380px] transition-all duration-700 ease-in-out [perspective:1000px]">
                    <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                      
                      {/* Front Face */}
                      <div className="absolute inset-0 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between [backface-visibility:hidden] overflow-hidden">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-3xl font-extrabold text-brand-800 group-hover:text-brand-accent transition-colors">{record.year}</h3>
                            <div className="p-2 bg-[#eef5fc] rounded-lg text-brand-accent">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 pt-3 border-t border-gray-50 mt-auto">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted uppercase tracking-wider">Highest CTC</span>
                            <span className="text-brand-accent font-bold text-lg">{record.highest}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted uppercase tracking-wider">Average CTC</span>
                            <span className="text-brand-800 font-bold text-lg">{record.average}</span>
                          </div>
                        </div>
                      </div>

                      {/* Back Face */}
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-800 to-brand-900 border border-brand-700 rounded-3xl p-6 shadow-xl flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden">
                        <div>
                          <h3 className="text-2xl font-extrabold text-white mb-4">{record.year} Highlights</h3>
                          <p className="text-sm text-blue-50 font-medium leading-relaxed">
                            {record.description}
                          </p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-brand-700/50">
                          <span className="text-[10px] text-brand-accent uppercase font-bold tracking-widest block mb-3">Top Recruiters</span>
                          <div className="flex items-center justify-between w-full bg-white/95 rounded-xl p-3 shadow-inner">
                            {record.recruiters.map((recruiter, idx) => (
                              <div key={idx} className="relative h-8 w-16">
                                <Image
                                  src={recruiter.logo}
                                  alt={recruiter.name}
                                  title={recruiter.name}
                                  className="object-contain"
                                  fill
                                  sizes="64px"
                                  unoptimized={recruiter.logo.startsWith('http')}
                                  loading="lazy"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
