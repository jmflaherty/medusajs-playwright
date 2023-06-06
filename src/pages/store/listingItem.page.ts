import { Locator, Page, test } from "@playwright/test";

import { ProductPage } from "./product.page";
import { StoreBasePage } from "./store.base.page";

export class ListingItemPage extends StoreBasePage {
  listingLocator: Locator;
  image: Locator;
  textBase: Locator;
  name: Locator;
  price: Locator;

  constructor(page: Page, listingLocator: Locator) {
    super(page);
    this.listingLocator = listingLocator;
    this.textBase = listingLocator.locator(ListingItemPage.textLocatorString);
    this.image = listingLocator.locator("//img");
    this.name = this.textBase.locator(ListingItemPage.nameLocatorString);
    this.price = this.textBase.locator("/div/span");
  }

  static textLocatorString = "//div[contains(@class,'text-base')]";
  static nameLocatorString = "xpath=/span";

  public async getPrice(): Promise<number> {
    return test.step("Get Price", async () => {
      return parseInt((await this.price.innerText()).slice(1));
    });
  }

  public async openListing(): Promise<ProductPage> {
    return test.step("Open Listing", async () => {
      await this.listingLocator.click();
      await this.page.waitForURL("**/products/**");
      return new ProductPage(this.page);
    });
  }
}
