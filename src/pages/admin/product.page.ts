import { Page } from "@playwright/test";

import { AdminBasePage } from "./admin.base.page";

export class ProductPage extends AdminBasePage {
  static pageName = "Product Page";

  constructor(page: Page) {
    super(page);
  }

  title = this.page.locator("xpath=(//h1)[1]");
  // The site does not offer an ID, name, any other attribute, or relative location, so we depend on text.
  status = this.page.locator("xpath=//button[.='Published' or .='Draft']");
}
