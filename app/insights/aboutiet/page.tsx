import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

/**
 * @file app/insights/aboutiet/page.tsx
 * @description Institutional Profile Page for the Institute of Engineering & Technology (IET Lucknow).
 * @module Insights/AboutIET
 * @version 1.3.0
 *
 * Page Architecture:
 *  1. SEO & Structured Data (JSON-LD Schema for EducationalOrganization)
 *  2. Header / Hero Title with founding year subtitle
 *  3. Overview Narrative & Campus Media preview
 *  4. Vision & Mission Institutional Statements
 *  5. Key Accolades, Distinctions & Highlights Grid
 */

/**
 * SEO & OpenGraph Metadata configuration.
 * Generates search engine indexing tags and social media card previews.
 */
export const metadata: Metadata = {
  title: "About IET Lucknow | Institute of Engineering & Technology",
  description:
    "Discover the history, academic excellence, vision, mission, and key institutional milestones of the Institute of Engineering & Technology (IET Lucknow).",
  keywords: [
    "IET Lucknow",
    "About IET",
    "AKTU Top Engineering College",
    "Engineering Lucknow",
    "IET Vision and Mission",
    "IET Placement Excellence",
    "Top Ranked Institute Lucknow",
    "Nurturing Excellence Since 1984",
  ],
  openGraph: {
    title: "About IET Lucknow — Nurturing Excellence Since 1984",
    description:
      "Institute of Engineering & Technology, Lucknow — nurturing excellence, academic leadership, and industrial innovation since 1984.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "About IET Lucknow | Institute of Engineering & Technology",
    description:
      "Nurturing excellence since 1984. Discover IET Lucknow's vision, mission, and placement excellence.",
  },
};

/**
 * Schema.org JSON-LD Structured Data for Search Engines.
 * Enhances indexing, knowledge graph inclusion, and rich snippet generation.
 */
const JSON_LD_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Institute of Engineering and Technology, Lucknow",
  alternateName: ["IET Lucknow", "IET"],
  url: "https://www.ietlucknow.ac.in",
  logo: "https://www.ietlucknow.ac.in/images/college_image.svg",
  foundingDate: "1984",
  slogan:
    "Institute of Engineering & Technology, Lucknow — nurturing excellence since 1984.",
  description:
    "The Institute of Engineering & Technology (IET Lucknow) is a premier engineering college established in 1984 under Dr. APJ Abdul Kalam Technical University.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lucknow",
    addressRegion: "Uttar Pradesh",
    postalCode: "226021",
    addressCountry: "IN",
  },
} as const;

/**
 * Type contract for the Hero Header section.
 */
interface PageHeroConfig {
  readonly title: string;
  readonly institutionName: string;
  readonly city: string;
  readonly foundedYear: number;
  readonly subtitle: string;
}

/**
 * Configuration constants for the Hero Header banner.
 */
const PAGE_HERO_CONFIG: PageHeroConfig = {
  title: "About IET",
  institutionName: "Institute of Engineering & Technology",
  city: "Lucknow",
  foundedYear: 1984,
  subtitle:
    "Institute of Engineering & Technology, Lucknow — nurturing excellence since 1984.",
} as const;

/**
 * Narrative paragraph records detailing historical background and institutional achievements.
 */
const OVERVIEW_PARAGRAPHS: readonly string[] = [
  "The Institute of Engineering and Technology, since the commencement of its first batch in 1984, has been functioning to achieve excellence in every field of education. It has been an outstanding institute in developing and nourishing creativity and passion in the field of engineering.",
  "After its establishment in 1984, the Institute of Engineering and Technology has been a preceptor to young minds from all over the state of Uttar Pradesh. The Institute has proven its excellence in every sector, ranging from academic competitions to co-curricular activities and events, and its consistency in achieving success and results separates it from other institutes.",
  "Our students strive for excellence and have consistently maintained excellent results in academics and co-curricular activities. The College has the distinction of being ranked first among all the colleges of AKTU. Our students have been proving their excellence by securing top ranks in various competitive exams for years.",
  "It is a matter of pride for the College to maintain a superlative overall academic performance over the years. Our focus is to provide excellent academic growth to the genius minds of the state, to foster future leaders and achievers of the world, and to develop technical manpower to meet current and future industrial demands. The Institute emphasizes practical education and research aligned with industrial needs, alongside the development of interpersonal and intrapersonal qualities in young students.",
] as const;

/**
 * Type contract representing an institutional highlight record.
 */
interface HighlightItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly category: "ranking" | "placement" | "recognition";
}

/**
 * Type contract representing institutional Vision or Mission statements.
 */
interface StatementItem {
  readonly id: string;
  readonly type: "VISION" | "MISSION";
  readonly paragraphs: readonly string[];
}

/**
 * Static dataset containing the core institutional Vision & Mission declarations.
 */
const INSTITUTIONAL_STATEMENTS: readonly StatementItem[] = [
  {
    id: "statement-vision",
    type: "VISION",
    paragraphs: [
      "To effectively contribute towards the national endeavor of producing world class manpower and to usher in technology driven economic development of the country in order to enrich the quality of life of its citizens by promoting innovative technologies and optimal utilization of resources for sustainable development.",
    ],
  },
  {
    id: "statement-mission",
    type: "MISSION",
    paragraphs: [
      "To establish global state-of-the-art facilities and resources that will prepare and enrich the human resource by promoting all-inclusive research and developments.",
      "To inculcate entrepreneurship skills in the students in order to optimize resources to achieve the economic growth by improving the quality of life of the citizens.",
      "To instill problem-solving skills for overcoming real life challenges by imparting values-based professional education.",
    ],
  },
] as const;

