import React, { useState } from 'react';
import { CheckCircle2, TrendingUp } from 'lucide-react';

interface PlatformData {
  id: string;
  name: string;
  badge: string;
  metric: string;
  creatorDeliverable: string;
  brandDeliverable: string;
  accentColor: string;
  icon: (className?: string) => React.ReactNode;
}

const PLATFORMS: PlatformData[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    badge: 'META ECOSYSTEM',
    metric: '4.2X Organic Reach',
    creatorDeliverable: 'Daily Reels, story sequences, bio conversion funnels & DM automation.',
    brandDeliverable: 'Advantage+ Story ads, creator whitelisting & high-intent retargeting.',
    accentColor: '#E1306C',
    icon: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: 'youtube',
    name: 'YouTube',
    badge: 'ALPHABET VIDEO',
    metric: '92% Watch-Through',
    creatorDeliverable: 'Shorts cadence, 4K long-form video editing, CTR thumbnails & SEO tags.',
    brandDeliverable: 'In-feed discovery ads, non-skippable pre-rolls & creator sponsorships.',
    accentColor: '#FF0000',
    icon: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: 'facebook',
    name: 'Facebook',
    badge: 'META BUSINESS',
    metric: '5.1X Attributed ROAS',
    creatorDeliverable: 'Reels cross-syndication, community page moderation & engagement.',
    brandDeliverable: 'Lookalike audiences, custom pixel retargeting & dynamic catalog ads.',
    accentColor: '#1877F2',
    icon: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    badge: 'MICROSOFT B2B',
    metric: '+310% B2B Pipeline',
    creatorDeliverable: 'Thought-leadership copy, executive carousels & newsletter publishing.',
    brandDeliverable: 'Account-Based Marketing (ABM), Sponsored Content & lead generation.',
    accentColor: '#0A66C2',
    icon: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    badge: 'REAL-TIME WIRE',
    metric: '18M+ Monthly Imp.',
    creatorDeliverable: 'Viral narrative threads, real-time engagement & audience building.',
    brandDeliverable: 'Trend takeover amplification, promoted video drops & conversion cards.',
    accentColor: '#000000',
    icon: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: 'google-ads',
    name: 'Google Ads & AdSense',
    badge: 'SEARCH & PERFORMANCE',
    metric: '68% Lower Blended CPA',
    creatorDeliverable: 'YouTube search discovery, website audience capture & AdSense yields.',
    brandDeliverable: 'High-intent Google Search, YouTube Ads, Performance Max & remarketing.',
    accentColor: '#4285F4',
    icon: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
      </svg>
    ),
  },
];

