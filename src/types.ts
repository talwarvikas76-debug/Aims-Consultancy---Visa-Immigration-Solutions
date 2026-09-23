export type ServiceCategory = 'visa' | 'passport' | 'ticketing' | 'holiday' | 'additional';

export type Language = 'en' | 'pa' | 'hi';

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

export interface ComparisonCountry {
  id: string;
  name: string;
  flag: string;
  region: string;
  processingTime: string;
  postStudyWork: string;
  averageTuition: string;
  minLivingFunds: string;
  prPathway: string;
  spouseWorkRights: string;
  workHoursPerWeek: string;
  keyIntakes: string;
  ieltsRequirement: string;
  visaSuccessRate: string;
  highlights: string[];
}

export interface ApplicationMilestone {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  stageNumber: number;
}

export interface ApplicationDocument {
  id: string;
  name: string;
  category: string;
  status: 'verified' | 'under_review' | 'action_required' | 'not_uploaded';
  updatedAt: string;
  fileSize?: string;
}

export interface ApplicationTrackRecord {
  refId: string;
  applicantName: string;
  destination: string;
  flag: string;
  visaType: string;
  submissionDate: string;
  expectedDecision: string;
  currentStage: string;
  stageProgress: number; // 0 to 100
  officerRemarks: string;
  milestones: ApplicationMilestone[];
  documents: ApplicationDocument[];
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
