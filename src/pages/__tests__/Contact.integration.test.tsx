import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import Contact from '@/pages/Contact';
import { server } from '@/test/msw/server';
import { renderWithRouter } from '@/test/utils/renderWithRouter';

describe('Contact form integration', () => {
  it('exposes required field and email format validation semantics', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Contact />, { route: '/contact' });

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/^message \*/i);

    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(messageInput).toBeRequired();

    await user.type(emailInput, 'invalid-email');
    expect(emailInput.validity.typeMismatch).toBe(true);
    expect(emailInput).toBeInvalid();
  });

  it('submits successfully and shows confirmation message', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Contact />, { route: '/contact' });

    await user.type(screen.getByLabelText(/full name/i), 'Jeff Adhaya');
    await user.type(screen.getByLabelText(/email address/i), 'jeff@example.com');
    await user.type(screen.getByLabelText(/^message \*/i), 'Need HR support.');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /message sent!/i })).toBeInTheDocument();
    });
  });

  it('shows friendly error when submission fails', async () => {
    server.use(
      http.post('https://formspree.io/f/xnjbagpr', () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    const user = userEvent.setup();
    renderWithRouter(<Contact />, { route: '/contact' });

    await user.type(screen.getByLabelText(/full name/i), 'Jeff Adhaya');
    await user.type(screen.getByLabelText(/email address/i), 'jeff@example.com');
    await user.type(screen.getByLabelText(/^message \*/i), 'Need HR support.');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
