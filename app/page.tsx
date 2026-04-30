'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import Link from 'next/link';
import { FlipWords } from '@/components/ui/flip-words';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { HoverSlider, HoverSliderImage, HoverSliderImageWrap, TextStaggerHover } from '@/components/ui/animated-slideshow';
import { InteractiveSelector } from '@/components/ui/interactive-selector';
import SplitText from '@/components/ui/SplitText';

const INFRASTRUCTURE_SLIDES = [
  {
    id: "slide-1",
    title: "Placement Interviews",
    imageUrl: "/TCS/IMG-20260119-WA0047.jpg",
    imageUrls: [
     "/TCS/IMG-20260119-WA0047.jpg",
      "/images/PI.jpg",
     "/TCS/IMG-20260119-WA0056.jpg",
      "/Inmobi/IMG-20250909-WA0011.jpg"
    ],
    description: "Students and faculty members posing outside the director's office after company placement interviews."
  },
  {
    id: "slide-2",
    title: "Auditorium",
    imageUrl: "/images/auditorium.png",
    imageUrls: [
      "/images/auditorium.png",
      "/images/facilities/audi.jpg",
      "/images/facilities/presentation.jpg"
    ],
    description: "State-of-the-art auditorium for company presentations and events."
  },
  {
    id: "slide-3",
    title: "Training Sessions",
    imageUrl: "/images/training session.jpg",
    imageUrls: [
      "/images/training session.jpg",
     "/images/drives/10.jpeg",
     "/images/drives/11.jpeg",
    ],
    description: "Offline Training Session managed by Training and Placement Cell"
  },
  {
    id: "slide-4",
    title: "Group Discussion",
    imageUrl: "/images/gd.jpg",
    imageUrls: [
      "/images/gd.jpg",
      "/images/drives/20.jpeg",
      "/images/drives/21.jpeg",
      "/images/facilities/other_facilities.png"
    ],
    description: "Group Discussion round conducted during recruitment drive"
  },
  {
    id: "slide-5",
    title: "Personal Interview",
    imageUrl: "/images/PI.jpg",
    imageUrls: [
      "/images/PI.jpg",
       "/TCS/IMG-20260119-WA0056.jpg",
      "/Inmobi/IMG-20250909-WA0011.jpg"
      
    ],
    description: "Personal interview round with company recruiters at TnP Office"
  },
  {
    id: "slide-6",
    title: "Online Test",
    imageUrl: "/images/offline test.jpg",
    imageUrls: [
     
      "/images/facilities/computer.png",
      "/images/facilities/workspace.webp",
      "/Inmobi/IMG-20250909-WA0011.jpg"
    ],
    description: "Offline test conducted as the part of the recruitment process"
  },
  {
    id: "slide-7",
    title: "Company Presentation",
    imageUrl: "/images/presentation.jpg",
    imageUrls: [
      "/images/presentation.jpg",
      "/images/drives/23.jpeg",
      "/images/drives/8.jpeg",
      "/Zeta/IMG-20250828-WA0026.jpg",
      "/Zeta/IMG-20250828-WA0018.jpg"
    ],
    description: "Company presentation before the start of the selection process"
  },
];

const GALLERY_OPTIONS = [
  {
    title: "Campus View",
    description: "Our beautiful campus grounds",
    image: "/images/campus.jpg",
    icon: "Building2"
  },
  {
    title: "Library",
    description: "State-of-the-art learning resources",
    image: "/images/library.jpeg",
    icon: "BookOpen"
  },
  {
    title: "T&P Office",
    description: "Training and Placement Cell",
    image: "/images/PI.jpg",
    icon: "Users"
  },
  {
    title: "Auditorium",
    description: "Modern presentation facilities",
    image: "/images/auditorium.png",
    icon: "Presentation"
  },
  {
    title: "Group Discussion",
    description: "Interactive learning spaces",
    image: "/images/gd.jpg",
    icon: "MessageSquare"
  },
  {
    title: "Events",
    description: "Company presentations & workshops",
    image: "/images/presentation.jpg",
    icon: "GraduationCap"
  }
];

