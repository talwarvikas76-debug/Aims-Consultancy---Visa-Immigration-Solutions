import React, { useState } from 'react';
import { 
  Scale, 
  ArrowRight, 
  Check, 
  Clock, 
  DollarSign, 
  GraduationCap, 
  Briefcase, 
  Sparkles,
  Filter,
  CheckCircle2,
  X
} from 'lucide-react';
import { COMPARISON_COUNTRIES } from '../data/hubData';
import { ComparisonCountry } from '../types';

interface CountryComparisonToolProps {
  onOpenBooking: (prefill?: { destination?: string; visaType?: string }) => void;
  onOpenEligibility: () => void;
}

export const CountryComparisonTool: React.FC<CountryComparisonToolProps> = ({
  onOpenBooking,
  onOpenEligibility,
}) => {
  const [selectedCountryA, setSelectedCountryA] = useState<string>('canada');
  const [selectedCountryB, setSelectedCountryB] = useState<string>('australia');
  const [regionFilter, setRegionFilter] = useState<string>('all');

  const countryA = COMPARISON_COUNTRIES.find((c) => c.id === selectedCountryA) || COMPARISON_COUNTRIES[0];
  const countryB = COMPARISON_COUNTRIES.find((c) => c.id === selectedCountryB) || COMPARISON_COUNTRIES[2];

  const filteredCountries = COMPARISON_COUNTRIES.filter((c) => {
    if (regionFilter === 'all') return true;
    return c.region.toLowerCase() === regionFilter.toLowerCase();
  });

  return (
    <section id="comparison" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3 border border-blue-200">
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive Pathway Explorer</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight font-display">
            Side-by-Side Country Comparison
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Compare post-study work rights, living costs, minimum funds, and permanent residency pathways across premier destinations.
          </p>
        </div>

        {/* Comparison Selector Controls */}
        <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs mb-10 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            
            {/* Country A Selector */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Primary Destination (Country A)
              </label>
              <select
                value={selectedCountryA}
                onChange={(e) => setSelectedCountryA(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {COMPARISON_COUNTRIES.map((c) => (
                  <option key={c.id} value={c.id} disabled={c.id === selectedCountryB}>
                    {c.flag} {c.name} ({c.region})
                  </option>
                ))}
              </select>
            </div>

            {/* Country B Selector */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Comparison Destination (Country B)
              </label>
              <select
                value={selectedCountryB}
                onChange={(e) => setSelectedCountryB(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {COMPARISON_COUNTRIES.map((c) => (
                  <option key={c.id} value={c.id} disabled={c.id === selectedCountryA}>
                    {c.flag} {c.name} ({c.region})
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Side-by-Side Comparison Matrix */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-w-5xl mx-auto">
          
          {/* Header Row */}
          <div className="grid grid-cols-12 bg-slate-900 text-white p-4 sm:p-6 items-center">
            <div className="col-span-4 sm:col-span-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              Immigration & Study Metric
            </div>
            <div className="col-span-4 sm:col-span-4 text-center font-bold text-sm sm:text-base flex items-center justify-center gap-2">
              <span className="text-xl sm:text-2xl">{countryA.flag}</span>
              <span className="truncate">{countryA.name}</span>
            </div>
            <div className="col-span-4 sm:col-span-4 text-center font-bold text-sm sm:text-base flex items-center justify-center gap-2 border-l border-slate-800">
              <span className="text-xl sm:text-2xl">{countryB.flag}</span>
              <span className="truncate">{countryB.name}</span>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            
            {/* Row 1: Post-Study Work Rights */}
            <div className="grid grid-cols-12 p-4 items-center hover:bg-slate-50/70 transition-colors">
              <div className="col-span-4 font-bold text-slate-800 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Post-Study Work (PSW)</span>
              </div>
              <div className="col-span-4 text-center font-bold text-blue-700 px-2">
                {countryA.postStudyWork}
              </div>
              <div className="col-span-4 text-center font-bold text-blue-700 px-2 border-l border-slate-100">
                {countryB.postStudyWork}
              </div>
            </div>

            {/* Row 2: Average Tuition Fee */}
            <div className="grid grid-cols-12 p-4 items-center bg-slate-50/40 hover:bg-slate-50 transition-colors">
              <div className="col-span-4 font-bold text-slate-800 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Average Tuition Fee</span>
              </div>
              <div className="col-span-4 text-center text-slate-700 font-semibold px-2">
                {countryA.averageTuition}
              </div>
              <div className="col-span-4 text-center text-slate-700 font-semibold px-2 border-l border-slate-100">
                {countryB.averageTuition}
              </div>
            </div>

            {/* Row 3: Minimum Living Funds */}
            <div className="grid grid-cols-12 p-4 items-center hover:bg-slate-50/70 transition-colors">
              <div className="col-span-4 font-bold text-slate-800 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Minimum Proof of Funds</span>
              </div>
              <div className="col-span-4 text-center text-slate-700 font-medium px-2">
                {countryA.minLivingFunds}
              </div>
              <div className="col-span-4 text-center text-slate-700 font-medium px-2 border-l border-slate-100">
                {countryB.minLivingFunds}
              </div>
            </div>

            {/* Row 4: Visa Processing Time */}
            <div className="grid grid-cols-12 p-4 items-center bg-slate-50/40 hover:bg-slate-50 transition-colors">
              <div className="col-span-4 font-bold text-slate-800 flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Typical Processing Time</span>
              </div>
              <div className="col-span-4 text-center text-slate-800 font-bold px-2">
                {countryA.processingTime}
              </div>
              <div className="col-span-4 text-center text-slate-800 font-bold px-2 border-l border-slate-100">
                {countryB.processingTime}
              </div>
            </div>

            {/* Row 5: PR Pathway Ease */}
            <div className="grid grid-cols-12 p-4 items-center hover:bg-slate-50/70 transition-colors">
              <div className="col-span-4 font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Permanent Residency (PR)</span>
              </div>
              <div className="col-span-4 text-center text-slate-800 font-semibold px-2">
                {countryA.prPathway}
              </div>
              <div className="col-span-4 text-center text-slate-800 font-semibold px-2 border-l border-slate-100">
                {countryB.prPathway}
              </div>
            </div>

            {/* Row 6: Spouse Work Rights */}
            <div className="grid grid-cols-12 p-4 items-center bg-slate-50/40 hover:bg-slate-50 transition-colors">
              <div className="col-span-4 font-bold text-slate-800">
                Spouse Work Rights
              </div>
              <div className="col-span-4 text-center text-slate-600 text-xs px-2">
                {countryA.spouseWorkRights}
              </div>
              <div className="col-span-4 text-center text-slate-600 text-xs px-2 border-l border-slate-100">
                {countryB.spouseWorkRights}
              </div>
            </div>

            {/* Row 7: Part-Time Work Rights */}
            <div className="grid grid-cols-12 p-4 items-center hover:bg-slate-50/70 transition-colors">
              <div className="col-span-4 font-bold text-slate-800">
                Student Work Hours
              </div>
              <div className="col-span-4 text-center text-slate-800 font-semibold px-2">
                {countryA.workHoursPerWeek}
              </div>
              <div className="col-span-4 text-center text-slate-800 font-semibold px-2 border-l border-slate-100">
                {countryB.workHoursPerWeek}
              </div>
            </div>

            {/* Row 8: Key Intake Months */}
            <div className="grid grid-cols-12 p-4 items-center bg-slate-50/40 hover:bg-slate-50 transition-colors">
              <div className="col-span-4 font-bold text-slate-800">
                Key Intakes
              </div>
              <div className="col-span-4 text-center text-slate-600 text-xs px-2">
                {countryA.keyIntakes}
              </div>
              <div className="col-span-4 text-center text-slate-600 text-xs px-2 border-l border-slate-100">
                {countryB.keyIntakes}
              </div>
            </div>

            {/* Row 9: Language / IELTS Standard */}
            <div className="grid grid-cols-12 p-4 items-center hover:bg-slate-50/70 transition-colors">
              <div className="col-span-4 font-bold text-slate-800">
                English / IELTS Criteria
              </div>
              <div className="col-span-4 text-center text-slate-600 text-xs px-2">
                {countryA.ieltsRequirement}
              </div>
              <div className="col-span-4 text-center text-slate-600 text-xs px-2 border-l border-slate-100">
                {countryB.ieltsRequirement}
              </div>
            </div>

            {/* Row 10: Action CTA Row */}
            <div className="grid grid-cols-12 p-4 sm:p-6 bg-slate-100/60 items-center">
              <div className="col-span-4 font-bold text-slate-700 text-xs uppercase tracking-wider">
                Start Filing With AIMS
              </div>
              <div className="col-span-4 text-center px-2">
                <button
                  onClick={() => onOpenBooking({ destination: countryA.name })}
                  className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Apply {countryA.name}
                </button>
              </div>
              <div className="col-span-4 text-center px-2 border-l border-slate-200">
                <button
                  onClick={() => onOpenBooking({ destination: countryB.name })}
                  className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Apply {countryB.name}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
