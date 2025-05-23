import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
    emailLocator = this.page.getByRole('textbox', { name: 'Email address *' });
    passwordLocator = this.page.getByRole('textbox', { name: 'Password *' });
    submitButton = this.page.getByRole('button', { name: 'Login' });

    async goto(): Promise<void> {
        await this.page.goto('/auth/login');
    }

    async login(email: string, password: string): Promise<void> {
        await this.emailLocator.fill(email);
        await this.passwordLocator.fill(password);
        await this.submitButton.click();
    }
}