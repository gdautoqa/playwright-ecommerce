import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly backToProductsButton: Locator;
  readonly sortDropdown: Locator;
  readonly cartLink: Locator;
  readonly productImages: Locator;
  readonly inventoryContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.productImages = page.locator('.inventory_item_img');
    this.inventoryContainer = page.locator('#inventory_container');
  }

  async clickProductTitle(itemNumber: string): Promise<void> {
    await this.page.locator(`[data-test="item-${itemNumber}-title-link"]`).click();
  }

  async addToCart(productName: string): Promise<void> {
    await this.page.locator(`[data-test="add-to-cart-${productName}"]`).click();
  }

  async removeFromCart(productName: string): Promise<void> {
    await this.page.locator(`[data-test="remove-${productName}"]`).click();
  }

  async sortProducts(option: string): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async getAllProductImages(): Promise<Locator[]> {
    return await this.productImages.all();
  }

  async waitForInventoryLoad(): Promise<void> {
    await this.inventoryContainer.waitFor({ state: 'visible' });
  }
}
