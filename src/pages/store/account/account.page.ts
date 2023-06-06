import { Page, test } from "@playwright/test";

import { FooterPage } from "../footer.page";
import { HeaderPage } from "../header.page";
import { HomePage } from "../home.page";
import { StoreBasePage } from "../store.base.page";
import { ProfilePage } from "./profile.page";

export class AccountPage extends StoreBasePage {
  static pageName = "Account";

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
    return await test.step(`${AccountPage.pageName} - Open Overview`, async () => {
      await this.overview.click();
    });
  }

  public async openProfile() {
    return await test.step(`${AccountPage.pageName} - Open Profile`, async () => {
      await Promise.all([
        this.page
          .locator(ProfilePage.profileTitleStringLocator)
          .waitFor({ state: "visible" }),
        this.profile.click()
      ]);
      return new ProfilePage(this.page);
    });
  }

  public async openAddresses() {
    return await test.step(`${AccountPage.pageName} - Open Addresses`, async () => {
      await this.addresses.click();
    });
  }

  public async openOrders() {
    return await test.step(`${AccountPage.pageName} - Open Orders`, async () => {
      await this.orders.click();
    });
  }

  public async logOut() {
    return await test.step(`${AccountPage.pageName} - Log Out`, async () => {
      await this.logOutButton.click();
      await this.page.waitForURL("/");
      return new HomePage(this.page);
    });
  }
}