/**
 * Static dataset containing milestone highlights, university standing, and national honors.
 */
const HIGHLIGHTS_DATA: readonly HighlightItem[] = [
  {
    id: "top-ranked-institute",
    title: "Top Ranked Institute",
    description:
      "IET is among the top-ranked engineering colleges under Dr. APJ Abdul Kalam Technical University, with a network of 700+ colleges.",
    category: "ranking",
  },
  {
    id: "placement-excellence",
    title: "Placement Excellence",
    description:
      "Has an excellent record of placement with a 21% increase in placement offers this year.",
    category: "placement",
  },
  {
    id: "national-recognition",
    title: "National Recognition",
    description:
      "Hon'ble Education Minister Shri Prakash Javadekar presented IET with the 'India Excellence Award 2017' as the best government engineering college in North India.",
    category: "recognition",
  },
] as const;

/**
 * Props definition for the PageHeader subcomponent.
 */
interface PageHeaderProps {
  readonly title: string;
  readonly subtitle: string;
}

/**
 * PageHeader Subcomponent
 * Renders the top-level semantic banner and tagline for optimal readability and SEO hierarchy.
 */
function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="text-center mb-16">
      <h1 className="text-4xl font-extrabold text-brand-800">{title}</h1>
      <p className="mt-4 text-muted max-w-3xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}

/**
 * Props definition for the StatementCard subcomponent.
 */
interface StatementCardProps {
  readonly type: "VISION" | "MISSION";
  readonly paragraphs: readonly string[];
}

/**
 * StatementCard Subcomponent
 * Renders an individual Vision or Mission card with consistent typography and spacing.
 */
function StatementCard({ type, paragraphs }: StatementCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-glow-sm p-8 hover:shadow-glow-md transition-all">
      <h3 className="text-2xl font-bold text-brand-700 mb-4">{type}</h3>
      {paragraphs.map((paragraph, index) => {
        const isLast = index === paragraphs.length - 1;
        return (
          <p
            key={index}
            className={`text-muted leading-relaxed text-justify ${
              !isLast ? "mb-3" : ""
            }`}
          >
            {paragraph}
          </p>
        );
      })}
    </div>
  );
}

/**
 * Props definition for the HighlightCard subcomponent.
 */
interface HighlightCardProps {
  readonly title: string;
  readonly description: string;
}

/**
 * HighlightCard Subcomponent
 * Renders an achievement/accolade card inside the responsive highlights grid.
 */
function HighlightCard({ title, description }: HighlightCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-glow-sm hover:shadow-glow-md transition-all">
      <h3 className="text-xl font-bold text-brand-700 mb-2">{title}</h3>
      <p className="text-muted text-sm">{description}</p>
    </div>
  );
}

/**
 * About IET Page Component
 *
 * Route: /insights/aboutiet
 * Description: Renders the institutional profile of the Institute of Engineering & Technology (IET Lucknow).
 */
export default function AboutIetPage() {
  return (
    <>
      {/* Schema.org JSON-LD Structured Data for Search Engine Optimization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_SCHEMA) }}
      />

      {/* Main page wrapper with top navbar clearance padding */}
      <main
        className="page-top-gap-more bg-white pt-28 pb-20 md:pt-32"
        id="about-iet"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Section: Page Header / Title Banner */}
          <PageHeader
            title={PAGE_HERO_CONFIG.title}
            subtitle={PAGE_HERO_CONFIG.subtitle}
          />

          {/* Section: Institutional Overview with Campus Media */}
          <div className="bg-white border border-gray-200 shadow-glow-md rounded-2xl p-6 md:p-10 mb-16 overflow-hidden">
            <h2 className="text-2xl font-bold text-brand-800 mb-6 border-l-4 border-brand-accent pl-4 text-left">
              Overview
            </h2>

            <div className="block">
              {/* Campus image container floated on large displays */}
              <div className="w-full lg:w-2/5 lg:float-right lg:ml-8 mb-6 lg:mb-4">
                <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50">
                  <Image
                    src="/images/college_image.svg"
                    alt="IET Lucknow Campus"
                    className="w-full h-auto object-contain block"
                    width={1200}
                    height={800}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>

              {/* Narrative history, academic excellence, and student development */}
              <div className="text-muted text-justify leading-relaxed">
                {OVERVIEW_PARAGRAPHS.map((paragraph, index) => {
                  const isLast = index === OVERVIEW_PARAGRAPHS.length - 1;
                  return (
                    <p key={index} className={!isLast ? "mb-4" : ""}>
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Clear float for proper box sizing */}
              <div className="clear-both"></div>
            </div>
          </div>

          {/* Section: Vision & Mission Dual Cards */}
          <div className="mb-16">
            <h2 className="text-3xl font-extrabold text-brand-800 mb-8 text-center">
              Vision &amp; Mission
            </h2>

            <div className="grid lg:grid-cols-2 gap-10">
              {INSTITUTIONAL_STATEMENTS.map((statement) => (
                <StatementCard
                  key={statement.id}
                  type={statement.type}
                  paragraphs={statement.paragraphs}
                />
              ))}
            </div>
          </div>

          {/* Section: Key Institutional Highlights & Distinctions */}
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-brand-800 mb-8 text-center">
              Highlights
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {HIGHLIGHTS_DATA.map((item) => (
                <HighlightCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}