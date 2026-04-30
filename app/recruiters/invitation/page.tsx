'use client';

import Link from 'next/link';

export default function Invitation() {
  return (
    <div className="bg-white">
      {/* MAIN CONTENT */}
      <main className="bg-white py-20" id="invitation">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-800 tracking-tight">
              INVITATION
            </h1>
            <p className="mt-3 text-muted font-medium">
              INSTITUTE OF ENGINEERING AND TECHNOLOGY, LUCKNOW<br />
              Training and Placement Cell • Uttar Pradesh, India
            </p>
            <p className="text-sm text-brand-700 mt-1">
              E-Mail :{' '}
              <a className="underline" href="mailto:placement@ietlucknow.ac.in">
                placement@ietlucknow.ac.in
              </a>
            </p>
          </div>

          {/* Letter Body */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-glow-md p-8 sm:p-10 lg:p-12">
            <div className="prose prose-sm sm:prose-base max-w-none text-muted leading-relaxed text-justify">
              <p><strong>Dear Sir / Madam,</strong></p>
              <br />

              <p>
                It gives me immense pleasure to extend to you the most cordial
                invitation to you to participate in the Campus Recruitment
                programme of our Institute. Now, more than ever, the emphasis is
                on Institute-Industry Interaction, and both the Institute,
                conducting the Campus Recruitment programme and the Industry,
                participating in the same, are bound to find it mutually
                beneficial.
              </p>
              <br />

              <p>
                IET Lucknow, a government Institute established in the year 1984,
                is the oldest and finest engineering institute in the state of
                U.P. Over the years, we have developed an excellent background in
                academics, technology, innovation and leadership in North India.
                We are among the elite technical institutes of India and have
                achieved tremendous excellence and progress in academics and
                research since our establishment in 1961. The Institute has been
                one of the most sought after institutions by students as well as
                recruiters all across the nation.
              </p>
              <br />

              <p>The Institute offers following programs-</p>
              <br />

              <ul className="list-disc pl-6">
                <li>8 programs for Bachelor of Technology (B.Tech)</li>
                <li>6 programs for Master of Technology (M.Tech)</li>
                <li>Master of Business Administration (MBA)</li>
                <li>Master of Computer Application (MCA)</li>
              </ul>
              <br />

              <p>
                We spare no efforts to groom our students, not only in their
                chosen discipline but also broaden their mindsets and create
                positive attitudes thus equipping them with all qualities to make
                them an asset to whichever institute/organization they may join.
                Undergraduates undergo an eight-week training in reputed
                organizations, while MCA students undergo training of 6 months
                during their last semester.
              </p>
              <br />

              <p>
                We feel immense joy in extending an invitation to visit our
                institute for participating in Campus Recruitment Drive for the
                students of 2026 batch. We will feel privileged if you would
                provide an opportunity to our students for campus placements. In
                addition, our pre-final year is a store-house of enormous
                potential. We would be obliged to have you as a part of our Summer
                Internship Drive and offer internship opportunities to our 2027
                batch students. This shall help you in previewing the pre-final
                year students as prospective employees.
              </p>
              <br />

              <p>
                I have included our Placement Brochure providing a profile of the
                Institute and various Department brochures giving the insights of
                various programmes/courses and details of the contact persons.
                Also enclosed is Job Notification Form (JNF) and Internship
                Notification Form (INF), which may be filled in and mailed to us,
                on receipt of which we would be happy to fix a mutually convenient
                date for your visit to our campus. It would be our proud privilege
                to host you at our campus.
              </p>
              <br />

              <p>
                Please feel free to call me on my mobile, should you require any
                further information/clarification.
              </p>
              <br />
              <p>Looking forward to a mutually beneficial relationship.</p>
              <br />

              <p className="mt-10"><strong>Thanks & Regards,</strong></p>
              <br />

              <p>
                <strong>Dr. Arun Kumar Tiwari</strong><br />
                Officer in Charge<br />
                Training and Placement Cell
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}