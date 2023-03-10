import { Page } from "@playwright/test";
import { BasePage } from "../base.page";
import { FooterPage } from "../footer.page";
import { HeaderPage } from "../header.page";
import { HomePage } from "../home.page";
import { ProfilePage } from "./profile.page";

export class AccountPage extends BasePage {
  header: HeaderPage;
  footer: FooterPage;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderPage(page);
    this.footer = new FooterPage(page);
  }

  leftMenu = this.page.locator(".grid > div").first();
  overview = this.page.getByRole("link", { name: "Overview" });
  profile = this.page.getByRole("link", { name: "Profile" });
  addresses = this.page.getByRole("link", { name: "Addresses" });
  orders = this.page.getByRole("link", { name: "Orders" });
  logOutButton = this.page.getByRole("button", { name: "Log out" });

  public async openOverview() {
    await this.overview.click();
  }

  public async openProfile() {
    await Promise.all([
      this.page
        .locator(ProfilePage.profileTitleStringLocator)
        .waitFor({ state: "visible" }),
      this.profile.click()
    ]);
    return new ProfilePage(this.page);
  }

  public async openAddresses() {
    await this.addresses.click();
  }

  public async openOrders() {
    await this.orders.click();
  }

  public async logOut() {
    await Promise.all([
      this.page.waitForNavigation({ url: "/" }),
      this.logOutButton.click()
    ]);
    return new HomePage(this.page);
  }
}
