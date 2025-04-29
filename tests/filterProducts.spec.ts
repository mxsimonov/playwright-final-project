import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { CategoryOptions, POWER_TOOLS } from "../types/categories";

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