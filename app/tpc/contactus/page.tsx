"use client";

/**
 * ============================================================================
 * Training & Placement Cell (TPC) - IET Lucknow
 * Module: Contact Us Directory Component
 * 
 * @file app/tpc/contactus/page.tsx
 * @description Official contact directory for the Training and Placement Cell at
 *              Institute of Engineering and Technology (IET), Lucknow.
 *              Showcases faculty leadership, administrative in-charges, student
 *              coordinators, web administration, and placement volunteers.
 * 
 * @organization Institute of Engineering & Technology (IET), Lucknow
 * @department Training & Placement Cell
 * @license MIT / Proprietary to IET Lucknow T&P Cell
 * @version 2.2.0
 * ============================================================================
 */

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

/**
 * Interface representing a member of the Training & Placement Cell hierarchy.
 * Used across leadership, coordinators, web-admin, and volunteer cards.
 * 
 * @interface Person
 * @property {string} name - Full display name and academic honorific (e.g., "Dr. Arun Kumar Tiwari")
 * @property {string} role - Official institutional or organizational designation
 * @property {string} dept - Academic branch or administrative cell department
 * @property {string} [email] - Primary institutional / official correspondence email
 * @property {string} [emailp] - Secondary or placement cell generic inbox alias
 * @property {string} [phone] - Contact number formatted with country code (e.g., "+91 98972 41287")
 * @property {string} [img] - Path to profile photograph within public directory
 * @property {string} [href] - Canonical URL to official college faculty/staff profile
 * @property {string} [linkedin] - Canonical URL to LinkedIn public professional profile
 */
export type Person = {
  name: string;
  role: string;
  dept: string;
  email?: string;
  emailp?: string;
  phone?: string;
  img?: string;
  href?: string;
  linkedin?: string;
};


// ============================================================================
// DATA COLLECTIONS & DIRECTORY ROSTER
// ============================================================================

/**
 * Institutional Leadership - Officer Incharge of Training & Placement Cell.
 * Highest administrative authority for campus placements, corporate relations,
 * and institute-industry partnerships at IET Lucknow.
 * 
 * @constant {Person[]} leadership
 */
const leadership: Person[] = [
  {
    name: "Dr. Arun Kumar Tiwari",
    role: "Officer Incharge",
    dept: "Training & Placement Cell",
    email: "aruntiwari@ietlucknow.ac.in",
    emailp: "placement@ietlucknow.ac.in",
    img: "/images/arun_sir.jpeg",
    href: "https://www.ietlucknow.ac.in/people/aruntiwari"
  }
];

/**
 * Faculty & Administrative Leadership - Deputy Incharges.
 * Senior faculty members providing executive mentorship, departmental liaison,
 * and operational oversight across B.Tech, M.Tech, and MCA placement drives.
 * 
 * @constant {Person[]} deputyIncharges
 */
const deputyIncharges: Person[] = [
  {
    name: "Dr. Naveen Kumar",
    role: "Deputy Incharge",
    dept: "Training & Placement Cell",
    email: "nkumar@ietlucknow.ac.in",
    img: "/images/naveen_kumar.jpg",
    href: "https://www.ietlucknow.ac.in/people/nkumar"
  },
  {
    name: "Dr. Ajay Kumar Sharma",
    role: "Deputy Incharge",
    dept: "Training & Placement Cell",
    email: "ajaysharma@ietlucknow.ac.in",
    img: "/images/tnp_members/aks_sir.jpg",
    href: "https://www.ietlucknow.ac.in/people/aksharma"
  },
  {
    name: "Vibhanshu Upadhyay",
    role: "Deputy Incharge",
    dept: "Training & Placement Cell",
    email: "vibhanshuupadhyay@ietlucknow.ac.in",
    img: "/images/vibhanshu_upadhyay.jpg",
    href: "https://www.ietlucknow.ac.in/people/vibhanshuupadhyay"
  }
];

