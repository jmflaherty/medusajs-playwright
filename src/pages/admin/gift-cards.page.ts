import { Page } from "@playwright/test";

import { AdminBasePage } from "./admin.base.page";

export class GiftCardsPage extends AdminBasePage {
  static pageName = "Gift Cards";

  constructor(page: Page) {
    super(page);
  }
}
