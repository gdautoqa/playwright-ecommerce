import { test, expect, devices } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

const deviceConfigurations = [
  { name: 'iPhone 13', viewport: devices['iPhone 13'].viewport },
  // iPad Pro 11 (portrait)
  { name: 'iPad Pro 11', viewport: { width: 834, height: 1194 } },
  { name: 'Desktop', viewport: { width: 1440, height: 900 } },
];

test.describe('Responsive Design Tests', () => {
  for (const device of deviceConfigurations) {
    test(`should display inventory correctly on ${device.name}`, async ({
      page,
    }) => {
      await page.setViewportSize(device.viewport);
      await page.goto('/');
      const loginPage = new LoginPage(page);
      await loginPage.login('standard_user', process.env.SAUCE_PASSWORD!);
      await expect(page.getByTestId('inventory-container')).toBeVisible();
    });
  }
});
