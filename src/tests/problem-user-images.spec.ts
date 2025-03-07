import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { USERNAMES } from '../data/credentials';

test.describe('Problem User Image Tests', () => {
  test('should verify all product images are incorrect', async ({ page }) => {
    // Mark the test as expected to fail due to known image issues.
    test.fail(
      true,
      'Known bug: Product image src attribute is broken for problem user.',
    );

    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(USERNAMES.PROBLEM, process.env.SAUCE_PASSWORD!);

    // Get all product images
    const productImages = page.locator('.inventory_item_img');
    const firstImage = productImages.first();
    const firstImageSrc = await firstImage.getAttribute('src');
    if (firstImageSrc === null) {
      throw new Error('First product image src attribute is null.');
    }

    // Verify that every image has the same src (even if it's an empty string)
    for (const image of await productImages.elementHandles()) {
      const src = await image.getAttribute('src');
      expect(src).toBe(firstImageSrc);
    }
  });
});
