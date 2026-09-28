import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL } from '@/lib/constants'

type PageMeta = { title: string; description: string }

const DEFAULT_META: PageMeta = {
  title: 'JantaHR | Human-Centered HR Consulting in East Africa',
  description:
    'JantaHR Consulting partners with organizations to build strong people systems, develop capable teams, and create inclusive, high-performing workplaces across Uganda and the region.',
}

const ROUTE_META: Array<{ pattern: RegExp; meta: PageMeta }> = [
  { pattern: /^\/$/, meta: DEFAULT_META },
  {
    pattern: /^\/services\/?$/,
    meta: {
      title: 'HR Consulting Services | JantaHR',
      description:
        'Staff training, recruitment process outsourcing, compensation consulting, HR technology, outsourcing, compliance, and applied AI for the workplace.',
    },
  },
  {
    pattern: /^\/platform\/?$/,
    meta: {
      title: 'JantaHR Platform | HR & Payroll Software for East Africa',
      description:
        'An integrated HR & Payroll platform with automated URA-compliant PAYE & NSSF, employee dossiers, leave, advances, performance, audit trail, and reporting.',
    },
  },
  {
    pattern: /^\/ai-training\/?$/,
    meta: {
      title: 'AI Awareness & Workplace Readiness Training | JantaHR',
      description:
        'Practical AI workplace training for Kampala and East Africa teams — readiness, customer service, sales support, and responsible AI use.',
    },
  },
  {
    pattern: /^\/about\/?$/,
    meta: {
      title: 'About JantaHR',
      description:
        'A people-first HR consultancy and platform company. Learn how we support organizations to build strong, compliant, and high-performing workplaces.',
    },
  },
  {
    pattern: /^\/team\/?$/,
    meta: {
      title: 'Our Team | JantaHR',
      description:
        'Meet the JantaHR team of HR consultants, trainers, and advisors supporting organizations across Uganda and East Africa.',
    },
  },
  {
    pattern: /^\/jobs\/?$/,
    meta: {
      title: 'Jobs & Careers | JantaHR',
      description: 'Browse open roles and career opportunities with JantaHR and our partners.',
    },
  },
  {
    pattern: /^\/pricing\/?$/,
    meta: {
      title: 'Pricing & Packages | JantaHR Software & Consulting',
      description:
        'Transparent, scalable HR & payroll software packages for growing businesses in East Africa. Starter, Growth, and Enterprise options.',
    },
  },
  {
    pattern: /^\/privacy\/?$/,
    meta: {
      title: 'Privacy Policy | JantaHR',
      description:
        'JantaHR data protection and privacy policy compliant with the Uganda Data Protection and Privacy Act 2019.',
    },
  },
  {
    pattern: /^\/contact\/?$/,
    meta: {
      title: 'Contact JantaHR',
      description:
        'Contact JantaHR in Kampala for HR consulting, workplace training, a platform demo, or AI readiness guidance.',
    },
  },
]

function resolvePageMeta(pathname: string): PageMeta {
  return (
    ROUTE_META.find((r) => r.pattern.test(pathname))?.meta ?? {
      title: 'Page Not Found | JantaHR',
      description: 'The page you requested was not found. Explore JantaHR services and contact us.',
    }
  )
}

function ensure(attr: 'name' | 'property', key: string): HTMLMetaElement {
  const existing = document.querySelector(`meta[${attr}="${key}"]`)
  if (existing instanceof HTMLMetaElement) return existing
  const tag = document.createElement('meta')
  tag.setAttribute(attr, key)
  document.head.appendChild(tag)
  return tag
}

function ensureCanonical(): HTMLLinkElement {
  const existing = document.querySelector('link[rel="canonical"]')
  if (existing instanceof HTMLLinkElement) return existing
  const tag = document.createElement('link')
  tag.setAttribute('rel', 'canonical')
  document.head.appendChild(tag)
  return tag
}

export default function SeoManager() {
  const location = useLocation()

  useEffect(() => {
    const { title, description } = resolvePageMeta(location.pathname)
    const canonicalUrl = `${SITE_URL}${location.pathname === '/' ? '' : location.pathname}`

    document.title = title
    ensure('name', 'description').setAttribute('content', description)
    ensure('property', 'og:title').setAttribute('content', title)
    ensure('property', 'og:description').setAttribute('content', description)
    ensure('property', 'og:url').setAttribute('content', canonicalUrl)
    ensure('name', 'twitter:title').setAttribute('content', title)
    ensure('name', 'twitter:description').setAttribute('content', description)
    ensureCanonical().setAttribute('href', canonicalUrl)
  }, [location.pathname])

  return null
}
