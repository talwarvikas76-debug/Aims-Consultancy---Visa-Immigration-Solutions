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
    <section id="destinations" className="py-16 sm:py-20 bg-[#060f0c] border-b border-emerald-950/80 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/50 text-emerald-300 text-xs font-bold tracking-wide uppercase">
            <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Global Jurisdictions We Advise For</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Popular Destinations & Global Pathways
          </h2>
          <p className="text-emerald-100/70 text-base">
            Whether your destination is top-tier universities in Canada, UK, and Australia, or seamless vacation visas for Dubai and Schengen Europe, explore our global coverage and requirements.
          </p>
        </div>

        {/* Region Filter Buttons */}
        <div className="mt-8 flex items-center justify-center flex-wrap gap-2">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRegion === region
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-950/80'
                  : 'bg-[#091712] text-slate-300 hover:text-white hover:bg-[#0d221a] border border-emerald-900/60'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Destination Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => {
            const isExpanded = expandedDestId === dest.id;

            return (
              <div
                key={dest.id}
                className="bg-[#091712]/90 rounded-2xl border border-emerald-950/90 hover:border-emerald-700/60 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between group backdrop-blur-sm overflow-hidden"
              >
                <div>
                  {/* Destination Photo Header */}
                  {dest.imageUrl && (
                    <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                      <img 
                        src={dest.imageUrl} 
                        alt={`${dest.name} landmark`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#091712] via-[#091712]/30 to-transparent" />
                      
                      {/* Flag and Region Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="text-2xl drop-shadow-md" role="img" aria-label={dest.name}>
                          {dest.flag}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider bg-[#060f0c]/90 border border-emerald-700/60 px-2 py-0.5 rounded backdrop-blur-md">
                          {dest.region}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-5 pt-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors font-display">
                      {dest.name}
                    </h3>

                    <p className="text-xs text-slate-300 mt-2 leading-relaxed line-clamp-3">
                      {dest.description}
                    </p>

                    {/* Key Metrics */}
                    <div className="mt-3.5 space-y-1.5 pt-3 border-t border-emerald-950 text-[11px]">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Processing: <strong className="text-emerald-200">{dest.processingTime}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span className="truncate">Intakes: <strong className="text-emerald-200">{dest.intakesOrSeason}</strong></span>
                      </div>
                    </div>

                    {/* Visa Types Tags */}
                    <div className="mt-3 pt-3 border-t border-emerald-950">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-300/80 mb-1.5">
                        Common Visas:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {dest.popularVisas.slice(0, 2).map((visa, i) => (
                          <span key={i} className="text-[10px] bg-[#06110d] border border-emerald-900/60 text-emerald-200 px-2 py-0.5 rounded font-medium">
                            {visa}
                          </span>
                        ))}
                        {dest.popularVisas.length > 2 && (
                          <span className="text-[10px] bg-[#06110d] text-slate-400 border border-emerald-950 px-1.5 py-0.5 rounded">
                            +{dest.popularVisas.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mt-3 space-y-1">
                      {dest.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                          <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Progressive Disclosure Link: Hidden Details */}
                    {dest.hiddenDetails && (
                      <div className="mt-4 pt-3 border-t border-emerald-950">
                        <button
                          onClick={() => toggleDestinationDetails(dest.id)}
                          className="w-full py-1.5 px-2.5 rounded-lg bg-[#07140f] hover:bg-[#0c221a] border border-emerald-900/60 text-[11px] font-semibold text-emerald-300 hover:text-emerald-200 transition-colors flex items-center justify-between cursor-pointer group/link"
                        >
                          <span className="flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{isExpanded ? 'Hide Embassy Rules' : '✦ Country Rules & Financials'}</span>
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-emerald-400 group-hover/link:translate-y-0.5 transition-transform" />
                          )}
                        </button>

                        {/* Collapsible Hidden Content */}
                        {isExpanded && (
                          <div className="mt-2.5 p-3 rounded-xl bg-[#06110d] border border-emerald-800/40 text-[11px] text-slate-300 space-y-2.5 animate-fadeIn">
                            {/* Financial Solvency */}
                            {dest.hiddenDetails.financialRequirement && (
                              <div>
                                <div className="font-semibold text-emerald-300 flex items-center gap-1 mb-0.5">
                                  <Building2 className="w-3 h-3 text-emerald-400" />
                                  <span>Financial Solvency:</span>
                                </div>
                                <p className="text-slate-300 pl-4">{dest.hiddenDetails.financialRequirement}</p>
                              </div>
                            )}

                            {/* Work Rights */}
                            {dest.hiddenDetails.workRights && (
                              <div>
                                <div className="font-semibold text-emerald-300 flex items-center gap-1 mb-0.5">
                                  <Briefcase className="w-3 h-3 text-teal-400" />
                                  <span>Work Rights:</span>
                                </div>
                                <p className="text-slate-300 pl-4">{dest.hiddenDetails.workRights}</p>
                              </div>
                            )}

                            {/* Top Universities or Spots */}
                            {dest.hiddenDetails.topUniversitiesOrSpots && dest.hiddenDetails.topUniversitiesOrSpots.length > 0 && (
                              <div>
                                <div className="font-semibold text-emerald-300 flex items-center gap-1 mb-0.5">
                                  <MapPin className="w-3 h-3 text-emerald-400" />
                                  <span>Top Institutions / Hubs:</span>
                                </div>
                                <p className="text-slate-300 pl-4">{dest.hiddenDetails.topUniversitiesOrSpots.join(', ')}</p>
                              </div>
                            )}

                            {/* Pathway Notes */}
                            {dest.hiddenDetails.pathwayNotes && (
                              <div className="p-2 rounded-lg bg-[#081a13] border border-emerald-700/50">
                                <div className="font-semibold text-amber-300 flex items-center gap-1 text-[10px] mb-0.5">
                                  <Lightbulb className="w-3 h-3 text-amber-400" />
                                  <span>Pathway & Settlement:</span>
                                </div>
                                <p className="text-[10px] text-emerald-100/90 italic">
                                  "{dest.hiddenDetails.pathwayNotes}"
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Apply / Consult Trigger */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => onSelectDestination(dest.name)}
                    className="mt-2 w-full py-2.5 px-3 bg-[#0c2219] hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-700 text-emerald-100 hover:text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-emerald-800/60 hover:border-transparent shadow-md"
                  >
                    <span>Consult for {dest.name}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Destination Guarantee Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#091b15] via-[#081712] to-[#07130e] border border-emerald-800/40 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div>
            <h4 className="text-base font-bold text-white">Don't see your desired country listed?</h4>
            <p className="text-xs text-emerald-100/70">
              We process visa filings for over 40+ sovereign nations, including New Zealand, Singapore, Japan, Turkey, and Caribbean islands.
            </p>
          </div>
          <button
            onClick={() => onSelectDestination('Other / Custom Destination')}
            className="shrink-0 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
          >
            Custom Destination Enquiry
          </button>
        </div>

      </div>
    </section>
  );
};
