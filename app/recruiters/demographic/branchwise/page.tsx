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

const branchPlacementOffers: Record<string, { session: string; offers: number; placed: number }[]> = {
    "cse": [
        {"session":"2023-24","offers":60,"placed":0},
        {"session":"2024-25","offers":86,"placed":0},
        {"session":"2025-26","offers":78,"placed":0},
    ],
    "cse_sf": [
        {"session":"2024-25","offers":78,"placed":0},
        {"session":"2025-26","offers":62,"placed":0},
    ],
    "cse_ai": [
        {"session":"2024-25","offers":71,"placed":0},
        {"session":"2025-26","offers":48,"placed":0},
    ],
    "it": [
        {"session":"2023-24","offers":56,"placed":0},
    ],
    "ece": [
        {"session":"2023-24","offers":26,"placed":0},
        {"session":"2024-25","offers":71,"placed":0},
        {"session":"2025-26","offers":51,"placed":0},
    ],
    "ei": [
        {"session":"2023-24","offers":44,"placed":0},
    ],
    "ee": [
        {"session":"2023-24","offers":29,"placed":0},
        {"session":"2024-25","offers":29,"placed":0},
        {"session":"2025-26","offers":46,"placed":0},
    ],
    "me": [
        {"session":"2023-24","offers":33,"placed":0},
        {"session":"2024-25","offers":42,"placed":0},
        {"session":"2025-26","offers":57,"placed":0},
    ],
    "ce": [
        {"session":"2023-24","offers":20,"placed":0},
        {"session":"2024-25","offers":22,"placed":0},
        {"session":"2025-26","offers":38,"placed":0},
    ],
    "che": [
        {"session":"2023-24","offers":36,"placed":0},
        {"session":"2024-25","offers":18,"placed":0},
        {"session":"2025-26","offers":34,"placed":0},
    ],
    "mca": [
        {"session":"2023-24","offers":37,"placed":0},
        {"session":"2024-25","offers":48,"placed":0},
        {"session":"2025-26","offers":64,"placed":0},
    ],
    "mba": [
        {"session":"2023-24","offers":48,"placed":0},
        {"session":"2024-25","offers":54,"placed":0},
        {"session":"2025-26","offers":38,"placed":0},
    ],
    "mtech": [
        {"session":"2023-24","offers":1,"placed":0},
        {"session":"2024-25","offers":6,"placed":0},
        {"session":"2025-26","offers":10,"placed":0},
    ],
};
const branchPlacementTrendData: Record<string, { session: string; highest: number; median: number; average: number }[]> = {
    "cse": [
        {"session":"2023-24","highest":59.91,"median":7.5,"average":9.77},
        {"session":"2024-25","highest":54,"median":6,"average":7.63},
        {"session":"2025-26","highest":60,"median":7,"average":7.58},
    ],
    "cse_sf": [
        {"session":"2024-25","highest":54,"median":6,"average":8.89},
        {"session":"2025-26","highest":16,"median":6.5,"average":6.96},
    ],
    "cse_ai": [
        {"session":"2024-25","highest":12.5,"median":4.8,"average":5.56},
        {"session":"2025-26","highest":12,"median":6.5,"average":6.4},
    ],
    "it": [
        {"session":"2023-24","highest":44.5,"median":7.5,"average":8.24},
    ],
    "ece": [
        {"session":"2023-24","highest":20,"median":7.25,"average":7.15},
        {"session":"2024-25","highest":25,"median":4.8,"average":5.75},
        {"session":"2025-26","highest":12,"median":6.5,"average":6.79},
    ],
    "ei": [
        {"session":"2023-24","highest":16,"median":7.5,"average":7.07},
    ],
    "ee": [
        {"session":"2023-24","highest":10,"median":5,"average":5.48},
        {"session":"2024-25","highest":11,"median":4,"average":4.89},
        {"session":"2025-26","highest":12,"median":6,"average":6.53},
    ],
    "me": [
        {"session":"2023-24","highest":10,"median":5,"average":5.35},
        {"session":"2024-25","highest":8,"median":4,"average":4.75},
        {"session":"2025-26","highest":12.36,"median":5.5,"average":6.37},
    ],
    "ce": [
        {"session":"2023-24","highest":7.5,"median":4.25,"average":4.83},
        {"session":"2024-25","highest":8,"median":4,"average":4.54},
        {"session":"2025-26","highest":12,"median":5.5,"average":5.77},
    ],
    "che": [
        {"session":"2023-24","highest":7.5,"median":5,"average":5.1},
        {"session":"2024-25","highest":8,"median":4,"average":4.67},
        {"session":"2025-26","highest":12.36,"median":6,"average":5.93},
    ],
    "mca": [
        {"session":"2023-24","highest":7.5,"median":3.5,"average":4.31},
        {"session":"2024-25","highest":8,"median":3.5,"average":4.41},
        {"session":"2025-26","highest":12,"median":6.35,"average":6.32},
    ],
    "mba": [
        {"session":"2023-24","highest":8,"median":5,"average":5.1},
        {"session":"2024-25","highest":8,"median":4,"average":4.45},
        {"session":"2025-26","highest":12.36,"median":6,"average":5.99},
    ],
    "mtech": [
        {"session":"2023-24","highest":3.75,"median":3.75,"average":3.75},
        {"session":"2024-25","highest":8,"median":4,"average":5.17},
        {"session":"2025-26","highest":8.6,"median":7.32,"average":6.57},
    ],
};
const branchDocuments: Record<string, { id: number; title: string; type: string; description: string; format: string; year?: string; url: string; }[]> = {
    "cse": [
        {
            "title": "Academic Calendar",
            "type": "calendar",
            "description": "Current academic session schedule and important dates",
            "format": "Link",
            "url": "https://www.ietlucknow.ac.in/ac/2627",
            "id": 1
        },
        {
            "id": 2,
            "title": "1st Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech 1st Year Syllabus",
            "format": "PDF",
            "year": "1st Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/IET_BTech_1st_Year_Syllabus_I_Series_wef_2023_24_1.pdf"
        },
        {
            "id": 3,
            "title": "2nd Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech CSE/CSE(AI) 2nd Year Syllabus",
            "format": "PDF",
            "year": "2nd Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/New%20Course%20Structure%20and%20Syllabus%20of%20B%20Tech%20CSE_CSE_AI_2nd_Yr%202023-24_1.pdf"
        },
        {
            "id": 4,
            "title": "3rd Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech CSE 3rd Year Syllabus",
            "format": "PDF",
            "year": "3rd Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/B%20Tech%20CSE%20Detail%20Syllabus%203rd%20Year%202024-25_Final.pdf"
        },
        {
            "id": 5,
            "title": "4th Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech CSE 4th Year Syllabus",
            "format": "PDF",
            "year": "4th Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/ilovepdf_merged%20%281%29.pdf"
        }
    ],
    "cse_sf": [
        {
            "title": "Academic Calendar",
            "type": "calendar",
            "description": "Current academic session schedule and important dates",
            "format": "Link",
            "url": "https://www.ietlucknow.ac.in/ac/2627",
            "id": 1
        },
        {
            "id": 2,
            "title": "1st Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech 1st Year Syllabus",
            "format": "PDF",
            "year": "1st Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/IET_BTech_1st_Year_Syllabus_I_Series_wef_2023_24_1.pdf"
        },
        {
            "id": 3,
            "title": "2nd Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech CSE/CSE(AI) 2nd Year Syllabus",
            "format": "PDF",
            "year": "2nd Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/New%20Course%20Structure%20and%20Syllabus%20of%20B%20Tech%20CSE_CSE_AI_2nd_Yr%202023-24_1.pdf"
        },
        {
            "id": 4,
            "title": "3rd Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech CSE 3rd Year Syllabus",
            "format": "PDF",
            "year": "3rd Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/B%20Tech%20CSE%20Detail%20Syllabus%203rd%20Year%202024-25_Final.pdf"
        },
        {
            "id": 5,
            "title": "4th Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech CSE 4th Year Syllabus",
            "format": "PDF",
            "year": "4th Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/ilovepdf_merged%20%281%29.pdf"
        }
    ],
    "cse_ai": [
        {
            "title": "Academic Calendar",
            "type": "calendar",
            "description": "Current academic session schedule and important dates",
            "format": "Link",
            "url": "https://www.ietlucknow.ac.in/ac/2627",
            "id": 1
        },
        {
            "id": 2,
            "title": "1st Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech 1st Year Syllabus",
            "format": "PDF",
            "year": "1st Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/IET_BTech_1st_Year_Syllabus_I_Series_wef_2023_24_1.pdf"
        },
        {
            "id": 3,
            "title": "2nd Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech CSE/CSE(AI) 2nd Year Syllabus",
            "format": "PDF",
            "year": "2nd Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/New%20Course%20Structure%20and%20Syllabus%20of%20B%20Tech%20CSE_CSE_AI_2nd_Yr%202023-24_1.pdf"
        },
        {
            "id": 4,
            "title": "3rd Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech CSE 3rd Year Syllabus",
            "format": "PDF",
            "year": "3rd Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/B%20Tech%20CSE%20Detail%20Syllabus%203rd%20Year%202024-25_Final.pdf"
        },
        {
            "id": 5,
            "title": "4th Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech CSE 4th Year Syllabus",
            "format": "PDF",
            "year": "4th Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/ilovepdf_merged%20%281%29.pdf"
        }
    ],
    "ece": [
        {
            "title": "Academic Calendar",
            "type": "calendar",
            "description": "Current academic session schedule and important dates",
            "format": "Link",
            "url": "https://www.ietlucknow.ac.in/ac/2627",
            "id": 1
        },
        {
            "id": 2,
            "title": "1st Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech 1st Year Syllabus",
            "format": "PDF",
            "year": "1st Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/IET_BTech_1st_Year_Syllabus_I_Series_wef_2023_24_9.pdf"
        },
        {
            "id": 3,
            "title": "2nd Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech 2nd Year Syllabus",
            "format": "PDF",
            "year": "2nd Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/BTech_2nd_Year_Curriculam_2023_25_26.pdf"
        },
        {
            "id": 4,
            "title": "3rd Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech 3rd Year Syllabus",
            "format": "PDF",
            "year": "3rd Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/BTech_3rd_Year_Curriculam_2024_25_26.pdf"
        },
        {
            "id": 5,
            "title": "4th Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech 4th Year Syllabus",
            "format": "PDF",
            "year": "4th Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/BTech_4th_Year_Curriculam_2025_26_1.pdf"
        }
    ],
    "ee": [
        {
            "title": "Academic Calendar",
            "type": "calendar",
            "description": "Current academic session schedule and important dates",
            "format": "Link",
            "url": "https://www.ietlucknow.ac.in/ac/2627",
            "id": 1
        },
        {
            "id": 2,
            "title": "1st Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech 1st Year Syllabus",
            "format": "PDF",
            "year": "1st Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/IET_BTech_1st_Year_Syllabus_I_Series_wef_2023_24_9.pdf"
        },
        {
            "id": 3,
            "title": "2nd Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech 2nd Year Syllabus",
            "format": "PDF",
            "year": "2nd Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/Second_Year_Syllabus.pdf"
        },
        {
            "id": 4,
            "title": "3rd Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech 3rd Year Syllabus",
            "format": "PDF",
            "year": "3rd Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/Third_Year_Syllabus.pdf"
        },
        {
            "id": 5,
            "title": "4th Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech 4th Year Syllabus",
            "format": "PDF",
            "year": "4th Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/Final%20_Year_Syllabus_%20I%20_Series.pdf"
        }
    ],
    "me": [
        {
            "title": "Academic Calendar",
            "type": "calendar",
            "description": "Current academic session schedule and important dates",
            "format": "Link",
            "url": "https://www.ietlucknow.ac.in/ac/2627",
            "id": 1
        },
        {
            "id": 2,
            "title": "1st Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech 1st Year Syllabus",
            "format": "PDF",
            "year": "1st Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/IET_BTech_1st_Year_Syllabus_I_Series_wef_2023_24_9.pdf"
        },
        {
            "id": 3,
            "title": "2nd Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech 2nd Year Syllabus",
            "format": "PDF",
            "year": "2nd Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/Second%20year%20syllabus%20Mechanical%20Engineering.pdf"
        },
        {
            "id": 4,
            "title": "3rd Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech 3rd Year Syllabus",
            "format": "PDF",
            "year": "3rd Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/Third%20Year%20Syllabus%20Mechanical%20Engineering.pdf"
        },
        {
            "id": 5,
            "title": "4th Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech 4th Year Syllabus",
            "format": "PDF",
            "year": "4th Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/Final%20Year%20Syllabus%20Mechanical%20Engineering.pdf"
        }
    ],
    "ce": [
        {
            "title": "Academic Calendar",
            "type": "calendar",
            "description": "Current academic session schedule and important dates",
            "format": "Link",
            "url": "https://www.ietlucknow.ac.in/ac/2627",
            "id": 1
        },
        {
            "id": 2,
            "title": "1st Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech 1st Year Syllabus",
            "format": "PDF",
            "year": "1st Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/IET_BTech_1st_Year_Syllabus_I_Series_wef_2023_24_1.pdf"
        }
    ],
    "che": [
        {
            "title": "Academic Calendar",
            "type": "calendar",
            "description": "Current academic session schedule and important dates",
            "format": "Link",
            "url": "https://www.ietlucknow.ac.in/ac/2627",
            "id": 1
        },
        {
            "id": 2,
            "title": "1st Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech 1st Year Syllabus",
            "format": "PDF",
            "year": "1st Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/IET_BTech_1st_Year_Syllabus_I_Series_wef_2023_24_1.pdf"
        },
        {
            "id": 3,
            "title": "2nd Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech 2nd Year Syllabus",
            "format": "PDF",
            "year": "2nd Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/CH2_BTech_2nd_Year_K_Series_Syllabus_EFS_2019_20.pdf"
        },
        {
            "id": 4,
            "title": "3rd Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech 3rd Year Syllabus",
            "format": "PDF",
            "year": "3rd Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/CH3_BTech_3rd_Year_K_Series_Syllabus_EFS_2020_21_0.pdf"
        },
        {
            "id": 5,
            "title": "4th Year Syllabus",
            "type": "syllabus",
            "description": "B.Tech 4th Year Syllabus",
            "format": "PDF",
            "year": "4th Year",
            "url": "https://www.ietlucknow.ac.in/sites/default/files/syllabus/CH4_BTech_4th_Year_R_Series_Syllabus_EFS_2019_20.pdf"
        }
    ],
    "it": [
        {
            "title": "Academic Calendar",
            "type": "calendar",
            "description": "Current academic session schedule and important dates",
            "format": "Link",
            "url": "https://www.ietlucknow.ac.in/ac/2627",
            "id": 1
        }
    ],
    "ei": [
        {
            "title": "Academic Calendar",
            "type": "calendar",
            "description": "Current academic session schedule and important dates",
            "format": "Link",
            "url": "https://www.ietlucknow.ac.in/ac/2627",
            "id": 1
        }
    ],
    "mca": [
        {
            "title": "Academic Calendar",
            "type": "calendar",
            "description": "Current academic session schedule and important dates",
            "format": "Link",
            "url": "https://www.ietlucknow.ac.in/ac/2627",
            "id": 1
        }
    ],
    "mba": [
        {
            "title": "Academic Calendar",
            "type": "calendar",
            "description": "Current academic session schedule and important dates",
            "format": "Link",
            "url": "https://www.ietlucknow.ac.in/ac/2627",
            "id": 1
        }
    ],
    "mtech": [
        {
            "title": "Academic Calendar",
            "type": "calendar",
            "description": "Current academic session schedule and important dates",
            "format": "Link",
            "url": "https://www.ietlucknow.ac.in/ac/2627",
            "id": 1
        }
    ]
};
const branchAchievementStats: Record<
    string,
    { label: string; value: string }[]
