import React, { useEffect, useRef } from 'react';
import { VelocityMarquee } from './motion/VelocityMarquee';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface KPIItem {
  id: string;
  prefix?: string;
  targetValue: number;
  suffix?: string;
  decimals?: number;
  label: string;
  sub: string;
}

const KPIS: KPIItem[] = [
  {
    id: '01',
    prefix: '$',
    targetValue: 2.4,
    suffix: 'M+',
    decimals: 1,
    label: 'Attributed Revenue',
    sub: 'DIRECT GUEST COVER RECEIPTS TRACKED',
  },
  {
    id: '02',
    targetValue: 4.8,
    suffix: 'X',
    decimals: 1,
    label: 'Average ROAS',
    sub: 'TARGETED MEDIA & LOCALIZED SPEND',
  },
  {
    id: '03',
    prefix: '+',
    targetValue: 312,
    suffix: '%',
    decimals: 0,
    label: 'Footfall Multiplier',
    sub: '14-DAY DISTRICT OUTDOOR BURSTS',
  },
  {
    id: '04',
    targetValue: 94,
    suffix: '%',
    decimals: 0,
    label: 'Capacity Fill Rate',
    sub: 'PRIME WEEKEND & MIDWEEK COVERS',
  },
];

export const KpiStrip: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Create master timeline triggered when the KPI strip enters viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 82%',
          once: true,
        },
      });

      KPIS.forEach((kpi, idx) => {
        const el = numberRefs.current[idx];
        if (!el) return;

        const counterObj = { val: 0 };

        // Sequential one-by-one count-up animation
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
          idx * 0.28 // Stagger each counter one by one
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#F4F3EF] border-b border-black/15">
      {/* 4-Column Border-Collapsed KPI Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-black/15">
        {KPIS.map((item, idx) => (
          <div
            key={item.id}
            className="p-8 md:p-12 flex flex-col justify-between hover:bg-[#EAE8E1]/50 transition-colors"
          >
            {/* Top row */}
            <div className="flex items-center justify-between font-mono text-xs text-neutral-500 mb-6">
              <span>[{item.id}]</span>
              <span className="w-2 h-2 bg-[#10B981] inline-block" />
            </div>

            {/* Middle giant numeral with one-by-one count-up */}
            <div className="font-display font-black text-6xl md:text-7xl lg:text-8xl leading-none text-[#0D0D0D] tracking-tight uppercase mb-4 tabular-nums flex items-baseline">
              {item.prefix && <span>{item.prefix}</span>}
              <span
                ref={(el) => {
                  numberRefs.current[idx] = el;
                }}
              >
                0{item.decimals ? '.0' : ''}
              </span>
              {item.suffix && <span>{item.suffix}</span>}
            </div>

            {/* Bottom label */}
            <div>
              <div className="font-tech text-base md:text-lg font-bold text-[#0D0D0D] tracking-tight">
                {item.label}
              </div>
              <div className="font-mono text-[11px] text-neutral-600 uppercase tracking-wider mt-1">
                {item.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Velocity Skew Marquee */}
      <VelocityMarquee text="FULL-STACK RESTAURANT GROWTH — PREDICTABLE COVERS — HIGH-MARGIN HOSPITALITY — " />
    </div>
  );
};
