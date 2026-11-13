import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Calendar,
  ShieldCheck,
} from 'lucide-react';
import { ChatMessage } from '../types';
import {
  getWhatsAppRoutingDetails,
  getWhatsAppDeliveryUrl,
  WhatsAppRoutingInfo,
} from '../utils/whatsappRouting';
import { AimsLogo } from './AimsLogo';

interface VirtualAssistantWidgetProps {
  onOpenBooking: () => void;
}

const FormattedMessage: React.FC<{ text: string; isUser?: boolean }> = ({ text, isUser }) => {
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5 text-xs sm:text-[13px] leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-');
        const isNumbered = /^\d+\.\s/.test(trimmed);
        const content = isBullet ? trimmed.replace(/^[•\-]\s*/, '') : trimmed;

        const parts = content.split(/(\*\*.*?\*\*)/g);
        const rendered = parts.map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={pIdx} className={`font-semibold ${isUser ? 'text-[#0F172A]' : 'text-[#0F172A]'}`}>
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        });

        if (isBullet || isNumbered) {
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-1">
              <span className="text-[#926B16] font-bold select-none shrink-0">
                {isBullet ? '•' : ''}
              </span>
              <span className="flex-1">{rendered}</span>
            </div>
          );
        }

        return <p key={idx}>{rendered}</p>;
      })}
    </div>
  );
};

