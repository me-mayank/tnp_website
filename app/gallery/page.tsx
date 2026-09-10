import GallerySection from "./GallerySection";
import { getOptimizedImageUrl } from "@/lib/cloudinary-gallery";

// Cache static page indefinitely on Vercel's Global Edge Network
export const dynamic = "force-static";
export const revalidate = false;

export default function GalleryPage() {
  const tnpact = {
    tag: "Training & Placement",
    title: "T&P Activities",
    description:
      "Workshops, mock drives, and engagement sessions hosted by the T&P Cell.",
    image: [
      {
        src: getOptimizedImageUrl("/DLF/IMG-20260117-WA0023.jpg"),
        title: "DLF Corporate Engagement & Drive",
        alt: "DLF Placement Session and Technical Interview",
      },
      {
        src: getOptimizedImageUrl("/TCS/IMG-20260119-WA0056.jpg"),
        title: "TCS National Recruitment Drive",
        alt: "TCS Campus Recruitment Drive at IET",
      },
      {
        src: getOptimizedImageUrl("/Inmobi/IMG-20250909-WA0011.jpg"),
        title: "InMobi Tech Colloquium & Interaction",
        alt: "InMobi technical session with engineering students",
      },
      {
        src: getOptimizedImageUrl("/TCS/IMG_20260119_092455290_HDR.jpg"),
        title: "Technical Assessment & Mock Drives",
        alt: "Placement assessment and student coding test",
      },
      {
        src: getOptimizedImageUrl("/Zeta/IMG-20250828-WA0079.jpg"),
        title: "Zeta Recruitment & Coding Drive",
        alt: "Zeta student placement orientation and interviews",
      },
      {
        src: getOptimizedImageUrl("/VECV/IMG-20260109-WA0026.jpg"),
        title: "VE Commercial Vehicles Technical Drive",
        alt: "VECV campus placement process",
      },
    ],
  };

  const campusarch = {
    tag: "Campus",
    title: "Campus & Architecture",
    description:
      "A glimpse of the IET campus, iconic spaces, and student-friendly environments.",
    image: [
      {
        src: getOptimizedImageUrl("/images/campus.jpg"),
        title: "Main Campus Quadrangle & Lawns",
        alt: "IET Main Campus Quadrangle and Lawns",
      },
      {
        src: getOptimizedImageUrl("/images/sports.jpg"),
        title: "Sports Complex & Athletic Grounds",
        alt: "Campus Sports Complex and Outdoor Playgrounds",
      },
      {
        src: getOptimizedImageUrl("/images/college_image.svg"),
        title: "Institute Central Plaza",
        alt: "Institute Central Plaza and Landmark",
      },
      {
        src: getOptimizedImageUrl("/images/Campus copy.jpg", { angle: 270 }),
        title: "Campus Architecture & Lawns",
        alt: "Campus Architecture and Departmental Wings",
      },
      {
        src: getOptimizedImageUrl("/images/library.jpeg"),
        title: "Central Academic Library",
        alt: "Central Academic Library and Study Halls",
      },
      {
        src: getOptimizedImageUrl("/images/academicblock.webp"),
        title: "Main Academic Block",
        alt: "Academic Block and Lecture Theatres",
      },
      {
        src: getOptimizedImageUrl("/images/audi11.jpg"),
        title: "University Auditorium & Amphitheatre",
        alt: "University Auditorium exterior and entrance",
      },
    ],
  };

  const facilities = {
    tag: "Facilities",
    title: "Labs & Facilities",
    description:
      "Modern labs and learning spaces designed for hands-on experience and research.",
    image: [
      {
        src: getOptimizedImageUrl("/images/facilities/computer.png"),
        title: "High Performance Computing Lab",
        alt: "Computing Center Lab with high-end workstations",
      },
      {
        src: getOptimizedImageUrl("/images/facilities/workspace.webp"),
        title: "Placement Cell & Corporate Relations",
        alt: "Training & Placement Cell Office and Boardroom",
      },
      {
        src: getOptimizedImageUrl("/images/facilities/training.jpg"),
        title: "Skill Development & Training Center",
        alt: "Dedicated student training and development center",
      },
      {
        src: getOptimizedImageUrl("/images/facilities/interview.jpg"),
        title: "Corporate Interview & GD Suites",
        alt: "Executive interview suites for corporate recruiters",
      },
      {
        src: getOptimizedImageUrl("/images/facilities/presentation.jpg"),
        title: "Interactive Presentation Hall",
        alt: "Multimedia seminar and presentation hall",
      },
      {
        src: getOptimizedImageUrl("/images/newaudi.jpg"),
        title: "Main Campus Auditorium",
        alt: "Modern campus auditorium with tiered seating",
      },
    ],
  };

  return (
    <div className="bg-white text-brand-800">
      <GallerySection
        title={tnpact.title}
        tag={tnpact.tag}
        description={tnpact.description}
        images={tnpact.image}
        variant="accordion"
      />
      <GallerySection 
        title={campusarch.title} 
        tag={campusarch.tag}
        description={campusarch.description} 
        images={campusarch.image} 
        variant="bento"
      />
      <GallerySection 
        title={facilities.title} 
        tag={facilities.tag}
        description={facilities.description} 
        images={facilities.image} 
        variant="elastic"
      />
    </div>
  );
}
