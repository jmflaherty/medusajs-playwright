import { Page } from "@playwright/test";

import { FooterPage } from "./footer.page";
import { HeaderPage } from "./header.page";
import { StoreBasePage } from "./store.base.page";

export class OrderConfirmedPage extends StoreBasePage {
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
