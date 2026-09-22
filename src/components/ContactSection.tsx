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
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-[#060f0c] border-b border-emerald-950/80 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/50 text-emerald-300 text-xs font-bold tracking-wide uppercase">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Connect with Our Advisory Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Get in Touch with AIMS Consultancy
          </h2>
          <p className="text-emerald-100/70 text-base">
            Drop by our main office in Hoshiarpur, Punjab, call our helpline, or send a quick inquiry message below for immediate advisory support.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Office Details & Status */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Status Card */}
            <div className="p-6 rounded-2xl bg-[#091712]/90 border border-emerald-950/90 text-white shadow-2xl relative overflow-hidden backdrop-blur-sm">
              <div className="flex items-center justify-between pb-4 border-b border-emerald-950">
                <h3 className="text-base font-bold font-display text-white">
                  Head Office Hoshiarpur
                </h3>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  routing.isOpen 
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60' 
                    : 'bg-amber-950/70 text-amber-300 border border-amber-800/60'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${routing.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  <span>{routing.isOpen ? 'Open Now (9AM–6PM)' : 'Closed Now (Opens 9AM)'}</span>
                </span>
              </div>

              <div className="mt-4 space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#06110d] border border-emerald-900/60 flex items-center justify-center shrink-0 text-emerald-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-300/70 block">Physical Address</span>
                    <strong className="text-slate-200">{COMPANY_DETAILS.address}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#06110d] border border-emerald-900/60 flex items-center justify-center shrink-0 text-emerald-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-300/70 block">Direct Telephone / Office WhatsApp</span>
                    <a href={`tel:${COMPANY_DETAILS.phoneRaw}`} className="text-emerald-300 font-bold hover:underline">
                      {COMPANY_DETAILS.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#06110d] border border-emerald-900/60 flex items-center justify-center shrink-0 text-emerald-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-300/70 block">Official Email</span>
                    <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-slate-200 hover:text-emerald-300">
                      {COMPANY_DETAILS.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#06110d] border border-emerald-900/60 flex items-center justify-center shrink-0 text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-300/70 block">Operating Hours</span>
                    <span className="text-slate-200">{COMPANY_DETAILS.workingHours}</span>
                    <span className="block text-[11px] text-slate-400">{COMPANY_DETAILS.closedDays}</span>
                  </div>
                </div>
              </div>

              {/* Collapsible Landmarks & Parking Info */}
              <div className="mt-4 pt-3 border-t border-emerald-950">
                <button
                  onClick={() => setShowLandmarks(!showLandmarks)}
                  className="w-full py-1.5 px-2.5 rounded-lg bg-[#06110d] hover:bg-[#0c221a] border border-emerald-900/60 text-[11px] font-semibold text-emerald-300 hover:text-emerald-200 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-emerald-400" />
                    <span>✦ {showLandmarks ? 'Hide Landmarks & Parking' : 'View Driving Landmarks & Parking Details'}</span>
                  </span>
                  {showLandmarks ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showLandmarks && (
                  <div className="mt-2.5 p-3 rounded-xl bg-[#06110d] border border-emerald-800/40 text-[11px] text-slate-300 space-y-1.5 animate-fadeIn">
                    <p><strong className="text-emerald-300">Landmarks:</strong> Located near Sessions Court & District Administrative Complex on Court Road.</p>
                    <p><strong className="text-emerald-300">Parking:</strong> Free dedicated client four-wheeler & two-wheeler parking available directly in front of the office premises.</p>
                  </div>
                )}
              </div>

              {/* Direct WhatsApp Action with automatic schedule routing */}
              <div className="mt-4 pt-4 border-t border-emerald-950 space-y-2">
                <a
                  href={getWhatsAppDeliveryUrl(
                    `Hello AIMS Consultancy,\n\nI would like to inquire about visa and travel services.\n\n━━━━━━━━━━━━━━━━━━━━\n📍 *Office Routing Status:*\n• Line: ${routing.formattedNumber} (${routing.deskLabel})\n• ${routing.statusDetail}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-950/80"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp ({routing.isOpen ? 'Office: 91933-19128' : 'Duty Desk: 95927-47000'})</span>
                </a>
                <p className="text-[10px] text-emerald-200/60 text-center">
                  Mon–Sat 9AM–6PM IST routed to <strong>91933-19128</strong> • Off-hours to <strong>95927-47000</strong>
                </p>
              </div>
            </div>

            {/* Map Embed */}
            <div className="rounded-2xl border border-emerald-950/90 overflow-hidden bg-[#091712]/90 p-2 shadow-xl backdrop-blur-sm">
              <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-900">
                <iframe
                  title="AIMS Consultancy Office Location Hoshiarpur"
                  src="https://maps.google.com/maps?q=Hoshiarpur%20Punjab&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 opacity-80 contrast-125"
                  loading="lazy"
                />
              </div>
              <div className="p-3 flex items-center justify-between text-xs text-slate-300">
                <span>Coordinates: 31.5251° N, 75.9184° E</span>
                <a 
                  href="https://maps.google.com/?q=Hoshiarpur+Punjab" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-300 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Send Us an Inquiry Form */}
          <div className="lg:col-span-7 bg-[#091712]/90 border border-emerald-950/90 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
            <div className="border-b border-emerald-950 pb-4 mb-6">
              <h3 className="text-xl font-bold text-white font-display">
                Send Us a Quick Message
              </h3>
              <p className="text-xs text-emerald-200/70 mt-1">
                Fill in your contact details and our team will get back to you within 2-4 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white font-display">
                  Inquiry Message Sent Successfully!
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. One of our senior advisors will review your requirements for <em>{formData.service}</em> and contact you at <strong>{formData.phone}</strong>.
                </p>
                <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={getWhatsAppDeliveryUrl(
                      `Hello AIMS Consultancy,\n\nI submitted an inquiry form on your website:\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Email: ${formData.email}\n• Service: ${formData.service}\n• Message: ${formData.message}\n\n━━━━━━━━━━━━━━━━━━━━\n📍 Routed to: ${routing.formattedNumber} (${routing.deskLabel})\n• Status: ${routing.statusDetail}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-950/80"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Send to WhatsApp Desk ({routing.isOpen ? '91933-19128' : '95927-47000'})</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        service: 'Visa Advisory',
                        message: '',
                      });
                    }}
                    className="px-4 py-2 bg-[#06110d] hover:bg-[#0c221a] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer border border-emerald-900/60"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikas Talwar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#06110d] border border-emerald-900/80 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Contact Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 91933 19128"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#06110d] border border-emerald-900/80 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. client@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#06110d] border border-emerald-900/80 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Service Interested In *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#06110d] border border-emerald-900/80 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Student Visa & Study Permits">Student Visa & Study Permits</option>
                      <option value="Tourist & Visitor Visa">Tourist & Visitor Visa</option>
                      <option value="Business Visa">Business Visa</option>
                      <option value="Passport Assistance (Tatkal/Renewal)">Passport Assistance (Tatkal/Renewal)</option>
                      <option value="Airline Ticketing & Flight Bookings">Airline Ticketing & Flight Bookings</option>
                      <option value="Dubai / Europe Holiday Package">Dubai / Europe Holiday Package</option>
                      <option value="Travel Insurance & Forex Cards">Travel Insurance & Forex Cards</option>
                      <option value="Other Advisory">Other Advisory</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Your Specific Query / Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details such as intended destination, preferred intake date, or passport renewal queries..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#06110d] border border-emerald-900/80 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Privacy protected • Zero spam guarantee</span>
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-emerald-950/80 cursor-pointer"
                  >
                    <span>Send Inquiry</span>
                    <Send className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
