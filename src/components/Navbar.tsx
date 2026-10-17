import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Magnetic } from './motion/MagneticCursor';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navDrawerRef = useRef<HTMLElement>(null);
  const topLineRef = useRef<HTMLSpanElement>(null);
  const bottomLineRef = useRef<HTMLSpanElement>(null);
  const linksSectionRef = useRef<HTMLDivElement>(null);
  const contactsSectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // 1. Smart Hide / Show Navbar on Scroll
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const header = headerRef.current;

          if (header) {
            if (currentScrollY <= 80) {
              gsap.to(header, { yPercent: 0, duration: 0.35, ease: 'power2.out' });
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
              gsap.to(header, { yPercent: -100, duration: 0.35, ease: 'power2.out' });
            } else if (currentScrollY < lastScrollY) {
              gsap.to(header, { yPercent: 0, duration: 0.35, ease: 'power2.out' });
            }
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2. Set initial position of slide-in drawer off-screen right
    if (navDrawerRef.current) {
      gsap.set(navDrawerRef.current, { x: '100%' });
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
          setMobileMenuOpen(false);
          document.body.style.overflow = '';
        },
        onStart: () => {
          setMobileMenuOpen(true);
          document.body.style.overflow = 'hidden';
        }
      });

      // Top line rotate & translate down into cross
      tl.to(
        topLineRef.current,
        {
          rotate: 45,
          y: 6,
          backgroundColor: '#0D0D0D',
          duration: 0.5,
          ease: 'expo.out'
        },
        0
      );

      // Bottom line rotate & translate up into cross
      tl.to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -6,
          backgroundColor: '#0D0D0D',
          duration: 0.5,
          ease: 'expo.out'
        },
        0
      );

      // Nav drawer slide in from right to 0%
      tl.to(
        navDrawerRef.current,
        {
          x: '0%',
          duration: 0.75,
          ease: 'expo.out'
        },
        0
      );

      // Links slide in from right with bounce
      tl.from(
        linksSectionRef.current,
        {
          x: 90,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'back.out(1.4)'
        },
        0.25
      );

      // Contacts slide in with slight bounce
      tl.from(
        contactsSectionRef.current,
        {
          x: -50,
          autoAlpha: 0,
          duration: 0.65,
          ease: 'power3.out'
        },
        0.3
      );

      timelineRef.current = tl;
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, []);

  const toggleMenu = () => {
    if (!timelineRef.current) return;
    if (mobileMenuOpen) {
      timelineRef.current.reverse();
    } else {
      timelineRef.current.play();
    }
  };

  const closeMenu = () => {
    if (!timelineRef.current) return;
    timelineRef.current.reverse();
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-40 bg-[#F4F3EF] border-b border-black/15 h-16 transition-none will-change-transform shadow-none"
      >
        <nav className="w-full h-full flex items-center justify-between" aria-label="Main Navigation">
          {/* Cell 1: Brand Cell */}
          <div className="h-full flex items-center px-4 sm:px-6 border-r border-black/15 shrink-0 gap-3">
            <a href="#hero" className="flex items-baseline gap-2.5">
              <span className="font-display text-2xl font-black uppercase tracking-tight text-[#0D0D0D]">
                FAM1MEDIA
              </span>
              <span className="font-sans text-xs text-neutral-500 font-medium tracking-wide hidden sm:inline">
                Hospitality Growth Engine
              </span>
            </a>
          </div>

          {/* Cell 2: Live Status Cell (Desktop) */}
          <div className="hidden lg:flex h-full items-center px-6 border-r border-black/15 gap-2.5 font-sans text-xs text-neutral-600 font-medium">
            <span className="w-2 h-2 bg-[#10B981] inline-block" />
            <span className="uppercase tracking-wider font-semibold text-[#0D0D0D]">Accepting Q4 Flagships</span>
            <span className="text-neutral-400">·</span>
            <span className="text-xs text-neutral-500">3–5 Spots Per District</span>
          </div>

          {/* Cell 3: Desktop Navigation Links */}
          <div className="hidden md:flex h-full items-center px-8 gap-8 font-tech text-xs uppercase tracking-wider text-neutral-700 font-semibold">
            <a href="#work" className="relative hover:text-black py-1 group transition-colors">
              <span>Case Studies</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </a>
            <a href="#system" className="relative hover:text-black py-1 group transition-colors">
              <span>Growth System</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </a>
            <a href="#services" className="relative hover:text-black py-1 group transition-colors">
              <span>Capabilities</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </a>
            <a href="#testimonials" className="relative hover:text-black py-1 group transition-colors">
              <span>Perspectives</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </a>
            <a href="#calculator" className="relative hover:text-black py-1 group transition-colors">
              <span>Yield Simulator</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </a>
          </div>

          {/* Cell 4: CTA & Mobile Hamburger Trigger */}
          <div className="h-full flex items-center border-l border-black/15 ml-auto">
            <div className="hidden sm:block h-full">
              <Magnetic strength={0.25} className="h-full">
                <a
                  href="#calculator"
                  className="h-full px-8 bg-[#FACC15] text-[#0D0D0D] font-tech text-xs uppercase font-bold tracking-wider hover:bg-[#0D0D0D] hover:text-[#F4F3EF] transition-colors flex items-center justify-center border-l border-black/15"
                >
                  Deploy Campaign &rarr;
                </a>
              </Magnetic>
            </div>

            {/* Mobile Animated Hamburger Button */}
            <div className="md:hidden h-full flex items-center px-4">
              <button
                type="button"
                onClick={toggleMenu}
                aria-label="Toggle Navigation Menu"
                className="w-12 h-12 bg-[#FACC15] cursor-pointer flex flex-col items-center justify-center gap-1.5 border border-black/20 transition-transform active:scale-95"
              >
                <span
                  ref={topLineRef}
                  className="h-[2.5px] w-6 bg-[#0D0D0D] block will-change-transform origin-center"
                />
                <span
                  ref={bottomLineRef}
                  className="h-[2.5px] w-6 bg-[#0D0D0D] block will-change-transform origin-center"
                />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Spacer so content is not hidden beneath fixed navbar */}
      <div className="h-16 w-full" aria-hidden="true" />

      {/* Fullscreen Mobile Drawer Slide-In (Obsidian Dark) */}
      <nav
        ref={navDrawerRef}
        aria-hidden={!mobileMenuOpen}
        className={`fixed inset-0 min-h-screen w-screen z-[100] flex flex-col justify-between bg-[#0A0A0A] text-[#F4F3EF] px-8 py-10 sm:px-12 sm:py-14 uppercase border-l border-white/15 md:w-[75vw] md:left-auto md:right-0 overflow-y-auto ${
          mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Drawer Header with Close Button */}
        <div className="flex items-center justify-between pb-6 border-b border-white/15 shrink-0">
          <div className="flex items-center gap-3 font-tech text-xs text-[#FACC15] uppercase tracking-wider font-bold">
            <span className="w-2 h-2 bg-[#FACC15]" />
            <span>Navigation Menu</span>
          </div>
          <button
            type="button"
            onClick={closeMenu}
            className="w-11 h-11 bg-[#FACC15] text-[#0A0A0A] flex flex-col items-center justify-center cursor-pointer border border-black/30 hover:bg-white transition-colors"
            aria-label="Close Menu"
          >
            <span className="block w-5 h-[2px] bg-black rotate-45 translate-y-[1px]" />
            <span className="block w-5 h-[2px] bg-black -rotate-45 -translate-y-[1px]" />
          </button>
        </div>

        {/* Links Section with Massive Typography */}
        <div
          ref={linksSectionRef}
          className="flex flex-col gap-4 text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight my-auto py-8 shrink-0"
        >
          <a
            href="#hero"
            onClick={closeMenu}
            className="hover:text-[#FACC15] transition-colors duration-200 flex items-baseline gap-4"
          >
            <span className="font-tech text-xs sm:text-sm text-white/30 tracking-wider">01</span>
            <span>OVERVIEW</span>
          </a>
          <a
            href="#work"
            onClick={closeMenu}
            className="hover:text-[#FACC15] transition-colors duration-200 flex items-baseline gap-4"
          >
            <span className="font-tech text-xs sm:text-sm text-white/30 tracking-wider">02</span>
            <span>WORK & REELS</span>
          </a>
          <a
            href="#system"
            onClick={closeMenu}
            className="hover:text-[#FACC15] transition-colors duration-200 flex items-baseline gap-4"
          >
            <span className="font-tech text-xs sm:text-sm text-white/30 tracking-wider">03</span>
            <span>GROWTH SYSTEM</span>
          </a>
          <a
            href="#services"
            onClick={closeMenu}
            className="hover:text-[#FACC15] transition-colors duration-200 flex items-baseline gap-4"
          >
            <span className="font-tech text-xs sm:text-sm text-white/30 tracking-wider">04</span>
            <span>CAPABILITIES</span>
          </a>
          <a
            href="#testimonials"
            onClick={closeMenu}
            className="hover:text-[#FACC15] transition-colors duration-200 flex items-baseline gap-4"
          >
            <span className="font-tech text-xs sm:text-sm text-white/30 tracking-wider">05</span>
            <span>PERSPECTIVES</span>
          </a>
          <a
            href="#calculator"
            onClick={closeMenu}
            className="hover:text-[#FACC15] transition-colors duration-200 flex items-baseline gap-4 text-[#FACC15]"
          >
            <span className="font-tech text-xs sm:text-sm text-[#FACC15]/50 tracking-wider">06</span>
            <span>PARTNER INTAKE</span>
          </a>
        </div>

        {/* Contacts & Metadata Section */}
        <div
          ref={contactsSectionRef}
          className="flex flex-col gap-6 md:flex-row md:justify-between md:items-end pt-8 border-t border-white/15 shrink-0"
        >
          <div>
            <p className="font-sans text-xs uppercase tracking-wider text-white/40 mb-1 font-semibold">
              Direct Executive Desk
            </p>
            <a
              href="mailto:partners@fam1media.agency"
              className="font-tech text-base sm:text-xl font-bold lowercase hover:text-[#FACC15] transition-colors tracking-wide text-white"
            >
              partners@fam1media.agency
            </a>
          </div>

          <div>
            <p className="font-sans text-xs uppercase tracking-wider text-white/40 mb-1 font-semibold">
              Global Office Hubs
            </p>
            <div className="flex flex-wrap gap-4 font-sans text-xs tracking-wider text-white/70 font-medium">
              <span className="hover:text-[#FACC15] cursor-pointer">SoHo, New York</span>
              <span className="text-white/20">·</span>
              <span className="hover:text-[#FACC15] cursor-pointer">Mayfair, London</span>
              <span className="text-white/20">·</span>
              <span className="hover:text-[#FACC15] cursor-pointer">DIFC, Dubai</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
