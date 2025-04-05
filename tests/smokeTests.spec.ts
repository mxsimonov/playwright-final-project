import { test, expect } from "@playwright/test";
import 'dotenv/config';

test('Verify login with valid credentials', async({page}) => {
    await page.goto('/auth/login');
    await page.getByRole('textbox', {name: 'Email address *'}).fill(process.env.USER_EMAIL!);
    await page.getByRole('textbox', {name: 'Password *'}).fill(process.env.USER_PASSWORD!);
    await page.getByRole('button', {name: 'Login'}).click();

    await expect(page).toHaveURL('/account');
    await expect(page.getByRole('heading')).toHaveText('My account');
    await expect(page.getByTestId('nav-menu')).toHaveText(process.env.USER_NAME!);
});

test('Verify user can view product details', async({page}) => {
    await page.goto('/');
    await page.getByRole('heading', {name: 'Combination Pliers'}).click();
    await expect(page).toHaveURL(/.*product.*/);

    await expect(page.getByTestId('product-name')).toHaveText('Combination Pliers');
    await expect(page.getByTestId('unit-price')).toHaveText('14.15');
    await expect(page.getByRole('button', {name: 'Add to cart'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Add to favourites'})).toBeVisible();
});

test('Verify user can add product to cart', async({page}) => {
    await page.goto('/');
    await page.getByRole('heading', {name: 'Slip Joint Pliers'}).click();
    await expect(page.getByTestId('product-name')).toHaveText('Slip Joint Pliers');
    await expect(page.getByTestId('unit-price')).toHaveText('9.17');

    await page.getByRole('button', {name: 'Add to cart'}).click();

    const cartAlert = page.getByRole('alert');
    await expect(cartAlert).toHaveText('Product added to shopping cart.');
    await expect(cartAlert).toBeHidden({ timeout: 8_000 });
    await expect(page.getByTestId('cart-quantity')).toHaveText('1');

    await page.getByRole('link', {name: "cart"}).click();
    await expect(page).toHaveURL('/checkout');

    const productTitle = page.locator('.product-title');
    await expect(productTitle).toHaveCount(1);
    await expect(productTitle).toHaveText('Slip Joint Pliers');
    await expect(page.getByRole('button', {name: 'Proceed to Checkout'})).toBeVisible();
});