# Unsubmitted Banner E2E Tests Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Playwright e2e tests for all `tj-unsubmitted-banner` visibility and interaction scenarios.

**Architecture:** Tests that need a submitted timesheet override the Playwright route inline in the test rather than relying on a query param or referer header. The shared mock always returns unsubmitted by default.

**Tech Stack:** Playwright, TypeScript, Stencil.js, XML mock responses

---

## File Map

| File | Change |
|---|---|
| `src/__mocks__/responses/index.ts` | `getTimesheet` always returns unsubmitted; removed referer-based param logic |
| `src/components/tj-jira-panel/__tests__/tj-jira-panel.e2e.ts` | Add `// MARK: Unsubmitted Banner` describe block with 4 tests; "submitted" test overrides the route inline |

---

### Task 1: Simplify the `getTimesheet` mock to always return unsubmitted

**Files:**
- Modify: `src/__mocks__/responses/index.ts`

> **Design note:** An earlier approach read `?timesheetSubmitted` from the request's `Referer` header and called `page.goto('/playwright?timesheetSubmitted=true')` in the test. This was unreliable — browsers don't consistently include query params in `Referer` for same-origin fetches. The shared mock now always returns unsubmitted; tests that need a submitted response override the route inline.

The `getTimesheet` handler should be:

```ts
getTimesheet: () => createTimesheetResponse(false),
```

- [ ] **Step 1: Update `getTimesheet` in `playwrightResponses`**

- [ ] **Step 2: Commit**

```bash
git add src/__mocks__/responses/index.ts
git commit -m "fix: simplify getTimesheet mock to always return unsubmitted by default"
```

---

### Task 2: Add the unsubmitted banner e2e test block

**Files:**
- Modify: `src/components/tj-jira-panel/__tests__/tj-jira-panel.e2e.ts`

- [ ] **Step 1: Review existing test structure for context**

Open `src/components/tj-jira-panel/__tests__/tj-jira-panel.e2e.ts`. Note:
- The outer `test.describe('tj-jira-panel', ...)` wraps all tests
- The `beforeEach` at the outer level routes `Server.url` to `mockAPI`, navigates to `/playwright`, and waits for the panel heading
- The `login` helper fills username/password and clicks Login
- Other describe blocks (header, footer, login form, timesheet) follow the same pattern

- [ ] **Step 2: Add the unsubmitted banner describe block**

Append the following block inside the outer `test.describe('tj-jira-panel', ...)`, after the `// MARK: Timesheet` block (after line 221, before the closing `}`):

```ts
  // MARK: Unsubmitted Banner
  test.describe('unsubmitted banner', () => {
    test('should not show banner when not logged in', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Unsubmitted Timesheet' })).not.toBeVisible();
    });

    test('should show banner when logged in and timesheet is unsubmitted', async ({ page }) => {
      await login(page);
      await expect(page.getByRole('heading', { name: 'Unsubmitted Timesheet' })).toBeVisible();
      await expect(page.getByText('Your timesheet for last week is not submitted.')).toBeVisible();
    });

    test('should not show banner when timesheet is submitted', async ({ page }) => {
      await page.route(Server.url, route => {
        const body = route.request().postData() ?? '';
        if (body.includes('getTimesheet')) {
          route.fulfill({ status: 200, contentType: 'application/xml', body: createTimesheetResponse(true) });
        } else {
          mockAPI(route);
        }
      });
      await login(page);
      await expect(page.getByText('Logged in as')).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Unsubmitted Timesheet' })).not.toBeVisible();
    });

    test('should show "Open TJ" button when banner is visible', async ({ page }) => {
      await login(page);
      await expect(page.getByRole('button', { name: 'Open TJ' })).toBeVisible();
    });
  });
```

Notes:
- The "submitted" test overrides the route inline, intercepting only `getTimesheet` requests and delegating everything else to `mockAPI`. This avoids relying on `Referer` headers or query params in the page URL.
- Import `createTimesheetResponse` from `src/__mocks__/responses/timesheet.response` in the test file.
- The outer `beforeEach` already routes `Server.url` to `mockAPI`, so all other tests in this block inherit that.

- [ ] **Step 3: Run the e2e tests to verify they pass**

```bash
pnpm e2e
```

Expected: all 4 new tests pass. If a test fails with a timeout on the banner heading assertion, check that the `referer` header is being sent by verifying the mock is receiving the param (add a `console.log` temporarily in the handler if needed).

- [ ] **Step 4: Commit**

```bash
git add src/components/tj-jira-panel/__tests__/tj-jira-panel.e2e.ts
git commit -m "test: add e2e tests for unsubmitted banner visibility and interaction"
```
