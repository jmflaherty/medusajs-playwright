import { Page } from "@playwright/test";

import { AdminBasePage } from "./admin.base.page";

export class CustomersPage extends AdminBasePage {
  static pageName = "Customers";

  constructor(page: Page) {
    super(page);
  }
}
