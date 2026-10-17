import React from 'react';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
import { MaskedHeading } from './motion/RevealWrappers';

interface TestimonialItem {
  id: string;
  index: string;
  role: string;
  roleType: 'CREATOR' | 'HOSPITALITY';
  quote: string;
  author: string;
  title: string;
  avatar: string;
  metric: string;
  metricLabel: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'creator-chen',
    index: '01',
    role: 'Creator Representation',
    roleType: 'CREATOR',
    quote:
      'They secured three six-figure brand partnerships in my first month and took video post-production completely off my plate. My engagement surged 40% while my administrative overhead vanished.',
    author: 'Sarah Chen',
    title: 'Lifestyle & Culinary Creator · 480K Audience',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    metric: '+40%',
    metricLabel: 'Engagement Lift'
  },
  {
    id: 'brand-rossi',
    index: '02',
    role: 'Hospitality Partner',
    roleType: 'HOSPITALITY',
    quote:
      'Our flagship dining launch had a queue around the block for three consecutive weeks thanks to Fam1Media’s hyper-local creator blitz and sub-second booking lander. Measurable revenue attribution from day one.',
    author: 'Marco Rossi',
    title: 'Managing Partner, Osteria Botanica Group',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    metric: '3 WEEKS',
    metricLabel: 'Continuous Queue'
  }
];

export const Testimonials: React.FC = () => {
  return (
    <ArchitecturalSection
      index="08"
      label="VERIFIED PERSPECTIVES"
      id="testimonials"
      className="py-24 border-t border-black/15"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-black/15">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-black/60 mb-3">
              <span className="w-2 h-2 bg-[#FACC15]" />
              <span>STAKEHOLDER ATTESTATIONS // PROTOCOL VERIFIED</span>
            </div>
            <MaskedHeading
              as="h2"
              className="font-display uppercase text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.9] text-[#0D0D0D]"
            >
              Verified Partner Perspectives
            </MaskedHeading>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-black/60">
            AUDIT: 100% UNEDITED DIRECT STATEMENTS
          </div>
        </div>

        {/* 2-Column Border-Collapsed Architectural Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-black/15 border-b border-black/15">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="p-8 sm:p-12 flex flex-col justify-between hover:bg-black/[0.015] transition-colors relative group"
            >
              <div className="space-y-8">
                {/* Top Meta Header */}
                <div className="flex items-center justify-between pb-6 border-b border-black/10">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-black/40">[{item.index}]</span>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-[#0D0D0D] font-bold">
                      {item.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#10B981] font-bold">
                    <span className="w-1.5 h-1.5 bg-[#10B981]" />
                    <span>VERIFIED RECORD</span>
                  </div>
                </div>

                {/* Giant Metric Callout */}
                <div>
                  <div className="font-display text-5xl sm:text-6xl font-black text-[#0D0D0D] tracking-tight leading-none">
                    {item.metric}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/50 mt-1">
                    {item.metricLabel}
                  </div>
                </div>

                {/* Editorial Quote */}
                <blockquote className="font-sans text-lg sm:text-xl text-[#0D0D0D] font-medium leading-relaxed">
                  “{item.quote}”
                </blockquote>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-5 pt-8 mt-8 border-t border-black/10">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-14 h-14 object-cover grayscale contrast-125 border border-black/20"
                  loading="lazy"
                />
                <div className="space-y-1">
                  <div className="font-tech text-base font-bold uppercase tracking-tight text-[#0D0D0D]">
                    {item.author}
                  </div>
                  <div className="font-mono text-[11px] text-black/60 uppercase tracking-wider">
                    {item.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ArchitecturalSection>
  );
};
