'use client';

/**
 * @fileoverview Corporate Recruiter Campus Hiring Registration & Expression of Interest Portal.
 * 
 * Provides an enterprise-grade talent acquisition portal enabling prospective industry
 * recruiters to register campus hiring interest, submit role specifications, select
 * preferred placement recruitment windows, and schedule recruitment drives with the
 * Training and Placement Cell at the Institute of Engineering & Technology (IET), Lucknow.
 * 
 * Architectural & Operational Specifications:
 * - Dynamic Form State Engine: Controlled multi-field state tracking with real-time validation
 * - Security & Privacy: Secure API dispatch over HTTPS with 256-bit transit encryption via Web3Forms
 * - Accessibility (WCAG 2.1 AA): Explicit label-to-control bindings (`htmlFor`/`id`), ARIA live regions, autocomplete attributes
 * - SEO & Social Graph: Native Next.js App Router head metadata hoisting with OpenGraph, Twitter Card, and canonical URLs
 * - Schema.org Linked Data: Inlined JSON-LD `ContactPage` graph with educational provider credentials and contact points
 * - Motion & Micro-Interactions: Smooth Framer Motion spring physics, viewport-triggered count-up animations, and glassmorphic elevations
 * 
 * @module CorporateRecruiterRegistration
 * @version 2.3.0
 * @author Training & Placement Cell, Institute of Engineering and Technology, Lucknow
 * @license Proprietary - Academic Institution Recruitment Portal
 */

