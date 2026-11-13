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
  Compass,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/aimsData';
import { AIMS_MEDIA } from '../assets/media';
import { ServiceCategory } from '../types';
import { getWhatsAppDeliveryUrl } from '../utils/whatsappRouting';
import { AimsLogo } from './AimsLogo';

interface ServicesSectionProps {
  onOpenBooking: (prefill?: { visaType?: string; destination?: string }) => void;
  onOpenContactWithService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'core' | ServiceCategory>('core');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const corePillars = [
    {
      title: 'Visa Appointments',
      subtitle: 'VFS, BLS & Embassy Filing',
      description: 'Priority biometric slot booking, Student/Tourist/Visitor files, and full consular dossier preparation.',
      icon: FileCheck,
      image: AIMS_MEDIA.serviceVisaDossier,
      tabTarget: 'visa' as ServiceCategory,
    },
    {
      title: 'Global Ticketing',
      subtitle: 'Negotiated GDS Fares & Baggage',
      description: 'Best-rate international airfares with 46kg student luggage allowances and multi-city itinerary support.',
      icon: Plane,
      image: AIMS_MEDIA.serviceAirTicketing,
      tabTarget: 'ticketing' as ServiceCategory,
    },
    {
      title: 'Documentation',
      subtitle: 'Passport Seva & Legal Audits',
      description: 'Tatkal Express passport renewals, MEA Apostille, SOP drafting, financial solvency audits, and affidavits.',
      icon: FileBadge,
      image: AIMS_MEDIA.officeAdvisoryDesk,
      tabTarget: 'passport' as ServiceCategory,
    },
    {
      title: 'Tour Packages',
      subtitle: 'Curated International Holidays',
      description: 'All-inclusive getaways for Dubai, Europe, UK, and Singapore complete with flights, hotels, and e-Visas.',
      icon: Compass,
      image: AIMS_MEDIA.serviceTourPackages,
      tabTarget: 'holiday' as ServiceCategory,
    },
  ];

  const categories: { id: 'core' | ServiceCategory; label: string; icon: React.ElementType }[] = [
    { id: 'core', label: 'All Core Services', icon: Compass },
    { id: 'visa', label: 'Visa Appointments', icon: FileCheck },
    { id: 'ticketing', label: 'Global Ticketing', icon: Plane },
    { id: 'passport', label: 'Documentation & Passport', icon: FileBadge },
    { id: 'holiday', label: 'Tour Packages', icon: Palmtree },
    { id: 'additional', label: 'Insurance & Forex', icon: Layers },
  ];

  // When 'core' is selected and no search query, display the flagship service per core domain
  const coreServiceIds = ['student-visa', 'tourist-visa', 'flight-international', 'passport-tatkal', 'holiday-dubai', 'add-insurance'];

  const filteredServices = SERVICES_DATA.filter((item) => {
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

    if (searchQuery !== '') {
      return matchesSearch;
    }

    if (activeTab === 'core') {
      return coreServiceIds.includes(item.id);
    }

    return item.category === activeTab;
  });

  const toggleExpand = (id: string) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="services" className="py-16 sm:py-20 bg-[#F8F9FA] border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#926B16]">
            <AimsLogo variant="emblem" className="w-4 h-4" />
            <span>Tailored Solutions & Transparent Documentation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
            Core Travel, Visa & Advisory Services
          </h2>
          <p className="text-[#334155] text-base leading-[1.65]">
            From visa appointments and global ticketing to legal documentation and curated tour packages, each service pairs specialist oversight with transparent timelines.
          </p>
        </div>

