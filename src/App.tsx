import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AudienceProvider } from './context/AudienceContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { MagneticCursor } from './components/motion/MagneticCursor';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { KpiStrip } from './components/KpiStrip';
import { VelocityMarquee } from './components/motion/VelocityMarquee';
import { ServiceAccordion } from './components/ServiceAccordion';
import { DistrictOutdoorShowcase } from './components/DistrictOutdoorShowcase';
import { CreatorStudioSuite } from './components/CreatorStudioSuite';
import { Testimonials } from './components/Testimonials';
import { CalculatorAndContact } from './components/CalculatorAndContact';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Initialize Lenis smooth scroll foundation
  useSmoothScroll();

  return (
    <div className="bg-[#F4F3EF] text-[#0D0D0D] min-h-screen selection:bg-[#FACC15] selection:text-black relative">
      {/* Custom Fluid Magnetic Cursor */}
      <MagneticCursor />

      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-5 focus:py-3 focus:bg-[#FACC15] focus:text-[#0D0D0D] focus:font-tech focus:text-xs focus:font-bold focus:uppercase focus:outline-none focus:ring-2 focus:ring-black"
      >
        Skip to main content
      </a>

      {/* Entrance Preloader */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* Swiss Architectural Exposed Grid Navbar */}
      <Navbar isLoaded={isLoaded} />

      <main id="main-content" tabIndex={-1} className="w-full max-w-full focus:outline-none">
        {/* Section 02: 12-Column Hero & Spec Bar */}
        <Hero isLoaded={isLoaded} />

        {/* Section 03: Border-Collapsed KPI Matrix ("Experience that builds trust") */}
        <KpiStrip />

        {/* Section 04: Full-Spectrum Service Architecture (Moved between KPI numbers and Marquee) */}
        <ServiceAccordion />

        {/* Section 05: Velocity Skew Marquee */}
        <VelocityMarquee />

        {/* Section 06: Dark Obsidian Case Studies & Vertical 9:16 Video Showcase */}
        <DistrictOutdoorShowcase />

        {/* Section 07: Sticky-Stacking Architectural Growth Panels */}
        <CreatorStudioSuite />

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
