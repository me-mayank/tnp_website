"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Disable native scroll restoration so the browser does not fight Lenis on route changes
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

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

    lenisRef.current = lenis;

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
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll to top immediately whenever the user navigates to a new page
  useEffect(() => {
    // If a hash anchor is present in the destination URL, scroll to it with offset
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(target as HTMLElement, { offset: -96, immediate: true });
        } else {
          (target as HTMLElement).scrollIntoView({ behavior: "instant" });
        }
        return;
      }
    }

    // Instantly reset scroll to top (0) on both Lenis instance and native window
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);

    // Refresh GSAP ScrollTrigger and recalculate scroll height for the new route
    const timer = setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
      ScrollTrigger.refresh();
    }, 60);

    return () => clearTimeout(timer);
  }, [pathname]);

  return children;
}
