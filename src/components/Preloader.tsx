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

    // Safety fallback: guaranteed unmount after 1.8s
    const safetyTimer = setTimeout(() => {
      setIsDismissed(true);
      onComplete?.();
      ScrollTrigger.refresh();
    }, 1800);

    const progressObj = { value: 0 };
    const tween = gsap.to(progressObj, {
      value: 100,
      duration: 0.65,
      ease: 'power1.inOut',
      onUpdate: () => {
        setProgress(Math.floor(progressObj.value));
      },
      onComplete: () => {
        clearTimeout(safetyTimer);
        if (preloaderRef.current) {
          gsap.to(preloaderRef.current, {
            yPercent: -100,
            duration: 0.45,
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
      className="fixed inset-0 z-50 flex flex-col justify-between p-8 sm:p-12 bg-primary select-none"
    >
      <div className="flex items-center justify-between text-xs font-bold text-muted">
        <span>FamO1mediaa STUDIO</span>
        <span className="text-accent">2026 REEL</span>
      </div>

      <div className="text-center my-auto">
        <div id="preloaderLogo" className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          FamO1mediaa
        </div>
        <div className="mt-3 text-xs font-medium text-muted tracking-wide">
          CREATIVE COMMERCE ENGINE
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs font-semibold mb-3">
          <span className="text-muted tracking-wider uppercase">Loading Showcase</span>
          <span id="preloaderCounter" className="text-accent font-bold text-sm">
            {progress}%
          </span>
        </div>
        <div className="w-full h-1 bg-surface-subtle rounded-full overflow-hidden">
          <div
            id="preloaderBar"
            className="h-full bg-accent"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
