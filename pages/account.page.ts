import { BasePage } from "./base.page";
import { HeaderFragment } from "./fragments/header.fragment";

export class AccountPage extends BasePage {
    pageTitle = this.page.getByTestId('page-title');
    header = new HeaderFragment(this.page);
}