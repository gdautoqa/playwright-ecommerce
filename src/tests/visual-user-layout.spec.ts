import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.page';
import { USERNAMES } from '../data/credentials';

test.describe('Visual User Tests', () => {
  test('should verify visual glitches', async ({ page }) => {
    // This test is expected to fail due to known visual differences.
    test.fail(true, 'Known visual regressions: screenshot differences are expected.');

    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(USERNAMES.VISUAL, process.env.SAUCE_PASSWORD!);
    
    // Wait for a key element to ensure the page is stable.
    await page.locator('#inventory_container').waitFor({ state: 'visible' });
    
    // Take screenshot and compare with baseline (expected to differ).
    await expect(page).toHaveScreenshot('inventory-page.png');
    
    // Click menu and verify visual state
    await page.locator('#react-burger-menu-btn').click();
    await expect(page.locator('.bm-menu-wrap')).toBeVisible();
    await expect(page).toHaveScreenshot('menu-open.png');
  });
});
