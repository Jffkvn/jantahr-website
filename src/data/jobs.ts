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

// Replace these with your Google Form values.
// FORM_BASE_URL example:
// https://docs.google.com/forms/d/e/FORM_ID/viewform
// FORM_JOB_FIELD_KEY example:
// entry.1234567890
export const FORM_BASE_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdV0-NoexQU95DFQEB0tBoSt7qApbtN6iveATAgk_McMiDGjw/viewform';
export const FORM_JOB_FIELD_KEY = 'entry.1078004677';

export const buildApplyUrl = (jobTitle?: string, overrideUrl?: string) => {
  if (overrideUrl) return overrideUrl;

  const title = jobTitle?.trim() ? jobTitle : 'General Application';
  const encoded = encodeURIComponent(title);
  const joinChar = FORM_BASE_URL.includes('?') ? '&' : '?';

  return `${FORM_BASE_URL}${joinChar}${FORM_JOB_FIELD_KEY}=${encoded}`;
};

export const GENERAL_APPLICATION_URL = buildApplyUrl();
