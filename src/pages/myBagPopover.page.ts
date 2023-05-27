import { Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { test } from "@playwright/test";

export class MyBagPopover extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  static myBagPopoverStringLocator =
    "//div[contains(@id,'headlessui-popover-panel')]";

  myBagPopover = this.page.locator(MyBagPopover.myBagPopoverStringLocator);

  title = this.myBagPopover.locator("//3");
  goToBagButton = this.myBagPopover.locator("//button[text()='Go to bag']");

  public async dismissMyBagPopover(): Promise<void> {
    return await test.step("Dismiss My Bag Popover", async () => {
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
