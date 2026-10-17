import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AudienceProvider } from './context/AudienceContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { KpiStrip } from './components/KpiStrip';
import { AudienceFork } from './components/AudienceFork';
import { DistrictOutdoorShowcase } from './components/DistrictOutdoorShowcase';
import { CreatorStudioSuite } from './components/CreatorStudioSuite';
import { ServiceAccordion } from './components/ServiceAccordion';
import { Testimonials } from './components/Testimonials';
import { CalculatorAndContact } from './components/CalculatorAndContact';
import { Footer } from './components/Footer';
import { MagneticCursor } from './components/motion/MagneticCursor';

const AppContent: React.FC = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Initialize Lenis smooth scroll foundation
  useSmoothScroll();

  return (
    <div className="bg-[#F4F3EF] text-[#0D0D0D] min-h-screen selection:bg-[#FACC15] selection:text-black relative overflow-x-hidden">
      {/* Reticle Magnetic Cursor */}
      <MagneticCursor />

      {/* Entrance Preloader */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* Swiss Architectural Exposed Grid Navbar */}
      <Navbar />

      <main className="w-full max-w-full">
        {/* Section 02: 12-Column Hero & Spec Bar */}
        <Hero isLoaded={isLoaded} />

        {/* Section 03: Border-Collapsed KPI Matrix & Velocity Marquee */}
        <KpiStrip />

        {/* Section 04: Audience Split Contrast Comparison Table */}
        <AudienceFork />

        {/* Section 05: Dark Obsidian Case Studies & Vertical 9:16 Video Showcase */}
        <DistrictOutdoorShowcase />

        {/* Section 06: Sticky-Stacking Architectural Growth Panels */}
        <CreatorStudioSuite />

        {/* Section 07: Full-Spectrum Service Architecture */}
        <ServiceAccordion />

        {/* Section 08: Verified Perspectives Matrix */}
        <Testimonials />

        {/* Section 09: Growth Simulator & Command Intake Terminal */}
        <CalculatorAndContact />
      </main>

      {/* Section 10: Obsidian Brutalist Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AudienceProvider>
        <AppContent />
      </AudienceProvider>
    </ThemeProvider>
  );
};

export default App;
