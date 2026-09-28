import { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  HelpCircle, 
  Sparkles, 
  Users, 
  Building2, 
  Zap,
  PhoneCall,
  ChevronDown,
  ChevronUp,
  Minus,
  Layers
} from 'lucide-react'
import Reveal from '@/components/effects/Reveal'
import TiltCard from '@/components/effects/TiltCard'

const TIERS = [
  {
    name: 'Starter',
    badge: 'Growing Teams',
    description: 'Essential HR, self-service employee portal, and automated statutory payroll for startups and small organizations.',
    employees: '1 – 25 employees',
    features: [
      'URA-compliant automated payroll (PAYE, NSSF, LST)',
      'Digital employee master dossiers & contract records',
      'Leave tracking & annual statutory holiday calendar',
      'Employee self-service mobile portal (MyPay)',
      'Downloadable official PDF payslips & Excel bank EFT files',
      'Email & WhatsApp onboarding support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Growth',
    badge: 'Most Popular',
    description: 'Comprehensive people operations with asset tracking, salary advances, AI draft checks, and performance reviews.',
    employees: '26 – 100 employees',
    features: [
      'Everything in Starter, plus:',
      'Company asset custody & hardware tracking (Assets.jsx)',
      'Staff salary advance requests & auto-recovery (Advances.jsx)',
      'AI Payroll Draft Anomaly Audits (detect-anomalies)',
      'Structured performance appraisal cycles & 360° feedback',
      'Geo-verified mobile attendance clock-in',
      'Pay grade bands & compensation benchmarking',
      'Immutable compliance audit logging (AuditLog.jsx)',
      'Dedicated HR account specialist',
    ],
    cta: 'Book a Demo',
    popular: true,
  },
  {
    name: 'Enterprise',
    badge: 'Custom Scope',
    description: 'Tailored HR infrastructure, in-app AI assistant, multi-entity payroll, and executive consulting for large institutions.',
    employees: '100+ employees',
    features: [
      'Everything in Growth, plus:',
      'In-App AI HR Assistant & Labour Law Copilot (ChatDrawer)',
      'AI workforce leave & burnout pattern insights',
      'Multi-branch / multi-subsidiary payroll consolidation',
      'Custom statutory deduction formulas & expat gross-up tax',
      'Custom accounting & ERP integrations (SAP, QuickBooks, Xero)',
      'Custom SLA & 24/7 priority emergency support',
      'Annual labor law compliance audit & URA dispute advisory',
    ],
    cta: 'Talk to an Advisor',
    popular: false,
  },
]

type MatrixCategory = {
  category: string
  features: {
    name: string
    starter: string | boolean
    growth: string | boolean
    enterprise: string | boolean
    hint?: string
  }[]
}

const FEATURE_MATRIX: MatrixCategory[] = [
  {
    category: 'Core Payroll & Uganda Statutory Tax',
    features: [
      { name: 'URA PAYE, NSSF (10% / 5%) & LST calculations', starter: true, growth: true, enterprise: true, hint: 'Strictly aligned to Uganda Income Tax Act & NSSF guidelines' },
      { name: 'Bank EFT & Mobile Money bulk disbursement files', starter: true, growth: true, enterprise: true, hint: 'Formats ready for Stanbic, Centenary, Absa, DFCU, MTN, Airtel' },
      { name: 'Digital employee dossiers & contract records', starter: true, growth: true, enterprise: true },
      { name: 'Official PDF payslip generation & email dispatch', starter: true, growth: true, enterprise: true },
      { name: 'Custom recurring allowances, bonuses & deductions', starter: 'Basic (up to 3)', growth: 'Unlimited', enterprise: 'Unlimited' },
      { name: 'Multi-branch & Expatriate gross-up tax calculations', starter: false, growth: true, enterprise: true },
      { name: 'URA bulk monthly return export file formatting', starter: true, growth: true, enterprise: true },
    ],
  },
  {
    category: 'AI & Automation Suite',
    features: [
      { name: 'AI Pre-Disbursement Payroll Anomaly Audit', starter: false, growth: true, enterprise: true, hint: 'Detects net pay deviations >5%, ghost accounts & duplicate bank records' },
      { name: 'In-App AI HR Assistant & Labour Law Copilot', starter: false, growth: false, enterprise: true, hint: 'Trained on Uganda Employment Act 2006 for instant compliance Q&A' },
      { name: 'AI Leave Pattern & Burnout Risk Analytics', starter: false, growth: false, enterprise: true, hint: 'Monitors accrued leave hoarding & department staffing bottlenecks' },
    ],
  },
  {
    category: 'Workforce Operations & Property Custody',
    features: [
      { name: 'Company Asset Custody & Serial Hardware Tracking', starter: false, growth: true, enterprise: true, hint: 'Track laptops, phones, vehicles, serial numbers & condition grades' },
      { name: 'Offboarding Equipment Return Verification Checklist', starter: false, growth: true, enterprise: true, hint: 'Ensures zero company hardware loss before final terminal pay' },
      { name: 'Staff Salary Advances & Automated Payroll Deductions', starter: false, growth: true, enterprise: true, hint: 'Configurable advance caps with automated deduction next payroll run' },
      { name: 'Pay Grade Bands & Progression Scales', starter: false, growth: true, enterprise: true },
    ],
  },
  {
    category: 'Time, Attendance & Performance',
    features: [
      { name: 'Employee Self-Service Mobile Portal (MyPay)', starter: true, growth: true, enterprise: true },
      { name: 'Mobile Attendance Clock-in with GPS Verification', starter: false, growth: true, enterprise: true },
      { name: 'Leave Requests & Statutory Balance Accruals', starter: true, growth: true, enterprise: true },
      { name: 'Structured Performance Appraisal Cycles & OKRs', starter: false, growth: true, enterprise: true, hint: 'Quarterly, bi-annual & annual goal evaluation cycles' },
      { name: '360° Manager, Peer & Self Evaluations', starter: false, growth: true, enterprise: true },
    ],
  },
  {
    category: 'Security, Governance & Support',
    features: [
      { name: 'Multi-Tenant Database Row-Level Security (RLS)', starter: true, growth: true, enterprise: true },
      { name: 'Immutable Audit Trail & Regulatory Exports', starter: '30 Days', growth: '1 Year', enterprise: 'Unlimited' },
      { name: 'Role-Based Access Controls (Admin, HR, Finance, Staff)', starter: 'Standard', growth: 'Configurable', enterprise: 'Custom Roles' },
      { name: 'Uganda Data Protection & Privacy Act 2019 Compliance', starter: true, growth: true, enterprise: true },
      { name: 'Dedicated HR Account Specialist', starter: 'Email & WhatsApp', growth: 'Dedicated HR Lead', enterprise: 'Executive Consultant' },
      { name: 'Assisted Historical Data & Payroll Migration', starter: 'Self-service Guide', growth: 'Included Free', enterprise: 'White-glove Managed' },
    ],
  },
]

const FAQS = [
  {
    q: 'How does JantaHR handle Uganda statutory deductions (PAYE & NSSF)?',
    a: 'Our calculations engine is strictly coded to URA tax bands per the Income Tax Act (including super-earner surcharges over UGX 10M) and statutory NSSF employer (10%) and employee (5%) requirements. Deductions, overtime, and pro-rata are calculated automatically.',
  },
  {
    q: 'Can we switch between HR software and full HR outsourcing?',
    a: 'Yes. Many clients start using JantaHR OneHub internally, while others outsource their entire recruitment, payroll, and staff training to our consulting team. We adapt seamlessly to your operating model.',
  },
  {
    q: 'How long does implementation and data migration take?',
    a: 'For teams under 100 employees, typical onboarding takes 3 to 5 business days. Our team formats and uploads your historical staff records, pay grades, and balances at zero hassle to you.',
  },
  {
    q: 'Is our company and employee data secure?',
    a: 'Yes. Every organization enjoys strict database-level row-level security (RLS), end-to-end encrypted storage, role-scoped permissions, and an immutable audit log compliant with Uganda’s Data Protection and Privacy Act 2019.',
  },
]

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [showMatrix, setShowMatrix] = useState(true)

  const renderCell = (val: string | boolean) => {
    if (typeof val === 'boolean') {
      return val ? (
        <Check className="mx-auto h-4 w-4 text-teal-primary" />
      ) : (
        <Minus className="mx-auto h-4 w-4 text-slate-300" />
      )
    }
    return <span className="text-xs font-semibold text-ink">{val}</span>
  }

  return (
    <div className="bg-offwhite text-ink">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-teal-deep py-20 text-white lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[56rem] -translate-x-1/2 rounded-full bg-cyan-accent/[0.1] blur-3xl"
        />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.06] mix-blend-overlay" />

        <div className="container-page relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-accent backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Transparent &amp; Scalable
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="mt-6 font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Predictable Investment for <br className="hidden sm:block" />
            <span className="text-cyan-accent">High-Performing Teams</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-base text-white/70 sm:text-lg"
          >
            Whether you need modern HR software, full-service payroll administration, or corporate staff development, our packages scale to your exact workforce size.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container-page relative -mt-12 z-20 pb-16 lg:pb-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {TIERS.map((tier, idx) => (
            <Reveal key={tier.name} delay={idx * 0.1} className="h-full">
              <TiltCard
                className={`relative flex h-full flex-col justify-between rounded-3xl p-8 transition-all ${
                  tier.popular
                    ? 'border-2 border-teal-primary bg-white shadow-card-lg ring-4 ring-teal-primary/10'
                    : 'border border-ink/[0.08] bg-white shadow-card'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-xl font-bold text-ink">{tier.name}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                        tier.popular
                          ? 'bg-teal-primary text-white'
                          : 'bg-ink/[0.05] text-slate-muted'
                      }`}
                    >
                      {tier.badge}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-slate-muted">{tier.description}</p>

                  <div className="mt-6 border-y border-ink/[0.06] py-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-teal-primary">
                      <Users className="h-4 w-4" />
                      <span>{tier.employees}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-muted">Custom scoping per headcount</p>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">
                      Included Capabilities
                    </p>
                    <ul className="mt-4 space-y-3">
                      {tier.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-3 text-sm text-ink/80">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-primary" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-ink/[0.06]">
                  <Link
                    to="/contact"
                    className={`btn btn-lg w-full justify-center group ${
                      tier.popular ? 'btn-primary' : 'btn-outline'
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Feature Comparison Matrix Header & Toggle */}
        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={() => setShowMatrix(!showMatrix)}
            className="inline-flex items-center gap-2 rounded-2xl border border-teal-primary/20 bg-white px-6 py-3 font-heading text-sm font-bold text-teal-primary shadow-sm hover:bg-teal-primary/5 transition-all"
          >
            <Layers className="h-4 w-4" />
            <span>{showMatrix ? 'Hide Detailed Plan Comparison' : 'See More to Compare Plans (25+ Features)'}</span>
            {showMatrix ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        {/* Comprehensive Feature Comparison Matrix */}
        {showMatrix && (
          <Reveal>
            <div className="mt-8 overflow-hidden rounded-3xl border border-ink/[0.08] bg-white shadow-card-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-ink/10 bg-offwhite">
                      <th className="py-5 px-6 font-heading text-sm font-bold text-ink w-2/5">
                        Features &amp; Modules
                      </th>
                      <th className="py-5 px-4 font-heading text-sm font-bold text-center text-ink w-1/5">
                        Starter
                        <span className="block text-[0.7rem] font-normal text-slate-500">1 – 25 Staff</span>
                      </th>
                      <th className="py-5 px-4 font-heading text-sm font-bold text-center text-teal-primary w-1/5 bg-teal-primary/5">
                        Growth
                        <span className="block text-[0.7rem] font-normal text-teal-700">26 – 100 Staff</span>
                      </th>
                      <th className="py-5 px-4 font-heading text-sm font-bold text-center text-ink w-1/5">
                        Enterprise
                        <span className="block text-[0.7rem] font-normal text-slate-500">100+ Staff</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {FEATURE_MATRIX.map((section) => (
                      <Fragment key={section.category}>
                        <tr className="border-t border-b border-ink/10 bg-ink/[0.02]">
                          <td
                            colSpan={4}
                            className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-teal-primary"
                          >
                            {section.category}
                          </td>
                        </tr>
                        {section.features.map((feat) => (
                          <tr
                            key={feat.name}
                            className="border-b border-ink/[0.04] hover:bg-offwhite/50 transition-colors"
                          >
                            <td className="py-3.5 px-6">
                              <p className="text-sm font-medium text-ink">{feat.name}</p>
                              {feat.hint && (
                                <p className="text-[0.7rem] text-slate-400 mt-0.5">{feat.hint}</p>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              {renderCell(feat.starter)}
                            </td>
                            <td className="py-3.5 px-4 text-center bg-teal-primary/[0.02]">
                              {renderCell(feat.growth)}
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              {renderCell(feat.enterprise)}
                            </td>
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-offwhite border-t border-ink/10">
                <span className="text-xs text-slate-500">
                  All tiers include automated URA statutory updates and secure cloud hosting.
                </span>
                <Link to="/contact" className="btn btn-teal btn-sm">
                  Request Custom Quote
                </Link>
              </div>
            </div>
          </Reveal>
        )}

        {/* AI Training Banner */}
        <Reveal delay={0.2} className="mt-14">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-teal-deep via-teal-primary to-teal-deep p-8 text-white shadow-card-lg sm:p-12">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[60%_40%]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-cyan-accent/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-accent">
                  <Zap className="h-3.5 w-3.5" />
                  Applied AI Workforce Training
                </span>
                <h3 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">
                  Empower Your Workforce with Practical AI
                </h3>
                <p className="mt-3 text-sm text-white/80 sm:text-base">
                  Looking specifically for staff development? Our workplace AI readiness cohorts start at <strong>UGX 250,000 per participant</strong> with customized on-site and remote interactive sessions.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link to="/ai-training" className="btn btn-primary btn-lg">
                  Explore AI Curriculum
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Trust & Guarantee Strip */}
      <section className="border-y border-ink/[0.06] bg-white py-14">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-primary/10 text-teal-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-ink">100% Statutory Compliant</h4>
                <p className="mt-1 text-sm text-slate-muted">
                  Fully grounded in Uganda’s Employment Act, URA PAYE brackets, and NSSF guidelines.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-primary/10 text-teal-primary">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-ink">No Hidden Lock-in</h4>
                <p className="mt-1 text-sm text-slate-muted">
                  Export your payroll records, employee files, and tax documentation anytime with full data ownership.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-primary/10 text-teal-primary">
                <PhoneCall className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-ink">Local Support in Kampala</h4>
                <p className="mt-1 text-sm text-slate-muted">
                  Reach real HR professionals who understand regional labour dynamics and payroll schedules.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container-page py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-muted">
            Have questions about software onboarding, pricing, or compliance? Here are direct answers.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {FAQS.map((faq, i) => (
            <div
              key={faq.q}
              className="overflow-hidden rounded-2xl border border-ink/[0.08] bg-white transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between p-6 text-left font-heading font-semibold text-ink transition-colors hover:text-teal-primary"
              >
                <span>{faq.q}</span>
                <HelpCircle
                  className={`h-5 w-5 shrink-0 text-slate-muted transition-transform duration-200 ${
                    openFaq === i ? 'rotate-180 text-teal-primary' : ''
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="border-t border-ink/[0.06] p-6 pt-4 text-sm leading-relaxed text-slate-muted">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-muted">
            Need a custom proposal for your organization?
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg mt-4 inline-flex items-center gap-2">
            Schedule a Consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
