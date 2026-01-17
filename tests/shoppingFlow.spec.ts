import { test, expect } from '@playwright/test';
import { login } from './helpers';

test.describe('Full shopping flow with logout', () => {

  test('Add products, checkout, and logout', async ({ page }) => {
    // ---------------------
    // ARRANGE - Login
    // ---------------------
    await login(page); // login helper ensures dashboard is loaded

    // ---------------------
    // ARRANGE - Select products
    // ---------------------
    const firstProductButton = page.locator('.inventory_item').first().locator('button');
    const secondProductButton = page.locator('.inventory_item').nth(1).locator('button');

    // ---------------------
    // ACT - Add products to cart
    // ---------------------
    await firstProductButton.click();
    await secondProductButton.click();

    // ---------------------
    // ASSERT - Cart badge shows 2 items
    // ---------------------
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    // ---------------------
    // ACT - Go to cart
    // ---------------------
    await page.click('.shopping_cart_link');

    // ---------------------
    // ASSERT - Cart items count
    // ---------------------
    await expect(page.locator('.cart_item')).toHaveCount(2);

    // ---------------------
    // ACT - Checkout
    // ---------------------
    await page.click('[data-test="checkout"]');

    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');

    await page.click('[data-test="continue"]');

    // ---------------------
    // ASSERT - Checkout overview
    // ---------------------
    await expect(page.locator('.cart_item')).toHaveCount(2);
    await expect(page.locator('.summary_info')).toBeVisible();

    // ---------------------
    // ACT - Finish checkout
    // ---------------------
    await page.click('[data-test="finish"]');

    // ---------------------
    // ASSERT - Checkout complete
    // ---------------------
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

    // ---------------------
    // ACT - Logout
    // ---------------------
    await page.click('#react-burger-menu-btn'); // open menu
    await expect(page.locator('#logout_sidebar_link')).toBeVisible();
    await page.click('#logout_sidebar_link');

    // ---------------------
    // ASSERT - Back to login page
    // ---------------------
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

});

