"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (reducedMotion || coarsePointer) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.08,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      syncTouch: false,
      overscroll: true,
      anchors: {
        offset: -96,
        lerp: 0.12,
      },
      prevent: (node) => {
        return Boolean(node.closest("[data-lenis-prevent]"));
      },
    });

    const unsubscribe = lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => {
      if (!document.hidden) {
        lenis.raf(time * 1000);
      }
    };
    const handleVisibilityChange = () => {
      if (document.hidden) {
        lenis.stop();
      } else {
        lenis.start();
        lenis.resize();
        ScrollTrigger.refresh();
      }
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      unsubscribe();
      lenis.destroy();
    };
  }, []);

  return children;
}
