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
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async fillShippingInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async verifyOrderSummary(): Promise<void> {
    await expect(this.page.locator('[data-test="payment-info-label"]')).toBeVisible();
    await expect(this.page.locator('[data-test="payment-info-value"]')).toBeVisible();
    await expect(this.page.locator('[data-test="shipping-info-label"]')).toBeVisible();
    await expect(this.page.locator('[data-test="shipping-info-value"]')).toBeVisible();
    await expect(this.page.locator('[data-test="total-info-label"]')).toBeVisible();
    await expect(this.page.locator('[data-test="subtotal-label"]')).toBeVisible();
    await expect(this.page.locator('[data-test="tax-label"]')).toBeVisible();
    await expect(this.page.locator('[data-test="total-label"]')).toBeVisible();
  }

  async completeOrder(): Promise<void> {
    await this.finishButton.click();
    await expect(this.page.locator('[data-test="complete-header"]')).toBeVisible();
    await expect(this.page.locator('[data-test="complete-text"]')).toBeVisible();
  }
}
