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
    <section id="process" className="py-16 sm:py-20 bg-[#060f0c] border-b border-emerald-950/80 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/50 text-emerald-300 text-xs font-bold tracking-wide uppercase">
            <span>Methodology & Precision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Our Structured 6-Step Advisory Flow
          </h2>
          <p className="text-emerald-100/70 text-base">
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
                className="relative p-6 rounded-2xl bg-[#091712]/90 border border-emerald-950/90 hover:border-emerald-700/60 hover:bg-[#0c1f18] hover:shadow-2xl transition-all group flex flex-col justify-between backdrop-blur-sm shadow-xl"
              >
                <div>
                  {/* Step Number Bubble & Connector */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-extrabold text-lg flex items-center justify-center font-display group-hover:scale-105 transition-transform shadow-md shadow-emerald-950/70">
                      {stepItem.step}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-400/80 uppercase tracking-widest bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                      Phase {index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white font-display group-hover:text-emerald-300 transition-colors">
                    {stepItem.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                    {stepItem.description}
                  </p>

                  {/* Deliverable Badge */}
                  <div className="mt-4 pt-3 border-t border-emerald-950">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-bold bg-[#06110d] p-2.5 rounded-xl border border-emerald-900/50">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="truncate">Output: {stepItem.deliverable}</span>
                    </div>
                  </div>

                  {/* Hidden Information beneath the link */}
                  {extraData && (
                    <div className="mt-3">
                      <button
                        onClick={() => toggleStep(index)}
                        className="w-full py-1.5 px-2.5 rounded-lg bg-[#07140f] hover:bg-[#0c221a] border border-emerald-900/60 text-[11px] font-semibold text-emerald-300 hover:text-emerald-200 transition-colors flex items-center justify-between cursor-pointer group/btn"
                      >
                        <span className="flex items-center gap-1.5">
                          <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{isExpanded ? 'Hide Phase Checklist' : '✦ View Checklist & Protocols'}</span>
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-emerald-400 group-hover/btn:translate-y-0.5 transition-transform" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="mt-2.5 p-3 rounded-xl bg-[#06110d] border border-emerald-800/40 text-[11px] text-slate-300 space-y-2 animate-fadeIn">
                          <p className="font-semibold text-emerald-300">Phase Checklist:</p>
                          <ul className="list-disc pl-4 space-y-0.5 text-slate-300">
                            {extraData.docs.map((doc, dIdx) => (
                              <li key={dIdx}>{doc}</li>
                            ))}
                          </ul>
                          <div className="p-2 rounded bg-[#081a13] border border-emerald-700/40 text-emerald-100/90 text-[10px] italic">
                            💡 {extraData.tip}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3">
                  <button
                    onClick={onOpenBooking}
                    className="w-full py-2 px-3 rounded-xl bg-[#0c2219] hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-700 text-emerald-200 hover:text-white text-xs font-bold transition-all border border-emerald-800/50 hover:border-transparent flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Initiate Step {stepItem.step}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Reliability Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#091b15] via-[#081712] to-[#07130e] border border-emerald-800/40 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-xl">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold shadow-md shadow-emerald-950/60">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold font-display text-white">
                100% Genuine Documents & Embassy Rule Adherence
              </h4>
              <p className="text-xs text-emerald-100/70 mt-0.5">
                We strictly reject fraudulent document requests and uphold zero tolerance for fake funds or falsified profiles.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="shrink-0 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/60 flex items-center gap-2 cursor-pointer"
          >
            <span>Start Step 1: Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
