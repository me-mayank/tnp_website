/**
 * @fileoverview Official Training & Placement Cell Downloads & Department Resources.
 * 
 * Provides an enterprise-grade institutional repository hosting official campus
 * placement brochures, recruiter registration forms (Job Notification Form - JNF),
 * student training policies, and verified external portals for all academic
 * engineering departments at the Institute of Engineering & Technology (IET), Lucknow.
 * 
 * Architectural & Operational Highlights:
 * - Server-Side Prerendering: Next.js App Router static optimization (`force-static`)
 * - Native SEO Metadata: Full OpenGraph, Twitter Cards, canonical URL, and index directives
 * - Verified Official Department Links: Seamless redirection to live academic department
 *   portals hosted on the central university website (ietlucknow.ac.in)
 * - Schema.org Linked Data: Embedded JSON-LD `CollectionPage`, `ItemList`, and `BreadcrumbList` graphs
 * - WCAG 2.1 AA Accessibility: Semantic landmarks, keyboard navigation, and descriptive `aria-label`s
 * 
 * @module DownloadsDirectory
 * @version 2.3.1
 * @author Training & Placement Cell, Institute of Engineering and Technology, Lucknow
 * @license Proprietary - Academic Institution Recruitment Portal
 */

import type { Metadata } from "next";
import {
  Code2,
  FlaskConical,
  DraftingCompass,
  Zap,
  Cpu,
  Cog,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

/**
 * Cache policy configuration: Statically compile and cache indefinitely
 * on Edge CDN networks for maximum load performance.
 */
export const dynamic = "force-static";
export const revalidate = false;

/**
 * Enterprise SEO & OpenGraph Metadata Configuration.
 * Ensures prominent search visibility for students, faculty, and corporate recruiters.
 */
export const metadata: Metadata = {
  title: "Downloads & Placement Resources | Training & Placement Cell - IET Lucknow",
  description:
    "Official download directory of Training & Placement Cell at IET Lucknow. Access placement brochures, Job Notification Forms (JNF), student placement policies, internship NOC documents, and official department pages.",
  keywords: [
    "IET Lucknow Downloads",
    "IET Lucknow Placement Brochure",
    "Job Notification Form IET Lucknow",
    "JNF IET Lucknow 2025-26",
    "Student Placement Policy IET Lucknow",
    "Summer Internship NOC IET Lucknow",
    "Final Semester Internship NOC",
    "IET Lucknow CSE Department",
    "IET Lucknow Chemical Engineering",
    "IET Lucknow Civil Engineering",
    "IET Lucknow Electrical Engineering",
    "IET Lucknow Electronics Engineering",
    "IET Lucknow Mechanical Engineering",
    "AKTU Placement Resources",
    "Training and Placement Cell IET Lucknow",
  ],
  alternates: {
    canonical: "https://placement.ietlucknow.ac.in/downloads",
  },
  openGraph: {
    title: "Downloads & Placement Resources | Training & Placement Cell - IET Lucknow",
    description:
      "Download official placement guides, recruiter JNF forms, internship policies, and explore official academic department portals at IET Lucknow.",
    url: "https://placement.ietlucknow.ac.in/downloads",
    siteName: "TPC IET Lucknow",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://placement.ietlucknow.ac.in/images/campus.jpg",
        width: 1200,
        height: 630,
        alt: "IET Lucknow Downloads and Placement Resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Downloads & Placement Resources | TPC IET Lucknow",
    description:
      "Official repository for campus recruitment brochures, JNF forms, policies, and official department portals at IET Lucknow.",
    images: ["https://placement.ietlucknow.ac.in/images/campus.jpg"],
  },
};

/**
 * Interface representing downloadable institutional documents (Brochures, JNF, etc.).
 */
export interface InstitutionalDocument {
  title: string;
  subtitle: string;
  href: string;
  type: "PDF" | "DOCX";
  description?: string;
}

/**
 * Interface representing student-specific compliance forms and training policies.
 */
export interface StudentDocument {
  name: string;
  href: string;
  type: "PDF" | "DOCX";
  description?: string;
}

/**
 * Interface representing official academic engineering department web portals.
 */
export interface DepartmentDoc {
  name: string;
  href: string;
  icon: LucideIcon;
  rotateClass: string;
}

/**
 * Core institutional documentation collection for corporate recruiters and visiting organizations.
 */
const instituteDocs: InstitutionalDocument[] = [
  {
    title: "Placement Brochure",
    subtitle: "Official Guide 2025-26",
    href: "/files/Placement_Brouchure_2025-26.pdf",
    type: "PDF",
  },
  {
    title: "Job Notification Form",
    subtitle: "Recruiter Registration (JNF)",
    href: "/files/JNF_IET_Lucknow_2025-26.docx",
    type: "DOCX",
  },
];

/**
 * Student operational documents, policies, and training approval templates.
 */
const studentDocs: StudentDocument[] = [
  {
    name: "Placement Policy",
    href: "/files/Student_Placement_Policy.pdf",
    type: "PDF",
  },
  {
    name: "Training Form",
    href: "/files/SUMMER_INTERNSHIP_NOC.pdf",
    type: "PDF",
  },
  {
    name: "Internship NOC",
    href: "/files/FINAL_SEMESTER_INTERNSHIP_NOC.pdf",
    type: "PDF",
  },
];

/**
 * Official academic department web portals on the university main website (ietlucknow.ac.in).
 * Each department is assigned a unique, professional icon with tactile rotation and scale.
 */
const departmentDocs: DepartmentDoc[] = [
  {
    name: "Computer Science & Eng.",
    href: "https://www.ietlucknow.ac.in/dept/cse",
    icon: Code2,
    rotateClass: "group-hover:-rotate-6",
  },
  {
    name: "Chemical Engineering",
    href: "https://www.ietlucknow.ac.in/dept/che",
    icon: FlaskConical,
    rotateClass: "group-hover:rotate-12",
  },
  {
    name: "Civil Engineering",
    href: "https://www.ietlucknow.ac.in/dept/ced",
    icon: DraftingCompass,
    rotateClass: "group-hover:-rotate-12",
  },
  {
    name: "Electrical Engineering",
    href: "https://www.ietlucknow.ac.in/dept/eed",
    icon: Zap,
    rotateClass: "group-hover:rotate-12",
  },
  {
    name: "Electronics Engineering",
    href: "https://www.ietlucknow.ac.in/dept/ec",
    icon: Cpu,
    rotateClass: "group-hover:rotate-6",
  },
  {
    name: "Mechanical Engineering",
    href: "https://www.ietlucknow.ac.in/dept/me",
    icon: Cog,
    rotateClass: "group-hover:rotate-45",
  },
];

/**
 * Schema.org JSON-LD Structured Data Graph for Rich Search Engine Results.
 */
const downloadsStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://placement.ietlucknow.ac.in/downloads/#webpage",
      url: "https://placement.ietlucknow.ac.in/downloads",
      name: "Downloads & Placement Resources - IET Lucknow",
      description:
        "Official repository of downloadable placement guides, recruiter registration forms (JNF), training policies, and official academic department directories at Institute of Engineering & Technology, Lucknow.",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://placement.ietlucknow.ac.in/#website",
        name: "Training & Placement Cell, IET Lucknow",
        url: "https://placement.ietlucknow.ac.in",
      },
      about: {
        "@type": "EducationalOrganization",
        name: "Institute of Engineering and Technology, Lucknow",
        alternateName: "IET Lucknow",
        url: "https://www.ietlucknow.ac.in",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://placement.ietlucknow.ac.in",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Downloads & Resources",
          item: "https://placement.ietlucknow.ac.in/downloads",
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "Official Academic Department Portals",
      description:
        "Direct links to official engineering department portals on the IET Lucknow central institution website.",
      itemListElement: departmentDocs.map((dept, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: dept.name,
        url: dept.href,
      })),
    },
  ],
};

