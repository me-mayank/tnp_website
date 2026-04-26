"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ 
      lerp: 0.08, 
      smoothWheel: true,
      // Professional settings
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger on load and after a short delay
    window.addEventListener("load", () => ScrollTrigger.refresh());
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 1000);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      clearTimeout(timeout);
    };
  }, []);

  return <>{children}</>;
}
