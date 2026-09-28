import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Search, MapPin, Building2, Clock, ArrowRight, CheckCircle2, UserCheck, UploadCloud } from 'lucide-react'
import Reveal from '@/components/effects/Reveal'
import type { Job } from '@/types/jobs'
import { fetchJobs } from '@/services/jobsService'

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    const controller = new AbortController()
    fetchJobs(controller.signal)
      .then((data) => setJobs(data))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false))

    return () => {
      controller.abort()
    }
  }, [])

  const categories = ['All', 'Finance & Accounting', 'Technology & Engineering', 'Human Resources', 'Sales & Business Development']

  const filteredJobs = jobs.filter((job) => {
    const matchesCat = selectedCategory === 'All' || job.category === selectedCategory
    const companyName = job.company || ''
    const summaryText = job.summary || ''
    const matchesQuery =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summaryText.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesQuery
  })


  return (
    <div className="bg-offwhite text-ink">
      {/* Photographic Hero Section */}
      <section className="relative overflow-hidden bg-teal-deep py-20 text-white lg:py-28">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/jobs/interview-setting.jpg"
            alt="Corporate recruitment and interview panel in Kampala"
            className="h-full w-full object-cover filter brightness-[0.25] blur-[1px]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-teal-deep/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-grain opacity-10 mix-blend-overlay" />
        </div>

        <div className="container-page relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-accent backdrop-blur-md">
              <Briefcase className="h-3.5 w-3.5" />
              Recruitment Process Outsourcing (RPO)
            </span>
            <h1 className="mt-5 font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Open Roles &amp; Careers
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/75 sm:text-lg">
              JantaHR recruits on behalf of leading corporate organizations, high-growth startups, and international development institutions across Uganda and East Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Main Job Board Listing */}
      <section className="section-pad">
        <div className="container-page">
          {/* Search & Filter Toolbar */}
          <div className="mb-10 space-y-4 rounded-3xl border border-ink/[0.08] bg-white p-5 shadow-card sm:p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-muted" />
              <input
                type="text"
                placeholder="Search by role title, industry, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-ink/[0.1] bg-offwhite py-3.5 pl-12 pr-4 text-sm text-ink outline-none transition-colors focus:border-teal-primary focus:ring-2 focus:ring-teal-primary/20"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-ink/[0.06]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-teal-primary text-white shadow-sm'
                      : 'bg-offwhite text-slate-muted hover:bg-slate-100 hover:text-ink'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Job Cards */}
          {loading ? (
            <div className="flex items-center justify-center py-24" role="status">
              <div className="h-9 w-9 animate-spin rounded-full border-2 border-ink/10 border-t-teal-primary" />
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="rounded-3xl border border-ink/[0.08] bg-white p-12 text-center shadow-card">
              <Briefcase className="mx-auto h-12 w-12 text-slate-muted opacity-40" />
              <h3 className="mt-4 font-heading text-xl font-bold text-ink">No matching vacancies found</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-muted">
                Try adjusting your search filters or submit your CV to our general talent pool. We contact registered candidates as new client roles open.
              </p>
              <a href="#talent-pool" className="btn btn-primary btn-md mt-6 inline-flex items-center gap-2">
                Submit Your CV to Talent Pool
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-muted mb-4">
                Showing {filteredJobs.length} Open Position{filteredJobs.length > 1 ? 's' : ''}
              </p>

              {filteredJobs.map((job, idx) => (
                <Reveal key={job.id} delay={idx * 0.05}>
                  <div className="group rounded-3xl border border-ink/[0.08] bg-white p-6 shadow-card transition-all duration-300 hover:border-teal-primary/30 hover:shadow-card-lg sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="rounded-full bg-teal-primary/10 px-3 py-1 text-xs font-semibold text-teal-primary">
                            {job.category || 'Professional Role'}
                          </span>
                          <span className="rounded-full bg-ink/[0.04] px-3 py-1 text-xs font-medium text-slate-muted">
                            Job #{job.id}
                          </span>
                        </div>

                        <h3 className="font-heading text-xl font-bold text-ink sm:text-2xl">
                          <Link
                            to={`/jobs/${job.slug}`}
                            className="transition-colors hover:text-teal-primary"
                          >
                            {job.title}
                          </Link>
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-muted sm:text-sm">
                          <span className="inline-flex items-center gap-1.5 text-ink">
                            <Building2 className="h-4 w-4 text-teal-primary" />
                            Client: {job.company || 'Corporate Client'}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 text-teal-primary" />
                            {job.location || 'Uganda'}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-teal-primary" />
                            {job.employmentType || job.type || 'Full-time'}
                          </span>
                        </div>

                        <p className="max-w-3xl text-sm leading-relaxed text-slate-muted">
                          {job.summary}
                        </p>
                      </div>

                      <div className="shrink-0 pt-2 lg:pt-0">
                        <Link
                          to={`/jobs/${job.slug}`}
                          className="btn btn-primary btn-md w-full justify-center lg:w-auto"
                        >
                          View &amp; Apply
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* For Employers — Retain Our Recruitment Team */}
      <section className="border-t border-ink/[0.06] bg-white py-20 lg:py-28">
        <div className="container-page">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="left">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-ink/[0.08] shadow-card-lg">
                <img
                  src="/images/services/recruitment-interview.jpg"
                  alt="JantaHR recruitment director conducting corporate interview"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-teal-deep/85 p-4 backdrop-blur-md text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-cyan-accent">
                    Recruitment Process Outsourcing
                  </p>
                  <p className="text-xs text-white/80 mt-1">
                    90-Day Placement Guarantee · Competency-Based Candidate Screening
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.1}>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-teal-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-teal-primary">
                  <UserCheck className="h-3.5 w-3.5" />
                  For Employers &amp; Hiring Executives
                </span>

                <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  Need to Fill a Critical Vacancy or Outsource Your Hiring?
                </h2>

                <p className="mt-4 text-base leading-relaxed text-slate-muted">
                  Finding dependable, high-integrity talent in East Africa shouldn&apos;t drain your leadership team&apos;s bandwidth. Our executive search and RPO team manages sourcing, multi-stage interviews, skill testing, and reference checks.
                </p>

                <ul className="mt-6 space-y-3">
                  {[
                    'Confidential executive search for senior leadership roles',
                    'Full-cycle talent acquisition for scaling technical and operational teams',
                    'Competency-based behavioral interviewing & technical assessments',
                    'Contract negotiation, salary benchmarking, and onboarding advisory',
                  ].map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-ink/80">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-primary" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/contact" className="btn btn-primary btn-lg">
                    Retain Our Recruitment Team
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/services" className="btn btn-outline btn-lg">
                    Explore RPO Services
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Talent Network / Submit CV Section */}
      <section id="talent-pool" className="bg-teal-deep py-20 text-white lg:py-24">
        <div className="container-page text-center">
          <div className="mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-accent/30 bg-cyan-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-accent">
              <UploadCloud className="h-4 w-4" />
              Join Our Talent Network
            </span>
            <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Don&apos;t See a Role Matching Your Profile?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/75">
              Submit your curriculum vitae to the JantaHR Confidential Talent Pool. When our corporate clients request specialized skills or look to fill unadvertised roles, we search our vetted candidate network first.
            </p>
            <div className="mt-8 flex justify-center">
              <Link to="/contact" className="btn btn-primary btn-lg inline-flex items-center gap-2">
                Submit Your CV / Profile
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-4 text-xs text-white/50">
              Your information is held in strict confidence in compliance with the Uganda Data Protection Act 2019.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
