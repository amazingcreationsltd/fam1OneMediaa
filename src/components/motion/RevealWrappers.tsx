import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MaskedHeadingProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  className?: string;
  stagger?: number;
  triggerOnLoad?: boolean;
}

export const MaskedHeading: React.FC<MaskedHeadingProps> = ({
  children,
  as: Component = 'h2',
  className = '',
  stagger = 0.08,
  triggerOnLoad,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const el = containerRef.current;
    if (!el) return;

    const lines = el.querySelectorAll('.masked-line-inner');

    // If triggerOnLoad is explicitly passed as boolean, wait until it is true!
    if (triggerOnLoad !== undefined) {
      if (!triggerOnLoad) {
        // Pre-set in hidden state while preloader runs
        gsap.set(lines, { yPercent: 120, rotate: 3, opacity: 0 });
        return;
      }

      const ctx = gsap.context(() => {
        gsap.fromTo(
          lines,
          {
            yPercent: 120,
            rotate: 3,
            opacity: 0,
          },
          {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            duration: 1.25,
            stagger,
            ease: 'power4.out',
            delay: 0.2, // Smooth breath right after splash curtain uncovers
          }
        );
      }, el);

      return () => ctx.revert();
    }

    // Default: ScrollTrigger on entry
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        {
          yPercent: 120,
          rotate: 3,
          opacity: 0,
        },
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration: 1.25,
          stagger,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [children, stagger, triggerOnLoad]);

  // Split words or lines
  const words = children.split(' ');

  return (
    <Component ref={containerRef as any} className={`${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-top mr-[0.25em]">
          <span className="masked-line-inner inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
};

interface ParallaxMediaProps {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
  dataCursor?: string;
  isVideo?: boolean;
}

export const ParallaxMedia: React.FC<ParallaxMediaProps> = ({
  src,
  alt,
  className = '',
  aspect = 'aspect-[16/10]',
  dataCursor,
  isVideo = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const media = mediaRef.current;
    if (!container || !media) return;

    const ctx = gsap.context(() => {
      // 1. Entry clip-path curtain wipe
      gsap.fromTo(
        container,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.35,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. Continuous parallax scrub
      gsap.fromTo(
        media,
        { yPercent: -10, scale: 1.15 },
        {
          yPercent: 10,
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full ${aspect} ${className}`}
      data-cursor={dataCursor}
    >
      {isVideo ? (
        <video
          ref={mediaRef as any}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover will-change-transform"
        />
      ) : (
        <img
          ref={mediaRef as any}
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover will-change-transform"
        />
      )}
    </div>
  );
};
