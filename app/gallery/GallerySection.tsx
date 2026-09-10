"use client";

import * as React from "react";
import Gallerythumb, { 
  type GalleryThumbImageInput, 
  type GalleryVariant 
} from "@/components/ui/image-gallery";
import GalleryModalSlideshow, {
  type SlideshowImageInput,
} from "@/components/ui/gallery-modal-slideshow";

type GallerySectionProps = {
  title: string;
  description: string;
  images: GalleryThumbImageInput[];
  modalImages?: SlideshowImageInput[];
  variant?: GalleryVariant;
  tag?: string;
};

export default function GallerySection({
  title,
  description,
  images,
  variant = 'accordion',
  tag,
}: GallerySectionProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // Ensure ONLY the images shown in the boxes play in the slideshow
  const slideshowImages = images;

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  return (
    <div className="border-b border-slate-100/80 last:border-b-0">
      <Gallerythumb 
        title={title} 
        description={description} 
        images={images} 
        variant={variant}
        tag={tag}
        onImageClick={handleImageClick}
      />

      <div className="mt-4 mb-16 text-center">
        <button
          type="button"
          onClick={() => {
            setSelectedIndex(0);
            setOpen(true);
          }}
          className="inline-flex items-center gap-2.5 bg-brand-800 hover:bg-brand-700 text-white px-7 py-3.5 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
        >
          <span>View all images</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>

      <GalleryModalSlideshow
        open={open}
        onClose={() => setOpen(false)}
        images={slideshowImages}
        initialIndex={selectedIndex}
        title={title}
      />
    </div>
  );
}
