import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Printer, 
  MessageCircle, 
  AlertCircle,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Check,
  MapPin,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_DETAILS } from '../data/aimsData';
import { BookingFormData } from '../types';
import { getWhatsAppDeliveryUrl } from '../utils/whatsappRouting';

interface BookingConsoleProps {
  prefillData?: Partial<BookingFormData>;
  onOpenPrintPass?: (bookingData: BookingFormData) => void;
}

export const BookingConsole: React.FC<BookingConsoleProps> = ({ 
  prefillData,
  onOpenPrintPass 
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [dateError, setDateError] = useState<string | null>(null);
  const [showChecklist, setShowChecklist] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    mobile: '',
    email: '',
    visaType: 'Student Visa (Study Permit)',
    destination: 'Canada',
    education: "Bachelor's Degree",
    gpaOrScore: '',
    date: '',
    timeSlot: '10:00 AM - 11:30 AM',
    notes: '',
    bookingRef: '',
  });

  // Calculate today's date formatted as YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  // React to prefilled inputs
  useEffect(() => {
    if (prefillData) {
      setFormData((prev) => ({
        ...prev,
        ...prefillData,
      }));
    }
  }, [prefillData]);

  // Handle date changes with Sunday validation
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value;
    setDateError(null);

    if (!selected) {
      setFormData((prev) => ({ ...prev, date: '' }));
      return;
    }

    const d = new Date(selected);
    // getDay() 0 is Sunday
    if (d.getDay() === 0) {
      setDateError('AIMS Consultancy is closed on Sundays. Please select a slot between Monday and Saturday.');
      setFormData((prev) => ({ ...prev, date: '' }));
      return;
    }

    setFormData((prev) => ({ ...prev, date: selected }));
  };

  // Submit details and confirm booking directly without any charges
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date) {
      setDateError('Please select a valid consultation appointment date.');
      return;
    }

    // Generate verified reference number
    const generatedRef = `AIMS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const updatedData: BookingFormData = {
      ...formData,
      bookingRef: generatedRef,
      bookedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setFormData(updatedData);
    setStep(2);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#14B8A6', '#059669'],
      });
    } catch {
      // Ignore if unavailable
    }

    // Scroll smoothly to booking console
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="booking" className="py-16 sm:py-20 bg-[#060f0c] text-slate-200 relative overflow-hidden border-b border-emerald-950/80">
      {/* Background Accent Gradients */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-800/60 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Free Consultation • Zero Advance Charges</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Book a Free Visa Consultation
          </h2>
          <p className="text-emerald-100/70 text-sm sm:text-base">
            Consult 1-on-1 with our senior advisors in Hoshiarpur with absolutely no consultation fees or advance charges. Includes complete profile evaluation, university/visa pathway audit, and documentation roadmap.
          </p>

          <div className="inline-flex items-center gap-2 bg-[#091712] px-4 py-1.5 rounded-full border border-emerald-800/40 text-xs font-bold text-emerald-300 shadow-sm">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Consultation Fee: Free (₹0)
            </span>
            <span className="text-emerald-800">•</span>
            <span className="text-emerald-200 font-normal">Full 45-Minute Dedicated Session</span>
          </div>
        </div>

        {/* 2-Step Wizard Indicator */}
        <div className="max-w-md mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-emerald-950 -translate-y-1/2 z-0" />
            
            {/* Step 1 Pill */}
            <div className={`relative z-10 flex flex-col items-center gap-1 ${step >= 1 ? 'text-emerald-400' : 'text-slate-600'}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                step === 1 ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-extrabold shadow-md shadow-emerald-950/80' : 'bg-emerald-600 text-white'
              }`}>
                {step > 1 ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <span className="text-[11px] font-semibold">1. Consultation Details</span>
            </div>

            {/* Step 2 Pill */}
            <div className={`relative z-10 flex flex-col items-center gap-1 ${step === 2 ? 'text-emerald-400' : 'text-slate-500'}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                step === 2 ? 'bg-emerald-600 text-white font-extrabold shadow-md shadow-emerald-950/80' : 'bg-[#091712] border border-emerald-900 text-slate-400'
              }`}>
                2
              </div>
              <span className="text-[11px] font-semibold">2. Confirmed Pass (Free)</span>
            </div>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="bg-[#091712]/95 border border-emerald-950/90 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
          
          {/* STEP 1: FORM */}
          {step === 1 && (
            <form onSubmit={handleConfirmBooking} className="space-y-6">
              <div className="border-b border-emerald-950 pb-4 flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                  <span>Applicant Profile & Travel Purpose</span>
                  <span className="text-xs font-normal text-emerald-200/60">(* indicates mandatory)</span>
                </h3>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 text-xs font-semibold">
                  Zero Consultation Fee
                </span>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gurpreet Singh"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#06110d] border border-emerald-900/80 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    WhatsApp / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#06110d] border border-emerald-900/80 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. gurpreet@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#06110d] border border-emerald-900/80 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Service & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Visa / Consultation Category *
                  </label>
                  <select
                    value={formData.visaType}
                    onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#06110d] border border-emerald-900/80 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Student Visa (Study Permit)">Student Visa (Study Permit)</option>
                    <option value="Tourist / Visitor Visa">Tourist / Visitor Visa</option>
                    <option value="Tatkal / Normal Passport Seva">Tatkal / Normal Passport Seva</option>
                    <option value="Air Ticketing & Student Baggage">Air Ticketing & Student Baggage</option>
                    <option value="Refusal Case Audit (CAIPS/GCMS)">Refusal Case Audit (CAIPS/GCMS)</option>
                    <option value="Work / PR Advisory">Work / PR Advisory</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Target Destination / Country *
                  </label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#06110d] border border-emerald-900/80 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Canada">Canada (SDS & PAL)</option>
                    <option value="United Kingdom">United Kingdom (CAS & PSW)</option>
                    <option value="Australia">Australia (Subclass 500)</option>
                    <option value="United States">United States (F1 / B1/B2)</option>
                    <option value="Schengen Europe">Schengen Europe (Germany, France, etc.)</option>
                    <option value="Dubai / UAE">Dubai / UAE (24-72h e-Visa)</option>
                    <option value="Other / Domestic Seva">Other / Domestic Passport Seva</option>
                  </select>
                </div>
              </div>

              {/* Education & IELTS/Score */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Highest Education Completed
                  </label>
                  <select
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#06110d] border border-emerald-900/80 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="12th Grade (Senior Secondary)">12th Grade (Senior Secondary)</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="Diploma / Polytechnic">Diploma / Polytechnic</option>
                    <option value="Other">Other / Professional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    IELTS / PTE / Test Band or Percentage
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. IELTS 6.5 Overall (no band < 6.0) or 75% in 12th"
                    value={formData.gpaOrScore}
                    onChange={(e) => setFormData({ ...formData, gpaOrScore: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#06110d] border border-emerald-900/80 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Appointment Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-emerald-950">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Appointment Date * <span className="text-emerald-300/60 font-normal">(Mon-Sat only)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={formData.date}
                      onChange={handleDateChange}
                      className="w-full px-3.5 py-2.5 bg-[#06110d] border border-emerald-900/80 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  {dateError && (
                    <p className="text-xs text-amber-400 mt-1.5 flex items-start gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>{dateError}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Preferred Consultation Slot *
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#06110d] border border-emerald-900/80 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="10:00 AM - 11:30 AM">Morning: 10:00 AM - 11:30 AM</option>
                    <option value="11:30 AM - 01:00 PM">Midday: 11:30 AM - 01:00 PM</option>
                    <option value="02:00 PM - 03:30 PM">Afternoon: 02:00 PM - 03:30 PM</option>
                    <option value="04:00 PM - 05:30 PM">Evening: 04:00 PM - 05:30 PM</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Additional Notes / Specific Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Mention any specific universities, previous visa refusal details, or travel goals..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#06110d] border border-emerald-900/80 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Progressive Disclosure: What to Bring to Consultation */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowChecklist(!showChecklist)}
                  className="text-xs text-emerald-300 hover:text-emerald-200 font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>✦ {showChecklist ? 'Hide' : 'View Recommended Documents to Bring for Your Free Evaluation'}</span>
                  {showChecklist ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showChecklist && (
                  <div className="mt-2.5 p-3.5 rounded-xl bg-[#06110d] border border-emerald-800/40 text-xs text-slate-300 space-y-1.5 animate-fadeIn">
                    <p className="font-semibold text-emerald-300">Bring any of the following if available (originals or photocopies):</p>
                    <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
                      <li>Original or copy of current Passport (Bio pages)</li>
                      <li>Academic certificates: 10th, 12th, Degree DMC marksheets</li>
                      <li>IELTS / PTE / TOEFL official score report if completed</li>
                      <li>If previous refusal: Embassy refusal letter (for CAIPS/GCMS notes ordering)</li>
                      <li>Family financial overview / sponsor occupation details</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold rounded-xl text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/80 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  <span>Confirm Free Consultation Slot</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-center text-[11px] text-emerald-200/60 mt-2">
                  🛡️ 100% Free Consultation • Zero charges • Walk-ins & scheduled appointments welcome.
                </p>
              </div>
            </form>
          )}

          {/* STEP 2: CONFIRMED BOOKING PASS */}
          {step === 2 && (
            <div className="space-y-6 text-center animate-fadeIn">
              <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-950/60">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-800">
                  FREE CONSULTATION RESERVED
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-2 font-display">
                  Appointment Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 max-w-md mx-auto mt-1">
                  Thank you, <strong>{formData.fullName}</strong>. Your complimentary one-on-one session with our senior immigration advisors has been scheduled at our Hoshiarpur office.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="max-w-md mx-auto bg-[#06110d] border border-emerald-900/80 rounded-2xl p-5 text-left space-y-3 relative shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-950">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Booking Reference</span>
                    <div className="text-base font-black text-emerald-300 font-mono">
                      {formData.bookingRef}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Charges</span>
                    <span className="block text-xs font-bold text-emerald-400">100% Free (₹0)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Applicant</span>
                    <strong className="text-white">{formData.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Contact Mobile</span>
                    <span className="text-slate-200">{formData.mobile}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Visa / Country</span>
                    <span className="text-emerald-300 font-semibold">{formData.visaType} ({formData.destination})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Appointment Slot</span>
                    <span className="text-white font-bold">{formData.date}</span>
                    <span className="text-emerald-300/80 block text-[10px]">{formData.timeSlot}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-emerald-950 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Consultation Fee: Free (₹0)</span>
                  <span className="flex items-center gap-1 text-emerald-300">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    Hoshiarpur, Punjab
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => onOpenPrintPass && onOpenPrintPass(formData)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#091712] hover:bg-[#0d221a] text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 border border-emerald-900/60 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-emerald-400" />
                  <span>Print / Save Pass</span>
                </button>

                {/* WhatsApp button with time-based routing */}
                <a
                  href={getWhatsAppDeliveryUrl(
                    `Hello AIMS Consultancy, I have confirmed my free consultation booking (Ref: ${formData.bookingRef}) for ${formData.fullName} on ${formData.date} at ${formData.timeSlot}. Looking forward to the session!`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-950/80"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Notify via WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setFormData({
                      fullName: '',
                      mobile: '',
                      email: '',
                      visaType: 'Student Visa (Study Permit)',
                      destination: 'Canada',
                      education: "Bachelor's Degree",
                      gpaOrScore: '',
                      date: '',
                      timeSlot: '10:00 AM - 11:30 AM',
                      notes: '',
                      bookingRef: '',
                    });
                    setStep(1);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Schedule Another Appointment
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
