import React, { useRef } from 'react';
import { ArrowUpRight, Film, Sparkles, UtensilsCrossed, Globe2 } from 'lucide-react';
import { useGSAPScrollReveal } from '../hooks/useGSAPScrollReveal';

export const BentoServices: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAPScrollReveal(sectionRef, {
    headerSelector: '.section-header',
    itemsSelector: '.bento-item',
    stagger: 0.14,
  });

  return (
    <section ref={sectionRef} id="services" className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="section-header mb-10">
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Integrated Agency Capabilities
        </h2>
        <p className="mt-2 text-muted text-sm sm:text-base max-w-xl">
          Four specialized divisions working in concert to connect creator culture directly to commercial balance sheets.
        </p>
      </div>

      {/* Asymmetrical Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Capability 1: Marketing Campaigns (Col 7) */}
        <div className="bento-item lg:col-span-7 double-bezel group">
          <div className="double-bezel-inner p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  Full-Funnel Growth
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                Integrated Marketing Campaigns & Conversions
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-6">
                We combine precision paid media with creator-led cultural blitzes and conversion platforms. Every campaign is engineered to capture cold social attention and convert it into direct measurable revenue.
              </p>

              {/* Verified Metrics Strip */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] text-muted mb-0.5 font-medium">Attributed ROAS</div>
                  <div className="text-base font-bold text-emerald-400">4.2x Avg</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] text-muted mb-0.5 font-medium">Tracking TTFB</div>
                  <div className="text-base font-bold text-white">&lt; 380ms</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] text-muted mb-0.5 font-medium">Deploy Speed</div>
                  <div className="text-base font-bold text-accent">14 Days</div>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs font-semibold text-accent hover:text-white transition-colors"
            >
              <span>Explore Campaign Protocols</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Capability 2: Influencer Partnerships (Col 5) */}
        <div className="bento-item lg:col-span-5 double-bezel group">
          <div className="double-bezel-inner p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Film className="w-4 h-4 text-accent" />
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  Talent Matchmaking
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                Influencer Partnerships & Contract Indemnity
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-6">
                Transparent deal brokerage, verified audience demographic audits, and 100% legally bulletproof rights clearance across brand equity and creator talent.
              </p>

              {/* Retention Meter */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted font-medium">Creator Audit Threshold:</span>
                  <span className="text-white font-bold">&gt; 4.8% Verified Engagement</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-accent rounded-full w-[88%]" />
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-accent transition-colors"
            >
              <span>View Talent Matchmaking</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Capability 3: Outdoor Campaigns (Col 5) */}
        <div className="bento-item lg:col-span-5 double-bezel group">
          <div className="double-bezel-inner p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <UtensilsCrossed className="w-4 h-4 text-accent" />
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  District Blitzes
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                Outdoor Campaigns: Curated 3–5 Restaurants Per District
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-6">
                Targeted district outdoor campaigns pairing street-level attention with localized creator hosting. Only 3 to 5 premier restaurants and local businesses per district cohort.
              </p>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted">Cohort Exclusivity:</span>
                  <span className="text-white font-bold">3–5 Spots / District</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Attributed Footfall Lift:</span>
                  <span className="text-emerald-400 font-bold">+340% Average</span>
                </div>
              </div>
            </div>

            <a
              href="#outdoor"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-accent transition-colors"
            >
              <span>Explore District Rosters</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Capability 4: Hands-On Social Media Management (Col 7) */}
        <div className="bento-item lg:col-span-7 double-bezel group">
          <div className="double-bezel-inner p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Globe2 className="w-4 h-4 text-accent" />
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  Daily Cultural Relevance
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                Hands-On Social Media Management & Distribution
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-6">
                All services work together to keep your brand culturally and algorithmically relevant every single day. Daily content deployment, comment moderation, algorithmic trend-jacking, and community routing.
              </p>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] text-muted mb-0.5 font-medium">Daily Active Management</div>
                  <div className="text-base font-bold text-emerald-400">7 Days / Wk</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] text-muted mb-0.5 font-medium">3-Sec Hook Retention</div>
                  <div className="text-base font-bold text-white">84.2% Avg</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] text-muted mb-0.5 font-medium">Future Scope</div>
                  <div className="text-base font-bold text-accent">Event Mgmt</div>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs font-semibold text-accent hover:text-white transition-colors"
            >
              <span>Activate Daily Management</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
