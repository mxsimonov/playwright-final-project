import { BasePage } from "./base.page";

export class CheckoutPage extends BasePage {
    checkoutButton = this.page.getByRole('button', { name: 'Proceed to Checkout' });
    cartProductName = this.page.getByTestId('product-title');
    cartProductTotalPrice = this.page.getByTestId('line-price');
    loggedUserCheckoutButton = this.page.getByTestId('proceed-2');

    countryName = this.page.getByTestId('country');
    stateName = this.page.getByTestId('state');
    postCode = this.page.getByTestId('postal_code');
    paymentMethodDropdown = this.page.getByTestId('payment-method');
    billingAddressCheckoutButton = this.page.getByTestId('proceed-3');

    cardNumber = this.page.getByTestId('credit_card_number');
    cardExpirationDate = this.page.getByTestId('expiration_date');
    cardCvvNumber = this.page.getByTestId('cvv');
    cardHolderName = this.page.getByTestId('card_holder_name');
    paymentCheckoutButton = this.page.getByTestId('finish');
    paymentStatusMessage = this.page.getByTestId('payment-success-message');


    async goto() {
        await this.page.goto('/checkout');
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async selectPaymentMethod(choice: string) {
        await this.paymentMethodDropdown.selectOption(choice);
    }
}