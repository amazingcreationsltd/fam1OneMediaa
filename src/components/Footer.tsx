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
      { yPercent: 40, opacity: 0.1 },
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
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FACC15] block">
              // DIRECT SENIOR PARTNER DESK
            </span>
            <a
              href="mailto:partners@fam1media.agency"
              className="font-tech text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white hover:text-[#FACC15] transition-colors inline-flex items-center gap-4 group"
            >
              <span>partners@fam1media.agency</span>
              <ArrowUpRight className="w-8 h-8 text-[#FACC15] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          <div className="md:col-span-4 flex flex-col justify-end md:items-end font-mono text-xs text-white/50 space-y-1">
            <span className="text-white font-bold uppercase tracking-wider">OPERATIONAL HUBS</span>
            <span>LONDON // NEW YORK // DUBAI</span>
            <span className="text-[#10B981] font-bold">● SYSTEM STATUS: NOMINAL</span>
          </div>
        </div>

        {/* 4 Column Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 pb-16 border-b border-white/15">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="font-display font-black text-2xl tracking-wider text-white uppercase">
              FAM1MEDIA
            </div>
            <p className="font-sans text-xs text-white/60 leading-relaxed max-w-xs">
              Full-stack growth architecture for restaurants and hospitality flagships. Uniting local district blitzes with creator commercial representation.
            </p>
            <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest pt-2">
              EST. 2026 // ALL RIGHTS RESERVED
            </div>
          </div>

          {/* Brands */}
          <div className="space-y-4">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#FACC15] font-bold">
              [FOR BRANDS]
            </div>
            <ul className="space-y-2.5 font-tech text-sm uppercase text-white/70">
              <li><a href="#fork" className="hover:text-white hover:translate-x-1 transition-transform inline-block">District Footfall Blitz</a></li>
              <li><a href="#services" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Sub-Second Booking Landers</a></li>
              <li><a href="#services" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Monthly SLA Maintenance</a></li>
              <li><a href="#portfolio" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Verified Dining Case Studies</a></li>
              <li><a href="#calculator" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Lock In District Dates</a></li>
            </ul>
          </div>

          {/* Creators */}
          <div className="space-y-4">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#FACC15] font-bold">
              [FOR CREATORS]
            </div>
            <ul className="space-y-2.5 font-tech text-sm uppercase text-white/70">
              <li><a href="#services" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Talent Representation</a></li>
              <li><a href="#services" className="hover:text-white hover:translate-x-1 transition-transform inline-block">4K ProRes Video Post Desk</a></li>
              <li><a href="#calculator" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Yield Simulator Console</a></li>
              <li><a href="#calculator" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Contract Indemnity Review</a></li>
              <li><a href="#calculator" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Apply For Representation</a></li>
            </ul>
          </div>

          {/* Legal / Standards */}
          <div className="space-y-4">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#FACC15] font-bold">
              [GOVERNANCE]
            </div>
            <ul className="space-y-2.5 font-tech text-sm uppercase text-white/70">
              <li><a href="#workflow" className="hover:text-white hover:translate-x-1 transition-transform inline-block">4-Phase Deployment Protocol</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-transform inline-block">FTC & ASA Regulatory Filings</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Commercial Rights Indemnity</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Confidentiality Protocol</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Terms of Representation</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between font-mono text-[11px] uppercase tracking-wider text-white/40 pt-8 gap-4">
          <div>FAM1MEDIA ARCHITECTURAL PLATFORM // SWISS-BRUTALIST PROTOCOL</div>
          <a href="#hero" className="hover:text-[#FACC15] transition-colors flex items-center gap-2">
            <span>RETURN TO SUMMIT</span>
            <span>↑</span>
          </a>
        </div>
      </div>

      {/* Full-Bleed Brutalist Wordmark */}
      <div
        ref={wordmarkRef}
        className="w-full text-center font-display font-black tracking-[-0.04em] text-[17vw] leading-[0.78] uppercase text-white pointer-events-none select-none mt-12 overflow-hidden will-change-transform"
        aria-hidden="true"
      >
        FAM1MEDIA
      </div>
    </footer>
  );
};
