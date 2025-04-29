import { expect } from "@playwright/test";
import { sortOptionsData } from '../test-data/sortOptions';
import { test } from "../fixtures/fixtures";


sortOptionsData.forEach((option) => {
    test(`Verify user can perform sorting by ${option}`, async ({ homePage }) => {
        await homePage.productsFilter.selectSortOption(option);
        const actualSortedProducts = await homePage.getAllProductsByDisplayType(option);
        const expectedSortedProducts = await homePage.getSortedProductsByCategory(option);

        expect(expectedSortedProducts).toEqual(actualSortedProducts);
    });
});