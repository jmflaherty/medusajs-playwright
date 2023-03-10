import { Page } from "@playwright/test";
import { Builder } from "builder-pattern";
import { userGenerator, UserInterface } from "../../interfaces/user.interface";
import { AccountPage } from "./account.page";
import { BasePage } from "../base.page";
import { FooterPage } from "../footer.page";
import { HeaderPage } from "../header.page";

export class RegisterPage extends BasePage {
  header: HeaderPage;
  footer: FooterPage;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderPage(page);
    this.footer = new FooterPage(page);
  }

  static registerTitleLocatorString = "//h1[text()='Become a Acme Member']";
  registerTitle = this.page.locator(RegisterPage.registerTitleLocatorString);

  firstName = this.page.locator('input[name="first_name"]');
  lastName = this.page.locator('input[name="last_name"]');
  email = this.page.locator('input[name="email"]');
  phone = this.page.locator('input[name="phone"]');
  password = this.page.locator('input[name="password"]');

  privacyPolicyLink = this.page.getByRole("link", { name: "Privacy Policy" });
  termsOfUse = this.page.getByRole("link", { name: "Terms of Use" });

  joinButton = this.page.getByRole("button", { name: "Join" });

  public async register(
    user: UserInterface = Builder(userGenerator()).build()
  ): Promise<[AccountPage, UserInterface]> {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.email.fill(user.email);
    await this.phone.fill(user.phone);
    await this.password.fill(user.password);
    await Promise.all([
      this.page.waitForNavigation({ url: "**/account" }),
      this.joinButton.click()
    ]);
    return [new AccountPage(this.page), user];
  }
}
