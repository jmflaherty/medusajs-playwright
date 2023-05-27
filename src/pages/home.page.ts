import { Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { FooterPage } from "./footer.page";
import { HeaderPage } from "./header.page";
import { test } from "@playwright/test";

export class HomePage extends BasePage {
  header: HeaderPage;
  footer: FooterPage;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderPage(page);
    this.footer = new FooterPage(page);
  }

  public async goTo() {
    return await test.step("Go to Home", async () => {
      await this.page.goto("/");
    });
  }
}
