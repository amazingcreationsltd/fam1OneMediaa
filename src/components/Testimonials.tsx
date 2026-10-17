import React from 'react';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
import { MaskedHeading } from './motion/RevealWrappers';

/**
 * ONE JOB: High-craft, obsidian-ground editorial testimonial marquee wall.
 * Inverts the page rhythm into a deep architectural dark gallery (#0C0C0C),
 * solving the eight-identical-sections light monotony while providing
 * high-contrast, editorial typography and crisp 5-star rating badges.
 */

type Review = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  metric?: string;
  type: 'BRAND' | 'CREATOR';
};

const ROW_A: Review[] = [
  {
    quote: "Turned our product launch into an integrated movement: scripted concepts, creator matchmaking, and a high-converting site. Immediate sellout.",
    name: "Julian Vance",
    role: "Founder & CEO, Lumina Lifestyle",
    initials: "JV",
    metric: "4.8× ROAS",
    type: "BRAND",
  },
  {
    quote: "Took 4K video post-production completely off my plate. My hook retention surged while I focused 100% on creative storytelling.",
    name: "Sarah Chen",
    role: "Visual Storyteller · 480K Audience",
    initials: "SC",
    metric: "+40% Retention",
    type: "CREATOR",
  },
  {
    quote: "The 48-hour cut turnaround is real. No delays, kinetic pacing, and audio mastering that holds attention in the first 3 seconds.",
    name: "Marcus Vance",
    role: "Creative Director, Apex Apparel",
    initials: "MV",
    metric: "48h Delivery",
    type: "BRAND",
  },
  {
    quote: "Every partnership contract had clear usage rights and deliverables locked before filming. Zero ambiguity, seamless execution.",
    name: "Elena Rostova",
    role: "Digital Creator · 620K Followers",
    initials: "ER",
    metric: "Usage Cleared",
    type: "CREATOR",
  },
];

const ROW_B: Review[] = [
  {
    quote: "Our paid social ads were burning budget with weak retention. Fam1Media restructured our 3-second visual hooks and doubled conversions.",
    name: "Kofi Mensah",
    role: "Growth Lead, Kinetix OS",
    initials: "KM",
    metric: "+310% Signups",
    type: "BRAND",
  },
  {
    quote: "They don't just connect you with brands; they defend your rate card and handle commercial agreements with extreme professionalism.",
    name: "Chloe Davies",
    role: "Lifestyle & Fitness Creator",
    initials: "CD",
    metric: "Tier-1 Sponsors",
    type: "CREATOR",
  },
  {
    quote: "Full-funnel execution under one roof: commercial shoots, sound design, and custom landers that load under 400ms.",
    name: "Idris Bello",
    role: "Marketing Director, Verve Botanicals",
    initials: "IB",
    metric: "18.2M Reach",
    type: "BRAND",
  },
  {
    quote: "The weekly reporting reviews give clear creative feedback loops. We know exactly which creative arcs are moving the revenue needle.",
    name: "Sofia Lindqvist",
    role: "Brand Operations, Cadence",
    initials: "SL",
    metric: "Weekly Cadence",
    type: "BRAND",
  },
];

const ROW_C: Review[] = [
  {
    quote: "Working with their post-production desk felt like having a top Hollywood editor in our pocket. Clean color grades and crisp sound design.",
    name: "Tobias Reinhardt",
    role: "Documentary & Tech Creator",
    initials: "TR",
    metric: "4K Mastered",
    type: "CREATOR",
  },
  {
    quote: "Integrated billboard activation and localized creator sparking in SoHo drove unprecedented brand search volume across the quarter.",
    name: "Grace Okonkwo",
    role: "Campaign Lead, Verve City Takeover",
    initials: "GO",
    metric: "+290% Search",
    type: "BRAND",
  },
  {
    quote: "No agency fluff or vague vanity metrics. Direct, reliable creative partnership that respects project timelines and delivers quality.",
    name: "Anya Petrova",
    role: "Head of Digital, Lumina Sound",
    initials: "AP",
    metric: "8.6M Views",
    type: "BRAND",
  },
  {
    quote: "From the storyboard lock to final distribution, Fam1Media operates like a high-performance newsroom. Genuinely impressed.",
    name: "Priya Nair",
    role: "Brand Strategist, Meridian",
    initials: "PN",
    metric: "Rapid Cadence",
    type: "BRAND",
  },
];