/**
 * Chief Student Placement Coordinators.
 * Primary points of contact for recruitment drives, company coordination,
 * logistics planning, and interview scheduling.
 * 
 * @constant {Person[]} coordinators
 */
const coordinators: Person[] = [
  {
    name: "Akshit Agrawal",
    role: "Coordinator",
    dept: "CSE",
    phone: "+91 98972 41287",
    img: "/images/tnp_members/akshit.jpeg",
    linkedin: "https://www.linkedin.com/in/akshit-agarwal-0ab856203/"
  },
  {
    name: "Shivansh Kaushik",
    role: "Coordinator",
    dept: "CSE",
    phone: "+91 7599188181",
    img: "/images/tnp_members/shivansh.png",
    linkedin: "https://www.linkedin.com/in/shivansh-kaushik-b3165827a/"
  },
  {
    name: "Gopal Jee",
    role: "Coordinator",
    dept: "CSE",
    phone: "+91 95556 65473",
    img: "/images/tnp_members/gopal.jpeg",
    linkedin: "https://www.linkedin.com/in/gopaljee2745/"
  }
];

/**
 * Technical & Web Administration Team.
 * Engineers responsible for digital infrastructure, portal management,
 * online assessment integrations, and placement automation systems.
 * 
 * @constant {Person[]} webAdmins
 */
const webAdmins: Person[] = [
  {
    name: "Devansh Rai",
    role: "Web Admin",
    dept: "CSE",
    phone: "+91 92365 17915",
    img: "/images/tnp_members/devansh.jpeg",
    linkedin: "https://www.linkedin.com/in/devansh-rai-0033bb299/"
  },
  {
    name: "Divyanshu Tiwari",
    role: "Web Admin",
    dept: "MCA",
    phone: "+91 89229 21012",
    img: "/images/tnp_members/divyanshu.jpeg",
    linkedin: "https://www.linkedin.com/in/divyanshu-tiwari-sde/"
  },
];

/**
 * Departmental Placement Co-coordinators & Core Team Members.
 * Student leaders facilitating department-specific drives, student preparation,
 * resume screening, and ground execution during placement season.
 * 
 * @constant {Person[]} teamMembers
 */
