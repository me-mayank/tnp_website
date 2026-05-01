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
  { name: "Amazon", tone: "bg-white text-[#0b3c6d]" },
  { name: "TCS", tone: "bg-[#f4b400] text-[#0b3c6d]" },
  { name: "Infosys", tone: "bg-white/90 text-[#123a6f]" },
  { name: "Deloitte", tone: "bg-white text-[#0b3c6d]" },
  { name: "Accenture", tone: "bg-white/95 text-[#123a6f]" },
  { name: "Wipro", tone: "bg-[#eaf1fb] text-[#0b3c6d]" },
];

const placementOffersData = [
  { session: "2020-21", offers: 320, placed: 248 },
  { session: "2021-22", offers: 396, placed: 301 },
  { session: "2022-23", offers: 455, placed: 348 },
  { session: "2023-24", offers: 548, placed: 421 },
  { session: "2024-25", offers: 612, placed: 487 },
];

const compensationTrendData = [
  { session: "2020-21", highest: 28, median: 5.2, average: 6.4 },
  { session: "2021-22", highest: 32, median: 5.8, average: 7.1 },
  { session: "2022-23", highest: 38, median: 6.4, average: 7.8 },
  { session: "2023-24", highest: 44, median: 7.2, average: 8.3 },
  { session: "2024-25", highest: 54, median: 8.1, average: 8.9 },
];

const topPlacements = [
  { id: 1, name: "Aarav Singh", company: "Amazon", role: "SDE", package: "₹54 LPA", branch: "CSE" },
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
  { key: "btech", short: "B.Tech", name: "B.Tech", value: 541, color: "#b191d5" },
  { key: "mtech", short: "M.Tech", name: "M.Tech", value: 108, color: "#7199a8" },
  { key: "mca", short: "MCA", name: "MCA", value: 67, color: "#ee98b4" },
  { key: "mba", short: "MBA", name: "MBA", value: 57, color: "#f7c26b" },
];

const overallKpis = [
  { label: "Highest Package", value: "₹54 LPA", helperText: "Top offer across recent sessions", progress: "100%" },
  { label: "Average Package", value: "₹8.9 LPA", helperText: "Weighted average compensation", progress: "72%" },
  { label: "Placement Percentage", value: "87%", helperText: "Students placed from eligible batch", progress: "87%" },
  { label: "Total Offers", value: "612", helperText: "Offers received in 2024–25", progress: "100%" },
];

function CustomPlacementTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0]?.payload;
  const conversion = ((data.placed / data.offers) * 100).toFixed(1);

  return (
    <div className="min-w-[220px] rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_40px_rgba(11,60,109,0.14)]">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1f5aa6]">Session</p>
      <h4 className="mt-1 text-base font-bold text-[#1f2933]">{label}</h4>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#0b3c6d]" />
            <span className="text-sm text-[#52606d]">Total Offers</span>
          </div>
          <span className="text-sm font-semibold text-[#1f2933]">{data.offers}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#f4b400]" />
            <span className="text-sm text-[#52606d]">Students Placed</span>
          </div>
          <span className="text-sm font-semibold text-[#1f2933]">{data.placed}</span>
        </div>

        <div className="border-t border-slate-100 pt-3">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-[#52606d]">Placement Conversion</span>
            <span className="text-sm font-bold text-[#123a6f]">{conversion}%</span>
          </div>
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
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1f5aa6]">Session</p>
      <h4 className="mt-1 text-base font-bold text-[#1f2933]">{label}</h4>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#52606d]">Highest Package</span>
          <span className="text-sm font-bold text-[#0b3c6d]">₹{data.highest} LPA</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#52606d]">Median Package</span>
          <span className="text-sm font-bold text-[#f4b400]">₹{data.median} LPA</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#52606d]">Average Package</span>
          <span className="text-sm font-bold text-[#1f5aa6]">₹{data.average} LPA</span>
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
          className="group rounded-3xl border border-slate-200/70 bg-white p-5 shadow-[0_8px_24px_rgba(11,60,109,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(11,60,109,0.12)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#52606d]">{item.label}</p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-[#1f2933]">{item.value}</h3>
          <p className="mt-3 text-sm text-[#52606d]">{item.helperText}</p>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-[linear-gradient(135deg,#0b3c6d,#1f5aa6)]" style={{ width: item.progress }} />
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
      <section className="relative overflow-hidden rounded-[32px] border border-[#dbe4f0] bg-[linear-gradient(135deg,#0b3c6d,#123a6f,#1f5aa6)] shadow-[0_24px_60px_rgba(11,60,109,0.18)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,180,0,0.16),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.10),transparent_30%)]" />
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
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex min-h-[320px] items-center justify-center lg:min-h-[360px]">
            <div className="relative h-full w-full max-w-[460px]">
              <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(244,180,0,0.32),rgba(244,180,0,0.04),transparent_70%)] blur-2xl" />

              <div className="absolute right-8 top-0 z-10 rounded-[24px] border border-white/15 bg-white/10 px-5 py-4 text-white shadow-[0_18px_40px_rgba(3,20,38,0.2)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">Highlight</p>
                <p className="mt-2 text-3xl font-bold tracking-tight">₹54 LPA</p>
                <p className="mt-1 text-sm text-white/75">Highest package offered</p>
              </div>

              <div className="absolute left-0 top-10 z-10 w-[150px] rounded-[22px] border border-white/15 bg-white/10 p-4 text-white shadow-[0_18px_40px_rgba(3,20,38,0.18)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">Active Hiring</p>
                <p className="mt-2 text-2xl font-bold">120+</p>
                <p className="mt-1 text-xs text-white/75">Participating companies</p>
              </div>

              <div className="absolute bottom-0 right-2 z-10 w-[190px] rounded-[24px] border border-white/15 bg-white/10 p-4 shadow-[0_18px_40px_rgba(3,20,38,0.18)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">Placement Rate</p>
                <p className="mt-2 text-3xl font-bold text-white">87%</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full w-[87%] rounded-full bg-[#f4b400]" />
                </div>
              </div>

              <div className="absolute left-1/2 top-1/2 z-10 w-full max-w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-white/15 bg-white/10 p-5 shadow-[0_22px_50px_rgba(3,20,38,0.22)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1">
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
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1f5aa6]">PLACEMENT OFFERS</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#1f2933]">Session-wise Placement Offers</h3>
            <p className="mt-2 text-sm text-[#52606d]">Placement offers across recent academic sessions.</p>
          </div>

          <div className="inline-flex w-fit items-center rounded-full bg-[#f5f7fa] px-4 py-2 text-sm font-semibold text-[#123a6f] ring-1 ring-slate-200/70">
            5 Academic Sessions
          </div>
        </div>

        <div className="mt-8 h-[400px] w-full rounded-[24px] bg-[#fcfdff] p-4 sm:p-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={placementOffersData} barCategoryGap="22%" margin={{ top: 16, right: 12, left: 0, bottom: 8 }}>
              <defs>
                <linearGradient id="offersGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1f5aa6" />
                  <stop offset="100%" stopColor="#0b3c6d" />
                </linearGradient>
                <linearGradient id="placedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffd54a" />
                  <stop offset="100%" stopColor="#f4b400" />
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
              <Bar dataKey="placed" name="Students Placed" fill="url(#placedGradient)" radius={[10, 10, 0, 0]} maxBarSize={34} />
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
                <Line type="monotone" dataKey="highest" name="Highest" stroke="#0b3c6d" strokeWidth={3} dot={{ r: 4, fill: "#0b3c6d", strokeWidth: 0 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="median" name="Median" stroke="#f4b400" strokeWidth={3} dot={{ r: 4, fill: "#f4b400", strokeWidth: 0 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="average" name="Average" stroke="#1f5aa6" strokeWidth={3} dot={{ r: 4, fill: "#1f5aa6", strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[30px] bg-white p-6 shadow-[0_18px_50px_rgba(11,60,109,0.10)] ring-1 ring-slate-200/70 sm:p-7">
          <ChartCardTitle
            title="Top 20 Student Placements"
            subtitle="Highest-value student offers with recruiter, role, and branch details."
          />

          <div className="top-placements-scroll mt-6 max-h-[400px] space-y-3 overflow-y-auto pr-2 [scrollbar-width:thin] [scrollbar-color:#1f5aa6_#eaf1fb]">
            {topPlacements.map((student, index) => (
              <div
                key={student.id}
                className="group rounded-[22px] border border-slate-200/70 bg-[#fcfdff] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#1f5aa6]/20 hover:shadow-[0_12px_30px_rgba(11,60,109,0.10)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eaf1fb] text-xs font-bold text-[#0b3c6d]">
                        {index + 1}
                      </div>
                      <h4 className="text-sm font-bold text-[#1f2933]">{student.name}</h4>
                    </div>

                    <p className="mt-3 text-sm font-semibold text-[#0b3c6d]">{student.company}</p>
                    <p className="mt-1 text-xs text-[#52606d]">
                      {student.role} • {student.branch}
                    </p>
                  </div>

                  <div className="rounded-full bg-[#fff6db] px-3 py-1 text-sm font-bold text-[#9a6a00]">
                    {student.package}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#f8fbff] to-white p-6 shadow-[0_25px_60px_rgba(11,60,109,0.12)] ring-1 ring-slate-200/60 sm:p-8">
        <div className="absolute -top-20 -right-20 h-[300px] w-[300px] rounded-full bg-[#1f5aa6]/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-[260px] w-[260px] rounded-full bg-[#f4b400]/10 blur-3xl" />

        <div className="relative flex flex-col gap-4 border-b border-slate-200/60 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1f5aa6]">Academic Programmes</p>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-[#1f2933]">Programme Distribution</h3>
            <p className="mt-2 max-w-2xl text-sm text-[#52606d]">Student distribution across major academic programmes.</p>
          </div>

          <div className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#123a6f] shadow-sm ring-1 ring-slate-200">
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
                      <span className="text-sm font-bold text-[#123a6f]">{item.value}</span>
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
              <div className="rounded-full bg-[#f5f7fa] px-3 py-1 text-xs font-semibold text-[#123a6f]">4 Programmes</div>
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
      <div className="flex min-h-[260px] items-center justify-center rounded-[24px] border-2 border-dashed border-[#1f5aa6]/20 bg-[#f8fbff] text-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1f5aa6]">Branch-wise Section</p>
          <h2 className="mt-2 text-2xl font-bold text-[#1f2933]">Branch content will come next</h2>
          <p className="mt-2 text-sm text-[#52606d]">We are currently focusing on the overall placement page first.</p>
        </div>
      </div>
    </section>
  );
}

export default function PlacementTabsOnly() {
  const router = useRouter();
  const pathname = usePathname();
  const isBranchRoute = pathname.includes("branchwise");

  return (
    <div className="mt-4 w-full space-y-6">
      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-[28px] border border-white/60 bg-white/80 p-2 shadow-[0_20px_60px_rgba(11,60,109,0.12)] backdrop-blur-xl">

          <div
            role="tablist"
            aria-label="Placement statistics tabs"
            className="relative grid grid-cols-2 rounded-[22px] bg-gradient-to-r from-slate-100 to-slate-50 p-1.5 overflow-hidden"
          >

            {/* 🔥 Sliding Indicator */}
            <div
              className={`
              absolute top-1.5 left-1.5
              h-[calc(100%-12px)]
              w-[calc(50%-6px)]
              rounded-[18px]
              bg-[linear-gradient(135deg,#0b3c6d,#1f5aa6)]
              shadow-[0_10px_30px_rgba(11,60,109,0.28)]

              transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
              will-change-transform

              ${isBranchRoute ? "translate-x-[calc(100%+6px)]" : "translate-x-0"}
            `}
            />

            {tabs.map((tab) => {
              const isBranch = tab.key === "branch";

              const isActive =
                (tab.key === "overall" && !isBranchRoute) ||
                (tab.key === "branch" && isBranchRoute);

              return (
                <button
                  key={tab.key}
                  role="tab"
                  onClick={() => {
                    if (isBranch) {
                      router.push("/recruiters/demographic/branchwise");
                    } else {
                      router.push("/recruiters/demographic");
                    }
                  }}
                  className={`
                  relative z-10 flex min-h-[58px] items-center justify-center rounded-[18px] px-4 sm:px-6
                  text-center text-sm font-semibold tracking-[-0.01em]
                  transition-all duration-300

                  ${isActive
                      ? "text-white scale-[1.03]"
                      : "text-[#52606d] hover:text-[#1f2933]"
                    }
                `}
                >
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.short}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl pb-20">
        <OverallTab />
      </div>
    </div>
    
  );
}