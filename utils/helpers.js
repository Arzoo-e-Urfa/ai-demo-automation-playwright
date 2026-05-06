const { expect } = require('@playwright/test');

/**
 * Fills out the login form and submits.
 * @param {import('@playwright/test').Page} page
 * @param {string} email
 * @param {string} password
 */
async function performLogin(page, email, password) {
  if (email) await page.getByTestId('login-email').fill(email);
  if (password) await page.getByTestId('login-password').fill(password);
  await page.getByTestId('login-submit').click();
}

/**
 * Simulates a file upload using Playwright's file chooser.
 * @param {import('@playwright/test').Page} page
 * @param {string} locatorTestId - The test-id of the upload button/zone.
 * @param {string} fileName - Dummy file name.
 * @param {string} mimeType - File MIME type.
 */
async function uploadMockVideo(page, locatorTestId, fileName = 'sample.mp4', mimeType = 'video/mp4') {
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.getByTestId(locatorTestId).click()
  ]);
  
  await fileChooser.setFiles({
    name: fileName,
    mimeType: mimeType,
    buffer: Buffer.from('mock video binary content')
  });
}

/**
 * Verifies that a toast notification appears with the expected message.
 * @param {import('@playwright/test').Page} page
 * @param {string} expectedMessage
 */
async function verifyToastMessage(page, expectedMessage) {
  const toast = page.getByTestId('toast-message');
  await expect(toast).toBeVisible({ timeout: 15000 });
  await expect(toast).toContainText(expectedMessage);
}

/**
 * Navigates through tabs in the dashboard.
 * @param {import('@playwright/test').Page} page
 * @param {string} tabTestId
 */
async function navigateToTab(page, tabTestId) {
  await page.getByTestId(tabTestId).click();
  await expect(page.getByTestId(tabTestId)).toHaveClass(/active/);
}

module.exports = {
  performLogin,
  uploadMockVideo,
  verifyToastMessage,
  navigateToTab
};
