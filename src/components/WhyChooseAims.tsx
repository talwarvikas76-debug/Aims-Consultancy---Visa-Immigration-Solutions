import React from 'react';
import { 
  BadgeCheck, 
  FileCheck2, 
  RefreshCw, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { COMPANY_DETAILS } from '../data/aimsData';
import { AimsLogo } from './AimsLogo';

interface WhyChooseAimsProps {
  currentLanguage: Language;
  onOpenBooking: () => void;
  onOpenEligibility: () => void;
}

export const WhyChooseAims: React.FC<WhyChooseAimsProps> = ({
  currentLanguage,
  onOpenBooking,
  onOpenEligibility,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const features = [
    {
      icon: (
        <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      title: t.card1Title,
      subtitle: 'Confirm with Visa Migration',
      description: t.card1Desc,
      stat: '99.2%',
      statLabel: 'Visa Approval Ratio',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="m4.93 4.93 4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24" />
        </svg>
      ),
      title: t.card2Title,
      subtitle: 'Continuity & Traveling Properties',
      description: t.card2Desc,
      stat: '100% Free',
      statLabel: 'Initial Advisory & GIC Setup',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: t.card3Title,
      subtitle: 'Improve Conditions & Approved Outcomes',
      description: t.card3Desc,
      stat: '500+ Cases',
      statLabel: 'Refusals Successfully Overturned',
    },
  ];

  return (
    <section className="py-14 sm:py-18 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-50 border border-red-200/80 mb-4 shadow-2xs">
            <AimsLogo variant="emblem" className="w-5 h-5" />
            <span className="text-xs font-bold text-slate-900">Aims Consultancy Benchmark Standards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight font-display">
            {t.whyChooseAimsTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {t.whyChooseAimsSubtitle}
          </p>
        </div>

        {/* 3 Feature Cards matching image.png */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 hover:bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Icon box matching image */}
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all text-blue-600">
                  {feature.icon}
                </div>

                <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-1">
                  {feature.subtitle}
                </div>

                <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-base font-black text-slate-900">{feature.stat}</span>
                  <span className="block text-[10px] text-slate-500">{feature.statLabel}</span>
                </div>

                <button
                  onClick={onOpenEligibility}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer group-hover:translate-x-1 transition-transform"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
