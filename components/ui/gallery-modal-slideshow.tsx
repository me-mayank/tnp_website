"use client";

import * as React from "react";

export type SlideshowImageInput =
  | string
  | {
      src: string;
      alt?: string;
    };

type NormalizedImage = { src: string; alt: string };

function normalizeImages(images: SlideshowImageInput[]): NormalizedImage[] {
  return images
    .filter(Boolean)
    .map((img, idx) =>
      typeof img === "string"
        ? { src: img, alt: `image-${idx + 1}` }
        : { src: img.src, alt: img.alt ?? `image-${idx + 1}` }
    );
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
  autoPlay = true,
  intervalMs = 3500,
}: GalleryModalSlideshowProps) {
  const normalized = React.useMemo(() => normalizeImages(images), [images]);
  const safeInitialIndex = React.useMemo(() => {
    if (normalized.length === 0) return 0;
    return Math.min(Math.max(initialIndex, 0), normalized.length - 1);
  }, [initialIndex, normalized.length]);

  const [index, setIndex] = React.useState<number>(safeInitialIndex);
  const [playing, setPlaying] = React.useState<boolean>(autoPlay);
  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    setIndex(safeInitialIndex);
    setPlaying(autoPlay);
  }, [open, safeInitialIndex, autoPlay]);

  React.useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

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
        setIndex((prev) => (prev + 1) % normalized.length);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex((prev) => (prev - 1 + normalized.length) % normalized.length);
      }
      if (e.key === " ") {
        // Space toggles play/pause
        e.preventDefault();
        setPlaying((p) => !p);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, normalized.length, onClose]);

  React.useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    if (!playing) return;
    if (normalized.length <= 1) return;

    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % normalized.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [open, playing, normalized.length, intervalMs]);

  const hasImages = normalized.length > 0;
  const current = hasImages ? normalized[index] : null;

  const goNext = () => {
    if (normalized.length <= 1) return;
    setIndex((prev) => (prev + 1) % normalized.length);
  };

  const goPrev = () => {
    if (normalized.length <= 1) return;
    setIndex((prev) => (prev - 1 + normalized.length) % normalized.length);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999]"
      aria-hidden={!open}
      aria-label={title}
    >
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      />

      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
        <div
          role="dialog"
          aria-modal="true"
          className="relative w-full max-w-5xl rounded-2xl bg-neutral-950/90 border border-white/10 shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-white/10">
            <div className="min-w-0">
              <h2 className="text-white font-semibold truncate">{title}</h2>
              <p className="text-white/60 text-sm truncate">
                {hasImages ? `${index + 1} / ${normalized.length}` : "No images"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium bg-white/10 text-white hover:bg-white/15 transition"
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                disabled={!hasImages || normalized.length <= 1}
              >
                {playing ? "Pause" : "Play"}
              </button>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-xl w-10 h-10 bg-white/10 text-white hover:bg-white/15 transition"
                aria-label="Close modal"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="relative bg-black">
            <div className="relative w-full h-[65vh] sm:h-[70vh]">
              {current ? (
                <img
                  src={current.src}
                  alt={current.alt}
                  className="absolute inset-0 w-full h-full object-contain"
                  draggable={false}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/70">
                  No images to display.
                </div>
              )}
            </div>

            {/* Controls */}
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full w-11 h-11 bg-white/10 text-white hover:bg-white/15 transition disabled:opacity-40 disabled:hover:bg-white/10"
              aria-label="Previous image"
              disabled={!hasImages || normalized.length <= 1}
            >
              <svg
                className="w-6 h-6 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full w-11 h-11 bg-white/10 text-white hover:bg-white/15 transition disabled:opacity-40 disabled:hover:bg-white/10"
              aria-label="Next image"
              disabled={!hasImages || normalized.length <= 1}
            >
              <svg
                className="w-6 h-6 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="px-4 sm:px-6 py-4 border-t border-white/10">
            <p className="text-white/60 text-xs">
rrows  to navigate,  Space  to play/pause.
              Tips: Press Esc to close, use arrow keys to navigate, and Space to play/pause.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
