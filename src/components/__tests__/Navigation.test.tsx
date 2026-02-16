import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navigation from '@/components/Navigation';
import { renderWithRouter } from '@/test/utils/renderWithRouter';

describe('Navigation', () => {
  it('renders primary navigation links and marks current route as active', () => {
    renderWithRouter(<Navigation />, { route: '/ai-training' });

    expect(screen.getAllByRole('link', { name: 'Home' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Services' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'AI Training' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Contact' }).length).toBeGreaterThan(0);

    const aiTrainingLinks = screen.getAllByRole('link', { name: 'AI Training' });
    expect(
      aiTrainingLinks.some((link) => link.className.includes('text-[#006c8b]')),
    ).toBe(true);
  });

  it('toggles mobile menu state with accessibility attributes', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Navigation />, { route: '/' });

    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });
});
