import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const VelocityMarquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  const line1 = [
    'INFLUENCER CAMPAIGNS',
    'UGC CONTENT PRODUCTION',
    'PAID PERFORMANCE ADS',
    'BRAND AMBASSADORS',
    'EVENT PR ACTIVATIONS',
    'FAMO1MEDIAA',
    'HIGH ROAS ENGINES',
  ];

  const line2 = [
    'VIRAL HOOK ENGINEERING',
    '850+ VETTED CREATORS',
    '142M+ AUDITED IMPRESSIONS',
    'META & GOOGLE ADS',
    'FULL PERPETUAL USAGE RIGHTS',
    '48H SPRINT DEPLOYMENT',
  ];

  useEffect(() => {
    const container = containerRef.current;
    const track1 = track1Ref.current;
    const track2 = track2Ref.current;
    if (!container || !track1 || !track2) return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Base continuous tweens:
      // Track 1 moves left (0% -> -50%)
      const tween1 = gsap.fromTo(
        track1,
        { xPercent: 0 },
        {
          xPercent: -50,
          duration: 25,
          repeat: -1,
          ease: 'none',
        }
      );

      // Track 2 moves right (-50% -> 0%)
      const tween2 = gsap.fromTo(
        track2,
        { xPercent: -50 },
        {
          xPercent: 0,
          duration: 30,
          repeat: -1,
          ease: 'none',
        }
      );

      // Direction state: 1 = forward (top goes left, bottom goes right), -1 = reverse (top goes right, bottom goes left)
      let currentDirection = 1;

      ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = self.getVelocity(); // > 0 when scrolling down, < 0 when scrolling up
          const dir = self.direction; // 1 for down, -1 for up

          // If scrolling up, lock direction to reverse (-1)
          // If scrolling down, lock direction to forward (+1)
          if (dir === -1 || velocity < -40) {
            currentDirection = -1;
          } else if (dir === 1 || velocity > 40) {
            currentDirection = 1;
          }

          // Calculate speed boost based on scroll velocity
          const boost = Math.min(Math.abs(velocity) * 0.0018, 3.5);
          const activeScale = currentDirection * (1 + boost);

          // Animate to active speed immediately while scrolling
          gsap.to([tween1, tween2], {
            timeScale: activeScale,
            duration: 0.2,
            overwrite: 'auto',
            onComplete: () => {
              // When velocity ceases, settle at base speed in the CURRENT direction (never flips back)
              gsap.to([tween1, tween2], {
                timeScale: currentDirection,
                duration: 0.8,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            },
          });
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative border-y border-neutral-300 bg-[#f4f3ef] py-6 overflow-hidden select-none"
    >
      {/* Top Track (Moving Left, Bold Dark Text with Acid Yellow Stars) */}
      <div className="overflow-hidden mb-3 whitespace-nowrap">
        <div ref={track1Ref} className="flex items-center gap-8 w-max will-change-transform">
          {[...line1, ...line1].map((text, idx) => (
            <div key={idx} className="flex items-center gap-8 shrink-0">
              <span className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-[#0D0D0D] hover:text-[#FACC15] transition-colors">
                {text}
              </span>
              <span className="text-[#FACC15] text-xl font-bold">★</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Track (Moving Right, 50% Gray Text with Dots) */}
      <div className="overflow-hidden whitespace-nowrap">
        <div ref={track2Ref} className="flex items-center gap-8 w-max will-change-transform">
          {[...line2, ...line2].map((text, idx) => (
            <div key={idx} className="flex items-center gap-8 shrink-0">
              <span className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight text-neutral-500 hover:text-[#0D0D0D] transition-colors">
                {text}
              </span>
              <span className="text-neutral-400 text-lg">·</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VelocityMarquee;
