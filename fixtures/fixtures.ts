import { test as base, Page } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { AccountPage } from "../pages/account.page";
import { HomePage } from "../pages/home.page";
import { ProductPage } from "../pages/product.page";
import { CheckoutPage } from "../pages/checkout.page";
import { App } from "../app/app";

type Fixtures = {
    app: App,
    loggedInApp: App,
    loggedInPage: Page,
    accountPage: AccountPage,
    homePage: HomePage,
    productPage: ProductPage,
    checkoutPage: CheckoutPage
}

export const test = base.extend<Fixtures>({
    app: async ({ page }, use) => {
        const app = new App(page);
        await use(app);
    },
    loggedInApp: async ({ loggedInPage }, use) => {
        const app = new App(loggedInPage);
        await use(app);
    },
    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
        await page.waitForResponse(response =>
            response.url() === (`${process.env.API_URL}/users/login`) && response.status() === 200
            && response.request().method() === 'POST'
        );

        await use(page);
    },
    accountPage: async ({ page }, use) => {
        const accountPage = new AccountPage(page);
        await use(accountPage);
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        await use(homePage);
    },
    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    },
    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    }
});