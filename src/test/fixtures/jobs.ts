import type { Job } from '@/data/jobs';

export const sampleJobs: Job[] = [
  {
    id: 101,
    slug: 'customer-success-associate',
    title: 'Customer Success Associate',
    company: 'Nile Logistics',
    location: 'Kampala',
    type: 'Full-time',
    posted: '2 days ago',
    category: 'Customer Service',
    summary: 'Support client onboarding and ongoing customer communication.',
    description:
      'You will support onboarding, resolve customer issues, and coordinate with operations teams.',
    responsibilities: ['Handle customer issues', 'Escalate service risks', 'Maintain CRM notes'],
    requirements: ['2+ years experience', 'Strong communication', 'CRM familiarity'],
    benefits: ['Medical cover', 'Learning budget'],
  },
  {
    id: 102,
    slug: 'sales-operations-executive',
    title: 'Sales Operations Executive',
    company: 'Lakeview Retail',
    location: 'Entebbe',
    type: 'Contract',
    posted: '5 days ago',
    category: 'Sales',
    summary: 'Coordinate proposals, reporting, and sales admin processes.',
    description:
      'You will support proposal preparation, customer follow-up tracking, and weekly reporting.',
  },
];
