import { HeaderFragment } from "./fragments/header.fragment";
import { BasePage } from "./base.page";

export class ProductPage extends BasePage {
    titleLocator = this.page.getByTestId('product-name');
    priceLocator = this.page.getByTestId('unit-price');
    addToCartButton = this.page.getByRole('button', { name: 'Add to cart' });
    addToFavouritesButton = this.page.getByRole('button', { name: 'Add to favourites' });
    cartAlertLocator = this.page.getByRole('alert');

    header = new HeaderFragment(this.page);

    async addProductToCart() {
        await this.addToCartButton.click();
        await this.cartAlertLocator.waitFor({ state: "visible" });
    }
}