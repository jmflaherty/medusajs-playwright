import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { ProductPage } from "./product.page";

export class ListingItemPage extends BasePage {
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
    return parseInt((await this.price.innerText()).slice(1));
  }

  public async openListing(): Promise<ProductPage> {
    await Promise.all([
      this.page.waitForNavigation({ url: "**/products/**" }),
      this.listingLocator.click()
    ]);
    return new ProductPage(this.page);
  }
}
