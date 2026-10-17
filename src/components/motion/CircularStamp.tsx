import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CircularStampProps {
  className?: string;
  dark?: boolean;
}

export const CircularStamp: React.FC<CircularStampProps> = ({ className = '', dark = false }) => {
  const stampRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const stamp = stampRef.current;
    if (!stamp) return;

    // Continuous baseline rotation
    const rotateTween = gsap.to(stamp, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none',
    });

    // Scroll-scrub velocity spin
    const st = ScrollTrigger.create({
      trigger: stamp,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.8,
      onUpdate: (self) => {
        gsap.to(stamp, {
          rotation: `+=${self.getVelocity() * 0.05}`,
          duration: 0.2,
          overwrite: 'auto',
        });
      },
    });

    return () => {
      rotateTween.kill();
      st.kill();
    };
  }, []);

  return (
    <div className={`relative w-[136px] h-[136px] flex items-center justify-center pointer-events-none select-none ${className}`}>
      <svg
        ref={stampRef}
        viewBox="0 0 136 136"
        className="w-full h-full will-change-transform"
      >
        <path
          id="stampCirclePath"
          d="M 68, 68 m -52, 0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0"
          fill="none"
        />
        <text
          className={`font-mono text-[9px] tracking-[0.24em] font-bold ${
            dark ? 'fill-[#F4F3EF]' : 'fill-[#0D0D0D]'
          }`}
        >
          <textPath href="#stampCirclePath" startOffset="0%">
            FamO1mediaa • CREATIVE GROWTH PARTNER • EST 2026 • 
          </textPath>
        </text>
      </svg>
      {/* Center 12px Saffron Square */}
      <div className="absolute w-3.5 h-3.5 bg-[#FACC15] border border-black/40 z-10" />
    </div>
  );
};
