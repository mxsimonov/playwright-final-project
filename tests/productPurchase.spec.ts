import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { testPaymentCardData } from "../test-data/testCardPaymentData";

test('Verify user can buy product', async ({ loggedInApp }) => {
    let productName: string;
    let productPrice: string;

    await test.step('Go to the products page', async () => {
        await loggedInApp.homePage.goto();
        productName = (await loggedInApp.homePage.getAllProductsNames())[0];
        productPrice = (await loggedInApp.homePage.getAllProductsPrices())[0];
    });

    await test.step('Add product to the cart', async () => {
        await loggedInApp.homePage.openProductPage(productName);
        await loggedInApp.productPage.addProductToCart();
        await loggedInApp.checkoutPage.goto();
        await expect(loggedInApp.checkoutPage.cartProductName).toHaveText(productName)
        await expect(loggedInApp.checkoutPage.cartProductTotalPrice).toHaveText(productPrice);
    });

    await test.step('Verify that user\'s logged in', async () => {
        await loggedInApp.checkoutPage.proceedToCheckout();
        await expect(loggedInApp.checkoutPage.loggedUserCheckoutButton).toBeVisible();
        await loggedInApp.checkoutPage.loggedUserCheckoutButton.click();
    });

    await test.step('Fill billing address fields', async () => {
        await expect(loggedInApp.checkoutPage.countryName).toHaveValue('Austria');
        await loggedInApp.checkoutPage.stateName.fill('Texas');
        await loggedInApp.checkoutPage.postCode.fill('73301');
        await loggedInApp.checkoutPage.billingAddressCheckoutButton.click();
    });

    await test.step('Fill payment fields', async () => {
        await loggedInApp.checkoutPage.selectPaymentMethod('Credit Card');
        await loggedInApp.checkoutPage.cardNumber.fill(testPaymentCardData.cardNumber);
        await loggedInApp.checkoutPage.cardExpirationDate.fill(testPaymentCardData.expirationDate);
        await loggedInApp.checkoutPage.cardCvvNumber.fill(testPaymentCardData.cvv);
        await loggedInApp.checkoutPage.cardHolderName.fill(testPaymentCardData.holderName);
        await loggedInApp.checkoutPage.paymentCheckoutButton.click();
    });

    await test.step('Verify that payment is successful', async () => {
        await expect(loggedInApp.checkoutPage.paymentStatusMessage).toHaveText('Payment was successful');
    });
});