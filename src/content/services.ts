export interface ServiceItem {
  id: string;
  letter: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

export const CANONICAL_SERVICES: ServiceItem[] = [
  {
    id: 'scripting-strategy',
    letter: 'A',
    index: '01',
    title: 'Scripting & Creative Strategy',
    tagline: 'The idea, before the camera.',
    description:
      'We turn business objectives into concepts that are worth filming — ad scripts, promo ideas, narrative arcs, and the content plan that carries them. Every concept is built around the first three seconds, because that is where the algorithm and the audience both decide.',
    deliverables: [
      'Advertisement scripts and promotional video concepts',
      'Campaign ideation, creative direction and brand storytelling',
      'Social content concepts, content pillars and copywriting',
    ],
  },
  {
    id: 'capturing-editing',
    letter: 'B',
    index: '02',
    title: 'Capturing & Editing',
    tagline: 'Production and post, in one room.',
    description:
      'Video production and promotional shoots, shot for the platform they will live on. Short-form for Instagram Reels, YouTube Shorts and TikTok; long-form for brand films. Then editing, motion graphics, sound design and colour — the part most agencies subcontract.',
    deliverables: [
      '4K production, studio lighting and on-location shoots',
      'Brand advertisements, product videos and creator-led content',
      'Edit, motion graphics, sound design and colour grade',
    ],
  },
  {
    id: 'social-handling',
    letter: 'C',
    index: '03',
    title: 'Social Media Handling',
    tagline: 'Your channels, run like a newsroom.',
    description:
      'We run the accounts: the calendar, the publishing cadence, the replies, the brand voice, and the monthly review of what actually moved. You get consistency and a growing audience without hiring an in-house team.',
    deliverables: [
      'Content calendars, publishing and scheduling',
      'Community management, engagement and brand consistency',
      'Performance tracking and content optimisation',
    ],
  },
  {
    id: 'influencer-collabs',
    letter: 'D',
    index: '04',
    title: 'Influencer & Brand Collaborations',
    tagline: 'The right creator, on paper.',
    description:
      'We match brands with creators whose audience actually overlaps, then handle the parts that cause problems: briefs, deliverables, timelines, contracts, and commercial usage rights — in writing, before filming.',
    deliverables: [
      'Vetted creator matchmaking and rate negotiation',
      'Campaign planning, coordination and partnership management',
      'Contracting, deliverables and commercial usage rights',
    ],
  },
  {
    id: 'marketing-campaigns',
    letter: 'E',
    index: '05',
    title: 'Marketing Campaigns',
    tagline: 'Attention that converts.',
    description:
      'Digital advertising and integrated campaigns, plus outdoor and local activation where the audience is physical. Built around your audience and your objectives, and reported against the numbers you actually care about.',
    deliverables: [
      'Paid social, search and integrated campaign build',
      'Outdoor advertising, billboards and local promotional campaigns',
      'Brand awareness, product promotion and conversion tracking',
    ],
  },
  {
    id: 'website-design',
    letter: 'F',
    index: '06',
    title: 'Website Design',
    tagline: 'The place the traffic lands.',
    description:
      'Modern business and brand websites, portfolio and landing pages, and conversion-focused experiences — designed to hold the attention the campaigns bought.',
    deliverables: [
      'Business and brand website design and build',
      'Portfolio, landing page and funnel development',
      'Conversion-focused UX, analytics and ongoing optimisation',
    ],
  },
];
