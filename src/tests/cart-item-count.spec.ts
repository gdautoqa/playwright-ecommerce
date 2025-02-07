import { test, expect } from '../fixtures/auth.fixture';
import { InventoryPage } from '../pages/inventoryPage';

test.describe('Cart Item Count Tests', () => {
  test('should update the cart badge count when items are added or removed', async ({ loggedInPage }) => {
    const page = loggedInPage;
    const inventoryPage = new InventoryPage(page);

    // Initially, the cart badge should not be visible.
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toHaveCount(0);

    // Add one product and verify the badge count.
    await inventoryPage.addToCart('sauce-labs-backpack');
    await expect(cartBadge).toHaveText('1');

    // Add another product.
    await inventoryPage.addToCart('sauce-labs-bolt-t-shirt');
    await expect(cartBadge).toHaveText('2');

    // Remove a product and verify the count updates.
    await inventoryPage.removeFromCart('sauce-labs-backpack');
    await expect(cartBadge).toHaveText('1');

    // Remove the remaining product and verify the badge is removed.
    await inventoryPage.removeFromCart('sauce-labs-bolt-t-shirt');
    await expect(cartBadge).toHaveCount(0);
  });
});
