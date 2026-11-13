export interface TakhtDetail {
  id: string;
  name: string;
  punjabiName: string;
  location: string;
  state: string;
  significance: string;
  historicalEra: string;
  keyRelicsAndHighlights: string[];
  fiveStarHotel: {
    name: string;
    roomType: string;
    features: string[];
  };
  transitNote: string;
  imageUrl: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  takhtOrCity: string;
  highlights: string[];
  morning: string;
  afternoon: string;
  evening: string;
  overnightStay: string;
  mealsIncluded: string;
}

export interface LuxuryInclusion {
  iconName: string;
  title: string;
  subtitle: string;
  description: string;
  bulletPoints: string[];
}

export interface PricingTier {
  id: string;
  title: string;
  tagline: string;
  inrPrice: string;
  usdPrice: string;
  cadPrice: string;
  gbpPrice: string;
  badge?: string;
  isPopular?: boolean;
  features: string[];
  idealFor: string;
}

export const PANJ_TAKHT_DATA: {
  packageTitle: string;
  punjabiTitle: string;
  subtitle: string;
  duration: string;
  takhtsCount: number;
  circuitSummary: string;
  takhts: TakhtDetail[];
  itinerary: ItineraryDay[];
  luxuryPillars: LuxuryInclusion[];
  pricingTiers: PricingTier[];
  faqs: { question: string; answer: string }[];
} = {
  packageTitle: 'Exclusive 5-Star Panj Takht Sahib Spiritual Pilgrimage',
  punjabiTitle: 'ਪੰਜ ਤਖ਼ਤ ਸਾਹਿਬਾਨ ਅਲੌਕਿਕ ਦਰਸ਼ਨ ਯਾਤਰਾ (੫ ਸਿਤਾਰਾ ਵਿਸ਼ੇਸ਼ ਪੈਕੇਜ)',
  subtitle: 'A spiritually enriching, royal pilgrimage across all Five Sacred Sikh Takhts in Punjab, Bihar & Maharashtra with 5-star hospitality, seamless aviation, and dedicated senior citizen care.',
  duration: '10 Days / 9 Nights',
  takhtsCount: 5,
  circuitSummary: 'Amritsar (Akal Takht) → Anandpur Sahib (Keshgarh Sahib) → Talwandi Sabo (Damdama Sahib) → Patna Sahib (Bihar) → Sachkhand Hazur Sahib (Nanded, Maharashtra)',
  
  takhts: [
    {
      id: 'akal-takht',
      name: 'Sri Akal Takht Sahib',
      punjabiName: 'ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ',
      location: 'Amritsar',
      state: 'Punjab',
      significance: 'The Throne of the Timeless One. The supreme temporal seat of spiritual and political sovereignty of the Khalsa Panth, founded by the 6th Guru, Sri Guru Hargobind Sahib Ji in 1606 facing Sri Harmandir Sahib.',
      historicalEra: '1606 CE (Guru Hargobind Sahib Ji)',
      keyRelicsAndHighlights: [
        'Facing Sri Harmandir Sahib (The Golden Temple)',
        'Amrit Vela (Dawn) Palki Sahib Seva & Holy Parkash',
        'Sacred historical weapons (Shastars) Darshan in evening',
        'Holy Sarovar Snan & Guru Ka Langar Seva'
      ],
      fiveStarHotel: {
        name: 'Taj Swarna / Hyatt Regency Amritsar',
        roomType: 'Luxury King Suite / Club Room',
        features: ['Complimentary breakfast spread', 'Chauffeured pickup from Sri Guru Ram Dass Jee International Airport', '24/7 in-room dining & wellness spa']
      },
      transitNote: 'Direct VIP arrival transfers exclusively in luxury Toyota Innova Hycross / Innova Crysta.',
      imageUrl: '/takht-akal-sahib.jpg'
    },
    {
      id: 'keshgarh-sahib',
      name: 'Takht Sri Keshgarh Sahib',
      punjabiName: 'ਤਖ਼ਤ ਸ੍ਰੀ ਕੇਸਗੜ੍ਹ ਸਾਹਿਬ',
      location: 'Sri Anandpur Sahib',
      state: 'Punjab',
      significance: 'The Blessed Birthplace of the Khalsa. Here on Vaisakhi 1699, the 10th Master Sri Guru Gobind Singh Ji initiated the Panj Pyare and founded the Order of the Khalsa atop the hill of Anandpur Sahib.',
      historicalEra: '1699 CE (Guru Gobind Singh Ji)',
      keyRelicsAndHighlights: [
        'Original sacred weapons (Khanda of Amrit Sanchar, Nagni Barchha, Katar)',
        'Virasat-e-Khalsa world-class experiential museum',
        'Gurdwara Sis Ganj Sahib (Sacred martyred head of Guru Tegh Bahadur Ji)',
        'Gurdwara Anandgarh Sahib fort ramparts'
      ],
      fiveStarHotel: {
        name: 'The Kikar Lodge Luxury Forest Resort / Anand at the Satluj',
        roomType: 'Heritage Forest Villa / Luxury Suite',
        features: ['Serene natural estate setting', 'Satvik gourmet dining tailored for spiritual pilgrims', 'Private veranda & lush green retreat']
      },
      transitNote: 'Scenic chauffeur-driven journey across Doaba & Hoshiarpur exclusively in Toyota Innova Hycross / Innova Crysta.',
      imageUrl: '/takht-keshgarh-sahib.jpg'
    },
    {
      id: 'damdama-sahib',
      name: 'Takht Sri Damdama Sahib',
      punjabiName: 'ਤਖ਼ਤ ਸ੍ਰੀ ਦਮਦਮਾ ਸਾਹਿਬ (ਗੁਰੂ ਕੀ ਕਾਸ਼ੀ)',
      location: 'Talwandi Sabo (Bathinda)',
      state: 'Punjab',
      significance: 'Known as Guru Ki Kashi (The Seat of Higher Learning). Sri Guru Gobind Singh Ji blessed this sanctuary, dictated the complete Sri Guru Granth Sahib Ji (Damdami Bir), and sanctified pens for eternal knowledge.',
      historicalEra: '1705 CE (Guru Gobind Singh Ji)',
      keyRelicsAndHighlights: [
        'Gurdwara Damdama Sahib main sanctum and Bhora Sahib',
        'Gurdwara Likhansar Sahib (The sacred pond of holy pens & learning)',
        'Gurdwara Jandsar Sahib and Guru Gobind Singh Ji’s historical seal',
        'Tranquil spiritual ambiance untouched by commercial rush'
      ],
      fiveStarHotel: {
        name: 'Country Inn & Suites / Luxury Executive Suite Bathinda',
        roomType: 'Executive Suite',
        features: ['Modern luxury comforts & deep hygiene protocols', 'Fresh satvik vegetarian dining', 'Personalized concierge care']
      },
      transitNote: 'Surface pilgrimage travel exclusively in chauffeur-driven Toyota Innova Hycross / Innova Crysta.',
      imageUrl: '/takht-damdama-sahib.jpg'
    },
    {
      id: 'patna-sahib',
      name: 'Takht Sri Patna Sahib',
      punjabiName: 'ਤਖ਼ਤ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਜੀ ਪਟਨਾ ਸਾਹਿਬ',
      location: 'Patna',
      state: 'Bihar',
      significance: 'The Holy Birthplace (Janam Sthan) of Sri Guru Gobind Singh Ji Maharaj (1666). Situated on the sacred banks of the Ganges, honoring the divine advent of the Sarbans Dani.',
      historicalEra: '1666 CE (Janam Sthan)',
      keyRelicsAndHighlights: [
        'Sacred Golden Cradle (Panghura Sahib) of the Tenth Guru’s childhood',
        'Small Saif (Sword) and divine arrows preserved with devotion',
        'Gurdwara Baal Leela (Maini Sangat) and Gurdwara Handi Sahib',
        'Guru Ka Bagh & historic Ganges riverside ghats'
      ],
      fiveStarHotel: {
        name: 'Taj City Centre / Hotel Maurya, Patna',
        roomType: 'Taj Club Room / Deluxe Executive Suite',
        features: ['5-Star hospitality with dedicated airport transfer', 'Personal butler service & tailored vegetarian cuisine', 'Express check-in and check-out']
      },
      transitNote: 'Executive flight from Punjab to Patna + dedicated Toyota Innova Hycross / Crysta on-ground.',
      imageUrl: '/takht-patna-sahib.jpg'
    },
    {
      id: 'hazur-sahib',
      name: 'Takht Sri Hazur Sahib',
      punjabiName: 'ਤਖ਼ਤ ਸ੍ਰੀ ਹਜ਼ੂਰ ਅਬਚਲਨਗਰ ਸਾਹਿਬ (ਸੱਚਖੰਡ)',
      location: 'Nanded',
      state: 'Maharashtra',
      significance: 'Sachkhand Sri Hazur Abchalnagar Sahib. The sanctified place where Guru Gobind Singh Ji spent his final earthly days and conferred eternal Guruship upon Sri Guru Granth Sahib Ji in 1708.',
      historicalEra: '1708 CE (Eternal Gurugaddi Divas)',
      keyRelicsAndHighlights: [
        'Sachkhand Inner Sanctum Darshan & daily sacred weapon cleansing ceremony',
        'Gurdwara Shikar Ghat, Gurdwara Nanak Pira & Gurdwara Heera Ghat',
        'Gurdwara Banda Ghat (where Baba Banda Singh Bahadur was inspired)',
        'Spectacular Evening Laser & Sound Show detailing Sikh history'
      ],
      fiveStarHotel: {
        name: 'Visawa Palace Heritage / The Fern Residency Luxury Suites',
        roomType: 'Royal Suite / Premium Club',
        features: ['Top-tier luxury amenities in Nanded', 'Spiritual tranquility and direct Gurudwara shuttle', 'Authentic Punjabi & Satvik gourmet menu']
      },
      transitNote: 'Flight connectivity via Nanded / Hyderabad + dedicated Toyota Innova Hycross / Crysta on-ground.',
      imageUrl: '/takht-hazur-sahib.jpg'
    }
  ],

  itinerary: [
    {
      day: 1,
      title: 'Royal Welcome in Amritsar & Evening Harmandir Sahib Darshan',
      takhtOrCity: 'Amritsar (Punjab)',
      highlights: ['VIP airport welcome at ATQ', 'Check-in at Taj Swarna / Hyatt Regency', 'Evening visit to Sri Harmandir Sahib', 'Sukhasan & Palki Sahib Seva Darshan'],
      morning: 'Arrival at Sri Guru Ram Dass Jee International Airport (Amritsar). VIP reception by AIMS Pilgrimage Concierge and private transfer in chauffeur-driven Toyota Innova Hycross / Innova Crysta to Taj Swarna / Hyatt Regency.',
      afternoon: 'Relaxation, high tea, and pilgrimage briefing by our accompanying Sikh Scholar. Light orientation on historical Maryada and journey itinerary.',
      evening: 'Proceed to Sri Harmandir Sahib (Golden Temple). Witness the spiritual serenity of the illuminated Sarovar, listen to live Gurbani Kirtan, and experience the sacred Palki Sahib night procession.',
      overnightStay: 'Taj Swarna / Hyatt Regency Amritsar',
      mealsIncluded: 'Welcome High Tea & 5-Star Gourmet Dinner'
    },
    {
      day: 2,
      title: 'Sri Akal Takht Sahib, Sacred Shastars & Heritage Wonders',
      takhtOrCity: 'Amritsar (Punjab)',
      highlights: ['Amrit Vela Darshan', 'Sri Akal Takht Sahib reverence', 'Guru Ka Langar Seva', 'Wagah Border VIP gallery', 'Sada Pind cultural dinner'],
      morning: 'Optional early morning Amrit Vela Snan and Darshan at Sri Harmandir Sahib. Special family Ardas facilitation at Sri Akal Takht Sahib.',
      afternoon: 'Participate in Guru Ka Langar Seva. Afternoon private excursion to historic Jallianwala Bagh and the restored Partition Museum in your dedicated Toyota Innova Hycross / Crysta.',
      evening: 'VIP seated admission to the ceremonial beating-retreat flag lowering at Wagah Border. Return for royal Punjabi dining at 5-star hotel.',
      overnightStay: 'Taj Swarna / Hyatt Regency Amritsar',
      mealsIncluded: 'Breakfast, Langar Prasad & 5-Star Dinner'
    },
    {
      day: 3,
      title: 'Scenic Luxury Transit to Sri Anandpur Sahib & Takht Sri Keshgarh Sahib',
      takhtOrCity: 'Sri Anandpur Sahib',
      highlights: ['Chauffeured journey through Doaba & Hoshiarpur', 'Virasat-e-Khalsa museum tour', 'Takht Sri Keshgarh Sahib weapon Darshan', 'Stay at The Kikar Lodge'],
      morning: 'Sumptuous breakfast at hotel. Board your dedicated Toyota Innova Hycross / Innova Crysta with plush captain seats for a picturesque drive across Punjab heartland towards Sri Anandpur Sahib.',
      afternoon: 'Check-in at The Kikar Lodge Luxury Resort. Guided private VIP walkthrough of Virasat-e-Khalsa—the world-renowned museum of Sikh heritage and architecture.',
      evening: 'Arrive at Takht Sri Keshgarh Sahib. Pay homage at the birthplace of the Khalsa. Experience the evening Shastar Darshan (the divine weapons of Guru Gobind Singh Ji).',
      overnightStay: 'The Kikar Lodge Luxury Forest Resort',
      mealsIncluded: 'Breakfast, En-Route Refreshments & Gourmet Satvik Dinner'
    },
    {
      day: 4,
      title: 'Historic Forts of Anandpur Sahib & Journey to Bathinda',
      takhtOrCity: 'Sri Anandpur Sahib → Bathinda',
      highlights: ['Gurdwara Sis Ganj Sahib', 'Gurdwara Anandgarh Sahib fort', 'Scenic road travel to Malwa region', 'Check-in at luxury hotel Bathinda'],
      morning: 'Visit Gurdwara Sis Ganj Sahib, the holy site where the severed head of Guru Tegh Bahadur Ji was cremated with supreme reverence by Bhai Jaita Ji and young Guru Gobind Singh Ji.',
      afternoon: 'Explore the ramparts of Anandgarh Fort. Depart in your air-conditioned Toyota Innova Hycross / Crysta toward Bathinda (Malwa heartland). Chilled refreshments and snacks served on board.',
      evening: 'Check-in at executive suite hotel in Bathinda. Evening leisure and spiritual discourse with our Sikh Scholar on Guru Ki Kashi.',
      overnightStay: 'Country Inn & Suites / Luxury Executive Suite Bathinda',
      mealsIncluded: 'Breakfast, Lunch & Gourmet Dinner'
    },
    {
      day: 5,
      title: 'Takht Sri Damdama Sahib (Guru Ki Kashi) & Flight to Patna',
      takhtOrCity: 'Talwandi Sabo → Amritsar / Delhi → Patna',
      highlights: ['Takht Sri Damdama Sahib Darshan', 'Gurdwara Likhansar Sahib holy pond', 'Damdami Bir history', 'Flight to Patna & Taj check-in'],
      morning: 'Proceed to Talwandi Sabo. Darshan of Takht Sri Damdama Sahib, where Guru Gobind Singh Ji dictated the sacred Guru Granth Sahib Ji. Darshan of Gurdwara Likhansar Sahib.',
      afternoon: 'Special family Ardas and Saropa blessing. Chauffeured transit to airport for flight to Patna, Bihar.',
      evening: 'Arrival at Patna Airport. VIP reception and private transfer to Taj City Centre / Hotel Maurya. Check-in and relax in club luxury suites.',
      overnightStay: 'Taj City Centre / Hotel Maurya, Patna',
      mealsIncluded: 'Breakfast, Langar Prasad & 5-Star Dinner'
    },
    {
      day: 6,
      title: 'Takht Sri Patna Sahib & Holy Janam Sthan Pilgrimage',
      takhtOrCity: 'Patna (Bihar)',
      highlights: ['Takht Sri Harmandir Ji Patna Sahib', 'Golden Cradle (Panghura Sahib)', 'Childhood weapons Darshan', 'Gurdwara Baal Leela & Handi Sahib'],
      morning: 'Grand morning Darshan at Takht Sri Patna Sahib, the birthplace of Sri Guru Gobind Singh Ji. Witness the sacred Panghura Sahib (gold cradle), sword, and divine arrows.',
      afternoon: 'Visit Gurdwara Baal Leela (Maini Sangat), where the child Guru played and ate boiled chana and poori, and Gurdwara Handi Sahib where khichdi was prepared for the Guru.',
      evening: 'Serene riverside walk by the holy Ganges. Attend evening Rehras Sahib and Aarti kirtan at Takht Sahib.',
      overnightStay: 'Taj City Centre / Hotel Maurya, Patna',
      mealsIncluded: 'Breakfast, Sacred Langar & 5-Star Dinner'
    },
    {
      day: 7,
      title: 'Historical Gurdwaras of Bihar & Flight to Nanded (Sachkhand)',
      takhtOrCity: 'Patna → Hyderabad / Nanded',
      highlights: ['Guru Ka Bagh Darshan', 'Ganges spiritual serenity', 'Executive flight transit to Nanded', 'Check-in at Visawa Palace luxury suites'],
      morning: 'Morning visit to Gurdwara Guru Ka Bagh, where Guru Tegh Bahadur Ji stayed and brought a dry garden into miraculous bloom.',
      afternoon: 'Transfer to Patna Airport for scheduled flight to Nanded / Hyderabad. Comfortable flight with onboard meal.',
      evening: 'VIP arrival transfer in private executive vehicles to Visawa Palace Heritage Hotel in Nanded. Welcome tea and orientation on Sachkhand protocols.',
      overnightStay: 'Visawa Palace Heritage Suites, Nanded',
      mealsIncluded: 'Breakfast, Flight Meal & Royal Dinner'
    },
    {
      day: 8,
      title: 'Sachkhand Takht Sri Hazur Sahib & Grand Light Chronicle',
      takhtOrCity: 'Nanded (Maharashtra)',
      highlights: ['Sachkhand inner sanctum Darshan', 'Holy weapon cleansing ceremony', 'Gurdwara Banda Ghat', 'Spectacular Laser Light & Sound Show'],
      morning: 'Holy Darshan at Takht Sri Hazur Abchalnagar Sahib. Experience the sacred weapons cleansing ceremony (Shastar Sanstha) and deep meditative resonance of the inner sanctum.',
      afternoon: 'Darshan of Gurdwara Banda Ghat, the holy site on Godavari River where ascetic Madho Das met the Tenth Master and surrendered as Banda Singh Bahadur.',
      evening: 'Witness the magnificent 3D Laser & Sound Light Chronicle at Hazur Sahib grounds, narrating the sacred sacrifice and eternal Gurugaddi history of Guru Granth Sahib Ji.',
      overnightStay: 'Visawa Palace Heritage Suites, Nanded',
      mealsIncluded: 'Breakfast, Guru Ka Langar & Royal Dinner'
    },
    {
      day: 9,
      title: 'Sacred Gurdwaras along Godavari & Royal Farewell Gathering',
      takhtOrCity: 'Nanded (Maharashtra)',
      highlights: ['Gurdwara Shikar Ghat', 'Gurdwara Nanak Pira', 'Gurdwara Heera Ghat', 'Special thanksgiving Ardas & Saropa honors'],
      morning: 'Early morning pilgrimage to Gurdwara Shikar Ghat perched over the Godavari, followed by Gurdwara Nanak Pira and Gurdwara Heera Ghat.',
      afternoon: 'Leisurely rest, souvenir acquisition, and private family reflection. Optional private consultation with head Granthi for family blessings.',
      evening: 'Grand concluding Thanksgiving Ardas at Sachkhand Hazur Sahib. Presentation of sacred Siropa to pilgrims. Farewell gourmet banquet at the hotel.',
      overnightStay: 'Visawa Palace Heritage Suites, Nanded',
      mealsIncluded: 'Breakfast, Satvik Lunch & Grand Farewell Dinner'
    },
    {
      day: 10,
      title: 'Final Blessings & Homeward Flight Connection',
      takhtOrCity: 'Nanded → Hyderabad / Delhi / Amritsar',
      highlights: ['Morning prayer & Karah Parshad', 'Luggage assistance & airport transfer', 'Flight connection home with sacred memories'],
      morning: 'Final morning Darshan at Takht Sahib to receive Karah Parshad blessings.',
      afternoon: 'Full luggage assistance and luxury airport transfer for your departure flight to Delhi, Amritsar, or international connections.',
      evening: 'Arrive home blessed with the divine grace of all Five Sacred Takhts.',
      overnightStay: 'Homeward Journey',
      mealsIncluded: 'Breakfast & Airport Refreshment Box'
    }
  ],

  luxuryPillars: [
    {
      iconName: 'Hotel',
      title: '5-Star Stays & Heritage Suites',
      subtitle: 'Taj, Hyatt, Kikar Lodge & Luxury Club Suites',
      description: 'Every night is spent in premier 5-star properties or exclusive heritage retreats with King beds, deep sanitization, in-room dining, and 24-hour concierge.',
      bulletPoints: [
        'Taj Swarna / Hyatt Regency in Amritsar',
        'The Kikar Lodge Luxury Forest Resort in Anandpur Sahib',
        'Taj City Centre / Maurya in Patna',
        'Visawa Palace Heritage Suites in Nanded'
      ]
    },
    {
      iconName: 'Plane',
      title: 'Flights & Toyota Hycross / Crysta Fleet Only',
      subtitle: 'Zero exhausting overnight train rides',
      description: 'Seamless scheduled aviation hops connecting Punjab, Bihar, and Maharashtra combined with dedicated chauffeur-driven Toyota Innova Hycross (Hybrid Luxury) or Toyota Innova Crysta only.',
      bulletPoints: [
        'Domestic scheduled flights included in package',
        'Ground transit strictly in Toyota Innova Hycross or Innova Crysta only',
        'Plush captain seats, smooth suspension & rear climate control for elders',
        'Chilled mineral water, onboard Wi-Fi, and courteous verified chauffeurs'
      ]
    },
    {
      iconName: 'HeartHandshake',
      title: 'Dedicated Senior Citizen & Elder Care',
      subtitle: 'Respectful, unhurried, comfortable yatra for parents & grandparents',
      description: 'Engineered specifically for elderly pilgrims and multi-generational NRI families desiring dignified comfort.',
      bulletPoints: [
        'Wheelchair assistance arranged at airports & complex entries',
        'Golf cart transfers where permitted by Gurdwara boards',
        'Pacing with zero rush and dedicated luggage porterage',
        'On-call medical assistance and emergency travel insurance'
      ]
    },
    {
      iconName: 'BookOpen',
      title: 'Accompanying Sikh Scholar & Guide',
      subtitle: 'Deep historical insights and strict Maryada adherence',
      description: 'A certified Sikh historian and Katha scholar travels alongside your group, providing rich context on Sikh bravery, Guru Sahiban history, and relics.',
      bulletPoints: [
        'Fluent in Punjabi, English, and Hindi',
        'Private family discourses on historical context of each Takht',
        'Pre-arranged family Ardas and Karah Parshad facilitation',
        'Honored Saropa Sahib presentation support'
      ]
    },
    {
      iconName: 'UtensilsCrossed',
      title: 'Gourmet Satvik Dining & Langar Seva',
      subtitle: 'Harmonizing sacred community seva with 5-star hygiene',
      description: 'Experience the divine humility of Guru Ka Langar seva alongside freshly prepared satvik multi-cuisine gourmet breakfasts and dinners at 5-star properties.',
      bulletPoints: [
        'Pure vegetarian hygiene standards throughout',
        'Curated organic meals for diabetic and dietary restrictions',
        'Langar seating arrangements with dignity for elders',
        'Packaged Himalayan mineral water provided throughout transit'
      ]
    }
  ],

  pricingTiers: [
    {
      id: 'imperial-5star',
      title: 'Imperial 5-Star Experience',
      tagline: 'Complete Panj Takht Yatra in 5-Star Luxury & Air Connectivity',
      inrPrice: '₹1,85,000',
      usdPrice: '$2,250',
      cadPrice: '$3,050',
      gbpPrice: '£1,750',
      isPopular: true,
      badge: 'Most Popular for Families',
      features: [
        '9 Nights in premier 5-star hotels & luxury heritage lodges',
        'All domestic flights included (Punjab ⇄ Patna ⇄ Nanded)',
        'Chauffeur-driven Toyota Innova Hycross / Innova Crysta only (Plush Captain Seats)',
        'Dedicated accompanying Sikh Scholar & pilgrimage concierge',
        'Wheelchair & golf-cart assistance for senior citizens',
        'Daily 5-star gourmet buffet breakfast & dinner + Langar Seva',
        'Special family Ardas & Saropa Sahib facilitation at all 5 Takhts',
        'Virasat-e-Khalsa museum VIP passes & Hazur Sahib laser show',
        'Comprehensive travel medical insurance included'
      ],
      idealFor: 'Families, NRI pilgrims, and senior citizens desiring complete comfort and peace of mind.'
    },
    {
      id: 'royal-suite',
      title: 'Royal Presidential Suite',
      tagline: 'Ultimate VIP Privacy with Dedicated Toyota Innova Hycross & Executive Class',
      inrPrice: '₹2,65,000',
      usdPrice: '$3,200',
      cadPrice: '$4,350',
      gbpPrice: '£2,500',
      badge: 'VIP Ultra-Luxury',
      features: [
        'Upgraded Presidential / Taj Club Suites at all destinations',
        'Executive / Business Class domestic flight sectors (where available)',
        'Dedicated Toyota Innova Hycross (Ottoman Captain Seats / Hybrid Luxury) for your exclusive family',
        'Personal 24/7 dedicated butler & medical escort assistant',
        'Private personalized Katha sessions and historic site tours',
        'Priority Palki Sahib darshan assistance and personal Ardas',
        'All meals, private room dining, and custom satvik menu',
        'Door-to-door luggage porterage from airport to hotel room'
      ],
      idealFor: 'Discerning couples, prominent HNI families, and elders needing full personalized attention.'
    },
    {
      id: 'private-charter',
      title: 'Bespoke Private Charter Jet Edition',
      tagline: 'Chartered Aircraft Directly Connecting Amritsar, Patna & Nanded',
      inrPrice: 'Custom Quote',
      usdPrice: 'On Request',
      cadPrice: 'On Request',
      gbpPrice: 'On Request',
      badge: 'Charter Aviation',
      features: [
        'Private 8–14 seater executive jet connecting all pilgrimage sectors',
        'Zero commercial airport waiting; VIP private terminal lounge access',
        'Flexible departure timing tailored to your family convenience',
        'Top-tier Presidential suites and personal security escort if desired',
        'End-to-end bespoke luxury curated by AIMS executive management'
      ],
      idealFor: 'Private family entourages, corporate leaders, and international delegates.'
    }
  ],

  faqs: [
    {
      question: 'What is the best time of year to undertake the Panj Takht Yatra?',
      answer: 'The ideal months are from October to March, when weather across Punjab, Bihar, and Maharashtra is pleasantly cool and comfortable for elderly pilgrims and outdoor parikrama.'
    },
    {
      question: 'Can wheelchair-bound senior citizens comfortably participate?',
      answer: 'Yes! We have designed this itinerary specifically for senior citizens. We arrange wheelchair assistance at every airport, hotel, and gurdwara complex, along with golf carts at Sri Harmandir Sahib and Takht Sri Patna Sahib where available.'
    },
    {
      question: 'How are domestic flights handled between the different states?',
      answer: 'All domestic flight bookings between Punjab (Amritsar/Chandigarh), Bihar (Patna), and Maharashtra (Nanded/Hyderabad) are completely managed and included in your package with verified baggage allowances.'
    },
    {
      question: 'What is the dress code and spiritual protocol (Maryada)?',
      answer: 'Modest, respectful attire covering shoulders and legs is required. Head coverings (rumal/dastar/dupatta) are mandatory inside all Gurdwara premises. Shoes and socks are removed before entering sacred sarovars and sanctums. Our accompanying Sikh scholar will guide your family on every detail.'
    },
    {
      question: 'Can NRI travelers from Canada, the UK, or the USA join directly from Delhi or Amritsar?',
      answer: 'Absolutely. We provide direct VIP airport meet-and-greet at Indira Gandhi International Airport (DEL) in Delhi or Sri Guru Ram Dass Jee International Airport (ATQ) in Amritsar, including transit assistance for international arrivals.'
    }
  ]
};
