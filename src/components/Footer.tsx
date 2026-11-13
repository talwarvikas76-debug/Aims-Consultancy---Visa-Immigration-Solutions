import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowUp, MessageCircle, ShieldCheck } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/aimsData';
import { AimsLogo } from './AimsLogo';
import {
  getWhatsAppRoutingDetails,
  getWhatsAppDeliveryUrl,
  WhatsAppRoutingInfo,
} from '../utils/whatsappRouting';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenEligibility: () => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenEligibility,
  onOpenPrivacy,
}) => {
  const [routing, setRouting] = useState<WhatsAppRoutingInfo>(getWhatsAppRoutingDetails());

  useEffect(() => {
    setRouting(getWhatsAppRoutingDetails());
    const interval = setInterval(() => {
      setRouting(getWhatsAppRoutingDetails());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F172A] text-slate-300 text-xs border-t border-slate-800 pb-16 md:pb-0">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <AimsLogo variant="horizontal" theme="dark" showTagline={true} className="h-11" />

            <p className="text-slate-400 leading-[1.65] text-xs">
              Trusted travel and immigration advisory in Hoshiarpur, Punjab. Specializing in high-accuracy student permits, holiday tourist visas, express passport handling, and international flights.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[#DFB958] text-xs font-bold font-display uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-[#DFB958] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#DFB958] transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-[#DFB958] transition-colors">Services Portfolio</a></li>
              <li><a href="#tracker" className="hover:text-[#DFB958] transition-colors">Application Tracker</a></li>
              <li><a href="#comparison" className="hover:text-[#DFB958] transition-colors">Country Comparison</a></li>
              <li><a href="#destinations" className="hover:text-[#DFB958] transition-colors">Destinations</a></li>
              <li><a href="#faq" className="hover:text-[#DFB958] transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-[#DFB958] transition-colors">Contact Us</a></li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:text-[#DFB958] transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[#DFB958] text-xs font-bold font-display uppercase tracking-wider">
              Popular Services
            </h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-[#DFB958] transition-colors">Canada SDS Student Visa</a></li>
              <li><a href="#services" className="hover:text-[#DFB958] transition-colors">UK Graduate & Visitor Visa</a></li>
              <li><a href="#services" className="hover:text-[#DFB958] transition-colors">Australia Subclass 500</a></li>
              <li><a href="#services" className="hover:text-[#DFB958] transition-colors">Tatkal Passport Express</a></li>
              <li><a href="#services" className="hover:text-[#DFB958] transition-colors">Dubai 30/60 Days Tourist Visa</a></li>
              <li><a href="#services" className="hover:text-[#DFB958] transition-colors">Schengen 27-Nation Visa</a></li>
              <li><a href="#services" className="hover:text-[#DFB958] transition-colors">International Air Ticketing</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[#DFB958] text-xs font-bold font-display uppercase tracking-wider">
              Office Details
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#DFB958] shrink-0 mt-0.5" />
                <span className="text-slate-300">{COMPANY_DETAILS.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#DFB958] shrink-0" />
                <a
                  href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                  className="text-white hover:text-[#DFB958] font-semibold tabular-nums"
                >
                  {COMPANY_DETAILS.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#DFB958] shrink-0" />
                <a
                  href={getWhatsAppDeliveryUrl(
                    'Hello AIMS Consultancy, I would like to inquire about visa and travel services.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#DFB958] hover:underline font-semibold"
                >
                  WhatsApp: {routing.formattedNumber}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#DFB958] shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-slate-300 hover:text-[#DFB958]">
                  {COMPANY_DETAILS.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#DFB958] shrink-0" />
                <span className="text-slate-300">{COMPANY_DETAILS.workingHours}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 px-4 bg-[#C29B38] hover:bg-[#B38D2D] text-[#0F172A] font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Free Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
        <div>
          <div className="flex items-center gap-2">
            <AimsLogo variant="emblem" className="w-4 h-4 opacity-90" />
            <p className="text-white text-xs font-semibold">
              © {new Date().getFullYear()} AIMS Consultancy. All rights reserved.
            </p>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
            <span className="px-2.5 py-1 rounded bg-[#1E293B] text-[#DFB958] font-bold border border-slate-700 inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Punjab Govt. Approved Overseas Advisory • Licence No: {COMPANY_DETAILS.licenceNo}</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">HQ: Fatehgarh Chowk, Hoshiarpur, Punjab - 146001</span>
          </div>

          <p className="text-[10px] text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Statutory Disclaimer: AIMS Consultancy is an authorized private travel, ticketing, and overseas education advisory registered under Punjab State travel regulations. We provide professional documentation facilitation and are not a foreign high commission or embassy.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="hover:text-[#DFB958] transition-colors font-semibold text-slate-200 cursor-pointer"
          >
            Privacy Policy
          </button>
          <span>•</span>
          <button onClick={onOpenEligibility} className="hover:text-[#DFB958] cursor-pointer">
            Eligibility Tool
          </button>
          <span>•</span>
          <button onClick={scrollToTop} className="hover:text-[#DFB958] inline-flex items-center gap-1 cursor-pointer">
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
