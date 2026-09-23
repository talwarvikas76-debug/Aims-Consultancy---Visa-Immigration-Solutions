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
  CheckCircle2
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
    <section id="about" className="py-16 sm:py-20 bg-[#060f0c] border-b border-emerald-950/80 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/50 text-emerald-300 text-xs font-bold tracking-wide uppercase">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Who We Are & Our Heritage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Guiding Punjab’s Global Aspirations with Trust & Transparency
          </h2>
          <p className="text-emerald-100/70 text-base leading-relaxed">
            Headquartered in Hoshiarpur, Punjab, <strong className="text-white">AIMS Consultancy</strong> was established with a singular ethos: 
            to replace ambiguity and arbitrary rejections with rigorous consular document verification, 
            legal accuracy, and dependable client advocacy.
          </p>
        </div>

        {/* Visual Storytelling Showcase with Image */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Real Photo Spotlight */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-emerald-900/60 group shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80" 
              alt="Consultant verifying documents and student visa dossier" 
              className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060f0c] via-transparent to-transparent opacity-90" />
            
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#091712]/90 border border-emerald-800/50 backdrop-blur-md">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold">
                <Building className="w-4 h-4 text-emerald-400" />
                <span>Court Road Headquarters • Hoshiarpur</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Authorized private overseas consultancy providing dedicated travel solutions.
              </p>
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#091b15] via-[#081712] to-[#07130e] border border-emerald-800/40 text-white shadow-xl relative overflow-hidden backdrop-blur-xl">
              <div className="relative z-10 space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-950/60">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white font-display">Our Vision</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  To stand as the absolute benchmark of ethical, authentic, and high-success immigration and travel consultancy in Punjab, 
                  empowering individuals, students, and families to cross international borders with complete confidence.
                </p>
                <div className="pt-1 flex items-center gap-2 text-[11px] text-emerald-300 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Benchmark of Trust Across Doaba</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#091712]/90 border border-emerald-950 text-slate-200 shadow-xl relative overflow-hidden backdrop-blur-xl">
              <div className="relative z-10 space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#0d261c] border border-emerald-800/60 text-emerald-400 flex items-center justify-center font-bold">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white font-display">Our Mission</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Delivering high-efficiency, legally compliant solutions tailored to each applicant’s unique financial and academic background. 
                  We eliminate false hopes through transparent file evaluation and thorough proofing.
                </p>
                <div className="pt-1 flex items-center gap-2 text-[11px] text-emerald-300 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Zero False Promises • Stringent File Screening</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden Information beneath the link: Ethical Code of Conduct */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowPledges(!showPledges)}
            id="toggle-ethical-pledges-btn"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#091712] hover:bg-[#0c221a] border border-emerald-800/50 text-xs font-semibold text-emerald-300 hover:text-emerald-200 transition-all cursor-pointer"
          >
            <span>✦ {showPledges ? 'Hide' : 'Read Our 4 Ethical Client Advocacy Pledges'}</span>
            {showPledges ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4 text-emerald-400" />}
          </button>

          {showPledges && (
            <div className="mt-4 p-5 rounded-2xl bg-[#091712]/95 border border-emerald-800/50 text-left max-w-4xl mx-auto shadow-2xl animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-200 block font-semibold">Zero Fraudulent Papers:</strong>
                    We strictly refuse fake work experience certificates, counterfeit bank proofs, or falsified diplomas.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-200 block font-semibold">Direct Fee Slips:</strong>
                    Clients receive official government receipts for all consular, VFS, and PSK passport payments.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-200 block font-semibold">Transparent Portal Access:</strong>
                    We lodge applications under your legal name, ensuring you have tracking references for IRCC/UKVI.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-200 block font-semibold">Refund Safeguards:</strong>
                    Clear written agreements outlining all terms before any file processing begins.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Why Choose Us - 4 Feature Pillars */}
        <div id="why-choose" className="mt-14 pt-12 border-t border-emerald-950/80">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white font-display">
              The Foundation of Our Client Relationships
            </h3>
            <p className="text-sm text-emerald-200/70 mt-1">
              Why students and families across Punjab choose AIMS Consultancy
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div 
                  key={idx}
                  className="bg-[#091712]/80 p-6 rounded-2xl border border-emerald-950/90 hover:border-emerald-700/60 hover:bg-[#0c1f18] shadow-lg hover:shadow-xl transition-all group backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/70 border border-emerald-800/50 text-emerald-400 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-emerald-600 group-hover:to-teal-700 group-hover:text-white transition-all mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {val.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
