# AI Demo Platform - Automation Test Suite

A senior-level, production-quality end-to-end (E2E) automation testing repository built with Playwright and Node.js. 

This project is a professional portfolio showcase simulating realistic QA workflows for a modern SaaS/AI-driven application. It focuses on enterprise-grade architecture, environment isolation, and comprehensive test coverage.

## 🚀 Project Overview

The test suite is engineered with a focus on maintainability, modularity, and clean architecture. It validates the core user journeys of a video generation and demo-creation platform, including complex asynchronous processing and multi-tenant isolation.

### Tech Stack
*   **Framework:** [Playwright](https://playwright.dev/)
*   **Language:** JavaScript (Node.js)
*   **Environment Management:** [dotenv](https://www.npmjs.com/package/dotenv)
*   **Assertions:** Playwright Test (Web-First Assertions)
*   **Reporting:** Playwright HTML Reporter

## 🤖 AI-Assisted Testing

> **AI tools like ChatGPT, Gemini, and Claude were used to generate test cases, identify edge cases, and optimize QA workflows.**

By leveraging LLMs in the QA process, this project demonstrates modern testing efficiency. AI was utilized to:
- Draft complex negative scenarios (like intercepting failed file encodings).
- Enforce strict DRY (Don't Repeat Yourself) principles across helper utilities.
- Optimize selector strategies for high-resiliency automation.

## 📈 Test Strategy

Our testing methodology ensures high confidence in application stability across multiple layers:

### 1. Smoke Testing (`@smoke`)
- Targeted validation of "Happy Path" workflows.
- Critical path verification: Login and Primary Video Upload.
- Executed on every deployment to ensure core stability.

### 2. Regression Testing (`@auth`, `@demo`)
- Exhaustive validation of existing features to prevent side-effect bugs.
- Covers full user lifecycles from account access to media export.

### 3. Negative & Edge Case Testing
- Validates system resilience against invalid inputs (e.g., restricted file types).
- Error state validation for unauthenticated access attempts.
- In-progress action cancellations (e.g., aborting active uploads).

### 4. UI/UX & State Validation
- Web-first assertions to verify UI responsiveness.
- State-based checks (e.g., verifying element visibility after asynchronous events).
- Verification of dynamic UI components like toasts and progress indicators.

## 🎯 Test Coverage

### Authentication (`auth.spec.js`)
*   Multi-scenario login validation (Valid, Invalid, Missing fields).
*   UI state checks for input security (Password visibility toggle).
*   Auth boundary enforcement (Redirection logic).

### Demo & Media Management (`demo.spec.js`)
*   **Robust Uploads:** Supports primary actions, nested dropdowns, and dedicated tab uploads.
*   **Workflow Integrity:** Verification of library asset utilization (`Use` and `Split` logic).
*   **Template Engine:** Structural validation of canvas layouts (*Vertical Panels*, *Dynamic Backgrounds*, *Branded Animations*).

## ⚙️ Setup & Environment

### Prerequisites
*   [Node.js](https://nodejs.org/) (v16 or higher)

### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/ai-demo-automation-playwright.git
    cd ai-demo-automation-playwright
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Install Playwright browsers:**
    ```bash
    npx playwright install
    ```

### Environment Configuration
This project uses `dotenv` for environment isolation. 
1.  Copy the example environment file:
    ```bash
    cp .env.example .env
    ```
2.  Update the `.env` file with your target URL and credentials:
    ```env
    BASE_URL=https://your-target-app.com
    TEST_EMAIL=user@example.com
    TEST_PASSWORD=yourpassword
    ```

## 🛠️ Running the Tests

**Execute all tests:**
```bash
npm test
```

**Execute Smoke tests only:**
```bash
npm run test:smoke
```

**Run in Headed mode (Local Debugging):**
```bash
npm run test:headed
```

**Run in CI mode (Line Reporter):**
```bash
npm run test:ci
```

---

**Disclaimer:** *This project is inspired by real-world QA experience and architectural design patterns but utilizes generic configurations and contains absolutely no proprietary data or source code from any past or current employers.*
