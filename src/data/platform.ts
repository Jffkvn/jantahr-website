import {
  Users,
  Calculator,
  CalendarDays,
  Wallet,
  TrendingUp,
  Gauge,
  ScrollText,
  BarChart3,
  ShieldCheck,
  FileText,
  type LucideIcon,
} from 'lucide-react'

export type PlatformFeature = {
  icon: LucideIcon
  title: string
  description: string
  bullets: string[]
}

export const platformFeatures: PlatformFeature[] = [
  {
    icon: Users,
    title: 'Employee Dossiers',
    description:
      'A single, structured record for every employee — personal details, role history, documents, and activity in one place.',
    bullets: ['Full employment history', 'Document vault', 'Role & grade tracking', 'Self-service portal'],
  },
  {
    icon: Calculator,
    title: 'Automated Payroll Runs',
    description:
      'Run monthly payroll in minutes with statutory deductions calculated automatically and exportable spreadsheets.',
    bullets: ['One-click monthly runs', 'Pro-rata & overtime', 'Excel & PDF export', 'Payslip generation'],
  },
  {
    icon: CalendarDays,
    title: 'Leave Management',
    description:
      'Configure leave types, track balances, and approve requests through a transparent workflow with full history.',
    bullets: ['Configurable leave types', 'Balance tracking', 'Approval workflows', 'Holiday calendars'],
  },
  {
    icon: Wallet,
    title: 'Salary Advances',
    description:
      'Manage staff advances with clear repayment schedules, deductions, and full audit traceability.',
    bullets: ['Advance requests', 'Recovery schedules', 'Auto-deduction on payroll', 'Audit trail'],
  },
  {
    icon: Gauge,
    title: 'Pay Grades',
    description:
      'Define salary structures, bands, and grades that keep compensation consistent and defensible across the organization.',
    bullets: ['Salary bands', 'Grade structures', 'Increment rules', 'Equity checks'],
  },
  {
    icon: TrendingUp,
    title: 'Performance Reviews',
    description:
      'Run structured performance cycles with goals, reviews, and feedback — tied back to development plans.',
    bullets: ['Review cycles', 'Goal tracking', '360° feedback', 'Development plans'],
  },
  {
    icon: ScrollText,
    title: 'Audit Log',
    description:
      'Every change is recorded. Know who did what, and when — essential for compliance and trust.',
    bullets: ['Immutable history', 'User attribution', 'Change diff', 'Exportable reports'],
  },
  {
    icon: BarChart3,
    title: 'Reports & Analytics',
    description:
      'Visualize HR demographics, payroll costs, anniversaries, and headcount with built-in dashboards.',
    bullets: ['Headcount & demographics', 'Payroll cost trends', 'Anniversary tracking', 'Custom exports'],
  },
]

export type EmployeeType = {
  key: string
  label: string
  description: string
  deductions: string[]
}

export const employeeTypes: EmployeeType[] = [
  {
    key: 'local',
    label: 'Local employee',
    description: 'Standard Ugandan employee — full statutory compliance.',
    deductions: ['PAYE', 'NSSF (employee 5%)', 'NSSF (employer 10%)'],
  },
  {
    key: 'global',
    label: 'Global / expat',
    description: 'International staff — PAYE only, no NSSF.',
    deductions: ['PAYE', 'No NSSF'],
  },
  {
    key: 'contractor',
    label: 'Contractor',
    description: 'Withholding tax only at a configurable rate.',
    deductions: ['Withholding tax', 'No PAYE', 'No NSSF'],
  },
]

// Uganda PAYE bands (UGX) — mirrored from the product's calculations engine
export const payeBands = [
  { min: 0, max: 235000, rate: 0 },
  { min: 235000, max: 335000, rate: 10 },
  { min: 335000, max: 410000, rate: 20 },
  { min: 410000, max: null, rate: 30 },
] as const

export const surcharge = { threshold: 10000000, rate: 10 }

export const nssf = { employee: 5, employer: 10 }

export type SecurityFeature = {
  icon: LucideIcon
  title: string
  description: string
}

export const securityFeatures: SecurityFeature[] = [
  {
    icon: ShieldCheck,
    title: 'Row-Level Security',
    description:
      'Each organization’s data is isolated at the database level. Users only ever see what they are authorized to see.',
  },
  {
    icon: Users,
    title: 'Role-based access',
    description:
      'Granular roles — admins, HR, managers, and employees — each with scoped permissions and visibility.',
  },
  {
    icon: ScrollText,
    title: 'Immutable audit trail',
    description:
      'Every action is logged with user attribution and timestamp. Nothing changes silently.',
  },
  {
    icon: FileText,
    title: 'Secure payslips',
    description:
      'Payslips are generated as encrypted PDFs and delivered through authenticated employee portals.',
  },
]

export const platformStats = [
  { value: 8, suffix: '+', label: 'Integrated modules' },
  { value: 100, suffix: '%', label: 'URA-compliant math' },
  { value: 3, suffix: '', label: 'Employee types supported' },
  { value: 0, suffix: '', label: 'Manual PAYE calc' },
]
