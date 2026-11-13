import React from 'react';
import { ShieldCheck, MapPin, Award, CheckCircle2, Phone } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/aimsData';

export const TrustCredentialsStrip: React.FC = () => {
  const credentials = [
    {
      icon: ShieldCheck,
      label: 'Government Approved',
      value: `Licence No. ${COMPANY_DETAILS.licenceNo}`,
      sub: 'Punjab State Overseas Advisory',
    },
    {
      icon: Award,
      label: 'Consular Accuracy',
      value: '99.2% Approval Record',
      sub: 'Pre-lodgement legal file audit',
    },
    {
      icon: CheckCircle2,
      label: 'Transparent Policy',
      value: '100% Free Initial Check',
      sub: 'Zero consultation charges',
    },
    {
      icon: MapPin,
      label: 'Hoshiarpur Head Office',
      value: 'Fatehgarh Chowk, Hoshiarpur',
      sub: `Direct Line: ${COMPANY_DETAILS.phone}`,
    },
  ];

  return (
    <section
      aria-label="Official Credentials and Trust Markers"
      className="bg-[#F4F5F7] border-b border-slate-200/90 py-6 sm:py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-slate-300/80">
          {credentials.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 lg:px-6 first:lg:pl-0 last:lg:pr-0"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0F172A] text-[#DFB958] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#926B16]">
                    {item.label}
                  </div>
                  <div className="text-sm font-bold text-[#0F172A] tabular-nums leading-snug mt-0.5">
                    {item.value}
                  </div>
                  <div className="text-xs text-[#334155]/80 mt-0.5 leading-snug">
                    {item.sub}
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
