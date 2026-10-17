import React, { useState, useEffect, useRef } from 'react';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
import { Magnetic } from './motion/MagneticCursor';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ComparisonPair {
  id: string;
  leftTitle: string;
  leftDescription: string;
  rightIndex: string;
  rightTitle: string;
  rightDescription: string;
}

const COMPARISON_ROWS: ComparisonPair[] = [
  {
    id: 'row-workflow',
    leftTitle: 'Disconnected Teams',
    leftDescription:
      'Different freelancers and agencies handle scripting, production, editing, and advertising without a shared strategy.',
    rightIndex: '01',
    rightTitle: 'Strategy to Production',
    rightDescription:
      'Scriptwriting, creative direction, video production, editing, and content publishing under one coordinated workflow.',
  },
  {
    id: 'row-creators',
    leftTitle: 'Unclear Deliverables and Usage Rights',
    leftDescription:
      'Poorly defined creator agreements, untracked product gifting, and unclear commercial rights create avoidable risks and expenses.',
    rightIndex: '02',
    rightTitle: 'Brands Meet the Right Creators',
    rightDescription:
      'Relevant creator discovery, influencer partnerships, campaign coordination, clear deliverables, and defined commercial usage rights.',
  },
  {
    id: 'row-conversion',
    leftTitle: 'Attention Without Conversion',
    leftDescription:
      'Views and engagement mean little when content fails to generate qualified leads, sales, or lasting customer relationships.',
    rightIndex: '03',
    rightTitle: 'Campaigns Built to Convert',
    rightDescription:
      'Performance-focused advertising, conversion-oriented websites, landing pages, and digital experiences designed to turn attention into measurable business outcomes.',
  },
];

