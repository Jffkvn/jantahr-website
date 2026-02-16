import { render, screen } from '@testing-library/react';
import App from '@/App';

describe('App routing integration', () => {
  it('shows fallback page on invalid routes', async () => {
    window.history.pushState({}, 'Invalid route test', '/this-route-does-not-exist');

    render(<App />);

    expect(await screen.findByRole('heading', { name: /page not found/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/');
  });
});
