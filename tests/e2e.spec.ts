import { test, expect } from "@playwright/test";
import 'dotenv/config';
import { LoginPage } from "../pages/login.page";
import { HomePage } from "../pages/home.page";
import { ProductPage } from "../pages/product.page";
import { sortOptionsData } from '../test-data/sortOptions'
import { CategoryOptions, POWER_TOOLS } from "../types/categories";


test('Verify login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);

    await expect(page).toHaveURL('/account');
    await expect(page.getByRole('heading')).toHaveText('My account');
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

    const cartProductName = page.locator('.product-title');
    await expect(cartProductName).toHaveCount(1);
    await expect(cartProductName).toHaveText('Slip Joint Pliers');
    await expect(page.getByRole('button', { name: 'Proceed to Checkout' })).toBeVisible();
});

sortOptionsData.forEach((option) => {
    test(`Verify user can perform sorting by ${option}`, async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.goto();
        await homePage.productsFilter.selectSortOption(option);
        const actualSortedProducts = option.includes('Name') ? await homePage.getAllProductsNames() : await homePage.getAllProductsPrices();
        const expectedSortedProducts = await homePage.getSortedProductsByCategory(option);

        expect(expectedSortedProducts).toEqual(actualSortedProducts);
    });
});

Object.values(CategoryOptions).forEach((option) => {
    test(`Verify user can filter products by ${option} category`, async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.goto();
        await homePage.productsFilter.selectFilterOption(option);

        const actualFilteredProducts = await homePage.getAllProductsNames();
        const expectedFilteredProducts = await homePage.getFilteredProductsByCategory(option);

        expect(expectedFilteredProducts).toEqual(actualFilteredProducts);
    });
})

test('Verify user can filter products by Sander category', async ({ page }) => {
    const homePage = new HomePage(page);
    const option = POWER_TOOLS.SANDER;

    await homePage.goto();
    await homePage.productsFilter.selectFilterOption(option);

    const actualFilteredProducts = await homePage.getAllProductsNames();
    const expectedFilteredProducts = await homePage.getFilteredProductsByCategory(option);

    expect(expectedFilteredProducts).toEqual(actualFilteredProducts);
});