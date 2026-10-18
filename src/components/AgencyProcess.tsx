import React, { useRef, useEffect } from 'react';
import { Target, Film, Rocket, BarChart3 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
import { MaskedHeading } from './motion/RevealWrappers';

gsap.registerPlugin(ScrollTrigger);

interface SprintStep {
  number: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  description: string;
}

export const AgencyProcess: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerTextRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const steps: SprintStep[] = [
    {
      number: '01',
      title: 'Algorithmic Creator Matching',
      icon: Target,
      tag: 'DAY 1–2',
      description:
        'We filter our 850+ creator roster by audience age, geographic density, and verified engagement rates to ensure zero wasted reach.',
    },
    {
      number: '02',
      title: 'Hook-Engineered Scripting',
      icon: Film,
      tag: 'DAY 3–5',
      description:
        'We craft unboxing and problem-solution scripts structured around 3-second visual hooks that stop doom-scrolling dead in its tracks.',
    },
    {
      number: '03',
      title: 'Synchronized Media Blitz',
      icon: Rocket,
      tag: 'DAY 6–7',
      description:
        'Creators post simultaneously across Instagram Reels, TikTok, and YouTube Shorts to create an undeniable wave of viral category momentum.',
    },
    {
      number: '04',
      title: 'Paid Amplification & Scaling',
      icon: BarChart3,
      tag: 'CONTINUOUS',
      description:
        'We turn the top 10% highest-converting organic reels into whitelisted Meta & Google ads, scaling customer acquisition at minimal CAC.',
    },
  ];

  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const grid = gridRef.current;
    const headerText = headerTextRef.current;
    if (!section || !grid) return;

    const cards = grid.querySelectorAll<HTMLElement>('.process-card');

    const ctx = gsap.context(() => {
      // 1. Header paragraph smooth reveal
      if (headerText) {
        gsap.fromTo(
          headerText,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerText,
              start: 'top 90%',
              toggleActions: 'play none none reset',
            },
          }
        );
      }

      // 2. Signature Card Reveal Animation (Scale pop with back.out, matching CreatorStudioSuite)
      const mm = gsap.matchMedia();

      // Mobile (< 768px): Card-by-card pop in
      mm.add('(max-width: 767px)', () => {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { scale: 0.88, opacity: 0, y: 15 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reset',
              },
            }
          );
        });
      });

      // Desktop & Tablet (>= 768px): Staggered pop-in sequence
      mm.add('(min-width: 768px)', () => {
        gsap.fromTo(
          cards,
          { scale: 0.88, opacity: 0, y: 15 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reset',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <ArchitecturalSection
      dark
      id="process"
      className="py-20 sm:py-28 bg-[#0A0A0A] text-[#F4F3EF] border-t border-b border-white/15"
    >
      <div ref={sectionRef} className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/15">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-tech text-xs uppercase tracking-widest text-[#FACC15] mb-3 font-semibold">
              <span className="w-2 h-2 bg-[#FACC15]" />
              <span>THE VELOCITY SPRINT</span>
            </div>
            <MaskedHeading
              as="h2"
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#F4F3EF] leading-[0.95]"
            >
              HOW WE SCALE ATTENTION.
            </MaskedHeading>
          </div>
          <p
            ref={headerTextRef}
            className="font-sans text-sm text-white/60 max-w-md leading-relaxed"
          >
            From initial brief to viral reach in 7 days. A repeatable, battle-tested operational pipeline built for speed and ROI.
          </p>
        </div>

        {/* 4-Step Kinetic Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/15 border border-white/15"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;

            return (
              <div
                key={idx}
                className="process-card bg-[#0D0D0D] p-8 hover:bg-[#151515] transition-all duration-200 group flex flex-col justify-between will-change-transform"
              >
                <div>
                  {/* Top Step Index & Timing Badge */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-3xl font-black text-white/30 group-hover:text-[#FACC15] font-mono transition-colors">
                      {step.number}
                    </span>
                    <span className="text-[11px] font-mono uppercase text-white/70 bg-white/5 border border-white/10 px-2.5 py-1 tracking-wider">
                      {step.tag}
                    </span>
                  </div>

                  {/* Icon Box */}
                  <div className="w-10 h-10 rounded-none bg-white/5 border border-white/15 flex items-center justify-center text-white mb-6 group-hover:border-[#FACC15] group-hover:text-[#FACC15] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Step Title */}
                  <h3 className="font-tech text-xl font-black uppercase text-[#F4F3EF] mb-3 tracking-tight">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="font-sans text-xs text-white/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Verification Footer */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
                  <span>STAGE VERIFIED</span>
                  <span className="text-[#FACC15] font-bold">✓</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ArchitecturalSection>
  );
};

export default AgencyProcess;
