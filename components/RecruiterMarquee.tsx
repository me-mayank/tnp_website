"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

const RECRUITERS = [
  { name: "Adobe", src: "/images/pastRecruiter/adobe.png" },
  { name: "DLF", src: "/images/pastRecruiter/dlf.png" },
  { name: "Google", src: "/images/pastRecruiter/google.png" },
  { name: "IBM", src: "/images/pastRecruiter/ibm-logo-hd.png" },
  { name: "InMobi", src: "/images/pastRecruiter/InMobi.png" },
  { name: "Amazon", src: "/images/pastRecruiter/amazon.png" },
  { name: "Volvo", src: "/images/pastRecruiter/volvo.png" },
  { name: "Inox", src: "/images/pastRecruiter/inox.jpg" },
  { name: "Torrent", src: "/images/pastRecruiter/torrent.png" },
  { name: "Forbes", src: "/images/pastRecruiter/forbes.png" },
  { name: "Intuit", src: "/images/pastRecruiter/Intuit.png" },
  { name: "Zeta", src: "/images/pastRecruiter/zeta.png" },
  { name: "HUL", src: "/images/pastRecruiter/hul.png" },
  { name: "Uber", src: "/images/pastRecruiter/uber.svg" },
  { name: "L&T", src: "/images/pastRecruiter/LT.avif" },
  { name: "TCS", src: "/images/pastRecruiter/tcs.png" },
  { name: "Microsoft", src: "/images/pastRecruiter/microsoft.png" },
  { name: "Bharat Electronics", src: "/images/pastRecruiter/bharatelectronics.png" },
  { name: "SOTI", src: "/images/pastRecruiter/soti.png" },
  { name: "Paytm", src: "/images/pastRecruiter/paytm.png" },
];

export default function RecruiterMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    const totalWidth = marquee.scrollWidth / 2;

    const animation = gsap.to(marquee, {
      x: -totalWidth,
      duration: 40,
      ease: "none",
      repeat: -1,
    });

    const handleMouseEnter = () => animation.pause();
    const handleMouseLeave = () => animation.play();

    marquee.addEventListener("mouseenter", handleMouseEnter);
    marquee.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      animation.kill();
      marquee.removeEventListener("mouseenter", handleMouseEnter);
      marquee.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative overflow-hidden py-10 bg-white">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
      
      <div ref={marqueeRef} className="flex items-center gap-16 whitespace-nowrap will-change-transform">
        {[...RECRUITERS, ...RECRUITERS].map((company, index) => (
          <div key={`${company.name}-${index}`} className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300">
            <Image
              src={company.src}
              alt={company.name}
              width={160}
              height={80}
              className="h-16 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
