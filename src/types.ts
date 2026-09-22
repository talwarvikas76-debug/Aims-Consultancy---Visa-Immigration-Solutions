export type ServiceCategory = 'visa' | 'passport' | 'ticketing' | 'holiday' | 'additional';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  badge?: string;
  features: string[];
  timeline?: string;
  category: ServiceCategory;
  recommendedFor?: string;
  imageUrl?: string;
  hiddenDetails?: {
    requirements: string[];
    documentation: string[];
    expertTip?: string;
    faq?: string;
  };
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  flag: string;
  description: string;
  popularVisas: string[];
  processingTime: string;
  intakesOrSeason: string;
  highlights: string[];
  imageUrl?: string;
  hiddenDetails?: {
    topUniversitiesOrSpots?: string[];
    financialRequirement?: string;
    workRights?: string;
    pathwayNotes?: string;
  };
}

export interface BookingFormData {
  fullName: string;
  mobile: string;
  email: string;
  visaType: string;
  destination: string;
  education: string;
  gpaOrScore: string;
  date: string;
  timeSlot: string;
  notes: string;
  upiTxnId?: string;
  bookingRef?: string;
  bookedAt?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  visaType: string;
  rating: number;
  quote: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'visa' | 'passport' | 'payment';
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  quickReplies?: string[];
}
