import { screen } from '@testing-library/react';
import NotFound from '@/pages/NotFound';
import { renderWithRouter } from '@/test/utils/renderWithRouter';

describe('NotFound page', () => {
  it('renders fallback content and recovery actions', () => {
    renderWithRouter(<NotFound />);

    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /contact us/i })).toHaveAttribute('href', '/contact');
  });
});
