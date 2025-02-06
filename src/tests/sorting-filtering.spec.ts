import { test, expect } from '../fixtures/auth.fixture';
import { InventoryPage } from '../pages/InventoryPage.page';

test.describe('Sorting and Filtering Tests', () => {
  test('should sort products by price high to low', async ({ loggedInPage }) => {
    const page = loggedInPage;
    const inventoryPage = new InventoryPage(page);
    // Select the sort option "Price (high to low)" (assuming the option value "hilo" is used).
    await inventoryPage.sortProducts('hilo');

    // Retrieve product prices and verify they are in descending order.
    const priceLocators = page.locator('.inventory_item_price');
    const pricesText = await priceLocators.allTextContents();
    const prices = pricesText.map((price) => parseFloat(price.replace('$', '')));
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  });
});
