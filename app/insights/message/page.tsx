'use client';

import Image from 'next/image';
import Link from 'next/link';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import { MagicText } from '@/components/ui/magic-text';

export default function Message() {
  return (
    <div className="page-top-gap bg-white">
      {/* Main Content */}
      <main className="bg-white pt-28 pb-16 md:pt-32" id="message">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <TypewriterEffect
              words={[
                { text: "Training" },
                { text: "and" },
                { text: "Placement" },
                { text: "Officer" },
                { text: "Incharge" },
              ]}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-800 font-poppins"
              cursorClassName="hidden"
            />
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-glow-md p-6 sm:p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="w-full overflow-hidden rounded-xl shadow-md border border-gray-100">
                  <Image
                    src="/images/akt.jpeg"
                    alt="Dr. Arun Kumar Tiwari"
                    className="w-full h-auto object-cover"
                    width={1200}
                    height={800}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    loading="lazy"
                  />
                </div>

                <div className="mt-4 space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-brand-800 tracking-tight">
                    Dr. Arun Kumar Tiwari
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-muted">
                    Officer Incharge, Training &amp; Placement Cell
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2 flex flex-col justify-center">
                <div className="prose prose-sm sm:prose-base max-w-none text-muted space-y-4">
                  <MagicText
                    text="On behalf of the Institute of Engineering and Technology (IET), Lucknow, it is my distinct privilege to extend a warm invitation to your esteemed organization to participate in our campus recruitment program. Since our inception in 1984, IET Lucknow has cultivated a steadfast legacy of academic excellence, evolving over the past four decades into a premier hub for engineering talent and technical innovation."
                    className="text-muted"
                    delay={0}
                    stagger={0.012}
                  />
                  <MagicText
                    text="Our rigorous academic curriculum, coupled with a strong emphasis on pioneering research, consultancy, and holistic development, ensures that our students are highly adaptable and industry-ready. Time and again, our cohorts have exceeded the expectations of leading recruiters by demonstrating exceptional problem-solving acumen and the technical proficiency required to tackle complex workplace challenges. Our alumni are a testament to this foundation, consistently occupying strategic leadership roles in top-tier organizations both across the nation and globally."
                    className="text-muted"
                    delay={0.5}
                    stagger={0.012}
                  />
                  <MagicText
                    text="Within this portal, you will find comprehensive information regarding our diverse talent pool, academic programs, and placement procedures. We invite you to explore these resources and would be honored to host your recruiting teams at our campus on a mutually convenient date to select the bright minds ready to drive your organization's future growth."
                    className="text-muted"
                    delay={1.1}
                    stagger={0.012}
                  />
                  <MagicText
                    text="We deeply value the trust and faith our corporate partners have placed in our institution over the years. We remain committed to nurturing these vital connections and eagerly look forward to hosting you at IET Lucknow to forge a lasting, mutually beneficial relationship."
                    className="text-muted"
                    delay={1.6}
                    stagger={0.012}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}