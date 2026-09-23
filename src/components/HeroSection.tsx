import React, { useState } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  Plane, 
  GraduationCap, 
  Briefcase, 
  Users,
  Compass,
  Globe2
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { getWhatsAppRoutingDetails, getWhatsAppDeliveryUrl } from '../utils/whatsappRouting';

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
  const routing = getWhatsAppRoutingDetails();

  // Interactive Hero Form State
  const [selectedDestination, setSelectedDestination] = useState('Canada');
  const [selectedVisaType, setSelectedVisaType] = useState('Student');
  const [age, setAge] = useState('23');
  const [experience, setExperience] = useState('Fresh Graduate / Student');
  const [isAssessing, setIsAssessing] = useState(false);

  const destinationOptions = [
    { label: 'Canada', value: 'Canada', flag: '🇨🇦', id: 'canada' },
    { label: 'United Kingdom (UK)', value: 'United Kingdom', flag: '🇬🇧', id: 'united-kingdom' },
    { label: 'United States (USA)', value: 'USA', flag: '🇺🇸', id: 'united-states' },
    { label: 'Australia', value: 'Australia', flag: '🇦🇺', id: 'australia' },
    { label: 'Schengen Europe', value: 'Schengen Europe', flag: '🇪🇺', id: 'schengen-europe' },
    { label: 'Dubai & UAE', value: 'Dubai', flag: '🇦🇪', id: 'dubai-uae' },
  ];

  const visaTypeOptions = [
    { label: 'Skilled Worker', value: 'Skilled Worker', icon: Briefcase },
    { label: 'Student', value: 'Student', icon: GraduationCap },
    { label: 'PR', value: 'PR', icon: Compass },
    { label: 'Tourist', value: 'Tourist', icon: Plane },
  ];

  const experienceOptions = [
    'Fresh Graduate / Student',
    '1 - 2 Years',
    '3 - 5 Years',
    '5+ Years',
    'Not Applicable',
  ];

  const handleHeroAssess = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAssessing(true);
    setTimeout(() => {
      setIsAssessing(false);
      if (onOpenEligibilityWithPrefill) {
        onOpenEligibilityWithPrefill({
          destination: selectedDestination,
          visaType: selectedVisaType,
          age,
          experience,
        });
      } else {
        onOpenEligibility();
      }
    }, 350);
  };

  const handlePillClick = (destVal: string, destId: string) => {
    setSelectedDestination(destVal);
    onSelectDestination(destId);
  };

  return (
    <section id="home" className="relative bg-gradient-to-b from-slate-50 via-white to-blue-50/30 overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Stylized Vector World Map Background Watermark matching image.png */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] select-none flex items-center justify-center">
        <svg viewBox="0 0 1000 500" className="w-full h-full object-cover">
          <path
            d="M150,120 Q160,110 190,115 T240,140 T270,180 T290,240 T260,300 T210,340 T170,300 T140,240 T120,180 Z 
               M450,100 Q480,80 540,90 T620,110 T680,160 T720,130 T800,120 T860,160 T900,220 T850,280 T800,320 T740,300 T680,340 T620,380 T560,360 T520,300 T480,240 T440,180 Z
               M750,380 Q800,360 840,380 T880,440 T840,480 T780,460 T740,410 Z"
            fill="#1e40af"
          />
        </svg>
      </div>

      {/* Modern Curved Royal-Blue Background Accent behind Right Card (exact image element) */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full pointer-events-none overflow-hidden hidden lg:block">
        <div className="absolute top-12 -right-24 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/90 to-blue-800 rounded-[80px] rotate-12 -z-0 opacity-95 shadow-2xl" />
        <div className="absolute top-24 -right-12 w-[520px] h-[520px] bg-sky-400/20 rounded-[70px] rotate-6 -z-0 blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content & Cheerful Travelers (Matching image.png) */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Top Quiet Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Punjab's Leading Visa & Immigration Hub</span>
              <span className="text-blue-300">•</span>
              <span className="text-slate-600 font-medium">Hoshiarpur</span>
            </div>

            {/* Main Headline from image.png */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-slate-900 tracking-tight leading-[1.14] font-display">
              {t.heroHeadlinePrefix}
              <span className="text-blue-600 block sm:inline">
                {t.heroHeadlineHighlight}
              </span>
            </h1>

            {/* Subtitle from image.png */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* Primary Action Buttons from image.png */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onOpenEligibility}
                className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md shadow-blue-500/25 hover:shadow-blue-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <span>{t.btnStartAssessment}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg border border-slate-300 shadow-xs hover:border-slate-400 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>{t.btnContactExpert}</span>
              </button>
            </div>

            {/* Visual Composition: Cheerful Travelers with Passports + 3D Earth Globe matching bottom-left of image.png */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              
              {/* Stylized 3D Globe with Skyline contour */}
              <div className="relative w-20 h-20 shrink-0">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-700 via-sky-500 to-teal-400 p-0.5 shadow-lg shadow-blue-500/20 flex items-center justify-center animate-spin-slow">
                  <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center text-white">
                    <Globe2 className="w-12 h-12 text-white/90 drop-shadow-md" />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 border-2 border-white shadow-sm" title="Active Intake Window">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Happy Travelers Photographic Vignette matching image.png */}
              <div className="relative bg-white p-2 rounded-2xl shadow-md border border-slate-200/90 flex items-center gap-3 max-w-sm">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=400&q=80"
                    alt="Two cheerful young travelers holding passports and flight tickets"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-blue-900/80 text-[8px] text-white text-center font-bold uppercase tracking-wider py-0.5">
                    Visa Approved
                  </span>
                </div>
                <div className="text-left pr-2">
                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    {'★'.repeat(5)}
                    <span className="text-[11px] font-bold text-slate-800 ml-1">4.9/5</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-0.5">5,000+ Success Stories</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Canada SDS, UK Graduate Route & Australia PR
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive "Check Your Eligibility" Card matching image.png */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end relative z-10">
            
            {/* The Main High-Converting Floating White Card */}
            <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-200/90 relative">
              
              <div className="mb-5">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
                  {t.cardTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Instant preliminary points & subclass evaluation in 30 seconds
                </p>
              </div>

              <form onSubmit={handleHeroAssess} className="space-y-4">
                
                {/* Field 1: Where do you want to go? */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.whereToGo}
                  </label>
                  <div className="relative">
                    <select
                      value={selectedDestination}
                      onChange={(e) => setSelectedDestination(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer"
                    >
                      {destinationOptions.map((dest) => (
                        <option key={dest.value} value={dest.value}>
                          {dest.flag} {dest.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Field 2: Visa Type? */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.visaType}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {visaTypeOptions.map((vt) => {
                      const Icon = vt.icon;
                      const isSelected = selectedVisaType === vt.value;
                      return (
                        <button
                          type="button"
                          key={vt.value}
                          onClick={() => setSelectedVisaType(vt.value)}
                          className={`py-2 px-2 rounded-lg text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border ${
                            isSelected
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                          <span className="truncate w-full text-center">{vt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Field 3 & 4: Age and Experience side by side */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.ageLabel}
                    </label>
                    <input
                      type="number"
                      min="16"
                      max="75"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="e.g. 23"
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.experienceLabel}
                    </label>
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer"
                    >
                      {experienceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Primary CTA Inside Card */}
                <button
                  type="submit"
                  disabled={isAssessing}
                  className="w-full py-3 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold text-sm rounded-lg shadow-md shadow-blue-600/30 hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {isAssessing ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Evaluating Profile...</span>
                    </span>
                  ) : (
                    <span>{t.btnAssessEligibility}</span>
                  )}
                </button>

              </form>

            </div>

            {/* Connected Country Pill Badges matching image.png */}
            <div className="w-full max-w-md pt-5 relative">
              {/* Subtle Dashed Connector Lines */}
              <div className="hidden sm:flex justify-around items-center px-4 -mt-2 mb-2 pointer-events-none">
                <div className="w-px h-3 border-l-2 border-dashed border-blue-400" />
                <div className="w-px h-3 border-l-2 border-dashed border-blue-400" />
                <div className="w-px h-3 border-l-2 border-dashed border-blue-400" />
                <div className="w-px h-3 border-l-2 border-dashed border-blue-400" />
              </div>

              {/* Badges Grid matching image.png */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => handlePillClick('Canada', 'canada')}
                  className="py-1.5 px-2 bg-white/95 hover:bg-white text-slate-800 rounded-full shadow-xs border border-slate-200 hover:border-blue-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer group"
                >
                  <span>🇨🇦</span>
                  <span className="group-hover:text-blue-600">Canada</span>
                </button>

                <button
                  onClick={() => handlePillClick('United Kingdom', 'united-kingdom')}
                  className="py-1.5 px-2 bg-white/95 hover:bg-white text-slate-800 rounded-full shadow-xs border border-slate-200 hover:border-blue-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer group"
                >
                  <span>🇬🇧</span>
                  <span className="group-hover:text-blue-600">UK</span>
                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
                </button>

                <button
                  onClick={() => handlePillClick('Australia', 'australia')}
                  className="py-1.5 px-2 bg-white/95 hover:bg-white text-slate-800 rounded-full shadow-xs border border-slate-200 hover:border-blue-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer group"
                >
                  <span>🇦🇺</span>
                  <span className="group-hover:text-blue-600">Australia</span>
                </button>

                <button
                  onClick={() => handlePillClick('USA', 'united-states')}
                  className="py-1.5 px-2 bg-white/95 hover:bg-white text-slate-800 rounded-full shadow-xs border border-slate-200 hover:border-blue-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer group"
                >
                  <span>🇺🇸</span>
                  <span className="group-hover:text-blue-600">USA</span>
                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
