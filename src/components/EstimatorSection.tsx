import React, { useId, useRef, useEffect } from 'react';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
import { MaskedHeading } from './motion/RevealWrappers';
import { useAudience } from '../context/AudienceContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EstimatorSectionProps {
  budget: number;
  setBudget: (b: number) => void;
  industry: string;
  setIndustry: (i: string) => void;
  followers: number;
  setFollowers: (f: number) => void;
  niche: string;
  setNiche: (n: string) => void;
  growthDisplay: string;
  reachLow: number;
  reachHigh: number;
  creatorRange: string;
  rateLow: number;
  rateHigh: number;
  dealsLow: number;
  dealsHigh: number;
}

export const EstimatorSection: React.FC<EstimatorSectionProps> = ({
  budget,
  setBudget,
  industry,
  setIndustry,
  followers,
  setFollowers,
  niche,
  setNiche,
  growthDisplay,
  reachLow,
  reachHigh,
  creatorRange,
  rateLow,
  rateHigh,
  dealsLow,
  dealsHigh,
}) => {
  const { audience, setAudience } = useAudience();
  const budgetInputId = useId();
  const followerInputId = useId();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            toggleActions: 'play none none reset',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <ArchitecturalSection
      dark
      id="calculator"
      className="py-20 sm:py-28 bg-[#0A0A0A] text-[#F4F3EF] border-t border-white/15"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-white/15">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-tech text-xs uppercase tracking-wider text-white/50 mb-3 font-semibold">
              <span className="w-2 h-2 bg-[#FACC15]" />
              <span>Mathematical Impact Modeling</span>
            </div>
            <MaskedHeading
              as="h2"
              className="font-display font-black uppercase text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.9] text-[#F4F3EF]"
            >
              Campaign Estimator
            </MaskedHeading>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center border border-white/20 bg-black/40 p-1 self-start lg:self-auto font-tech text-xs uppercase tracking-wider font-semibold">
            <button
              type="button"
              onClick={() => setAudience('brand')}
              className={`px-6 py-3 transition-colors ${
                audience === 'brand'
                  ? 'bg-[#FACC15] text-[#0A0A0A] font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Brand & Businesses
            </button>
            <button
              type="button"
              onClick={() => setAudience('creator')}
              className={`px-6 py-3 transition-colors ${
                audience === 'creator'
                  ? 'bg-[#FACC15] text-[#0A0A0A] font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Creator Roster
            </button>
          </div>
        </div>

        {/* Standalone Estimator Card with Scroll Reveal */}
        <div ref={cardRef} className="pt-12 max-w-4xl mx-auto">
          <div className="bg-black/60 border border-white/15 p-6 sm:p-10 md:p-12 space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-6">
              <div>
                <div className="font-tech text-xs uppercase tracking-widest text-[#FACC15] font-bold mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FACC15]" />
                  <span>{audience === 'brand' ? 'Brand Campaign Engine' : 'Creator Revenue Model'}</span>
                </div>
                <h3 className="font-tech text-2xl font-bold uppercase tracking-tight text-[#F4F3EF]">
                  {audience === 'brand' ? 'Campaign Simulator' : 'Talent Valuation Model'}
                </h3>
              </div>
              <div className="border border-white/20 px-3 py-1 font-mono text-xs text-white/60 uppercase tracking-widest">
                LIVE CALC
              </div>
            </div>

            {/* Top Pinned Highlight Metric Banner */}
            <div className="p-5 bg-gradient-to-r from-[#FACC15]/15 via-white/[0.04] to-transparent border-l-2 border-[#FACC15] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-tech text-xs uppercase tracking-wider text-white/60 font-semibold">
                  {audience === 'brand' ? 'Projected Campaign Impact' : 'Monthly Deal Pipeline'}
                </div>
                <div className="font-display font-black text-3xl sm:text-4xl text-[#34D399] tabular-nums mt-1">
                  {audience === 'brand' ? growthDisplay : `$${dealsLow.toLocaleString()} – $${dealsHigh.toLocaleString()}`}
                </div>
              </div>
              <span className="font-mono text-xs text-white/80 bg-white/10 px-3 py-1 border border-white/20 uppercase font-semibold self-start sm:self-auto">
                Illustrative Estimate
              </span>
            </div>
            <div className="text-xs font-sans text-white/50 -mt-3 leading-relaxed">
              *Illustrative estimate — not a quote. Based on $85–$145 attributed reach per $1 of media spend.
            </div>

            {/* Sliders and Controls */}
            {audience === 'brand' ? (
              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <label htmlFor={budgetInputId} className="font-tech text-xs sm:text-sm uppercase tracking-wider text-white/80 font-bold">
                      Monthly Budget Allocation
                    </label>
                    <span className="font-display font-black text-2xl sm:text-3xl text-[#FACC15] tabular-nums">
                      ${budget.toLocaleString()}
                    </span>
                  </div>
                  <input
                    id={budgetInputId}
                    type="range"
                    min={2000}
                    max={30000}
                    step={500}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/20 appearance-none cursor-pointer accent-[#FACC15]"
                  />
                  <div className="flex justify-between font-mono text-xs text-white/40 uppercase">
                    <span>$2K (Initial)</span>
                    <span>$15K (Growth)</span>
                    <span>$30K+ (Scale)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="font-tech text-xs uppercase tracking-wider text-white/70 font-semibold">
                    Sector Classification
                  </div>
                  <div className="grid grid-cols-3 gap-2 bg-white/5 p-1.5 border border-white/10">
                    {[
                      { id: 'ecommerce', label: 'E-COMMERCE' },
                      { id: 'consumer', label: 'CONSUMER' },
                      { id: 'b2b', label: 'TECH & B2B' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setIndustry(item.id)}
                        className={`py-3 px-2 font-tech text-xs font-bold uppercase transition-colors ${
                          industry === item.id ? 'bg-[#FACC15] text-[#0A0A0A]' : 'text-white/70 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Secondary Metric Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-black/60 border border-white/10">
                    <div className="font-tech text-xs uppercase tracking-wider text-white/50 font-semibold">
                      Impressions Expected
                    </div>
                    <div className="font-display font-bold text-xl sm:text-2xl text-white tabular-nums mt-1">
                      {(reachLow / 1000).toFixed(0)}K – {(reachHigh / 1000).toFixed(0)}K
                    </div>
                  </div>
                  <div className="p-4 bg-black/60 border border-white/10">
                    <div className="font-tech text-xs uppercase tracking-wider text-white/50 font-semibold">
                      Creator Network Assigned
                    </div>
                    <div className="font-display font-bold text-xl sm:text-2xl text-white tabular-nums mt-1">
                      {creatorRange}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <label htmlFor={followerInputId} className="font-tech text-xs sm:text-sm uppercase tracking-wider text-white/80 font-bold">
                      Audience Footprint
                    </label>
                    <span className="font-display font-black text-2xl sm:text-3xl text-[#FACC15] tabular-nums">
                      {(followers / 1000).toLocaleString()}K
                    </span>
                  </div>
                  <input
                    id={followerInputId}
                    type="range"
                    min={10000}
                    max={600000}
                    step={10000}
                    value={followers}
                    onChange={(e) => setFollowers(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/20 appearance-none cursor-pointer accent-[#FACC15]"
                  />
                  <div className="flex justify-between font-mono text-xs text-white/40 uppercase">
                    <span>10K</span>
                    <span>250K</span>
                    <span>600K+</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="font-tech text-xs uppercase tracking-wider text-white/70 font-semibold">
                    Content Vertical
                  </div>
                  <div className="grid grid-cols-3 gap-2 bg-white/5 p-1.5 border border-white/10">
                    {[
                      { id: 'lifestyle', label: 'LIFESTYLE' },
                      { id: 'tech', label: 'TECH' },
                      { id: 'culture', label: 'CULTURE' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setNiche(item.id)}
                        className={`py-3 px-2 font-tech text-xs font-bold uppercase transition-colors ${
                          niche === item.id ? 'bg-[#FACC15] text-[#0A0A0A]' : 'text-white/70 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-black/60 border border-white/10">
                    <div className="font-tech text-xs uppercase tracking-wider text-white/50 font-semibold">
                      Per Placement Value
                    </div>
                    <div className="font-display font-bold text-xl sm:text-2xl text-white tabular-nums mt-1">
                      ${rateLow.toLocaleString()} – ${rateHigh.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-4 bg-black/60 border border-white/10">
                    <div className="font-tech text-xs uppercase tracking-wider text-white/50 font-semibold">
                      Post Production Desk
                    </div>
                    <div className="font-tech text-base font-bold text-[#FACC15] mt-1">
                      100% INCLUDED
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Deep-link to contact section below */}
            <div className="pt-4 border-t border-white/10 flex justify-end">
              <a
                href="#contact"
                className="font-tech text-xs uppercase tracking-wider text-[#FACC15] hover:text-white flex items-center gap-2 font-bold transition-colors"
              >
                <span>Proceed to send brief with these parameters</span>
                <span>&darr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </ArchitecturalSection>
  );
};
