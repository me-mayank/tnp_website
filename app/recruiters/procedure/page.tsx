"use client"
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Define the shape of each step object
interface Step {
  title: string;
  detail: string[];
}

const steps: Step[] = [
  {
    title: "Placement season timeline",
    detail: [
      "The Placement Season typically commences in the month of August and continues until May of the following academic year (for example, from August 2025 to May 2026). During this period, various organizations participate in recruitment activities, including internships and full-time roles.",
      "The entire process is carefully planned and monitored by the Placement Office to ensure a smooth and structured experience for both students and recruiters."
    ]
  },
  {
    title: "Invitations & Job Notification Form (JNF)",
    detail: [
      "The Placement Office formally reaches out to organizations by sharing placement invitations along with the Job Notification Form (JNF). The JNF captures essential details such as job profile, eligibility criteria, compensation structure, selection process, and preferred dates.",
      "Organizations interested in recruiting from the institute can communicate directly with the Placement Office at placement@ietlucknow.ac.in."
    ]
  },
  {
    title: "Candidate shortlisting",
    detail: [
      "Once a company confirms its participation and finalizes the eligibility criteria, a list of interested and eligible candidates is prepared. This shortlist is based on academic performance, branch, skills, and other criteria specified in the JNF.",
      "The shortlisted candidates are then informed in advance about the upcoming selection process and relevant instructions."
    ]
  },
  {
    title: "Schedule finalization & arrangements",
    detail: [
      "A tentative visit or virtual engagement date is mutually decided between the organization and the Placement Office. Upon confirmation, all necessary arrangements are made for the Pre-Placement Talk (PPT), written tests, interviews, and other selection rounds.",
      "The institute ensures seamless coordination, infrastructure support, and communication throughout the recruitment process."
    ]
  },
  {
    title: "Selection process & results",
    detail: [
      "The organization conducts its recruitment process, which may include aptitude tests, technical assessments, group discussions, and personal interviews. Based on performance, candidates are shortlisted for final selection.",
      "In most cases, the final results are declared on the same day or within a short stipulated timeframe communicated by the company."
    ]
  },
  {
    title: "Student placement policy",
    detail: [
      "Students who receive an official offer or confirmation letter are considered reserved for that particular organization and are not permitted to participate in other companies offering roles within the same pay-scale bracket.",
      "Additionally, once a student enters the selection process of a company, withdrawing at any intermediate stage is strictly not allowed, in accordance with institute placement policies."
    ]
  },
];

const getStepIcon = (index: number, className: string): React.JSX.Element => {
  const icons = [
    // Step 1: Calendar / Timeline
    <svg key="0" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
    </svg>,
    // Step 2: Invitations & JNF (Document/Mail)
    <svg key="1" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>,
    // Step 3: Candidate shortlisting (Search / User Check)
    <svg key="2" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>,
    // Step 4: Schedule finalization (Calendar Check)
    <svg key="3" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
    </svg>,
    // Step 5: Selection process (Award / Checked Clipboard)
    <svg key="4" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </svg>,
    // Step 6: Student placement policy (Shield)
    <svg key="5" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.375c1.88 0 3.438-1.273 3.87-3m-12.13 4.875A3 3 0 0112 15h2.25H15a2.25 2.25 0 002.25-2.25c0-.115-.009-.23-.027-.343M1.5 12c0-5.797 4.703-10.5 10.5-10.5s10.5 4.703 10.5 10.5-4.703 10.5-10.5 10.5S1.5 17.797 1.5 12zm3.187 0A7.313 7.313 0 1112 19.313 7.313 7.313 0 014.687 12z" />
    </svg>
  ];
  return icons[index] || icons[0];
};

