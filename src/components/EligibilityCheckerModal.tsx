import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Calendar,
} from 'lucide-react';
import { getWhatsAppDeliveryUrl } from '../utils/whatsappRouting';
import { AimsLogo } from './AimsLogo';

interface EligibilityCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToBooking: (prefill: { visaType: string; destination: string; education: string; notes: string }) => void;
  initialPrefill?: {
    destination?: string;
    visaType?: string;
    age?: string;
    experience?: string;
  };
}

export const EligibilityCheckerModal: React.FC<EligibilityCheckerModalProps> = ({
  isOpen,
  onClose,
  onProceedToBooking,
  initialPrefill,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [destination, setDestination] = useState(initialPrefill?.destination || 'Canada');
  const [visaType, setVisaType] = useState(initialPrefill?.visaType || 'Student');
  const [age, setAge] = useState(initialPrefill?.age || '23');
  const [experience, setExperience] = useState(initialPrefill?.experience || 'Fresh Graduate / Student');
  const [education, setEducation] = useState("Bachelor's Degree");
  const [englishScore, setEnglishScore] = useState('IELTS 6.5 / PTE 60+');
  const [fundsAvailable] = useState('15 - 25 Lakhs INR');
  const [hasRefusal] = useState('No');

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  useEffect(() => {
    if (initialPrefill) {
      if (initialPrefill.destination) setDestination(initialPrefill.destination);
      if (initialPrefill.visaType) setVisaType(initialPrefill.visaType);
      if (initialPrefill.age) setAge(initialPrefill.age);
      if (initialPrefill.experience) setExperience(initialPrefill.experience);
    }
  }, [initialPrefill]);

  if (!isOpen) return null;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const computeScore = () => {
    let score = 75;
    if (englishScore.includes('7.0') || englishScore.includes('6.5')) score += 12;
    if (englishScore.includes('No English')) score -= 15;
    if (education.includes('Master') || education.includes('Bachelor')) score += 8;
    if (fundsAvailable.includes('25') || fundsAvailable.includes('35')) score += 5;
    if (hasRefusal === 'Yes') score -= 8;
    return Math.min(Math.max(score, 55), 98);
  };

  const calculatedScore = computeScore();

  const handleSendWhatsAppReport = () => {
    const text = `Hello AIMS Consultancy, I completed the Visa Eligibility Quiz on your website:
• Name: ${clientName || 'Applicant'}
• Country: ${destination}
• Visa Category: ${visaType}
• Age: ${age}
• Experience: ${experience}
• Education: ${education}
• English Score: ${englishScore}
• Preliminary Score: ${calculatedScore}%
Please provide my customized visa roadmap and document checklist.`;

    window.open(getWhatsAppDeliveryUrl(text), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/80 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#F8F9FA] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Top Header */}
        <div className="relative bg-[#0F172A] text-white p-6 sm:p-7 overflow-hidden border-b border-slate-800">
          <button
            onClick={onClose}
            aria-label="Close Eligibility Quiz"
            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 max-w-md">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="p-1.5 bg-white rounded-xl shadow-xs">
                <AimsLogo variant="emblem" className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-1.5 text-[#DFB958] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AIMS Consultancy • Eligibility Assessor</span>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight font-display text-white">
              Visa Eligibility Quiz
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              Assess your eligibility, explore consular options, and receive personalized guidance today.
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 bg-white">
          {step === 1 && (
            <form onSubmit={handleCalculate} className="space-y-4">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 text-xs">
                <span className="font-bold text-[#0F172A] flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#0F172A] text-[#DFB958] flex items-center justify-center text-[10px]">
                    1
                  </span>
                  <span>Step 1 of 2: Profile Selection</span>
                </span>
                <span className="text-[11px] font-bold text-[#926B16]">Takes 20 Seconds</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Target Country</label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-slate-300 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#0F172A] font-semibold focus:ring-2 focus:ring-[#C29B38] focus:bg-white cursor-pointer"
                  >
                    <option value="Canada">🇨🇦 Canada</option>
                    <option value="United Kingdom">🇬🇧 United Kingdom</option>
                    <option value="Australia">🇦🇺 Australia</option>
                    <option value="USA">🇺🇸 United States</option>
                    <option value="Schengen Europe">🇪🇺 Schengen Europe (Germany/France)</option>
                    <option value="Dubai">🇦🇪 Dubai & UAE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Desired Pathway</label>
                  <select
                    value={visaType}
                    onChange={(e) => setVisaType(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-slate-300 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#0F172A] font-semibold focus:ring-2 focus:ring-[#C29B38] focus:bg-white cursor-pointer"
                  >
                    <option value="Student">Student Study Permit</option>
                    <option value="Skilled Worker">Skilled Worker / Work Permit</option>
                    <option value="PR">Permanent Residency (PR / Express Entry)</option>
                    <option value="Tourist">Tourist / Visitor Visa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Highest Education</label>
                  <select
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-slate-300 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#0F172A] font-medium focus:ring-2 focus:ring-[#C29B38] focus:bg-white cursor-pointer"
                  >
                    <option value="Senior Secondary (12th)">Senior Secondary (12th Grade)</option>
                    <option value="Diploma / Polytechnic">3-Year Diploma / Polytechnic</option>
                    <option value="Bachelor's Degree">Bachelor's Degree (Graduate)</option>
                    <option value="Master's Degree">Master's Degree (Post-Graduate)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">English / Test Level</label>
                  <select
                    value={englishScore}
                    onChange={(e) => setEnglishScore(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-slate-300 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#0F172A] font-medium focus:ring-2 focus:ring-[#C29B38] focus:bg-white cursor-pointer"
                  >
                    <option value="IELTS 7.0+ / PTE 68+">IELTS 7.0+ / PTE 68+ (Superior)</option>
                    <option value="IELTS 6.5 / PTE 60+">IELTS 6.5 / PTE 60+ (Competent)</option>
                    <option value="IELTS 6.0 / PTE 54+">IELTS 6.0 / PTE 54+ (Modest)</option>
                    <option value="No English Test Yet">No English Test Yet / Planning to Take</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C29B38] hover:bg-[#B38D2D] text-[#0F172A] font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Evaluate My Profile Score (Instant & Free)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-[#0F172A] text-white border border-slate-800 rounded-2xl p-5 text-center">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                  <AimsLogo variant="badge" />
                  <span className="text-[10px] font-bold text-[#DFB958] uppercase tracking-widest">
                    Preliminary Dossier Audit
                  </span>
                </div>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white border-4 border-[#C29B38] mx-auto mb-3">
                  <span className="text-2xl font-black text-[#0F172A] font-display tabular-nums">
                    {calculatedScore}%
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">
                  {calculatedScore >= 85 ? 'High Viability Profile' : 'Moderate Viability Profile'}
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
                  Based on your qualifications ({education}) and {destination} requirements, you meet the preliminary threshold for consular submission.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#F4F5F7] border border-slate-200 rounded-xl">
                  <div className="font-bold text-[#0F172A] flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-[#C29B38]" />
                    <span>Eligible Streams in {destination}</span>
                  </div>
                  <p className="text-[#334155]">
                    {visaType === 'Student'
                      ? 'Direct SDS / University admissions with post-study work authorization.'
                      : 'Direct skilled stream & family sponsorship eligibility.'}
                  </p>
                </div>

                <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl">
                  <div className="font-bold text-[#926B16] flex items-center gap-1.5 mb-1">
                    <AlertCircle className="w-4 h-4 text-[#C29B38]" />
                    <span>Action Required</span>
                  </div>
                  <p className="text-[#334155]">
                    {hasRefusal === 'Yes'
                      ? 'Order CAIPS/GCMS notes to satisfy prior rejection rationale.'
                      : 'Ensure 6-month verifiable source of funds before embassy filing.'}
                  </p>
                </div>
              </div>

              <div className="bg-[#F4F5F7] border border-slate-200 rounded-xl p-4">
                <h5 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2.5">
                  Receive Detailed Consular Roadmap & Checklist
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-[#0F172A] font-medium focus:ring-2 focus:ring-[#C29B38]"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile / WhatsApp"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-[#0F172A] font-medium focus:ring-2 focus:ring-[#C29B38]"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-[#0F172A] font-medium focus:ring-2 focus:ring-[#C29B38]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={handleSendWhatsAppReport}
                    className="py-2.5 px-3 bg-[#C29B38] hover:bg-[#B38D2D] text-[#0F172A] font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Get Roadmap on WhatsApp</span>
                  </button>

                  <button
                    onClick={() => {
                      onProceedToBooking({
                        visaType,
                        destination,
                        education,
                        notes: `Preliminary Score: ${calculatedScore}%. Age: ${age}, Experience: ${experience}`,
                      });
                      onClose();
                    }}
                    className="py-2.5 px-3 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#DFB958]" />
                    <span>Book Free Consultation Slot</span>
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#0F172A] hover:text-[#926B16] font-semibold cursor-pointer"
                >
                  ← Edit Assessment Details
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-slate-500 hover:text-[#0F172A] cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
