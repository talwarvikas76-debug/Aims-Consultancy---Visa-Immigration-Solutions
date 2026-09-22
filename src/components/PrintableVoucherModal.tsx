import React from 'react';
import { X, Printer, Award, CheckCircle2, MapPin, Phone, Mail } from 'lucide-react';
import { BookingFormData } from '../types';
import { COMPANY_DETAILS } from '../data/aimsData';
import { AimsLogo } from './AimsLogo';

interface PrintableVoucherModalProps {
  bookingData: BookingFormData | null;
  onClose: () => void;
}

export const PrintableVoucherModal: React.FC<PrintableVoucherModalProps> = ({
  bookingData,
  onClose,
}) => {
  if (!bookingData) return null;

  const handlePrint = () => {
    window.print();
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(
    `AIMS CONSULTANCY PASS | Ref: ${bookingData.bookingRef} | ${bookingData.fullName} | ${bookingData.date} ${bookingData.timeSlot}`
  )}&margin=4`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-emerald-900/40">
        
        {/* Top Control Bar */}
        <div className="p-4 bg-[#06110d] text-white flex items-center justify-between border-b border-emerald-950 print:hidden rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              Consultation Confirmation Pass
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-950/80"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Pass Body */}
        <div className="p-8 space-y-6 text-slate-900" id="printable-voucher-content">
          
          {/* Letterhead */}
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-5">
            <div>
              <AimsLogo variant="horizontal" theme="light" showTagline={true} className="h-12" />
              <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mt-1.5">
                {COMPANY_DETAILS.isoCertification}
              </p>
              <p className="text-[11px] text-slate-500">
                {COMPANY_DETAILS.address} • Email: {COMPANY_DETAILS.email}
              </p>
            </div>

            <div className="text-right">
              <span className="inline-block px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider border border-emerald-300">
                Verified Booking
              </span>
              <div className="text-sm font-black font-mono text-slate-900 mt-1">
                Ref: {bookingData.bookingRef}
              </div>
              <div className="text-[10px] text-slate-500">
                Issued: {bookingData.bookedAt || 'Confirmed'}
              </div>
            </div>
          </div>

          {/* Details & QR Code Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-emerald-50/50 p-5 rounded-xl border border-emerald-200">
            <div className="sm:col-span-8 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[11px] text-slate-500 block">Applicant Name</span>
                  <strong className="text-sm text-slate-900">{bookingData.fullName}</strong>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Contact Mobile</span>
                  <strong className="text-sm text-slate-900">{bookingData.mobile}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-200/80">
                <div>
                  <span className="text-[11px] text-slate-500 block">Visa Stream</span>
                  <span className="font-semibold text-slate-800">{bookingData.visaType}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Target Destination</span>
                  <span className="font-semibold text-emerald-800">{bookingData.destination}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-200/80">
                <div>
                  <span className="text-[11px] text-slate-500 block">Appointment Date</span>
                  <strong className="text-slate-900">{bookingData.date}</strong>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Time Slot</span>
                  <strong className="text-emerald-700">{bookingData.timeSlot}</strong>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-200/80">
                <span className="text-[10px] text-slate-600">
                  Consultation Charges: <strong className="text-emerald-700">100% Free (₹0.00 Complimentary Advisory)</strong> • Session: <strong>In-Person / Virtual Advisory</strong>
                </span>
              </div>
            </div>

            <div className="sm:col-span-4 flex flex-col items-center justify-center border-t sm:border-t-0 sm:border-l border-emerald-200 pt-4 sm:pt-0 sm:pl-4">
              <img 
                src={qrCodeUrl} 
                alt="Appointment Verification QR" 
                className="w-28 h-28 border border-slate-300 rounded-lg p-1 bg-white"
              />
              <span className="text-[10px] text-slate-500 text-center mt-1">
                Scan for Office Entry
              </span>
            </div>
          </div>

          {/* Checklist on the day of consultation */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Documents to Carry for Consultation:
            </h4>
            <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
              <li>Original Passport or clean photocopies of the first and last page</li>
              <li>Academic Certificates & Transcripts (10th, 12th, Degree, Diploma)</li>
              <li>IELTS / PTE / Duolingo score report (if appeared or available)</li>
              <li>Bank statements or financial summary (last 6 months) if seeking financial evaluation</li>
              <li>Any previous visa refusal letters / GCMS notes (if applicable)</li>
            </ul>
          </div>

          {/* Footer note */}
          <div className="border-t border-slate-200 pt-4 text-center text-[11px] text-slate-500">
            <p>
              For rescheduling or urgent queries: Working hours WhatsApp/Phone <strong>91933-19128</strong> • After-hours <strong>95927-47000</strong>.
            </p>
            <p className="mt-0.5">
              AIMS Consultancy • Hoshiarpur, Punjab 146001 • Mon-Sat 9:00 AM - 6:00 PM
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
