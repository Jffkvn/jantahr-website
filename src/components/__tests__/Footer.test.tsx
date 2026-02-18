import { screen } from '@testing-library/react';
import Footer from '@/components/Footer';
import { renderWithRouter } from '@/test/utils/renderWithRouter';

describe('Footer', () => {
  it('renders core footer links and contact details', () => {
    renderWithRouter(<Footer />);

    expect(screen.getByRole('link', { name: /Core HR Services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Training & Development/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /About Us/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'hello@jantahr.com' })).toHaveAttribute(
      'href',
      'mailto:hello@jantahr.com',
    );
    expect(screen.getByRole('link', { name: 'jantahrconsult@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:jantahrconsult@gmail.com',
    );
  });

  it('shows current year in the copyright text', () => {
    renderWithRouter(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${currentYear} JantaHR Consulting`, 'i')),
    ).toBeInTheDocument();
  });
});
