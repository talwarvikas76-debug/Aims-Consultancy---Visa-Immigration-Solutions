import React, { useState } from 'react';
import {
  Star,
  Quote,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/aimsData';
import { AimsLogo } from './AimsLogo';

export const TestimonialsSection: React.FC = () => {
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>(null);

  const caseStudies: Record<string, { challenge: string; solution: string; timeline: string }> = {
    t1: {
      challenge: '3-year academic gap after Senior Secondary with low spoken band score.',
      solution: 'Structured SOP explaining continuous relevant family business experience and enrolled in SDS college stream with verified GIC.',
      timeline: 'Approved in 26 business days with zero consular interviews.',
    },
    t2: {
      challenge: 'Expired passport needed for an urgent Dubai Trade Exhibition within 7 days.',
      solution: 'Expedited Tatkal passport file verification with PSK slot within 24h, plus expedited UAE 48-hour electronic tourist visa.',
      timeline: 'Passport delivered in 3 days; Visa approved in 36 hours.',
    },
    t3: {
      challenge: 'Elderly parents visiting UK without substantial personal property in their name.',
      solution: 'Prepared complete family sponsor affidavit, UK brother sponsorship audit, and established strong local community ties.',
      timeline: 'UK Standard Visitor Visa approved in 19 days.',
    },
    t4: {
      challenge: 'Schengen multi-country business travel spanning Germany, France, and Switzerland.',
      solution: 'Harmonized flight itinerary, multi-city hotel vouchers, and Schengen travel medical insurance ($50,000 cover).',
      timeline: 'VFS German Embassy slot booked and visa granted in 14 days.',
    },
  };

  const toggleCase = (id: string) => {
    setExpandedCaseId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-[#F8F9FA] border-b border-slate-200/90 text-[#334155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#926B16]">
            <AimsLogo variant="emblem" className="w-4 h-4" />
            <span>Verified Client Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
            Real Clients. Real Visas. Zero False Claims.
          </h2>
          <p className="text-[#334155] text-base leading-[1.65]">
            Authentic experiences from students and families across Hoshiarpur and Punjab who achieved their study and travel permits through our transparent consular preparation.
          </p>
        </div>

        {/* Written In-Depth Endorsements */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 font-display">
              <Quote className="w-4 h-4 text-[#C29B38]" />
              <span>Documented Client Dossier Reviews</span>
            </h3>
            <span className="text-xs text-slate-600 font-medium hidden sm:inline-block">
              Genuine Stamped Files from Doaba Region
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS_DATA.map((t) => {
              const isExpanded = expandedCaseId === t.id;
              const extraCase = caseStudies[t.id];

              return (
                <div
                  key={t.id}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 hover:border-[#C29B38] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#C29B38] text-[#C29B38]" />
                        ))}
                      </div>
                      <span className="text-[11px] font-bold text-[#0F172A] bg-[#F4F5F7] px-2.5 py-1 rounded-md border border-slate-200">
                        {t.visaType}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#334155] leading-[1.7] italic">
                      "{t.quote}"
                    </p>

                    {isExpanded && extraCase && (
                      <div className="mt-4 pt-4 border-t border-slate-200 space-y-2.5 animate-fadeIn text-xs">
                        <div className="p-3 rounded-xl bg-[#F4F5F7] border border-slate-200 space-y-1">
                          <strong className="text-[#0F172A] block font-bold text-[11px]">The Hurdle:</strong>
                          <p className="text-[#334155] text-[11px] leading-relaxed">{extraCase.challenge}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1 text-[#0F172A]">
                          <strong className="block font-bold text-[11px] text-[#926B16]">AIMS Legal Strategy:</strong>
                          <p className="text-[11px] text-[#334155] leading-relaxed">{extraCase.solution}</p>
                        </div>

                        <div className="text-[11px] font-semibold text-[#0F172A]">
                          ✓ {extraCase.timeline}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#0F172A]">{t.name}</h4>
                      <span className="text-xs text-slate-500">{t.location}</span>
                    </div>

                    {extraCase && (
                      <button
                        type="button"
                        onClick={() => toggleCase(t.id)}
                        className="text-xs font-semibold text-[#0F172A] hover:text-[#926B16] flex items-center gap-1 cursor-pointer"
                      >
                        <span>{isExpanded ? 'Less' : 'Case Breakdown'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
