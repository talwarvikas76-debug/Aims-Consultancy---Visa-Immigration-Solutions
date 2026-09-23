import { Language } from '../types';

export interface TranslationDictionary {
  brandName: string;
  brandTagline: string;
  navHome: string;
  navServices: string;
  navVisaOptions: string;
  navAboutUs: string;
  navResources: string;
  navTracker: string;
  navComparison: string;
  navContact: string;
  getFreeAssessment: string;
  
  heroHeadlinePrefix: string;
  heroHeadlineHighlight: string;
  heroSubtitle: string;
  btnStartAssessment: string;
  btnContactExpert: string;
  
  cardTitle: string;
  whereToGo: string;
  visaType: string;
  ageLabel: string;
  experienceLabel: string;
  btnAssessEligibility: string;
  
  whyChooseAimsTitle: string;
  whyChooseAimsSubtitle: string;
  card1Title: string;
  card1Desc: string;
  card2Title: string;
  card2Desc: string;
  card3Title: string;
  card3Desc: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    brandName: 'AIMS',
    brandTagline: 'Visa & Immigration Consultancy',
    navHome: 'Home',
    navServices: 'Our Services',
    navVisaOptions: 'Visa Options',
    navAboutUs: 'About Us',
    navResources: 'Resources',
    navTracker: 'Application Tracker',
    navComparison: 'Country Comparison',
    navContact: 'Contact Us',
    getFreeAssessment: 'Get a Free Assessment',
    
    heroHeadlinePrefix: 'Achieve Your Global Dreams with ',
    heroHeadlineHighlight: 'Expert Visa Solutions',
    heroSubtitle: 'Simplify your immigration journey with AIMS. Assess your eligibility, explore options, and get personalized guidance today.',
    btnStartAssessment: 'Start Your Assessment',
    btnContactExpert: 'Contact an Expert',
    
    cardTitle: 'Check Your Eligibility',
    whereToGo: 'Where do you want to go?',
    visaType: 'Visa Type?',
    ageLabel: 'Age',
    experienceLabel: 'Experience',
    btnAssessEligibility: 'Assess My Eligibility Now',
    
