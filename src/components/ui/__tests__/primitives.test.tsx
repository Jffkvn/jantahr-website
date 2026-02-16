import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

describe('UI primitives', () => {
  it('renders button and handles click interaction', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button variant="outline" onClick={onClick}>
        Click me
      </Button>,
    );

    await user.click(screen.getByRole('button', { name: /click me/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders input and updates value as user types', async () => {
    const user = userEvent.setup();

    render(<Input aria-label="Work email" />);
    const input = screen.getByRole('textbox', { name: /work email/i });

    await user.type(input, 'team@jantahr.com');
    expect(input).toHaveValue('team@jantahr.com');
  });

  it('renders card structure content', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Course unit</CardTitle>
          <CardDescription>Description text</CardDescription>
        </CardHeader>
        <CardContent>Body content</CardContent>
      </Card>,
    );

    expect(screen.getByText('Course unit')).toBeInTheDocument();
    expect(screen.getByText('Description text')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });
});
