import React, { useState, useRef, useEffect } from 'react';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
import { ParallaxMedia, MaskedHeading } from './motion/RevealWrappers';
import { SocialDistributionManager } from './SocialDistributionManager';
import { CustomReelPlayer } from './media/CustomReelPlayer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudy {
  id: string;
  category: string;
  title: string;
  niche: string;
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
    category: 'E-COMMERCE & FASHION',
    title: 'Apex Apparel Global Rebrand',
    niche: 'High-Performance Streetwear',
    location: 'New York · Direct-To-Consumer',
    lift: '+380% ROAS LIFT',
    views: '12.4M VIEWS',
    revenue: '$1.2M GMV',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    cols: 'col-span-12 lg:col-span-7',
  },
  {
    id: '02',
    category: 'CREATOR COLLABORATION & DROP',
    title: 'Lumina Sound Multi-Channel Drop',
    niche: 'Audio Tech & Hardware',
    location: 'London · Global Creator Network',
    lift: '+420% ENGAGEMENT',
    views: '8.6M VIEWS',
    revenue: '$640K REVENUE',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85',
    cols: 'col-span-12 lg:col-span-5',
    staggerClass: 'lg:pt-20',
  },
  {
    id: '03',
    category: 'OUTDOOR & URBAN ADVERTISING',
    title: 'Verve Botanicals City Takeover',
    niche: 'Clean Skincare & Wellness',
    location: 'SoHo & Brooklyn Billboards',
    lift: '+290% SEARCH VOLUME',
    views: '18.2M IMPRESSIONS',
    revenue: '$890K REVENUE',
    image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=1200&q=85',
    cols: 'col-span-12 lg:col-span-5',
    staggerClass: 'lg:pt-12',
  },
  {
    id: '04',
    category: 'SCRIPTING & 4K COMMERCIAL',
    title: 'Kinetix OS Product Launch',
    niche: 'SaaS & Digital Platform',
    location: 'San Francisco · Global Web Launch',
    lift: '+310% SIGNUPS',
    views: '9.4M VIEWS',
    revenue: '$750K ARR LIFT',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85',
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
  videoSrc: string;
}

const REELS: ReelItem[] = [
  {
    id: 'reel-1',
    tag: 'CREATOR COLLAB',
    views: '3.4M VIEWS',
    title: 'Hook-First Creator Ad Cut',
    meta: '12 Creators · 7-Day Organic Spark',
    metric: '88.4% 3-SEC HOOK RETENTION',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=85',
    videoSrc: 'https://videos.pexels.com/video-files/39862868/17002633_1440_2560_60fps.mp4',
  },
  {
    id: 'reel-2',
    tag: 'POST-PRODUCTION',
    views: '4.8M VIEWS',
    title: '4K Commercial Sound & Motion Cut',
    meta: 'Kinetic Pacing · SFX Beats · Color Grading',
    metric: '92.1% WATCH-THROUGH RATE',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=85',
    videoSrc: 'https://videos.pexels.com/video-files/38861290/16519308_1440_2560_50fps.mp4',
  },
  {
    id: 'reel-3',
    tag: 'CONVERSION LAUNCH',
    views: '2.1M VIEWS',
    title: 'Direct-To-Consumer Reel Funnel',
    meta: 'Interactive Landers · 400ms Load',
    metric: '5.4X ATTRIBUTED ROAS',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=85',
    videoSrc: 'https://videos.pexels.com/video-files/39654276/16905283_360_640_30fps.mp4',
  },
];

