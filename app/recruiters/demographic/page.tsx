"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TabKey = "overall" | "branch";
type ProgrammeKey = "overview" | "btech" | "mtech" | "mca" | "mba";

const tabs: { key: TabKey; label: string; short: string }[] = [
  { key: "overall", label: "Overall Placement Statistics", short: "Overall" },
  { key: "branch", label: "Branch-wise Placement Statistics", short: "Branch-wise" },
];

const recruiterHighlights = [
  { name: "Amazon", tone: "bg-white text-[#071733]" },
  { name: "TCS", tone: "bg-[#2C74B3] text-[#071733]" },
  { name: "Infosys", tone: "bg-white/90 text-[#144272]" },
  { name: "Deloitte", tone: "bg-white text-[#071733]" },
  { name: "Accenture", tone: "bg-white/95 text-[#144272]" },
  { name: "Wipro", tone: "bg-[#eaf1fb] text-[#071733]" },
];

const placementOffersData = [
  { session: "2021-22", offers: 396 },
  { session: "2022-23", offers: 455 },
  { session: "2023-24", offers: 390 },
  { session: "2024-25", offers: 525 },
  { session: "2025-26", offers: 526 },
];

const compensationTrendData = [
  { session: "2021-22", highest: 32, median: 5.8, average: 7.1 },
  { session: "2022-23", highest: 38, median: 6.4, average: 7.8 },
  { session: "2023-24", highest: 59.91, median: 6.15, average: 6.78 },
  { session: "2024-25", highest: 54, median: 6, average: 6.44 },
  { session: "2025-26", highest: 60.0, median: 6.4, average: 6.52 },
];

const topPlacements = [
  { id: 1, name: "Aarav Singh", company: "Amazon", role: "SDE", package: "₹60.0 LPA", branch: "CSE" },
  { id: 2, name: "Priya Sharma", company: "Microsoft", role: "Software Engineer", package: "₹48 LPA", branch: "IT" },
  { id: 3, name: "Rohan Verma", company: "Google", role: "Analyst", package: "₹45 LPA", branch: "CSE" },
  { id: 4, name: "Sneha Yadav", company: "Adobe", role: "Frontend Engineer", package: "₹42 LPA", branch: "IT" },
  { id: 5, name: "Aditya Mishra", company: "Atlassian", role: "SDE-1", package: "₹39 LPA", branch: "CSE" },
  { id: 6, name: "Neha Khan", company: "Deloitte", role: "Consultant", package: "₹26 LPA", branch: "ECE" },
  { id: 7, name: "Shivam Gupta", company: "Oracle", role: "Developer", package: "₹24 LPA", branch: "IT" },
  { id: 8, name: "Ananya Roy", company: "ZS", role: "Business Analyst", package: "₹22 LPA", branch: "CSE" },
  { id: 9, name: "Karan Tiwari", company: "Accenture", role: "Associate", package: "₹19 LPA", branch: "ECE" },
  { id: 10, name: "Harshita Jain", company: "Infosys", role: "Specialist Programmer", package: "₹18 LPA", branch: "IT" },
  { id: 11, name: "Vaibhav Singh", company: "Wipro", role: "Project Engineer", package: "₹17 LPA", branch: "EE" },
  { id: 12, name: "Isha Srivastava", company: "TCS Digital", role: "Digital Engineer", package: "₹16 LPA", branch: "CSE" },
  { id: 13, name: "Nitin Maurya", company: "Capgemini", role: "Analyst", package: "₹15 LPA", branch: "ME" },
  { id: 14, name: "Sakshi Patel", company: "Paytm", role: "Software Engineer", package: "₹14 LPA", branch: "AI/DS" },
  { id: 15, name: "Abhishek Rai", company: "HCL", role: "Graduate Engineer", package: "₹13 LPA", branch: "CE" },
  { id: 16, name: "Tanvi Sinha", company: "Cognizant", role: "Programmer Analyst", package: "₹12 LPA", branch: "IT" },
  { id: 17, name: "Yash Tripathi", company: "Tech Mahindra", role: "Engineer", package: "₹11 LPA", branch: "ECE" },
  { id: 18, name: "Ritika Das", company: "PwC", role: "Associate Consultant", package: "₹10 LPA", branch: "CSE" },
  { id: 19, name: "Manav Saxena", company: "L&T", role: "GET", package: "₹9 LPA", branch: "ME" },
  { id: 20, name: "Pooja Agrawal", company: "Flipkart", role: "Operations Analyst", package: "₹8.5 LPA", branch: "EE" },
];

