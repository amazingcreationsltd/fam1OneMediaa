import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface KPIItem {
  id: string;
  prefix?: string;
  targetValue: number;
  suffix?: string;
  decimals?: number;
  isFraction?: boolean;
  fractionDisplay?: string;
  label: string;
  sub: string;
}

/* Image 3 New Data */
const KPIS_NEW: KPIItem[] = [
  {
    id: '01',
    targetValue: 150,
    suffix: '+',
    decimals: 0,
    label: 'Projects Delivered',
    sub: 'WEBSITES & WEB APPLICATIONS',
  },
  {
    id: '02',
    targetValue: 5,
    suffix: '+',
    decimals: 0,
    label: 'Years of Experience',
    sub: 'PRACTICAL AND DIVERSE EXPERTISE',
  },
  {
    id: '03',
    targetValue: 140,
    suffix: '+',
    decimals: 0,
    label: 'Happy Clients',
    sub: 'FROM STARTUPS TO GROWING BRANDS',
  },
  {
    id: '04',
    targetValue: 24,
    suffix: '',
    decimals: 0,
    isFraction: true,
    fractionDisplay: '24/7',
    label: 'Business Online',
    sub: 'WEBSITES THAT WORK AROUND THE CLOCK',
  },
];

/* Previous KPI list kept for reference (commented out) */
/*
const KPIS_PREVIOUS: KPIItem[] = [
  {
    id: '01',
    prefix: '$',
    targetValue: 2.4,
    suffix: 'M+',
    decimals: 1,
    label: 'Revenue Tracked',
    sub: 'DIRECT CLIENT REVENUE & TRACKED SALES',
  },
  {
    id: '02',
    targetValue: 4.8,
    suffix: '×',
    decimals: 1,
    label: 'Average ROAS',
    sub: 'PAID MEDIA & CREATOR DISTRIBUTION',
  },
  {
    id: '03',
    prefix: '+',
    targetValue: 312,
    suffix: '%',
    decimals: 0,
    label: 'Audience Lift',
    sub: 'SHORT-FORM RETENTION & REACH',
  },
  {
    id: '04',
    targetValue: 94,
    suffix: '%',
    decimals: 0,
    label: 'Partner Retention',
    sub: 'LONG-TERM BRAND & TALENT CONTRACTS',
  },
];
*/

