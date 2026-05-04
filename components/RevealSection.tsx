"use client";
import { useRef, useEffect, type ComponentPropsWithoutRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealSectionProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

export default function RevealSection({ children, className = "", ...props }: RevealSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div ref={sectionRef} className={className} {...props}>
      {children}
    </div>
  );
}
