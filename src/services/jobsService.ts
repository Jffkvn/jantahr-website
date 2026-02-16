import type { Job } from '@/data/jobs';

const JOBS_ENDPOINT = import.meta.env.VITE_JOBS_ENDPOINT?.trim() || '/data/jobs.json';

function normalizeJobsPayload(payload: unknown): Job[] {
  if (Array.isArray(payload)) {
    return payload as Job[];
  }

  if (
    payload &&
    typeof payload === 'object' &&
    Array.isArray((payload as { jobs?: unknown }).jobs)
  ) {
    return (payload as { jobs: Job[] }).jobs;
  }

  return [];
}

export async function fetchJobs(signal?: AbortSignal): Promise<Job[]> {
  const response = await fetch(JOBS_ENDPOINT, {
    method: 'GET',
    signal,
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to load jobs: ${response.status}`);
  }

  const payload = (await response.json()) as unknown;
  return normalizeJobsPayload(payload);
}

export async function fetchJobBySlug(slug: string, signal?: AbortSignal): Promise<Job | null> {
  const jobs = await fetchJobs(signal);
  return jobs.find((job) => job.slug === slug) ?? null;
}