        {/* 4 Core Service Pillars Strip (Visa Appointments, Global Ticketing, Documentation, Tour Packages) */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {corePillars.map((pillar) => {
            const Icon = pillar.icon;
            const isTabMatch = activeTab === pillar.tabTarget;
            return (
              <button
                key={pillar.title}
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab(pillar.tabTarget);
                }}
                className={`text-left bg-white rounded-2xl overflow-hidden border transition-all group cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md ${
                  isTabMatch ? 'border-[#C29B38] ring-1 ring-[#C29B38]' : 'border-slate-200/90 hover:border-[#C29B38]'
                }`}
              >
                <div>
                  <div className="relative h-32 w-full overflow-hidden bg-[#0F172A]">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-[#0F172A]/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-[#0F172A] border border-[#C29B38]/60 text-[#DFB958] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-white leading-tight truncate">
                          {pillar.title}
                        </div>
                        <div className="text-[10px] text-[#DFB958] font-medium truncate">
                          {pillar.subtitle}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-[#334155] leading-[1.6]">
                      {pillar.description}
                    </p>
                  </div>
                </div>
                <div className="px-4 pb-4 pt-1 flex items-center justify-between text-xs font-bold text-[#0F172A] group-hover:text-[#926B16]">
                  <span>Explore {pillar.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C29B38] group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Search Input + Filter Tabs */}
        <div className="mt-10 space-y-6">
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services (e.g. Canada, Tatkal, Schengen, Insurance)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-16 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#C29B38] shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-[#0F172A] font-semibold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {!searchQuery && (
            <div className="flex items-center justify-center flex-wrap gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    id={`tab-btn-${cat.id}`}
                    onClick={() => setActiveTab(cat.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-xs'
                        : 'bg-white text-[#334155] hover:text-[#0F172A] border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#DFB958]' : 'text-slate-500'}`} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Detailed Service Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const isExpanded = expandedCardId === service.id;

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#C29B38] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Visual Header Image Banner */}
                  {service.imageUrl && (
                    <div className="relative h-44 w-full overflow-hidden bg-[#0F172A]">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/75 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#F8F9FA]/95 text-[#0F172A] border border-slate-200/80 backdrop-blur-sm shadow-xs inline-flex items-center gap-1.5">
                          <AimsLogo variant="emblem" className="w-3.5 h-3.5" />
                          <span>{service.badge || 'AIMS Verified'}</span>
                        </span>

                        {service.timeline && (
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-[#0F172A]/90 text-white backdrop-blur-sm flex items-center gap-1 tabular-nums">
                            <Clock className="w-3 h-3 text-[#DFB958]" />
                            <span>{service.timeline}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Card Content Area */}
                  <div className="p-5 sm:p-6 space-y-3.5">
                    <div className="space-y-1.5">
                      <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#926B16] transition-colors font-display">
                        {service.title}
                      </h3>
                      <p className="text-xs text-[#334155] leading-[1.65]">
                        {service.description}
                      </p>
                    </div>

                    {/* Features Checklist */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#334155]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C29B38] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Hidden Details Drawer */}
                    {isExpanded && service.hiddenDetails && (
                      <div className="pt-3 mt-2 border-t border-slate-200 text-xs space-y-3 animate-fadeIn">
                        {service.hiddenDetails.requirements && (
                          <div className="p-3 rounded-xl bg-[#F4F5F7] border border-slate-200 space-y-1.5">
                            <div className="font-bold text-[#0F172A] flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                              <FileText className="w-3.5 h-3.5 text-[#926B16]" />
                              <span>Required Documentation:</span>
                            </div>
                            <ul className="list-disc pl-4 space-y-1 text-[#334155] text-[11px]">
                              {service.hiddenDetails.requirements.map((req, rIdx) => (
                                <li key={rIdx}>{req}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {service.hiddenDetails.expertTip && (
                          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[#0F172A] space-y-1">
                            <div className="font-bold flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#926B16]">
                              <Lightbulb className="w-3.5 h-3.5 text-[#C29B38]" />
                              <span>Expert Advisor Tip:</span>
                            </div>
                            <p className="text-[11px] leading-relaxed text-[#334155]">
                              {service.hiddenDetails.expertTip}
                            </p>
                          </div>
                        )}

                        {service.hiddenDetails.faq && (
                          <div className="p-3 rounded-xl bg-[#F8F9FA] border border-slate-200 text-[#0F172A] space-y-1">
                            <div className="font-bold flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#0F172A]">
                              <HelpCircle className="w-3.5 h-3.5 text-[#926B16]" />
                              <span>Key Insight:</span>
                            </div>
                            <p className="text-[11px] leading-relaxed text-[#334155]">
                              {service.hiddenDetails.faq}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Toggle Button */}
                    {service.hiddenDetails && (
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => toggleExpand(service.id)}
                          className="w-full py-2 text-center text-xs font-semibold text-[#0F172A] hover:text-[#926B16] bg-[#F4F5F7] hover:bg-slate-200/70 rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? 'Hide Detailed Requirements' : 'View Requirements & Checklist'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Bottom CTA Actions */}
                <div className="p-5 sm:p-6 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => onOpenBooking({ visaType: service.title })}
                    className="flex-1 py-2.5 px-3 bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Free Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#DFB958]" />
                  </button>

                  <a
                    href={getWhatsAppDeliveryUrl(`Hello AIMS Consultancy, I am enquiring about ${service.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#F4F5F7] hover:bg-[#C29B38]/20 text-[#0F172A] border border-slate-200 transition-colors"
                    title="Enquire on WhatsApp"
                    aria-label={`Enquire on WhatsApp about ${service.title}`}
                  >
                    <MessageSquare className="w-4 h-4 text-[#0F172A]" />
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
