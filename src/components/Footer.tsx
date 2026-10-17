import React, { useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Footer: React.FC = () => {
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wordmarkRef.current) return;

    gsap.fromTo(
      wordmarkRef.current,
      { yPercent: 35, opacity: 0.1 },
      {
        yPercent: 0,
        opacity: 0.25,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: wordmarkRef.current,
          start: 'top 95%',
          end: 'bottom bottom',
          scrub: 1
        }
      }
    );
  }, []);

  return (
    <footer className="relative bg-[#0A0A0A] text-[#F4F3EF] border-t border-white/15 pt-20 pb-12 overflow-hidden selection:bg-[#FACC15] selection:text-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Top Direct Contact Strip */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 mb-16 border-b border-white/15">
          <div className="md:col-span-8 space-y-2">
            <span className="font-tech text-xs uppercase tracking-wider text-[#FACC15] block font-semibold">
              Senior Partner Desk
            </span>
            <a
              href="mailto:partners@famo1mediaa.agency"
              className="font-tech text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white hover:text-[#FACC15] transition-colors inline-flex items-center gap-4 group"
            >
              <span>partners@famo1mediaa.agency</span>
              <ArrowUpRight className="w-8 h-8 text-[#FACC15] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          <div className="md:col-span-4 flex flex-col justify-end md:items-end font-sans text-xs text-white/60 space-y-1">
            <span className="text-white font-bold uppercase tracking-wider font-tech">Operational Hubs</span>
            <span>London · New York · Dubai</span>
            <span className="text-[#10B981] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#10B981]" />
              Accepting New Brand Partnerships
            </span>
          </div>
        </div>

        {/* 4 Column Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 pb-16 border-b border-white/15">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="font-display font-black text-2xl tracking-wider text-white">
              FamO1mediaa
            </div>
            <p className="font-sans text-xs text-white/60 leading-relaxed max-w-xs">
              A creative growth partner connecting brands, creators, and audiences through strategy, commercial production, and digital campaign execution.
            </p>
            <div className="font-sans text-xs text-white/40 uppercase tracking-wider pt-2">
              © 2026 FamO1mediaa. All Rights Reserved.
            </div>
          </div>

          {/* Brands */}
          <div className="space-y-4">
            <div className="font-tech text-xs uppercase tracking-wider text-[#FACC15] font-bold">
              For Brands
            </div>
            <ul className="space-y-2.5 font-tech text-sm uppercase text-white/70 font-medium">
              <li><a href="#services" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Scripting & Creative Strategy</a></li>
              <li><a href="#services" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Capturing & 4K Editing</a></li>
              <li><a href="#services" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Social Media Handling</a></li>
              <li><a href="#work" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Verified Campaign Case Studies</a></li>
              <li><a href="#calculator" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Deploy Brand Campaign</a></li>
            </ul>
          </div>

          {/* Creators */}
          <div className="space-y-4">
            <div className="font-tech text-xs uppercase tracking-wider text-[#FACC15] font-bold">
              For Creators
            </div>
            <ul className="space-y-2.5 font-tech text-sm uppercase text-white/70 font-medium">
              <li><a href="#services" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Talent Representation</a></li>
              <li><a href="#services" className="hover:text-white hover:translate-x-1 transition-transform inline-block">4K ProRes Video Post Desk</a></li>
              <li><a href="#calculator" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Yield Simulator Console</a></li>
              <li><a href="#calculator" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Contract Indemnity Review</a></li>
              <li><a href="#calculator" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Apply For Representation</a></li>
            </ul>
          </div>

          {/* Legal / Standards */}
          <div className="space-y-4">
            <div className="font-tech text-xs uppercase tracking-wider text-[#FACC15] font-bold">
              Governance & Standards
            </div>
            <ul className="space-y-2.5 font-tech text-sm uppercase text-white/70 font-medium">
              <li><a href="#system" className="hover:text-white hover:translate-x-1 transition-transform inline-block">4-Phase Deployment Protocol</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-transform inline-block">FTC & ASA Regulatory Filings</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Commercial Rights Indemnity</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Confidentiality Protocol</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Terms of Representation</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between font-sans text-xs uppercase tracking-wider text-white/40 pt-8 gap-4 font-medium">
          <div><span className="normal-case">FamO1mediaa</span> Creative Growth Partner · Connecting Brands & Creators</div>
          <a href="#hero" className="hover:text-[#FACC15] transition-colors flex items-center gap-2">
            <span>Back to Top</span>
            <span>↑</span>
          </a>
        </div>
      </div>

      {/* Full-Bleed Wordmark */}
      <div
        ref={wordmarkRef}
        className="w-full text-center font-display font-black tracking-[-0.04em] text-[15vw] leading-[0.78] text-white pointer-events-none select-none mt-12 overflow-hidden will-change-transform"
        aria-hidden="true"
      >
        FamO1mediaa
      </div>
    </footer>
  );
};
