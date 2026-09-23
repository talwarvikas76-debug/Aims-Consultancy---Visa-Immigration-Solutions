import React, { useState } from 'react';
import { Star, Quote, CheckCircle2, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/aimsData';

export const TestimonialsSection: React.FC = () => {
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>(null);

  const caseStudies: Record<string, { challenge: string; solution: string; timeline: string }> = {
    't1': {
      challenge: '3-year academic gap after Senior Secondary with low spoken band score.',
      solution: 'Structured SOP explaining continuous relevant family business experience and enrolled in SDS college stream with verified GIC.',
      timeline: 'Approved in 26 business days with zero consular interviews.'
    },
    't2': {
      challenge: 'Expired passport needed for an urgent Dubai Trade Exhibition within 7 days.',
      solution: 'Expedited Tatkal passport file verification with PSK slot within 24h, plus expedited UAE 48-hour electronic tourist visa.',
      timeline: 'Passport delivered in 3 days; Visa approved in 36 hours.'
    },
    't3': {
      challenge: 'Elderly parents visiting UK without substantial personal property in their name.',
      solution: 'Prepared complete family sponsor affidavit, UK brother sponsorship audit, and established strong local community ties.',
      timeline: 'UK Standard Visitor Visa approved in 19 days.'
    },
    't4': {
      challenge: 'Schengen multi-country business travel spanning Germany, France, and Switzerland.',
      solution: 'Harmonized flight itinerary, multi-city hotel vouchers, and Schengen travel medical insurance ($50,000 cover).',
      timeline: 'VFS German Embassy slot booked and visa granted in 14 days.'
    }
  };

  const toggleCase = (id: string) => {
    setExpandedCaseId(prev => prev === id ? null : id);
  };

  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-white border-b border-slate-200 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide uppercase">
            <Quote className="w-3.5 h-3.5 text-blue-600" />
            <span>Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
            What Our Successful Clients Say
          </h2>
          <p className="text-slate-600 text-base">
            Read real experiences from students, vacationers, and families across Hoshiarpur and Punjab who achieved their global travel and study goals with AIMS Consultancy.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS_DATA.map((t) => {
            const isExpanded = expandedCaseId === t.id;
            const extraCase = caseStudies[t.id];

            return (
              <div
                key={t.id}
                className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars & Verified Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{t.visaType}</span>
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{t.quote}"
                  </p>

                  {/* Expandable Case Study Deep Dive */}
                  {isExpanded && extraCase && (
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-2.5 animate-fadeIn text-xs">
                      <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                        <strong className="text-slate-900 block font-bold text-[11px]">The Hurdle:</strong>
                        <p className="text-slate-600 text-[11px]">{extraCase.challenge}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 space-y-1 text-blue-900">
                        <strong className="block font-bold text-[11px]">AIMS Legal Strategy:</strong>
                        <p className="text-[11px]">{extraCase.solution}</p>
                      </div>

                      <div className="text-[11px] font-semibold text-emerald-700">
                        ✓ {extraCase.timeline}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Info */}
                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{t.name}</h4>
                    <span className="text-xs text-slate-500">{t.location}</span>
                  </div>

                  {extraCase && (
                    <button
                      type="button"
                      onClick={() => toggleCase(t.id)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
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
    </section>
  );
};
