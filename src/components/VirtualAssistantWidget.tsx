import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  Sparkles,
  Phone,
  Calendar,
  ExternalLink,
  MapPin,
  CheckCircle2,
  HelpCircle,
  Clock,
  Globe2,
  ShieldCheck
} from 'lucide-react';
import { COMPANY_DETAILS, VIRTUAL_ASSISTANT_KB } from '../data/aimsData';
import { ChatMessage } from '../types';
import { 
  getWhatsAppRoutingDetails, 
  getWhatsAppDeliveryUrl, 
  WhatsAppRoutingInfo 
} from '../utils/whatsappRouting';

interface VirtualAssistantWidgetProps {
  onOpenBooking: () => void;
}

// Formatted text renderer for markdown bold and bullet items
const FormattedMessage: React.FC<{ text: string }> = ({ text }) => {
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
        
        // Parse bold segments **text**
        const parts = content.split(/(\*\*.*?\*\*)/g);
        const rendered = parts.map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={pIdx} className="font-semibold text-white">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        });

        if (isBullet || isNumbered) {
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-1 text-slate-200">
              <span className="text-blue-400 font-bold select-none shrink-0">
                {isBullet ? '•' : ''}
              </span>
              <span className="flex-1">{rendered}</span>
            </div>
          );
        }

        return (
          <p key={idx} className="text-slate-200">
            {rendered}
          </p>
        );
      })}
    </div>
  );
};

