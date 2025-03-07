import { test, expect } from '../fixtures/auth.fixture';
import { MenuComponent } from '../pages/menuComponentPage';

test.describe('Animation and Transition Tests', () => {
  test('menu should transition smoothly', async ({ loggedInPage }) => {
    const page = loggedInPage;
    const menuComponent = new MenuComponent(page);
    await menuComponent.openMenu();

    await expect
      .poll(async () => {
        const opacity = await page
          .locator('.bm-menu-wrap')
          .evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
        return opacity;
      })
      .toBeGreaterThan(0);
  });
});
