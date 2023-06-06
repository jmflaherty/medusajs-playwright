import { Page } from "@playwright/test";

import { BasePage } from "../base.page";

export class StoreBasePage extends BasePage {
  static baseUrl = process.env.STORE_URL;

  constructor(page: Page) {
    super(page);
  }
}
