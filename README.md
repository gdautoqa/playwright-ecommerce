# Playwright Test Suite for SauceDemo

This repository contains a comprehensive Playwright test suite designed to validate the functionality, accessibility, performance, and responsiveness of the SauceDemo website (https://www.saucedemo.com/). The tests cover a wide range of scenarios using Playwright's best practices and the Page Object Model (POM) for maintainability.

---

## Project Structure

- **src/tests/**  
  Contains all the test files which cover various aspects of the application:
  - **happy-path.spec.ts**: Complete purchase flow (happy path) demonstrating login, selecting product details, modifying the cart, sorting products, and completing a checkout.
  - **login.spec.ts**: Tests login functionality for different user types, including the expected error for a locked-out user.
  - **session-security.spec.ts**: Validates that after logging in, using the menu logout functionality properly redirects the user back to the login page, ensuring secure session handling.
  - **product-details.spec.ts**: Checks that product details (name, price) are correctly displayed when a product is clicked.
  - **visual-user-layout.spec.ts**: Performs visual regression tests by taking screenshots of the inventory and menu states. This test is marked as expected to fail due to known visual differences.
  - **animation-transition.spec.ts**: Verifies that the animated hamburger menu transitions properly by checking that the menu container becomes visible (its opacity is above 0) after opening.
  - **negative-flow.spec.ts**: Tests negative scenarios like failed login attempts with invalid credentials and form validation during the checkout process.
  - **accessibility.spec.ts**: Runs Axe accessibility analysis on the inventory page. Known accessibility violations are expected and recorded.
  - **responsive.spec.ts**: Confirms that the inventory page displays correctly on various devices and viewport sizes (e.g., iPhone 15, iPad, Desktop).
  - **sorting-filtering.spec.ts**: Validates that the sorting functionality (e.g., sorting products by price high to low) works as expected.
  - **problem-user-images.spec.ts**: Checks that, for a known problematic user, all product images share the same incorrect source as expected (test is set to fail due to a known bug).
  - **performance-glitch-login.spec.ts**: Measures the login time for a user with performance issues, ensuring that login takes longer than a standard login but still succeeds.
  - **error-user-checkout.spec.ts**: Validates that during checkout, leaving required fields empty (e.g., missing first name) triggers the appropriate error messages.
  - **locked-out-user.spec.ts**: Ensures that when logging in as a locked-out user, the application displays the proper error message.
  - **cart-item-count.spec.ts**: Checks that the shopping cart badge count updates correctly when items are added or removed.
  - **back-to-products.spec.ts**: Validates that clicking the "Back to Products" button on the product details page navigates the user back to the inventory page.

- **src/pages/**  
  Contains the Page Object Model (POM) classes that encapsulate interactions with various parts of the application:
  - **LoginPage.page.ts**: Handles login form interactions and error message retrieval.
  - **InventoryPage.page.ts**: Provides methods for interacting with the inventory, such as clicking product titles, adding/removing products from the cart, sorting, and navigating to the cart.
  - **CartPage.page.ts**: Manages operations related to the shopping cart like checking out, continuing shopping, and removing items.
  - **CheckoutPage.page.ts**: Handles the checkout process including entering shipping details, verifying the order summary, and completing the order.
  - **MenuComponent.page.ts**: Contains functionality for interacting with the hamburger (burger) menu, for example, opening the menu and ensuring its visibility.
  
- **playwright.config.ts**  
  Configures the global test settings including test timeouts, retries, browser projects (Chromium, Firefox, WebKit, Pixel 8, iPhone 15), reporters, and media capture (screenshots and videos).

- **package.json**  
  Contains project scripts (for running tests, linting, formatting, etc.) along with dependencies and devDependencies required for testing and code quality.

---

## Test Coverage Breakdown

1. **Happy Path E2E Test (happy-path.spec.ts)**  
   - Logs in as a standard user.
   - Navigates through the purchase flow: selecting a product, modifying the cart, sorting the inventory, and performing a full checkout.

2. **Login Tests (login.spec.ts)**  
   - Iterates through various user accounts defined in `USERNAMES` to check that each login attempt results in the expected behavior (successful login for standard users and error for locked-out users).

3. **Session & Security Test (session-security.spec.ts)**  
   - Validates that triggering the logout via the menu correctly redirects the user to the login page, ensuring that session data is properly cleared.

4. **Product Details Test (product-details.spec.ts)**  
   - Confirms that upon clicking a specific product, its details (such as name and price) are correctly displayed.

5. **Visual User Layout Test (visual-user-layout.spec.ts)**  
   - Captures screenshots before and after interacting with the UI (inventory view and open menu) and compares them against known baselines.  
   - The test is expected to fail to account for known visual regressions.

6. **Animation & Transition Test (animation-transition.spec.ts)**  
   - Opens the menu and checks that its transition effect is complete by confirming the menu's opacity is above zero.  
   - Currently uses a small wait to accommodate animation delays.

7. **Negative Flow Tests (negative-flow.spec.ts)**  
   - Ensures that invalid login attempts display error messages.
   - Simulates checkout form error scenarios when required fields are missing.

8. **Accessibility Test (accessibility.spec.ts)**  
   - Utilizes Axe accessibility testing to analyze the inventory page for accessibility violations.  
   - The test is marked to fail as it documents expected accessibility issues.

9. **Responsive Design Tests (responsive.spec.ts)**  
   - Runs tests across multiple device viewports to validate that the inventory container remains visible and the layout adjusts correctly.

10. **Sorting and Filtering Tests (sorting-filtering.spec.ts)**  
    - Tests the functionality of sorting products by price (high to low) and verifies that the displayed order matches the expected sorted order.

11. **Problem User Image Test (problem-user-images.spec.ts)**  
    - For the "problem user", verifies that all product images have the same incorrect src attribute due to a known bug.  
    - This test is set to fail to document the existing issue.

12. **Performance Glitch Login Test (performance-glitch-login.spec.ts)**  
    - Measures the elapsed time for login with a user that exhibits performance issues, ensuring the login duration is longer than normal while still being successful.

13. **Error User Checkout Test (error-user-checkout.spec.ts)**  
    - Validates that when the checkout form is submitted with missing mandatory fields (e.g., blank first name), the proper error messages are displayed.

14. **Locked Out User Test (locked-out-user.spec.ts)**  
    - Checks that attempting to log in with a locked out user account results in the expected error message being displayed.

15. **Cart Item Count Test (cart-item-count.spec.ts)**
    - Verifies that the shopping cart badge accurately reflects the number of items added or removed from the cart.

16. **Back to Products Test (back-to-products.spec.ts)**
    - Checks that clicking the "Back to Products" button on the product details page correctly navigates the user back to the inventory page.

---

## Running the Tests

- **Run All Tests**  
  Execute the following command to run all Playwright tests:
  ```
  npm test
  ```
  
- **Lint and Format Code**  
  - Run ESLint:
    ```
    npm run lint
    ```
  - Automatically fix lint issues:
    ```
    npm run lint:fix
    ```
  - Format all files with Prettier:
    ```
    npm run format
    ```

- **Type Checking**  
  To ensure TypeScript types are correct:
  ```
  npm run tsc
  ```

---

## Environment Variables

- The tests use environment variables (e.g., `SAUCE_PASSWORD`) loaded via dotenv.
- Create a `.env` file with the necessary key-value pairs for login credentials.