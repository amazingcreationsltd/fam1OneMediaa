import React, { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { useGSAPScrollReveal } from '../hooks/useGSAPScrollReveal';

type FilterCategory = 'all' | 'hospitality' | 'editing' | 'web';

interface ShowcaseItem {
  id: string;
  category: 'hospitality' | 'editing' | 'web';
  tag: string;
  views: string;
  title: string;
  meta: string;
  metricLabel: string;
  metricValue: string;
  imgUrl: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'osteria',
    category: 'hospitality',
    tag: 'Hospitality Launch',
    views: '1.4M Views',
    title: 'Osteria Botanica Dining Blitz',
    meta: '8 Food Creators · 14-Day Physical Footfall Surge',
    metricLabel: 'Attributed Footfall Lift',
    metricValue: '+340%',
    imgUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lumix',
    category: 'editing',
    tag: 'Retention Post-Desk',
    views: '2.1M Views',
    title: 'Lumix S5ii Viral Breakdown',
    meta: 'Kinetic Pacing · Dynamic Framing · Custom Sound Design',
    metricLabel: '3-Sec Hook Retention',
    metricValue: '84.2%',
    imgUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kura',
    category: 'web',
    tag: 'Web & Commerce',
    views: '890K Views',
    title: 'Kura Specialty Roast',
    meta: 'Sub-400ms Landing System · Direct Creator Attribution',
    metricLabel: 'Attributed ROAS',
    metricValue: '4.2x ROAS',
    imgUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80'
  }
];

export const PhoneShowcase: React.FC = () => {
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [activeReel, setActiveReel] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAPScrollReveal(sectionRef, {
    headerSelector: '.section-header',
    itemsSelector: '.phone-card',
    stagger: 0.16,
  });

  const filteredItems = SHOWCASE_ITEMS.filter(
    (item) => filter === 'all' || item.category === filter
  );

  return (
    <section ref={sectionRef} id="portfolio" className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="section-header mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Reel & Retention Showcase
          </h2>
          <p className="mt-2 text-muted text-sm sm:text-base max-w-xl">
            Live 9:16 vertical feeds and documented commercial attribution metrics across dining, tech, and retail.
          </p>
        </div>

        {/* Filter Switcher */}
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all duration-300 ${
              filter === 'all'
                ? 'bg-accent text-white shadow-lg shadow-accent/25'
                : 'bg-white/[0.05] text-muted hover:text-white border border-white/10'
            }`}
          >
            All Work
          </button>
          <button
            onClick={() => setFilter('hospitality')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all duration-300 ${
              filter === 'hospitality'
                ? 'bg-accent text-white shadow-lg shadow-accent/25'
                : 'bg-white/[0.05] text-muted hover:text-white border border-white/10'
            }`}
          >
            Dining & Footfall
          </button>
          <button
            onClick={() => setFilter('editing')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all duration-300 ${
              filter === 'editing'
                ? 'bg-accent text-white shadow-lg shadow-accent/25'
                : 'bg-white/[0.05] text-muted hover:text-white border border-white/10'
            }`}
          >
            Post-Production
          </button>
          <button
            onClick={() => setFilter('web')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all duration-300 ${
              filter === 'web'
                ? 'bg-accent text-white shadow-lg shadow-accent/25'
                : 'bg-white/[0.05] text-muted hover:text-white border border-white/10'
            }`}
          >
            Web Architecture
          </button>
        </div>
      </div>

      {/* 3-Column 9:16 Phone Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isPlaying = activeReel === item.id;

          return (
            <div key={item.id} className="phone-card double-bezel group">
              <div className="double-bezel-inner p-3.5 flex flex-col justify-between h-full">
                {/* 9:16 Vertical Phone Viewport (Always dark video frame) */}
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-[9/16] w-full border border-white/10 flex flex-col justify-between p-4 phone-viewport-dark">
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                      isPlaying ? 'scale-105 filter brightness-105' : 'group-hover:scale-105'
                    }`}
                    loading="lazy"
                  />

                  {/* Scrim Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/60 pointer-events-none" />

                  {/* Top Indicators inside Viewport */}
                  <div className="relative z-10 flex items-center justify-between text-xs font-semibold">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 text-[11px]">
                      {item.tag}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-accent text-white font-bold text-[11px] shadow">
                      {item.views}
                    </span>
                  </div>

                  {/* Play / Pause Interactive HUD */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                    <button
                      onClick={() => setActiveReel(isPlaying ? null : item.id)}
                      className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 active:scale-95 transition-all duration-300"
                      aria-label={isPlaying ? 'Pause preview' : 'Play preview'}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 text-accent" />
                      ) : (
                        <Play className="w-5 h-5 text-white ml-0.5" />
                      )}
                    </button>

                    {isPlaying && (
                      <div className="mt-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-white">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                        <span>Simulating Reel Stream</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Info inside Viewport */}
                  <div className="relative z-10 space-y-1.5">
                    <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Verified Campaign Delivery
                    </div>
                    <h3 className="font-display text-base font-bold text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-white/80 leading-snug">
                      {item.meta}
                    </p>
                  </div>
                </div>

                {/* Attribution Metrics Card below Viewport */}
                <div className="mt-3 p-3 rounded-xl bg-white/[0.03] border border-white/10 flex justify-between items-center text-xs">
                  <span className="text-muted font-medium">{item.metricLabel}:</span>
                  <span className="text-accent font-bold text-sm tracking-tight">{item.metricValue}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
