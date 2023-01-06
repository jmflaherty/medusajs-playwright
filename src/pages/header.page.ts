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
  titleButton = this.header.locator("//a[text()='Acme']");
  accountButton = this.header.locator("//a[text()='Account']");
  myBagButton = this.header.locator("//button[contains(text(),'My Bag')]");

  public async openStore(): Promise<StorePage> {
    await Promise.all([
      this.page.waitForNavigation({ url: "**/store" }),
      this.storeButton.click()
    ]);
    // As the Store menu is displayed when hovering the Store button,
    // you have to hover something else for it to go away and
    // don't block other elements
    await this.titleButton.hover();
    return new StorePage(this.page);
  }

  public async openHome(): Promise<HomePage> {
    await Promise.all([
      this.page.waitForNavigation({ url: "**/" }),
      this.titleButton.click()
    ]);
    return new HomePage(this.page);
  }

  public async openAccount(): Promise<LoginPage> {
    await Promise.all([
      this.page.waitForNavigation({ url: "**/account/**" }),
      this.accountButton.click()
    ]);
    return new LoginPage(this.page);
  }

  public async openMyBag(): Promise<MyBagPage> {
    await Promise.all([
      this.page.waitForNavigation({ url: "**/cart" }),
      this.myBagButton.click()
    ]);
    await new MyBagPopover(this.page).dismissMyBagPopover();
    return new MyBagPage(this.page);
  }
}