export const DistrictOutdoorShowcase: React.FC = () => {
  const [filter, setFilter] = useState('ALL');
  const reelsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Only apply stacking on mobile devices (< 768px)
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const container = reelsContainerRef.current;
    if (!container) return;

    const panels = container.querySelectorAll<HTMLElement>('.mobile-sticky-reel');

    panels.forEach((panel, i) => {
      if (i < panels.length - 1) {
        gsap.to(panel, {
          scale: 0.94,
          opacity: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: panels[i + 1],
            start: 'top 75px',
            end: 'top 55px',
            scrub: true,
          },
        });
      }
    });
  }, []);

  const filterTabs = [
    { id: 'ALL', label: 'ALL' },
    { id: 'CAMPAIGNS', label: 'BRAND CAMPAIGNS' },
    { id: 'CREATOR', label: 'CREATOR COLLABS' },
    { id: 'OUTDOOR', label: 'OUTDOOR & ADS' },
    { id: 'COMMERCIAL', label: 'COMMERCIAL & SCRIPTING' },
  ];

  const filteredStudies = CASE_STUDIES.filter((study) => {
    if (filter === 'ALL') return true;
    if (filter === 'CAMPAIGNS') return study.category.includes('COMMERCE') || study.category.includes('CAMPAIGN');
    if (filter === 'CREATOR') return study.category.includes('CREATOR');
    if (filter === 'OUTDOOR') return study.category.includes('OUTDOOR');
    if (filter === 'COMMERCIAL') return study.category.includes('COMMERCIAL') || study.category.includes('SCRIPTING');
    return true;
  });

  return (
    <ArchitecturalSection id="work" dark={true}>
      {/* Top Header Bar */}
      <div className="p-6 sm:p-10 md:p-14 border-b border-white/15 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="font-tech text-xs uppercase tracking-wider text-[#FACC15] mb-3 flex items-center gap-2 font-semibold">
            <span className="w-2 h-2 bg-[#FACC15]" />
            <span>Selected Commercial Work</span>
          </div>
          <MaskedHeading
            as="h2"
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#F4F3EF]"
          >
            SELECTED CASE STUDIES
          </MaskedHeading>
        </div>

        {/* Clean Rectangular Filter Tabs with ARIA accessibility */}
        <div role="tablist" aria-label="Case Study Filters" className="flex flex-wrap gap-2 font-tech text-xs uppercase tracking-wider font-semibold">
          {filterTabs.map((tab) => {
            const isSelected = filter === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setFilter(tab.id)}
                className={`px-5 py-2.5 border transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#FACC15] text-[#0D0D0D] border-[#FACC15] font-bold'
                    : 'bg-transparent text-[#F4F3EF] border-white/20 hover:border-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Part A: Asymmetric Staggered 12-Column Case Studies Grid */}
      {filteredStudies.length === 0 ? (
        <div className="p-16 border-b border-white/15 text-center font-tech text-sm text-neutral-400">
          No case studies match this filter currently.
        </div>
      ) : (
        <div className="grid grid-cols-12 divide-y lg:divide-y-0 border-b border-white/15 transition-opacity duration-300">
          {filteredStudies.map((study) => (
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
                  {study.location} · {study.niche}
                </div>
                <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-[#F4F3EF]">
                  {study.title}
                </h3>

                {/* 2-Column Specs */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/10 font-sans text-xs">
                  <div>
                    <div className="text-neutral-500 uppercase font-semibold">Audience Reach</div>
                    <div className="font-display font-bold text-lg text-white mt-0.5">{study.views}</div>
                  </div>
                  <div>
                    <div className="text-neutral-500 uppercase font-semibold">Direct Return</div>
                    <div className="font-display font-bold text-lg text-[#FACC15] mt-0.5">{study.revenue}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* End Part A: Case Studies */}

      {/* Part B: Multi-Network Distribution & Social Media Management */}
      <SocialDistributionManager />

      {/* Part C: 9:16 Vertical Reels Gallery */}
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

        {/* 3-Column Exposed 9:16 Grid with Mobile-Only Sticky Stacking */}
        <div
          ref={reelsContainerRef}
          className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/15 relative"
        >
          {REELS.map((reel, idx) => (
            <div
              key={reel.id}
              className="mobile-sticky-reel sticky md:static top-16 md:top-auto bg-[#0A0A0A] w-full border-b md:border-b-0 border-white/15 shadow-none"
              style={{ zIndex: idx + 1 }}
            >
              <CustomReelPlayer
                videoSrc={reel.videoSrc}
                posterSrc={reel.image}
                title={reel.title}
                tag={reel.tag}
                views={reel.views}
                meta={reel.meta}
                metric={reel.metric}
              />
            </div>
          ))}
        </div>
      </div>
    </ArchitecturalSection>
  );
};
