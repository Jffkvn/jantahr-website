import {
  Users,
  Search,
  DollarSign,
  Monitor,
  ClipboardList,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

export type Service = {
  icon: LucideIcon
  title: string
  description: string
  areas: string[]
}

export const coreServices: Service[] = [
  {
    icon: Users,
    title: 'Corporate Staff Training & Development',
    description:
      'We design and deliver training programs that build leadership capability, strengthen teams, and improve day-to-day performance. Practical, interactive, and aligned with organizational goals.',
    areas: [
      'Leadership and management development',
      'Sales and customer service training',
      'Team building and personal development',
      'Change and performance management',
    ],
  },
  {
    icon: Search,
    title: 'Recruitment Process Outsourcing',
    description:
      'Structured and objective recruitment processes that deliver the right talent while reducing time and operational pressure.',
    areas: [
      'Sourcing and screening',
      'Interview coordination',
      'Placement and onboarding',
      'Recruitment strategy advisory',
    ],
  },
  {
    icon: DollarSign,
    title: 'Compensation & Benefits Consulting',
    description:
      'Fair, competitive, and compliant compensation structures that attract and retain talent while supporting internal equity.',
    areas: ['Salary benchmarking', 'Job evaluation', 'Benefits design', 'Employee communication'],
  },
  {
    icon: Monitor,
    title: 'HR Technology Consulting',
    description:
      'Selecting and using HR technology that improves efficiency and employee experience without unnecessary complexity.',
    areas: ['Needs assessment', 'Vendor selection', 'System implementation', 'Staff training'],
  },
  {
    icon: ClipboardList,
    title: 'HR Outsourcing',
    description:
      'Let your organization focus on core business while HR administration is professionally managed end-to-end.',
    areas: [
      'Payroll administration',
      'HR records management',
      'Operational HR support',
      'Compliance monitoring',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'HR Compliance',
    description:
      'Navigate employment laws and regulations through clear policies, training, and advisory support.',
    areas: ['HR policy audits', 'Compliance training', 'Labor law guidance', 'Ongoing advisory'],
  },
]

export const aiServices = [
  'AI awareness and workplace readiness training',
  'Customer service response drafting',
  'Sales and proposal support',
  'Administrative productivity tools',
  'Responsible data use guidance',
]
