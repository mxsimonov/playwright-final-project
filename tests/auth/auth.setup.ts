import path from 'path';
import { test as setup } from "../../fixtures/fixtures";

const authFile = path.join(__dirname, process.env.AUTH_FILE_ABSOLUTE as string);

setup('Auth using default user', async ({ app, page }) => {
    await app.loginPage.goto();
    await app.loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
    await app.page.waitForResponse(response =>
        response.url() === (`${process.env.API_URL}/users/login`) && response.status() === 200
        && response.request().method() === 'POST'
    );
    await app.accountPage.pageTitle.waitFor();
    await page.context().storageState({ path: authFile });
});