import { expect, test } from '@playwright/test';
import { e2eJobs } from './fixtures/jobs';

const routesToSnapshot = [
  { route: '/', snapshotName: 'home', settleMs: 3200 },
  { route: '/services', snapshotName: 'services', settleMs: 900 },
  { route: '/jobs', snapshotName: 'jobs', settleMs: 900 },
];

test.beforeEach(async ({ page }) => {
  await page.route('**/data/jobs.json', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(e2eJobs),
    });
  });
});

test.describe('Visual regression baselines', () => {
  for (const item of routesToSnapshot) {
    test(`${item.snapshotName} page matches baseline`, async ({ page }, testInfo) => {
      test.skip(
        !['chromium-desktop', 'chromium-mobile'].includes(testInfo.project.name),
        'Visual baselines are maintained on Chromium desktop/mobile projects.',
      );

      await page.goto(item.route);
      await page.addStyleTag({
        content:
          '* { animation: none !important; transition: none !important; scroll-behavior: auto !important; }',
      });
      await page.waitForTimeout(item.settleMs);

      const maxDiffPixelRatio = testInfo.project.name.includes('mobile') ? 0.04 : 0.01;

      await expect(page).toHaveScreenshot(`${item.snapshotName}-${testInfo.project.name}.png`, {
        fullPage: false,
        maxDiffPixelRatio,
      });
    });
  }
});
