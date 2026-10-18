import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isAutomated = Boolean(navigator.webdriver || prefersReducedMotion);

    if (isAutomated) {
      setIsDismissed(true);
      onComplete?.();
      ScrollTrigger.refresh();
      return;
    }

    // Safety fallback: guaranteed unmount after 3.5s
    const safetyTimer = setTimeout(() => {
      setIsDismissed(true);
      onComplete?.();
      ScrollTrigger.refresh();
    }, 3500);

    const progressObj = { value: 0 };
    const tween = gsap.to(progressObj, {
      value: 100,
      duration: 2.0,
      ease: 'power2.inOut',
      onUpdate: () => {
        setProgress(Math.floor(progressObj.value));
      },
      onComplete: () => {
        clearTimeout(safetyTimer);
        if (preloaderRef.current) {
          gsap.to(preloaderRef.current, {
            yPercent: -100,
            duration: 0.65,
            ease: 'power4.inOut',
            onComplete: () => {
              setIsDismissed(true);
              onComplete?.();
              ScrollTrigger.refresh();
            },
          });
        } else {
          setIsDismissed(true);
          onComplete?.();
          ScrollTrigger.refresh();
        }
      },
    });

    return () => {
      clearTimeout(safetyTimer);
      tween.kill();
    };
  }, [onComplete]);

  if (isDismissed) return null;

  return (
    <div
      ref={preloaderRef}
      id="preloader"
      className="fixed inset-0 z-[9999] flex flex-col justify-between p-8 sm:p-12 md:p-16 bg-[#0C1014] text-[#F4F3EF] select-none"
    >
      <div className="flex items-center justify-between font-tech text-xs uppercase tracking-widest text-neutral-400 font-semibold">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 bg-[#FACC15] animate-pulse" />
          <span>famO1Mediaa STUDIO</span>
        </div>
        <span className="text-[#FACC15] border border-[#FACC15]/30 px-2 py-0.5 font-bold">STUDIO ARCHIVE</span>
      </div>

      <div className="text-center my-auto">
        <div id="preloaderLogo" className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight uppercase">
          famO1Mediaa
        </div>
        <div className="mt-4 font-tech text-xs sm:text-sm font-bold text-neutral-400 tracking-[0.25em] uppercase">
          CREATIVE PRODUCTION & MARKETING
        </div>
      </div>

      <div className="w-full max-w-xl mx-auto">
        <div className="flex items-center justify-between font-tech text-xs font-semibold mb-3">
          <span className="text-neutral-400 tracking-widest uppercase">Loading Showcase</span>
          <span id="preloaderCounter" className="text-[#FACC15] font-bold text-sm tracking-wider">
            {progress}%
          </span>
        </div>
        <div className="w-full h-1 bg-white/10 overflow-hidden">
          <div
            id="preloaderBar"
            className="h-full bg-[#FACC15] transition-[width] ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
