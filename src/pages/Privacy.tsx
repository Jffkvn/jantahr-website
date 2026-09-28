import { Link } from 'react-router-dom'
import { ShieldCheck, Lock, Eye, ArrowLeft, Mail } from 'lucide-react'
import { BRAND } from '@/lib/constants'

export default function Privacy() {
  const lastUpdated = 'September 28, 2026'

  return (
    <div className="bg-offwhite text-ink">
      <section className="bg-teal-deep py-16 text-white lg:py-20">
        <div className="container-page">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-cyan-accent hover:underline mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-accent/20 text-cyan-accent">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-accent">
              Compliance &amp; Trust
            </span>
          </div>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-white/70">
            Last Updated: {lastUpdated} · Compliant with the Uganda Data Protection and Privacy Act (2019)
          </p>
        </div>
      </section>

      <section className="container-page py-16 lg:py-24">
        <div className="mx-auto max-w-3xl space-y-12 rounded-3xl border border-ink/[0.06] bg-white p-8 shadow-card sm:p-12">
          <div>
            <h2 className="font-heading text-2xl font-bold text-ink">1. Overview</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-muted">
              {BRAND.legalName} (&quot;JantaHR&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting the privacy, confidentiality, and security of all individuals who interact with our marketing websites, consult with our advisory team, or utilize our proprietary HR and payroll platforms (&quot;JantaHR OneHub&quot;).
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-muted">
              This Policy details our procedures regarding the collection, storage, processing, and transfer of personal and enterprise information in strict compliance with the laws of the Republic of Uganda, including the <strong>Data Protection and Privacy Act, 2019</strong> and international data protection standards.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-ink">2. Information We Collect</h2>
            <div className="mt-4 space-y-4 text-sm text-slate-muted">
              <div className="rounded-xl border border-ink/[0.06] bg-offwhite p-4">
                <h3 className="font-heading font-semibold text-ink">A. Contact &amp; Inquiry Data</h3>
                <p className="mt-1">
                  When you submit a contact request, demo inquiry, or training registration, we collect your full name, work email address, phone number, company name, and inquiry details.
                </p>
              </div>
              <div className="rounded-xl border border-ink/[0.06] bg-offwhite p-4">
                <h3 className="font-heading font-semibold text-ink">B. Recruitment &amp; Candidate Information</h3>
                <p className="mt-1">
                  When candidates apply for open client vacancies through our recruitment board or submit their curriculum vitae, we collect educational history, employment history, contact information, references, and professional certifications.
                </p>
              </div>
              <div className="rounded-xl border border-ink/[0.06] bg-offwhite p-4">
                <h3 className="font-heading font-semibold text-ink">C. Client Platform Data (JantaHR OneHub)</h3>
                <p className="mt-1">
                  For client organizations using our software platform, we process employee dossiers, National Identification Numbers (NIN), Tax Identification Numbers (TIN), NSSF numbers, bank account numbers, salary grades, attendance records, and leave balances strictly as a Data Processor on behalf of the client (Data Controller).
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-ink">3. Lawful Basis &amp; Purpose of Processing</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-muted">
              We process personal information under the following legitimate grounds:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-muted">
              <li><strong>Performance of a Contract:</strong> To deliver recruitment process outsourcing (RPO), staff training cohorts, HR consultancy, and platform subscriptions.</li>
              <li><strong>Statutory Compliance:</strong> Ensuring proper computation and filing of Uganda Revenue Authority (PAYE) obligations and National Social Security Fund (NSSF) contributions.</li>
              <li><strong>Legitimate Interests:</strong> Responding to inquiries, enhancing site performance, preventing malicious fraud, and safeguarding system integrity.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-ink">4. Security Measures &amp; Data Safeguards</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-muted">
              We apply enterprise-level technical and organizational security controls:
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl border border-ink/[0.06] p-4">
                <Lock className="h-5 w-5 shrink-0 text-teal-primary" />
                <div className="text-sm">
                  <h4 className="font-semibold text-ink">Row-Level Security (RLS)</h4>
                  <p className="mt-1 text-slate-muted">Tenant data is cryptographically isolated. No cross-organization data leakage is possible.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-ink/[0.06] p-4">
                <Eye className="h-5 w-5 shrink-0 text-teal-primary" />
                <div className="text-sm">
                  <h4 className="font-semibold text-ink">Role Scoped Access</h4>
                  <p className="mt-1 text-slate-muted">Only authorized administrators view payroll or employee dossiers with full audit trails.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-ink">5. Data Retention &amp; Your Rights</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-muted">
              Under Section 24 of the Uganda Data Protection and Privacy Act 2019, individuals have the right to request access to their personal data, seek rectification of erroneous information, or request lawful deletion when retention is no longer required.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-muted">
              Candidate CVs submitted to our talent pool are retained for a maximum of 24 months, after which they are securely archived or purged unless renewed consent is granted.
            </p>
          </div>

          <div className="border-t border-ink/[0.06] pt-8">
            <h2 className="font-heading text-xl font-bold text-ink">Contact Our Data Protection Officer</h2>
            <p className="mt-2 text-sm text-slate-muted">
              If you have any questions, subject access requests, or compliance inquiries, please contact our team directly:
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-6 text-sm font-medium text-teal-primary">
              <a href={`mailto:${BRAND.email}`} className="inline-flex items-center gap-2 hover:underline">
                <Mail className="h-4 w-4" />
                {BRAND.email}
              </a>
              <span>{BRAND.location}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
