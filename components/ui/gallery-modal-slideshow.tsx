"use client";

import * as React from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  X, 
  Maximize2, 
  Minimize2 
} from "lucide-react";
import { getOptimizedImageUrl } from "@/lib/cloudinary-gallery";

export type SlideshowImageInput =
  | string
  | {
      src: string;
      alt?: string;
      title?: string;
    };

type NormalizedImage = { src: string; alt: string; title?: string };

function normalizeImages(images: SlideshowImageInput[]): NormalizedImage[] {
  return images
    .filter(Boolean)
    .map((img, idx) => {
      const rawSrc = typeof img === "string" ? img : img.src;
      const alt =
        typeof img === "string"
          ? `Gallery image ${idx + 1}`
          : (img.alt ?? `Gallery image ${idx + 1}`);
      const title = typeof img === "object" ? img.title : undefined;
      return {
        src: getOptimizedImageUrl(rawSrc),
        alt,
        title,
      };
    });
}

export type GalleryModalSlideshowProps = {
  open: boolean;
  onClose: () => void;
  images: SlideshowImageInput[];
  title?: string;
  initialIndex?: number;
  autoPlay?: boolean;
  intervalMs?: number;
};

export default function GalleryModalSlideshow({
  open,
  onClose,
  images,
  title = "Gallery",
  initialIndex = 0,
  autoPlay = false,
  intervalMs = 4000,
}: GalleryModalSlideshowProps) {
  const normalized = React.useMemo(() => normalizeImages(images), [images]);
  const safeInitialIndex = React.useMemo(() => {
    if (normalized.length === 0) return 0;
    return Math.min(Math.max(initialIndex, 0), normalized.length - 1);
  }, [initialIndex, normalized.length]);

  const [index, setIndex] = React.useState<number>(safeInitialIndex);
  const [direction, setDirection] = React.useState<number>(1);
  const [playing, setPlaying] = React.useState<boolean>(autoPlay);
  const [isFullscreen, setIsFullscreen] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const thumbnailsRef = React.useRef<HTMLDivElement | null>(null);

  // Sync index when initialIndex changes or modal opens
  React.useEffect(() => {
    if (!open) return;
    setIndex(safeInitialIndex);
    setDirection(1);
    setPlaying(autoPlay);
  }, [open, safeInitialIndex, autoPlay]);

  // Lock background scroll when open
  React.useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Keyboard navigation (silent background operation)
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (normalized.length <= 1) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        setDirection(1);
        setIndex((prev) => (prev + 1) % normalized.length);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setDirection(-1);
        setIndex((prev) => (prev - 1 + normalized.length) % normalized.length);
      }
      if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, normalized.length, onClose]);

  // Auto-play interval
  React.useEffect(() => {
    if (!open || !playing || normalized.length <= 1) return;

    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % normalized.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [open, playing, normalized.length, intervalMs]);

  // Auto-scroll thumbnail strip
  React.useEffect(() => {
    if (!open || !thumbnailsRef.current) return;
    const activeEl = thumbnailsRef.current.children[index] as HTMLElement | undefined;
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [index, open]);

  // Fullscreen toggle handler
  const toggleFullscreen = React.useCallback(async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // Graceful fallback
    }
  }, []);

  React.useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const hasImages = normalized.length > 0;
  const current = hasImages ? normalized[index] : null;

  const goNext = () => {
    if (normalized.length <= 1) return;
    setDirection(1);
    setIndex((prev) => (prev + 1) % normalized.length);
  };

  const goPrev = () => {
    if (normalized.length <= 1) return;
    setDirection(-1);
    setIndex((prev) => (prev - 1 + normalized.length) % normalized.length);
  };

  // Pure, smooth Lightbox slide variants
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 24 : -24,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { duration: 0.28, ease: [0.25, 1, 0.5, 1] },
        opacity: { duration: 0.25, ease: "easeOut" },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -24 : 24,
      opacity: 0,
      transition: {
        x: { duration: 0.25, ease: [0.25, 1, 0.5, 1] },
        opacity: { duration: 0.2, ease: "easeIn" },
      },
    }),
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[999] flex flex-col justify-between bg-black/80 backdrop-blur-2xl select-none"
          aria-hidden={!open}
          aria-label={title}
        >
          {/* Top Lightbox Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 z-20 bg-gradient-to-b from-black/85 via-black/40 to-transparent backdrop-blur-md">
            {/* Title & Counter */}
            <div className="flex items-center gap-3 text-white">
              <span className="text-sm sm:text-base font-medium tracking-tight text-white/90">
                {title}
              </span>
              <span className="text-xs font-mono text-white/50 bg-white/10 px-2 py-0.5 rounded-full border border-white/10">
                {hasImages ? `${index + 1} / ${normalized.length}` : "0 / 0"}
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Play / Pause */}
              {normalized.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPlaying((p) => !p);
                  }}
                  className={`inline-flex items-center justify-center rounded-full w-9 h-9 transition-colors ${
                    playing
                      ? "bg-brand-accent text-white shadow-md"
                      : "bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/10"
                  }`}
                  aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                >
                  {playing ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </button>
              )}

              {/* Fullscreen */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
                className="hidden sm:inline-flex items-center justify-center rounded-full w-9 h-9 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/10 transition-colors"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="inline-flex items-center justify-center rounded-full w-9 h-9 bg-white/10 hover:bg-white/25 text-white/90 hover:text-white border border-white/10 transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Progress Bar (Under top bar, only when playing) */}
          {playing && normalized.length > 1 && (
            <div className="w-full h-[2px] bg-white/10">
              <motion.div
                key={`progress-${index}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: intervalMs / 1000, ease: "linear" }}
                className="h-full bg-brand-accent"
              />
            </div>
          )}

          {/* Main Stage: Pure Lightbox Image Display (Clicking backdrop closes) */}
          <div 
            className="relative flex-1 flex items-center justify-center overflow-hidden px-4 sm:px-12 py-2 cursor-zoom-out"
            onClick={onClose}
          >
            <AnimatePresence initial={false} custom={direction}>
              {current && (
                <motion.div
                  key={current.src}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute inset-0 flex items-center justify-center p-2 sm:p-6 cursor-default"
                >
                  <img
                    src={current.src}
                    alt={current.alt}
                    className="max-w-full max-h-full object-contain rounded-md shadow-2xl"
                    draggable={false}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Left / Right Nav Arrows */}
            {normalized.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 rounded-full w-11 h-11 bg-black/50 hover:bg-black/85 text-white/80 hover:text-white border border-white/15 backdrop-blur-xl flex items-center justify-center transition-all duration-150 active:scale-95 z-20 shadow-xl cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 rounded-full w-11 h-11 bg-black/50 hover:bg-black/85 text-white/80 hover:text-white border border-white/15 backdrop-blur-xl flex items-center justify-center transition-all duration-150 active:scale-95 z-20 shadow-xl cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Dock: Sleek Thumbnail Strip */}
          {normalized.length > 1 && (
            <div 
              className="px-4 py-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent backdrop-blur-md overflow-x-auto scrollbar-none z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                ref={thumbnailsRef}
                className="flex items-center gap-2 mx-auto justify-start sm:justify-center w-max px-2"
              >
                {normalized.map((img, i) => {
                  const isActive = i === index;
                  return (
                    <button
                      key={`${img.src}-thumb-${i}`}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDirection(i > index ? 1 : -1);
                        setIndex(i);
                      }}
                      className={`relative rounded-md overflow-hidden h-11 w-16 sm:h-12 sm:w-20 transition-all duration-150 shrink-0 border ${
                        isActive
                          ? "border-brand-accent ring-2 ring-brand-accent/60 opacity-100 scale-105 shadow-lg"
                          : "border-white/15 opacity-40 hover:opacity-80"
                      }`}
                      aria-label={`Jump to photo ${i + 1}`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
