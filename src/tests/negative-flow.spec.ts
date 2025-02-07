import { test as base, expect, Page } from '@playwright/test';
import { test as authTest } from '../fixtures/auth.fixture';
import { LoginPage } from '../pages/loginPage';
import { CheckoutPage } from '../pages/checkoutPage';

base.describe('Negative Flow Tests', () => {
  base('should not login with invalid credentials', async ({ page }: { page: Page }) => {
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login('invalid_user', 'wrong_password');
    await expect(loginPage.errorMessage).toBeVisible();
  });
});

authTest.describe('Negative Flow Tests with Standard User', () => {
  authTest('should show error on checkout form when missing required fields', async ({ loggedInPage }) => {
    const page = loggedInPage;
    // Add a product, then navigate to checkout.
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillShippingInfo('', 'User', '12345');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
});
