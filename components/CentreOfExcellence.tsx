'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LABS = [
  { id: 'ev-lab', title: 'EV Lab', image: '/images/c-ev.png' },
  { id: 'ai-lab', title: 'AI Lab', image: '/images/c-ai.png' },
  { id: 'solar-lab', title: 'Solar Lab', image: '/images/c-sl.png' },
];

export default function CentreOfExcellence() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const initW = isMobile ? '240px' : '360px';
    const initH = isMobile ? '350px' : '500px';

    const slides = gsap.utils.toArray('.slide-container') as HTMLElement[];

    // Ensure all wrappers have initial dimensions
    slides.forEach((slide) => {
      const wrapper = slide.querySelector('.image-wrapper');
      gsap.set(wrapper, { width: initW, height: initH, borderRadius: '32px' });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%', // 4 full screen heights for smooth scrub
        pin: true,
        scrub: 1, // Smooth scrub
      }
    });

    slides.forEach((slide, index) => {
      const wrapper = slide.querySelector('.image-wrapper');
      const text = slide.querySelector('.text-wrapper');
      const imageScale = slide.querySelector('.image-scale');

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
        gsap.set(wrapper, { opacity: 0, y: isMobile ? 50 : 100 });

        const prevText = slides[index - 1].querySelector('.text-wrapper');

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

  }, { scope: containerRef });

  return (
    <section
      id="coe"
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
          className="slide-container absolute inset-0 flex items-center justify-center"
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
    </section>
  );
}