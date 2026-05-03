'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Poppins } from 'next/font/google';
import { 
  Calendar, 
  FileText, 
  Users, 
  ClipboardCheck, 
  Trophy, 
  ShieldCheck,
  ArrowRight,
  Mail,
  Building2,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import BorderGlow from '@/components/BorderGlow';

const poppins = Poppins({ weight: ["700", "800"], subsets: ["latin"] });

const steps = [
  {
    id: '01',
    title: "Placement season timeline",
    icon: <Calendar className="w-6 h-6 text-blue-600" />,
    bottomIcon: <Calendar className="w-10 h-10 text-blue-400 opacity-20" />,
    description: "The Placement Season typically commences in the month of August and continues until May of the following academic year (for example, from August 2025 to May 2026). Various organizations participate in recruitment activities, including internships and full-time roles.",
    extra: "The entire process is carefully planned and monitored by the Placement Office to ensure a smooth and structured experience for both students and recruiters."
  },
  {
    id: '02',
    title: "Invitations & Job Notification Form (JNF)",
    icon: <Mail className="w-6 h-6 text-blue-600" />,
    bottomIcon: <Building2 className="w-10 h-10 text-blue-400 opacity-20" />,
    description: "The Placement Office formally reaches out to organizations by sharing placement invitations along with the Job Notification Form (JNF). The JNF captures essential details such as job profile, eligibility criteria, compensation structure, selection process, and preferred dates.",
    extra: "Organizations interested in recruiting from the institute can communicate directly with the Placement Office at placement@ietlucknow.ac.in."
  },
  {
    id: '03',
    title: "Candidate shortlisting",
    icon: <Users className="w-6 h-6 text-blue-600" />,
    bottomIcon: <UserCheck className="w-10 h-10 text-blue-400 opacity-20" />,
    description: "Once a company confirms its participation and finalizes the eligibility criteria, a list of interested and eligible candidates is prepared. This shortlist is based on academic performance, branch, skills, and other criteria specified in the JNF.",
    extra: "The shortlisted candidates are then informed in advance about the upcoming selection process and relevant instructions."
  },
  {
    id: '04',
    title: "Schedule finalization & arrangements",
    icon: <Calendar className="w-6 h-6 text-blue-600" />,
    bottomIcon: <Calendar className="w-10 h-10 text-blue-400 opacity-20" />,
    description: "A tentative visit or virtual engagement date is mutually decided between the organization and the Placement Office. Upon confirmation, all necessary arrangements are made for the Pre-Placement Talk (PPT), written tests, interviews, and other selection rounds.",
    extra: "The institute ensures seamless coordination, infrastructure support, and communication throughout the recruitment process."
  },
  {
    id: '05',
    title: "Selection process & results",
    icon: <Trophy className="w-6 h-6 text-blue-600" />,
    bottomIcon: <TrendingUp className="w-10 h-10 text-blue-400 opacity-20" />,
    description: "The organization conducts its recruitment process, which may include aptitude tests, technical assessments, group discussions, and personal interviews. Based on performance, candidates are shortlisted for final selection.",
    extra: "In most cases, the final results are declared on the same day or within a short stipulated timeframe communicated by the company."
  },
  {
    id: '06',
    title: "Student placement policy",
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    bottomIcon: <ShieldCheck className="w-10 h-10 text-blue-400 opacity-20" />,
    description: "Students who receive an official offer or confirmation letter are considered reserved for that particular organization and are not permitted to participate in other companies offering roles within the same pay-scale bracket.",
    extra: "Additionally, once a student enters the selection process of a company, withdrawing at any intermediate stage is strictly not allowed, in accordance with institute placement policies."
  }
];

export default function Procedure() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image with Gradient Mask */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute right-0 top-0 w-2/3 h-full bg-cover bg-center hidden md:block"
          style={{ 
            backgroundImage: "url('/images/placement-1.png')",
            maskImage: "linear-gradient(to left, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)"
          }}
        />
        <div 
          className="absolute right-0 top-0 w-full h-full bg-cover bg-center md:hidden opacity-20"
          style={{ backgroundImage: "url('/images/iet_campus-alumin.png')" }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-blue-600 font-bold tracking-[0.2em] text-xs uppercase mb-6 block"
            >
              FOR RECRUITERS
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-8 ${poppins.className}`}
            >
              Placement <span className="text-blue-600">Procedure</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-slate-600 mb-12 max-w-lg leading-relaxed"
            >
              A structured and transparent process ensuring seamless coordination between recruiters and students.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <Link 
                href="/recruiters/contactform"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-900 text-white rounded-full font-bold shadow-lg shadow-blue-900/20 hover:bg-blue-950 transition-all group hover:scale-105 active:scale-95"
              >
                <FileText className="w-5 h-5" />
                Company Contact Form
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/recruiters/invitation"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-blue-900 border-2 border-slate-100 rounded-full font-bold shadow-sm hover:border-blue-100 hover:bg-slate-50 transition-all group hover:scale-105 active:scale-95"
              >
                <FileText className="w-5 h-5" />
                View Invitation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-32 bg-slate-50/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-16 relative">
            {steps.map((step, index) => (
              <BorderGlow
                key={step.id}
                edgeSensitivity={30}
                glowColor="220 80 50"
                backgroundColor="#ffffff"
                borderRadius={28}
                glowRadius={50}
                glowIntensity={1}
                coneSpread={25}
                animated={false}
                colors={['#3b82f6', '#8b5cf6', '#06b6d4']}
                className="group transition-all duration-500 hover:-translate-y-2 h-full border border-slate-100"
              >
                <div className="p-8 flex flex-col h-full overflow-hidden relative">
                  {/* Card Background Pattern */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.3] z-0">
                    <Image 
                      src="/images/back7.png" 
                      alt="" 
                      fill 
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Icon Area */}
                  <div className="relative mb-6 z-10">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                      {step.icon}
                    </div>
                  </div>

                  <div className="relative z-10 flex-1">
                    <h3 className="text-xl font-bold text-brand-800 mb-1.5 transition-colors group-hover:text-blue-600">
                      {step.title}
                    </h3>
                    <div className="h-1 w-7 bg-blue-600 rounded-full mb-6"></div>
                    
                    <p className="text-slate-500 leading-relaxed text-sm font-medium mb-6">
                      {step.description}
                    </p>

                    {step.extra && (
                      <div className="pt-6 border-t border-slate-50">
                        <p className="text-slate-400 leading-relaxed text-xs italic">
                          {step.extra}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Faded Background Icon */}
                  <div className="absolute bottom-6 right-6 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-60 opacity-20 z-10">
                    {step.bottomIcon}
                  </div>
                  
                  {/* Connecting Line (Desktop) - Decorative */}
                  {index % 3 !== 2 && (
                    <div className="hidden lg:block absolute top-14 -right-10 w-16 h-[2px] bg-slate-100 z-0 opacity-50">
                      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-slate-200 bg-white" />
                    </div>
                  )}
                </div>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}