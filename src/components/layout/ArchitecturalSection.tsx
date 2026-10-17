import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ArchitecturalSectionProps {
  id?: string;
  index: string;
  label: string;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}

export const ArchitecturalSection: React.FC<ArchitecturalSectionProps> = ({
  id,
  index,
  label,
  children,
  dark = false,
  className = '',
}) => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const line = lineRef.current;
    if (!line) return;

    gsap.fromTo(
      line,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: line,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section
      id={id}
      className={`relative w-full border-b transition-colors duration-300 ${
        dark
          ? 'bg-[#0A0A0A] text-[#F4F3EF] border-white/15'
          : 'bg-[#F4F3EF] text-[#0D0D0D] border-black/15'
      } ${className}`}
    >
      {/* Top 1px hairline draw animation */}
      <div
        ref={lineRef}
        className={`h-[1px] w-full origin-left ${dark ? 'bg-white/15' : 'bg-black/15'}`}
      />

      <div className="relative flex flex-col md:flex-row w-full">
        {/* Desktop Left Spine (56px fixed width column) */}
        <div
          className={`hidden md:flex w-14 shrink-0 flex-col items-center justify-between py-10 border-r select-none ${
            dark ? 'border-white/15 bg-[#0D0D0D]' : 'border-black/15 bg-[#EAE8E1]'
          }`}
        >
          {/* Top index */}
          <span className="font-mono text-xs font-bold tracking-widest text-[#FACC15]">
            {index}
          </span>

          {/* Middle rotated vertical label */}
          <span className="writing-vertical rotate-180 font-tech text-[11px] uppercase tracking-[0.25em] font-bold opacity-75 my-auto">
            {label}
          </span>

          {/* Bottom Saffron Indicator Square */}
          <span className="w-2 h-2 bg-[#FACC15] shrink-0 border border-black/30" />
        </div>

        {/* Mobile Mini-Spine Bar */}
        <div
          className={`md:hidden flex items-center justify-between px-4 py-2 border-b font-mono text-[11px] ${
            dark ? 'border-white/15 bg-[#0D0D0D] text-white/70' : 'border-black/15 bg-[#EAE8E1] text-black/70'
          }`}
        >
          <span className="text-[#FACC15] font-bold">{index} // {label}</span>
          <span className="w-2 h-2 bg-[#FACC15]" />
        </div>

        {/* Main Content Area */}
        <div className="relative flex-1 min-w-0">
          {/* Crosshair Corner Plus Marks */}
          <span
            className={`hidden md:block absolute -top-[5px] -left-[5px] font-mono text-[10px] pointer-events-none select-none z-10 ${
              dark ? 'text-white/40' : 'text-black/40'
            }`}
          >
            +
          </span>
          {children}
        </div>
      </div>
    </section>
  );
};
