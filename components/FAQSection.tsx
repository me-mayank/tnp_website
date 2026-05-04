'use client';

import React, { useState } from 'react';
import RevealSection from './RevealSection';
import SplitText from './ui/SplitText';

const FAQS = [
  {
    question: "How do I register for campus placements?",
    answer: "Students can register through the T&P portal using their institutional ERP credentials. Once registered, you will be notified of upcoming recruitment drives and can apply based on eligibility criteria."
  },
  {
    question: "What is the typical placement process for a company?",
    answer: "The process usually includes a Pre-Placement Talk (PPT), followed by online/written tests, Group Discussions (GD), and multiple rounds of technical and HR interviews. The final list of selected students is usually announced on the same day."
  },
  {
    question: "Are there any training programs for interview preparation?",
    answer: "Yes, the T&P Cell organizes various workshops, mock interviews, and soft-skill training sessions. We also facilitate guest lectures from industry experts to help students understand current market expectations."
  },
  {
    question: "What are the criteria for participating in placements?",
    answer: "Eligibility criteria vary by company. Common factors include a minimum CGPA (usually 6.0-7.0), no active backlogs, and adherence to the institutional placement policy regarding single/multiple offers."
  },
  {
    question: "How can companies initiate a recruitment drive?",
    answer: "Companies can initiate the process by contacting the T&P Cell via email at tpo@ietlucknow.ac.in or by registering on our portal. Our coordinators will then facilitate the scheduling of PPTs and selection rounds."
  },
  {
    question: "Does the college assist in finding internships?",
    answer: "Absolutely. The T&P Cell actively works with industry partners to secure summer and winter internships for 2nd and 3rd-year students, which often lead to Pre-Placement Offers (PPOs)."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <RevealSection id="faq" className="py-20 bg-gray-50/50 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-accent/5 rounded-full -translate-x-32 -translate-y-32 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/20 rounded-full translate-x-32 translate-y-32 blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <SplitText 
            text="Frequently Asked Questions" 
            tag="h2" 
            className="text-3xl md:text-4xl font-bold text-brand-800"
            delay={30} 
            duration={1} 
            splitType="chars" 
            from={{ opacity: 0, y: 20 }} 
            to={{ opacity: 1, y: 0 }} 
          />
          <div className="h-1.5 w-20 bg-brand-accent rounded-full mx-auto mt-4"></div>
          <p className="text-slate-600 mt-6 max-w-2xl mx-auto">
            Find answers to common questions about the placement process, eligibility, and industry collaborations at IET Lucknow.
          </p>
        </div>
        
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className={`group border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md ${
                openIndex === index ? 'border-brand-accent bg-white' : 'border-slate-100 bg-white/80'
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors"
              >
                <span className={`font-bold transition-colors duration-300 ${
                  openIndex === index ? 'text-brand-accent' : 'text-brand-800'
                }`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === index ? 'bg-brand-accent text-white rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-brand-50'
                }`}>
                  <svg 
                    className="w-5 h-5"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div 
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50 mt-2">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
            <p className="text-slate-500 text-sm">
                Still have questions? Contact the T&P Cell at 
                <a href="mailto:tpo@ietlucknow.ac.in" className="text-brand-accent font-semibold ml-1 hover:underline">
                    tpo@ietlucknow.ac.in
                </a>
            </p>
        </div>
      </div>
    </RevealSection>
  );
};

export default FAQSection;
