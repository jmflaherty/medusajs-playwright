import { Page, test } from "@playwright/test";

import { FooterPage } from "./footer.page";
import { HeaderPage } from "./header.page";
import { StoreBasePage } from "./store.base.page";

export class HomePage extends StoreBasePage {
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
