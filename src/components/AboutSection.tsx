import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Target, 
  Eye, 
  Clock, 
  Users, 
  Award, 
  CheckCircle, 
  FileSpreadsheet, 
  ChevronDown, 
  ChevronUp, 
  Building, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/aimsData';

export const AboutSection: React.FC = () => {
  const [showPledges, setShowPledges] = useState(false);

  const values = [
    {
      icon: ShieldCheck,
      title: 'Expert Legal Guidance',
      description: 'Our consultants maintain direct compliance with IRCC, UKVI, Home Affairs, and MEA regulatory policies.',
    },
    {
      icon: FileSpreadsheet,
      title: 'Zero Hidden Fees',
      description: 'Absolute clarity regarding government consulate levies, VFS charges, and our affordable advisory packages.',
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
    <section id="about" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide uppercase">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>Who We Are & Our Heritage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
            Guiding Punjab’s Global Aspirations with Trust & Transparency
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Headquartered in Hoshiarpur, Punjab, <strong className="text-slate-900">AIMS Consultancy</strong> was established with a singular ethos: 
            to replace ambiguity and arbitrary rejections with rigorous consular document verification, 
            legal accuracy, and dependable client advocacy.
          </p>
        </div>

        {/* Visual Storytelling Showcase with Image */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Real Photo Spotlight */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-200 group shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80" 
              alt="Consultant verifying documents and student visa dossier" 
              className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-md text-slate-900">
              <div className="flex items-center gap-2 text-blue-700 text-xs font-bold">
                <Building className="w-4 h-4 text-blue-600" />
                <span>Court Road Headquarters • Hoshiarpur</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                Authorized private overseas consultancy providing dedicated travel solutions.
              </p>
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display">Our Vision</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  To stand as the absolute benchmark of ethical, authentic, and high-success immigration and travel consultancy in Punjab, 
                  empowering individuals, students, and families to cross international borders with complete confidence.
                </p>
                <div className="pt-1 flex items-center gap-2 text-[11px] text-blue-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>5,000+ Visas Successfully Processed</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display">Our Mission</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  To demystify foreign entry laws, eliminate hidden surcharges, and provide meticulous, individual file management 
                  for every student, tourist, and family striving for overseas growth.
                </p>
                <div className="pt-1 flex items-center gap-2 text-[11px] text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Free Initial Assessment</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Integrity */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div 
                key={i} 
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {v.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
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
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs cursor-pointer"
          >
            <span>{showPledges ? 'Hide Consular Standards' : 'Read Our 5-Point Consular Client Pledge'}</span>
            {showPledges ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showPledges && (
            <div className="mt-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-md text-left max-w-3xl mx-auto space-y-3 animate-fadeIn text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                <div><strong>No Fake Promises:</strong> We will never offer fictitious job offers, counterfeit work permits, or "guaranteed stamps". We operate strictly within high commission statutory guidelines.</div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                <div><strong>Zero Hidden Retainers:</strong> We charge zero fees for preliminary advice and profile evaluation. Our contract terms and any government filing expenses are provided in clear writing beforehand.</div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                <div><strong>Client Data Privacy:</strong> Your passports, financial disclosures, and academic transcripts are stored in encrypted client records and never disclosed to third parties.</div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
