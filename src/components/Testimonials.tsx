import React, { useRef, useEffect } from 'react';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
import { MaskedHeading } from './motion/RevealWrappers';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  logo: React.ReactNode;
  tilt: string;
}

const TESTIMONIALS_NEW: TestimonialItem[] = [
  {
    id: 'boat',
    quote:
      'famO1Mediaa dialed in our D2C short-form creative sprint with exceptional turnaround speed. First 3-sec retention climbed past 88% on our flagship audio line.',
    author: 'Aman Gupta',
    role: 'Co-Founder & CMO',
    company: 'boAt Lifestyle',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    tilt: 'lg:-rotate-1',
    logo: (
      <div className="flex items-center gap-1.5 font-display font-black text-[11px] uppercase tracking-wider text-[#0D0D0D]">
        <span className="w-3 h-3 bg-[#E11D48] flex items-center justify-center font-mono text-[8px] text-white font-bold">b</span>
        <span className="font-extrabold tracking-tight">boAt</span>
      </div>
    ),
  },
  {
    id: 'bbq-nation',
    quote:
      'Their regional influencer orchestration and hyper-local reels brought packed dining rooms across our key metropolitan outlets within 72 hours of launch.',
    author: 'Kayum Dhanani',
    role: 'Managing Director',
    company: 'Barbeque Nation',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    tilt: 'lg:rotate-1',
    logo: (
      <div className="flex items-center gap-1.5 font-display font-black text-[11px] uppercase tracking-wider text-[#0D0D0D]">
        <span className="w-3 h-3 bg-[#EA580C] flex items-center justify-center font-mono text-[8px] text-white">🔥</span>
        <span className="tracking-tighter font-extrabold">BBQ NATION</span>
      </div>
    ),
  },
  {
    id: 'alterbone',
    quote:
      'We love famO1Mediaa! Their post desk took raw camera cuts and turned them into cinema-grade 4K stories that our community actively shares.',
    author: 'Ananya Sharma',
    role: 'Founder & CEO',
    company: 'Alterbone Media',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    tilt: 'lg:-rotate-1',
    logo: (
      <div className="flex items-center gap-1.5 font-display font-black text-[11px] uppercase tracking-wider text-[#0D0D0D]">
        <span className="w-3 h-3 bg-[#FACC15] flex items-center justify-center font-mono text-[8px] text-black">●</span>
        <span>ALTERBONE</span>
      </div>
    ),
  },
  {
    id: 'ridoria',
    quote:
      'I didn’t know creative testing could be this structured. They systematically isolated hooks until our watch-through retention jumped over 90%.',
    author: 'Rohan Verma',
    role: 'Head of Creative Strategy',
    company: 'Ridoria Growth Labs',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    tilt: 'lg:rotate-0',
    logo: (
      <div className="flex items-center gap-1.5 font-display font-black text-[11px] uppercase tracking-wider text-[#0D0D0D]">
        <span className="w-3 h-3 bg-black flex items-center justify-center font-mono text-[8px] text-white">▲</span>
        <span>RIDORIA</span>
      </div>
    ),
  },
  {
    id: 'incanto',
    quote:
      'Our festive campaign exceeded projections by 4.8X. The creator matchmaking and conversion landers deliver real commercial impact without vanity metrics.',
    author: 'Priya Nair',
    role: 'VP Brand Marketing',
    company: 'Incanto Lifestyle Group',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    tilt: 'lg:rotate-1',
    logo: (
      <div className="flex items-center gap-1.5 font-display font-black text-[11px] uppercase tracking-wider text-[#0D0D0D]">
        <span className="w-3 h-3 bg-[#10B981] flex items-center justify-center font-mono text-[8px] text-black">◆</span>
        <span>INCANTO</span>
      </div>
    ),
  },
];

