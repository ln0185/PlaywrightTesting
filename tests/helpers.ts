// tests/helpers.ts
import { Page } from '@playwright/test';

export async function login(page: Page, username = 'standard_user', password = 'secret_sauce') {
  // Arrange
  await page.goto('https://www.saucedemo.com/');

  // Act
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');

  // Assert
  await page.waitForSelector('.inventory_list'); // confirms dashboard loaded
}

