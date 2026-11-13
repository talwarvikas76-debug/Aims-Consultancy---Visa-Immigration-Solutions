import React, { useState } from 'react';
import {
  ShieldCheck,
  Target,
  Eye,
  Clock,
  Users,
  FileSpreadsheet,
  ChevronDown,
  ChevronUp,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/aimsData';
import { AIMS_MEDIA } from '../assets/media';
import { AimsLogo } from './AimsLogo';

export const AboutSection: React.FC = () => {
  const [showPledges, setShowPledges] = useState(false);
  const [officeImgError, setOfficeImgError] = useState(false);

  const values = [
    {
      icon: ShieldCheck,
      title: 'Expert Legal Guidance',
      description: 'Our consultants maintain direct compliance with IRCC, UKVI, Home Affairs, and MEA regulatory policies.',
    },
    {
      icon: FileSpreadsheet,
      title: 'Zero Hidden Fees',
      description: 'Absolute clarity regarding government consulate levies, VFS charges, and our transparent advisory packages.',
    },
    {
      icon: Clock,
      title: 'Rapid Submission Pipeline',
      description: 'Digitized document audits and rapid appointment scheduling to ensure minimal waiting times for clients.',
    },
    {
      icon: Users,
      title: 'Personalized Profile Mapping',
      description: 'We do not sell cookie-cutter plans. Every student or traveler receives a roadmap matched strictly to their profile.',
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-[#F4F5F7] border-b border-slate-200/90 text-[#334155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#926B16]">
            <AimsLogo variant="emblem" className="w-4 h-4" />
            <span>Who We Are & Our Heritage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
            Guiding Punjab’s Global Aspirations with Trust & Transparency
          </h2>
          <p className="text-[#334155] text-base leading-[1.65]">
            Headquartered in Hoshiarpur, Punjab, <strong className="text-[#0F172A]">AIMS Consultancy</strong> was established with a singular ethos:
            to replace ambiguity and arbitrary rejections with rigorous consular document verification,
            legal accuracy, and dependable client advocacy.
          </p>
        </div>

        {/* Visual Storytelling Showcase */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Authentic Desk Photo Spotlight */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-200/90 group shadow-md bg-[#0F172A]">
            {!officeImgError ? (
              <img
                src={AIMS_MEDIA.officeAdvisoryDesk}
                onError={() => setOfficeImgError(true)}
                alt="Senior consultant reviewing visa dossier at AIMS Hoshiarpur office"
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-80 bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center">
                <AimsLogo variant="full" theme="dark" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-[#0F172A]/20 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#F8F9FA]/95 border border-slate-200 backdrop-blur-md shadow-sm text-[#0F172A]">
              <div className="flex items-center gap-2 text-[#0F172A] text-xs font-bold">
                <Building className="w-4 h-4 text-[#926B16]" />
                <span>Fatehgarh Chowk Headquarters • Hoshiarpur</span>
              </div>
              <p className="text-[11px] text-[#334155] mt-1">
                Punjab Govt. Licensed Advisory (Licence No: {COMPANY_DETAILS.licenceNo}).
              </p>
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#0F172A] text-[#DFB958] flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] font-display">Our Vision</h3>
                <p className="text-[#334155] text-xs sm:text-sm leading-[1.65]">
                  To stand as the benchmark of ethical, authentic, and high-success immigration and travel consultancy in Punjab,
                  empowering individuals, students, and families to cross international borders with confidence.
                </p>
                <div className="pt-1 flex items-center gap-2 text-xs text-[#0F172A] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#C29B38] shrink-0" />
                  <span className="tabular-nums">99.2% Pre-Consular Filing Accuracy</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#0F172A] text-[#DFB958] flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] font-display">Our Mission</h3>
                <p className="text-[#334155] text-xs sm:text-sm leading-[1.65]">
                  To demystify foreign entry laws, eliminate hidden surcharges, and provide meticulous, individual file management
                  for every student, tourist, and family striving for overseas growth.
                </p>
                <div className="pt-1 flex items-center gap-2 text-xs text-[#0F172A] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#C29B38] shrink-0" />
                  <span>100% Free Initial Assessment</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Official Brand Identity & Accreditation Card */}
        <div className="mt-10 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center gap-8">
          <div className="p-6 bg-[#F8F9FA] rounded-2xl border border-slate-200/80 flex items-center justify-center shrink-0 w-full sm:w-auto">
            <AimsLogo variant="full" showTagline={true} className="w-56" />
          </div>
          <div className="space-y-3 text-left flex-1">
            <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#926B16]">
              Official Accreditation & Statutory Compliance
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-display">
              AIMS Consultancy: Education, Immigration & Travel
            </h3>
            <p className="text-xs sm:text-sm text-[#334155] leading-[1.65]">
              Operating under statutory compliance from our headquarters at Fatehgarh Chowk in Hoshiarpur, Punjab, our consultancy delivers direct consular precision, verified documentation, and attentive guidance for every applicant.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold text-[#0F172A] pt-1">
              <span className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0F172A] text-white">
                <CheckCircle2 className="w-4 h-4 text-[#DFB958] shrink-0" />
                <span>Licence: {COMPANY_DETAILS.licenceNo}</span>
              </span>
              <span className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F4F5F7] border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#C29B38] shrink-0" />
                <span>IRCC, UKVI & MEA Audits</span>
              </span>
              <span className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F4F5F7] border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#C29B38] shrink-0" />
                <span>Zero Advance Consultation Fees</span>
              </span>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Integrity */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#C29B38] shadow-xs hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F4F5F7] border border-slate-200 text-[#0F172A] flex items-center justify-center mb-3 group-hover:bg-[#0F172A] group-hover:text-[#DFB958] transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#0F172A]">
                  {v.title}
                </h4>
                <p className="text-xs text-[#334155] mt-1.5 leading-[1.6]">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Toggleable Ethical Pledges */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowPledges(!showPledges)}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0F172A] hover:text-[#926B16] bg-white px-5 py-2.5 rounded-xl border border-slate-300 shadow-xs cursor-pointer transition-colors"
          >
            <span>{showPledges ? 'Hide Consular Standards' : 'Read Our Consular Client Pledge'}</span>
            {showPledges ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showPledges && (
            <div className="mt-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-left max-w-3xl mx-auto space-y-3 animate-fadeIn text-xs text-[#334155] leading-relaxed">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#0F172A] text-[#DFB958] font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                <div><strong className="text-[#0F172A]">No Fake Promises:</strong> We will never offer fictitious job offers, counterfeit work permits, or "guaranteed stamps". We operate strictly within high commission statutory guidelines.</div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#0F172A] text-[#DFB958] font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                <div><strong className="text-[#0F172A]">Zero Hidden Retainers:</strong> We charge zero fees for preliminary advice and profile evaluation. Our contract terms and government filing expenses are provided in clear writing beforehand.</div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#0F172A] text-[#DFB958] font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                <div><strong className="text-[#0F172A]">Client Data Privacy:</strong> Your passports, financial disclosures, and academic transcripts are stored in confidential client records and never disclosed to third parties.</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
