const { test, expect } = require('@playwright/test');
const { performLogin, uploadMockVideo, verifyToastMessage, navigateToTab } = require('../utils/helpers');

/**
 * Demo and Media Management Suite
 * Tags: @demo @smoke @ai-demo-automation-playwright/tests/demo.spec.js @puppydog-backend/controllers/upload.js
 */
test.describe('Demo Creation and Media Management @demo', () => {
  const testEmail = process.env.TEST_EMAIL || 'qa.engineer@example.com';
  const testPassword = process.env.TEST_PASSWORD || 'SecurePass123!';

  test.beforeEach(async ({ page }) => {
    // Authenticate before each test to access the dashboard
    await page.goto('/login');
    await performLogin(page, testEmail, testPassword);
    await page.waitForURL(/\/dashboard/);
    await expect(page.getByTestId('dashboard-header')).toBeVisible();
  });

  test.describe('Video Upload Workflows', () => {
    
    test('Successfully upload video via primary option @smoke', async ({ page }) => {
      const fileName = 'primary_demo.mp4';
      await uploadMockVideo(page, 'primary-upload-btn', fileName);
      
      await verifyToastMessage(page, 'Processing Video');
      
      // State validation: ensure file appears in the active processing list
      const processingItem = page.getByTestId('processing-queue-item').filter({ hasText: fileName });
      await expect(processingItem).toBeVisible();
    });

    test('Upload video via Add Model dropdown', async ({ page }) => {
      await navigateToTab(page, 'add-new-tab');
      await page.getByTestId('dropdown-upload-menu').click();
      await uploadMockVideo(page, 'dropdown-upload-option', 'dropdown_demo.mp4');
      
      await verifyToastMessage(page, 'Processing Video');
    });

    test('Upload video via dedicated videos tab', async ({ page }) => {
      await navigateToTab(page, 'videos-tab');
      await uploadMockVideo(page, 'video-tab-dropzone', 'tab_demo.mp4');
      
      await verifyToastMessage(page, 'Processing Video');
    });

    test('Abort upload process before completion', async ({ page }) => {
      const fileName = 'abort_test.mp4';
      await uploadMockVideo(page, 'primary-upload-btn', fileName);
      
      // Interact with the progress UI to cancel
      await page.getByTestId('cancel-upload-btn').click();
      await verifyToastMessage(page, 'Upload Cancelled!');
      
      // Cleanup check: Ensure it's not present in the library
      await navigateToTab(page, 'library-tab');
      await expect(page.getByText(fileName)).not.toBeVisible();
    });

    test('Reject non-video file formats', async ({ page }) => {
      await uploadMockVideo(page, 'primary-upload-btn', 'invalid_doc.pdf', 'application/pdf');
      
      // Verify negative scenario validation message
      await verifyToastMessage(page, 'File invalid_doc.pdf is not a valid file type.');
    });
  });

  test.describe('Demo Creation Journeys', () => {
    
    test.beforeEach(async ({ page }) => {
      await navigateToTab(page, 'library-tab');
    });

    test('Generate demo using "Use" button from library', async ({ page }) => {
      const videoCard = page.getByTestId('library-video-card').first();
      await videoCard.hover();
      await videoCard.getByTestId('btn-use-video').click();
      
      // Assert transition to editor
      await expect(page).toHaveURL(/\/editor/);
      await page.getByTestId('btn-publish-demo').click();
      await verifyToastMessage(page, 'Demo Published Successfully');
    });

    test('Initiate demo splitting from library', async ({ page }) => {
      const videoCard = page.getByTestId('library-video-card').first();
      await videoCard.hover();
      await videoCard.getByTestId('btn-split-video').click();
      
      // Validate specialized tool routing
      await expect(page).toHaveURL(/\/editor\/split/);
      await page.getByTestId('btn-confirm-split').click();
      await verifyToastMessage(page, 'Video Split Successfully');
    });

    test('Execute quick-create from Add New page', async ({ page }) => {
      await navigateToTab(page, 'add-new-tab');
      const uploadPreview = page.getByTestId('recent-upload-card').first();
      await expect(uploadPreview).toBeVisible();
      
      await uploadPreview.getByTestId('btn-quick-create').click();
      await verifyToastMessage(page, 'Demo Published Successfully');
    });
  });

  test.describe('Template Integration Validation', () => {
    
    test.beforeEach(async ({ page }) => {
      await navigateToTab(page, 'templates-tab');
    });

    test('Apply "Vertical Panels" layout template', async ({ page }) => {
      await page.getByTestId('template-vertical-panels').click();
      await page.getByTestId('btn-apply-template').click();
      
      // Structural validation of the applied layout
      const canvas = page.getByTestId('editor-canvas');
      await expect(canvas).toHaveAttribute('data-layout', 'vertical-panels');
    });

    test('Apply "Dynamic Background" template', async ({ page }) => {
      await page.getByTestId('template-dynamic-background').click();
      await page.getByTestId('btn-apply-template').click();
      
      // Validate CSS state
      const bgLayer = page.getByTestId('editor-background-layer');
      await expect(bgLayer).toHaveClass(/animated-bg/);
    });

    test('Validate composite branded/animation templates', async ({ page }) => {
      await page.getByTestId('template-branded-animation').click();
      await page.getByTestId('btn-apply-template').click();
      
      // Multiple assertions for complex UI state
      await expect(page.getByTestId('overlay-logo')).toBeVisible();
      await expect(page.getByTestId('timeline-animations')).not.toBeEmpty();
      await expect(page.getByTestId('brand-color-indicator')).toBeVisible();
    });
  });
});
