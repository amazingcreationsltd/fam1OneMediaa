import React, { useEffect, useRef } from 'react';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
import { MaskedHeading, ParallaxMedia } from './motion/RevealWrappers';
import { CircularStamp } from './motion/CircularStamp';
import { Magnetic } from './motion/MagneticCursor';
import { ArrowUpRight, Sparkles, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroStudioBanner from '../assets/images/faizur-rehman-pHPzdEHN6Os-unsplash.webp';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  isLoaded?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isLoaded = true }) => {
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const subtitle = subtitleRef.current;
    const ctas = ctaContainerRef.current;
    const note = noteRef.current;
    const caps = capabilitiesRef.current;

    const elements = [subtitle, ctas, note, caps].filter(Boolean);
    if (elements.length === 0) return;

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // While preloader is running, keep elements strictly hidden (no flicker)
    if (!isLoaded) {
      gsap.set(elements, { opacity: 0, y: 30 });
      return;
    }

    if (prefersReduced) {
      gsap.set(elements, { opacity: 1, y: 0 });
      return;
    }

    // Preloader completed -> animate in smoothly right after heading cascade
    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.95,
        stagger: 0.15,
        delay: 0.65,
        ease: 'power3.out',
      }
    );
  }, [isLoaded]);

  return (
    <ArchitecturalSection id="hero" className="relative overflow-hidden">
      {/* Centered Editorial Hero Block */}
      <div className="border-b border-black/15 bg-[#F4F3EF] px-6 sm:px-12 py-16 sm:py-24 md:py-28 flex flex-col items-center text-center">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          
          {/* Tagline Pill */}
          <div className="flex items-center justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-black text-[#FACC15] font-tech text-xs uppercase font-bold tracking-widest">
              <Sparkles className="w-3 h-3 fill-[#FACC15]" />
              <span>Your Future Growth Partner</span>
            </span>
          </div>

          {/* Centered Giant Monolithic Masked Heading */}
          <MaskedHeading
            as="h1"
            triggerOnLoad={isLoaded}
            stagger={0.08}
            className="font-display font-black text-5xl sm:text-7xl md:text-[6.5rem] lg:text-[7.5rem] xl:text-[8.5rem] leading-[0.88] uppercase tracking-[-0.03em] text-[#0D0D0D] text-center"
          >
            WHERE BRANDS MEET CREATIVITY.
          </MaskedHeading>

          {/* Centered Concise Mission Subtitle - Animated Step 1 */}
          <p
            ref={subtitleRef}
            className="mt-8 font-sans text-lg sm:text-xl md:text-2xl text-neutral-700 max-w-3xl font-normal leading-relaxed text-center will-change-transform"
          >
            We engineer high-retention short-form video, full-cadence social management, and conversion web platforms built for immediate cultural authority.
          </p>

          {/* Action CTAs Centered Below Subtitle - Animated Step 2 */}
          <div
            ref={ctaContainerRef}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto will-change-transform"
          >
            <Magnetic strength={0.2} className="w-full sm:w-auto">
              <a
                href="#services"
                className="w-full sm:w-auto min-w-[260px] py-4 sm:py-5 px-8 bg-[#FACC15] text-[#0D0D0D] border border-black font-tech text-xs uppercase font-black tracking-widest hover:bg-black hover:text-[#F4F3EF] transition-all flex items-center justify-center gap-4 group shadow-sm active:translate-y-0.5"
              >
                <span>EXPLORE CREATIVE SERVICES</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>

            <Magnetic strength={0.2} className="w-full sm:w-auto">
              <a
                href="#calculator"
                className="w-full sm:w-auto min-w-[260px] py-4 sm:py-5 px-8 bg-white text-[#0D0D0D] border border-black/25 font-tech text-xs uppercase font-bold tracking-widest hover:border-black hover:bg-[#F4F3EF] transition-all flex items-center justify-center gap-4 group"
              >
                <span>CALCULATE ESTIMATE & ROI</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </Magnetic>
          </div>

          {/* Response Note - Animated Step 3 */}
          <div
            ref={noteRef}
            className="mt-4 text-center font-mono text-[11px] text-neutral-500 uppercase tracking-wider will-change-transform"
          >
            Avg. Response Time: Under 2 Hours · Direct Senior Creative Strategy
          </div>

          {/* Core Capabilities Pill Strip - Animated Step 4 */}
          <div
            ref={capabilitiesRef}
            className="mt-10 pt-6 border-t border-black/15 flex flex-wrap items-center justify-center gap-3 font-tech text-xs uppercase tracking-wider text-neutral-600 font-semibold w-full will-change-transform"
          >
            <span className="text-[#0D0D0D] font-bold">CORE CAPABILITIES:</span>
            <span className="px-2.5 py-1 bg-black/5 border border-black/10">4K Short-Form Production</span>
            <span className="px-2.5 py-1 bg-black/5 border border-black/10">Creator Collabs</span>
            <span className="px-2.5 py-1 bg-black/5 border border-black/10">Paid Growth Ads</span>
            <span className="px-2.5 py-1 bg-black/5 border border-black/10">Digital Infrastructure</span>
          </div>
        </div>
      </div>

      {/* 3. Brutalist Performance Matrix Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-black/15 border-b border-black/15 bg-[#EAE8E1]">
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-neutral-600 uppercase tracking-wider font-semibold">
            [01] ATTRIBUTED REACH
          </span>
          <span className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#0D0D0D] tracking-tight mt-2">
            45M+
          </span>
          <span className="font-mono text-[10px] text-neutral-500 uppercase mt-1">Cross-Platform Views</span>
        </div>

        <div className="p-6 md:p-8 flex flex-col justify-between border-t md:border-t-0 border-black/15">
          <span className="font-mono text-[11px] text-neutral-600 uppercase tracking-wider font-semibold">
            [02] HOOK RETENTION
          </span>
          <span className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#047857] tracking-tight mt-2">
            88.4%
          </span>
          <span className="font-mono text-[10px] text-neutral-500 uppercase mt-1">First 3-Sec Benchmark</span>
        </div>

        <div className="p-6 md:p-8 flex flex-col justify-between border-t md:border-t-0 border-black/15">
          <span className="font-mono text-[11px] text-neutral-600 uppercase tracking-wider font-semibold">
            [03] CAMPAIGN ROAS
          </span>
          <span className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#0D0D0D] tracking-tight mt-2">
            5.4X
          </span>
          <span className="font-mono text-[10px] text-neutral-500 uppercase mt-1">Paid Funnel Attributed</span>
        </div>

        <div className="p-6 md:p-8 flex flex-col justify-between border-t md:border-t-0 border-black/15">
          <span className="font-mono text-[11px] text-neutral-600 uppercase tracking-wider font-semibold">
            [04] TURNAROUND VELOCITY
          </span>
          <span className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#0D0D0D] tracking-tight mt-2">
            48H
          </span>
          <span className="font-mono text-[10px] text-neutral-500 uppercase mt-1">Script to First Cut</span>
        </div>
      </div>

      {/* 4. Cinematic Studio Stage Banner with Overlapping Circular Stamp */}
      <div className="relative w-full overflow-hidden border-b border-black/15 bg-black">
        <ParallaxMedia
          src={heroStudioBanner}
          alt="Professional commercial film and creative production studio"
          aspect="aspect-[16/7] min-h-[360px] max-h-[600px]"
          dataCursor="EXPLORE"
        />

        {/* Circular Stamp Overlapping the Media Frame */}
        <div className="absolute top-6 right-6 sm:top-10 sm:right-10 z-20">
          <CircularStamp dark={true} />
        </div>

        {/* Technical Coordinate Overlay Badge */}
        <div className="absolute bottom-6 left-6 z-20 bg-[#0D0D0D]/90 text-[#F4F3EF] px-4 py-2 border border-white/20 font-mono text-[11px] uppercase tracking-wider flex items-center gap-3">
          <span className="w-2 h-2 bg-[#FACC15]" />
          <span>famO1Mediaa · CINEMATIC 4K CAPTURE & HYPER-RETENTION SOCIAL LAB</span>
        </div>
      </div>
    </ArchitecturalSection>
  );
};
