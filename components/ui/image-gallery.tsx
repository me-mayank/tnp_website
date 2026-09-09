'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export type GalleryThumbImage = {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
};

export type GalleryThumbImageInput = string | GalleryThumbImage;

export type GalleryVariant = 'accordion' | 'bento' | 'cinematic' | 'elastic';

type GallerythumbProps = {
  images?: GalleryThumbImageInput[];
  title?: string;
  description?: string;
  tag?: string;
  variant?: GalleryVariant;
  onImageClick?: (index: number) => void;
};

export default function Gallerythumb({
  images = [],
  title = "Gallery Highlights",
  description = "A visual glimpse of Training & Placement activities, campus life, and facilities.",
  tag,
  variant = 'accordion',
  onImageClick,
}: GallerythumbProps) {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const normalizedImages: GalleryThumbImage[] = images
    .filter((img) => Boolean(img))
    .map((img, idx) =>
      typeof img === "string" 
        ? { src: img, alt: `${title} image ${idx + 1}`, title: `${title} #${idx + 1}` } 
        : img
    );

  if (normalizedImages.length === 0) {
    return (
      <section className="w-full flex flex-col items-center justify-start py-12">
        <div className="max-w-3xl text-center px-4">
          {tag && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 mb-2 uppercase tracking-wider">
              {tag}
            </span>
          )}
          <h2 className="text-3xl font-extrabold text-brand-800">{title}</h2>
          <p className="text-sm text-slate-500 mt-2">{description}</p>
        </div>
        <div className="flex items-center gap-2 h-[240px] md:h-[360px] w-full max-w-6xl mt-8 px-4">
          <div className="w-full h-full rounded-2xl border border-dashed border-slate-200 bg-slate-50 flex items-center justify-center text-sm text-slate-500">
            No images to display.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col items-center justify-start py-14">
      {/* Header */}
      <div className="max-w-3xl text-center px-4 mb-8">
        {tag && (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-accent mb-2 uppercase tracking-widest border border-brand-100/60">
            {tag}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-800 tracking-tight">{title}</h2>
        <div className="h-1 w-16 bg-brand-accent rounded-full mx-auto mt-3 mb-3"></div>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">{description}</p>
      </div>

      <div className="w-full max-w-6xl px-4 sm:px-6">
        {/* ========================================================================= */}
        {/* VARIANT 1: ACCORDION EXPANDING STRIP (T&P Activities)                     */}
        {/* ========================================================================= */}
        {variant === 'accordion' && (
          <>
            {/* Mobile View: Horizontal Snap Touch Slider */}
            <div className="md:hidden w-full">
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1 px-1">
                {normalizedImages.map((img, idx) => (
                  <div
                    key={`${img.src}-${idx}-acc-mobile`}
                    onClick={() => onImageClick?.(idx)}
                    className="snap-center shrink-0 w-[82vw] sm:w-[65vw] h-64 relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 active:scale-[0.98] transition-transform"
                  >
                    <Image
                      className="object-cover object-center"
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="85vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                      <span className="text-white text-sm font-semibold tracking-wide">
                        {img.title || `Moment ${idx + 1}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-slate-400 mt-2 font-medium">← Swipe to explore photos →</p>
            </div>

            {/* Desktop View: Smooth Expanding Accordion Cards */}
            <div className="hidden md:flex items-center gap-3 h-[420px] w-full">
              {normalizedImages.map((img, idx) => {
                const isHovered = activeAccordion === idx;
                return (
                  <div
                    key={`${img.src}-${idx}-acc-desktop`}
                    onMouseEnter={() => setActiveAccordion(idx)}
                    onMouseLeave={() => setActiveAccordion(null)}
                    onClick={() => onImageClick?.(idx)}
                    className="relative group rounded-2xl overflow-hidden h-[420px] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{
                      flex: isHovered ? 4 : 1,
                    }}
                  >
                    <Image
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 1200px) 50vw, 30vw"
                      loading="lazy"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 opacity-60 group-hover:opacity-90" />
                    
                    {/* Bottom Caption Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end transition-all duration-500">
                      <div className="transform transition-transform duration-500 group-hover:translate-y-0">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30 uppercase mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Activity #{idx + 1}
                        </span>
                        <p className="text-white font-bold text-base md:text-lg leading-snug drop-shadow-md whitespace-nowrap overflow-hidden text-ellipsis">
                          {img.title || `Highlight ${idx + 1}`}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ========================================================================= */}
        {/* VARIANT 2: ASYMMETRIC BENTO GRID WITH SHIMMER & TILT (Campus & Arch)       */}
        {/* ========================================================================= */}
        {variant === 'bento' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {normalizedImages.map((img, idx) => {
              // Asymmetric Bento sizing:
              // Index 0: Large 2x2 Feature card (Cols 1-2, Rows 1-2)
              // Index 3 & 6: Wide cards (Cols 3-4, Row 2 and Row 3)
              const isFeature = idx === 0;
              const isWide = idx === 3 || idx === 6;

              return (
                <div
                  key={`${img.src}-${idx}-bento`}
                  onClick={() => onImageClick?.(idx)}
                  className={`group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl border border-slate-200/80 bg-slate-900 cursor-pointer transition-all duration-500 hover:-translate-y-1.5 ${
                    isFeature 
                      ? 'sm:col-span-2 sm:row-span-2 h-[340px] sm:h-[420px]' 
                      : isWide 
                      ? 'sm:col-span-2 h-[200px]' 
                      : 'col-span-1 h-[200px]'
                  }`}
                >
                  <Image
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={isFeature ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-50 group-hover:opacity-85 transition-opacity duration-300" />

                  {/* Shimmer light sweep on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                  {/* Badge & Text */}
                  <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between z-10 pointer-events-none">
                    <div className="flex justify-end">
                      <span className="bg-black/40 backdrop-blur-md text-white/90 text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/15 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-1 group-hover:translate-y-0">
                        Campus View
                      </span>
                    </div>

                    <div>
                      <h3 className="text-white font-bold text-sm sm:text-base leading-tight drop-shadow-md">
                        {img.title || `Campus Architectural Site ${idx + 1}`}
                      </h3>
                      {isFeature && (
                        <p className="text-white/70 text-xs mt-1 line-clamp-1 font-inter">
                          Iconic architecture and green campus spaces
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VARIANT 3: ELASTIC GALLERY (Labs & Facilities)                            */}
        {/* ========================================================================= */}
        {(variant === 'elastic' || variant === 'cinematic') && (
          <ElasticGallerySection 
            images={normalizedImages} 
            onImageClick={onImageClick} 
          />
        )}
      </div>
    </section>
  );
}

const LAB_FACILITIES_METADATA = [
  { category: "High Performance", title: "Computing Lab" },
  { category: "R&D Research", title: "Innovation Hub" },
  { category: "Skill Development", title: "Training Center" },
  { category: "Placement Drives", title: "Interview Suites" },
  { category: "Smart Classrooms", title: "Presentation Hall" },
  { category: "Campus Events", title: "Main Auditorium" },
];

function ElasticGallerySection({
  images,
  onImageClick,
}: {
  images: GalleryThumbImage[];
  onImageClick?: (index: number) => void;
}) {
  const [activeIdx, setActiveIdx] = useState<number>(Math.min(2, images.length - 1));

  return (
    <div className="w-full">
      {/* Container: Fixed height on mobile/desktop to ensure animation stability */}
      <div className="mx-auto flex h-[500px] w-full flex-col gap-2 md:h-[550px] md:flex-row md:gap-3">
        {images.map((item, idx) => {
          const meta = LAB_FACILITIES_METADATA[idx % LAB_FACILITIES_METADATA.length];
          const displayTitle = item.title && !item.title.startsWith("Labs & Facilities #") 
            ? item.title 
            : meta.title;
          const displayCategory = meta.category;
          const id = String(idx + 1).padStart(2, "0");
          const isActive = activeIdx === idx;

          return (
            <div
              key={`${item.src}-${idx}-elastic`}
              onMouseEnter={() => setActiveIdx(idx)}
              onClick={() => {
                setActiveIdx(idx);
                onImageClick?.(idx);
              }}
              className={`relative cursor-pointer overflow-hidden rounded-2xl border border-neutral-200 bg-slate-900 shadow-md transition-[flex,filter] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isActive 
                  ? "flex-[4] brightness-100 shadow-xl" 
                  : "flex-[1] brightness-50 hover:brightness-75"
              }`}
            >
              {/* Background Image Layer */}
              <div className="absolute inset-0 h-full w-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={`object-cover transition-transform duration-1000 ${
                    isActive ? "scale-100" : "scale-110"
                  }`}
                />
                {/* Gradient Overlay for Text Readability */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-40"
                  }`}
                />
              </div>

              {/* --- Content Container --- */}
              <div className="absolute bottom-0 left-0 right-0 flex h-full flex-col justify-end p-4 md:p-8 z-10 pointer-events-none">
                {/* Active Content: Title & Button */}
                <div
                  className={`flex flex-col gap-2 transition-all duration-500 ${
                    isActive
                      ? "translate-y-0 opacity-100 delay-200"
                      : "translate-y-12 opacity-0"
                  }`}
                >
                  {/* Category Tag */}
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-white/30 bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md md:px-3 md:text-xs">
                      {displayCategory}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-black uppercase leading-tight text-white md:text-4xl drop-shadow-md">
                    {displayTitle}
                  </h3>

                  {/* Call to Action */}
                  <div className="mt-1 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-300 md:mt-3 md:text-sm">
                    View Project{" "}
                    <svg className="h-3 w-3 md:h-4 md:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>

                {/* Inactive Content: Vertical Text (Desktop) / Short Label (Mobile) */}
                <div
                  className={`absolute transition-all duration-500 bottom-4 left-1/2 -translate-x-1/2 md:bottom-8 ${
                    isActive
                      ? "opacity-0 scale-50"
                      : "opacity-100 delay-300"
                  }`}
                >
                  {/* Desktop: Vertical Text */}
                  <span className="hidden whitespace-nowrap text-lg font-bold uppercase tracking-widest text-white/90 [writing-mode:vertical-rl] md:block drop-shadow">
                    {displayTitle}
                  </span>

                  {/* Mobile: Horizontal ID/Label */}
                  <span className="block text-xs font-bold text-white md:hidden bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                    {id}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
