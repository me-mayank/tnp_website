"use client";

import { useRouter, usePathname } from "next/navigation";

export default function PlacementTabs() {
    const router = useRouter();
    const pathname = usePathname();

    const tabs = [
        {
            key: "overall",
            label: "Overall Placement Statistics",
            short: "Overall",
            path: "/recruiters/demographic",
        },
        {
            key: "branch",
            label: "Branch-wise Placement Statistics",
            short: "Branch",
            path: "/recruiters/demographic/branchwise",
        },
    ];

    // 🔥 Detect branch route properly
    const isBranchRoute = pathname.includes("branchwise");

    return (
        <div className="mt-4 w-full space-y-6 min-h-screen overflow-y-scroll">
            <div className="mx-auto w-full max-w-3xl">
                <div className="rounded-[28px] border border-white/60 bg-white/80 p-2 shadow-[0_20px_60px_rgba(11,60,109,0.12)] backdrop-blur-xl">

                    {/* Tabs Container */}
                    <div className="relative grid grid-cols-2 rounded-[22px] bg-gradient-to-r from-slate-100 to-slate-50 p-1.5">

                        
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
                            const isActive =
                                (tab.key === "overall" && !isBranchRoute) ||
                                (tab.key === "branch" && isBranchRoute);

                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => router.push(tab.path)}
                                    className={`
                    relative z-10 flex min-h-[58px] items-center justify-center rounded-[18px] px-4 sm:px-6
                    text-sm font-semibold transition-all duration-300
                    ${isActive ? "text-white" : "text-[#52606d]"}
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
        </div>
    );
}