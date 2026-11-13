import React from 'react';
import { X, ShieldCheck, Lock, FileText, Mail, Phone, MapPin } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/aimsData';
import { AimsLogo } from './AimsLogo';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/85 backdrop-blur-xs overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-policy-title"
    >
      <div className="relative w-full max-w-3xl bg-[#F8F9FA] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="bg-[#0F172A] text-white p-6 border-b border-slate-800 flex items-start justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl shrink-0">
              <AimsLogo variant="emblem" className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#DFB958] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Statutory Data Protection & Confidentiality</span>
              </div>
              <h2
                id="privacy-policy-title"
                className="text-xl sm:text-2xl font-extrabold tracking-tight font-display text-white mt-0.5"
              >
                Privacy Policy — AIMS Consultancy
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Effective Date: November 2026 • Punjab Govt. Licence No: {COMPANY_DETAILS.licenceNo}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Privacy Policy"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-[#334155] leading-[1.7] bg-white">
          <p>
            At <strong className="text-[#0F172A]">AIMS Consultancy</strong> (headquartered at{' '}
            <strong className="text-[#0F172A]">Fatehgarh Chowk, Hoshiarpur, Punjab - 146001</strong>), safeguarding the privacy, identity records, academic transcripts, and financial disclosures entrusted to us by students, families, and travellers is a core legal and ethical commitment. This Privacy Policy explains how we collect, process, store, and protect your personal information when you use our website, inquiry tools, WhatsApp support line, or in-office advisory services.
          </p>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#0F172A] font-display flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#926B16]" />
              <span>1. Information We Collect</span>
            </h3>
            <p>Depending on the visa, ticketing, passport, or tour service you request, we may collect:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-[#0F172A]">Contact & Identity Details:</strong> Full name, mobile/WhatsApp number, email address, residential address, date of birth, and passport bio-data provided through consultation bookings, quick callback inquiries, or office walk-ins.
              </li>
              <li>
                <strong className="text-[#0F172A]">Academic & Career Records:</strong> School/college marksheets, degree certificates, IELTS/PTE/TOEFL scorecards, Statement of Purpose (SOP) drafts, and employment history for student or skilled pathway evaluations.
              </li>
              <li>
                <strong className="text-[#0F172A]">Financial & Travel Documentation:</strong> Bank statements, ITRs, GIC/Blocked Account receipts, sponsorship affidavits, travel itineraries, and prior refusal letters voluntarily shared solely to prepare compliant embassy dossiers.
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#0F172A] font-display flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#926B16]" />
              <span>2. How We Use Your Information</span>
            </h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Evaluating eligibility for study permits, visitor visas, passport applications, and immigration pathways.</li>
              <li>Preparing, auditing, and lodging official applications with consular portals, universities, and ticketing/insurance partners upon your explicit instruction.</li>
              <li>Responding to your callback requests, sending consultation passes, and providing case status updates via telephone, email, or WhatsApp (<strong className="text-[#0F172A]">+91 95927 47000</strong>).</li>
              <li>Complying with applicable statutory record-keeping requirements under Government of Punjab overseas advisory regulations (Licence No. {COMPANY_DETAILS.licenceNo}).</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#0F172A] font-display">
              3. Strictly Limited Third-Party Disclosures
            </h3>
            <p>
              <strong className="text-[#0F172A]">We never sell, rent, or trade your personal data to marketers or unauthorized third parties.</strong> Your documents and personal details are shared strictly when necessary to fulfill your requested service—specifically with authorized embassies/consulates (such as IRCC, UKVI, VFS Global, BLS International, or MEA Passport Seva), partner universities, airlines, travel insurers, or RBI-authorized forex dealers—and only with your knowledge and consent.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#0F172A] font-display">
              4. Data Security, Confidentiality & Retention
            </h3>
            <p>
              Sensitive identity and financial files are handled with strict advisor confidentiality and restricted access. Physical and digital client dossiers are retained only for the duration required to complete your application, follow up on consular outcomes, or satisfy statutory obligations under Indian law (including the Digital Personal Data Protection Act, 2023). Note that interactive quick-assessment forms on this website run locally in your browser until you explicitly submit or forward your inquiry to our desk via WhatsApp or in-person consultation.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#0F172A] font-display">
              5. Your Rights & Contacting Our Data Grievance Desk
            </h3>
            <p>
              You may request access to, correction of, or deletion of your personal records held by AIMS Consultancy at any time (subject to mandatory regulatory retention requirements). To exercise these rights or ask privacy questions, please reach our Hoshiarpur office:
            </p>

            <div className="mt-3 p-4 rounded-xl bg-[#F4F5F7] border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#926B16] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0F172A] block">Office Address</span>
                  <span>Fatehgarh Chowk, Hoshiarpur, Punjab - 146001</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#926B16] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0F172A] block">Helpline / WhatsApp</span>
                  <span className="tabular-nums">{COMPANY_DETAILS.phone}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#926B16] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0F172A] block">Official Email</span>
                  <span>{COMPANY_DETAILS.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 sm:px-8 bg-[#F4F5F7] border-t border-slate-200 flex items-center justify-between gap-4 shrink-0">
          <span className="text-[11px] text-slate-500">
            AIMS Consultancy • Licence No: {COMPANY_DETAILS.licenceNo}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Close Policy
          </button>
        </div>
      </div>
    </div>
  );
};
