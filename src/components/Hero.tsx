import React from 'react';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
import { MaskedHeading, ParallaxMedia } from './motion/RevealWrappers';
import { CircularStamp } from './motion/CircularStamp';
import { Magnetic } from './motion/MagneticCursor';

interface HeroProps {
  isLoaded?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isLoaded = true }) => {
  return (
    <ArchitecturalSection id="hero">
      {/* 12-Column Split Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-black/15">
        {/* Cols 1–8: Headline and Editorial Eyebrow */}
        <div className="lg:col-span-8 p-6 sm:p-10 md:p-14 lg:border-r border-black/15 flex flex-col justify-between">
          <div>
            <div className="font-tech text-xs uppercase tracking-widest text-neutral-600 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FACC15]" />
              <span className="font-semibold">CREATIVE STRATEGY, PRODUCTION & INFLUENCER PARTNERSHIPS</span>
            </div>

            <MaskedHeading
              as="h1"
              triggerOnLoad={isLoaded}
              stagger={0.09}
              className="font-display font-black text-5xl sm:text-7xl md:text-[6.5rem] lg:text-[7.5rem] leading-[0.88] uppercase tracking-tight text-[#0D0D0D]"
            >
              WHERE BRANDS MEET CREATIVITY.
            </MaskedHeading>
          </div>

          <div className="mt-8 pt-6 border-t border-black/10 font-sans text-xs text-neutral-600 uppercase tracking-wider flex flex-wrap gap-4 font-medium">
            <span>CAPABILITIES: SCRIPTING · PRODUCTION · SOCIAL HANDLING</span>
            <span>·</span>
            <span>MODEL: FULL-SPECTRUM CREATIVE ENGINE</span>
            <span>·</span>
            <span>TIMELINE: RAPID CAMPAIGN ONBOARDING</span>
          </div>
        </div>

        {/* Cols 9–12: Body Copy and Razor-Sharp CTA Stack */}
        <div className="lg:col-span-4 p-6 sm:p-10 md:p-12 flex flex-col justify-between bg-[#EAE8E1]/40 border-t lg:border-t-0 border-black/15">
          <div className="space-y-4">
            <div className="font-tech text-xs uppercase tracking-wider font-bold text-neutral-600">
              Agency Overview
            </div>
            <p className="font-sans text-base sm:text-lg text-neutral-800 leading-relaxed">
              We connect brands, creators, and audiences through strategic campaigns, compelling content, and meaningful collaborations that keep businesses relevant.
            </p>
          </div>

          <div className="pt-8 space-y-3">
            <Magnetic strength={0.2} className="w-full">
              <a
                href="#services"
                className="w-full py-5 px-6 bg-[#FACC15] text-[#0D0D0D] border border-black font-tech text-xs uppercase font-bold tracking-widest hover:bg-black hover:text-[#F4F3EF] transition-colors flex items-center justify-between"
              >
                <span>EXPLORE OUR SERVICES</span>
                <span>&rarr;</span>
              </a>
            </Magnetic>

            <Magnetic strength={0.2} className="w-full">
              <a
                href="#calculator"
                className="w-full py-5 px-6 bg-transparent text-[#0D0D0D] border border-black/25 font-tech text-xs uppercase font-bold tracking-widest hover:bg-[#EAE8E1] transition-colors flex items-center justify-between"
              >
                <span>LET'S WORK TOGETHER</span>
                <span>PARTNER INTAKE</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* 3-Column Editorial Spec Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/15 border-b border-black/15 bg-[#EAE8E1]">
        <div className="p-6 md:p-8 flex items-center justify-between">
          <span className="font-tech text-xs text-neutral-600 uppercase tracking-wider font-semibold">CAMPAIGN REACH</span>
          <span className="font-display font-black text-2xl text-[#0D0D0D]">45M+ ATTRIBUTED</span>
        </div>
        <div className="p-6 md:p-8 flex items-center justify-between">
          <span className="font-tech text-xs text-neutral-600 uppercase tracking-wider font-semibold">SHORT-FORM RETENTION</span>
          <span className="font-display font-black text-2xl text-[#10B981]">84.2% BENCHMARK</span>
        </div>
        <div className="p-6 md:p-8 flex items-center justify-between">
          <span className="font-tech text-xs text-neutral-600 uppercase tracking-wider font-semibold">CONTENT DISPATCH</span>
          <span className="font-display font-black text-2xl text-[#0D0D0D]">48H TURNAROUND</span>
        </div>
      </div>

      {/* Full-Bleed Hero Media with Overlapping Circular Stamp */}
      <div className="relative w-full overflow-hidden border-b border-black/15">
        <ParallaxMedia
          src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1920&q=85"
          alt="Professional commercial film and creative production studio"
          aspect="aspect-[16/8] min-h-[380px] max-h-[640px]"
          dataCursor="EXPLORE"
        />

        {/* Circular Stamp Overlapping the Media Frame */}
        <div className="absolute top-6 right-6 sm:top-10 sm:right-10 z-20">
          <CircularStamp dark={true} />
        </div>

        {/* Technical Coordinate Overlay Badge */}
        <div className="absolute bottom-6 left-6 z-20 bg-[#0D0D0D]/90 text-[#F4F3EF] px-4 py-2 border border-white/20 font-sans text-xs uppercase tracking-wider flex items-center gap-3">
          <span className="w-2 h-2 bg-[#FACC15]" />
          <span><span className="normal-case">FamO1mediaa</span> CREATIVE STUDIO // COMMERCIAL PRODUCTION & CAMPAIGN ENGINE</span>
        </div>
      </div>
    </ArchitecturalSection>
  );
};
