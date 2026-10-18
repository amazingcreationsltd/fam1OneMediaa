import React from 'react';
import { AgencyProcess } from './AgencyProcess';
import { ContactSection } from './ContactSection';

export const CalculatorAndContact: React.FC = () => {
  return (
    <>
      {/* Section 09-A: Operational Velocity Sprint Process */}
      <AgencyProcess />

      {/* Section 09-B: Dedicated Contact Intake Section */}
      <ContactSection />
    </>
  );
};
