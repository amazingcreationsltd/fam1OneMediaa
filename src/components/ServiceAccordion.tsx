import React, { useState, useEffect, useRef } from 'react';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
import { MaskedHeading } from './motion/RevealWrappers';
import { CANONICAL_SERVICES } from '../content/services';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ServiceAccordion: React.FC = () => {
  // Exactly one item can be open, or none
  const [openId, setOpenId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const elements = itemRefs.current.filter(Boolean);
    if (elements.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12, // Sequential reveal one by one
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            toggleActions: 'play none none reset',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <ArchitecturalSection
      dark
      index="06"
      label="SERVICES"
      id="services"
      className="py-24"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-white/15">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-tech text-xs uppercase tracking-wider text-white/60 mb-3 font-semibold">
              <span className="w-2 h-2 bg-[#FACC15]" />
              <span>Full-Spectrum Creative & Marketing Capabilities</span>
            </div>
            <MaskedHeading
              as="h2"
              className="font-display font-black uppercase text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.9] text-[#F4F3EF]"
            >
              Services
            </MaskedHeading>
          </div>
          <div className="flex items-center gap-3 py-2 px-4 border border-white/15 bg-white/[0.03] font-sans text-xs uppercase tracking-wider text-[#F4F3EF] shrink-0 self-start lg:self-auto font-semibold">
            <span className="w-2 h-2 bg-[#10B981]" />
            <span>Currently Accepting New Projects</span>
          </div>
        </div>

        {/* Full-Width Edge-To-Edge Architectural Rows */}
        <div ref={containerRef} className="divide-y divide-white/15">
          {CANONICAL_SERVICES.map((item, idx) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                className={`transition-colors duration-300 group will-change-transform ${
                  isOpen ? 'bg-white/[0.03]' : 'hover:bg-white/[0.02]'
                }`}
              >
                <button
                  type="button"
                  id={`accordion-btn-${item.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-panel-${item.id}`}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full text-left py-8 sm:py-10 flex items-start sm:items-center justify-between gap-6 cursor-pointer select-none"
                >
                  <div className="flex items-start sm:items-center gap-6 sm:gap-10 flex-1">
                    <span className="font-mono text-sm sm:text-base font-medium text-white/40 group-hover:text-[#FACC15] transition-colors shrink-0 pt-1 sm:pt-0">
                      [{item.index}]
                    </span>
                    <div className="space-y-1.5 flex-1">
                      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-400 font-semibold">
                        {item.tagline}
                      </div>
                      <h3
                        className="font-tech text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-[#F4F3EF] group-hover:text-white transition-all duration-300 group-hover:translate-x-3"
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Clean Stationary Square Box with Rotating Plus/Cross Icon */}
                  <div className="shrink-0 pt-1 sm:pt-0">
                    <div className="w-9 h-9 border border-white/20 flex items-center justify-center bg-transparent group-hover:border-[#FACC15] group-hover:bg-[#FACC15]/10 transition-colors">
                      <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                        {/* Horizontal Line */}
                        <span
                          className={`absolute h-[2px] w-3.5 bg-[#F4F3EF] group-hover:bg-[#FACC15] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isOpen ? 'rotate-45' : 'rotate-0'
                          }`}
                        />
                        {/* Vertical Line */}
                        <span
                          className={`absolute w-[2px] h-3.5 bg-[#F4F3EF] group-hover:bg-[#FACC15] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isOpen ? 'rotate-45' : 'rotate-0'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </button>

                {/* Smooth Expand/Collapse Details via CSS Grid Transition */}
                <div
                  id={`accordion-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-btn-${item.id}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-10 pt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-white/10">
                      <div className="lg:col-span-7 lg:pl-16 space-y-4">
                        <p className="font-sans text-base sm:text-lg text-white/80 leading-relaxed">
                          {item.description}
                        </p>
                        <a
                          href="#calculator"
                          className="inline-flex items-center gap-2 font-tech text-xs uppercase font-bold tracking-wider text-[#FACC15] hover:text-white transition-colors pt-2"
                        >
                          <span>Start a project with this service</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Deliverables Column */}
                      <div className="lg:col-span-5 bg-[#141414] p-6 border border-white/10 space-y-3">
                        <div className="font-tech text-xs uppercase tracking-wider font-bold text-neutral-400">
                          Included Deliverables
                        </div>
                        <ul className="space-y-2.5 font-sans text-sm text-neutral-200">
                          {item.deliverables.map((deliv, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 bg-[#FACC15] shrink-0 mt-2" />
                              <span className="leading-snug">{deliv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ArchitecturalSection>
  );
};
