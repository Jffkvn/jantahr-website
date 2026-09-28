import { useState } from 'react'
import { 
  Laptop, 
  Smartphone, 
  Coins, 
  History, 
  CheckCircle2, 
  ShieldCheck, 
  Layers,
  Award
} from 'lucide-react'
import Reveal from '@/components/effects/Reveal'

const modules = [
  {
    id: 'assets',
    title: 'Asset Custody & Tracking',
    icon: Laptop,
    badge: 'Hardware & Property',
    summary: 'Prevent lost company property with end-to-end custody tracking, serial logging, condition grading, and recovery workflows.',
    features: [
      'Digital asset register: laptops, phones, company vehicles, keys, and peripherals',
      'Serial numbers, purchase dates, warranty tracking, and asset status (Assigned, In Repair, Available)',
      'Digital employee handover sign-off with condition acknowledgement (New, Good, Fair)',
      'Automated offboarding asset return checklist ensuring 100% equipment return before final pay settlement',
    ],
    mockup: {
      type: 'assets',
      title: 'Company Asset Registry',
      tag: 'Custody Status',
      items: [
        { name: 'MacBook Pro 14" M3', tag: 'JH-LAP-089', user: 'Sandra Auma', status: 'Assigned', condition: 'Good' },
        { name: 'Dell Latitude 5440', tag: 'JH-LAP-042', user: 'In Stock (IT Store)', status: 'Available', condition: 'New' },
        { name: 'Toyota Hilux UBA 412K', tag: 'JH-VEH-003', user: 'Logistics Dept', status: 'Assigned', condition: 'Good' },
        { name: 'Samsung Galaxy A54', tag: 'JH-PHN-018', user: 'Brian K.', status: 'Returned', condition: 'Inspected' },
      ],
    },
  },
  {
    id: 'portal',
    title: 'Employee Portal & Clock-In',
    icon: Smartphone,
    badge: 'Mobile Self-Service',
    summary: 'Give every team member a dedicated mobile and web portal to clock in, view official PDF payslips, and submit requests.',
    features: [
      'Geo-verified mobile clock-in & attendance recording for office and field teams',
      'Instant access to official downloadable PDF payslips (MyPay) with full URA tax breakdown',
      'Self-service leave requests with live accrued balance visibility and instant manager notifications',
      'Digital expense claim submission with receipt photo attachments and approval tracking',
    ],
    mockup: {
      type: 'portal',
      title: 'JantaHR Employee Portal',
      tag: 'MyPay & Self-Service',
      items: [
        { name: 'July 2026 Payslip', tag: 'Net: UGX 3,120,000', user: 'Tax & NSSF Remitted', status: 'PDF Ready', condition: 'Downloaded' },
        { name: 'Morning Clock-In', tag: '08:14 AM · Kampala HQ', user: 'GPS Location Verified', status: 'On-Time', condition: 'Logged' },
        { name: 'Annual Leave Request', tag: 'Aug 14 – Aug 18 (5 days)', user: 'Balance: 12 days left', status: 'Approved', condition: 'Calendar Synced' },
      ],
    },
  },
  {
    id: 'performance',
    title: 'Performance & Appraisals',
    icon: Award,
    badge: 'Growth & Reviews',
    summary: 'Replace messy review spreadsheets with structured appraisal cycles, objective OKR tracking, and 360° manager evaluations.',
    features: [
      'Configurable appraisal cycles: Quarterly OKRs, Bi-annual reviews, and Annual merit evaluations',
      'Multi-stakeholder reviews: Employee self-evaluations, line manager ratings, and peer feedback',
      'Weighted competencies and key performance indicators (KPIs) mapped to pay grade bands',
      'Ratings distribution analytics to eliminate manager bias and benchmark talent promotion readiness',
    ],
    mockup: {
      type: 'performance',
      title: 'Q2 Performance Appraisal Cycle',
      tag: 'Evaluation Calibrations',
      items: [
        { name: 'Leadership & Execution', tag: 'Weight: 40%', user: 'Manager Rating: 4.8 / 5.0', status: 'Exceeds', condition: 'Calibrated' },
        { name: 'Operational Compliance', tag: 'Weight: 30%', user: 'Manager Rating: 4.2 / 5.0', status: 'Proficient', condition: 'Verified' },
        { name: 'Team Mentorship & OKRs', tag: 'Weight: 30%', user: 'Manager Rating: 4.5 / 5.0', status: 'Strong', condition: 'Submitted' },
      ],
    },
  },
  {
    id: 'advances',
    title: 'Salary Advances & Recovery',
    icon: Coins,
    badge: 'Automated Deductions',
    summary: 'Support your employees with controlled salary advances that automatically deduct on subsequent payroll runs.',
    features: [
      'Configurable employee advance limits (e.g. maximum 50% of monthly net salary)',
      'Multi-level authorization workflow with line manager and finance approval stages',
      'Automatic one-click integration into the next payroll cycle — zero manual spreadsheet reconciliation',
      'Zero risk of over-deduction: system enforces statutory minimum net pay safeguards',
    ],
    mockup: {
      type: 'advances',
      title: 'Staff Advance Requests',
      tag: 'Payroll Integration',
      items: [
        { name: 'Medical Emergency Advance', tag: 'UGX 1,200,000', user: 'Joan N. (Finance)', status: 'Approved', condition: 'Deducted July Run' },
        { name: 'School Fees Advance', tag: 'UGX 800,000', user: 'Moses K. (Ops)', status: 'Approved', condition: '2 Installments' },
        { name: 'Mid-Month Salary Advance', tag: 'UGX 500,000', user: 'Agnes B. (Support)', status: 'Pending', condition: 'Under Policy Limit' },
      ],
    },
  },
  {
    id: 'audit',
    title: 'Audit Logs & Governance',
    icon: History,
    badge: 'Enterprise Compliance',
    summary: 'Immutable, tamper-evident audit trails recording every salary change, access grant, and statutory export.',
    features: [
      'Comprehensive event logging: salary increases, bank details changes, tax status overrides, and user logins',
      'Granular attribution: records exact timestamp, user name, role, IP address, and before/after diff',
      'URA & external audit-ready: one-click CSV and PDF reports formatted for auditors and legal teams',
      'Compliant with Uganda’s Data Protection and Privacy Act 2019 data integrity mandates',
    ],
    mockup: {
      type: 'audit',
      title: 'System Audit & Activity Log',
      tag: 'Immutable Ledger',
      items: [
        { name: 'Salary Band Adjusted', tag: 'Base: 3.2M → 3.8M', user: 'HR Director (197.239.4.12)', status: 'Logged', condition: 'Before/After Diff' },
        { name: 'Bank Account Changed', tag: 'Stanbic → Centenary', user: 'Finance Lead (154.72.199.5)', status: 'Verified', condition: 'SMS OTP Confirmed' },
        { name: 'Payroll Run Committed', tag: 'Run ID: #PR-2026-07', user: 'Managing Director', status: 'Locked', condition: 'Hash Signed' },
      ],
    },
  },
]

