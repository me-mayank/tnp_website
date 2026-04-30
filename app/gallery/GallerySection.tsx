"use client";

import * as React from "react";
import Gallerythumb, { type GalleryThumbImageInput } from "@/components/ui/image-gallery";
import GalleryModalSlideshow, {
  type SlideshowImageInput,
} from "@/components/ui/gallery-modal-slideshow";

type GallerySectionProps = {
  title: string;
  description: string;
  images: GalleryThumbImageInput[];
  modalImages?: SlideshowImageInput[];
};

export default function GallerySection({
  title,
  description,
  images,
  modalImages,
}: GallerySectionProps) {
  const [open, setOpen] = React.useState(false);
  const slideshowImages = modalImages ?? images;

  return (
    <div>
      <Gallerythumb title={title} description={description} images={images} />

      <div className="mt-8 mb-16 text-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 bg-brand-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <span>View More</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>

      <GalleryModalSlideshow
        open={open}
        onClose={() => setOpen(false)}
        images={slideshowImages}
        title={title}
      />
    </div>
  );
}
