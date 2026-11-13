import React, { useState } from 'react';
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  ChevronRight,
  Plane,
  GraduationCap,
  FileBadge,
  Compass,
  ShieldCheck,
  MessageCircle,
  Sparkles,
  Check,
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { COMPANY_DETAILS } from '../data/aimsData';
import { AIMS_MEDIA } from '../assets/media';
import { getWhatsAppDeliveryUrl } from '../utils/whatsappRouting';
import { AimsLogo } from './AimsLogo';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenEligibilityWithPrefill?: (prefill: {
    destination: string;
    visaType: string;
    age: string;
    experience: string;
  }) => void;
  onOpenEligibility: () => void;
  onSelectDestination: (destId: string) => void;
  currentLanguage: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onOpenEligibilityWithPrefill,
  onOpenEligibility,
  onSelectDestination,
  currentLanguage,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  // 3-Step Interactive Inquiry / Quick Check State
  const [inquiryStep, setInquiryStep] = useState<1 | 2 | 3>(1);
  const [selectedDestination, setSelectedDestination] = useState('Canada');
  const [selectedServiceType, setSelectedServiceType] = useState('Visa Appointments');
  const [applicantCategory, setApplicantCategory] = useState('Student');
  const [timeline, setTimeline] = useState('Within 1 - 3 Months');
  const [callerName, setCallerName] = useState('');
  const [callerPhone, setCallerPhone] = useState('');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [callbackRef, setCallbackRef] = useState('');
  const [deskImgError, setDeskImgError] = useState(false);
  const [heroBgError, setHeroBgError] = useState(false);

  const destinationOptions = [
    { label: 'Canada', value: 'Canada', flag: '🇨🇦', id: 'canada' },
    { label: 'United Kingdom (UK)', value: 'United Kingdom', flag: '🇬🇧', id: 'united-kingdom' },
    { label: 'United States (USA)', value: 'USA', flag: '🇺🇸', id: 'united-states' },
    { label: 'Australia', value: 'Australia', flag: '🇦🇺', id: 'australia' },
    { label: 'Schengen Europe', value: 'Schengen Europe', flag: '🇪🇺', id: 'schengen-europe' },
    { label: 'Dubai & UAE', value: 'Dubai', flag: '🇦🇪', id: 'dubai-uae' },
  ];

  const serviceOptions = [
    { label: 'Visa Appointments', value: 'Visa Appointments', icon: Compass },
    { label: 'Global Ticketing', value: 'Global Ticketing', icon: Plane },
    { label: 'Documentation', value: 'Documentation', icon: FileBadge },
    { label: 'Tour Packages', value: 'Tour Packages', icon: GraduationCap },
  ];

  const profileOptions = [
    'Student Permit',
    'Tourist / Family Visit',
    'Skilled / PR Pathway',
    'Tatkal / Urgent Passport',
  ];

  const timelineOptions = [
    'Immediate / Urgent',
    'Within 1 - 3 Months',
    '3 - 6 Months Intake',
    'Planning for Next Year',
  ];

  const handleQuickCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refId = `AIMS-QC-${Math.floor(1000 + Math.random() * 9000)}`;
    setCallbackRef(refId);
    setCallbackSubmitted(true);
  };

  const handleLaunchFullAssessment = () => {
    const mappedVisaType =
      applicantCategory.includes('Student')
        ? 'Student'
        : applicantCategory.includes('Skilled')
        ? 'PR'
        : 'Tourist';

    if (onOpenEligibilityWithPrefill) {
      onOpenEligibilityWithPrefill({
        destination: selectedDestination,
        visaType: mappedVisaType,
        age: '24',
        experience: timeline,
      });
    } else {
      onOpenEligibility();
    }
  };

  const handleQuickDestSelect = (destVal: string, destId: string) => {
    setSelectedDestination(destVal);
    onSelectDestination(destId);
  };

  return (
    <section
      id="home"
      className="relative bg-[#0F172A] text-white overflow-hidden pt-10 pb-14 lg:pt-16 lg:pb-20"
    >
      {/* Full-bleed Subtly Desaturated Cinematic Background with Soft Navy Gradient Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {!heroBgError && (
          <img
            src={AIMS_MEDIA.heroGlobalHorizon}
            alt="Global architectural horizon symbolizing international travel and immigration pathways"
            onError={() => setHeroBgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center grayscale-[35%] opacity-45"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(15, 23, 42, 0.94) 0%, rgba(15, 23, 42, 0.84) 55%, rgba(30, 41, 59, 0.78) 100%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Crisp Editorial Messaging & Trust Credentials */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Official License & Office Identifier (Clean editorial typography, no pill clutter) */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs font-semibold tracking-wide text-[#DFB958]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="uppercase tracking-[0.12em]">
                Punjab Govt. Licence No: {COMPANY_DETAILS.licenceNo}
              </span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="text-slate-300 font-normal hidden sm:inline">
                Hoshiarpur Head Office
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-[#F8F9FA] tracking-tight leading-[1.12] font-display">
              {t.heroHeadlinePrefix}
              <span className="text-[#DFB958] block sm:inline">
                {t.heroHeadlineHighlight}
              </span>
            </h1>

            {/* Subtitle with generous reading rhythm */}
            <p className="text-base sm:text-[17px] text-slate-200 max-w-xl mx-auto lg:mx-0 font-normal leading-[1.65]">
              {t.heroSubtitle} Backed by transparent documentation, zero hidden charges, and dedicated personal case management from our Fatehgarh Chowk desk.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
              <button
                onClick={onOpenEligibility}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#C29B38] hover:bg-[#B38D2D] text-[#0F172A] font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm group"
              >
                <span>{t.btnStartAssessment}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/15 text-[#F8F9FA] font-semibold rounded-xl border border-white/25 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm backdrop-blur-xs"
              >
                <Phone className="w-4 h-4 text-[#DFB958]" />
                <span>{t.btnContactExpert}</span>
              </button>
            </div>

            {/* Authentic Hoshiarpur Advisory Desk Verification Strip */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <div className="bg-[#1E293B]/90 backdrop-blur-sm p-3 rounded-xl border border-slate-700/80 flex items-center gap-3.5 max-w-md w-full sm:w-auto">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-slate-600 bg-slate-800 flex items-center justify-center">
                  {!deskImgError ? (
                    <img
                      src={AIMS_MEDIA.officeAdvisoryDesk}
                      onError={() => setDeskImgError(true)}
                      alt="AIMS Consultancy Senior Advisor Desk in Hoshiarpur"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <AimsLogo variant="emblem" className="w-9 h-9" />
                  )}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5 text-[#DFB958] text-xs font-semibold">
                    <span>★★★★★</span>
                    <span className="text-slate-200 tabular-nums">4.9/5 Client Trust</span>
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5 tabular-nums">
                    99.2% Consular Accuracy
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">
                    Fatehgarh Chowk, Hoshiarpur • Direct Line: 95927-47000
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean 3-Step Interactive Inquiry / Quick Check Card */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end relative z-10">
            <div className="w-full max-w-md bg-[#F8F9FA] text-[#334155] rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-200">
              {/* Card Header */}
              <div className="mb-5 pb-3.5 border-b border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AimsLogo variant="emblem" className="w-7 h-7" />
                    <div>
                      <span className="text-xs font-extrabold text-[#0F172A] tracking-tight font-display block leading-none">
                        AIMS Quick Inquiry
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                        3-Step Callback & Assessment
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#926B16] uppercase tracking-wider">
                    100% Free
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight font-display">
                  Fast Callback & Eligibility Check
                </h2>
              </div>

              {/* 3-Step Progress Bar */}
              {!callbackSubmitted && (
                <div className="mb-5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-2">
                    <span className={inquiryStep >= 1 ? 'text-[#0F172A] font-bold' : ''}>
                      1. Destination
                    </span>
                    <span className={inquiryStep >= 2 ? 'text-[#0F172A] font-bold' : ''}>
                      2. Profile
                    </span>
                    <span className={inquiryStep === 3 ? 'text-[#0F172A] font-bold' : ''}>
                      3. Fast Callback
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C29B38] transition-all duration-300"
                      style={{ width: `${(inquiryStep / 3) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Success Confirmation State */}
              {callbackSubmitted ? (
                <div className="py-4 text-center space-y-4 animate-fadeIn">
                  <div className="w-12 h-12 rounded-xl bg-[#0F172A] text-[#DFB958] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#926B16]">
                      Request Logged • {callbackRef}
                    </span>
                    <h3 className="text-lg font-bold text-[#0F172A] mt-1">
                      Thank You, {callerName || 'Applicant'}
                    </h3>
                    <p className="text-xs text-[#334155] leading-relaxed mt-1">
                      Your inquiry for <strong>{selectedDestination}</strong> ({selectedServiceType}) has been assigned to our Hoshiarpur desk. Expect a call on <strong>{callerPhone}</strong> shortly.
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <a
                      href={getWhatsAppDeliveryUrl(
                        `Hello AIMS Consultancy (${callbackRef}),\nName: ${callerName}\nPhone: ${callerPhone}\nDestination: ${selectedDestination}\nService: ${selectedServiceType}\nProfile: ${applicantCategory}\nTimeline: ${timeline}\nPlease call me back for a quick check.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-[#C29B38] hover:bg-[#B38D2D] text-[#0F172A] font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send Directly to WhatsApp (95927-47000)</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setCallbackSubmitted(false);
                        setInquiryStep(1);
                        setCallerName('');
                        setCallerPhone('');
                      }}
                      className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-[#0F172A] cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={
                    inquiryStep === 3
                      ? handleQuickCallbackSubmit
                      : (e) => {
                          e.preventDefault();
                          setInquiryStep(inquiryStep === 1 ? 2 : 3);
                        }
                  }
                  className="space-y-4"
                >
                  {/* STEP 1: Destination & Service Selection */}
                  {inquiryStep === 1 && (
                    <div className="space-y-4 animate-fadeIn">
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                          Intended Destination
                        </label>
                        <select
                          value={selectedDestination}
                          onChange={(e) => setSelectedDestination(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-[#0F172A] font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#C29B38] transition-all cursor-pointer"
                        >
                          {destinationOptions.map((dest) => (
                            <option key={dest.value} value={dest.value}>
                              {dest.flag} {dest.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                          Required Service
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {serviceOptions.map((svc) => {
                            const Icon = svc.icon;
                            const isSelected = selectedServiceType === svc.value;
                            return (
                              <button
                                type="button"
                                key={svc.value}
                                onClick={() => setSelectedServiceType(svc.value)}
                                className={`py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border text-left ${
                                  isSelected
                                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-xs'
                                    : 'bg-white text-[#334155] border-slate-300 hover:border-slate-400'
                                }`}
                              >
                                <Icon
                                  className={`w-4 h-4 shrink-0 ${
                                    isSelected ? 'text-[#DFB958]' : 'text-slate-500'
                                  }`}
                                />
                                <span className="truncate">{svc.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-[#C29B38] hover:bg-[#B38D2D] text-[#0F172A] font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer group"
                      >
                        <span>Next: Profile & Timeline</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  )}

                  {/* STEP 2: Profile & Travel Timeline */}
                  {inquiryStep === 2 && (
                    <div className="space-y-4 animate-fadeIn">
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                          Applicant Category
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {profileOptions.map((prof) => (
                            <button
                              type="button"
                              key={prof}
                              onClick={() => setApplicantCategory(prof)}
                              className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer text-left flex items-center justify-between ${
                                applicantCategory === prof
                                  ? 'bg-[#0F172A] text-white border-[#0F172A]'
                                  : 'bg-white text-[#334155] border-slate-300 hover:border-slate-400'
                              }`}
                            >
                              <span className="truncate">{prof}</span>
                              {applicantCategory === prof && (
                                <Check className="w-3.5 h-3.5 text-[#DFB958] shrink-0" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                          Preferred Travel / Filing Timeline
                        </label>
                        <select
                          value={timeline}
                          onChange={(e) => setTimeline(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-[#0F172A] font-medium focus:outline-hidden focus:ring-2 focus:ring-[#C29B38] cursor-pointer"
                        >
                          {timelineOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setInquiryStep(1)}
                          className="py-3 px-4 bg-white border border-slate-300 hover:bg-slate-100 text-[#334155] font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-3 bg-[#C29B38] hover:bg-[#B38D2D] text-[#0F172A] font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Next: Request Callback</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Callback Contact */}
                  {inquiryStep === 3 && (
                    <div className="space-y-3.5 animate-fadeIn">
                      <div className="p-3 rounded-lg bg-[#0F172A] text-white text-xs flex items-center justify-between">
                        <div>
                          <span className="text-[#DFB958] font-semibold block text-[10px] uppercase tracking-wider">
                            Selected Scope
                          </span>
                          <span className="font-bold">
                            {selectedDestination} • {selectedServiceType}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setInquiryStep(1)}
                          className="text-[11px] text-slate-300 hover:text-white underline cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] mb-1">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={callerName}
                          onChange={(e) => setCallerName(e.target.value)}
                          placeholder="e.g. Harpreet Singh"
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#C29B38]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] mb-1">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={callerPhone}
                          onChange={(e) => setCallerPhone(e.target.value)}
                          placeholder="e.g. +91 95927 47000"
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#C29B38]"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setInquiryStep(2)}
                          className="py-3 px-4 bg-white border border-slate-300 hover:bg-slate-100 text-[#334155] font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Request Free Callback</span>
                          <ArrowRight className="w-4 h-4 text-[#DFB958]" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={handleLaunchFullAssessment}
                        className="w-full py-2 text-xs font-semibold text-[#926B16] hover:text-[#0F172A] flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Or run full automated Eligibility Points Quiz</span>
                      </button>
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Quick Country Selector Strip */}
            <div className="w-full max-w-md pt-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { flag: '🇨🇦', label: 'Canada', val: 'Canada', id: 'canada' },
                  { flag: '🇬🇧', label: 'UK', val: 'United Kingdom', id: 'united-kingdom' },
                  { flag: '🇦🇺', label: 'Australia', val: 'Australia', id: 'australia' },
                  { flag: '🇺🇸', label: 'USA', val: 'USA', id: 'united-states' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleQuickDestSelect(item.val, item.id)}
                    className="py-2 px-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/15 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>{item.flag}</span>
                    <span>{item.label}</span>
                    <ChevronRight className="w-3 h-3 text-[#DFB958]" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
