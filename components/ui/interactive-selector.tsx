"use client"

import Image from 'next/image';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Building2, BookOpen, Users, Presentation, MessageSquare, GraduationCap } from 'lucide-react';

interface GalleryOption {
    title: string;
    description: string;
    image: string;
    icon: string;
}

interface InteractiveSelectorProps {
    options: GalleryOption[];
}

const iconMap = {
    Building2,
    BookOpen,
    Users,
    Presentation,
    MessageSquare,
    GraduationCap
};

export const InteractiveSelector: React.FC<InteractiveSelectorProps> = ({ options }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
    const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    const startAutoPlay = useCallback(() => {
        if (autoPlayTimerRef.current) {
            clearInterval(autoPlayTimerRef.current);
        }
        autoPlayTimerRef.current = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % options.length);
        }, 2000);
    }, [options.length]);

    const handleOptionClick = (index: number) => {
        if (index !== activeIndex) {
            setActiveIndex(index);
            startAutoPlay(); // Reset timer on user click
        }
    };

    // Auto-play functionality - cycles through images every 2 seconds
    useEffect(() => {
        startAutoPlay();

        return () => {
            if (autoPlayTimerRef.current) {
                clearInterval(autoPlayTimerRef.current);
            }
        };
    }, [startAutoPlay]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 640px)');
        const handleChange = () => {
            setIsMobile(mediaQuery.matches);
        };

        handleChange();
        mediaQuery.addEventListener('change', handleChange);
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    useEffect(() => {
        const timers: NodeJS.Timeout[] = [];

        options.forEach((_, i) => {
            const timer = setTimeout(() => {
                setAnimatedOptions(prev => [...prev, i]);
            }, 180 * i);
            timers.push(timer);
        });

        return () => {
            timers.forEach(timer => clearTimeout(timer));
        };
    }, [options]);

    return (
        <div className="relative flex flex-col items-center justify-center w-full py-8 sm:py-12">
            {isMobile ? (
                <div className="w-full max-w-xl mx-auto grid grid-cols-1 gap-4">
                    {options.map((option, index) => {
                        const IconComponent = iconMap[option.icon as keyof typeof iconMap];
                        return (
                            <button
                                key={index}
                                type="button"
                                className={`relative w-full min-h-[180px] overflow-hidden rounded-2xl border border-gray-200 shadow-md text-left ${
                                    activeIndex === index ? 'ring-2 ring-brand-700' : ''
                                }`}
                                onClick={() => handleOptionClick(index)}
                            >
                                <div className="absolute inset-0">
                                    <Image
                                        src={option.image}
                                        alt={option.title}
                                        className="object-cover"
                                        fill
                                        sizes="100vw"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                                </div>
                                <div className="relative z-10 flex items-center gap-3 p-4">
                                    <div className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white">
                                        {IconComponent && <IconComponent size={20} className="text-white" />}
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold text-base">{option.title}</div>
                                        <div className="text-white/80 text-sm">{option.description}</div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            ) : (
                <div className="flex w-full max-w-[1150px] h-[360px] sm:h-[420px] lg:h-[480px] mx-auto items-stretch overflow-hidden relative">
                    {options.map((option, index) => {
                        const IconComponent = iconMap[option.icon as keyof typeof iconMap];

                        return (
                            <div
                                key={index}
                                className={`
                relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out
                ${activeIndex === index ? 'active' : ''}
              `}
                                style={{
                                    backgroundImage: `url('${option.image}')`,
                                    backgroundSize: activeIndex === index ? 'auto 100%' : 'auto 120%',
                                    backgroundPosition: 'center',
                                    backfaceVisibility: 'hidden',
                                    opacity: animatedOptions.includes(index) ? 1 : 0,
                                    transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
                                    minWidth: '60px',
                                    minHeight: '100px',
                                    margin: 0,
                                    borderRadius: 0,
                                    borderWidth: '0.5px',
                                    borderStyle: 'solid',
                                    borderColor: activeIndex === index ? '#292929' : '#292929',
                                    cursor: 'pointer',
                                    backgroundColor: '#18181b',
                                    boxShadow: activeIndex === index
                                        ? '0 20px 60px rgba(0,0,0,0.50)'
                                        : '0 10px 30px rgba(0,0,0,0.30)',
                                    flex: activeIndex === index ? '7 1 0%' : '1 1 0%',
                                    zIndex: activeIndex === index ? 10 : 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    willChange: 'flex-grow, box-shadow, background-size, background-position'
                                } as React.CSSProperties}
                                onClick={() => handleOptionClick(index)}
                            >
                                <div
                                    className="absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
                                    style={{
                                        bottom: activeIndex === index ? '0' : '-40px',
                                        height: '120px',
                                        boxShadow: activeIndex === index
                                            ? 'inset 0 -120px 120px -120px #000, inset 0 -120px 120px -80px #000'
                                            : 'inset 0 -120px 0px -120px #000, inset 0 -120px 0px -80px #000'
                                    }}
                                ></div>

                                <div className="absolute left-0 right-0 bottom-5 flex items-center justify-start h-12 z-2 pointer-events-none px-4 gap-3 w-full">
                                    <div className="min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-[rgba(32,32,32,0.85)] backdrop-blur-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.18)] border-2 border-[#444] flex-shrink-0 flex-grow-0 transition-all duration-200">
                                        {IconComponent && <IconComponent size={24} className="text-white" />}
                                    </div>
                                    <div className="text-white whitespace-pre relative">
                                        <div
                                            className="font-bold text-lg transition-all duration-700 ease-in-out"
                                            style={{
                                                opacity: activeIndex === index ? 1 : 0,
                                                transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                                            }}
                                        >
                                            {option.title}
                                        </div>
                                        <div
                                            className="text-base text-gray-300 transition-all duration-700 ease-in-out"
                                            style={{
                                                opacity: activeIndex === index ? 1 : 0,
                                                transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                                            }}
                                        >
                                            {option.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
