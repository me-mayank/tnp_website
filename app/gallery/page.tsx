import GallerySection from "./GallerySection";

import fs from "node:fs";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
]);

function getImagesFromPublicFolder(folderName: string): string[] {
  const publicDir = path.join(process.cwd(), "public");
  const absDir = path.join(publicDir, folderName);
  if (!fs.existsSync(absDir)) return [];

  return fs
    .readdirSync(absDir)
    .filter((fileName) => {
      const ext = path.extname(fileName).toLowerCase();
      return IMAGE_EXTENSIONS.has(ext);
    })
    .sort((a, b) => a.localeCompare(b))
    .map((fileName) => `/${folderName}/${fileName}`);
}

export default function GalleryPage() {
  const tnpact = {
    tag: "Training & Placement",
    title: "T&P Activities",
    description:
      "Workshops, mock drives, and engagement sessions hosted by the T&P Cell.",
    image: [
      "/DLF/IMG-20260117-WA0023.jpg",
      "/TCS/IMG-20260119-WA0056.jpg",
      "/Inmobi/IMG-20250909-WA0011.jpg",
      "/TCS/IMG_20260119_092455290_HDR.jpg",
      "/Zeta/IMG-20250828-WA0079.jpg",
      "/VECV/IMG-20260109-WA0026.jpg",     
    ],
  };

  // Full-screen modal slideshow images (auto-generated from /public)
  // Includes all images present in these folders; deleted files disappear automatically.
  const tnpactModalImages = [
    ...getImagesFromPublicFolder("DLF"),
    ...getImagesFromPublicFolder("TCS"),
    ...getImagesFromPublicFolder("VECV"),
    ...getImagesFromPublicFolder("Inmobi"),
    ...getImagesFromPublicFolder("Zeta"),
  ];
  const campusarch = {
    tag: "Campus",
    title: "Campus & Architecture",
    description:
      "A glimpse of the IET campus, iconic spaces, and student-friendly environments.",
    image: [
      "/images/campus.jpg",
      "/images/academicblock.webp",
      "/images/college_image.svg",
      "/images/auditorium.png",
      "/images/library.jpeg",
      "/images/sportscom.jpg",
    ],
  };

  const facilities = {
    tag: "Facilities",
    title: "Labs & Facilities",
    description:
      "Modern labs and learning spaces designed for hands-on experience and research.",
    image: [
      "/images/facilities/computer.png",
      "/images/facilities/workspace.webp",
      "/images/facilities/training.jpg",
      "/images/facilities/interview.jpg",
      "/images/facilities/presentation.jpg",
      "/images/facilities/audi.jpg",
    ],
  };
  return (
    <div className="bg-white text-brand-800">
      <GallerySection
        title={tnpact.title}
        description={tnpact.description}
        images={tnpact.image}
        modalImages={tnpactModalImages}
      />
      <GallerySection title={campusarch.title} description={campusarch.description} images={campusarch.image} />
      <GallerySection title={facilities.title} description={facilities.description} images={facilities.image} />
    </div>
  );
}
