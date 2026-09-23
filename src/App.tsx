/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
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
import { EligibilityCheckerModal } from './components/EligibilityCheckerModal';
import { PrintableVoucherModal } from './components/PrintableVoucherModal';
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

  // Trigger scroll to booking with optional prefilled parameters
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

  // Destination click handler -> prefill destination and scroll to booking
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

  // Service enquiry click handler -> scroll to contact with service pre-selected
  const handleOpenContactWithService = (serviceTitle: string) => {
    setContactPrefillService(serviceTitle);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handoff from Eligibility Modal directly into booking
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

  // Handoff from Hero Card directly into Eligibility Checker Modal
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
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      
      {/* Navigation matching image.png */}
      <Navbar 
        onOpenBooking={() => handleOpenBooking()}
        onOpenEligibility={() => setIsEligibilityOpen(true)}
        onOpenTracker={handleOpenTracker}
        onOpenComparison={handleOpenComparison}
        currentLanguage={currentLanguage}
        onLanguageChange={(lang) => setCurrentLanguage(lang)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Dynamic Hero with Check Your Eligibility Engine matching image.png */}
        <HeroSection 
          onOpenBooking={() => handleOpenBooking()}
          onOpenEligibility={() => setIsEligibilityOpen(true)}
          onOpenEligibilityWithPrefill={handleOpenEligibilityWithPrefill}
          onSelectDestination={handleSelectDestination}
          currentLanguage={currentLanguage}
        />

        {/* Why Choose AIMS Section matching image.png */}
        <WhyChooseAims 
          currentLanguage={currentLanguage}
          onOpenBooking={() => handleOpenBooking()}
          onOpenEligibility={() => setIsEligibilityOpen(true)}
        />

        {/* Client Portal & Live Application Tracker */}
        <ApplicationTracker />

        {/* Interactive Country & Pathway Comparison Tool */}
        <CountryComparisonTool 
          onOpenBooking={handleOpenBooking}
          onOpenEligibility={() => setIsEligibilityOpen(true)}
        />

        {/* About Section */}
        <AboutSection />

        {/* Services Directory */}
        <ServicesSection 
          onOpenBooking={handleOpenBooking}
          onOpenContactWithService={handleOpenContactWithService}
        />

        {/* Step-by-Step Consular Process */}
        <ProcessSection 
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Country & Destination Explorer */}
        <DestinationsSection 
          onSelectDestination={handleSelectDestination}
        />

        {/* Booking Console for 100% Free Consultations */}
        <BookingConsole 
          prefillData={bookingPrefill}
          onOpenPrintPass={(data) => setPrintableBooking(data)}
        />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* FAQs */}
        <FAQSection />

        {/* Contact Desk */}
        <ContactSection 
          initialService={contactPrefillService}
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenBooking={() => handleOpenBooking()}
        onOpenEligibility={() => setIsEligibilityOpen(true)}
      />

      {/* Floating Virtual Assistant Widget */}
      <VirtualAssistantWidget 
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Interactive Eligibility & Requirements Modal (Visa Eligibility Quiz matching image) */}
      <EligibilityCheckerModal 
        isOpen={isEligibilityOpen}
        onClose={() => {
          setIsEligibilityOpen(false);
          setEligibilityPrefill(undefined);
        }}
        onProceedToBooking={handleProceedFromEligibility}
        initialPrefill={eligibilityPrefill}
      />

      {/* Printable / Downloadable Appointment Voucher Modal */}
      <PrintableVoucherModal 
        bookingData={printableBooking}
        onClose={() => setPrintableBooking(null)}
      />
    </div>
  );
}