export const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Mobile: Section pins, header stays fixed, subsequent cards slide in from the right to stack over first card
      mm.add('(max-width: 767px)', () => {
        // Set initial positions for cards 1..n to be offscreen to the right
        cards.forEach((card, i) => {
          if (i > 0) {
            gsap.set(card, {
              xPercent: 120,
              opacity: 0,
              rotate: i % 2 === 0 ? 1.5 : -1.5,
            });
          } else {
            gsap.set(card, {
              xPercent: 0,
              opacity: 1,
            });
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: 'top top',
            end: () => `+=${cards.length * 420}`,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Animate each subsequent card sliding horizontally from right into stack
        cards.slice(1).forEach((card, index) => {
          tl.to(
            card,
            {
              xPercent: 0,
              opacity: 1,
              ease: 'power2.out',
              duration: 1,
            },
            `step-${index}`
          );

          // Blur and subtle scale down of previous card behind it
          tl.to(
            cards[index],
            {
              scale: 0.95,
              filter: 'blur(6px)',
              opacity: 0.65,
              duration: 1,
              ease: 'power2.out',
            },
            `step-${index}`
          );
        });
      });

      // Desktop: coordinated sequential cascade grid
      mm.add('(min-width: 768px)', () => {
        // Reset transforms
        cards.forEach((card) => {
          gsap.set(card, { clearProps: 'all' });
        });

        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              toggleActions: 'play none none reset',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="w-full">
      <ArchitecturalSection
        id="testimonials"
        className="pt-8 pb-10 sm:py-24 border-t border-black/15 bg-[#F4F3EF] flex flex-col justify-center overflow-hidden"
      >
        <div className="max-w-[1560px] w-full mx-auto px-4 sm:px-8 lg:px-12 flex flex-col">
        
        {/* Section Header - stays pinned and visible while scrolling through stack on mobile */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-16 shrink-0">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2 sm:mb-3 font-semibold">
            <span className="w-2 h-2 bg-[#FACC15]" />
            <span>Partner Perspectives</span>
          </div>
          
          <MaskedHeading
            as="h2"
            className="font-display font-black text-2xl sm:text-5xl lg:text-6xl text-[#0D0D0D] tracking-tight leading-[1.06] uppercase text-center"
          >
            Don't just take our words. Over 140+ brands trust us.
          </MaskedHeading>

          <p className="mt-2.5 sm:mt-3 font-sans text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
            Real performance feedback from founders, creators, and marketing leaders scaling with our creative engine.
          </p>
        </div>

        {/* Card Stage: Horizontal stacking stack on mobile, 5-col grid on desktop */}
        <div
          ref={containerRef}
          className="relative w-full max-w-md mx-auto md:max-w-none h-[340px] md:h-auto md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 items-stretch pt-2"
        >
          {TESTIMONIALS_NEW.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              style={{
                zIndex: 10 + idx,
              }}
              className={`absolute inset-0 md:static bg-white border border-black/15 p-6 sm:p-7 flex flex-col justify-between shadow-xl md:shadow-sm hover:shadow-xl transition-shadow duration-300 md:hover:-translate-y-1.5 hover:border-black ${item.tilt} will-change-transform group h-full md:min-h-[320px] min-w-0`}
            >
              <div>
                {/* Clean Quote Text */}
                <blockquote className="font-sans text-[13.5px] sm:text-[14px] text-neutral-800 leading-relaxed font-normal">
                  “{item.quote}”
                </blockquote>

                {/* Author Info */}
                <div className="mt-5 pt-4 border-t border-black/10">
                  <div className="font-tech text-sm font-bold text-[#0D0D0D] uppercase tracking-tight truncate">
                    {item.author}
                  </div>
                  <div className="font-sans text-[11px] text-neutral-500 font-medium truncate mt-0.5">
                    {item.role}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer: Brand Emblem + Headshot Avatar */}
              <div className="mt-4 sm:mt-5 pt-3.5 border-t border-black/10 flex items-center justify-between gap-2">
                <div className="truncate">{item.logo}</div>
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-8 h-8 rounded-none object-cover grayscale contrast-125 border border-black/20 group-hover:grayscale-0 transition-all duration-300 shrink-0"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PREVIOUS TESTIMONIAL LAYOUT (COMMENTED OUT) */}
      {/*
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-black/15 border-b border-black/15">
          {TESTIMONIALS_PREV.map((item) => (
            <div key={item.id} className="p-8 sm:p-12 flex flex-col justify-between hover:bg-black/[0.015]">
              <blockquote>{item.quote}</blockquote>
              <div>{item.author}</div>
            </div>
          ))}
        </div>
      </div>
      */}
    </ArchitecturalSection>
    </div>
  );
};
