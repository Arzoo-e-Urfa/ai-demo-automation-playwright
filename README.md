# AI Demo Platform - Senior QA Automation Framework

[![Playwright Tests](https://github.com/Arzoo-e-Urfa/ai-demo-automation-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/Arzoo-e-Urfa/ai-demo-automation-playwright/actions)

A professional, architect-level E2E automation repository built with **Playwright** and **Node.js**. This suite is designed to demonstrate production-grade testing practices for modern, high-scale SaaS platforms.

> **Impact Statement:** Designed as a production-grade QA automation portfolio project targeting remote QA Engineer, QA Automation Engineer, and AI Product QA roles.

## 🏭 Production Context

This framework simulates complex testing workflows for an **AI-powered SaaS platform**. It is engineered to validate mission-critical services, including:
*   **Media Ingestion:** High-resiliency video and audio upload handling.
*   **AI Content Pipelines:** Validation of async AI-generated video content.
*   **Dynamic UI Rendering:** Testing complex canvas-based editing tools.
*   **Template Engine:** Verification of dynamic, branded demo generation.

## 🏆 Why This Project Matters

This repository is more than a test suite; it is a demonstration of **Scalable QA Architecture**:
*   **CI/CD Integration:** Fully automated via GitHub Actions with artifact reporting.
*   **Advanced Fail Analysis:** Implements intelligent retries, failed-state screenshots, and trace viewer optimization.
*   **Environment Isolation:** Strict zero-hardcoding policy using `.env` management.
*   **AI-Assisted Design:** Leveraged LLMs (Gemini, Claude) to optimize selector strategies and edge-case discovery.

## 📈 Test Strategy

*   **Smoke Testing (`@smoke`):** Automated "Happy Path" validation of critical business revenue streams (Login & Primary Upload).
*   **Regression Testing:** Deep-dive validation across `@auth` and `@demo` feature sets.
*   **Negative Testing:** Verification of error handling for unauthorized access and invalid media formats.
*   **UI State Validation:** Attribute-based assertions to ensure the DOM reflects the correct internal application state.

## 🎯 Test Coverage

### 1. Authentication Suite (`auth.spec.js`)
*   **Security Boundaries:** Multi-scenario login validation and password toggle security.
*   **Auth Middleware:** Verification of redirection logic and session persistence.

### 2. Demo & Media Suite (`demo.spec.js`)
*   **Complex Uploads:** Supports primary, nested, and drag-and-drop media entry points.
*   **Video Processing:** Validation of asynchronous "Processing" states and cancellation flows.
*   **Templates:** Structural validation of canvas layouts (Vertical Panels, Dynamic Backgrounds, etc.).

## ⚙️ Setup & Environment

### Prerequisites
*   **Node.js:** v18+

### Installation
1.  **Clone & Install:**
    ```bash
    git clone https://github.com/Arzoo-e-Urfa/ai-demo-automation-playwright.git
    cd ai-demo-automation-playwright
    npm install
    npx playwright install
    ```

2.  **Environment Setup:**
    Create a `.env` file in the root directory (refer to `.env.example`):
    ```env
    BASE_URL=https://your-app.com    # Target application URL
    TEST_EMAIL=user@example.com      # Sandbox user email
    TEST_PASSWORD=yourpassword       # Sandbox user password
    ```

## 🛠️ Running the Tests

| Command | Description |
| :--- | :--- |
| `npm test` | Run all tests (Headless) |
| `npm run test:smoke` | Execute critical path Smoke tests only |
| `npm run test:ui` | Open Playwright UI Mode for debugging |
| `npm run test:ci` | Run in CI mode with optimized reporting |

---
**Disclaimer:** *This project is inspired by real-world enterprise QA workflows but contains no proprietary data or source code. All configurations are tailored for a generic AI-driven SaaS environment.*


## 🛠️ Custom Fixtures & Authentication Architecture

This framework utilizes Playwrights powerful `test.extend()` capability to build scalable, professional test fixtures. 

By abstracting UI authentication into the `loggedInPage` fixture, the framework ensures that test files remain strictly focused on business logic, adhering to the **DRY (Dont Repeat Yourself)** principle. This architectural decision makes the test suite highly resilient and drastically reduces test execution time across multiple suites.

## 📸 Automation Reports & Architecture Diagrams

> *Note for recruiters: The following screenshots showcase the framework execution and Playwright HTML reports.*

### 📊 Playwright HTML Report
Comprehensive test execution report showing 100% pass rate, execution time, and detailed step-by-step logs.

![Playwright HTML Report](https://placehold.co/800x400/f8fafc/334155?text=Playwright+HTML+Report)
<!-- To replace: Upload html-report.png to .github/assets/ and replace URL above with: .github/assets/html-report.png -->

### 🗂️ Folder Structure
Modular and scalable directory layout separating tests, fixtures, and configurations.

![Folder Structure](https://placehold.co/800x400/f8fafc/334155?text=Folder+Structure)
<!-- To replace: Upload folder-structure.png to .github/assets/ and replace URL above with: .github/assets/folder-structure.png -->

### ⚡ Test Execution
Headless/headed execution logs demonstrating speed, parallel processing, and reliability.

![Test Execution](https://placehold.co/800x400/f8fafc/334155?text=Test+Execution)
<!-- To replace: Upload test-execution.png to .github/assets/ and replace URL above with: .github/assets/test-execution.png -->

### 🔍 Trace Viewer
Playwrights time-traveling trace viewer capturing DOM snapshots, network requests, and console logs for robust debugging.

![Trace Viewer](https://placehold.co/800x400/f8fafc/334155?text=Trace+Viewer)
<!-- To replace: Upload trace-viewer.png to .github/assets/ and replace URL above with: .github/assets/trace-viewer.png -->

### 🏗️ Fixtures Architecture
Diagram illustrating the DRY implementation of `auth.fixture.js` and how it securely yields authenticated pages to spec files.

![Fixtures Architecture](https://placehold.co/800x400/f8fafc/334155?text=Fixtures+Architecture)
<!-- To replace: Upload fixtures-architecture.png to .github/assets/ and replace URL above with: .github/assets/fixtures-architecture.png -->
