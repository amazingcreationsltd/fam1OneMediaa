import React, { useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRAND, SITE } from '../content/site';

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
          scrub: 1,
        },
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
              Partner Desk
            </span>
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="font-tech text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white hover:text-[#FACC15] transition-colors inline-flex items-center gap-4 group"
            >
              <span>{SITE.contactEmail}</span>
              <ArrowUpRight className="w-8 h-8 text-[#FACC15] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          <div className="md:col-span-4 flex flex-col justify-end md:items-end font-sans text-xs text-white/60 space-y-1">
            <span className="text-white font-bold uppercase tracking-wider font-tech">Office Hubs</span>
            <span>London · New York · Dubai</span>
            <span className="text-[#10B981] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#10B981]" />
              {SITE.status}
            </span>
          </div>
        </div>

        {/* 4 Column Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 pb-16 border-b border-white/15">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="font-display font-black text-2xl tracking-wider text-white">
              {BRAND}
            </div>
            <p className="font-sans text-xs text-white/60 leading-relaxed max-w-xs">
              {SITE.tagline}. Strategic creative production, short-form retention, and multi-channel performance media.
            </p>
            <div className="font-sans text-xs text-white/40 uppercase tracking-wider pt-2">
              © {SITE.year} {BRAND}. All Rights Reserved.
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
              <li><a href="#work" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Campaign Case Studies</a></li>
              <li><a href="#contact" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Start a Campaign</a></li>
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
              <li><a href="#process" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Velocity Sprint Model</a></li>
              <li><a href="#contact" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Commercial Rights Clearances</a></li>
              <li><a href="#contact" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Apply For Representation</a></li>
            </ul>
          </div>

          {/* Legal / Channels */}
          <div className="space-y-4">
            <div className="font-tech text-xs uppercase tracking-wider text-[#FACC15] font-bold">
              Distribution Channels
            </div>
            <ul className="space-y-2.5 font-tech text-sm uppercase text-white/70 font-medium">
              <li><a href={SITE.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Instagram</a></li>
              <li><a href={SITE.socials.youtube} target="_blank" rel="noreferrer" className="hover:text-white hover:translate-x-1 transition-transform inline-block">YouTube</a></li>
              <li><a href={SITE.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-white hover:translate-x-1 transition-transform inline-block">LinkedIn</a></li>
              <li><a href={SITE.socials.x} target="_blank" rel="noreferrer" className="hover:text-white hover:translate-x-1 transition-transform inline-block">X (Twitter)</a></li>
              <li><a href={SITE.legal.privacy} className="hover:text-white hover:translate-x-1 transition-transform inline-block">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between font-sans text-xs uppercase tracking-wider text-white/40 pt-8 gap-4 font-medium">
          <div><span className="normal-case">{BRAND}</span> · Connecting Brands & Creators</div>
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
        {BRAND}
      </div>
    </footer>
  );
};
