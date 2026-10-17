import React, { useState } from 'react';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
import { MaskedHeading } from './motion/RevealWrappers';
import { FileText, Video, Share2, Users, Megaphone, Globe } from 'lucide-react';

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
    category: 'Creative Strategy',
    title: 'Scripting and Creative Strategy',
    icon: <FileText className="w-4 h-4 text-[#FACC15]" />,
    badge: 'Core Foundation',
    content:
      'We turn high-level brand ideas into campaign-ready scripts, promotional video concepts, and narrative storytelling arcs. Every concept is engineered with algorithmic 3-second hook mechanics and audience retention strategies.',
    metrics: [
      { label: 'Script Turnaround', value: '72h Rapid SLA' },
      { label: 'Hook Formula', value: 'Retention-First' }
    ]
  },
  {
    id: 2,
    index: '02',
    category: 'Production Studio',
    title: 'Capturing and Editing (4K Video & Short-Form)',
    icon: <Video className="w-4 h-4 text-[#FACC15]" />,
    badge: 'In-House Studio',
    content:
      'Full video production, promotional shoots, commercial brand advertisements, and high-retention 9:16 short-form content for Instagram Reels and YouTube Shorts. Combined with kinetic editing, motion graphics, and precision sound design.',
    metrics: [
      { label: 'Capture Quality', value: '4K ProRes / Cinema' },
      { label: 'Post Turnaround', value: '48h Master Delivery' }
    ]
  },
  {
    id: 3,
    index: '03',
    category: 'Growth & Relevance',
    title: 'Social Media Handling & Account Management',
    icon: <Share2 className="w-4 h-4 text-[#FACC15]" />,
    content:
      'Complete end-to-end management of brand social accounts. We direct content calendars, daily publishing cadences, community engagement, brand voice consistency, audience growth, and ongoing performance optimization.',
    metrics: [
      { label: 'Publishing Cadence', value: 'Daily 7/7 Cadence' },
      { label: 'Community Response', value: '< 2 Hour SLA' }
    ]
  },
  {
    id: 4,
    index: '04',
    category: 'Talent Matchmaking',
    title: 'Influencer and Brand Collaborations',
    icon: <Users className="w-4 h-4 text-[#FACC15]" />,
    content:
      'Connecting relevant brands with vetted creators and influencers. We oversee campaign planning, coordination, contract negotiations, commercial usage rights licensing, and ongoing creator-brand relationship management.',
    metrics: [
      { label: 'Talent Audit Floor', value: '> 4.8% Engagement' },
      { label: 'Usage Clearance', value: '100% Guaranteed' }
    ]
  },
  {
    id: 5,
    index: '05',
    category: 'Audience Acquisition',
    title: 'Marketing Campaigns (Digital & Outdoor Advertising)',
    icon: <Megaphone className="w-4 h-4 text-[#FACC15]" />,
    badge: 'Multi-Channel',
    content:
      'Synchronized digital advertising and integrated marketing campaigns paired with urban outdoor advertising and billboard takeovers. Engineered around your specific audience to maximize awareness and generate tracked conversions.',
    metrics: [
      { label: 'Attributed ROAS', value: '4.8x Average' },
      { label: 'Campaign Reach', value: 'Multi-District' }
    ]
  },
  {
    id: 6,
    index: '06',
    category: 'Conversion Platforms',
    title: 'Website Design & Conversion Platforms',
    icon: <Globe className="w-4 h-4 text-[#FACC15]" />,
    content:
      'Modern business and brand websites, bespoke portfolio showcases, and high-converting landing pages. Built with sub-400ms page speeds, architectural editorial typography, and seamless lead acquisition funnels.',
    metrics: [
      { label: 'Speed Benchmark', value: '< 380ms TTFB' },
      { label: 'Conversion Lift', value: '+42% Benchmark' }
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
            <div className="flex items-center gap-3 font-tech text-xs uppercase tracking-wider text-black/60 mb-3 font-semibold">
              <span className="w-2 h-2 bg-[#FACC15]" />
              <span>Full-Spectrum Creative & Marketing Capabilities</span>
            </div>
            <MaskedHeading
              as="h2"
              className="font-display font-black uppercase text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.9] text-[#0D0D0D]"
            >
              Full-Spectrum Service Architecture
            </MaskedHeading>
          </div>
          <div className="flex items-center gap-3 py-2 px-4 border border-black/15 font-sans text-xs uppercase tracking-wider text-[#0D0D0D] shrink-0 self-start lg:self-auto font-semibold">
            <span className="w-2 h-2 bg-[#10B981]" />
            <span>Capacity: Open for Q4</span>
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
