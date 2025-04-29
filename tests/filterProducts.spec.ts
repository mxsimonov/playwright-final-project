import { expect } from "@playwright/test";
import { CategoryOptions, POWER_TOOLS } from "../types/categories";
import { test } from '../fixtures/fixtures'

Object.values(CategoryOptions).forEach((option) => {
    test(`Verify user can filter products by ${option} category`, async ({ homePage }) => {
        await homePage.productsFilter.selectFilterOption(option);

        const actualFilteredProducts = await homePage.getAllProductsNames();
        const expectedFilteredProducts = await homePage.getFilteredProductsByCategory(option);

        expect(expectedFilteredProducts).toEqual(actualFilteredProducts);
    });
})

test('Verify user can filter products by Sander category', async ({ homePage }) => {
    const option = POWER_TOOLS.SANDER;

    await homePage.productsFilter.selectFilterOption(option);

    const actualFilteredProducts = await homePage.getAllProductsNames();
    const expectedFilteredProducts = await homePage.getFilteredProductsByCategory(option);

    expect(expectedFilteredProducts).toEqual(actualFilteredProducts);
});