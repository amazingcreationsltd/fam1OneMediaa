import React from 'react';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
import { Magnetic } from './motion/MagneticCursor';

export const AudienceFork: React.FC = () => {
  return (
    <ArchitecturalSection id="paradigm">
      {/* 12-Column Split Editorial Contrast Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-black/15">
        {/* Left 6 Columns: The Traditional Model (Raw Paper #F4F3EF) */}
        <div className="lg:col-span-6 bg-[#F4F3EF] flex flex-col justify-between">
          <div>
            {/* Header cell */}
            <div className="p-8 sm:p-12 border-b border-black/15">
              <span className="font-tech text-xs text-neutral-500 uppercase tracking-wider block mb-2 font-semibold">
                Fragmented Vendors
              </span>
              <h3 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-neutral-500">
                THE TRADITIONAL MODEL
              </h3>
            </div>

            {/* Pain point rows with clean icons */}
            <div className="divide-y divide-black/10">
              <div className="p-8 sm:p-10 flex items-start gap-4 hover:bg-black/[0.02] transition-colors">
                <span className="text-red-500 font-bold shrink-0 mt-0.5 text-base">✕</span>
                <div>
                  <h4 className="font-tech text-lg font-bold text-neutral-800">Disconnected Freelancers & Siloed Agencies</h4>
                  <p className="font-sans text-sm text-neutral-600 mt-1 leading-relaxed">
                    Copywriters, camera crews, video editors, and media buyers who never coordinate messaging or conversion funnels.
                  </p>
                </div>
              </div>

              <div className="p-8 sm:p-10 flex items-start gap-4 hover:bg-black/[0.02] transition-colors">
                <span className="text-red-500 font-bold shrink-0 mt-0.5 text-base">✕</span>
                <div>
                  <h4 className="font-tech text-lg font-bold text-neutral-800">Vanity Views With Zero Business Attribution</h4>
                  <p className="font-sans text-sm text-neutral-600 mt-1 leading-relaxed">
                    Millions of superficial views with zero customer conversions, no retention strategy, and no clear bridge from content to commerce.
                  </p>
                </div>
              </div>

              <div className="p-8 sm:p-10 flex items-start gap-4 hover:bg-black/[0.02] transition-colors">
                <span className="text-red-500 font-bold shrink-0 mt-0.5 text-base">✕</span>
                <div>
                  <h4 className="font-tech text-lg font-bold text-neutral-800">Unvetted Creator Gifting & Ghost Invoices</h4>
                  <p className="font-sans text-sm text-neutral-600 mt-1 leading-relaxed">
                    Product gifting handed out with zero usage rights contracts, no creative brief, and zero measurable revenue return.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-black/15 font-sans text-xs text-neutral-500 uppercase tracking-wider font-semibold">
            Result: High Administrative Overhead · Fragmented Execution · Stagnant Growth
          </div>
        </div>

        {/* Right 6 Columns: The Fam1 Engine (Pitch Obsidian #0D0D0D) */}
        <div className="lg:col-span-6 bg-[#0D0D0D] text-[#F4F3EF] flex flex-col justify-between">
          <div>
            {/* Header cell */}
            <div className="p-8 sm:p-12 border-b border-white/15">
              <div className="flex items-center gap-2 mb-2 font-tech text-xs text-[#FACC15] uppercase tracking-wider font-semibold">
                <span className="w-2 h-2 bg-[#FACC15]" />
                <span>Unified Growth Partner</span>
              </div>
              <h3 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-[#F4F3EF]">
                THE FAM1 ENGINE
              </h3>
            </div>

            {/* Solution rows with clean numeric counters */}
            <div className="divide-y divide-white/15">
              <div className="p-8 sm:p-10 flex items-start gap-4 hover:bg-white/[0.02] transition-colors">
                <span className="font-tech text-sm text-[#FACC15] font-bold shrink-0 mt-0.5">01</span>
                <div>
                  <h4 className="font-tech text-lg font-bold text-white">Integrated Scripting, Production & Handling</h4>
                  <p className="font-sans text-sm text-neutral-400 mt-1 leading-relaxed">
                    From the first idea to the final edit, we bring strategy, storytelling, 4K production, and daily social publishing under one roof.
                  </p>
                </div>
              </div>

              <div className="p-8 sm:p-10 flex items-start gap-4 hover:bg-white/[0.02] transition-colors">
                <span className="font-tech text-sm text-[#FACC15] font-bold shrink-0 mt-0.5">02</span>
                <div>
                  <h4 className="font-tech text-lg font-bold text-white">Vetted Creator & Influencer Collaborations</h4>
                  <p className="font-sans text-sm text-neutral-400 mt-1 leading-relaxed">
                    Direct matchmaking with relevant creators, partnership coordination, clear deliverables, and 100% commercial usage rights.
                  </p>
                </div>
              </div>

              <div className="p-8 sm:p-10 flex items-start gap-4 hover:bg-white/[0.02] transition-colors">
                <span className="font-tech text-sm text-[#FACC15] font-bold shrink-0 mt-0.5">03</span>
                <div>
                  <h4 className="font-tech text-lg font-bold text-white">Conversion-Focused Campaigns & Web Design</h4>
                  <p className="font-sans text-sm text-neutral-400 mt-1 leading-relaxed">
                    Digital advertising, local urban campaigns, and modern high-speed websites that turn audience attention into sustained revenue.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width flush CTA button at bottom */}
          <div className="border-t border-white/15">
            <Magnetic strength={0.15} className="w-full">
              <a
                href="#calculator"
                className="w-full py-6 px-8 bg-[#FACC15] text-[#0D0D0D] font-tech text-xs uppercase font-bold tracking-wider hover:bg-white transition-colors flex items-center justify-between"
              >
                <span>Initiate Strategy Assessment</span>
                <span>&rarr;</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </ArchitecturalSection>
  );
};
