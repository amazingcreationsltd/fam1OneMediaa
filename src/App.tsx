import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AudienceProvider } from './context/AudienceContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AudienceFork } from './components/AudienceFork';
import { DistrictOutdoorShowcase } from './components/DistrictOutdoorShowcase';
import { CreatorStudioSuite } from './components/CreatorStudioSuite';
import { BentoServices } from './components/BentoServices';
import { PhoneShowcase } from './components/PhoneShowcase';
import { ServiceAccordion } from './components/ServiceAccordion';
import { Workflow } from './components/Workflow';
import { Testimonials } from './components/Testimonials';
import { CreatorRoster } from './components/CreatorRoster';
import { Calculator } from './components/Calculator';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { ArchitecturalSection, MagneticCursor, VelocityMarquee } from './components/MotionPrimitives';

const AppContent: React.FC = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Initialize smooth scroll foundation
  useSmoothScroll();

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Preloader onComplete={() => setIsLoaded(true)} />
      <MagneticCursor />
      <Navbar isLoaded={isLoaded} />
      <main className="w-full max-w-full pt-16">
        <ArchitecturalSection index="01" label="FULL-STACK HOSPITALITY ENGINE" id="hero"><Hero isLoaded={isLoaded} /></ArchitecturalSection>
        <VelocityMarquee text="FULL-STACK RESTAURANT GROWTH — PREDICTABLE COVERS — HIGH-MARGIN HOSPITALITY —" />
        <ArchitecturalSection index="02" label="PARADIGM SHIFT"><AudienceFork /><DistrictOutdoorShowcase /></ArchitecturalSection>
        <ArchitecturalSection index="03" label="VERIFIED CASE ARCHIVE" dark><CreatorStudioSuite /><PhoneShowcase /></ArchitecturalSection>
        <ArchitecturalSection index="04" label="PROPRIETARY GROWTH PROTOCOL"><BentoServices /><ServiceAccordion /><Workflow /></ArchitecturalSection>
        <ArchitecturalSection index="05" label="OPERATOR ENDORSEMENTS"><Testimonials /><CreatorRoster /></ArchitecturalSection>
        <ArchitecturalSection index="06" label="REVENUE PROJECTION & DEPLOYMENT" dark><Calculator /><ContactForm /></ArchitecturalSection>
      </main>
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
