import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  Clock, 
  Menu, 
  X, 
  ShieldCheck, 
  Compass, 
  CalendarCheck, 
  MessageCircle,
  MapPin
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/aimsData';
import { AimsLogo } from './AimsLogo';
import { 
  getWhatsAppRoutingDetails, 
  getWhatsAppDeliveryUrl, 
  WhatsAppRoutingInfo 
} from '../utils/whatsappRouting';

interface NavbarProps {
  onOpenBooking: (prefill?: { visaType?: string; destination?: string }) => void;
  onOpenEligibility: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenEligibility }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [routing, setRouting] = useState<WhatsAppRoutingInfo>(getWhatsAppRoutingDetails());

  useEffect(() => {
    setRouting(getWhatsAppRoutingDetails());
    const interval = setInterval(() => {
      setRouting(getWhatsAppRoutingDetails());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['home', 'about', 'services', 'eligibility', 'process', 'destinations', 'booking', 'testimonials', 'faq', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Notification & Contact Bar */}
      <div className="bg-[#030806] text-slate-300 text-xs font-medium border-b border-emerald-950/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-emerald-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Court Road, Hoshiarpur (Punjab)</span>
            </span>
            <span className="hidden md:inline-block text-emerald-950">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{COMPANY_DETAILS.workingHours} ({COMPANY_DETAILS.closedDays})</span>
            </span>
            <span className="hidden lg:inline-block text-emerald-950">|</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-slate-400">
              📍 {COMPANY_DETAILS.address}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`tel:${routing.isOpen ? COMPANY_DETAILS.phoneRaw : COMPANY_DETAILS.afterHoursPhoneRaw}`}
              id="top-bar-phone"
              title={`Call ${routing.deskLabel} (${routing.formattedNumber})`}
              className="inline-flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{routing.isOpen ? COMPANY_DETAILS.phone : COMPANY_DETAILS.afterHoursPhone}</span>
            </a>
            <a 
              href={getWhatsAppDeliveryUrl(
                `Hello AIMS Consultancy,\n\nI am contacting you from your website.\n\n━━━━━━━━━━━━━━━━━━━━\n📍 *Office Routing Status:*\n• Active Line: ${routing.formattedNumber} (${routing.deskLabel})\n• ${routing.statusDetail}`
              )}
              target="_blank" 
              rel="noopener noreferrer"
              id="top-bar-whatsapp"
              title={`WhatsApp ${routing.deskLabel} (${routing.formattedNumber})`}
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                WhatsApp ({routing.isOpen ? 'Office: 91933' : 'Duty: 95927'})
              </span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className={`sticky top-[37px] z-40 transition-all duration-200 border-b ${
        isScrolled 
          ? 'bg-[#060f0c]/95 backdrop-blur-xl border-emerald-950/80 shadow-2xl py-3' 
          : 'bg-[#060f0c]/80 backdrop-blur-lg border-emerald-950/40 py-4 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#home" id="navbar-brand-logo" className="flex items-center group">
            <AimsLogo variant="horizontal" theme="dark" showTagline={true} className="h-10 sm:h-11" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                id={`nav-link-${link.label.toLowerCase()}`}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeSection === link.href.substring(1)
                    ? 'text-emerald-300 bg-emerald-950/70 border border-emerald-700/50 font-semibold shadow-inner'
                    : 'text-slate-300 hover:text-white hover:bg-emerald-950/40'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenEligibility}
              id="header-eligibility-btn"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-100 bg-emerald-950/60 hover:bg-emerald-900/60 rounded-xl transition-all border border-emerald-800/60 hover:border-emerald-700 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Eligibility Check</span>
            </button>

            <button
              onClick={() => onOpenBooking()}
              id="header-booking-cta"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 rounded-xl shadow-lg shadow-emerald-950/60 transition-all cursor-pointer group"
            >
              <CalendarCheck className="w-4 h-4 text-white" />
              <span>Book Consultation</span>
              <span className="bg-emerald-400/20 border border-emerald-300/40 px-1.5 py-0.5 rounded text-[11px] font-extrabold text-emerald-200">
                Free
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-emerald-950/80 bg-[#081511]/98 px-4 pt-3 pb-6 space-y-2 shadow-2xl backdrop-blur-2xl animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-emerald-950">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEligibility();
                }}
                className="w-full text-center py-2.5 px-3 text-xs font-semibold text-emerald-100 bg-emerald-950/80 rounded-xl border border-emerald-800/70"
              >
                Eligibility Check
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full text-center py-2.5 px-3 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 rounded-xl shadow-xs"
              >
                Book Free Slot
              </button>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                  activeSection === link.href.substring(1)
                    ? 'text-emerald-300 bg-emerald-950/80 font-semibold border border-emerald-700/50'
                    : 'text-slate-300 hover:bg-emerald-950/40 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-emerald-950 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <a href={`tel:${routing.isOpen ? COMPANY_DETAILS.phoneRaw : COMPANY_DETAILS.afterHoursPhoneRaw}`} className="font-semibold text-slate-200">
                  {routing.isOpen ? COMPANY_DETAILS.phone : COMPANY_DETAILS.afterHoursPhone}
                </a>
                <span className="text-[10px] text-emerald-400/80">({routing.deskLabel})</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <a 
                  href={getWhatsAppDeliveryUrl(
                    `Hello AIMS Consultancy,\n\nI am contacting you from your mobile site.\n\n━━━━━━━━━━━━━━━━━━━━\n📍 *Office Routing Status:*\n• Line: ${routing.formattedNumber} (${routing.deskLabel})\n• ${routing.statusDetail}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-400 hover:underline"
                >
                  WhatsApp ({routing.formattedNumber})
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>{COMPANY_DETAILS.email}</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
