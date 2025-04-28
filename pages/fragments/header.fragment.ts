import { BasePage } from "../base.page";

export class HeaderFragment extends BasePage {
    navMenuLocator = this.page.getByTestId('nav-menu');
    cartQuantity = this.page.getByTestId('cart-quantity');
    cartButton = this.page.getByRole('link', { name: "cart" })
}