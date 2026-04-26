'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CircleMenu } from './CircleMenu';
import { Home, Info, Lightbulb, Briefcase, Image as ImageIcon, Mail } from 'lucide-react';

const menuItems = [
  { label: 'Home', icon: <Home size={20} />, href: '/' },
  { label: 'About', icon: <Info size={20} />, href: '/tpc/aboutus' },
  { label: 'Insights', icon: <Lightbulb size={20} />, href: '/insights/aboutiet' },
  { label: 'Recruiters', icon: <Briefcase size={20} />, href: '/recruiters/invitation' },
  { label: 'Gallery', icon: <ImageIcon size={20} />, href: '/gallery' },
  { label: 'Contact', icon: <Mail size={20} />, href: '/tpc/contactus' },
];

const MainNavbar = () => {
  return (
    <>
      {/* Floating Circle Menu */}
      <CircleMenu items={menuItems} />
    </>
  );
};

export default MainNavbar;
