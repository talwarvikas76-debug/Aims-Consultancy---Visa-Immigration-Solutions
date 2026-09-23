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
    { id: 'holiday', label: 'Holiday Packages', icon: Palmtree },
    { id: 'additional', label: 'Allied Travel Services', icon: Layers },
  ];

  const filteredServices = SERVICES_DATA.filter((item) => {
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

    if (searchQuery !== '') {
      return matchesSearch;
    }

    return item.category === activeTab;
  });

  const toggleExpand = (id: string) => {
    setExpandedCardId(prev => prev === id ? null : id);
  };

  return (
    <section id="services" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide uppercase">
            <span>Portfolio of Advisory Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
            Comprehensive Travel & Immigration Portfolio
          </h2>
          <p className="text-slate-600 text-base">
            From university admissions and tourist file audits to urgent Tatkal passports and international group airfares, explore our complete scope of services with full transparency.
          </p>

          {/* Quick Search Input */}
          <div className="pt-2 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services (e.g. Canada, Tatkal, Schengen, Insurance)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white shadow-xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-semibold cursor-pointer"
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
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-102'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
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
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Visual Header Image Banner */}
                  {service.imageUrl && (
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      <img 
                        src={service.imageUrl} 
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                      
                      {/* Floating Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        {service.badge ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/90 text-blue-700 border border-slate-200 backdrop-blur-md shadow-xs">
                            {service.badge}
                          </span>
                        ) : <span />}

                        {service.timeline && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-900/80 text-white backdrop-blur-md flex items-center gap-1">
                            <Clock className="w-3 h-3 text-blue-400" />
                            <span>{service.timeline}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Card Content Area */}
                  <div className="p-5 sm:p-6 space-y-3.5">
                    
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Features Checklist */}
                    <div className="space-y-1.5 pt-1 border-t border-slate-100">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Hidden Details Drawer (Revealed on Click) */}
                    {isExpanded && service.hiddenDetails && (
                      <div className="pt-3 mt-2 border-t border-slate-200 text-xs space-y-3 animate-fadeIn">
                        
                        {/* Mandatory Requirements */}
                        {service.hiddenDetails.requirements && (
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                            <div className="font-bold text-slate-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                              <FileText className="w-3.5 h-3.5 text-blue-600" />
                              <span>Required Documentation:</span>
                            </div>
                            <ul className="list-disc pl-4 space-y-1 text-slate-600 text-[11px]">
                              {service.hiddenDetails.requirements.map((req, rIdx) => (
                                <li key={rIdx}>{req}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Expert Consular Tip */}
                        {service.hiddenDetails.expertTip && (
                          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
                            <div className="font-bold flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-amber-800">
                              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                              <span>Expert Advisor Tip:</span>
                            </div>
                            <p className="text-[11px] leading-relaxed text-amber-800">
                              {service.hiddenDetails.expertTip}
                            </p>
                          </div>
                        )}

                        {/* Quick FAQ / Note */}
                        {service.hiddenDetails.faq && (
                          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 space-y-1">
                            <div className="font-bold flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-blue-800">
                              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                              <span>Key Insight:</span>
                            </div>
                            <p className="text-[11px] leading-relaxed text-blue-900">
                              {service.hiddenDetails.faq}
                            </p>
                          </div>
                        )}

                      </div>
                    )}

                    {/* Toggle Button for Hidden Details */}
                    {service.hiddenDetails && (
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => toggleExpand(service.id)}
                          className="w-full py-1.5 text-center text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50/70 hover:bg-blue-50 rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? 'Hide Detailed Requirements' : 'View Requirements & Expert Tips'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    )}

                  </div>
                </div>

                {/* Card Bottom CTA Actions */}
                <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onOpenBooking({ visaType: service.title })}
                    className="flex-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Book Free Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={getWhatsAppDeliveryUrl(`Hello AIMS Consultancy, I am enquiring about ${service.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
                    title="Enquire on WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
