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

export default function PlacementProcedure(): JSX.Element {
  // TypeScript infers primitive types (number, boolean) automatically
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [flipped, setFlipped] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [animating, setAnimating] = useState<boolean>(false);

  // Explicitly type the ref for the div element
  const cardRef = useRef<HTMLDivElement | null>(null);

  const themeClass: string = currentStep % 2 === 0 ? "theme-even" : "theme-odd";

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
                <span className="step-number">{index + 1}</span>
                <span className="step-label">{step.title}</span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      <motion.div
        className="card-shell"
        initial={{ opacity: 0, scale: 0.9 }}
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
              <span className="card-step">Step {currentStep + 1}</span>
              <h3>{steps[currentStep].title}</h3>
              {steps[currentStep].detail.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Back Side */}
            <div className="flip-face flip-back">
              <span className="card-step">Step {currentStep + 1}</span>
              <h3>{steps[currentStep].title}</h3>
              {steps[currentStep].detail.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
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