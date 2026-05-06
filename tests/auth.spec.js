const { test, expect } = require('@playwright/test');
const { performLogin } = require('../utils/helpers');

/**
 * Authentication Test Suite
 * Tags: @auth @smoke @ai-demo-automation-playwright/tests/auth.spec.js
 */
test.describe('Authentication Workflows @auth', () => {
  const testEmail = process.env.TEST_EMAIL || 'qa.engineer@example.com';
  const testPassword = process.env.TEST_PASSWORD || 'SecurePass123!';
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page relative to baseURL
    await page.goto('/login');
    await expect(page.getByText('Sign into your account')).toBeVisible();
  });

  test('Login with valid credentials redirects to dashboard @smoke', async ({ page }) => {
    await performLogin(page, testEmail, testPassword);
    
    // Verify successful redirection and core UI elements
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByTestId('dashboard-header')).toBeVisible();
    await expect(page.getByTestId('user-profile-icon')).toBeVisible();
  });

  test('Login attempt without credentials displays validation errors', async ({ page }) => {
    await performLogin(page, '', '');
    
    // Assert inline validation messages
    await expect(page.getByText('Please provide email')).toBeVisible();
    await expect(page.getByText('Please provide password')).toBeVisible();
    await expect(page).toHaveURL(/\/login/); // Ensure no redirection occurred
  });

  test('Login with email only prompts for password', async ({ page }) => {
    await performLogin(page, testEmail, '');
    
    await expect(page.getByText('Please provide password')).toBeVisible();
    await expect(page.getByText('Please provide email')).not.toBeVisible();
  });

  test('Login with password only prompts for email', async ({ page }) => {
    await performLogin(page, '', testPassword);
    
    await expect(page.getByText('Please provide email')).toBeVisible();
    await expect(page.getByText('Please provide password')).not.toBeVisible();
  });

  test('Login with invalid credentials displays error toast', async ({ page }) => {
    await performLogin(page, 'nonexistent@example.com', 'InvalidPass123!');
    
    const errorToast = page.getByTestId('toast-message');
    await expect(errorToast).toBeVisible();
    await expect(errorToast).toContainText('Invalid email or password');
    await expect(page.getByTestId('login-submit')).toBeEnabled(); // Ensure user can retry
  });

  test('Login with mixed valid/invalid inputs blocks access', async ({ page }) => {
    // Case 1: Valid email format, invalid password
    await performLogin(page, 'qa.engineer@example.com', 'WrongPass!');
    await expect(page.getByTestId('toast-message')).toBeVisible();

    await page.reload();

    // Case 2: Unregistered email, valid password format
    await performLogin(page, 'unknown-user@example.com', testPassword);
    await expect(page.getByTestId('toast-message')).toBeVisible();
  });

  test('Toggle password visibility icon updates input type', async ({ page }) => {
    const passwordInput = page.getByTestId('login-password');
    const toggleIcon = page.getByTestId('login-password-toggle');

    await passwordInput.fill('Secret123!');
    
    // Initial state: Hidden
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Action: Toggle on
    await toggleIcon.click();
    await expect(passwordInput).toHaveAttribute('type', 'text');

    // Action: Toggle off
    await toggleIcon.click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
