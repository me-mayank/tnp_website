"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

type Person = {
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

const coordinators: Person[] = [
  {
    name: "Akhilesh Pratap Singh",
    role: "Coordinator",
    dept: "CSE",
    phone: "+91 88108 28730",
    img: "/images/tnp_members/akhilesh_pratap_singh.jpeg",
    linkedin: "https://www.linkedin.com/in/akhilesh-pratap-singh-3b9048296/"
  },
  {
    name: "Aryan Pandey",
    role: "Coordinator",
    dept: "Civil Engineering",
    phone: "+91 93057 85058",
    img: "/images/tnp_members/aryan_pandey.jpg",
    linkedin: "https://www.linkedin.com/in/aryan-pandey-391a30253/"
  },
  {
    name: "Shivansh Gupta",
    role: "Coordinator",
    dept: "Chemical Engineering",
    phone: "+91 99368 21286",
    img: "/images/tnp_members/shivansh_gupta.jpg",
    linkedin: "https://www.linkedin.com/in/shivansh-gupta07/"
  }
];

const webAdmins: Person[] = [
  {
    name: "Aayush Vishwakarma",
    role: "Web Admin",
    dept: "CSE",
    phone: "+91 99188 30471",
    img: "/images/tnp_members/aayush_vishwkarma.jpg",
    linkedin: "https://www.linkedin.com/in/aayush-vishwakarma-68a8a92a1/"
  },
  {
    name: "Priyanshu Mishra",
    role: "Web Admin",
    dept: "CSE",
    phone: "+91 93693 24363",
    img: "/images/tnp_members/priyanshu_mishra.jpg",
    linkedin: "https://www.linkedin.com/in/priyanshu-mishra-6a1011220/"
  },
  {
    name: "Saumya Srivastava",
    role: "Web Admin",
    dept: "MCA",
    phone: "+91 82991 75668",
    img: "/images/tnp_members/saumya_srivastav.jpg",
    linkedin: "https://www.linkedin.com/in/saumya-srivastavaa/"
  }
];

const teamMembers: Person[] = [
  {
    name: "Affan Ali",
    role: "Team Member",
    dept: "Mechanical Engineering",
    phone: "+91 93363 71280",
    img: "/images/tnp_members/affan_ali.jpg",
    linkedin: "https://www.linkedin.com/in/affan-ali-25b5781ab/"
  },
  {
    name: "Anjali Tomar",
    role: "Team Member",
    dept: "Civil Engineering",
    phone: "+91 86300 59863",
    img: "/images/tnp_members/anjali_tomar.png",
    linkedin: "https://www.linkedin.com/in/anjali-tomar-71522a266/"
  },
  {
    name: "Ayushi Agarwal",
    role: "Team Member",
    dept: "CSE",
    phone: "+91 63934 89820",
    img: "/images/tnp_members/ayushi_agarwal.jpg",
    linkedin: "https://www.linkedin.com/in/ayushi-agarwal-316a1124b/"
  },
  {
    name: "Jannu Hans",
    role: "Team Member",
    dept: "CSE",
    phone: "+91 78893 26956",
    img: "/images/tnp_members/jannu_hans.jpg",
    linkedin: "https://www.linkedin.com/in/jannu-hans-16181a2a1/"
  },
  {
    name: "Rimjhim Singh",
    role: "Team Member",
    dept: "Civil Engineering",
    phone: "+91 98388 33546",
    img: "/images/tnp_members/rimjhim_singh.jpg",
    linkedin: "https://www.linkedin.com/in/rimjhim-singh-2457ba25a/"
  },
  {
    name: "Utkarsh Singh",
    role: "Team Member",
    dept: "Mechanical Engineering",
    phone: "+91 87914 03171",
    img: "/images/tnp_members/utkarsh.jpg",
    linkedin: "https://www.linkedin.com/in/utkarshsingh-iet/"
  },
];

function PersonCard({ person, large = false }: { person: Person; large?: boolean }) {
  const initials = person.name
    .split(" ")
    .map((part) => part[0])
    .join("");
  const imgSize = large
    ? "w-48 h-48 sm:w-32 sm:h-32 md:w-40 md:h-40"
    : "w-32 h-32 sm:w-20 sm:h-20";
  const cardPadding = large ? "p-8 md:p-10" : "p-6";
  const nameText = large ? "text-2xl md:text-3xl font-black" : "text-lg font-extrabold";
  const roleText = large ? "text-xs tracking-[0.2em]" : "text-[10px] tracking-[0.15em]";
  const baseClasses = "flex flex-col sm:flex-row items-center sm:items-start gap-8 group block overflow-hidden";
  const cardClass = large
    ? `${baseClasses} bg-white rounded-[2.5rem] shadow-md hover:shadow-2xl  transition-all duration-300`
    : `${baseClasses} bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300`;
  const wrapperClass = large
    ? "relative h-full rounded-[2.5rem] transition-all duration-300"
    : "relative h-full rounded-3xl transition-all duration-300";

  const image = person.img ? (
    <Image
      src={person.img}
      alt={person.name}
      className={`${imgSize} rounded-2xl object-cover shadow-md shrink-0 border-2 border-white aspect-square`}
      width={192}
      height={192}
      sizes="(max-width: 640px) 80px, (max-width: 1024px) 160px, 192px"
    />
  ) : (
    <div
      className={`${imgSize} rounded-2xl bg-brand-50 flex items-center justify-center text-brand-800 font-bold ${
        large ? "text-4xl" : "text-xl"
      } shrink-0 border-2 border-brand-100 aspect-square`}
    >
      {initials}
    </div>
  );

  const phoneHref = person.phone ? `tel:${person.phone.replace(/\s+/g, "")}` : undefined;

  const content = (
    <>
      {image}
      <div className="flex-1 min-w-0 text-center sm:text-left">
        <div className={`${roleText} font-extrabold text-brand-accent uppercase mb-2 opacity-90`}>{person.role}</div>
        <div className={`${nameText} text-brand-800 truncate group-hover:text-brand-700 leading-tight`}>{person.name}</div>
        <div className={`${large ? "text-base mt-1" : "text-sm"} text-muted font-medium mb-3`}>{person.dept}</div>
        <div className="flex flex-wrap justify-center sm:justify-start gap-3">
          {person.email && (
            <div className="flex flex-col items-center gap-2">
            <a
              href={`mailto:${person.emailp}`}
              className="flex items-center gap-2 px-4 py-1 bg-brand-50 rounded-xl text-brand-700 hover:bg-brand-700 hover:text-white transition-all duration-200 border border-brand-100/50"
            >
              <span className="text-xs font-bold truncate">{person.emailp}</span>
            </a>
            <a
              href={`mailto:${person.email}`}
              className="flex items-center gap-2 px-4 py-1 bg-brand-50 rounded-xl text-brand-700 hover:bg-brand-700 hover:text-white transition-all duration-200 border border-brand-100/50"
            >
              <span className="text-xs font-bold truncate">{person.email}</span>
            </a>
           
            </div>
          )}
          {phoneHref && (
            <a
              href={phoneHref}
              className="p-3 bg-gray-50 rounded-xl text-brand-700 hover:bg-brand-700 hover:text-white transition-all duration-200 border border-gray-100"
              aria-label={`Call ${person.name}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </a>
          )}
          {person.linkedin && (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-[#0A66C215] rounded-xl text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all duration-200 border border-[#0A66C2]/10"
              aria-label={`${person.name} on LinkedIn`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </>
  );

  // Render a stable outer container to avoid wrapping block elements directly in <a>,
  // which can trigger hydration mismatches between server and client.
  return (
    <div className={wrapperClass}>
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
        {person.href ? (
          // Use an inner anchor with display contents so the DOM structure remains consistent
          // while the whole card remains clickable.
          <a href={person.href} target="_blank" rel="noreferrer" className="contents">
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    </div>
  );
}

export default function ContactUsPage() {
  const [coordinatorsOpen, setCoordinatorsOpen] = useState(true);
  const [webAdminOpen, setWebAdminOpen] = useState(true);
  const [teamOpen, setTeamOpen] = useState(true);

  return (
    <>
      <main className="bg-gray-50/50 py-16" id="contact-us">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h1 className="text-4xl font-extrabold text-brand-800 tracking-tight">Contact Us</h1>
            <div className="h-1.5 w-20 bg-brand-accent rounded-full mx-auto mt-4 shadow-sm"></div>
            <p className="mt-6 text-muted max-w-2xl mx-auto text-lg leading-relaxed">
              Find contact details of our T&amp;P Officer, co-ordinators and team members below.
            </p>
          </div>

          <div className="mb-20">
            <h2 className="text-xl font-bold text-brand-800 mb-10 flex justify-center items-center gap-3">
              <span className="w-10 h-1 bg-brand-accent rounded-full"></span>
              PLACEMENT IN-CHARGE
              <span className="w-10 h-1 bg-brand-accent rounded-full"></span>
            </h2>
            <div className="flex items-center justify-center">
              {leadership.map((person) => (
                <PersonCard key={person.name} person={person} large />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-gray-100 bg-white/50 rounded-3xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => setCoordinatorsOpen((prev) => !prev)}
                className="w-full flex items-center justify-between p-6 md:p-8 hover:bg-white transition-colors group"
              >
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-brand-800 flex items-center gap-2 sm:gap-3">
                  <span className="w-6 sm:w-8 h-1 bg-brand-accent rounded-full shrink-0"></span>
                  <span className="truncate">PLACEMENT CO-ORDINATORS</span>
                </h2>
                <svg
                  className={`w-6 h-6 text-brand-400 transform transition-transform duration-300 ${
                    coordinatorsOpen ? "rotate-0" : "-rotate-90"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`px-6 pb-8 md:px-8 md:pb-10 transition-all duration-300 ease-in-out ${
                coordinatorsOpen ? "block" : "hidden"
              }`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {coordinators.map((person) => (
                    <PersonCard key={person.name} person={person} />
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-gray-100 bg-white/50 rounded-3xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => setWebAdminOpen((prev) => !prev)}
                className="w-full flex items-center justify-between p-6 md:p-8 hover:bg-white transition-colors group"
              >
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-brand-800 flex items-center gap-2 sm:gap-3">
                  <span className="w-8 h-1 bg-brand-accent rounded-full"></span>
                  WEB-ADMIN TEAM
                </h2>
                <svg
                  className={`w-6 h-6 text-brand-400 transform transition-transform duration-300 ${
                    webAdminOpen ? "rotate-0" : "-rotate-90"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`px-6 pb-8 md:px-8 md:pb-10 transition-all duration-300 ease-in-out ${
                webAdminOpen ? "block" : "hidden"
              }`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {webAdmins.map((person) => (
                    <PersonCard key={person.name} person={person} />
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-gray-100 bg-white/50 rounded-3xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => setTeamOpen((prev) => !prev)}
                className="w-full flex items-center justify-between p-6 md:p-8 hover:bg-white transition-colors group"
              >
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-brand-800 flex items-center gap-2 sm:gap-3">
                  <span className="w-8 h-1 bg-brand-accent rounded-full"></span>
                  PLACEMENT TEAM
                </h2>
                <svg
                  className={`w-6 h-6 text-brand-400 transform transition-transform duration-300 ${
                    teamOpen ? "rotate-0" : "-rotate-90"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`px-6 pb-8 md:px-8 md:pb-10 transition-all duration-300 ease-in-out ${
                teamOpen ? "block" : "hidden"
              }`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teamMembers.map((person) => (
                    <PersonCard key={person.name} person={person} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
