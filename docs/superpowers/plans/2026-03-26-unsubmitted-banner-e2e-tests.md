# Unsubmitted Banner E2E Tests Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Playwright e2e tests for all `tj-unsubmitted-banner` visibility and interaction scenarios.

**Architecture:** Update the existing Playwright mock handler to read a `timesheetSubmitted` query param from the page referer header, then add a new `unsubmitted banner` describe block with 4 self-contained test cases.

**Tech Stack:** Playwright, TypeScript, Stencil.js, XML mock responses

---

## File Map

| File | Change |
|---|---|
| `src/__mocks__/responses/index.ts` | Update `playwrightResponses.getTimesheet` to read `?timesheetSubmitted` query param |
| `src/__mocks__/playwright.ts` | **Bug fix (discovered during implementation):** `route.request().headers()` returns a plain `Record<string, string>`, not a `Headers` instance. The original cast `as unknown as Headers` caused `.get('referer')` to throw at runtime. Fixed by wrapping with `new Headers(route.request().headers())`. |
| `src/components/tj-jira-panel/__tests__/tj-jira-panel.e2e.ts` | Add `// MARK: Unsubmitted Banner` describe block with 4 tests |

---

### Task 1: Update the `getTimesheet` mock to support `?timesheetSubmitted` query param

**Files:**
- Modify: `src/__mocks__/responses/index.ts`

- [ ] **Step 1: Read the current file**

Open `src/__mocks__/responses/index.ts`. The relevant section is:

```ts
export const playwrightResponses = {
  login: createLoginResponse,
  getTimesheet: (_params: ResponseFunctionParameters) => createTimesheetResponse(),
  addSubTask: createAddSubtaskResponse,
  recordHoursForDay: (_params: ResponseFunctionParameters) => createRecordHoursForDayResponse(),
  getServerConfiguration: createServerConfigResponse,
};
```

- [ ] **Step 2: Update `getTimesheet` to read the query param**

Replace the `getTimesheet` line so the handler reads `timesheetSubmitted` from the page's referer URL. The referer header is set automatically by Playwright to the current page URL.

The updated `playwrightResponses` object should look like this (only `getTimesheet` changes):

```ts
export const playwrightResponses = {
  login: createLoginResponse,
  getTimesheet: (params: ResponseFunctionParameters) => {
    const referer = params.headers.get('referer') ?? '';
    const submitted = referer ? new URL(referer).searchParams.get('timesheetSubmitted') === 'true' : false;
    return createTimesheetResponse(submitted);
  },
  addSubTask: createAddSubtaskResponse,
  recordHoursForDay: (_params: ResponseFunctionParameters) => createRecordHoursForDayResponse(),
  getServerConfiguration: createServerConfigResponse,
};
```

Note: `createTimesheetResponse` already accepts `submitted: boolean` (defaults to `false`), so no changes are needed in `timesheet.response.ts`. When no `?timesheetSubmitted` param is present, `referer` will not have it and `submitted` stays `false` — existing tests are unaffected.

- [ ] **Step 3: Commit**

```bash
git add src/__mocks__/responses/index.ts
git commit -m "feat: support timesheetSubmitted query param in getTimesheet mock"
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
      await page.goto('/playwright?timesheetSubmitted=true');
      await page.getByText('TJ Integration').waitFor({ state: 'visible' });
      await login(page);
      await expect(page.getByRole('heading', { name: 'Unsubmitted Timesheet' })).not.toBeVisible();
    });

    test('should show "Open TJ" button when banner is visible', async ({ page }) => {
      await login(page);
      await expect(page.getByRole('button', { name: 'Open TJ' })).toBeVisible();
    });
  });
```

Notes:
- The first test ("not logged in") relies on the outer `beforeEach` which navigates to `/playwright` — no extra setup needed.
- The "submitted" test navigates to `/playwright?timesheetSubmitted=true` and re-waits for the panel heading (same pattern as the `new task form` describe block which also re-navigates).
- The outer `beforeEach` already routes `Server.url` to `mockAPI`, so all tests in this block inherit that.

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