export default function WorkforceOpsSection() {
  const [selectedId, setSelectedId] = useState(modules[0].id)
  const current = modules.find((m) => m.id === selectedId) || modules[0]
  const Icon = current.icon

  return (
    <section className="section-pad bg-offwhite">
      <div className="container-page">
        {/* Header */}
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-teal-primary">
              <Layers className="h-3.5 w-3.5" />
              Complete Workforce Operations
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink text-balance sm:text-4xl lg:text-[2.65rem] lg:leading-[1.2]">
              Beyond Spreadsheets: Hardware Custody to Mobile Portals
            </h2>
            <p className="mt-4 text-slate-muted text-pretty sm:text-lg">
              Manage the reality of running teams in East Africa — tracking physical company equipment, 
              giving staff mobile clock-ins, handling salary advance recovery, and maintaining tamper-evident audit logs.
            </p>
          </div>
        </Reveal>

        {/* Module Selector Pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          {modules.map((m) => {
            const ModIcon = m.icon
            const isSelected = m.id === selectedId
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedId(m.id)}
                className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
                  isSelected
                    ? 'border-2 border-teal-primary bg-white text-teal-primary shadow-card ring-2 ring-teal-primary/15'
                    : 'border border-ink/[0.08] bg-white/70 text-slate-muted hover:bg-white hover:text-ink'
                }`}
              >
                <ModIcon className={`h-4 w-4 ${isSelected ? 'text-teal-primary' : 'text-slate-400'}`} />
                <span>{m.title}</span>
              </button>
            )
          })}
        </div>

        {/* Active Module Showcase Card */}
        <div className="mt-10">
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-ink/[0.08] bg-white p-6 shadow-card-lg sm:p-10 lg:grid-cols-2 lg:gap-14">
              {/* Left Column: Descriptions & Checklist */}
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-primary/10 text-teal-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-cyan-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-primary">
                    {current.badge}
                  </span>
                </div>

                <h3 className="mt-4 font-heading text-2xl font-bold text-ink sm:text-3xl">
                  {current.title}
                </h3>

                <p className="mt-3 text-slate-muted leading-relaxed sm:text-base">
                  {current.summary}
                </p>

                <div className="mt-6 space-y-3">
                  {current.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-primary" />
                      <span className="text-xs sm:text-sm text-ink/80 leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Realistic In-App Interface Mockup */}
              <div className="rounded-2xl border border-ink/[0.08] bg-offwhite p-5 shadow-card sm:p-6">
                <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-primary text-white">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-ink">{current.mockup.title}</p>
                      <p className="text-[0.65rem] text-slate-muted">{current.mockup.tag}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-teal-primary/10 px-2.5 py-0.5 text-[0.65rem] font-bold text-teal-primary">
                    Active System
                  </span>
                </div>

                {/* Mockup Data Rows */}
                <div className="mt-4 space-y-2.5">
                  {current.mockup.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl border border-ink/[0.06] bg-white p-3 shadow-soft transition-all hover:border-ink/15"
                    >
                      <div>
                        <p className="text-xs font-bold text-ink">{item.name}</p>
                        <p className="text-[0.7rem] text-slate-500">{item.tag}</p>
                        <p className="text-[0.65rem] text-slate-400 mt-0.5">{item.user}</p>
                      </div>

                      <div className="text-right">
                        <span className="inline-block rounded-md bg-cyan-accent/15 px-2 py-0.5 text-[0.65rem] font-bold text-teal-primary">
                          {item.status}
                        </span>
                        <p className="mt-1 text-[0.65rem] font-medium text-slate-400">
                          {item.condition}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Bar of Mockup */}
                <div className="mt-4 flex items-center justify-between border-t border-ink/5 pt-3 text-[0.7rem] text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-teal-primary" />
                    Encrypted with Tenant-Scoped RLS
                  </span>
                  <span className="font-semibold text-teal-primary">Live OneHub Module</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
