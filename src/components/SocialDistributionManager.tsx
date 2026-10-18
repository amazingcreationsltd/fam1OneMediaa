import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MaskedHeading } from './motion/RevealWrappers';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PlatformData {
  id: string;
  name: string;
  badge: string;
  metricLabel: string;
  creatorDeliverable: string;
  brandDeliverable: string;
  icon: (className?: string) => React.ReactNode;
}

const PLATFORMS: PlatformData[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    badge: 'Meta Ecosystem',
    metricLabel: '4.2X Organic Reach',
    creatorDeliverable: 'Daily Reels scheduling, story sequence funnels, bio conversion routing, and direct message automation.',
    brandDeliverable: 'Advantage+ Story ad funnels, creator whitelisting, dynamic creative split-testing, and retargeting pixels.',
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
    badge: 'Video Network',
    metricLabel: '92% Watch-Through',
    creatorDeliverable: 'Shorts algorithmic velocity, 4K long-form video editing, CTR-optimized thumbnails, and search SEO.',
    brandDeliverable: 'In-feed video discovery ads, non-skippable pre-rolls, custom intent targeting, and creator sponsorships.',
    icon: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: 'facebook',
    name: 'Facebook',
    badge: 'Meta Business',
    metricLabel: '5.1X Attributed ROAS',
    creatorDeliverable: 'Reels cross-syndication, dedicated follower hub moderation, and active community page engagement.',
    brandDeliverable: 'Lookalike audience segmentation, dynamic catalog feeds, and multi-touch retargeting funnels.',
    icon: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    badge: 'B2B Publishing',
    metricLabel: '+310% Pipeline Lift',
    creatorDeliverable: 'Founder thought-leadership copy, editorial document carousels, and weekly industry newsletter publishing.',
    brandDeliverable: 'Account-Based Marketing (ABM), Sponsored Content, matched audience lists, and direct lead generation.',
    icon: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    badge: 'Real-Time Media',
    metricLabel: '18M+ Monthly Imp.',
    creatorDeliverable: 'Narrative editorial threads, real-time news cycle adaptation, and conversational audience building.',
    brandDeliverable: 'Trend takeover amplification, promoted video drops, branded follower cards, and conversion tracking.',
    icon: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: 'google-adsense',
    name: 'Google AdSense',
    badge: 'Ad Monetization',
    metricLabel: '+280% RPM Yield',
    creatorDeliverable: 'Content website and media hub monetization, high-RPM banner placements, and audience revenue optimization.',
    brandDeliverable: 'Google Display Network banner placements, contextual programmatic reach, and multi-channel retargeting.',
    icon: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.056 8.447a3.894 3.894 0 0 0-5.313 1.419l-3.889 6.72a3.874 3.874 0 0 0 1.415 5.293l.01.005a3.894 3.894 0 0 0 5.312-1.42l3.889-6.718a3.875 3.875 0 0 0-1.416-5.294l-.008-.005z" />
        <path d="M7.356 20.615c-1.08 1.888-3.514 2.583-5.384 1.493-1.87-1.09-2.533-3.455-1.453-5.343s3.494-2.586 5.365-1.496c1.87 1.09 2.554 3.457 1.474 5.344z" />
        <path d="M11.487 1.387a3.935 3.935 0 0 0-3.267 2.189l-3.67 6.279a4.638 4.638 0 0 0-.227.387l-2.746 4.737c1.345-.86 3.09-.993 4.55-.143a4.456 4.456 0 0 1 2.22 4.041l2.77-4.763c.082-.124.157-.252.224-.385l3.67-6.281a3.86 3.86 0 0 0-1.283-5.55 3.958 3.958 0 0 0-2.24-.511z" />
      </svg>
    ),
  },
];

