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
    <section id="testimonials" className="py-16 sm:py-20 bg-[#060f0c] border-b border-emerald-950/80 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/50 text-emerald-300 text-xs font-bold tracking-wide uppercase">
            <Quote className="w-3.5 h-3.5 text-emerald-400" />
            <span>Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            What Our Successful Clients Say
          </h2>
          <p className="text-emerald-100/70 text-base">
            Read real experiences from students, vacationers, and families across Hoshiarpur and Punjab who achieved their global travel and study goals with AIMS Consultancy.
          </p>
          <div className="flex items-center justify-center gap-2 pt-1 text-xs font-bold text-slate-300">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span>4.9 / 5.0 Rated Across 500+ Verified Client Reviews</span>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TESTIMONIALS_DATA.map((t) => {
            const isExpanded = expandedCaseId === t.id;
            const study = caseStudies[t.id];

            return (
              <div
                key={t.id}
                className="bg-[#091712]/90 rounded-2xl border border-emerald-950/90 hover:border-emerald-700/60 p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between backdrop-blur-sm"
              >
                <div>
                  {/* Star rating & verified badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-700/50">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Verified Client</span>
                    </span>
                  </div>

                  {/* Quote text */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    "{t.quote}"
                  </p>

                  {/* Progressive Disclosure Link: Case Study Breakdown */}
                  {study && (
                    <div className="mt-4 pt-3 border-t border-emerald-950">
                      <button
                        onClick={() => toggleCase(t.id)}
                        className="text-[11px] text-emerald-300 hover:text-emerald-200 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <FileText className="w-3 h-3 text-emerald-400" />
                        <span>✦ {isExpanded ? 'Hide Case Study Breakdown' : 'Read Case Study & Challenges Resolved'}</span>
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>

                      {isExpanded && (
                        <div className="mt-2.5 p-3 rounded-xl bg-[#06110d] border border-emerald-800/40 text-[11px] text-slate-300 space-y-1.5 animate-fadeIn">
                          <div>
                            <span className="font-semibold text-rose-300">Profile Hurdle: </span>
                            <span>{study.challenge}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-emerald-300">AIMS Strategy: </span>
                            <span>{study.solution}</span>
                          </div>
                          <div className="pt-1 text-[10px] text-emerald-400 font-medium">
                            ✓ {study.timeline}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Author Footer */}
                <div className="mt-6 pt-4 border-t border-emerald-950/80 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">
                      {t.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {t.location} • <span className="text-emerald-300 font-semibold">{t.visaType}</span>
                    </p>
                  </div>
                  <div className="text-[10px] text-emerald-400/80 font-medium">
                    {t.date}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
