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
    this.backToProductsButton = page.getByTestId('back-to-products');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.productImages = page.locator('.inventory_item_img');
    this.inventoryContainer = page.getByTestId('inventory-container');
  }

  async clickProductTitle(itemNumber: string): Promise<void> {
    await this.page.getByTestId(`item-${itemNumber}-title-link`).click();
  }

  async addToCart(productName: string): Promise<void> {
    await this.page.getByTestId(`add-to-cart-${productName}`).click();
  }

  async removeFromCart(productName: string): Promise<void> {
    await this.page.getByTestId(`remove-${productName}`).click();
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
