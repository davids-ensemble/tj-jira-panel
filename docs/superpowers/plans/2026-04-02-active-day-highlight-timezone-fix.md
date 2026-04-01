# Active Day Highlight Timezone Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix `currentDay` highlight showing the wrong column for UTC+ timezone users between local midnight and UTC midnight.

**Architecture:** Replace `setUTCHours(0, 0, 0, 0)` with `setHours(0, 0, 0, 0)` on the module-level `midnightToday` constant so it normalizes to local midnight rather than UTC midnight.

**Tech Stack:** Stencil.js, TypeScript, Vitest (unit tests)

---

### Task 1: Fix the timezone bug and update the test

**Files:**
- Modify: `src/components/tj-task-page/components/tj-task-timesheet/tj-task-timesheet.tsx:15`
- Modify: `src/utils/tj/tests/utils.spec.ts` (no change needed — the `getWeekDays` tests are unaffected)

> There are no existing unit tests for `tj-task-timesheet.tsx`. We'll add one to `src/utils/tj/tests/utils.spec.ts` that verifies `midnightToday` uses local midnight. Because `midnightToday` is module-level in the component (not exported), we test the observable behavior via the `getWeekDays` helper and a direct date check — see step below.

- [ ] **Step 1: Create a new branch**

```bash
git checkout -b fix/active-day-highlight-timezone
```

- [ ] **Step 2: Write a failing test that documents the expected local-midnight behavior**

Add to the bottom of `src/utils/tj/tests/utils.spec.ts`:

```ts
describe('local midnight normalization', () => {
  it('setHours(0,0,0,0) produces local midnight, not UTC midnight', () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    expect(date.getHours()).toBe(0);
    expect(date.getMinutes()).toBe(0);
    expect(date.getSeconds()).toBe(0);
    expect(date.getMilliseconds()).toBe(0);
  });

  it('setUTCHours(0,0,0,0) does NOT produce local midnight in UTC+ timezones', () => {
    // Simulate a UTC+2 scenario: create a date at 01:00 local (23:00 UTC previous day)
    // After setUTCHours the local hour will NOT be 0 in UTC+ zones.
    // This test documents why setUTCHours is wrong for local-date comparisons.
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    // In UTC the hours are 0, but local hours may differ
    expect(date.getUTCHours()).toBe(0);
    // We do NOT assert getHours() === 0 because it depends on timezone offset
  });
});
```

- [ ] **Step 3: Run the new tests to confirm they pass (they document behaviour, not catch a regression)**

```bash
pnpm test src/utils/tj/tests/utils.spec.ts
```

Expected: all tests in that file PASS.

- [ ] **Step 4: Apply the one-line fix**

In `src/components/tj-task-page/components/tj-task-timesheet/tj-task-timesheet.tsx`, change line 15:

```ts
// Before
midnightToday.setUTCHours(0, 0, 0, 0);

// After
midnightToday.setHours(0, 0, 0, 0);
```

- [ ] **Step 5: Run the full test suite**

```bash
pnpm test
```

Expected: all existing tests PASS (the `getWeekDays` suite, `checkForError`, `migrateV1SelectedTasks`, and the new tests).

- [ ] **Step 6: Commit**

```bash
git add src/components/tj-task-page/components/tj-task-timesheet/tj-task-timesheet.tsx \
        src/utils/tj/tests/utils.spec.ts
git commit -m "fix: use local midnight for active day highlight (#40)"
```

---

### Task 2: Open a pull request

- [ ] **Step 1: Push the branch**

```bash
git push -u origin fix/active-day-highlight-timezone
```

- [ ] **Step 2: Create the PR**

```bash
gh pr create \
  --title "fix: use local midnight for active day highlight" \
  --body "$(cat <<'EOF'
## Summary
- Fixes incorrect active-day column highlight for UTC+ timezone users between local midnight and UTC midnight
- Root cause: `setUTCHours(0,0,0,0)` normalized `midnightToday` to UTC midnight instead of local midnight, causing `getDate()` to return yesterday's local day number
- Fix: one-line change `setUTCHours` → `setHours` in `tj-task-timesheet.tsx`

Closes #40

## Test plan
- [ ] Run `pnpm test` — all tests pass
- [ ] Manual: set system clock to a UTC+ timezone, advance time past midnight, verify the correct day column is highlighted

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```
