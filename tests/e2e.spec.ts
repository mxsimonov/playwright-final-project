import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { HomePage } from "../pages/home.page";
import { ProductPage } from "../pages/product.page";
import { CheckoutPage } from "../pages/checkout.page";
import { AccountPage } from "../pages/account.page";


test('Verify login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);

    await loginPage.goto();

    await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);

    await expect(page).toHaveURL('/account');
    await expect(accountPage.pageTitle).toHaveText('My account');
    await expect(loginPage.header.navMenuLocator).toHaveText(process.env.USER_NAME!);
});

test('Verify user can view product details', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const productName = 'Combination Pliers';

    await homePage.goto();
    await homePage.openProductPage(productName);

    await expect(page).toHaveURL(/.*product.*/);
    await expect(productPage.titleLocator).toHaveText(productName);
    await expect(productPage.priceLocator).toHaveText('14.15');
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.addToFavouritesButton).toBeVisible();
});

test('Verify user can add product to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);

    const productName = 'Slip Joint Pliers';

    await homePage.goto();

    await homePage.openProductPage(productName);
    await expect(productPage.titleLocator).toHaveText('Slip Joint Pliers');
    await expect(productPage.priceLocator).toHaveText('9.17');

    await productPage.addToCartButton.click();

    await expect(productPage.cartAlertLocator).toHaveText('Product added to shopping cart.');
    await expect(productPage.cartAlertLocator).toBeHidden({ timeout: 8_000 });
    await expect(productPage.header.cartQuantity).toHaveText('1');

    await productPage.header.cartButton.click();

    await expect(page).toHaveURL('/checkout');

    await expect(checkoutPage.cartProductName).toHaveCount(1);
    await expect(checkoutPage.cartProductName).toHaveText('Slip Joint Pliers');
    await expect(checkoutPage.checkoutButton).toBeVisible();
});