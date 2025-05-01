import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";

test('Verify login with valid credentials', async ({ loggedInApp }) => {
    await expect(loggedInApp.page).toHaveURL('/account');
    await expect(loggedInApp.accountPage.pageTitle).toHaveText('My account');
    await expect(loggedInApp.accountPage.header.navMenuLocator).toHaveText(process.env.USER_NAME!);
});

test('Verify user can view product details', async ({ app }) => {
    const productName = 'Combination Pliers';

    await app.homePage.goto();
    await app.homePage.openProductPage(productName);

    await expect(app.page).toHaveURL(/.*product.*/);
    await expect(app.productPage.titleLocator).toHaveText(productName);
    await expect(app.productPage.priceLocator).toHaveText('14.15');
    await expect(app.productPage.addToCartButton).toBeVisible();
    await expect(app.productPage.addToFavouritesButton).toBeVisible();
});

test('Verify user can add product to cart', async ({ app }) => {
    const productName = 'Slip Joint Pliers';

    await app.homePage.goto();
    await app.homePage.openProductPage(productName);
    await expect(app.productPage.titleLocator).toHaveText('Slip Joint Pliers');
    await expect(app.productPage.priceLocator).toHaveText('9.17');

    await app.productPage.addProductToCart();

    await expect(app.productPage.cartAlertLocator).toHaveText('Product added to shopping cart.');
    await expect(app.productPage.cartAlertLocator).toBeHidden({ timeout: 8_000 });
    await expect(app.productPage.header.cartQuantity).toHaveText('1');

    await app.productPage.header.cartButton.click();

    await expect(app.page).toHaveURL('/checkout');

    await expect(app.checkoutPage.cartProductName).toHaveCount(1);
    await expect(app.checkoutPage.cartProductName).toHaveText('Slip Joint Pliers');
    await expect(app.checkoutPage.checkoutButton).toBeVisible();
});