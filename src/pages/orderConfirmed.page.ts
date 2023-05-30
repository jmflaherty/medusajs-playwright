import { Page } from "@playwright/test";

import { BasePage } from "./base.page";
import { FooterPage } from "./footer.page";
import { HeaderPage } from "./header.page";

export class OrderConfirmedPage extends BasePage {
  static pageName = "Order Confirmed";

  header: HeaderPage;
  footer: FooterPage;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderPage(page);
    this.footer = new FooterPage(page);
  }

  successfulOrderConfirmation = this.page.getByText(
    "Thank you, your order was successfully placed"
  );
}
