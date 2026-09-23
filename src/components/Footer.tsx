import React, { useState, useEffect } from 'react';
import { Award, Phone, Mail, MapPin, Clock, ArrowUp, MessageCircle } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/aimsData';
import { AimsLogo } from './AimsLogo';
import { 
  getWhatsAppRoutingDetails, 
  getWhatsAppDeliveryUrl, 
  WhatsAppRoutingInfo 
} from '../utils/whatsappRouting';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenEligibility: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenEligibility }) => {
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
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <AimsLogo variant="horizontal" theme="dark" showTagline={true} className="h-11" />

            <p className="text-slate-400 leading-relaxed text-xs">
              Trusted travel and immigration advisory in Hoshiarpur, Punjab. Specializing in high-accuracy student permits, holiday tourist visas, express passport handling, and international flights.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white text-sm font-bold font-display uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Services Portfolio</a></li>
              <li><a href="#tracker" className="hover:text-blue-400 transition-colors">Application Tracker</a></li>
              <li><a href="#comparison" className="hover:text-blue-400 transition-colors">Country Comparison</a></li>
              <li><a href="#destinations" className="hover:text-blue-400 transition-colors">Destinations</a></li>
              <li><a href="#faq" className="hover:text-blue-400 transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white text-sm font-bold font-display uppercase tracking-wider">
              Popular Services
            </h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Canada SDS Student Visa</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">UK Graduate & Visitor Visa</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Australia Subclass 500</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Tatkal Passport Express</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Dubai 30/60 Days Tourist Visa</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Schengen 27-Nation Visa</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">International Air Ticketing</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white text-sm font-bold font-display uppercase tracking-wider">
              Office Details
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{COMPANY_DETAILS.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a 
                  href={`tel:${routing.isOpen ? COMPANY_DETAILS.phoneRaw : COMPANY_DETAILS.afterHoursPhoneRaw}`} 
                  title={`Call ${routing.deskLabel} (${routing.formattedNumber})`}
                  className="text-white hover:text-blue-400 font-semibold"
                >
                  {routing.isOpen ? COMPANY_DETAILS.phone : COMPANY_DETAILS.afterHoursPhone}
                </a>
                <span className="text-[10px] text-blue-400">({routing.deskLabel})</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href={getWhatsAppDeliveryUrl(
                    `Hello AIMS Consultancy, I would like to inquire about visa and travel services.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-semibold"
                >
                  WhatsApp: {routing.formattedNumber}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-slate-300 hover:text-blue-400">
                  {COMPANY_DETAILS.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-slate-300">{COMPANY_DETAILS.workingHours}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 cursor-pointer"
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
          <p>© {new Date().getFullYear()} AIMS Consultancy. All rights reserved.</p>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Disclaimer: AIMS Consultancy is an independent private consultancy firm registered in Punjab, India. We are not an official government embassy or high commission.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <button onClick={onOpenEligibility} className="hover:text-blue-400 cursor-pointer">
            Eligibility Tool
          </button>
          <span>•</span>
          <button onClick={scrollToTop} className="hover:text-blue-400 inline-flex items-center gap-1 cursor-pointer">
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Floating WhatsApp Action Button with dynamic time routing */}
      <a
        href={getWhatsAppDeliveryUrl(
          `Hello AIMS Consultancy, I would like to enquire about your visa and travel services.`
        )}
        target="_blank"
        rel="noopener noreferrer"
        title={`WhatsApp ${routing.deskLabel} (${routing.formattedNumber})`}
        aria-label="Contact AIMS Consultancy on WhatsApp"
        className="fixed bottom-6 left-6 z-40 p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center group border border-emerald-400/40 cursor-pointer"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="sr-only">Chat on WhatsApp ({routing.formattedNumber})</span>
      </a>

    </footer>
  );
};
