import React, { useEffect, useRef } from 'react';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
import { MaskedHeading } from './motion/RevealWrappers';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ONE JOB: Explain the 3-step studio process (Discover -> Produce -> Distribute & Measure).
 */

interface ProcessStep {
  id: string;
  index: string;
  stageLabel: string;
  title: string;
  description: string;
  checkpoints: string[];
  kpiLabel: string;
  kpiValue: string;
  kpiSub: string;
}

const STEPS: ProcessStep[] = [
  {
    id: 'step-1',
    index: '01',
    stageLabel: 'Stage 01 · Brief to script',
    title: 'Discover & Strategize',
    description:
      'We turn commercial objectives into concrete creative briefs, script arcs, and production timelines. Every concept is engineered around first 3-second hook retention.',
    checkpoints: [
      'Creative direction & narrative arc planning',
      'Platform-native scriptwriting & hook engineering',
      'Production scheduling & talent coordination',
    ],
    kpiLabel: 'Brief to script',
    kpiValue: '72h',
    kpiSub: 'Concept sign-off cycle',
  },
  {
    id: 'step-2',
    index: '02',
    stageLabel: 'Stage 02 · First cut',
    title: 'Produce & Polish',
    description:
      'High-cadence 4K capture, kinetic editing, sound design, and color grading. We shape footage into scroll-stopping stories tailored for high retention.',
    checkpoints: [
      'Multi-angle 4K production with cinema lighting',
      'Paced editing with kinetic typography & sound design',
      'Rapid turnaround master review & color grading',
    ],
    kpiLabel: 'First cut',
    kpiValue: '48h',
    kpiSub: 'From wrap to draft delivery',
  },
  {
    id: 'step-3',
    index: '03',
    stageLabel: 'Stage 03 · Reporting cadence',
    title: 'Distribute & Measure',
    description:
      'Multi-channel deployment, publishing rhythms, creator partnerships, and clear reporting against commercial indicators rather than vanity metrics.',
    checkpoints: [
      'Publishing calendar & community distribution',
      'Creator partnership coordination & rights clearance',
      'Performance reporting & creative iteration',
    ],
    kpiLabel: 'Reporting cadence',
    kpiValue: 'Weekly',
    kpiSub: 'Actionable creative feedback loops',
  },
];

export const CreatorStudioSuite: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const panels = container.querySelectorAll<HTMLElement>('.sticky-panel');

    // Panel stacking and scaling animation
    panels.forEach((panel, i) => {
      if (i < panels.length - 1) {
        gsap.to(panel, {
          scale: 0.98,
          opacity: 0.7,
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

    // Dynamic scroll-driven progress bar filling for each panel's progress bar
    panels.forEach((panel, i) => {
      const progressBar = panel.querySelector<HTMLElement>('.cadence-progress-fill');
      if (!progressBar) return;

      const baseWidth = (i / STEPS.length) * 100;
      const targetWidth = ((i + 1) / STEPS.length) * 100;

      gsap.fromTo(
        progressBar,
        { width: `${baseWidth}%` },
        {
          width: `${targetWidth}%`,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            start: 'top 75%',
            end: 'top 20%',
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <ArchitecturalSection id="process">
      {/* Header */}
      <div className="p-8 sm:p-12 md:p-14 border-b border-black/15 flex flex-col md:flex-row md:items-end justify-between gap-6 bg-[#F4F3EF]">
        <div>
          <span className="font-tech text-xs uppercase tracking-wider text-neutral-600 mb-2 block font-semibold">
            3-Stage Studio Workflow
          </span>
          <MaskedHeading
            as="h2"
            className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-[#0D0D0D]"
          >
            HOW WE WORK
          </MaskedHeading>
        </div>
        <div className="font-tech text-xs text-neutral-600 uppercase tracking-wider font-semibold">
          Brief to Distribution
        </div>
      </div>

      {/* Stacking Step Panels Container */}
      <div ref={containerRef} className="relative w-full">
        {STEPS.map((step, idx) => (
          <div
            key={step.id}
            className="sticky-panel sticky top-16 w-full min-h-[380px] bg-[#F4F3EF] border-b-2 border-[#0D0D0D] shadow-none z-10"
            style={{ zIndex: idx + 1 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-black/15 h-full">
              {/* Left Column (Cols 1–4): Stage Label, Giant Numeral & Animated Process Cadence Progress Bar */}
              <div className="lg:col-span-4 p-8 sm:p-10 flex flex-col justify-between bg-[#EAE8E1]/60">
                <div>
                  {/* Stage Label above number with no border */}
                  <div className="font-tech text-xs text-neutral-600 uppercase tracking-widest font-bold mb-3">
                    {step.stageLabel}
                  </div>
                  {/* Giant Numeral */}
                  <span className="font-display text-7xl md:text-8xl text-[#0D0D0D] leading-none select-none block">
                    {step.index}
                  </span>
                </div>

                {/* Process Cadence Progress Bar moved into Leftmost Card & Scroll Animated */}
                <div className="pt-8">
                  <div className="flex justify-between font-tech text-xs text-neutral-600 mb-1.5 uppercase font-semibold">
                    <span>Process Cadence</span>
                    <span>Stage {idx + 1} of 3</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-300 overflow-hidden">
                    <div
                      className="cadence-progress-fill h-full bg-[#0D0D0D] transition-none"
                      style={{ width: `${((idx + 1) / 3) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column (Cols 5–12): Title & Enlarged Description */}
              <div className="lg:col-span-8 p-8 sm:p-12 md:p-14 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#0D0D0D] mb-6">
                    {step.title}
                  </h3>
                  <p className="font-sans text-lg sm:text-xl md:text-2xl text-neutral-800 leading-relaxed max-w-3xl font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="mt-10 pt-5 border-t border-black/10 font-sans text-xs sm:text-sm text-neutral-600 uppercase tracking-wider font-semibold flex items-center justify-between">
                  <span>Consistent Execution & Clear Communication</span>
                  <span className="font-mono text-xs sm:text-sm text-neutral-800 uppercase tracking-wider font-bold">
                    Target Turnaround: {step.kpiValue}
                  </span>
                </div>
              </div>

              {/* Third Card Commented Out per request */}
              {/*
              <div className="lg:col-span-4 p-8 sm:p-10 bg-[#EAE8E1] flex flex-col justify-between">
                <div>
                  <div className="font-tech text-xs text-neutral-600 uppercase tracking-wider font-semibold mb-1">
                    {step.stageLabel}
                  </div>
                  <div className="font-display font-black text-5xl md:text-6xl text-[#0D0D0D] leading-none mb-2">
                    {step.kpiValue}
                  </div>
                  <div className="font-tech text-xs text-neutral-600 uppercase tracking-wide">
                    {step.kpiSub}
                  </div>
                </div>
                <div className="pt-8">
                  <div className="flex justify-between font-tech text-xs text-neutral-600 mb-1.5 uppercase font-semibold">
                    <span>Process Cadence</span>
                    <span>Stage {idx + 1} of 3</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-300 overflow-hidden">
                    <div className="h-full bg-[#0D0D0D]" style={{ width: `${((idx + 1) / 3) * 100}%` }} />
                  </div>
                </div>
              </div>
              */}
            </div>
          </div>
        ))}
      </div>
    </ArchitecturalSection>
  );
};
