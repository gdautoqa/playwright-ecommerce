import { test as base, Page } from '@playwright/test';
import dotenv from 'dotenv';
import { LoginPage } from '../pages/loginPage';
import { SAUCE_PASSWORD } from '../data/credentials';
import { Logger } from '../utils/logger';

// Load environment variables (if not already loaded)
dotenv.config();

type AuthFixtures = {
  loggedInPage: Page;
};

export const test = base.extend<AuthFixtures>({
  loggedInPage: async ({ page }, use) => {
    // Navigate to the base URL and perform login as standard_user.
    Logger.info('Navigating to base URL');
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', SAUCE_PASSWORD!);
    // Wait until the inventory page appears.
    Logger.info('Login successful, waiting for inventory page');
    await page.waitForURL(/.*inventory\.html/);
    Logger.info('Setting data-test attribute on inventory container');
    await page.evaluate(() => {
      const inventoryContainer = document.getElementById('inventory_container');
      if (inventoryContainer && !inventoryContainer.getAttribute('data-test')) {
        inventoryContainer.setAttribute('data-test', 'inventory-container');
      }
    });
    Logger.info('Inventory container updated with data-test attribute');
    await use(page);
  },
});

export { expect } from '@playwright/test';
