import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";

test('Verify login with valid credentials', async ({ loggedInPage, accountPage }) => {
    await expect(loggedInPage).toHaveURL('/account');
    await expect(accountPage.pageTitle).toHaveText('My account');
    await expect(accountPage.header.navMenuLocator).toHaveText(process.env.USER_NAME!);
});

test('Verify user can view product details', async ({ homePage, productPage, page }) => {
    const productName = 'Combination Pliers';

    await homePage.openProductPage(productName);

    await expect(page).toHaveURL(/.*product.*/);
    await expect(productPage.titleLocator).toHaveText(productName);
    await expect(productPage.priceLocator).toHaveText('14.15');
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.addToFavouritesButton).toBeVisible();
});

test('Verify user can add product to cart', async ({ homePage, productPage, checkoutPage, page }) => {
    const productName = 'Slip Joint Pliers';

    await homePage.openProductPage(productName);
    await expect(productPage.titleLocator).toHaveText('Slip Joint Pliers');
    await expect(productPage.priceLocator).toHaveText('9.17');

    await productPage.addProductToCart();

    await expect(productPage.cartAlertLocator).toHaveText('Product added to shopping cart.');
    await expect(productPage.cartAlertLocator).toBeHidden({ timeout: 8_000 });
    await expect(productPage.header.cartQuantity).toHaveText('1');

    await productPage.header.cartButton.click();

    await expect(page).toHaveURL('/checkout');

    await expect(checkoutPage.cartProductName).toHaveCount(1);
    await expect(checkoutPage.cartProductName).toHaveText('Slip Joint Pliers');
    await expect(checkoutPage.checkoutButton).toBeVisible();
});