const teamMembers: Person[] = [
  {
    name: "Harsh Aditya",
    role: "Co-cordinator",
    dept: "CSE",
    phone: "+91 93363 71280",
    img: "/images/tnp_members/harsh_aditya.jpeg",
    linkedin: "https://www.linkedin.com/in/harsh-aditya-0b6a58271/"
  },
  {
    name: "Divyanshi Shukla",
    role: "Co-cordinator",
    dept: "ECE",
    phone: "+91 86300 59863",
    img: "/images/tnp_members/divyanshi.jpeg",
    linkedin: "https://www.linkedin.com/in/divyanshi-shukla-6b822b306/"
  },
  {
    name: "Ayush Kaushik",
    role: "Co-cordinator",
    dept: "CHE",
    phone: "+91 63934 89820",
    img: "/images/tnp_members/ayush.jpeg",
    linkedin: "https://www.linkedin.com/in/ayush-kaushik-a4815030b/"
  },
  {
    name: "Harsh Chauhan",
    role: "Co-cordinator",
    dept: "CHE",
    phone: "+91 78893 26956",
    img: "/images/tnp_members/harsh.jpeg",
    linkedin: "https://www.linkedin.com/in/harsh-chauhan-6bb348336/"
  },
  {
    name: "Anshika Mishra",
    role: "Co-cordinator",
    dept: "ME",
    phone: "+91 98388 33546",
    img: "/images/tnp_members/anshika_mishra.jpeg",
    linkedin: "https://www.linkedin.com/in/anshikamishra2304/"
  },
  {
    name: "Aftar Najmain",
    role: "Co-cordinator",
    dept: "CSE",
    phone: "+91 87914 03171",
    img: "/images/tnp_members/afkar.jpg",
    linkedin: "https://www.linkedin.com/in/afkar-najmain-8b81672b2/"
  },
  {
    name: "Vanshika Tyagi",
    role: "Team Member",
    dept: "CSE",
    phone: "+91 81301 75916",
    img: "/images/tnp_members/vanshika_tyagi.jpeg",
    linkedin: "https://www.linkedin.com/in/vanshika-tyagi-25a878338/"
  },
  {
    name: "ABHISHEK MISHRA",
    role: "Team Member",
    dept: "EE",
    phone: "+91 920261 23806",
    img: "/images/tnp_members/abhishek.jpeg",
    linkedin: "https://www.linkedin.com/in/abhishek-maurya-617987293/"
  },
  {
    name: "Dhananjay Pandey",
    role: "Team Member",
    dept: "CSE",
    phone: "+91 84670 75453",
    img: "/images/tnp_members/dhananjay.jpeg",
    linkedin: "https://www.linkedin.com/in/dhananjay-pandey-59b79b293/"
  },
  {
    name: "Anshika Gupta",
    role: "Team Member",
    dept: "CSE",
    phone: "+91 88405 97998",
    img: "/images/tnp_members/anshika_gupta.jpeg",
    linkedin: "https://www.linkedin.com/in/anshika-gupta-a3088228a//"
  },
  {
    name: "Vivek Gangwar",
    role: "Team Member",
    dept: "ME",
    phone: "+91 74670 00804",
    img: "/images/tnp_members/vivek.jpg",
    linkedin: "https://www.linkedin.com/in/vivek-gangwar-03561129b/"
  },
  {
    name: "Arin Mishra",
    role: "Team Member",
    dept: "CSE",
    phone: "+91 95559 62392",
    img: "/images/tnp_members/arin.jpeg",
    linkedin: "https://www.linkedin.com/in/arinmishra100/"
  },
  {
    name: "Vanshika Dubey",
    role: "Team Member",
    dept: "CSE",
    phone: "+91 95063 75705",
    img: "/images/tnp_members/vanshika_dubey.jpg",
    linkedin: "https://www.linkedin.com/in/vanshika-dubey-566387281/"
  },
  {
    name: "Anupriya Ranjan",
    role: "Team Member",
    dept: "MCA",
    phone: "+91 81760 89337",
    img: "/images/tnp_members/anupriya.jpeg",
    linkedin: "https://www.linkedin.com/in/anupriya-ranjan-956580384/"
  },
];

/**
 * MBA Placement Team.
 * Dedicated student representatives managing recruitment drives for Master
 * of Business Administration candidates across Marketing, Finance, HR, and Operations.
 * 
 * @constant {Person[]} mbaTeam
 */
const mbaTeam: Person[] = [
  {
    name: "Sakshi Pathak",
    role: "Team Member",
    dept: "Marketing & Operations",
    phone: "+91 92365 17915",
    img: "/images/tnp_members/sakshi.jpeg",
    linkedin: "https://www.linkedin.com/in/sakshi-pathak-26528b261/"
  },
  {
    name: "Tanshiq Joshi",
    role: "Team Member",
    dept: "Finance & Marketing",
    phone: "+91 89229 21012",
    img: "/images/tnp_members/tanishq.jpeg",
    linkedin: "https://www.linkedin.com/in/tanishqjoshi1402/"
  },
  {
    name: "Anshika Yadav",
    role: "Team Member",
    dept: "Marketing & Operations",
    phone: "+91 89229 21012",
    img: "/images/tnp_members/anshika.jpeg",
    linkedin: "https://www.linkedin.com/in/anshika-yadav-6b8875335/"
  },
  {
    name: "Abhinav Srivastav",
    role: "Team Member",
    dept: "Finance & Operations",
    phone: "+91 89229 21012",
    img: "/images/tnp_members/abhinav.jpeg",
    linkedin: "https://www.linkedin.com/in/abhinav-srivastav-26593a358/"
  },
];



