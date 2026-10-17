import React, { useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useGSAPScrollReveal } from '../hooks/useGSAPScrollReveal';

export const Workflow: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAPScrollReveal(sectionRef, {
    headerSelector: '.section-header',
    itemsSelector: '.workflow-step',
    stagger: 0.16,
  });

  return (
    <section ref={sectionRef} id="workflow" className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="section-header mb-10">
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          The Three-Stage Production Pipeline
        </h2>
        <p className="mt-2 text-muted text-sm sm:text-base max-w-xl">
          Every engagement follows a locked operational sequence with zero deliverable ambiguity.
        </p>
      </div>

      {/* 3 Step Double-Bezel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div className="workflow-step double-bezel group">
          <div className="double-bezel-inner p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-semibold text-accent uppercase tracking-wider">
                  Stage One
                </span>
                <span className="text-muted font-medium">Days 1–5</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                Audience Audit & Match
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-6">
                We audit demographic overlap between target customer profiles and creator followers. Licensing terms, commercial deliverables, and conversion milestones are locked upfront.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-muted font-medium">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
              <span>Full rights & contract indemnity</span>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="workflow-step double-bezel group">
          <div className="double-bezel-inner p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-semibold text-accent uppercase tracking-wider">
                  Stage Two
                </span>
                <span className="text-muted font-medium">Days 6 – 12</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                Studio Post & Hook Design
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-6">
                Our post-production desk cuts, color grades, and sound engineers all 9:16 assets. Every cut is engineered for aggressive 3-second retention and high completion rates.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-muted font-medium">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
              <span>Strict 48-hour revision turnaround</span>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="workflow-step double-bezel group">
          <div className="double-bezel-inner p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-semibold text-accent uppercase tracking-wider">
                  Stage Three
                </span>
                <span className="text-muted font-medium">Day 14 Onward</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                Conversion Capture & Scale
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-6">
                Live campaign launch channels viewer attention straight onto sub-second booking pages. Footfall surges and customer transactions are monitored in real time.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-muted font-medium">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
              <span>Real-time revenue attribution</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
