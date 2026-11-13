import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Building2,
} from 'lucide-react';
import { DESTINATIONS_DATA } from '../data/aimsData';
import { AimsLogo } from './AimsLogo';

interface DestinationsSectionProps {
  onSelectDestination: (destinationName: string) => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({ onSelectDestination }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [expandedDestId, setExpandedDestId] = useState<string | null>(null);

  const regions = ['All', 'North America', 'Europe', 'Middle East', 'Oceania', 'Asia-Pacific', 'Southeast Asia'];

  const filteredDestinations = DESTINATIONS_DATA.filter((dest) => {
    if (selectedRegion === 'All') return true;
    return dest.region.toLowerCase().includes(selectedRegion.toLowerCase());
  });

  const toggleDestinationDetails = (destId: string) => {
    setExpandedDestId((prev) => (prev === destId ? null : destId));
  };

  return (
    <section id="destinations" className="py-16 sm:py-20 bg-[#F4F5F7] border-b border-slate-200/90 text-[#334155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#926B16]">
            <AimsLogo variant="emblem" className="w-4 h-4" />
            <span>Top Global Destinations & Study Hubs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
            Popular Destinations & Global Pathways
          </h2>
          <p className="text-[#334155] text-base leading-[1.65]">
            Detailed requirements, minimum living financial proofs, work authorization, and intake timetables for our highest-demand international destinations.
          </p>

          {/* Region Filter Tabs */}
          <div className="pt-4 flex items-center justify-center flex-wrap gap-2">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  selectedRegion === region
                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-xs'
                    : 'bg-white text-[#334155] hover:text-[#0F172A] border-slate-200 hover:border-slate-300'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => {
            const isExpanded = expandedDestId === dest.id;

            return (
              <div
                key={dest.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#C29B38] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Photo Header */}
                  {dest.imageUrl && (
                    <div className="relative h-48 w-full overflow-hidden bg-[#0F172A]">
                      <img
                        src={dest.imageUrl}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-[#0F172A]/25 to-transparent" />

                      <div className="absolute top-3 left-3 bg-[#F8F9FA]/95 backdrop-blur-sm rounded-md px-2.5 py-1 flex items-center gap-1.5 shadow-xs">
                        <span className="text-base">{dest.flag}</span>
                        <span className="text-xs font-bold text-[#0F172A]">{dest.region}</span>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4">
                        <h3 className="text-xl font-bold text-white tracking-tight font-display">
                          {dest.name}
                        </h3>
                      </div>
                    </div>
                  )}

                  {/* Body Info */}
                  <div className="p-5 space-y-4">
                    <p className="text-xs text-[#334155] leading-[1.65]">
                      {dest.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-[#F4F5F7] border border-slate-200/80">
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 uppercase font-bold">
                          <Clock className="w-3 h-3 text-[#926B16]" />
                          <span>Processing</span>
                        </div>
                        <span className="font-bold text-[#0F172A] block mt-0.5 tabular-nums">{dest.processingTime}</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#F4F5F7] border border-slate-200/80">
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 uppercase font-bold">
                          <Calendar className="w-3 h-3 text-[#926B16]" />
                          <span>Intakes / Season</span>
                        </div>
                        <span className="font-bold text-[#0F172A] block mt-0.5">{dest.intakesOrSeason}</span>
                      </div>
                    </div>

                    {/* Key Visas */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                        Key Available Visas:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {dest.popularVisas.map((v, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#F8F9FA] text-[#0F172A] border border-slate-200"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hidden Details Drawer */}
                    {isExpanded && dest.hiddenDetails && (
                      <div className="pt-3 border-t border-slate-200 space-y-3 animate-fadeIn text-xs">
                        {dest.hiddenDetails.topUniversitiesOrSpots && (
                          <div className="p-3 rounded-xl bg-[#F4F5F7] border border-slate-200">
                            <span className="font-bold text-[#0F172A] mb-1 flex items-center gap-1.5">
                              <Building2 className="w-3.5 h-3.5 text-[#926B16]" />
                              <span>Top Institutions / Hubs:</span>
                            </span>
                            <ul className="list-disc pl-4 space-y-0.5 text-[#334155] text-[11px]">
                              {dest.hiddenDetails.topUniversitiesOrSpots.map((u, idx) => (
                                <li key={idx}>{u}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {dest.hiddenDetails.financialRequirement && (
                          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[#0F172A]">
                            <span className="font-bold block mb-0.5 text-[11px] uppercase tracking-wide text-[#926B16]">
                              Living Funds Proof:
                            </span>
                            <p className="text-[11px] leading-relaxed text-[#334155]">
                              {dest.hiddenDetails.financialRequirement}
                            </p>
                          </div>
                        )}

                        {dest.hiddenDetails.workRights && (
                          <div className="p-3 rounded-xl bg-[#F8F9FA] border border-slate-200 text-[#0F172A]">
                            <span className="font-bold block mb-0.5 text-[11px] uppercase tracking-wide">
                              Post-Study & Work Rights:
                            </span>
                            <p className="text-[11px] leading-relaxed text-[#334155]">
                              {dest.hiddenDetails.workRights}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Toggle Button */}
                    {dest.hiddenDetails && (
                      <button
                        type="button"
                        onClick={() => toggleDestinationDetails(dest.id)}
                        className="w-full py-2 text-center text-xs font-semibold text-[#0F172A] hover:text-[#926B16] bg-[#F4F5F7] hover:bg-slate-200/70 rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>{isExpanded ? 'Hide Detailed Requirements' : 'View Living Costs, Work Rights & Rules'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => onSelectDestination(dest.name)}
                    className="w-full py-2.5 px-4 bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Check Eligibility for {dest.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#DFB958]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
