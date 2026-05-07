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
