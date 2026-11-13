import React, { useState } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  MapPin,
  Search,
  FileText,
  Scale,
  MessageCircle,
  GraduationCap,
  Plane,
  Briefcase,
  Languages,
  ShieldCheck,
} from 'lucide-react';
import { AimsLogo } from './AimsLogo';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { COMPANY_DETAILS } from '../data/aimsData';
import { getWhatsAppRoutingDetails, getWhatsAppDeliveryUrl } from '../utils/whatsappRouting';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenEligibility: () => void;
  onOpenTracker?: () => void;
  onOpenComparison?: () => void;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenEligibility,
  onOpenTracker,
  onOpenComparison,
  currentLanguage,
  onLanguageChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [visaDropdownOpen, setVisaDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = TRANSLATIONS[currentLanguage];
  const routing = getWhatsAppRoutingDetails();

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setVisaDropdownOpen(false);
    setResourcesDropdownOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const languagesList: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F8F9FA]/95 backdrop-blur-md border-b border-slate-200/90">
      {/* Top Credential & Direct Desk Strip */}
      <div className="bg-[#0F172A] text-slate-300 text-xs border-b border-slate-800/80 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#DFB958]" />
              <span>Fatehgarh Chowk, Hoshiarpur, Punjab</span>
            </span>
            <span className="text-slate-700">|</span>
            <span className="inline-flex items-center gap-1.5 text-[#DFB958] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Punjab Govt. Licence No: {COMPANY_DETAILS.licenceNo}</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href={`tel:${COMPANY_DETAILS.phoneRaw}`}
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-[#DFB958] font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#DFB958]" />
              <span className="tabular-nums">{COMPANY_DETAILS.phone}</span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={getWhatsAppDeliveryUrl('Hello AIMS Consultancy, I would like to consult with an advisor.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#DFB958] hover:text-white font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: {routing.formattedNumber}</span>
            </a>

            {/* Language Switcher */}
            <div className="relative pl-2 border-l border-slate-700">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="inline-flex items-center gap-1 text-slate-300 hover:text-white font-medium cursor-pointer"
                aria-label="Select Language"
              >
                <Languages className="w-3.5 h-3.5 text-[#DFB958]" />
                <span className="uppercase font-semibold">{currentLanguage}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-32 bg-[#F8F9FA] rounded-lg shadow-xl border border-slate-200 py-1 z-50 text-[#0F172A]">
                  {languagesList.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-200/60 flex items-center justify-between cursor-pointer ${
                        currentLanguage === lang.code ? 'font-bold text-[#0F172A] bg-[#C29B38]/15' : 'text-[#334155]'
                      }`}
                    >
                      <span>{lang.native}</span>
                      <span className="text-[10px] text-slate-500 uppercase">{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Zone 1: Brand Lockup */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-2 group cursor-pointer shrink-0"
          >
            <AimsLogo variant="horizontal" theme="light" showTagline={true} />
          </a>

          {/* Zone 2: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-[#334155]">
            <button
              onClick={() => handleNavClick('home')}
              className="px-3 py-2 text-[#0F172A] hover:text-[#926B16] font-semibold cursor-pointer rounded-lg hover:bg-slate-200/50 transition-colors"
            >
              {t.navHome}
            </button>

            {/* Our Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('services')}
                className="px-3 py-2 text-[#334155] hover:text-[#0F172A] cursor-pointer rounded-lg hover:bg-slate-200/50 transition-colors inline-flex items-center gap-1"
              >
                <span>{t.navServices}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 animate-fadeIn z-50">
                  <button
                    onClick={() => handleNavClick('services')}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#F4F5F7] text-xs flex items-center gap-2.5 text-[#334155] hover:text-[#0F172A] cursor-pointer"
                  >
                    <GraduationCap className="w-4 h-4 text-[#0F172A]" />
                    <div>
                      <div className="font-semibold text-[#0F172A]">Visa Appointments</div>
                      <p className="text-[11px] text-slate-500">Study, Visitor & Family Filing</p>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#F4F5F7] text-xs flex items-center gap-2.5 text-[#334155] hover:text-[#0F172A] cursor-pointer"
                  >
                    <Plane className="w-4 h-4 text-[#926B16]" />
                    <div>
                      <div className="font-semibold text-[#0F172A]">Global Ticketing</div>
                      <p className="text-[11px] text-slate-500">Student fares & 46kg baggage</p>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#F4F5F7] text-xs flex items-center gap-2.5 text-[#334155] hover:text-[#0F172A] cursor-pointer"
                  >
                    <Briefcase className="w-4 h-4 text-[#0F172A]" />
                    <div>
                      <div className="font-semibold text-[#0F172A]">Documentation & Passport</div>
                      <p className="text-[11px] text-slate-500">Tatkal Seva, Apostille & Audits</p>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#F4F5F7] text-xs flex items-center gap-2.5 text-[#334155] hover:text-[#0F172A] cursor-pointer border-t border-slate-100"
                  >
                    <FileText className="w-4 h-4 text-[#926B16]" />
                    <div>
                      <div className="font-semibold text-[#0F172A]">Tour Packages</div>
                      <p className="text-[11px] text-slate-500">Dubai, Europe & Custom Holidays</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Destinations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setVisaDropdownOpen(true)}
              onMouseLeave={() => setVisaDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('destinations')}
                className="px-3 py-2 text-[#334155] hover:text-[#0F172A] cursor-pointer rounded-lg hover:bg-slate-200/50 transition-colors inline-flex items-center gap-1"
              >
                <span>{t.navVisaOptions}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {visaDropdownOpen && (
                <div className="absolute top-full left-0 w-60 bg-white rounded-xl shadow-lg border border-slate-200 py-2 animate-fadeIn z-50">
                  {[
                    { flag: '🇨🇦', label: 'Canada (Study / Super Visa)' },
                    { flag: '🇬🇧', label: 'United Kingdom (Student / Visit)' },
                    { flag: '🇦🇺', label: 'Australia (Subclass 500 / 600)' },
                    { flag: '🇺🇸', label: 'USA (F-1 / B1-B2)' },
                    { flag: '🇪🇺', label: 'Schengen Europe (27 Nations)' },
                    { flag: '🇦🇪', label: 'Dubai & UAE (e-Visa)' },
                  ].map((d) => (
                    <button
                      key={d.label}
                      onClick={() => handleNavClick('destinations')}
                      className="w-full text-left px-4 py-2 text-xs hover:bg-[#F4F5F7] flex items-center gap-2 text-[#334155] hover:text-[#0F172A] cursor-pointer"
                    >
                      <span>{d.flag}</span>
                      <span className="font-medium">{d.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hub Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setResourcesDropdownOpen(true)}
              onMouseLeave={() => setResourcesDropdownOpen(false)}
            >
              <button
                className="px-3 py-2 text-[#334155] hover:text-[#0F172A] cursor-pointer rounded-lg hover:bg-slate-200/50 transition-colors inline-flex items-center gap-1"
              >
                <span>{t.navResources}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {resourcesDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 animate-fadeIn z-50">
                  <button
                    onClick={() => {
                      setResourcesDropdownOpen(false);
                      if (onOpenTracker) onOpenTracker();
                      else handleNavClick('tracker');
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#F4F5F7] text-xs flex items-center gap-2.5 text-[#334155] hover:text-[#0F172A] cursor-pointer"
                  >
                    <Search className="w-4 h-4 text-[#0F172A]" />
                    <div>
                      <div className="font-semibold text-[#0F172A]">Live Application Tracker</div>
                      <p className="text-[11px] text-slate-500">Track dossier & biometrics status</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setResourcesDropdownOpen(false);
                      if (onOpenComparison) onOpenComparison();
                      else handleNavClick('comparison');
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#F4F5F7] text-xs flex items-center gap-2.5 text-[#334155] hover:text-[#0F172A] cursor-pointer"
                  >
                    <Scale className="w-4 h-4 text-[#926B16]" />
                    <div>
                      <div className="font-semibold text-[#0F172A]">Side-by-Side Country Compare</div>
                      <p className="text-[11px] text-slate-500">Compare funds, tuition & PR rights</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setResourcesDropdownOpen(false);
                      handleNavClick('faq');
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#F4F5F7] text-xs flex items-center gap-2.5 text-[#334155] hover:text-[#0F172A] cursor-pointer border-t border-slate-100"
                  >
                    <FileText className="w-4 h-4 text-[#0F172A]" />
                    <div>
                      <div className="font-semibold text-[#0F172A]">Visa FAQs & Knowledge Base</div>
                      <p className="text-[11px] text-slate-500">Direct consular answers</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('about')}
              className="px-3 py-2 text-[#334155] hover:text-[#0F172A] cursor-pointer rounded-lg hover:bg-slate-200/50 transition-colors"
            >
              {t.navAboutUs}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="px-3 py-2 text-[#334155] hover:text-[#0F172A] cursor-pointer rounded-lg hover:bg-slate-200/50 transition-colors"
            >
              {t.navContact}
            </button>
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenEligibility}
              className="px-5 py-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-sm rounded-lg border border-slate-800 transition-all cursor-pointer flex items-center gap-2 shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C29B38]" />
              <span>{t.getFreeAssessment}</span>
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenEligibility}
              className="px-3 py-2 bg-[#0F172A] text-white text-xs font-semibold rounded-lg"
            >
              Free Assessment
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#334155] hover:text-[#0F172A] hover:bg-slate-200/60"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#F8F9FA] border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-fadeIn shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <span className="text-[11px] font-bold text-[#0F172A]">
              Licence No: {COMPANY_DETAILS.licenceNo}
            </span>
            <div className="flex gap-1.5">
              {languagesList.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`px-2.5 py-1 text-xs rounded font-semibold cursor-pointer ${
                    currentLanguage === lang.code ? 'bg-[#0F172A] text-white' : 'bg-white text-[#334155] border border-slate-200'
                  }`}
                >
                  {lang.native}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium text-[#0F172A]">
            <button onClick={() => handleNavClick('home')} className="p-2.5 text-left rounded-lg hover:bg-white font-semibold">
              {t.navHome}
            </button>
            <button onClick={() => handleNavClick('services')} className="p-2.5 text-left rounded-lg hover:bg-white">
              {t.navServices}
            </button>
            <button onClick={() => handleNavClick('destinations')} className="p-2.5 text-left rounded-lg hover:bg-white">
              {t.navVisaOptions}
            </button>
            <button onClick={() => handleNavClick('about')} className="p-2.5 text-left rounded-lg hover:bg-white">
              {t.navAboutUs}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenTracker) onOpenTracker();
                else handleNavClick('tracker');
              }}
              className="p-2.5 text-left rounded-lg hover:bg-white flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5 text-[#926B16]" />
              <span>{t.navTracker}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenComparison) onOpenComparison();
                else handleNavClick('comparison');
              }}
              className="p-2.5 text-left rounded-lg hover:bg-white flex items-center gap-1.5"
            >
              <Scale className="w-3.5 h-3.5 text-[#926B16]" />
              <span>{t.navComparison}</span>
            </button>
            <button onClick={() => handleNavClick('contact')} className="p-2.5 text-left rounded-lg hover:bg-white col-span-2">
              {t.navContact}
            </button>
          </div>

          <div className="pt-2 border-t border-slate-200 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 bg-[#C29B38] hover:bg-[#B38D2D] text-[#0F172A] font-bold rounded-lg text-xs flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Book Free Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
