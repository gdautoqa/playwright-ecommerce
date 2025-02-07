import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { USERNAMES } from '../data/credentials';
import { CheckoutPage } from '../pages/checkoutPage';

test.describe('Error User Form Tests', () => {
  test('should verify form errors', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);
    
    await page.goto('/');
    await loginPage.login(USERNAMES.ERROR, process.env.SAUCE_PASSWORD!);
    
    // Navigate to checkout
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    
    // Trigger an error by leaving first name blank
    await checkoutPage.fillShippingInfo('', 'User', '12345');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
});
