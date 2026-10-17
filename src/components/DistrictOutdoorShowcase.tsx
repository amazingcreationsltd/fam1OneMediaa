import React, { useState } from 'react';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
import { ParallaxMedia } from './motion/RevealWrappers';

interface CaseStudy {
  id: string;
  category: string;
  title: string;
  cuisine: string;
  location: string;
  lift: string;
  views: string;
  revenue: string;
  image: string;
  cols: string;
  staggerClass?: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: '01',
    category: 'FINE DINING & HOSPITALITY',
    title: 'Osteria Botanica Dining Blitz',
    cuisine: 'Modern Italian & Hand-Rolled Pasta',
    location: 'Dean Street, Soho',
    lift: '+340% FOOTFALL',
    views: '4.8M VIEWS',
    revenue: '$480K REVENUE',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
    cols: 'col-span-12 lg:col-span-7',
  },
  {
    id: '02',
    category: 'ROBATA & SPECIALTY DINING',
    title: 'Kuro Charcoal Wagyu Launch',
    cuisine: 'Robata & Wagyu Tasting Menu',
    location: 'Wardour Street, Soho',
    lift: '+285% COVERS',
    views: '3.9M VIEWS',
    revenue: '$360K REVENUE',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
    cols: 'col-span-12 lg:col-span-5',
    staggerClass: 'lg:pt-20',
  },
  {
    id: '03',
    category: 'ARTISANAL PATISSERIE',
    title: 'Velvet Hour Patisserie Morning Rush',
    cuisine: 'Artisanal Bakery & Specialty Roast',
    location: 'Berwick Street, Soho',
    lift: '+410% VISITATION',
    views: '6.2M VIEWS',
    revenue: '$290K REVENUE',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85',
    cols: 'col-span-12 lg:col-span-5',
    staggerClass: 'lg:pt-12',
  },
  {
    id: '04',
    category: 'SPEAKEASY & ASIAN DINING',
    title: 'Neon Lotus Speakeasy Takeover',
    cuisine: 'Pan-Asian Speakeasy & Dim Sum',
    location: 'Gerrard Street, Soho',
    lift: '+320% BOOKINGS',
    views: '5.1M VIEWS',
    revenue: '$520K REVENUE',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85',
    cols: 'col-span-12 lg:col-span-7',
  },
];

interface ReelItem {
  id: string;
  tag: string;
  views: string;
  title: string;
  meta: string;
  metric: string;
  image: string;
}

const REELS: ReelItem[] = [
  {
    id: 'reel-1',
    tag: 'DINING LAUNCH',
    views: '1.4M VIEWS',
    title: 'Truffle Tagliolini Viral Cut',
    meta: '8 Creators · 14-Day Queue Blitz',
    metric: '+340% FOOTFALL SURGE',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'reel-2',
    tag: 'POST-DESK BREAKDOWN',
    views: '2.1M VIEWS',
    title: 'Robata Flame Searing 4K',
    meta: 'Pacing · Sound Design · Zoom Beats',
    metric: '84.2% 3-SEC RETENTION',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'reel-3',
    tag: 'CONVERSION SYSTEM',
    views: '890K VIEWS',
    title: 'Matcha Croissant Sellout Loop',
    meta: 'Sub-400ms Landing System',
    metric: '4.2X ATTRIBUTED ROAS',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=85',
  },
];

