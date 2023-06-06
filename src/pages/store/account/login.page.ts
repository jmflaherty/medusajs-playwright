import { Page, test } from "@playwright/test";

import { UserInterface } from "../../../interfaces/user.interface";
import { FooterPage } from "../footer.page";
import { HeaderPage } from "../header.page";
import { StoreBasePage } from "../store.base.page";
import { RegisterPage } from "./register.page";

export class LoginPage extends StoreBasePage {
  static pageName = "Login";

  header: HeaderPage;
  footer: FooterPage;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderPage(page);
    this.footer = new FooterPage(page);
  }

  public async goTo() {
    return test.step(`${LoginPage.pageName} - Go to`, async () => {
      await this.page.goto("/account/login");
    });
  }

  email = this.page.locator('input[name="email"]');
  password = this.page.locator('input[name="password"]');
  loginButton = this.page.getByRole("button", { name: "Enter" });
  joinUsButton = this.page.getByRole("button", { name: "Join us" });

  public async logIn(user: UserInterface) {
    return test.step(`${LoginPage.pageName} - Log In`, async () => {
      await this.email.fill(user.email);
      await this.password.fill(user.password);
      await this.loginButton.click();
    });
  }

  public async openRegister(): Promise<RegisterPage> {
    return test.step(`${LoginPage.pageName} - Open Register`, async () => {
      await Promise.all([
        this.page
          .locator(RegisterPage.registerTitleLocatorString)
          .waitFor({ state: "visible" }),
        this.joinUsButton.click()
      ]);
      return new RegisterPage(this.page);
    });
  }
}