const academicProgrammesData = [
  { key: "btech", short: "B.Tech", name: "B.Tech", value: 541, color: "#0A2647" },
  { key: "mtech", short: "M.Tech", name: "M.Tech", value: 108, color: "#144272" },
  { key: "mca", short: "MCA", name: "MCA", value: 67, color: "#2C74B3" },
  { key: "mba", short: "MBA", name: "MBA", value: 57, color: "#38BDF8" },
];

const overallAchievements = [
  {
    id: 1,
    category: "GATE 2026",
    title: "AIR 12 — All India Rank",
    stat: "99.8 Percentile",
    name: "Ananya Sharma",
    branch: "CSE (2022–26)",
    description: "Secured top percentile in GATE Computer Science paper with stellar performance in Algorithms and Systems.",
    iconBg: "bg-[#E0F2FE]",
    iconText: "text-[#0369A1]",
    statBg: "bg-[#0A2647] text-white",
  },
  {
    id: 2,
    category: "NATIONAL HACKATHON",
    title: "1st Prize — Smart India Hackathon",
    stat: "₹1,000,000 Award",
    name: "Team TechVanguard",
    branch: "Cross-Disciplinary Team",
    description: "Developed an AI-driven real-time disaster response system now deployed by state emergency agencies.",
    iconBg: "bg-[#FEF3C7]",
    iconText: "text-[#92400E]",
    statBg: "bg-[#144272] text-white",
  },
  {
    id: 3,
    category: "RESEARCH EXCELLENCE",
    title: "IEEE Best Paper Award",
    stat: "Tokyo Conference",
    name: "Rohan Verma",
    branch: "ECE (2022–26)",
    description: "Authored award-winning paper on ultra-low-power VLSI architectures presented at international IEEE conference.",
    iconBg: "bg-[#E0E7FF]",
    iconText: "text-[#3730A3]",
    statBg: "bg-[#2C74B3] text-white",
  },
  {
    id: 4,
    category: "OFF-CAMPUS BENCHMARK",
    title: "Highest Global Package Offer",
    stat: "₹60.0 LPA",
    name: "Aarav Singh",
    branch: "CSE (2022–26)",
    description: "Secured international software engineering offer with leading global tech firm, setting a record for the session.",
    iconBg: "bg-[#DCFCE7]",
    iconText: "text-[#166534]",
    statBg: "bg-[#0B1A2E] text-white",
  },
];

const overallKpis = [
  { label: "Highest Package", value: "₹60.0 LPA", helperText: "Top offer across recent sessions", progress: "100%" },
  { label: "Average Package", value: "₹6.52 LPA", helperText: "Weighted average compensation", progress: "72%" },
  { label: "Placement Percentage", value: "87%", helperText: "Students placed from eligible batch", progress: "87%" },
  { label: "Total Offers", value: "526", helperText: "Offers received in 2025–26", progress: "100%" },
];

function CustomPlacementTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0]?.payload;

  return (
    <div className="min-w-[220px] rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_40px_rgba(11,60,109,0.14)]">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2C74B3]">Session</p>
      <h4 className="mt-1 text-base font-bold text-[#071733]">{label}</h4>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#0A2647]" />
            <span className="text-sm text-[#52606d]">Total Offers</span>
          </div>
          <span className="text-sm font-semibold text-[#071733]">{data.offers}</span>
        </div>
      </div>
    </div>
  );
}

function CustomCompensationTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0]?.payload;

  return (
    <div className="min-w-[240px] rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_40px_rgba(11,60,109,0.14)]">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2C74B3]">Session</p>
      <h4 className="mt-1 text-base font-bold text-[#1f2933]">{label}</h4>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#52606d]">Highest Package</span>
          <span className="text-sm font-bold text-[#071733]">₹{data.highest} LPA</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#52606d]">Median Package</span>
          <span className="text-sm font-bold text-[#2C74B3]">₹{data.median} LPA</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#52606d]">Average Package</span>
          <span className="text-sm font-bold text-[#2C74B3]">₹{data.average} LPA</span>
        </div>
      </div>
    </div>
  );
}

function KPIGrid({ items }: { items: typeof overallKpis }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.label}
          className="group rounded-3xl border border-slate-200/70 bg-white p-5 shadow-[0_8px_24px_rgba(11,60,109,0.08)] transition-all duration-300  hover:shadow-[0_16px_40px_rgba(11,60,109,0.12)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#52606d]">{item.label}</p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-[#1f2933]">{item.value}</h3>
          <p className="mt-3 text-sm text-[#52606d]">{item.helperText}</p>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-[linear-gradient(135deg,#071733,#2C74B3)]" style={{ width: item.progress }} />
          </div>
        </article>
      ))}
    </div>
  );
}

function ChartCardTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h3 className="text-2xl font-bold tracking-tight text-[#1f2933]">{title}</h3>
      <p className="mt-2 text-sm text-[#52606d]">{subtitle}</p>
    </div>
  );
}

