import React, { useEffect, useRef } from 'react';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
import { MaskedHeading } from './motion/RevealWrappers';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ShoppingBag, UtensilsCrossed, Smartphone, Package,
  Zap,
  type LucideIcon,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Authentic Social Media Brand SVG Logos
 */
const InstagramIcon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }> = ({ size = 20, style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YouTubeIcon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }> = ({ size = 20, style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TwitterXIcon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }> = ({ size = 20, style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }> = ({ size = 20, style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

/* ─── Node Definitions ─── */

interface NodeDef {
  id: string;
  label: string;
  Icon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }> | LucideIcon;
  accent: string;
}

const CREATORS: NodeDef[] = [
  { id: 'ig', label: 'Instagram', Icon: InstagramIcon, accent: '#E1306C' },
  { id: 'yt', label: 'YouTube', Icon: YouTubeIcon, accent: '#FF0000' },
  { id: 'tw', label: 'Twitter / X', Icon: TwitterXIcon, accent: '#FFFFFF' },
  { id: 'fb', label: 'Facebook', Icon: FacebookIcon, accent: '#1877F2' },
];

const BRANDS: NodeDef[] = [
  { id: 'd2c', label: 'D2C', Icon: ShoppingBag, accent: '#FACC15' },
  { id: 'fnb', label: 'F&B', Icon: UtensilsCrossed, accent: '#F97316' },
  { id: 'tech', label: 'Tech', Icon: Smartphone, accent: '#22D3EE' },
  { id: 'fmcg', label: 'FMCG', Icon: Package, accent: '#A78BFA' },
];

/* ─── SVG Coordinate System ─── */
// ViewBox: 0 0 1200 500
// Left column nodes at x=150, Right column nodes at x=1050
// Hub at center (600, 250)

const VB_W = 1200;
const VB_H = 500;
const LX = 150;
const RX = 1050;
const HUB_X = 600;
const HUB_Y = 250;
const LEFT_YS = [80, 190, 310, 420];
const RIGHT_YS = [80, 190, 310, 420];

// Orthogonal connection paths: left nodes → hub
const LEFT_PATHS = [
  `M ${LX} ${LEFT_YS[0]} H 330 V ${HUB_Y} H ${HUB_X}`,
  `M ${LX} ${LEFT_YS[1]} H 410 V ${HUB_Y} H ${HUB_X}`,
  `M ${LX} ${LEFT_YS[2]} H 410 V ${HUB_Y} H ${HUB_X}`,
  `M ${LX} ${LEFT_YS[3]} H 330 V ${HUB_Y} H ${HUB_X}`,
];

// Orthogonal connection paths: hub → right nodes
const RIGHT_PATHS = [
  `M ${HUB_X} ${HUB_Y} H 870 V ${RIGHT_YS[0]} H ${RX}`,
  `M ${HUB_X} ${HUB_Y} H 790 V ${RIGHT_YS[1]} H ${RX}`,
  `M ${HUB_X} ${HUB_Y} H 790 V ${RIGHT_YS[2]} H ${RX}`,
  `M ${HUB_X} ${HUB_Y} H 870 V ${RIGHT_YS[3]} H ${RX}`,
];

// Vertical rails linking each column's nodes
const VERT_PATHS = [
  `M ${LX} ${LEFT_YS[0]} V ${LEFT_YS[3]}`,
  `M ${RX} ${RIGHT_YS[0]} V ${RIGHT_YS[3]}`,
];

const ALL_PATHS = [...LEFT_PATHS, ...RIGHT_PATHS, ...VERT_PATHS];

// Connection labels positioned on the horizontal path segments
interface LabelDef {
  text: string;
  svgX: number;
  svgY: number;
}

const CONN_LABELS: LabelDef[] = [
  // Left side (positioned cleanly on horizontal segment towards the vertical junction)
  { text: 'Reels & Stories', svgX: 250, svgY: LEFT_YS[0] },
  { text: 'Long-form', svgX: 290, svgY: LEFT_YS[1] },
  { text: 'Threads', svgX: 290, svgY: LEFT_YS[2] },
  { text: 'Community & Ads', svgX: 250, svgY: LEFT_YS[3] },
  // Right side (positioned cleanly on horizontal segment towards the vertical junction)
  { text: 'Product Launch', svgX: 950, svgY: RIGHT_YS[0] },
  { text: 'Campaigns', svgX: 910, svgY: RIGHT_YS[1] },
  { text: 'Reviews', svgX: 910, svgY: RIGHT_YS[2] },
  { text: 'Awareness', svgX: 950, svgY: RIGHT_YS[3] },
];

// Center flow labels near the hub
const FLOW_LABELS: LabelDef[] = [
  { text: 'Creator Pipeline', svgX: 470, svgY: HUB_Y - 28 },
  { text: 'Brand Distribution', svgX: 730, svgY: HUB_Y - 28 },
];

// Junction dots at vertical turn points
const JUNCTION_DOTS = [
  { x: 330, y: HUB_Y },
  { x: 410, y: HUB_Y },
  { x: 790, y: HUB_Y },
  { x: 870, y: HUB_Y },
];

/* ─── Helpers ─── */

const toPercent = (svgX: number, svgY: number) => ({
  left: `${(svgX / VB_W) * 100}%`,
  top: `${(svgY / VB_H) * 100}%`,
});

/* ─── Component ─── */

export const CreatorStudioSuite: React.FC = () => {
  const networkRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileNetworkRef = useRef<HTMLDivElement>(null);
  const mobileHubRef = useRef<HTMLDivElement>(null);
  const mobileNodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobilePathRefs = useRef<(SVGPathElement | null)[]>([]);
  const mobileBadgeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const network = networkRef.current;
    const hub = hubRef.current;
    const mobileNetwork = mobileNetworkRef.current;
    const mobileHub = mobileHubRef.current;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ─── Desktop Animation (>= 1024px) ───
      mm.add('(min-width: 1024px)', () => {
        if (!network || !hub) return;
        const paths = pathRefs.current.filter(Boolean) as SVGPathElement[];
        const nodes = nodeRefs.current.filter(Boolean) as HTMLDivElement[];
        const labels = labelRefs.current.filter(Boolean) as HTMLDivElement[];

        gsap.set(hub, { scale: 0, opacity: 0 });
        gsap.set(nodes, { scale: 0, opacity: 0 });
        gsap.set(labels, { opacity: 0, y: 6 });

        paths.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: network,
            start: 'top 70%',
            toggleActions: 'play none none reset',
          },
        });

        tl.to(hub, { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(1.7)' });
        tl.to(nodes, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'back.out(1.7)' }, '-=0.2');
        tl.to(paths, { strokeDashoffset: 0, duration: 1.1, stagger: 0.06, ease: 'power2.inOut' }, '-=0.25');
        tl.to(labels, { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out' }, '-=0.5');
      });

      // ─── Mobile Animation (< 1024px) ───
      mm.add('(max-width: 1023px)', () => {
        if (!mobileNetwork || !mobileHub) return;
        const mPaths = mobilePathRefs.current.filter(Boolean) as SVGPathElement[];
        const mNodes = mobileNodeRefs.current.filter(Boolean) as HTMLDivElement[];
        const mBadges = mobileBadgeRefs.current.filter(Boolean) as HTMLDivElement[];

        gsap.set(mobileHub, { scale: 0, opacity: 0 });
        gsap.set(mNodes, { scale: 0, opacity: 0 });
        gsap.set(mBadges, { opacity: 0, y: 8 });

        mPaths.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mobileNetwork,
            start: 'top 75%',
            toggleActions: 'play none none reset',
          },
        });

        // 1. Center O1 Media hub scales in with pop
        tl.to(mobileHub, { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(1.7)' });

        // 2. Nodes pop in sequentially (Creators first, then Brands)
        tl.to(mNodes, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'back.out(1.7)',
        }, '-=0.2');

        // 3. Connective circuit paths draw in
        tl.to(mPaths, {
          strokeDashoffset: 0,
          duration: 1.0,
          stagger: 0.05,
          ease: 'power2.inOut',
        }, '-=0.25');

        // 4. Badges fade into position
        tl.to(mBadges, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.08,
          ease: 'power2.out',
        }, '-=0.4');
      });
    });

    return () => ctx.revert();
  }, []);

  const allLabels = [...CONN_LABELS, ...FLOW_LABELS];

  return (
    <ArchitecturalSection id="process" dark>
      {/* Header */}
      <div className="p-8 sm:p-12 md:p-14 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3 font-semibold">
            <span className="w-2 h-2 bg-[#FACC15]" />
            <span>Brand × Creator Network</span>
          </div>
          <MaskedHeading
            as="h2"
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#F4F3EF]"
          >
            HOW WE CONNECT
          </MaskedHeading>
        </div>
        <div className="font-tech text-xs text-neutral-500 uppercase tracking-widest font-semibold flex items-center gap-3">
          <span>Creators</span>
          <span className="text-[#FACC15]/50">◆</span>
          <span className="text-[#FACC15]">O1 Media</span>
          <span className="text-[#FACC15]/50">◆</span>
          <span>Brands</span>
        </div>
      </div>

      {/* ─── Desktop Network Visualization ─── */}
      <div className="hidden lg:block px-6 sm:px-10 lg:px-14 py-10 sm:py-14">
        <div
          ref={networkRef}
          className="relative w-full max-w-[1400px] mx-auto"
          style={{ aspectRatio: '12 / 5' }}
        >
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px',
            }}
          />

          {/* SVG Connection Lines */}
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="absolute inset-0 w-full h-full pointer-events-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background guide paths (always visible, very faint) */}
            {ALL_PATHS.map((d, i) => (
              <path
                key={`bg-${i}`}
                d={d}
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1"
                fill="none"
              />
            ))}

            {/* Animated foreground paths */}
            {ALL_PATHS.map((d, i) => (
              <path
                key={`fg-${i}`}
                ref={(el) => {
                  pathRefs.current[i] = el;
                }}
                d={d}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
                fill="none"
              />
            ))}

            {/* Junction dots at vertical turn points */}
            {JUNCTION_DOTS.map((dot, i) => (
              <circle
                key={`jd-${i}`}
                cx={dot.x}
                cy={dot.y}
                r={3}
                fill="rgba(255,255,255,0.12)"
              />
            ))}
          </svg>

          {/* ─── Hub Node (Center) ─── */}
          <div
            ref={hubRef}
            className="absolute z-20 flex flex-col items-center gap-2.5"
            style={{
              ...toPercent(HUB_X, HUB_Y),
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="w-16 h-16 bg-[#FACC15] flex items-center justify-center shadow-[0_0_50px_rgba(250,204,21,0.25)]">
              <Zap size={28} className="text-[#0D0D0D]" />
            </div>
            <span className="font-tech text-[11px] text-[#FACC15] uppercase tracking-widest font-bold whitespace-nowrap">
              O1 Media
            </span>
          </div>

          {/* ─── Creator Nodes (Left Column) ─── */}
          {CREATORS.map((node, i) => (
            <div
              key={node.id}
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              className="absolute z-10 flex flex-col items-end"
              style={{
                ...toPercent(LX, LEFT_YS[i]),
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Logo Box centered right on the junction */}
              <div
                className="w-11 h-11 flex items-center justify-center border shrink-0 bg-[#0A0A0A]"
                style={{
                  backgroundColor: `${node.accent}12`,
                  borderColor: `${node.accent}40`,
                }}
              >
                <node.Icon size={20} style={{ color: node.accent }} />
              </div>
              {/* Label below logo, right-aligned with the right edge of the logo box */}
              <span className="font-tech text-[10px] text-neutral-400 uppercase tracking-wider font-semibold whitespace-nowrap mt-1 text-right">
                {node.label}
              </span>
            </div>
          ))}

          {/* ─── Brand Nodes (Right Column) ─── */}
          {BRANDS.map((node, i) => (
            <div
              key={node.id}
              ref={(el) => {
                nodeRefs.current[CREATORS.length + i] = el;
              }}
              className="absolute z-10 flex flex-col items-start"
              style={{
                ...toPercent(RX, RIGHT_YS[i]),
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Logo Box centered right on the junction */}
              <div
                className="w-11 h-11 flex items-center justify-center border shrink-0 bg-[#0A0A0A]"
                style={{
                  backgroundColor: `${node.accent}12`,
                  borderColor: `${node.accent}40`,
                }}
              >
                <node.Icon size={20} style={{ color: node.accent }} />
              </div>
              {/* Label below logo, left-aligned with the left edge of the logo box */}
              <span className="font-tech text-[10px] text-neutral-400 uppercase tracking-wider font-semibold whitespace-nowrap mt-1 text-left">
                {node.label}
              </span>
            </div>
          ))}

          {/* ─── Connection & Flow Labels ─── */}
          {allLabels.map((label, i) => (
            <div
              key={label.text}
              ref={(el) => {
                labelRefs.current[i] = el;
              }}
              className="absolute z-10 pointer-events-none"
              style={{
                ...toPercent(label.svgX, label.svgY),
                transform: 'translate(-50%, -50%)',
              }}
            >
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider bg-[#0A0A0A] px-2.5 py-1 border border-white/8 whitespace-nowrap">
                {label.text}
              </span>
            </div>
          ))}

          {/* Column Labels */}
          <div
            className="absolute z-10"
            style={{
              ...toPercent(LX, VB_H - 15),
              transform: 'translateX(-50%)',
            }}
          >
            <span className="font-display text-xs font-bold text-neutral-600 uppercase tracking-[0.2em]">
              Creators
            </span>
          </div>
          <div
            className="absolute z-10"
            style={{
              ...toPercent(RX, VB_H - 15),
              transform: 'translateX(-50%)',
            }}
          >
            <span className="font-display text-xs font-bold text-neutral-600 uppercase tracking-[0.2em]">
              Brands
            </span>
          </div>
        </div>
      </div>

      {/* ─── Mobile Connected Circuit Visualization ─── */}
      <div className="lg:hidden px-4 py-8 sm:py-12 relative">
        <div ref={mobileNetworkRef} className="relative w-full max-w-[360px] mx-auto" style={{ height: '580px' }}>
          {/* Mobile SVG Circuit Wiring: ViewBox 0 0 360 580 */}
          <svg
            viewBox="0 0 360 580"
            className="absolute inset-0 w-full h-full pointer-events-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background subtle paths */}
            <path d="M 45 80 V 145" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <path d="M 135 80 V 145" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <path d="M 225 80 V 145" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <path d="M 315 80 V 145" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <path d="M 45 145 H 315" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <path d="M 180 145 V 290" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />

            <path d="M 180 290 V 435" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <path d="M 45 435 H 315" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <path d="M 45 435 V 500" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <path d="M 135 435 V 500" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <path d="M 225 435 V 500" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <path d="M 315 435 V 500" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />

            {/* Foreground animated connector traces */}
            <path ref={(el) => { mobilePathRefs.current[0] = el; }} d="M 45 80 V 145" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <path ref={(el) => { mobilePathRefs.current[1] = el; }} d="M 135 80 V 145" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <path ref={(el) => { mobilePathRefs.current[2] = el; }} d="M 225 80 V 145" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <path ref={(el) => { mobilePathRefs.current[3] = el; }} d="M 315 80 V 145" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <path ref={(el) => { mobilePathRefs.current[4] = el; }} d="M 45 145 H 315" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <path ref={(el) => { mobilePathRefs.current[5] = el; }} d="M 180 145 V 290" stroke="rgba(255,255,255,0.38)" strokeWidth="1.5" />

            <path ref={(el) => { mobilePathRefs.current[6] = el; }} d="M 180 290 V 435" stroke="rgba(255,255,255,0.38)" strokeWidth="1.5" />
            <path ref={(el) => { mobilePathRefs.current[7] = el; }} d="M 45 435 H 315" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <path ref={(el) => { mobilePathRefs.current[8] = el; }} d="M 45 435 V 500" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <path ref={(el) => { mobilePathRefs.current[9] = el; }} d="M 135 435 V 500" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <path ref={(el) => { mobilePathRefs.current[10] = el; }} d="M 225 435 V 500" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <path ref={(el) => { mobilePathRefs.current[11] = el; }} d="M 315 435 V 500" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

            {/* Precision Junction Dots at Bus Intersections */}
            <circle cx="45" cy="145" r="3" fill="rgba(255,255,255,0.6)" />
            <circle cx="135" cy="145" r="3" fill="rgba(255,255,255,0.6)" />
            <circle cx="180" cy="145" r="3.5" fill="#FACC15" />
            <circle cx="225" cy="145" r="3" fill="rgba(255,255,255,0.6)" />
            <circle cx="315" cy="145" r="3" fill="rgba(255,255,255,0.6)" />

            <circle cx="45" cy="435" r="3" fill="rgba(255,255,255,0.6)" />
            <circle cx="135" cy="435" r="3" fill="rgba(255,255,255,0.6)" />
            <circle cx="180" cy="435" r="3.5" fill="#FACC15" />
            <circle cx="225" cy="435" r="3" fill="rgba(255,255,255,0.6)" />
            <circle cx="315" cy="435" r="3" fill="rgba(255,255,255,0.6)" />
          </svg>

          {/* Creators Label */}
          <div className="absolute top-2 left-0 right-0 text-center pointer-events-none">
            <span className="font-tech text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
              Creators
            </span>
          </div>

          {/* Creators Nodes Row */}
          {CREATORS.map((node, i) => {
            const xPercent = ((45 + i * 90) / 360) * 100;
            return (
              <div
                key={node.id}
                ref={(el) => { mobileNodeRefs.current[i] = el; }}
                className="absolute flex flex-col items-center z-10 will-change-transform"
                style={{
                  left: `${xPercent}%`,
                  top: '80px',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div
                  className="w-11 h-11 flex items-center justify-center border bg-[#0A0A0A] shadow-lg"
                  style={{
                    backgroundColor: `${node.accent}12`,
                    borderColor: `${node.accent}45`,
                  }}
                >
                  <node.Icon size={18} style={{ color: node.accent }} />
                </div>
                <span className="font-tech text-[9px] text-neutral-400 uppercase tracking-wider font-semibold whitespace-nowrap mt-1">
                  {node.label}
                </span>
              </div>
            );
          })}

          {/* Mid Flow Badge (Top Trunk at Y=205) */}
          <div
            ref={(el) => { mobileBadgeRefs.current[0] = el; }}
            className="absolute z-10 pointer-events-none will-change-transform"
            style={{
              left: '50%',
              top: `${(205 / 580) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider bg-[#0A0A0A] px-2.5 py-0.5 border border-white/10 whitespace-nowrap">
              Creator Pipeline ↓
            </span>
          </div>

          {/* Center Hub at (50%, Y=290px) */}
          <div
            ref={mobileHubRef}
            className="absolute z-20 flex flex-col items-center gap-2 will-change-transform"
            style={{
              left: '50%',
              top: `${(290 / 580) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="w-14 h-14 bg-[#FACC15] flex items-center justify-center shadow-[0_0_35px_rgba(250,204,21,0.25)] border border-black/20">
              <Zap size={24} className="text-[#0D0D0D]" />
            </div>
            <span className="font-tech text-[11px] text-[#FACC15] uppercase tracking-widest font-bold whitespace-nowrap">
              O1 Media
            </span>
          </div>

          {/* Mid Flow Badge (Bottom Trunk at Y=370) */}
          <div
            ref={(el) => { mobileBadgeRefs.current[1] = el; }}
            className="absolute z-10 pointer-events-none will-change-transform"
            style={{
              left: '50%',
              top: `${(370 / 580) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider bg-[#0A0A0A] px-2.5 py-0.5 border border-white/10 whitespace-nowrap">
              Brand Distribution ↓
            </span>
          </div>

          {/* Brands Nodes Row */}
          {BRANDS.map((node, i) => {
            const xPercent = ((45 + i * 90) / 360) * 100;
            return (
              <div
                key={node.id}
                ref={(el) => { mobileNodeRefs.current[CREATORS.length + i] = el; }}
                className="absolute flex flex-col items-center z-10 will-change-transform"
                style={{
                  left: `${xPercent}%`,
                  top: '500px',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div
                  className="w-11 h-11 flex items-center justify-center border bg-[#0A0A0A] shadow-lg"
                  style={{
                    backgroundColor: `${node.accent}12`,
                    borderColor: `${node.accent}45`,
                  }}
                >
                  <node.Icon size={18} style={{ color: node.accent }} />
                </div>
                <span className="font-tech text-[9px] text-neutral-400 uppercase tracking-wider font-semibold whitespace-nowrap mt-1">
                  {node.label}
                </span>
              </div>
            );
          })}

          {/* Brands Label */}
          <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none">
            <span className="font-tech text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
              Brands
            </span>
          </div>
        </div>
      </div>
    </ArchitecturalSection>
  );
};
