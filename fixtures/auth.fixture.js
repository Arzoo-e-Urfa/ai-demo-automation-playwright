const { test: base, expect } = require('@playwright/test');
const { performLogin } = require('../utils/helpers');

// Extend the base test to include our custom fixtures
const test = base.extend({
  
  /**
   * The 'loggedInPage' fixture automatically navigates to the app,
   * performs the login using environment credentials, and verifies
   * the dashboard is reached before yielding the page to the test.
   */
  loggedInPage: async ({ page }, use) => {
    // -----------------------------
    // 1. SETUP (Runs before the test)
    // -----------------------------
    const testEmail = process.env.TEST_EMAIL || 'qa.engineer@example.com';
    const testPassword = process.env.TEST_PASSWORD || 'SecurePass123!';

    // Navigate to the login page relative to baseURL
    await page.goto('/login');
    
    // Perform login actions using our shared helper
    await performLogin(page, testEmail, testPassword);

    // Ensure login was successful by checking the URL and a core dashboard component
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByTestId('dashboard-header')).toBeVisible();

    // -----------------------------
    // 2. USE (Yields the page to the test block)
    // -----------------------------
    await use(page);

    // -----------------------------
    // 3. TEARDOWN (Runs after the test finishes)
    // -----------------------------
    // Playwright natively handles context isolation, so no manual cleanup is strictly needed here.
  },
});

module.exports = { test, expect };
