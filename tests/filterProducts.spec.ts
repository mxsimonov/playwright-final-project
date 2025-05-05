import { expect } from "@playwright/test";
import { CategoryOptions, POWER_TOOLS } from "../types/categories";
import { test } from '../fixtures/fixtures'

Object.values(CategoryOptions).forEach((option) => {
    test(`Verify user can filter products by ${option} category`, async ({ app }) => {
        await test.step('Apply product\'s filtering', async () => {
            await app.homePage.goto();
            await app.homePage.productsFilter.selectFilterOption(option);
        });

        await test.step('Verify that products are filtered correctly', async () => {
            const actualFilteredProducts = await app.homePage.getAllProductsNames();
            const expectedFilteredProducts = await app.homePage.getFilteredProductsByCategory(option);

            expect(expectedFilteredProducts).toEqual(actualFilteredProducts);
        });
    });
})

test('Verify user can filter products by Sander category', async ({ app }) => {
    const option = POWER_TOOLS.SANDER;

    await test.step('Apply product\'s filtering', async () => {
        await app.homePage.goto();
        await app.homePage.productsFilter.selectFilterOption(option);
    });

    await test.step('Verify that products are filtered correctly', async () => {
        const actualFilteredProducts = await app.homePage.getAllProductsNames();
        const expectedFilteredProducts = await app.homePage.getFilteredProductsByCategory(option);

        expect(expectedFilteredProducts).toEqual(actualFilteredProducts);
    });
});