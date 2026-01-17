import { test, expect } from '@playwright/test';
import { login } from './helpers';

test.describe('Login functionality', () => {

  test('Login with valid credentials', async ({ page }) => {
    await login(page);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('Login with invalid credentials', async ({ page }) => {
    // Arrange
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'invalid_user');
    await page.fill('#password', 'wrong_password');

    // Act
    await page.click('#login-button');

    // Assert
    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

});

