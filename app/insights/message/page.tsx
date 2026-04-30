'use client';

import Image from 'next/image';
import Link from 'next/link';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import { MagicText } from '@/components/ui/magic-text';

export default function Message() {
  return (
    <div className="bg-white">
      {/* Main Content */}
      <main className="bg-white py-16" id="message">
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              <div className="flex flex-col items-center lg:items-stretch text-center lg:text-left">
                <div className="w-full flex-1 mb-4 lg:mb-6">
                  <Image
                    src="/images/akt.jpeg"
                    alt="Dr. Arun Kumar Tiwari"
                    className="w-full h-auto rounded-xl shadow-md border border-gray-100"
                    width={1200}
                    height={800}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    loading="lazy"
                  />
                </div>

                <div className="mt-2 lg:mt-4">
                  <div className="text-sm font-semibold text-brand-800">
                    Dr. Arun Kumar Tiwari
                  </div>
                  <div className="text-xs text-muted">
                    Office Incharge, Training &amp; Placement Cell
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 flex flex-col">
                <div className="prose prose-sm sm:prose-base max-w-none text-justify text-muted leading-relaxed">
                  <div className="prose prose-sm sm:prose-base max-w-none text-justify text-muted leading-relaxed">
                    <MagicText
                      text="On behalf of Institute of Engineering and Technology, Lucknow, it is my pleasure to invite you to our beautiful academic campus to conduct campus selection programme for our students. Established in the year 1984, the institute has improved in every domain in the last three decades. The students of this institute are occupying enviable positions in various organizations at home and abroad. Our students have lived up to the expectations of organizations that visit the campus, looking for bright candidates to take up important and challenging responsibilities at their workplace. The Institute has earned fame not only for its excellent academic and extracurricular activities but also for its research, consultancy and development activities. I am furnishing in the pages to follow all pertinent information about our college and students studying here. I would request you to kindly visit our campus for selecting candidates of your choice on any date convenient to both of us. Here at IET we look forward to nurture and extend our relationship in upcoming years. We truly appreciate the faith bestowed upon us by your organization and we look forward to continuing our relationship with you. Looking forward to meeting you at our campus!"
                      className="text-right text-muted"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}