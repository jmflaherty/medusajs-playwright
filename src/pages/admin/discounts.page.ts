import { Page } from "@playwright/test";

import { AdminBasePage } from "./admin.base.page";

export class DiscountsPage extends AdminBasePage {
  static pageName = "Discounts";

  constructor(page: Page) {
    super(page);
  }
}