export const VirtualAssistantWidget: React.FC<VirtualAssistantWidgetProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [routing, setRouting] = useState<WhatsAppRoutingInfo>(getWhatsAppRoutingDetails());

  useEffect(() => {
    // Keep routing refreshed against live IST clock
    const interval = setInterval(() => {
      setRouting(getWhatsAppRoutingDetails());
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: `👋 Welcome to **AIMS Consultancy** (Hoshiarpur, Punjab)!\n\nI am your 24/7 **AI Visa & Travel Assistant**. Our consultations and guidance are **100% Free**.\n\n📲 **Smart WhatsApp Delivery**:\n• **Office Hours (Mon-Sat 9AM-6PM IST)**: Messages delivered to **91933-19128**.\n• **Close Time & Sundays**: Messages routed to **95927-47000**.\n\nHow can I guide you today?`,
      time: 'Just now',
      quickReplies: [
        '🎓 Study Visa Guide',
        '✈️ Tourist Visas',
        '⚡ Tatkal Passport',
        '🎫 Student Baggage (46kg)',
        '📍 Office & Routing',
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

  // Deliver a specific message or answer to WhatsApp
  const deliverMessageToWhatsApp = (textToDeliver: string, userPrompt?: string) => {
    const currentRouting = getWhatsAppRoutingDetails();
    const cleanText = textToDeliver
      .replace(/\*\*/g, '')
      .replace(/###/g, '')
      .trim();

    const payload = `*Inquiry from AIMS Virtual Assistant*\n\n${userPrompt ? `*Topic / Question:* ${userPrompt}\n\n` : ''}*Guidance Summary:*\n${cleanText}\n\n━━━━━━━━━━━━━━━━━━━━\n📍 *Office Delivery Routing:*\n• ${currentRouting.statusDetail}\n• Active Desk: ${currentRouting.deskLabel} (${currentRouting.formattedNumber})\n• Dispatched: ${currentRouting.currentIstTime}`;

    const url = getWhatsAppDeliveryUrl(payload);
    window.open(url, '_blank');
  };

  // Deliver current input or query directly to WhatsApp
  const deliverCurrentInputToWhatsApp = () => {
    const query = inputVal.trim();
    if (!query) return;

    const currentRouting = getWhatsAppRoutingDetails();
    const payload = `Hello AIMS Consultancy,\n\nI have a direct query submitted through your AIMS Assistant:\n"${query}"\n\n━━━━━━━━━━━━━━━━━━━━\n📍 *Delivery Routing:*\n• Recipient: ${currentRouting.formattedNumber} (${currentRouting.deskLabel})\n• ${currentRouting.statusDetail}\n• Time: ${currentRouting.currentIstTime}`;

    const url = getWhatsAppDeliveryUrl(payload);
    window.open(url, '_blank');

    // Also record into chat view
    handleSend(query);
  };

  // Deliver latest chat thread to WhatsApp
  const deliverConversationToWhatsApp = () => {
    const currentRouting = getWhatsAppRoutingDetails();
    const userMsgs = messages.filter((m) => m.sender === 'user');
    const latestUser = userMsgs.length > 0 ? userMsgs[userMsgs.length - 1].text : 'General Inquiry';

    const payload = `Hello AIMS Consultancy,\n\nI was chatting with your AIMS Virtual Assistant regarding:\n"${latestUser}"\n\nI would like direct advisor assistance.\n\n━━━━━━━━━━━━━━━━━━━━\n📍 *Delivery Details:*\n• Delivered to: ${currentRouting.formattedNumber} (${currentRouting.deskLabel})\n• ${currentRouting.statusDetail}\n• Dispatched at: ${currentRouting.currentIstTime}`;

    const url = getWhatsAppDeliveryUrl(payload);
    window.open(url, '_blank');
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

    // Responsive intelligent knowledge retrieval
    setTimeout(() => {
      const lower = text.toLowerCase();
      let botReply = "";
      let suggestions: string[] = [];

      // 1. FREE / PRICING / CHARGES
      if (
        lower.includes('free') || 
        lower.includes('fee') || 
        lower.includes('cost') || 
        lower.includes('charge') || 
        lower.includes('price') || 
        lower.includes('money') || 
        lower.includes('how much') ||
        lower.includes('payment')
      ) {
        botReply = `✨ **100% Free Consultation & Advisory!**\n\n• **Zero Consultation Charges**: All consultations at AIMS Consultancy are 100% completely FREE. We charge zero consultation fees or advance booking fees.\n• **Assistant Interaction & Eligibility**: Completely free with zero obligation.\n• **In-Office Guidance**: Free one-on-one session with senior immigration advisors at our Hoshiarpur branch.\n• **Full Case Management**: When you choose our end-to-end visa filing, we provide transparent flat rates with zero hidden markups.\n• **Government & Embassy Fees**: Official visa fees are paid directly to high commissions with zero markups.\n\nFeel free to book a free slot or ask any questions!`;
        suggestions = ['🎓 Study Visa Guide', '✈️ Tourist Visas', '⚡ Tatkal Passport', '📅 Schedule Free Visit'];
      }
      // 2. CANADA STUDY
      else if (lower.includes('canada') && (lower.includes('study') || lower.includes('student') || lower.includes('sds') || lower.includes('gic') || lower.includes('pal') || lower.includes('college'))) {
        botReply = `🇨🇦 **Canada Study Permit Guidance (SDS Stream)**:\n\n• **Key Requirements**:\n  - Provincial Attestation Letter (PAL) from your DLI college/university\n  - GIC Account deposit of $20,635 CAD (CIBC / Scotiabank / ICICI / SBI)\n  - IELTS Academic: 6.0 overall (no band less than 6.0) or PTE Academic 60+\n  - 1-Year Full Tuition fee paid receipt\n• **Work Privileges**: Up to 3-Year Post-Graduation Work Permit (PGWP) & 24 hrs/week part-time work.\n• **Major Intakes**: Fall (September), Winter (January), Spring (May).\n\nWould you like a free assessment of your academic qualifications?`;
        suggestions = ['UK Student Visa', 'Australia Subclass 500', '✈️ Canada Visitor Visa', '📅 Schedule Free Visit'];
      }
      // 3. UK STUDY
      else if (lower.includes('uk') && (lower.includes('study') || lower.includes('student') || lower.includes('cas') || lower.includes('psw') || lower.includes('tier 4'))) {
        botReply = `🇬🇧 **UK Student Visa (Student Route)**:\n\n• **Key Requirements**:\n  - CAS (Confirmation of Acceptance for Studies) from an approved UK university\n  - 28-Day Maintenance funds maintained in a bank account\n  - IELTS 6.0+ (Many top universities offer 12th-grade English waivers if score is 70%+!)\n• **Key Benefits**:\n  - Popular 1-Year Master's degrees\n  - 2-Year Graduate Route Post-Study Work (PSW) visa after completion\n  - Spouse/dependant rights for eligible PhD/research programmes.\n\nAdmissions and visa guidance are 100% free!`;
        suggestions = ['Canada SDS Visa', 'Australia Subclass 500', '✈️ UK Visitor Visa', '💬 Chat on WhatsApp'];
      }
      // 4. AUSTRALIA STUDY
      else if (lower.includes('australia') && (lower.includes('study') || lower.includes('student') || lower.includes('500') || lower.includes('gs') || lower.includes('coe'))) {
        botReply = `🇦🇺 **Australia Student Visa (Subclass 500)**:\n\n• **Core Requirements**:\n  - Confirmation of Enrolment (CoE) in a CRICOS-registered institution\n  - Genuine Student (GS) compliance statement\n  - Proof of annual living funds (~$29,710 AUD) + tuition fees\n  - Overseas Student Health Cover (OSHC)\n• **Highlights**:\n  - High student minimum wage in Australia\n  - Post-study regional work visa extensions\n  - High demand in IT, healthcare, management, and engineering.`;
        suggestions = ['Canada Study Permit', 'UK Student Route', 'Travel Insurance (€30k)', '📅 Schedule Free Visit'];
      }
      // 5. USA STUDY
      else if ((lower.includes('usa') || lower.includes('america') || lower.includes('us')) && (lower.includes('study') || lower.includes('student') || lower.includes('f1') || lower.includes('f-1') || lower.includes('i20') || lower.includes('i-20'))) {
        botReply = `🇺🇸 **USA F-1 Student Visa Process**:\n\n• **Roadmap**:\n  1. Secure Form I-20 from a SEVP-approved university\n  2. Pay the SEVIS I-901 fee ($350)\n  3. Complete the online DS-160 form\n  4. Schedule Biometrics (OFC) and Consular Interview at US Embassy New Delhi\n• **Consular Interview Coaching**: The visa interview is key! We offer comprehensive free mock interview drills covering funding, intent to return, and academic goals.`;
        suggestions = ['USA B1/B2 Visitor', 'Canada SDS Visa', '💬 Chat on WhatsApp', '📅 Schedule Free Visit'];
      }
      // 6. EUROPE / GERMANY STUDY
      else if (lower.includes('germany') || (lower.includes('europe') && (lower.includes('study') || lower.includes('student') || lower.includes('blocked') || lower.includes('aps')))) {
        botReply = `🇩🇪 **Germany & Europe Higher Education**:\n\n• **Germany**: World-renowned tuition-free public universities! Requirements include an APS certificate, university admission letter, and a Blocked Account (~€11,208/yr with Expatrio/Fintiba).\n• **Other European Destinations**: We also provide study visa assistance for France, Italy, Malta, Hungary, and Latvia with Schengen-wide mobility.`;
        suggestions = ['🇨🇦 Canada SDS Visa', '✈️ Schengen Tourist Visa', '📅 Schedule Free Visit'];
      }
      // 7. GENERAL STUDY VISA
      else if (lower.includes('study') || lower.includes('student') || lower.includes('ielts') || lower.includes('pte') || lower.includes('admission') || lower.includes('college') || lower.includes('university') || lower.includes('sop') || lower.includes('intake')) {
        botReply = `🎓 **International Student Visa Advisory**:\n\nAt AIMS Consultancy, we guide you step-by-step through:\n• Course & university matching based on your academic profile and budget\n• Statement of Purpose (SOP) & Letter of Explanation preparation\n• Financial planning: GIC (Canada), Blocked Account (Germany), educational loans\n• Consular mock interview preparation & pre-departure student briefing\n\n**Top Destinations**: Canada (SDS), UK (PSW), Australia (Subclass 500), USA (F-1), Europe.\nAll preliminary evaluations are **100% Free**!`;
        suggestions = ['🇨🇦 Canada Study Permit', '🇬🇧 UK Student Route', '🇦🇺 Australia Subclass 500', '🇺🇸 USA F-1 Visa', '📅 Schedule Free Visit'];
      }
      // 8. DUBAI / UAE TOURIST
      else if (lower.includes('dubai') || lower.includes('uae') || lower.includes('emirates') || lower.includes('abu dhabi')) {
        botReply = `🇦🇪 **Dubai & UAE Tourist Visa Services**:\n\n• **Validity Options**: 30 Days or 60 Days (Single & Multiple Entry)\n• **Super-Fast Processing**: E-visas delivered in just 24 to 72 hours!\n• **Required Documents**:\n  1. Clear passport bio-data color scan (minimum 6 months validity)\n  2. Passport-size photograph with white background\n• **Tours & Flights**: We also arrange Burj Khalifa tickets, Desert Safari packages, and direct flights.`;
        suggestions = ['✈️ UK Visitor Visa', '🇪🇺 Schengen Europe', '🎫 Flight to Dubai', '💬 Chat on WhatsApp'];
      }
      // 9. SCHENGEN TOURIST / EUROPE VISITOR
      else if (lower.includes('schengen') || (lower.includes('europe') && (lower.includes('tourist') || lower.includes('visitor') || lower.includes('holiday')))) {
        botReply = `🇪🇺 **Schengen Tourist & Visitor Visa (27 Countries)**:\n\n• **Validity**: Up to 90 days across France, Switzerland, Germany, Italy, Spain, Netherlands, Austria, etc.\n• **Mandatory Checklist**:\n  - VFS / BLS biometric appointment scheduling\n  - €30,000 / $50,000 Travel Medical Insurance\n  - Verified hotel vouchers & round-trip flight reservations\n  - 6 Months bank statements with stable balance & 2-3 years ITR\n  - Detailed day-by-day travel itinerary establishing home ties to India.`;
        suggestions = ['Travel Insurance (€30k)', 'UK Visitor Visa', '🇦🇪 Dubai Tourist Visa', '📅 Schedule Free Visit'];
      }
      // 10. UK VISITOR VISA
      else if (lower.includes('uk') && (lower.includes('visitor') || lower.includes('tourist') || lower.includes('visit') || lower.includes('family'))) {
        botReply = `🇬🇧 **UK Standard Visitor Visa (6 Months)**:\n\n• **Purposes**: Tourism, visiting family/children, business meetings, or leisure.\n• **Key Documents Needed**:\n  - 6 Months bank statements showing genuine source of funds\n  - 2-3 Years Income Tax Returns (ITR)\n  - Employment leave letter or Business ownership proofs\n  - Detailed travel itinerary and proof of ties returning to India\n  - Family invitation letter and sponsor passport copy (if visiting relatives).`;
        suggestions = ['🇪🇺 Schengen Tourist Visa', '🇨🇦 Canada Visitor Visa', '💬 Chat on WhatsApp', '📅 Schedule Free Visit'];
      }
      // 11. USA VISITOR / B1 B2
      else if ((lower.includes('usa') || lower.includes('us') || lower.includes('america')) && (lower.includes('tourist') || lower.includes('visitor') || lower.includes('b1') || lower.includes('b2'))) {
        botReply = `🇺🇸 **USA B1/B2 Visitor Visa (10-Year Multiple Entry)**:\n\n• **Overview**: For tourism, family visits, medical treatment, and business seminars.\n• **Our Assistance**:\n  - DS-160 online filing & document validation\n  - Appointment slot monitoring & scheduling for biometrics and consular interview\n  - Extensive mock interview preparation to clearly demonstrate home ties\n  - Financial affidavit & property documentation review.`;
        suggestions = ['USA Mock Interview', '🇨🇦 Canada Visitor Visa', '📅 Schedule Free Visit'];
      }
      // 12. CANADA VISITOR & SUPER VISA
      else if (lower.includes('canada') && (lower.includes('visitor') || lower.includes('tourist') || lower.includes('super visa') || lower.includes('parents'))) {
        botReply = `🇨🇦 **Canada Visitor Visa & Parents Super Visa**:\n\n• **Visitor Visa**: Up to 10-year multiple entry visa (tied to passport validity).\n• **Super Visa for Parents & Grandparents**: Allows stays of up to 5 consecutive years in Canada!\n  - Requires child/grandchild PR or Canadian citizenship proof\n  - Minimum Income threshold (LICO) compliance\n  - Mandatory 1-Year Canadian medical insurance policy.\n\nWe provide full cover-letter structuring and financial documentation review!`;
        suggestions = ['Super Visa Insurance', '🇨🇦 Canada Study Permit', '💬 Chat on WhatsApp', '📅 Schedule Free Visit'];
      }
      // 13. GENERAL TOURIST / VISITOR VISA
      else if (lower.includes('tourist') || lower.includes('visitor') || lower.includes('holiday') || lower.includes('visit') || lower.includes('travel visa')) {
        botReply = `✈️ **Tourist & Visitor Visa Assistance**:\n\nWe provide complete consular filing and documentation for:\n• **Dubai (UAE)** — Express 24-72 hours e-visas (30 & 60 days)\n• **UK** — 6-Month standard visitor visas & family visits\n• **Schengen Europe** — 27 countries with VFS appointment assistance\n• **USA (B1/B2)** & **Canada** (10-Year Multiple Entry & Super Visa)\n• **Singapore & Thailand**\n\nWe arrange day-wise travel itineraries, flight reservations, and hotel vouchers!`;
        suggestions = ['🇦🇪 Dubai Visa (24h)', '🇬🇧 UK Visitor Visa', '🇪🇺 Schengen Europe', '🇨🇦 Canada Visitor Visa', '📅 Schedule Free Visit'];
      }
      // 14. TATKAL PASSPORT
      else if (lower.includes('tatkal')) {
        botReply = `⚡ **Tatkal Express Passport Service**:\n\n• **Speed**: Fast-tracked dispatch within 1 to 3 working days!\n• **Immediate Dispatch**: Dispatched before police verification begins.\n• **Documents Needed (Any 3 of the following)**:\n  1. Aadhaar Card\n  2. Voter ID Card (EPIC)\n  3. PAN Card\n  4. Scheduled Bank Passbook with photo\n  5. 10th Class Passing Certificate\n\nWe handle instant portal filing and urgent slot booking at POPSK Hoshiarpur or PSK Jalandhar!`;
        suggestions = ['Passport Renewal', 'Lost / Damaged Passport', 'Fresh Passport', '💬 Chat on WhatsApp'];
      }
      // 15. PASSPORT RENEWAL / RE-ISSUE
      else if (lower.includes('renew') || lower.includes('expired') || lower.includes('reissue') || lower.includes('re-issue') || lower.includes('pages')) {
        botReply = `🛂 **Passport Renewal & Re-Issue**:\n\n• **When to Apply**:\n  - Expiring within 1 year or already expired within 3 years\n  - Exhausted visa pages (36 or 60 pages booklet)\n  - Address update, addition of spouse name, or correction\n• **Processing Time**: 7 to 14 business days via normal route; 2 to 4 days via Tatkal route.\n• **Core Documents**: Current original passport, self-attested copies, and updated Aadhaar card.`;
        suggestions = ['⚡ Tatkal Passport', 'Fresh Passport', 'Lost / Damaged Passport', '📅 Schedule Free Visit'];
      }
      // 16. FRESH / FIRST-TIME PASSPORT
      else if (lower.includes('fresh') || lower.includes('new passport') || lower.includes('first time passport')) {
        botReply = `🛂 **Fresh / First-Time Passport Application**:\n\n• **Eligibility**: Any Indian citizen (adult or minor).\n• **Core Documents Required**:\n  1. Date of Birth Proof: 10th Marksheet or Municipal Birth Certificate\n  2. Address Proof: Aadhaar Card / Voter ID / Bank Passbook\n  3. ECNR Proof: 10th standard pass certificate\n• **Appointment**: Booked at POPSK Hoshiarpur or Regional PSK Jalandhar.\n\nWe complete the entire Passport Seva portal submission and appointment booking!`;
        suggestions = ['⚡ Tatkal Passport', 'Passport Renewal', '💬 Chat on WhatsApp'];
      }
      // 17. LOST / DAMAGED PASSPORT
      else if (lower.includes('lost') || lower.includes('damaged') || lower.includes('missing passport') || lower.includes('fir')) {
        botReply = `📋 **Lost or Damaged Passport Assistance**:\n\n• **If Lost**: File an online police report / Non-Traceable Certificate immediately. We draft the required notarized affidavit (Annexure L / F) and prepare the duplicate passport dossier.\n• **If Damaged**: We assess the extent of damage (partially damaged with legible number/photo vs damaged beyond recognition) and process an expedited replacement appointment.`;
        suggestions = ['⚡ Tatkal Passport', 'Passport Renewal', '💬 WhatsApp Advisor'];
      }
      // 18. GENERAL PASSPORT
      else if (lower.includes('passport') || lower.includes('psk') || lower.includes('popsk')) {
        botReply = `🛂 **Passport Seva Assistance (Hoshiarpur & Jalandhar)**:\n\nWe handle all Ministry of External Affairs passport requirements:\n• **Fresh Passport** (Adult & Minor)\n• **Passport Renewal / Re-issue** (Expiring or exhausted pages)\n• **Tatkal Express Route** (Priority dispatch in 1-3 business days)\n• **Name, Address & Marital Status Corrections**\n• **Lost & Damaged Passport affidavits**\n\nAll appointments scheduled at POPSK Hoshiarpur or PSK Jalandhar!`;
        suggestions = ['⚡ Tatkal Express', 'Passport Renewal', 'Fresh Passport', '📅 Schedule Free Visit'];
      }
      // 19. FLIGHT / TICKETING / BAGGAGE
      else if (lower.includes('flight') || lower.includes('ticket') || lower.includes('fare') || lower.includes('airline') || lower.includes('baggage') || lower.includes('luggage')) {
        botReply = `🎫 **Flight Bookings & Student Baggage Privileges**:\n\n• **Special Student Allowances**: Up to 40kg to 46kg checked-in luggage (2 pieces of 23kg each) on select student fares across Air India, Emirates, Qatar Airways, Air Canada, British Airways, and Lufthansa.\n• **Negotiated Fares**: Direct GDS desk with discounted tariffs for Canada, UK, Australia, USA, and Europe.\n• **Transit Guidance**: Free transit visa checks for European or Middle-East layovers.`;
        suggestions = ['Student Baggage (46kg)', 'Group Flight Fares', 'Travel Insurance (€30k)', '💬 Chat on WhatsApp'];
      }
      // 20. INSURANCE / MEDICAL
      else if (lower.includes('insurance') || lower.includes('medical') || lower.includes('health cover')) {
        botReply = `🛡️ **International Travel & Medical Insurance**:\n\n• **Mandatory Requirement**: Mandatory for Schengen visas (minimum €30,000 coverage) and highly recommended for students and visitor visa holders.\n• **Coverage Includes**: Emergency hospitalization ($50,000 to $500,000 USD), COVID-19 treatment, flight cancellation, and lost baggage/passport.\n• **Instant Issue**: Same-day official insurance policy certificates delivered to your email/WhatsApp.`;
        suggestions = ['Forex Multi-Currency Card', '✈️ Schengen Visa', '💬 Chat on WhatsApp'];
      }
      // 21. FOREX / CURRENCY / TUITION REMITTANCE
      else if (lower.includes('forex') || lower.includes('currency') || lower.includes('exchange') || lower.includes('remittance') || lower.includes('card')) {
        botReply = `💳 **Forex Cards & Tuition Remittance**:\n\n• **Multi-Currency Travel Cards**: Zero-markup chip-and-pin travel cards loaded with USD, CAD, GBP, EUR, or AUD.\n• **Tuition Fee Remittance**: Fast, secure international university wire transfers under RBI's Liberalised Remittance Scheme (LRS).\n• **Security**: Bank-grade security with instant PIN lock via mobile app.`;
        suggestions = ['Travel Insurance', '🎓 Study Visa Guide', '💬 Chat on WhatsApp'];
      }
      // 22. ATTESTATION / APOSTILLE
      else if (lower.includes('attestation') || lower.includes('apostille') || lower.includes('mea') || lower.includes('hrd') || lower.includes('translation')) {
        botReply = `📑 **Document Attestation & MEA Apostille**:\n\n• **MEA Apostille**: Official Ministry of External Affairs apostille sticker for Hague Convention countries (USA, UK, Australia, Germany, etc.).\n• **HRD State Attestation**: Education department authentication for university degrees, diplomas, and marksheets.\n• **Certified Translations**: Official Punjabi and Hindi certificate translations into English.`;
        suggestions = ['Passport Seva', '🎓 Study Visa Guide', '💬 Chat on WhatsApp'];
      }
      // 23. REFUSAL OVERTURN / CAIPS / GCMS
      else if (lower.includes('refusal') || lower.includes('reject') || lower.includes('denied') || lower.includes('gcms') || lower.includes('caips')) {
        botReply = `🔄 **Previous Visa Refusal Overturn & CAIPS/GCMS Notes**:\n\n• **Don't give up!** A past refusal is not the end of your global journey.\n• **Our Proven Method**:\n  1. **Free Case Review**: We examine your official refusal letter at no charge.\n  2. **CAIPS / GCMS Notes**: For Canada, we order internal visa officer notes directly from IRCC.\n  3. **Root Cause Rectification**: We address specific concerns (home ties, course justification, finances).\n  4. **Airtight Re-filing**: Restructured SOP and documentation to overturn the refusal.`;
        suggestions = ['Review Refusal Free', '🇨🇦 Canada Study Permit', '💬 Chat on WhatsApp', '📅 Schedule Free Visit'];
      }
      // 24. OFFICE / ADDRESS / LOCATION / HOURS
      else if (lower.includes('address') || lower.includes('location') || lower.includes('hoshiarpur') || lower.includes('where') || lower.includes('office') || lower.includes('timing') || lower.includes('hours') || lower.includes('routing')) {
        const currentRouting = getWhatsAppRoutingDetails();
        botReply = `📍 **AIMS Consultancy Office & WhatsApp Routing**:\n\n• **Location**: Court Road, Opposite District Courts, Hoshiarpur, Punjab, India - 146001\n• **Office Working Hours**: Monday to Saturday: 9:00 AM – 6:00 PM IST (Sunday Closed)\n\n📲 **Automatic WhatsApp Message Routing**:\n• **Working Hours (Mon-Sat 9AM-6PM)**: Delivered to **+91 91933 19128** (Office Desk)\n• **Close Time / Sundays**: Delivered to **+91 95927 47000** (Duty / After-Hours Desk)\n• **Current Live Status**: ${currentRouting.isOpen ? '🟢 Office Open' : '🌙 Office Closed'} — Messages currently route to **${currentRouting.formattedNumber}**.\n\nAll consultations and profile evaluations are 100% Free!`;
        suggestions = ['Open in Google Maps', '💬 WhatsApp Active Desk', '📅 Schedule Free Visit'];
      }
      // 25. CONTACT / PHONE / WHATSAPP / CALL
      else if (lower.includes('contact') || lower.includes('phone') || lower.includes('call') || lower.includes('whatsapp') || lower.includes('number') || lower.includes('email')) {
        const currentRouting = getWhatsAppRoutingDetails();
        botReply = `📞 **Connect With AIMS Consultancy**:\n\n• **Active WhatsApp Desk**: ${currentRouting.formattedNumber} (${currentRouting.deskLabel})\n• **Routing Policy**:\n  - Working Hours (Mon–Sat 9AM–6PM IST): **+91 91933 19128**\n  - Close Time & Sundays: **+91 95927 47000**\n• **Official Email**: info@aimsconsultancy.in\n• **Office Address**: Court Road, Opposite District Courts, Hoshiarpur, Punjab\n\nWe provide free, prompt guidance on all visa and travel queries!`;
        suggestions = ['💬 Chat on WhatsApp', '📅 Schedule Free Visit', 'Open in Google Maps'];
      }
      // 26. BOOKING / APPOINTMENT / SCHEDULE
      else if (lower.includes('book') || lower.includes('appointment') || lower.includes('schedule') || lower.includes('slot') || lower.includes('consultation')) {
        botReply = `📅 **Schedule Your Free Consultation (Zero Charges)**:\n\nOur senior visa and travel advisors in Hoshiarpur are ready to guide you at zero cost!\n• You can reserve your preferred date and time in our interactive Booking Console (100% Free, no payment required).\n• Or walk into our office on Court Road (Opposite District Courts) anytime between 9:00 AM and 6:00 PM, Monday through Saturday.`;
        suggestions = ['Open Booking Console', '📍 Office Address', '💬 Chat on WhatsApp'];
      }
      // 27. DEFAULT INFORMATIVE FALLBACK
      else {
        botReply = `Thank you for contacting **AIMS Consultancy**! Our assistant interaction, profile eligibility evaluations, and document checklists are **100% Free** with no obligation.\n\nWe specialize in:\n• **Study Visas**: Canada (SDS/PAL), UK (CAS/PSW), Australia (Subclass 500), USA (F-1), Europe (Germany Blocked Account)\n• **Tourist & Visitor Visas**: Dubai (24-72h), UK, Schengen Europe, USA, Canada\n• **Passport Seva**: New Passports, Renewals, Tatkal Express (1-3 days), Lost/Damaged\n• **Travel & Ticketing**: Flight bookings with student baggage (40-46kg), Travel Insurance, Forex & Attestation\n\nWhat service can I guide you with today?`;
        suggestions = ['🎓 Study Visa Guide', '✈️ Tourist Visas', '⚡ Tatkal Passport', '🎫 Student Baggage (46kg)', '📅 Schedule Free Visit'];
      }

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: suggestions,
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 380);
  };

  const handleQuickReply = (reply: string) => {
    if (reply.includes('Book') || reply.includes('Console') || reply.includes('Schedule')) {
      setIsOpen(false);
      onOpenBooking();
      return;
    }
    if (reply.includes('WhatsApp') || reply.includes('Chat on WhatsApp') || reply.includes('Active Desk')) {
      const currentRouting = getWhatsAppRoutingDetails();
      const payload = `Hello AIMS Consultancy,\n\nI would like to get free guidance regarding visa and travel services.\n\n━━━━━━━━━━━━━━━━━━━━\n📍 *Office Routing Status:*\n• Active Line: ${currentRouting.formattedNumber} (${currentRouting.deskLabel})\n• ${currentRouting.statusDetail}\n• Dispatched at: ${currentRouting.currentIstTime}`;
      const url = getWhatsAppDeliveryUrl(payload);
      window.open(url, '_blank');
      return;
    }
    if (reply.includes('Google Maps') || reply.includes('Maps')) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('AIMS Consultancy Court Road Opposite District Courts Hoshiarpur Punjab')}`,
        '_blank'
      );
      return;
    }
    handleSend(reply);
  };

  // Quick categories bar for instant topic selection
  const TOPIC_CHIPS = [
    { label: '🎓 Study Visa', query: 'What study visa options do you offer for Canada, UK, and Australia?' },
    { label: '✈️ Tourist Visa', query: 'What tourist and visitor visas do you offer for Dubai, UK, and Schengen?' },
    { label: '⚡ Tatkal Passport', query: 'What are the Tatkal express passport requirements and timeline?' },
    { label: '🎫 Flight Baggage', query: 'What special student flight fares and baggage allowances do you have?' },
    { label: '🛡️ Travel Insurance', query: 'Tell me about international travel insurance and Forex cards' },
    { label: '🔄 Visa Refusal', query: 'How do you handle visa refusals and CAIPS/GCMS notes?' },
    { label: '📍 Office Location', query: 'Where is your office in Hoshiarpur and what are the working hours?' },
    { label: '💡 Is this Free?', query: 'Is this assistant and consultation completely free?' },
  ];

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <button
        id="aims-virtual-agent-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Virtual Assistant"
        className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-full shadow-2xl border border-emerald-400/40 flex items-center gap-2.5 transition-all hover:scale-105 cursor-pointer group shadow-emerald-950/80"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 absolute -top-1 -right-1 border-2 border-[#060f0c] animate-pulse" />
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-xs font-bold leading-tight">AIMS AI Assistant</div>
          <div className="text-[10px] text-emerald-200 font-semibold leading-tight">100% Free Advisory</div>
        </div>
        <span className="text-xs font-bold sm:hidden">AIMS Assistant (Free)</span>
      </button>

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div 
          id="aims-chat-window-modal"
          className="fixed bottom-20 right-3 sm:right-6 z-50 w-[380px] sm:w-[420px] max-w-[calc(100vw-24px)] h-[580px] max-h-[calc(100vh-100px)] bg-[#091712] rounded-2xl shadow-2xl border border-emerald-950/90 flex flex-col overflow-hidden animate-fadeIn backdrop-blur-2xl"
        >
          {/* Header */}
          <div className="bg-[#06110d] p-3 sm:p-3.5 text-white flex items-center justify-between border-b border-emerald-950 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-950/60">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h4 className="text-sm font-bold font-display text-white">
                    AIMS Assistant
                  </h4>
                  <span className="px-1.5 py-0.5 bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 rounded text-[9px] font-bold">
                    100% Free
                  </span>
                  <span 
                    title={`Routing: Mon-Sat 9AM-6PM IST to 91933-19128; Off-hours to 95927-47000. Current: ${routing.deskLabel}`}
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold border ${
                      routing.isOpen 
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60' 
                        : 'bg-amber-950/80 text-amber-300 border-amber-800/60'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${routing.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                    {routing.isOpen ? 'Office: 91933-19128' : 'After-Hours: 95927-47000'}
                  </span>
                </div>
                <p className="text-[10px] text-emerald-200/70">
                  Mon–Sat 9AM–6PM IST → 91933-19128 | Close/Sun → 95927-47000
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={deliverConversationToWhatsApp}
                title={`Send Chat to WhatsApp (${routing.formattedNumber})`}
                className="p-1.5 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-600/30 transition-colors cursor-pointer flex items-center gap-1"
                aria-label="Send Chat to WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#0c221a] transition-colors cursor-pointer"
                aria-label="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Category Chips Bar */}
          <div className="bg-[#06110d]/90 px-3 py-2 border-b border-emerald-950 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
            {TOPIC_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip.query)}
                className="shrink-0 px-2.5 py-1 bg-[#091712] hover:bg-[#0e261d] text-emerald-200/90 hover:text-white border border-emerald-900/60 hover:border-emerald-700/60 rounded-full text-[11px] font-medium transition-colors cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 bg-[#060f0c]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-br-none shadow-md'
                      : 'bg-[#091712] text-slate-200 border border-emerald-950/90 rounded-bl-none shadow-md'
                  }`}
                >
                  <FormattedMessage text={m.text} />

                  {/* Option to forward this assistant response directly to active WhatsApp number */}
                  {m.sender === 'bot' && m.id !== 'm1' && (
                    <div className="mt-2.5 pt-2 border-t border-emerald-950 flex items-center justify-between">
                      <button
                        onClick={() => deliverMessageToWhatsApp(m.text)}
                        className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer"
                        title={`Deliver this answer to WhatsApp (${routing.formattedNumber})`}
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>Deliver to WhatsApp ({routing.isOpen ? 'Office Desk' : 'After-Hours'})</span>
                      </button>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-slate-500 mt-1 px-1">{m.time}</span>

                {/* Quick Reply Chips */}
                {m.quickReplies && m.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {m.quickReplies.map((reply, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickReply(reply)}
                        className="px-2.5 py-1 bg-[#091712] hover:bg-[#0e261d] text-emerald-300 hover:text-emerald-200 border border-emerald-900/60 hover:border-emerald-700/60 text-[11px] font-semibold rounded-full transition-colors cursor-pointer shadow-xs"
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

          {/* Direct Action Bar */}
          <div className="px-3 py-1.5 bg-[#06110d] border-t border-emerald-950 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[10px] sm:text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Free Advisory</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking();
                }}
                className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                <Calendar className="w-3 h-3" />
                <span>Book Visit</span>
              </button>
              <button
                onClick={() => {
                  const currentRouting = getWhatsAppRoutingDetails();
                  const payload = `Hello AIMS Consultancy,\n\nI am reaching out via your AIMS Virtual Assistant for free visa guidance.\n\n━━━━━━━━━━━━━━━━━━━━\n📍 *Delivered to:* ${currentRouting.formattedNumber} (${currentRouting.deskLabel})\n• ${currentRouting.statusDetail}\n• Dispatched at: ${currentRouting.currentIstTime}`;
                  window.open(getWhatsAppDeliveryUrl(payload), '_blank');
                }}
                title={`Chat with ${routing.deskLabel} (${routing.formattedNumber})`}
                className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp ({routing.isOpen ? '91933' : '95927'})</span>
              </button>
            </div>
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputVal);
            }}
            className="p-3 bg-[#06110d] border-t border-emerald-950 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              placeholder="Ask anything about study visas, passport, flights (Free)..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-[#091712] border border-emerald-900/80 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {inputVal.trim() && (
              <button
                type="button"
                onClick={deliverCurrentInputToWhatsApp}
                title={`Send directly to WhatsApp (${routing.formattedNumber})`}
                className="p-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl transition-all shadow-md shadow-emerald-950/80 cursor-pointer"
                aria-label="Send directly to WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              disabled={!inputVal.trim()}
              aria-label="Send message"
              className="p-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 disabled:opacity-40 text-white rounded-xl transition-all shadow-md shadow-emerald-950/80 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
