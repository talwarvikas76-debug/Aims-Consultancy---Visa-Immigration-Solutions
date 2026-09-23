import React, { useState } from 'react';
import { 
  Globe2, 
  Clock, 
  Calendar, 
  CheckCircle, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Briefcase, 
  MapPin, 
  Lightbulb, 
  Building2 
} from 'lucide-react';
import { DESTINATIONS_DATA } from '../data/aimsData';

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
    setExpandedDestId(prev => prev === destId ? null : destId);
  };

  return (
    <section id="destinations" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide uppercase">
            <Globe2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Global Jurisdictions We Advise For</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
            Popular Destinations & Global Pathways
          </h2>
          <p className="text-slate-600 text-base">
            Detailed requirements, minimum living financial proofs, work authorization, and intake timetables for our highest-demand international destinations.
          </p>

          {/* Region Tabs */}
          <div className="pt-4 flex items-center justify-center flex-wrap gap-2">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedRegion === region
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => {
            const isExpanded = expandedDestId === dest.id;

            return (
              <div
                key={dest.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Photo Header */}
                  {dest.imageUrl && (
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                      <img 
                        src={dest.imageUrl} 
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                      
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-lg px-2.5 py-1 flex items-center gap-1.5 shadow-xs">
                        <span className="text-base">{dest.flag}</span>
                        <span className="text-xs font-bold text-slate-800">{dest.region}</span>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4">
                        <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                          <span>{dest.name}</span>
                        </h3>
                      </div>
                    </div>
                  )}

                  {/* Body Info */}
                  <div className="p-5 space-y-4">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {dest.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 uppercase font-bold">
                          <Clock className="w-3 h-3 text-blue-500" />
                          <span>Processing</span>
                        </div>
                        <span className="font-bold text-slate-800 block mt-0.5">{dest.processingTime}</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 uppercase font-bold">
                          <Calendar className="w-3 h-3 text-emerald-500" />
                          <span>Intakes / Season</span>
                        </div>
                        <span className="font-bold text-slate-800 block mt-0.5">{dest.intakesOrSeason}</span>
                      </div>
                    </div>

                    {/* Popular Visas */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Key Available Visas:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {dest.popularVisas.map((v, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/80"
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
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="font-bold text-slate-900 block mb-1 flex items-center gap-1.5">
                              <Building2 className="w-3.5 h-3.5 text-blue-600" />
                              <span>Top Institutions / Hubs:</span>
                            </span>
                            <ul className="list-disc pl-4 space-y-0.5 text-slate-600 text-[11px]">
                              {dest.hiddenDetails.topUniversitiesOrSpots.map((u, idx) => (
                                <li key={idx}>{u}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {dest.hiddenDetails.financialRequirement && (
                          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                            <span className="font-bold block mb-0.5 text-[11px] uppercase tracking-wide">
                              Living Funds Proof:
                            </span>
                            <p className="text-[11px] leading-relaxed">
                              {dest.hiddenDetails.financialRequirement}
                            </p>
                          </div>
                        )}

                        {dest.hiddenDetails.workRights && (
                          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                            <span className="font-bold block mb-0.5 text-[11px] uppercase tracking-wide">
                              Post-Study & Work Rights:
                            </span>
                            <p className="text-[11px] leading-relaxed">
                              {dest.hiddenDetails.workRights}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Toggle Button for Hidden Details */}
                    {dest.hiddenDetails && (
                      <button
                        type="button"
                        onClick={() => toggleDestinationDetails(dest.id)}
                        className="w-full py-1.5 text-center text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50/70 hover:bg-blue-50 rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>{isExpanded ? 'Hide Detailed Visa Requirements' : 'View Living Costs, Work Rights & Rules'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    )}

                  </div>
                </div>

                {/* Bottom Action */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => onSelectDestination(dest.name)}
                    className="w-full py-2.5 px-4 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs group-hover:bg-blue-600"
                  >
                    <span>Check Eligibility for {dest.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
