import { expect } from "@playwright/test";
import { sortOptionsData } from '../test-data/sortOptions';
import { test } from "../fixtures/fixtures";


sortOptionsData.forEach((option) => {
    test(`Verify user can perform sorting by ${option}`, async ({ app }) => {
        await test.step('Apply product\'s sorting', async () => {
            await app.homePage.goto();
            await app.homePage.productsFilter.selectSortOption(option);
        });

        await test.step('Verify that products are sorted correctly', async () => {
            const actualSortedProducts = await app.homePage.getAllProductsByDisplayType(option);
            const expectedSortedProducts = await app.homePage.getSortedProductsByCategory(option);
            expect(expectedSortedProducts).toEqual(actualSortedProducts);
        });
    });
});