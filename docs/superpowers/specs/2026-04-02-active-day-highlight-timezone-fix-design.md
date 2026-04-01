# Fix: Incorrect Active Day Highlighted (Timezone Bug)

**Issue:** [#40](https://github.com/davids-ensemble/tj-jira-panel/issues/40)
**Date:** 2026-04-02

## Problem

Users in UTC+ timezones (primarily UTC+2) see the wrong day highlighted as "today" in the timesheet between local midnight and UTC midnight. For example, a user working late on Monday past midnight (local time is now Tuesday) still sees Monday highlighted as the active day.

## Root Cause

In `src/components/tj-task-page/components/tj-task-timesheet/tj-task-timesheet.tsx`, the module-level constant `midnightToday` is normalized using `setUTCHours`:

```ts
const midnightToday = new Date();
midnightToday.setUTCHours(0, 0, 0, 0); // ← sets UTC midnight, not local midnight
```

`setUTCHours(0, 0, 0, 0)` zeros out the UTC time components. For a user in UTC+2 at 01:00 local time:

- `new Date()` = April 2 01:00+02:00 = April 1 23:00 UTC
- After `setUTCHours(0, 0, 0, 0)` → April 1 00:00 UTC = April 1 02:00+02:00
- `midnightToday.getDate()` = **1** (April 1)
- Actual local date = **2** (April 2) ← mismatch

The `currentDay` CSS class is applied on line 107:
```ts
day.date.getDate() === midnightToday.getDate() && 'currentDay'
```

Because `midnightToday.getDate()` returns yesterday's local day number, Monday gets highlighted instead of Tuesday.

## Fix

**One-line change** in `tj-task-timesheet.tsx:15`:

```ts
// Before
midnightToday.setUTCHours(0, 0, 0, 0);

// After
midnightToday.setHours(0, 0, 0, 0);
```

`setHours` normalizes to local midnight, so `getDate()` correctly reflects the user's local date at all times.

The `getDate()` comparison for `currentDay` remains valid: days within a week are 7 consecutive dates, so no two can share the same day-of-month number within a single week view.

## Scope

**In scope:**
- Fix `midnightToday` to use local midnight in `tj-task-timesheet.tsx`

**Out of scope:**
- `getWeekDays` in `utils.ts` uses `setUTCHours` and `toISOString` for `iso` date keys — changing these without also fixing the `iso` field would break API date keys. Not needed for this bug.
- `midnightToday` being module-level (stale if panel stays open past midnight without reload) — separate issue, not reported.
- API `containingDay` date string format — user confirmed out of scope.

## Files Changed

- `src/components/tj-task-page/components/tj-task-timesheet/tj-task-timesheet.tsx` — change `setUTCHours` to `setHours` on line 15
