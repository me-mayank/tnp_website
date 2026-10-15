/**
 * @fileoverview Official Campus Recruitment Invitation to Industry Partners.
 * 
 * Formal invitation letter issued by the Officer in Charge, Training and Placement
 * Cell at the Institute of Engineering & Technology (IET), Lucknow. Extends an official
 * invitation to corporate talent acquisition leaders, HR directors, and corporate
 * organizations for on-campus hiring drives (graduating batch of 2026) and summer
 * internship programs (batch of 2027).
 * 
 * Architectural & Institutional Specifications:
 * - Next.js 14 App Router statically rendered page (`force-static`) cached on Edge CDN
 * - Academic curriculum scope: 8 B.Tech engineering disciplines, 6 postgraduate M.Tech programs, MBA, and MCA
 * - Native SEO metadata configuration with canonical links, OpenGraph, and Twitter Card social graphs
 * - Schema.org JSON-LD structured data linking EducationalOrganization, Person (Officer in Charge), and BreadcrumbList
 * - Fully accessible WCAG 2.1 AA document hierarchy with semantic landmarks and responsive multi-device typography
 * 
 * @module RecruiterInvitationLetter
 * @version 2.3.0
 * @author Training & Placement Cell, Institute of Engineering and Technology, Lucknow
 * @license Proprietary - Academic Institution Recruitment Portal
 */

import type { Metadata } from "next";
import Image from "next/image";

/**
 * Cache policy configuration: Statically compile and cache this page indefinitely
 * on Vercel's Global Edge Network for optimal global delivery speed.
 */
export const dynamic = "force-static";
export const revalidate = false;

/**
 * Enterprise SEO & OpenGraph Metadata Configuration.
 * Ensures prominent search rankings when talent partners and recruiters search for
 * IET Lucknow campus placement drives, JNF/INF forms, and official invitations.
 */
export const metadata: Metadata = {
  title: "Official Invitation to Corporate Recruiters | IET Lucknow T&P Cell",
  description:
    "Official campus recruitment invitation from the Officer in Charge, Training & Placement Cell, IET Lucknow. Invite for Campus Recruitment Drive (Batch 2026) and Summer Internships (Batch 2027).",
  keywords: [
    "IET Lucknow Recruiter Invitation",
    "Campus Recruitment Drive 2026 IET Lucknow",
    "Training and Placement Cell Invitation Letter",
    "Officer in Charge T&P IET Lucknow",
    "Dr Arun Kumar Tiwari IET",
    "Summer Internship Drive 2027 IET Lucknow",
    "B.Tech Placements Lucknow",
    "Engineering Campus Hiring Uttar Pradesh",
    "Job Notification Form JNF IET Lucknow",
    "Internship Notification Form INF",
    "AKTU Premier Engineering Campus Recruitment",
  ],
  alternates: {
    canonical: "https://placement.ietlucknow.ac.in/recruiters/invitation",
  },
  openGraph: {
    title: "Official Invitation to Corporate Recruiters | IET Lucknow",
    description:
      "Formal invitation letter from Officer in Charge, Training & Placement Cell, IET Lucknow for on-campus placements (Batch 2026) and summer internships (Batch 2027).",
    url: "https://placement.ietlucknow.ac.in/recruiters/invitation",
    siteName: "Training & Placement Cell - IET Lucknow",
    images: [
      {
        url: "/images/college.png",
        width: 1200,
        height: 630,
        alt: "IET Lucknow Main Institutional Campus and Academic Complex",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Official Recruiter Invitation Letter | IET Lucknow T&P Cell",
    description:
      "Official invitation letter for campus placements and internship hiring at Institute of Engineering & Technology, Lucknow.",
    images: ["/images/college.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/**
 * Academic degree program offering breakdown featured in the official invitation.
 */
export interface AcademicProgramOffering {
  title: string;
  count?: number;
  level: "Undergraduate" | "Postgraduate";
}

/**
 * Institutional administrative officer metadata.
 */
export interface InstitutionalOfficer {
  name: string;
  designation: string;
  department: string;
  email: string;
}

/**
 * Verified academic programs offered at the Institute of Engineering & Technology, Lucknow.
 */
const ACADEMIC_PROGRAMS: AcademicProgramOffering[] = [
  { title: "Bachelor of Technology (B.Tech)", count: 8, level: "Undergraduate" },
  { title: "Master of Technology (M.Tech)", count: 6, level: "Postgraduate" },
  { title: "Master of Business Administration (MBA)", level: "Postgraduate" },
  { title: "Master of Computer Application (MCA)", level: "Postgraduate" },
];

/**
 * Official administrative signatory details.
 */
const OFFICER_IN_CHARGE: InstitutionalOfficer = {
  name: "Dr. Arun Kumar Tiwari",
  designation: "Officer in Charge",
  department: "Training and Placement Cell",
  email: "placement@ietlucknow.ac.in",
};

/**
 * Schema.org JSON-LD Structured Data definition for Recruiter Invitation Letter.
 * Informs Google, Bing, and academic search indexes of official institutional authority.
 */
const invitationStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebPage", "AboutPage"],
      "@id": "https://placement.ietlucknow.ac.in/recruiters/invitation#webpage",
      "name": "Official Recruiter Invitation Letter - IET Lucknow",
      "description":
        "Formal invitation extended to corporate talent acquisition leadership for campus recruitment drives and summer internships at Institute of Engineering & Technology, Lucknow.",
      "url": "https://placement.ietlucknow.ac.in/recruiters/invitation",
      "inLanguage": "en-IN",
      "publisher": {
        "@type": "EducationalOrganization",
        "name": "Training & Placement Cell, Institute of Engineering and Technology, Lucknow",
        "url": "https://placement.ietlucknow.ac.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://placement.ietlucknow.ac.in/images/logo.png",
        },
        "parentOrganization": {
          "@type": "CollegeOrUniversity",
          "name": "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
          "url": "https://aktu.ac.in",
        },
      },
      "author": {
        "@type": "Person",
        "name": OFFICER_IN_CHARGE.name,
        "jobTitle": OFFICER_IN_CHARGE.designation,
        "worksFor": {
          "@type": "EducationalOrganization",
          "name": "Institute of Engineering and Technology, Lucknow",
        },
        "email": OFFICER_IN_CHARGE.email,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://placement.ietlucknow.ac.in/recruiters/invitation#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://placement.ietlucknow.ac.in",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Recruiters",
          "item": "https://placement.ietlucknow.ac.in/recruiters/invitation",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Invitation Letter",
          "item": "https://placement.ietlucknow.ac.in/recruiters/invitation",
        },
      ],
    },
  ],
};