import { useMemo, useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { BadgeCheck, FlaskConical, TrendingUp, Users, Globe, Zap, LucideIcon } from 'lucide-react';

/**
 * Corporate recruitment registration payload submitted to the Training & Placement Cell.
 */
export interface CompanyContactPayload {
  companyName: string;
  industrySector: string;
  contactPersonName: string;
  designation: string;
  workEmail: string;
  contactNumber: string;
  recruitmentMonth: string;
  message: string;
}

/**
 * Industry sector categorization options for participating campus recruiters.
 */
export type IndustrySectorOption =
  | 'IT / Software'
  | 'Core Engineering'
  | 'Consulting / Analytics'
  | 'Finance / Fintech'
  | 'Other';

/**
 * Standard recruitment drive cycle window definition.
 */
export interface RecruitmentWindowOption {
  value: string;
  label: string;
  sub: string;
}

/**
 * Key placement and institutional track-record benchmark metric item.
 */
export interface InstitutionalStatItem {
  value: string;
  label: string;
  sublabel: string;
}

/**
 * Institutional value proposition and capability highlight card item.
 */
export interface CorporateHighlightItem {
  Icon: LucideIcon;
  title: string;
  desc: string;
  iconColor: string;
  iconBg: string;
  iconBgHover: string;
}

/**
 * Web3Forms API response payload contract.
 */
export interface Web3FormsApiResponse {
  success: boolean;
  message?: string;
}

/**
 * Predefined industry sectors available for quick tag selection.
 */
const SECTORS: IndustrySectorOption[] = [
  'IT / Software',
  'Core Engineering',
  'Consulting / Analytics',
  'Finance / Fintech',
  'Other',
];

/**
 * Scheduled academic placement cycles and campus hiring windows.
 */
const MONTHS: RecruitmentWindowOption[] = [
  { value: 'August - October', label: 'Aug – Oct', sub: 'Placement season start' },
  { value: 'November - January', label: 'Nov – Jan', sub: 'Peak placement season' },
  { value: 'February - April', label: 'Feb – Apr', sub: 'Late season drives' },
  { value: 'May - July', label: 'May – Jul', sub: 'Summer internships' },
];

/**
 * Verified institutional placement metrics for prospective hiring partners.
 * Benchmarked against the 2025–26 academic placement season.
 */
const STATS: InstitutionalStatItem[] = [
  { value: '500+', label: 'Eligible Students', sublabel: 'Across all branches' },
  { value: '7 LPA', label: 'Average Package', sublabel: 'Placement Year 2025–26' },
  { value: '60 LPA', label: 'Highest Package', sublabel: 'Placement Year 2025–26' },
  { value: '80+', label: 'Companies Visited', sublabel: 'Across all sectors' },
];

/**
 * Institutional pillars and operational advantages for corporate recruitment partners.
 */
const HIGHLIGHTS: CorporateHighlightItem[] = [
  {
    Icon: BadgeCheck,
    title: 'AICTE Approved',
    desc: 'Fully accredited institution with a strong academic legacy and premier engineering ranking.',
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-50 border-emerald-200',
    iconBgHover: 'group-hover:bg-emerald-100',
  },
  {
    Icon: FlaskConical,
    title: 'Industry-Ready Labs',
    desc: 'Students trained on the latest tech stacks, modern hardware, and industry-standard tooling.',
    iconColor: 'text-violet-500',
    iconBg: 'bg-violet-50 border-violet-200',
    iconBgHover: 'group-hover:bg-violet-100',
  },
  {
    Icon: TrendingUp,
    title: '95%+ Placement Rate',
    desc: 'Consistently exceptional placement track record across all engineering disciplines year over year.',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50 border-blue-200',
    iconBgHover: 'group-hover:bg-blue-100',
  },
  {
    Icon: Users,
    title: 'Dedicated T&P Cell',
    desc: 'A full-time professional executive team to coordinate every step of your on-campus hiring drive.',
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-50 border-orange-200',
    iconBgHover: 'group-hover:bg-orange-100',
  },
  {
    Icon: Globe,
    title: 'Pan-India Recruiters',
    desc: 'Trusted by industry leaders spanning global technology giants, unicorn startups, and Fortune 500s.',
    iconColor: 'text-cyan-500',
    iconBg: 'bg-cyan-50 border-cyan-200',
    iconBgHover: 'group-hover:bg-cyan-100',
  },
  {
    Icon: Zap,
    title: 'Fast Turnaround',
    desc: 'Streamlined scheduling from initial expression of interest to campus drive execution in under 2 weeks.',
    iconColor: 'text-yellow-500',
    iconBg: 'bg-yellow-50 border-yellow-200',
    iconBgHover: 'group-hover:bg-yellow-100',
  },
];

/**
 * Schema.org JSON-LD structured data for Corporate Recruiter Contact Page.
 * Enhances search engine rich results, institutional authority, and recruiter discovery.
 */
const recruiterContactStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['ContactPage', 'WebPage'],
      '@id': 'https://placement.ietlucknow.ac.in/recruiters/contactform#webpage',
      name: 'Corporate Recruiter Registration & Campus Hiring Interest Form - IET Lucknow',
      description:
        'Official campus recruitment registration portal for employers and corporate talent acquisition teams to initiate hiring drives at Institute of Engineering & Technology, Lucknow.',
      url: 'https://placement.ietlucknow.ac.in/recruiters/contactform',
      inLanguage: 'en-IN',
      publisher: {
        '@type': 'EducationalOrganization',
        name: 'Training & Placement Cell, Institute of Engineering and Technology, Lucknow',
        url: 'https://placement.ietlucknow.ac.in',
        logo: {
          '@type': 'ImageObject',
          url: 'https://placement.ietlucknow.ac.in/images/logo.png',
        },
        parentOrganization: {
          '@type': 'CollegeOrUniversity',
          name: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
          url: 'https://aktu.ac.in',
        },
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Corporate Relations & Campus Recruitment',
        email: 'placement@ietlucknow.ac.in',
        telephone: '+91-522-2772460',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://placement.ietlucknow.ac.in/recruiters/contactform#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://placement.ietlucknow.ac.in',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Recruiters',
          item: 'https://placement.ietlucknow.ac.in/recruiters/invitation',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Corporate Interest Form',
          item: 'https://placement.ietlucknow.ac.in/recruiters/contactform',
        },
      ],
    },
  ],
};

/**
 * Animated counter that counts up to the numeric value when in viewport view.
 * 
 * @param {Object} props Component properties
 * @param {string} props.value String containing numeric value and optional suffix (e.g. "500+", "7 LPA")
 * @returns {JSX.Element} Animated number element
 */
