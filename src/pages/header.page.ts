import { Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { HomePage } from "./home.page";
import { LoginPage } from "./account/login.page";
import { MyBagPage } from "./myBag.page";
import { MyBagPopover } from "./myBagPopover.page";
import { StorePage } from "./store.page";

export class HeaderPage extends BasePage {
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
  }

  public async openHome(): Promise<HomePage> {
    await this.titleButton.click();
    await this.page.waitForURL("**/");
    return new HomePage(this.page);
  }

  public async openAccount(): Promise<LoginPage> {
    await this.accountButton.click();
    await this.page.waitForURL("**/account/**");
    return new LoginPage(this.page);
  }

  public async openMyBag(): Promise<MyBagPage> {
    await this.myBagButton.click();
    await this.page.waitForURL("**/cart");
    await new MyBagPopover(this.page).dismissMyBagPopover();
    return new MyBagPage(this.page);
  }
}
