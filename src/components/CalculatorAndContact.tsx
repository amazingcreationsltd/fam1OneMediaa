import React, { useState } from 'react';
import { EstimatorSection } from './EstimatorSection';
import { ContactSection } from './ContactSection';

export const CalculatorAndContact: React.FC = () => {
  // Brand Calculator State
  const [budget, setBudget] = useState<number>(7500);
  const [industry, setIndustry] = useState<string>('ecommerce');

  // Creator Calculator State
  const [followers, setFollowers] = useState<number>(120000);
  const [niche, setNiche] = useState<string>('lifestyle');

  // Calculations: Brand
  const reachLow = Math.round(budget * 85);
  const reachHigh = Math.round(budget * 145);
  const creatorsCount = Math.max(2, Math.round(budget / 800));
  const creatorRange = `${creatorsCount - 1} – ${creatorsCount + 2} Verified Creators`;

  let growthDisplay = '';
  if (industry === 'ecommerce' || industry === 'consumer') {
    const roas = Math.min(4.8, 3.2 + (budget / 30000) * 1.4).toFixed(1);
    growthDisplay = `${roas}× Attributed ROAS`;
  } else {
    const liftLow = Math.min(180, Math.round(budget * 0.003 + 45));
    const liftHigh = liftLow + 40;
    growthDisplay = `+${liftLow}% – +${liftHigh}% Lift`;
  }

  // Calculations: Creator
  let multiplier = 1.0;
  if (niche === 'tech') multiplier = 1.45;
  else if (niche === 'lifestyle') multiplier = 1.15;

  const rateLow = Math.round(followers * 0.012 * multiplier);
  const rateHigh = Math.round(rateLow * 1.45);
  const dealsLow = Math.round(rateLow * 3.5);
  const dealsHigh = Math.round(rateHigh * 4.2);

  return (
    <>
      {/* Section 09-A: Campaign Estimator with Scroll Reveal */}
      <EstimatorSection
        budget={budget}
        setBudget={setBudget}
        industry={industry}
        setIndustry={setIndustry}
        followers={followers}
        setFollowers={setFollowers}
        niche={niche}
        setNiche={setNiche}
        growthDisplay={growthDisplay}
        reachLow={reachLow}
        reachHigh={reachHigh}
        creatorRange={creatorRange}
        rateLow={rateLow}
        rateHigh={rateHigh}
        dealsLow={dealsLow}
        dealsHigh={dealsHigh}
      />

      {/* Section 09-B: Dedicated Contact Intake Section with Scroll Reveal */}
      <ContactSection
        budget={budget}
        industry={industry}
        followers={followers}
        niche={niche}
      />
    </>
  );
};
