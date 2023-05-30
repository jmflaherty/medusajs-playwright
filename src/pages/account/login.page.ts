import { Page, test } from "@playwright/test";

import { UserInterface } from "../../interfaces/user.interface";
import { BasePage } from "../base.page";
import { FooterPage } from "../footer.page";
import { HeaderPage } from "../header.page";
import { RegisterPage } from "./register.page";

export class LoginPage extends BasePage {
  header: HeaderPage;
  footer: FooterPage;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderPage(page);
    this.footer = new FooterPage(page);
  }

  public async goTo() {
    return await test.step("Go To Login Page", async () => {
      await this.page.goto("/account/login");
    });
  }

  email = this.page.locator('input[name="email"]');
  password = this.page.locator('input[name="password"]');
  loginButton = this.page.getByRole("button", { name: "Enter" });
  joinUsButton = this.page.getByRole("button", { name: "Join us" });

  public async logIn(user: UserInterface) {
    return await test.step("Log In", async () => {
      await this.email.fill(user.email);
      await this.password.fill(user.password);
      return await this.loginButton.click();
    });
  }

  public async openRegister(): Promise<RegisterPage> {
    return await test.step("Open Register", async () => {
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
