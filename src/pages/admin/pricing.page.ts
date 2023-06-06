import { Page } from "@playwright/test";

import { AdminBasePage } from "./admin.base.page";

export class PricingPage extends AdminBasePage {
  static pageName = "Pricing";

  constructor(page: Page) {
    super(page);
  }
}
