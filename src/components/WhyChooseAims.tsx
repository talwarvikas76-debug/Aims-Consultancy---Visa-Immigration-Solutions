import React from 'react';
import { ArrowRight, ShieldCheck, Compass, RefreshCw } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { AimsLogo } from './AimsLogo';

interface WhyChooseAimsProps {
  currentLanguage: Language;
  onOpenBooking: () => void;
  onOpenEligibility: () => void;
}

export const WhyChooseAims: React.FC<WhyChooseAimsProps> = ({
  currentLanguage,
  onOpenEligibility,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const features = [
    {
      icon: ShieldCheck,
      title: t.card1Title,
      subtitle: 'Proven Track Record',
      description: t.card1Desc,
      stat: '99.2%',
      statLabel: 'Visa Approval Ratio',
    },
    {
      icon: Compass,
      title: t.card2Title,
      subtitle: 'Seamless Guidance',
      description: t.card2Desc,
      stat: '100% Free',
      statLabel: 'Initial Advisory & GIC Setup',
    },
    {
      icon: RefreshCw,
      title: t.card3Title,
      subtitle: 'Overcome Rejections',
      description: t.card3Desc,
      stat: '500+ Cases',
      statLabel: 'Refusals Successfully Overturned',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#F8F9FA] border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Editorial Section Header (no pill clutter) */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#926B16]">
            <AimsLogo variant="emblem" className="w-4 h-4" />
            <span>Why Choose AIMS Consultancy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
            {t.whyChooseAimsTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#334155] leading-[1.65]">
            {t.whyChooseAimsSubtitle}
          </p>
        </div>

        {/* 3 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white hover:bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 hover:border-[#C29B38] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0F172A] text-[#DFB958] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    {idx === 0 ? (
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                        <AimsLogo variant="emblem" className="w-6 h-6" />
                      </div>
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>

                  <div className="text-[11px] font-bold text-[#926B16] uppercase tracking-[0.12em] mb-1">
                    {feature.subtitle}
                  </div>

                  <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#926B16] transition-colors font-display">
                    {feature.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-[#334155] leading-[1.65]">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-base font-extrabold text-[#0F172A] tabular-nums">
                      {feature.stat}
                    </span>
                    <span className="block text-[11px] text-slate-500">
                      {feature.statLabel}
                    </span>
                  </div>

                  <button
                    onClick={onOpenEligibility}
                    className="text-xs font-bold text-[#0F172A] hover:text-[#926B16] flex items-center gap-1 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Assess Profile</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C29B38]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