// =============================================================================
// HERO SECTION COMPONENT
// =============================================================================

/**
 * Visual Campus Backdrop Hero Component.
 * Employs responsive image switches for optimal aspect ratio retention across viewports.
 * 
 * @returns {JSX.Element} Responsive hero header with college imagery.
 */
function HeroSection(): JSX.Element {
  return (
    <section className="pt-28 sm:pt-32 relative w-full" aria-label="Campus Visual Banner">
      {/* Mobile-only background image (optimized aspect ratio) */}
      <div className="sm:hidden relative w-full aspect-[1024/572]">
        <Image
          src="/images/college_mobile.jpg"
          alt="Institute of Engineering and Technology Lucknow Campus Entrance"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      {/* Desktop-only background image with subtle ambient overlay */}
      <div className="hidden sm:block relative w-full h-[48vh] md:h-[60vh] bg-slate-900">
        <Image
          src="/images/college.png"
          alt="Institute of Engineering and Technology Lucknow Main Academic Building"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>
    </section>
  );
}

// =============================================================================
// INVITATION LETTER SECTION COMPONENT
// =============================================================================

/**
 * Official Formatted Invitation Letter Card Component.
 * Presents parchment-style institutional letterhead, official programs overview,
 * academic training protocols, and signatory credentials.
 * 
 * @returns {JSX.Element} Formatted corporate invitation letter card.
 */
