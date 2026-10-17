import React, { useState, useRef } from 'react';
import { CheckCircle2, ArrowUpRight, Sparkles, Building2 } from 'lucide-react';
import { useAudience } from '../context/AudienceContext';
import { useGSAPScrollReveal } from '../hooks/useGSAPScrollReveal';

export const ContactForm: React.FC = () => {
  const { audience, setAudience } = useAudience();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAPScrollReveal(sectionRef, {
    headerSelector: '.section-header',
    itemsSelector: '.contact-console',
    yOffset: 45,
  });

  // Brand fields
  const [brandName, setBrandName] = useState('');
  const [brandEmail, setBrandEmail] = useState('');
  const [brandGoal, setBrandGoal] = useState('footfall');
  const [brandBudget, setBrandBudget] = useState('5000-15000');
  const [brandMessage, setBrandMessage] = useState('');

  // Creator fields
  const [creatorName, setCreatorName] = useState('');
  const [creatorEmail, setCreatorEmail] = useState('');
  const [creatorHandle, setCreatorHandle] = useState('');
  const [creatorFollowers, setCreatorFollowers] = useState('50k-200k');
  const [creatorNeed, setCreatorNeed] = useState('deals');

  // Submission state
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBrandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleCreatorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setBrandName('');
    setBrandEmail('');
    setBrandMessage('');
    setCreatorName('');
    setCreatorEmail('');
    setCreatorHandle('');
  };

  return (
    <section ref={sectionRef} id="contact" className="py-28 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="contact-console double-bezel">
        <div className="double-bezel-inner p-8 sm:p-12">
          {/* Header */}
          <div className="section-header flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10 mb-10">
            <div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Initiate Partnership Inquiry
              </h2>
              <p className="mt-3 text-muted text-sm sm:text-base max-w-xl">
                Direct advisory intake with our senior partner team. Guaranteed confidential review within 24 hours.
              </p>
            </div>

            {/* Persona Switcher */}
            <div
              className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10 self-start md:self-auto text-xs"
              role="tablist"
              aria-label="Inquiry Type"
            >
              <button
                onClick={() => {
                  setAudience('brand');
                  setIsSubmitted(false);
                }}
                className={`px-5 py-2 font-semibold rounded-full transition-all duration-300 flex items-center gap-2 ${
                  audience === 'brand'
                    ? 'bg-accent text-white shadow-lg shadow-accent/25'
                    : 'text-muted hover:text-white'
                }`}
                role="tab"
                aria-selected={audience === 'brand'}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Brand Discovery</span>
              </button>
              <button
                onClick={() => {
                  setAudience('creator');
                  setIsSubmitted(false);
                }}
                className={`px-5 py-2 font-semibold rounded-full transition-all duration-300 flex items-center gap-2 ${
                  audience === 'creator'
                    ? 'bg-accent text-white shadow-lg shadow-accent/25'
                    : 'text-muted hover:text-white'
                }`}
                role="tab"
                aria-selected={audience === 'creator'}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Creator Representation</span>
              </button>
            </div>
          </div>

          {isSubmitted ? (
            <div className="text-center py-16 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Inquiry Received & Logged
              </h3>
              <p className="text-muted max-w-md mx-auto text-sm leading-relaxed">
                Thank you for reaching out to FamO1mediaa. A partner director will review your metrics and reply directly within 24 hours.
              </p>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/15 transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : audience === 'brand' ? (
            /* Brand Inquiry Form */
            <form onSubmit={handleBrandSubmit} className="space-y-6 max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-white mb-2">
                    Company or Restaurant Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Osteria Botanica"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-subtle border border-white/10 text-white placeholder:text-muted/60 text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white mb-2">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="partner@company.com"
                    value={brandEmail}
                    onChange={(e) => setBrandEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-subtle border border-white/10 text-white placeholder:text-muted/60 text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-white mb-2">
                    Primary Objective
                  </label>
                  <select
                    value={brandGoal}
                    onChange={(e) => setBrandGoal(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-subtle border border-white/10 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                  >
                    <option className="bg-surface text-white" value="footfall">Local Dining / Hospitality Footfall Surge</option>
                    <option className="bg-surface text-white" value="web">Conversion Web Platform & Care Plan</option>
                    <option className="bg-surface text-white" value="reels">Viral 9:16 Video Creative Production</option>
                    <option className="bg-surface text-white" value="integrated">Full Ecosystem (Footfall + Web + Video)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-2">
                    Target Monthly Investment
                  </label>
                  <select
                    value={brandBudget}
                    onChange={(e) => setBrandBudget(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-subtle border border-white/10 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                  >
                    <option className="bg-surface text-white" value="3000-5000">$3,000 – $5,000 / month</option>
                    <option className="bg-surface text-white" value="5000-15000">$5,000 – $15,000 / month</option>
                    <option className="bg-surface text-white" value="15000+">$15,000+ / month (Enterprise & Multi-Location)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-2">
                  Campaign Details or Current Footfall Challenges
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your upcoming launch, target locations, or key conversion goals..."
                  value={brandMessage}
                  onChange={(e) => setBrandMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-surface-subtle border border-white/10 text-white placeholder:text-muted/60 text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <button
                type="submit"
                className="group inline-flex items-center pl-6 pr-2 py-3 rounded-full bg-accent hover:bg-accent-hover text-white text-xs font-semibold shadow-lg shadow-accent/25 transition-all duration-300 active:scale-[0.98]"
              >
                <span>Submit Brand Audit Request</span>
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center ml-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </span>
              </button>
            </form>
          ) : (
            /* Creator Application Form */
            <form onSubmit={handleCreatorSubmit} className="space-y-6 max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-white mb-2">
                    Creator Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-subtle border border-white/10 text-white placeholder:text-muted/60 text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="elena@creator.com"
                    value={creatorEmail}
                    onChange={(e) => setCreatorEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-subtle border border-white/10 text-white placeholder:text-muted/60 text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-white mb-2">
                    Primary Handle (@) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="@elenarostova"
                    value={creatorHandle}
                    onChange={(e) => setCreatorHandle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-subtle border border-white/10 text-white placeholder:text-muted/60 text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-2">
                    Follower Reach
                  </label>
                  <select
                    value={creatorFollowers}
                    onChange={(e) => setCreatorFollowers(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-subtle border border-white/10 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                  >
                    <option className="bg-surface text-white" value="10k-50k">10,000 – 50,000 Followers</option>
                    <option className="bg-surface text-white" value="50k-200k">50,000 – 200,000 Followers</option>
                    <option className="bg-surface text-white" value="200k-500k">200,000 – 500,000 Followers</option>
                    <option className="bg-surface text-white" value="500k+">500,000+ Followers (Tier-One)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-2">
                    Primary Objective
                  </label>
                  <select
                    value={creatorNeed}
                    onChange={(e) => setCreatorNeed(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-subtle border border-white/10 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                  >
                    <option className="bg-surface text-white" value="deals">Tier-One Brand Partnerships</option>
                    <option className="bg-surface text-white" value="post">Outsource 9:16 Video Post Desk</option>
                    <option className="bg-surface text-white" value="mediakit">Custom Web Media Kit & Portfolio</option>
                    <option className="bg-surface text-white" value="full">Full Agency Representation</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="group inline-flex items-center pl-6 pr-2 py-3 rounded-full bg-accent hover:bg-accent-hover text-white text-xs font-semibold shadow-lg shadow-accent/25 transition-all duration-300 active:scale-[0.98]"
              >
                <span>Submit Roster Application</span>
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center ml-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
