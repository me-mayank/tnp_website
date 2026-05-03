'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const LABS = [
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

export default function CentreOfExcellence() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % LABS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + LABS.length) % LABS.length);
  };

  useGSAP(() => {
    // Fade out current content, then fade in new content
    const tl = gsap.timeline();
    
    tl.to('.lab-content', {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: 'power2.in',
    })
    .to('.lab-image', {
      scale: 1.1,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    }, '<')
    .set('.lab-content', { y: -20 })
    .to('.lab-content', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    })
    .to('.lab-image', {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.3');

  }, { dependencies: [activeIndex], scope: containerRef });

  return (
    <section 
      id="coe"
      ref={containerRef} 
      className="w-full bg-white py-20 px-6 md:px-12 lg:px-24 overflow-hidden font-poppins"
    >
      {/* Header Section */}
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div className="relative">
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#0F172A] leading-tight tracking-tight uppercase">
            Centre of <br />
            <span className="text-blue-600">Excellence</span>
          </h2>
          <div className="h-1.5 w-24 bg-blue-600 mt-4"></div>
        </div>
        
        <p className="max-w-md text-slate-600 text-lg leading-relaxed">
          Empowering innovation through advanced laboratories, cutting-edge technology, and industry-driven practical learning environments.
        </p>
      </div>

      {/* Main Slider Card */}
      <div className="max-w-[1600px] mx-auto relative group">
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-[40px] overflow-hidden bg-slate-900 shadow-2xl">
          {/* Background Image */}
          <div className="lab-image absolute inset-0 w-full h-full">
            <Image 
              src={LABS[activeIndex].image} 
              alt={LABS[activeIndex].title} 
              fill 
              className="object-cover opacity-60" 
              priority
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16 lg:p-24 z-10 pointer-events-none">
            <div className="lab-content max-w-2xl">
              <h3 className="text-white text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
                {LABS[activeIndex].title}
              </h3>
              <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed font-inter max-w-xl">
                {LABS[activeIndex].description}
              </p>
              
              <button className="pointer-events-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all transform hover:scale-105 shadow-lg group">
                Explore Lab 
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            {/* Slide Tagline (Top Right in Image) */}
            <div className="absolute top-12 right-12 text-right hidden lg:block">
              <p className="text-white/60 text-sm font-medium tracking-[0.3em] uppercase mb-2">
                IET Lucknow
              </p>
              <h4 className="text-white text-2xl font-bold tracking-tight max-w-[250px] leading-tight">
                {LABS[activeIndex].tagline}
              </h4>
            </div>

            {/* Slide Counter */}
            <div className="absolute bottom-12 left-12 md:left-16 flex items-baseline gap-2">
              <span className="text-white text-2xl font-bold">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-white/40 text-sm">/</span>
              <span className="text-white/40 text-sm font-medium">
                {String(LABS.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={handleNext}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-xl hover:scale-110 transition-transform active:scale-95"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <button 
            onClick={handlePrev}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white/50 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Progress Bars */}
        <div className="flex justify-center gap-4 mt-12">
          {LABS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                index === activeIndex ? 'w-24 bg-blue-600' : 'w-12 bg-slate-200 hover:bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Background Decorative Element (Subtle waves from image) */}
      <div className="absolute top-0 right-0 -z-10 opacity-30 pointer-events-none translate-x-1/4 -translate-y-1/4">
        <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="400" r="400" stroke="#3B82F6" strokeOpacity="0.1" strokeWidth="1"/>
          <circle cx="400" cy="400" r="350" stroke="#3B82F6" strokeOpacity="0.1" strokeWidth="1"/>
          <circle cx="400" cy="400" r="300" stroke="#3B82F6" strokeOpacity="0.1" strokeWidth="1"/>
          <circle cx="400" cy="400" r="250" stroke="#3B82F6" strokeOpacity="0.1" strokeWidth="1"/>
        </svg>
      </div>

      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 opacity-20 pointer-events-none">
        <div className="grid grid-cols-6 gap-4">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
          ))}
        </div>
      </div>
    </section>
  );
}