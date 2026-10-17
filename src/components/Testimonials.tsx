import React from 'react';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
import { MaskedHeading } from './motion/RevealWrappers';

interface TestimonialItem {
  id: string;
  index: string;
  role: string;
  roleType: 'CREATOR' | 'BRAND';
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
    role: 'Creator Partner',
    roleType: 'CREATOR',
    quote:
      'FamO1mediaa aligned me with top-tier brand partnerships and took 4K video post-production completely off my plate. My hook retention surged while I focused 100% on creative storytelling.',
    author: 'Sarah Chen',
    title: 'Visual Storyteller & Digital Creator · 480K Audience',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    metric: '+40%',
    metricLabel: 'Engagement Lift'
  },
  {
    id: 'brand-vance',
    index: '02',
    role: 'Brand Partner',
    roleType: 'BRAND',
    quote:
      'FamO1mediaa turned our product launch into an integrated movement: scripted campaign concepts, vetted creator matchmaking, and a high-converting website. We achieved 4.8x ROAS and immediate sellout.',
    author: 'Julian Vance',
    title: 'Founder & CEO, Lumina Lifestyle Group',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    metric: '4.8X ROAS',
    metricLabel: 'Attributed Campaign Yield'
  }
];

export const Testimonials: React.FC = () => {
  return (
    <ArchitecturalSection
      id="testimonials"
      className="py-24 border-t border-black/15"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-black/15">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-tech text-xs uppercase tracking-wider text-black/60 mb-3 font-semibold">
              <span className="w-2 h-2 bg-[#FACC15]" />
              <span>Stakeholder Attestations & Verified Records</span>
            </div>
            <MaskedHeading
              as="h2"
              className="font-display font-black uppercase text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.9] text-[#0D0D0D]"
            >
              Verified Partner Perspectives
            </MaskedHeading>
          </div>
          <div className="font-sans text-xs uppercase tracking-wider text-black/60 font-semibold">
            Direct Unedited Statements
          </div>
        </div>

        {/* 2-Column Border-Collapsed Matrix */}
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
                    <span className="font-tech text-xs font-bold text-black/40">0{item.index}</span>
                    <span className="font-tech text-xs uppercase tracking-wider text-[#0D0D0D] font-bold">
                      {item.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-[#10B981] font-bold">
                    <span className="w-1.5 h-1.5 bg-[#10B981]" />
                    <span>Verified Record</span>
                  </div>
                </div>

                {/* Giant Metric Callout */}
                <div>
                  <div className="font-display font-black text-5xl sm:text-6xl text-[#0D0D0D] tracking-tight leading-none">
                    {item.metric}
                  </div>
                  <div className="font-tech text-xs uppercase tracking-wider text-black/50 mt-1 font-medium">
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
                  <div className="font-sans text-xs text-black/60 uppercase tracking-wider font-medium">
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
