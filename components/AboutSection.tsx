'use client';

import React from 'react';
import Image from 'next/image';
import { Handshake, GraduationCap, UserCheck, Building2, TrendingUp } from 'lucide-react';
import SplitText from './ui/SplitText';

import BorderGlow from './BorderGlow';

const AboutSection = () => {
  const features = [
    {
      id: '01',
      title: 'Industry Partnerships',
      description: 'We maintain strong relationships with over 200 companies across diverse sectors for placements and internships.',
      icon: <Handshake className="w-6 h-6 text-blue-600" />,
      bottomIcon: <Building2 className="w-10 h-10 text-blue-400 opacity-20" />
    },
    {
      id: '02',
      title: 'Skill Development',
      description: 'Comprehensive training programs including technical workshops, soft skills, and mock interviews to enhance employability.',
      icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
      bottomIcon: <TrendingUp className="w-10 h-10 text-blue-400 opacity-20" />
    },
    {
      id: '03',
      title: 'Career Guidance',
      description: 'Personalized counseling and mentorship to help students make informed career choices and achieve their goals.',
      icon: <UserCheck className="w-6 h-6 text-blue-600" />,
      bottomIcon: <UserCheck className="w-10 h-10 text-blue-400 opacity-20" />
    },
  ];

  return (
    <section id="about" className="relative py-20 overflow-hidden bg-white">
      {/* ... existing background code ... */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(#0A2647 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="absolute right-0 top-0 w-1/3 h-full pointer-events-none opacity-[1] z-0">
        <div className="relative w-full h-full">
          <Image 
            src="/images/back1.png" 
            alt="Campus Background" 
            fill 
            className="object-cover object-right"
          />
        </div>
      </div>

      <div className="absolute top-1/4 left-8 w-4 h-4 rounded-full border-2 border-blue-100 opacity-60"></div>
      <div className="absolute top-1/3 left-12 w-24 h-24 grid grid-cols-4 gap-2 opacity-20">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
        ))}
      </div>

      <div className="absolute bottom-1/4 right-8 w-24 h-24 grid grid-cols-4 gap-2 opacity-20">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
        ))}
      </div>

      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60 -z-10"></div>
      
      <div className="absolute bottom-0 left-0 w-full h-64 pointer-events-none opacity-5">
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto">
          <path fill="#2C74B3" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <SplitText 
              text="About Training & Placement Cell" 
              tag="h2" 
              className="text-3xl md:text-4xl font-bold text-brand-800 tracking-tight"
              delay={30} 
              duration={1} 
              splitType="chars" 
              from={{ opacity: 0, y: 20 }} 
              to={{ opacity: 1, y: 0 }} 
            />
            <div className="h-1 w-20 bg-blue-600 rounded-full mx-auto mt-3 shadow-sm shadow-blue-200"></div>
          </div>
          <p className="text-slate-500 mt-6 max-w-2xl mx-auto text-base leading-relaxed font-medium">
            We are dedicated to facilitating successful career launches for our students 
            through industry collaborations, skill development programs, and 
            placement opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <BorderGlow
              key={feature.id}
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
              <div className="p-8 flex flex-col h-full overflow-hidden">
                <div className="relative mb-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                    {feature.icon}
                  </div>
                </div>

                <div className="relative z-10 flex-1">
                  <h3 className="text-lg font-bold text-brand-800 mb-1.5 transition-colors group-hover:text-blue-600">
                    {feature.title}
                  </h3>
                  <div className="h-1 w-7 bg-blue-600 rounded-full mb-4"></div>
                  
                  <p className="text-slate-500 leading-relaxed text-sm font-medium">
                    {feature.description}
                  </p>
                </div>

                <div className="absolute bottom-6 right-6 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-60 opacity-30">
                  {feature.bottomIcon}
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
