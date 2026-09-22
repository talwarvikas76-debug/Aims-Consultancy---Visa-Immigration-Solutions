/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
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
import { BookingFormData } from './types';

export default function App() {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
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

  // Destination card click handler -> prefill destination and scroll to booking
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

  return (
    <div className="min-h-screen flex flex-col bg-[#060f0c] text-slate-200 font-sans selection:bg-emerald-600 selection:text-white relative overflow-x-hidden">
      {/* Immersive Ambient Glow Orbs - Eye-Soothing Emerald & Sage */}
      <div className="fixed top-0 left-1/4 w-[550px] h-[550px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-10 w-[450px] h-[450px] bg-teal-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-1/3 w-[600px] h-[600px] bg-emerald-800/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Navigation */}
      <Navbar 
        onOpenBooking={() => handleOpenBooking()}
        onOpenEligibility={() => setIsEligibilityOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection 
          onOpenBooking={() => handleOpenBooking()}
          onOpenEligibility={() => setIsEligibilityOpen(true)}
          onSelectDestination={handleSelectDestination}
        />

        <AboutSection />

        <ServicesSection 
          onOpenBooking={handleOpenBooking}
          onOpenContactWithService={handleOpenContactWithService}
        />

        <ProcessSection 
          onOpenBooking={() => handleOpenBooking()}
        />

        <DestinationsSection 
          onSelectDestination={handleSelectDestination}
        />

        <BookingConsole 
          prefillData={bookingPrefill}
          onOpenPrintPass={(data) => setPrintableBooking(data)}
        />

        <TestimonialsSection />

        <FAQSection />

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

      {/* Interactive Eligibility & Requirements Modal */}
      <EligibilityCheckerModal 
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
        onProceedToBooking={handleProceedFromEligibility}
      />

      {/* Printable / Downloadable Appointment Voucher Modal */}
      <PrintableVoucherModal 
        bookingData={printableBooking}
        onClose={() => setPrintableBooking(null)}
      />
    </div>
  );
}
