'use client';

import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const CONSTANTS = {
  itemSize: 48,
  containerSize: 280,
  openStagger: 0.02,
  closeStagger: 0.07
};

const STYLES: Record<string, Record<string, string>> = {
  trigger: {
    container:
      'rounded-full flex items-center bg-foreground justify-center cursor-pointer outline-none ring-0 hover:brightness-125 transition-all duration-100 z-50 shadow-lg',
    active: 'bg-foreground'
  },
  item: {
    container:
      'rounded-full flex items-center justify-center absolute bg-white shadow-md hover:bg-slate-50 cursor-pointer border border-slate-100',
    label: 'text-[10px] font-bold uppercase tracking-wider text-foreground absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-2 py-1 rounded shadow-sm'
  }
};

const pointOnCircle = (i: number, n: number, r: number, cx = 0, cy = 0) => {
  const theta = (2 * Math.PI * i) / n - Math.PI / 2;
  const x = cx + r * Math.cos(theta);
  const y = cy + r * Math.sin(theta);
  return { x, y };
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  index: number;
  totalItems: number;
  isOpen: boolean;
}

const MenuItem = ({ icon, label, href, index, totalItems, isOpen }: MenuItemProps) => {
  const { x, y } = pointOnCircle(index, totalItems, CONSTANTS.containerSize / 2);
  const [hovering, setHovering] = useState(false);

  return (
    <a href={href} className={STYLES.item.container}>
      <motion.button
        animate={{
          x: isOpen ? x : 0,
          y: isOpen ? y : 0,
          scale: isOpen ? 1 : 0,
          opacity: isOpen ? 1 : 0
        }}
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.1 }
        }}
        transition={{
          delay: isOpen ? index * CONSTANTS.openStagger : index * CONSTANTS.closeStagger,
          type: 'spring',
          stiffness: 300,
          damping: 30
        }}
        style={{
          height: CONSTANTS.itemSize,
          width: CONSTANTS.itemSize
        }}
        className={STYLES.item.container}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <span className="text-slate-600">{icon}</span>
        {(hovering || isOpen) && (
           <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={STYLES.item.label}
           >
            {label}
           </motion.p>
        )}
      </motion.button>
    </a>
  );
};

const CircleMenu = ({
  items,
  openIcon = <Menu size={20} className="text-background" />,
  closeIcon = <X size={20} className="text-background" />
}: {
  items: Array<{ label: string; icon: React.ReactNode; href: string }>;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuAnimate = useAnimationControls();
  const triggerAnimate = useAnimationControls();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = async () => {
    if (isOpen) {
      setIsOpen(false);
      await menuAnimate.start({
        rotate: -360,
        filter: 'blur(2px)',
        transition: { duration: 0.5, ease: 'easeInOut' }
      });
      menuAnimate.set({ rotate: 0, filter: 'blur(0px)' });
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      {/* Full screen backdrop when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
            className="fixed inset-0 bg-black/20 z-[55] cursor-pointer"
          />
        )}
      </AnimatePresence>

      <div className={cn(
        "fixed transition-all duration-700 ease-in-out z-[60]",
        isOpen 
          ? "inset-0 flex items-center justify-center" 
          : "bottom-10 right-10 w-12 h-12"
      )}>
        <div
          style={{
            width: isOpen ? CONSTANTS.containerSize * 2 : CONSTANTS.itemSize,
            height: isOpen ? CONSTANTS.containerSize * 2 : CONSTANTS.itemSize
          }}
          className="relative flex items-center justify-center pointer-events-none"
        >
          {/* Main Trigger Button */}
          <div className="pointer-events-auto">
            <motion.button
              layout
              animate={triggerAnimate}
              style={{
                height: CONSTANTS.itemSize,
                width: CONSTANTS.itemSize
              }}
              className={STYLES.trigger.container}
              onClick={toggleMenu}
            >
              <AnimatePresence mode="popLayout">
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                  >
                    {closeIcon}
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: -90 }}
                  >
                    {openIcon}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Menu Items */}
          <motion.div
            animate={menuAnimate}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {items.map((item, index) => (
              <div 
                key={`menu-item-${index}`} 
                className={isOpen ? 'pointer-events-auto' : 'pointer-events-none'}
              >
                <MenuItem
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  index={index}
                  totalItems={items.length}
                  isOpen={isOpen}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export { CircleMenu };
