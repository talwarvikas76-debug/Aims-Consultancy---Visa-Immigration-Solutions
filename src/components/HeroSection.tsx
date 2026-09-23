import React from 'react';
import { 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Phone,
  MessageSquare,
  Globe2,
  Sparkles
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/aimsData';
import { getWhatsAppRoutingDetails, getWhatsAppDeliveryUrl } from '../utils/whatsappRouting';

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
  const routing = getWhatsAppRoutingDetails();

  const popularDestinations = [
    { name: 'Canada', id: 'canada', flag: '🇨🇦' },
    { name: 'United Kingdom', id: 'united-kingdom', flag: '🇬🇧' },
    { name: 'Australia', id: 'australia', flag: '🇦🇺' },
    { name: 'Dubai', id: 'dubai-uae', flag: '🇦🇪' },
    { name: 'Schengen Europe', id: 'schengen-europe', flag: '🇪🇺' },
    { name: 'USA', id: 'united-states', flag: '🇺🇸' },
  ];

  return (
    <section id="home" className="relative bg-gradient-to-b from-[#060f0c] via-[#091813] to-[#060f0c] text-white overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20">
      {/* Background Decorative Gentle Glows - Eye-Soothing Emerald & Sage */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-teal-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#10b9810f_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Spacious Value Proposition & Images at Top */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Visual Image Showcase & Location on Top of "Your Trusted Passport..." */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4 justify-center lg:justify-start">
              {/* Mini Image Vignettes of Passport, Study & Travel */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div 
                  className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border border-emerald-500/50 shadow-md shadow-emerald-950/70 group"
                  title="Passport & Travel Solutions"
                >
                  <img
                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=300&q=80"
                    alt="International passport and boarding pass"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-1 left-1.5 text-[8px] font-bold text-emerald-200 tracking-wider uppercase">
                    Passport
                  </span>
                </div>

                <div 
                  className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border border-emerald-500/50 shadow-md shadow-emerald-950/70 group"
                  title="Student Study Permits"
                >
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=300&q=80"
                    alt="International university students holding visas"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-1 left-1.5 text-[8px] font-bold text-emerald-200 tracking-wider uppercase">
                    Study
                  </span>
                </div>

                <div 
                  className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border border-emerald-500/50 shadow-md shadow-emerald-950/70 group"
                  title="Global Flights & Tourism"
                >
                  <img
                    src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
                    alt="Airplane wing over clouds"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-1 left-1.5 text-[8px] font-bold text-emerald-200 tracking-wider uppercase">
                    Travel
                  </span>
                </div>
              </div>

              {/* Clean, Unboxed Location & Trust Indicator (No Cluttered Pills) */}
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Court Road, Hoshiarpur (Punjab)</span>
                </div>
                <p className="text-[11px] text-slate-300/80 mt-0.5 font-medium">
                  Trusted by 5,000+ Students & Travelers Across Punjab
                </p>
              </div>
            </div>

            {/* Main Headline with Soothing Green/Teal Gradient */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display leading-[1.12]">
              Your Trusted Passport to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-300">
                Global Travel & Visas
              </span>
            </h1>

            {/* Subtitle - Spacious and Relaxing to the Eyes */}
            <p className="text-base sm:text-lg text-slate-300/90 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Specialized immigration and visa consultancy for student study permits, tourist visas, express passport renewal, and negotiated international airfares in Hoshiarpur. 100% legal compliance with personalized consular advisory.
            </p>

            {/* Clean Action Buttons (Uncrowded, Generous Padding) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                id="hero-book-consultation-btn"
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/60 hover:shadow-emerald-900/80 transition-all flex items-center justify-center gap-2.5 cursor-pointer text-base group"
              >
                <Calendar className="w-5 h-5 text-white" />
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenEligibility}
                id="hero-eligibility-btn"
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-100 font-semibold rounded-xl border border-emerald-800/60 hover:border-emerald-600 transition-all flex items-center justify-center gap-2 cursor-pointer text-base"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Check Visa Eligibility</span>
              </button>
            </div>

            {/* Clean, Unboxed Popular Destinations Links */}
            <div className="pt-3">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2 text-xs text-slate-300">
                <span className="text-emerald-400 font-semibold">Direct Advisory For:</span>
                {popularDestinations.map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => onSelectDestination(dest.id)}
                    className="inline-flex items-center gap-1 text-slate-200 hover:text-emerald-300 font-medium transition-colors cursor-pointer py-1 px-1.5 rounded hover:bg-emerald-950/50"
                  >
                    <span>{dest.flag}</span>
                    <span>{dest.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Serene, Uncrowded Photographic Centerpiece */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-[#091712]/95 border border-emerald-900/50 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
              
              {/* High-Resolution Hero Image */}
              <div className="relative h-60 sm:h-64 overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80" 
                  alt="International university students holding visas and admissions" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091712] via-[#091712]/30 to-transparent" />
                
                {/* Floating Quiet Badge */}
                <div className="absolute top-3 left-3 bg-[#060f0c]/85 border border-emerald-700/50 backdrop-blur-md rounded-lg px-3 py-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                  <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>40+ Global Study & Visit Destinations</span>
                </div>
              </div>

              {/* Spacious Content & Live WhatsApp Routing Indicator */}
              <div className="p-5 space-y-4">
                <div>
                  <h2 className="text-base font-bold text-white">AIMS Visa & Travel Advisory Desk</h2>
                  <p className="text-xs text-emerald-300/80 mt-0.5">Court Road, Hoshiarpur • Punjab 146001</p>
                </div>

                {/* WhatsApp Status Card based on User Routing Schedule */}
                <div className="p-3.5 rounded-xl bg-[#06110d] border border-emerald-900/60 text-xs text-slate-300 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[11px] font-medium">WhatsApp Delivery Line:</span>
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      {routing.deskLabel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-emerald-950/80">
                    <span className="text-[11px] text-slate-300">{routing.statusDetail}</span>
                    <strong className="text-emerald-300 font-mono text-xs">{routing.formattedNumber}</strong>
                  </div>
                </div>

                {/* Action Buttons in Card */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <button
                    onClick={onOpenBooking}
                    className="py-2.5 px-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-950/60"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Free Consultation</span>
                  </button>

                  <a
                    href={getWhatsAppDeliveryUrl('Hello AIMS Consultancy, I would like to enquire about my visa/travel application.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-[#081a13] hover:bg-[#0d271d] text-emerald-300 font-semibold rounded-xl text-xs border border-emerald-700/60 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Desk</span>
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Clean, Airy Statistics Banner Below */}
        <div className="mt-14 pt-8 border-t border-emerald-950/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {COMPANY_DETAILS.stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-emerald-400 font-display flex items-center justify-center">
                {stat.prefix && <span className="text-lg sm:text-xl font-bold mr-1 text-slate-300">{stat.prefix}</span>}
                <span>{stat.value}</span>
                <span className="text-teal-300">{stat.suffix}</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-white">
                {stat.label}
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
