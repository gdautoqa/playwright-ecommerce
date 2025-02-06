import { test, expect } from '../fixtures/auth.fixture';
import { InventoryPage } from '../pages/InventoryPage.page';

test.describe('Back to Products Functionality Tests', () => {
  test('should navigate back to the inventory page when clicking "Back to Products"', async ({ loggedInPage }) => {
    const page = loggedInPage;
    const inventoryPage = new InventoryPage(page);
    
    // Navigate to the product details page by clicking on a product title.
    await inventoryPage.clickProductTitle('1');
    // Click the "Back to Products" button.
    await inventoryPage.backToProductsButton.click();
    
    // Verify that the inventory page is displayed.
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    await expect(page).toHaveURL(/.*inventory\.html/);
  });
});
