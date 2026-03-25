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

Update `playwrightResponses.getTimesheet` to read the `timesheetSubmitted` query param from the page's `referer` header:

```ts
getTimesheet: (params: ResponseFunctionParameters) => {
  const url = new URL(params.headers.get('referer') ?? '');
  const submitted = url.searchParams.get('timesheetSubmitted') === 'true';
  return createTimesheetResponse(submitted);
},
```

- `createTimesheetResponse` already accepts a `submitted: boolean` param (defaults to `false`) — no changes needed there.
- The `referer` header in Playwright requests contains the page URL, making query params accessible to the mock handler.
- Default behavior (no param) remains `submitted: false`, so existing tests are unaffected.

## Test cases

Added as a new `// MARK: Unsubmitted Banner` describe block in `src/components/tj-jira-panel/__tests__/tj-jira-panel.e2e.ts`.

No shared `beforeEach` — each test manages its own URL and login state.

| Test | URL | Logged in | Expected |
|---|---|---|---|
| should not show banner when not logged in | `/playwright` | No | Banner heading not visible |
| should show banner when logged in and timesheet is unsubmitted | `/playwright` | Yes | Heading + message visible |
| should not show banner when timesheet is submitted | `/playwright?timesheetSubmitted=true` | Yes | Banner heading not visible |
| should show "Open TJ" button when banner is visible | `/playwright` | Yes | "Open TJ" button visible |

### Selectors used

- Banner heading: `page.getByRole('heading', { name: 'Unsubmitted Timesheet' })`
- Message: `page.getByText('Your timesheet for last week is not submitted.')`
- Button: `page.getByRole('button', { name: 'Open TJ' })`

## Files changed

| File | Change |
|---|---|
| `src/__mocks__/responses/index.ts` | Read `timesheetSubmitted` query param in `getTimesheet` handler |
| `src/components/tj-jira-panel/__tests__/tj-jira-panel.e2e.ts` | Add unsubmitted banner describe block with 4 test cases |