export const SocialDistributionManager: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const rows = rowRefs.current.filter(Boolean);
    if (rows.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rows,
        {
          opacity: 0,
          y: 28,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            toggleActions: 'play none none reset',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);
  return (
    <section id="deployment-engine" className="w-full bg-[#F4F3EF] text-[#0D0D0D] border-t border-b border-black/15 scroll-mt-20">
      {/* 1. Section Header */}
      <div className="p-8 sm:p-12 md:p-16 border-b border-black/15 flex flex-col lg:flex-row lg:items-end justify-between gap-6 bg-[#F4F3EF]">
        <div>
          <div className="flex items-center gap-2.5 font-tech text-xs uppercase tracking-widest text-neutral-600 mb-3 font-semibold">
            <span className="w-2 h-2 bg-[#FACC15]" />
            <span>CROSS-PLATFORM DEPLOYMENT</span>
          </div>
          <MaskedHeading
            as="h2"
            className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#0D0D0D] leading-[0.92]"
          >
            ONE ECOSYSTEM. TWO GROWTH TRACKS.
          </MaskedHeading>
          <p className="font-sans text-base sm:text-lg text-neutral-700 max-w-[58ch] mt-4 leading-relaxed">
            One team managing daily organic channels for creators and executing high-ROAS paid ad campaigns for brands.
          </p>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-1 font-sans text-xs text-neutral-600 self-start lg:self-end">
          <span className="font-tech font-bold uppercase tracking-wider text-[#0D0D0D]">
            6 Active Distribution Channels
          </span>
          <span className="text-neutral-500">
            Omnichannel Organic & Paid Execution
          </span>
        </div>
      </div>

      {/* 2. Direct Large Logos Strip (No rectangular card boxes) */}
      <div className="py-10 sm:py-12 px-6 sm:px-12 border-b border-black/15 bg-[#F4F3EF]">
        <div className="max-w-7xl mx-auto grid grid-cols-3 sm:grid-cols-6 gap-8 sm:gap-12 items-center justify-items-center">
          {PLATFORMS.map((platform) => (
            <div
              key={platform.id}
              className="flex flex-col items-center gap-2.5 text-[#0D0D0D] group transition-transform duration-300 hover:scale-110"
              title={`${platform.name} · ${platform.badge}`}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-[#0D0D0D]">
                {platform.icon('w-10 h-10 sm:w-12 sm:h-12')}
              </div>
              <span className="font-tech text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0D0D0D]">
                {platform.name}
              </span>
            </div>
          ))}
        </div>

        {/* Label */}
        <div className="mt-8 text-center font-tech text-xs uppercase tracking-widest text-neutral-500 font-semibold">
          Social handles we work with.
        </div>
      </div>

      {/* 3. Dual Operational Tracks: Cardless Architectural 2-Column Split (No Cards) */}
      <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-black/15 border-b border-black/15">
        
        {/* ========================================================
            TRACK 01: FOR CREATORS & INFLUENCERS
            ======================================================== */}
        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-[#F4F3EF]">
          <div>
            {/* Track Header with locked height for perfect cross-column alignment */}
            <div className="lg:min-h-[200px] flex flex-col justify-start">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2.5 font-tech text-xs uppercase tracking-widest text-neutral-600 font-semibold">
                  <span className="w-2 h-2 bg-[#FACC15]" />
                  <span>FOR CREATORS & INFLUENCERS</span>
                </div>
                <span className="font-sans text-xs text-neutral-500 font-medium">
                  Full-Service Stewardship
                </span>
              </div>

              <MaskedHeading
                as="h3"
                className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#0D0D0D] leading-[0.95]"
              >
                WE MANAGE YOUR SOCIAL ACCOUNTS
              </MaskedHeading>

              <p className="font-sans text-base text-neutral-700 mt-3 leading-relaxed max-w-xl">
                Complete channel stewardship so creators focus exclusively on recording content.
              </p>
            </div>

            {/* 4 Pure Editorial Rows (Cardless, synchronized row heights) */}
            <div className="mt-8 divide-y divide-black/15 border-t border-b border-black/15">
              {/* Row 01 */}
              <div
                ref={(el) => {
                  rowRefs.current[0] = el;
                }}
                className="h-16 lg:h-[4.5rem] flex items-center gap-4 sm:gap-6 group will-change-transform"
              >
                <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-[#0D0D0D] transition-colors shrink-0">
                  [01]
                </span>
                <h4 className="font-tech text-sm sm:text-base font-bold text-[#0D0D0D] tracking-tight uppercase">
                  Multi-Platform Organic Syndication
                </h4>
              </div>

              {/* Row 02 */}
              <div
                ref={(el) => {
                  rowRefs.current[1] = el;
                }}
                className="h-16 lg:h-[4.5rem] flex items-center gap-4 sm:gap-6 group will-change-transform"
              >
                <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-[#0D0D0D] transition-colors shrink-0">
                  [02]
                </span>
                <h4 className="font-tech text-sm sm:text-base font-bold text-[#0D0D0D] tracking-tight uppercase">
                  Daily Publishing Velocity & Cross-Syndication
                </h4>
              </div>

              {/* Row 03 */}
              <div
                ref={(el) => {
                  rowRefs.current[2] = el;
                }}
                className="h-16 lg:h-[4.5rem] flex items-center gap-4 sm:gap-6 group will-change-transform"
              >
                <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-[#0D0D0D] transition-colors shrink-0">
                  [03]
                </span>
                <h4 className="font-tech text-sm sm:text-base font-bold text-[#0D0D0D] tracking-tight uppercase">
                  Retention Optimization & Community Engagement
                </h4>
              </div>

              {/* Row 04 */}
              <div
                ref={(el) => {
                  rowRefs.current[3] = el;
                }}
                className="h-16 lg:h-[4.5rem] flex items-center gap-4 sm:gap-6 group will-change-transform"
              >
                <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-[#0D0D0D] transition-colors shrink-0">
                  [04]
                </span>
                <h4 className="font-tech text-sm sm:text-base font-bold text-[#0D0D0D] tracking-tight uppercase">
                  Brand Inbound, Usage Rights & Monetization
                </h4>
              </div>
            </div>
          </div>

          {/* Outcome Strip */}
          <div className="mt-8 pt-6 border-t border-black/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-sans text-xs uppercase tracking-wider text-neutral-500 font-semibold block mb-0.5">
                Outcome: Zero Burnout · Daily Reach
              </span>
              <span className="font-display font-black text-2xl sm:text-3xl text-[#0D0D0D] tracking-tight">
                +340% AUDIENCE GROWTH
              </span>
            </div>

            <a
              href="#calculator"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0D0D0D] text-white hover:bg-[#FACC15] hover:text-[#0D0D0D] font-tech text-xs uppercase font-bold tracking-wider transition-colors duration-150 shrink-0"
            >
              <span>Scale My Channel</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* ========================================================
            TRACK 02: FOR BRANDS & BUSINESSES
            ======================================================== */}
        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-[#EAE8E1]/35">
          <div>
            {/* Track Header with locked height for perfect cross-column alignment */}
            <div className="lg:min-h-[200px] flex flex-col justify-start">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2.5 font-tech text-xs uppercase tracking-widest text-neutral-600 font-semibold">
                  <span className="w-2 h-2 bg-[#10B981]" />
                  <span>FOR BRANDS & BUSINESSES</span>
                </div>
                <span className="font-sans text-xs text-neutral-500 font-medium">
                  Performance Advertising
                </span>
              </div>

              <MaskedHeading
                as="h3"
                className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#0D0D0D] leading-[0.95]"
              >
                WE RUN YOUR BRAND CAMPAIGNS
              </MaskedHeading>

              <p className="font-sans text-base text-neutral-700 mt-3 leading-relaxed max-w-xl">
                Targeted high-conversion paid advertising engineered to generate direct sales, qualified leads, and measurable GMV.
              </p>
            </div>

            {/* 4 Pure Editorial Rows (Cardless, synchronized row heights) */}
            <div className="mt-8 divide-y divide-black/15 border-t border-b border-black/15">
              {/* Row 01 */}
              <div
                ref={(el) => {
                  rowRefs.current[4] = el;
                }}
                className="h-16 lg:h-[4.5rem] flex items-center gap-4 sm:gap-6 group will-change-transform"
              >
                <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-[#0D0D0D] transition-colors shrink-0">
                  [01]
                </span>
                <h4 className="font-tech text-sm sm:text-base font-bold text-[#0D0D0D] tracking-tight uppercase">
                  Cross-Network Paid Ad Placements
                </h4>
              </div>

              {/* Row 02 */}
              <div
                ref={(el) => {
                  rowRefs.current[5] = el;
                }}
                className="h-16 lg:h-[4.5rem] flex items-center gap-4 sm:gap-6 group will-change-transform"
              >
                <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-[#0D0D0D] transition-colors shrink-0">
                  [02]
                </span>
                <h4 className="font-tech text-sm sm:text-base font-bold text-[#0D0D0D] tracking-tight uppercase">
                  Paid Meta, YouTube & X Commercial Ads
                </h4>
              </div>

              {/* Row 03 */}
              <div
                ref={(el) => {
                  rowRefs.current[6] = el;
                }}
                className="h-16 lg:h-[4.5rem] flex items-center gap-4 sm:gap-6 group will-change-transform"
              >
                <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-[#0D0D0D] transition-colors shrink-0">
                  [03]
                </span>
                <h4 className="font-tech text-sm sm:text-base font-bold text-[#0D0D0D] tracking-tight uppercase">
                  Google AdSense Display & Search Network Placements
                </h4>
              </div>

              {/* Row 04 */}
              <div
                ref={(el) => {
                  rowRefs.current[7] = el;
                }}
                className="h-16 lg:h-[4.5rem] flex items-center gap-4 sm:gap-6 group will-change-transform"
              >
                <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-[#0D0D0D] transition-colors shrink-0">
                  [04]
                </span>
                <h4 className="font-tech text-sm sm:text-base font-bold text-[#0D0D0D] tracking-tight uppercase">
                  Full-Funnel Attribution & Scalable Media Buying
                </h4>
              </div>
            </div>
          </div>

          {/* Outcome Strip */}
          <div className="mt-8 pt-6 border-t border-black/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-sans text-xs uppercase tracking-wider text-neutral-500 font-semibold block mb-0.5">
                Outcome: Attributed Revenue · Lower CPA
              </span>
              <span className="font-display font-black text-2xl sm:text-3xl text-[#0D0D0D] tracking-tight">
                4.8X AVG. ATTRIBUTED ROAS
              </span>
            </div>

            <a
              href="#calculator"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0D0D0D] text-white hover:bg-[#FACC15] hover:text-[#0D0D0D] font-tech text-xs uppercase font-bold tracking-wider transition-colors duration-150 shrink-0"
            >
              <span>Deploy Brand Campaign</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
