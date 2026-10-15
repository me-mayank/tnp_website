/**
 * ============================================================================
 * Training & Placement Cell (TPC) - IET Lucknow
 * SEO Layout & Metadata Configuration
 * 
 * @file app/tpc/contactus/layout.tsx
 * @description Provides canonical metadata, OpenGraph tags, and crawler directives
 *              for the Contact Us directory page in Next.js App Router.
 * ============================================================================
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Training & Placement Cell - IET Lucknow",
  description:
    "Official contact directory for the Training & Placement Cell at Institute of Engineering and Technology (IET), Lucknow. Contact details of Officer Incharge, Deputy Incharges, Student Coordinators, and departmental teams.",
  keywords: [
    "IET Lucknow Placement Contact",
    "Training and Placement Cell IET Lucknow",
    "T&P Officer IET Lucknow",
    "Placement Incharge IET Lucknow",
    "IET Lucknow Placement Coordinators",
    "Dr. Arun Kumar Tiwari",
    "Dr. Naveen Kumar",
    "Dr. Ajay Kumar Sharma",
    "Vibhanshu Upadhyay",
    "Engineering Placements Lucknow",
  ],
  openGraph: {
    title: "Contact Us | Training & Placement Cell - IET Lucknow",
    description:
      "Get in touch with the Training and Placement Cell leadership, faculty in-charges, and student coordinators at IET Lucknow.",
    url: "/tpc/contactus",
    siteName: "TPC IET Lucknow",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Training & Placement Cell - IET Lucknow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Training & Placement Cell - IET Lucknow",
    description:
      "Official directory of Training and Placement Cell at Institute of Engineering & Technology, Lucknow.",
    images: ["/images/logo.png"],
  },
  alternates: {
    canonical: "/tpc/contactus",
  },
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
