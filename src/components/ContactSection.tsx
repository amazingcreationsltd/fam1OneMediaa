import React, { useState, useRef, useEffect } from 'react';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
import { MaskedHeading } from './motion/RevealWrappers';
import { Magnetic } from './motion/MagneticCursor';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { submitInquiry } from '../lib/submitInquiry';
import { useAudience } from '../context/AudienceContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface ContactSectionProps {
  budget: number;
  industry: string;
  followers: number;
  niche: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  budget,
  industry,
  followers,
  niche,
}) => {
  const { audience } = useAudience();

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

  // 4-State Machine: idle | submitting | success | error
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const formCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const el = formCardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            toggleActions: 'play none none reset',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formStatus === 'submitting') return;

    setFormStatus('submitting');
    setStatusMessage('');

    const payload: import('../lib/submitInquiry').InquiryPayload =
      audience === 'brand'
        ? {
            audience: 'brand',
            name: brandName,
            email: brandEmail,
            details: {
              targetGoal: brandGoal,
              budgetTier: brandBudget,
              selectedBudget: `$${budget.toLocaleString()}`,
              industry,
            },
            message: brandMessage,
          }
        : {
            audience: 'creator',
            name: creatorName,
            email: creatorEmail,
            details: {
              handle: creatorHandle,
              reachRange: creatorFollowers,
              followersCount: followers.toLocaleString(),
              primaryNeed: creatorNeed,
              niche,
            },
          };

    try {
      const result = await submitInquiry(payload);
      if (result.ok) {
        setFormStatus('success');
        setStatusMessage(result.message);
      } else {
        setFormStatus('error');
        setStatusMessage(result.message);
      }
    } catch (err: any) {
      setFormStatus('error');
      setStatusMessage(err.message || 'Error dispatching inquiry. Please email us directly.');
    }
  };

  return (
    <ArchitecturalSection
      dark
      id="contact"
      className="py-20 sm:py-28 bg-[#0D0D0D] text-[#F4F3EF] border-t border-white/15"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-white/15">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-tech text-xs uppercase tracking-wider text-white/50 mb-3 font-semibold">
              <span className="w-2 h-2 bg-[#FACC15]" />
              <span>Project Intake & Strategy Onboarding</span>
            </div>
            <MaskedHeading
              as="h2"
              className="font-display font-black uppercase text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.9] text-[#F4F3EF]"
            >
              Start a Project
            </MaskedHeading>
          </div>

          <div className="flex items-center gap-3 font-tech text-xs uppercase tracking-wider text-white/60 font-semibold">
            <span>Selected Budget: ${budget.toLocaleString()}</span>
            <span>·</span>
            <span>24h Response</span>
          </div>
        </div>

        {/* Contact Form Card with Scroll Reveal */}
        <div ref={formCardRef} className="pt-12 max-w-4xl mx-auto">
          <div className="bg-black/60 border border-white/15 p-6 sm:p-10 md:p-12">
            {formStatus === 'success' ? (
              <div
                role="status"
                aria-live="polite"
                className="p-8 border border-[#10B981] bg-[#10B981]/10 space-y-6"
              >
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-[#10B981]" />
                  <span className="font-tech text-xs uppercase tracking-wider text-[#10B981] font-bold">
                    Inquiry Received & Dispatched
                  </span>
                </div>
                <h3 tabIndex={-1} className="font-display font-black text-3xl sm:text-4xl uppercase text-white tracking-tight focus:outline-none">
                  Brief Successfully Prepared.
                </h3>
                <p className="font-sans text-sm text-white/80 leading-relaxed max-w-xl">
                  {statusMessage ||
                    'Your parameters have been recorded. Our partner desk will review and contact you within 24 business hours.'}
                </p>
                <button
                  type="button"
                  onClick={() => setFormStatus('idle')}
                  className="font-tech text-xs uppercase tracking-wider text-[#FACC15] hover:underline font-bold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : audience === 'brand' ? (
              <form onSubmit={handleSubmit} className="space-y-8" aria-busy={formStatus === 'submitting'}>
                {formStatus === 'error' && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="p-4 border border-[#B3261E] bg-[#B3261E]/10 flex items-center gap-3 text-red-400 font-sans text-xs"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{statusMessage}</span>
                  </div>
                )}
                <div className="space-y-2 pb-2 border-b border-white/10">
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
                    disabled={formStatus === 'submitting'}
                    className={`w-full py-5 bg-[#FACC15] text-[#0A0A0A] font-tech text-base sm:text-lg font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-colors ${
                      formStatus === 'submitting'
                        ? 'opacity-60 cursor-not-allowed'
                        : 'hover:bg-[#FACC15]/90'
                    }`}
                  >
                    <span>
                      {formStatus === 'submitting'
                        ? 'Dispatching Brief...'
                        : 'Submit Brief For Partner Review'}
                    </span>
                    <ArrowRight className="w-5 h-5 text-[#0A0A0A]" />
                  </button>
                </Magnetic>

                <div className="pt-2 text-center font-sans text-xs text-white/40">
                  Protected under mutual NDA. We respond to all verified inquiries within 24 hours.
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8" aria-busy={formStatus === 'submitting'}>
                {formStatus === 'error' && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="p-4 border border-[#B3261E] bg-[#B3261E]/10 flex items-center gap-3 text-red-400 font-sans text-xs"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{statusMessage}</span>
                  </div>
                )}
                <div className="space-y-2 pb-2 border-b border-white/10">
                  <div className="font-tech text-xs uppercase tracking-wider text-[#FACC15] font-semibold">
                    Creator Roster Intake
                  </div>
                  <h3 className="font-tech text-2xl font-bold uppercase tracking-tight text-[#F4F3EF]">
                    Apply For Talent Representation & Post Support
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Field 01 */}
                  <div className="space-y-2">
                    <label className="block font-tech text-xs uppercase tracking-wider text-white/60 font-semibold">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Chen"
                      value={creatorName}
                      onChange={(e) => setCreatorName(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#FACC15] font-sans transition-colors"
                    />
                  </div>

                  {/* Field 02 */}
                  <div className="space-y-2">
                    <label className="block font-tech text-xs uppercase tracking-wider text-white/60 font-semibold">
                      Primary Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@creator.com"
                      value={creatorEmail}
                      onChange={(e) => setCreatorEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#FACC15] font-sans transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Field 03 */}
                  <div className="space-y-2">
                    <label className="block font-tech text-xs uppercase tracking-wider text-white/60 font-semibold">
                      Primary Social Handle *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="@username (IG / TikTok / YouTube)"
                      value={creatorHandle}
                      onChange={(e) => setCreatorHandle(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#FACC15] font-sans transition-colors"
                    />
                  </div>

                  {/* Field 04 */}
                  <div className="space-y-2">
                    <label className="block font-tech text-xs uppercase tracking-wider text-white/60 font-semibold">
                      Total Audience Reach
                    </label>
                    <select
                      value={creatorFollowers}
                      onChange={(e) => setCreatorFollowers(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white focus:outline-none focus:border-[#FACC15] font-sans transition-colors"
                    >
                      <option className="bg-[#0A0A0A] text-white" value="10k-50k">10K – 50K Total Followers</option>
                      <option className="bg-[#0A0A0A] text-white" value="50k-200k">50K – 200K Total Followers</option>
                      <option className="bg-[#0A0A0A] text-white" value="200k-500k">200K – 500K Total Followers</option>
                      <option className="bg-[#0A0A0A] text-white" value="500k+">500K+ Established Reach</option>
                    </select>
                  </div>
                </div>

                {/* Field 05 */}
                <div className="space-y-2">
                  <label className="block font-tech text-xs uppercase tracking-wider text-white/60 font-semibold">
                    Primary Operational Need
                  </label>
                  <select
                    value={creatorNeed}
                    onChange={(e) => setCreatorNeed(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white focus:outline-none focus:border-[#FACC15] font-sans transition-colors"
                  >
                    <option className="bg-[#0A0A0A] text-white" value="deals">High-Ticket Brand Partnerships & Rate Defense</option>
                    <option className="bg-[#0A0A0A] text-white" value="editing">Dedicated 4K Short-Form Video Post Desk</option>
                    <option className="bg-[#0A0A0A] text-white" value="full">Full Agency Representation (Deals + Post + Web)</option>
                  </select>
                </div>

                {/* Submit Button */}
                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className={`w-full py-5 bg-[#FACC15] text-[#0A0A0A] font-tech text-base sm:text-lg font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-colors ${
                      formStatus === 'submitting'
                        ? 'opacity-60 cursor-not-allowed'
                        : 'hover:bg-[#FACC15]/90'
                    }`}
                  >
                    <span>
                      {formStatus === 'submitting'
                        ? 'Submitting Application...'
                        : 'Apply For Representation'}
                    </span>
                    <ArrowRight className="w-5 h-5 text-[#0A0A0A]" />
                  </button>
                </Magnetic>

                <div className="pt-2 text-center font-sans text-xs text-white/40">
                  Strict confidentiality guaranteed. We review all talent portfolios within 48 hours.
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </ArchitecturalSection>
  );
};
