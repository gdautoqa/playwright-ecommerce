import { test, expect } from '../fixtures/auth.fixture';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';

test.describe('Happy Path Tests', () => {
  test('should complete purchase flow successfully', async ({
    loggedInPage,
  }) => {
    const page = loggedInPage;
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await expect(page).toHaveURL(/.*inventory\.html/);

    // Validate product details page.
    await inventoryPage.clickProductTitle('4');
    await expect(page.locator('.inventory_details_name')).toBeVisible();
    await expect(page.locator('.inventory_details_price')).toBeVisible();
    await inventoryPage.backToProductsButton.click();

    // Add and remove operations with cart badge assertions.
    await inventoryPage.addToCart('sauce-labs-bolt-t-shirt');
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

    await inventoryPage.addToCart('sauce-labs-onesie');
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('2');

    await inventoryPage.removeFromCart('sauce-labs-onesie');
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

    // Cart operations.
    await inventoryPage.goToCart();
    await cartPage.removeItem('sauce-labs-bolt-t-shirt');
    await expect(page.getByTestId('shopping-cart-badge')).toHaveCount(0);

    await cartPage.continueShopping();
    await inventoryPage.addToCart('test.allthethings()-t-shirt-(red)');
    await inventoryPage.goToCart();

    // Checkout Process.
    await cartPage.checkout();
    await checkoutPage.fillShippingInfo('Automation', 'User', '00025');
    await checkoutPage.verifyOrderSummary();
    await checkoutPage.completeOrder();
    await expect(page.locator('.complete-header')).toHaveText(
      /THANK YOU FOR YOUR ORDER/i,
    );
  });
});