export const DistrictOutdoorShowcase: React.FC = () => {
  const [filter, setFilter] = useState('ALL');

  return (
    <ArchitecturalSection id="work" dark={true}>
      {/* Top Header Bar */}
      <div className="p-6 sm:p-10 md:p-14 border-b border-white/15 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="font-tech text-xs uppercase tracking-wider text-[#FACC15] mb-3 flex items-center gap-2 font-semibold">
            <span className="w-2 h-2 bg-[#FACC15]" />
            <span>Proven Commercial Attribution</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#F4F3EF]">
            VERIFIED CASE STUDIES
          </h2>
        </div>

        {/* Clean Rectangular Filter Tabs */}
        <div className="flex flex-wrap gap-2 font-tech text-xs uppercase tracking-wider font-semibold">
          {['ALL', 'FINE DINING', 'ROBATA', 'PATISSERIE'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2.5 border transition-colors ${
                filter === tab
                  ? 'bg-[#FACC15] text-[#0D0D0D] border-[#FACC15] font-bold'
                  : 'bg-transparent text-[#F4F3EF] border-white/20 hover:border-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Part A: Asymmetric Staggered 12-Column Case Studies Grid (Zero Card Wrappers!) */}
      <div className="grid grid-cols-12 divide-y lg:divide-y-0 border-b border-white/15">
        {CASE_STUDIES.map((study) => (
          <div
            key={study.id}
            className={`${study.cols} ${study.staggerClass || ''} p-6 sm:p-10 md:p-12 lg:border-r border-white/15 flex flex-col justify-between hover:bg-white/[0.02] transition-colors`}
          >
            {/* Top metadata bar */}
            <div className="flex items-center justify-between font-tech text-xs mb-4 uppercase tracking-wider font-semibold">
              <span className="text-neutral-400">{study.category}</span>
              <span className="text-[#10B981] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#10B981]" />
                {study.lift}
              </span>
            </div>

            {/* Media with Parallax and custom cursor attribute */}
            <ParallaxMedia
              src={study.image}
              alt={study.title}
              aspect="aspect-[16/10]"
              dataCursor="CASE"
            />

            {/* Content Below Image */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="font-sans text-xs text-[#FACC15] uppercase tracking-wider font-semibold mb-1">
                {study.location} · {study.cuisine}
              </div>
              <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-[#F4F3EF]">
                {study.title}
              </h3>

              {/* 2-Column Specs */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/10 font-sans text-xs">
                <div>
                  <div className="text-neutral-500 uppercase font-semibold">Measured Reach</div>
                  <div className="font-display font-bold text-lg text-white mt-0.5">{study.views}</div>
                </div>
                <div>
                  <div className="text-neutral-500 uppercase font-semibold">Direct Revenue Lift</div>
                  <div className="font-display font-bold text-lg text-[#FACC15] mt-0.5">{study.revenue}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Part B: 9:16 Vertical Reels Gallery */}
      <div className="w-full">
        <div className="p-6 sm:p-10 border-b border-white/15 flex items-center justify-between">
          <span className="font-tech text-xs text-neutral-300 uppercase tracking-wider font-bold">
            High-Retention Short-Form Production
          </span>
          <span className="font-sans text-xs text-[#10B981] uppercase tracking-wider flex items-center gap-2 font-semibold">
            <span className="w-2 h-2 bg-[#10B981]" />
            4K Vertical Master Recordings
          </span>
        </div>

        {/* 3-Column Exposed 9:16 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/15">
          {REELS.map((reel) => (
            <div key={reel.id} className="p-6 sm:p-10 flex flex-col justify-between hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center justify-between font-tech text-xs mb-3 uppercase tracking-wider font-semibold">
                <span className="text-[#FACC15]">{reel.tag}</span>
                <span className="text-neutral-400">{reel.views}</span>
              </div>

              {/* 9:16 Video Frame with razor-sharp corners */}
              <div
                className="relative overflow-hidden w-full aspect-[9/16] bg-black border border-white/15 group cursor-pointer"
                data-cursor="PLAY"
              >
                <img
                  src={reel.image}
                  alt={reel.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Center Sharp Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-black/80 border border-white/30 text-[#FACC15] flex items-center justify-center font-sans text-xs group-hover:bg-[#FACC15] group-hover:text-black transition-colors">
                    &#9658;
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-left font-sans text-xs text-white">
                  <div className="text-[10px] text-[#FACC15] uppercase tracking-wider font-semibold">{reel.metric}</div>
                  <div className="font-bold uppercase text-sm mt-0.5 font-tech">{reel.title}</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 font-sans text-xs text-neutral-400 flex justify-between font-medium">
                <span>{reel.meta}</span>
                <span className="text-[#10B981]">SLA Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ArchitecturalSection>
  );
};
