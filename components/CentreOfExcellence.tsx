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
    image: '/images/2-ev.png',
    description: 'Hands-on research and innovation in Electric Vehicle systems, battery technologies, and sustainable transportation solutions.',
    tagline: 'SUSTAINABLE MOBILITY SMARTER TOMORROW'
  },
  { 
    id: 'ai-lab', 
    title: 'AI Lab', 
    image: '/images/2ai.png',
    description: 'Exploring the frontiers of Artificial Intelligence, Machine Learning, and Deep Learning to solve complex real-world challenges.',
    tagline: 'INTELLIGENT FUTURE THROUGH AI'
  },
  { 
    id: 'solar-lab', 
    title: 'Solar Lab', 
    image: '/images/1solar.png',
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
  const touchStartX = useRef<number | null>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % LABS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + LABS.length) % LABS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.to('.lab-content-mobile', {
      opacity: 0,
      y: 10,
      duration: 0.2,
      ease: 'power2.in',
    })
    .to('.lab-image-mobile', {
      scale: 1.05,
      opacity: 0.4,
      duration: 0.2,
      ease: 'power2.in',
    }, '<')
    .set('.lab-content-mobile', { y: -10 })
    .to('.lab-content-mobile', {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power3.out',
    })
    .to('.lab-image-mobile', {
      scale: 1,
      opacity: 0.85,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.2');

  }, { dependencies: [activeIndex], scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="w-full bg-white py-12 px-4 sm:px-6 overflow-hidden font-poppins relative"
    >
      {/* Header Section */}
      <div className="max-w-[1600px] mx-auto mb-6">
        <div className="relative inline-block">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] leading-tight tracking-tight uppercase">
            Centre of <span className="text-blue-600">Excellence</span>
          </h2>
          <div className="h-1 w-14 bg-blue-600 mt-2 rounded-full"></div>
        </div>
      </div>

      {/* Main Clean Card */}
      <div className="max-w-[1600px] mx-auto relative select-none">
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative aspect-[4/3] sm:aspect-[16/9] w-full rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-100"
        >
          {/* Background Image */}
          <div className="lab-image-mobile absolute inset-0 w-full h-full">
            <Image 
              src={LABS[activeIndex].image} 
              alt={LABS[activeIndex].title} 
              fill 
              className="object-cover opacity-85" 
              priority
            />
            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          </div>

          {/* Content Overlay - Clean, Professional & Uncluttered */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
            <div className="lab-content-mobile">
              <h3 className="text-white text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-lg">
                {LABS[activeIndex].title}
              </h3>
            </div>

            {/* Slide Counter Badge */}
            <div className="absolute top-4 right-4 flex items-baseline gap-1 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
              <span className="text-white text-xs font-bold font-mono">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-white/40 text-[10px] font-mono">/</span>
              <span className="text-white/40 text-[10px] font-mono font-medium">
                {String(LABS.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute bottom-4 right-4 flex gap-2 z-20">
            <button 
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="w-9 h-9 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full flex items-center justify-center border border-white/20 active:scale-95 transition-all shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
              aria-label="Next Slide"
              className="w-9 h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {LABS.map((lab, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to ${lab.title}`}
              className={`h-2 transition-all duration-300 rounded-full ${
                index === activeIndex ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Subtle Decorative Element */}
      <div className="absolute top-0 right-0 -z-10 opacity-15 pointer-events-none translate-x-1/3 -translate-y-1/3">
        <svg width="350" height="350" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="400" r="400" stroke="#3B82F6" strokeOpacity="0.2" strokeWidth="2"/>
          <circle cx="400" cy="400" r="300" stroke="#3B82F6" strokeOpacity="0.2" strokeWidth="2"/>
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
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-[100] flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]"></div>
        <h1 className="text-white/90 text-lg md:text-xl font-semibold tracking-widest uppercase">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />
            </div>
          </div>

          {/* Desktop Content Overlay: includes Tagline, Title, Description, and Details */}
          <div
            className="text-wrapper absolute inset-0 flex flex-col justify-end p-8 md:p-14 lg:p-20 pointer-events-none opacity-0 translate-y-12 z-20"
          >
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between w-full max-w-[1600px] mx-auto gap-8">
              <div className="max-w-3xl">
                {/* Tagline Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-md mb-4 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                  <span className="text-blue-300 text-xs md:text-sm font-semibold tracking-widest uppercase">
                    {lab.tagline}
                  </span>
                </div>

                {/* Lab Title */}
                <h2 className="text-white text-5xl md:text-6xl lg:text-[5.5rem] font-black tracking-tight leading-none drop-shadow-2xl mb-4">
                  {lab.title}
                </h2>

                {/* Description */}
                <p className="text-white/85 text-sm md:text-base lg:text-lg leading-relaxed font-inter max-w-2xl drop-shadow-md">
                  {lab.description}
                </p>
              </div>

              {/* Right Side: Counter & Hint */}
              <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
                <div className="flex items-baseline gap-1.5 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-lg">
                  <span className="text-white text-base md:text-lg font-bold font-mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-white/40 text-sm font-mono">/</span>
                  <span className="text-white/40 text-sm font-mono font-medium">
                    {String(LABS.length).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-white/70 text-xs uppercase tracking-[0.25em] font-inter whitespace-nowrap">
                  (Scroll to explore)
                </span>
              </div>
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