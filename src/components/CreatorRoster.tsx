import React, { useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useGSAPScrollReveal } from '../hooks/useGSAPScrollReveal';

interface Creator {
  name: string;
  niche: string;
  followers: string;
  engagement: string;
  status: string;
  imgUrl: string;
}

const CREATORS: Creator[] = [
  {
    name: 'Elena Rostova',
    niche: 'Dining & Culinary',
    followers: '620K Followers',
    engagement: '5.2% Engagement',
    status: 'Represented',
    imgUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Marcus Vance',
    niche: 'Tech & Creative Systems',
    followers: '340K Followers',
    engagement: '6.1% Engagement',
    status: 'Represented',
    imgUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Chloe Davies',
    niche: 'Fitness & Longevity',
    followers: '510K Followers',
    engagement: '4.9% Engagement',
    status: 'Represented',
    imgUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Tariq Jensen',
    niche: 'Hospitality & Travel',
    followers: '290K Followers',
    engagement: '7.4% Engagement',
    status: 'Represented',
    imgUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  }
];

export const CreatorRoster: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAPScrollReveal(sectionRef, {
    headerSelector: '.section-header',
    itemsSelector: '.roster-item',
    stagger: 0.12,
  });

  return (
    <section ref={sectionRef} id="roster" className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="section-header mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Represented Creator Roster
          </h2>
          <p className="mt-2 text-muted text-sm sm:text-base max-w-xl">
            Vetted digital creators across Instagram, TikTok, and YouTube with verified commercial conversion integrity.
          </p>
        </div>
        <div className="text-xs text-muted font-medium">
          Combined Reach: <span className="text-white font-bold">14.8M+ Followers</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CREATORS.map((creator) => (
          <div key={creator.name} className="roster-item double-bezel group">
            <div className="double-bezel-inner p-5 sm:p-6 flex items-center gap-5">
              <img
                src={creator.imgUrl}
                alt={creator.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shrink-0 border border-white/10 shadow-lg group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-accent font-semibold">{creator.niche}</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {creator.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1.5 tracking-tight truncate">
                  {creator.name}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] text-white border border-white/5 font-medium text-[11px]">
                    {creator.followers}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] text-muted border border-white/5 font-medium text-[11px]">
                    {creator.engagement}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
