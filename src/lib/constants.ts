export const BRAND = {
  name: 'JantaHR',
  legalName: 'JantaHR Consulting',
  tagline: 'Human-centered HR. Practical payroll tech.',
  domain: 'jantahr.com',
  url: 'https://jantahr.com',
  email: 'hello@jantahr.com',
  emailAlt: 'jantahrconsult@gmail.com',
  phones: ['+256 776 777034', '+256 752 600250'],
  phoneRaw: ['+256776777034', '+256752600250'],
  location: 'Kampala, Uganda',
  hours: [
    { day: 'Monday – Friday', time: '8:00 AM – 6:00 PM' },
    { day: 'Saturday', time: '9:00 AM – 1:00 PM' },
    { day: 'Sunday', time: 'Closed' },
  ],
  socials: {
    linkedin: 'https://www.linkedin.com/company/jantahr/',
    instagram: 'https://www.instagram.com/janta_hr/',
    twitter: 'https://x.com/janta_hr',
  },
} as const

export const NAV_LINKS = [
  { path: '/services', label: 'Services' },
  { path: '/platform', label: 'Platform' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/ai-training', label: 'AI Training' },
  { path: '/jobs', label: 'Jobs' },
  { path: '/about', label: 'About' },
] as const

export const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_CONTACT_ENDPOINT?.trim() ||
  'https://formspree.io/f/xnjbagpr'

export const AI_TRAINING_ENDPOINT =
  import.meta.env.VITE_AI_TRAINING_REGISTRATION_ENDPOINT?.trim()

export const SITE_URL = (import.meta.env.VITE_SITE_URL?.trim() || BRAND.url).replace(/\/$/, '')

export const JOBS_ENDPOINT =
  import.meta.env.VITE_JOBS_ENDPOINT?.trim() ||
  'https://qjsgqskigjqrzjftunhg.supabase.co/functions/v1/public-jobs'

export const CANDIDATE_ENDPOINT =
  import.meta.env.VITE_CANDIDATE_ENDPOINT?.trim() ||
  'https://qjsgqskigjqrzjftunhg.supabase.co/functions/v1/public-candidates'


