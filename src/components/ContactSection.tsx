import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Car,
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/aimsData';
import {
  getWhatsAppRoutingDetails,
  getWhatsAppDeliveryUrl,
  WhatsAppRoutingInfo,
} from '../utils/whatsappRouting';
import { AimsLogo } from './AimsLogo';

interface ContactSectionProps {
  initialService?: string;
  onOpenPrivacy?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService,
  onOpenPrivacy,
}) => {
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
    <section id="contact" className="py-16 sm:py-20 bg-[#F8F9FA] border-b border-slate-200/90 text-[#334155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#926B16]">
            <AimsLogo variant="emblem" className="w-4 h-4" />
            <span>Connect with Our Advisory Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
            Get in Touch with AIMS Consultancy
          </h2>
          <p className="text-[#334155] text-base leading-[1.65]">
            Drop by our main office in Hoshiarpur, Punjab, call our helpline, or send a quick inquiry message below for immediate advisory support.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 text-[#334155] shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <AimsLogo variant="emblem" className="w-6 h-6" />
                  <h3 className="text-base font-bold font-display text-[#0F172A]">
                    Head Office Hoshiarpur
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#926B16]">
                  {routing.isOpen ? 'Open (9AM–6PM)' : 'Opens 9AM IST'}
                </span>
              </div>

              <div className="mt-4 space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0F172A] text-[#DFB958] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">Physical Address</span>
                    <strong className="text-[#0F172A]">{COMPANY_DETAILS.address}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0F172A] text-[#DFB958] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">Direct Telephone / Office WhatsApp</span>
                    <a href={`tel:${COMPANY_DETAILS.phoneRaw}`} className="text-[#0F172A] font-bold hover:text-[#926B16] tabular-nums">
                      {COMPANY_DETAILS.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0F172A] text-[#DFB958] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">Operating Hours (IST)</span>
                    <span className="text-[#0F172A] font-medium">Monday to Saturday: 09:00 AM – 06:00 PM</span>
                    <span className="block text-[11px] text-[#926B16] mt-0.5">Sunday: Closed for Consular Processing</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <a
                  href={getWhatsAppDeliveryUrl('Hello AIMS Consultancy, I would like to inquire about visa and travel services.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#C29B38] hover:bg-[#B38D2D] text-[#0F172A] font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/90 text-xs">
              <button
                type="button"
                onClick={() => setShowLandmarks(!showLandmarks)}
                className="w-full flex items-center justify-between text-left font-bold text-[#0F172A] cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#926B16]" />
                  <span>How to Reach Fatehgarh Chowk Office</span>
                </span>
                {showLandmarks ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showLandmarks && (
                <div className="mt-3 pt-3 border-t border-slate-200 space-y-2 text-[#334155] animate-fadeIn">
                  <p>• Located prominently at Fatehgarh Chowk in central Hoshiarpur, Punjab.</p>
                  <p>• Easily accessible within 5–8 minutes from Hoshiarpur Bus Stand and Railway Station.</p>
                  <p>• Dedicated nearby street parking available for prospective applicants and visiting families.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Fast Contact Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-bold text-[#0F172A] font-display mb-1">
              Send an Instant Direct Message
            </h3>
            <p className="text-xs text-[#334155] mb-6 leading-relaxed">
              Fill out your query and our desk counselor will review your file details and get back to you within 2 working hours.
            </p>

            {submitted ? (
              <div className="p-6 text-center space-y-3 bg-[#F8F9FA] rounded-xl border border-slate-200 animate-fadeIn">
                <div className="w-12 h-12 bg-[#0F172A] text-[#DFB958] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-base text-[#0F172A]">Message Dispatched Successfully!</h4>
                <p className="text-xs text-[#334155] max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#0F172A]">{formData.name}</strong>. An AIMS visa counselor has received your message regarding {formData.service} and will connect via WhatsApp or Phone shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs text-[#926B16] font-bold hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Navjot Kaur"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-slate-300 rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#C29B38] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 95927 47000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-slate-300 rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#C29B38] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. navjot@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-slate-300 rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#C29B38] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Relevant Category *</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-slate-300 rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#C29B38] focus:bg-white cursor-pointer"
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
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Describe Your Requirement *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Specify target countries, academic qualification, IELTS bands, or specific travel dates..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-slate-300 rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-hidden focus:ring-2 focus:ring-[#C29B38] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#DFB958]" />
                  <span>Transmit Query to AIMS Desk</span>
                </button>
                <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                  By submitting this inquiry, your dossier details are handled confidentially in accordance with our{' '}
                  <button
                    type="button"
                    onClick={onOpenPrivacy}
                    className="text-[#926B16] font-semibold hover:underline cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
