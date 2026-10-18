import React, { useEffect, useRef, useState } from 'react';
import { ArchitecturalSection } from './layout/ArchitecturalSection';
import { MaskedHeading } from './motion/RevealWrappers';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ShoppingBag,
  UtensilsCrossed,
  Smartphone,
  Package,
  Zap,
  type LucideIcon,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Authentic Social Media Brand SVG Logos
 */
const InstagramIcon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }> = ({
  size = 20,
  style,
  className,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const YouTubeIcon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }> = ({
  size = 20,
  style,
  className,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const TwitterXIcon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }> = ({
  size = 20,
  style,
  className,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }> = ({
  size = 20,
  style,
  className,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style} className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

/* ─── Node Definitions ─── */

interface NodeDef {
  id: string;
  code: string;
  label: string;
  sub: string;
  flowTag: string;
  Icon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }> | LucideIcon;
  accent: string;
}

const CREATORS: NodeDef[] = [
  { id: 'ig', code: 'C.01', label: 'Instagram', sub: 'Reels & Stories', flowTag: 'Reels & Stories', Icon: InstagramIcon, accent: '#E1306C' },
  { id: 'yt', code: 'C.02', label: 'YouTube', sub: 'Shorts & Integrations', flowTag: 'Long-form', Icon: YouTubeIcon, accent: '#FF0000' },
  { id: 'tw', code: 'C.03', label: 'Twitter / X', sub: 'Viral Threads', flowTag: 'Threads', Icon: TwitterXIcon, accent: '#F4F3EF' },
  { id: 'fb', code: 'C.04', label: 'Facebook', sub: 'Whitelisted Ads', flowTag: 'Community & Ads', Icon: FacebookIcon, accent: '#1877F2' },
];

const BRANDS: NodeDef[] = [
  { id: 'd2c', code: 'B.01', label: 'D2C Brands', sub: 'ROAS Scaling', flowTag: 'Product Launch', Icon: ShoppingBag, accent: '#FACC15' },
  { id: 'fnb', code: 'B.02', label: 'F&B Chains', sub: 'Footfall Blitz', flowTag: 'Campaigns', Icon: UtensilsCrossed, accent: '#F97316' },
  { id: 'tech', code: 'B.03', label: 'Consumer Tech', sub: 'Unboxing Velocity', flowTag: 'Reviews', Icon: Smartphone, accent: '#22D3EE' },
  { id: 'fmcg', code: 'B.04', label: 'FMCG & Retail', sub: 'Mass Recall', flowTag: 'Awareness', Icon: Package, accent: '#A78BFA' },
];

/* ─── SVG Coordinate System (Desktop: 1200 x 520) ─── */
const VB_W = 1200;
const VB_H = 520;
const LX = 185; // Right edge anchor of Left Creator Cards
const RX = 1015; // Left edge anchor of Right Brand Cards
const HUB_X = 600;
const HUB_Y = 260;
const LEFT_YS = [85, 200, 320, 435];
const RIGHT_YS = [85, 200, 320, 435];

// Orthogonal connection paths: left nodes → hub
const LEFT_PATHS = [
  `M ${LX} ${LEFT_YS[0]} H 355 V ${HUB_Y} H ${HUB_X}`,
  `M ${LX} ${LEFT_YS[1]} H 425 V ${HUB_Y} H ${HUB_X}`,
  `M ${LX} ${LEFT_YS[2]} H 425 V ${HUB_Y} H ${HUB_X}`,
  `M ${LX} ${LEFT_YS[3]} H 355 V ${HUB_Y} H ${HUB_X}`,
];

// Orthogonal connection paths: hub → right nodes
const RIGHT_PATHS = [
  `M ${HUB_X} ${HUB_Y} H 845 V ${RIGHT_YS[0]} H ${RX}`,
  `M ${HUB_X} ${HUB_Y} H 775 V ${RIGHT_YS[1]} H ${RX}`,
  `M ${HUB_X} ${HUB_Y} H 775 V ${RIGHT_YS[2]} H ${RX}`,
  `M ${HUB_X} ${HUB_Y} H 845 V ${RIGHT_YS[3]} H ${RX}`,
];

interface LabelDef {
  id: string;
  text: string;
  svgX: number;
  svgY: number;
  isCore?: boolean;
}

const CONN_LABELS: LabelDef[] = [
  { id: 'ig', text: 'Reels & Stories', svgX: 270, svgY: LEFT_YS[0] },
  { id: 'yt', text: 'Long-form', svgX: 305, svgY: LEFT_YS[1] },
  { id: 'tw', text: 'Threads', svgX: 305, svgY: LEFT_YS[2] },
  { id: 'fb', text: 'Community & Ads', svgX: 270, svgY: LEFT_YS[3] },
  { id: 'd2c', text: 'Product Launch', svgX: 930, svgY: RIGHT_YS[0] },
  { id: 'fnb', text: 'Campaigns', svgX: 895, svgY: RIGHT_YS[1] },
  { id: 'tech', text: 'Reviews', svgX: 895, svgY: RIGHT_YS[2] },
  { id: 'fmcg', text: 'Awareness', svgX: 930, svgY: RIGHT_YS[3] },
];

/*
const FLOW_LABELS: LabelDef[] = [
  { id: 'flow-in', text: 'Creator Pipeline →', svgX: 490, svgY: HUB_Y - 30, isCore: true },
  { id: 'flow-out', text: '→ Brand Distribution', svgX: 710, svgY: HUB_Y - 30, isCore: true },
];
*/

const JUNCTION_DOTS = [
  { x: 355, y: HUB_Y },
  { x: 425, y: HUB_Y },
  { x: 775, y: HUB_Y },
  { x: 845, y: HUB_Y },
];

const toPercent = (svgX: number, svgY: number) => ({
  left: `${(svgX / VB_W) * 100}%`,
  top: `${(svgY / VB_H) * 100}%`,
});

export const CreatorStudioSuite: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Desktop Refs
  const networkRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const leftNodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightNodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leftPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const rightPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const pulsePathRefs = useRef<(SVGPathElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mobile Refs
  const mobileNetworkRef = useRef<HTMLDivElement>(null);
  const mobileHubRef = useRef<HTMLDivElement>(null);
  const mobileCreatorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileBrandRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileTopPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const mobileBottomPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const mobilePulseRefs = useRef<(SVGPathElement | null)[]>([]);
  const mobileBadgeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ─── Desktop Directional Flow & Live Pulse (>= 1024px) ───
      mm.add('(min-width: 1024px)', () => {
        const network = networkRef.current;
        const hub = hubRef.current;
        if (!network || !hub) return;

        const lNodes = leftNodeRefs.current.filter(Boolean) as HTMLDivElement[];
        const rNodes = rightNodeRefs.current.filter(Boolean) as HTMLDivElement[];
        const lPaths = leftPathRefs.current.filter(Boolean) as SVGPathElement[];
        const rPaths = rightPathRefs.current.filter(Boolean) as SVGPathElement[];
        const pulses = pulsePathRefs.current.filter(Boolean) as SVGPathElement[];
        const labels = labelRefs.current.filter(Boolean) as HTMLDivElement[];

        gsap.set(lNodes, { opacity: 0, x: -24 });
        gsap.set(rNodes, { opacity: 0, x: 24 });
        gsap.set(hub, { opacity: 0, scale: 0.75 });
        gsap.set(labels, { opacity: 0, y: 6 });

        [...lPaths, ...rPaths].forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });

        pulses.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, {
            strokeDasharray: `36 ${len}`,
            strokeDashoffset: len + 36,
            opacity: 0,
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: network,
            start: 'top 75%',
            toggleActions: 'play none none reset',
          },
        });

        // 1. Both Left (Creator) & Right (Brand) Nodes lock in at the exact same time
        tl.to(
          lNodes,
          {
            opacity: 1,
            x: 0,
            duration: 0.55,
            stagger: 0.06,
            ease: 'power3.out',
          },
          0
        )
          .to(
            rNodes,
            {
              opacity: 1,
              x: 0,
              duration: 0.55,
              stagger: 0.06,
              ease: 'power3.out',
            },
            0 // <-- '0' makes Right Nodes start at the exact same time as Left Nodes
          )
          // 2. Center O1 Media Hub ignites simultaneously
          .to(
            hub,
            {
              opacity: 1,
              scale: 1,
              duration: 0.55,
              ease: 'back.out(1.6)',
            },
            0.1
          )
          // 3. Both Left & Right circuit paths draw in together
          .to(
            [...lPaths, ...rPaths],
            {
              strokeDashoffset: 0,
              duration: 0.75,
              stagger: 0.04,
              ease: 'power2.inOut',
            },
            '-=0.3'
          )
          // 4. Telemetry labels fade in
          .to(
            labels,
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.03,
              ease: 'power2.out',
            },
            '-=0.45'
          )
          // 5. Activate continuous high-speed data packets
          .to(
            pulses,
            {
              opacity: 1,
              duration: 0.3,
            },
            '-=0.2'
          );

        // Continuous infinite loop for the energy packets
        pulses.forEach((p, idx) => {
          const len = p.getTotalLength();
          const isLeft = idx < 4;
          gsap.fromTo(
            p,
            { strokeDashoffset: len + 36 },
            {
              strokeDashoffset: -36,
              duration: 2.2,
              delay: isLeft ? (idx % 4) * 0.25 : 0.9 + (idx % 4) * 0.25,
              repeat: -1,
              ease: 'none',
            }
          );
        });
      });

      // ─── Mobile Top-to-Bottom Flow & Live Pulse (< 1024px) ───
      mm.add('(max-width: 1023px)', () => {
        const mNet = mobileNetworkRef.current;
        const mHub = mobileHubRef.current;
        if (!mNet || !mHub) return;

        const mCreators = mobileCreatorRefs.current.filter(Boolean) as HTMLDivElement[];
        const mBrands = mobileBrandRefs.current.filter(Boolean) as HTMLDivElement[];
        const mTopPaths = mobileTopPathRefs.current.filter(Boolean) as SVGPathElement[];
        const mBotPaths = mobileBottomPathRefs.current.filter(Boolean) as SVGPathElement[];
        const mPulses = mobilePulseRefs.current.filter(Boolean) as SVGPathElement[];
        const mBadges = mobileBadgeRefs.current.filter(Boolean) as HTMLDivElement[];

        gsap.set(mCreators, { opacity: 0, y: -16 });
        gsap.set(mBrands, { opacity: 0, y: 16 });
        gsap.set(mHub, { opacity: 0, scale: 0.75 });
        gsap.set(mBadges, { opacity: 0, y: 6 });

        [...mTopPaths, ...mBotPaths].forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });

        mPulses.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, {
            strokeDasharray: `24 ${len}`,
            strokeDashoffset: len + 24,
            opacity: 0,
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mNet,
            start: 'top 78%',
            toggleActions: 'play none none reset',
          },
        });

        tl.to(mCreators, { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power3.out' }, 0)
          .to(mBrands, { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power3.out' }, 0)
          .to(mHub, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)' }, 0.1)
          .to([...mTopPaths, ...mBotPaths], { strokeDashoffset: 0, duration: 0.6, stagger: 0.03, ease: 'power2.inOut' }, '-=0.25')
          .to(mBadges, { opacity: 1, y: 0, duration: 0.3, stagger: 0.05 }, '-=0.3')
          .to(mPulses, { opacity: 1, duration: 0.3 }, '-=0.1');

        mPulses.forEach((p, idx) => {
          const len = p.getTotalLength();
          gsap.fromTo(
            p,
            { strokeDashoffset: len + 24 },
            {
              strokeDashoffset: -24,
              duration: 1.8,
              delay: idx * 0.6,
              repeat: -1,
              ease: 'none',
            }
          );
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const allLabels = [...CONN_LABELS /* , ...FLOW_LABELS */];

  return (
    <ArchitecturalSection id="network" dark>
      {/* Header */}
      <div className="p-8 sm:p-12 md:p-14 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3 font-semibold">
            <span className="w-2 h-2 bg-[#FACC15] shadow-[0_0_10px_#FACC15]" />
            <span>Brand × Creator Routing Architecture</span>
          </div>
          <MaskedHeading
            as="h2"
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#F4F3EF]"
          >
            HOW WE CONNECT.
          </MaskedHeading>
        </div>

        {/* Live Telemetry Legend */}
        <div className="flex items-center gap-4 py-2.5 px-4 bg-white/[0.02] border border-white/10 font-mono text-[11px] uppercase tracking-widest">
          <span className="text-neutral-400">Creators</span>
          <span className="text-[#FACC15]">━━►</span>
          <span className="text-[#FACC15] font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15] animate-ping" />
            O1 Core
          </span>
          <span className="text-[#FACC15]">━━►</span>
          <span className="text-neutral-400">Brands</span>
        </div>
      </div>

      {/* ─── Desktop Network Visualization (>= 1024px) ─── */}
      <div className="hidden lg:block px-6 sm:px-10 lg:px-12 py-14 relative overflow-hidden">
        {/* Ambient radial glow behind the center hub */}
        {/* <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(250, 204, 21, 0.05) 0%, rgba(0, 0, 0, 0) 55%)',
          }}
        /> */}

        {/* Borderless Container — seamlessly blends into the section */}
        <div
          ref={networkRef}
          className="relative w-full max-w-[1380px] mx-auto"
          style={{ aspectRatio: '1200 / 520' }}
        >
          {/* Precision Architectural Blueprint Grid with Smooth Radial Edge Fade-Out */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              maskImage:
                'radial-gradient(ellipse 75% 70% at 50% 50%, #000 35%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 75% 70% at 50% 50%, #000 35%, transparent 100%)',
            }}
          />

          {/* SVG Circuit Layer */}
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="absolute inset-0 w-full h-full pointer-events-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="yellow-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* 1. Faint Base Blueprint Traces */}
            {[...LEFT_PATHS, ...RIGHT_PATHS].map((d, i) => (
              <path
                key={`bg-${i}`}
                d={d}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1.5"
                fill="none"
              />
            ))}

            {/* 2. Animated Foreground Traces (Left: Creators -> Hub) */}
            {LEFT_PATHS.map((d, i) => {
              const isHovered = hoveredNode === CREATORS[i].id;
              return (
                <path
                  key={`l-fg-${i}`}
                  ref={(el) => {
                    leftPathRefs.current[i] = el;
                  }}
                  d={d}
                  stroke={isHovered ? CREATORS[i].accent : 'rgba(255,255,255,0.22)'}
                  strokeWidth={isHovered ? '2.5' : '1.5'}
                  className="transition-[stroke,stroke-width] duration-300"
                  fill="none"
                />
              );
            })}

            {/* 3. Animated Foreground Traces (Right: Hub -> Brands) */}
            {RIGHT_PATHS.map((d, i) => {
              const isHovered = hoveredNode === BRANDS[i].id;
              return (
                <path
                  key={`r-fg-${i}`}
                  ref={(el) => {
                    rightPathRefs.current[i] = el;
                  }}
                  d={d}
                  stroke={isHovered ? BRANDS[i].accent : 'rgba(255,255,255,0.22)'}
                  strokeWidth={isHovered ? '2.5' : '1.5'}
                  className="transition-[stroke,stroke-width] duration-300"
                  fill="none"
                />
              );
            })}

            {/* 4. Continuous Traveling Energy Packets (Data Streams) */}
            {[...LEFT_PATHS, ...RIGHT_PATHS].map((d, i) => {
              const nodeObj = i < 4 ? CREATORS[i] : BRANDS[i - 4];
              const isHovered = hoveredNode === nodeObj.id;
              return (
                <path
                  key={`pulse-${i}`}
                  ref={(el) => {
                    pulsePathRefs.current[i] = el;
                  }}
                  d={d}
                  stroke={isHovered ? nodeObj.accent : '#FACC15'}
                  strokeWidth={isHovered ? '3' : '2'}
                  strokeLinecap="square"
                  filter="url(#yellow-glow)"
                  fill="none"
                />
              );
            })}

            {/* 5. Junction Solder Nodes */}
            {JUNCTION_DOTS.map((dot, i) => (
              <g key={`jd-${i}`}>
                <circle cx={dot.x} cy={dot.y} r={5} fill="#0A0A0A" stroke="rgba(250,204,21,0.4)" strokeWidth="1" />
                <circle cx={dot.x} cy={dot.y} r={2} fill="#FACC15" />
              </g>
            ))}
          </svg>

          {/* ─── Center Hub Core (O1 Media) ─── */}
          <div
            style={toPercent(HUB_X, HUB_Y)}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
          >
            <div ref={hubRef} className="relative flex flex-col items-center group cursor-pointer">
              {/* Outer Radar Ring */}
              <div className="w-28 h-28 border border-[#FACC15]/25 bg-[#0A0A0A]/90 flex items-center justify-center relative">
                {/* Corner Reticle Brackets */}
                <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#FACC15]" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#FACC15]" />
                <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#FACC15]" />
                <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#FACC15]" />

                {/* Subtle Pulse Halo */}
                <div className="absolute inset-2 border border-[#FACC15]/20 animate-pulse pointer-events-none" />

                {/* Inner High-Voltage Core */}
                <div className="w-16 h-16 bg-[#FACC15] flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Zap size={28} className="text-[#0A0A0A] fill-[#0A0A0A]" />
                </div>
              </div>

              {/* Hub Label Plate */}
              {/* <div className="mt-2.5 bg-[#0E0E0E] border border-[#FACC15]/40 px-3 py-1 flex items-center gap-2 shadow-lg">
                <span className="w-1.5 h-1.5 bg-[#FACC15] animate-pulse" />
                <span className="font-tech text-xs text-[#FACC15] uppercase tracking-[0.2em] font-bold whitespace-nowrap">
                  O1 MEDIA CORE
                </span>
              </div> */}
            </div>
          </div>

          {/* ─── Left Column: Creator Architectural Nodes ─── */}
          {CREATORS.map((node, i) => {
            const isHovered = hoveredNode === node.id;
            return (
              <div
                key={node.id}
                style={toPercent(LX, LEFT_YS[i])}
                /* Anchor the right edge of the card directly onto LX so the line shoots out of its right border */
                className="absolute z-10 -translate-x-full -translate-y-1/2"
              >
                <div
                  ref={(el) => {
                    leftNodeRefs.current[i] = el;
                  }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="w-[168px] bg-[#0E0E0E] border p-2.5 flex items-center gap-3 cursor-pointer transition-colors duration-300 relative group"
                  style={{
                    borderColor: isHovered ? node.accent : 'rgba(255,255,255,0.12)',
                    boxShadow: isHovered ? `0 0 25px ${node.accent}25` : 'none',
                  }}
                >
                  {/* Icon Box */}
                  <div
                    className="w-9 h-9 flex items-center justify-center border shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: `${node.accent}15`,
                      borderColor: `${node.accent}45`,
                    }}
                  >
                    <node.Icon size={18} style={{ color: node.accent }} />
                  </div>

                  {/* Node Label */}
                  <div className="min-w-0 flex-1">
                    <div className="font-tech text-xs font-bold text-[#F4F3EF] uppercase tracking-wider truncate">
                      {node.label}
                    </div>
                  </div>

                  {/* Right Output Port Dot */}
                  <span
                    className="w-2 h-2 border border-black absolute -right-1 top-1/2 -translate-y-1/2"
                    style={{ backgroundColor: node.accent }}
                  />
                </div>
              </div>
            );
          })}

          {/* ─── Right Column: Brand Architectural Nodes ─── */}
          {BRANDS.map((node, i) => {
            const isHovered = hoveredNode === node.id;
            return (
              <div
                key={node.id}
                style={toPercent(RX, RIGHT_YS[i])}
                /* Anchor the left edge of the card directly onto RX so the line connects into its left border */
                className="absolute z-10 -translate-y-1/2"
              >
                <div
                  ref={(el) => {
                    rightNodeRefs.current[i] = el;
                  }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="w-[168px] bg-[#0E0E0E] border p-2.5 flex items-center gap-3 cursor-pointer transition-colors duration-300 relative group"
                  style={{
                    borderColor: isHovered ? node.accent : 'rgba(255,255,255,0.12)',
                    boxShadow: isHovered ? `0 0 25px ${node.accent}25` : 'none',
                  }}
                >
                  {/* Left Input Port Dot */}
                  <span
                    className="w-2 h-2 border border-black absolute -left-1 top-1/2 -translate-y-1/2"
                    style={{ backgroundColor: node.accent }}
                  />

                  {/* Icon Box */}
                  <div
                    className="w-9 h-9 flex items-center justify-center border shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: `${node.accent}15`,
                      borderColor: `${node.accent}45`,
                    }}
                  >
                    <node.Icon size={18} style={{ color: node.accent }} />
                  </div>

                  {/* Node Label */}
                  <div className="min-w-0 flex-1">
                    <div className="font-tech text-xs font-bold text-[#F4F3EF] uppercase tracking-wider truncate">
                      {node.label}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* ─── Connection & Flow Telemetry Badges ─── */}
          {allLabels.map((label, i) => {
            const isHighlighted = hoveredNode === label.id;
            return (
              <div
                key={label.text}
                style={toPercent(label.svgX, label.svgY)}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              >
                <div
                  ref={(el) => {
                    labelRefs.current[i] = el;
                  }}
                >
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border whitespace-nowrap transition-colors duration-300 ${
                      label.isCore
                        ? 'bg-[#141414] text-[#FACC15] border-[#FACC15]/30 font-semibold'
                        : isHighlighted
                        ? 'bg-[#171717] text-white border-[#FACC15]'
                        : 'bg-[#0A0A0A] text-neutral-400 border-white/10'
                    }`}
                  >
                    {label.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Mobile Connected Circuit Visualization (< 1024px) ─── */}
      <div className="lg:hidden px-4 py-10 relative overflow-hidden">
        <div
          ref={mobileNetworkRef}
          className="relative w-full max-w-[360px] mx-auto"
          style={{ height: '580px' }}
        >
          {/* Mobile Fading Blueprint Grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px',
              maskImage:
                'radial-gradient(ellipse 80% 75% at 50% 50%, #000 30%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 80% 75% at 50% 50%, #000 30%, transparent 100%)',
            }}
          />

          {/* Mobile SVG Circuit Wiring: ViewBox 0 0 360 580 */}
          <svg
            viewBox="0 0 360 580"
            className="absolute inset-0 w-full h-full pointer-events-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background subtle paths */}
            <path d="M 45 80 V 145 M 135 80 V 145 M 225 80 V 145 M 315 80 V 145 M 45 145 H 315 M 180 145 V 290 M 180 290 V 435 M 45 435 H 315 M 45 435 V 500 M 135 435 V 500 M 225 435 V 500 M 315 435 V 500" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />

            {/* Top Creator animated connector traces */}
            <path ref={(el) => { mobileTopPathRefs.current[0] = el; }} d="M 45 80 V 145" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
            <path ref={(el) => { mobileTopPathRefs.current[1] = el; }} d="M 135 80 V 145" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
            <path ref={(el) => { mobileTopPathRefs.current[2] = el; }} d="M 225 80 V 145" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
            <path ref={(el) => { mobileTopPathRefs.current[3] = el; }} d="M 315 80 V 145" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
            <path ref={(el) => { mobileTopPathRefs.current[4] = el; }} d="M 45 145 H 315" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
            <path ref={(el) => { mobileTopPathRefs.current[5] = el; }} d="M 180 145 V 290" stroke="rgba(250,204,21,0.45)" strokeWidth="2" />

            {/* Bottom Brand animated connector traces */}
            <path ref={(el) => { mobileBottomPathRefs.current[0] = el; }} d="M 180 290 V 435" stroke="rgba(250,204,21,0.45)" strokeWidth="2" />
            <path ref={(el) => { mobileBottomPathRefs.current[1] = el; }} d="M 45 435 H 315" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
            <path ref={(el) => { mobileBottomPathRefs.current[2] = el; }} d="M 45 435 V 500" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
            <path ref={(el) => { mobileBottomPathRefs.current[3] = el; }} d="M 135 435 V 500" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
            <path ref={(el) => { mobileBottomPathRefs.current[4] = el; }} d="M 225 435 V 500" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
            <path ref={(el) => { mobileBottomPathRefs.current[5] = el; }} d="M 315 435 V 500" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />

            {/* Mobile Live Energy Pulses along main vertical trunks */}
            <path ref={(el) => { mobilePulseRefs.current[0] = el; }} d="M 180 145 V 290" stroke="#FACC15" strokeWidth="3" />
            <path ref={(el) => { mobilePulseRefs.current[1] = el; }} d="M 180 290 V 435" stroke="#FACC15" strokeWidth="3" />

            {/* Precision Junction Dots at Bus Intersections */}
            <circle cx="45" cy="145" r="3" fill="rgba(255,255,255,0.6)" />
            <circle cx="135" cy="145" r="3" fill="rgba(255,255,255,0.6)" />
            <circle cx="180" cy="145" r="4" fill="#FACC15" />
            <circle cx="225" cy="145" r="3" fill="rgba(255,255,255,0.6)" />
            <circle cx="315" cy="145" r="3" fill="rgba(255,255,255,0.6)" />

            <circle cx="45" cy="435" r="3" fill="rgba(255,255,255,0.6)" />
            <circle cx="135" cy="435" r="3" fill="rgba(255,255,255,0.6)" />
            <circle cx="180" cy="435" r="4" fill="#FACC15" />
            <circle cx="225" cy="435" r="3" fill="rgba(255,255,255,0.6)" />
            <circle cx="315" cy="435" r="3" fill="rgba(255,255,255,0.6)" />
          </svg>

          {/* Creators Header Label */}
          {/* <div className="absolute top-1 left-0 right-0 text-center pointer-events-none">
            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-bold">
              // INBOUND CREATORS
            </span>
          </div> */}

          {/* Creators Nodes Row */}
          {CREATORS.map((node, i) => {
            const xPercent = ((45 + i * 90) / 360) * 100;
            return (
              <div
                key={node.id}
                style={{ left: `${xPercent}%`, top: '80px' }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <div
                  ref={(el) => {
                    mobileCreatorRefs.current[i] = el;
                  }}
                  className="flex flex-col items-center"
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center border bg-[#0E0E0E] shadow-lg"
                    style={{
                      backgroundColor: `${node.accent}15`,
                      borderColor: `${node.accent}50`,
                    }}
                  >
                    <node.Icon size={20} style={{ color: node.accent }} />
                  </div>
                  <span className="font-tech text-[9px] text-[#F4F3EF] uppercase tracking-wider font-bold whitespace-nowrap mt-1.5 bg-[#0A0A0A] px-1">
                    {node.label}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Mid Flow Badge (Top Trunk at Y=205) */}
          <div
            style={{ left: '50%', top: `${(205 / 580) * 100}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
          >
            <div ref={(el) => { mobileBadgeRefs.current[0] = el; }}>
              <span className="font-mono text-[9px] text-[#FACC15] uppercase tracking-wider bg-[#121212] px-2.5 py-1 border border-[#FACC15]/30 whitespace-nowrap">
                Creator Pipeline ↓
              </span>
            </div>
          </div>

          {/* Center Hub at (50%, Y=290px) */}
          <div
            style={{ left: '50%', top: `${(290 / 580) * 100}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <div ref={mobileHubRef} className="flex flex-col items-center">
              <div className="w-20 h-20 border border-[#FACC15]/30 bg-[#0A0A0A] flex items-center justify-center relative">
                <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#FACC15]" />
                <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#FACC15]" />
                <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#FACC15]" />
                <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#FACC15]" />
                <div className="w-12 h-12 bg-[#FACC15] flex items-center justify-center">
                  <Zap size={22} className="text-[#0D0D0D] fill-[#0D0D0D]" />
                </div>
              </div>
              <span className="font-tech text-[10px] text-[#FACC15] uppercase tracking-widest font-bold whitespace-nowrap mt-1.5 bg-[#0E0E0E] px-2 py-0.5 border border-[#FACC15]/30">
                O1 MEDIA CORE
              </span>
            </div>
          </div>

          {/* Mid Flow Badge (Bottom Trunk at Y=375) */}
          <div
            style={{ left: '50%', top: `${(375 / 580) * 100}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
          >
            <div ref={(el) => { mobileBadgeRefs.current[1] = el; }}>
              <span className="font-mono text-[9px] text-[#FACC15] uppercase tracking-wider bg-[#121212] px-2.5 py-1 border border-[#FACC15]/30 whitespace-nowrap">
                Brand Distribution ↓
              </span>
            </div>
          </div>

          {/* Brands Nodes Row */}
          {BRANDS.map((node, i) => {
            const xPercent = ((45 + i * 90) / 360) * 100;
            return (
              <div
                key={node.id}
                style={{ left: `${xPercent}%`, top: '500px' }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <div
                  ref={(el) => {
                    mobileBrandRefs.current[i] = el;
                  }}
                  className="flex flex-col items-center"
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center border bg-[#0E0E0E] shadow-lg"
                    style={{
                      backgroundColor: `${node.accent}15`,
                      borderColor: `${node.accent}50`,
                    }}
                  >
                    <node.Icon size={20} style={{ color: node.accent }} />
                  </div>
                  <span className="font-tech text-[9px] text-[#F4F3EF] uppercase tracking-wider font-bold whitespace-nowrap mt-1.5 bg-[#0A0A0A] px-1">
                    {node.label}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Brands Footer Label */}
          {/* <div className="absolute bottom-1 left-0 right-0 text-center pointer-events-none">
            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-bold">
              // OUTBOUND BRAND CATEGORIES
            </span>
          </div> */}
        </div>
      </div>
    </ArchitecturalSection>
  );
};

export default CreatorStudioSuite;