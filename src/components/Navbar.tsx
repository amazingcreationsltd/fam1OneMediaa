import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Magnetic } from './motion/MagneticCursor';

interface NavbarProps {
  isLoaded?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isLoaded = true }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navDrawerRef = useRef<HTMLElement>(null);
  const topLineRef = useRef<HTMLSpanElement>(null);
  const bottomLineRef = useRef<HTMLSpanElement>(null);
  const linksSectionRef = useRef<HTMLDivElement>(null);
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

      // Top line rotate and move down to exact center
      tl.to(
        topLineRef.current,
        {
          rotate: 45,
          y: 4,
          duration: 1,
          ease: 'expo.out'
        },
        0
      );

      // Bottom line rotate and move up to exact center
      tl.to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -4,
          duration: 1,
          ease: 'expo.out'
        },
        '<'
      );

      // Menu slide in (right to left)
      tl.to(
        navDrawerRef.current,
        {
          x: '0%',
          duration: 1,
          ease: 'expo.out'
        },
        '<'
      );

      // Links slide in (right to left)
      tl.from(
        linksSectionRef.current,
        {
          x: 100,
          autoAlpha: 0,
          duration: 1,
          ease: 'back.out'
        },
        '<0.3'
      );

      timelineRef.current = tl;
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, []);

  // Smooth entrance when preloader completes
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    if (!isLoaded) {
      gsap.set(header, { yPercent: -100, opacity: 0, visibility: 'hidden' });
    } else {
      gsap.to(header, {
        yPercent: 0,
        opacity: 1,
        visibility: 'visible',
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.1,
      });
    }
  }, [isLoaded]);

  // Escape key and focus management for mobile drawer
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    hamburgerButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      hamburgerButtonRef.current?.focus();
    };
  }, [mobileMenuOpen]);

  const toggleMenu = () => {
    if (!timelineRef.current) return;
    if (mobileMenuOpen) {
      timelineRef.current.reverse();
    } else {
      timelineRef.current.play(0);
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
        className="fixed top-0 left-0 w-full z-50 bg-[#F4F3EF] border-b border-black/15 h-16 transition-none will-change-transform shadow-none"
      >
        <nav className="w-full h-full flex items-center justify-between" aria-label="Main Navigation">
          {/* Cell 1: Brand Cell */}
          <div className="h-full flex items-center px-4 sm:px-6 border-r border-black/15 shrink-0 gap-3 min-w-0">
            <a href="#hero" className="flex items-baseline gap-2.5">
              <span className="font-display text-2xl font-black tracking-tight text-[#0D0D0D]">
                famO1Mediaa
              </span>
              <span className="font-sans text-xs text-neutral-500 font-medium tracking-wide hidden xl:inline">
                Creative Growth Partner
              </span>
            </a>
          </div>

          {/* Cell 2: Desktop Navigation Links (Visible on lg and above to prevent mid-width collision) */}
          <div className="hidden lg:flex h-full items-center px-6 xl:px-8 gap-6 xl:gap-8 font-tech text-xs uppercase tracking-wider text-neutral-700 font-semibold min-w-0">
            <a href="#work" className="relative hover:text-black py-1 group transition-colors">
              <span>Work</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </a>
            <a href="#process" className="relative hover:text-black py-1 group transition-colors">
              <span>Process</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </a>
            <a href="#services" className="relative hover:text-black py-1 group transition-colors">
              <span>Services</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </a>
            <a href="#testimonials" className="relative hover:text-black py-1 group transition-colors">
              <span>Clients</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </a>
            <a href="#contact" className="relative hover:text-black py-1 group transition-colors">
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </a>
          </div>

          {/* Cell 3: CTA & Mobile Hamburger Trigger */}
          <div className="h-full flex items-center border-l border-black/15 ml-auto shrink-0">
            <div className="hidden sm:block h-full">
              <Magnetic strength={0.25} className="h-full">
                <a
                  href="#contact"
                  className="h-full px-6 xl:px-8 bg-[#FACC15] text-[#0D0D0D] font-tech text-xs uppercase font-bold tracking-wider hover:bg-[#0D0D0D] hover:text-[#F4F3EF] transition-colors flex items-center justify-center border-l border-black/15"
                >
                  Start a campaign &rarr;
                </a>
              </Magnetic>
            </div>

            {/* Placeholder preserving cell spacing for fixed morphing button */}
            <div className="lg:hidden h-full flex items-center px-4">
              <div className="w-12 h-12" aria-hidden="true" />
            </div>
          </div>
        </nav>
      </header>

      {/* Spacer so content is not hidden beneath fixed navbar */}
      <div className="h-16 w-full" aria-hidden="true" />

      {/* Fullscreen Mobile Drawer Slide-In (Translucent Obsidian Dark) */}
      <nav
        ref={navDrawerRef}
        aria-hidden={!mobileMenuOpen}
        {...(!mobileMenuOpen ? { inert: '' } : {})}
        style={{
          backgroundColor: 'rgba(10, 10, 10, 0.92)',
          backdropFilter: 'blur(29px)',
          WebkitBackdropFilter: 'blur(29px)',
        }}
        className={`fixed inset-0 min-h-screen w-screen z-[100] flex flex-col justify-between text-[#F4F3EF] px-8 sm:px-12 pt-0 pb-10 sm:pb-14 uppercase border-l border-white/15 md:w-[75vw] md:left-auto md:right-0 overflow-x-hidden overflow-y-auto ${
          mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Drawer Header (Aligned with top navbar 64px) */}
        <div className="h-16 flex items-center justify-between border-b border-white/15 shrink-0 pr-16">
          <div className="flex items-center gap-3 font-tech text-xs text-[#FACC15] uppercase tracking-wider font-bold">
            <span className="w-2 h-2 bg-[#FACC15]" />
            <span>Navigation Menu</span>
          </div>
        </div>

        {/* Links Section with Massive Typography */}
        <div
          ref={linksSectionRef}
          className="flex flex-col gap-4 text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight my-auto py-8 shrink-0 will-change-[transform,opacity]"
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
            <span>WORK</span>
          </a>
          <a
            href="#process"
            onClick={closeMenu}
            className="hover:text-[#FACC15] transition-colors duration-200 flex items-baseline gap-4"
          >
            <span className="font-tech text-xs sm:text-sm text-white/30 tracking-wider">03</span>
            <span>PROCESS</span>
          </a>
          <a
            href="#services"
            onClick={closeMenu}
            className="hover:text-[#FACC15] transition-colors duration-200 flex items-baseline gap-4"
          >
            <span className="font-tech text-xs sm:text-sm text-white/30 tracking-wider">04</span>
            <span>SERVICES</span>
          </a>
          <a
            href="#testimonials"
            onClick={closeMenu}
            className="hover:text-[#FACC15] transition-colors duration-200 flex items-baseline gap-4"
          >
            <span className="font-tech text-xs sm:text-sm text-white/30 tracking-wider">05</span>
            <span>CLIENTS</span>
          </a>
          <a
            href="#contact"
            onClick={closeMenu}
            className="hover:text-[#FACC15] transition-colors duration-200 flex items-baseline gap-4 text-[#FACC15]"
          >
            <span className="font-tech text-xs sm:text-sm text-[#FACC15]/50 tracking-wider">06</span>
            <span>START A CAMPAIGN</span>
          </a>
        </div>
      </nav>

      {/* Universal Morphing Hamburger / Close Button */}
      <div className={`fixed top-2 right-4 z-[110] ${mobileMenuOpen ? 'block' : 'lg:hidden'}`}>
        <button
          ref={hamburgerButtonRef}
          type="button"
          onClick={toggleMenu}
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
          className="w-12 h-12 bg-[#FACC15] cursor-pointer flex flex-col items-center justify-center gap-[6px] border border-black/20 transition-transform active:scale-95 shadow-sm"
        >
          <span
            ref={topLineRef}
            className="h-[2px] w-[22px] bg-[#0D0D0D] block will-change-transform origin-center"
          />
          <span
            ref={bottomLineRef}
            className="h-[2px] w-[22px] bg-[#0D0D0D] block will-change-transform origin-center"
          />
        </button>
      </div>
    </>
  );
};
