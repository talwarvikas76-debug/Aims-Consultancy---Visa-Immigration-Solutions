import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/aimsData';
import { AimsLogo } from './AimsLogo';

interface ProcessSectionProps {
  onOpenBooking: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenBooking }) => {
  const [expandedStepIndex, setExpandedStepIndex] = useState<number | null>(null);

  const stepChecklists: Record<number, { docs: string[]; tip: string }> = {
    0: {
      docs: ['Academic marksheets & transcripts', 'IELTS / PTE / TOEFL scorecards', 'Current valid passport copies'],
      tip: 'We verify your points and eligibility upfront so you never invest in ineligible applications.',
    },
    1: {
      docs: ['6-month certified bank statements', 'Source of funds & sponsor affidavits', 'Draft Statement of Purpose (SOP)'],
      tip: 'Zero-error document dossiers prevent embassy delays or procedural fairness letters.',
    },
    2: {
      docs: ['Government portal profile (IRCC / UKVI)', 'Biometrics appointment booking letter', 'Embassy visa fee receipt'],
      tip: 'We secure the earliest available appointment slots at Jalandhar, Chandigarh, or Delhi VFS hubs.',
    },
    3: {
      docs: ['Live Consular portal tracking reference', 'Emergency embassy webform support', 'Dedicated relationship manager on WhatsApp'],
      tip: 'Our specialists draft immediate responses within 24h if any consular officer requests extra info.',
    },
    4: {
      docs: ['Passport counterfoil verification', 'Visa validity dates & condition checks', 'Original document dossier handover'],
      tip: 'We ensure visa numbers and travel conditions match your initial application before you depart.',
    },
    5: {
      docs: ['Student luggage flight tickets (40-46kg)', 'Zero-fee international Forex card', 'Airport immigration interview guidelines'],
      tip: 'Comprehensive briefing on what to expect at foreign customs and airport border control.',
    },
  };

  const toggleStep = (index: number) => {
    setExpandedStepIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="process" className="py-16 sm:py-20 bg-[#F8F9FA] border-b border-slate-200/90 text-[#334155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#926B16]">
            <AimsLogo variant="emblem" className="w-4 h-4" />
            <span>Seamless Guidance • 6-Step Consular Pathway</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
            Our Structured 6-Step Advisory Flow
          </h2>
          <p className="text-[#334155] text-base leading-[1.65]">
            Every visa, passport, or travel file at AIMS Consultancy undergoes rigorous cross-checking before official embassy lodgement to minimize rejection risks.
          </p>
        </div>

        {/* 6-Step Flow Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {PROCESS_STEPS.map((stepItem, index) => {
            const isExpanded = expandedStepIndex === index;
            const extraData = stepChecklists[index];

            return (
              <div
                key={index}
                className="relative p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-[#C29B38] shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-11 h-11 rounded-xl bg-[#0F172A] text-[#DFB958] font-extrabold text-base flex items-center justify-center font-display tabular-nums">
                      {stepItem.step}
                    </span>
                    <span className="text-[11px] font-bold text-[#926B16] uppercase tracking-widest">
                      Phase {index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#926B16] transition-colors font-display">
                    {stepItem.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#334155] leading-[1.65]">
                    {stepItem.description}
                  </p>

                  {isExpanded && extraData && (
                    <div className="mt-4 pt-4 border-t border-slate-100 text-xs space-y-3 animate-fadeIn">
                      <div className="p-3 rounded-xl bg-[#F4F5F7] border border-slate-200">
                        <span className="font-bold text-[#0F172A] block mb-1.5 text-[11px] uppercase tracking-wide">
                          Checklist Items for this Phase:
                        </span>
                        <ul className="space-y-1 text-[#334155] text-[11px]">
                          {extraData.docs.map((doc, dIdx) => (
                            <li key={dIdx} className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#C29B38] shrink-0" />
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[#0F172A] text-[11px] leading-relaxed">
                        <strong className="text-[#926B16]">Advisor Guarantee:</strong> {extraData.tip}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => toggleStep(index)}
                    className="text-xs font-semibold text-[#0F172A] hover:text-[#926B16] flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Less Details' : 'View Verification Steps'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <span className="text-[11px] text-slate-500 font-medium tabular-nums">
                    Step {index + 1} of 6
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Call to Action */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#0F172A] text-white text-center max-w-4xl mx-auto shadow-md border border-slate-800">
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            Ready to initiate Step 1 for your profile?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-[1.65]">
            Bring your educational transcripts or passport to our Fatehgarh Chowk office in Hoshiarpur, or request a complete online file audit.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 bg-[#C29B38] hover:bg-[#B38D2D] text-[#0F172A] font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Schedule Step 1 Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
