import { Page, test } from "@playwright/test";

import { BasePage } from "./base.page";
import { FooterPage } from "./footer.page";
import { HeaderPage } from "./header.page";

export class HomePage extends BasePage {
  static pageName = "Home";
  header: HeaderPage;
  footer: FooterPage;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderPage(page);
    this.footer = new FooterPage(page);
  }

  public async goTo() {
    return test.step(`${HomePage.pageName} - Go to Home`, async () => {
      await this.page.goto("/");
    });
  }
}
