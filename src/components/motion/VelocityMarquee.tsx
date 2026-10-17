import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VelocityMarqueeProps {
  items?: string[];
  className?: string;
  dark?: boolean;
}

const DEFAULT_ITEMS = [
  'WHERE BRANDS MEET CREATIVITY',
  'SCRIPTING & STRATEGY',
  'CAPTURING & EDITING',
  'SOCIAL MEDIA HANDLING',
  'INFLUENCER COLLABORATIONS',
  'PAID ADVERTISING & CAMPAIGNS',
];

export const VelocityMarquee: React.FC<VelocityMarqueeProps> = ({
  items = DEFAULT_ITEMS,
  className = '',
  dark = false,
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollDir, setScrollDir] = useState<'left' | 'right'>('left');

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const track = trackRef.current;
    if (!track) return;

    let xPos = 0;
    const baseSpeed = 1.35;
    let currentDir = -1; // -1 = scrolling down -> marquee moves left; 1 = scrolling up -> marquee moves right

    const onTick = () => {
      // Calculate halfWidth of the duplicated content
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth <= 0) return;

      xPos += baseSpeed * currentDir;

      // Seamless modular wrap
      if (xPos <= -halfWidth) {
        xPos += halfWidth;
      } else if (xPos >= 0) {
        xPos -= halfWidth;
      }

      gsap.set(track, { x: xPos });
    };

    gsap.ticker.add(onTick);

    // ScrollTrigger to detect direction and skew velocity
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        // self.direction: 1 when scrolling DOWN, -1 when scrolling UP
        if (self.direction === 1) {
          currentDir = -1; // Move left
          setScrollDir('left');
        } else if (self.direction === -1) {
          currentDir = 1; // Move right
          setScrollDir('right');
        }

        const velocity = self.getVelocity() / 250;
        const clampedSkew = Math.max(-10, Math.min(10, velocity * -0.35));
        gsap.to(track, {
          skewX: clampedSkew,
          duration: 0.35,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      },
    });

    return () => {
      gsap.ticker.remove(onTick);
      st.kill();
    };
  }, []);

  // Repeat sequence across two identical blocks for flawless 50% modular wrapping
  const renderItemBlock = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex items-center shrink-0">
      {items.map((item, idx) => (
        <div key={`${keyPrefix}-${idx}`} className="flex items-center shrink-0">
          <span className="font-tech font-normal text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider whitespace-nowrap px-6">
            {item}
          </span>
          {/* Glyph Arrow with smooth 180deg flip on scroll direction reversal */}
          <span
            className="inline-flex items-center justify-center shrink-0 text-black mx-2 transition-transform duration-500 ease-out will-change-transform"
            style={{
              transform: scrollDir === 'left' ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
            aria-hidden="true"
          >
            <svg
              className="w-7 h-7 sm:w-9 sm:h-9"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              <line x1="2" y1="12" x2="20" y2="12" />
              <polyline points="13 5 20 12 13 19" />
            </svg>
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={marqueeRef}
      className={`relative w-full overflow-hidden select-none border-y py-4 ${
        dark
          ? 'bg-[#0A0A0A] text-[#F4F3EF] border-white/15'
          : 'bg-[#EAE8E1] text-[#0D0D0D] border-black/15'
      } ${className}`}
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform"
      >
        {renderItemBlock('block-a')}
        {renderItemBlock('block-b')}
      </div>
    </div>
  );
};
