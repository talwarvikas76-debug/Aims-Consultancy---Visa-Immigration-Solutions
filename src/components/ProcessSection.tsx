import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  CalendarCheck
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/aimsData';

interface ProcessSectionProps {
  onOpenBooking: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenBooking }) => {
  const [expandedStepIndex, setExpandedStepIndex] = useState<number | null>(null);

  const stepChecklists: Record<number, { docs: string[]; tip: string }> = {
    0: {
      docs: ['Academic marksheets & transcripts', 'IELTS / PTE / TOEFL scorecards', 'Current valid passport copies'],
      tip: 'We verify your points and eligibility upfront so you never invest in ineligible applications.'
    },
    1: {
      docs: ['6-month certified bank statements', 'Source of funds & sponsor affidavits', 'Draft Statement of Purpose (SOP)'],
      tip: 'Zero-error document dossiers prevent embassy delays or procedural fairness letters.'
    },
    2: {
      docs: ['Government portal profile (IRCC / UKVI)', 'Biometrics appointment booking letter', 'Embassy visa fee receipt'],
      tip: 'We secure the earliest available appointment slots at Jalandhar, Chandigarh, or Delhi VFS hubs.'
    },
    3: {
      docs: ['Live Consular portal tracking reference', 'Emergency embassy webform support', 'Dedicated relationship manager on WhatsApp'],
      tip: 'Our specialists draft immediate responses within 24h if any consular officer requests extra info.'
    },
    4: {
      docs: ['Passport counterfoil verification', 'Visa validity dates & condition checks', 'Original document dossier handover'],
      tip: 'We ensure visa numbers and travel conditions match your initial application before you depart.'
    },
    5: {
      docs: ['Student luggage flight tickets (40-46kg)', 'Zero-fee international Forex card', 'Airport immigration interview guidelines'],
      tip: 'Comprehensive briefing on what to expect at foreign customs and airport border control.'
    }
  };

  const toggleStep = (index: number) => {
    setExpandedStepIndex(prev => prev === index ? null : index);
  };

  return (
    <section id="process" className="py-16 sm:py-20 bg-white border-b border-slate-200 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide uppercase">
            <span>Methodology & Precision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
            Our Structured 6-Step Advisory Flow
          </h2>
          <p className="text-slate-600 text-base">
            Every visa, passport, or travel file at AIMS Consultancy undergoes rigorous cross-checking before official embassy lodgement to guarantee near-zero rejection risks.
          </p>
        </div>

        {/* 6-Step Flow Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PROCESS_STEPS.map((stepItem, index) => {
            const isExpanded = expandedStepIndex === index;
            const extraData = stepChecklists[index];

            return (
              <div
                key={index}
                className="relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all group flex flex-col justify-between shadow-md"
              >
                <div>
                  {/* Step Number Bubble & Connector */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-12 h-12 rounded-xl bg-blue-600 text-white font-extrabold text-lg flex items-center justify-center font-display group-hover:scale-105 transition-transform shadow-md shadow-blue-500/20">
                      {stepItem.step}
                    </span>
                    <span className="text-[11px] font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Phase {index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {stepItem.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {stepItem.description}
                  </p>

                  {/* Expandable Step Details */}
                  {isExpanded && extraData && (
                    <div className="mt-4 pt-4 border-t border-slate-100 text-xs space-y-3 animate-fadeIn">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="font-bold text-slate-900 block mb-1 text-[11px] uppercase tracking-wide">
                          Checklist Items for this Phase:
                        </span>
                        <ul className="space-y-1 text-slate-600 text-[11px]">
                          {extraData.docs.map((doc, dIdx) => (
                            <li key={dIdx} className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-[11px] leading-relaxed">
                        <strong>Advisor Guarantee:</strong> {extraData.tip}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => toggleStep(index)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Less Details' : 'View Verification Steps'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <span className="text-[11px] text-slate-400 font-medium">
                    Step {index + 1} of 6
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Call to Action */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-center max-w-4xl mx-auto shadow-sm">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Ready to initiate Step 1 for your profile?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Bring your educational transcripts or passport to our Court Road office in Hoshiarpur, or request a complete online file audit.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-blue-500/25 flex items-center gap-2 cursor-pointer"
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
