import { Page, expect, test } from '@playwright/test';

import { version } from '@root/package.json';
import '@root/src/playwright.setup';
import { Server, getWeekDays } from '@utils/tj';

import { mockAPI } from './../../../__mocks__/playwright';

const login = async (page: Page) => {
  await page.getByLabel('Username').fill('username');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
};

test.describe('tj-jira-panel', () => {
  test.beforeEach(async ({ page }) => {
    global.localStorage.clear();
    await page.route(Server.url, mockAPI);
    await page.goto('/playwright');
    await page.getByText('TJ Integration').waitFor({
      state: 'visible',
    });
  });

  // MARK: Header
  test.describe('header', () => {
    test('should render the header', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'TJ Integration' })).toBeVisible();
      await expect(page.getByLabel('Toggle TJ panel')).toBeVisible();
    });
    test('should collapse the panel when the button is clicked', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
      await page.getByLabel('Toggle TJ panel').click();
      await expect(page.getByRole('button', { name: 'Login' })).not.toBeVisible();
      await expect(page.getByRole('heading', { name: 'TJ Integration' })).toBeVisible();
    });
  });

  // MARK: Footer
  test.describe('footer', () => {
    test('should render the footer with server information', async ({ page }) => {
      await expect(page.getByText('TJ v1.0.0')).toBeVisible();
      await expect(page.getByText(`TJI v${version}`)).toBeVisible();
      await expect(page.getByRole('button', { name: /open settings/i })).toBeVisible();
    });
    test('should opens settings when the button is clicked', async ({ page }) => {
      await page.getByRole('button', { name: /open settings/i }).click();
      await expect(page.getByText('Settings')).toBeVisible();
      await expect(page.getByRole('button', { name: /close settings/i })).toBeVisible();

      await expect(page.getByRole('button', { name: /server/i })).toBeVisible();
      await page.getByRole('button', { name: /server/i }).click();
      await expect(page.getByLabel('Server API URL')).toBeVisible();
      await expect(page.getByRole('button', { name: /back/i })).toBeVisible();

      await page.getByRole('button', { name: /back/i }).click();
      await expect(page.getByRole('button', { name: /server/i })).toBeVisible();

      await page.getByRole('button', { name: /close settings/i }).click();
      await expect(page.getByText('Settings')).not.toBeVisible();
    });
    test('should show parent tasks settings when logged in', async ({ page }) => {
      await login(page);
      await page.getByRole('button', { name: /open settings/i }).click();
      await expect(page.getByRole('button', { name: /parent tasks/i })).toBeVisible();
      await page.getByRole('button', { name: /parent tasks/i }).click();
      await expect(page.getByText('Choose the tasks you want to see in parent tasks')).toBeVisible();
      await expect(page.getByLabel('[JIRA-123] Task')).toBeVisible();
      await expect(page.getByLabel('Task 3')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Unselect all' })).toBeVisible();
    });
    test('should show work kind settings when logged in', async ({ page }) => {
      await login(page);
      await page.getByRole('button', { name: /open settings/i }).click();
      await expect(page.getByRole('button', { name: /work kind/i })).toBeVisible();
      await page.getByRole('button', { name: /work kind/i }).click();
      await expect(page.getByText('Choose your default work kind:')).toBeVisible();
      await expect(page.getByText('This will be pre-selected when creating new tasks.')).toBeVisible();
      await expect(page.getByLabel('Development')).toBeVisible();
      await expect(page.getByLabel('QA')).toBeVisible();
      await expect(page.getByLabel('Development')).toBeChecked();
    });
  });

  // MARK: Login Form
  test.describe('login form', () => {
    test('should render the login form', async ({ page }) => {
      expect(page.getByRole('form')).not.toBeNull();
      await expect(page.getByLabel('Username')).toBeVisible();
      await expect(page.getByLabel('Password')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    });
    test('should show an error message when the server returns one', async ({ page }) => {
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page.getByText('Invalid login attempt for user null')).toBeVisible();
    });
    test('should login successfully', async ({ page }) => {
      await login(page);
      await expect(page.getByRole('button', { name: 'Login' })).not.toBeVisible();
      await expect(page.getByText('Logged in as username')).toBeVisible();
    });
  });

  // MARK: Work Kind Settings
  test.describe('work kind settings', () => {
    test.beforeEach(async ({ page }) => {
      await login(page);
      await page.getByRole('button', { name: /open settings/i }).click();
      await page.getByRole('button', { name: /work kind/i }).click();
    });
    test('should allow changing the default work kind', async ({ page }) => {
      await expect(page.getByLabel('Development')).toBeChecked();
      await page.getByLabel('QA').click();
      await expect(page.getByLabel('QA')).toBeChecked();
      await expect(page.getByLabel('Development')).not.toBeChecked();
    });
    test('should persist the work kind setting across navigation', async ({ page }) => {
      await page.getByLabel('QA').click();
      await page.getByRole('button', { name: /close settings/i }).click();
      await page.getByRole('button', { name: /open settings/i }).click();
      await page.getByRole('button', { name: /work kind/i }).click();
      await expect(page.getByLabel('QA')).toBeChecked();
      await expect(page.getByLabel('Development')).not.toBeChecked();
    });
  });

  // MARK: New Task Form
  test.describe('new task form', () => {
    const jiraId = 'JIRA-222';
    const jiraSummary = 'do the work';
    test.beforeEach(async ({ page }) => {
      await page.goto(`/playwright?jiraId=${jiraId}&jiraSummary=${jiraSummary}`);
      await login(page);
    });
    test('should render the new task form with prefilled values', async ({ page }) => {
      await expect(page.getByText(`No task found for ${jiraId}`)).toBeVisible();
      await expect(page.getByText('Create a new task')).toBeVisible();
      await expect(page.getByLabel('Name')).toBeVisible();
      await expect(page.getByLabel('Name')).toHaveValue(`[${jiraId}] ${jiraSummary}`);
      await expect(page.getByLabel('Parent task')).toBeVisible();
      await expect(page.getByLabel('Start date')).toBeVisible();
      await expect(page.getByLabel('Start date')).toHaveValue(getWeekDays()[0].iso);
      await expect(page.getByRole('button', { name: 'Create' })).toBeVisible();
    });
    test('should show work kind dropdown with default selection', async ({ page }) => {
      await expect(page.getByLabel('Work kind')).toBeVisible();
      await expect(page.getByLabel('Work kind')).toHaveValue('DEVELOPMENT');
    });
    test('should allow changing work kind in new task form', async ({ page }) => {
      await page.getByLabel('Work kind').selectOption('QA');
      await expect(page.getByLabel('Work kind')).toHaveValue('QA');
    });
    test('should use the default work kind setting from settings', async ({ page }) => {
      // Set default work kind to QA in settings
      await page.getByRole('button', { name: /open settings/i }).click();
      await page.getByRole('button', { name: /work kind/i }).click();
      await page.getByLabel('QA').click();
      await page.getByRole('button', { name: /close settings/i }).click();

      // Navigate to a new task form
      await page.goto(`/playwright?jiraId=JIRA-999&jiraSummary=new task`);
      await login(page);
      await expect(page.getByLabel('Work kind')).toHaveValue('QA');
    });
    test('should show only the selected parent tasks', async ({ page }) => {
      await page.getByRole('button', { name: /open settings/i }).click();
      await page.getByRole('button', { name: /parent tasks/i }).click();
      await page.getByLabel('[JIRA-123] Task').click();
      await page.getByRole('button', { name: /close settings/i }).click();
      await expect(page.getByLabel('Parent task')).toBeVisible();
      await expect(await page.getByLabel('Parent task').textContent()).toBe(
        ['Task 3', '[JIRA-333] doing 333 tests'].join(''),
      );
    });
    test('should show contextual help for work kind', async ({ page }) => {
      // Click on the help icon next to "Work kind" to show the help content
      await page.locator('contextual-help').nth(1).click();
      await expect(page.getByText('You can set your default work kind from Settings > Work kind')).toBeVisible();
    });
    test('should create a new task with selected work kind', async ({ page }) => {
      await page.getByLabel('Work kind').selectOption('QA');
      await page.getByLabel('Parent task').selectOption({ label: 'Task 3' });
      await page.getByRole('button', { name: 'Create' }).click();
      await expect(page.getByRole('table')).toBeVisible();
      await expect(page.getByText(`Task 3`)).toBeVisible();
      await expect(page.getByText(`[${jiraId}] ${jiraSummary}`)).toBeVisible();
    });
  });

  // MARK: Timesheet
  test.describe('timesheet', () => {
    const jiraId = 'JIRA-333';
    const jiraSummary = 'doing 333 tests';
    const longWeekdayFormatter = new Intl.DateTimeFormat('en', {
      weekday: 'long',
    });
    const todaysInputLabel = new RegExp(`Hours recorded on\s*.*\s*${longWeekdayFormatter.format(new Date())}\s*.*`);
    test.beforeEach(async ({ page }) => {
      await page.goto(`/playwright?jiraId=${jiraId}&jiraSummary=${jiraSummary}`);
      await login(page);
    });
    test('should render the timesheet when you already have a task created', async ({ page }) => {
      await expect(page.getByRole('table')).toBeVisible();
      await expect(page.getByText(`Task 3`)).toBeVisible();
      await expect(page.getByText(`[${jiraId}] ${jiraSummary}`)).toBeVisible();
    });
    test('should allow you to record hours for a day', async ({ page }) => {
      await expect(page.getByRole('table')).toBeVisible();
      const todaysInput = page.getByLabel(todaysInputLabel);
      await todaysInput.press('8');
      await todaysInput.press('Enter');
      await expect(page.getByText('Hours saved successfully.')).toBeVisible();
    });
    test('should show an error message when the hours are not a number', async ({ page }) => {
      await expect(page.getByRole('table')).toBeVisible();
      const todaysInput = page.getByLabel(todaysInputLabel);
      await todaysInput.fill('eight');
      await todaysInput.press('Enter');
      await expect(page.getByText('You must enter a valid number of hours.')).toBeVisible();
    });
  });
});
