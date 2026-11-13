import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/aimsData';
import { getWhatsAppDeliveryUrl } from '../utils/whatsappRouting';

export const MobileStickyCTA: React.FC = () => {
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0F172A]/95 backdrop-blur-md border-t border-slate-800 px-3 py-2 shadow-lg"
      role="region"
      aria-label="Quick Contact Actions"
    >
      <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
        <a
          href={`tel:${COMPANY_DETAILS.phoneRaw}`}
          className="min-h-[44px] px-3 py-2 rounded-lg bg-[#1E293B] hover:bg-slate-800 text-white border border-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <Phone className="w-4 h-4 text-[#DFB958] shrink-0" />
          <span>Call 95927-47000</span>
        </a>

        <a
          href={getWhatsAppDeliveryUrl(
            'Hello AIMS Consultancy, I would like a quick consultation on visas / travel services.'
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] px-3 py-2 rounded-lg bg-[#C29B38] hover:bg-[#B38D2D] text-[#0F172A] font-bold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span>WhatsApp Desk</span>
        </a>
      </div>
    </div>
  );
};