function AnimatedCounter({ value }: { value: string }) {
  const match = value.match(/(\d+)(.*)/);
  const num = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && num > 0) {
      const controls = animate(0, num, {
        duration: 2,
        ease: 'easeOut',
        onUpdate(latest) {
          setCount(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [inView, num]);

  if (!match) return <span>{value}</span>;
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/**
 * Shared styling classes for enterprise form input fields with interactive focus and hover states.
 */
const inputClass =
  'w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 hover:shadow-md focus:shadow-lg focus:shadow-blue-500/20 transition-all duration-300 outline-none text-slate-800 font-bold placeholder:text-gray-400 shadow-sm transform focus:-translate-y-1 hover:-translate-y-0.5';

/**
 * Third-party form submission API credentials and institutional routing endpoints.
 */
const WEB3FORMS_ACCESS_KEY = 'a5197714-bfe3-4a98-abac-9fbd8ce340b4';
const TNP_EMAIL = 'placement@ietlucknow.ac.in';

/**
 * Primary Corporate Recruiter Contact & Campus Hiring Registration Component.
 * 
 * Features:
 * - Direct recruiter expression of interest intake with automated T&P Cell notifications
 * - Institutional recruitment performance KPIs with viewport-triggered count-up animations
 * - Dynamic preferred recruitment cycle picker (Early, Peak, Late, and Summer Internship)
 * - Inlined native Head SEO metadata hoisting (title, meta, canonical, OpenGraph, Twitter)
 * - Linked Schema.org ContactPage JSON-LD graph for recruitment query indexing
 * - Accessible form labels and validation feedback meeting WCAG 2.1 AA specifications
 * 
 * @returns {JSX.Element} Responsive recruiter interest intake dashboard.
 */
export default function ContactForm() {
  // Form submission field state model
  const [form, setForm] = useState<CompanyContactPayload>({
    companyName: '',
    industrySector: 'IT / Software',
    contactPersonName: '',
    designation: '',
    workEmail: '',
    contactNumber: '',
    recruitmentMonth: '',
    message: '',
  });

  // Submission lifecycle status
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  /**
   * Generic input change handler curried by payload property key.
   */
  const set = (key: keyof CompanyContactPayload) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  /**
   * Validation predicate: ensures all required fields are non-empty before permitting submission.
   */
  const canSubmit = useMemo(() =>
    Boolean(
      form.companyName.trim() &&
      form.contactPersonName.trim() &&
      form.designation.trim() &&
      form.workEmail.trim() &&
      form.contactNumber.trim() &&
      form.recruitmentMonth.trim()
    ),
    [form]
  );

  /**
   * Submits the recruiter registration payload securely to Web3Forms API.
   */
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'New Corporate Interest Form Submission - IET Lucknow',
          from_name: 'IET Lucknow T&P Website',
          replyto: form.workEmail,
          to: TNP_EMAIL,
          ...form,
        }),
      });

      const data = (await res.json()) as Web3FormsApiResponse;

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit the expression of interest form.');
      }

      setStatus('success');
      setForm({
        companyName: '',
        industrySector: 'IT / Software',
        contactPersonName: '',
        designation: '',
        workEmail: '',
        contactNumber: '',
        recruitmentMonth: '',
        message: '',
      });
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    }
  }

  return (
    <main
      role="main"
      aria-label="Corporate Recruiter Registration and Campus Hiring Form"
      className="page-top-gap bg-slate-50 overflow-x-hidden min-h-screen pt-20 sm:pt-24"
    >
      {/* ══ Native Head Hoisting for Enterprise Search Engine Optimization (SEO) ══ */}
      <title>Corporate Recruiter Registration & Campus Hiring Form | IET Lucknow</title>
      <meta
        name="description"
        content="Partner with the Training & Placement Cell at IET Lucknow for on-campus recruitment. Submit your corporate expression of interest, choose hiring cycles, and recruit top engineering talent."
      />
      <meta
        name="keywords"
        content="IET Lucknow Recruiter Registration, Campus Recruitment IET Lucknow, Hire Engineering Students Lucknow, Corporate Expression of Interest, T&P Cell IET Lucknow, Campus Hiring Form, AKTU Campus Recruitment, Tech Hiring Lucknow, Engineering Placement Drive"
      />
      <link rel="canonical" href="https://placement.ietlucknow.ac.in/recruiters/contactform" />

      {/* OpenGraph Protocol Metadata */}
      <meta property="og:title" content="Corporate Recruiter Registration & Campus Hiring Form | IET Lucknow" />
      <meta
        property="og:description"
        content="Partner with IET Lucknow for campus hiring. Submit job roles, choose recruitment cycles, and connect with 500+ eligible engineering graduates."
      />
      <meta property="og:url" content="https://placement.ietlucknow.ac.in/recruiters/contactform" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TPC IET Lucknow" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:image" content="https://placement.ietlucknow.ac.in/images/campus.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="IET Lucknow Campus and Academic Complex" />

      {/* Twitter Cards Metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Corporate Recruiter Registration | IET Lucknow" />
      <meta
        name="twitter:description"
        content="Partner with IET Lucknow T&P Cell for campus hiring drives and internship recruitment."
      />
      <meta name="twitter:image" content="https://placement.ietlucknow.ac.in/images/campus.jpg" />

      {/* Schema.org Linked Data Graph for Search Engine Indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recruiterContactStructuredData) }}
      />

      {/* ══ HERO & STATS SECTION ══════════════════════════════════════════════ */}
      <div className="py-10 px-6">
        <div className="max-w-6xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-[#0B1A2E] hover:brightness-110 text-white shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center min-h-[380px] border border-white/10">
          {/* Subtle ambient light gradient accent */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-12">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.15, delayChildren: 0.1 },
                },
              }}
              className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight flex flex-col items-center"
            >
              <span className="overflow-hidden inline-block pb-2">
                <motion.span
                  variants={{
                    hidden: { y: '110%' },
                    visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  className="inline-block"
                >
                  Hire the <span className="text-blue-400">Best Talent</span>
                </motion.span>
              </span>
              <span className="overflow-hidden inline-block pb-2 mt-[-10px]">
                <motion.span
                  variants={{
                    hidden: { y: '110%' },
                    visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  className="inline-block"
                >
                  from IET Lucknow
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
            >
              Partner with us for campus recruitment and access technically strong, industry-ready graduates across all engineering disciplines.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative inline-block"
            >
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-extrabold text-white bg-blue-600 hover:bg-blue-500 shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-lg"
              >
                Connect with Us
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Animated Key Metrics Display */}
        <div className="max-w-5xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="h-full"
            >
              <motion.div
                animate={{
                  backgroundColor: ['#ffffff', '#f0f9ff', '#ffffff'],
                  boxShadow: [
                    '0 4px 15px rgba(59,130,246,0.1)',
                    '0 15px 35px rgba(59,130,246,0.2)',
                    '0 4px 15px rgba(59,130,246,0.1)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                className="flex flex-col items-center justify-center text-center p-8 rounded-3xl h-full border border-blue-100"
              >
                <div className="text-4xl md:text-5xl font-extrabold text-brand-800 mb-3 tracking-tight">
                  <AnimatedCounter value={s.value} />
                </div>
                <div className="text-sm font-bold text-gray-800 uppercase tracking-wide">{s.label}</div>
                <div className="text-xs text-gray-400 mt-2 font-medium">{s.sublabel}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══ WHY RECRUIT WITH US HIGHLIGHTS SECTION ═══════════════════════════ */}
      <section className="py-24 bg-slate-50 overflow-hidden" aria-label="Institutional Strengths and Corporate Advantages">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-3">Why Recruit With Us</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-800 tracking-tight">What sets IET Lucknow apart</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-brand-800 rounded-full mx-auto mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {HIGHLIGHTS.map(({ Icon, title, desc, iconColor, iconBg }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 18, delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02, transition: { type: 'spring', stiffness: 260, damping: 18 } }}
                className="cursor-default"
              >
                <div className="w-full h-full flex flex-col p-8 bg-white border border-slate-200 rounded-3xl justify-center relative overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] hover:bg-slate-50 transition-all duration-300">
                  {/* Distinctive Icon Badge */}
                  <div className={`mb-6 w-14 h-14 rounded-2xl border flex items-center justify-center ${iconBg}`}>
                    <motion.div whileHover={{ scale: 1.2, transition: { type: 'spring', stiffness: 300, damping: 15 } }}>
                      <Icon className={`w-7 h-7 ${iconColor}`} strokeWidth={1.8} aria-hidden="true" />
                    </motion.div>
                  </div>
                  <h3 className="font-extrabold text-xl mb-2 tracking-tight text-slate-800">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CORPORATE REGISTRATION FORM SECTION ══════════════════════════════ */}
      <section id="contact-form" className="py-24 bg-slate-50 relative overflow-hidden" aria-label="Recruiter Interest Intake Form">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-3">Get In Touch</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-800 tracking-tight">Corporate Interest Form</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-brand-800 rounded-full mx-auto mt-6" />
            <p className="mt-6 text-gray-500 max-w-xl mx-auto text-lg leading-relaxed font-medium">
              Fill out the details below and our T&amp;P team will get back to you within 24 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative p-[2px] rounded-[2.5rem] bg-gradient-to-br from-blue-400 via-indigo-100 to-purple-400 shadow-[0_30px_80px_-15px_rgba(59,130,246,0.2)] hover:shadow-[0_40px_100px_-15px_rgba(59,130,246,0.3)] transition-shadow duration-500"
          >
            <div className="bg-white/95 backdrop-blur-3xl rounded-[2.4rem] p-8 md:p-14 relative overflow-hidden">
              {/* Glassmorphic Ambient Gradient Blurs */}
              <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] pointer-events-none -z-10" />
              <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-100/50 rounded-full blur-[100px] pointer-events-none -z-10" />

              {status === 'success' ? (
                /* Success Notification View with Accessible Live Announcement */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-16"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-8 shadow-2xl shadow-green-500/30">
                    <svg
                      className="w-10 h-10 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      aria-hidden="true"
                    >
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-extrabold text-brand-800 mb-4 tracking-tight">Expression of Interest Submitted!</h3>
                  <p className="text-gray-500 text-lg max-w-md mb-10 leading-relaxed font-medium">
                    Thank you! Our Training &amp; Placement team will review your details and reach out to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="px-8 py-4 bg-brand-800 text-white font-bold rounded-full hover:bg-brand-900 transition-all text-base shadow-lg shadow-brand-800/20 hover:scale-105 active:scale-95"
                  >
                    Submit Another Response
                  </button>
                </motion.div>
              ) : (
                /* Interactive Recruiter Form with Accessible Labels and Validations */
                <form onSubmit={onSubmit} className="space-y-12" noValidate={false}>
                  {/* Subsection 1: Company Information */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                      <h3 className="text-2xl font-extrabold text-slate-900 drop-shadow-sm pb-1">Company Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2.5">
                        <label
                          htmlFor="company-name"
                          className="text-xs font-extrabold text-slate-900 uppercase tracking-widest ml-1 drop-shadow-sm block"
                        >
                          Company Name <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="company-name"
                          type="text"
                          required
                          autoComplete="organization"
                          aria-required="true"
                          placeholder="e.g. Google, Microsoft, Tata Motors"
                          value={form.companyName}
                          onChange={set('companyName')}
                          className={inputClass}
                        />
                      </div>
                      <div className="space-y-2.5">
                        <label
                          id="industry-sector-label"
                          className="text-xs font-extrabold text-slate-900 uppercase tracking-widest ml-1 drop-shadow-sm block"
                        >
                          Industry Sector <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <div
                          role="group"
                          aria-labelledby="industry-sector-label"
                          className="flex flex-wrap gap-2 pt-1"
                        >
                          {SECTORS.map((s) => (
                            <button
                              key={s}
                              type="button"
                              aria-pressed={form.industrySector === s}
                              onClick={() => setForm((p) => ({ ...p, industrySector: s }))}
                              className={[
                                'px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all',
                                form.industrySector === s
                                  ? 'bg-brand-800 text-white border-brand-800 shadow-md'
                                  : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300 hover:bg-gray-50',
                              ].join(' ')}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subsection 2: Contact Person Details */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-6 bg-purple-500 rounded-full" />
                      <h3 className="text-2xl font-extrabold text-slate-900 drop-shadow-sm pb-1">Contact Details</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2.5">
                        <label
                          htmlFor="contact-person-name"
                          className="text-xs font-extrabold text-slate-900 uppercase tracking-widest ml-1 drop-shadow-sm block"
                        >
                          Contact Person Name <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="contact-person-name"
                          type="text"
                          required
                          autoComplete="name"
                          aria-required="true"
                          placeholder="Hiring Manager Name"
                          value={form.contactPersonName}
                          onChange={set('contactPersonName')}
                          className={inputClass}
                        />
                      </div>
                      <div className="space-y-2.5">
                        <label
                          htmlFor="designation"
                          className="text-xs font-extrabold text-slate-900 uppercase tracking-widest ml-1 drop-shadow-sm block"
                        >
                          Designation <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="designation"
                          type="text"
                          required
                          autoComplete="organization-title"
                          aria-required="true"
                          placeholder="e.g. HR Head, Talent Acquisition"
                          value={form.designation}
                          onChange={set('designation')}
                          className={inputClass}
                        />
                      </div>
                      <div className="space-y-2.5">
                        <label
                          htmlFor="work-email"
                          className="text-xs font-extrabold text-slate-900 uppercase tracking-widest ml-1 drop-shadow-sm block"
                        >
                          Work Email Address <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="work-email"
                          type="email"
                          required
                          autoComplete="email"
                          aria-required="true"
                          placeholder="hr@company.com"
                          value={form.workEmail}
                          onChange={set('workEmail')}
                          className={inputClass}
                        />
                      </div>
                      <div className="space-y-2.5">
                        <label
                          htmlFor="contact-number"
                          className="text-xs font-extrabold text-slate-900 uppercase tracking-widest ml-1 drop-shadow-sm block"
                        >
                          Contact Number <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="contact-number"
                          type="tel"
                          required
                          autoComplete="tel"
                          aria-required="true"
                          placeholder="+91 XXXXX XXXXX"
                          value={form.contactNumber}
                          onChange={set('contactNumber')}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subsection 3: Preferred Recruitment Window */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      <h3 className="text-2xl font-extrabold text-slate-900 drop-shadow-sm pb-1">Recruitment Window</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4" role="radiogroup" aria-label="Preferred recruitment window">
                      {MONTHS.map((m) => (
                        <button
                          key={m.value}
                          type="button"
                          role="radio"
                          aria-checked={form.recruitmentMonth === m.value}
                          onClick={() => setForm((p) => ({ ...p, recruitmentMonth: m.value }))}
                          className={`p-4 rounded-2xl border-2 text-left transition-all ${
                            form.recruitmentMonth === m.value
                              ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20'
                              : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <p
                            className={`text-sm font-extrabold mb-1 ${
                              form.recruitmentMonth === m.value ? 'text-blue-700' : 'text-brand-800'
                            }`}
                          >
                            {m.label}
                          </p>
                          <p className="text-xs text-gray-500 font-medium">{m.sub}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Subsection 4: Additional Requirements & Job Specifications */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-6 bg-orange-400 rounded-full" />
                      <h3 className="text-2xl font-extrabold text-slate-900 drop-shadow-sm pb-1">Additional Requirements</h3>
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="additional-message" className="sr-only">
                        Job description, candidate criteria, or specific requirements
                      </label>
                      <textarea
                        id="additional-message"
                        rows={4}
                        maxLength={500}
                        placeholder="Briefly describe the job roles, eligibility criteria, or any specific requirements..."
                        value={form.message}
                        onChange={set('message')}
                        className={inputClass + ' resize-none'}
                      />
                      <div className="flex justify-between items-center ml-2 mr-2">
                        <div className="h-1.5 flex-1 mr-5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-300"
                            style={{ width: `${(form.message.length / 500) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs font-bold text-gray-400" aria-live="polite">
                          {form.message.length} / 500
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submission Error Banner */}
                  {status === 'error' && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700 font-bold text-sm flex items-center gap-3"
                    >
                      <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {error || 'Failed to submit. Please try again.'}
                    </div>
                  )}

                  {/* Footer Action Bar with Security Indicator */}
                  <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-100">
                    <p className="text-sm font-semibold text-gray-400 flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Data secured via 256-bit encryption
                    </p>

                    <button
                      type="submit"
                      disabled={status === 'submitting' || !canSubmit}
                      className="w-full sm:w-auto px-10 py-4 bg-brand-800 hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-brand-800 disabled:cursor-not-allowed text-white font-extrabold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-base"
                    >
                      {status === 'submitting' ? (
                        <span className="flex items-center justify-center gap-3">
                          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Submitting…
                        </span>
                      ) : (
                        'Submit Expression of Interest'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}