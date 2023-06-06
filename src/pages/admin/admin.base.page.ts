import { Page } from "@playwright/test";

import { BasePage } from "../base.page";

export class AdminBasePage extends BasePage {
  static baseUrl = process.env.ADMIN_URL;

  constructor(page: Page) {
    super(page);
  }
}
