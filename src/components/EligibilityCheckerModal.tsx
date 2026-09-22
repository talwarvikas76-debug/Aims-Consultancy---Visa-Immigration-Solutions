import React, { useState } from 'react';
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
  Award
} from 'lucide-react';

interface EligibilityCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToBooking: (prefill: { visaType: string; destination: string; education: string; notes: string }) => void;
}

export const EligibilityCheckerModal: React.FC<EligibilityCheckerModalProps> = ({
  isOpen,
  onClose,
  onProceedToBooking,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [destination, setDestination] = useState('Canada');
  const [visaType, setVisaType] = useState('Student Visa (Study Permit)');
  const [education, setEducation] = useState("Bachelor's Degree");
  const [englishScore, setEnglishScore] = useState('IELTS 6.5 / PTE 60+');
  const [fundsAvailable, setFundsAvailable] = useState('15 - 25 Lakhs INR');
  const [hasPreviousRefusal, setHasPreviousRefusal] = useState('No');
  const [showConsularTips, setShowConsularTips] = useState(false);

  if (!isOpen) return null;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const getAssessment = () => {
    if (visaType.includes('Student')) {
      if (englishScore === 'No English Test Yet') {
        return {
          status: 'Moderate Feasibility (English Test Required)',
          color: 'text-amber-400',
          bg: 'bg-amber-950/40 border-amber-800/60',
          summary: 'Your profile has strong potential, but most institutions in ' + destination + ' require IELTS or PTE scores for direct admission and visa approval.',
          checklist: [
            'Appear for IELTS Academic (Aim for 6.0+ minimum) or PTE Academic',
            'Gather 10th, 12th & Degree Marksheets + Transcripts',
            'Maintain recent 6-month bank statements with verifiable source of funds',
            'Draft a tailored Statement of Purpose (SOP) explaining career motivation',
          ],
          recommendation: 'Book a free consultation with our senior advisors to explore English waiver options and university shortlisting.',
        };
      }
      return {
        status: 'High Feasibility (Estimated 94% Approval Viability)',
        color: 'text-emerald-400',
        bg: 'bg-emerald-950/40 border-emerald-800/60',
        summary: 'Excellent academic background and language proficiency. You are well-positioned for the SDS stream (Canada) or CAS issuance (UK).',
        checklist: [
          'Official Degree Transcripts & Degree Certificate',
          'Valid Passport (with at least 18+ months validity)',
          'Bank Statements & IT Returns (Father/Mother/Self sponsorship)',
          'GIC Account setup (for Canada) or CAS Letter (for UK)',
        ],
        recommendation: 'Ready for priority university admissions and visa filing roadmap.',
      };
    }

    if (visaType.includes('Tourist')) {
      return {
        status: 'Strong Tourist / Visitor Feasibility',
        color: 'text-emerald-400',
        bg: 'bg-emerald-950/40 border-emerald-800/60',
        summary: 'Tourist visas for ' + destination + ' are heavily evaluated on verifiable home-country ties, employment stability, and genuine travel intent.',
        checklist: [
          '6 Months Bank Statements with consistent closing balance',
          'Employment Letter / Leave Sanction OR Business Registration (GST/Udyam)',
          'Income Tax Returns (ITR - Last 2 to 3 Years)',
          'Day-wise curated travel itinerary and confirmed hotel vouchers',
        ],
        recommendation: 'We draft persuasive cover letters detailing your itinerary and financial solvency.',
      };
    }

    return {
      status: 'Custom Profile Assessment Needed',
      color: 'text-emerald-300',
      bg: 'bg-emerald-950/40 border-emerald-800/60',
      summary: 'Your selected visa category requires individualized document evaluation and verification.',
      checklist: [
        'Updated CV / Resume detailing complete employment history',
        'Valid Passport and National Identity Proofs',
        'Sponsorship / Invitation / Employment confirmation if applicable',
      ],
      recommendation: 'Schedule a direct 1-on-1 session with our senior advisor in Hoshiarpur.',
    };
  };

  const assessment = getAssessment();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#091712] rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-emerald-950/90 text-slate-200">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-emerald-950 flex items-center justify-between bg-[#06110d] text-white rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-950/60">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                Visa Eligibility & Requirements Estimator
              </h3>
              <p className="text-xs text-emerald-200/70">
                Instant pre-evaluation powered by consular rules
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#0c221a] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {step === 1 ? (
            <form onSubmit={handleCalculate} className="space-y-4">
              <p className="text-xs text-emerald-200/70">
                Answer a few quick questions to receive a preliminary viability score and checklist for your dream destination:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Target Destination *
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#06110d] border border-emerald-900/80 rounded-lg text-white focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Canada">Canada 🇨🇦</option>
                    <option value="United Kingdom">United Kingdom 🇬🇧</option>
                    <option value="Australia">Australia 🇦🇺</option>
                    <option value="Dubai, UAE">Dubai, UAE 🇦🇪</option>
                    <option value="Europe (Schengen)">Europe (Schengen) 🇪🇺</option>
                    <option value="United States">United States 🇺🇸</option>
                    <option value="Singapore">Singapore 🇸🇬</option>
                    <option value="Thailand">Thailand 🇹🇭</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Visa Category *
                  </label>
                  <select
                    value={visaType}
                    onChange={(e) => setVisaType(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#06110d] border border-emerald-900/80 rounded-lg text-white focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Student Visa (Study Permit)">Student Visa (Study Permit)</option>
                    <option value="Tourist Visa (Leisure/Travel)">Tourist Visa (Leisure/Travel)</option>
                    <option value="Business Visa">Business Visa</option>
                    <option value="Family Visit / Super Visa">Family Visit / Super Visa</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Highest Education Completed *
                  </label>
                  <select
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#06110d] border border-emerald-900/80 rounded-lg text-white focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="12th Standard / High School">12th Standard / High School</option>
                    <option value="Polytechnic / Diploma">Polytechnic / Diploma</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="Non-Academic / Business Profile">Non-Academic / Business Profile</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    English Language Score *
                  </label>
                  <select
                    value={englishScore}
                    onChange={(e) => setEnglishScore(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#06110d] border border-emerald-900/80 rounded-lg text-white focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="IELTS 6.5 / PTE 60+">IELTS 6.5+ or PTE 60+</option>
                    <option value="IELTS 6.0 / PTE 50-59">IELTS 6.0 or PTE 50-59</option>
                    <option value="IELTS 5.5">IELTS 5.5</option>
                    <option value="Duolingo 110+">Duolingo 110+</option>
                    <option value="No English Test Yet">No English Test Yet / Planning</option>
                    <option value="Not Applicable (Tourist/Business)">Not Applicable (Tourist/Business)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Funds Available for Travel/Study *
                  </label>
                  <select
                    value={fundsAvailable}
                    onChange={(e) => setFundsAvailable(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#06110d] border border-emerald-900/80 rounded-lg text-white focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="5 - 10 Lakhs INR">5 - 10 Lakhs INR</option>
                    <option value="10 - 20 Lakhs INR">10 - 20 Lakhs INR</option>
                    <option value="20 - 35 Lakhs INR">20 - 35 Lakhs INR</option>
                    <option value="35 Lakhs+ INR">35 Lakhs+ INR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Any Prior Visa Refusals? *
                  </label>
                  <select
                    value={hasPreviousRefusal}
                    onChange={(e) => setHasPreviousRefusal(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#06110d] border border-emerald-900/80 rounded-lg text-white focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="No">No, First-time Applicant</option>
                    <option value="Yes - Canada">Yes, Canada Refusal</option>
                    <option value="Yes - UK">Yes, UK Refusal</option>
                    <option value="Yes - USA/Australia">Yes, USA or Australia</option>
                    <option value="Yes - Schengen">Yes, Schengen Refusal</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/80 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Calculate Eligibility & View Checklist</span>
              </button>
            </form>
          ) : (
            <div className="space-y-5 animate-fadeIn">
              {/* Assessment Card */}
              <div className={`p-4 rounded-xl border ${assessment.bg}`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-5 h-5 ${assessment.color}`} />
                  <span className={`text-sm font-bold ${assessment.color}`}>
                    {assessment.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {assessment.summary}
                </p>
              </div>

              {/* Checklist */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Key Documents Required for {destination}:</span>
                </h4>
                <div className="space-y-1.5 bg-[#06110d] p-3.5 rounded-xl border border-emerald-900/80">
                  {assessment.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="w-4 h-4 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Collapsible Consular Verification Rules */}
              <div className="border border-emerald-900/60 rounded-xl bg-[#06110d] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowConsularTips(!showConsularTips)}
                  className="w-full p-3 text-left flex items-center justify-between text-xs font-semibold text-emerald-300 hover:text-emerald-200 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span>✦ {showConsularTips ? 'Hide Consular Verification Rules' : 'View Consular Verification & SOP Rules'}</span>
                  </span>
                  {showConsularTips ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showConsularTips && (
                  <div className="p-3.5 border-t border-emerald-950 bg-[#040907] text-xs text-slate-300 space-y-2 animate-fadeIn">
                    <p>• <strong>Strict Fund Seasoning:</strong> Bank deposits should reflect genuine savings or liquid assets held for at least 28 to 90 days depending on the country guidelines.</p>
                    <p>• <strong>Course Progression:</strong> The selected degree/diploma must logically advance from your previous academic background or work experience.</p>
                    <p>• <strong>Zero Document Forgery Policy:</strong> All educational credentials and tax records undergo direct verification with issuing authorities.</p>
                  </div>
                )}
              </div>

              {/* Previous refusal note */}
              {hasPreviousRefusal !== 'No' && (
                <div className="p-3 bg-amber-950/50 border border-amber-800/80 rounded-lg text-xs text-amber-300 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Prior Refusal Detected:</strong> We recommend requesting your GCMS / consular refusal notes so our experts can redress the exact refusal grounds before re-applying.
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onProceedToBooking({
                      visaType,
                      destination,
                      education,
                      notes: `Self-assessed with eligibility tool: ${englishScore}, Funds: ${fundsAvailable}, Refusal: ${hasPreviousRefusal}`,
                    });
                  }}
                  className="w-full sm:flex-1 py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/80 cursor-pointer"
                >
                  <span>Book Free Consultation with this Profile</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                <button
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto py-3 px-4 bg-[#06110d] hover:bg-[#0c221a] text-slate-200 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-emerald-900/60"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Re-calculate</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