// ============================================================================
// UI COMPONENTS
// ============================================================================

/**
 * PersonCard Component
 * 
 * Production-ready personnel card component rendering member portrait, role badge,
 * institutional affiliations, and interactive communication channels.
 * Features GPU-accelerated mouse-proximity glowing boundary effects.
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {Person} props.person - The personnel profile data object
 * @param {boolean} [props.large=false] - Legacy boolean toggle for high-priority leadership cards
 * @param {"normal" | "medium" | "large"} [props.size] - Explicit dimension tier override
 * @param {string} [props.className=""] - Optional wrapper styling overrides
 * @returns {JSX.Element} Accessible, responsive personnel card
 */
function PersonCard({
  person,
  large = false,
  size,
  className = ""
}: {
  person: Person;
  large?: boolean;
  size?: "normal" | "medium" | "large";
  className?: string;
}) {
  const cardSize = size || (large ? "large" : "normal");
  const isLarge = cardSize === "large";
  const isMedium = cardSize === "medium";

  // Compute initials for graceful image load failover
  const initials = person.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  // Responsive dimensions calibrated for leadership vs departmental vs coordinator tiers
  const imgSize = isLarge
    ? "w-48 h-48 sm:w-32 sm:h-32 md:w-40 md:h-40"
    : isMedium
    ? "w-32 h-32 sm:w-20 sm:h-20 md:w-22 md:h-22"
    : "w-32 h-32 sm:w-20 sm:h-20";

  const cardPadding = isLarge
    ? "p-8 md:p-10"
    : isMedium
    ? "p-5 sm:px-6 sm:py-6 md:px-6 md:py-6"
    : "p-6";

  const nameText = isLarge
    ? "text-2xl md:text-3xl font-black"
    : isMedium
    ? "text-base sm:text-lg font-bold"
    : "text-lg font-extrabold";

  const roleText = isLarge
    ? "text-xs tracking-[0.2em]"
    : isMedium
    ? "text-[11px] tracking-[0.16em]"
    : "text-[10px] tracking-[0.15em]";

  const baseClasses = isLarge
    ? "flex flex-col sm:flex-row items-center sm:items-start gap-8 group block overflow-hidden"
    : isMedium
    ? "flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 group block overflow-hidden"
    : "flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 group block overflow-hidden";

  const cardClass = isLarge
    ? `${baseClasses} bg-white rounded-[2.5rem] shadow-md hover:shadow-2xl transition-all duration-300`
    : isMedium
    ? `${baseClasses} bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300`
    : `${baseClasses} bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300`;

  const wrapperClass = isLarge
    ? "relative h-full rounded-[2.5rem] transition-all duration-300"
    : isMedium
    ? "relative h-full rounded-[2rem] transition-all duration-300"
    : "relative h-full rounded-3xl transition-all duration-300";

  const image = person.img ? (
    <Image
      src={person.img}
      alt={`${person.name} - ${person.role}, ${person.dept}`}
      className={`${imgSize} rounded-2xl object-cover shadow-md shrink-0 border-2 border-white aspect-square`}
      width={192}
      height={192}
      sizes="(max-width: 640px) 80px, (max-width: 1024px) 160px, 192px"
    />
  ) : (
    <div
      aria-hidden="true"
      className={`${imgSize} rounded-2xl bg-brand-50 flex items-center justify-center text-brand-800 font-bold ${
        isLarge ? "text-4xl" : isMedium ? "text-2xl" : "text-xl"
      } shrink-0 border-2 border-brand-100 aspect-square`}
    >
      {initials}
    </div>
  );

  const imageNode = person.href ? (
    <a
      href={person.href}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 hover:opacity-90 transition-opacity focus:outline-hidden focus:ring-2 focus:ring-brand-accent/50 rounded-2xl"
      title={`View ${person.name}'s Profile on IET Website`}
      aria-label={`View ${person.name}'s Profile`}
    >
      {image}
    </a>
  ) : (
    image
  );

  const phoneHref = person.phone ? `tel:${person.phone.replace(/\s+/g, "")}` : undefined;

  return (
    <article className={`${wrapperClass} ${className} group/card`.trim()} aria-label={`${person.name}, ${person.role}`}>
      <GlowingEffect
        blur={0}
        borderWidth={2}
        spread={80}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <div className={`${cardClass} ${cardPadding}`}>
        {imageNode}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className={`${roleText} font-extrabold text-brand-accent uppercase opacity-90`}>
              {person.role}
            </span>
            {person.href && (
              <a
                href={person.href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-7 sm:h-7.5 min-w-[28px] sm:min-w-[30px] px-1.75 rounded-full flex items-center justify-center bg-brand-50 text-brand-700 border border-brand-200/60 shadow-2xs transition-all duration-300 ease-out group/arrow shrink-0 overflow-hidden focus:outline-hidden focus:ring-2 focus:ring-brand-accent/40 group-hover/card:bg-brand-700 group-hover/card:text-white group-hover/card:border-brand-700 group-hover/card:shadow-xs"
                title="Faculty Profile"
                aria-label={`View faculty profile of ${person.name}`}
              >
                {/* Hover text: expands smoothly to Faculty Profile only when the cursor is on the arrow */}
                <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover/arrow:max-w-[100px] group-hover/arrow:opacity-100 group-hover/arrow:mr-1.5 group-hover/arrow:pl-1 transition-all duration-300 ease-out text-[11px] font-bold text-white pointer-events-none">
                  Faculty Profile
                </span>
                <span className="relative w-3.5 h-3.5 overflow-hidden flex items-center justify-center pointer-events-none shrink-0">
                  {/* Primary Arrow: slides up-right when card cursor is active */}
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover/card:translate-x-full group-hover/card:-translate-y-full"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.2}
                      d="M7 17L17 7M17 7H9M17 7V15"
                    />
                  </svg>
                  {/* Duplicate Arrow: slides in from bottom-left when card cursor is active */}
                  <svg
                    className="w-3.5 h-3.5 absolute inset-0 -translate-x-full translate-y-full transition-transform duration-300 ease-out group-hover/card:translate-x-0 group-hover/card:translate-y-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.2}
                      d="M7 17L17 7M17 7H9M17 7V15"
                    />
                  </svg>
                </span>
              </a>
            )}
          </div>
          {person.href ? (
            <a
              href={person.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${nameText} text-brand-800 hover:text-brand-accent transition-colors ${
                isMedium ? "break-words" : "truncate"
              } block leading-snug focus:outline-hidden focus:ring-2 focus:ring-brand-accent/30 rounded-sm`}
            >
              {person.name}
            </a>
          ) : (
            <div
              className={`${nameText} text-brand-800 ${
                isMedium ? "break-words" : "truncate"
              } group-hover:text-brand-700 leading-snug`}
            >
              {person.name}
            </div>
          )}
          <div className={`${isLarge ? "text-base mt-1" : isMedium ? "text-xs sm:text-sm mt-0.5" : "text-sm"} text-muted font-medium mb-3`}>{person.dept}</div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            {person.email && (
              <div className="flex flex-col items-center sm:items-start gap-2 max-w-full">
                {person.emailp && (
                  <a
                    href={`mailto:${person.emailp}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 rounded-xl text-brand-700 hover:bg-brand-700 hover:text-white transition-all duration-200 border border-brand-100/50 shadow-2xs group/mail"
                    aria-label={`Send email to ${person.emailp}`}
                  >
                    <svg className="w-3.5 h-3.5 shrink-0 opacity-75 group-hover/mail:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs font-semibold truncate">{person.emailp}</span>
                  </a>
                )}
                <a
                  href={`mailto:${person.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 rounded-xl text-brand-700 hover:bg-brand-700 hover:text-white transition-all duration-200 border border-brand-100/50 max-w-full shadow-2xs group/mail"
                  title={person.email}
                  aria-label={`Send email to ${person.name} at ${person.email}`}
                >
                  <svg className="w-3.5 h-3.5 shrink-0 opacity-75 group-hover/mail:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className={`text-xs font-semibold tracking-tight ${isMedium ? "whitespace-nowrap" : "truncate"}`}>
                    {person.email}
                  </span>
                </a>
              </div>
            )}
            {phoneHref && (
              <a
                href={phoneHref}
                className="p-3 bg-gray-50 rounded-xl text-brand-700 hover:bg-brand-700 hover:text-white transition-all duration-200 border border-gray-100"
                aria-label={`Call ${person.name} at ${person.phone}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </a>
            )}
            {person.linkedin && (
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#0A66C215] rounded-xl text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all duration-200 border border-[#0A66C2]/10"
                aria-label={`${person.name} on LinkedIn`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Schema.org Structured Data (JSON-LD) for Institutional Contact Page.
 * Enhances search engine indexing, Google Knowledge Graph, and rich card discovery.
 * Certified compliant with schema.org/ContactPage standards.
 */
const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Training & Placement Cell - Official Contact Directory",
  description:
    "Official directory of the Training & Placement Cell at Institute of Engineering & Technology (IET), Lucknow, featuring Placement In-Charge, Deputy In-Charges, Coordinators, and placement representatives.",
  url: "https://placement.ietlucknow.ac.in/tpc/contactus",
  mainEntity: {
    "@type": "EducationalOrganization",
    name: "Institute of Engineering & Technology, Lucknow",
    alternateName: "IET Lucknow",
    url: "https://www.ietlucknow.ac.in",
    department: {
      "@type": "Organization",
      name: "Training & Placement Cell",
      url: "https://placement.ietlucknow.ac.in",
      email: "placement@ietlucknow.ac.in",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sitapur Road, Sector F, Jankipuram",
        addressLocality: "Lucknow",
        addressRegion: "Uttar Pradesh",
        postalCode: "226021",
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "Placement Officer In-Charge",
          email: "aruntiwari@ietlucknow.ac.in",
          availableLanguage: ["English", "Hindi"],
        },
        {
          "@type": "ContactPoint",
          contactType: "Placement Cell Generic Enquiries",
          email: "placement@ietlucknow.ac.in",
          availableLanguage: ["English", "Hindi"],
        },
      ],
      employee: [
        {
          "@type": "Person",
          name: leadership[0].name,
          jobTitle: leadership[0].role,
          email: leadership[0].email,
          url: leadership[0].href,
        },
        ...deputyIncharges.map((deputy) => ({
          "@type": "Person",
          name: deputy.name,
          jobTitle: deputy.role,
          email: deputy.email,
          url: deputy.href,
        })),
      ],
    },
  },
};

/**
 * ContactUsPage Component
 * 
 * Main view for the Training & Placement Cell Contact Directory.
 * Organizes administrative leaders, faculty deputy in-charges, and student
 * coordinator teams into hierarchical visual groups and collapsible accordions.
 * 
 * @component
 * @returns {JSX.Element} The rendered Contact Us directory page
 */
export default function ContactUsPage() {
  // Accordion expansion state hooks
  const [coordinatorsOpen, setCoordinatorsOpen] = useState(true);
  const [webAdminOpen, setWebAdminOpen] = useState(true);
  const [teamOpen, setTeamOpen] = useState(true);
  const [mbaTeamOpen, setMbaTeamOpen] = useState(true);

  return (
    <>
      {/* Invisible Schema.org JSON-LD Structured Data for Enterprise SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />

      <main className="page-top-gap-largest bg-gray-50/50 pt-28 pb-16 md:pt-32" id="contact-us" role="main">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header & Page Description */}
          <header className="mb-16 text-center">
            <h1 className="text-4xl font-extrabold text-brand-800 tracking-tight">Contact Us</h1>
            <div className="h-1.5 w-20 bg-brand-accent rounded-full mx-auto mt-4 shadow-sm" aria-hidden="true"></div>
            <p className="mt-6 text-muted max-w-2xl mx-auto text-lg leading-relaxed">
              Find contact details of our T&amp;P Officer, deputy in-charges, co-ordinators and team members below.
            </p>
          </header>

          {/* Section 1: Placement In-Charge (Officer Incharge) */}
          <section className="mb-20" aria-label="Placement In-Charge Leadership">
            <h2 className="text-xl font-bold text-brand-800 mb-10 flex justify-center items-center gap-3 text-center">
              <span className="w-10 h-1 bg-brand-accent rounded-full" aria-hidden="true"></span>
              <span>
                PLACEMENT <br className="sm:hidden" />
                IN-CHARGE
              </span>
              <span className="w-10 h-1 bg-brand-accent rounded-full" aria-hidden="true"></span>
            </h2>
            <div className="flex items-center justify-center">
              {leadership.map((person) => (
                <PersonCard key={person.name} person={person} large />
              ))}
            </div>
          </section>

          {/* Section 2: Deputy In-Charge Faculty Leadership */}
          <section className="mb-20 -mx-3 sm:-mx-5 lg:-mx-8 xl:-mx-14" aria-label="Deputy In-Charge Faculty Leadership">
            <h2 className="text-xl font-bold text-brand-800 mb-10 flex justify-center items-center gap-3 text-center">
              <span className="w-10 h-1 bg-brand-accent rounded-full" aria-hidden="true"></span>
              <span>
                DEPUTY <br className="sm:hidden" />
                IN-CHARGE
              </span>
              <span className="w-10 h-1 bg-brand-accent rounded-full" aria-hidden="true"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.05fr] gap-5 lg:gap-6 px-3 sm:px-5 lg:px-0">
              {deputyIncharges.map((person) => (
                <PersonCard key={person.name} person={person} size="medium" />
              ))}
            </div>
          </section>

          {/* Section 3: Student Coordinators & Placement Teams Accordions */}
          <section className="space-y-6" aria-label="Placement Student Committees and Teams">
            {/* Placement Coordinators Collapsible */}
            <div className="border border-gray-100 bg-white/50 rounded-3xl overflow-hidden shadow-sm">
              <button
                type="button"
                id="coordinators-heading"
                aria-expanded={coordinatorsOpen}
                aria-controls="coordinators-content"
                onClick={() => setCoordinatorsOpen((prev) => !prev)}
                className="w-full flex items-center justify-between p-6 md:p-8 hover:bg-white transition-colors group focus:outline-hidden focus:ring-2 focus:ring-brand-accent/20"
              >
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-brand-800 flex items-center gap-2 sm:gap-3">
                  <span className="w-6 sm:w-8 h-1 bg-brand-accent rounded-full shrink-0" aria-hidden="true"></span>
                  <span className="truncate">PLACEMENT COORDINATORS</span>
                </h2>
                <svg
                  className={`w-6 h-6 text-brand-400 transform transition-transform duration-300 ${
                    coordinatorsOpen ? "rotate-0" : "-rotate-90"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                id="coordinators-content"
                role="region"
                aria-labelledby="coordinators-heading"
                className={`px-6 pb-8 md:px-8 md:pb-10 transition-all duration-300 ease-in-out ${
                  coordinatorsOpen ? "block" : "hidden"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {coordinators.map((person) => (
                    <PersonCard key={person.name} person={person} />
                  ))}
                </div>
              </div>
            </div>

            {/* Web-Admin Team Collapsible */}
            <div className="border border-gray-100 bg-white/50 rounded-3xl overflow-hidden shadow-sm">
              <button
                type="button"
                id="webadmin-heading"
                aria-expanded={webAdminOpen}
                aria-controls="webadmin-content"
                onClick={() => setWebAdminOpen((prev) => !prev)}
                className="w-full flex items-center justify-between p-6 md:p-8 hover:bg-white transition-colors group focus:outline-hidden focus:ring-2 focus:ring-brand-accent/20"
              >
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-brand-800 flex items-center gap-2 sm:gap-3">
                  <span className="w-8 h-1 bg-brand-accent rounded-full" aria-hidden="true"></span>
                  WEB-ADMIN TEAM
                </h2>
                <svg
                  className={`w-6 h-6 text-brand-400 transform transition-transform duration-300 ${
                    webAdminOpen ? "rotate-0" : "-rotate-90"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                id="webadmin-content"
                role="region"
                aria-labelledby="webadmin-heading"
                className={`px-6 pb-8 md:px-8 md:pb-10 transition-all duration-300 ease-in-out ${
                  webAdminOpen ? "block" : "hidden"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {webAdmins.map((person) => (
                    <PersonCard key={person.name} person={person} />
                  ))}
                </div>
              </div>
            </div>

            {/* Placement Team Members Collapsible */}
            <div className="border border-gray-100 bg-white/50 rounded-3xl overflow-hidden shadow-sm">
              <button
                type="button"
                id="placement-team-heading"
                aria-expanded={teamOpen}
                aria-controls="placement-team-content"
                onClick={() => setTeamOpen((prev) => !prev)}
                className="w-full flex items-center justify-between p-6 md:p-8 hover:bg-white transition-colors group focus:outline-hidden focus:ring-2 focus:ring-brand-accent/20"
              >
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-brand-800 flex items-center gap-2 sm:gap-3">
                  <span className="w-8 h-1 bg-brand-accent rounded-full" aria-hidden="true"></span>
                  PLACEMENT TEAM
                </h2>
                <svg
                  className={`w-6 h-6 text-brand-400 transform transition-transform duration-300 ${
                    teamOpen ? "rotate-0" : "-rotate-90"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                id="placement-team-content"
                role="region"
                aria-labelledby="placement-team-heading"
                className={`px-6 pb-8 md:px-8 md:pb-10 transition-all duration-300 ease-in-out ${
                  teamOpen ? "block" : "hidden"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teamMembers.map((person) => (
                    <PersonCard key={person.name} person={person} />
                  ))}
                </div>
              </div>
            </div>

            {/* MBA Placement Team Collapsible */}
            <div className="border border-gray-100 bg-white/50 rounded-3xl overflow-hidden shadow-sm">
              <button
                type="button"
                id="mba-team-heading"
                aria-expanded={mbaTeamOpen}
                aria-controls="mba-team-content"
                onClick={() => setMbaTeamOpen((prev) => !prev)}
                className="w-full flex items-center justify-between p-6 md:p-8 hover:bg-white transition-colors group focus:outline-hidden focus:ring-2 focus:ring-brand-accent/20"
              >
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-brand-800 flex items-center gap-2 sm:gap-3">
                  <span className="w-8 h-1 bg-brand-accent rounded-full" aria-hidden="true"></span>
                  MBA PLACEMENT TEAM
                </h2>
                <svg
                  className={`w-6 h-6 text-brand-400 transform transition-transform duration-300 ${
                    mbaTeamOpen ? "rotate-0" : "-rotate-90"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                id="mba-team-content"
                role="region"
                aria-labelledby="mba-team-heading"
                className={`px-6 pb-8 md:px-8 md:pb-10 transition-all duration-300 ease-in-out ${
                  mbaTeamOpen ? "block" : "hidden"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mbaTeam.map((person) => (
                    <PersonCard key={person.name} person={person} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}