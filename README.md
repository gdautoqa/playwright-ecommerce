# Playwright Test Suite for SauceDemo

This repository contains a comprehensive Playwright test suite for the SauceDemo website (https://www.saucedemo.com/). Tests follow Playwright best practices and the Page Object Model (POM) for maintainability.

## Test Coverage Breakdown

1. **Happy Path E2E (happy-path.spec.ts):**  
   Validates the complete purchase flow including login, product selection, cart modification, and checkout.

2. **Login Tests (login.spec.ts):**  
   Verifies login behavior for various users, including error handling for locked-out users.

3. **Session & Security (session-security.spec.ts):**  
   Confirms that logout clears the session and redirects to the login page.

4. **Product Details (product-details.spec.ts):**  
   Checks that product details (name, price) display correctly upon selection.

5. **Visual Regression (visual-user-layout.spec.ts):**  
   Captures UI screenshots to document known visual differences.

6. **Animation & Transition (animation-transition.spec.ts):**  
   Ensures smooth transitions for the hamburger menu animation.

7. **Negative Flows (negative-flow.spec.ts):**  
   Tests error scenarios for invalid login attempts and checkout form validations.

8. **Accessibility (accessibility.spec.ts):**  
   Uses Axe to analyze the inventory page for accessibility issues.

9. **Responsive Design (responsive.spec.ts):**  
   Verifies layout correctness across multiple device viewports.

10. **Sorting & Filtering (sorting-filtering.spec.ts):**  
    Ensures product sorting by price and filtering functionality work as expected.

11. **Problem User Images (problem-user-images.spec.ts):**  
    Checks that all images for a problematic user share the same (incorrect) source.

12. **Performance Glitch (performance-glitch-login.spec.ts):**  
    Measures login time for performance-challenged users ensuring longer durations but successful login.

13. **Error User Checkout (error-user-checkout.spec.ts):**  
    Validates that missing mandatory checkout fields trigger appropriate error messages.

14. **Locked Out User (locked-out-user.spec.ts):**  
    Confirms proper error messaging for locked-out user login attempts.

15. **Cart Item Count (cart-item-count.spec.ts):**  
    Verifies that the shopping cart badge accurately reflects item additions and removals.

16. **Back to Products (back-to-products.spec.ts):**  
    Checks navigation from the product details page back to the inventory page.

## Continuous Integration & Local Testing

- **GitHub Actions:**

  - **Triggers:**
    - On pushes and pull requests to `main`
    - On a scheduled basis: every Tuesday at 7 am Eastern (11 am UTC)
    - Manually via the Actions tab
  - **Browsers:** Tests run on Chromium, Firefox, WebKit, Pixel 8, and iPhone 15.
  - **Secrets:** The SauceDemo password is stored as a GitHub secret.

- **Local Testing Commands:**
  - Run tests:
    ```
    npm test
    ```
  - Lint code:
    ```
    npm run lint
    ```
  - Auto-fix lint issues:
    ```
    npm run lint:fix
    ```
  - Format code:
    ```
    npm run format
    ```

## Folder Structure

- **src/tests/**  
  Contains all test specifications.
- **src/pages/**  
  Contains Page Object Model (POM) classes.
- **playwright.config.ts**  
  Global Playwright test configuration.
- **.github/workflows/playwright.yml**  
  GitHub Actions workflow configuration.
