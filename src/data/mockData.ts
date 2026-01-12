export interface Provider {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  phone?: string;
  instagram?: string;
  areas: string[];
  locations: string[];
}

export interface Offer {
  id: string;
  providerId: string;
  title: string;
  description: string;
  category: 'Food' | 'Fitness' | 'Beauty' | 'Activities' | 'Shopping';
  terms: string[];
  area: string;
  address: string;
  expiryDate: string;
  isActive: boolean;
  baseCode: string;
}

export const providers: Provider[] = [
  {
    id: 'p1',
    name: 'Café del Mar',
    logoUrl: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=100&h=100&fit=crop',
    description: 'Premium beachside café serving artisan coffee, fresh pastries, and Mediterranean cuisine with stunning sea views.',
    phone: '+356 2138 1234',
    instagram: 'cafedelmar_malta',
    areas: ['Sliema', 'St Julian\'s'],
    locations: ['Tower Road, Sliema', 'Spinola Bay, St Julian\'s'],
  },
  {
    id: 'p2',
    name: 'FitZone Gym',
    logoUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop',
    description: 'State-of-the-art fitness center with personal training, group classes, and modern equipment.',
    phone: '+356 2731 5678',
    instagram: 'fitzone_malta',
    areas: ['Gzira', 'Msida'],
    locations: ['Rue D\'Argens, Gzira', 'University Heights, Msida'],
  },
  {
    id: 'p3',
    name: 'Bella Vita Spa',
    logoUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=100&h=100&fit=crop',
    description: 'Luxury spa offering massages, facials, and wellness treatments in a tranquil setting.',
    phone: '+356 2156 9012',
    areas: ['Valletta'],
    locations: ['Republic Street, Valletta'],
  },
  {
    id: 'p4',
    name: 'Adventure Malta',
    logoUrl: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=100&h=100&fit=crop',
    description: 'Outdoor adventures including diving, kayaking, rock climbing, and island tours.',
    phone: '+356 7934 5678',
    instagram: 'adventure_malta',
    areas: ['Sliema', 'Valletta'],
    locations: ['The Strand, Sliema'],
  },
  {
    id: 'p5',
    name: 'Trendy Threads',
    logoUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
    description: 'Contemporary fashion boutique featuring local designers and international brands.',
    instagram: 'trendythreads_mt',
    areas: ['Sliema', 'Birkirkara'],
    locations: ['Bisazza Street, Sliema', 'Valley Road, Birkirkara'],
  },
  {
    id: 'p6',
    name: 'Tasty Bites',
    logoUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop',
    description: 'Fast-casual restaurant serving gourmet burgers, wraps, and healthy bowls.',
    phone: '+356 2123 4567',
    areas: ['St Julian\'s', 'Msida'],
    locations: ['Paceville, St Julian\'s', 'Regional Road, Msida'],
  },
  {
    id: 'p7',
    name: 'Glow Studio',
    logoUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop',
    description: 'Beauty salon specializing in hair styling, makeup, and nail art.',
    phone: '+356 2789 0123',
    instagram: 'glowstudio_mt',
    areas: ['Gzira'],
    locations: ['Manoel Island, Gzira'],
  },
  {
    id: 'p8',
    name: 'Island Escapes',
    logoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&h=100&fit=crop',
    description: 'Tour operator offering boat trips, sunset cruises, and Gozo day excursions.',
    phone: '+356 9923 4567',
    instagram: 'islandescapes_malta',
    areas: ['Sliema', 'Valletta'],
    locations: ['Ferries Terminal, Sliema'],
  },
];