function OverallTab() {
  return (
    <section className="space-y-6">
      <section className="relative overflow-hidden rounded-[32px] border border-[#dbe4f0] bg-[#0B1A2E] shadow-[0_24px_60px_rgba(11,60,109,0.18)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(44,116,179,0.16),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.10),transparent_30%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="relative grid grid-cols-1 gap-10 px-5 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-10">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
              Training & Placement Cell
            </div>

            <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-tight tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.9rem]">
              Placement Excellence Across Leading Recruiters
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-100/80 sm:text-[15px]">
              A consolidated overview of placement performance, hiring momentum, and recruiter participation across recent academic sessions.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {["120+ Recruiters", "600+ Offers", "87% Placement"].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition-transform duration-300 "
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex min-h-[320px] items-center justify-center lg:min-h-[360px]">
            <div className="group/spotlight relative h-full w-full max-w-[460px] scale-[0.85] origin-center sm:scale-100">
              <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(44,116,179,0.32),rgba(44,116,179,0.04),transparent_70%)] blur-2xl" />

              <div className="absolute right-8 top-0 z-10 cursor-pointer rounded-[24px] border border-white/20 bg-white/15 px-5 py-4 text-white shadow-[0_18px_40px_rgba(3,20,38,0.2)] backdrop-blur-xl transition-all duration-500 ease-out group-hover/spotlight:z-25 group-hover/spotlight:-translate-y-4 group-hover/spotlight:translate-x-4 group-hover/spotlight:scale-105 group-hover/spotlight:border-white/40 group-hover/spotlight:bg-white/25 group-hover/spotlight:shadow-[0_25px_50px_rgba(3,20,38,0.4)] hover:!z-40 hover:!scale-110">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">Highlight</p>
                <p className="mt-2 text-3xl font-bold tracking-tight">₹60.0 LPA</p>
                <p className="mt-1 text-sm text-white/85">Highest package offered</p>
              </div>

              <div className="absolute left-0 top-10 z-10 w-[150px] cursor-pointer rounded-[22px] border border-white/20 bg-white/15 p-4 text-white shadow-[0_18px_40px_rgba(3,20,38,0.18)] backdrop-blur-xl transition-all duration-500 ease-out group-hover/spotlight:z-25 group-hover/spotlight:-translate-x-5 group-hover/spotlight:-translate-y-2 group-hover/spotlight:scale-105 group-hover/spotlight:border-white/40 group-hover/spotlight:bg-white/25 group-hover/spotlight:shadow-[0_25px_50px_rgba(3,20,38,0.4)] hover:!z-40 hover:!scale-110">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75">Active Hiring</p>
                <p className="mt-2 text-2xl font-bold">120+</p>
                <p className="mt-1 text-xs text-white/85">Participating companies</p>
              </div>

              <div className="absolute bottom-0 right-2 z-10 w-[190px] cursor-pointer rounded-[24px] border border-white/20 bg-white/15 p-4 text-white shadow-[0_18px_40px_rgba(3,20,38,0.18)] backdrop-blur-xl transition-all duration-500 ease-out group-hover/spotlight:z-25 group-hover/spotlight:translate-x-4 group-hover/spotlight:translate-y-4 group-hover/spotlight:scale-105 group-hover/spotlight:border-white/40 group-hover/spotlight:bg-white/25 group-hover/spotlight:shadow-[0_25px_50px_rgba(3,20,38,0.4)] hover:!z-40 hover:!scale-110">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75">Placement Rate</p>
                <p className="mt-2 text-3xl font-bold text-white">87%</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-[87%] rounded-full bg-[#38BDF8]" />
                </div>
              </div>

              <div className="absolute left-1/2 top-1/2 z-20 w-full max-w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-white/20 bg-white/15 p-5 shadow-[0_22px_50px_rgba(3,20,38,0.22)] backdrop-blur-xl transition-all duration-500 ease-out group-hover/spotlight:scale-[0.96] group-hover/spotlight:opacity-90 hover:!z-30 hover:!scale-100 hover:!opacity-100">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">Recruiter Spotlight</p>
                    <h3 className="mt-2 text-lg font-bold text-white">Top Recruitments</h3>
                  </div>
                  <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">2024–25</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {recruiterHighlights.map((item) => (
                    <div
                      key={item.name}
                      className={`${item.tone} flex min-h-[64px] items-center justify-center rounded-[18px] px-3 text-sm font-semibold shadow-[0_10px_24px_rgba(11,60,109,0.08)] transition-all duration-300 hover:scale-[1.02]`}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[30px] bg-white p-6 shadow-[0_18px_50px_rgba(11,60,109,0.10)] ring-1 ring-slate-200/70 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2C74B3]">PLACEMENT OFFERS</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#1f2933]">Session-wise Placement Offers</h3>
            <p className="mt-2 text-sm text-[#52606d]">Placement offers across recent academic sessions.</p>
          </div>

          <div className="inline-flex w-fit items-center rounded-full bg-[#f5f7fa] px-4 py-2 text-sm font-semibold text-[#144272] ring-1 ring-slate-200/70">
            4 Academic Programmes
          </div>
        </div>

        <div className="mt-8 h-[400px] w-full rounded-[24px] bg-[#fcfdff] p-4 sm:p-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={placementOffersData} barCategoryGap="22%" margin={{ top: 16, right: 12, left: 0, bottom: 8 }}>
              <defs>
                <linearGradient id="offersGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2C74B3" />
                  <stop offset="100%" stopColor="#071733" />
                </linearGradient>
                <linearGradient id="placedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#2C74B3" />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e6edf5" />
              <XAxis dataKey="session" tickLine={false} axisLine={false} tick={{ fill: "#52606d", fontSize: 13, fontWeight: 500 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: "#52606d", fontSize: 13 }} width={44} />
              <Tooltip cursor={{ fill: "rgba(11,60,109,0.04)" }} content={<CustomPlacementTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ paddingBottom: "18px", fontSize: "13px", color: "#52606d" }}
              />
              <Bar dataKey="offers" name="Total Offers" fill="url(#offersGradient)" radius={[10, 10, 0, 0]} maxBarSize={34} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[30px] bg-white p-6 shadow-[0_18px_50px_rgba(11,60,109,0.10)] ring-1 ring-slate-200/70 sm:p-7">
          <ChartCardTitle
            title="Highest, Median & Average Package"
            subtitle="Session-wise comparison of compensation trends across recent academic years."
          />

          <div className="mt-8 h-[400px] w-full rounded-[24px] bg-[#fcfdff] p-4 sm:p-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={compensationTrendData} margin={{ top: 10, right: 12, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e6edf5" />
                <XAxis dataKey="session" tickLine={false} axisLine={false} tick={{ fill: "#52606d", fontSize: 13, fontWeight: 500 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#52606d", fontSize: 13 }} width={44} />
                <Tooltip content={<CustomCompensationTooltip />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  wrapperStyle={{ paddingBottom: "18px", fontSize: "13px", color: "#52606d" }}
                />
                <Line type="monotone" dataKey="highest" name="Highest" stroke="#071733" strokeWidth={3} dot={{ r: 4, fill: "#071733", strokeWidth: 0 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="median" name="Median" stroke="#144272" strokeWidth={3} dot={{ r: 4, fill: "#144272", strokeWidth: 0 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="average" name="Average" stroke="#2C74B3" strokeWidth={3} dot={{ r: 4, fill: "#2C74B3", strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[30px] bg-white p-6 shadow-[0_18px_50px_rgba(11,60,109,0.10)] ring-1 ring-slate-200/70 sm:p-7">
          <ChartCardTitle
            title="Top 20 Student Placements"
            subtitle="Highest-value student offers with recruiter and branch details."
          />

          <div data-lenis-prevent className="top-placements-scroll mt-6 max-h-[400px] space-y-3 overflow-y-auto overscroll-contain pr-2 [scrollbar-width:thin] [scrollbar-color:#2C74B3_#eaf1fb]">
            {topPlacements.map((student, index) => (
              <div
                key={student.id}
                className="group rounded-[22px] border border-slate-200/70 bg-[#fcfdff] p-4 transition-all duration-300  hover:border-[#2C74B3]/20 hover:shadow-[0_12px_30px_rgba(11,60,109,0.10)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eaf1fb] text-xs font-bold text-[#071733]">
                        {index + 1}
                      </div>
                      <h4 className="text-sm font-bold text-[#1f2933]">{student.name}</h4>
                    </div>

                    <p className="mt-3 text-sm font-semibold text-[#071733]">{student.company}</p>
                    <p className="mt-1 text-xs text-[#52606d]">
                      {student.branch}
                    </p>
                  </div>

                  <div className="rounded-full bg-[#E0F2FE] px-3 py-1 text-sm font-bold text-[#0369A1]">
                    {student.package}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[30px] bg-white p-6 shadow-[0_18px_50px_rgba(11,60,109,0.10)] ring-1 ring-slate-200/70 sm:p-8">
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2C74B3]">EXCELLENCE & RECOGNITION</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#071733] sm:text-3xl">Student Achievements & Highlights</h3>
            <p className="mt-2 max-w-2xl text-sm text-[#52606d]">Spotlight on competitive exam ranks, national awards, research publications, and record placement benchmarks.</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {overallAchievements.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between rounded-[24px] border border-slate-200/80 bg-[#fcfdff] p-5 transition-all duration-300 hover:border-[#2C74B3]/30 hover:shadow-[0_16px_36px_rgba(11,60,109,0.12)]"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${item.iconBg} ${item.iconText}`}>
                    {item.category}
                  </span>
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${item.statBg}`}>
                    {item.stat}
                  </span>
                </div>

                <h4 className="mt-4 text-base font-bold text-[#071733] leading-snug">
                  {item.title}
                </h4>

                <p className="mt-3 text-xs leading-relaxed text-[#52606d]">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0A2647] text-xs font-bold text-white shadow-sm">
                  {item.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-[#071733]">{item.name}</p>
                  <p className="truncate text-[11px] text-[#52606d]">{item.branch}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#f8fbff] to-white p-6 shadow-[0_25px_60px_rgba(11,60,109,0.12)] ring-1 ring-slate-200/60 sm:p-8">
        <div className="absolute -top-20 -right-20 h-[300px] w-[300px] rounded-full bg-[#2C74B3]/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-[260px] w-[260px] rounded-full bg-[#2C74B3]/10 blur-3xl" />

        <div className="relative flex flex-col gap-4 border-b border-slate-200/60 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2C74B3]">Academic Programmes</p>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-[#1f2933]">Programme Distribution</h3>
            <p className="mt-2 max-w-2xl text-sm text-[#52606d]">Student distribution across major academic programmes.</p>
          </div>

          <div className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#144272] shadow-sm ring-1 ring-slate-200">
            Total: {academicProgrammesData.reduce((sum, item) => sum + item.value, 0)} Students
          </div>
        </div>

        <div className="relative mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[26px] bg-white/80 p-6 backdrop-blur-xl ring-1 ring-slate-200/70 shadow-[0_10px_30px_rgba(11,60,109,0.08)]">
            <h4 className="text-lg font-bold text-[#1f2933]">Programmes</h4>
            <p className="mt-1 text-sm text-[#52606d]">Overview of enrolled students by degree type.</p>

            <div className="mt-6 space-y-4">
              {academicProgrammesData.map((item) => {
                const total = academicProgrammesData.reduce((sum, p) => sum + p.value, 0);
                const percent = Math.round((item.value / total) * 100);

                return (
                  <div
                    key={item.key}
                    className="group rounded-[18px] bg-white p-4 ring-1 ring-slate-200 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(11,60,109,0.12)]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm font-semibold text-[#1f2933]">{item.name}</span>
                      </div>
                      <span className="text-sm font-bold text-[#144272]">{item.value}</span>
                    </div>

                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full transition-all duration-700 group-hover:opacity-90"
                        style={{ width: `${percent}%`, backgroundColor: item.color }}
                      />
                    </div>

                    <p className="mt-1 text-xs text-[#52606d]">{percent}% share</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative rounded-[26px] bg-white/80 p-6 backdrop-blur-xl ring-1 ring-slate-200/70 shadow-[0_10px_30px_rgba(11,60,109,0.08)]">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-[#1f2933]">Distribution Chart</h4>
                <p className="mt-1 text-sm text-[#52606d]">Relative share of each programme.</p>
              </div>
              <div className="rounded-full bg-[#f5f7fa] px-3 py-1 text-xs font-semibold text-[#144272]">4 Programmes</div>
            </div>

            <div className="relative mt-6 h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={academicProgrammesData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={4}
                    stroke="#ffffff"
                    strokeWidth={3}
                  >
                    {academicProgrammesData.map((entry) => (
                      <Cell key={entry.key} fill={entry.color} />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value, name) => [`${value ?? 0} students`, name ?? "Programme"]}
                    contentStyle={{
                      borderRadius: "14px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 12px 30px rgba(11,60,109,0.15)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xs text-[#52606d]">Total</p>
                <p className="text-2xl font-bold text-[#1f2933]">
                  {academicProgrammesData.reduce((sum, item) => sum + item.value, 0)}
                </p>
                <p className="text-xs text-[#52606d]">Students</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

function BranchTab() {
  return (
    <section
      id="branch-panel"
      role="tabpanel"
      aria-labelledby="branch-tab"
      className="mx-auto w-full max-w-6xl rounded-[32px] border border-slate-200/70 bg-white p-8 shadow-[0_20px_50px_rgba(11,60,109,0.08)]"
    >
      <div className="flex min-h-[260px] items-center justify-center rounded-[24px] border-2 border-dashed border-[#2C74B3]/20 bg-[#f8fbff] text-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2C74B3]">Branch-wise Section</p>
          <h2 className="mt-2 text-2xl font-bold text-[#1f2933]">Branch content will come next</h2>
          <p className="mt-2 text-sm text-[#52606d]">We are currently focusing on the overall placement page first.</p>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return <OverallTab />;
}
