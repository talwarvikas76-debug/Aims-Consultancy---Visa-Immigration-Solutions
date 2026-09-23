import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ExternalLink, 
  ShieldCheck, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  Car 
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/aimsData';
import { 
  getWhatsAppRoutingDetails, 
  getWhatsAppDeliveryUrl, 
  WhatsAppRoutingInfo 
} from '../utils/whatsappRouting';
import { AimsLogo } from './AimsLogo';

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService || 'Visa Advisory',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [routing, setRouting] = useState<WhatsAppRoutingInfo>(getWhatsAppRoutingDetails());
  const [showLandmarks, setShowLandmarks] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  // Keep routing refreshed against live IST clock
  useEffect(() => {
    setRouting(getWhatsAppRoutingDetails());
    const interval = setInterval(() => {
      setRouting(getWhatsAppRoutingDetails());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white border-b border-slate-200 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-red-200/90 text-slate-800 text-xs font-bold tracking-wide shadow-xs">
            <AimsLogo variant="emblem" className="w-4 h-4" />
            <span>Connect with Our Advisory Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
            Get in Touch with AIMS Consultancy
          </h2>
          <p className="text-slate-600 text-base">
            Drop by our main office in Hoshiarpur, Punjab, call our helpline, or send a quick inquiry message below for immediate advisory support.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Office Details & Status */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Status Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 shadow-md">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <AimsLogo variant="emblem" className="w-6 h-6" />
                  <h3 className="text-base font-bold font-display text-slate-900">
                    Head Office Hoshiarpur
                  </h3>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  routing.isOpen 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${routing.isOpen ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'}`} />
                  <span>{routing.isOpen ? 'Open Now (9AM–6PM)' : 'Closed Now (Opens 9AM)'}</span>
                </span>
              </div>

              <div className="mt-4 space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 text-blue-600">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">Physical Address</span>
                    <strong className="text-slate-900">{COMPANY_DETAILS.address}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 text-blue-600">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">Direct Telephone / Office WhatsApp</span>
                    <a href={`tel:${COMPANY_DETAILS.phoneRaw}`} className="text-blue-700 font-bold hover:underline">
                      {COMPANY_DETAILS.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 text-blue-600">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">Operating Hours (IST)</span>
                    <span className="text-slate-700 font-medium">Monday to Saturday: 09:00 AM – 06:00 PM</span>
                    <span className="block text-[11px] text-amber-600 mt-0.5">Sunday: Closed for Consular Processing</span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="mt-6 pt-4 border-t border-slate-200">
                <a
                  href={getWhatsAppDeliveryUrl('Hello AIMS Consultancy, I would like to inquire about visa and travel services.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>

            {/* Landmark Directions Drawer */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setShowLandmarks(!showLandmarks)}
                className="w-full flex items-center justify-between text-left font-bold text-slate-900 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-blue-600" />
                  <span>How to Reach Court Road Office</span>
                </span>
                {showLandmarks ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showLandmarks && (
                <div className="mt-3 pt-3 border-t border-slate-200 space-y-2 text-slate-600 animate-fadeIn">
                  <p>• Located centrally on Court Road opposite district administrative quarters.</p>
                  <p>• 5 minutes drive from Hoshiarpur Railway Station and main Bus Stand.</p>
                  <p>• Ample street parking available for prospective applicants and visiting families.</p>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Fast Contact Form */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-md">
            <h3 className="text-lg font-bold text-slate-900 font-display mb-1">
              Send an Instant Direct Message
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Fill out your query and our desk counselor will review your file details and get back to you within 2 working hours.
            </p>

            {submitted ? (
              <div className="p-6 text-center space-y-3 bg-white rounded-xl border border-emerald-200 animate-fadeIn">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-base text-slate-900">Message Dispatched Successfully!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you, <strong>{formData.name}</strong>. An AIMS visa counselor has received your message regarding {formData.service} and will connect via WhatsApp or Phone shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Navjot Kaur"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. navjot@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Relevant Category *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-xs cursor-pointer"
                    >
                      <option value="Visa Advisory">Visa Advisory (Study, Work, PR, Tourist)</option>
                      <option value="Passport Assistance">Passport Seva & Tatkal Appointment</option>
                      <option value="Air Ticketing">Air Ticketing & Extra Baggage Deals</option>
                      <option value="Holiday Packages">Holiday & International Tour Packages</option>
                      <option value="Refusal Case Overturn">Prior Visa Rejection Overturn</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Describe Your Requirement *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Specify target countries, academic qualification, IELTS bands, or specific travel dates..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Query to AIMS Desk</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
