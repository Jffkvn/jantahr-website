import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter, ArrowUpRight } from 'lucide-react'
import { BRAND } from '@/lib/constants'
import Logo from '@/components/ui/Logo'

const footerNav = {
  company: [
    { label: 'About', path: '/about' },
    { label: 'Our Team', path: '/team' },
    { label: 'Careers & Jobs', path: '/jobs' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Contact', path: '/contact' },
  ],
  solutions: [
    { label: 'HR Consulting', path: '/services' },
    { label: 'JantaHR Platform', path: '/platform' },
    { label: 'Pricing Plans', path: '/pricing' },
    { label: 'AI Training', path: '/ai-training' },
    { label: 'Book a demo', path: '/contact' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-teal-deep text-white">
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-80 w-[50rem] -translate-x-1/2 rounded-full bg-cyan-accent/[0.08] blur-3xl"
      />
      <div className="absolute inset-0 bg-grain opacity-[0.05] mix-blend-overlay" aria-hidden />

      <div className="container-page relative py-14 lg:py-16">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-10 lg:mb-14 lg:flex-row lg:items-center lg:pb-12">
          <div>
            <h3 className="font-heading text-2xl font-bold tracking-tight text-balance lg:text-[1.75rem]">
              Let&apos;s build a stronger, more capable workplace.
            </h3>
            <p className="mt-2.5 max-w-md text-sm text-white/60 sm:text-base">
              Talk to a consultant, or see the JantaHR Platform in action.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link to="/contact" className="btn btn-primary btn-lg">
              Talk to us
            </Link>
            <Link to="/platform" className="btn btn-outline-light btn-lg">
              Explore the platform
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2">
            <Logo variant="light" heightClass="h-9 sm:h-10" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Human-centered HR consulting and a payroll &amp; HR platform built for East Africa.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {[
                { Icon: Linkedin, href: BRAND.socials.linkedin, label: 'LinkedIn' },
                { Icon: Instagram, href: BRAND.socials.instagram, label: 'Instagram' },
                { Icon: Twitter, href: BRAND.socials.twitter, label: 'X' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`JantaHR on ${label}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/75 transition-all hover:border-cyan-accent/30 hover:bg-cyan-accent/15 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">Solutions</p>
            <ul className="mt-4 space-y-2.5">
              {footerNav.solutions.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.path}
                    className="group inline-flex items-center gap-1 text-sm text-white/55 transition-colors hover:text-white"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">Company</p>
            <ul className="mt-4 space-y-2.5">
              {footerNav.company.map((l) => (
                <li key={l.label}>
                  <Link to={l.path} className="text-sm text-white/55 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">Contact</p>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5 text-white/55">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-cyan-accent" />
                <div className="space-y-0.5">
                  {BRAND.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block hover:text-white">
                      {p}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-2.5 text-white/55">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cyan-accent" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-white">
                  {BRAND.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-white/55">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-accent" />
                {BRAND.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-7 text-sm text-white/40 md:flex-row">
          <p>
            © {year} {BRAND.legalName}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-accent" />
            Kampala · Uganda
          </p>
        </div>
      </div>
    </footer>
  )
}
