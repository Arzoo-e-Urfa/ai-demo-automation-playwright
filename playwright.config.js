// @ts-check
const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

/**
 * Senior-Level Playwright Configuration
 * Designed for enterprise CI/CD pipelines, maximizing debuggability and stability.
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 60 * 1000, /* 1-minute global timeout per test */
  expect: {
    timeout: 10 * 1000, /* 10-second timeout for assertions */
  },
  
  /* Parallel execution optimized for CI speed */
  fullyParallel: true,
  
  /* Prevent 'test.only' leaks in production pipelines */
  forbidOnly: !!process.env.CI,
  
  /* Advanced Retry Strategy:
   * CI: 2 retries to handle ephemeral network/infrastructure flakes.
   * Local: 1 retry to surface real bugs faster while providing debug traces.
   */
  retries: process.env.CI ? 2 : 1,
  
  /* CI runs sequentially within workers to prevent resource contention */
  workers: process.env.CI ? 1 : undefined,
  
  /* Dual reporters: CLI summary (list) and rich artifacts (html) */
  reporter: [['html'], ['list']],

  use: {
    /* Centralized environment routing */
    baseURL: process.env.BASE_URL || 'https://example-ai-platform.com',
    
    /* Strict attribute testing strategy using test-ids */
    testIdAttribute: 'data-testid',
    
    /* Trace Viewer: Retained on failure. Essential for CI debugging (DOM snapshot + network + console logs) */
    trace: 'retain-on-failure',
    
    /* Visual Validation: Snap a screenshot immediately upon assertion failure */
    screenshot: 'only-on-failure',
    
    /* Video Artifacts: Record videos only during retries to diagnose intermittent state issues */
    video: 'on-first-retry',
  },

  /* Multi-Browser Matrix Strategy */
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'Firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'WebKit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    /* Mobile emulation configurations can be added below */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
  ],
});
