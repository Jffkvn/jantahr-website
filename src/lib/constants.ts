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

// Contact form → JantaHR Ops (lead + team alert + confirmation email).
// Deliberately a new variable name: an old VITE_FORMSPREE_CONTACT_ENDPOINT left
// in Netlify can't override it.
export const CONTACT_ENDPOINT =
  import.meta.env.VITE_CONTACT_ENDPOINT?.trim() ||
  'https://qjsgqskigjqrzjftunhg.supabase.co/functions/v1/public-leads'

const OPS_LEADS_ENDPOINT =
  'https://qjsgqskigjqrzjftunhg.supabase.co/functions/v1/public-leads'
const configuredTrainingEndpoint =
  import.meta.env.VITE_AI_TRAINING_REGISTRATION_ENDPOINT?.trim()

// The site's CSP blocks script.google.com, so an Apps Script URL here can never work.
export const AI_TRAINING_ENDPOINT =
  configuredTrainingEndpoint && !configuredTrainingEndpoint.includes('script.google.com')
    ? configuredTrainingEndpoint
    : OPS_LEADS_ENDPOINT

export const SITE_URL = (import.meta.env.VITE_SITE_URL?.trim() || BRAND.url).replace(/\/$/, '')

export const JOBS_ENDPOINT =
  import.meta.env.VITE_JOBS_ENDPOINT?.trim() ||
  'https://qjsgqskigjqrzjftunhg.supabase.co/functions/v1/public-jobs'

export const CANDIDATE_ENDPOINT =
  import.meta.env.VITE_CANDIDATE_ENDPOINT?.trim() ||
  'https://qjsgqskigjqrzjftunhg.supabase.co/functions/v1/public-candidates'


