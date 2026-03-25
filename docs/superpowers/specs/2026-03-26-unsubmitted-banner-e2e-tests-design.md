# E2E Tests: Unsubmitted Banner

**Date:** 2026-03-26

## Goal

Add Playwright e2e tests for `tj-unsubmitted-banner` covering all visibility and interaction scenarios.

## Background

`tj-unsubmitted-banner` is rendered inside `tj-footer`. It shows when:
1. The user is logged in (`isLoggedIn === true`)
2. The `getTimesheet` API returns `<submitted>false</submitted>` for the previous week's date

The component emits a `bannerStateChange` event consumed by `tj-footer` to control visibility via `display` style.

## Mock changes

### `src/__mocks__/responses/index.ts`

`playwrightResponses.getTimesheet` always returns an unsubmitted timesheet by default:

```ts
getTimesheet: () => createTimesheetResponse(false),
```

Tests that need a submitted timesheet override the route directly in the test (see below) — the shared mock does not need to know about test state.

> **Note:** An earlier approach read `?timesheetSubmitted` from the request's `referer` header, but browsers don't reliably include query params in `Referer` for same-origin fetches, so this was unreliable.

## Test cases

Added as a new `// MARK: Unsubmitted Banner` describe block in `src/components/tj-jira-panel/__tests__/tj-jira-panel.e2e.ts`.

All tests inherit the outer `beforeEach` route (`Server.url → mockAPI`). The "submitted" test overrides the route for `getTimesheet` calls only, falling back to `mockAPI` for all other request types.

| Test | Route override | Logged in | Expected |
|---|---|---|---|
| should not show banner when not logged in | none | No | Banner heading not visible |
| should show banner when logged in and timesheet is unsubmitted | none | Yes | Heading + message visible |
| should not show banner when timesheet is submitted | `getTimesheet` → `createTimesheetResponse(true)` | Yes | Banner heading not visible |
| should show "Open TJ" button when banner is visible | none | Yes | "Open TJ" button visible |

### Selectors used

- Banner heading: `page.getByRole('heading', { name: 'Unsubmitted Timesheet' })`
- Message: `page.getByText('Your timesheet for last week is not submitted.')`
- Button: `page.getByRole('button', { name: 'Open TJ' })`

## Files changed

| File | Change |
|---|---|
| `src/__mocks__/responses/index.ts` | `getTimesheet` always returns unsubmitted; removed referer-based param logic |
| `src/components/tj-jira-panel/__tests__/tj-jira-panel.e2e.ts` | Add unsubmitted banner describe block with 4 test cases; "submitted" test overrides route inline |
