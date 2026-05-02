"use client";

import { useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
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

const tabs: { key: TabKey; label: string; short: string }[] = [
    { key: "overall", label: "Overall Placement Statistics", short: "Overall" },
    { key: "branch", label: "Branch-wise Placement Statistics", short: "Branch-wise" },
];

const branches = [
    { key: "cse", label: "Computer Science Engineering" },
    { key: "ece", label: "Electronics & Communication Engineering" },
    { key: "ee", label: "Electrical Engineering" },
    { key: "me", label: "Mechanical Engineering" },
    { key: "ce", label: "Civil Engineering" },
    { key: "che", label: "Chemical Engineering" },
];

const branchPlacementOffers: Record<
    string,
    { session: string; offers: number; placed: number }[]
> = {
    cse: [
        { session: "2020-21", offers: 312, placed: 241 },
        { session: "2021-22", offers: 396, placed: 301 },
        { session: "2022-23", offers: 452, placed: 348 },
        { session: "2023-24", offers: 541, placed: 412 },
        { session: "2024-25", offers: 608, placed: 487 },
    ],
    ece: [
        { session: "2020-21", offers: 182, placed: 126 },
        { session: "2021-22", offers: 214, placed: 158 },
        { session: "2022-23", offers: 248, placed: 181 },
        { session: "2023-24", offers: 276, placed: 206 },
        { session: "2024-25", offers: 304, placed: 231 },
    ],
    ee: [
        { session: "2020-21", offers: 141, placed: 96 },
        { session: "2021-22", offers: 169, placed: 118 },
        { session: "2022-23", offers: 193, placed: 133 },
        { session: "2023-24", offers: 221, placed: 156 },
        { session: "2024-25", offers: 246, placed: 174 },
    ],
    me: [
        { session: "2020-21", offers: 126, placed: 84 },
        { session: "2021-22", offers: 153, placed: 101 },
        { session: "2022-23", offers: 171, placed: 116 },
        { session: "2023-24", offers: 196, placed: 134 },
        { session: "2024-25", offers: 219, placed: 149 },
    ],
    ce: [
        { session: "2020-21", offers: 84, placed: 57 },
        { session: "2021-22", offers: 103, placed: 71 },
        { session: "2022-23", offers: 117, placed: 83 },
        { session: "2023-24", offers: 132, placed: 95 },
        { session: "2024-25", offers: 148, placed: 109 },
    ],
    che: [
        { session: "2020-21", offers: 73, placed: 49 },
        { session: "2021-22", offers: 88, placed: 62 },
        { session: "2022-23", offers: 97, placed: 70 },
        { session: "2023-24", offers: 111, placed: 81 },
        { session: "2024-25", offers: 124, placed: 91 },
    ],
};

const branchPlacementTrendData: Record<
    string,
    { session: string; highest: number; median: number; average: number }[]
> = {
    cse: [
        { session: "2020-21", highest: 18.4, median: 10.2, average: 8.7 },
        { session: "2021-22", highest: 22.1, median: 11.8, average: 9.6 },
        { session: "2022-23", highest: 25.6, median: 13.2, average: 10.8 },
        { session: "2023-24", highest: 28.9, median: 14.5, average: 11.9 },
        { session: "2024-25", highest: 32.4, median: 16.1, average: 13.5 },
    ],
    ece: [
        { session: "2020-21", highest: 14.2, median: 8.1, average: 6.9 },
        { session: "2021-22", highest: 16.8, median: 9.0, average: 7.5 },
        { session: "2022-23", highest: 19.5, median: 10.4, average: 8.3 },
        { session: "2023-24", highest: 21.6, median: 11.3, average: 9.1 },
        { session: "2024-25", highest: 24.0, median: 12.2, average: 10.0 },
    ],
    ee: [
        { session: "2020-21", highest: 13.0, median: 7.4, average: 6.2 },
        { session: "2021-22", highest: 15.1, median: 8.2, average: 6.8 },
        { session: "2022-23", highest: 17.7, median: 9.4, average: 7.5 },
        { session: "2023-24", highest: 19.8, median: 10.1, average: 8.2 },
        { session: "2024-25", highest: 22.3, median: 11.0, average: 9.0 },
    ],
    me: [
        { session: "2020-21", highest: 9.5, median: 5.6, average: 4.8 },
        { session: "2021-22", highest: 11.2, median: 6.2, average: 5.4 },
        { session: "2022-23", highest: 13.0, median: 7.0, average: 6.0 },
        { session: "2023-24", highest: 14.6, median: 7.8, average: 6.6 },
        { session: "2024-25", highest: 16.1, median: 8.4, average: 7.2 },
    ],
    ce: [
        { session: "2020-21", highest: 8.8, median: 5.1, average: 4.4 },
        { session: "2021-22", highest: 10.1, median: 5.8, average: 5.0 },
        { session: "2022-23", highest: 11.7, median: 6.5, average: 5.5 },
        { session: "2023-24", highest: 13.4, median: 7.1, average: 6.1 },
        { session: "2024-25", highest: 15.0, median: 7.8, average: 6.7 },
    ],
    che: [
        { session: "2020-21", highest: 10.3, median: 5.9, average: 5.1 },
        { session: "2021-22", highest: 12.0, median: 6.6, average: 5.7 },
        { session: "2022-23", highest: 13.8, median: 7.3, average: 6.3 },
        { session: "2023-24", highest: 15.2, median: 8.0, average: 6.9 },
        { session: "2024-25", highest: 17.0, median: 8.7, average: 7.5 },
    ],
};

const branchDocuments: Record<
    string,
    {
        id: number;
        title: string;
        type: string;
        description: string;
        format: string;
        year?: string;
        url: string;
    }[]
> = {
    cse: [
        {
            id: 1,
            title: "CSE Academic Calendar",
            type: "Academic Calendar",
            description: "Common academic calendar for Computer Science Engineering.",
            format: "PDF",
            url: "/pdfs/cse/academic-calendar.pdf",
        },
        {
            id: 2,
            title: "CSE 1st Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for first year students of Computer Science Engineering.",
            format: "PDF",
            year: "1st Year",
            url: "/pdfs/cse/syllabus-1st-year.pdf",
        },
        {
            id: 3,
            title: "CSE 2nd Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for second year students of Computer Science Engineering.",
            format: "PDF",
            year: "2nd Year",
            url: "/pdfs/cse/syllabus-2nd-year.pdf",
        },
        {
            id: 4,
            title: "CSE 3rd Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for third year students of Computer Science Engineering.",
            format: "PDF",
            year: "3rd Year",
            url: "/pdfs/cse/syllabus-3rd-year.pdf",
        },
        {
            id: 5,
            title: "CSE 4th Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for fourth year students of Computer Science Engineering.",
            format: "PDF",
            year: "4th Year",
            url: "/pdfs/cse/syllabus-4th-year.pdf",
        },
    ],

    ece: [
        {
            id: 1,
            title: "ECE Academic Calendar",
            type: "Academic Calendar",
            description: "Common academic calendar for Electronics & Communication Engineering.",
            format: "PDF",
            url: "/pdfs/ece/academic-calendar.pdf",
        },
        {
            id: 2,
            title: "ECE 1st Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for first year students of Electronics & Communication Engineering.",
            format: "PDF",
            year: "1st Year",
            url: "/pdfs/ece/syllabus-1st-year.pdf",
        },
        {
            id: 3,
            title: "ECE 2nd Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for second year students of Electronics & Communication Engineering.",
            format: "PDF",
            year: "2nd Year",
            url: "/pdfs/ece/syllabus-2nd-year.pdf",
        },
        {
            id: 4,
            title: "ECE 3rd Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for third year students of Electronics & Communication Engineering.",
            format: "PDF",
            year: "3rd Year",
            url: "/pdfs/ece/syllabus-3rd-year.pdf",
        },
        {
            id: 5,
            title: "ECE 4th Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for fourth year students of Electronics & Communication Engineering.",
            format: "PDF",
            year: "4th Year",
            url: "/pdfs/ece/syllabus-4th-year.pdf",
        },
    ],

    ee: [
        {
            id: 1,
            title: "EE Academic Calendar",
            type: "Academic Calendar",
            description: "Common academic calendar for Electrical Engineering.",
            format: "PDF",
            url: "/pdfs/ee/academic-calendar.pdf",
        },
        {
            id: 2,
            title: "EE 1st Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for first year students of Electrical Engineering.",
            format: "PDF",
            year: "1st Year",
            url: "/pdfs/ee/syllabus-1st-year.pdf",
        },
        {
            id: 3,
            title: "EE 2nd Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for second year students of Electrical Engineering.",
            format: "PDF",
            year: "2nd Year",
            url: "/pdfs/ee/syllabus-2nd-year.pdf",
        },
        {
            id: 4,
            title: "EE 3rd Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for third year students of Electrical Engineering.",
            format: "PDF",
            year: "3rd Year",
            url: "/pdfs/ee/syllabus-3rd-year.pdf",
        },
        {
            id: 5,
            title: "EE 4th Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for fourth year students of Electrical Engineering.",
            format: "PDF",
            year: "4th Year",
            url: "/pdfs/ee/syllabus-4th-year.pdf",
        },
    ],

    me: [
        {
            id: 1,
            title: "ME Academic Calendar",
            type: "Academic Calendar",
            description: "Common academic calendar for Mechanical Engineering.",
            format: "PDF",
            url: "/pdfs/me/academic-calendar.pdf",
        },
        {
            id: 2,
            title: "ME 1st Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for first year students of Mechanical Engineering.",
            format: "PDF",
            year: "1st Year",
            url: "/pdfs/me/syllabus-1st-year.pdf",
        },
        {
            id: 3,
            title: "ME 2nd Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for second year students of Mechanical Engineering.",
            format: "PDF",
            year: "2nd Year",
            url: "/pdfs/me/syllabus-2nd-year.pdf",
        },
        {
            id: 4,
            title: "ME 3rd Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for third year students of Mechanical Engineering.",
            format: "PDF",
            year: "3rd Year",
            url: "/pdfs/me/syllabus-3rd-year.pdf",
        },
        {
            id: 5,
            title: "ME 4th Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for fourth year students of Mechanical Engineering.",
            format: "PDF",
            year: "4th Year",
            url: "/pdfs/me/syllabus-4th-year.pdf",
        },
    ],

    ce: [
        {
            id: 1,
            title: "CE Academic Calendar",
            type: "Academic Calendar",
            description: "Common academic calendar for Civil Engineering.",
            format: "PDF",
            url: "/pdfs/ce/academic-calendar.pdf",
        },
        {
            id: 2,
            title: "CE 1st Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for first year students of Civil Engineering.",
            format: "PDF",
            year: "1st Year",
            url: "/pdfs/ce/syllabus-1st-year.pdf",
        },
        {
            id: 3,
            title: "CE 2nd Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for second year students of Civil Engineering.",
            format: "PDF",
            year: "2nd Year",
            url: "/pdfs/ce/syllabus-2nd-year.pdf",
        },
        {
            id: 4,
            title: "CE 3rd Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for third year students of Civil Engineering.",
            format: "PDF",
            year: "3rd Year",
            url: "/pdfs/ce/syllabus-3rd-year.pdf",
        },
        {
            id: 5,
            title: "CE 4th Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for fourth year students of Civil Engineering.",
            format: "PDF",
            year: "4th Year",
            url: "/pdfs/ce/syllabus-4th-year.pdf",
        },
    ],

    che: [
        {
            id: 1,
            title: "CHE Academic Calendar",
            type: "Academic Calendar",
            description: "Common academic calendar for Chemical Engineering.",
            format: "PDF",
            url: "/pdfs/che/academic-calendar.pdf",
        },
        {
            id: 2,
            title: "CHE 1st Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for first year students of Chemical Engineering.",
            format: "PDF",
            year: "1st Year",
            url: "/pdfs/che/syllabus-1st-year.pdf",
        },
        {
            id: 3,
            title: "CHE 2nd Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for second year students of Chemical Engineering.",
            format: "PDF",
            year: "2nd Year",
            url: "/pdfs/che/syllabus-2nd-year.pdf",
        },
        {
            id: 4,
            title: "CHE 3rd Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for third year students of Chemical Engineering.",
            format: "PDF",
            year: "3rd Year",
            url: "/pdfs/che/syllabus-3rd-year.pdf",
        },
        {
            id: 5,
            title: "CHE 4th Year Syllabus",
            type: "Syllabus",
            description: "Detailed syllabus for fourth year students of Chemical Engineering.",
            format: "PDF",
            year: "4th Year",
            url: "/pdfs/che/syllabus-4th-year.pdf",
        },
    ],
};

const branchAchievementStats: Record<
    string,
    { label: string; value: string }[]
> = {
    cse: [
        { label: "Placements", value: "92%" },
        { label: "Top Package", value: "₹32 LPA" },
        { label: "Internships", value: "140+" },
        { label: "Projects", value: "80+" },
    ],
    ece: [
        { label: "Placements", value: "88%" },
        { label: "Top Package", value: "₹28 LPA" },
        { label: "Internships", value: "110+" },
        { label: "Projects", value: "65+" },
    ],
    ee: [
        { label: "Placements", value: "85%" },
        { label: "Top Package", value: "₹24 LPA" },
        { label: "Internships", value: "90+" },
        { label: "Projects", value: "58+" },
    ],
    me: [
        { label: "Placements", value: "84%" },
        { label: "Top Package", value: "₹22 LPA" },
        { label: "Internships", value: "95+" },
        { label: "Projects", value: "70+" },
    ],
    ce: [
        { label: "Placements", value: "81%" },
        { label: "Top Package", value: "₹20 LPA" },
        { label: "Internships", value: "75+" },
        { label: "Projects", value: "60+" },
    ],
    che: [
        { label: "Placements", value: "79%" },
        { label: "Top Package", value: "₹18 LPA" },
        { label: "Internships", value: "68+" },
        { label: "Projects", value: "52+" },
    ],
};

const branchAchievements: Record<
    string,
    {
        id: number;
        category: string;
        title: string;
        subtitle: string;
        person?: string;
        meta?: string;
        description: string;
        image: string;
    }[]
> = {
    cse: [
        {
            id: 1,
            category: "Exams",
            title: "AIR 12 - GATE 2026",
            subtitle: "Excellence in Graduate Aptitude Test in Engineering",
            person: "Ananya Sharma",
            meta: "B.Tech CSE, 2022-26",
            description: "Achieved 99.8 percentile with outstanding performance in algorithms, OS, and DBMS.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
        },
        {
            id: 2,
            category: "Hackathons",
            title: "Winner: Smart India Hackathon",
            subtitle: "Grand Finale Winner - AI & ML Track",
            person: "Team CodeNova",
            meta: "National Finalists 2024",
            description: "Built an AI-powered grievance redressal platform for rural service delivery.",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
        },
        {
            id: 3,
            category: "Coding",
            title: "ICPC Regionals Rank 5",
            subtitle: "Kolkata Regional Contest",
            person: "Team Algorithm Aces",
            meta: "Qualified for Asia-Pacific round",
            description: "Demonstrated excellent competitive programming and problem-solving consistency.",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
        },
        {
            id: 4,
            category: "Research",
            title: "Best AI Research Paper",
            subtitle: "International Conference Recognition",
            person: "Innovation Lab",
            meta: "Research Output 2024",
            description: "Student-faculty team published impactful work in applied machine learning systems.",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
        },
    ],

    ece: [
        {
            id: 1,
            category: "Exams",
            title: "Top GATE ECE Rank",
            subtitle: "Outstanding score in Electronics Engineering",
            person: "Riya Verma",
            meta: "B.Tech ECE, 2022-26",
            description: "Secured a top national score with strong performance in signals and communication.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80",
        },
        {
            id: 2,
            category: "Hackathons",
            title: "Winner: Embedded Systems Challenge",
            subtitle: "IoT and Smart Devices Track",
            person: "Team Circuit Minds",
            meta: "Intercollege Champions",
            description: "Designed a smart monitoring device integrating embedded sensors and cloud analytics.",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
        },
        {
            id: 3,
            category: "Core Engineering",
            title: "Best VLSI Design Project",
            subtitle: "Recognized in national electronics showcase",
            person: "ECE Design Group",
            meta: "Innovation Expo 2024",
            description: "Presented a compact low-power chip design prototype for edge applications.",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
        },
        {
            id: 4,
            category: "Research",
            title: "Signal Processing Publication",
            subtitle: "High-impact academic contribution",
            person: "Research Cluster",
            meta: "2024 Publication Cycle",
            description: "Published research on adaptive filtering and communication reliability models.",
            image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=80",
        },
    ],

    ee: [
        {
            id: 1,
            category: "Exams",
            title: "GATE Power Systems Topper",
            subtitle: "Excellent result in core EE disciplines",
            person: "Aditya Singh",
            meta: "B.Tech EE, 2022-26",
            description: "Achieved exceptional marks in power systems, control systems, and machines.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
        },
        {
            id: 2,
            category: "Government Exams",
            title: "Multiple PSU Selections",
            subtitle: "Strong public sector recruitment outcomes",
            person: "EE Placement Cohort",
            meta: "Selections 2024",
            description: "Students secured offers in power and utility sector examinations and interviews.",
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
        },
        {
            id: 3,
            category: "Core Engineering",
            title: "Best Smart Grid Prototype",
            subtitle: "National innovation award",
            person: "Energy Systems Team",
            meta: "Prototype Showcase",
            description: "Developed a real-time smart grid monitoring prototype with energy optimization logic.",
            image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80",
        },
        {
            id: 4,
            category: "Research",
            title: "Automation Systems Publication",
            subtitle: "Recognition for applied electrical research",
            person: "Advanced Control Lab",
            meta: "Published Work 2024",
            description: "Research focused on automation, distributed control, and sustainable power integration.",
            image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80",
        },
    ],

    me: [
        {
            id: 1,
            category: "Exams",
            title: "GATE Mechanical High Score",
            subtitle: "Top performance in core mechanical engineering",
            person: "Karan Patel",
            meta: "B.Tech ME, 2022-26",
            description: "Delivered excellent performance across thermodynamics, SOM, and manufacturing.",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
        },
        {
            id: 2,
            category: "Design",
            title: "Best CAD Innovation Award",
            subtitle: "National mechanical design competition",
            person: "Team Torque Labs",
            meta: "Design Challenge 2024",
            description: "Built a precision-focused industrial assembly concept with optimized manufacturability.",
            image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=900&q=80",
        },
        {
            id: 3,
            category: "Hackathons",
            title: "Prototype Build Challenge Winner",
            subtitle: "Rapid engineering and fabrication event",
            person: "Team MechX",
            meta: "Annual Build Sprint",
            description: "Created a working prototype under time constraints with strong design validation.",
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
        },
        {
            id: 4,
            category: "Research",
            title: "Thermal Systems Research Recognition",
            subtitle: "Awarded for simulation-driven analysis",
            person: "Mechanical Research Unit",
            meta: "Publication & Poster 2024",
            description: "Presented high-quality work in heat transfer optimization and system efficiency.",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
        },
    ],

    ce: [
        {
            id: 1,
            category: "Exams",
            title: "Top GATE Civil Result",
            subtitle: "Strong performance in structural and geotechnical areas",
            person: "Sneha Tiwari",
            meta: "B.Tech CE, 2022-26",
            description: "Achieved top percentile through strong command in structures, survey, and environment.",
            image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80",
        },
        {
            id: 2,
            category: "Core Engineering",
            title: "Best Structural Design Award",
            subtitle: "Recognized in national civil design contest",
            person: "Team InfraVision",
            meta: "Structural Challenge 2024",
            description: "Designed a resilient and sustainable urban structure model with practical feasibility.",
            image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
        },
        {
            id: 3,
            category: "Government Exams",
            title: "Excellent Public Exam Outcomes",
            subtitle: "Technical and administrative selections",
            person: "CE Scholars Group",
            meta: "Selections 2024",
            description: "Students recorded strong results in public sector and engineering service pathways.",
            image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
        },
        {
            id: 4,
            category: "Research",
            title: "Sustainable Materials Publication",
            subtitle: "Innovation in construction materials",
            person: "Civil Research Cell",
            meta: "Research Highlights 2024",
            description: "Published work on green materials and improved durability in infrastructure systems.",
            image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=900&q=80",
        },
    ],

    che: [
        {
            id: 1,
            category: "Exams",
            title: "Top GATE Chemical Score",
            subtitle: "Excellent outcome in process and reaction engineering",
            person: "Muskan Rao",
            meta: "B.Tech CHE, 2022-26",
            description: "Achieved a top score through strong conceptual clarity in chemical engineering core subjects.",
            image: "https://images.unsplash.com/photo-1494790108755-2616b332c1bb?auto=format&fit=crop&w=900&q=80",
        },
        {
            id: 2,
            category: "Core Engineering",
            title: "Best Process Innovation Award",
            subtitle: "Recognized for industrial problem-solving",
            person: "Team ProcessFlow",
            meta: "Innovation Challenge 2024",
            description: "Proposed a scalable process optimization model for sustainable industrial operations.",
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
        },
        {
            id: 3,
            category: "Hackathons",
            title: "Green Process Hackathon Winner",
            subtitle: "Sustainability and efficiency track",
            person: "Team ChemNova",
            meta: "National Level Finalist",
            description: "Built a solution around waste reduction and process efficiency in manufacturing.",
            image: "https://images.unsplash.com/photo-1522202222206-b7505054a8ea?auto=format&fit=crop&w=900&q=80",
        },
        {
            id: 4,
            category: "Research",
            title: "Best Paper in Process Engineering",
            subtitle: "Recognized at technical symposium",
            person: "CHE Research Group",
            meta: "Published Work 2024",
            description: "Presented research on reaction systems, sustainability, and plant optimization.",
            image: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=900&q=80",
        },
    ],
};

function CustomPlacementTooltip({
    active,
    payload,
    label,
}: {
    active?: boolean;
    payload?: { name: string; value: number; color: string }[];
    label?: string;
}) {
    if (!active || !payload || !payload.length) return null;

    const offers = payload.find((item) => item.name === "Total Offers")?.value ?? 0;
    const placed = payload.find((item) => item.name === "Students Placed")?.value ?? 0;
    const conversion = offers ? ((placed / offers) * 100).toFixed(1) : "0.0";

    return (
        <div className="min-w-[290px] rounded-[28px] border border-slate-200/80 bg-white px-5 py-5 shadow-[0_28px_70px_rgba(11,60,109,0.16)]">
            <p className="text-xs font-semibold uppercase tracking-[0.20em] text-[#1f5aa6]">
                Session
            </p>
            <h4 className="mt-2 text-[18px] font-bold text-[#1f2933]">{label}</h4>

            <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between gap-8">
                    <div className="flex items-center gap-3">
                        <span className="h-3.5 w-3.5 rounded-full bg-[#1f5aa6]" />
                        <span className="text-sm text-[#52606d]">Total Offers</span>
                    </div>
                    <span className="text-sm font-bold text-[#1f2933]">{offers}</span>
                </div>

                <div className="flex items-center justify-between gap-8">
                    <div className="flex items-center gap-3">
                        <span className="h-3.5 w-3.5 rounded-full bg-[#f4b400]" />
                        <span className="text-sm text-[#52606d]">Students Placed</span>
                    </div>
                    <span className="text-sm font-bold text-[#1f2933]">{placed}</span>
                </div>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between gap-8">
                    <span className="text-sm text-[#52606d]">Placement Conversion</span>
                    <span className="text-sm font-bold text-[#123a6f]">{conversion}%</span>
                </div>
            </div>
        </div>
    );
}

function CustomCompensationTooltip({
    active,
    payload,
    label,
}: {
    active?: boolean;
    payload?: { name: string; value: number; color: string }[];
    label?: string;
}) {
    if (!active || !payload || !payload.length) return null;

    return (
        <div className="min-w-[290px] rounded-[28px] border border-slate-200/80 bg-white px-5 py-5 shadow-[0_28px_70px_rgba(11,60,109,0.16)]">
            <p className="text-xs font-semibold uppercase tracking-[0.20em] text-[#1f5aa6]">
                Session
            </p>
            <h4 className="mt-2 text-[18px] font-bold text-[#1f2933]">{label}</h4>
        </div>
    );
}

export default function PlacementTabsOnly() {
    const router = useRouter();
    const pathname = usePathname() ?? "";
    const isBranchRoute = pathname.includes("branchwise");

    const [isBranchMenuOpen, setIsBranchMenuOpen] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState("cse");

    const activeBranch = useMemo(
        () => branches.find((branch) => branch.key === selectedBranch) || branches[0],
        [selectedBranch]
    );

    const placementOffersData = useMemo(
        () => branchPlacementOffers[selectedBranch] || branchPlacementOffers.cse,
        [selectedBranch]
    );

    return (
        <div className="mt-4 w-full space-y-6">
            <div className="mx-auto w-full max-w-3xl">
                <div className="rounded-[28px] border border-white/60 bg-white/80 p-2 shadow-[0_20px_60px_rgba(11,60,109,0.12)] backdrop-blur-xl">
                    <div
                        role="tablist"
                        aria-label="Placement statistics tabs"
                        className="grid grid-cols-2 rounded-[22px] bg-gradient-to-r from-slate-100 to-slate-50 p-1.5"
                    >
                        {tabs.map((tab) => {
                            const isBranch = tab.key === "branch";
                            const isActive =
                                (tab.key === "overall" && !isBranchRoute) ||
                                (tab.key === "branch" && isBranchRoute);

                            return (
                                <button
                                    key={tab.key}
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => {
                                        if (isBranch) {
                                            router.push("/recruiters/demographic/branchwise");
                                        } else {
                                            router.push("/recruiters/demographic");
                                        }
                                    }}
                                    className={[
                                        "flex min-h-[58px] items-center justify-center rounded-[18px] px-4 sm:px-6",
                                        "text-center text-sm font-semibold tracking-[-0.01em] transition-all duration-300",
                                        isActive
                                            ? "bg-[linear-gradient(135deg,#0b3c6d,#1f5aa6)] text-white shadow-[0_10px_30px_rgba(11,60,109,0.28)]"
                                            : "bg-transparent text-[#52606d] hover:bg-white hover:shadow-md",
                                    ].join(" ")}
                                >
                                    <span className="hidden sm:inline">{tab.label}</span>
                                    <span className="sm:hidden">{tab.short}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {isBranchRoute && (
                <div className="mx-auto w-full max-w-3xl">
                    <div className="relative">
                        <label className="mb-2 block text-sm font-semibold text-[#123a6f]">
                            Select Branch
                        </label>

                        <button
                            type="button"
                            role="combobox"
                            aria-expanded={isBranchMenuOpen}
                            aria-controls="branch-listbox"
                            onClick={() => setIsBranchMenuOpen((prev) => !prev)}
                            className="flex min-h-[56px] w-full items-center justify-between rounded-[20px] border border-slate-200/80 bg-white px-5 py-3 text-left shadow-[0_12px_30px_rgba(11,60,109,0.08)] transition-all duration-300 hover:border-[#1f5aa6]/30 hover:shadow-[0_16px_36px_rgba(11,60,109,0.12)]"
                        >
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#52606d]">
                                    Branch
                                </p>
                                <p className="mt-1 text-sm font-semibold text-[#1f2933]">
                                    {activeBranch.label}
                                </p>
                            </div>

                            <ChevronDown
                                className={`h-5 w-5 text-[#52606d] transition-transform duration-300 ${isBranchMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {isBranchMenuOpen && (
                            <div
                                id="branch-listbox"
                                role="listbox"
                                className="absolute z-30 mt-3 w-full overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(11,60,109,0.14)]"
                            >
                                <div className="max-h-[320px] overflow-y-auto p-2">
                                    {branches.map((branch) => {
                                        const isSelected = selectedBranch === branch.key;

                                        return (
                                            <button
                                                key={branch.key}
                                                type="button"
                                                role="option"
                                                aria-selected={isSelected}
                                                onClick={() => {
                                                    setSelectedBranch(branch.key);
                                                    setIsBranchMenuOpen(false);
                                                }}
                                                className={`flex w-full items-center justify-between rounded-[16px] px-4 py-3 text-left transition-all duration-200 ${isSelected
                                                    ? "bg-[#eaf1fb] text-[#0b3c6d]"
                                                    : "text-[#52606d] hover:bg-slate-50 hover:text-[#1f2933]"
                                                    }`}
                                            >
                                                <span className="text-sm font-medium">{branch.label}</span>
                                                {isSelected && <Check className="h-4 w-4 text-[#0b3c6d]" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {isBranchRoute && (
                <section className="mx-auto max-w-7xl rounded-[34px] border border-slate-200/70 bg-white p-6 shadow-[0_20px_60px_rgba(11,60,109,0.08)] sm:p-8">
                    <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.20em] text-[#1f5aa6]">
                                PLACEMENT OFFERS
                            </p>
                            <h3 className="mt-3 text-[30px] font-bold tracking-[-0.03em] text-[#1f2933] sm:text-[34px]">
                                Session-wise Placement Offers
                            </h3>
                            <p className="mt-2 text-sm text-[#52606d] sm:text-base">
                                Placement offers across recent academic sessions for {activeBranch.label}.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 rounded-[30px] bg-[#fcfdff] p-4 sm:p-6">
                        <div className="h-[470px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={placementOffersData}
                                    barGap={18}
                                    barCategoryGap="28%"
                                    margin={{ top: 36, right: 22, left: 16, bottom: 6 }}
                                >
                                    <defs>
                                        <linearGradient id="offersGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#2f67b2" />
                                            <stop offset="100%" stopColor="#133f73" />
                                        </linearGradient>

                                        <linearGradient id="placedGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#ffd54a" />
                                            <stop offset="100%" stopColor="#ffbf00" />
                                        </linearGradient>
                                    </defs>

                                    <CartesianGrid
                                        strokeDasharray="3 5"
                                        vertical={false}
                                        stroke="#e8eef6"
                                    />

                                    <XAxis
                                        dataKey="session"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={10}
                                        tick={{ fill: "#52606d", fontSize: 14, fontWeight: 500 }}
                                    />

                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={10}
                                        width={52}
                                        tick={{ fill: "#52606d", fontSize: 14 }}
                                    />

                                    <Tooltip
                                        cursor={{ fill: "rgba(31,90,166,0.06)" }}
                                        content={<CustomPlacementTooltip />}
                                    />

                                    <Legend
                                        verticalAlign="top"
                                        align="right"
                                        iconType="circle"
                                        wrapperStyle={{
                                            paddingBottom: "30px",
                                            fontSize: "15px",
                                            color: "#52606d",
                                        }}
                                        formatter={(value) => (
                                            <span style={{ color: "#52606d", fontWeight: 500 }}>{value}</span>
                                        )}
                                    />

                                    <Bar
                                        dataKey="placed"
                                        name="Students Placed"
                                        fill="url(#placedGradient)"
                                        radius={[14, 14, 0, 0]}
                                        maxBarSize={40}
                                    />

                                    <Bar
                                        dataKey="offers"
                                        name="Total Offers"
                                        fill="url(#offersGradient)"
                                        radius={[14, 14, 0, 0]}
                                        maxBarSize={40}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </section>
            )}

            <section className="mx-auto w-full max-w-7xl grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-[30px] bg-white p-6 shadow-[0_18px_50px_rgba(11,60,109,0.10)] ring-1 ring-slate-200/70 sm:p-7">
                    <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1f5aa6]">
                                BRANCH PLACEMENT TREND
                            </p>
                            <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#1f2933]">
                                Highest, Median & Average Placement
                            </h3>
                            <p className="mt-2 text-sm text-[#52606d]">
                                Branch-wise comparison of placement trends across recent academic years for {activeBranch.label}.
                            </p>
                        </div>

                        <div className="inline-flex w-fit items-center rounded-full bg-[#f5f7fa] px-4 py-2 text-sm font-semibold text-[#123a6f] ring-1 ring-slate-200/70">
                            {activeBranch.label}
                        </div>
                    </div>

                    <div className="mt-8 h-[400px] w-full rounded-[24px] bg-[#fcfdff] p-4 sm:p-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={branchPlacementTrendData[activeBranch.key]}
                                margin={{ top: 10, right: 12, left: 0, bottom: 8 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e6edf5" />
                                <XAxis
                                    dataKey="session"
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: "#52606d", fontSize: 13, fontWeight: 500 }}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: "#52606d", fontSize: 13 }}
                                    width={44}
                                />
                                <Tooltip
                                    content={({ active, payload, label }) => {
                                        if (!active || !payload || !payload.length) return null;

                                        const highest =
                                            payload.find((item) => item.name === "Highest")?.value ?? 0;
                                        const median =
                                            payload.find((item) => item.name === "Median")?.value ?? 0;
                                        const average =
                                            payload.find((item) => item.name === "Average")?.value ?? 0;

                                        return (
                                            <div className="min-w-[290px] rounded-[28px] border border-slate-200/80 bg-white px-5 py-5 shadow-[0_28px_70px_rgba(11,60,109,0.16)]">
                                                <p className="text-xs font-semibold uppercase tracking-[0.20em] text-[#1f5aa6]">
                                                    Session
                                                </p>
                                                <h4 className="mt-2 text-[18px] font-bold text-[#1f2933]">
                                                    {label}
                                                </h4>

                                                <div className="mt-5 space-y-4">
                                                    <div className="flex items-center justify-between gap-8">
                                                        <div className="flex items-center gap-3">
                                                            <span className="h-3.5 w-3.5 rounded-full bg-[#0b3c6d]" />
                                                            <span className="text-sm text-[#52606d]">Highest</span>
                                                        </div>
                                                        <span className="text-sm font-bold text-[#1f2933]">
                                                            {highest} LPA
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between gap-8">
                                                        <div className="flex items-center gap-3">
                                                            <span className="h-3.5 w-3.5 rounded-full bg-[#f4b400]" />
                                                            <span className="text-sm text-[#52606d]">Median</span>
                                                        </div>
                                                        <span className="text-sm font-bold text-[#1f2933]">
                                                            {median} LPA
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between gap-8">
                                                        <div className="flex items-center gap-3">
                                                            <span className="h-3.5 w-3.5 rounded-full bg-[#1f5aa6]" />
                                                            <span className="text-sm text-[#52606d]">Average</span>
                                                        </div>
                                                        <span className="text-sm font-bold text-[#1f2933]">
                                                            {average} LPA
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }}
                                />
                                <Legend
                                    verticalAlign="top"
                                    align="right"
                                    iconType="circle"
                                    wrapperStyle={{ paddingBottom: "18px", fontSize: "13px", color: "#52606d" }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="highest"
                                    name="Highest"
                                    stroke="#0b3c6d"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: "#0b3c6d", strokeWidth: 0 }}
                                    activeDot={{ r: 6 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="median"
                                    name="Median"
                                    stroke="#f4b400"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: "#f4b400", strokeWidth: 0 }}
                                    activeDot={{ r: 6 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="average"
                                    name="Average"
                                    stroke="#1f5aa6"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: "#1f5aa6", strokeWidth: 0 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rounded-[30px] bg-white p-6 shadow-[0_18px_50px_rgba(11,60,109,0.10)] ring-1 ring-slate-200/70 sm:p-7">
                    <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1f5aa6]">
                                DOCUMENTS
                            </p>
                            <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#1f2933]">
                                Branch Documents
                            </h3>
                            <p className="mt-2 text-sm text-[#52606d]">
                                One academic calendar and year-wise syllabus PDFs for {activeBranch.label}.
                            </p>
                        </div>
                    </div>

                    <div className="top-placements-scroll mt-6 max-h-[400px] space-y-3 overflow-y-auto pr-2 [scrollbar-width:thin] [scrollbar-color:#1f5aa6_#eaf1fb]">
                        {branchDocuments[activeBranch.key].map((doc, index) => (
                            <div
                                key={`${doc.id}-${doc.year ?? "common"}`}
                                className="group rounded-[22px] border border-slate-200/70 bg-[#fcfdff] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#1f5aa6]/20 hover:shadow-[0_12px_30px_rgba(11,60,109,0.10)]"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eaf1fb] text-xs font-bold text-[#0b3c6d]">
                                                {index + 1}
                                            </div>
                                            <h4 className="truncate text-sm font-bold text-[#1f2933]">
                                                {doc.title}
                                            </h4>
                                        </div>

                                        <p className="mt-3 text-sm font-semibold text-[#0b3c6d]">
                                            {doc.type}
                                        </p>

                                        {doc.year && (
                                            <p className="mt-1 text-xs font-medium text-[#7b8794]">
                                                Year: {doc.year}
                                            </p>
                                        )}

                                        <p className="mt-1 text-xs text-[#52606d]">
                                            {doc.description}
                                        </p>

                                        <div className="mt-4">
                                            <a
                                                href={doc.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex min-h-[40px] items-center justify-center rounded-[12px] bg-[#0b3c6d] px-4 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#123a6f]"
                                            >
                                                View PDF
                                            </a>
                                        </div>
                                    </div>

                                    <div className="shrink-0 rounded-full bg-[#fff6db] px-3 py-1 text-sm font-bold text-[#9a6a00]">
                                        {doc.format}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[32px] bg-gradient-to-br from-[#f8fbff] to-white p-6 shadow-[0_25px_60px_rgba(11,60,109,0.12)] ring-1 ring-slate-200/60 sm:p-8">
                <div className="absolute -top-20 -right-20 h-[300px] w-[300px] rounded-full bg-[#1f5aa6]/10 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-[260px] w-[260px] rounded-full bg-[#f4b400]/10 blur-3xl" />

                <div className="relative">
                    <div className="border-b border-slate-200/60 pb-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1f5aa6]">
                            ACHIEVEMENTS
                        </p>
                        <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#1f2933]">
                            Student Achievement Highlights
                        </h3>
                        <p className="mt-2 text-sm text-[#52606d]">
                            Spotlight achievements, competitive exams, hackathons, design awards, and research highlights for{" "}
                            {activeBranch.label}.
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
                        {branchAchievements[activeBranch.key].map((item) => (
                            <article
                                key={item.id}
                                className="grid min-h-[280px] grid-cols-1 gap-5 rounded-[28px] border border-slate-200/70 bg-white/85 p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(11,60,109,0.12)] sm:grid-cols-[1.08fr_0.92fr]"
                            >
                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex w-fit items-center rounded-full bg-[#edf4ff] px-3 py-1 text-xs font-semibold text-[#123a6f]">
                                            {item.category}
                                        </span>

                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                            •••
                                        </div>
                                    </div>

                                    <h4 className="mt-5 max-w-[12ch] text-[30px] font-bold leading-[1.02] tracking-[-0.04em] text-[#111827] sm:text-[38px]">
                                        {item.title}
                                    </h4>

                                    <p className="mt-5 text-[15px] leading-6 text-[#374151]">
                                        {item.subtitle}
                                    </p>

                                    {(item.person || item.meta) && (
                                        <div className="mt-5 flex items-center gap-3">
                                            <div className="h-12 w-12 overflow-hidden rounded-full bg-slate-200">
                                                <img
                                                    src={item.image}
                                                    alt={item.person || item.title}
                                                    width={48}
                                                    height={48}
                                                    loading="lazy"
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>

                                            <div>
                                                {item.person && (
                                                    <p className="text-[16px] font-semibold text-[#111827]">
                                                        {item.person}
                                                    </p>
                                                )}
                                                {item.meta && (
                                                    <p className="text-sm text-[#52606d]">{item.meta}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <p className="mt-5 text-sm leading-6 text-[#52606d]">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-center">
                                    <div className="w-full overflow-hidden rounded-[22px] bg-white shadow-[0_12px_28px_rgba(15,23,42,0.10)] ring-1 ring-slate-200/70">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            width={600}
                                            height={420}
                                            loading="lazy"
                                            className="h-[220px] w-full object-cover"
                                        />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}