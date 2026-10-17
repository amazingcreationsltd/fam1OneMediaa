import React, { useState } from 'react';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
import { MaskedHeading } from './motion/RevealWrappers';
import { Megaphone, Users, Utensils, Share2, Video, Calendar } from 'lucide-react';

export interface AccordionItemData {
  id: number;
  index: string;
  category: string;
  title: string;
  icon: React.ReactNode;
  content: string;
  badge?: string;
  metrics?: { label: string; value: string }[];
}

const ACCORDION_ITEMS: AccordionItemData[] = [
  {
    id: 1,
    index: '01',
    category: 'Brand Architecture',
    title: 'Marketing Campaigns & Performance Conversion',
    icon: <Megaphone className="w-4 h-4 text-[#FACC15]" />,
    content:
      'We architect synchronized multi-channel growth campaigns combining paid algorithmic media with organic creator blitzes. Every campaign is backed by sub-second booking pages and measurable transaction attribution from day one.',
    metrics: [
      { label: 'Attributed ROAS', value: '4.2x Avg' },
      { label: 'Conversion Speed', value: '< 380ms TTFB' }
    ]
  },
  {
    id: 2,
    index: '02',
    category: 'Talent Brokerage',
    title: 'Tier-One Influencer Partnerships & Contract Indemnity',
    icon: <Users className="w-4 h-4 text-[#FACC15]" />,
    content:
      'Zero guesswork matchmaking. We audit demographic follower integrity, negotiate tier-one deal equity, and lock down 100% legal usage rights so brands scale safely and creators earn transparent commercial equity.',
    metrics: [
      { label: 'Audit Floor', value: '> 4.8% Engagement' },
      { label: 'Usage Clearance', value: '100% Guaranteed' }
    ]
  },
  {
    id: 3,
    index: '03',
    category: 'Outdoor & Hyper-Local',
    title: 'Outdoor Campaigns: 3–5 Curated Restaurants Per District',
    icon: <Utensils className="w-4 h-4 text-[#10B981]" />,
    badge: 'Signature Engine',
    content:
      'We curate 3 to 5 premier restaurants and lifestyle flagships in every target district, then deploy high-impact localized creator blitzes, digital window takeovers, and geofenced customer booking funnels that create multi-week queues.',
    metrics: [
      { label: 'District Footfall Lift', value: '+340% Average' },
      { label: 'Curated Roster', value: '3–5 Spots / District' }
    ]
  },
  {
    id: 4,
    index: '04',
    category: 'Daily Relevance',
    title: 'Hands-On Daily Social Media Management',
    icon: <Share2 className="w-4 h-4 text-[#FACC15]" />,
    content:
      'Content creation, algorithmic scheduling, trend-jacking, comment routing, and community care. Our operators run your brand channels 7 days a week to ensure your business remains culturally and algorithmically relevant every single day.',
    metrics: [
      { label: 'Posting Frequency', value: 'Daily 7/7 Cadence' },
      { label: 'Retention Score', value: '84.2% Hook Avg' }
    ]
  },
  {
    id: 5,
    index: '05',
    category: 'Creator Studio',
    title: 'Creator Trio: Scripting, Capturing + 4K Editing, Social Handling',
    icon: <Video className="w-4 h-4 text-[#FACC15]" />,
    badge: 'Creator Suite',
    content:
      'A complete operational cockpit for represented talent: 1. Scripting (algorithmic hook structures) → 2. Capturing + 4K Editing (cinematic 9:16 post-production with 48h turnarounds) → 3. Social Media Handling (deal brokerage & syndicate distribution).',
    metrics: [
      { label: 'Revision Turnaround', value: '< 48 Hours' },
      { label: 'Video Quality', value: 'ProRes 4K Vertical' }
    ]
  },
  {
    id: 6,
    index: '06',
    category: 'Future Scope',
    title: 'Future Scope → Event Management & Experiential Pop-Ups',
    icon: <Calendar className="w-4 h-4 text-[#FACC15]" />,
    badge: 'Upcoming Roadmap',
    content:
      'Expanding into high-production physical activations: VIP dining launches, invite-only creator summits, brand immersive pop-ups, and district-wide hospitality galas engineered to dominate real-world and digital feeds alike.',
    metrics: [
      { label: 'Rollout Phase', value: 'Q3/Q4 Expansion' },
      { label: 'Event Capacity', value: 'VIP to 1,000+ Guests' }
    ]
  }
];

