import React from 'react';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
import { Magnetic } from './motion/MagneticCursor';

export const AudienceFork: React.FC = () => {
  return (
    <ArchitecturalSection id="paradigm" index="02" label="PARADIGM SHIFT">
      {/* 12-Column Split Stark Contrast Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-black/15">
        {/* Left 6 Columns: The Old Way (Raw Paper #F4F3EF) */}
        <div className="lg:col-span-6 bg-[#F4F3EF] flex flex-col justify-between">
          <div>
            {/* Header cell */}
            <div className="p-8 sm:p-12 border-b border-black/15">
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-2">
                [ 00 / FRAGMENTED VENDORS ]
              </span>
              <h3 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-neutral-500">
                THE OLD AGENCY MODEL
              </h3>
            </div>

            {/* Pain point rows with zero boxes */}
            <div className="divide-y divide-black/10">
              <div className="p-8 sm:p-10 flex items-start gap-4 hover:bg-black/[0.02] transition-colors">
                <span className="font-mono text-xs text-red-600 font-bold shrink-0 mt-1">[X]</span>
                <div>
                  <h4 className="font-tech text-lg font-bold text-neutral-800">Disconnected Freelancers & Agencies</h4>
                  <p className="font-sans text-sm text-neutral-600 mt-1 leading-relaxed">
                    Social media managers, food photographers, and paid media agencies who never coordinate messaging or conversion funnels.
                  </p>
                </div>
              </div>

              <div className="p-8 sm:p-10 flex items-start gap-4 hover:bg-black/[0.02] transition-colors">
                <span className="font-mono text-xs text-red-600 font-bold shrink-0 mt-1">[X]</span>
                <div>
                  <h4 className="font-tech text-lg font-bold text-neutral-800">Vanity Likes With Zero Footfall Attribution</h4>
                  <p className="font-sans text-sm text-neutral-600 mt-1 leading-relaxed">
                    Millions of viral TikTok views from users across the world who will never book a physical table in your district.
                  </p>
                </div>
              </div>

              <div className="p-8 sm:p-10 flex items-start gap-4 hover:bg-black/[0.02] transition-colors">
                <span className="font-mono text-xs text-red-600 font-bold shrink-0 mt-1">[X]</span>
                <div>
                  <h4 className="font-tech text-lg font-bold text-neutral-800">Unvetted Creator Gifting & Ghost Invoices</h4>
                  <p className="font-sans text-sm text-neutral-600 mt-1 leading-relaxed">
                    Free dining tables handed out with zero usage rights contracts, no licensing ownership, and zero measurable revenue return.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-black/15 font-mono text-xs text-neutral-500 uppercase tracking-wider">
            STATUS: HIGH OVERHEAD · ZERO REVENUE DEFENSE
          </div>
        </div>

        {/* Right 6 Columns: The Fam1 Engine (Pitch Obsidian #0D0D0D) */}
        <div className="lg:col-span-6 bg-[#0D0D0D] text-[#F4F3EF] flex flex-col justify-between">
          <div>
            {/* Header cell */}
            <div className="p-8 sm:p-12 border-b border-white/15">
              <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#FACC15] uppercase tracking-widest">
                <span className="w-2 h-2 bg-[#FACC15]" />
                <span>[ 01 / UNIFIED REVENUE ARCHITECTURE ]</span>
              </div>
              <h3 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-[#F4F3EF]">
                THE FAM1 GROWTH ENGINE
              </h3>
            </div>

            {/* Solution rows with sharp [01] indices */}
            <div className="divide-y divide-white/15">
              <div className="p-8 sm:p-10 flex items-start gap-4 hover:bg-white/[0.02] transition-colors">
                <span className="font-mono text-xs text-[#FACC15] font-bold shrink-0 mt-1">[01]</span>
                <div>
                  <h4 className="font-tech text-lg font-bold text-white">Curated 3–5 Restaurants Per District</h4>
                  <p className="font-sans text-sm text-neutral-400 mt-1 leading-relaxed">
                    We only accept non-competing premier flagships in each district, flooding the neighborhood with coordinated outdoor and creator buzz.
                  </p>
                </div>
              </div>

              <div className="p-8 sm:p-10 flex items-start gap-4 hover:bg-white/[0.02] transition-colors">
                <span className="font-mono text-xs text-[#FACC15] font-bold shrink-0 mt-1">[02]</span>
                <div>
                  <h4 className="font-tech text-lg font-bold text-white">Daily Social Handling + Creator Trio Desk</h4>
                  <p className="font-sans text-sm text-neutral-400 mt-1 leading-relaxed">
                    In-house scripting, 4K multicam capturing, retention editing, and 7-day community management with 48h turnaround SLAs.
                  </p>
                </div>
              </div>

              <div className="p-8 sm:p-10 flex items-start gap-4 hover:bg-white/[0.02] transition-colors">
                <span className="font-mono text-xs text-[#FACC15] font-bold shrink-0 mt-1">[03]</span>
                <div>
                  <h4 className="font-tech text-lg font-bold text-white">Direct Cover Tracking & Conversion Tech</h4>
                  <p className="font-sans text-sm text-neutral-400 mt-1 leading-relaxed">
                    Sub-400ms booking landers and table reservation platforms that track every single seat directly back to creator campaigns.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width flush CTA button at bottom */}
          <div className="border-t border-white/15">
            <Magnetic strength={0.15} className="w-full">
              <a
                href="#contact"
                className="w-full py-6 px-8 bg-[#FACC15] text-[#0D0D0D] font-mono text-xs uppercase font-bold tracking-[0.2em] hover:bg-white transition-colors flex items-center justify-between"
              >
                <span>INITIATE DISTRICT ASSESSMENT</span>
                <span>&rarr;</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </ArchitecturalSection>
  );
};
