import React, { useState, useEffect, useRef } from 'react';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
import { MaskedHeading } from './motion/RevealWrappers';
import { ArrowUpRight, CheckCircle2, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ServicePillar {
  id: string;
  number: string;
  title: string;
  shortHook: string;
  deliverables: string[];
  caseStudy: {
    clientType: string;
    action: string;
    result: string;
  };
  metricsHighlight: string;
}

export const SERVICES_DATA: ServicePillar[] = [
  {
    id: 'influencer-marketing',
    number: '01',
    title: 'Influencer Marketing Campaigns',
    shortHook: 'We match your brand with vetted creators who actually convert attention into paying customers.',
    deliverables: [
      'Niche, demographic & authentic engagement vetting',
      'Contract pricing negotiation & timeline coordination',
      'End-to-end execution across Reels, Stories & YouTube',
      'Audited tracking of impressions, CTR, and reach',
    ],
    caseStudy: {
      clientType: 'Direct-to-Consumer Apparel Brand',
      action: 'Curated 10 high-engagement fashion creators for seasonal launch',
      result: '1.4M views in 72 hours · 3.8x campaign ROAS',
    },
    metricsHighlight: '850+ Vetted Creators',
  },
  {
    id: 'social-media-management',
    number: '02',
    title: 'Social Media Management',
    shortHook: 'Complete organic domination so you can focus 100% on building your business.',
    deliverables: [
      'High-velocity monthly content calendar planning',
      'Viral-engineered Reels, carousel design & punchy copy',
      'Automated scheduling & prime-time publishing',
      'Active community engagement & inbound message triage',
    ],
    caseStudy: {
      clientType: 'Premium Dining & Culinary Chain',
      action: 'Revamped Instagram presence with daily short-form food reels',
      result: '+340% organic follower surge · 12k monthly profile visits',
    },
    metricsHighlight: 'Daily Organic Cadence',
  },
  {
    id: 'ugc-production',
    number: '03',
    title: 'UGC & Content Production',
    shortHook: 'Raw, native, scroll-stopping videos crafted specifically for paid ads and organic feeds.',
    deliverables: [
      'Authentic unboxing, reaction & problem-solution scripts',
      'Full post-production: motion cuts, subtitles & color grade',
      'Creator talent sourcing & physical sample dispatch',
      'Unrestricted perpetual ad-usage licensing agreements',
    ],
    caseStudy: {
      clientType: 'Flagship Smartphone & Tech Accessory',
      action: 'Produced 5 high-converting unboxing & feature test reels',
      result: '42% lower Cost-Per-Acquisition on Meta ad runs',
    },
    metricsHighlight: 'Hook-First Creative',
  },
  {
    id: 'paid-performance',
    number: '04',
    title: 'Paid Advertising & Performance Marketing',
    shortHook: 'Data-driven ad engines across Meta & Google that turn creator content into predictable pipeline.',
    deliverables: [
      'Full Meta & Google Ads account architecture',
      'Micro-segmented audience & geo-targeted funnels',
      'Aggressive A/B hook, creative & thumbnail testing',
      'Conversion API tracking for leads, purchases & pipeline',
    ],
    caseStudy: {
      clientType: 'National Executive Coaching Academy',
      action: 'Deployed creator testimonial ads to generate student leads',
      result: '680+ verified student inquiries · $18 avg cost-per-lead',
    },
    metricsHighlight: 'Measurable ROI Only',
  },
  {
    id: 'brand-ambassador',
    number: '05',
    title: 'Brand Ambassador & Long-Term Partnerships',
    shortHook: 'Build lasting authority through recurring creator partnerships instead of one-off post flukes.',
    deliverables: [
      'Identity alignment with authentic category leaders',
      'Multi-month retainer & exclusivity negotiation',
      'Scheduled recurring reels, stories & event appearances',
      'Affiliate link & custom discount code attribution',
    ],
    caseStudy: {
      clientType: 'Performance Sportswear & Activewear',
      action: 'Contracted 3 fitness athletes on 6-month recurring brand deals',
      result: 'Consistent 5.1x monthly affiliate revenue return',
    },
    metricsHighlight: 'Compounding Loyalty',
  },
  {
    id: 'event-activations',
    number: '06',
    title: 'Event Marketing, PR & Brand Activations',
    shortHook: 'Electrifying in-person experiences surrounded by synchronized influencer media blitzes.',
    deliverables: [
      'VIP creator guest lists & curated brand launch invites',
      'Hands-on product sampling & live experiential stunts',
      'Synchronized real-time Instagram & TikTok coverage',
      'Local press outreach & post-event PR amplification',
    ],
    caseStudy: {
      clientType: 'Artisanal Cafe & Bakery Grand Opening',
      action: 'Organized launch party with 18 prominent food vloggers',
      result: 'Queue wrapped around the block · 650k local impressions',
    },
    metricsHighlight: 'Real-World Media Buzz',
  },
];

interface ServiceAccordionProps {
  onSelectService?: (serviceTitle: string) => void;
}

export const ServiceAccordion: React.FC<ServiceAccordionProps> = ({ onSelectService }) => {
  // Set to SERVICES_DATA[0].id to have the first item open by default, or '' for all closed
  const [activeId, setActiveId] = useState<string>(SERVICES_DATA[0].id);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const elements = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (elements.length === 0) return;

    const ctx = gsap.context(() => {
      // Smooth individual row reveal as each card enters the viewport
      elements.forEach((row, index) => {
        gsap.fromTo(
          row,
          {
            opacity: 0,
            y: 36,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            delay: index * 0.04, // subtle cascade if multiple are in view
            ease: 'power3.out',
             overwrite: 'auto',
            scrollTrigger: {
              trigger: row,
              start: 'top 88%', // Triggers smoothly right as the card enters the lower viewport
              toggleActions: 'play none none reset',
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  // Refresh ScrollTrigger positions after accordion expands/collapses
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 520); // matches the 500ms CSS grid transition
    return () => clearTimeout(timer);
  }, [activeId]);

  const handleSelect = (title: string) => {
    if (onSelectService) {
      onSelectService(title);
    } else {
      const el = document.getElementById('calculator') || document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            <div className="flex items-center gap-3 mt-10 font-tech text-xs uppercase tracking-wider text-white/60 mb-3 font-semibold">
              <span className="w-2 h-2 bg-[#FACC15]" />
              <span className="text-[#FACC15]">FULL-STACK CAPABILITIES</span>
            </div>
            <MaskedHeading
              as="h2"
              className="font-display font-black uppercase text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.9] text-[#F4F3EF]"
            >
              WHAT WE DO. NO FLUFF.
            </MaskedHeading>
            <p className="font-sans text-sm sm:text-base text-white/60 max-w-2xl mt-4 leading-relaxed">
              Six disciplined operational engines tailored for brands ready to scale market share through creator attention and paid distribution.
            </p>
          </div>
        </div>

        {/* 6 Capabilities Accordion Stack */}
        <div ref={containerRef} className="space-y-4 pt-12">
          {SERVICES_DATA.map((service, idx) => {
            const isOpen = activeId === service.id;

            return (
              <div
                key={service.id}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                /* IMPORTANT: Use transition-colors instead of transition-all so CSS doesn't fight GSAP's opacity/transform! */
                className={`border transition-colors duration-300 will-change-[transform,opacity] ${
                  isOpen
                    ? 'border-[#FACC15] bg-[#121212]'
                    : 'border-white/10 bg-[#0E0E0E] hover:border-white/20'
                }`}
              >
                {/* Header row (Clickable) */}
                <button
                  type="button"
                  id={`accordion-btn-${service.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-panel-${service.id}`}
                  onClick={() => setActiveId(isOpen ? '' : service.id)}
                  className="w-full p-6 sm:p-8 flex items-center justify-between gap-4 text-left cursor-pointer group select-none"
                >
                  <div className="flex items-center gap-6 sm:gap-10">
                    <span className="text-sm sm:text-base font-mono font-bold text-[#FACC15]">
                      {service.number}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-[#F4F3EF] group-hover:text-[#FACC15] transition-colors duration-300 font-tech">
                      {service.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="hidden sm:inline-block text-xs uppercase font-mono text-neutral-400">
                      {service.metricsHighlight}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-none border border-white/20 flex items-center justify-center transition-[transform,background-color,border-color,color] duration-300 ${
                        isOpen
                          ? 'rotate-180 bg-[#FACC15] text-[#0D0D0D] border-[#FACC15]'
                          : 'text-[#F4F3EF] group-hover:border-[#FACC15]/50'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Expanded Content Drawer via Smooth CSS Grid Transition */}
                <div
                  id={`accordion-panel-${service.id}`}
                  role="region"
                  aria-labelledby={`accordion-btn-${service.id}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-8 sm:px-8 sm:pb-8 pt-4 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Left: Punchy Hook + Core Deliverables */}
                      <div className="lg:col-span-7 space-y-6">
                        <p className="font-sans text-base sm:text-lg text-neutral-200 font-medium leading-relaxed">
                          {service.shortHook}
                        </p>

                        <div className="space-y-3">
                          <div className="font-tech text-xs uppercase tracking-wider text-neutral-400 font-bold">
                            Execution Scope:
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {service.deliverables.map((item, dIdx) => (
                              <div
                                key={dIdx}
                                className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 font-sans"
                              >
                                <CheckCircle2 className="w-4 h-4 text-[#FACC15] shrink-0 mt-0.5" />
                                <span className="leading-snug">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Real-World Case Study Snapshot + Action */}
                      <div className="lg:col-span-5 bg-[#171717] border border-white/10 p-6 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-mono uppercase text-[#FACC15] tracking-wider mb-2 font-semibold">
                            REAL-WORLD DEPLOYMENT CASE
                          </div>
                          <div className="font-tech text-sm font-bold text-[#F4F3EF] uppercase tracking-tight">
                            {service.caseStudy.clientType}
                          </div>
                          <p className="font-sans text-xs text-neutral-300 mt-2 leading-relaxed">
                            {service.caseStudy.action}
                          </p>
                          <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-[#F4F3EF] font-semibold">
                            Outcome:{' '}
                            <span className="text-[#FACC15]">
                              {service.caseStudy.result}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleSelect(service.title)}
                          className="mt-6 w-full py-3 px-4 bg-[#F4F3EF] hover:bg-[#FACC15] text-[#0D0D0D] font-tech text-xs font-black uppercase tracking-wider transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Select For Campaign Scope</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
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

export default ServiceAccordion;