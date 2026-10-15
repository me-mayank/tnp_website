import type { Metadata } from "next";
import { ReactNode } from "react";

/**
 * Metadata configuration for Branch-wise Placement Statistics & Demographics.
 * 
 * Provides comprehensive OpenGraph, Twitter card, search engine indexing directives,
 * and canonical keywords for Institute of Engineering & Technology (IET) Lucknow's
 * engineering branch demographics, recruitment figures, and compensation trends.
 */
export const metadata: Metadata = {
  title: "Branch-wise Placement Statistics & Demographics | IET Lucknow",
  description:
    "Explore discipline-specific placement statistics, salary packages (highest, median, average CTC), total job offers, academic calendars, and course syllabi across engineering branches at IET Lucknow.",
  keywords: [
    "IET Lucknow Branch-wise Placements",
    "IET Lucknow CSE Placements",
    "IET Lucknow ECE Placements",
    "IET Lucknow Electrical Engineering Placements",
    "IET Lucknow Mechanical Engineering Placements",
    "IET Lucknow Civil Engineering Placements",
    "IET Lucknow Chemical Engineering Placements",
    "IET Lucknow MCA MBA Placements",
    "Engineering Demographics",
    "Placement Statistics",
    "Recruitment Trends",
    "Training and Placement Cell",
    "IET Lucknow",
  ],
  alternates: {
    canonical: "/recruiters/demographic/branchwise",
  },
  openGraph: {
    title: "Branch-wise Placement Statistics & Demographics | IET Lucknow",
    description:
      "Explore discipline-specific placement statistics, salary packages (highest, median, average CTC), total job offers, academic calendars, and course syllabi across engineering branches at IET Lucknow.",
    url: "https://ietlucknow.ac.in/recruiters/demographic/branchwise",
    siteName: "Training and Placement Cell, IET Lucknow",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Branch-wise Placement Statistics & Demographics | IET Lucknow",
    description:
      "Discipline-specific placement statistics, compensation trends, academic calendars, and syllabus documents at IET Lucknow.",
  },
};

/**
 * BranchwiseLayout acts as a lightweight server-component wrapper for the
 * branch-wise demographic sub-route, hosting server-side SEO metadata while
 * seamlessly passing children down to the client component.
 */
export default function BranchwiseLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
