import React, { useState } from 'react';
import { 
  FileCheck, 
  FileBadge, 
  Plane, 
  Palmtree, 
  Layers, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  MessageSquare,
  Search,
  ChevronDown,
  ChevronUp,
  FileText,
  Lightbulb,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';
import { SERVICES_DATA, COMPANY_DETAILS } from '../data/aimsData';
import { ServiceCategory, ServiceItem } from '../types';
import { getWhatsAppDeliveryUrl } from '../utils/whatsappRouting';

interface ServicesSectionProps {
  onOpenBooking: (prefill?: { visaType?: string; destination?: string }) => void;
  onOpenContactWithService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onOpenBooking,
  onOpenContactWithService
}) => {
  const [activeTab, setActiveTab] = useState<ServiceCategory>('visa');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const categories: { id: ServiceCategory; label: string; icon: React.ElementType }[] = [
    { id: 'visa', label: 'Visa Services', icon: FileCheck },
    { id: 'passport', label: 'Passport Assistance', icon: FileBadge },
    { id: 'ticketing', label: 'Airline Ticketing', icon: Plane },
    { id: 'holiday', label: 'Holiday & Tours', icon: Palmtree },
    { id: 'additional', label: 'Additional Solutions', icon: Layers },
  ];

  const filteredServices = SERVICES_DATA.filter((s) => {
    const matchesCategory = searchQuery ? true : s.category === activeTab;
    const matchesSearch = searchQuery 
      ? s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
    return matchesCategory && matchesSearch;
  });

  const toggleDetails = (serviceId: string) => {
    setExpandedCardId(prev => prev === serviceId ? null : serviceId);
  };

  return (
    <section id="services" className="py-16 sm:py-20 bg-[#060f0c] border-b border-emerald-950/80 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/50 text-emerald-300 text-xs font-bold tracking-wide uppercase">
            <span>Portfolio of Advisory Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Comprehensive Travel & Immigration Portfolio
          </h2>
          <p className="text-emerald-100/70 text-base">
            From university admissions and tourist file audits to urgent Tatkal passports and international group airfares, explore our complete scope of services with full transparency.
          </p>

          {/* Quick Search Input */}
          <div className="pt-2 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-emerald-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services (e.g. Canada, Tatkal, Schengen, Insurance)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#091712] border border-emerald-900/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Navigation Tabs */}
        {!searchQuery && (
          <div className="mt-8 flex items-center justify-center flex-wrap gap-2 sm:gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`tab-btn-${cat.id}`}
                  onClick={() => setActiveTab(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-950/80 scale-102'
                      : 'bg-[#091712] text-slate-300 hover:bg-[#0e241c] hover:text-white border border-emerald-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-400/80'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Service Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const isExpanded = expandedCardId === service.id;

            return (
              <div
                key={service.id}
                className="bg-[#091712]/90 rounded-2xl border border-emerald-950/90 hover:border-emerald-700/60 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between group backdrop-blur-sm overflow-hidden"
              >
                <div>
                  {/* Visual Header Image Banner */}
                  {service.imageUrl && (
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                      <img 
                        src={service.imageUrl} 
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#091712] via-[#091712]/30 to-transparent" />
                      
                      {/* Floating Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        {service.badge ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#060f0c]/90 text-emerald-300 border border-emerald-700/60 backdrop-blur-md">
                            {service.badge}
                          </span>
                        ) : <span />}

                        {service.timeline && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-200 bg-[#060f0c]/85 px-2.5 py-0.5 rounded-full border border-emerald-800/40 backdrop-blur-md">
                            <Clock className="w-3 h-3 text-emerald-400" />
                            <span>{service.timeline}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="p-5 sm:p-6 pt-3">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors font-display">
                      {service.title}
                    </h3>

                    {/* Target Audience */}
                    {service.recommendedFor && (
                      <p className="text-[11px] font-medium text-emerald-200/70 mt-1 italic">
                        Recommended for: {service.recommendedFor}
                      </p>
                    )}

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features Checklist */}
                    <div className="mt-3.5 pt-3.5 border-t border-emerald-950 space-y-1.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300/80">
                        Key Inclusions:
                      </p>
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Progressive Disclosure: Hidden Information Link */}
                    {service.hiddenDetails && (
                      <div className="mt-4 pt-3 border-t border-emerald-950/80">
                        <button
                          onClick={() => toggleDetails(service.id)}
                          id={`toggle-details-${service.id}`}
                          className="w-full py-1.5 px-3 rounded-lg bg-[#07140f] hover:bg-[#0c221a] border border-emerald-900/60 text-xs font-semibold text-emerald-300 hover:text-emerald-200 transition-colors flex items-center justify-between cursor-pointer group/link"
                        >
                          <span className="flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{isExpanded ? 'Hide Detailed Checklist & Expert Tip' : '✦ View Checklist & Hidden Details'}</span>
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-emerald-400 group-hover/link:translate-y-0.5 transition-transform" />
                          )}
                        </button>

                        {/* Collapsible Hidden Content Area */}
                        {isExpanded && (
                          <div className="mt-3 p-3.5 rounded-xl bg-[#06110d] border border-emerald-800/40 text-xs text-slate-300 space-y-3 animate-fadeIn">
                            {/* Requirements & Solvency */}
                            <div>
                              <div className="font-semibold text-emerald-300 flex items-center gap-1.5 mb-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Core Prerequisites:</span>
                              </div>
                              <p className="text-[11px] text-slate-300 pl-5">
                                {service.hiddenDetails.requirements}
                              </p>
                            </div>

                            {/* Documentation Checklist */}
                            <div>
                              <div className="font-semibold text-emerald-300 flex items-center gap-1.5 mb-1">
                                <FileText className="w-3.5 h-3.5 text-teal-400" />
                                <span>Dossier Checklist:</span>
                              </div>
                              <ul className="text-[11px] text-slate-300 pl-5 list-disc space-y-0.5">
                                {service.hiddenDetails.documentation.map((doc, idx) => (
                                  <li key={idx}>{doc}</li>
                                ))}
                              </ul>
                            </div>

                            {/* Senior Expert Tip */}
                            {service.hiddenDetails.expertTip && (
                              <div className="p-2.5 rounded-lg bg-[#081a13] border border-emerald-700/50">
                                <div className="font-bold text-emerald-300 flex items-center gap-1.5 text-[11px] mb-1">
                                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                                  <span>Senior Consular Tip:</span>
                                </div>
                                <p className="text-[11px] text-emerald-100/90 italic">
                                  "{service.hiddenDetails.expertTip}"
                                </p>
                              </div>
                            )}

                            {/* FAQ Snippet if available */}
                            {service.hiddenDetails.faq && (
                              <div className="pt-1 text-[11px] text-slate-300 border-t border-emerald-950">
                                <span className="text-emerald-300 font-semibold block mb-0.5">Frequent Question:</span>
                                <p className="text-slate-300">{service.hiddenDetails.faq}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-5 sm:p-6 pt-0">
                  <div className="pt-3 border-t border-emerald-950/80 flex items-center gap-2">
                    {service.category === 'visa' ? (
                      <button
                        onClick={() => onOpenBooking({ visaType: service.title })}
                        className="flex-1 py-2 px-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-950/50"
                      >
                        <span>Reserve Free Slot</span>
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onOpenContactWithService(service.title)}
                        className="flex-1 py-2 px-3 bg-[#0c2219] hover:bg-[#123325] text-emerald-100 text-xs font-bold rounded-xl border border-emerald-800/60 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Enquire Directly</span>
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                      </button>
                    )}

                    <a
                      href={getWhatsAppDeliveryUrl(
                        `Hello AIMS Consultancy,\n\nI am inquiring regarding your service: *${service.title}*.\n\nPlease share current slot availability and processing timeline.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-950/60 rounded-xl border border-emerald-900/60 transition-colors"
                      title="Direct WhatsApp Query"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#091b15] via-[#081712] to-[#07130e] border border-emerald-800/40 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold font-display text-white">
              Need assistance with an unusual or complex consular profile?
            </h4>
            <p className="text-xs sm:text-sm text-emerald-100/70">
              We handle CAIPS/GCMS refusal audits, academic study gaps, spouse sponsorships, and urgent Tatkal passport filings.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking()}
            className="shrink-0 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-lg shadow-emerald-950/60 cursor-pointer"
          >
            Speak to a Senior Specialist
          </button>
        </div>

      </div>
    </section>
  );
};
