// @ts-check
const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

/**
 * Senior-level Playwright Configuration
 * Optimized for CI/CD stability and detailed failure analysis.
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  
  /* Advanced Retry Strategy: Retries on CI to handle flakiness, 1 retry locally for stability */
  retries: process.env.CI ? 2 : 1,
  
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['list']],

  use: {
    baseURL: process.env.BASE_URL || 'https://example-ai-platform.com',
    
    /* Advanced Debugging: Collect trace only on failure to keep reports lean but useful */
    trace: 'retain-on-failure',
    
    /* UI Validation: Automatic screenshots on failure for rapid visual debugging */
    screenshot: 'only-on-failure',
    
    /* State Retention: Record video on first retry to analyze intermittent issues */
    video: 'on-first-retry',
    
    /* Custom test-id attribute used across the SaaS platform */
    testIdAttribute: 'data-testid',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
