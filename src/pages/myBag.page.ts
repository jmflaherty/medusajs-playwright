import { Locator, Page, test } from "@playwright/test";

import { Product } from "../types/product.type";
import { BasePage } from "./base.page";
import { CheckoutPage } from "./checkout.page";
import { FooterPage } from "./footer.page";
import { HeaderPage } from "./header.page";

export class MyBagPage extends BasePage {
  static pageName = "My Bag";

  header: HeaderPage;
  footer: FooterPage;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderPage(page);
    this.footer = new FooterPage(page);
  }

  static sectionsStringLocator = "//div[contains(@class,'p-6')]";
  private sections = this.page.locator(MyBagPage.sectionsStringLocator);

  shoppingBagSection = this.findSection("Shopping Bag", "h1");
  totalSection = this.findSection("Total", "span");
  discountSection = this.findSection("Discount", "h3");

  private findSection(title: string, elementType: string): Locator {
    return this.sections.locator(
      `//${elementType}[text()="${title}"]/ancestor::${MyBagPage.sectionsStringLocator.slice(
        2
      )}`
    );
  }

  productsInBag = this.shoppingBagSection.locator(
    "//div/div[contains(@class,'grid')]"
  );

  public async getProductInBag(product: Product): Promise<Locator> {
    return test.step(`${MyBagPage.pageName} - Get Product ${product.name} in Bag`, async () => {
      return this.productsInBag.locator(
        `//span[text()='${product.name}']/../../../..`
      );
    });
  }

  public async getTotalOfProductInBag(product: Product) {
    return test.step(`${MyBagPage.pageName} - Get Total of ${product.name} in Bag`, async () => {
      return parseFloat(
        (
          await (await this.getProductInBag(product))
            .locator("//span[contains(text(),'€')]")
            .textContent()
        )?.slice(1) as string
      );
    });
  }

  goToCheckoutLocator = this.totalSection.getByRole("button");

  public async goToCheckout(): Promise<CheckoutPage> {
    return test.step(`${MyBagPage.pageName} - Go to Checkout`, async () => {
      await this.goToCheckoutLocator.click();
      await this.page.waitForURL("**/checkout");
      return new CheckoutPage(this.page);
    });
  }
}
