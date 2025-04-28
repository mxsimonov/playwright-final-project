import { BasePage } from "./base.page";
import { ProductsFilter, SortOptions } from "./fragments/productsFilter.fragment";
import { HAND_TOOLS, POWER_TOOLS } from '../types/categories'

export class HomePage extends BasePage {
    productsFilter = new ProductsFilter(this.page);

    async openProductPage(title: string) {
        await this.page.getByRole('heading', { 'name': `${title}` }).click();
    }

    async goto(): Promise<void> {
        await this.page.goto('/');
    }

    async getAllProductsNames() {
        const productsNames = await this.page.getByTestId('product-name').allTextContents();
        return productsNames;
    }

    async getAllProductsPrices() {
        const productsPrices = await this.page.getByTestId('product-price').allTextContents();
        return productsPrices;
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

    async getFilteredProductsByCategory(categoryOption) {
        const filteredProducts = await this.getAllProductsNames();

        switch (categoryOption) {
            case 'Hand Tools': {
                filteredProducts.filter(product => !Object.values(HAND_TOOLS).includes(product as HAND_TOOLS));
                return filteredProducts;
            }
            case 'Power Tools': {
                filteredProducts.filter(product => !Object.values(POWER_TOOLS).includes(product as POWER_TOOLS));
                return filteredProducts;
            }
            case 'Other': {
                filteredProducts.filter(product => !Object.values(POWER_TOOLS).includes(product as POWER_TOOLS));
                return filteredProducts;
            }
            default: {
                filteredProducts.filter(product => !product.includes(categoryOption));
                return filteredProducts;
            }
        }
    }
}