'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Poppins, Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import { useCallback } from 'react';

const poppins = Poppins({ weight: ['600', '700', '800'], subsets: ['latin'] });
const inter = Inter({ weight: ['400', '500', '600'], subsets: ['latin'] });

// Dynamically import LogoLoop to avoid SSR issues
const LogoLoop = dynamic(() => import('@/components/LogoLoop'), { ssr: false });

const stats = [
  { label: 'Alumni Worldwide', value: '10K+', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )},
  { label: 'Countries Represented', value: '50+', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9-9H3m9 9V3m9 9H3m9 9v6" />
    </svg>
  )},
  { label: 'Leading Companies', value: '500+', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m9 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )},
  { label: 'Entrepreneurs & Founders', value: '100+', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )},
];

const alumni = [
  {
    name: 'Aman Verma',
    batch: 'B.Tech CSE, 2012',
    role: 'Senior Software Engineer',
    company: 'Google',
    logo: '/images/pastRecruiter/google.png',
    quote: 'IET provided me the foundation to dream big and the confidence to achieve bigger.',
    linkedin: '#',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop',
  },
  {
    name: 'Neha Singh',
    batch: 'B.Tech ECE, 2013',
    role: 'Product Manager',
    company: 'Microsoft',
    logo: '/images/pastRecruiter/microsoft.png',
    quote: 'The mentorship and hands-on learning at IET shaped my professional journey.',
    linkedin: '#',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop',
  },
  {
    name: 'Rohit Mishra',
    batch: 'B.Tech ME, 2011',
    role: 'Lead Engineer',
    company: 'Tesla',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
    quote: 'IET doesn’t just teach you engineering, it teaches you problem-solving for life.',
    linkedin: '#',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop',
  },
  {
    name: 'Pooja Sharma',
    batch: 'B.Tech IT, 2014',
    role: 'Data Scientist',
    company: 'Amazon',
    logo: '/images/pastRecruiter/amazon.png',
    quote: 'IET gave me the right environment to explore, learn and grow into who I am today.',
    linkedin: '#',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2574&auto=format&fit=crop',
  },
  {
    name: 'Karan Gupta',
    batch: 'B.Tech CE, 2010',
    role: 'Project Manager',
    company: 'Deloitte',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg',
    quote: 'From late-night coding sessions to leading global teams — IET was my launchpad.',
    linkedin: '#',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2574&auto=format&fit=crop',
  },
];

const companies = [
  { name: 'Google', logo: '/images/pastRecruiter/google.png' },
  { name: 'Microsoft', logo: '/images/pastRecruiter/microsoft.png' },
  { name: 'Amazon', logo: '/images/pastRecruiter/amazon.png' },
  { name: 'Adobe', logo: '/images/pastRecruiter/adobe.png' },
  { name: 'Samsung', logo: '/images/pastRecruiter/samsung.svg' },
  { name: 'Intel', logo: '/images/pastRecruiter/intel.svg' },
  { name: 'Goldman Sachs', logo: '/images/pastRecruiter/goldman.png' },
  { name: 'Morgan Stanley', logo: '/images/pastRecruiter/morgan.png' },
];