/* High-End Architectural Card with Subtle Micro-Border and Star Accents */
function MarqueeCard({ r }: { r: Review }) {
  return (
    <figure className="w-[21rem] sm:w-[24rem] shrink-0 bg-[#141414] hover:bg-[#1A1A1A] border border-white/10 hover:border-white/20 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 select-none text-left relative group">
      <div>
        {/* Top Header: Star Rating + Verified Metric */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-1" aria-label="Rated 5 out of 5 stars">
            {[0, 1, 2, 3, 4].map((s) => (
              <svg
                key={s}
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5 fill-[#FACC15]"
                aria-hidden="true"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>

          {r.metric && (
            <span className="font-mono text-[10px] text-[#FACC15] bg-white/[0.04] px-2.5 py-0.5 border border-white/15 uppercase tracking-wider font-semibold">
              {r.metric}
            </span>
          )}
        </div>

        {/* Editorial Quote */}
        <blockquote className="mt-5 font-sans text-sm sm:text-[15px] leading-relaxed text-[#F4F3EF]/90 font-normal">
          “{r.quote}”
        </blockquote>
      </div>

      {/* Author Details with Monogram Avatar */}
      <figcaption className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3.5">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center bg-[#FACC15] text-[#0D0D0D] font-mono text-xs font-bold"
          aria-hidden="true"
        >
          {r.initials}
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-tech font-bold uppercase tracking-tight text-[#F4F3EF]">
            <span className="truncate">{r.name}</span>
            <span className="text-[#34D399] font-mono text-xs" title="Verified Client">✓</span>
          </div>
          <div className="text-[11px] font-sans text-white/50 truncate uppercase tracking-wider">
            {r.role}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

/* Infinite Marquee Row */
function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: Review[];
  direction: 'l' | 'r';
  duration: number;
}) {
  return (
    <div className="atest-mq group relative overflow-hidden w-full">
      <div
        className="atest-mq-track flex w-max gap-5"
        style={{
          animationName: direction === 'l' ? 'atest-mq-l' : 'atest-mq-r',
          animationDuration: `${duration}s`,
        }}
      >
        {[...items, ...items, ...items, ...items].map((r, i) => (
          <MarqueeCard key={`${r.name}-${i}`} r={r} />
        ))}
      </div>
    </div>
  );
}

export const Testimonials: React.FC = () => {
  return (
    <ArchitecturalSection
      id="testimonials"
      dark
      className="py-24 sm:py-32 bg-[#0C0C0C] text-[#F4F3EF] border-t border-white/15 relative overflow-hidden"
    >
      <style>{`
        @keyframes atest-mq-l { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes atest-mq-r { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .atest-mq-track { animation-timing-function: linear; animation-iteration-count: infinite; will-change: transform; }
        .atest-mq:hover .atest-mq-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .atest-mq-track { animation: none; }
        }
      `}</style>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-14 sm:mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/15">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-tech text-xs uppercase tracking-wider text-white/60 mb-3 font-semibold">
              <span className="w-2 h-2 bg-[#FACC15]" />
              <span>Client Perspectives & Feedback</span>
            </div>
            <MaskedHeading
              as="h2"
              className="font-display font-black uppercase text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.9] text-[#F4F3EF]"
            >
              Partner Perspectives
            </MaskedHeading>
          </div>
          <div className="flex items-center gap-4 text-xs font-tech uppercase tracking-wider text-white/50 font-semibold">
            <span className="flex items-center gap-1.5 text-[#FACC15]">
              ★ 4.9 Average Rating
            </span>
            <span>·</span>
            <span>Hover to Pause</span>
          </div>
        </div>
      </div>

      {/* Infinite 3-Row Smooth Marquee Wall with Deep Mask Gradients */}
      <div className="relative flex flex-col gap-5 sm:gap-6 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <MarqueeRow items={ROW_A} direction="l" duration={42} />
        <MarqueeRow items={ROW_B} direction="r" duration={50} />
        <MarqueeRow items={ROW_C} direction="l" duration={46} />
      </div>

      {/* Legacy 2-Column Section Hidden/Commented Out Below per instructions */}
      {/*
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-black/15 border-b border-black/15">
          <div className="p-8 sm:p-12 flex flex-col justify-between">
            <div className="font-display font-black text-5xl">+40%</div>
            <blockquote>“Fam1Media aligned me with top-tier brand partnerships and took 4K video post-production completely off my plate.”</blockquote>
            <div>Sarah Chen · Visual Storyteller</div>
          </div>
          <div className="p-8 sm:p-12 flex flex-col justify-between">
            <div className="font-display font-black text-5xl">4.8X ROAS</div>
            <blockquote>“Fam1Media turned our product launch into an integrated movement.”</blockquote>
            <div>Julian Vance · Founder & CEO, Lumina Lifestyle Group</div>
          </div>
        </div>
      </div>
      */}
    </ArchitecturalSection>
  );
};