export default function Home() {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#')) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    // Animate stats
    const animateStats = () => {
      const statElements = document.querySelectorAll('.stat-number');
      statElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-target') || '0');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            element.textContent = target.toString();
            clearInterval(timer);
          } else {
            element.textContent = Math.floor(current).toString();
          }
        }, 16);
      });
    };

    // Observe stats section
    const statsSection = document.getElementById('stats');
    if (statsSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(statsSection);
    }

    // Logo slider
    const setupLogoSlider = () => {
      const slider = document.getElementById('logo-slider');
      if (!slider) return;

      const content = slider.innerHTML;
      slider.innerHTML += content;

      let isAutoScrolling = true;
      const scrollSpeed = 1;

      const startAutoScroll = () => {
        if (isAutoScrolling && slider) {
          slider.scrollLeft += scrollSpeed;
          if (slider.scrollLeft >= slider.scrollWidth / 2) {
            slider.scrollLeft = 0;
          }
        }
      };

      const autoScrollInterval = setInterval(startAutoScroll, 20);

      const moveSlider = (direction: 'left' | 'right') => {
        isAutoScrolling = false;
        const scrollAmount = 300;
        slider.scrollBy({
          left: direction === 'right' ? scrollAmount : -scrollAmount,
          behavior: 'smooth'
        });

        setTimeout(() => {
          isAutoScrolling = true;
        }, 2000);
      };

      const btnLeft = document.getElementById('scroll-left');
      const btnRight = document.getElementById('scroll-right');

      btnRight?.addEventListener('click', () => moveSlider('right'));
      btnLeft?.addEventListener('click', () => moveSlider('left'));

      slider.addEventListener('mouseenter', () => { isAutoScrolling = false; });
      slider.addEventListener('mouseleave', () => { isAutoScrolling = true; });

      return () => clearInterval(autoScrollInterval);
    };

    // Infrastructure slider
    const setupInfraSlider = () => {
      const infraSlider = document.getElementById('infra-slider');
      const infraNext = document.getElementById('infra-next');
      const infraPrev = document.getElementById('infra-prev');

      if (!infraSlider || !infraNext || !infraPrev) return;

      const getScrollAmount = () => {
        const firstCard = infraSlider.querySelector('div');
        const style = window.getComputedStyle(infraSlider);
        const gap = parseInt(style.columnGap) || 0;
        return (firstCard?.offsetWidth || 0) + gap;
      };

      const moveSlider = (direction: 'next' | 'prev') => {
        const amount = getScrollAmount();
        if (direction === 'next') {
          if (infraSlider.scrollLeft + infraSlider.offsetWidth >= infraSlider.scrollWidth - 10) {
            infraSlider.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            infraSlider.scrollBy({ left: amount, behavior: 'smooth' });
          }
        } else {
          if (infraSlider.scrollLeft <= 0) {
            infraSlider.scrollTo({ left: infraSlider.scrollWidth, behavior: 'smooth' });
          } else {
            infraSlider.scrollBy({ left: -amount, behavior: 'smooth' });
          }
        }
      };

      infraNext.addEventListener('click', () => moveSlider('next'));
      infraPrev.addEventListener('click', () => moveSlider('prev'));

      const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") moveSlider('next');
        else if (e.key === "ArrowLeft") moveSlider('prev');
      };

      window.addEventListener('keydown', handleKeydown);

      let autoPlayInterval = setInterval(() => moveSlider('next'), 5000);

      infraSlider.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
      infraSlider.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => moveSlider('next'), 5000);
      });

      return () => {
        clearInterval(autoPlayInterval);
        window.removeEventListener('keydown', handleKeydown);
      };
    };

    // Gallery slider
    const setupGallerySlider = () => {
      const gallerySlider = document.getElementById('gallery-slider');
      if (!gallerySlider) return;

      const slides = Array.from(gallerySlider.querySelectorAll('.gallery-slide')) as HTMLElement[];
      if (slides.length === 0) return;

      let currentIndex = 0;
      slides.forEach((slide, index) => {
        slide.classList.toggle('opacity-100', index === 0);
        slide.classList.toggle('opacity-0', index !== 0);
        slide.classList.toggle('z-10', index === 0);
        slide.classList.toggle('z-0', index !== 0);
      });

      const interval = setInterval(() => {
        const prevIndex = currentIndex;
        currentIndex = (currentIndex + 1) % slides.length;

        slides[prevIndex]?.classList.remove('opacity-100', 'z-10');
        slides[prevIndex]?.classList.add('opacity-0', 'z-0');

        slides[currentIndex]?.classList.remove('opacity-0', 'z-0');
        slides[currentIndex]?.classList.add('opacity-100', 'z-10');
      }, 3000);

      return () => clearInterval(interval);
    };

    const cleanupLogo = setupLogoSlider();
    const cleanupInfra = setupInfraSlider();
    const cleanupGallery = setupGallerySlider();

    return () => {
      cleanupLogo?.();
      cleanupInfra?.();
      cleanupGallery?.();
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <main className="bg-white text-brand-800">
      {/* Hero Section */}
      <section id="hero" className="hero-section relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-brand-accent/20 rounded-full blur-lg"></div>
          <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-brand-accent/10 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left slide-in-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-brand-accent rounded-full pulse-glow"></span>
                <span className="text-sm font-medium">NAAC A+ Accredited</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="block">Building The</span>
                <span className="">Next Generation</span>
                <span className="block">Of <FlipWords words={["Innovators", "Leaders", "Creators"]} /></span>

              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                At IET Lucknow&apos;s Training & Placement Cell, we transform engineering talent into industry-ready
                professionals through strategic partnerships and comprehensive development programs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <a href="/recruiters/invitation"
                  className="group relative overflow-hidden bg-white text-brand-800 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <span className="relative z-10 flex items-center gap-2 justify-center">
                    <span>For Recruiters</span>
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </a>

                <a href="/insights/recruiters"
                  className="group relative overflow-hidden border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
                  <span className="relative z-10 flex items-center gap-2 justify-center">
                    <span>For Students</span>
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                <div className="floating-card bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <div className="text-xs text-white/70 uppercase tracking-wider mb-1">Since</div>
                  <div className="font-bold text-2xl text-white">1984</div>
                </div>

                <div className="floating-card bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <div className="text-xs text-white/70 uppercase tracking-wider mb-1">Companies</div>
                  <div className="font-bold text-2xl text-white">90+</div>
                  <div className="text-[8px] text-white/70 uppercase tracking-wider mb-1">(2024-2025)</div>
                </div>

                <div className="floating-card bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <div className="text-xs text-white/70 uppercase tracking-wider mb-1">Placements</div>
                  <div className="font-bold text-2xl text-white">500+</div>
                  <div className="text-[8px] text-white/70 uppercase tracking-wider mb-1">(2024-2025)</div>
                </div>
              </div>
            </div>

            <div className="slide-in-right">
              <a href="/gallery" className="relative block group cursor-pointer">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl transition-all duration-500 group-hover:bg-white/15 group-hover:border-white/40">
                  <div className="relative overflow-hidden rounded-xl h-64">
                    <Image
                      src="/images/college_image.svg"
                      alt="IET Campus"
                      className="rounded-xl object-cover transform transition-transform duration-1000 group-hover:scale-110"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />

                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <span className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 text-white text-sm font-semibold tracking-wide shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] group-hover:shadow-brand-accent/20">
                        <div className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-accent"></span>
                        </div>
                        View Campus Gallery
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-900/20 to-transparent rounded-xl"></div>

                    <div className="absolute bottom-4 left-6 text-white transition-all duration-500 group-hover:translate-x-2">
                      <div className="text-lg font-bold tracking-tight">IET Lucknow Campus</div>
                      <div className="text-sm opacity-80 font-light italic">Excellence in Engineering Education</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-3 -right-4 bg-brand-accent/20 backdrop-blur-xl text-white p-3 rounded-xl border border-white/30 shadow-xl transform rotate-3 z-30 transition-transform">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-base font-bold tracking-tight">54 LPA</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-white/90 font-medium">Highest Package</div>
                  <div className="text-[10px] text-white font-mono">Session 2024-25</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="glimpse" className="bg-white">
        <div className="relative w-screen h-[45vh] min-h-[320px] sm:h-[55vh] sm:min-h-[380px] lg:h-[65vh] lg:min-h-[460px] overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/college_image.svg"
          >
            <source src="/videos/tnp_vid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white max-w-3xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">A Legacy of 42 Years</h2>
              <p className="text-white/90 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                And Counting.....
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <SplitText text="About Training & Placement Cell" tag="h2" className="text-3xl md:text-4xl font-bold text-brand-800" delay={30} duration={1} splitType="chars" from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }} />
            <div className="h-1.5 w-20 bg-brand-accent rounded-full mx-auto mt-4"></div>
            <p className="text-muted mt-6 max-w-3xl mx-auto">We are dedicated to facilitating successful career launches for our students through industry collaborations, skill development programs, and placement opportunities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="min-h-[14rem]">
              <div className="relative h-full rounded-2xl border border-gray-100 bg-gray-50 hover-lift">
                <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="bg-gray-50 rounded-2xl p-8">
                  <div className="w-14 h-14 bg-brand-700 rounded-xl text-white flex items-center justify-center mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h5 className="font-bold text-xl mb-3">Industry Partnerships</h5>
                  <p className="text-muted">We maintain strong relationships with over 200 companies across diverse sectors for placements and internships.</p>
                </div>
              </div>
            </div>

            <div className="min-h-[14rem]">
              <div className="relative h-full rounded-2xl border border-gray-100  hover-lift">
                <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="bg-gray-50 rounded-2xl p-8">
                  <div className="w-14 h-14 bg-brand-700 rounded-xl text-white flex items-center justify-center mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h5 className="font-bold text-xl mb-3">Skill Development</h5>
                  <p className="text-muted">Comprehensive training programs including technical workshops, soft skills, and mock interviews to enhance employability.</p>
                </div>
              </div>
            </div>

            <div className="min-h-[14rem]">
              <div className="relative h-full rounded-2xl border border-gray-100  hover-lift">
                <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="bg-gray-50 rounded-2xl p-8">
                  <div className="w-14 h-14 bg-brand-700 rounded-xl text-white flex items-center justify-center mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h5 className="font-bold text-xl mb-3">Career Guidance</h5>
                  <p className="text-muted">Personalized counseling and mentorship to help students make informed career choices and achieve their professional goals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 bg-brand-800 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <SplitText text="Placement Statistics" tag="h2" className="text-3xl md:text-4xl font-bold" delay={30} duration={1} splitType="chars" from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }} />
            <div className="h-1.5 w-20 bg-brand-accent rounded-full mx-auto mt-4"></div>
            <p className="text-white/80 mt-6 max-w-3xl mx-auto">Our consistent track record of excellent placements reflects the quality of education and talent at IET Lucknow.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-brand-700/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex justify-center items-center gap-1">
                <div className="text-4xl md:text-5xl font-bold mb-2 stat-number" data-target="25">0</div>
                <div className="p-3 text-bold">%</div>
              </div>
              <div className="text-sm uppercase tracking-wider text-white/80">Increase in Placement Rate</div>
              <div className="text-sm uppercase tracking-wider text-white/80">(2024-2025)</div>
            </div>
            <div className="bg-brand-700/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex justify-center items-center gap-1">
                <div className="text-4xl md:text-5xl font-bold mb-2 stat-number" data-target="90">0</div>
                <div className="p-3 text-bold">+</div>
              </div>
              <div className="text-sm uppercase tracking-wider text-white/80">Companies Visited</div>
              <div className="text-sm uppercase tracking-wider text-white/80">(2024-2025)</div>
            </div>
            <div className="bg-brand-700/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-4xl md:text-5xl font-bold mb-2 stat-number" data-target="54">0</div>
              <div className="text-sm uppercase tracking-wider text-white/80">LPA Highest Package</div>
              <div className="text-sm uppercase tracking-wider text-white/80">(2024-2025)</div>
            </div>
            <div className="bg-brand-700/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-4xl md:text-5xl font-bold mb-2 stat-number" data-target="518">0</div>
              <div className="text-sm uppercase tracking-wider text-white/80">Students Placed</div>
              <div className="text-sm uppercase tracking-wider text-white/80">(2024-2025)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recruiters Section */}
      <section id="recruiters" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <SplitText text="Our Esteemed Recruiters" tag="h2" className="text-3xl md:text-4xl font-bold text-brand-800" delay={30} duration={1} splitType="chars" from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }} />
            <div className="h-1.5 w-20 bg-brand-accent rounded-full mx-auto mt-4"></div>
            <p className="text-muted mt-6 max-w-2xl mx-auto">
              Top companies that trust and recruit from IET Lucknow, partnering with us to discover exceptional talent.
            </p>
          </div>

          <div className="relative group overflow-hidden py-6 sm:py-8 px-2 sm:px-12">
            <button id="scroll-left"
              className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/90 p-2 shadow-lg rounded-full hover:bg-brand-700 hover:text-white transition-all focus:outline-none border border-gray-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div id="logo-slider"
              className="flex items-center gap-8 sm:gap-16 overflow-x-auto overflow-y-hidden whitespace-nowrap scroll-smooth">
              <Image src="/images/pastRecruiter/adobe.png" alt="Adobe" className="h-20 transition-all" width={160} height={80} sizes="(max-width: 1024px) 120px, 160px" />
              <Image src="/images/pastRecruiter/dlf.png" alt="DLF" className="h-28 transition-all" width={200} height={112} sizes="(max-width: 1024px) 160px, 200px" />
              <Image src="/images/pastRecruiter/google.png" alt="Google" className="h-28 transition-all" width={200} height={112} sizes="(max-width: 1024px) 160px, 200px" />
              <Image src="/images/pastRecruiter/ibm-logo-hd.png" alt="IBM" className="h-28 transition-all" width={200} height={112} sizes="(max-width: 1024px) 160px, 200px" />
              <Image src="/images/pastRecruiter/InMobi.png" alt="Inmobi" className="h-28 transition-all" width={200} height={112} sizes="(max-width: 1024px) 160px, 200px" />
              <Image src="/images/pastRecruiter/amazon.png" alt="Amazon" className="h-28 transition-all" width={200} height={112} sizes="(max-width: 1024px) 160px, 200px" />
              <Image src="/images/pastRecruiter/volvo.png" alt="Volvo" className="h-28 transition-all" width={200} height={112} sizes="(max-width: 1024px) 160px, 200px" />
              <Image src="/images/pastRecruiter/inox.jpg" alt="Inox" className="h-28 transition-all" width={200} height={112} sizes="(max-width: 1024px) 160px, 200px" />
              <Image src="/images/pastRecruiter/torrent.png" alt="torrent" className="h-28 transition-all" width={200} height={112} sizes="(max-width: 1024px) 160px, 200px" />
              <Image src="/images/pastRecruiter/forbes.png" alt="Forbes" className="h-28 transition-all" width={200} height={112} sizes="(max-width: 1024px) 160px, 200px" />
              <Image src="/images/pastRecruiter/Intuit.png" alt="Intuit" className="h-16 w-20" width={80} height={64} sizes="(max-width: 1024px) 80px, 96px" loading="lazy" />
              <Image src="/images/pastRecruiter/zeta.png" alt="Zeta" className="h-28 transition-all" width={200} height={112} sizes="(max-width: 1024px) 160px, 200px" />
              <Image src="/images/pastRecruiter/hul.png" alt="HUL" className="h-28 transition-all" width={200} height={112} sizes="(max-width: 1024px) 160px, 200px" />
              <Image src="/images/pastRecruiter/uber.svg" alt="Uber" className="h-28" width={200} height={112} sizes="(max-width: 1024px) 160px, 200px" loading="lazy" />
              <Image src="/images/pastRecruiter/LT.avif" alt="L&T" className="h-28 transition-all" width={200} height={112} sizes="(max-width: 1024px) 160px, 200px" />
              <Image src="/images/pastRecruiter/tcs.png" alt="TCS" className="h-28 transition-all" width={200} height={112} sizes="(max-width: 1024px) 160px, 200px" />
              <Image src="/images/pastRecruiter/microsoft.png" alt="Microsoft" className="h-28 transition-all" width={200} height={112} sizes="(max-width: 1024px) 160px, 200px" />
              <Image src="/images/pastRecruiter/bharatelectronics.png" alt="Bharat Electronics" className="h-28 transition-all" width={200} height={112} sizes="(max-width: 1024px) 160px, 200px" />
              <Image src="/images/pastRecruiter/soti.png" alt="SOTI" className="h-28 transition-all" width={200} height={112} sizes="(max-width: 1024px) 160px, 200px" />
              <Image src="/images/pastRecruiter/paytm.png" alt="Paytm" className="h-28 transition-all" width={200} height={112} sizes="(max-width: 1024px) 160px, 200px" />
             </div>

            <button id="scroll-right"
              className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/90 p-2 shadow-lg rounded-full hover:bg-brand-700 hover:text-white transition-all focus:outline-none border border-gray-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-brand-50 rounded-2xl p-8">
              <h5 className="font-bold text-xl mb-4">For Recruiters</h5>
              <ul className="space-y-3 text-muted">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Simple and streamlined recruitment process</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Access to pre-screened, high-quality talent pool</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Dedicated placement coordinator for seamless coordination</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Flexible scheduling for recruitment drives</span>
                </li>
              </ul>
              <Link href="/downloads" className="inline-block mt-6 text-brand-700 font-semibold hover:underline">
                Download Brochure →
              </Link>
            </div>

            <div className="bg-brand-50 rounded-2xl p-8">
              <h5 className="font-bold text-xl mb-4">Placement Process</h5>
              <ol className="space-y-4 text-muted list-decimal list-inside">
                <li className="pl-2">Company registration and presentation</li>
                <li className="pl-2">Pre-placement talk and interaction</li>
                <li className="pl-2">Registration of interested students</li>
                <li className="pl-2">Selection process (written test, GD, interview)</li>
                <li className="pl-2">Declaration of results and offer letters</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section id="infrastructure" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <SplitText text="Facilities" tag="h2" className="text-3xl md:text-4xl font-bold text-brand-800" delay={30} duration={1} splitType="chars" from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }} />
            <div className="h-1.5 w-20 bg-brand-accent rounded-full mx-auto mt-4"></div>
            <p className="text-muted mt-6 max-w-2xl mx-auto">
              Explore our state-of-the-art facilities designed to foster innovation and academic excellence.
            </p>
          </div>

          <HoverSlider className="place-content-center">
            <div className="flex flex-col md:flex-row items-center justify-evenly gap-6 md:gap-12">
              <div className="flex flex-col space-y-2 md:space-y-4">
                {INFRASTRUCTURE_SLIDES.map((slide, index) => (
                  <TextStaggerHover
                    key={slide.id}
                    index={index}
                    className="cursor-pointer text-2xl md:text-4xl font-bold uppercase tracking-tighter text-brand-800"
                    text={slide.title}
                  />
                ))}
              </div>
              <HoverSliderImageWrap className="w-full md:w-1/2 h-[260px] sm:h-[320px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                {INFRASTRUCTURE_SLIDES.map((slide, index) => (
                  <div key={slide.id} className="relative">
                    <HoverSliderImage
                      index={index}
                      imageUrl={slide.imageUrl}
                      imageUrls={slide.imageUrls}
                      alt={slide.title}
                      className="size-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                ))}
              </HoverSliderImageWrap>
            </div>
          </HoverSlider>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <SplitText text="Campus Gallery" tag="h2" className="text-3xl md:text-4xl font-bold text-brand-800" delay={30} duration={1} splitType="chars" from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }} />
            <div className="h-1.5 w-20 bg-brand-accent rounded-full mx-auto mt-4"></div>
            <p className="text-muted mt-6 max-w-2xl mx-auto">
              A glimpse into life at IET Lucknow through our facilities, events, and learning spaces.
            </p>
          </div>

          <InteractiveSelector options={GALLERY_OPTIONS} />

          <div className="mt-8 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 bg-brand-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
              <span>View More</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>


      {/* Collaboration Section */}
      <section id="collaboration" className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12 lg:mb-16">
            <SplitText text="Our Global Collaboration" tag="h2" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-800" delay={30} duration={1} splitType="chars" from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }} />
            <div className="h-1.5 w-16 sm:w-20 bg-brand-accent rounded-full mx-auto mt-3 sm:mt-4"></div>
            <p className="text-muted mt-4 sm:mt-6 max-w-3xl mx-auto text-sm sm:text-base px-4">
              Building international partnerships to enhance technical education and create global opportunities for our
              students
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            <div className="space-y-6 lg:space-y-8">

                <div className="bg-white rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-lg hover-lift border border-gray-100 relative overflow-hidden">
               <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                /> 
                <div className="flex flex-col sm:flex-row items-start gap-4 lg:gap-6">
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <div
                      className="w-14 h-14 lg:w-16 lg:h-16 border rounded-xl lg:rounded-2xl flex items-center justify-center relative">
                      <Image src="/images/teqip.png" alt="" fill sizes="64px" className="object-contain" />
                    </div>
                  </div>
                  <div className="text-center sm:text-left flex-1">
                    <h5 className="text-lg sm:text-xl lg:text-xl font-bold text-brand-800 mb-2 lg:mb-3">TEQIP - World Bank
                      Project</h5>
                    <p className="text-muted mb-3 lg:mb-4 leading-relaxed text-sm lg:text-base">
                      Technical Education Quality Improvement Programme of Government of India (TEQIP) is being implemented
                      as a World Bank assisted Project to improve the quality of technical education system in the country.
                    </p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 lg:gap-4 mb-3 lg:mb-4">
                      <span
                        className="inline-flex items-center gap-1 lg:gap-2 bg-brand-50 text-brand-700 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium">
                        <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-brand-accent rounded-full"></span>
                        TEQIP-I
                      </span>
                      <span
                        className="inline-flex items-center gap-1 lg:gap-2 bg-brand-50 text-brand-700 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium">
                        <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-brand-accent rounded-full"></span>
                        TEQIP-II
                      </span>
                      <span
                        className="inline-flex items-center gap-1 lg:gap-2 bg-brand-50 text-brand-700 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium">
                        <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-brand-accent rounded-full"></span>
                        TEQIP-III
                      </span>
                    </div>
                    <a href="http://teqip.ietlucknow.ac.in" target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-1 lg:gap-2 text-brand-700 font-semibold text-sm lg:text-base group">
                      <span>Visit TEQIP Portal</span>
                      <svg className="w-3 h-3 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">

                <div
                  className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg hover-lift border border-gray-100 group relative overflow-hidden">
                    <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                  <div className="text-center">
                    <div
                      className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl border lg:rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4 group-hover:scale-110 transition-transform relative">
                      <Image src="/images/texas.jpg" alt="" fill sizes="64px" className="object-contain" />
                    </div>
                    <h4 className="font-bold text-brand-800 mb-1 lg:mb-2 text-sm lg:text-base">Texas Instruments</h4>
                    <p className="text-xs lg:text-sm text-muted">Industry partnership for electronics and embedded systems</p>
                  </div>
                </div>


                <div
                  className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg hover-lift border border-gray-100 group relative overflow-hidden">
                    <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                  <div className="text-center">
                    <div
                      className="w-12 h-12 lg:w-16 lg:h-16 border rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4 group-hover:scale-110 transition-transform relative">
                      <Image src="/images/ignou.png" alt="" fill sizes="64px" className="object-contain" />
                    </div>
                    <h4 className="font-bold text-brand-800 mb-1 lg:mb-2 text-sm lg:text-base">IGNOU</h4>
                    <p className="text-xs lg:text-sm text-muted">Distance learning and academic collaboration</p>
                  </div>
                </div>
              </div>

            </div>

            <div className="relative">

              <div
                className="bg-gradient-to-br from-brand-800 to-brand-700 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h5 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">Global Impact</h5>
                  <p className="text-white/90 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
                    Institute of Engineering and Technology (IET) Lucknow is one of the few Institutions selected for
                    TEQIP-I, II and III.
                  </p>

                  <div className="grid grid-cols-3 gap-3 lg:gap-4 mb-4 lg:mb-6">

                    <div className="text-center">
                      <div className="text-2xl lg:text-3xl font-bold mb-1">3</div>
                      <div className="text-xs text-white/80">TEQIP Phases</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl lg:text-3xl font-bold mb-1">500+</div>
                      <div className="text-xs text-white/80">Students Benefited</div>
                    </div>
                  </div>
                </div>


                <div className="absolute top-0 right-0 w-20 h-20 lg:w-32 lg:h-32 bg-white/10 rounded-full -translate-y-8 lg:-translate-y-16 translate-x-8 lg:translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 lg:w-24 lg:h-24 bg-brand-accent/30 rounded-full -translate-x-4 lg:-translate-x-8 translate-y-4 lg:translate-y-8"></div>
              </div>


              <div
                className="hidden sm:block absolute -top-4 -right-4 lg:-top-6 lg:-right-6 bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-xl border border-gray-100 transform rotate-3 lg:rotate-6">
                <div className="flex items-center gap-2 lg:gap-3">
                  <div
                    className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-lg lg:rounded-xl flex items-center justify-center">
                    <svg className="w-4 h-4 lg:w-6 lg:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-brand-800 text-sm lg:text-base">Selected</div>
                    <div className="text-xs text-muted">For all TEQIP phases</div>
                  </div>
                </div>
              </div>

              <div
                className="hidden sm:block absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-xl border border-gray-100 transform -rotate-2 lg:-rotate-3">
                <div className="flex items-center gap-2 lg:gap-3">
                  <div
                    className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-lg lg:rounded-xl flex items-center justify-center">
                    <svg className="w-4 h-4 lg:w-6 lg:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-brand-800 text-sm lg:text-base">Quality</div>
                    <div className="text-xs text-muted">Education Enhancement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Students Section */}
      <section id="students" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <SplitText text="Student Resources" tag="h2" className="text-3xl md:text-4xl font-bold text-brand-800" delay={30} duration={1} splitType="chars" from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }} />
            <div className="h-1.5 w-20 bg-brand-accent rounded-full mx-auto mt-4"></div>
            <p className="text-muted mt-6 max-w-3xl mx-auto">Comprehensive resources and guidance to help students prepare for
              placements and build successful careers.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow hover-lift relative overflow-hidden">
              <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
              <div className="w-12 h-12 bg-brand-100 rounded-lg text-brand-700 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                  </path>
                </svg>
              </div>
              <h5 className="font-bold text-lg mb-3">Placement Policy</h5>
              <p className="text-muted mb-4">Rules &amp; eligibility criteria for campus drives, offers and PPOs.</p>
              <a href="../files/Student_Placement_Policy.pdf"
                className="text-brand-700 font-semibold flex items-center gap-2 group">
                <span>Read policy</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow hover-lift relative overflow-hidden">
              <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
              <div className="w-12 h-12 bg-brand-100 rounded-lg text-brand-700 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                  </path>
                </svg>
              </div>
              <h5 className="font-bold text-lg mb-3">Internship & PPO Guidelines</h5>
              <p className="text-muted mb-4">Guidance on internships, stipend rules and pre-placement offers.</p>
              <Link href="/downloads" className="text-brand-700 font-semibold flex items-center gap-2 group">
                <span>Learn more</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow hover-lift relative overflow-hidden">
              <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
              <div className="w-12 h-12 bg-brand-100 rounded-lg text-brand-700 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                  </path>
                </svg>
              </div>
              <h5 className="font-bold text-lg mb-3">Career Resources</h5>
              <ul className="text-muted space-y-2 mb-4">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Resume templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Mock interviews</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Skill-building workshops</span>
                </li>
              </ul>
              <Link href="/downloads" className="text-brand-700 font-semibold flex items-center gap-2 group">
                <span>Get resources</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/downloads" className="bg-white p-5 rounded-xl shadow flex items-center gap-4 hover-lift group relative overflow-hidden">
            <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
              <div
                className="w-12 h-12 bg-brand-100 rounded-lg text-brand-700 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-700 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold">Placement</div>
                <div className="text-xs text-muted">Policy & Guidelines</div>
              </div>
            </Link>

            <Link href="/downloads" className="bg-white p-5 rounded-xl shadow flex items-center gap-4 hover-lift group relative overflow-hidden">
            <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
              <div
                className="w-12 h-12 bg-brand-100 rounded-lg text-brand-700 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-700 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold">Download JNF</div>
                <div className="text-xs text-muted">Job Notification Form</div>

              </div>
            </Link>

            <Link href="/downloads" className="bg-white p-5 rounded-xl shadow flex items-center gap-4 hover-lift group relative overflow-hidden">
            <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
              <div
                className="w-12 h-12 bg-brand-100 rounded-lg text-brand-700 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-700 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold">Download Brochure</div>
                <div className="text-xs text-muted">Brochure &amp; templates</div>
              </div>
            </Link>

            <Link href="/faq" className="bg-white p-5 rounded-xl shadow flex items-center gap-4 hover-lift group relative overflow-hidden">
            <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
              <div
                className="w-12 h-12 bg-brand-100 rounded-lg text-brand-700 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-700 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z">
                  </path>
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold">FAQs</div>
                <div className="text-xs text-muted">Frequently Asked Questions</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-800">Contact Us</h2>
            <div className="h-1.5 w-20 bg-brand-accent rounded-full mx-auto mt-4"></div>
            <p className="text-muted mt-6 max-w-3xl mx-auto">Get in touch with the Training & Placement Cell for any queries or
              assistance</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            <div className="bg-gradient-to-br from-brand-800 to-brand-700 rounded-2xl p-8 text-white">
              <h5 className="text-2xl font-bold mb-6">Training & Placement Office</h5>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Address</h4>
                    <p className="text-white/90">Lecture Theatre Building, Institute of Engineering and Technology, Lucknow -
                      226021</p>
                  </div>
                </div>



                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                      </path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-white/90">
                      <a href="mailto:placement@ietlucknow.ac.in"
                        className="underline hover:no-underline">placement@ietlucknow.ac.in</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Office Hours</h4>
                    <p className="text-white/90">Monday to Friday: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <h4 className="font-semibold mb-3">Officer Incharge</h4>
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Dr. Arun Kumar Tiwari</p>
                    <p className="text-white/80 text-sm">Officer Incharge, Training & Placement</p>
                    <p className="text-white/90 mt-1">
                      <a href="mailto:aruntiwari@ietlucknow.ac.in"
                        className="underline hover:no-underline">aruntiwari@ietlucknow.ac.in</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <a href="https://www.facebook.com/ietplacementcell/"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="https://x.com/iet_lucknow"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.033 10.033 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/arun-kumar-tiwari-18161a1a3/"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Campus Directions */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h5 className="text-2xl font-bold text-brand-800 mb-6">Visit Our Campus</h5>

              <div className="mb-6">
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="bg-brand-100 relative aspect-video w-full">
                    <Image
                      className="object-cover"
                      src="/images/campus.jpg"
                      alt="campus"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg">How to Reach</h4>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-brand-accent">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-medium">By Road</h5>
                      <p className="text-muted text-sm mt-1">Located on Sitapur Road, easily accessible from all parts of
                        Lucknow.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-brand-accent">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-medium">Schedule a Visit</h5>
                      <p className="text-muted text-sm mt-1">For recruiters planning to visit, please contact us in advance to
                        schedule your visit.</p>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
