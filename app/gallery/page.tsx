/**
 * @fileoverview Official Campus Media Gallery & Infrastructure Visual Archive.
 * 
 * Provides an enterprise-grade visual repository documenting campus recruitment
 * drives, student career development workshops, academic infrastructure, central
 * computing facilities, and campus architecture at the Institute of Engineering
 * and Technology (IET), Lucknow.
 * 
 * Architectural & Performance Highlights:
 * - Next.js 14 App Router statically rendered page (`force-static`) cached on Edge CDN
 * - High-performance Cloudinary dynamic image delivery pipeline with automatic format (WebP/AVIF) and quality optimization
 * - Adaptive multi-variant showcase architecture:
 *   - Variant 1 (Accordion): Interactive expanding horizontal strips for corporate recruitment drives
 *   - Variant 2 (Bento Grid): Asymmetric masonry showcase for campus architectural landmarks
 *   - Variant 3 (Elastic): Responsive carousel grid for departmental research and computing laboratories
 * - Schema.org ImageGallery & CollectionPage JSON-LD structured data for rich search engine indexing
 * - WCAG 2.1 AA compliant accessibility landmarks and descriptive contextual alternative text
 * 
 * @module CampusGalleryPage
 * @version 2.4.0
 * @author Training & Placement Cell, Institute of Engineering and Technology, Lucknow
 * @license Proprietary - Academic Institution Recruitment Portal
 */

import type { Metadata } from "next";
import GallerySection from "./GallerySection";
import { getOptimizedImageUrl } from "@/lib/cloudinary-gallery";

/**
 * Cache policy configuration: Statically compile and cache this page indefinitely
 * on Vercel's Global Edge Network for sub-100ms global delivery latency.
 */
export const dynamic = "force-static";
export const revalidate = false;

/**
 * Enterprise SEO & OpenGraph Metadata Configuration.
 * Optimized for institutional visibility, technical recruiter engagement,
 * and high-ranking search engine snippets across Google, Bing, LinkedIn, and Twitter.
 */
export const metadata: Metadata = {
  title: "Campus Gallery, Recruitment Drives & Facilities | IET Lucknow",
  description:
    "Explore official photo archives of campus placement drives (TCS, DLF, InMobi, Zeta), corporate technical sessions, computing labs, academic architecture, and student facilities at the Institute of Engineering and Technology (IET), Lucknow.",
  keywords: [
    "IET Lucknow Gallery",
    "IET Lucknow Campus Photos",
    "Training and Placement Cell Gallery",
    "IET Lucknow Placement Drives",
    "TCS Campus Recruitment Drive IET Lucknow",
    "DLF Placement Session",
    "InMobi Technical Drive IET",
    "Zeta Campus Interviews",
    "IET Lucknow Computing Lab",
    "IET Lucknow Campus Architecture",
    "IET Lucknow Central Library",
    "IET Lucknow Auditorium",
    "AKTU Top Engineering College Campus",
    "Campus Life IET Lucknow",
  ],
  alternates: {
    canonical: "https://placement.ietlucknow.ac.in/gallery",
  },
  openGraph: {
    title: "Campus Gallery, Placement Drives & Facilities | IET Lucknow",
    description:
      "Official visual repository of recruitment activities, academic landmarks, and advanced laboratory infrastructure at Institute of Engineering and Technology, Lucknow.",
    url: "https://placement.ietlucknow.ac.in/gallery",
    siteName: "Training & Placement Cell - IET Lucknow",
    images: [
      {
        url: "/images/campus.jpg",
        width: 1200,
        height: 630,
        alt: "IET Lucknow Main Campus Quadrangle and Lawns",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Campus Gallery & Recruitment Drives | IET Lucknow",
    description:
      "Visual archives of campus placement sessions, corporate recruiters, and learning infrastructure at IET Lucknow.",
    images: ["/images/campus.jpg"],
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
 * Individual gallery image record with optimized CDN delivery parameters
 * and accessible assistive alternative descriptions.
 */
export interface GalleryImageItem {
  src: string;
  title: string;
  alt: string;
}

/**
 * Curated thematic photo collection definition for departmental and campus domains.
 */
export interface GalleryCollectionSection {
  tag: string;
  title: string;
  description: string;
  image: GalleryImageItem[];
}

/**
 * Schema.org JSON-LD Structured Data definition for rich media indexing.
 * Enables Google Image search features, CollectionPage carousels, and verified institutional knowledge graphs.
 */
const galleryStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ImageGallery",
      "@id": "https://placement.ietlucknow.ac.in/gallery#imagegallery",
      "name": "IET Lucknow Training & Placement Cell Media Archives",
      "description":
        "Comprehensive photo gallery documenting corporate placement drives, career readiness workshops, campus facilities, and university infrastructure at IET Lucknow.",
      "url": "https://placement.ietlucknow.ac.in/gallery",
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
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://placement.ietlucknow.ac.in/gallery#breadcrumb",
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
          "name": "Campus Gallery",
          "item": "https://placement.ietlucknow.ac.in/gallery",
        },
      ],
    },
  ],
};

/**
 * Primary Campus Media Gallery Page Component.
 * 
 * Serves static HTML augmented with Schema.org linked data, orchestrating
 * three curated visual collections:
 * 1. T&P Activities - On-campus recruitment sessions and technical assessments
 * 2. Campus & Architecture - Iconic institutional landmarks and grounds
 * 3. Labs & Facilities - State-of-the-art computational centers and interview suites
 * 
 * @returns {JSX.Element} Responsive, SEO-optimized campus visual archive.
 */
