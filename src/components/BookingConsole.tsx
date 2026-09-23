import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Printer, 
  MessageCircle, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileText,
  ChevronDown,
  ChevronUp,
  Download,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BookingFormData } from '../types';
import { COMPANY_DETAILS } from '../data/aimsData';
import { getWhatsAppDeliveryUrl } from '../utils/whatsappRouting';
import { AimsLogo } from './AimsLogo';

interface BookingConsoleProps {
  prefillData?: Partial<BookingFormData>;
  onOpenPrintPass?: (data: BookingFormData) => void;
}

export const BookingConsole: React.FC<BookingConsoleProps> = ({ 
  prefillData,
  onOpenPrintPass
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [dateError, setDateError] = useState<string | null>(null);
  const [showChecklist, setShowChecklist] = useState<boolean>(false);

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

  // Calculate today's date in YYYY-MM-DD for min date attribute
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (prefillData) {
      setFormData((prev) => ({
        ...prev,
        ...prefillData,
      }));
    }
  }, [prefillData]);

  // Handle date change with Sunday validation
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value;
    setDateError(null);

    if (!selected) {
      setFormData((prev) => ({ ...prev, date: '' }));
      return;
    }

    const d = new Date(selected);
    const dayOfWeek = d.getUTCDay();

    // In JS UTC: 0 is Sunday
    if (dayOfWeek === 0) {
      setDateError('Our Hoshiarpur office is closed on Sundays for consular rest. Please select Monday through Saturday.');
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
        colors: ['#2563EB', '#3B82F6', '#10B981'],
      });
    } catch {
      // Ignore if unavailable
    }

    // Scroll smoothly to booking console
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="booking" className="py-16 sm:py-20 bg-slate-50 text-slate-800 relative overflow-hidden border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-slate-800 border border-red-200/90 text-xs font-bold tracking-wide shadow-xs">
            <AimsLogo variant="emblem" className="w-4 h-4" />
            <span>100% Free Consultation • Zero Advance Charges</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
            Book a Free Visa Consultation
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Consult 1-on-1 with our senior advisors in Hoshiarpur with absolutely no consultation fees or advance charges. Includes complete profile evaluation, university/visa pathway audit, and documentation roadmap.
          </p>

          <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-slate-800 shadow-xs">
            <span className="flex items-center gap-1 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Consultation Fee: Free (₹0)
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-normal">Full 45-Minute Dedicated Session</span>
          </div>
        </div>

        {/* 2-Step Wizard Indicator */}
        <div className="max-w-md mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
            
            {/* Step 1 Pill */}
            <div className={`relative z-10 flex flex-col items-center gap-1 ${step >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                step === 1 ? 'bg-blue-600 text-white font-extrabold shadow-md shadow-blue-500/30' : 'bg-emerald-600 text-white'
              }`}>
                {step > 1 ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <span className="text-[11px] font-bold">1. Consultation Details</span>
            </div>

            {/* Step 2 Pill */}
            <div className={`relative z-10 flex flex-col items-center gap-1 ${step === 2 ? 'text-blue-600' : 'text-slate-400'}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                step === 2 ? 'bg-blue-600 text-white font-extrabold shadow-md shadow-blue-500/30' : 'bg-white border border-slate-300 text-slate-500'
              }`}>
                2
              </div>
              <span className="text-[11px] font-bold">2. Confirmed Pass (Free)</span>
            </div>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-8">
          
          {/* STEP 1: FORM */}
          {step === 1 && (
            <form onSubmit={handleConfirmBooking} className="space-y-6">
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                  <span>Applicant Profile & Travel Purpose</span>
                  <span className="text-xs font-normal text-slate-500">(* indicates mandatory)</span>
                </h3>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                  Zero Consultation Fee
                </span>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gurpreet Singh"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    WhatsApp / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. gurpreet@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Service & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Visa / Consultation Category *
                  </label>
                  <select
                    value={formData.visaType}
                    onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
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
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Target Destination / Country *
                  </label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
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
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Highest Education Completed
                  </label>
                  <select
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
                  >
                    <option value="12th Grade (Senior Secondary)">12th Grade (Senior Secondary)</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="Diploma / Polytechnic">Diploma / Polytechnic</option>
                    <option value="Other">Other / Professional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    IELTS / PTE / Test Band or Percentage
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. IELTS 6.5 Overall (no band < 6.0) or 75% in 12th"
                    value={formData.gpaOrScore}
                    onChange={(e) => setFormData({ ...formData, gpaOrScore: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Appointment Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Appointment Date * <span className="text-slate-500 font-normal">(Mon-Sat only)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={formData.date}
                      onChange={handleDateChange}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
                    />
                  </div>
                  {dateError && (
                    <p className="text-xs text-amber-600 mt-1.5 flex items-start gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>{dateError}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Preferred Consultation Slot *
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
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
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Additional Notes / Specific Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Mention any specific universities, previous visa refusal details, or travel goals..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              {/* Progressive Disclosure: What to Bring to Consultation */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowChecklist(!showChecklist)}
                  className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>✦ {showChecklist ? 'Hide' : 'View Recommended Documents to Bring for Your Free Evaluation'}</span>
                  {showChecklist ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showChecklist && (
                  <div className="mt-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5 animate-fadeIn">
                    <p className="font-semibold text-slate-900">Bring any of the following if available (originals or photocopies):</p>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 text-[11px]">
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
                  className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  <span>Confirm Free Consultation Slot</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-2">
                  🛡️ 100% Free Consultation • Zero charges • Walk-ins & scheduled appointments welcome.
                </p>
              </div>
            </form>
          )}

          {/* STEP 2: CONFIRMED BOOKING PASS */}
          {step === 2 && (
            <div className="space-y-6 text-center animate-fadeIn">
              <div className="w-14 h-14 bg-emerald-100 border border-emerald-200 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  FREE CONSULTATION RESERVED
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2 font-display">
                  Appointment Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-1">
                  Thank you, <strong>{formData.fullName}</strong>. Your complimentary one-on-one session with our senior immigration advisors has been scheduled at our Hoshiarpur office.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl p-5 text-left space-y-3 relative shadow-md">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <AimsLogo variant="horizontal" theme="light" showTagline={false} className="scale-90 origin-left" />
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Consultation Pass</span>
                    <div className="text-sm font-mono font-black text-[#d90429]">
                      {formData.bookingRef}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Applicant</span>
                    <strong className="text-slate-900">{formData.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Contact Mobile</span>
                    <span className="text-slate-700">{formData.mobile}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Visa / Country</span>
                    <span className="text-blue-700 font-semibold">{formData.visaType} ({formData.destination})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Appointment Slot</span>
                    <span className="text-slate-900 font-bold">{formData.date}</span>
                    <span className="text-slate-500 block text-[10px]">{formData.timeSlot}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Consultation Fee: Free (₹0)</span>
                  <span className="flex items-center gap-1 text-slate-700 font-semibold">
                    <MapPin className="w-3 h-3 text-blue-600" />
                    Hoshiarpur, Punjab
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => onOpenPrintPass && onOpenPrintPass(formData)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 border border-slate-300 cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4 text-blue-600" />
                  <span>Print / Save Pass</span>
                </button>

                {/* WhatsApp button with time-based routing */}
                <a
                  href={getWhatsAppDeliveryUrl(
                    `Hello AIMS Consultancy, I have confirmed my free consultation booking (Ref: ${formData.bookingRef}) for ${formData.fullName} on ${formData.date} at ${formData.timeSlot}. Looking forward to the session!`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
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
                  className="w-full sm:w-auto px-4 py-2.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
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
