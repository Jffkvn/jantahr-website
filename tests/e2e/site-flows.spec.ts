import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { e2eJobs } from './fixtures/jobs';

async function mockExternalDependencies(page: import('@playwright/test').Page) {
  await page.route('**/data/jobs.json', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(e2eJobs),
    });
  });

  await page.route('**/formspree.io/**', async (route) => {
    if (route.request().method() === 'OPTIONS') {
      await route.fulfill({
        status: 204,
        headers: {
          'access-control-allow-origin': '*',
          'access-control-allow-methods': 'POST, OPTIONS',
          'access-control-allow-headers': '*',
        },
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: {
        'access-control-allow-origin': '*',
      },
      body: JSON.stringify({ ok: true }),
    });
  });
}

async function expectNoSeriousA11yViolations(page: import('@playwright/test').Page) {
  const results = await new AxeBuilder({ page }).disableRules(['color-contrast']).analyze();
  const seriousViolations = results.violations.filter((violation) => {
    return violation.impact === 'serious' || violation.impact === 'critical';
  });

  expect(seriousViolations, `Serious/critical a11y violations: ${JSON.stringify(seriousViolations)}`).toEqual([]);
}

test.beforeEach(async ({ page }) => {
  await mockExternalDependencies(page);
});

test('homepage loads and primary CTA navigation works', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: /Human-Centered HR Solutions for Today's Workplace/i }),
  ).toBeVisible();

  await page.getByRole('link', { name: /Explore Our Services/i }).click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(
    page.getByRole('heading', { name: /Comprehensive HR Solutions/i }),
  ).toBeVisible();
});

test('header navigation works across main pages', async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  await page.goto('/');
  const isMobile = testInfo.project.name.includes('mobile');

  if (isMobile) {
    await page.getByRole('button', { name: /toggle menu/i }).click();
    await page.locator('#mobile-menu').getByRole('link', { name: 'Services' }).click();
    await expect(page).toHaveURL(/\/services$/);

    await page.getByRole('button', { name: /toggle menu/i }).click();
    await page.locator('#mobile-menu').getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL(/\/contact$/);
    return;
  }

  const navChecks: Array<{ link: string; path: RegExp; heading: RegExp }> = [
    { link: 'Services', path: /\/services$/, heading: /Comprehensive HR Solutions/i },
    { link: 'AI Training', path: /\/ai-training$/, heading: /AI Awareness and Workplace Readiness/i },
    { link: 'About', path: /\/about$/, heading: /Building Stronger Workplaces Together/i },
    { link: 'Team', path: /\/team$/, heading: /Meet Our People/i },
    { link: 'Jobs', path: /\/jobs$/, heading: /Find Your Next Role/i },
    { link: 'Contact', path: /\/contact$/, heading: /Let's Start a Conversation/i },
  ];

  for (const check of navChecks) {
    await page.getByRole('link', { name: check.link }).first().click();
    await expect(page).toHaveURL(check.path);
    await expect(page.locator('h1').filter({ hasText: check.heading })).toBeVisible();
  }
});

test('contact form validation for required fields and email format', async ({ page }) => {
  await page.goto('/contact');

  const emailInput = page.getByLabel(/Email Address/i);
  const nameInput = page.getByLabel(/Full Name/i);
  const messageInput = page.getByLabel(/^Message \*/i);

  await expect(nameInput).toHaveAttribute('required', '');
  await expect(emailInput).toHaveAttribute('required', '');
  await expect(messageInput).toHaveAttribute('required', '');

  await emailInput.fill('invalid-email');
  const hasTypeMismatch = await emailInput.evaluate((element) => {
    return (element as HTMLInputElement).validity.typeMismatch;
  });
  expect(hasTypeMismatch).toBeTruthy();
});

test('contact form submits successfully', async ({ page }) => {
  await page.goto('/contact');

  const emailInput = page.getByLabel(/Email Address/i);
  const nameInput = page.getByLabel(/Full Name/i);
  const messageInput = page.getByLabel(/^Message \*/i);
  const submitButton = page.getByRole('button', { name: /Send Message/i });

  await nameInput.fill('Jeff Adhaya');
  await emailInput.fill('jeff@example.com');
  await messageInput.fill('Need HR advisory support.');

  const submissionRequest = page.waitForRequest(
    (request) => request.method() === 'POST' && request.url().includes('formspree.io'),
    { timeout: 15_000 },
  );

  await expect(submitButton).toBeEnabled();
  await submitButton.click({ force: true });
  await submissionRequest;

  await expect(page.getByRole('heading', { name: /Message Sent!/i })).toBeVisible({
    timeout: 30_000,
  });
});

test('jobs flow loads list, opens detail, and supports back navigation', async ({ page }) => {
  await page.goto('/jobs');

  await expect(page.getByText('Customer Success Associate')).toBeVisible();
  await page.getByRole('link', { name: /^Apply$/i }).first().click();

  await expect(page).toHaveURL(/\/jobs\/customer-success-associate$/);
  await expect(page.getByRole('heading', { name: /Customer Success Associate/i })).toBeVisible();

  await page.getByRole('link', { name: /Back to all jobs/i }).click();
  await expect(page).toHaveURL(/\/jobs$/);
  await expect(page.getByText('Customer Success Associate')).toBeVisible();
});

test('invalid routes render fallback page', async ({ page }) => {
  await page.goto('/definitely-not-a-page');
  await expect(page.getByRole('heading', { name: /Page Not Found/i })).toBeVisible();
});

test('keyboard navigation reaches interactive elements', async ({ page }) => {
  await page.goto('/contact');

  const fullNameInput = page.getByLabel(/Full Name/i);
  const emailInput = page.getByLabel(/Email Address/i);

  await fullNameInput.focus();
  await page.keyboard.press('Tab');
  await expect(emailInput).toBeFocused();
});

test('top-level pages pass serious accessibility checks', async ({ page }) => {
  test.setTimeout(180_000);
  const pagesToCheck = ['/', '/services', '/jobs', '/contact', '/ai-training'];

  for (const route of pagesToCheck) {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await expectNoSeriousA11yViolations(page);
  }
});
