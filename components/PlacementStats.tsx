"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SplitText from '@/components/ui/SplitText';
import AnimatedCounter from '@/components/AnimatedCounter';
import { DottedMultiLineChart } from "@/components/ui/dotted-multi-line";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import BorderGlow from './BorderGlow';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PlacementStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    // Left chart slides in from left
    gsap.from(leftRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Right cards stagger in from right
    gsap.from(cardsRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      x: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section id="stats" className="py-24 bg-white relative overflow-hidden" ref={containerRef}>
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.8] pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/back3.png')" }}
        ></div>
        <div className="absolute inset-0 bg-white/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <SplitText
            text="Placement Statistics"
            tag="h2"
            className="text-4xl md:text-5xl font-bold text-[#0B1F3A] tracking-tight mb-6"
            delay={30}
            duration={1}
            splitType="chars"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
          />
          <div className="h-1.5 w-20 bg-[#2563EB] rounded-full mx-auto mb-6"></div>
          <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Our strong placement ecosystem empowers students with top career opportunities, industry exposure, and exceptional recruiter connections.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center mt-12">

          {/* Left Side: Premium Graphical Visual using Recharts with BorderGlow */}
          <div className="w-full h-full" ref={leftRef}>
            <BorderGlow
              edgeSensitivity={30}
              glowColor="40 80 80"
              backgroundColor="#ffffff"
              borderRadius={28}
              glowRadius={40}
              glowIntensity={1}
              coneSpread={25}
              animated={false}
              colors={['#38bdf8', '#818cf8', '#c084fc']}
              className="w-full h-full shadow-lg"
            >
              <DottedMultiLineChart />
            </BorderGlow>
          </div>

          {/* Right Side: Container for Stats Cards and Accordion */}
          <div className="flex flex-col gap-8">
            {/* Placement Details Accordion with BorderGlow */}
            <div ref={addToRefs}>
              <BorderGlow
                edgeSensitivity={30}
                glowColor="40 80 80"
                backgroundColor="#ffffff"
                borderRadius={28}
                glowRadius={40}
                glowIntensity={1}
                coneSpread={25}
                animated={false}
                colors={['#c084fc', '#f472b6', '#38bdf8']}
                className="w-full shadow-lg border border-gray-100"
              >
                <div className="p-6">
                  <h4 className="text-xl font-bold text-[#0B1F3A] mb-4">Placement Insights</h4>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-gray-100">
                      <AccordionTrigger className="text-[#0B1F3A] hover:no-underline">Top Recruiting Sectors</AccordionTrigger>
                      <AccordionContent className="text-slate-600">
                        IT & Software (45%), Core Engineering (25%), Analytics & Consulting (15%), and Finance (10%) are our primary recruiting sectors.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-gray-100">
                      <AccordionTrigger className="text-[#0B1F3A] hover:no-underline">Global Opportunities</AccordionTrigger>
                      <AccordionContent className="text-slate-600">
                        Over 15% of our students secured international offers or roles in multinational corporations with global headquarters.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-none">
                      <AccordionTrigger className="text-[#0B1F3A] hover:no-underline">Internship to PPO Ratio</AccordionTrigger>
                      <AccordionContent className="text-slate-600">
                        An impressive 40% of our students converted their summer internships into Pre-Placement Offers (PPOs) this year.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </BorderGlow>
            </div>

            {/* Clean Typographic Stats (Single Row) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4 mt-10 px-2">
              <div ref={addToRefs} className="flex flex-col">
                <div className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mb-1 flex items-baseline gap-1">
                  <AnimatedCounter value={54} /> <span className="text-sm text-[#2563EB] font-bold">LPA</span>
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter leading-tight">Highest<br/>Package</div>
              </div>

              <div ref={addToRefs} className="flex flex-col">
                <div className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mb-1">
                  <AnimatedCounter value={518} />
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter leading-tight">Students<br/>Placed</div>
              </div>

              <div ref={addToRefs} className="flex flex-col">
                <div className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mb-1 flex items-baseline gap-1">
                  <AnimatedCounter value={90} /> <span className="text-xl text-[#2563EB] font-bold">+</span>
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter leading-tight">Companies<br/>Visited</div>
              </div>

              <div ref={addToRefs} className="flex flex-col">
                <div className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mb-1 flex items-baseline gap-1">
                  <AnimatedCounter value={33} /> <span className="text-sm text-[#2563EB] font-bold">%</span>
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter leading-tight">Placement<br/>Growth</div>
              </div>
            </div>
          </div>
        </div>

        {/* More Stats Button */}
        <div className="flex justify-center mt-16 lg:mt-24">
          <Link 
            href="/recruiters/demographic"
            className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#0B1F3A] text-white rounded-xl font-bold shadow-xl shadow-blue-900/10 hover:bg-[#2563EB] transition-all hover:scale-105 active:scale-95"
          >
            Explore Detailed Statistics
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
