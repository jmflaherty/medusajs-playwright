import { Page, test } from "@playwright/test";

import { BasePage } from "../base.page";
import { AdminBasePage } from "./admin.base.page";
import { OrdersPage } from "./orders.page";
import { TelemetryPage } from "./telemetry.page";

export class AdminLoginPage extends BasePage {
  static pageName = "Admin Login";

  constructor(page: Page) {
    super(page);
  }

  email = this.page.locator("//input[@name='email']");
  password = this.page.locator("//input[@name='password']");
  loginButton = this.page.locator("//button[@type='submit']");

  public async goTo() {
    return test.step(AdminLoginPage.pageName + " - Go to", async () => {
      await this.page.goto(AdminBasePage.baseUrl + "/login");
    });
  }

  public async logIn(credentials: {
    email: string;
    password: string;
  }): Promise<OrdersPage> {
    return test.step(AdminLoginPage.pageName + " - Log in", async () => {
      await this.email.fill(credentials.email);
      await this.password.fill(credentials.password);
      await this.loginButton.click();

      await new TelemetryPage(this.page).dissmissTelemetry();

      return new OrdersPage(this.page);
    });
  }
}
