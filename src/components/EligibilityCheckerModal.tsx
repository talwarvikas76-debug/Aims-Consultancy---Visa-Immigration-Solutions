import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles,
  RefreshCw,
  FileText,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Calendar,
  Send,
  User,
  Phone,
  Mail,
  GraduationCap,
  Briefcase,
  Plane,
  Compass
} from 'lucide-react';
import { getWhatsAppDeliveryUrl } from '../utils/whatsappRouting';

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
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [destination, setDestination] = useState(initialPrefill?.destination || 'Canada');
  const [visaType, setVisaType] = useState(initialPrefill?.visaType || 'Student');
  const [age, setAge] = useState(initialPrefill?.age || '23');
  const [experience, setExperience] = useState(initialPrefill?.experience || 'Fresh Graduate / Student');
  const [education, setEducation] = useState("Bachelor's Degree");
  const [englishScore, setEnglishScore] = useState('IELTS 6.5 / PTE 60+');
  const [fundsAvailable, setFundsAvailable] = useState('15 - 25 Lakhs INR');
  const [hasRefusal, setHasRefusal] = useState('No');
  
  // Lead Capture state
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [leadCaptured, setLeadCaptured] = useState(false);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Top Graphic Header matching image.png "Visa Eligibility Quiz" */}
        <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 text-white p-6 sm:p-7 overflow-hidden">
          {/* Subtle Background City Skyline Tracing */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-full h-full object-cover">
              <rect x="20" y="60" width="30" height="140" fill="white" />
              <rect x="60" y="30" width="40" height="170" fill="white" />
              <rect x="110" y="80" width="25" height="120" fill="white" />
              <rect x="145" y="45" width="35" height="155" fill="white" />
            </svg>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 max-w-md">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              <span>Multi-Step Interactive Assessor</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight font-display">
              Visa Eligibility Quiz
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 leading-relaxed">
              Simplify your immigration journey with AIMS. Assess your eligibility, explore options, and get personalized guidance today.
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          
          {/* STEP 1: Assessment Form */}
          {step === 1 && (
            <form onSubmit={handleCalculate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Destination */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Target Country
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-slate-800 font-semibold focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
                  >
                    <option value="Canada">🇨🇦 Canada</option>
                    <option value="United Kingdom">🇬🇧 United Kingdom</option>
                    <option value="Australia">🇦🇺 Australia</option>
                    <option value="USA">🇺🇸 United States</option>
                    <option value="Schengen Europe">🇪🇺 Schengen Europe (Germany/France)</option>
                    <option value="Dubai">🇦🇪 Dubai & UAE</option>
                  </select>
                </div>

                {/* Visa Pathway */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Desired Pathway
                  </label>
                  <select
                    value={visaType}
                    onChange={(e) => setVisaType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-slate-800 font-semibold focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
                  >
                    <option value="Student">Student Study Permit</option>
                    <option value="Skilled Worker">Skilled Worker / Work Permit</option>
                    <option value="PR">Permanent Residency (PR / Express Entry)</option>
                    <option value="Tourist">Tourist / Visitor Visa</option>
                  </select>
                </div>

                {/* Age */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Applicant Age
                  </label>
                  <input
                    type="number"
                    min="16"
                    max="75"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Work Experience
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
                  >
                    <option value="Fresh Graduate / Student">Fresh Graduate / Student</option>
                    <option value="1 - 2 Years">1 - 2 Years</option>
                    <option value="3 - 5 Years">3 - 5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                    <option value="Not Applicable">Not Applicable</option>
                  </select>
                </div>

                {/* Highest Education */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Highest Qualification
                  </label>
                  <select
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
                  >
                    <option value="Senior Secondary (12th)">Senior Secondary (12th Grade)</option>
                    <option value="Diploma / Polytechnic">3-Year Diploma / Polytechnic</option>
                    <option value="Bachelor's Degree">Bachelor's Degree (Graduate)</option>
                    <option value="Master's Degree">Master's Degree (Post-Graduate)</option>
                  </select>
                </div>

                {/* Language Proficiency */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    English Test Score
                  </label>
                  <select
                    value={englishScore}
                    onChange={(e) => setEnglishScore(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
                  >
                    <option value="IELTS 7.0+ / PTE 68+">IELTS 7.0+ / PTE 68+ (Superior)</option>
                    <option value="IELTS 6.5 / PTE 60+">IELTS 6.5 / PTE 60+ (Competent)</option>
                    <option value="IELTS 6.0 / PTE 54+">IELTS 6.0 / PTE 54+ (Modest)</option>
                    <option value="No English Test Yet">No English Test Yet / Planning to Take</option>
                  </select>
                </div>

                {/* Funds */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Available Financial Proof
                  </label>
                  <select
                    value={fundsAvailable}
                    onChange={(e) => setFundsAvailable(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
                  >
                    <option value="15 - 25 Lakhs INR">15 - 25 Lakhs INR (Standard GIC/Living)</option>
                    <option value="25 - 40 Lakhs INR">25 - 40 Lakhs INR (High Solvency)</option>
                    <option value="Under 15 Lakhs INR">Under 15 Lakhs INR</option>
                  </select>
                </div>

                {/* Previous Refusal */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Any Prior Visa Rejection?
                  </label>
                  <select
                    value={hasRefusal}
                    onChange={(e) => setHasRefusal(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
                  >
                    <option value="No">No (Clean History)</option>
                    <option value="Yes">Yes (Overturn Assistance Needed)</option>
                  </select>
                </div>

              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-lg shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Compute My Eligibility Score</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Instant Results & Instant Lead Capture */}
          {step === 2 && (
            <div className="space-y-6">
              
              {/* Score Display Card */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md border-4 border-blue-500 mx-auto mb-3">
                  <span className="text-2xl font-black text-blue-700 font-display">
                    {calculatedScore}%
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  {calculatedScore >= 85 ? 'High Viability Profile' : 'Moderate Viability Profile'}
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                  Based on your age ({age}), qualifications ({education}), and {destination} requirements, you meet preliminary threshold for consular submission.
                </p>
              </div>

              {/* Key Strengths & Critical Criteria */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="font-bold text-emerald-800 flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Eligible Streams in {destination}</span>
                  </div>
                  <p className="text-emerald-700">
                    {visaType === 'Student' ? 'Direct SDS / University admissions with post-study work authorization.' : 'Direct skilled stream & family sponsorship eligibility.'}
                  </p>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="font-bold text-amber-800 flex items-center gap-1.5 mb-1">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Action Required</span>
                  </div>
                  <p className="text-amber-700">
                    {hasRefusal === 'Yes' ? 'Order CAIPS/GCMS notes to satisfy prior rejection rationale.' : 'Ensure 6-month verifiable source of funds before embassy filing.'}
                  </p>
                </div>
              </div>

              {/* Lead Capture Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Receive Detailed Consular Roadmap & Checklist
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile / WhatsApp"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={handleSendWhatsAppReport}
                    className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Get Detailed Roadmap on WhatsApp</span>
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
                    className="py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Free Consultation Slot</span>
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
                >
                  ← Edit Assessment Details
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
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