export const offers: Offer[] = [
  {
    id: 'o1',
    providerId: 'p1',
    title: '20% off all drinks',
    description: 'Enjoy 20% discount on all beverages including specialty coffees, fresh juices, and cocktails.',
    category: 'Food',
    terms: ['Valid Monday to Friday', 'Not valid on public holidays', 'One redemption per visit'],
    area: 'Sliema',
    address: 'Tower Road, Sliema',
    expiryDate: '2026-03-31',
    isActive: true,
    baseCode: 'CAFE20',
  },
  {
    id: 'o2',
    providerId: 'p1',
    title: 'Free dessert with main course',
    description: 'Get a complimentary dessert when you order any main course from our Mediterranean menu.',
    category: 'Food',
    terms: ['Valid for dine-in only', 'Excludes special menus', 'Subject to availability'],
    area: 'St Julian\'s',
    address: 'Spinola Bay, St Julian\'s',
    expiryDate: '2026-02-28',
    isActive: true,
    baseCode: 'DESSRT',
  },
  {
    id: 'o3',
    providerId: 'p2',
    title: 'First month 50% off',
    description: 'New members get 50% off their first month of gym membership, including access to all facilities.',
    category: 'Fitness',
    terms: ['New members only', 'Valid ID required', '12-month commitment'],
    area: 'Gzira',
    address: 'Rue D\'Argens, Gzira',
    expiryDate: '2026-06-30',
    isActive: true,
    baseCode: 'FIT50',
  },
  {
    id: 'o4',
    providerId: 'p2',
    title: 'Free personal training session',
    description: 'Book a complimentary 45-minute personal training session with our certified trainers.',
    category: 'Fitness',
    terms: ['One per person', 'Booking required', 'Subject to trainer availability'],
    area: 'Msida',
    address: 'University Heights, Msida',
    expiryDate: '2026-04-30',
    isActive: true,
    baseCode: 'PTFREE',
  },
  {
    id: 'o5',
    providerId: 'p3',
    title: '30% off all massages',
    description: 'Relax and unwind with 30% off any massage treatment in our luxury spa.',
    category: 'Beauty',
    terms: ['Valid weekdays only', 'Advance booking required', 'Not valid with other offers'],
    area: 'Valletta',
    address: 'Republic Street, Valletta',
    expiryDate: '2026-05-31',
    isActive: true,
    baseCode: 'SPA30',
  },
  {
    id: 'o6',
    providerId: 'p3',
    title: 'Facial + Manicure combo €45',
    description: 'Special combo package: luxury facial treatment plus express manicure for only €45.',
    category: 'Beauty',
    terms: ['Save €25 on regular price', 'Booking 48h in advance', 'Valid until stock lasts'],
    area: 'Valletta',
    address: 'Republic Street, Valletta',
    expiryDate: '2026-03-15',
    isActive: true,
    baseCode: 'COMBO45',
  },
  {
    id: 'o7',
    providerId: 'p4',
    title: '25% off diving courses',
    description: 'Learn to dive with our PADI-certified instructors at 25% off regular course fees.',
    category: 'Activities',
    terms: ['All certification levels', 'Equipment included', 'Min 2 participants'],
    area: 'Sliema',
    address: 'The Strand, Sliema',
    expiryDate: '2026-08-31',
    isActive: true,
    baseCode: 'DIVE25',
  },
  {
    id: 'o8',
    providerId: 'p4',
    title: 'Buy 1 get 1 kayak rental',
    description: 'Rent a kayak and get a second one free. Perfect for exploring Malta\'s beautiful coastline.',
    category: 'Activities',
    terms: ['2-hour minimum rental', 'Subject to weather conditions', 'Safety briefing required'],
    area: 'Sliema',
    address: 'The Strand, Sliema',
    expiryDate: '2026-09-30',
    isActive: true,
    baseCode: 'KAYAK2',
  },
  {
    id: 'o9',
    providerId: 'p5',
    title: '15% off full-price items',
    description: 'Enjoy 15% discount on all full-price clothing and accessories in store.',
    category: 'Shopping',
    terms: ['Excludes sale items', 'Cannot combine with other discounts', 'Valid in-store only'],
    area: 'Sliema',
    address: 'Bisazza Street, Sliema',
    expiryDate: '2026-04-30',
    isActive: true,
    baseCode: 'TREND15',
  },
  {
    id: 'o10',
    providerId: 'p5',
    title: 'Free styling session',
    description: 'Book a free 30-minute styling consultation with our fashion experts.',
    category: 'Shopping',
    terms: ['Booking required', 'One per customer', 'No purchase obligation'],
    area: 'Birkirkara',
    address: 'Valley Road, Birkirkara',
    expiryDate: '2026-05-15',
    isActive: true,
    baseCode: 'STYLE0',
  },
  {
    id: 'o11',
    providerId: 'p6',
    title: '€5 off orders over €20',
    description: 'Get €5 off your bill when you spend €20 or more on food and drinks.',
    category: 'Food',
    terms: ['Dine-in or takeaway', 'One per transaction', 'Cannot combine with meal deals'],
    area: 'St Julian\'s',
    address: 'Paceville, St Julian\'s',
    expiryDate: '2026-03-31',
    isActive: true,
    baseCode: 'BITES5',
  },
  {
    id: 'o12',
    providerId: 'p6',
    title: 'Free upgrade to large combo',
    description: 'Order any medium combo and get upgraded to large for free.',
    category: 'Food',
    terms: ['Valid all day', 'One upgrade per order', 'While stocks last'],
    area: 'Msida',
    address: 'Regional Road, Msida',
    expiryDate: '2026-02-28',
    isActive: true,
    baseCode: 'UPSIZE',
  },
  {
    id: 'o13',
    providerId: 'p7',
    title: '20% off hair services',
    description: 'Get 20% off any hair service including cuts, coloring, and treatments.',
    category: 'Beauty',
    terms: ['First-time clients', 'Excludes extensions', 'Booking required'],
    area: 'Gzira',
    address: 'Manoel Island, Gzira',
    expiryDate: '2026-06-30',
    isActive: true,
    baseCode: 'GLOW20',
  },
  {
    id: 'o14',
    providerId: 'p7',
    title: 'Gel manicure + pedicure €35',
    description: 'Treat yourself to a gel manicure and pedicure combo at a special price.',
    category: 'Beauty',
    terms: ['Save €15', 'Includes basic designs', 'Book 24h in advance'],
    area: 'Gzira',
    address: 'Manoel Island, Gzira',
    expiryDate: '2026-04-15',
    isActive: true,
    baseCode: 'NAILS35',
  },
  {
    id: 'o15',
    providerId: 'p8',
    title: '€10 off Gozo day trip',
    description: 'Save €10 on our popular full-day Gozo island tour including lunch.',
    category: 'Activities',
    terms: ['Advance booking required', 'Subject to availability', 'Includes ferry transfer'],
    area: 'Sliema',
    address: 'Ferries Terminal, Sliema',
    expiryDate: '2026-10-31',
    isActive: true,
    baseCode: 'GOZO10',
  },
  {
    id: 'o16',
    providerId: 'p8',
    title: '2-for-1 sunset cruise',
    description: 'Book one sunset cruise ticket and bring a friend for free.',
    category: 'Activities',
    terms: ['Every Wednesday & Friday', 'Includes welcome drink', 'Weather permitting'],
    area: 'Valletta',
    address: 'Grand Harbour, Valletta',
    expiryDate: '2026-09-15',
    isActive: true,
    baseCode: 'SUNSET2',
  },
  {
    id: 'o17',
    providerId: 'p2',
    title: '10 class pass for €60',
    description: 'Get a 10-class fitness pass valid for yoga, spinning, or HIIT classes.',
    category: 'Fitness',
    terms: ['Valid 3 months', 'All group classes', 'Non-transferable'],
    area: 'Gzira',
    address: 'Rue D\'Argens, Gzira',
    expiryDate: '2026-07-31',
    isActive: true,
    baseCode: 'CLASS10',
  },
  {
    id: 'o18',
    providerId: 'p1',
    title: 'Brunch for 2 at €25',
    description: 'Special weekend brunch menu for two including coffee and fresh juice.',
    category: 'Food',
    terms: ['Saturdays & Sundays only', '10am - 1pm', 'Reservation recommended'],
    area: 'Sliema',
    address: 'Tower Road, Sliema',
    expiryDate: '2026-05-31',
    isActive: true,
    baseCode: 'BRUNCH2',
  },
  {
    id: 'o19',
    providerId: 'p5',
    title: 'Extra 10% off sale items',
    description: 'Stack an extra 10% discount on already reduced sale items.',
    category: 'Shopping',
    terms: ['Valid in-store only', 'Selected items', 'While stocks last'],
    area: 'Sliema',
    address: 'Bisazza Street, Sliema',
    expiryDate: '2026-02-15',
    isActive: true,
    baseCode: 'SALE10',
  },
  {
    id: 'o20',
    providerId: 'p4',
    title: 'Rock climbing intro €20',
    description: 'Try indoor rock climbing with a 1-hour introduction session at a special rate.',
    category: 'Activities',
    terms: ['All equipment included', 'Beginners welcome', 'Age 12+'],
    area: 'Sliema',
    address: 'The Strand, Sliema',
    expiryDate: '2026-08-15',
    isActive: true,
    baseCode: 'CLIMB20',
  },
];

