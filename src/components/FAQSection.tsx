import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';
import { FAQ_DATA } from '../data/aimsData';
import { getWhatsAppDeliveryUrl } from '../utils/whatsappRouting';
import { AimsLogo } from './AimsLogo';

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
    <section id="faq" className="py-16 sm:py-20 bg-[#F4F5F7] border-b border-slate-200/90 text-[#334155]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#926B16]">
            <AimsLogo variant="emblem" className="w-4 h-4" />
            <span>Knowledge Base</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-[#334155] text-base leading-[1.65]">
            Everything you need to know regarding consular timelines, passport documents, and free consultation booking.
          </p>

          {/* Search Bar */}
          <div className="pt-2 relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#C29B38] shadow-xs"
            />
          </div>

          {/* Category Tabs */}
          <div className="pt-2 flex items-center justify-center flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  activeCategory === cat.id
                    ? 'bg-[#0F172A] text-white border-[#0F172A]'
                    : 'bg-white text-[#334155] hover:text-[#0F172A] border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="mt-10 space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden hover:bg-[#F8F9FA]"
                >
                  <span className="font-bold text-sm sm:text-base text-[#0F172A]">
                    {faq.question}
                  </span>
                  <span className="p-1.5 rounded-lg bg-[#F4F5F7] text-[#0F172A] shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-[#334155] leading-[1.7] border-t border-slate-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-8 text-slate-500 text-xs">
              No matching questions found for "{searchQuery}".
            </div>
          )}
        </div>

        {/* WhatsApp Help Prompt */}
        <div className="mt-12 bg-[#0F172A] text-white rounded-2xl p-6 border border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0">
              <AimsLogo variant="emblem" className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Have a case-specific question?</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Our senior visa advisors in Hoshiarpur provide free 1-on-1 dossier evaluations.
              </p>
            </div>
          </div>
          <a
            href={getWhatsAppDeliveryUrl('Hello AIMS Consultancy, I have a specific question regarding my visa / passport application.')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#C29B38] hover:bg-[#B38D2D] text-[#0F172A] rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp (95927-47000)</span>
          </a>
        </div>
      </div>
    </section>
  );
};
