import { expect } from "@playwright/test";
import { sortOptionsData } from '../test-data/sortOptions';
import { test } from "../fixtures/fixtures";


sortOptionsData.forEach((option) => {
    test(`Verify user can perform sorting by ${option}`, {
        tag: '@regression'
    }, async ({ app }) => {
        await app.homePage.goto();
        await app.homePage.productsFilter.selectSortOption(option);
        const actualSortedProducts = await app.homePage.getAllProductsByDisplayType(option);
        const expectedSortedProducts = await app.homePage.getSortedProductsByCategory(option);

        expect(expectedSortedProducts).toEqual(actualSortedProducts);
    });
});