import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';
import { FAQ_DATA, COMPANY_DETAILS } from '../data/aimsData';
import { getWhatsAppDeliveryUrl } from '../utils/whatsappRouting';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All FAQs' },
    { id: 'visa', label: 'Visa Inquiries' },
    { id: 'passport', label: 'Passport & Tatkal' },
    { id: 'payment', label: 'Booking & Consultation' },
    { id: 'general', label: 'General Policies' },
  ];

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery
      ? faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-[#060f0c] border-b border-emerald-950/80 text-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/50 text-emerald-300 text-xs font-bold tracking-wide uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-emerald-100/70 text-base">
            Everything you need to know regarding consular timelines, passport documents, and free consultation booking.
          </p>

          {/* Search Bar */}
          <div className="pt-2 relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-emerald-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g., consultation, documents, mock interview)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#091712] border border-emerald-900/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
            />
          </div>
        </div>

        {/* Category Pills */}
        {!searchQuery && (
          <div className="mt-8 flex items-center justify-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-950/80'
                    : 'bg-[#091712] text-slate-300 hover:text-white hover:bg-[#0d221a] border border-emerald-900/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* FAQ Accordion List - Information hidden beneath links */}
        <div className="mt-8 space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-[#091712]/90 rounded-2xl border border-emerald-950/90 overflow-hidden transition-all shadow-xl backdrop-blur-sm"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-emerald-950/40 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-white font-display">
                      {faq.question}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-[#07130e] flex items-center justify-center shrink-0 text-emerald-300 border border-emerald-900/60">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-emerald-950 animate-fadeIn">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 bg-[#091712] rounded-2xl border border-emerald-950 text-slate-400 text-xs">
              No matching questions found for "{searchQuery}". You can ask us directly via WhatsApp!
            </div>
          )}
        </div>

        {/* Need more help bar */}
        <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-[#091b15] via-[#081712] to-[#07130e] border border-emerald-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div>
            <h4 className="text-sm font-bold text-white font-display">
              Have a specific question not addressed above?
            </h4>
            <p className="text-xs text-emerald-100/70 mt-0.5">
              Our travel specialists respond to direct messages during and after office working hours.
            </p>
          </div>
          <a
            href={getWhatsAppDeliveryUrl('Hello AIMS Consultancy, I have a specific question regarding your visa & travel services.')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-950/80"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
