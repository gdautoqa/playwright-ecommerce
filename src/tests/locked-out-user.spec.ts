import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

test.describe('SauceDemo Locked Out User Tests', () => {
  test('should display error message for locked out user', async ({ page }) => {
    // Navigate to the SauceDemo base URL
    await page.goto('/');

    const loginPage = new LoginPage(page);

    // Login with locked_out_user and the password from the .env file
    await loginPage.login('locked_out_user', process.env.SAUCE_PASSWORD!);

    // Assert that the error message is displayed
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.',
    );
  });
});
