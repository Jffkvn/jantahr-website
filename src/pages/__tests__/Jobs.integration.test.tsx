import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import Jobs from '@/pages/Jobs';
import { sampleJobs } from '@/test/fixtures/jobs';
import { server } from '@/test/msw/server';
import { renderWithRouter } from '@/test/utils/renderWithRouter';

describe('Jobs page integration', () => {
  it('loads jobs from API and renders listings', async () => {
    server.use(
      http.get('/data/jobs.json', () => {
        return HttpResponse.json(sampleJobs);
      }),
    );

    renderWithRouter(<Jobs />, { route: '/jobs' });

    expect(screen.getByText(/loading opportunities/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText(/loading opportunities/i)).not.toBeInTheDocument();
    });

    expect(await screen.findByText('Customer Success Associate')).toBeInTheDocument();
    expect(screen.getByText('Sales Operations Executive')).toBeInTheDocument();
    expect(screen.getByText(/showing/i)).toBeInTheDocument();
  });

  it('shows empty-state message when there are no openings', async () => {
    server.use(
      http.get('/data/jobs.json', () => {
        return HttpResponse.json([]);
      }),
    );

    renderWithRouter(<Jobs />, { route: '/jobs' });

    await waitFor(() => {
      expect(screen.queryByText(/loading opportunities/i)).not.toBeInTheDocument();
    });

    expect(screen.getByRole('heading', { name: /no openings available/i })).toBeInTheDocument();
  });

  it('shows error state and recovers on retry', async () => {
    let shouldFail = true;
    server.use(
      http.get('/data/jobs.json', () => {
        if (shouldFail) {
          return new HttpResponse(null, { status: 500 });
        }
        return HttpResponse.json(sampleJobs);
      }),
    );

    const user = userEvent.setup();
    renderWithRouter(<Jobs />, { route: '/jobs' });

    expect(await screen.findByRole('heading', { name: /unable to load jobs/i })).toBeInTheDocument();

    shouldFail = false;
    await user.click(screen.getByRole('button', { name: /try again/i }));

    await waitFor(() => {
      expect(screen.getByText('Customer Success Associate')).toBeInTheDocument();
    });
  });
});
