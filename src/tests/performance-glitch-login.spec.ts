import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { USERNAMES } from '../data/credentials';

test.describe('Performance Glitch User Tests', () => {
  test('should measure login time', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    
    const startTime = Date.now();
    await loginPage.login(USERNAMES.PERFORMANCE_GLITCH, process.env.SAUCE_PASSWORD!);
    const endTime = Date.now();
    
    // Verify login takes longer than normal but succeeds
    const loginTime = endTime - startTime;
    expect(loginTime).toBeGreaterThan(2000); 
    await expect(page).toHaveURL(/.*inventory.html/);
  });
});
