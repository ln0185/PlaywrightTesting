import { test, expect } from '@playwright/test';

test('Login page has correct title', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('Login with valid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory.html/);
});