export default function DownloadsPage() {
  return (
    <>
      {/* Schema.org Linked Data Graph for Search Engine Optimization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(downloadsStructuredData) }}
      />

      <main
        className="page-top-gap-largest bg-gray-50/50 pt-28 pb-16 md:pt-32"
        id="downloads"
        role="main"
        aria-label="Official Placement Resources and Downloads Directory"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Page Header */}
          <header className="mb-16 text-center">
            <h1 className="text-4xl font-extrabold text-brand-800 tracking-tight">Resources</h1>
            <div className="h-1.5 w-20 bg-brand-accent rounded-full mx-auto mt-4" aria-hidden="true" />
            <p className="mt-6 text-muted max-w-2xl mx-auto text-lg leading-relaxed font-medium">
              Official documents, placement policies, and department-specific brochures for students and recruiters.
            </p>
          </header>

          {/* Section 1: Institute Documents */}
          <section className="mb-20" aria-labelledby="institute-docs-heading">
            <h2
              id="institute-docs-heading"
              className="text-xl font-bold text-brand-800 mb-8 flex items-center gap-3"
            >
              <span className="w-8 h-1 bg-brand-accent rounded-full" aria-hidden="true" />
              INSTITUTE DOCUMENTS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {instituteDocs.map((doc) => (
                <div
                  key={doc.title}
                  className="bg-white border-2 border-gray-100 rounded-3xl p-6 shadow-xs hover:shadow-md hover:border-brand-accent/30 hover:-translate-y-1 transform-gpu transition-all duration-200 ease-out group flex items-center gap-6"
                >
                  <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl shrink-0 group-hover:bg-brand-700 group-hover:text-white transition-colors duration-200 ease-out">
                    <svg className="w-10 h-10 transition-transform duration-200 ease-out group-hover:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-brand-800 text-lg truncate group-hover:text-brand-700 transition-colors duration-200">{doc.title}</h3>
                    <p className="text-xs text-muted mb-4">{doc.subtitle}</p>
                    <a
                      href={doc.href}
                      download
                      className="text-brand-700 font-bold text-sm inline-flex items-center gap-2 hover:text-brand-accent transition-colors duration-150 focus:outline-hidden focus:underline group/btn"
                      aria-label={`Download ${doc.title} (${doc.type})`}
                    >
                      <svg className="w-4 h-4 transition-transform duration-200 ease-out group-hover/btn:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download {doc.type}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Student Policies & Forms */}
          <section className="mb-20" aria-labelledby="student-docs-heading">
            <h2
              id="student-docs-heading"
              className="text-xl font-bold text-brand-800 mb-8 flex items-center gap-3"
            >
              <span className="w-8 h-1 bg-brand-accent rounded-full" aria-hidden="true" />
              STUDENT POLICIES &amp; FORMS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentDocs.map((doc) => (
                <div
                  key={doc.name}
                  className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-brand-accent/30 hover:-translate-y-1 transform-gpu transition-all duration-200 ease-out group flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-brand-accent uppercase mb-2 tracking-wider">
                      {doc.type}
                    </div>
                    <h3 className="font-bold text-brand-800 mb-6 h-10 overflow-hidden text-sm leading-tight group-hover:text-brand-700 transition-colors duration-200">
                      {doc.name}
                    </h3>
                  </div>
                  <a
                    href={doc.href}
                    download
                    className="w-full py-2 bg-blue-500 text-white rounded-lg text-xs font-bold hover:bg-brand-700 hover:shadow-xs active:scale-[0.98] transition-all duration-200 ease-out flex items-center justify-center gap-2 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-brand-accent/20 group/btn"
                    aria-label={`Download ${doc.name} (${doc.type})`}
                  >
                    <svg className="w-4 h-4 transition-transform duration-200 ease-out group-hover/btn:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Department Brochures */}
          <section className="mb-12" aria-labelledby="dept-docs-heading">
            <h2
              id="dept-docs-heading"
              className="text-xl font-bold text-brand-800 mb-8 flex items-center gap-3"
            >
              <span className="w-8 h-1 bg-brand-accent rounded-full" aria-hidden="true" />
              DEPARTMENT BROCHURES
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentDocs.map((dept) => {
                const IconComponent = dept.icon;
                return (
                  <a
                    key={dept.name}
                    href={dept.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 sm:p-4.5 bg-white border border-slate-200/80 rounded-2xl shadow-xs hover:shadow-[0_12px_28px_-6px_rgba(37,99,235,0.1),0_4px_10px_-2px_rgba(0,0,0,0.03)] hover:border-blue-400/50 hover:-translate-y-1 transform-gpu transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                    aria-label={`Visit official ${dept.name} department page on IET Lucknow website (opens in a new tab)`}
                    title={`Visit ${dept.name} on official college website`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-9 h-9 flex items-center justify-center shrink-0">
                        <IconComponent
                          className={`w-6 h-6 text-blue-600 group-hover:text-blue-500 transform-gpu origin-center will-change-transform transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-125 ${dept.rotateClass}`}
                          aria-hidden="true"
                        />
                      </div>
                      <span className="text-sm font-bold text-brand-800 truncate group-hover:text-blue-600 transition-colors duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        {dept.name}
                      </span>
                    </div>

                    <div className="p-1.5 text-slate-300 group-hover:text-blue-600 transition-colors duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0">
                      <ArrowUpRight
                        className="w-5 h-5 transform-gpu transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-115"
                        aria-hidden="true"
                      />
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