export const AudienceFork: React.FC = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.comparison-row-anim',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 82%',
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <ArchitecturalSection id="paradigm">
      {/* Section Introduction Header */}
      <div className="p-8 sm:p-12 md:p-16 border-b border-black/15 bg-[#F4F3EF]">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2.5 font-tech text-xs text-neutral-600 uppercase tracking-widest font-semibold mb-4">
            <span className="w-2 h-2 bg-[#FACC15]" />
            <span>PARADIGM SHIFT · UNIFIED ARCHITECTURE</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-[#0D0D0D] leading-[0.92]">
            ONE PARTNER. EVERY PART OF THE GROWTH ENGINE.
          </h2>
          <p className="mt-5 font-sans text-base sm:text-lg text-neutral-700 max-w-2xl leading-relaxed">
            From the first creative idea to the final conversion, we bring brands, creators, content, and digital experiences together.
          </p>
        </div>
      </div>

      {/* Split Editorial Contrast Grid - 1 Col Mobile, 2 Col Desktop */}
      <div
        ref={containerRef}
        className="grid grid-cols-1 lg:grid-cols-2"
      >
        {/* 1. Left Header Cell */}
        <div className="order-1 lg:order-none p-8 sm:p-12 border-b border-black/15 lg:border-r bg-[#F4F3EF] min-h-[140px] lg:min-h-[160px] flex flex-col justify-end">
          <span className="font-tech text-xs text-neutral-500 uppercase tracking-wider block mb-2 font-semibold">
            FRAGMENTED EXECUTION
          </span>
          <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-neutral-500">
            THE TRADITIONAL MODEL
          </h3>
        </div>

        {/* 2. Right Header Cell */}
        <div className="order-6 lg:order-none p-8 sm:p-12 border-b border-white/15 bg-[#0D0D0D] text-[#F4F3EF] min-h-[140px] lg:min-h-[160px] flex flex-col justify-end">
          <div className="flex items-center gap-2 mb-2 font-tech text-xs text-[#FACC15] uppercase tracking-wider font-semibold">
            <span className="w-2 h-2 bg-[#FACC15] inline-block" />
            <span>YOUR UNIFIED GROWTH PARTNER</span>
          </div>
          <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#F4F3EF]">
            THE <span className="normal-case">FamO1mediaa</span> ENGINE
          </h3>
        </div>

        {/* 3-8. Comparison Rows (Direct Grid Row Pairs) */}
        {COMPARISON_ROWS.map((row, idx) => {
          const isHovered = hoveredRow === idx;
          const isLast = idx === COMPARISON_ROWS.length - 1;
          const leftOrderClasses = ['order-2 lg:order-none', 'order-3 lg:order-none', 'order-4 lg:order-none'];
          const rightOrderClasses = ['order-7 lg:order-none', 'order-8 lg:order-none', 'order-9 lg:order-none'];

          return (
            <React.Fragment key={row.id}>
              {/* Left Cell: Problem */}
              <div
                onMouseEnter={() => setHoveredRow(idx)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`comparison-row-anim ${leftOrderClasses[idx]} relative p-8 sm:p-10 lg:border-r border-black/15 ${
                  isLast ? 'border-b border-black/15' : 'border-b border-dashed border-black/15'
                } bg-[#F4F3EF] flex items-start gap-5 cursor-default overflow-hidden`}
              >
                {/* Subtle red tint overlay over solid paper base */}
                <div
                  className={`absolute inset-0 bg-red-500/[0.05] pointer-events-none transition-opacity duration-200 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden="true"
                />

                {/* Subtle Red ✕ Badge - disconnected/isolated */}
                <div
                  className={`relative z-10 w-9 h-9 rounded-none border font-bold flex items-center justify-center shrink-0 mt-0.5 text-sm transition-all duration-200 ${
                    isHovered
                      ? 'bg-red-500/15 border-red-500/40 text-red-600 shadow-[0_0_12px_rgba(239,68,68,0.2)] scale-105'
                      : 'bg-red-500/10 border-red-500/30 text-red-600'
                  }`}
                >
                  ✕
                </div>
                <div className="relative z-10 max-w-[58ch]">
                  <h4 className="font-tech text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
                    {row.leftTitle}
                  </h4>
                  <p className="font-sans text-sm sm:text-[15px] text-neutral-700 mt-1.5 leading-relaxed">
                    {row.leftDescription}
                  </p>
                </div>
              </div>

              {/* Right Cell: FamO1mediaa Solution */}
              <div
                onMouseEnter={() => setHoveredRow(idx)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`comparison-row-anim ${rightOrderClasses[idx]} relative p-8 sm:p-10 border-b border-white/15 bg-[#0D0D0D] text-[#F4F3EF] flex items-start gap-5 cursor-default overflow-hidden`}
              >
                {/* Subtle dark emerald sheen overlay over solid obsidian base */}
                <div
                  className={`absolute inset-0 bg-emerald-500/[0.08] pointer-events-none transition-opacity duration-200 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden="true"
                />

                {/* Continuous vertical timeline connector column */}
                <div className="relative z-10 flex flex-col items-center shrink-0 self-stretch -my-8 sm:-my-10 pt-8 sm:pt-10 pb-8 sm:pb-10">
                  {/* Top line segment */}
                  <span
                    className={`w-[1.5px] flex-1 transition-colors duration-200 ${
                      idx === 0
                        ? 'bg-transparent'
                        : isHovered
                        ? 'bg-[#10B981]/70'
                        : 'bg-[#FACC15]/30'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Indicator Badge: Brand Yellow default -> Emerald Green on hover with sharp high-contrast font */}
                  <div
                    className={`relative z-10 w-9 h-9 flex items-center justify-center font-tech text-xs font-black shrink-0 border transition-all duration-200 mt-0.5 ${
                      isHovered
                        ? 'bg-[#10B981] text-[#050505] border-emerald-400/40 shadow-[0_0_16px_rgba(16,185,129,0.5)] scale-105'
                        : 'bg-[#FACC15] text-[#0A0A0A] border-black/30'
                    }`}
                  >
                    {row.rightIndex}
                  </div>

                  {/* Bottom line segment */}
                  <span
                    className={`w-[1.5px] flex-1 transition-colors duration-200 ${
                      isLast
                        ? 'bg-transparent'
                        : isHovered
                        ? 'bg-[#10B981]/70'
                        : 'bg-[#FACC15]/30'
                    }`}
                    aria-hidden="true"
                  />
                </div>

                <div className="relative z-10 max-w-[58ch]">
                  <h4 className="font-tech text-base sm:text-lg font-bold text-white tracking-tight">
                    {row.rightTitle}
                  </h4>
                  <p className="font-sans text-sm sm:text-[15px] text-neutral-300 mt-1.5 leading-relaxed">
                    {row.rightDescription}
                  </p>
                </div>
              </div>
            </React.Fragment>
          );
        })}

        {/* 9. Left Bottom Outcome Statement */}
        <div className="order-5 lg:order-none p-8 sm:p-10 border-b border-black/15 lg:border-b-0 lg:border-r bg-[#F4F3EF] flex items-center">
          <div className="font-sans text-xs sm:text-sm uppercase tracking-wider font-semibold">
            <span className="text-red-600 font-bold mr-2">THE RESULT:</span>
            <span className="text-neutral-700">
              Fragmented execution. Wasted resources. Slower growth.
            </span>
          </div>
        </div>

        {/* 10. Right Bottom CTA Area */}
        <div className="order-10 lg:order-none p-8 sm:p-10 bg-[#0D0D0D] text-[#F4F3EF] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h4 className="font-tech text-base sm:text-lg font-bold text-white tracking-wide uppercase">
              LET'S BUILD YOUR GROWTH STRATEGY
            </h4>
            <p className="font-sans text-xs sm:text-sm text-neutral-400 mt-0.5">
              Tell us about your brand, audience, and goals.
            </p>
          </div>
          <Magnetic strength={0.15} className="shrink-0">
            <a
              href="#calculator"
              className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#FACC15] text-[#0D0D0D] font-tech text-xs uppercase font-bold tracking-wider hover:bg-white transition-all duration-200 min-h-[48px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FACC15] focus-visible:outline-offset-2 group shadow-md"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Magnetic>
        </div>
      </div>
    </ArchitecturalSection>
  );
};