export const VirtualAssistantWidget: React.FC<VirtualAssistantWidgetProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [routing, setRouting] = useState<WhatsAppRoutingInfo>(getWhatsAppRoutingDetails());

  useEffect(() => {
    const interval = setInterval(() => {
      setRouting(getWhatsAppRoutingDetails());
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: `Welcome to **AIMS Consultancy** (Hoshiarpur, Punjab).\n\nOur consultations and guidance are **100% Free**.\n\n• **Official WhatsApp / Phone**: **95927-47000** (Mon–Sat 9AM–6PM IST).\n\nSelect a topic below or start an instant WhatsApp chat.`,
      time: 'Just now',
      quickReplies: [
        'Study Visa Guide',
        'Tourist Visas',
        'Tatkal Passport',
        'Student Baggage (46kg)',
        'WhatsApp Direct (95927-47000)',
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const deliverMessageToWhatsApp = (textToDeliver: string) => {
    const currentRouting = getWhatsAppRoutingDetails();
    const cleanText = textToDeliver.replace(/\*\*/g, '').replace(/###/g, '').trim();
    const payload = `Inquiry from AIMS Quick Contact Desk\n\nSummary:\n${cleanText}\n\nRouted to: ${currentRouting.formattedNumber} (${currentRouting.deskLabel})`;
    window.open(getWhatsAppDeliveryUrl(payload), '_blank');
  };

  const deliverCurrentInputToWhatsApp = () => {
    const query = inputVal.trim();
    if (!query) return;
    const payload = `Hello AIMS Consultancy,\n\nI have a direct query:\n"${query}"`;
    window.open(getWhatsAppDeliveryUrl(payload), '_blank');
    handleSend(query);
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    setTimeout(() => {
      const lower = text.toLowerCase();
      let botReply = '';
      let suggestions: string[] = [];

      if (lower.includes('free') || lower.includes('fee') || lower.includes('cost')) {
        botReply = `**100% Free Consultation & Advisory:**\n\n• **Zero Consultation Charges**: Initial profile checks and document checklists carry zero fee.\n• **Official Embassy Fees**: Paid directly to high commissions with transparent advisory terms.`;
        suggestions = ['Study Visa Guide', 'Tourist Visas', 'Schedule Free Visit'];
      } else if (lower.includes('study') || lower.includes('student') || lower.includes('ielts')) {
        botReply = `**International Student Visa Advisory:**\n\n• **Top Destinations**: Canada (SDS), UK (PSW), Australia (Subclass 500), USA (F-1), and Germany.\n• **Scope**: University admissions, SOP drafting, GIC setup, and consular mock interviews.`;
        suggestions = ['Canada Study Permit', 'UK Student Visa', 'WhatsApp Direct (95927-47000)'];
      } else if (lower.includes('tourist') || lower.includes('visitor') || lower.includes('dubai') || lower.includes('schengen')) {
        botReply = `**Tourist & Visitor Visas:**\n\n• **Dubai / UAE**: 24–72 hr e-Visa processing.\n• **UK / Canada / USA / Schengen**: Complete financial audit, itinerary structuring, and VFS/BLS appointment booking.`;
        suggestions = ['WhatsApp Direct (95927-47000)', 'Schedule Free Visit'];
      } else if (lower.includes('tatkal') || lower.includes('passport')) {
        botReply = `**Passport Seva & Tatkal Express:**\n\n• **Speed**: Priority dispatch within 1–3 working days for Tatkal.\n• **Locations**: POPSK Hoshiarpur & Regional PSK Jalandhar.`;
        suggestions = ['WhatsApp Direct (95927-47000)', 'Schedule Free Visit'];
      } else if (lower.includes('baggage') || lower.includes('flight') || lower.includes('ticket')) {
        botReply = `**Global Air Ticketing & Student Baggage:**\n\n• **Student Fares**: Up to 46kg checked luggage across Air Canada, Emirates, British Airways, and Air India.\n• **Transit Guidance**: Complete layover visa checks included.`;
        suggestions = ['WhatsApp Direct (95927-47000)', 'Schedule Free Visit'];
      } else {
        botReply = `Thank you for reaching out to **AIMS Consultancy** (Licence No: 288/MA/HOSHIARPUR).\n\nFor fast personalized guidance on visas, ticketing, documentation, or tour packages, call or WhatsApp **95927-47000** or book a free office visit.`;
        suggestions = ['Study Visa Guide', 'Tourist Visas', 'Tatkal Passport', 'WhatsApp Direct (95927-47000)'];
      }

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: suggestions,
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 300);
  };

  const handleQuickReply = (reply: string) => {
    if (reply.includes('Schedule') || reply.includes('Book')) {
      setIsOpen(false);
      onOpenBooking();
      return;
    }
    if (reply.includes('WhatsApp')) {
      window.open(
        getWhatsAppDeliveryUrl('Hello AIMS Consultancy, I would like free guidance on visas / travel services.'),
        '_blank'
      );
      return;
    }
    handleSend(reply);
  };

  return (
    <>
      {/* Fixed Non-Intrusive Bottom-Right Floating WhatsApp & Contact Widget */}
      <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 flex items-center gap-2">
        <a
          href={getWhatsAppDeliveryUrl('Hello AIMS Consultancy, I would like to connect on WhatsApp.')}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp 95927-47000"
          title="Direct WhatsApp (95927-47000)"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-3 bg-[#C29B38] hover:bg-[#B38D2D] text-[#0F172A] rounded-full shadow-lg border border-[#B38D2D] font-bold text-xs transition-transform hover:scale-102"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp 95927-47000</span>
        </a>

        <button
          id="aims-virtual-agent-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close Quick Contact Desk' : 'Open Quick Contact & WhatsApp Desk'}
          className="p-3 sm:px-4 sm:py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full shadow-lg border border-slate-700 flex items-center gap-2 transition-transform hover:scale-102 cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
            <AimsLogo variant="emblem" className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold hidden sm:inline">Quick Desk</span>
        </button>
      </div>

      {/* Floating Contact Drawer Window */}
      {isOpen && (
        <div
          id="aims-chat-window-modal"
          className="fixed bottom-36 md:bottom-22 right-3 sm:right-6 z-50 w-[360px] sm:w-[400px] max-w-[calc(100vw-24px)] h-[520px] max-h-[calc(100vh-160px)] bg-[#F8F9FA] rounded-2xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden animate-fadeIn"
        >
          {/* Header */}
          <div className="bg-[#0F172A] p-3.5 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center shrink-0">
                <AimsLogo variant="emblem" className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold font-display text-white">
                  AIMS Quick Contact Desk
                </h4>
                <p className="text-[11px] text-[#DFB958] font-medium">
                  WhatsApp & Phone: {routing.formattedNumber}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close Quick Contact Desk"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#F4F5F7]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-[#C29B38] text-[#0F172A] rounded-br-none shadow-xs font-medium'
                      : 'bg-white text-[#334155] border border-slate-200 rounded-bl-none shadow-xs'
                  }`}
                >
                  <FormattedMessage text={m.text} isUser={m.sender === 'user'} />

                  {m.sender === 'bot' && m.id !== 'm1' && (
                    <div className="mt-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => deliverMessageToWhatsApp(m.text)}
                        className="inline-flex items-center gap-1.5 text-[11px] text-[#926B16] hover:text-[#0F172A] font-bold cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Send Summary to WhatsApp</span>
                      </button>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-slate-500 mt-1 px-1">{m.time}</span>

                {m.quickReplies && m.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {m.quickReplies.map((reply, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickReply(reply)}
                        className="px-2.5 py-1 bg-white hover:bg-[#0F172A] text-[#0F172A] hover:text-white border border-slate-300 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions Bar */}
          <div className="px-3.5 py-2 bg-white border-t border-slate-200 flex items-center justify-between text-[11px] shrink-0">
            <span className="flex items-center gap-1 text-[#926B16] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Free Consultation</span>
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking();
                }}
                className="text-[#0F172A] hover:text-[#926B16] font-bold cursor-pointer flex items-center gap-1"
              >
                <Calendar className="w-3 h-3" />
                <span>Book Slot</span>
              </button>
              <a
                href={getWhatsAppDeliveryUrl('Hello AIMS Consultancy, I need visa/travel consultation.')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#926B16] hover:text-[#0F172A] font-bold flex items-center gap-1"
              >
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputVal);
            }}
            className="p-3 bg-[#F8F9FA] border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              placeholder="Ask about visas, passport, or ticketing..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C29B38]"
            />
            {inputVal.trim() && (
              <button
                type="button"
                onClick={deliverCurrentInputToWhatsApp}
                title="Send directly to WhatsApp"
                className="p-2 bg-[#C29B38] hover:bg-[#B38D2D] text-[#0F172A] rounded-xl transition-colors cursor-pointer"
                aria-label="Send directly to WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              disabled={!inputVal.trim()}
              aria-label="Send message"
              className="p-2 bg-[#0F172A] hover:bg-[#1E293B] disabled:opacity-40 text-white rounded-xl transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#DFB958]" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
