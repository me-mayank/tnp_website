"use client";

import Image from "next/image";

// =============================================================================
// HERO SECTION
// =============================================================================

function HeroSection(): JSX.Element {
  return (
    <section className="relative w-full">
      {/* Mobile-only background image */}
      <div className="sm:hidden relative w-full aspect-[1024/572]">
        <Image
          src="/images/college_mobile.jpg"
          alt="IET Lucknow College Mobile"
          fill
          priority
          className="object-cover object-top"
        />
      </div>

      {/* Desktop-only background image */}
      <div className="hidden sm:block relative w-full h-[48vh] md:h-[60vh] bg-slate-900">
        <Image
          src="/images/college.png"
          alt="IET Lucknow College Desktop"
          fill
          priority
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>
    </section>
  );
}

// =============================================================================
// INVITATION LETTER SECTION
// =============================================================================

function Letter(): JSX.Element {
  return (
    <section className="relative -mt-16 sm:-mt-[20vh] md:-mt-[28vh] z-10 px-3 sm:px-4 md:px-6 mb-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#efeee9] border border-black/10 rounded-[26px] shadow-[0_24px_70px_rgba(0,0,0,0.14)] md:p-14 px-2">
          <div className="relative max-w-5xl mx-auto w-full bg-white border border-gray-300 rounded-[18px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] px-6 sm:px-8 md:px-12 py-8 md:py-10 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[5px] bg-slate-700" />

            <div className="pb-5 border-b border-gray-300">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                <div>
                  <p className="text-[2rem] md:text-[2.15rem] font-bold uppercase tracking-tight text-slate-800 leading-none">
                    Invitation
                  </p>

                  <h2 className="mt-3 text-[11px] md:text-xs uppercase tracking-[0.24em] text-gray-500">
                    Institute of Engineering and Technology, Lucknow
                  </h2>

                  <p className="mt-2 text-sm font-medium text-gray-700">
                    Training and Placement Cell • Uttar Pradesh, India
                  </p>
                </div>

                <div className="md:text-right text-sm leading-6 text-gray-600 md:pt-1">
                  <p className="font-semibold text-slate-700">
                    Official Communication
                  </p>
                  <p>
                    E-Mail:{" "}
                    <a
                      href="mailto:placement@ietlucknow.ac.in"
                      className="text-slate-700 underline underline-offset-2 hover:text-slate-900"
                    >
                      placement@ietlucknow.ac.in
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 space-y-5 text-[15px] md:text-[15.2px] leading-[1.82] text-gray-800">
              <p className="font-medium text-gray-900">Dear Sir / Madam,</p>

              <p>
                It gives me immense pleasure to extend to you the most cordial
                invitation to participate in the Campus Recruitment programme of
                our Institute. Now, more than ever, the emphasis is on
                Institute-Industry Interaction, and both the Institute and the
                participating Industry are bound to find it mutually beneficial.
              </p>

              <p>
                IET Lucknow, a government institute established in the year 1984,
                is one of the oldest and finest engineering institutes in the
                state of Uttar Pradesh. Over the years, we have developed a strong
                foundation in academics, technology, innovation, and leadership
                in North India. We are among the elite technical institutions of
                the country and have consistently achieved excellence in
                academics and research.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4">
                <p className="font-semibold text-gray-900 mb-2">
                  The Institute offers the following programs:
                </p>

                <ul className="list-disc pl-6 space-y-1.5 text-gray-700 marker:text-slate-700">
                  <li>8 programs for Bachelor of Technology (B.Tech)</li>
                  <li>6 programs for Master of Technology (M.Tech)</li>
                  <li>Master of Business Administration (MBA)</li>
                  <li>Master of Computer Application (MCA)</li>
                </ul>
              </div>

              <p>
                We make continuous efforts to groom our students not only in
                their chosen disciplines but also to broaden their perspectives
                and develop a positive professional attitude. Undergraduate
                students undergo an eight-week industrial training, while MCA
                students complete a six-month training during their final
                semester.
              </p>

              <p>
                We are delighted to invite you to participate in the Campus
                Recruitment Drive for the graduating batch of 2026. It would be
                our privilege if you provide an opportunity to our students for
                campus placements. Additionally, we invite you to participate in
                our Summer Internship Drive for the 2027 batch, allowing you to
                evaluate potential future employees.
              </p>

              <p>
                Enclosed are the Placement Brochure and Department brochures,
                providing detailed insights into our academic programs. Also
                included are the Job Notification Form (JNF) and Internship
                Notification Form (INF). Kindly fill and share them with us so
                that we can schedule your visit at a mutually convenient time.
              </p>

              <p>
                Please feel free to contact us for any further information or
                clarification.
              </p>

              <p>
                We look forward to building a mutually beneficial relationship.
              </p>

              <p className="pt-2 font-medium text-gray-900">Thanks & Regards,</p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-300 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
              <div>
                <p className="font-semibold text-gray-900 text-[15.5px]">
                  Dr. Arun Kumar Tiwari
                </p>
                <p className="mt-1 text-sm text-gray-500">Officer in Charge</p>
                <p className="text-sm text-gray-500">
                  Training and Placement Cell
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function PlacementPage(): JSX.Element {
  return (
    <>
      <HeroSection />
      <Letter />
    </>
  );
}