import { Page } from "@playwright/test";
import { AccountPage } from "../pages/account.page";
import { CheckoutPage } from "../pages/checkout.page";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { ProductPage } from "../pages/product.page";

export class App {
    readonly page: Page;
    readonly loginPage: LoginPage;
    readonly accountPage: AccountPage;
    readonly homePage: HomePage;
    readonly productPage: ProductPage;
    readonly checkoutPage: CheckoutPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.accountPage = new AccountPage(page);
        this.homePage = new HomePage(page);
        this.productPage = new ProductPage(page);
        this.checkoutPage = new CheckoutPage(page);
    }
}