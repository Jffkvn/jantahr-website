import { useState, useId } from 'react'
import { Calculator, ArrowRight, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PayeCalculator() {
  const [grossInput, setGrossInput] = useState<string>('2500000')
  const [employeeType, setEmployeeType] = useState<'local' | 'global' | 'contractor'>('local')
  const grossSalary = Math.max(0, Number(grossInput.replace(/[^0-9]/g, '')) || 0)
  const grossInputId = useId()

  // Calculate Uganda PAYE
  function calculatePAYE(gross: number): number {
    if (employeeType === 'contractor') return 0
    let tax = 0
    if (gross > 410000) {
      tax += (gross - 410000) * 0.3
      tax += (410000 - 335000) * 0.2
      tax += (335000 - 235000) * 0.1
    } else if (gross > 335000) {
      tax += (gross - 335000) * 0.2
      tax += (335000 - 235000) * 0.1
    } else if (gross > 235000) {
      tax += (gross - 235000) * 0.1
    }

    // URA Super-earner surcharge: 10% on excess above UGX 10,000,000
    if (gross > 10000000) {
      tax += (gross - 10000000) * 0.1
    }
    return Math.round(tax)
  }

  // NSSF Calculations
  const nssfEmployee = employeeType === 'local' ? Math.round(grossSalary * 0.05) : 0
  const nssfEmployer = employeeType === 'local' ? Math.round(grossSalary * 0.10) : 0
  const paye = calculatePAYE(grossSalary)
  const wht = employeeType === 'contractor' ? Math.round(grossSalary * 0.06) : 0

  const totalDeductions = paye + nssfEmployee + wht
  const netPay = Math.max(0, grossSalary - totalDeductions)
  const totalEmployerCost = grossSalary + nssfEmployer

  function formatUGX(val: number): string {
    return 'UGX ' + val.toLocaleString('en-US')
  }

  return (
    <section id="calculator" className="scroll-mt-28 bg-white py-20 border-y border-ink/[0.06] lg:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-teal-primary">
            <Calculator className="h-3.5 w-3.5" />
            Interactive Lead Tool
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Live Uganda PAYE &amp; NSSF Calculator
          </h2>
          <p className="mt-3 text-slate-muted">
            Test the math that powers JantaHR OneHub. Fully updated to Uganda Revenue Authority (Income Tax Act) &amp; NSSF statutory regulations.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-ink/[0.08] bg-offwhite shadow-card-lg">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%]">
            {/* Input Controls */}
            <div className="border-b border-ink/[0.06] p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <label htmlFor={grossInputId} className="block text-xs font-bold uppercase tracking-wider text-ink">
                Monthly Gross Salary (UGX)
              </label>
              <div className="relative mt-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-muted">
                  UGX
                </span>
                <input
                  id={grossInputId}
                  type="text"
                  value={Number(grossInput).toLocaleString()}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/[^0-9]/g, '')
                    setGrossInput(clean || '0')
                  }}
                  className="w-full rounded-2xl border border-ink/[0.12] bg-white py-3.5 pl-14 pr-4 font-heading text-xl font-bold text-ink shadow-sm transition-all focus:border-teal-primary focus:outline-none focus:ring-2 focus:ring-teal-primary/20"
                />
              </div>

              {/* Quick Preset Buttons */}
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  { label: '800K', val: '800000' },
                  { label: '2.5M', val: '2500000' },
                  { label: '5.0M', val: '5000000' },
                  { label: '12M (Surcharge)', val: '12000000' },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setGrossInput(preset.val)}
                    className="rounded-lg border border-ink/[0.08] bg-white px-2.5 py-1 text-xs font-medium text-slate-muted transition-colors hover:border-teal-primary hover:text-teal-primary"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Employee Type Selection */}
              <div className="mt-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-ink">
                  Statutory Profile
                </label>
                <div className="mt-2 space-y-2">
                  {[
                    { key: 'local', title: 'Standard Local Staff', sub: 'Full PAYE + 5% NSSF' },
                    { key: 'global', title: 'Global / Expatriate', sub: 'Full PAYE only (No NSSF)' },
                    { key: 'contractor', title: 'Independent Contractor', sub: '6% Withholding Tax (WHT)' },
                  ].map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setEmployeeType(t.key as any)}
                      className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all ${
                        employeeType === t.key
                          ? 'border-teal-primary bg-teal-primary/5 text-ink shadow-sm ring-1 ring-teal-primary'
                          : 'border-ink/[0.06] bg-white text-slate-muted hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-semibold text-ink">{t.title}</p>
                        <p className="text-[0.65rem] text-slate-muted">{t.sub}</p>
                      </div>
                      <div
                        className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                          employeeType === t.key
                            ? 'border-teal-primary bg-teal-primary'
                            : 'border-ink/20 bg-white'
                        }`}
                      >
                        {employeeType === t.key && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-xl bg-teal-primary/5 p-3 text-xs text-slate-muted">
                <ShieldCheck className="h-4 w-4 shrink-0 text-teal-primary" />
                <span>Computed under Uganda Income Tax Act &amp; NSSF Act Cap 222</span>
              </div>
            </div>

            {/* Live Calculation Output */}
            <div className="flex flex-col justify-between bg-teal-deep p-6 text-white sm:p-8">
              <div>
                <span className="text-[0.68rem] font-bold uppercase tracking-widest text-cyan-accent">
                  Monthly Net Take-Home
                </span>
                <p className="mt-1 font-heading text-3xl font-extrabold text-white sm:text-4xl">
                  {formatUGX(netPay)}
                </p>

                <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/65">Gross Monthly Salary</span>
                    <span className="font-semibold text-white">{formatUGX(grossSalary)}</span>
                  </div>

                  {employeeType !== 'contractor' && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/65">PAYE Income Tax</span>
                      <span className="font-semibold text-rose-300">− {formatUGX(paye)}</span>
                    </div>
                  )}

                  {employeeType === 'local' && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/65">NSSF Employee (5%)</span>
                      <span className="font-semibold text-rose-300">− {formatUGX(nssfEmployee)}</span>
                    </div>
                  )}

                  {employeeType === 'contractor' && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/65">Withholding Tax (6%)</span>
                      <span className="font-semibold text-rose-300">− {formatUGX(wht)}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-white/10 pt-3 text-sm">
                    <span className="text-white/65">Total Deductions</span>
                    <span className="font-bold text-rose-300">− {formatUGX(totalDeductions)}</span>
                  </div>
                </div>

                {/* Employer Side Cost */}
                {employeeType === 'local' && (
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
                    <p className="text-[0.65rem] font-bold uppercase tracking-wider text-cyan-accent">
                      Employer Liability
                    </p>
                    <div className="mt-2 flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-white/70">NSSF Employer (10%)</span>
                      <span className="font-medium text-cyan-accent">+ {formatUGX(nssfEmployer)}</span>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between border-t border-white/10 pt-1.5 text-xs sm:text-sm">
                      <span className="font-semibold text-white">Total Company Cost</span>
                      <span className="font-bold text-white">{formatUGX(totalEmployerCost)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Call to Action */}
              <div className="mt-8 border-t border-white/10 pt-5">
                <p className="text-xs text-white/70">
                  Ready to eliminate manual spreadsheets for your entire organization?
                </p>
                <Link
                  to="/contact"
                  className="btn btn-primary btn-md mt-3 w-full justify-center group"
                >
                  Automate Your Payroll with JantaHR
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
