import { test, expect } from '@playwright/test';

test('Add item to cart and checkout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('.inventory_item:first-child button');
    await page.click('.shopping_cart_link');
    await page.click('#checkout');
    await expect(page).toHaveURL(/checkout-step-one.html/);
  });

  