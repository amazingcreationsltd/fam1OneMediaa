import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const Magnetic: React.FC<React.PropsWithChildren<{ strength?: number; className?: string }>> = ({ children, strength = 0.35, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const x = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'elastic.out(1, 0.3)' });
    const y = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'elastic.out(1, 0.3)' });
    const move = (event: MouseEvent) => { const r = el.getBoundingClientRect(); x((event.clientX - (r.left + r.width / 2)) * strength); y((event.clientY - (r.top + r.height / 2)) * strength); };
    const leave = () => { x(0); y(0); };
    el.addEventListener('mousemove', move); el.addEventListener('mouseleave', leave);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); };
  }, [strength]);
  return <div ref={ref} className={className}>{children}</div>;
};

export const MagneticCursor: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cursor = ref.current; if (!cursor) return;
    const x = gsap.quickTo(cursor, 'x', { duration: 0.3, ease: 'power3.out' });
    const y = gsap.quickTo(cursor, 'y', { duration: 0.3, ease: 'power3.out' });
    const move = (e: MouseEvent) => { x(e.clientX); y(e.clientY); };
    const over = (e: MouseEvent) => { const target = (e.target as HTMLElement).closest('[data-cursor]'); const label = target?.getAttribute('data-cursor'); cursor.dataset.label = label || ''; const labelNode = cursor.querySelector('span'); if (labelNode) labelNode.setAttribute('data-label', label || ''); gsap.to(cursor, { width: label ? 88 : 14, height: label ? 34 : 14, duration: 0.35, ease: 'expo.out' }); };
    window.addEventListener('mousemove', move); document.addEventListener('mouseover', over);
    return () => { window.removeEventListener('mousemove', move); document.removeEventListener('mouseover', over); };
  }, []);
  return <div ref={ref} aria-hidden="true" className="magnetic-cursor"><span /></div>;
};

export const MaskedHeading: React.FC<{ children: string; className?: string }> = ({ children, className = '' }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => { const ctx = gsap.context(() => { gsap.fromTo('.mask-line > span', { yPercent: 115, rotate: 2.5 }, { yPercent: 0, rotate: 0, duration: 1.15, stagger: 0.07, ease: 'power4.out', scrollTrigger: { trigger: ref.current, start: 'top 88%' } }); }, ref); return () => ctx.revert(); }, []);
  return <h1 ref={ref} className={className}>{children.split(' ').map((word, i) => <span className="mask-line block overflow-hidden pb-1" key={`${word}-${i}`}><span className="block will-change-transform">{word}{i < children.split(' ').length - 1 ? ' ' : ''}</span></span>)}</h1>;
};

export const ParallaxMedia: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = '' }) => {
  const frame = useRef<HTMLDivElement>(null); const media = useRef<HTMLDivElement>(null);
  useEffect(() => { const ctx = gsap.context(() => { gsap.fromTo(frame.current, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.35, ease: 'expo.out', scrollTrigger: { trigger: frame.current, start: 'top 88%' } }); gsap.fromTo(media.current, { yPercent: -12, scale: 1.18 }, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: frame.current, scrub: true } }); }, frame); return () => ctx.revert(); }, []);
  return <div ref={frame} className={`overflow-hidden ${className}`}><div ref={media} className="h-full w-full">{children}</div></div>;
};

export const VelocityMarquee: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { gsap.registerPlugin(ScrollTrigger); const track = ref.current; if (!track) return; let offset = 0; let direction = -1; const update = () => { offset += direction * 0.7; gsap.set(track, { x: `${offset % 50}%` }); }; const trigger = ScrollTrigger.create({ onUpdate: self => { direction = self.direction === 1 ? -1 : 1; gsap.to(track, { skewX: Math.max(-14, Math.min(14, self.getVelocity() / 250)), duration: 0.3, ease: 'power3.out' }); } }); gsap.ticker.add(update); return () => { gsap.ticker.remove(update); trigger.kill(); }; }, []);
  return <div className="overflow-hidden border-y border-current/15 py-5 font-mono text-xs uppercase tracking-[0.16em]"><div ref={ref} className="flex w-max gap-8 whitespace-nowrap">{Array.from({ length: 5 }).map((_, i) => <React.Fragment key={i}><span>{text}</span><i className="size-3.5 shrink-0 bg-[#FACC15]" /></React.Fragment>)}</div></div>;
};

export const CircularStamp: React.FC = () => <div className="circular-stamp" aria-label="Fam1Media hospitality growth engine"><svg viewBox="0 0 140 140" role="img"><defs><path id="stamp-path" d="M70,70 m-54,0 a54,54 0 1,1 108,0 a54,54 0 1,1 -108,0" /></defs><text><textPath href="#stamp-path">FAM1MEDIA • HOSPITALITY GROWTH ENGINE • EST 2026 • </textPath></text></svg><span /></div>;

export const ArchitecturalSection: React.FC<React.PropsWithChildren<{ index: string; label: string; dark?: boolean; id?: string; className?: string }>> = ({ index, label, dark, id, className = '', children }) => <section id={id} className={`architectural-section ${dark ? 'section-dark' : 'section-light'} ${className}`}><aside className="section-spine"><span>{index}</span><span className="writing-vertical rotate-180">{label}</span><i /></aside><div className="section-content">{children}</div></section>;
