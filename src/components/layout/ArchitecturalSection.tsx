import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ArchitecturalSectionProps {
  id?: string;
  index?: string;
  label?: string;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}

export const ArchitecturalSection: React.FC<ArchitecturalSectionProps> = ({
  id,
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
        duration: 1.1,
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
          ? 'bg-[#0A0A0A] text-[#F4F3EF] border-white/10'
          : 'bg-[#F4F3EF] text-[#0D0D0D] border-black/10'
      } ${className}`}
    >
      {/* Top subtle 1px divider draw */}
      <div
        ref={lineRef}
        className={`h-[1px] w-full origin-left ${dark ? 'bg-white/10' : 'bg-black/10'}`}
      />

      {/* Clean Full-Width Architectural Canvas (No Terminal Spine, No Monospace Crosshairs) */}
      <div className="relative w-full min-w-0">
        {children}
      </div>
    </section>
  );
};
