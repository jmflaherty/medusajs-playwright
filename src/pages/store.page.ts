import { Page, test } from "@playwright/test";

import { BasePage } from "./base.page";
import { FooterPage } from "./footer.page";
import { HeaderPage } from "./header.page";
import { ListingItemPage } from "./listingItem.page";
import { ProductPage } from "./product.page";

export class StorePage extends BasePage {
  static pageName = "Store";

  header: HeaderPage;
  footer: FooterPage;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderPage(page);
    this.footer = new FooterPage(page);
  }

  listingsContainer = this.page.locator(
    "//main//div[contains(@class,'content')]"
  );

  listings = this.listingsContainer.locator("//li");

  public async getListingItemByName(name: string): Promise<ListingItemPage> {
    return test.step(`${StorePage.pageName} - Get Listing ${name}`, async () => {
      const listing = this.listings
        .locator(ListingItemPage.textLocatorString)
        .locator(ListingItemPage.nameLocatorString, { hasText: name });
      return new ListingItemPage(this.page, listing);
    });
  }

  public async openListingByName(name: string): Promise<ProductPage> {
    return test.step(`${StorePage.pageName} - Open Listing ${name}`, async () => {
      return await (await this.getListingItemByName(name)).openListing();
    });
  }
}
