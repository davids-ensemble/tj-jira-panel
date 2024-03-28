import { expect, test } from '@playwright/test';

import { version } from '@root/package.json';
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
  });

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
      await page.getByLabel('Username').fill('username');
      await page.getByLabel('Password').fill('password');
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page.getByRole('button', { name: 'Login' })).not.toBeVisible();
      await expect(page.getByText('Logged in as username')).toBeVisible();
    });
  });
});
