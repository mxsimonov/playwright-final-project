import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { getCardExpireDate } from "../utils/cardDate";

test('Verify user can buy product', async ({ loggedInPage, homePage, productPage, checkoutPage }) => {
    const productName = (await homePage.getAllProductsNames())[0];
    const productPrice = (await homePage.getAllProductsPrices())[0];

    await loggedInPage.goto('/');

    await homePage.openProductPage(productName);
    await productPage.addProductToCart();
    await checkoutPage.goto();
    await expect(checkoutPage.cartProductName).toHaveText(productName)
    await expect(checkoutPage.cartProductTotalPrice).toHaveText(productPrice);

    await checkoutPage.proceedToCheckout();
    await expect(checkoutPage.loggedUserCheckoutButton).toBeVisible();
    await checkoutPage.loggedUserCheckoutButton.click();

    await expect(checkoutPage.countryName).toHaveValue('Austria');
    await checkoutPage.stateName.fill('Texas');
    await checkoutPage.postCode.fill('73301');
    await checkoutPage.billingAddressCheckoutButton.click();

    await checkoutPage.selectPaymentMethod('Credit Card');
    await checkoutPage.cardNumber.fill('1111-1111-1111-1111');
    await checkoutPage.cardExpirationDate.fill(getCardExpireDate());
    await checkoutPage.cardCvvNumber.fill('1234')
    await checkoutPage.cardHolderName.fill('Jimmy Neutron');
    await checkoutPage.paymentCheckoutButton.click();

    await expect(checkoutPage.paymentStatusMessage).toHaveText('Payment was successful');
});