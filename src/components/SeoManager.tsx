import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type PageMeta = {
  title: string;
  description: string;
};

const SITE_URL = (import.meta.env.VITE_SITE_URL?.trim() || 'https://jantahr.netlify.app').replace(
  /\/$/,
  '',
);

const DEFAULT_META: PageMeta = {
  title: 'JantaHR Consulting | Human-Centered HR Solutions',
  description:
    'JantaHR Consulting provides practical HR consulting, recruitment support, workplace training, and AI readiness programs for organizations in Kampala and East Africa.',
};

const ROUTE_META: Array<{ pattern: RegExp; meta: PageMeta }> = [
  {
    pattern: /^\/$/,
    meta: DEFAULT_META,
  },
  {
    pattern: /^\/services\/?$/,
    meta: {
      title: 'HR Services | JantaHR Consulting',
      description:
        'Explore JantaHR services including staff training, recruitment process outsourcing, compensation consulting, HR technology, compliance, and AI workplace support.',
    },
  },
  {
    pattern: /^\/ai-training\/?$/,
    meta: {
      title: 'AI Awareness and Workplace Readiness Training | JantaHR',
      description:
        'Practical AI workplace training for Kampala and East Africa teams covering readiness, customer service, sales support, and safe responsible AI use.',
    },
  },
  {
    pattern: /^\/about\/?$/,
    meta: {
      title: 'About JantaHR Consulting',
      description:
        'Learn about JantaHR Consulting, our people-first approach, and how we support organizations to build strong, compliant, and high-performing workplaces.',
    },
  },
  {
    pattern: /^\/team\/?$/,
    meta: {
      title: 'Our Team | JantaHR Consulting',
      description:
        'Meet the JantaHR team of HR consultants, trainers, and advisors supporting organizations across Uganda and the East African region.',
    },
  },
  {
    pattern: /^\/jobs\/?$/,
    meta: {
      title: 'Jobs and Career Opportunities | JantaHR',
      description:
        'Browse open roles and career opportunities listed by JantaHR Consulting. Search, filter, and apply to current openings with our partner organizations.',
    },
  },
  {
    pattern: /^\/jobs\/[^/]+\/?$/,
    meta: {
      title: 'Job Details | JantaHR Careers',
      description:
        'View role details, responsibilities, and requirements for current job opportunities listed on JantaHR Careers.',
    },
  },
  {
    pattern: /^\/contact\/?$/,
    meta: {
      title: 'Contact JantaHR Consulting',
      description:
        'Contact JantaHR Consulting in Kampala for HR consulting, workplace training, recruitment support, or AI readiness guidance.',
    },
  },
];

function ensureMetaTagByName(name: string): HTMLMetaElement {
  const existing = document.querySelector(`meta[name="${name}"]`);
  if (existing instanceof HTMLMetaElement) {
    return existing;
  }

  const tag = document.createElement('meta');
  tag.setAttribute('name', name);
  document.head.appendChild(tag);
  return tag;
}

function ensureMetaTagByProperty(property: string): HTMLMetaElement {
  const existing = document.querySelector(`meta[property="${property}"]`);
  if (existing instanceof HTMLMetaElement) {
    return existing;
  }

  const tag = document.createElement('meta');
  tag.setAttribute('property', property);
  document.head.appendChild(tag);
  return tag;
}

function ensureCanonicalTag(): HTMLLinkElement {
  const existing = document.querySelector('link[rel="canonical"]');
  if (existing instanceof HTMLLinkElement) {
    return existing;
  }

  const tag = document.createElement('link');
  tag.setAttribute('rel', 'canonical');
  document.head.appendChild(tag);
  return tag;
}

function resolvePageMeta(pathname: string): PageMeta {
  const route = ROUTE_META.find((candidate) => candidate.pattern.test(pathname));
  return route?.meta ?? {
    title: 'Page Not Found | JantaHR Consulting',
    description: 'The page you requested was not found. Explore JantaHR services and contact us.',
  };
}

const SeoManager = () => {
  const location = useLocation();

  useEffect(() => {
    const { title, description } = resolvePageMeta(location.pathname);
    const canonicalUrl = `${SITE_URL}${location.pathname === '/' ? '' : location.pathname}`;

    document.title = title;

    ensureMetaTagByName('description').setAttribute('content', description);
    ensureMetaTagByName('robots').setAttribute('content', 'index,follow');

    ensureMetaTagByProperty('og:title').setAttribute('content', title);
    ensureMetaTagByProperty('og:description').setAttribute('content', description);
    ensureMetaTagByProperty('og:url').setAttribute('content', canonicalUrl);
    ensureMetaTagByProperty('og:type').setAttribute('content', 'website');

    ensureMetaTagByName('twitter:title').setAttribute('content', title);
    ensureMetaTagByName('twitter:description').setAttribute('content', description);
    ensureMetaTagByName('twitter:card').setAttribute('content', 'summary_large_image');

    ensureCanonicalTag().setAttribute('href', canonicalUrl);
  }, [location.pathname]);

  return null;
};

export default SeoManager;
