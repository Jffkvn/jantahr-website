import { describe, expect, it } from 'vitest';
import { buildApplyUrl } from '@/data/jobs';

describe('buildApplyUrl', () => {
  it('returns override apply URL when provided', () => {
    const overrideUrl = 'https://example.com/custom-apply';
    expect(buildApplyUrl('Any Role', overrideUrl)).toBe(overrideUrl);
  });

  it('builds prefill URL with all metadata parameters when keys are configured', () => {
    const url = buildApplyUrl(
      {
        id: 1007,
        slug: 'node-js-back-end-software-engineer',
        title: 'Node JS Back End Software Engineer',
        company: 'SafeBoda',
      },
      undefined,
      {
        baseUrl: 'https://docs.google.com/forms/d/e/test-form/viewform',
        roleTitleKey: 'entry.1111111111',
        roleSlugKey: 'entry.2222222222',
        companyNameKey: 'entry.3333333333',
        sourcePageKey: 'entry.4444444444',
        externalJobIdKey: 'entry.5555555555',
      },
    );

    const parsed = new URL(url);
    expect(parsed.searchParams.get('entry.1111111111')).toBe('Node JS Back End Software Engineer');
    expect(parsed.searchParams.get('entry.2222222222')).toBe('node-js-back-end-software-engineer');
    expect(parsed.searchParams.get('entry.3333333333')).toBe('SafeBoda');
    expect(parsed.searchParams.get('entry.4444444444')).toBe('/jobs/node-js-back-end-software-engineer');
    expect(parsed.searchParams.get('entry.5555555555')).toBe('1007');
  });

  it('falls back to General Application when no job title is provided', () => {
    const url = buildApplyUrl(
      undefined,
      undefined,
      {
        baseUrl: 'https://docs.google.com/forms/d/e/test-form/viewform',
        roleTitleKey: 'entry.1111111111',
        roleSlugKey: '',
        companyNameKey: '',
        sourcePageKey: '',
        externalJobIdKey: '',
      },
    );

    const parsed = new URL(url);
    expect(parsed.searchParams.get('entry.1111111111')).toBe('General Application');
  });
});
