export type Job = {
  id: number;
  slug: string;
  title: string;
  company: string;
  location: string;
  type: string;
  posted: string;
  category: string;
  summary: string;
  description: string;
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
  applyUrl?: string;
};

const DEFAULT_FORM_BASE_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdV0-NoexQU95DFQEB0tBoSt7qApbtN6iveATAgk_McMiDGjw/viewform';
const DEFAULT_FORM_ROLE_TITLE_KEY = 'entry.1078004677';

type GoogleFormPrefillConfig = {
  baseUrl: string;
  roleTitleKey: string;
  roleSlugKey: string;
  companyNameKey: string;
  sourcePageKey: string;
  externalJobIdKey: string;
};

type ApplyUrlInput =
  | string
  | (Pick<Job, 'id' | 'slug' | 'title' | 'company'> & {
      sourcePage?: string;
    })
  | undefined;

export function getGoogleFormPrefillConfig(): GoogleFormPrefillConfig {
  return {
    baseUrl: import.meta.env.VITE_GOOGLE_FORM_BASE_URL?.trim() || DEFAULT_FORM_BASE_URL,
    roleTitleKey:
      import.meta.env.VITE_GOOGLE_FORM_ROLE_TITLE_KEY?.trim() || DEFAULT_FORM_ROLE_TITLE_KEY,
    roleSlugKey: import.meta.env.VITE_GOOGLE_FORM_ROLE_SLUG_KEY?.trim() || '',
    companyNameKey: import.meta.env.VITE_GOOGLE_FORM_COMPANY_KEY?.trim() || '',
    sourcePageKey: import.meta.env.VITE_GOOGLE_FORM_SOURCE_PAGE_KEY?.trim() || '',
    externalJobIdKey: import.meta.env.VITE_GOOGLE_FORM_JOB_ID_KEY?.trim() || '',
  };
}

function setQueryParamIfDefined(
  params: URLSearchParams,
  key: string,
  value: string | number | undefined,
) {
  if (!key || value === undefined || value === null || value === '') {
    return;
  }

  params.set(key, String(value));
}

export const buildApplyUrl = (
  jobInput?: ApplyUrlInput,
  overrideUrl?: string,
  config: GoogleFormPrefillConfig = getGoogleFormPrefillConfig(),
) => {
  if (overrideUrl) return overrideUrl;

  const parsedInput: {
    id?: number;
    slug?: string;
    title?: string;
    company?: string;
    sourcePage?: string;
  } =
    typeof jobInput === 'string'
      ? {
          title: jobInput,
        }
      : jobInput || {};

  const roleTitle = parsedInput.title?.trim() ? parsedInput.title : 'General Application';
  const sourcePage = parsedInput.sourcePage || (parsedInput.slug ? `/jobs/${parsedInput.slug}` : '');
  const params = new URLSearchParams();

  setQueryParamIfDefined(params, config.roleTitleKey, roleTitle);
  setQueryParamIfDefined(params, config.roleSlugKey, parsedInput.slug);
  setQueryParamIfDefined(params, config.externalJobIdKey, parsedInput.id);
  setQueryParamIfDefined(params, config.companyNameKey, parsedInput.company);
  setQueryParamIfDefined(params, config.sourcePageKey, sourcePage);

  const query = params.toString();
  if (!query) {
    return config.baseUrl;
  }

  const joinChar = config.baseUrl.includes('?') ? '&' : '?';
  return `${config.baseUrl}${joinChar}${query}`;
};

export const GENERAL_APPLICATION_URL = buildApplyUrl();
