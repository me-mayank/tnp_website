"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxVideoProps {
  src: string;
  poster: string;
  title: string;
  subtitle: string;
}

export default function ParallaxVideo({ src, poster, title, subtitle }: ParallaxVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !videoRef.current || !textRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Parallax effect on video
    tl.fromTo(
      videoRef.current,
      { y: "-15%" },
      { y: "15%", ease: "none" },
      0
    );

    // Subtle scale and fade for text
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-screen h-[50vh] sm:h-[60vh] lg:h-[75vh] overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-[-20%] left-0 w-full h-[140%] object-cover scale-110"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

      <div ref={textRef} className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="text-center text-white">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tighter uppercase mb-4">
            {title}
          </h2>
          <p className="text-lg sm:text-2xl text-white/80 font-light tracking-widest uppercase">
            {subtitle}
          </p>
        </div>
      </div>
      
      {/* Scroll indicator overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block">
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/50 to-transparent"></div>
      </div>
    </div>
  );
}
