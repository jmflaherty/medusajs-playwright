import { Page } from "@playwright/test";
import { BasePage } from "../base.page";
import { FooterPage } from "../footer.page";
import { HeaderPage } from "../header.page";
import { AccountPage } from "./account.page";

export class ProfilePage extends BasePage {
  header: HeaderPage;
  footer: FooterPage;
  account: AccountPage;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderPage(page);
    this.footer = new FooterPage(page);
    this.account = new AccountPage(page);
  }

  static profileTitleStringLocator = "//h1[text()='Profile']";
  profileTitle = this.page.locator(ProfilePage.profileTitleStringLocator);
  name = this.page.locator("//span[.='Name']/following-sibling::div/span");
  editNameButton = this.page.locator("//span[.='Name']/../..//button");
  email = this.page.locator("//span[.='Email']/following-sibling::div/span");
  editEmailButton = this.page.locator("//span[.='Email']/../..//button");

  phone = this.page.locator("//span[.='Phone']/following-sibling::div/span");
  editPhoneButton = this.page.locator("//span[.='Phone']/../..//button");

  password = this.page.locator(
    "//span[.='Password']/following-sibling::div/span"
  );

  editPasswordButton = this.page.locator("//span[.='Password']/../..//button");

  billingAddres = this.page.locator(
    "//span[.='Billing address']/following-sibling::div/span"
  );

  editBillingAddressButton = this.page.locator(
    "//span[.='Billing address']/../..//button"
  );
}