function Letter(): JSX.Element {
  return (
    <section
      aria-label="Official Recruiter Invitation Letter Content"
      className="relative -mt-16 sm:-mt-[20vh] md:-mt-[28vh] z-10 px-3 sm:px-4 md:px-6 mb-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Exterior Matte Container */}
        <div className="bg-[#efeee9] border border-black/10 rounded-[26px] shadow-[0_24px_70px_rgba(0,0,0,0.14)] md:p-12 px-2">
          {/* Interior Document Canvas */}
          <div className="relative max-w-5xl mx-auto w-full bg-white border border-gray-300 rounded-[18px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] px-5 sm:px-7 md:px-10 py-7 md:py-8 overflow-hidden">
            {/* Top Accent Strip */}
            <div className="absolute top-0 inset-x-0 h-[5px] bg-slate-700" />

            {/* Letterhead Header */}
            <header className="pb-5 border-b border-gray-300">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                <div>
                  <h1 className="text-[2rem] md:text-[2.15rem] font-bold uppercase tracking-tight text-slate-800 leading-none">
                    Invitation
                  </h1>

                  <h2 className="mt-3 text-[11px] md:text-xs uppercase tracking-[0.24em] text-gray-500 font-semibold">
                    Institute of Engineering and Technology, Lucknow
                  </h2>

                  <p className="mt-2 text-sm font-medium text-gray-700">
                    Training and Placement Cell • Uttar Pradesh, India
                  </p>
                </div>

                <div className="md:text-right text-sm leading-6 text-gray-600 md:pt-1">
                  <p className="font-semibold text-slate-700">
                    Official Communication
                  </p>
                  <p>
                    E-Mail:{" "}
                    <a
                      href={`mailto:${OFFICER_IN_CHARGE.email}`}
                      className="text-slate-700 underline underline-offset-2 hover:text-slate-900 transition-colors"
                      aria-label={`Send official recruitment inquiry to ${OFFICER_IN_CHARGE.email}`}
                    >
                      {OFFICER_IN_CHARGE.email}
                    </a>
                  </p>
                </div>
              </div>
            </header>

            {/* Letter Content Body */}
            <article className="pt-8 space-y-5 text-[15px] md:text-[15.2px] leading-[1.82] text-gray-800 font-normal">
              <p className="font-semibold text-gray-900">Dear Sir / Madam,</p>

              <p>
                It gives me immense pleasure to extend to you the most cordial
                invitation to participate in the Campus Recruitment programme of
                our Institute. Now, more than ever, the emphasis is on
                Institute-Industry Interaction, and both the Institute and the
                participating Industry are bound to find it mutually beneficial.
              </p>

              <p>
                IET Lucknow, a premier government autonomous institute established
                in the year 1984, is one of the oldest and finest engineering
                institutes in the state of Uttar Pradesh. Over the years, we have
                developed a strong foundation in academics, technology, innovation,
                and leadership in North India. We are among the elite technical
                institutions of the country and have consistently achieved
                excellence in academics and research.
              </p>

              {/* Programs Overview Callout */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4">
                <p className="font-semibold text-gray-900 mb-2">
                  The Institute offers the following programs:
                </p>

                <ul className="list-disc pl-6 space-y-1.5 text-gray-700 marker:text-slate-700">
                  {ACADEMIC_PROGRAMS.map((prog) => (
                    <li key={prog.title}>
                      {prog.count ? `${prog.count} programs for ` : ""}
                      {prog.title}
                    </li>
                  ))}
                </ul>
              </div>

              <p>
                We make continuous efforts to groom our students not only in
                their chosen disciplines but also to broaden their perspectives
                and develop a positive professional attitude. Undergraduate
                students undergo an eight-week industrial training, while MCA
                students complete a six-month training during their final
                semester.
              </p>

              <p>
                We are delighted to invite you to participate in the Campus
                Recruitment Drive for the graduating batch of 2026. It would be
                our privilege if you provide an opportunity to our students for
                campus placements. Additionally, we invite you to participate in
                our Summer Internship Drive for the 2027 batch, allowing you to
                evaluate potential future employees.
              </p>

              <p>
                Enclosed are the Placement Brochure and Department brochures,
                providing detailed insights into our academic programs. Also
                included are the Job Notification Form (JNF) and Internship
                Notification Form (INF). Kindly fill and share them with us so
                that we can schedule your visit at a mutually convenient time.
              </p>

              <p>
                Please feel free to contact us for any further information or
                clarification.
              </p>

              <p>
                We look forward to building a mutually beneficial relationship.
              </p>

              <p className="pt-2 font-medium text-gray-900">Thanks &amp; Regards,</p>
            </article>

            {/* Letter Signatory Block */}
            <footer className="mt-12 pt-8 border-t border-gray-300 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
              <div>
                <p className="font-semibold text-gray-900 text-[15.5px]">
                  {OFFICER_IN_CHARGE.name}
                </p>
                <p className="mt-1 text-sm text-gray-500 font-medium">{OFFICER_IN_CHARGE.designation}</p>
                <p className="text-sm text-gray-500 font-medium">
                  {OFFICER_IN_CHARGE.department}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Institute of Engineering and Technology, Lucknow
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Corporate Recruiter Invitation Page Component.
 * Statically compiled with Schema.org linked data and accessibility semantics.
 * 
 * @returns {JSX.Element} Complete recruiter invitation page.
 */
export default function PlacementPage(): JSX.Element {
  return (
    <main
      id="invitation-main-content"
      role="main"
      aria-label="Official Campus Recruitment Invitation Letter to Corporate Recruiters"
      className="min-h-screen bg-slate-50"
    >
      {/* Schema.org Linked Data Graph for Search Engine Indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(invitationStructuredData) }}
      />

      <HeroSection />
      <Letter />
    </main>
  );
}