export default function PlacementProcedure(): JSX.Element {
  // TypeScript infers primitive types (number, boolean) automatically
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [flipped, setFlipped] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [animating, setAnimating] = useState<boolean>(false);

  // Explicitly type the ref for the div element
  const cardRef = useRef<HTMLDivElement | null>(null);

  const themeClass: string = "theme-even";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (rotation === 0) {
              setRotation(180);
              setFlipped(true);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [rotation]);

  // Define parameter types for the flip logic
  const triggerFlip = (nextIndex: number, dir: "next" | "prev"): void => {
    if (animating || nextIndex === currentStep) return;

    setAnimating(true);
    setCurrentStep(nextIndex);
    setRotation((prev) => prev + (dir === "next" ? 180 : -180));
    setFlipped((prev) => !prev);
  };

  const goNext = (): void => {
    const nextIndex = Math.min(currentStep + 1, steps.length - 1);
    triggerFlip(nextIndex, "next");
  };

  const goPrevious = (): void => {
    const prevIndex = Math.max(currentStep - 1, 0);
    triggerFlip(prevIndex, "prev");
  };

  const jumpToStep = (index: number): void => {
    if (index === currentStep) return;
    triggerFlip(index, index > currentStep ? "next" : "prev");
  };

  return (
    <section className={`placement-procedure ${themeClass}`}>
      <motion.div
        className="placement-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div>
          <h2>Placement Procedure</h2>
          <p className="placement-subtitle">
            A structured and transparent process ensuring seamless coordination between recruiters and students.
          </p>
        </div>

        <div className="placement-actions">
          <Link href="/recruiters/contactform" passHref legacyBehavior>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary"
            >
              Company Contact Form
            </motion.a>
          </Link>
          <Link href="/recruiters/invitation" passHref legacyBehavior>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary"
            >
              View Invitation
            </motion.a>
          </Link>
        </div>
      </motion.div>

      <div className="step-map-wrap">
        <div className="step-map-line">
          <motion.div
            className="step-map-line-fill"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </div>
        <motion.div
          className="step-map"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 }
            }
          }}
        >
          {steps.map((step, index) => {
            const status = index < currentStep ? "done" : index === currentStep ? "active" : "pending";

            return (
              <motion.button
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                key={step.title}
                type="button"
                className={`step-node ${status}`}
                onClick={() => jumpToStep(index)}
              >
                <span className="step-number">
                  {status === "done" ? (
                    <svg className="step-checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </span>
                <span className="step-label">{step.title}</span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      <motion.div
        className="card-shell"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
      >
        <div className={`flip-card ${themeClass}`} ref={cardRef}>
          <motion.div
            className="flip-card-inner"
            animate={{
              rotateY: rotation,
              scale: animating ? 0.96 : 1
            }}
            transition={{
              duration: 0.65,
              type: "spring",
              bounce: 0.25
            }}
            onAnimationComplete={() => setAnimating(false)}
          >
            {/* Front Side */}
            <div className="flip-face flip-front">
              <div className="card-top-row">
                <span className="card-step">Step {currentStep + 1}</span>
                {getStepIcon(currentStep, "step-icon-glow")}
              </div>
              <h3>{steps[currentStep].title}</h3>
              <div className="card-detail-paragraphs">
                {steps[currentStep].detail.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
              <div className="card-bg-watermark">
                {getStepIcon(currentStep, "watermark-svg")}
              </div>
            </div>

            {/* Back Side */}
            <div className="flip-face flip-back">
              <div className="card-top-row">
                <span className="card-step">Step {currentStep + 1}</span>
                {getStepIcon(currentStep, "step-icon-glow")}
              </div>
              <h3>{steps[currentStep].title}</h3>
              <div className="card-detail-paragraphs">
                {steps[currentStep].detail.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
              <div className="card-bg-watermark">
                {getStepIcon(currentStep, "watermark-svg")}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="card-controls">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="nav-btn"
            onClick={goPrevious}
            disabled={currentStep === 0 || animating}
          >
            Previous
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="nav-btn nav-btn-primary"
            onClick={goNext}
            disabled={currentStep === steps.length - 1 || animating}
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}