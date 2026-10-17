import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const MagneticCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cursor = cursorRef.current;
    const textEl = textRef.current;
    if (!cursor) return;

    // Fast mouse coordinate tracking
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.18, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.18, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Context morphing on data-cursor targets
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement | null;
      if (target) {
        const cursorText = target.getAttribute('data-cursor') || '';
        if (textEl) {
          textEl.textContent = cursorText;
          textEl.style.opacity = '1';
        }
        gsap.to(cursor, {
          width: 88,
          height: 32,
          backgroundColor: '#FACC15',
          mixBlendMode: 'normal',
          duration: 0.25,
          ease: 'power3.out',
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement | null;
      if (target) {
        if (textEl) {
          textEl.textContent = '';
          textEl.style.opacity = '0';
        }
        gsap.to(cursor, {
          width: 14,
          height: 14,
          backgroundColor: '#FACC15',
          mixBlendMode: 'difference',
          duration: 0.25,
          ease: 'power3.out',
        });
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="hidden md:flex items-center justify-center pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#FACC15] mix-blend-difference overflow-hidden text-[#0D0D0D] font-mono text-[10px] font-bold tracking-wider"
      style={{ willChange: 'transform, width, height' }}
    >
      <span ref={textRef} className="opacity-0 whitespace-nowrap transition-opacity duration-150 uppercase" />
    </div>
  );
};

interface MagneticProps {
  children: React.ReactElement;
  strength?: number;
  className?: string;
}

export const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.35, className = '' }) => {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = magneticRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.3)' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
      xTo(x);
      yTo(y);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={magneticRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
};
