// import { expect } from "@playwright/test";
import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { generateTestProducts } from "../utils/testProducts";

test('Verify products list with mocked response', {
    tag: '@smoke',
}, async ({ app }) => {
    let testData: Array<string>;

    await test.step('Mock products API response', async () => {
        testData = generateTestProducts(9);
        await app.homePage.mockProductApi(testData);
        await app.homePage.goto();
    });

    await test.step('Verify that mocked products are displayed correctly', async () => {
        const actualProductsNames = (await app.homePage.getAllProductsNames()).map(el => el.trim());
        expect(testData).toEqual(actualProductsNames);
    });
});