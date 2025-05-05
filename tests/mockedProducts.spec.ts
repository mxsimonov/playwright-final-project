// import { expect } from "@playwright/test";
import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { generateTestProducts } from "../utils/testProducts";

test('Verify products list with mocked response', async ({ app }) => {
    const testData = generateTestProducts(9);
    await app.homePage.mockProductApi(testData);
    await app.homePage.goto();

    const actualProductsNames = (await app.homePage.getAllProductsNames()).map(el => el.trim());
    expect(testData).toEqual(actualProductsNames);
});