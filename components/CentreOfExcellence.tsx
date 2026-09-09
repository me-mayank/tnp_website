'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface LabItem {
  id: string;
  title: string;
  image: string;
  description: string;
  tagline: string;
}

const LABS: LabItem[] = [
  { 
    id: 'ev-lab', 
    title: 'EV Lab', 
    image: '/images/c-ev.png',
    description: 'Hands-on research and innovation in Electric Vehicle systems, battery technologies, and sustainable transportation solutions.',
    tagline: 'SUSTAINABLE MOBILITY SMARTER TOMORROW'
  },
  { 
    id: 'ai-lab', 
    title: 'AI Lab', 
    image: '/images/c-ai.png',
    description: 'Exploring the frontiers of Artificial Intelligence, Machine Learning, and Deep Learning to solve complex real-world challenges.',
    tagline: 'INTELLIGENT FUTURE THROUGH AI'
  },
  { 
    id: 'solar-lab', 
    title: 'Solar Lab', 
    image: '/images/c-sl.png',
    description: 'Advancing renewable energy through cutting-edge solar cell research, photovoltaic systems, and smart grid integration.',
    tagline: 'POWERING THE WORLD WITH SOLAR'
  },
];

/* -------------------------------------------------------------------------- */
/*                              MOBILE VIEW COMPONENT                         */
/* -------------------------------------------------------------------------- */
function MobileCentreOfExcellence() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % LABS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + LABS.length) % LABS.length);
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.to('.lab-content-mobile', {
      opacity: 0,
      y: 15,
      duration: 0.25,
      ease: 'power2.in',
    })
    .to('.lab-image-mobile', {
      scale: 1.08,
      opacity: 0.3,
      duration: 0.25,
      ease: 'power2.in',
    }, '<')
    .set('.lab-content-mobile', { y: -15 })
    .to('.lab-content-mobile', {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: 'power3.out',
    })
    .to('.lab-image-mobile', {
      scale: 1,
      opacity: 0.6,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.25');

  }, { dependencies: [activeIndex], scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="w-full bg-white py-16 px-4 sm:px-6 md:px-10 overflow-hidden font-poppins relative"
    >
      {/* Header Section */}
      <div className="max-w-[1600px] mx-auto flex flex-col justify-between items-start mb-8 gap-4">
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight tracking-tight uppercase">
            Centre of <br />
            <span className="text-blue-600">Excellence</span>
          </h2>
          <div className="h-1.5 w-20 bg-blue-600 mt-3 rounded-full"></div>
        </div>
        
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Empowering innovation through advanced laboratories, cutting-edge technology, and industry-driven practical learning environments.
        </p>
      </div>

      {/* Main Slider Card */}
      <div className="max-w-[1600px] mx-auto relative group">
        <div className="relative aspect-[4/5] sm:aspect-[16/10] w-full rounded-3xl overflow-hidden bg-slate-900 shadow-2xl">
          {/* Background Image */}
          <div className="lab-image-mobile absolute inset-0 w-full h-full">
            <Image 
              src={LABS[activeIndex].image} 
              alt={LABS[activeIndex].title} 
              fill 
              className="object-cover opacity-60" 
              priority
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 sm:bg-gradient-to-r sm:from-black/90 sm:via-black/50 sm:to-transparent" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end sm:justify-center p-6 sm:p-10 z-10">
            <div className="lab-content-mobile max-w-xl">
              {/* Tagline */}
              <p className="text-blue-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2">
                {LABS[activeIndex].tagline}
              </p>

              <h3 className="text-white text-3xl sm:text-4xl font-bold mb-3 tracking-tight">
                {LABS[activeIndex].title}
              </h3>
              
              <p className="text-white/80 text-xs sm:text-sm mb-6 leading-relaxed font-inter line-clamp-4 sm:line-clamp-none">
                {LABS[activeIndex].description}
              </p>
              
              <button className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-all shadow-lg">
                Explore Lab 
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            {/* Slide Counter */}
            <div className="absolute top-5 right-5 sm:top-auto sm:bottom-6 sm:left-10 flex items-baseline gap-1 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <span className="text-white text-sm font-bold">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-white/40 text-xs">/</span>
              <span className="text-white/40 text-xs font-medium">
                {String(LABS.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute bottom-5 right-5 flex gap-2 z-20">
            <button 
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="w-10 h-10 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full flex items-center justify-center border border-white/20 active:scale-95 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
              aria-label="Next Slide"
              className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2.5 mt-6">
          {LABS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 transition-all duration-300 rounded-full ${
                index === activeIndex ? 'w-10 bg-blue-600' : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 -z-10 opacity-20 pointer-events-none translate-x-1/3 -translate-y-1/3">
        <svg width="400" height="400" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="400" r="400" stroke="#3B82F6" strokeOpacity="0.2" strokeWidth="2"/>
          <circle cx="400" cy="400" r="300" stroke="#3B82F6" strokeOpacity="0.2" strokeWidth="2"/>
          <circle cx="400" cy="400" r="200" stroke="#3B82F6" strokeOpacity="0.2" strokeWidth="2"/>
        </svg>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                             DESKTOP VIEW COMPONENT                         */
/* -------------------------------------------------------------------------- */
function DesktopCentreOfExcellence() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const initW = '360px';
      const initH = '500px';

      const slides = gsap.utils.toArray<HTMLElement>('.desktop-slide-container');

      // Ensure all wrappers have initial dimensions
      slides.forEach((slide) => {
        const wrapper = slide.querySelector('.image-wrapper');
        if (wrapper) {
          gsap.set(wrapper, { width: initW, height: initH, borderRadius: '32px' });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%', // 4 full screen heights for smooth scrub
          pin: true,
          scrub: 1, // Smooth scrub
          invalidateOnRefresh: true,
        }
      });

      slides.forEach((slide, index) => {
        const wrapper = slide.querySelector('.image-wrapper');
        const text = slide.querySelector('.text-wrapper');
        const imageScale = slide.querySelector('.image-scale');

        if (!wrapper || !text || !imageScale) return;

        // Set initial zoom for the image inside
        gsap.set(imageScale, { scale: 1.3 });

        if (index === 0) {
          // First slide starts already visible as a small card, then scales up
          tl.to(wrapper, {
            width: '100vw',
            height: '100vh',
            borderRadius: '0px',
            ease: 'power2.inOut',
            duration: 2,
          })
            .to(imageScale, {
              scale: 1,
              ease: 'power2.inOut',
              duration: 2,
            }, '<') // Sync with wrapper scale
            .to(text, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out'
            }, '-=0.5'); // Start text reveal slightly before expansion finishes

        } else {
          // Subsequent slides start hidden
          gsap.set(wrapper, { opacity: 0, y: 100 });

          const prevText = slides[index - 1]?.querySelector('.text-wrapper');

          // Add a slight delay at the full-screen state before the next image appears
          tl.addLabel(`slide${index}`)
            .to(prevText, {
              opacity: 0,
              y: -30,
              duration: 0.8,
              ease: 'power2.in'
            }, `slide${index}+=0.5`)

            // Fade and float in the new small image
            .to(wrapper, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
            }, '<')

            // Expand the new image to full screen
            .to(wrapper, {
              width: '100vw',
              height: '100vh',
              borderRadius: '0px',
              ease: 'power2.inOut',
              duration: 2,
            })
            .to(imageScale, {
              scale: 1,
              ease: 'power2.inOut',
              duration: 2,
            }, '<')

            // Reveal the text for the new image
            .to(text, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out'
            }, '-=0.5');
        }
      });

      // Pause briefly at the very end to let user see the final state
      tl.to({}, { duration: 1 });
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="h-screen w-full bg-[#070707] relative overflow-hidden flex items-center justify-center font-poppins"
    >
      {/* Persistent Section Title */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-[100]">
        <h1 className="text-white/80 text-xl md:text-2xl font-medium tracking-widest uppercase">
          Centre of Excellence
        </h1>
      </div>

      {/* Lab Slides */}
      {LABS.map((lab, index) => (
        <div
          key={lab.id}
          className="desktop-slide-container absolute inset-0 flex items-center justify-center"
          style={{ zIndex: index + 10 }} // Ensures sequential stacking
        >
          <div
            className="image-wrapper relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
            style={{ willChange: 'width, height, border-radius' }}
          >
            <div className="image-scale w-full h-full relative" style={{ willChange: 'transform' }}>
              <Image
                src={lab.image}
                alt={lab.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Cinematic Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            </div>
          </div>

          <div
            className="text-wrapper absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24 pointer-events-none opacity-0 translate-y-12"
          >
            <div className="flex items-end justify-between w-full max-w-[1600px] mx-auto">
              <h2 className="text-white text-5xl md:text-7xl lg:text-[7rem] font-bold tracking-tighter leading-none drop-shadow-2xl">
                {lab.title}
              </h2>
              <span className="text-white/70 text-sm md:text-lg uppercase tracking-[0.3em] font-inter mb-2 md:mb-6 whitespace-nowrap">
                (Scroll)
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */
export default function CentreOfExcellence() {
  return (
    <section id="coe" className="w-full">
      {/* Mobile & Tablet View (< 1024px) */}
      <div className="block lg:hidden">
        <MobileCentreOfExcellence />
      </div>

      {/* Desktop / Web View (>= 1024px) */}
      <div className="hidden lg:block">
        <DesktopCentreOfExcellence />
      </div>
    </section>
  );
}