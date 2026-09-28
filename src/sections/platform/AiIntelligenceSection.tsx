import { useState } from 'react'
import { 
  Sparkles, 
  ShieldAlert, 
  AlertTriangle, 
  Bot, 
  CheckCircle2, 
  Send, 
  TrendingUp, 
  Clock, 
  ShieldCheck
} from 'lucide-react'
import Reveal from '@/components/effects/Reveal'

export default function AiIntelligenceSection() {
  const [activeTab, setActiveTab] = useState<'anomalies' | 'chat' | 'leave'>('anomalies')

  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        {/* Header */}
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-accent/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-teal-primary">
              <Sparkles className="h-3.5 w-3.5 text-cyan-accent" />
              Applied AI in JantaHR OneHub
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink text-balance sm:text-4xl lg:text-[2.65rem] lg:leading-[1.2]">
              Intelligent Safeguards That Protect Your Payroll &amp; Guide HR
            </h2>
            <p className="mt-4 text-slate-muted text-pretty sm:text-lg">
              Beyond basic tax formulas — JantaHR OneHub embeds intelligent anomaly detection, 
              an in-app Uganda labour law copilot, and predictive leave analytics to keep your operations error-free.
            </p>
          </div>
        </Reveal>

        {/* Tab Switcher */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-2xl border border-ink/[0.08] bg-offwhite p-1.5 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab('anomalies')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
                activeTab === 'anomalies'
                  ? 'bg-teal-primary text-white shadow-sm'
                  : 'text-slate-muted hover:text-ink'
              }`}
            >
              <ShieldAlert className="h-4 w-4" />
              Payroll Draft Anomaly Audit
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
                activeTab === 'chat'
                  ? 'bg-teal-primary text-white shadow-sm'
                  : 'text-slate-muted hover:text-ink'
              }`}
            >
              <Bot className="h-4 w-4" />
              In-App HR AI Copilot
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('leave')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
                activeTab === 'leave'
                  ? 'bg-teal-primary text-white shadow-sm'
                  : 'text-slate-muted hover:text-ink'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              Leave Pattern Insights
            </button>
          </div>
        </div>

        {/* Tab 1: AI Payroll Draft Anomaly Audits */}
        {activeTab === 'anomalies' && (
          <Reveal>
            <div className="mt-10 grid grid-cols-1 items-center gap-10 rounded-3xl border border-ink/[0.08] bg-offwhite p-6 shadow-card-lg sm:p-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-primary">
                  <ShieldCheck className="h-4 w-4" />
                  Pre-Disbursement Audit Engine
                </span>
                <h3 className="mt-3 font-heading text-2xl font-bold text-ink sm:text-3xl">
                  Catch Costly Payroll Errors Before Bank Payouts
                </h3>
                <p className="mt-3 text-slate-muted leading-relaxed">
                  Before you commit payroll or upload EFT bank disbursement files, JantaHR’s automated audit engine evaluates every line against trailing historical trends, tax thresholds, and banking records.
                </p>

                <div className="mt-6 space-y-3.5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-primary/10 text-teal-primary font-bold text-xs">
                      1
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">Salary Deviation Flagging</p>
                      <p className="text-xs text-slate-muted">Alerts on net pay swings exceeding 5% compared to the 3-month trailing average with clear root-cause breakdown.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-primary/10 text-teal-primary font-bold text-xs">
                      2
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">Ghost Account &amp; Duplicate Detection</p>
                      <p className="text-xs text-slate-muted">Flags duplicate mobile money numbers, matching bank account numbers, or duplicate NIN identifiers.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-primary/10 text-teal-primary font-bold text-xs">
                      3
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">Statutory Compliance Verification</p>
                      <p className="text-xs text-slate-muted">Catches missing URA TINs or unregistered NSSF numbers before generating the monthly URA returns.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Realistic Anomaly UI Mockup */}
              <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-card sm:p-6">
                <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-ink">AI Payroll Audit Report</p>
                      <p className="text-[0.65rem] text-slate-muted">Draft Run #PR-2026-07 · 142 Employees Scanned</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[0.65rem] font-bold text-amber-700">
                    2 Anomalies Flagged
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {/* Flag 1 */}
                  <div className="rounded-xl border border-amber-200/80 bg-amber-50/50 p-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <span className="rounded bg-amber-200/60 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-amber-800">
                        Net Pay Deviation (+34%)
                      </span>
                      <span className="text-[0.68rem] text-slate-muted">Emp ID: #JH-084</span>
                    </div>
                    <p className="mt-2 text-xs font-semibold text-ink">
                      Brenda Nabirye · Operations Lead
                    </p>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                      Current Net: <strong>UGX 3,450,000</strong> (vs 3-mo avg UGX 2,570,000). Root cause: Unscheduled overtime addition of UGX 880,000 not pre-approved.
                    </p>
                  </div>

                  {/* Flag 2 */}
                  <div className="rounded-xl border border-rose-200/80 bg-rose-50/50 p-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <span className="rounded bg-rose-200/60 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-rose-800">
                        Duplicate Bank Account
                      </span>
                      <span className="text-[0.68rem] text-rose-700 font-semibold">Critical</span>
                    </div>
                    <p className="mt-2 text-xs font-semibold text-ink">
                      Stanbic A/C 903001844209
                    </p>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                      Shared between <strong>David Okello</strong> (#JH-019) and new contractor <strong>Paul Ssemwogerere</strong> (#JH-141). Flagged for review before EFT generation.
                    </p>
                  </div>

                  {/* Resolved Item */}
                  <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/50 px-3.5 py-2.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span className="text-xs font-medium text-emerald-800">
                        140 employees passed URA PAYE &amp; NSSF statutory checks
                      </span>
                    </div>
                    <span className="text-[0.65rem] font-bold text-emerald-700">Verified</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-ink/5">
                  <span className="text-[0.7rem] text-slate-muted">Checked via JantaHR Anomaly Guard</span>
                  <button type="button" className="btn btn-sm btn-teal text-xs">
                    Resolve &amp; Approve Run
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Tab 2: In-App AI HR Assistant */}
        {activeTab === 'chat' && (
          <Reveal>
            <div className="mt-10 grid grid-cols-1 items-center gap-10 rounded-3xl border border-ink/[0.08] bg-offwhite p-6 shadow-card-lg sm:p-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-primary">
                  <Bot className="h-4 w-4" />
                  Contextual AI Copilot
                </span>
                <h3 className="mt-3 font-heading text-2xl font-bold text-ink sm:text-3xl">
                  Instant Answers to Uganda Labour Law &amp; HR Questions
                </h3>
                <p className="mt-3 text-slate-muted leading-relaxed">
                  HR managers and company executives have a built-in AI copilot directly inside the workspace. Trained on the Uganda Employment Act 2006, URA guidelines, and NSSF statutory rules to deliver verified advisory on demand.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="rounded-xl border border-ink/[0.06] bg-white p-3.5 shadow-soft">
                    <p className="text-xs font-bold text-ink">Statutory Severance &amp; Notice Calculations</p>
                    <p className="mt-0.5 text-xs text-slate-muted">Calculates notice periods and terminal benefits based on exact years of service and contract classification.</p>
                  </div>
                  <div className="rounded-xl border border-ink/[0.06] bg-white p-3.5 shadow-soft">
                    <p className="text-xs font-bold text-ink">Disciplinary &amp; Termination Documentation</p>
                    <p className="mt-0.5 text-xs text-slate-muted">Drafts compliant notice of hearing letters, summary dismissal warnings, and mutual separation agreements.</p>
                  </div>
                  <div className="rounded-xl border border-ink/[0.06] bg-white p-3.5 shadow-soft">
                    <p className="text-xs font-bold text-ink">Instant Policy &amp; Leave Guidance</p>
                    <p className="mt-0.5 text-xs text-slate-muted">Clarifies statutory maternity leave (60 working days), paternity leave, and public holiday overtime rates.</p>
                  </div>
                </div>
              </div>

              {/* Realistic Chat Drawer Mockup */}
              <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-card sm:p-6">
                <div className="flex items-center justify-between border-b border-ink/10 pb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-accent text-ink font-bold">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-ink">JantaHR Assistant</p>
                      <p className="text-[0.65rem] text-emerald-600 font-medium">● Online · Uganda Labour Law Copilot</p>
                    </div>
                  </div>
                  <span className="rounded bg-teal-primary/10 px-2 py-0.5 text-[0.65rem] font-bold text-teal-primary">
                    HR Copilot
                  </span>
                </div>

                <div className="mt-4 space-y-3 text-xs">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-teal-primary px-4 py-2.5 text-white">
                      What is the legal notice period required to terminate an employee with 3.5 years of continuous service?
                    </div>
                  </div>

                  {/* AI Message */}
                  <div className="flex items-start gap-2.5">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-accent/20 text-teal-primary font-bold">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                    <div className="max-w-[90%] rounded-2xl rounded-tl-sm border border-ink/[0.08] bg-offwhite p-3.5 text-ink leading-relaxed">
                      <p className="font-semibold text-teal-primary text-[0.7rem] uppercase tracking-wide">
                        Uganda Employment Act 2006, Section 58(3)(c)
                      </p>
                      <p className="mt-1">
                        For an employee with service between <strong>1 year and 5 years</strong>, the minimum statutory notice period is <strong>not less than one (1) month</strong>, or one month’s basic salary in lieu of notice.
                      </p>
                      <div className="mt-2.5 rounded-lg border border-ink/10 bg-white p-2.5 text-[0.68rem] text-slate-700">
                        <p className="font-semibold text-ink">Action Suggestion:</p>
                        <p className="mt-0.5 text-slate-600">
                          Would you like me to draft an official <strong>Notice of Termination with 1 Month In-Lieu Settlement</strong> for this staff member?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input Simulation */}
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-ink/15 bg-offwhite p-1.5 pl-3">
                  <span className="text-xs text-slate-400">Ask about probation, severance, tax, or drafting...</span>
                  <button type="button" className="ml-auto rounded-lg bg-teal-primary p-2 text-white shadow-sm">
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Tab 3: Leave Pattern Insights */}
        {activeTab === 'leave' && (
          <Reveal>
            <div className="mt-10 grid grid-cols-1 items-center gap-10 rounded-3xl border border-ink/[0.08] bg-offwhite p-6 shadow-card-lg sm:p-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-primary">
                  <TrendingUp className="h-4 w-4" />
                  Workforce Intelligence
                </span>
                <h3 className="mt-3 font-heading text-2xl font-bold text-ink sm:text-3xl">
                  AI-Powered Leave Monitoring &amp; Burnout Prevention
                </h3>
                <p className="mt-3 text-slate-muted leading-relaxed">
                  Leave hoarding and unexpected absenteeism disrupt operations and inflate financial liabilities. JantaHR OneHub continuously monitors team leave accumulation, predicting year-end bottlenecks before they materialize.
                </p>

                <div className="mt-6 space-y-3.5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-accent/20 text-teal-primary font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">Q4 Leave Liability Cliff Warnings</p>
                      <p className="text-xs text-slate-muted">Alerts HR when departments accumulate excess untaken annual days, preventing end-of-year skeleton crews and cash-out liabilities.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-accent/20 text-teal-primary font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">Absence Clustering &amp; Burnout Signals</p>
                      <p className="text-xs text-slate-muted">Identifies repeated Monday/Friday sick day patterns or continuous overtime stretches indicating team strain.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-accent/20 text-teal-primary font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">Department Coverage Forecasting</p>
                      <p className="text-xs text-slate-muted">Automatically warns line managers if concurrent leave approvals drop department staffing below minimum threshold.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Realistic Leave Insights Dashboard Mockup */}
              <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-card sm:p-6">
                <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-teal-primary" />
                    <p className="text-xs font-bold text-ink">Workforce Leave &amp; Health Insights</p>
                  </div>
                  <span className="text-[0.65rem] font-semibold text-slate-500">Live AI Analytics</span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-900">Q4 Accrued Leave Alert</span>
                      <span className="rounded bg-amber-200/70 px-2 py-0.5 text-[0.65rem] font-bold text-amber-800">Engineering</span>
                    </div>
                    <p className="mt-1 text-xs text-amber-950">
                      78% of software engineers hold &gt;16 unspent leave days. 6 individuals requested overlapping December leave.
                    </p>
                    <div className="mt-2.5 flex items-center gap-2">
                      <button type="button" className="rounded-lg bg-amber-700 px-2.5 py-1 text-[0.65rem] font-bold text-white">
                        Send Department Leave Nudge
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-ink/[0.08] bg-offwhite p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-ink">Company-Wide Utilization</span>
                      <span className="text-xs font-bold text-teal-primary">64% on track</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink/10">
                      <div className="h-full bg-gradient-to-r from-teal-primary to-cyan-accent" style={{ width: '64%' }} />
                    </div>
                    <p className="mt-2 text-[0.68rem] text-slate-muted">
                      Annual statutory entitlement: 21 days · Current average used: 13.4 days
                    </p>
                  </div>

                  <div className="rounded-xl border border-ink/[0.08] bg-offwhite p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-ink">Absence Coverage Status</span>
                      <span className="rounded bg-emerald-100 px-2 py-0.5 text-[0.65rem] font-bold text-emerald-800">Optimal</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-600">
                      Finance &amp; Operations teams have 100% handover coverage mapped for upcoming holiday cycles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