export default function AlumniPage() {
  const loopLogos = companies.map(c => ({
    src: c.logo,
    alt: c.name,
    title: c.name
  }));

  const renderLogo = useCallback((item: any) => {
    const isSpecial = ['Amazon', 'Google', 'Microsoft', 'Morgan Stanley'].includes(item.title);
    return (
      <div className="flex items-center justify-center h-full">
        <img 
          src={item.src} 
          alt={item.alt} 
          className="object-contain"
          style={{ 
            height: isSpecial ? '140px' : '90px', 
            width: 'auto',
            maxWidth: isSpecial ? '350px' : '200px',
            display: 'block'
          }} 
        />
      </div>
    );
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/iet_campus-alumin.png"
            alt="IET Lucknow Campus"
            fill
            className="object-cover opacity-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <span className={`inline-block text-blue-400 font-bold tracking-[0.2em] uppercase text-sm mb-4 ${poppins.className}`}>
              Our Legacy
            </span>
            <h1 className={`text-[clamp(3rem,6vw,5rem)] font-[700] text-white leading-[1.1] tracking-tight mb-8 ${poppins.className}`}>
              NOTABLE <br />
              <span className="text-blue-500">ALUMNI</span>
            </h1>
            <p className={`text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mb-12 ${inter.className}`}>
              From IET to the world — our alumni are innovators, leaders, and changemakers who continue to inspire and create impact globally.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-slate-800">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-3 text-blue-400">
                    {stat.icon}
                    <span className={`text-2xl font-bold text-white ${poppins.className}`}>{stat.value}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="pt-24 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className={`inline-block text-blue-600 font-bold tracking-widest uppercase text-xs mb-4 ${poppins.className}`}>
              Making an Impact
            </span>
            <h2 className={`text-4xl md:text-5xl font-[700] text-slate-900 tracking-tight mb-6 ${poppins.className}`}>
              Our Alumni, <span className="text-blue-600">Our Pride</span>
            </h2>
            <div className="w-16 h-1.5 bg-blue-600 mx-auto mb-8 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {alumni.map((person, i) => (
              <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full border border-slate-100">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <h3 className={`text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors ${poppins.className}`}>
                      {person.name}
                    </h3>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-tight mt-1">{person.batch}</p>
                    <p className="text-sm font-medium text-slate-500 mt-0.5">{person.role}</p>
                  </div>

                  <div className="mb-6 h-14 flex items-center transition-all">
                    <img src={person.logo} alt={person.company} className="h-full object-contain max-w-[390px]" />
                  </div>

                  <div className="relative mt-auto pt-6 border-t border-slate-50">
                    <p className={`text-sm text-slate-500 italic leading-relaxed relative z-10 ${inter.className}`}>
                      "{person.quote}"
                    </p>
                    <a href={person.linkedin} className="mt-4 flex items-center justify-end text-slate-400 hover:text-[#0A66C2] transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-blue-600 text-blue-600 font-bold transition-all hover:bg-blue-50">
              View More Alumni
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Global Impact Section */}
      <section className="pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden p-12 md:p-16">
            {/* Background Map */}
            <div className="absolute inset-0 z-0 opacity-[0.09] pointer-events-none">
              <Image
                src="/images/blue-2-dotted.png"
                alt="World Map"
                fill
                className="object-contain scale-125"
              />
            </div>

            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <span className={`inline-block text-blue-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 ${poppins.className}`}>
                    Global Impact
                  </span>
                  <h2 className={`text-4xl md:text-5xl font-[700] text-slate-900 tracking-tight mb-6 ${poppins.className}`}>
                    Our Alumni, <br />
                    <span className="text-blue-600">Our Strength</span>
                  </h2>
                  <div className="w-16 h-1.5 bg-blue-600 mb-8 rounded-full" />
                  <p className={`text-slate-600 text-lg leading-relaxed max-w-md ${inter.className}`}>
                    Our alumni network spans across the globe, contributing to innovation and excellence in diverse industries.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-8 text-center border-l-0 lg:border-l border-slate-100 pl-0 lg:pl-12">
                  {[
                    { label: 'Countries', value: '50+' },
                    { label: 'Companies', value: '500+' },
                    { label: 'Alumni', value: '10K+' },
                  ].map((stat, i) => (
                    <div key={i} className="space-y-1">
                      <div className={`text-3xl md:text-4xl font-extrabold text-slate-900 ${poppins.className}`}>
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-slate-500 uppercase tracking-widest">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Company Logo Loop */}
              <div className="pt-12 border-t border-slate-100">
                <div className="h-25 w-full overflow-hidden">
                  <LogoLoop 
                    logos={loopLogos}
                    direction="left"
                    speed={25}
                    logoHeight={140}
                    gap={120}
                    renderItem={renderLogo}
                    className="opacity-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner Section */}
      <section className="py-12 mb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative bg-[#05162E] rounded-[1.5rem] overflow-hidden min-h-[220px] flex items-center shadow-2xl">
            {/* Background Texture/Image */}
            <div className="absolute left-0 top-0 bottom-0 w-1/3 opacity-40">
               <Image 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop"
                alt="Alumni background"
                fill
                className="object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#05162E]" />
            </div>

            <div className="relative z-10 w-full px-12 md:px-20 py-12 flex flex-col md:flex-row items-center justify-between gap-10">
               <div className="max-w-2xl">
                 <h3 className={`text-2xl md:text-3xl font-[700] text-white tracking-tight mb-4 ${poppins.className}`}>
                   Your Journey Can <span className="text-blue-500">Inspire Millions</span>
                 </h3>
                 <p className={`text-slate-400 text-base md:text-lg leading-relaxed ${inter.className}`}>
                   Be a part of the IET legacy. Stay connected, mentor, and create opportunities for the next generation.
                 </p>
               </div>

               <div className="flex-shrink-0">
                  <button className="flex items-center gap-3 px-8 py-4 rounded-xl bg-blue-600 text-white font-bold transition-all hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 group">
                    Connect With Us
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
               </div>
            </div>

            {/* Subtle Dotted Decoration */}
            <div className="absolute right-0 top-0 bottom-0 w-32 opacity-10 pointer-events-none">
                <div className="w-full h-full" style={{
                  backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
