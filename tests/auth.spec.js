const { test, expect } = require('@playwright/test');
const { performLogin } = require('../utils/helpers');

/**
 * Authentication Test Suite
 * Tags: @auth @smoke @e2e
 */
test.describe('Authentication Workflows @auth', () => {
  const testEmail = process.env.TEST_EMAIL || 'qa.engineer@example.com';
  const testPassword = process.env.TEST_PASSWORD || 'SecurePass123!';
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page relative to baseURL
    await page.goto('/login');
    
    // State validation: ensure core elements exist before attempting actions
    await expect(page.getByText('Sign into your account')).toBeVisible();
    await expect(page.getByTestId('login-submit')).toBeDisabled(); // Validate submit is disabled natively if inputs are empty
  });

  test('Login with valid credentials redirects to dashboard @smoke', async ({ page }) => {
    await performLogin(page, testEmail, testPassword);
    
    // Verify successful redirection and state updates
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Wait for critical dashboard components to load to ensure session persistence
    await expect(page.getByTestId('dashboard-header')).toBeVisible();
    await expect(page.getByTestId('user-profile-icon')).toBeVisible();
  });

  test('Login attempt without credentials displays validation errors', async ({ page }) => {
    await performLogin(page, '', '');
    
    // Assert inline validation messages
    await expect(page.getByText('Please provide email')).toBeVisible();
    await expect(page.getByText('Please provide password')).toBeVisible();
    
    // State validation: ensure no redirection occurred
    await expect(page).toHaveURL(/\/login/); 
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
    
    // State validation: ensure the user can retry without reloading the page
    await expect(page.getByTestId('login-submit')).toBeEnabled(); 
  });

  test('Login with mixed valid/invalid inputs blocks access', async ({ page }) => {
    // Phase 1: Valid email format, invalid password
    await performLogin(page, testEmail, 'WrongPass!');
    await expect(page.getByTestId('toast-message')).toContainText('Invalid');

    await page.reload();

    // Phase 2: Unregistered email, valid password format
    await performLogin(page, 'unknown-user@example.com', testPassword);
    await expect(page.getByTestId('toast-message')).toContainText('Invalid');
  });

  test('Toggle password visibility icon updates input type', async ({ page }) => {
    const passwordInput = page.getByTestId('login-password');
    const toggleIcon = page.getByTestId('login-password-toggle');

    await passwordInput.fill('Secret123!');
    
    // Initial state: Masked text
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Action: Toggle visibility ON
    await toggleIcon.click();
    await expect(passwordInput).toHaveAttribute('type', 'text');

    // Action: Toggle visibility OFF
    await toggleIcon.click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
