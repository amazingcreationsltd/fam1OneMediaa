import React, { useEffect, useRef } from 'react';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
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
    timeline: 'WEEK 01–02',
    title: 'DISTRICT AUDIT & TALENT CURATION',
    description:
      'We map competitor density, demographic overlap, and footfall heatmaps within your 3-mile dining district, matching your cuisine with vetted foodie creators.',
    checkpoints: [
      'Hyper-local demographic and diner radius audit',
      'Creator contract indemnity and 100% usage rights lock',
      'Table reservation tracking integration and lander setup',
    ],
    kpiLabel: 'AUDIT SPEED',
    kpiValue: '7 DAYS',
    kpiSub: 'Pre-flight deliverable signoff',
  },
  {
    id: 'panel-2',
    index: '02',
    timeline: 'WEEK 02–03',
    title: 'CREATOR TRIO STUDIO PRODUCTION',
    description:
      'Scriptwriting, 4K multicam capturing, and high-retention post-production. We shoot the signature dishes, dining room energy, and chef stories in cinematic detail.',
    checkpoints: [
      '3-second visual hook formulas tailored for vertical algorithms',
      '4K 60FPS camera packages with specialized food lighting',
      'Dynamic sound design, pacing cuts, and kinetic typography',
    ],
    kpiLabel: 'HOOK RETENTION',
    kpiValue: '84.2%',
    kpiSub: 'First 3-second completion benchmark',
  },
  {
    id: 'panel-3',
    index: '03',
    timeline: 'WEEK 03–05',
    title: 'DISTRICT OUTDOOR BLITZ & CREATOR PUSH',
    description:
      'Coordinated physical invitations and localized creator takeovers designed to flood local feeds and generate measurable physical queues outside your dining room.',
    checkpoints: [
      'Synchronized multi-creator launch across TikTok & Instagram',
      'Geofenced paid amplification targeting affluent local foodies',
      'Daily hands-on comment conversion and table booking prompts',
    ],
    kpiLabel: 'FOOTFALL LIFT',
    kpiValue: '+340%',
    kpiSub: 'Average 14-day dining cover surge',
  },
  {
    id: 'panel-4',
    index: '04',
    timeline: 'WEEK 06 ONWARD',
    title: 'REVENUE COMPOUNDING & CARE SLA',
    description:
      'Continuous conversion optimization, ongoing influencer gifting rotations, menu drop campaigns, and monthly web architecture maintenance.',
    checkpoints: [
      'Sub-400ms booking page speed guaranteed under SLA',
      'Monthly creator roster rotations for seasonal promotions',
      'Weekly revenue attribution reporting directly to management',
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
          <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-[#0D0D0D]">
            THE GROWTH PROTOCOL
          </h2>
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
