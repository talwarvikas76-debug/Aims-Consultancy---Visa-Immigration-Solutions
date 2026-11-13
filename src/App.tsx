/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustCredentialsStrip } from './components/TrustCredentialsStrip';
import { WhyChooseAims } from './components/WhyChooseAims';
import { ApplicationTracker } from './components/ApplicationTracker';
import { CountryComparisonTool } from './components/CountryComparisonTool';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { DestinationsSection } from './components/DestinationsSection';
import { BookingConsole } from './components/BookingConsole';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { EligibilityCheckerModal } from './components/EligibilityCheckerModal';
import { PrintableVoucherModal } from './components/PrintableVoucherModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { VirtualAssistantWidget } from './components/VirtualAssistantWidget';
import { BookingFormData, Language } from './types';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [eligibilityPrefill, setEligibilityPrefill] = useState<{
    destination?: string;
    visaType?: string;
    age?: string;
    experience?: string;
  } | undefined>();

  const [bookingPrefill, setBookingPrefill] = useState<Partial<BookingFormData> | undefined>();
  const [contactPrefillService, setContactPrefillService] = useState<string | undefined>();
  const [printableBooking, setPrintableBooking] = useState<BookingFormData | null>(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const handleOpenBooking = (prefill?: { visaType?: string; destination?: string }) => {
    if (prefill) {
      setBookingPrefill((prev) => ({
        ...prev,
        ...prefill,
      }));
    }
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectDestination = (destinationName: string) => {
    setBookingPrefill((prev) => ({
      ...prev,
      destination: destinationName,
    }));
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContactWithService = (serviceTitle: string) => {
    setContactPrefillService(serviceTitle);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProceedFromEligibility = (prefill: {
    visaType: string;
    destination: string;
    education: string;
    notes: string;
  }) => {
    setBookingPrefill({
      visaType: prefill.visaType,
      destination: prefill.destination,
      education: prefill.education,
      notes: prefill.notes,
    });
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenEligibilityWithPrefill = (prefill: {
    destination: string;
    visaType: string;
    age: string;
    experience: string;
  }) => {
    setEligibilityPrefill(prefill);
    setIsEligibilityOpen(true);
  };

  const handleOpenTracker = () => {
    const el = document.getElementById('tracker');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenComparison = () => {
    const el = document.getElementById('comparison');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#334155] font-sans selection:bg-[#C29B38]/30 selection:text-[#0F172A] relative overflow-x-hidden">
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenEligibility={() => setIsEligibilityOpen(true)}
        onOpenTracker={handleOpenTracker}
        onOpenComparison={handleOpenComparison}
        currentLanguage={currentLanguage}
        onLanguageChange={(lang) => setCurrentLanguage(lang)}
      />

      <main className="flex-1">
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenEligibility={() => setIsEligibilityOpen(true)}
          onOpenEligibilityWithPrefill={handleOpenEligibilityWithPrefill}
          onSelectDestination={handleSelectDestination}
          currentLanguage={currentLanguage}
        />

        {/* Prominent Trust & Licensing Credentials Section near Top of Page */}
        <TrustCredentialsStrip />

        <WhyChooseAims
          currentLanguage={currentLanguage}
          onOpenBooking={() => handleOpenBooking()}
          onOpenEligibility={() => setIsEligibilityOpen(true)}
        />

        <ServicesSection
          onOpenBooking={handleOpenBooking}
          onOpenContactWithService={handleOpenContactWithService}
        />

        <ApplicationTracker />

        <CountryComparisonTool
          onOpenBooking={handleOpenBooking}
          onOpenEligibility={() => setIsEligibilityOpen(true)}
        />

        <AboutSection />

        <ProcessSection onOpenBooking={() => handleOpenBooking()} />

        <DestinationsSection onSelectDestination={handleSelectDestination} />

        <BookingConsole
          prefillData={bookingPrefill}
          onOpenPrintPass={(data) => setPrintableBooking(data)}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
        />

        <TestimonialsSection />

        <FAQSection />

        <ContactSection
          initialService={contactPrefillService}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
        />
      </main>

      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenEligibility={() => setIsEligibilityOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />

      {/* Mobile Sticky Bottom Bar with Instant Call & WhatsApp Buttons */}
      <MobileStickyCTA />

      {/* Fixed Bottom-Right WhatsApp & Quick Contact Widget */}
      <VirtualAssistantWidget onOpenBooking={() => handleOpenBooking()} />

      <EligibilityCheckerModal
        isOpen={isEligibilityOpen}
        onClose={() => {
          setIsEligibilityOpen(false);
          setEligibilityPrefill(undefined);
        }}
        onProceedToBooking={handleProceedFromEligibility}
        initialPrefill={eligibilityPrefill}
      />

      <PrintableVoucherModal
        bookingData={printableBooking}
        onClose={() => setPrintableBooking(null)}
      />

      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
