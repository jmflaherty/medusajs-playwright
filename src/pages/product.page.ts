import { rand } from "@ngneat/falso";
import { Page, test } from "@playwright/test";

import { ProductInterface } from "../interfaces/product.interface";
import { Size } from "../types/size.type";
import { BasePage } from "./base.page";
import { FooterPage } from "./footer.page";
import { HeaderPage } from "./header.page";
import { MyBagPopover } from "./myBagPopover.page";

export class ProductPage extends BasePage {
  static pageName = "Product Page";

  header: HeaderPage;
  footer: FooterPage;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderPage(page);
    this.footer = new FooterPage(page);
  }

  private productContent = this.page.locator(
    `//main//div[contains(@class,'content-container')]${ProductPage.productInforStringLocator}/../..`
  );

  static productInforStringLocator = "//div[@id='product-info']";
  productInfo = this.productContent.locator(
    ProductPage.productInforStringLocator
  );

  productName = this.productInfo.locator("//h3");
  productDescription = this.productInfo.locator("//p");
  productSizes = this.productInfo.locator(
    "//span[.='Select Size']/following-sibling::div//button"
  );

  productColors = this.productInfo.locator(
    "//span[.='Select Color']/following-sibling::div//button"
  );

  productPrice = this.productInfo.locator("//span");
  addToCartButton = this.productInfo.getByRole("button", {
    name: "Add to cart"
  });

  public async pickSize(size: Size) {
    return test.step(`${ProductPage.pageName} - Pick Size ${size}`, async () => {
      await this.productSizes.getByText(size, { exact: true }).click();
    });
  }

  public async pickColor() {
    return test.step(`${ProductPage.pageName} - Pick color`, async () => {
      await rand(await this.productColors.all()).click();
    });
  }

  public async addToCart(product: ProductInterface) {
    return test.step(`${ProductPage.pageName} - Add ${product.amountToBuy} of ${product.name} to Cart`, async () => {
      const myBagPopover = new MyBagPopover(this.page);
      await this.productInfo.waitFor({ state: "visible" });
      if (product.size != null) await this.pickSize(product.size);
      if (await this.productColors.first().isVisible()) await this.pickColor();
      for (let added = 0; added < product.amountToBuy; added++) {
        await this.addToCartButton.click();
        // When adding a product the MyBagPopover pops up covering the Add to Cart button,
        // so in order to add more products focus has to be put somewhere else
        await myBagPopover.dismissMyBagPopover();
      }
    });
  }

  public async getPrice(): Promise<number> {
    return test.step(`${ProductPage.pageName} - Get Price`, async () => {
      return parseInt((await this.productPrice.innerText()).slice(1));
    });
  }
}
