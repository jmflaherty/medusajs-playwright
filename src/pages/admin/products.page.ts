import { Page, test } from "@playwright/test";

import { AdminBasePage } from "./admin.base.page";
import { NewProductPage } from "./new-product.page";

export class ProductsPage extends AdminBasePage {
  static pageName = "Products";

  constructor(page: Page) {
    super(page);
  }

  newProduct = this.page.getByRole("button", { name: "New Product" });

  public async openNewProduct(): Promise<NewProductPage> {
    return test.step(`${ProductsPage.pageName} - New product`, async () => {
      await this.newProduct.click();
      return new NewProductPage(this.page);
    });
  }
}
