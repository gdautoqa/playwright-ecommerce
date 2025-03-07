import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.finishButton = page.getByTestId('finish');
  }

  async fillShippingInfo(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async verifyOrderSummary(): Promise<void> {
    await expect(this.page.getByTestId('payment-info-label')).toBeVisible();
    await expect(this.page.getByTestId('payment-info-value')).toBeVisible();
    await expect(this.page.getByTestId('shipping-info-label')).toBeVisible();
    await expect(this.page.getByTestId('shipping-info-value')).toBeVisible();
    await expect(this.page.getByTestId('total-info-label')).toBeVisible();
    await expect(this.page.getByTestId('subtotal-label')).toBeVisible();
    await expect(this.page.getByTestId('tax-label')).toBeVisible();
    await expect(this.page.getByTestId('total-label')).toBeVisible();
  }

  async completeOrder(): Promise<void> {
    await this.finishButton.click();
    await expect(this.page.getByTestId('complete-header')).toBeVisible();
    await expect(this.page.getByTestId('complete-text')).toBeVisible();
  }
}
