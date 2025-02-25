import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '../fixtures/auth.fixture';

test.describe('Accessibility Tests', () => {
  test('Inventory page should have no accessibility violations', async ({
    loggedInPage,
  }) => {
    test.fail(true, 'Known accessibility violations exist');
    const page = loggedInPage;
    await page.getByTestId('inventory-container').waitFor({ state: 'visible' });
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
