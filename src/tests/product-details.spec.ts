import { test, expect } from '../fixtures/auth.fixture';
import { InventoryPage } from '../pages/InventoryPage.page';

test.describe('Product Details Tests', () => {
  test('should display product details correctly', async ({ loggedInPage }) => {
    const page = loggedInPage;
    const inventoryPage = new InventoryPage(page);
    // Click on product item number 4 to view details.
    await inventoryPage.clickProductTitle('4');
    // Assert that product details elements are visible.
    await expect(page.locator('.inventory_details_name')).toBeVisible();
    await expect(page.locator('.inventory_details_price')).toBeVisible();
  });
});
