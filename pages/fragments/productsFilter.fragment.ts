import { BasePage } from "../base.page";

export type SortOptions = 'Name (A - Z)' | 'Name (Z - A)' | 'Price (High - Low)' | 'Price (Low - High)';

export class ProductsFilter extends BasePage {
    private sortSelect = this.page.getByTestId('sort');
    private filterSelect = this.page.locator('.checkbox');

    async selectSortOption(sortOption: SortOptions) {
        await this.sortSelect.selectOption(sortOption);
        await this.page.waitForResponse(response =>
            response.url().includes(`${process.env.API_URL}/products?sort=`) && response.status() === 200
            && response.request().method() === 'GET'
        );
    }

    async selectFilterOption(filterOption) {
        await this.filterSelect.getByText(filterOption).click();
        await this.page.waitForResponse(response =>
            response.url().includes(`${process.env.API_URL}/products`) && response.url().includes('by_category') && response.status() === 200
            && response.request().method() === 'GET'
        );
    }
}