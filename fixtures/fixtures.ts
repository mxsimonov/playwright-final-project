import { test as base, Page } from "@playwright/test";
import { App } from "../app/app";

type Fixtures = {
    app: App,
    loggedInApp: App,
    loggedInPage: Page,
}

export const test = base.extend<Fixtures>({
    app: async ({ page }, use) => {
        const app = new App(page);
        await use(app);
    },
    loggedInApp: async ({ browser }, use) => {
        const page = await browser.newPage({ storageState: process.env.AUTH_FILE })
        const app = new App(page);
        await use(app);
    }
});