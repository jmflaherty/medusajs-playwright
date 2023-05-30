import { Page, test } from "@playwright/test";

import { BasePage } from "./base.page";

export class MyBagPopover extends BasePage {
  static pageName = "My Bag Popover";

  constructor(page: Page) {
    super(page);
  }

  static myBagPopoverStringLocator =
    "//div[contains(@id,'headlessui-popover-panel')]";

  myBagPopover = this.page.locator(MyBagPopover.myBagPopoverStringLocator);

  title = this.myBagPopover.locator("//h3");
  goToBagButton = this.myBagPopover.locator("//button[text()='Go to bag']");

  public async dismissMyBagPopover(): Promise<void> {
    return test.step(`${MyBagPopover.pageName} - Dismiss`, async () => {
      await this.myBagPopover.hover();
      await Promise.all([
        this.myBagPopover.waitFor({ state: "hidden" }),
        this.myBagPopover.hover({
          position: { x: -10, y: 10 },
          force: true
        })
      ]);
    });
  }
}