export const SocialDistributionManager: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('instagram');
  const active = PLATFORMS.find((p) => p.id === selectedPlatform) || PLATFORMS[0];

  return (
    <div className="w-full bg-[#F4F3EF] text-[#0D0D0D] border-t border-b border-black/15">
      {/* 1. Architectural Header Bar */}
      <div className="p-6 sm:p-10 md:p-14 border-b border-black/15 flex flex-col lg:flex-row lg:items-end justify-between gap-6 bg-white">
        <div>
          <div className="font-tech text-xs uppercase tracking-wider text-neutral-600 mb-3 flex items-center gap-2 font-semibold">
            <span className="w-2 h-2 bg-[#FACC15]" />
            <span>CROSS-PLATFORM DEPLOYMENT ENGINE</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#0D0D0D] leading-[0.95]">
            WE MANAGE. WE AMPLIFY.
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-700 max-w-2xl mt-3 leading-relaxed">
            One team managing daily organic channels for creators and executing high-ROAS paid ad campaigns for brands.
          </p>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-3 px-4 py-2.5 bg-[#F4F3EF] border border-black/15 font-tech text-xs uppercase tracking-wider self-start lg:self-end">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full bg-[#10B981] opacity-75" />
            <span className="relative inline-flex h-2 w-2 bg-[#10B981]" />
          </span>
          <span className="text-[#0D0D0D] font-bold">6 Tier-1 Commercial Networks</span>
        </div>
      </div>

      {/* 2. Structured 6-Platform Grid (Desktop 6x1, Tablet 3x2, Mobile 2x3) */}
      <div className="border-b border-black/15 bg-white overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 -mr-px -mb-px">
          {PLATFORMS.map((platform) => {
            const isSelected = selectedPlatform === platform.id;

            return (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`p-5 sm:p-6 text-left flex flex-col justify-between transition-all duration-200 cursor-pointer group relative border-r border-b border-black/15 ${
                  isSelected
                    ? 'bg-[#FACC15]/10 shadow-[inset_0_0_0_2px_#FACC15]'
                    : 'bg-white hover:bg-[#F4F3EF]/70'
                }`}
              >
                {/* Selected indicator corner */}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-3 h-3 bg-[#FACC15]" />
                )}

                {/* Top Row: Icon + Badge */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div
                      className={`w-9 h-9 border flex items-center justify-center transition-transform duration-200 group-hover:scale-110 ${
                        isSelected
                          ? 'bg-[#0D0D0D] text-white border-black'
                          : 'bg-[#F4F3EF] text-[#0D0D0D] border-black/15 group-hover:bg-[#0D0D0D] group-hover:text-white'
                      }`}
                    >
                      {platform.icon('w-4 h-4')}
                    </div>
                    <span className="font-tech text-[10px] text-neutral-500 uppercase tracking-widest font-semibold hidden sm:inline">
                      {platform.badge}
                    </span>
                  </div>

                  <div className="font-tech text-sm sm:text-base font-bold text-[#0D0D0D] uppercase tracking-tight">
                    {platform.name}
                  </div>
                </div>

                {/* Bottom Row: Key Metric */}
                <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-neutral-800">
                    {platform.metric}
                  </span>
                  <span
                    className={`w-1.5 h-1.5 ${
                      isSelected ? 'bg-[#10B981]' : 'bg-neutral-300 group-hover:bg-[#10B981]'
                    } transition-colors`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Platform Interactive Spotlight Bar */}
      <div className="px-6 py-4 sm:px-10 border-b border-black/15 bg-[#EAE8E1] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="text-neutral-600 uppercase font-semibold">Network Focus:</span>
          <span className="text-[#0D0D0D] font-bold uppercase flex items-center gap-1.5 bg-white px-2 py-0.5 border border-black/15">
            {active.icon('w-3.5 h-3.5')}
            {active.name}
          </span>
          <span className="hidden md:inline text-neutral-500 font-tech">({active.badge})</span>
        </div>
        <div className="flex items-center gap-4 text-neutral-700 font-tech text-xs uppercase font-medium">
          <span className="flex items-center gap-1.5 font-bold text-[#0D0D0D]">
            <span className="w-2 h-2 bg-[#10B981]" /> Dual Organic & Paid Support
          </span>
          <span className="text-neutral-500">|</span>
          <span className="font-bold text-black">{active.metric}</span>
        </div>
      </div>

      {/* 4. Dual-Track Operational Grid (Influencer Channels vs Brand Ad Campaigns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-black/15">
        {/* Track 01: FOR CREATORS & INFLUENCERS */}
        <div className="p-6 sm:p-10 md:p-12 flex flex-col justify-between bg-white hover:bg-[#FDFDFD] transition-colors">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between gap-4 mb-3">
              <span className="font-tech text-xs text-neutral-600 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#FACC15]" />
                TRACK 01 // CREATORS & INFLUENCERS
              </span>
              <span className="px-2.5 py-1 bg-[#10B981]/15 text-[#059669] border border-[#10B981]/30 font-tech text-[10px] uppercase font-bold tracking-wider">
                100% DONE-FOR-YOU
              </span>
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#0D0D0D]">
              WE MANAGE YOUR SOCIAL ACCOUNTS
            </h3>

            <p className="font-sans text-sm text-neutral-600 mt-2 leading-relaxed">
              Complete hands-off daily channel stewardship so creators focus exclusively on recording.
            </p>

            {/* Platform Specific Highlight Box */}
            <div className="mt-6 p-4 border border-black/15 bg-[#F4F3EF] flex items-start gap-3">
              <div className="w-7 h-7 bg-[#0D0D0D] text-white flex items-center justify-center shrink-0 mt-0.5">
                {active.icon('w-3.5 h-3.5')}
              </div>
              <div className="font-sans text-xs">
                <span className="text-[#0D0D0D] font-bold block mb-0.5">{active.name} Creator Protocol:</span>
                <span className="text-neutral-700">{active.creatorDeliverable}</span>
              </div>
            </div>

            {/* 3 Metric-Driven Concrete Deliverables */}
            <div className="mt-8 space-y-3 font-sans text-xs sm:text-sm">
              <div className="p-4 border border-black/10 bg-[#FAFAF8] flex items-start gap-3.5 hover:border-black/30 transition-colors">
                <div className="w-6 h-6 bg-[#0D0D0D] text-[#FACC15] font-tech font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  01
                </div>
                <div>
                  <h4 className="font-tech text-sm font-bold text-[#0D0D0D] tracking-wide uppercase">
                    Daily Publishing Velocity & Multi-Platform Syndication
                  </h4>
                  <p className="text-neutral-600 text-xs mt-1 leading-relaxed">
                    Peak-time automated scheduling, sound trend sync, 3-sec hook testing, and simultaneous publishing across Reels, Shorts, and video channels.
                  </p>
                </div>
              </div>

              <div className="p-4 border border-black/10 bg-[#FAFAF8] flex items-start gap-3.5 hover:border-black/30 transition-colors">
                <div className="w-6 h-6 bg-[#0D0D0D] text-[#FACC15] font-tech font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  02
                </div>
                <div>
                  <h4 className="font-tech text-sm font-bold text-[#0D0D0D] tracking-wide uppercase">
                    Algorithmic Retention & Community Triage
                  </h4>
                  <p className="text-neutral-600 text-xs mt-1 leading-relaxed">
                    Audience retention drop-off fixes, thumbnail CTR A/B testing, comment engagement, and active community nurturing to accelerate follower growth.
                  </p>
                </div>
              </div>

              <div className="p-4 border border-black/10 bg-[#FAFAF8] flex items-start gap-3.5 hover:border-black/30 transition-colors">
                <div className="w-6 h-6 bg-[#0D0D0D] text-[#FACC15] font-tech font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  03
                </div>
                <div>
                  <h4 className="font-tech text-sm font-bold text-[#0D0D0D] tracking-wide uppercase">
                    Brand Inbound, Usage Rights & Monetization
                  </h4>
                  <p className="text-neutral-600 text-xs mt-1 leading-relaxed">
                    Inbound sponsor filtration, rate card pricing, licensing usage rights contracts, and Google AdSense revenue optimization.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Outcome Bar */}
          <div className="mt-8 pt-6 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div className="text-neutral-600 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#059669]" />
              <span>Result: Zero Burnout · Daily Organic Reach</span>
            </div>
            <span className="font-display font-bold text-[#0D0D0D] text-sm tracking-wide">
              +340% AUDIENCE GROWTH
            </span>
          </div>
        </div>

        {/* Track 02: FOR BRANDS & BUSINESSES */}
        <div className="p-6 sm:p-10 md:p-12 flex flex-col justify-between bg-white hover:bg-[#FDFDFD] transition-colors">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between gap-4 mb-3">
              <span className="font-tech text-xs text-neutral-600 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#10B981]" />
                TRACK 02 // BRANDS & BUSINESSES
              </span>
              <span className="px-2.5 py-1 bg-[#FACC15] text-[#0D0D0D] font-tech text-[10px] uppercase font-bold tracking-wider">
                ROAS ATTRIBUTION
              </span>
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#0D0D0D]">
              WE RUN YOUR AD CAMPAIGNS
            </h3>

            <p className="font-sans text-sm text-neutral-600 mt-2 leading-relaxed">
              Targeted high-conversion paid advertising engineered to generate direct sales, qualified leads, and measurable GMV.
            </p>

            {/* Platform Specific Highlight Box */}
            <div className="mt-6 p-4 border border-black/15 bg-[#F4F3EF] flex items-start gap-3">
              <div className="w-7 h-7 bg-[#10B981] text-[#0D0D0D] flex items-center justify-center shrink-0 mt-0.5">
                {active.icon('w-3.5 h-3.5')}
              </div>
              <div className="font-sans text-xs">
                <span className="text-[#0D0D0D] font-bold block mb-0.5">{active.name} Brand Campaign:</span>
                <span className="text-neutral-700">{active.brandDeliverable}</span>
              </div>
            </div>

            {/* 3 Metric-Driven Concrete Deliverables */}
            <div className="mt-8 space-y-3 font-sans text-xs sm:text-sm">
              <div className="p-4 border border-black/10 bg-[#FAFAF8] flex items-start gap-3.5 hover:border-black/30 transition-colors">
                <div className="w-6 h-6 bg-[#10B981] text-[#0D0D0D] font-tech font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  01
                </div>
                <div>
                  <h4 className="font-tech text-sm font-bold text-[#0D0D0D] tracking-wide uppercase">
                    Paid Meta, YouTube & X Commercial Ads
                  </h4>
                  <p className="text-neutral-600 text-xs mt-1 leading-relaxed">
                    Direct-response whitelisted creator ads, dynamic creative testing, custom audience segmentation, and multi-touch retargeting.
                  </p>
                </div>
              </div>

              <div className="p-4 border border-black/10 bg-[#FAFAF8] flex items-start gap-3.5 hover:border-black/30 transition-colors">
                <div className="w-6 h-6 bg-[#10B981] text-[#0D0D0D] font-tech font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  02
                </div>
                <div>
                  <h4 className="font-tech text-sm font-bold text-[#0D0D0D] tracking-wide uppercase">
                    Google Ads & AdSense Partner Network Arbitrage
                  </h4>
                  <p className="text-neutral-600 text-xs mt-1 leading-relaxed">
                    High-intent Google Search capture, Performance Max campaigns, targeted YouTube pre-rolls, and AdSense display retargeting.
                  </p>
                </div>
              </div>

              <div className="p-4 border border-black/10 bg-[#FAFAF8] flex items-start gap-3.5 hover:border-black/30 transition-colors">
                <div className="w-6 h-6 bg-[#10B981] text-[#0D0D0D] font-tech font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  03
                </div>
                <div>
                  <h4 className="font-tech text-sm font-bold text-[#0D0D0D] tracking-wide uppercase">
                    Full-Funnel Attribution & Budget Scaling
                  </h4>
                  <p className="text-neutral-600 text-xs mt-1 leading-relaxed">
                    First-party pixel tracking, landing page conversion rate optimization (CRO), daily creative refreshes, and aggressive ROAS scaling.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Outcome Bar */}
          <div className="mt-8 pt-6 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div className="text-neutral-600 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#059669]" />
              <span>Result: Attributed Revenue · Lower Blended CPA</span>
            </div>
            <span className="font-display font-bold text-[#059669] text-sm tracking-wide">
              4.8X AVERAGE ATTRIBUTED ROAS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
