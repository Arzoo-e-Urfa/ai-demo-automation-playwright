// Import test from our custom fixture, NOT directly from '@playwright/test'
const { test, expect } = require('../fixtures/auth.fixture');
const { uploadMockVideo, verifyToastMessage, navigateToTab } = require('../utils/helpers');

/**
 * Demo and Media Management Suite
 * Tags: @demo @e2e
 */
test.describe('Demo Creation and Media Management @demo', () => {

  // We completely removed test.beforeEach() containing the login logic!
  // The 'loggedInPage' fixture handles all authentication elegantly behind the scenes.

  test.describe('Video Upload Workflows', () => {
    
    test('Successfully upload video via primary option @smoke', async ({ loggedInPage }) => {
      const fileName = 'primary_demo.mp4';
      await uploadMockVideo(loggedInPage, 'primary-upload-btn', fileName);
      
      await verifyToastMessage(loggedInPage, 'Processing Video');
      
      // State validation: ensure file appears in the active processing list
      const processingItem = loggedInPage.getByTestId('processing-queue-item').filter({ hasText: fileName });
      await expect(processingItem).toBeVisible();
      
      // Validate UI reflects "Processing" state instead of immediately jumping to "Completed"
      await expect(processingItem.getByTestId('status-badge')).toContainText('Processing');
    });

    test('Upload video via Add Model dropdown', async ({ loggedInPage }) => {
      await navigateToTab(loggedInPage, 'add-new-tab');
      
      // Resilient interaction: ensure dropdown is visible before clicking options
      const dropdownMenu = loggedInPage.getByTestId('dropdown-upload-menu');
      await dropdownMenu.click();
      await expect(loggedInPage.getByTestId('dropdown-upload-option')).toBeVisible();
      
      await uploadMockVideo(loggedInPage, 'dropdown-upload-option', 'dropdown_demo.mp4');
      await verifyToastMessage(loggedInPage, 'Processing Video');
    });

    test('Upload video via dedicated videos tab', async ({ loggedInPage }) => {
      await navigateToTab(loggedInPage, 'videos-tab');
      await uploadMockVideo(loggedInPage, 'video-tab-dropzone', 'tab_demo.mp4');
      
      await verifyToastMessage(loggedInPage, 'Processing Video');
    });

    test('Abort upload process before completion', async ({ loggedInPage }) => {
      const fileName = 'abort_test.mp4';
      await uploadMockVideo(loggedInPage, 'primary-upload-btn', fileName);
      
      // Interact with the progress UI to cancel
      const cancelBtn = loggedInPage.getByTestId('cancel-upload-btn');
      await expect(cancelBtn).toBeVisible();
      await cancelBtn.click();
      
      await verifyToastMessage(loggedInPage, 'Upload Cancelled!');
      
      // Negative assertion cleanup check: Ensure aborted media is completely expunged from the library
      await navigateToTab(loggedInPage, 'library-tab');
      await expect(loggedInPage.getByText(fileName)).not.toBeVisible();
    });

    test('Reject non-video file formats safely', async ({ loggedInPage }) => {
      await uploadMockVideo(loggedInPage, 'primary-upload-btn', 'invalid_doc.pdf', 'application/pdf');
      
      // Verify negative scenario validation message
      await verifyToastMessage(loggedInPage, 'File invalid_doc.pdf is not a valid file type.');
      
      // Ensure no processing artifact was generated
      await expect(loggedInPage.getByTestId('processing-queue-item')).not.toBeVisible();
    });
  });

  test.describe('Demo Creation Journeys', () => {
    
    test.beforeEach(async ({ loggedInPage }) => {
      await navigateToTab(loggedInPage, 'library-tab');
    });

    test('Generate demo using "Use" button from library', async ({ loggedInPage }) => {
      const videoCard = loggedInPage.getByTestId('library-video-card').first();
      await videoCard.hover(); // Triggers overlay buttons
      
      await videoCard.getByTestId('btn-use-video').click();
      
      // Assert transition to the editor workspace
      await expect(loggedInPage).toHaveURL(/\/editor/);
      
      await loggedInPage.getByTestId('btn-publish-demo').click();
      await verifyToastMessage(loggedInPage, 'Demo Published Successfully');
    });

    test('Initiate demo splitting from library', async ({ loggedInPage }) => {
      const videoCard = loggedInPage.getByTestId('library-video-card').first();
      await videoCard.hover();
      await videoCard.getByTestId('btn-split-video').click();
      
      // Validate specialized tool routing
      await expect(loggedInPage).toHaveURL(/\/editor\/split/);
      await expect(loggedInPage.getByTestId('timeline-trimmer')).toBeVisible(); // Ensure trim tool loaded
      
      await loggedInPage.getByTestId('btn-confirm-split').click();
      await verifyToastMessage(loggedInPage, 'Video Split Successfully');
    });

    test('Execute quick-create from Add New page', async ({ loggedInPage }) => {
      await navigateToTab(loggedInPage, 'add-new-tab');
      const uploadPreview = loggedInPage.getByTestId('recent-upload-card').first();
      await expect(uploadPreview).toBeVisible();
      
      await uploadPreview.getByTestId('btn-quick-create').click();
      await verifyToastMessage(loggedInPage, 'Demo Published Successfully');
    });
  });

  test.describe('Template Integration Validation', () => {
    
    test.beforeEach(async ({ loggedInPage }) => {
      await navigateToTab(loggedInPage, 'templates-tab');
    });

    test('Apply "Vertical Panels" layout template', async ({ loggedInPage }) => {
      await loggedInPage.getByTestId('template-vertical-panels').click();
      await loggedInPage.getByTestId('btn-apply-template').click();
      
      // Structural validation of the applied layout via DOM attributes
      const canvas = loggedInPage.getByTestId('editor-canvas');
      await expect(canvas).toHaveAttribute('data-layout', 'vertical-panels');
      
      // Sub-assertion: Verify the panel partition elements rendered
      await expect(loggedInPage.getByTestId('left-panel')).toBeVisible();
      await expect(loggedInPage.getByTestId('right-panel')).toBeVisible();
    });

    test('Apply "Dynamic Background" template', async ({ loggedInPage }) => {
      await loggedInPage.getByTestId('template-dynamic-background').click();
      await loggedInPage.getByTestId('btn-apply-template').click();
      
      // Validate CSS state assignment on the rendering layer
      const bgLayer = loggedInPage.getByTestId('editor-background-layer');
      await expect(bgLayer).toHaveClass(/animated-bg/);
    });

    test('Validate composite branded/animation templates', async ({ loggedInPage }) => {
      await loggedInPage.getByTestId('template-branded-animation').click();
      await loggedInPage.getByTestId('btn-apply-template').click();
      
      // Multiple assertions for complex composite UI state
      await expect(loggedInPage.getByTestId('overlay-logo')).toBeVisible();
      await expect(loggedInPage.getByTestId('timeline-animations')).not.toBeEmpty();
      await expect(loggedInPage.getByTestId('brand-color-indicator')).toBeVisible();
    });
  });
});
