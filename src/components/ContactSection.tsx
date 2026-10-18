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
  budget?: number;
  industry?: string;
  followers?: number;
  niche?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  budget = 7500,
  industry = 'ecommerce',
  followers = 120000,
  niche = 'lifestyle',
}) => {
  const { audience, setAudience } = useAudience();

  // Form Fields - Brand
  const [brandServices, setBrandServices] = useState<string[]>(['creative']);
  const [brandCategories, setBrandCategories] = useState<string[]>(['ecommerce']);
  const [brandBudget, setBrandBudget] = useState('2.5L-5L');
  const [brandName, setBrandName] = useState('');
  const [brandEmail, setBrandEmail] = useState('');
  const [brandPhone, setBrandPhone] = useState('');
  const [brandMessage, setBrandMessage] = useState('');

  // Form Fields - Creator
  const [creatorPlatforms, setCreatorPlatforms] = useState<string[]>(['instagram']);
  const [creatorNiches, setCreatorNiches] = useState<string[]>(['lifestyle']);
  const [creatorFollowers, setCreatorFollowers] = useState('50k-200k');
  const [creatorName, setCreatorName] = useState('');
  const [creatorEmail, setCreatorEmail] = useState('');
  const [creatorHandle, setCreatorHandle] = useState('');
  const [creatorPhone, setCreatorPhone] = useState('');
  const [creatorMessage, setCreatorMessage] = useState('');

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

  const toggleBrandService = (id: string) => {
    setBrandServices((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((s) => s !== id) : prev) : [...prev, id]
    );
  };

  const toggleBrandCategory = (id: string) => {
    setBrandCategories((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((c) => c !== id) : prev) : [...prev, id]
    );
  };

  const toggleCreatorPlatform = (id: string) => {
    setCreatorPlatforms((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((p) => p !== id) : prev) : [...prev, id]
    );
  };

  const toggleCreatorNiche = (id: string) => {
    setCreatorNiches((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((n) => n !== id) : prev) : [...prev, id]
    );
  };

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
              phone: brandPhone,
              services: brandServices.join(', '),
              categories: brandCategories.join(', '),
              budgetTier: brandBudget,
              selectedBudget: `₹${(budget * 85).toLocaleString('en-IN')}`,
              industry,
            },
            message: brandMessage,
          }
        : {
            audience: 'creator',
            name: creatorName,
            email: creatorEmail,
            details: {
              phone: creatorPhone,
              handle: creatorHandle,
              platforms: creatorPlatforms.join(', '),
              niches: creatorNiches.join(', '),
              reachRange: creatorFollowers,
              followersCount: followers.toLocaleString('en-IN'),
              niche,
            },
            message: creatorMessage,
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

  // Brand Options
  const BRAND_SERVICES = [
    { id: 'creative', label: 'Commercial Shoot' },
    { id: 'influencer', label: 'Influencer Marketing' },
    { id: 'social', label: 'Social Media Management' },
    { id: 'web', label: 'Website Design' },
    { id: 'performance', label: 'Performance Ads' },
  ];

  const BRAND_CATEGORIES = [
    { id: 'ecommerce', label: 'E-commerce / D2C' },
    { id: 'fnb', label: 'Food & Beverage' },
    { id: 'fashion', label: 'Fashion & Lifestyle' },
    { id: 'beauty', label: 'Beauty & Skincare' },
    { id: 'tech', label: 'Tech & Electronics' },
  ];

  const BRAND_BUDGETS = [
    { id: '1L-2.5L', range: '₹1,00,000 – ₹2,50,000', label: 'Starter / Single Campaign' },
    { id: '2.5L-5L', range: '₹2,50,000 – ₹5,00,000', label: 'Growth / Multi-Creator Sprint' },
    { id: '5L+', range: '₹5,00,000+', label: 'Enterprise / Full Retainer' },
  ];

  // Creator Options
  const CREATOR_PLATFORMS = [
    { id: 'instagram', label: 'Instagram' },
    { id: 'youtube', label: 'YouTube' },
    { id: 'x', label: 'X (Twitter)' },
    { id: 'facebook', label: 'Facebook' },
    { id: 'linkedin', label: 'LinkedIn' },
  ];

  const CREATOR_NICHES = [
    { id: 'lifestyle', label: 'Fashion & Lifestyle' },
    { id: 'tech', label: 'Tech & Gadgets' },
    { id: 'food', label: 'Food & Travel' },
    { id: 'fitness', label: 'Fitness & Health' },
    { id: 'business', label: 'Finance & Career' },
  ];

  const CREATOR_REACH_TIERS = [
    { id: '10k-50k', range: '10K – 50K Reach', label: 'Micro Creator Tier' },
    { id: '50k-200k', range: '50K – 200K Reach', label: 'Mid-Tier Growth Roster' },
    { id: '200k+', range: '200K+ Reach', label: 'Macro & Flagship Talent' },
  ];

  return (
    <ArchitecturalSection
      id="contact"
      className="py-16 sm:py-24 bg-[#F4F3EF] text-[#0D0D0D] border-t border-black/15"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-black/15">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-tech text-xs uppercase tracking-wider text-neutral-600 mb-3 font-semibold">
              <span className="w-2 h-2 bg-[#FACC15]" />
              <span>Convergence Portal</span>
            </div>
            <MaskedHeading
              as="h2"
              className="font-display font-black uppercase text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.9] text-[#0D0D0D]"
            >
              START YOUR CAMPAIGN.
            </MaskedHeading>
          </div>

          <div className="flex items-center gap-3 font-tech text-xs uppercase tracking-wider text-neutral-600 font-semibold">
            <span>Direct Intake</span>
            <span>·</span>
            <span>24h Response SLA</span>
          </div>
        </div>

        {/* Audience Segmented Toggle Pill (Clean UI from Reference) */}
        <div className="pt-8 flex justify-center">
          <div className="inline-flex p-1 bg-neutral-200/80 border border-black/15">
            <button
              type="button"
              onClick={() => setAudience('brand')}
              className={`px-6 py-2.5 font-tech text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                audience === 'brand'
                  ? 'bg-[#FACC15] text-[#0D0D0D] shadow-sm'
                  : 'text-neutral-700 hover:text-black'
              }`}
            >
              I Am A Brand / Client
            </button>
            <button
              type="button"
              onClick={() => setAudience('creator')}
              className={`px-6 py-2.5 font-tech text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                audience === 'creator'
                  ? 'bg-[#FACC15] text-[#0D0D0D] shadow-sm'
                  : 'text-neutral-700 hover:text-black'
              }`}
            >
              I Am A Creator / Talent
            </button>
          </div>
        </div>

        {/* Contact Form Card with Scroll Reveal */}
        <div ref={formCardRef} className="pt-8 max-w-4xl mx-auto">
          <div className="bg-white border border-black/15 p-6 sm:p-10 md:p-12 shadow-sm">
            {formStatus === 'success' ? (
              <div
                role="status"
                aria-live="polite"
                className="p-8 border border-[#10B981] bg-[#10B981]/10 space-y-6"
              >
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-[#10B981]" />
                  <span className="font-tech text-xs uppercase tracking-wider text-[#047857] font-bold">
                    Inquiry Received & Dispatched
                  </span>
                </div>
                <h3 tabIndex={-1} className="font-display font-black text-3xl sm:text-4xl uppercase text-[#0D0D0D] tracking-tight focus:outline-none">
                  Brief Successfully Prepared.
                </h3>
                <p className="font-sans text-sm text-neutral-700 leading-relaxed max-w-xl">
                  {statusMessage ||
                    'Your parameters have been recorded. Our partner desk will review and contact you within 24 business hours.'}
                </p>
                <button
                  type="button"
                  onClick={() => setFormStatus('idle')}
                  className="font-tech text-xs uppercase tracking-wider text-[#0D0D0D] hover:underline font-bold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : audience === 'brand' ? (
              /* BRAND FORM */
              <form onSubmit={handleSubmit} className="space-y-8" aria-busy={formStatus === 'submitting'}>
                {formStatus === 'error' && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="p-4 border border-[#B3261E] bg-[#B3261E]/10 flex items-center gap-3 text-red-600 font-sans text-xs"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {/* Section 1: Services Needed Chips */}
                <div className="space-y-3">
                  <label className="block font-tech text-xs uppercase tracking-wider text-neutral-800 font-bold">
                    What Services Do You Need?
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {BRAND_SERVICES.map((item) => {
                      const active = brandServices.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleBrandService(item.id)}
                          className={`px-4 py-2.5 text-xs font-tech uppercase tracking-wide border transition-all duration-200 ${
                            active
                              ? 'bg-black text-white border-black font-bold'
                              : 'bg-neutral-50 text-neutral-700 border-black/15 hover:border-black/40'
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section 2: Industry / Category Chips */}
                <div className="space-y-3">
                  <label className="block font-tech text-xs uppercase tracking-wider text-neutral-800 font-bold">
                    Your Industry / Category
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {BRAND_CATEGORIES.map((item) => {
                      const active = brandCategories.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleBrandCategory(item.id)}
                          className={`px-4 py-2.5 text-xs font-tech uppercase tracking-wide border transition-all duration-200 ${
                            active
                              ? 'bg-black text-white border-black font-bold'
                              : 'bg-neutral-50 text-neutral-700 border-black/15 hover:border-black/40'
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section 3: Monthly Budget Allocation Cards */}
                <div className="space-y-3">
                  <label className="block font-tech text-xs uppercase tracking-wider text-neutral-800 font-bold">
                    Estimated Monthly Budget
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {BRAND_BUDGETS.map((item) => {
                      const active = brandBudget === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setBrandBudget(item.id)}
                          className={`p-3.5 text-left border transition-all duration-200 flex flex-col justify-between ${
                            active
                              ? 'bg-neutral-900 text-white border-black ring-2 ring-black'
                              : 'bg-neutral-50 text-neutral-700 border-black/15 hover:border-black/40'
                          }`}
                        >
                          <span className="font-tech text-xs uppercase tracking-wide font-bold">
                            {item.range}
                          </span>
                          <span className={`font-sans text-[11px] mt-1 ${active ? 'text-neutral-300' : 'text-neutral-500'}`}>
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section 4: Contact Information Grid (Inputs with clean top-labels) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="block font-tech text-xs uppercase tracking-wider text-neutral-700 font-semibold">
                      Brand / Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lumina Lifestyle"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full bg-neutral-50 border border-black/15 px-3.5 py-2.5 text-sm text-[#0D0D0D] placeholder:text-neutral-400 focus:outline-none focus:border-black font-sans transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-tech text-xs uppercase tracking-wider text-neutral-700 font-semibold">
                      Official Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="partner@yourbrand.com"
                      value={brandEmail}
                      onChange={(e) => setBrandEmail(e.target.value)}
                      className="w-full bg-neutral-50 border border-black/15 px-3.5 py-2.5 text-sm text-[#0D0D0D] placeholder:text-neutral-400 focus:outline-none focus:border-black font-sans transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-tech text-xs uppercase tracking-wider text-neutral-700 font-semibold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98*** ***10"
                      value={brandPhone}
                      onChange={(e) => setBrandPhone(e.target.value)}
                      className="w-full bg-neutral-50 border border-black/15 px-3.5 py-2.5 text-sm text-[#0D0D0D] placeholder:text-neutral-400 focus:outline-none focus:border-black font-sans transition-colors"
                    />
                  </div>
                </div>

                {/* Section 5: Campaign Details */}
                <div className="space-y-1.5">
                  <label className="block font-tech text-xs uppercase tracking-wider text-neutral-700 font-semibold">
                    Tell Us About Your Goals & Deliverables
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your objectives, target audience, ideal creator profiles, or campaign timeline..."
                    value={brandMessage}
                    onChange={(e) => setBrandMessage(e.target.value)}
                    className="w-full bg-neutral-50 border border-black/15 px-3.5 py-2.5 text-sm text-[#0D0D0D] placeholder:text-neutral-400 focus:outline-none focus:border-black font-sans transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className={`w-full py-4 sm:py-5 bg-[#FACC15] text-[#0D0D0D] font-tech text-base sm:text-lg font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-colors ${
                      formStatus === 'submitting'
                        ? 'opacity-60 cursor-not-allowed'
                        : 'hover:bg-[#EAB308]'
                    }`}
                  >
                    <span>
                      {formStatus === 'submitting'
                        ? 'Submitting Brief...'
                        : 'Submit Campaign Brief To Partner Desk'}
                    </span>
                    <ArrowRight className="w-5 h-5 text-[#0D0D0D]" />
                  </button>
                </Magnetic>

                <div className="pt-1 text-center font-sans text-xs text-neutral-500">
                  Protected under mutual NDA. We respond to all verified inquiries within 24 hours.
                </div>
              </form>
            ) : (
              /* CREATOR FORM */
              <form onSubmit={handleSubmit} className="space-y-8" aria-busy={formStatus === 'submitting'}>
                {formStatus === 'error' && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="p-4 border border-[#B3261E] bg-[#B3261E]/10 flex items-center gap-3 text-red-600 font-sans text-xs"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {/* Section 1: Platforms Chips */}
                <div className="space-y-3">
                  <label className="block font-tech text-xs uppercase tracking-wider text-neutral-800 font-bold">
                    Primary Social Platforms
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {CREATOR_PLATFORMS.map((item) => {
                      const active = creatorPlatforms.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleCreatorPlatform(item.id)}
                          className={`px-4 py-2.5 text-xs font-tech uppercase tracking-wide border transition-all duration-200 ${
                            active
                              ? 'bg-black text-white border-black font-bold'
                              : 'bg-neutral-50 text-neutral-700 border-black/15 hover:border-black/40'
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section 2: Creator Niches Chips */}
                <div className="space-y-3">
                  <label className="block font-tech text-xs uppercase tracking-wider text-neutral-800 font-bold">
                    Content Niche & Focus
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {CREATOR_NICHES.map((item) => {
                      const active = creatorNiches.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleCreatorNiche(item.id)}
                          className={`px-4 py-2.5 text-xs font-tech uppercase tracking-wide border transition-all duration-200 ${
                            active
                              ? 'bg-black text-white border-black font-bold'
                              : 'bg-neutral-50 text-neutral-700 border-black/15 hover:border-black/40'
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section 3: Audience Reach Tier Cards */}
                <div className="space-y-3">
                  <label className="block font-tech text-xs uppercase tracking-wider text-neutral-800 font-bold">
                    Total Follower Reach
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {CREATOR_REACH_TIERS.map((item) => {
                      const active = creatorFollowers === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setCreatorFollowers(item.id)}
                          className={`p-3.5 text-left border transition-all duration-200 flex flex-col justify-between ${
                            active
                              ? 'bg-neutral-900 text-white border-black ring-2 ring-black'
                              : 'bg-neutral-50 text-neutral-700 border-black/15 hover:border-black/40'
                          }`}
                        >
                          <span className="font-tech text-xs uppercase tracking-wide font-bold">
                            {item.range}
                          </span>
                          <span className={`font-sans text-[11px] mt-1 ${active ? 'text-neutral-300' : 'text-neutral-500'}`}>
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section 4: Contact Information Grid (Inputs with clean top-labels) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="block font-tech text-xs uppercase tracking-wider text-neutral-700 font-semibold">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={creatorName}
                      onChange={(e) => setCreatorName(e.target.value)}
                      className="w-full bg-neutral-50 border border-black/15 px-3.5 py-2.5 text-sm text-[#0D0D0D] placeholder:text-neutral-400 focus:outline-none focus:border-black font-sans transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-tech text-xs uppercase tracking-wider text-neutral-700 font-semibold">
                      Primary Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@creator.com"
                      value={creatorEmail}
                      onChange={(e) => setCreatorEmail(e.target.value)}
                      className="w-full bg-neutral-50 border border-black/15 px-3.5 py-2.5 text-sm text-[#0D0D0D] placeholder:text-neutral-400 focus:outline-none focus:border-black font-sans transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-tech text-xs uppercase tracking-wider text-neutral-700 font-semibold">
                      Instagram Handle *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="@username"
                      value={creatorHandle}
                      onChange={(e) => setCreatorHandle(e.target.value)}
                      className="w-full bg-neutral-50 border border-black/15 px-3.5 py-2.5 text-sm text-[#0D0D0D] placeholder:text-neutral-400 focus:outline-none focus:border-black font-sans transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-tech text-xs uppercase tracking-wider text-neutral-700 font-semibold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={creatorPhone}
                      onChange={(e) => setCreatorPhone(e.target.value)}
                      className="w-full bg-neutral-50 border border-black/15 px-3.5 py-2.5 text-sm text-[#0D0D0D] placeholder:text-neutral-400 focus:outline-none focus:border-black font-sans transition-colors"
                    />
                  </div>
                </div>

                {/* Section 5: Creator Notes */}
                <div className="space-y-1.5">
                  <label className="block font-tech text-xs uppercase tracking-wider text-neutral-700 font-semibold">
                    Collaboration History & Brand Goals
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about brands you have worked with, your typical engagement rate, or what kind of partnerships you want..."
                    value={creatorMessage}
                    onChange={(e) => setCreatorMessage(e.target.value)}
                    className="w-full bg-neutral-50 border border-black/15 px-3.5 py-2.5 text-sm text-[#0D0D0D] placeholder:text-neutral-400 focus:outline-none focus:border-black font-sans transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className={`w-full py-4 sm:py-5 bg-[#FACC15] text-[#0D0D0D] font-tech text-base sm:text-lg font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-colors ${
                      formStatus === 'submitting'
                        ? 'opacity-60 cursor-not-allowed'
                        : 'hover:bg-[#EAB308]'
                    }`}
                  >
                    <span>
                      {formStatus === 'submitting'
                        ? 'Submitting Application...'
                        : 'Apply To O1Media Creator Roster'}
                    </span>
                    <ArrowRight className="w-5 h-5 text-[#0D0D0D]" />
                  </button>
                </Magnetic>

                <div className="pt-1 text-center font-sans text-xs text-neutral-500">
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
