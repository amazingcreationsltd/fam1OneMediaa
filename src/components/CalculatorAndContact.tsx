import React, { useState, useId } from 'react';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
import { MaskedHeading } from './motion/RevealWrappers';
import { Magnetic } from './motion/MagneticCursor';
import { ArrowRight } from 'lucide-react';

export const CalculatorAndContact: React.FC = () => {
  // Mode switcher
  const [audience, setAudience] = useState<'brand' | 'creator'>('brand');

  // Brand Calculator State
  const [budget, setBudget] = useState<number>(7500);
  const [industry, setIndustry] = useState<string>('ecommerce');

  // Creator Calculator State
  const [followers, setFollowers] = useState<number>(120000);
  const [niche, setNiche] = useState<string>('lifestyle');

  // Form Fields - Brand
  const [brandName, setBrandName] = useState('');
  const [brandEmail, setBrandEmail] = useState('');
  const [brandGoal, setBrandGoal] = useState('creative');
  const [brandBudget, setBrandBudget] = useState('5000-15000');
  const [brandMessage, setBrandMessage] = useState('');

  // Form Fields - Creator
  const [creatorName, setCreatorName] = useState('');
  const [creatorEmail, setCreatorEmail] = useState('');
  const [creatorHandle, setCreatorHandle] = useState('');
  const [creatorFollowers, setCreatorFollowers] = useState('50k-200k');
  const [creatorNeed, setCreatorNeed] = useState('deals');

  // Submission State
  const [isSubmitted, setIsSubmitted] = useState(false);

  const budgetInputId = useId();
  const followerInputId = useId();

  // Calculations: Brand
  const reachLow = Math.round(budget * 85);
  const reachHigh = Math.round(budget * 145);
  const creatorsCount = Math.max(2, Math.round(budget / 800));
  const creatorRange = `${creatorsCount - 1} – ${creatorsCount + 2} Verified Creators`;

  let growthDisplay = '';
  if (industry === 'ecommerce' || industry === 'consumer') {
    const roas = (3.8 + budget / 6000).toFixed(1);
    growthDisplay = `${roas}x Attributed ROAS`;
  } else {
    const liftLow = Math.min(480, Math.round(budget * 0.04 + 110));
    const liftHigh = liftLow + 90;
    growthDisplay = `+${liftLow}% – +${liftHigh}% Lift`;
  }

  // Calculations: Creator
  let multiplier = 1.0;
  if (niche === 'tech') multiplier = 1.45;
  else if (niche === 'lifestyle') multiplier = 1.15;

  const rateLow = Math.round(followers * 0.012 * multiplier);
  const rateHigh = Math.round(rateLow * 1.45);
  const dealsLow = Math.round(rateLow * 3.5);
  const dealsHigh = Math.round(rateHigh * 4.2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <ArchitecturalSection
      dark
      id="calculator"
      className="py-24 bg-[#0A0A0A] text-[#F4F3EF] border-t border-white/15"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-white/15">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-tech text-xs uppercase tracking-wider text-white/50 mb-3 font-semibold">
              <span className="w-2 h-2 bg-[#FACC15]" />
              <span>Yield Simulator & Partner Advisory</span>
            </div>
            <MaskedHeading
              as="h2"
              className="font-display font-black uppercase text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.9] text-[#F4F3EF]"
            >
              Growth Simulator & Partner Intake
            </MaskedHeading>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center border border-white/20 bg-black/40 p-1 self-start lg:self-auto font-tech text-xs uppercase tracking-wider font-semibold">
            <button
              type="button"
              onClick={() => {
                setAudience('brand');
                setIsSubmitted(false);
              }}
              className={`px-5 py-2 font-bold transition-colors ${
                audience === 'brand'
                  ? 'bg-[#FACC15] text-[#0A0A0A]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Brand & Businesses
            </button>
            <button
              type="button"
              onClick={() => {
                setAudience('creator');
                setIsSubmitted(false);
              }}
              className={`px-5 py-2 font-bold transition-colors ${
                audience === 'creator'
                  ? 'bg-[#FACC15] text-[#0A0A0A]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Creator Roster
            </button>
          </div>
        </div>

        {/* 12-Column Architectural Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/15 border-b border-white/15">
          {/* Left Column (5 Cols): Live Mathematical Simulator */}
          <div className="lg:col-span-5 p-6 sm:p-10 space-y-10">
            <div className="space-y-2">
              <div className="font-tech text-xs uppercase tracking-wider text-[#FACC15] font-semibold">
                Yield Projections
              </div>
              <h3 className="font-tech text-2xl font-bold uppercase tracking-tight text-[#F4F3EF]">
                {audience === 'brand' ? 'Campaign Yield Estimates' : 'Creator Revenue Model'}
              </h3>
              <p className="font-sans text-sm text-white/60 leading-relaxed">
                {audience === 'brand'
                  ? 'Calculated from 25+ verified brand campaigns across e-commerce, tech, and consumer lifestyle.'
                  : 'Algorithmic rate projection factoring commercial rights buyout and production overhead.'}
              </p>
            </div>

            {/* Slider & Input Matrix */}
            {audience === 'brand' ? (
              <div className="space-y-8">
                {/* Investment Range */}
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <label htmlFor={budgetInputId} className="font-tech text-xs uppercase tracking-wider text-white/70 font-semibold">
                      Monthly Campaign Investment
                    </label>
                    <span className="font-display font-black text-3xl text-[#FACC15] tabular-nums">
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
                    className="w-full h-1 bg-white/20 appearance-none cursor-pointer accent-[#FACC15]"
                  />
                  <div className="flex justify-between font-sans text-xs text-white/40 uppercase font-medium">
                    <span>$2,000 / mo</span>
                    <span>$15,000 / mo</span>
                    <span>$30,000+ / mo</span>
                  </div>
                </div>

                {/* Industry Selector */}
                <div className="space-y-3">
                  <div className="font-tech text-xs uppercase tracking-wider text-white/70 font-semibold">
                    Sector Classification
                  </div>
                  <div className="grid grid-cols-3 gap-px bg-white/15 border border-white/15">
                    {[
                      { id: 'ecommerce', label: 'E-COMMERCE' },
                      { id: 'consumer', label: 'CONSUMER' },
                      { id: 'b2b', label: 'TECH & B2B' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setIndustry(item.id)}
                        className={`py-3 px-2 font-tech text-xs font-bold uppercase tracking-wider transition-colors ${
                          industry === item.id
                            ? 'bg-[#FACC15] text-[#0A0A0A]'
                            : 'bg-[#0A0A0A] text-white/70 hover:bg-white/5'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Output Matrix */}
                <div className="border border-white/15 divide-y divide-white/15 bg-white/[0.02]">
                  <div className="p-4 flex justify-between items-center">
                    <span className="font-tech text-xs uppercase tracking-wider text-white/60 font-medium">Estimated Attributed Reach</span>
                    <span className="font-display font-bold text-xl text-[#F4F3EF] tabular-nums">
                      {(reachLow / 1000).toFixed(0)}K – {(reachHigh / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <span className="font-tech text-xs uppercase tracking-wider text-white/60 font-medium">Deployed Creator Force</span>
                    <span className="font-display font-bold text-xl text-[#F4F3EF] tabular-nums">
                      {creatorRange}
                    </span>
                  </div>
                  <div className="p-4 flex justify-between items-center bg-[#FACC15]/10">
                    <span className="font-tech text-xs uppercase tracking-wider text-[#FACC15] font-bold">Projected Campaign Yield</span>
                    <span className="font-display font-black text-2xl text-[#10B981] tabular-nums">
                      {growthDisplay}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Followers Range */}
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <label htmlFor={followerInputId} className="font-tech text-xs uppercase tracking-wider text-white/70 font-semibold">
                      Audience Reach
                    </label>
                    <span className="font-display font-black text-3xl text-[#FACC15] tabular-nums">
                      {(followers / 1000).toLocaleString()}K
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
                    className="w-full h-1 bg-white/20 appearance-none cursor-pointer accent-[#FACC15]"
                  />
                  <div className="flex justify-between font-sans text-xs text-white/40 uppercase font-medium">
                    <span>10K (Rising)</span>
                    <span>250K (Flagship)</span>
                    <span>600K+ (Tier-1)</span>
                  </div>
                </div>

                {/* Niche Selector */}
                <div className="space-y-3">
                  <div className="font-tech text-xs uppercase tracking-wider text-white/70 font-semibold">
                    Vertical Specialization
                  </div>
                  <div className="grid grid-cols-3 gap-px bg-white/15 border border-white/15">
                    {[
                      { id: 'lifestyle', label: 'LIFESTYLE' },
                      { id: 'tech', label: 'TECH & GEAR' },
                      { id: 'culture', label: 'CULTURE & ART' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setNiche(item.id)}
                        className={`py-3 px-2 font-tech text-xs font-bold uppercase tracking-wider transition-colors ${
                          niche === item.id
                            ? 'bg-[#FACC15] text-[#0A0A0A]'
                            : 'bg-[#0A0A0A] text-white/70 hover:bg-white/5'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Output Matrix */}
                <div className="border border-white/15 divide-y divide-white/15 bg-white/[0.02]">
                  <div className="p-4 flex justify-between items-center">
                    <span className="font-tech text-xs uppercase tracking-wider text-white/60 font-medium">Single Placement Floor</span>
                    <span className="font-display font-bold text-xl text-[#F4F3EF] tabular-nums">
                      ${rateLow.toLocaleString()} – ${rateHigh.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-4 flex justify-between items-center bg-[#FACC15]/10">
                    <span className="font-tech text-xs uppercase tracking-wider text-[#FACC15] font-bold">Monthly Deal Pipeline</span>
                    <span className="font-display font-black text-2xl text-[#10B981] tabular-nums">
                      ${dealsLow.toLocaleString()} – ${dealsHigh.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <span className="font-tech text-xs uppercase tracking-wider text-white/60 font-medium">4K Post-Production Desk</span>
                    <span className="font-sans text-xs font-bold text-[#FACC15] uppercase tracking-wider">
                      100% Included (Zero Fee)
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (7 Cols): Direct Advisory Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between" id="contact">
            {isSubmitted ? (
              <div className="p-8 border border-[#10B981] bg-[#10B981]/10 space-y-6 my-auto">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-[#10B981]" />
                  <span className="font-tech text-xs uppercase tracking-wider text-[#10B981] font-bold">
                    Inquiry Received & Logged
                  </span>
                </div>
                <h3 className="font-display font-black text-3xl sm:text-4xl uppercase text-white tracking-tight">
                  Brief Successfully Dispatched to Managing Partners.
                </h3>
                <p className="font-sans text-sm text-white/80 leading-relaxed max-w-xl">
                  Your parameters have been logged into our operational deal room. A partner director will complete a preliminary audit and contact you within 24 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="font-tech text-xs uppercase tracking-wider text-[#FACC15] hover:underline font-bold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : audience === 'brand' ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <div className="font-tech text-xs uppercase tracking-wider text-[#FACC15] font-semibold">
                    Advisory Intake
                  </div>
                  <h3 className="font-tech text-2xl font-bold uppercase tracking-tight text-[#F4F3EF]">
                    Initiate Brand Strategy Deployment
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Field 01 */}
                  <div className="space-y-2">
                    <label className="block font-tech text-xs uppercase tracking-wider text-white/60 font-semibold">
                      Brand or Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lumina Lifestyle Group"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#FACC15] font-sans transition-colors"
                    />
                  </div>

                  {/* Field 02 */}
                  <div className="space-y-2">
                    <label className="block font-tech text-xs uppercase tracking-wider text-white/60 font-semibold">
                      Executive Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="partner@yourbrand.com"
                      value={brandEmail}
                      onChange={(e) => setBrandEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#FACC15] font-sans transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Field 03 */}
                  <div className="space-y-2">
                    <label className="block font-tech text-xs uppercase tracking-wider text-white/60 font-semibold">
                      Primary Strategic Target
                    </label>
                    <select
                      value={brandGoal}
                      onChange={(e) => setBrandGoal(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white focus:outline-none focus:border-[#FACC15] font-sans transition-colors"
                    >
                      <option className="bg-[#0A0A0A] text-white" value="creative">Scripting & 4K Creative Production</option>
                      <option className="bg-[#0A0A0A] text-white" value="social">Social Media Handling & Account Management</option>
                      <option className="bg-[#0A0A0A] text-white" value="influencer">Influencer & Brand Collaborations</option>
                      <option className="bg-[#0A0A0A] text-white" value="campaigns">Digital & Outdoor Advertising Campaigns</option>
                      <option className="bg-[#0A0A0A] text-white" value="web">Website Design & Conversion Platform</option>
                      <option className="bg-[#0A0A0A] text-white" value="integrated">Full Ecosystem (Creative + Social + Collabs)</option>
                    </select>
                  </div>

                  {/* Field 04 */}
                  <div className="space-y-2">
                    <label className="block font-tech text-xs uppercase tracking-wider text-white/60 font-semibold">
                      Capital Allocation Tier
                    </label>
                    <select
                      value={brandBudget}
                      onChange={(e) => setBrandBudget(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white focus:outline-none focus:border-[#FACC15] font-sans transition-colors"
                    >
                      <option className="bg-[#0A0A0A] text-white" value="3000-5000">$3,000 – $5,000 / Month (Pilot)</option>
                      <option className="bg-[#0A0A0A] text-white" value="5000-15000">$5,000 – $15,000 / Month (Flagship Growth)</option>
                      <option className="bg-[#0A0A0A] text-white" value="15000+">$15,000+ / Month (Enterprise Scale)</option>
                    </select>
                  </div>
                </div>

                {/* Field 05 */}
                <div className="space-y-2">
                  <label className="block font-tech text-xs uppercase tracking-wider text-white/60 font-semibold">
                    Target Audience & Campaign Objectives
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specify target audience, ideal creator profiles, deliverables, or launch deadlines..."
                    value={brandMessage}
                    onChange={(e) => setBrandMessage(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#FACC15] font-sans transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    className="w-full py-5 bg-[#FACC15] text-[#0A0A0A] font-tech text-base sm:text-lg font-bold uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-[#FACC15]/90 transition-colors"
                  >
                    <span>Submit Brief For Partner Review</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Magnetic>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <div className="font-tech text-xs uppercase tracking-wider text-[#FACC15] font-semibold">
                    Talent Representation
                  </div>
                  <h3 className="font-tech text-2xl font-bold uppercase tracking-tight text-[#F4F3EF]">
                    Apply For Agency Roster & Post-Production Suite
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Field 01 */}
                  <div className="space-y-2">
                    <label className="block font-tech text-xs uppercase tracking-wider text-white/60 font-semibold">
                      Creator Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={creatorName}
                      onChange={(e) => setCreatorName(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#FACC15] font-sans transition-colors"
                    />
                  </div>

                  {/* Field 02 */}
                  <div className="space-y-2">
                    <label className="block font-tech text-xs uppercase tracking-wider text-white/60 font-semibold">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="elena@talentdesk.com"
                      value={creatorEmail}
                      onChange={(e) => setCreatorEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#FACC15] font-sans transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {/* Field 03 */}
                  <div className="space-y-2">
                    <label className="block font-tech text-xs uppercase tracking-wider text-white/60 font-semibold">
                      Primary Handle *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="@creatorhandle"
                      value={creatorHandle}
                      onChange={(e) => setCreatorHandle(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#FACC15] font-sans transition-colors"
                    />
                  </div>

                  {/* Field 04 */}
                  <div className="space-y-2">
                    <label className="block font-tech text-xs uppercase tracking-wider text-white/60 font-semibold">
                      Audience Reach
                    </label>
                    <select
                      value={creatorFollowers}
                      onChange={(e) => setCreatorFollowers(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white focus:outline-none focus:border-[#FACC15] font-sans transition-colors"
                    >
                      <option className="bg-[#0A0A0A] text-white" value="10k-50k">10,000 – 50,000 Followers</option>
                      <option className="bg-[#0A0A0A] text-white" value="50k-200k">50,000 – 200,000 Followers</option>
                      <option className="bg-[#0A0A0A] text-white" value="200k-500k">200,000 – 500,000 Followers</option>
                      <option className="bg-[#0A0A0A] text-white" value="500k+">500,000+ Followers (Tier-One)</option>
                    </select>
                  </div>

                  {/* Field 05 */}
                  <div className="space-y-2">
                    <label className="block font-tech text-xs uppercase tracking-wider text-white/60 font-semibold">
                      Priority Objective
                    </label>
                    <select
                      value={creatorNeed}
                      onChange={(e) => setCreatorNeed(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white focus:outline-none focus:border-[#FACC15] font-sans transition-colors"
                    >
                      <option className="bg-[#0A0A0A] text-white" value="deals">Tier-One Brand Partnerships</option>
                      <option className="bg-[#0A0A0A] text-white" value="post">Outsource 9:16 Video Post Desk</option>
                      <option className="bg-[#0A0A0A] text-white" value="mediakit">Custom Web Media Kit & Portfolio</option>
                      <option className="bg-[#0A0A0A] text-white" value="full">Full Agency Representation</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    className="w-full py-5 bg-[#FACC15] text-[#0A0A0A] font-tech text-base sm:text-lg font-bold uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-[#FACC15]/90 transition-colors"
                  >
                    <span>Submit Roster Application</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Magnetic>
              </form>
            )}
          </div>
        </div>
      </div>
    </ArchitecturalSection>
  );
};