> = {
    "cse_sf": [],
    "cse_ai": [],
    "it": [],
    "ei": [],
    "mca": [],
    "mba": [],
    "mtech": [],
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
    "cse_sf": [],
    "cse_ai": [],
    "it": [],
    "ei": [],
    "mca": [],
    "mba": [],
    "mtech": [],
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

    return (
        <div className="min-w-[290px] rounded-[28px] border border-slate-200/80 bg-white px-5 py-5 shadow-[0_28px_70px_rgba(11,60,109,0.16)]">
            <p className="text-xs font-semibold uppercase tracking-[0.20em] text-[#2C74B3]">
                Session
            </p>
            <h4 className="mt-2 text-[18px] font-bold text-[#071733]">{label}</h4>

            <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <span className="h-3.5 w-3.5 rounded-full bg-[#0A2647]" />
                        <span className="text-sm text-[#52606d]">Total Offers</span>
                    </div>
                    <span className="text-sm font-bold text-[#071733]">{offers}</span>
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
            <p className="text-xs font-semibold uppercase tracking-[0.20em] text-[#2C74B3]">
                Session
            </p>
            <h4 className="mt-2 text-[18px] font-bold text-[#071733]">{label}</h4>
        </div>
    );
}

export default function PlacementTabsOnly() {
    const router = useRouter();
    const pathname = usePathname() ?? "";


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
            
                <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
                    <div className="relative">
                        <label className="mb-2 block text-sm font-semibold text-[#144272]">
                            Select Branch
                        </label>

                        <button
                            type="button"
                            role="combobox"
                            aria-expanded={isBranchMenuOpen}
                            aria-controls="branch-listbox"
                            onClick={() => setIsBranchMenuOpen((prev) => !prev)}
                            className="flex min-h-[56px] w-full items-center justify-between rounded-[20px] border border-slate-200/80 bg-white px-5 py-3 text-left shadow-[0_12px_30px_rgba(11,60,109,0.08)] transition-all duration-300 hover:border-[#2C74B3]/30 hover:shadow-[0_16px_36px_rgba(11,60,109,0.12)]"
                        >
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#52606d]">
                                    Branch
                                </p>
                                <p className="mt-1 text-sm font-semibold text-[#071733]">
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
                                <div data-lenis-prevent className="max-h-[320px] overflow-y-auto p-2">
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
                                                    ? "bg-[#eaf1fb] text-[#0A2647]"
                                                    : "text-[#52606d] hover:bg-slate-50 hover:text-[#071733]"
                                                    }`}
                                            >
                                                <span className="text-sm font-medium">{branch.label}</span>
                                                {isSelected && <Check className="h-4 w-4 text-[#0A2647]" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            <section className="mx-auto max-w-7xl rounded-[34px] border border-slate-200/70 bg-white p-6 shadow-[0_20px_60px_rgba(11,60,109,0.08)] sm:p-8">
                    <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.20em] text-[#2C74B3]">
                                PLACEMENT OFFERS
                            </p>
                            <h3 className="mt-3 text-[30px] font-bold tracking-[-0.03em] text-[#071733] sm:text-[34px]">
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
                                            <stop offset="0%" stopColor="#2C74B3" />
                                            <stop offset="100%" stopColor="#0A2647" />
                                        </linearGradient>

                                        <linearGradient id="placedGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#38BDF8" />
                                            <stop offset="100%" stopColor="#2C74B3" />
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

            <section className="mx-auto w-full max-w-7xl grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-[30px] bg-white p-6 shadow-[0_18px_50px_rgba(11,60,109,0.10)] ring-1 ring-slate-200/70 sm:p-7">
                    <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2C74B3]">
                                BRANCH PLACEMENT TREND
                            </p>
                            <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#071733]">
                                Highest, Median & Average Placement
                            </h3>
                            <p className="mt-2 text-sm text-[#52606d]">
                                Branch-wise comparison of placement trends across recent academic years for {activeBranch.label}.
                            </p>
                        </div>

                        <div className="inline-flex w-fit items-center rounded-full bg-[#f5f7fa] px-4 py-2 text-sm font-semibold text-[#144272] ring-1 ring-slate-200/70">
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
                                                <p className="text-xs font-semibold uppercase tracking-[0.20em] text-[#2C74B3]">
                                                    Session
                                                </p>
                                                <h4 className="mt-2 text-[18px] font-bold text-[#071733]">
                                                    {label}
                                                </h4>

                                                <div className="mt-5 space-y-4">
                                                    <div className="flex items-center justify-between gap-8">
                                                        <div className="flex items-center gap-3">
                                                            <span className="h-3.5 w-3.5 rounded-full bg-[#071733]" />
                                                            <span className="text-sm text-[#52606d]">Highest</span>
                                                        </div>
                                                        <span className="text-sm font-bold text-[#071733]">
                                                            {highest} LPA
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between gap-8">
                                                        <div className="flex items-center gap-3">
                                                            <span className="h-3.5 w-3.5 rounded-full bg-[#144272]" />
                                                            <span className="text-sm text-[#52606d]">Median</span>
                                                        </div>
                                                        <span className="text-sm font-bold text-[#071733]">
                                                            {median} LPA
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between gap-8">
                                                        <div className="flex items-center gap-3">
                                                            <span className="h-3.5 w-3.5 rounded-full bg-[#2C74B3]" />
                                                            <span className="text-sm text-[#52606d]">Average</span>
                                                        </div>
                                                        <span className="text-sm font-bold text-[#071733]">
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
                                    stroke="#071733"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: "#071733", strokeWidth: 0 }}
                                    activeDot={{ r: 6 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="median"
                                    name="Median"
                                    stroke="#144272"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: "#144272", strokeWidth: 0 }}
                                    activeDot={{ r: 6 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="average"
                                    name="Average"
                                    stroke="#2C74B3"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: "#2C74B3", strokeWidth: 0 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rounded-[30px] bg-white p-6 shadow-[0_18px_50px_rgba(11,60,109,0.10)] ring-1 ring-slate-200/70 sm:p-7">
                    <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2C74B3]">
                                DOCUMENTS
                            </p>
                            <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#071733]">
                                Branch Documents
                            </h3>
                            <p className="mt-2 text-sm text-[#52606d]">
                                One academic calendar and year-wise syllabus PDFs for {activeBranch.label}.
                            </p>
                        </div>
                    </div>

                    <div data-lenis-prevent className="top-placements-scroll mt-6 max-h-[400px] space-y-3 overflow-y-auto overscroll-contain pr-2 [scrollbar-width:thin] [scrollbar-color:#2C74B3_#eaf1fb]">
                        {branchDocuments[activeBranch.key].map((doc, index) => (
                            <div
                                key={`${doc.id}-${doc.year ?? "common"}`}
                                className="group rounded-[22px] border border-slate-200/70 bg-[#fcfdff] p-4 transition-all duration-300 hover:border-[#2C74B3]/20 hover:shadow-[0_12px_30px_rgba(11,60,109,0.10)]"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eaf1fb] text-xs font-bold text-[#0A2647]">
                                                {index + 1}
                                            </div>
                                            <h4 className="truncate text-sm font-bold text-[#071733]">
                                                {doc.title}
                                            </h4>
                                        </div>

                                        <p className="mt-3 text-sm font-semibold text-[#0A2647]">
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
                                                className="inline-flex min-h-[40px] items-center justify-center rounded-[12px] bg-[#0A2647] px-4 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#144272]"
                                            >
                                                View Document
                                            </a>
                                        </div>
                                    </div>

                                    <div className="shrink-0 rounded-full bg-[#E0F2FE] px-3 py-1 text-sm font-bold text-[#0369A1]">
                                        {doc.format}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}