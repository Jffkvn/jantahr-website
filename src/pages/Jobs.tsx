import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  Briefcase,
  Search,
  MapPin,
  Building2,
  Clock,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  UserCheck,
  UploadCloud,
  Layers,
} from 'lucide-react'
import Reveal from '@/components/effects/Reveal'
import PageHero from '@/components/ui/PageHero'
import TalentPoolForm from '@/components/recruitment/TalentPoolForm'
import type { Job } from '@/types/jobs'
import { fetchJobs } from '@/services/jobsService'

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const formContainerRef = useRef<HTMLDivElement>(null)

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

  const categories = [
    'All',
    'Finance & Accounting',
    'Technology & Engineering',
    'Human Resources',
    'Sales & Business Development',
  ]

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

  const handleToggleForm = () => {
    setIsFormOpen((prev) => {
      const nextState = !prev
      if (nextState) {
        setTimeout(() => {
          formContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 150)
      }
      return nextState
    })
  }

  return (
    <div className="bg-offwhite text-ink">
      {/* Brand PageHero — Deep Teal with Cyan Glow & Grain */}
      <PageHero
        eyebrow="Talent Network · East Africa"
        title="Find Your Next Role"
        description="JantaHR recruits on behalf of fast-scaling startups, high-growth tech companies, leading corporates, and international institutions across Uganda and East Africa."
      />

      {/* Main Section */}
      <section className="section-pad">
        <div className="container-page">
          {loading ? (
            <div className="flex items-center justify-center py-24" role="status">
              <div className="h-9 w-9 animate-spin rounded-full border-2 border-ink/10 border-t-teal-primary" />
            </div>
          ) : jobs.length === 0 ? (
            <div className="space-y-12">
              {/* Centered "No Open Roles" Card matching clean app banner */}
              <Reveal>
                <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-teal-deep p-8 text-center text-white shadow-card-lg sm:p-12 lg:p-16">
                  {/* Subtle ambient glow mesh */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                      background:
                        'radial-gradient(ellipse 70% 60% at 50% 20%, rgba(46,195,229,0.18), transparent 70%), radial-gradient(ellipse 50% 50% at 80% 80%, rgba(0,108,139,0.35), transparent 70%)',
                    }}
                    aria-hidden
                  />
                  <div className="pointer-events-none absolute inset-0 bg-grain opacity-10 mix-blend-overlay" aria-hidden />

                  <div className="relative z-10 mx-auto max-w-2xl">
                    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-accent/30 bg-cyan-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-accent">
                      <UploadCloud className="h-4 w-4" />
                      Join Our Talent Network
                    </span>

                    <h2 className="mt-6 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.65rem]">
                      No Open Roles Right Now?
                    </h2>

                    <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">
                      We don&apos;t have any open vacancies listed at the moment, but our clients—from funded startups to established corporates—frequently ask us to shortlist talent directly.
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
                      Submit your CV to our private talent pool so we can reach out directly for private shortlisting or upcoming roles.
                    </p>

                    <div className="mt-8 flex justify-center">
                      <button
                        type="button"
                        onClick={handleToggleForm}
                        className="btn btn-primary btn-lg inline-flex items-center gap-2.5 shadow-md"
                      >
                        <span>{isFormOpen ? 'Hide Submission Form' : 'Submit Your CV / Profile'}</span>
                        <ArrowDown className={`h-4 w-4 transition-transform duration-300 ${isFormOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    <p className="mt-6 text-xs text-white/50">
                      Your information is held in strict confidence in compliance with the Uganda Data Protection Act 2019.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Collapsible Direct CV Submission Form */}
              <div ref={formContainerRef}>
                <AnimatePresence>
                  {isFormOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: 16 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: 16 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <TalentPoolForm onClose={() => setIsFormOpen(false)} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Search & Filter Toolbar */}
              <div className="space-y-4 rounded-3xl border border-ink/[0.08] bg-white p-5 shadow-card sm:p-6">
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
              {filteredJobs.length === 0 ? (
                <div className="rounded-3xl border border-ink/[0.08] bg-white p-12 text-center shadow-card">
                  <Briefcase className="mx-auto h-12 w-12 text-slate-muted opacity-40" />
                  <h3 className="mt-4 font-heading text-xl font-bold text-ink">
                    No matching vacancies found
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-muted">
                    Try adjusting your search query or submit your CV to our general talent pool.
                  </p>
                  <button
                    type="button"
                    onClick={handleToggleForm}
                    className="btn btn-primary btn-md mt-6 inline-flex items-center gap-2"
                  >
                    <span>{isFormOpen ? 'Hide Submission Form' : 'Submit Your CV to Talent Pool'}</span>
                    <ArrowDown className={`h-4 w-4 transition-transform duration-300 ${isFormOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-muted">
                      Showing {filteredJobs.length} Open Position
                      {filteredJobs.length > 1 ? 's' : ''}
                    </p>
                    <button
                      type="button"
                      onClick={handleToggleForm}
                      className="text-xs font-semibold text-teal-primary hover:underline inline-flex items-center gap-1"
                    >
                      <span>{isFormOpen ? 'Hide CV form' : 'Or submit CV to talent pool'}</span>
                      <ArrowDown className={`h-3 w-3 transition-transform duration-300 ${isFormOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {filteredJobs.map((job, idx) => (
                    <Reveal key={job.id} delay={idx * 0.05}>
                      <div className="group rounded-3xl border border-ink/[0.08] bg-white p-6 shadow-card transition-all duration-300 hover:border-teal-primary/30 hover:shadow-card-lg sm:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                          <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <span className="rounded-full bg-teal-primary/10 px-3 py-1 text-xs font-semibold text-teal-primary">
                                {job.category || 'Role'}
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
                                Client: {job.company || 'Client Organization'}
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

              {/* Collapsible Direct CV Submission Form */}
              <div ref={formContainerRef} className="pt-6">
                <AnimatePresence>
                  {isFormOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: 16 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: 16 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <TalentPoolForm onClose={() => setIsFormOpen(false)} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
                    Recruitment Process Outsourcing (RPO)
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
                  For Employers &amp; Hiring Teams
                </span>

                <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  Need to Fill a Critical Vacancy or Outsource Your Hiring?
                </h2>

                <p className="mt-4 text-base leading-relaxed text-slate-muted">
                  Finding dependable, high-integrity talent in East Africa shouldn&apos;t drain your leadership team&apos;s bandwidth. Our recruitment and RPO team manages sourcing, multi-stage interviews, skill testing, and reference checks for startups, growth-stage ventures, and enterprise organizations.
                </p>

                <ul className="mt-6 space-y-3">
                  {[
                    'Targeted candidate search for key leadership and technical roles',
                    'Full-cycle talent acquisition for scaling engineering, sales, and operations teams',
                    'Competency-based behavioral interviewing & practical assessments',
                    'Offer negotiation, salary benchmarking, and onboarding advisory',
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

      {/* Talent Network Guarantee Strip */}
      <section className="bg-teal-deep py-16 text-white">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-accent/30 bg-cyan-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-accent">
              <Layers className="h-4 w-4" />
              Uganda &amp; East Africa Talent Pool
            </span>
            <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Strict Candidate Privacy &amp; Data Ethics
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/75">
              Your curriculum vitae, compensation data, and professional credentials are never shared publicly or released without your informed consent. We operate in full compliance with the Uganda Data Protection and Privacy Act 2019.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
