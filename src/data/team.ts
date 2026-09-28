export type TeamMember = {
  name: string
  role: string
  bio: string
  image: string
  linkedinUrl?: string
  objectPosition?: string
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Dora Agai',
    role: 'Founder & Managing Director',
    bio: 'Over 15 years of experience in HR leadership and organizational development across East Africa.',
    image: '/images/team/dora-agai.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/dora-agai-24599947/',
  },
  {
    name: 'Jeff Adhaya',
    role: 'Applied AI Workforce Strategy Consultant',
    bio: 'Specializes in aligning AI capabilities with workforce strategy and organizational growth.',
    image: '/images/team/jeff-adhaya.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/jeff-adhaya-b691b935/',
    objectPosition: '50% 10%',
  },
  {
    name: 'Grace Auma',
    role: 'Training & Development Lead',
    bio: 'Expert in leadership development and organizational change management.',
    image: '/team-3.jpg',
  },
]

export type Value = {
  title: string
  description: string
}

export const values: Value[] = [
  {
    title: 'Integrity',
    description: 'We operate with honesty, transparency, and professionalism in all our engagements.',
  },
  {
    title: 'Innovation',
    description: 'We continuously improve our services and responsibly adopt new methods and tools.',
  },
  {
    title: 'Collaboration',
    description: 'We work closely with clients and partners to achieve shared success.',
  },
  {
    title: 'Excellence',
    description: 'We strive for high standards, measurable impact, and continuous learning.',
  },
  {
    title: 'Inclusivity',
    description: 'We believe inclusive workplaces drive stronger organizational outcomes.',
  },
  {
    title: 'People-First',
    description: 'We put people at the center of everything we do.',
  },
]

export const mission =
  'To provide innovative, inclusive, and practical human resources solutions that empower organizations to succeed through strong people practices and responsible use of technology.'

export const vision =
  'To be a leading human resources consultancy in East Africa, supporting organizations to build inclusive cultures, high-performing teams, and future-ready workforces.'

export const story = [
  'JantaHR was established to support organizations in building strong, inclusive, and effective workplaces. We believe people are at the center of organizational success and that well-designed HR systems enable both individuals and businesses to thrive.',
  'Our work combines practical HR expertise with a deep understanding of organizational dynamics, inclusion, and responsible use of technology. We partner with organizations to create workplaces where people can thrive and organizations can grow sustainably.',
  'Because we run HR for real clients, we built our own platform to do it better. The JantaHR Platform is the same toolset our consultants use every day — now available to your team.',
]

export const homeStats = [
  { value: 15, suffix: '+', label: 'Years of HR leadership' },
  { value: 8, suffix: '+', label: 'Integrated platform modules' },
  { value: 3, suffix: '', label: 'Employee types supported' },
  { value: 100, suffix: '%', label: 'URA-compliant payroll' },
]
