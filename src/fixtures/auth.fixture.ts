import { test as base, Page } from '@playwright/test';
import dotenv from 'dotenv';
import { LoginPage } from '../pages/loginPage';
import { SAUCE_PASSWORD } from '../data/credentials';

// Load environment variables (if not already loaded)
dotenv.config();

type AuthFixtures = {
  loggedInPage: Page;
};

export const test = base.extend<AuthFixtures>({
  loggedInPage: async ({ page }, use) => {
    // Navigate to the base URL and perform login as standard_user.
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', SAUCE_PASSWORD!);
    // Wait until the inventory page appears.
    await page.waitForURL(/.*inventory\.html/);
    await use(page);
  },
});

export { expect } from '@playwright/test';