export default function GalleryPage() {
  /**
   * Collection 1: Training & Placement Corporate Activities & Placement Drives.
   * Highlighted companies include DLF, TCS, InMobi, Zeta, and VECV.
   */
  const tnpact: GalleryCollectionSection = {
    tag: "Training & Placement",
    title: "T&P Activities",
    description:
      "Workshops, Mock Drives, and Engagement Sessions Hosted by the T&P Cell.",
    image: [
      {
        src: getOptimizedImageUrl("/DLF/IMG-20260117-WA0023.jpg"),
        title: "DLF Drive",
        alt: "DLF Placement Session and Technical Interview",
      },
      {
        src: getOptimizedImageUrl("/TCS/IMG-20260119-WA0056.jpg"),
        title: "TCS Drive",
        alt: "TCS Campus Recruitment Drive at IET",
      },
      {
        src: getOptimizedImageUrl("/Inmobi/IMG-20250909-WA0011.jpg"),
        title: "InMobi Session",
        alt: "InMobi technical session with engineering students",
      },
      {
        src: getOptimizedImageUrl("/TCS/IMG_20260119_092455290_HDR.jpg"),
        title: "Mock Drive",
        alt: "Placement assessment and student coding test",
      },
      {
        src: getOptimizedImageUrl("/Zeta/IMG-20250828-WA0079.jpg"),
        title: "Zeta Drive",
        alt: "Zeta student placement orientation and interviews",
      },
      {
        src: getOptimizedImageUrl("/VECV/IMG-20260109-WA0026.jpg"),
        title: "VECV Drive",
        alt: "VECV campus placement process",
      },
    ],
  };

  /**
   * Collection 2: Campus Architecture, Academic Blocks & Recreational Zones.
   * Highlights the main campus quadrangle, central library, sports ground, and auditoriums.
   */
  const campusarch: GalleryCollectionSection = {
    tag: "Campus",
    title: "Campus & Architecture",
    description:
      "A Glimpse of the IET Campus, Iconic Spaces, and Student-Friendly Environments.",
    image: [
      {
        src: getOptimizedImageUrl("/images/campus.jpg"),
        title: "Campus Quad",
        alt: "IET Main Campus Quadrangle and Lawns",
      },
      {
        src: getOptimizedImageUrl("/images/sports.jpg"),
        title: "Sports Complex",
        alt: "Campus Sports Complex and Outdoor Playgrounds",
      },
      {
        src: getOptimizedImageUrl("/images/college_image.svg"),
        title: "Central Plaza",
        alt: "Institute Central Plaza and Landmark",
      },
      {
        src: getOptimizedImageUrl("/images/Campus copy.jpg", { angle: 270 }),
        title: "Campus Lawns",
        alt: "Campus Architecture and Departmental Wings",
      },
      {
        src: getOptimizedImageUrl("/images/Library.jpg"),
        title: "Central Library",
        alt: "Central Academic Library and Study Halls",
      },
      {
        src: getOptimizedImageUrl("/images/academicblock.webp"),
        title: "Academic Block",
        alt: "Academic Block and Lecture Theatres",
      },
      {
        src: getOptimizedImageUrl("/images/audi11.jpg"),
        title: "Auditorium",
        alt: "University Auditorium exterior and entrance",
      },
    ],
  };

  /**
   * Collection 3: Cutting-Edge Laboratories, Presentation Halls & Recruitment Facilities.
   * Features high-performance computing centers, executive interview suites, and corporate presentation rooms.
   */
  const facilities: GalleryCollectionSection = {
    tag: "Facilities",
    title: "Labs & Facilities",
    description:
      "Modern Labs and Learning Spaces Designed for Hands-On Experience and Research.",
    image: [
      {
        src: getOptimizedImageUrl("/images/facilities/computer.png"),
        title: "Computing Lab",
        alt: "Computing Center Lab with high-end workstations",
      },
      {
        src: getOptimizedImageUrl("/images/TNP.jpg"),
        title: "Placement Cell",
        alt: "Training & Placement Cell Office and Entrance",
      },
      {
        src: getOptimizedImageUrl("/images/facilities/training.jpg"),
        title: "Training Center",
        alt: "Dedicated student training and development center",
      },
      {
        src: getOptimizedImageUrl("/images/facilities/interview.jpg"),
        title: "Interview Suites",
        alt: "Executive interview suites for corporate recruiters",
      },
      {
        src: getOptimizedImageUrl("/images/facilities/presentation.jpg"),
        title: "Presentation Hall",
        alt: "Multimedia seminar and presentation hall",
      },
      {
        src: getOptimizedImageUrl("/images/newaudi.jpg"),
        title: "Auditorium",
        alt: "Modern campus auditorium with tiered seating",
      },
    ],
  };

  return (
    <main
      id="gallery-main-content"
      role="main"
      aria-label="Institute Visual Archives and Campus Infrastructure Gallery"
      className="mt-0 bg-white pt-6 sm:pt-8 text-brand-800"
    >
      {/* Schema.org Linked Data for Search Engine Optimization (SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryStructuredData) }}
      />

      {/* Collection Section 1: Placement Drives & Industry Engagements (Accordion Layout) */}
      <GallerySection
        title={tnpact.title}
        tag={tnpact.tag}
        description={tnpact.description}
        images={tnpact.image}
        variant="accordion"
      />

      {/* Collection Section 2: Campus Architecture & Campus Landmarks (Bento Grid Layout) */}
      <GallerySection 
        title={campusarch.title} 
        tag={campusarch.tag}
        description={campusarch.description} 
        images={campusarch.image} 
        variant="bento"
      />

      {/* Collection Section 3: Computing Laboratories & Recruitment Suites (Elastic Carousel Layout) */}
      <GallerySection 
        title={facilities.title} 
        tag={facilities.tag}
        description={facilities.description} 
        images={facilities.image} 
        variant="elastic"
      />
    </main>
  );
}
