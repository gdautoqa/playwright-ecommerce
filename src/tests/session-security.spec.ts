import { test, expect } from '../fixtures/auth.fixture';

test.describe('Session and Security Tests', () => {
  test('should redirect to login page after logout', async ({
    loggedInPage,
  }) => {
    const page = loggedInPage;
    // Open the menu using the role-based locator.
    await page.getByRole('button', { name: 'Open Menu' }).click();
    // Click the logout link using selector.
    await page.getByTestId('logout-sidebar-link').click();
    // Verify that a login element is visible after logging out.
    await expect(page.getByTestId('login-button')).toBeVisible();
    // Attempt to access the inventory page to confirm redirection to login.
    await page.goto('/inventory.html');
    await expect(page.getByTestId('login-button')).toBeVisible();
  });
});
