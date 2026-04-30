'use client';

import Footer from '@/components/Footer';
import { Timeline } from '@/components/ui/timeline';
import Link from 'next/link';

export default function Procedure() {
  const dataset = [
  {
    title: "Step 1",
    content: (
      <div>
        <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-brand-50 text-brand-800">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-24 w-24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 2v3M16 2v3" />
            <path d="M3 9h18" />
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M8 13h2" />
            <path d="M14 13h2" />
            <path d="M8 17h2" />
            <path d="M14 17h2" />
          </svg>
        </div>
        <p className="mb-2 text-xl font-bold text-brand-800">
          Placement season timeline
        </p>
        <p className="text-sm text-muted">
          The Placement Season typically commences in the month of August and
          continues until May of the following academic year (for example, from
          August 2025 to May 2026). During this period, various organizations
          participate in recruitment activities, including internships and
          full-time roles.
        </p>
        <p className="mt-2 text-sm text-muted">
          The entire process is carefully planned and monitored by the Placement
          Office to ensure a smooth and structured experience for both students
          and recruiters.
        </p>
      </div>
    ),
  },
  {
    title: "Step 2",
    content: (
      <div>
        <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-brand-50 text-brand-800">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-24 w-24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
            <path d="m22 8-8.97 6.2a2 2 0 0 1-2.06 0L2 8" />
          </svg>
        </div>
        <p className="mb-2 text-xl font-bold text-brand-800">
          Invitations & Job Notification Form (JNF)
        </p>
        <p className="text-sm text-muted">
          The Placement Office formally reaches out to organizations by sharing
          placement invitations along with the Job Notification Form (JNF). The
          JNF captures essential details such as job profile, eligibility
          criteria, compensation structure, selection process, and preferred
          dates.
        </p>
        <p className="mt-2 text-sm text-muted">
          Organizations interested in recruiting from the institute can
          communicate directly with the Placement Office at{" "}
          <a
            href="mailto:placement@ietlucknow.ac.in"
            className="text-brand-700 underline"
          >
            placement@ietlucknow.ac.in
          </a>
          .
        </p>
      </div>
    ),
  },
  {
    title: "Step 3",
    content: (
      <div>
        <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-brand-50 text-brand-800">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-24 w-24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 11l2 2 4-4" />
            <path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
            <path d="M8 7h8" />
          </svg>
        </div>
        <p className="mb-2 text-xl font-bold text-brand-800">
          Candidate shortlisting
        </p>
        <p className="text-sm text-muted">
          Once a company confirms its participation and finalizes the eligibility
          criteria, a list of interested and eligible candidates is prepared.
          This shortlist is based on academic performance, branch, skills, and
          other criteria specified in the JNF.
        </p>
        <p className="mt-2 text-sm text-muted">
          The shortlisted candidates are then informed in advance about the
          upcoming selection process and relevant instructions.
        </p>
      </div>
    ),
  },
  {
    title: "Step 4",
    content: (
      <div>
        <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-brand-50 text-brand-800">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-24 w-24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19V5" />
            <path d="M4 5h9l2 2h5v12H4" />
            <path d="M8 11h8" />
            <path d="M8 15h6" />
          </svg>
        </div>
        <p className="mb-2 text-xl font-bold text-brand-800">
          Schedule finalization & arrangements
        </p>
        <p className="text-sm text-muted">
          A tentative visit or virtual engagement date is mutually decided
          between the organization and the Placement Office. Upon confirmation,
          all necessary arrangements are made for the Pre-Placement Talk (PPT),
          written tests, interviews, and other selection rounds.
        </p>
        <p className="mt-2 text-sm text-muted">
          The institute ensures seamless coordination, infrastructure support,
          and communication throughout the recruitment process.
        </p>
      </div>
    ),
  },
  {
    title: "Step 5",
    content: (
      <div>
        <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-brand-50 text-brand-800">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-24 w-24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 21h8" />
            <path d="M12 17v4" />
            <path d="M7 4h10" />
            <path d="M17 4v6a5 5 0 0 1-10 0V4" />
            <path d="M5 7h2" />
            <path d="M17 7h2" />
          </svg>
        </div>
        <p className="mb-2 text-xl font-bold text-brand-800">
          Selection process & results
        </p>
        <p className="text-sm text-muted">
          The organization conducts its recruitment process, which may include
          aptitude tests, technical assessments, group discussions, and personal
          interviews. Based on performance, candidates are shortlisted for final
          selection.
        </p>
        <p className="mt-2 text-sm text-muted">
          In most cases, the final results are declared on the same day or within
          a short stipulated timeframe communicated by the company.
        </p>
      </div>
    ),
  },
  {
    title: "Step 6",
    content: (
      <div>
        <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-brand-50 text-brand-800">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-24 w-24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2 4 5v6c0 5 3.2 9.4 8 11 4.8-1.6 8-6 8-11V5l-8-3Z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>
        <p className="mb-2 text-xl font-bold text-brand-800">
          Student placement policy
        </p>
        <p className="text-sm text-muted">
          Students who receive an official offer or confirmation letter are
          considered reserved for that particular organization and are not
          permitted to participate in other companies offering roles within the
          same pay-scale bracket.
        </p>
        <p className="mt-2 text-sm text-muted">
          Additionally, once a student enters the selection process of a
          company, withdrawing at any intermediate stage is strictly not
          allowed, in accordance with institute placement policies.
        </p>
      </div>
    ),
  },
];

    return (
      <div className="bg-white">
        <main className="bg-white py-20" id="procedure">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-800 tracking-tight">
                Placement Procedure
              </h1>
              <p className="mt-3 text-muted max-w-2xl mx-auto">
                A structured and transparent process ensuring seamless coordination between recruiters and students.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/recruiters/contactform"
                  className="px-4 py-2 rounded-full bg-brand-800 text-white text-sm font-semibold hover:bg-brand-900 transition"
                >
                  Company Contact Form
                </Link>
                <Link
                  href="/recruiters/invitation"
                  className="px-4 py-2 rounded-full border border-brand-200 text-brand-800 text-sm font-semibold hover:bg-brand-50 transition"
                >
                  View Invitation
                </Link>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-glow-md p-6 sm:p-8">
              <Timeline data={dataset} />
            </div>
          </div>
        </main>
      </div>
    );
}