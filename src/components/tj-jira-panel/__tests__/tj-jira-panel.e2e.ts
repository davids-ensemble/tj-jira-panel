import { expect, test } from '@playwright/test';

import '@root/src/playwright.setup';
import { Server } from '@utils/tj';

import { mockAPI } from './../../../__mocks__/playwright';

test.describe('tj-jira-panel', () => {
  test.beforeEach(async ({ page }) => {
    global.localStorage.clear();
    await page.route(Server.url, mockAPI);
    await page.goto('/playwright');
    await page.getByText('TJ Integration').waitFor({
      state: 'visible',
    });
  });

  test('should render the login form', async ({ page }) => {
    expect(page.getByRole('form')).not.toBeNull();
    await expect(page.getByLabel('Username')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });
});
