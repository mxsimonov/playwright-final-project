import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { sortOptionsData } from '../test-data/sortOptions'

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