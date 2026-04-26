"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({ value, suffix = "", duration = 2 }: AnimatedCounterProps) {
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!countRef.current) return;

    const obj = { count: 0 };
    
    gsap.to(obj, {
      count: value,
      duration: duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: countRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.innerText = Math.floor(obj.count).toString();
        }
      },
    });
  }, [value, duration]);

  return (
    <span className="inline-flex items-center">
      <span ref={countRef}>0</span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
