export type Metric = {
  id: string;
  label: string;
  value: string;
  sublabel?: string;
  source?: string;
  status: 'verified' | 'illustrative' | 'TODO_VERIFY';
};

export const METRICS: Metric[] = [
  {
    id: 'campaign-reach',
    label: 'Campaign Reach',
    value: '45M+',
    sublabel: 'Attributed cross-platform views',
    status: 'illustrative',
  },
  {
    id: 'roas',
    label: 'Average ROAS',
    value: '4.8×',
    sublabel: 'Paid media & performance distribution',
    status: 'illustrative',
  },
  {
    id: 'engagement',
    label: 'Engagement Surge',
    value: '+312%',
    sublabel: 'Short-form retention benchmark',
    status: 'illustrative',
  },
  {
    id: 'retention',
    label: 'Partner Retention',
    value: '94%',
    sublabel: 'Long-term brand & talent contracts',
    status: 'illustrative',
  },
];
