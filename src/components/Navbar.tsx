import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  MapPin, 
  Globe2, 
  Search, 
  FileText, 
  Compass, 
  Scale, 
  MessageCircle,
  GraduationCap,
  Plane,
  Briefcase,
  Languages
} from 'lucide-react';
import { AimsLogo } from './AimsLogo';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80">
      {/* Top Micro Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Court Road, Opposite District Courts, Hoshiarpur, Punjab</span>
            </span>
            <span className="text-slate-700">|</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{routing.isOfficeHours ? 'Office Open (9 AM - 6 PM)' : 'After Hours Service Desk'}</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            {/* WhatsApp Routed Line */}
            <a
              href={getWhatsAppDeliveryUrl('Hello AIMS Consultancy, I would like to consult with an expert.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: {routing.formattedNumber}</span>
            </a>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="inline-flex items-center gap-1 text-slate-300 hover:text-white font-medium cursor-pointer"
              >
                <Languages className="w-3 h-3 text-blue-400" />
                <span className="uppercase font-bold">{currentLanguage}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-50 text-slate-800">
                  {languagesList.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 flex items-center justify-between cursor-pointer ${
                        currentLanguage === lang.code ? 'font-bold text-blue-600 bg-blue-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span>{lang.native}</span>
                      <span className="text-[10px] text-slate-400 uppercase">{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Logo matching image.png */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <AimsLogo variant="horizontal" theme="blue" showTagline={true} />
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-700">
            
            <button
              onClick={() => handleNavClick('home')}
              className="px-3 py-2 text-blue-600 hover:text-blue-700 font-semibold cursor-pointer rounded-lg hover:bg-slate-100/70 transition-colors"
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
                className="px-3 py-2 text-slate-700 hover:text-blue-600 cursor-pointer rounded-lg hover:bg-slate-100/70 transition-colors inline-flex items-center gap-1"
              >
                <span>{t.navServices}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-200/80 py-2 animate-fadeIn z-50">
                  <button
                    onClick={() => handleNavClick('services')}
                    className="w-full text-left px-4 py-2.5 hover:bg-blue-50 text-xs flex items-center gap-2.5 text-slate-700 hover:text-blue-600 cursor-pointer"
                  >
                    <GraduationCap className="w-4 h-4 text-blue-500" />
                    <div>
                      <div className="font-semibold">Student Study Permits</div>
                      <p className="text-[10px] text-slate-400">Canada SDS, UK, Australia, Europe</p>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="w-full text-left px-4 py-2.5 hover:bg-blue-50 text-xs flex items-center gap-2.5 text-slate-700 hover:text-blue-600 cursor-pointer"
                  >
                    <Plane className="w-4 h-4 text-emerald-500" />
                    <div>
                      <div className="font-semibold">Tourist & Visitor Visas</div>
                      <p className="text-[10px] text-slate-400">Dubai, Schengen, UK, USA 10-Yr</p>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="w-full text-left px-4 py-2.5 hover:bg-blue-50 text-xs flex items-center gap-2.5 text-slate-700 hover:text-blue-600 cursor-pointer"
                  >
                    <Briefcase className="w-4 h-4 text-amber-500" />
                    <div>
                      <div className="font-semibold">Passport Seva & Tatkal</div>
                      <p className="text-[10px] text-slate-400">Fast-track re-issue & lost booklet</p>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="w-full text-left px-4 py-2.5 hover:bg-blue-50 text-xs flex items-center gap-2.5 text-slate-700 hover:text-blue-600 cursor-pointer border-t border-slate-100"
                  >
                    <FileText className="w-4 h-4 text-teal-500" />
                    <div>
                      <div className="font-semibold">Refusal Overturning / CAIPS</div>
                      <p className="text-[10px] text-slate-400">Legal case restructuring</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Visa Options Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setVisaDropdownOpen(true)}
              onMouseLeave={() => setVisaDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('destinations')}
                className="px-3 py-2 text-slate-700 hover:text-blue-600 cursor-pointer rounded-lg hover:bg-slate-100/70 transition-colors inline-flex items-center gap-1"
              >
                <span>{t.navVisaOptions}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {visaDropdownOpen && (
                <div className="absolute top-full left-0 w-60 bg-white rounded-xl shadow-xl border border-slate-200/80 py-2 animate-fadeIn z-50">
                  <button
                    onClick={() => handleNavClick('destinations')}
                    className="w-full text-left px-4 py-2 text-xs hover:bg-blue-50 flex items-center gap-2 text-slate-700 hover:text-blue-600 cursor-pointer"
                  >
                    <span>🇨🇦</span>
                    <span className="font-medium">Canada Visas (Study / PR / Visitor)</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('destinations')}
                    className="w-full text-left px-4 py-2 text-xs hover:bg-blue-50 flex items-center gap-2 text-slate-700 hover:text-blue-600 cursor-pointer"
                  >
                    <span>🇬🇧</span>
                    <span className="font-medium">United Kingdom (Student / Tourist)</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('destinations')}
                    className="w-full text-left px-4 py-2 text-xs hover:bg-blue-50 flex items-center gap-2 text-slate-700 hover:text-blue-600 cursor-pointer"
                  >
                    <span>🇦🇺</span>
                    <span className="font-medium">Australia (Subclass 500 / 600)</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('destinations')}
                    className="w-full text-left px-4 py-2 text-xs hover:bg-blue-50 flex items-center gap-2 text-slate-700 hover:text-blue-600 cursor-pointer"
                  >
                    <span>🇺🇸</span>
                    <span className="font-medium">USA (F-1 Student / B1-B2)</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('destinations')}
                    className="w-full text-left px-4 py-2 text-xs hover:bg-blue-50 flex items-center gap-2 text-slate-700 hover:text-blue-600 cursor-pointer"
                  >
                    <span>🇪🇺</span>
                    <span className="font-medium">Schengen Europe (29 Nations)</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('destinations')}
                    className="w-full text-left px-4 py-2 text-xs hover:bg-blue-50 flex items-center gap-2 text-slate-700 hover:text-blue-600 cursor-pointer"
                  >
                    <span>🇦🇪</span>
                    <span className="font-medium">Dubai & UAE (30/60 Days e-Visa)</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('about')}
              className="px-3 py-2 text-slate-700 hover:text-blue-600 cursor-pointer rounded-lg hover:bg-slate-100/70 transition-colors"
            >
              {t.navAboutUs}
            </button>

            {/* Resources / Hub Tools Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setResourcesDropdownOpen(true)}
              onMouseLeave={() => setResourcesDropdownOpen(false)}
            >
              <button
                className="px-3 py-2 text-slate-700 hover:text-blue-600 cursor-pointer rounded-lg hover:bg-slate-100/70 transition-colors inline-flex items-center gap-1"
              >
                <span>{t.navResources}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {resourcesDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-200/80 py-2 animate-fadeIn z-50">
                  <button
                    onClick={() => {
                      setResourcesDropdownOpen(false);
                      if (onOpenTracker) onOpenTracker();
                      else handleNavClick('tracker');
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-blue-50 text-xs flex items-center gap-2.5 text-slate-700 hover:text-blue-600 cursor-pointer"
                  >
                    <Search className="w-4 h-4 text-blue-500" />
                    <div>
                      <div className="font-semibold text-slate-800">Live Application Tracker</div>
                      <p className="text-[10px] text-slate-400">Track dossier, biometrics & status</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setResourcesDropdownOpen(false);
                      if (onOpenComparison) onOpenComparison();
                      else handleNavClick('comparison');
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-blue-50 text-xs flex items-center gap-2.5 text-slate-700 hover:text-blue-600 cursor-pointer"
                  >
                    <Scale className="w-4 h-4 text-emerald-500" />
                    <div>
                      <div className="font-semibold text-slate-800">Side-by-Side Country Compare</div>
                      <p className="text-[10px] text-slate-400">Compare fees, funds & PR rights</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setResourcesDropdownOpen(false);
                      handleNavClick('faq');
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-blue-50 text-xs flex items-center gap-2.5 text-slate-700 hover:text-blue-600 cursor-pointer border-t border-slate-100"
                  >
                    <FileText className="w-4 h-4 text-amber-500" />
                    <div>
                      <div className="font-semibold text-slate-800">Visa FAQs & Knowledge Base</div>
                      <p className="text-[10px] text-slate-400">Direct consular answers</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('contact')}
              className="px-3 py-2 text-slate-700 hover:text-blue-600 cursor-pointer rounded-lg hover:bg-slate-100/70 transition-colors"
            >
              {t.navContact}
            </button>
          </nav>

          {/* Right Action: "Get a Free Assessment" Button as shown in image.png */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenEligibility}
              className="px-5 py-2.5 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold text-sm rounded-lg shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all cursor-pointer flex items-center gap-2 group"
            >
              <span>{t.getFreeAssessment}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenEligibility}
              className="px-3 py-1.5 bg-[#1d4ed8] text-white text-xs font-bold rounded-md"
            >
              Free Check
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-fadeIn shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500">Choose Language:</span>
            <div className="flex gap-1.5">
              {languagesList.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`px-2.5 py-1 text-xs rounded font-bold cursor-pointer ${
                    currentLanguage === lang.code ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {lang.native}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium text-slate-800">
            <button 
              onClick={() => handleNavClick('home')}
              className="p-2.5 text-left rounded-lg hover:bg-blue-50 font-semibold text-blue-600"
            >
              {t.navHome}
            </button>
            <button 
              onClick={() => handleNavClick('services')}
              className="p-2.5 text-left rounded-lg hover:bg-slate-100"
            >
              {t.navServices}
            </button>
            <button 
              onClick={() => handleNavClick('destinations')}
              className="p-2.5 text-left rounded-lg hover:bg-slate-100"
            >
              {t.navVisaOptions}
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className="p-2.5 text-left rounded-lg hover:bg-slate-100"
            >
              {t.navAboutUs}
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenTracker) onOpenTracker();
                else handleNavClick('tracker');
              }}
              className="p-2.5 text-left rounded-lg hover:bg-slate-100 flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.navTracker}</span>
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenComparison) onOpenComparison();
                else handleNavClick('comparison');
              }}
              className="p-2.5 text-left rounded-lg hover:bg-slate-100 flex items-center gap-1.5"
            >
              <Scale className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.navComparison}</span>
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className="p-2.5 text-left rounded-lg hover:bg-slate-100 col-span-2"
            >
              {t.navContact}
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEligibility();
              }}
              className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <span>{t.getFreeAssessment}</span>
            </button>

            <a
              href={getWhatsAppDeliveryUrl('Hello AIMS Consultancy, I would like to consult with an expert.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-emerald-50 text-emerald-800 font-semibold rounded-lg text-xs flex items-center justify-center gap-2 border border-emerald-200"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Official Desk</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
