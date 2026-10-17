import React, { useEffect, useRef } from 'react';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
import { MaskedHeading } from './motion/RevealWrappers';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StackingPanel {
  id: string;
  index: string;
  timeline: string;
  title: string;
  description: string;
  checkpoints: string[];
  kpiLabel: string;
  kpiValue: string;
  kpiSub: string;
}

const PANELS: StackingPanel[] = [
  {
    id: 'panel-1',
    index: '01',
    timeline: 'PHASE 01',
    title: 'SCRIPTING & CREATIVE STRATEGY',
    description:
      'We turn ideas into concepts, stories, and campaign-ready scripts. From commercial video concepts to social content arcs, every script is engineered around brand objectives and platform algorithms.',
    checkpoints: [
      'Advertisement scripts & promotional video concepts',
      'Campaign ideation, storytelling & creative direction',
      '3-second visual hook formulas tailored for vertical algorithms',
    ],
    kpiLabel: 'SCRIPT VELOCITY',
    kpiValue: '72 HOURS',
    kpiSub: 'Ideation to locked concept signoff',
  },
  {
    id: 'panel-2',
    index: '02',
    timeline: 'PHASE 02',
    title: 'CAPTURING & CINEMATIC PRODUCTION',
    description:
      'Video production and promotional shoots directed with precision. We capture brand advertisements, product videos, creator-led shoots, and short-form footage for Instagram Reels and YouTube Shorts.',
    checkpoints: [
      '4K 60FPS cinema camera packages with professional studio lighting',
      'On-location commercial shoots & creator-led product sessions',
      'Multi-angle setups optimized for high retention and visual impact',
    ],
    kpiLabel: 'HOOK RETENTION',
    kpiValue: '84.2%',
    kpiSub: 'First 3-second completion benchmark',
  },
  {
    id: 'panel-3',
    index: '03',
    timeline: 'PHASE 03',
    title: 'HIGH-RETENTION EDITING & MOTION GRAPHICS',
    description:
      'Kinetic video editing, custom motion graphics, sound design, and color grading. We shape raw captures into scroll-stopping visual stories that connect with modern digital audiences.',
    checkpoints: [
      'Fast-paced short-form video editing with kinetic typography',
      'Custom motion graphics, audio mastering & brand transitions',
      'Rigorous 48-hour edit turnaround guaranteed under SLA',
    ],
    kpiLabel: 'EDIT TURNAROUND',
    kpiValue: '48 HOURS',
    kpiSub: 'Raw footage to master export',
  },
  {
    id: 'panel-4',
    index: '04',
    timeline: 'PHASE 04',
    title: 'SOCIAL HANDLING & CREATOR COLLABORATIONS',
    description:
      'Complete social media management, content publishing, community engagement, and vetted influencer matchmaking that scales reach and keeps brands relevant every day.',
    checkpoints: [
      'Social account management, editorial calendars & active engagement',
      'Vetted creator & influencer matchmaking with 100% usage rights',
      'Integrated marketing campaigns, outdoor ads & conversion web design',
    ],
    kpiLabel: 'LIFETIME ROAS',
    kpiValue: '4.8X',
    kpiSub: 'Average return on campaign spend',
  },
];

export const CreatorStudioSuite: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const panels = container.querySelectorAll('.sticky-panel');

    // Scale underlying panels as user scrolls
    panels.forEach((panel, i) => {
      if (i < panels.length - 1) {
        gsap.to(panel, {
          scale: 0.97,
          opacity: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: panels[i + 1],
            start: 'top 80px',
            end: 'top 64px',
            scrub: true,
          },
        });
      }
    });
  }, []);

  return (
    <ArchitecturalSection id="system">
      {/* Header */}
      <div className="p-8 sm:p-12 md:p-14 border-b border-black/15 flex flex-col md:flex-row md:items-end justify-between gap-6 bg-[#F4F3EF]">
        <div>
          <span className="font-tech text-xs uppercase tracking-wider text-neutral-600 mb-2 block font-semibold">
            4-Stage Execution Blueprint
          </span>
          <MaskedHeading
            as="h2"
            className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-[#0D0D0D]"
          >
            THE GROWTH PROTOCOL
          </MaskedHeading>
        </div>
        <div className="font-tech text-xs text-neutral-600 uppercase tracking-wider font-semibold">
          Execution Phase Sequence
        </div>
      </div>

      {/* Sticky Stacking Panels Container */}
      <div ref={containerRef} className="relative w-full">
        {PANELS.map((panel, idx) => (
          <div
            key={panel.id}
            className="sticky-panel sticky top-16 w-full min-h-[440px] bg-[#F4F3EF] border-b-2 border-[#0D0D0D] shadow-none z-10"
            style={{ zIndex: idx + 1 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-black/15 h-full">
              {/* Cols 1–3: Giant Index & Timeline */}
              <div className="lg:col-span-3 p-8 sm:p-10 flex flex-col justify-between bg-[#EAE8E1]/60">
                <span className="font-display text-8xl md:text-9xl text-[#0D0D0D] leading-none select-none">
                  {panel.index}
                </span>
                <div className="mt-8 pt-4 border-t border-black/15 font-mono text-xs text-neutral-600 uppercase tracking-widest">
                  PHASE TIMELINE: <span className="text-[#0D0D0D] font-bold">{panel.timeline}</span>
                </div>
              </div>

              {/* Cols 4–8: Title, Description, Checkpoints */}
              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-[#0D0D0D] mb-4">
                    {panel.title}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-neutral-700 leading-relaxed mb-6">
                    {panel.description}
                  </p>

                  <div className="space-y-3 font-mono text-xs text-neutral-800">
                    {panel.checkpoints.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 bg-[#FACC15] shrink-0 mt-1.5 border border-black/30" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-black/10 font-sans text-xs text-neutral-500 uppercase tracking-wider font-semibold">
                  Deliverable Guarantee: 100% SLA Compliance
                </div>
              </div>

              {/* Cols 9–12: Unboxed Live Metric Visualization */}
              <div className="lg:col-span-4 p-8 sm:p-10 bg-[#EAE8E1] flex flex-col justify-between">
                <div>
                  <div className="font-tech text-xs text-neutral-600 uppercase tracking-wider font-semibold mb-1">
                    Phase 0{idx + 1} · {panel.kpiLabel}
                  </div>
                  <div className="font-display font-black text-6xl md:text-7xl text-[#0D0D0D] leading-none mb-2">
                    {panel.kpiValue}
                  </div>
                  <div className="font-tech text-xs text-neutral-600 uppercase tracking-wide">
                    {panel.kpiSub}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="pt-8">
                  <div className="flex justify-between font-tech text-xs text-neutral-600 mb-1.5 uppercase font-semibold">
                    <span>Execution Cadence</span>
                    <span>Quarter Tracked</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-300 overflow-hidden">
                    <div className="h-full bg-[#0D0D0D]" style={{ width: `${(idx + 1) * 25}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ArchitecturalSection>
  );
};
