import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { getCardExpireDate } from "../utils/cardDate";
import { testPaymentCardData } from "../test-data/testCardPaymentData";

test('Verify user can buy product (loggedInPage fixture)', async ({ loggedInPage, homePage, productPage, checkoutPage }) => {
    await loggedInPage.goto('/');

    const productName = (await homePage.getAllProductsNames())[0];
    const productPrice = (await homePage.getAllProductsPrices())[0];

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

test('Verify user can buy product (loggedInApp fixture)', async ({ loggedInApp }) => {
    await loggedInApp.homePage.goto();
    const productName = (await loggedInApp.homePage.getAllProductsNames())[0];
    const productPrice = (await loggedInApp.homePage.getAllProductsPrices())[0];

    await loggedInApp.homePage.openProductPage(productName);
    await loggedInApp.productPage.addProductToCart();
    await loggedInApp.checkoutPage.goto();
    await expect(loggedInApp.checkoutPage.cartProductName).toHaveText(productName)
    await expect(loggedInApp.checkoutPage.cartProductTotalPrice).toHaveText(productPrice);

    await loggedInApp.checkoutPage.proceedToCheckout();
    await expect(loggedInApp.checkoutPage.loggedUserCheckoutButton).toBeVisible();
    await loggedInApp.checkoutPage.loggedUserCheckoutButton.click();

    await expect(loggedInApp.checkoutPage.countryName).toHaveValue('Austria');
    await loggedInApp.checkoutPage.stateName.fill('Texas');
    await loggedInApp.checkoutPage.postCode.fill('73301');
    await loggedInApp.checkoutPage.billingAddressCheckoutButton.click();

    await loggedInApp.checkoutPage.selectPaymentMethod('Credit Card');
    await loggedInApp.checkoutPage.cardNumber.fill(testPaymentCardData.cardNumber);
    await loggedInApp.checkoutPage.cardExpirationDate.fill(testPaymentCardData.expirationDate);
    await loggedInApp.checkoutPage.cardCvvNumber.fill(testPaymentCardData.cvv);
    await loggedInApp.checkoutPage.cardHolderName.fill(testPaymentCardData.holderName);
    await loggedInApp.checkoutPage.paymentCheckoutButton.click();

    await expect(loggedInApp.checkoutPage.paymentStatusMessage).toHaveText('Payment was successful');
});