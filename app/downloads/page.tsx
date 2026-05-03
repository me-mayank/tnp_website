'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FileText, 
  ShieldCheck, 
  Building, 
  ChevronRight, 
  Download, 
  ArrowRight,
  Code2,
  MessageSquare,
  BarChart3,
  Search
} from 'lucide-react';
import BorderGlow from '@/components/BorderGlow';

const instituteDocs = [
  {
    title: 'Placement Brochure',
    subtitle: 'Official Guide 2025-26',
    href: '/files/Placement_Brouchure_2025-26.pdf',
    type: 'PDF'
  },
  {
    title: 'Job Notification Form',
    subtitle: 'Recruiter Registration (JNF)',
    href: '/files/JNF_IET_Lucknow_2025-26.docx',
    type: 'DOCX'
  }
];

const studentDocs = [
  { name: 'Placement Policy', href: '/files/Student_Placement_Policy.pdf', type: 'PDF' },
  { name: 'Training Form', href: '/files/SUMMER_INTERNSHIP_NOC.pdf', type: 'PDF' },
  { name: 'Internship NOC', href: '/files/FINAL_SEMESTER_INTERNSHIP_NOC.pdf', type: 'PDF' }
];

const departmentDocs = [
  { name: 'Computer Science & Eng.', href: '/files/CSE_brochure.pdf' },
  { name: 'Chemical Engineering', href: '/files/Chemical_dept_2019-20.pdf' },
  { name: 'Civil Engineering', href: '/files/Civil_dept_2019-20.pdf' },
  { name: 'Electrical Engineering', href: '/files/Electrical_dept_2019-20.pdf' },
  { name: 'Electronics Engineering', href: '/files/Electronics_dept_2019-20.pdf' },
  { name: 'Mechanical Engineering', href: '/files/Mechanical_dept_2019-20.pdf' }
];

const prepResources = [
  {
    title: 'DSA Handbooks',
    description: 'Topic-wise data structures & algorithms notes from top alumni.',
    icon: <Code2 className="w-5 h-5" />,
    linkText: 'Access Drive',
    href: '#'
  },
  {
    title: 'Interview Experiences',
    description: 'Archive of technical interview questions from FAANG & Top MNCs.',
    icon: <MessageSquare className="w-5 h-5" />,
    linkText: 'Read Blogs',
    href: '#'
  },
  {
    title: 'Aptitude & Core',
    description: 'Practice sets for Quant, Logical, and Core Subjects (OS, DBMS).',
    icon: <BarChart3 className="w-5 h-5" />,
    linkText: 'Download Packs',
    href: '#'
  }
];

export default function DownloadsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center overflow-hidden">
        {/* Background Image with Gradient Mask */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute right-0 top-0 w-2/3 h-full bg-cover bg-center hidden md:block"
          style={{ 
            backgroundImage: "url('/images/iet_campus-alumin.png')",
            maskImage: "linear-gradient(to left, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)"
          }}
        />
        <div 
          className="absolute right-0 top-0 w-full h-full bg-cover bg-center md:hidden opacity-10"
          style={{ backgroundImage: "url('/images/iet_campus-alumin.png')" }}
        />

        <div className="container mx-auto px-6 relative z-10 pt-16">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-blue-600 font-bold tracking-[0.2em] text-xs uppercase mb-6 block"
            >
              DOWNLOADS
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-8"
            >
              All <span className="text-blue-600">Resources</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-slate-600 mb-12 max-w-lg leading-relaxed font-medium"
            >
              Access official documents, policies, and department-specific brochures for students and recruiters.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 pb-32">
        {/* Institute Documents */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Institute Documents</h2>
                <p className="text-slate-500 text-sm font-medium">Essential documents for placements and partnerships.</p>
              </div>
            </div>
            <Link href="#" className="hidden sm:flex items-center gap-2 text-blue-600 font-bold text-sm hover:translate-x-1 transition-transform">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {instituteDocs.map((doc, idx) => (
              <motion.div
                key={doc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="h-full"
              >
                <BorderGlow
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
                  <div className="p-8 flex items-center gap-8 h-full">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-500">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{doc.title}</h3>
                      <p className="text-slate-400 text-xs font-medium mb-4">{doc.subtitle}</p>
                      <a 
                        href={doc.href} 
                        download 
                        className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:underline"
                      >
                        <Download className="w-4 h-4" />
                        Download {doc.type}
                      </a>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Student Policies & Forms */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Student Policies & Forms</h2>
                <p className="text-slate-500 text-sm font-medium">Important policies and forms for student placements.</p>
              </div>
            </div>
            <Link href="#" className="hidden sm:flex items-center gap-2 text-blue-600 font-bold text-sm hover:translate-x-1 transition-transform">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studentDocs.map((doc, idx) => (
              <motion.div
                key={doc.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="h-full"
              >
                <BorderGlow
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
                  <div className="p-6 flex flex-col h-full">
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full mb-4 self-start">
                      {doc.type}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-6 group-hover:text-blue-600 transition-colors">{doc.name}</h3>
                    <div className="flex items-center justify-between mt-auto">
                      <a 
                        href={doc.href} 
                        download 
                        className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:underline"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </a>
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Department Brochures */}
        <section className="mb-32">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Department Brochures</h2>
                <p className="text-slate-500 text-sm font-medium">Department-specific placement brochures and resources.</p>
              </div>
            </div>
            <Link href="#" className="hidden sm:flex items-center gap-2 text-blue-600 font-bold text-sm hover:translate-x-1 transition-transform">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departmentDocs.map((dept, idx) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="h-full"
              >
                <BorderGlow
                  edgeSensitivity={20}
                  glowColor="220 80 50"
                  backgroundColor="#ffffff"
                  borderRadius={16}
                  glowRadius={30}
                  glowIntensity={0.8}
                  coneSpread={25}
                  animated={false}
                  colors={['#3b82f6', '#8b5cf6', '#06b6d4']}
                  className="group transition-all duration-300 hover:-translate-y-1 h-full border border-slate-100"
                >
                  <div className="p-4 flex items-center justify-between h-full">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Building className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">{dept.name}</span>
                    </div>
                    <a 
                      href={dept.href} 
                      download 
                      className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                    </a>
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Placement Preparation Hub */}
        <section>
          <div className="bg-[#0B1F3A] rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                    <Search className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold">Placement Preparation Hub</h2>
                    <p className="text-blue-200/60 mt-2 font-medium">Curated resources to crack top-tier technical and HR interviews.</p>
                  </div>
                </div>
                <Link 
                  href="#" 
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all group active:scale-95"
                >
                  View All Assets
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {prepResources.map((res, idx) => (
                  <motion.div
                    key={res.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 mb-6">
                      {res.icon}
                    </div>
                    <h4 className="font-bold text-xl mb-3">{res.title}</h4>
                    <p className="text-sm text-blue-100/40 mb-8 leading-relaxed font-medium">
                      {res.description}
                    </p>
                    <Link href={res.href} className="inline-flex items-center gap-2 text-blue-400 font-bold text-sm hover:text-blue-300 transition-colors group">
                      {res.linkText}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