export const getProviderById = (id: string): Provider | undefined => {
  return providers.find((p) => p.id === id);
};

export const getOfferById = (id: string): Offer | undefined => {
  return offers.find((o) => o.id === id);
};

export const getOffersByProvider = (providerId: string): Offer[] => {
  return offers.filter((o) => o.providerId === providerId);
};

export const getOffersByCategory = (category: string): Offer[] => {
  if (category === 'All') return offers;
  return offers.filter((o) => o.category === category);
};

export const searchOffers = (query: string): Offer[] => {
  const lowerQuery = query.toLowerCase();
  return offers.filter((offer) => {
    const provider = getProviderById(offer.providerId);
    return (
      offer.title.toLowerCase().includes(lowerQuery) ||
      provider?.name.toLowerCase().includes(lowerQuery)
    );
  });
};

export const categories = ['All', 'Food', 'Fitness', 'Beauty', 'Activities', 'Shopping'] as const;

// Promoted offers for banner carousel
export interface PromotedOffer {
  id: string;
  providerId: string;
  headline: string;
  discount: string;
  bgGradient: string;
  offerId: string;
}

export const promotedOffers: PromotedOffer[] = [
  {
    id: 'promo1',
    providerId: 'p2',
    headline: 'New Year Fitness Deal',
    discount: 'UP TO 50% OFF',
    bgGradient: 'from-rose-900 via-rose-800 to-rose-700',
    offerId: 'o3',
  },
  {
    id: 'promo2',
    providerId: 'p3',
    headline: 'Wellness Weekend',
    discount: '30% OFF MASSAGES',
    bgGradient: 'from-violet-900 via-violet-800 to-purple-700',
    offerId: 'o5',
  },
  {
    id: 'promo3',
    providerId: 'p8',
    headline: 'Island Adventure',
    discount: '2-FOR-1 CRUISES',
    bgGradient: 'from-sky-900 via-blue-800 to-cyan-700',
    offerId: 'o16',
  },
];

export const getPromotedOffers = (): PromotedOffer[] => {
  return promotedOffers;
};
