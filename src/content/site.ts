export const BRAND = 'Fam1Media';

export const SITE = {
  name: BRAND,
  tagline: 'Creative Growth Partner Connecting Brands & Creators',
  description:
    'Creative strategy, high-retention video production, social channel management, and paid advertising campaigns.',
  url: 'https://fam1media.com', // TODO_VERIFY: Confirm client production domain
  contactEmail: 'partners@fam1media.com', // TODO_VERIFY: Confirm contact desk email
  offices: [
    { city: 'London', area: 'Mayfair' },
    { city: 'New York', area: 'SoHo' },
    { city: 'Dubai', area: 'DIFC' },
  ],
  socials: {
    instagram: 'https://instagram.com', // TODO_VERIFY: Real Instagram profile URL
    youtube: 'https://youtube.com',     // TODO_VERIFY: Real YouTube channel URL
    linkedin: 'https://linkedin.com',   // TODO_VERIFY: Real LinkedIn company URL
    x: 'https://x.com',                 // TODO_VERIFY: Real X profile URL
  },
  legal: {
    terms: '/terms',     // TODO_VERIFY: Real terms page route or doc
    privacy: '/privacy', // TODO_VERIFY: Real privacy policy route or doc
  },
  status: 'Currently accepting new projects',
  year: new Date().getFullYear(),
};
