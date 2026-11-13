import React, { useState } from 'react';
import { 
  Crown, 
  MapPin, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Plane, 
  Hotel, 
  HeartHandshake, 
  BookOpen, 
  UtensilsCrossed, 
  CheckCircle2, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Printer, 
  MessageCircle, 
  PhoneCall, 
  Users, 
  Clock, 
  HelpCircle,
  Eye,
  Download
} from 'lucide-react';
import { PANJ_TAKHT_DATA, TakhtDetail, ItineraryDay, PricingTier } from '../data/panjTakhtData';
import { COMPANY_DETAILS } from '../data/aimsData';
import { getWhatsAppDeliveryUrl } from '../utils/whatsappRouting';

interface PanjTakhtPreviewSectionProps {
  onOpenPrintPass?: (customDossier: any) => void;
  onOpenBookingPrefill?: (prefill: { visaType?: string; destination?: string }) => void;
}

export const PanjTakhtPreviewSection: React.FC<PanjTakhtPreviewSectionProps> = ({
  onOpenPrintPass,
  onOpenBookingPrefill
}) => {
  const [activeTab, setActiveTab] = useState<'takhts' | 'itinerary' | 'luxury' | 'pricing' | 'calculator'>('takhts');
  const [selectedTakht, setSelectedTakht] = useState<TakhtDetail>(PANJ_TAKHT_DATA.takhts[0]);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  // Interactive Quote Customizer State
  const [calcPilgrims, setCalcPilgrims] = useState<number>(4);
  const [calcTier, setCalcTier] = useState<string>('imperial-5star');
  const [calcWheelchair, setCalcWheelchair] = useState<boolean>(true);
  const [calcMonth, setCalcMonth] = useState<string>('November 2026');
  const [calcDepartureCity, setCalcDepartureCity] = useState<string>('Amritsar / Delhi');
  const [showDossierModal, setShowDossierModal] = useState<boolean>(false);

  const calculateEstimate = () => {
    let perPerson = 185000;
    if (calcTier === 'royal-suite') perPerson = 265000;
    if (calcTier === 'private-charter') return 'Custom Bespoke Quotation';

    const totalInr = perPerson * calcPilgrims;
    const totalUsd = Math.round(totalInr / 83.5);
    return {
      inr: `₹${totalInr.toLocaleString('en-IN')}`,
      usd: `$${totalUsd.toLocaleString('en-US')} USD`,
      perPersonInr: `₹${perPerson.toLocaleString('en-IN')}`,
    };
  };

  const estimateResult = calculateEstimate();

  const handleWhatsAppEnquiry = () => {
    const text = `Sat Sri Akal! I am reviewing the *Sample Preview for the Exclusive 5-Star Panj Takht Yatra Package* on AIMS Consultancy.\n\n*Pilgrims:* ${calcPilgrims}\n*Package Tier:* ${calcTier === 'royal-suite' ? 'Royal Presidential Suite' : calcTier === 'private-charter' ? 'Private Charter Jet' : 'Imperial 5-Star Experience'}\n*Senior Citizen / Wheelchair Care:* ${calcWheelchair ? 'Yes, required' : 'No'}\n*Preferred Month:* ${calcMonth}\n*Departure:* ${calcDepartureCity}\n\nPlease share the formal itinerary brochure and booking procedure.`;
    
    const url = getWhatsAppDeliveryUrl(text);
    window.open(url, '_blank');
  };

  const handlePrintDossier = () => {
    window.print();
  };

  return (
    <section id="panj-takht-sample" className="py-16 sm:py-24 bg-gradient-to-b from-amber-50/70 via-white to-slate-50 border-y border-amber-200/80 relative overflow-hidden">
      
      {/* Decorative Traditional Golden Aura Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-200/20 via-orange-100/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Sample Status Ribbon */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-amber-500 text-slate-900 border border-amber-400 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-black text-sm shrink-0">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-black tracking-wider bg-slate-900 text-amber-300 px-2 py-0.5 rounded-md">
                  SAMPLE PREVIEW MODE
                </span>
                <span className="text-xs font-semibold text-slate-900 hidden sm:inline">
                  • Reviewing draft proposal before permanent live publication
                </span>
              </div>
              <p className="text-xs text-slate-900 font-medium">
                Exclusive 5-Star Panj Takht Yatra Package for Sikh Pilgrimage (ਪੰਜ ਤਖ਼ਤ ਸਾਹਿਬਾਨ ਦਰਸ਼ਨ)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const el = document.getElementById('sample-interactive-card');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition cursor-pointer"
            >
              Test Customizer
            </button>
            <button
              onClick={handlePrintDossier}
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white/90 text-slate-900 hover:bg-white transition cursor-pointer flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Sample Dossier</span>
            </button>
          </div>
        </div>

        {/* Section Title & Spiritual Essence Header */}
        <div className="text-center max-w-4xl mx-auto space-y-3.5 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs sm:text-sm font-bold tracking-wide">
            <Crown className="w-4 h-4 text-amber-700" />
            <span>EXCLUSIVELY CURATED BY AIMS CONSULTANCY • HOSHIARPUR</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-display tracking-tight leading-tight">
            Exclusive 5-Star Panj Takht Sahib Spiritual Pilgrimage
          </h2>
          
          <div className="text-base sm:text-lg text-amber-900 font-semibold font-serif">
            {PANJ_TAKHT_DATA.punjabiTitle}
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            {PANJ_TAKHT_DATA.subtitle}
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-700">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-200 shadow-xs">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>10 Days / 9 Nights</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-200 shadow-xs">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>All 5 Sacred Takhts (Punjab, Bihar, Maharashtra)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-200 shadow-xs">
              <Hotel className="w-4 h-4 text-amber-600" />
              <span>Taj, Hyatt & Heritage Suites</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-200 shadow-xs">
              <Crown className="w-4 h-4 text-amber-600" />
              <span>Toyota Innova Hycross / Crysta Only</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-200 shadow-xs">
              <HeartHandshake className="w-4 h-4 text-amber-600" />
              <span>Senior Citizen Wheelchair Care</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher Controls */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-10">
          {[
            { id: 'takhts', label: 'The 5 Sacred Takhts', icon: MapPin },
            { id: 'itinerary', label: 'Day-by-Day Itinerary (10 Days)', icon: Calendar },
            { id: 'luxury', label: '5-Star Comfort & Care', icon: Crown },
            { id: 'pricing', label: 'Pricing & Inclusions', icon: ShieldCheck },
            { id: 'calculator', label: 'Interactive Sample Customizer', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25 scale-102 ring-2 ring-amber-400/50'
                    : 'bg-white text-slate-700 hover:bg-amber-50 hover:text-amber-900 border border-slate-200 shadow-xs'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-amber-600'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: THE 5 SACRED TAKHTS SHOWCASE */}
        {activeTab === 'takhts' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Quick selector pills for the 5 Takhts */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
              {PANJ_TAKHT_DATA.takhts.map((takht, idx) => {
                const isCurrent = selectedTakht.id === takht.id;
                return (
                  <button
                    key={takht.id}
                    onClick={() => setSelectedTakht(takht)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-slate-900 text-white border-amber-400 shadow-md ring-2 ring-amber-400/30'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-amber-300 hover:bg-amber-50/50'
                    }`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      Takht #{idx + 1}
                    </div>
                    <div className="text-xs sm:text-sm font-bold truncate">
                      {takht.name.replace('Takht ', '').replace('Sri ', '')}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {takht.location}, {takht.state}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Takht Detailed Spotlight Card */}
            <div className="bg-white rounded-3xl border border-amber-200/80 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Photo & Scenic Hero */}
              <div className="lg:col-span-5 relative h-72 lg:h-auto min-h-[320px] overflow-hidden bg-slate-950">
                <img 
                  src={selectedTakht.imageUrl} 
                  alt={selectedTakht.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                
                {/* Floating Authentic Takht Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-600/95 text-white backdrop-blur-md shadow-md flex items-center gap-1.5 border border-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>Authentic Takht Photo • {selectedTakht.location}</span>
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-black uppercase bg-amber-500 text-slate-950">
                    {selectedTakht.historicalEra}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black font-display text-white">
                    {selectedTakht.name}
                  </h3>
                  <div className="text-xs font-serif text-amber-300">
                    {selectedTakht.punjabiName}
                  </div>
                  <div className="text-xs text-slate-300 flex items-center gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{selectedTakht.location}, {selectedTakht.state}</span>
                  </div>
                </div>
              </div>

              {/* Takht Deep Spiritual & 5-Star Information */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                      <Crown className="w-4 h-4 text-amber-600" />
                      <span>Spiritual Significance & Eternal Sanctity</span>
                    </h4>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                      {selectedTakht.significance}
                    </p>
                  </div>

                  {/* Sacred Relics & Spiritual Highlights */}
                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Sacred Relics, Shastars & Experiences</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      {selectedTakht.keyRelicsAndHighlights.map((relic, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{relic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 5-Star Accommodation at this Takht */}
                  <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 border border-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Hotel className="w-3.5 h-3.5" />
                        <span>Included 5-Star Accommodation</span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-300">
                        {selectedTakht.fiveStarHotel.roomType}
                      </span>
                    </div>

                    <div className="text-sm font-bold text-white">
                      {selectedTakht.fiveStarHotel.name}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-300">
                      {selectedTakht.fiveStarHotel.features.map((feat, fIdx) => (
                        <span key={fIdx} className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700">
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Transit & Aviation Note */}
                  <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-blue-950 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-blue-900">
                      <Plane className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Dedicated Ground & Air Transit</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed text-[11px]">
                      {selectedTakht.transitNote}
                    </p>
                    <div className="text-[11px] font-bold text-blue-800 pt-0.5">
                      ✓ Chauffeur fleet exclusively in Toyota Innova Hycross or Innova Crysta only (Luxury Captain Seats & Rear AC).
                    </div>
                  </div>
                </div>

                {/* Bottom CTA within Takht card */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-500 font-medium">
                    Pre-arranged VIP Ardas & Saropa honors included
                  </div>
                  <button
                    onClick={() => setActiveTab('itinerary')}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-900 cursor-pointer"
                  >
                    <span>View in 10-Day Itinerary</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DAY-BY-DAY DETAILED ITINERARY */}
        {activeTab === 'itinerary' && (
          <div className="space-y-4 max-w-4xl mx-auto animate-fadeIn">
            <div className="text-center mb-6">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                10 Days / 9 Nights Curated Master Journey
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                Complete Day-by-Day Pilgrimage Timeline
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Paced gracefully with zero rush, prioritizing elderly energy, prayer time, and luxurious relaxation.
              </p>
            </div>

            <div className="space-y-3">
              {PANJ_TAKHT_DATA.itinerary.map((day) => {
                const isExpanded = expandedDay === day.day;
                return (
                  <div 
                    key={day.day}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-amber-300 shadow-sm transition overflow-hidden"
                  >
                    {/* Collapsible Accordion Header */}
                    <button
                      onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-amber-50/30 transition"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                          D{day.day}
                        </div>
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                            {day.takhtOrCity}
                          </div>
                          <div className="text-sm sm:text-base font-bold text-slate-900">
                            {day.title}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                          {day.mealsIncluded}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-amber-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </button>

                    {/* Expanded Day Breakdown */}
                    {isExpanded && (
                      <div className="p-5 pt-0 border-t border-slate-100 space-y-4 text-xs sm:text-sm bg-slate-50/50">
                        {/* Highlights pills */}
                        <div className="flex flex-wrap gap-1.5 pt-3">
                          {day.highlights.map((hl, hIdx) => (
                            <span key={hIdx} className="px-2.5 py-0.5 rounded-md bg-amber-100/70 border border-amber-200 text-amber-900 text-[11px] font-semibold">
                              ★ {hl}
                            </span>
                          ))}
                        </div>

                        {/* Morning / Afternoon / Evening Timeline */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                            <div className="font-bold text-amber-800 text-[11px] uppercase tracking-wide flex items-center gap-1">
                              <span>🌅 Morning</span>
                            </div>
                            <p className="text-slate-600 text-xs leading-relaxed">
                              {day.morning}
                            </p>
                          </div>

                          <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                            <div className="font-bold text-blue-800 text-[11px] uppercase tracking-wide flex items-center gap-1">
                              <span>☀️ Afternoon</span>
                            </div>
                            <p className="text-slate-600 text-xs leading-relaxed">
                              {day.afternoon}
                            </p>
                          </div>

                          <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                            <div className="font-bold text-purple-800 text-[11px] uppercase tracking-wide flex items-center gap-1">
                              <span>🌙 Evening</span>
                            </div>
                            <p className="text-slate-600 text-xs leading-relaxed">
                              {day.evening}
                            </p>
                          </div>
                        </div>

                        {/* Hotel & Meals Info Footer */}
                        <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-900 text-white text-xs">
                          <div className="flex items-center gap-2">
                            <Hotel className="w-4 h-4 text-amber-400" />
                            <span><strong>Overnight:</strong> {day.overnightStay}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-300">
                            <UtensilsCrossed className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{day.mealsIncluded}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: 5-STAR LUXURY & SENIOR CARE PILLARS */}
        {activeTab === 'luxury' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                Uncompromising Standards of Hospitality
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                The 5 Luxury Pillars of the Panj Takht Yatra
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                Carefully engineered so our parents, grandparents, and overseas families experience divine spiritual peace with total physical ease.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PANJ_TAKHT_DATA.luxuryPillars.map((pillar, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-amber-400 shadow-md hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-bold">
                      <Crown className="w-6 h-6 text-amber-600" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-slate-900">
                        {pillar.title}
                      </h4>
                      <p className="text-xs font-semibold text-amber-700">
                        {pillar.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      {pillar.bulletPoints.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-500">
                    Standard in all 5-Star Yatra tiers
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PRICING TIERS & INCLUSIONS */}
        {activeTab === 'pricing' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                Transparent All-Inclusive Pricing
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                Select Your Pilgrimage Experience Tier
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                Inclusive of 5-star accommodations, scheduled domestic aviation flights, private AC luxury ground fleet, scholar guide, and special Ardas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PANJ_TAKHT_DATA.pricingTiers.map((tier) => (
                <div 
                  key={tier.id}
                  className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all ${
                    tier.isPopular 
                      ? 'bg-slate-950 text-white ring-2 ring-amber-400 shadow-2xl relative scale-102' 
                      : 'bg-white text-slate-900 border border-slate-200 shadow-lg'
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-md">
                      {tier.badge}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-black">{tier.title}</h4>
                      <p className={`text-xs ${tier.isPopular ? 'text-amber-300' : 'text-slate-600'}`}>
                        {tier.tagline}
                      </p>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black">
                          {tier.inrPrice}
                        </span>
                        {tier.inrPrice !== 'Custom Quote' && (
                          <span className={`text-xs ${tier.isPopular ? 'text-slate-400' : 'text-slate-500'}`}>
                            / pilgrim
                          </span>
                        )}
                      </div>
                      {tier.usdPrice !== 'On Request' && (
                        <div className={`text-xs font-semibold ${tier.isPopular ? 'text-amber-400' : 'text-amber-700'}`}>
                          Approx. {tier.usdPrice} • {tier.cadPrice} • {tier.gbpPrice}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 pt-3 border-t border-slate-200/20 text-xs">
                      {tier.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${tier.isPopular ? 'text-amber-400' : 'text-emerald-600'}`} />
                          <span className={tier.isPopular ? 'text-slate-200' : 'text-slate-700'}>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-200/20 space-y-3">
                    <p className={`text-[11px] italic ${tier.isPopular ? 'text-slate-400' : 'text-slate-500'}`}>
                      Ideal for: {tier.idealFor}
                    </p>
                    <button
                      onClick={() => {
                        setCalcTier(tier.id);
                        setActiveTab('calculator');
                      }}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        tier.isPopular
                          ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-black'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      Configure This Tier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: INTERACTIVE SAMPLE CUSTOMIZER & INSTANT ESTIMATOR */}
        {activeTab === 'calculator' && (
          <div id="sample-interactive-card" className="max-w-4xl mx-auto bg-white rounded-3xl border border-amber-300 shadow-2xl p-6 sm:p-10 space-y-8 animate-fadeIn">
            
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                Interactive Sample Simulator
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                Customize Your Pilgrimage Entourage
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
                Test package calculations, senior citizen assistance, and arrival points to simulate your family's customized Panj Takht Yatra.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Configuration Inputs */}
              <div className="space-y-4">
                
                {/* Number of Pilgrims */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Number of Pilgrims in Family:
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[2, 4, 6, 8].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setCalcPilgrims(count)}
                        className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                          calcPilgrims === count
                            ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {count} Pilgrims
                      </button>
                    ))}
                  </div>
                </div>

                {/* Package Tier */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Desired Experience Tier:
                  </label>
                  <select
                    value={calcTier}
                    onChange={(e) => setCalcTier(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="imperial-5star">Imperial 5-Star Experience (Most Popular)</option>
                    <option value="royal-suite">Royal Presidential Suite & Dedicated Toyota Innova Hycross</option>
                    <option value="private-charter">Private Charter Jet Edition</option>
                  </select>
                </div>

                {/* Senior Citizen & Wheelchair Toggle */}
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Senior Citizen Wheelchair Assistance
                    </div>
                    <div className="text-[11px] text-slate-600">
                      Airport & Gurdwara parikrama support
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={calcWheelchair}
                    onChange={(e) => setCalcWheelchair(e.target.checked)}
                    className="w-5 h-5 accent-amber-600 rounded cursor-pointer"
                  />
                </div>

                {/* Preferred Travel Month */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Preferred Travel Window:
                  </label>
                  <select
                    value={calcMonth}
                    onChange={(e) => setCalcMonth(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800"
                  >
                    <option value="October 2026">October 2026 (Festive Season)</option>
                    <option value="November 2026">November 2026 (Guru Nanak Gurpurab)</option>
                    <option value="December 2026">December 2026 (Winter Retreat)</option>
                    <option value="January 2027">January 2027 (Prakash Purab)</option>
                    <option value="February 2027">February 2027 (Pleasant Weather)</option>
                    <option value="March 2027">March 2027 (Hola Mohalla at Anandpur)</option>
                  </select>
                </div>

                {/* International / Domestic Pickup Hub */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Arrival Meet & Greet Hub:
                  </label>
                  <select
                    value={calcDepartureCity}
                    onChange={(e) => setCalcDepartureCity(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800"
                  >
                    <option value="Amritsar (ATQ Airport)">Amritsar Airport (ATQ) - Direct Arrival</option>
                    <option value="Delhi (DEL Airport)">Delhi Indira Gandhi Airport (DEL) - VIP Escort</option>
                    <option value="Chandigarh (IXC Airport)">Chandigarh Airport (IXC)</option>
                    <option value="Hoshiarpur HQ">AIMS Consultancy Office (Hoshiarpur, Punjab)</option>
                  </select>
                </div>

              </div>

              {/* Right Live Summary & Action Box */}
              <div className="bg-slate-950 text-white rounded-2xl p-6 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs uppercase font-bold text-amber-400">
                      Sample Quotation Summary
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 font-bold">
                      10D / 9N Full Circuit
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Total Pilgrims:</span>
                      <strong className="text-white">{calcPilgrims} Adults</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Experience Tier:</span>
                      <strong className="text-white">
                        {calcTier === 'royal-suite' ? 'Royal Suite' : calcTier === 'private-charter' ? 'Charter Jet' : 'Imperial 5-Star'}
                      </strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Elder Care & Wheelchair:</span>
                      <strong className={calcWheelchair ? 'text-emerald-400' : 'text-slate-400'}>
                        {calcWheelchair ? 'Confirmed Included' : 'Standard'}
                      </strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Aviation & Flights:</span>
                      <strong className="text-emerald-400">All Sectors Included</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Ground Transit:</span>
                      <strong className="text-amber-300">Toyota Innova Hycross / Crysta Only</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Arrival Hub:</span>
                      <strong className="text-white">{calcDepartureCity}</strong>
                    </div>
                  </div>

                  {/* Calculated Price */}
                  <div className="pt-4 border-t border-slate-800">
                    <div className="text-xs text-slate-400">Estimated Total Package Investment:</div>
                    <div className="text-2xl sm:text-3xl font-black text-amber-400">
                      {typeof estimateResult === 'string' ? estimateResult : estimateResult.inr}
                    </div>
                    {typeof estimateResult !== 'string' && (
                      <div className="text-xs text-slate-400">
                        (~{estimateResult.usd} total • {estimateResult.perPersonInr}/person)
                      </div>
                    )}
                  </div>
                </div>

                {/* Sample Actions */}
                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={handleWhatsAppEnquiry}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Inquiry on WhatsApp (Instant Response)</span>
                  </button>

                  <button
                    onClick={handlePrintDossier}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-amber-400" />
                    <span>Print Sample Dossier</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* FAQs Drawer for Panj Takht */}
        <div className="mt-14 max-w-4xl mx-auto space-y-4">
          <div className="text-center space-y-1 mb-6">
            <h4 className="text-lg font-bold text-slate-900">
              Frequently Asked Questions regarding the 5-Star Pilgrimage
            </h4>
            <p className="text-xs text-slate-600">
              Practical details about seasons, senior citizen accessibility, and international arrival points.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PANJ_TAKHT_DATA.faqs.map((faq, fIdx) => (
              <div key={fIdx} className="bg-white p-4.5 rounded-2xl border border-slate-200 space-y-1.5 shadow-xs">
                <div className="text-xs font-bold text-slate-900 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </div>
                <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Verification Badge */}
        <div className="mt-12 text-center text-xs text-slate-500">
          <span>Reviewed against Panj Takht Sahib Spiritual Pilgrimage Plan • Prepared by AIMS Consultancy Hoshiarpur</span>
        </div>

      </div>
    </section>
  );
};
