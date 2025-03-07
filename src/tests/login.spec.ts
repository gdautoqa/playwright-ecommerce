import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { USERNAMES, SAUCE_PASSWORD } from '../data/credentials';

test.describe('SauceDemo Login Tests', () => {
  for (const username of Object.values(USERNAMES)) {
    test(`should attempt login with ${username}`, async ({ page }) => {
      // Navigate to the base URL
      await page.goto('/');

      const loginPage = new LoginPage(page);
      await loginPage.login(username!, SAUCE_PASSWORD!);

      // Based on the user, verify expected outcome. Example:
      if (username === 'locked_out_user') {
        // For locked_out_user, we expect an error.
        await expect(loginPage.errorMessage).toBeVisible();
      } else {
        // For other users, successful login should navigate to the inventory page.
        await expect(page).toHaveURL(/.*inventory\.html/);
      }
    });
  }
});
