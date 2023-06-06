import { Page, test } from "@playwright/test";

import { LoginPage } from "./account/login.page";
import { HomePage } from "./home.page";
import { MyBagPage } from "./myBag.page";
import { MyBagPopover } from "./myBagPopover.page";
import { StoreBasePage } from "./store.base.page";
import { StorePage } from "./store.page";

export class HeaderPage extends StoreBasePage {
  static pageName = "Header";

  constructor(page: Page) {
    super(page);
  }

  header = this.page.locator("//header");
  storeButton = this.header.locator("//button[text()='Store']");
  storePopover = this.storeButton.locator("xpath=/../../div");
  titleButton = this.header.locator("//a[text()='Acme']");
  accountButton = this.header.locator("//a[text()='Account']");
  myBagButton = this.header.locator("//button[contains(text(),'My Bag')]");

  public async openStore(): Promise<StorePage> {
    return test.step(`${HeaderPage.pageName} - Open Store`, async () => {
      await this.storeButton.click();
      await this.page.waitForURL("**/store");
      // As the Store menu is displayed when hovering the Store button,
      // you have to hover something else for it to go away and
      // don't block other elements
      await Promise.all([
        this.storePopover.waitFor({ state: "hidden" }),
        this.storePopover.hover({
          position: { x: -10, y: 0 },
          force: true
        })
      ]);
      return new StorePage(this.page);
    });
  }

  public async openHome(): Promise<HomePage> {
    return test.step(`${HeaderPage.pageName} - Open Home`, async () => {
      await this.titleButton.click();
      await this.page.waitForURL("**/");
      return new HomePage(this.page);
    });
  }

  public async openAccount(): Promise<LoginPage> {
    return test.step(`${HeaderPage.pageName} - Open Account`, async () => {
      await this.accountButton.click();
      await this.page.waitForURL("**/account/**");
      return new LoginPage(this.page);
    });
  }

  public async openMyBag(): Promise<MyBagPage> {
    return test.step(`${HeaderPage.pageName} - Open My Bag`, async () => {
      await this.myBagButton.click();
      await this.page.waitForURL("**/cart");
      await new MyBagPopover(this.page).dismissMyBagPopover();
      return new MyBagPage(this.page);
    });
  }
}
