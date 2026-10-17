import React, { useState, useId, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useAudience } from '../context/AudienceContext';
import { useGSAPScrollReveal } from '../hooks/useGSAPScrollReveal';

export const Calculator: React.FC = () => {
  const { audience, setAudience } = useAudience();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAPScrollReveal(sectionRef, {
    headerSelector: '.section-header',
    itemsSelector: '.calc-console',
    yOffset: 45,
  });

  // Brand state
  const [budget, setBudget] = useState<number>(7500);
  const [industry, setIndustry] = useState<string>('restaurant');

  // Creator state
  const [followers, setFollowers] = useState<number>(120000);
  const [niche, setNiche] = useState<string>('food');

  const budgetInputId = useId();
  const followerInputId = useId();

  // Brand calculations
  const reachLow = Math.round(budget * 85);
  const reachHigh = Math.round(budget * 145);
  const creatorsCount = Math.max(2, Math.round(budget / 800));
  const creatorRange = `${creatorsCount - 1} – ${creatorsCount + 2} Creators`;

  let footfallDisplay = '';
  if (industry === 'restaurant' || industry === 'retail') {
    const liftLow = Math.min(420, Math.round(budget * 0.035 + 90));
    const liftHigh = liftLow + 80;
    footfallDisplay = `+${liftLow}% – +${liftHigh}% Lift`;
  } else {
    const roas = (3.4 + budget / 10000).toFixed(1);
    footfallDisplay = `${roas}x Attributed ROAS`;
  }

  // Creator calculations
  let multiplier = 1.0;
  if (niche === 'tech') multiplier = 1.45;
  else if (niche === 'lifestyle') multiplier = 1.15;

  const rateLow = Math.round(followers * 0.012 * multiplier);
  const rateHigh = Math.round(rateLow * 1.45);
  const dealsLow = Math.round(rateLow * 3.5);
  const dealsHigh = Math.round(rateHigh * 4.2);

  return (
    <section ref={sectionRef} id="calculator" className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="calc-console double-bezel">
        <div className="double-bezel-inner p-6 sm:p-10">
          {/* Header */}
          <div className="section-header flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10 mb-8">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Campaign & Yield Simulator
              </h2>
              <p className="mt-2 text-muted text-sm sm:text-base max-w-xl">
                Model estimated footfall surges, campaign audience reach, or creator sponsorship yields based on actual agency benchmark data.
              </p>
            </div>

            {/* Model Switcher */}
            <div
              className="flex items-center p-1 rounded-full bg-white/[0.05] border border-white/10 self-start md:self-auto text-xs"
              role="tablist"
              aria-label="Simulator Mode"
            >
              <button
                onClick={() => setAudience('brand')}
                className={`px-4 py-1.5 font-semibold rounded-full transition-all duration-300 ${
                  audience === 'brand'
                    ? 'bg-accent text-white shadow-lg shadow-accent/25'
                    : 'text-muted hover:text-white'
                }`}
                role="tab"
                aria-selected={audience === 'brand'}
              >
                For Brands
              </button>
              <button
                onClick={() => setAudience('creator')}
                className={`px-4 py-1.5 font-semibold rounded-full transition-all duration-300 ${
                  audience === 'creator'
                    ? 'bg-accent text-white shadow-lg shadow-accent/25'
                    : 'text-muted hover:text-white'
                }`}
                role="tab"
                aria-selected={audience === 'creator'}
              >
                For Creators
              </button>
            </div>
          </div>

          {/* Brand Simulator Form */}
          {audience === 'brand' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Controls */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <label htmlFor={budgetInputId} className="text-sm font-semibold text-white">
                      Monthly Campaign Investment
                    </label>
                    <span className="text-xl sm:text-2xl font-black text-accent tracking-tight tabular-nums">
                      ${budget.toLocaleString()}
                    </span>
                  </div>
                  <input
                    id={budgetInputId}
                    type="range"
                    min={2000}
                    max={30000}
                    step={500}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-2 rounded-full cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-[11px] text-muted mt-1.5 font-medium">
                    <span>$2,000 / mo</span>
                    <span>$15,000 / mo</span>
                    <span>$30,000+ / mo</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-white block mb-2.5">
                    Industry Sector
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'restaurant', label: 'Dining & Hospitality' },
                      { id: 'retail', label: 'Retail & Footfall' },
                      { id: 'dtc', label: 'E-Commerce / DTC' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setIndustry(item.id)}
                        className={`p-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                          industry === item.id
                            ? 'bg-accent text-white border-accent shadow-md shadow-accent/20'
                            : 'bg-white/[0.03] text-muted border-white/10 hover:text-white hover:bg-white/[0.06]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Output Display Card */}
              <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10 space-y-5">
                <div className="text-xs text-accent font-semibold uppercase tracking-wider">
                  Projected Campaign Deliverables
                </div>

                <div className="space-y-3.5">
                  <div className="flex justify-between items-center pb-2.5 border-b border-white/10">
                    <span className="text-xs sm:text-sm text-muted">Estimated Reach:</span>
                    <span className="text-base sm:text-lg font-bold text-white tabular-nums">
                      {(reachLow / 1000).toFixed(0)}k – {(reachHigh / 1000).toFixed(0)}k Views
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-2.5 border-b border-white/10">
                    <span className="text-xs sm:text-sm text-muted">Creator Team:</span>
                    <span className="text-base sm:text-lg font-bold text-white tabular-nums">
                      {creatorRange}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-2.5 border-b border-white/10">
                    <span className="text-xs sm:text-sm text-muted">Target Conversion Lift:</span>
                    <span className="text-base sm:text-lg font-bold text-emerald-400 tabular-nums">
                      {footfallDisplay}
                    </span>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-accent hover:bg-accent-hover text-white text-xs font-semibold shadow-lg shadow-accent/25 transition-all duration-300 active:scale-[0.98]"
                >
                  <span>Lock in Campaign Dates</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            /* Creator Simulator Form */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Controls */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <label htmlFor={followerInputId} className="text-sm font-semibold text-white">
                      Verified Follower Base
                    </label>
                    <span className="text-xl sm:text-2xl font-black text-accent tracking-tight tabular-nums">
                      {(followers / 1000).toLocaleString()}K Followers
                    </span>
                  </div>
                  <input
                    id={followerInputId}
                    type="range"
                    min={10000}
                    max={600000}
                    step={10000}
                    value={followers}
                    onChange={(e) => setFollowers(Number(e.target.value))}
                    className="w-full h-2 rounded-full cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-[11px] text-muted mt-1.5 font-medium">
                    <span>10K (Rising)</span>
                    <span>250K (Established)</span>
                    <span>600K+ (Elite)</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-white block mb-2.5">
                    Content Niche
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'food', label: 'Food & Dining' },
                      { id: 'tech', label: 'Tech & Lifestyle' },
                      { id: 'lifestyle', label: 'Travel & Wellness' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setNiche(item.id)}
                        className={`p-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                          niche === item.id
                            ? 'bg-accent text-white border-accent shadow-md shadow-accent/20'
                            : 'bg-white/[0.03] text-muted border-white/10 hover:text-white hover:bg-white/[0.06]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Output Display Card */}
              <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10 space-y-5">
                <div className="text-xs text-accent font-semibold uppercase tracking-wider">
                  Projected Commercial Yield
                </div>

                <div className="space-y-3.5">
                  <div className="flex justify-between items-center pb-2.5 border-b border-white/10">
                    <span className="text-xs sm:text-sm text-muted">Single Placement:</span>
                    <span className="text-base sm:text-lg font-bold text-white tabular-nums">
                      ${rateLow.toLocaleString()} – ${rateHigh.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-2.5 border-b border-white/10">
                    <span className="text-xs sm:text-sm text-muted">Monthly Deal Pipeline:</span>
                    <span className="text-base sm:text-lg font-bold text-emerald-400 tabular-nums">
                      ${dealsLow.toLocaleString()} – ${dealsHigh.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-2.5 border-b border-white/10">
                    <span className="text-xs sm:text-sm text-muted">Post-Production Desk:</span>
                    <span className="text-base sm:text-lg font-bold text-white">
                      100% Included
                    </span>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-accent hover:bg-accent-hover text-white text-xs font-semibold shadow-lg shadow-accent/25 transition-all duration-300 active:scale-[0.98]"
                >
                  <span>Apply for Representation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
