import {
  randBoolean,
  randNumber,
  randProductDescription,
  randProductMaterial,
  randProductName
} from "@ngneat/falso";
import { Page, test } from "@playwright/test";

import { NewProduct } from "../../interfaces/new-product.interface";
import { AdminBasePage } from "./admin.base.page";
import { ProductPage } from "./product.page";

export class NewProductPage extends AdminBasePage {
  static pageName = "New Product";

  constructor(page: Page) {
    super(page);
  }

  publishProduct = this.page.getByRole("button", { name: "Publish product" });

  title = this.page.locator("xpath=//input[@name='general.title']");
  subtitle = this.page.locator("xpath=//input[@name='general.subtitle']");
  handle = this.page.locator("xpath=//input[@name='general.handle']");
  material = this.page.locator("xpath=//input[@name='general.material']");
  description = this.page.locator(
    "xpath=//textarea[@name='general.description']"
  );

  discountable = this.page.locator("//h2[.='Discountable']/following::button");

  async publish(
    newProduct: NewProduct = {
      title: randProductName(),
      subtitle: randProductDescription(),
      handle: randNumber().toString(),
      material: randProductMaterial(),
      description: randProductDescription(),
      discountable: randBoolean()
    }
  ): Promise<ProductPage> {
    return test.step(`${NewProductPage.pageName} - Publish product ${newProduct.title}`, async () => {
      await this.title.fill(newProduct.title);
      await this.subtitle.fill(newProduct.subtitle);
      await this.handle.fill(newProduct.handle);
      await this.material.fill(newProduct.material);
      await this.description.fill(newProduct.description);
      if (newProduct.discountable) await this.discountable.click();

      await this.publishProduct.click();

      return new ProductPage(this.page);
    });
  }
}
