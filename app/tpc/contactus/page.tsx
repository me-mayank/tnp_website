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
    ? `${baseClasses} bg-white rounded-[2.5rem] shadow-md hover:shadow-2xl transition-all duration-300`
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

  const imageNode = person.href ? (
    <a
      href={person.href}
      target="_blank"
      rel="noreferrer"
      className="shrink-0 hover:opacity-90 transition-opacity"
      title={`View ${person.name}'s Profile`}
    >
      {image}
    </a>
  ) : (
    image
  );

  const phoneHref = person.phone ? `tel:${person.phone.replace(/\s+/g, "")}` : undefined;

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
        {imageNode}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <div className={`${roleText} font-extrabold text-brand-accent uppercase mb-2 opacity-90`}>{person.role}</div>
          {person.href ? (
            <a
              href={person.href}
              target="_blank"
              rel="noreferrer"
              className={`${nameText} text-brand-800 hover:text-brand-accent transition-colors truncate block leading-tight`}
            >
              {person.name}
            </a>
          ) : (
            <div className={`${nameText} text-brand-800 truncate group-hover:text-brand-700 leading-tight`}>{person.name}</div>
          )}
          <div className={`${large ? "text-base mt-1" : "text-sm"} text-muted font-medium mb-3`}>{person.dept}</div>
          <div className="flex flex-wrap justify-center sm:justify-start gap-3">
            {person.email && (
              <div className="flex flex-col items-center gap-2">
                {person.emailp && (
                  <a
                    href={`mailto:${person.emailp}`}
                    className="flex items-center gap-2 px-4 py-1 bg-brand-50 rounded-xl text-brand-700 hover:bg-brand-700 hover:text-white transition-all duration-200 border border-brand-100/50"
                  >
                    <span className="text-xs font-bold truncate">{person.emailp}</span>
                  </a>
                )}
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
      </div>
    </div>
  );
}

export default function ContactUsPage() {
  const [coordinatorsOpen, setCoordinatorsOpen] = useState(true);
  const [webAdminOpen, setWebAdminOpen] = useState(true);
  const [teamOpen, setTeamOpen] = useState(true);
  const [mbaTeamOpen, setMbaTeamOpen] = useState(true);

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
            <h2 className="text-xl font-bold text-brand-800 mb-10 flex justify-center items-center gap-3 text-center">
              <span className="w-10 h-1 bg-brand-accent rounded-full"></span>
              <span>
                PLACEMENT <br className="sm:hidden" />
                IN-CHARGE
              </span>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
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

            <div className="border border-gray-100 bg-white/50 rounded-3xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => setMbaTeamOpen((prev) => !prev)}
                className="w-full flex items-center justify-between p-6 md:p-8 hover:bg-white transition-colors group"
              >
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-brand-800 flex items-center gap-2 sm:gap-3">
                  <span className="w-8 h-1 bg-brand-accent rounded-full"></span>
                  MBA PLACEMENT TEAM
                </h2>
                <svg
                  className={`w-6 h-6 text-brand-400 transform transition-transform duration-300 ${
                    mbaTeamOpen ? "rotate-0" : "-rotate-90"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`px-6 pb-8 md:px-8 md:pb-10 transition-all duration-300 ease-in-out ${
                mbaTeamOpen ? "block" : "hidden"
              }`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mbaTeam.map((person) => (
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
