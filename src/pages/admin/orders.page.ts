import { Page, test } from "@playwright/test";

import { AdminBasePage } from "./admin.base.page";
import { AdminDashboardPage } from "./dashboard.page";

export class OrdersPage extends AdminDashboardPage {
  static pageName = "Admin Orders";

  constructor(page: Page) {
    super(page);
  }

  public async goTo() {
    return test.step(`${OrdersPage.pageName} - Go to`, async () => {
      await this.page.goto(`${AdminBasePage.baseUrl}/orders`);
    });
  }
}
