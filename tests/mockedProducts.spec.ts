// import { expect } from "@playwright/test";
import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { generateTestProducts } from "../utils/testProducts";
import { Product } from "../types/categories";

test('Verify products list with mocked responce', async ({ app }) => {
    const testData = generateTestProducts(9);

    await app.page.route(`${process.env.API_URL}/products*`, async route => {
        const response = await route.fetch();
        const json = await response.json() as { data: Product[] };

        json.data.forEach((el: Product, i: number) => {
            el.name = testData[i];
        });
        await route.fulfill({ response, json });
    });
    await app.homePage.goto();

    const actualProductsNames = (await app.homePage.getAllProductsNames()).map(el => el.trim());
    expect(testData).toEqual(actualProductsNames);
});