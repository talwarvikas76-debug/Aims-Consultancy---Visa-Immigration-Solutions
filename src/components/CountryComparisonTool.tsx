import React, { useState } from 'react';
import {
  Clock,
  DollarSign,
  GraduationCap,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import { COMPARISON_COUNTRIES } from '../data/hubData';
import { AimsLogo } from './AimsLogo';

interface CountryComparisonToolProps {
  onOpenBooking: (prefill?: { destination?: string; visaType?: string }) => void;
  onOpenEligibility: () => void;
}

export const CountryComparisonTool: React.FC<CountryComparisonToolProps> = ({
  onOpenBooking,
}) => {
  const [selectedCountryA, setSelectedCountryA] = useState<string>('canada');
  const [selectedCountryB, setSelectedCountryB] = useState<string>('australia');

  const countryA = COMPARISON_COUNTRIES.find((c) => c.id === selectedCountryA) || COMPARISON_COUNTRIES[0];
  const countryB = COMPARISON_COUNTRIES.find((c) => c.id === selectedCountryB) || COMPARISON_COUNTRIES[2];

  return (
    <section id="comparison" className="py-16 sm:py-20 bg-[#F8F9FA] border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#926B16]">
            <AimsLogo variant="emblem" className="w-4 h-4" />
            <span>Side-by-Side Comparison</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
            Compare Destinations & Visa Pathways
          </h2>
          <p className="text-sm sm:text-base text-[#334155] leading-[1.65]">
            Compare post-study work rights, living costs, minimum funds, and permanent residency pathways across premier destinations.
          </p>
        </div>

        {/* Comparison Selector Controls */}
        <div className="bg-[#F4F5F7] p-4 sm:p-6 rounded-2xl border border-slate-200/90 mb-10 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-[#926B16] uppercase tracking-wider mb-1.5">
                Primary Destination (Country A)
              </label>
              <select
                value={selectedCountryA}
                onChange={(e) => setSelectedCountryA(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-slate-300 rounded-lg px-3 py-2 text-sm text-[#0F172A] font-bold focus:outline-hidden focus:ring-2 focus:ring-[#C29B38] cursor-pointer"
              >
                {COMPARISON_COUNTRIES.map((c) => (
                  <option key={c.id} value={c.id} disabled={c.id === selectedCountryB}>
                    {c.flag} {c.name} ({c.region})
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-[#926B16] uppercase tracking-wider mb-1.5">
                Comparison Destination (Country B)
              </label>
              <select
                value={selectedCountryB}
                onChange={(e) => setSelectedCountryB(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-slate-300 rounded-lg px-3 py-2 text-sm text-[#0F172A] font-bold focus:outline-hidden focus:ring-2 focus:ring-[#C29B38] cursor-pointer"
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

        {/* Mobile View: Stacked Comparison Cards (Zero horizontal overflow) */}
        <div className="block sm:hidden space-y-4 max-w-lg mx-auto mb-8">
          <div className="grid grid-cols-2 gap-3 p-3 bg-[#0F172A] text-white rounded-2xl shadow-sm text-center">
            <div className="p-2.5 rounded-xl bg-[#1E293B]">
              <span className="text-2xl block mb-1">{countryA.flag}</span>
              <div className="font-bold text-xs truncate">{countryA.name}</div>
              <button
                onClick={() => onOpenBooking({ destination: countryA.name })}
                className="mt-2 w-full py-1.5 px-2 bg-[#C29B38] hover:bg-[#B38D2D] text-[#0F172A] font-bold rounded-lg text-[10px] cursor-pointer"
              >
                Apply {countryA.name}
              </button>
            </div>
            <div className="p-2.5 rounded-xl bg-[#1E293B]">
              <span className="text-2xl block mb-1">{countryB.flag}</span>
              <div className="font-bold text-xs truncate">{countryB.name}</div>
              <button
                onClick={() => onOpenBooking({ destination: countryB.name })}
                className="mt-2 w-full py-1.5 px-2 bg-white hover:bg-slate-100 text-[#0F172A] font-bold rounded-lg text-[10px] cursor-pointer"
              >
                Apply {countryB.name}
              </button>
            </div>
          </div>

          {[
            { label: 'Post-Study Work (PSW)', valA: countryA.postStudyWork, valB: countryB.postStudyWork, highlight: true },
            { label: 'Average Tuition Fee', valA: countryA.averageTuition, valB: countryB.averageTuition },
            { label: 'Minimum Proof of Funds', valA: countryA.minLivingFunds, valB: countryB.minLivingFunds },
            { label: 'Processing Time', valA: countryA.processingTime, valB: countryB.processingTime, bold: true },
            { label: 'Permanent Residency (PR)', valA: countryA.prPathway, valB: countryB.prPathway },
            { label: 'Student Work Hours', valA: countryA.workHoursPerWeek, valB: countryB.workHoursPerWeek },
            { label: 'Spouse Work Rights', valA: countryA.spouseWorkRights, valB: countryB.spouseWorkRights },
            { label: 'Key Intakes', valA: countryA.keyIntakes, valB: countryB.keyIntakes },
            { label: 'IELTS / English Level', valA: countryA.ieltsRequirement, valB: countryB.ieltsRequirement },
          ].map((metric, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs">
              <div className="text-[11px] font-bold text-[#926B16] uppercase tracking-wider mb-2">
                <span>{metric.label}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[#F8F9FA] border border-slate-200">
                  <span className="text-[10px] font-bold text-[#0F172A] block mb-0.5">{countryA.name}</span>
                  <span className={`text-[#334155] leading-snug block ${metric.highlight ? 'font-bold text-[#0F172A]' : ''} ${metric.bold ? 'font-bold' : ''}`}>
                    {metric.valA}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F4F5F7] border border-slate-200">
                  <span className="text-[10px] font-bold text-[#0F172A] block mb-0.5">{countryB.name}</span>
                  <span className={`text-[#334155] leading-snug block ${metric.highlight ? 'font-bold text-[#0F172A]' : ''} ${metric.bold ? 'font-bold' : ''}`}>
                    {metric.valB}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Side-by-Side Comparison Matrix */}
        <div className="hidden sm:block bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden max-w-5xl mx-auto">
          {/* Header Row */}
          <div className="grid grid-cols-12 bg-[#0F172A] text-white p-5 sm:p-6 items-center">
            <div className="col-span-4 text-xs font-bold uppercase tracking-wider text-[#DFB958]">
              Immigration & Study Metric
            </div>
            <div className="col-span-4 text-center font-bold text-sm sm:text-base flex items-center justify-center gap-2">
              <span className="text-xl sm:text-2xl">{countryA.flag}</span>
              <span className="truncate">{countryA.name}</span>
            </div>
            <div className="col-span-4 text-center font-bold text-sm sm:text-base flex items-center justify-center gap-2 border-l border-slate-800">
              <span className="text-xl sm:text-2xl">{countryB.flag}</span>
              <span className="truncate">{countryB.name}</span>
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            <div className="grid grid-cols-12 p-4 items-center hover:bg-[#F8F9FA] transition-colors">
              <div className="col-span-4 font-bold text-[#0F172A] flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#926B16] shrink-0" />
                <span>Post-Study Work (PSW)</span>
              </div>
              <div className="col-span-4 text-center font-bold text-[#0F172A] px-2">
                {countryA.postStudyWork}
              </div>
              <div className="col-span-4 text-center font-bold text-[#0F172A] px-2 border-l border-slate-100">
                {countryB.postStudyWork}
              </div>
            </div>

            <div className="grid grid-cols-12 p-4 items-center bg-[#F8F9FA]/70 hover:bg-[#F4F5F7] transition-colors">
              <div className="col-span-4 font-bold text-[#0F172A] flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#926B16] shrink-0" />
                <span>Average Tuition Fee</span>
              </div>
              <div className="col-span-4 text-center text-[#334155] font-semibold px-2 tabular-nums">
                {countryA.averageTuition}
              </div>
              <div className="col-span-4 text-center text-[#334155] font-semibold px-2 border-l border-slate-100 tabular-nums">
                {countryB.averageTuition}
              </div>
            </div>

            <div className="grid grid-cols-12 p-4 items-center hover:bg-[#F8F9FA] transition-colors">
              <div className="col-span-4 font-bold text-[#0F172A] flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#926B16] shrink-0" />
                <span>Minimum Proof of Funds</span>
              </div>
              <div className="col-span-4 text-center text-[#334155] font-medium px-2 tabular-nums">
                {countryA.minLivingFunds}
              </div>
              <div className="col-span-4 text-center text-[#334155] font-medium px-2 border-l border-slate-100 tabular-nums">
                {countryB.minLivingFunds}
              </div>
            </div>

            <div className="grid grid-cols-12 p-4 items-center bg-[#F8F9FA]/70 hover:bg-[#F4F5F7] transition-colors">
              <div className="col-span-4 font-bold text-[#0F172A] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#926B16] shrink-0" />
                <span>Typical Processing Time</span>
              </div>
              <div className="col-span-4 text-center text-[#0F172A] font-bold px-2 tabular-nums">
                {countryA.processingTime}
              </div>
              <div className="col-span-4 text-center text-[#0F172A] font-bold px-2 border-l border-slate-100 tabular-nums">
                {countryB.processingTime}
              </div>
            </div>

            <div className="grid grid-cols-12 p-4 items-center hover:bg-[#F8F9FA] transition-colors">
              <div className="col-span-4 font-bold text-[#0F172A] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#926B16] shrink-0" />
                <span>Permanent Residency (PR)</span>
              </div>
              <div className="col-span-4 text-center text-[#334155] font-semibold px-2">
                {countryA.prPathway}
              </div>
              <div className="col-span-4 text-center text-[#334155] font-semibold px-2 border-l border-slate-100">
                {countryB.prPathway}
              </div>
            </div>

            <div className="grid grid-cols-12 p-4 items-center bg-[#F8F9FA]/70 hover:bg-[#F4F5F7] transition-colors">
              <div className="col-span-4 font-bold text-[#0F172A]">Spouse Work Rights</div>
              <div className="col-span-4 text-center text-[#334155] text-xs px-2">{countryA.spouseWorkRights}</div>
              <div className="col-span-4 text-center text-[#334155] text-xs px-2 border-l border-slate-100">
                {countryB.spouseWorkRights}
              </div>
            </div>

            <div className="grid grid-cols-12 p-4 items-center hover:bg-[#F8F9FA] transition-colors">
              <div className="col-span-4 font-bold text-[#0F172A]">Student Work Hours</div>
              <div className="col-span-4 text-center text-[#0F172A] font-semibold px-2 tabular-nums">
                {countryA.workHoursPerWeek}
              </div>
              <div className="col-span-4 text-center text-[#0F172A] font-semibold px-2 border-l border-slate-100 tabular-nums">
                {countryB.workHoursPerWeek}
              </div>
            </div>

            <div className="grid grid-cols-12 p-4 items-center bg-[#F8F9FA]/70 hover:bg-[#F4F5F7] transition-colors">
              <div className="col-span-4 font-bold text-[#0F172A]">Key Intakes</div>
              <div className="col-span-4 text-center text-[#334155] text-xs px-2">{countryA.keyIntakes}</div>
              <div className="col-span-4 text-center text-[#334155] text-xs px-2 border-l border-slate-100">
                {countryB.keyIntakes}
              </div>
            </div>

            <div className="grid grid-cols-12 p-4 items-center hover:bg-[#F8F9FA] transition-colors">
              <div className="col-span-4 font-bold text-[#0F172A]">English / IELTS Criteria</div>
              <div className="col-span-4 text-center text-[#334155] text-xs px-2">{countryA.ieltsRequirement}</div>
              <div className="col-span-4 text-center text-[#334155] text-xs px-2 border-l border-slate-100">
                {countryB.ieltsRequirement}
              </div>
            </div>

            <div className="grid grid-cols-12 p-4 sm:p-6 bg-[#F4F5F7] items-center">
              <div className="col-span-4 font-bold text-[#0F172A] text-xs uppercase tracking-wider flex items-center gap-2">
                <AimsLogo variant="emblem" className="w-4 h-4" />
                <span>Start Filing With AIMS</span>
              </div>
              <div className="col-span-4 text-center px-2">
                <button
                  onClick={() => onOpenBooking({ destination: countryA.name })}
                  className="w-full py-2.5 px-3 bg-[#C29B38] hover:bg-[#B38D2D] text-[#0F172A] font-bold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Apply {countryA.name}
                </button>
              </div>
              <div className="col-span-4 text-center px-2 border-l border-slate-200">
                <button
                  onClick={() => onOpenBooking({ destination: countryB.name })}
                  className="w-full py-2.5 px-3 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
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
