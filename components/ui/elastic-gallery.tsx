"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { getOptimizedImageUrl } from "@/lib/cloudinary-gallery";

export interface ElasticItemProps {
  id: string;
  title: string;
  category: string;
  src: string;
  alt: string;
}

interface ElasticGalleryProps {
  items?: ElasticItemProps[];
  defaultActiveId?: string;
  onItemClick?: (item: ElasticItemProps, index: number) => void;
}

const DEFAULT_ITEMS: ElasticItemProps[] = [
  {
    id: "01",
    title: "Computing Lab",
    category: "High Performance",
    src: "/images/facilities/computer.png",
    alt: "Computing Center Lab",
  },
  {
    id: "02",
    title: "Placement Cell",
    category: "Training & Placement",
    src: "/images/facilities/workspace.webp",
    alt: "Placement Cell",
  },
  {
    id: "03",
    title: "Training Center",
    category: "Skill Development",
    src: "/images/facilities/training.jpg",
    alt: "Training Hall",
  },
  {
    id: "04",
    title: "Interview Suites",
    category: "Placement Drives",
    src: "/images/facilities/interview.jpg",
    alt: "Interview Suites",
  },
  {
    id: "05",
    title: "Smart Presentation",
    category: "Interactive Learning",
    src: "/images/facilities/presentation.jpg",
    alt: "Presentation Hall",
  },
  {
    id: "06",
    title: "Auditorium",
    category: "Campus Events",
    src: "/images/newaudi.jpg",
    alt: "Main Auditorium",
  },
];

export function ElasticGallery({
  items = DEFAULT_ITEMS,
  defaultActiveId,
  onItemClick,
}: ElasticGalleryProps) {
  const [activeId, setActiveId] = useState<string | null>(
    defaultActiveId ?? (items.length > 2 ? items[2].id : items[0]?.id ?? "01")
  );

  return (
    <div className="w-full py-4">
      {/* Container: Fixed height on mobile/desktop to ensure animation stability */}
      <div className="mx-auto flex h-[500px] w-full max-w-6xl flex-col gap-2 md:h-[540px] md:flex-row md:gap-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            onMouseEnter={() => setActiveId(item.id)}
            onClick={() => {
              setActiveId(item.id);
              onItemClick?.(item, index);
            }}
            className={cn(
              "relative cursor-pointer overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-md dark:border-neutral-800 dark:bg-neutral-950",
              // Layout & Flex Transition
              "transition-[flex,filter] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
              // Flex Logic:
              activeId === item.id ? "flex-[4]" : "flex-[1]",
              // Brightness logic for focus
              activeId === item.id
                ? "brightness-100 shadow-xl"
                : "brightness-50 hover:brightness-75"
            )}
          >
            {/* Background Image Layer */}
            <div className="absolute inset-0 h-full w-full">
              <Image
                src={getOptimizedImageUrl(item.src)}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={cn(
                  "object-cover transition-transform duration-1000",
                  // Subtle zoom on active
                  activeId === item.id ? "scale-100" : "scale-110"
                )}
              />
              {/* Gradient Overlay for Text Readability */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500",
                  activeId === item.id ? "opacity-100" : "opacity-40"
                )}
              />
            </div>

            {/* --- Content Container --- */}
            <div className="absolute bottom-0 left-0 right-0 flex h-full flex-col justify-end p-4 md:p-8 z-10 pointer-events-none">
              {/* Active Content: Title & Button */}
              <div
                className={cn(
                  "flex flex-col gap-2 transition-all duration-500",
                  activeId === item.id
                    ? "translate-y-0 opacity-100 delay-200"
                    : "translate-y-12 opacity-0"
                )}
              >
                {/* Category Tag */}
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-white/30 bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md md:px-3 md:text-xs">
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-black uppercase leading-tight text-white md:text-4xl drop-shadow-md">
                  {item.title}
                </h3>


              </div>

              {/* Inactive Content: Vertical Text (Desktop) / Short Label (Mobile) */}
              <div
                className={cn(
                  "absolute transition-all duration-500",
                  // Position logic
                  "bottom-4 left-1/2 -translate-x-1/2 md:bottom-8",
                  // Hide when active
                  activeId === item.id
                    ? "opacity-0 scale-50"
                    : "opacity-100 delay-300"
                )}
              >
                {/* Desktop: Vertical Text */}
                <span className="hidden whitespace-nowrap text-lg font-bold uppercase tracking-widest text-white/90 [writing-mode:vertical-rl] md:block drop-shadow">
                  {item.title}
                </span>

                {/* Mobile: Horizontal ID/Label */}
                <span className="block text-xs font-bold text-white md:hidden bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                  {item.id}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ElasticGallery;