export const ServiceAccordion: React.FC = () => {
  // Default closed (null) so nothing is opened initially
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <ArchitecturalSection
      index="07"
      label="SERVICE ARCHITECTURE"
      id="services"
      className="py-24"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-black/15">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-black/60 mb-3">
              <span className="w-2 h-2 bg-[#FACC15]" />
              <span>CAPABILITIES MATRIX // FULL PROTOCOL</span>
            </div>
            <MaskedHeading
              as="h2"
              className="font-display font-black uppercase text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.9] text-[#0D0D0D]"
            >
              Full-Spectrum Service Architecture
            </MaskedHeading>
          </div>
          <div className="flex items-center gap-3 py-2 px-4 border border-black/15 font-mono text-[11px] uppercase tracking-wider text-[#0D0D0D] shrink-0 self-start lg:self-auto">
            <span className="w-2 h-2 bg-[#10B981] animate-pulse" />
            <span>Capacity: 94% Allocated</span>
          </div>
        </div>

        {/* Full-Width Edge-To-Edge Architectural Rows */}
        <div className="divide-y divide-black/15">
          {ACCORDION_ITEMS.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`transition-colors duration-300 group ${
                  isOpen ? 'bg-black/[0.02]' : 'hover:bg-black/[0.015]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full text-left py-8 sm:py-10 flex items-start sm:items-center justify-between gap-6 cursor-pointer select-none"
                >
                  <div className="flex items-start sm:items-center gap-6 sm:gap-10 flex-1">
                    <span className="font-mono text-sm sm:text-base font-medium text-black/40 group-hover:text-[#0D0D0D] transition-colors shrink-0 pt-1 sm:pt-0">
                      [{item.index}]
                    </span>
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-black/50">
                        <span>{item.category}</span>
                        {item.badge && (
                          <span className="border border-black/20 px-2 py-0.5 text-[#0D0D0D] bg-[#FACC15]/20 font-bold">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <h3
                        className="font-tech text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-[#0D0D0D] transition-transform duration-300 group-hover:translate-x-3"
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Clean Stationary Square Box with Rotating Plus/Cross Icon */}
                  <div className="shrink-0 pt-1 sm:pt-0">
                    <div className="w-9 h-9 border border-black/20 flex items-center justify-center bg-transparent group-hover:border-black transition-colors">
                      <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                        {/* Horizontal Line */}
                        <span
                          className={`absolute h-[2px] w-3.5 bg-[#0D0D0D] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isOpen ? 'rotate-45' : 'rotate-0'
                          }`}
                        />
                        {/* Vertical Line */}
                        <span
                          className={`absolute w-[2px] h-3.5 bg-[#0D0D0D] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isOpen ? 'rotate-45' : 'rotate-0'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </button>

                {/* Smooth Expand/Collapse Details via CSS Grid Transition */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-10 pt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-black/10">
                      <div className="lg:col-span-8 lg:pl-16">
                        <p className="font-sans text-base sm:text-lg text-black/80 leading-relaxed max-w-3xl">
                          {item.content}
                        </p>
                      </div>

                      {item.metrics && (
                        <div className="lg:col-span-4 grid grid-cols-2 gap-px bg-black/15 border border-black/15">
                          {item.metrics.map((m, idx) => (
                            <div key={idx} className="bg-[#F4F3EF] p-4 flex flex-col justify-between">
                              <span className="font-mono text-[10px] uppercase tracking-wider text-black/50">
                                {m.label}
                              </span>
                              <span className="font-tech text-lg font-bold text-[#0D0D0D] mt-2">
                                {m.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
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
