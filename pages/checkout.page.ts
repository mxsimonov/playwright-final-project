import { BasePage } from "./base.page";

export class CheckoutPage extends BasePage {
    checkoutButton = this.page.getByRole('button', { name: 'Proceed to Checkout' });
    cartProductName = this.page.locator('.product-title');
}