    whyChooseAimsTitle: 'Why Choose AIMS?',
    whyChooseAimsSubtitle: 'Punjab’s trusted overseas education, travel, and legal visa documentation specialists.',
    card1Title: 'High Visa Success Rate',
    card1Desc: '99.2% approval track record backed by rigorous consular file preparation and pre-screening.',
    card2Title: 'End-to-End File Continuity',
    card2Desc: 'From university admissions, GIC/financial proof, to flight bookings and airport transit support.',
    card3Title: 'Refusal Case Resolution',
    card3Desc: 'Specialized IRCC CAIPS/GCMS note analysis and documentation restructuring for previous rejection files.',
  },
  pa: {
    brandName: 'AIMS',
    brandTagline: 'ਵੀਜ਼ਾ ਅਤੇ ਇਮੀਗ੍ਰੇਸ਼ਨ ਕੰਸਲਟੈਂਸੀ',
    navHome: 'ਮੁੱਖ ਪੰਨਾ',
    navServices: 'ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ',
    navVisaOptions: 'ਵੀਜ਼ਾ ਵਿਕਲਪ',
    navAboutUs: 'ਸਾਡੇ ਬਾਰੇ',
    navResources: 'ਸਰੋਤ',
    navTracker: 'ਐਪਲੀਕੇਸ਼ਨ ਟਰੈਕਰ',
    navComparison: 'ਦੇਸ਼ ਤੁਲਨਾ',
    navContact: 'ਸੰਪਰਕ ਕਰੋ',
    getFreeAssessment: 'ਮੁਫਤ ਮੁਲਾਂਕਣ ਲਓ',
    
    heroHeadlinePrefix: 'ਮਾਹਰ ਵੀਜ਼ਾ ਹੱਲਾਂ ਨਾਲ ਪੂਰੇ ਕਰੋ ਆਪਣੇ ',
    heroHeadlineHighlight: 'ਵਿਦੇਸ਼ੀ ਸੁਪਨੇ',
    heroSubtitle: 'AIMS ਨਾਲ ਆਪਣੀ ਇਮੀਗ੍ਰੇਸ਼ਨ ਯਾਤਰਾ ਨੂੰ ਆਸਾਨ ਬਣਾਓ। ਆਪਣੀ ਯੋਗਤਾ ਜਾਂਚੋ ਅਤੇ ਅੱਜ ਹੀ ਵਿਅਕਤੀਗਤ ਸਲਾਹ ਲਵੋ।',
    btnStartAssessment: 'ਆਪਣਾ ਮੁਲਾਂਕਣ ਸ਼ੁਰੂ ਕਰੋ',
    btnContactExpert: 'ਮਾਹਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
    
    cardTitle: 'ਆਪਣੀ ਯੋਗਤਾ ਜਾਂਚੋ',
    whereToGo: 'ਤੁਸੀਂ ਕਿਸ ਦੇਸ਼ ਜਾਣਾ ਚਾਹੁੰਦੇ ਹੋ?',
    visaType: 'ਵੀਜ਼ਾ ਦੀ ਕਿਸਮ?',
    ageLabel: 'ਉਮਰ',
    experienceLabel: 'ਤਜਰਬਾ',
    btnAssessEligibility: 'ਹੁਣੇ ਯੋਗਤਾ ਦਾ ਮੁਲਾਂਕਣ ਕਰੋ',
    
    whyChooseAimsTitle: 'AIMS ਨੂੰ ਕਿਉਂ ਚੁਣੋ?',
    whyChooseAimsSubtitle: 'ਪੰਜਾਬ ਦੇ ਭਰੋਸੇਮੰਦ ਵਿਦੇਸ਼ੀ ਸਿੱਖਿਆ, ਯਾਤਰਾ ਅਤੇ ਕਾਨੂੰਨੀ ਵੀਜ਼ਾ ਦਸਤਾਵੇਜ਼ੀਕਰਨ ਮਾਹਿਰ।',
    card1Title: 'ਉੱਚ ਵੀਜ਼ਾ ਸਫਲਤਾ ਦਰ',
    card1Desc: '99.2% ਵੀਜ਼ਾ ਮਨਜ਼ੂਰੀ ਦਰ, ਪੂਰੀ ਕਾਨੂੰਨੀ ਅਤੇ ਦਸਤਾਵੇਜ਼ੀ ਤਿਆਰੀ ਨਾਲ।',
    card2Title: 'ਸ਼ੁਰੂ ਤੋਂ ਅੰਤ ਤੱਕ ਪੂਰੀ ਸਹਾਇਤਾ',
    card2Desc: 'ਕਾਲਜ ਦਾਖਲੇ, ਜੀ.ਆਈ.ਸੀ ਖਾਤੇ ਤੋਂ ਲੈ ਕੇ ਹਵਾਈ ਟਿਕਟਾਂ ਅਤੇ ਏਅਰਪੋਰਟ ਟ੍ਰਾਂਜ਼ਿਟ ਤੱਕ।',
    card3Title: 'ਰਿਫਿਊਜ਼ਲ ਕੇਸਾਂ ਦਾ ਹੱਲ',
    card3Desc: 'ਪੁਰਾਣੇ ਰੱਦ ਹੋਏ ਕੇਸਾਂ ਲਈ ਵਿਸ਼ੇਸ਼ CAIPS/GCMS ਨੋਟ ਵਿਸ਼ਲੇਸ਼ਣ ਅਤੇ ਮੁੜ ਫਾਈਲਿੰਗ।',
  },
  hi: {
    brandName: 'AIMS',
    brandTagline: 'वीज़ा और इमिग्रेशन कंसल्टेंसी',
    navHome: 'होम',
    navServices: 'हमारी सेवाएं',
    navVisaOptions: 'वीज़ा विकल्प',
    navAboutUs: 'हमारे बारे में',
    navResources: 'संसाधन',
    navTracker: 'एप्लिकेशन ट्रैकर',
    navComparison: 'देश तुलना',
    navContact: 'संपर्क करें',
    getFreeAssessment: 'मुफ्त मूल्यांकन प्राप्त करें',
    
    heroHeadlinePrefix: 'विशेषज्ञ वीज़ा समाधानों के साथ साकार करें अपने ',
    heroHeadlineHighlight: 'ग्लोबल सपने',
    heroSubtitle: 'AIMS के साथ अपनी इमिग्रेशन यात्रा को आसान बनाएं। अपनी पात्रता जांचें और आज ही व्यक्तिगत मार्गदर्शन प्राप्त करें।',
    btnStartAssessment: 'मूल्यांकन शुरू करें',
    btnContactExpert: 'विशेषज्ञ से संपर्क करें',
    
    cardTitle: 'अपनी पात्रता जांचें',
    whereToGo: 'आप किस देश जाना चाहते हैं?',
    visaType: 'वीज़ा प्रकार?',
    ageLabel: 'आयु',
    experienceLabel: 'अनुभव',
    btnAssessEligibility: 'अब अपनी पात्रता जांचें',
    
    whyChooseAimsTitle: 'AIMS को क्यों चुनें?',
    whyChooseAimsSubtitle: 'पंजाब के विश्वसनीय विदेशी शिक्षा, यात्रा और कानूनी वीज़ा दस्तावेज़ीकरण विशेषज्ञ।',
    card1Title: 'उच्च वीज़ा सफलता दर',
    card1Desc: '99.2% वीज़ा स्वीकृति दर, कठोर दस्तावेज़ जांच और प्री-स्क्रीनिंग के साथ।',
    card2Title: 'शुरू से अंत तक पूर्ण सहायता',
    card2Desc: 'यूनिवर्सिटी एडमिशन, जीआईसी/फंड प्रूफ से लेकर एयर टिकटिंग और ट्रांजिट तक।',
    card3Title: 'रिफ्यूज़ल केस का समाधान',
    card3Desc: 'पुराने रिजेक्टेड मामलों के लिए विशेष CAIPS/GCMS नोट विश्लेषण और री-फाइलिंग।',
  },
};
