import { Page, Locator } from '@playwright/test';

export class MenuComponent {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly menuContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.menuContainer = page.locator('.bm-menu-wrap');
  }

  async openMenu(): Promise<void> {
    await this.menuButton.click();
    await this.menuContainer.waitFor({ state: 'visible' });
  }
}