export const KpiStrip: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (prefersReduced) {
      KPIS_NEW.forEach((kpi, idx) => {
        const el = numberRefs.current[idx];
        if (el) {
          if (kpi.isFraction && kpi.fractionDisplay) {
            el.textContent = kpi.fractionDisplay;
          } else {
            el.textContent = kpi.decimals && kpi.decimals > 0 ? kpi.targetValue.toFixed(kpi.decimals) : kpi.targetValue.toString();
          }
        }
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Create master timeline triggered when the KPI strip enters viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          toggleActions: 'play none none reset',
        },
      });

      KPIS_NEW.forEach((kpi, idx) => {
        const el = numberRefs.current[idx];
        if (!el) return;

        if (kpi.isFraction) {
          // For 24/7 animate from 0/7 up to 24/7
          const counterObj = { val: 0 };
          tl.to(
            counterObj,
            {
              val: 24,
              duration: 1.25,
              ease: 'power3.out',
              onUpdate: () => {
                el.textContent = `${Math.round(counterObj.val)}/7`;
              },
            },
            idx * 0.28
          );
        } else {
          const counterObj = { val: 0 };
          tl.to(
            counterObj,
            {
              val: kpi.targetValue,
              duration: 1.25,
              ease: 'power3.out',
              onUpdate: () => {
                const formatted =
                  kpi.decimals && kpi.decimals > 0
                    ? counterObj.val.toFixed(kpi.decimals)
                    : Math.round(counterObj.val).toString();
                el.textContent = formatted;
              },
            },
            idx * 0.28
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <div ref={containerRef} className="w-full bg-[#F4F3EF] border-b border-black/15">
      {/* Top Header Row from Image 3 */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-14 sm:pt-16 pb-10 sm:pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-neutral-500 mb-4 font-semibold">
            <span className="w-6 h-[1.5px] bg-[#0D0D0D]" />
            <span>BY THE NUMBERS</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#0D0D0D] tracking-tight leading-[1.05]">
            Experience that builds trust.
          </h2>
        </div>

        <div className="max-w-md text-left md:text-right font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
          Helping businesses build stronger on the internet with purposeful design and functional websites.
        </div>
      </div>

      {/* 2x2 Grid on Mobile, 4-Column on Desktop with Swiss Brutalist Hairline Borders */}
      <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-black/15">
        {KPIS_NEW.map((item, idx) => (
          <div
            key={item.id}
            className={`p-5 sm:p-8 md:p-12 flex flex-col justify-between hover:bg-[#EAE8E1]/50 transition-colors ${
              // Right border on odd items in 2-col, right border on first 3 items in 4-col
              idx % 2 === 0 ? "border-r border-black/15" : "lg:border-r lg:border-black/15"
            } ${
              // Bottom border on first row in 2-col (items 0 & 1), none on desktop (lg:border-b-0)
              idx < 2 ? "border-b lg:border-b-0 border-black/15" : ""
            } ${
              // Clear right border on item 4 in desktop 4-column
              idx === 3 ? "lg:border-r-0" : ""
            }`}
          >
            {/* Top row: [0X] on left, green square on right */}
            <div className="flex items-center justify-between font-mono text-[11px] sm:text-xs text-neutral-500 mb-3 sm:mb-6">
              <span>[{item.id}]</span>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#10B981] inline-block" />
            </div>

            {/* Middle giant numeral with one-by-one count-up */}
            <div className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none text-[#0D0D0D] tracking-tight uppercase mb-3 sm:mb-4 tabular-nums flex items-baseline">
              {item.prefix && <span>{item.prefix}</span>}
              <span
                ref={(el) => {
                  numberRefs.current[idx] = el;
                }}
              >
                0{item.isFraction ? '/7' : ''}
              </span>
              {item.suffix && <span>{item.suffix}</span>}
            </div>

            {/* Bottom label & subtext */}
            <div>
              <div className="font-tech text-sm sm:text-base md:text-lg font-bold text-[#0D0D0D] tracking-tight leading-snug">
                {item.label}
              </div>
              <div className="font-mono text-[10px] sm:text-[11px] text-neutral-600 uppercase tracking-wider mt-0.5 sm:mt-1 leading-tight">
                {item.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Sub-Caption from Image 3 */}
      <div className="px-6 sm:px-12 py-5 border-t border-black/15 flex items-center gap-3 font-mono text-xs text-neutral-600 uppercase tracking-wider">
        <span className="w-2 h-2 bg-[#10B981] shrink-0" />
        <span>FROM ONLINE STORES TO BOOKING PLATFORMS AND CUSTOM WEB APPLICATIONS.</span>
      </div>

      {/* PREVIOUS KPI LAYOUT (COMMENTED OUT) */}
      {/*
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-black/15">
        {KPIS_PREVIOUS.map((item) => (
          <div key={item.id} className="p-8 md:p-12 flex flex-col justify-between">
            <div className="flex items-center justify-between font-mono text-xs text-neutral-500 mb-6">
              <span>[{item.id}]</span>
              <span className="w-2 h-2 bg-[#10B981] inline-block" />
            </div>
            <div className="font-display font-black text-6xl md:text-7xl lg:text-8xl leading-none text-[#0D0D0D]">
              {item.prefix}{item.targetValue}{item.suffix}
            </div>
            <div>
              <div className="font-tech text-base md:text-lg font-bold text-[#0D0D0D]">{item.label}</div>
              <div className="font-mono text-[11px] text-neutral-600 uppercase tracking-wider mt-1">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
      */}
    </div>
  );
};
