import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Plane, 
  FileText, 
  MapPin, 
  Award,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Globe2,
  Users,
  Clock,
  Compass
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/aimsData';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenEligibility: () => void;
  onSelectDestination: (destId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onOpenBooking, 
  onOpenEligibility,
  onSelectDestination 
}) => {
  const [showGuaranteeDetails, setShowGuaranteeDetails] = useState(false);
  const [showNetworkDetails, setShowNetworkDetails] = useState(false);

  const popularDestinations = [
    { name: 'Canada', id: 'canada', flag: '🇨🇦', tag: 'SDS Intakes' },
    { name: 'United Kingdom', id: 'united-kingdom', flag: '🇬🇧', tag: 'PSW 2-Year' },
    { name: 'Australia', id: 'australia', flag: '🇦🇺', tag: 'Subclass 500' },
    { name: 'Dubai, UAE', id: 'dubai-uae', flag: '🇦🇪', tag: '48h E-Visa' },
    { name: 'Schengen Europe', id: 'schengen-europe', flag: '🇪🇺', tag: '27 Nations' },
    { name: 'USA', id: 'united-states', flag: '🇺🇸', tag: 'F1 & B1/B2' },
  ];

  return (
    <section id="home" className="relative bg-gradient-to-b from-[#060f0c] via-[#091813] to-[#060f0c] text-white overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-22">
      {/* Background Decorative Gentle Glows - Eye-Soothing Emerald & Sage */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-teal-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#10b9810f_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & Interactive Elements */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* ISO & Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-800/50 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-xs">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>{COMPANY_DETAILS.isoCertification}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-200/70 hidden sm:inline">Court Road, Hoshiarpur</span>
            </div>

            {/* Main Headline with Soothing Green/Teal Gradient */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display leading-[1.14]">
              Your Trusted Passport to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-300">
                Global Travel & Visas
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Leading immigration specialists for student study permits, tourist visas, passport renewal, and negotiated international airfares in Hoshiarpur. 
              Zero hidden fees, 100% legal compliance, and personalized one-on-one consular advisory.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
              <button
                onClick={onOpenBooking}
                id="hero-book-consultation-btn"
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/60 hover:shadow-emerald-900/80 transition-all flex items-center justify-center gap-2.5 cursor-pointer text-base group"
              >
                <Calendar className="w-5 h-5 text-white" />
                <span>Book Free Consultation</span>
                <span className="bg-emerald-400/20 border border-emerald-300/40 px-2 py-0.5 rounded text-xs font-extrabold text-emerald-200">
                  100% Free
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenEligibility}
                id="hero-eligibility-btn"
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-100 font-semibold rounded-xl border border-emerald-800/60 hover:border-emerald-700 transition-all flex items-center justify-center gap-2 cursor-pointer text-base"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Check Visa Eligibility</span>
              </button>
            </div>

            {/* Progressive Disclosure Link: What's Included */}
            <div className="pt-2">
              <button
                onClick={() => setShowGuaranteeDetails(!showGuaranteeDetails)}
                id="hero-toggle-guarantee-btn"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 hover:text-emerald-200 transition-colors py-1 cursor-pointer group"
              >
                <span>✦ What is included in your Free Advisory Consultation?</span>
                {showGuaranteeDetails ? (
                  <ChevronUp className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
                )}
              </button>

              {/* Hidden Information beneath the link */}
              {showGuaranteeDetails && (
                <div className="mt-3 p-4 rounded-xl bg-[#091a14]/90 border border-emerald-800/50 text-xs text-slate-300 space-y-2.5 animate-fadeIn backdrop-blur-md">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-semibold">1-on-1 Profile Assessment:</strong>
                        Academic score evaluation, work history audit, and country fit analysis.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-semibold">Financial & Bank Solvency Review:</strong>
                        Clear guidance on GIC, Blocked Accounts, and genuine sponsor funds.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-semibold">Refusal Overturn Check:</strong>
                        Free review of prior refusal reasons and CAIPS/GCMS procedural options.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-semibold">Zero Pressure Guarantee:</strong>
                        100% complimentary with no advance charges or hidden obligations.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Popular Destinations Quick Bar */}
            <div className="pt-2">
              <p className="text-xs uppercase tracking-wider text-emerald-300/80 font-semibold mb-2.5 text-center lg:text-left">
                Direct Consultations for Top Study & Travel Hubs:
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {popularDestinations.map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => onSelectDestination(dest.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0b1b15] hover:bg-[#102920] border border-emerald-900/60 hover:border-emerald-600/60 text-xs font-medium text-slate-200 hover:text-emerald-200 transition-all cursor-pointer shadow-xs"
                  >
                    <span>{dest.flag}</span>
                    <span className="font-semibold">{dest.name}</span>
                    <span className="text-[10px] text-emerald-400/90 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-800/40">
                      {dest.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Photo Card with Real Photography + Route Network */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-[#091712]/95 border border-emerald-900/60 rounded-2xl p-5 shadow-2xl backdrop-blur-xl">
              
              {/* High-Quality Curated Photo Montage Banner */}
              <div className="relative h-44 rounded-xl overflow-hidden mb-4 border border-emerald-900/50 group">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80" 
                  alt="International university students holding visas and admissions" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060f0c] via-[#060f0c]/40 to-transparent" />
                
                {/* Floating Photo Overlay Badges */}
                <div className="absolute top-3 left-3 bg-[#060f0c]/85 border border-emerald-700/60 backdrop-blur-md rounded-lg px-2.5 py-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                  <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>40+ Global Study & Visit Destinations</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-bold text-white drop-shadow-sm">Spring & Fall 2026/2027 Intakes Open</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 backdrop-blur-sm">
                    Verified Desk
                  </span>
                </div>
              </div>

              {/* Card Header & Status */}
              <div className="flex items-center justify-between pb-3 border-b border-emerald-950/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Plane className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Global Flight & Consular Network</h2>
                    <p className="text-[11px] text-emerald-300/70">Origin: Court Road, Hoshiarpur (PB)</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-700/50 rounded">
                  Consular Desk
                </span>
              </div>

              {/* Consultation Inclusions List */}
              <div className="space-y-2 mt-3 text-xs text-slate-300">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#06110d] border border-emerald-950">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>In-Person or Video Consultation</span>
                  </div>
                  <span className="font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                    100% Free (₹0)
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#06110d] border border-emerald-950">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-400" />
                    <span>CAIPS / GCMS Refusal File Review</span>
                  </div>
                  <span className="font-semibold text-slate-300">Complimentary</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#06110d] border border-emerald-950">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>Senior Immigration Officer Guidance</span>
                  </div>
                  <span className="font-semibold text-slate-300">1-on-1 Session</span>
                </div>
              </div>

              {/* Progressive Disclosure Link: View Network & Routes */}
              <div className="mt-3">
                <button
                  onClick={() => setShowNetworkDetails(!showNetworkDetails)}
                  className="w-full text-center text-xs text-emerald-300 hover:text-emerald-200 py-1.5 rounded-lg bg-[#07130f] hover:bg-[#0b1c16] border border-emerald-900/50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-emerald-400" />
                  <span>✦ {showNetworkDetails ? 'Hide' : 'Inspect'} Embassy Appointments & Hub Route Map</span>
                  {showNetworkDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showNetworkDetails && (
                  <div className="mt-2.5 p-3 rounded-xl bg-[#050e0b] border border-emerald-900/60 text-[11px] text-slate-300 space-y-2 animate-fadeIn">
                    <div className="grid grid-cols-2 gap-2 text-slate-300">
                      <div className="p-2 rounded-lg bg-[#081510] border border-emerald-950">
                        <strong className="text-emerald-300 block font-semibold">VFS / PSK Hubs:</strong>
                        Jalandhar, Chandigarh & New Delhi biometrics routing.
                      </div>
                      <div className="p-2 rounded-lg bg-[#081510] border border-emerald-950">
                        <strong className="text-emerald-300 block font-semibold">Special Baggage:</strong>
                        40kg–46kg student allowances on Canada/UK carriers.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Booking Trigger in Card */}
              <button
                onClick={onOpenBooking}
                className="mt-3.5 w-full py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-950/60"
              >
                <span>Reserve Free Appointment Slot</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Statistics Banner with Soothing Green Card Styling */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {COMPANY_DETAILS.stats.map((stat, i) => (
            <div 
              key={i}
              className="bg-[#091712]/90 hover:bg-[#0c1f18] border border-emerald-900/50 hover:border-emerald-600/50 p-4 sm:p-5 rounded-2xl transition-all text-center group backdrop-blur-sm shadow-xs"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-emerald-400 font-display flex items-center justify-center">
                {stat.prefix && <span className="text-lg sm:text-2xl font-bold mr-1 text-slate-300">{stat.prefix}</span>}
                <span>{stat.value}</span>
                <span className="text-teal-300">{stat.suffix}</span>
              </div>
              <div className="text-sm font-bold text-white mt-1 group-hover:text-emerald-200 transition-colors">
                {stat.label}
              </div>
              <p className="text-xs text-slate-400 mt-1 hidden sm:block">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
