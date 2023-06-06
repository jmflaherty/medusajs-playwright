import { Page } from "@playwright/test";

import { AdminBasePage } from "./admin.base.page";

export class SettingsPage extends AdminBasePage {
  static pageName = "Settings";

  constructor(page: Page) {
    super(page);
  }
}
