import { Page, test } from "@playwright/test";

import { AdminBasePage } from "./admin.base.page";
import { CustomersPage } from "./customers.page";
import { DiscountsPage } from "./discounts.page";
import { GiftCardsPage } from "./gift-cards.page";
import { OrdersPage as OrdersPage } from "./orders.page";
import { PricingPage } from "./pricing.page";
import { ProductsPage } from "./products.page";
import { SettingsPage } from "./settings.page";

export class AdminDashboardPage extends AdminBasePage {
  static pageName = "Admin Dashboard"; // Will be overriden by objects of child classes.

  constructor(page: Page) {
    super(page);
  }

  orders = this.page.getByRole("link", { name: "Orders" });
  products = this.page.getByRole("link", { name: "Products" });
  customers = this.page.getByRole("link", { name: "Customers" });
  discounts = this.page.getByRole("link", { name: "Discounts" });
  giftCards = this.page.getByRole("link", { name: "Discounts" });
  pricing = this.page.getByRole("link", { name: "Pricing" });
  settings = this.page.getByRole("link", { name: "Settings" });

  public async openOrders() {
    return test.step(`${AdminDashboardPage.pageName} - Open Orders`, async () => {
      await this.orders.click();
      return new OrdersPage(this.page);
    });
  }

  public async openProducts() {
    return test.step(`${AdminDashboardPage.pageName} - Open Products`, async () => {
      await this.products.click();
      return new ProductsPage(this.page);
    });
  }

  public async openCustomers() {
    return test.step(`${AdminDashboardPage.pageName} - Open Customers`, async () => {
      await this.customers.click();
      return new CustomersPage(this.page);
    });
  }

  public async openDiscounts() {
    return test.step(`${AdminDashboardPage.pageName} - Open Discounts`, async () => {
      await this.discounts.click();
      return new DiscountsPage(this.page);
    });
  }

  public async openGiftCards() {
    return test.step(`${AdminDashboardPage.pageName} - Open Gift Cards`, async () => {
      await this.giftCards.click();
      return new GiftCardsPage(this.page);
    });
  }

  public async openPricing() {
    return test.step(`${AdminDashboardPage.pageName} - Open Pricing`, async () => {
      await this.pricing.click();
      return new PricingPage(this.page);
    });
  }

  public async openSettings() {
    return test.step(`${AdminDashboardPage.pageName} - Open Settings`, async () => {
      await this.settings.click();
      return new SettingsPage(this.page);
    });
  }
}
