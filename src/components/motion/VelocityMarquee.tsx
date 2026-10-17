import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VelocityMarqueeProps {
  text?: string;
  className?: string;
  dark?: boolean;
}

export const VelocityMarquee: React.FC<VelocityMarqueeProps> = ({
  text = 'FULL-STACK RESTAURANT GROWTH — PREDICTABLE COVERS — HIGH-MARGIN HOSPITALITY — ',
  className = '',
  dark = false,
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const track = trackRef.current;
    if (!track) return;

    let xPos = 0;
    const speed = 1.2;
    let direction = -1;

    // Continuous ticker loop
    const onTick = () => {
      xPos += speed * direction;
      // loop around half the scroll width
      if (Math.abs(xPos) >= track.scrollWidth / 2) {
        xPos = 0;
      }
      gsap.set(track, { x: xPos });
    };

    gsap.ticker.add(onTick);

    // ScrollTrigger velocity & skew
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        direction = self.direction === 1 ? -1 : 1;
        const velocity = self.getVelocity() / 250;
        const clampedSkew = Math.max(-14, Math.min(14, velocity * -0.5));
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

  const phrases = [text, text, text, text];

  return (
    <div
      ref={marqueeRef}
      className={`relative w-full overflow-hidden select-none border-y py-4 ${
        dark ? 'bg-[#0A0A0A] text-[#F4F3EF] border-white/15' : 'bg-[#EAE8E1] text-[#0D0D0D] border-black/15'
      } ${className}`}
    >
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform font-display text-4xl md:text-5xl uppercase tracking-wider">
        {phrases.map((phrase, idx) => (
          <div key={idx} className="flex items-center gap-6 shrink-0 pr-6">
            <span>{phrase}</span>
            <span className="w-3.5 h-3.5 bg-[#FACC15] shrink-0 inline-block border border-black/20" />
          </div>
        ))}
      </div>
    </div>
  );
};
