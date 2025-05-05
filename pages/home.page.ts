import { BasePage } from "./base.page";
import { ProductsFilter, SortOptions } from "./fragments/productsFilter.fragment";
import { CategoryOptions, CategorySubOptions, HAND_TOOLS, POWER_TOOLS, Product } from '../types/categories'

export class HomePage extends BasePage {
    productsFilter = new ProductsFilter(this.page);
    productName = this.page.getByTestId('product-name');
    productPrice = this.page.getByTestId('product-price');
    productsContainer = this.page

    async openProductPage(title: string) {
        await this.page.getByRole('heading', { 'name': `${title}` }).click();
    }

    async goto(): Promise<void> {
        await this.page.goto('/');
    }

    async getAllProductsNames(): Promise<string[]> {
        await this.productName.first().waitFor({ state: "visible" });
        const productsNames = await this.productName.allTextContents();
        return productsNames;
    }

    async getAllProductsPrices(): Promise<string[]> {
        await this.productName.first().waitFor({ state: "visible" });
        const productsPrices = await this.productPrice.allTextContents();
        return productsPrices;
    }

    async getAllProductsByDisplayType(type: string) {
        return type.includes('Name') ? this.getAllProductsNames() : this.getAllProductsPrices();
    }

    async getSortedProductsByCategory(sortOption: SortOptions) {
        switch (sortOption) {
            case 'Name (A - Z)': {
                const productsNames = await this.getAllProductsNames();
                return productsNames.sort((a, b) => a.localeCompare(b));
            }
            case 'Name (Z - A)': {
                const productsNames = await this.getAllProductsNames();
                return productsNames.sort((a, b) => b.localeCompare(a));
            }
            case 'Price (High - Low)': {
                const productsPrices = await this.getAllProductsPrices();
                return productsPrices.sort((a, b) => Number(b) - Number(a));
            }
            case 'Price (Low - High)': {
                const productsPrices = await this.getAllProductsPrices();
                return productsPrices.sort((a, b) => Number(a) - Number(b));
            }
        }
    }

    async getFilteredProductsByCategory(categoryOption: CategoryOptions | CategorySubOptions) {
        const filteredProducts = await this.getAllProductsNames();

        switch (categoryOption) {
            case CategoryOptions.HAND_TOOLS: {
                filteredProducts.filter(product => !Object.values(HAND_TOOLS).includes(product as HAND_TOOLS));
                return filteredProducts;
            }
            case CategoryOptions.POWER_TOOLS: {
                filteredProducts.filter(product => !Object.values(POWER_TOOLS).includes(product as POWER_TOOLS));
                return filteredProducts;
            }
            case CategoryOptions.OTHER: {
                filteredProducts.filter(product => !Object.values(POWER_TOOLS).includes(product as POWER_TOOLS));
                return filteredProducts;
            }
            default: {
                filteredProducts.filter(product => !product.includes(categoryOption));
                return filteredProducts;
            }
        }
    }

    async mockProductApi(testData: Array<string>) {
        await this.page.route(`${process.env.API_URL}/products*`, async route => {
            const response = await route.fetch();
            const json = await response.json() as { data: Product[] };

            json.data.forEach((el: Product, i: number) => {
                el.name = testData[i];
            });
            await route.fulfill({ response, json });
        });
    }
}