"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";

export default function MagneticButton({
  children,
  className = "",
  distance = 40,
  speed = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  speed?: number;
}) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const xTo = gsap.quickTo(button, "x", { duration: speed, ease: "power3.out" });
    const yTo = gsap.quickTo(button, "y", { duration: speed, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      const dist = Math.sqrt(x * x + y * y);

      if (dist < width * 1.5) {
        setIsHovered(true);
        xTo(x * (distance / (width / 2)));
        yTo(y * (distance / (height / 2)));
      } else {
        setIsHovered(false);
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [distance, speed]);

  return (
    <div
      ref={buttonRef}
      className={`inline-block transition-transform duration-300 ${className}`}
      style={{
        transform: isHovered ? "scale(1.05)" : "scale(1)",
      }}
    >
      {children}
    </div>
  );
}
