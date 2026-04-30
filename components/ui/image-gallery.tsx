import Image from 'next/image';

export type GalleryThumbImage = {
  src: string;
  alt: string;
};

export type GalleryThumbImageInput = string | GalleryThumbImage;

type GallerythumbProps = {
  images?: GalleryThumbImageInput[];
  title?: string;
  description?: string;
};

export default function Gallerythumb({
  images = [],
  title = "Gallery Highlights",
  description =
    "A visual glimpse of Training & Placement activities, campus life, and facilities.",
}: GallerythumbProps) {
  const normalizedImages: GalleryThumbImage[] = images
    .filter((img) => Boolean(img))
    .map((img, idx) =>
      typeof img === "string" ? { src: img, alt: `image-${idx + 1}` } : img
    );

  return (
    <>
      <section className="w-full flex flex-col items-center justify-start py-12">
      
        <div className="max-w-3xl text-center px-4">
          <h1 className="text-3xl font-extrabold">{title}</h1>
          <p className="text-sm text-slate-500 mt-2">{description}</p>
        </div>

        {normalizedImages.length === 0 ? (
          <div className="flex items-center gap-2 h-[240px] md:h-[400px] w-full max-w-5xl mt-10 px-4">
            <div className="w-full h-full rounded-lg border border-dashed border-slate-200 bg-slate-50 flex items-center justify-center text-sm text-slate-500">
              No images to display.
            </div>
          </div>
        ) : (
          <>
            {/* Mobile layout: simple grid */}
            <div className="flex md:hidden w-full max-w-5xl mt-8 px-4">
              <div className="grid grid-cols-2 gap-3 w-full">
                {normalizedImages.map((img, idx) => (
                  <div
                    key={`${img.src}-${idx}-mobile`}
                    className="relative rounded-lg overflow-hidden h-32 sm:h-40"
                  >
                    <Image
                      className="object-cover object-center"
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop layout: existing hover-strip layout */}
            <div className="hidden md:flex items-center gap-2 h-[400px] w-full max-w-5xl mt-10 px-4">
              {normalizedImages.map((img, idx) => (
                <div
                  key={`${img.src}-${idx}-desktop`}
                  className="relative group flex-grow transition-all w-56 rounded-lg overflow-hidden h-[400px] duration-500 hover:w-full"
                >
                  <Image
                    className="object-cover object-center"
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
