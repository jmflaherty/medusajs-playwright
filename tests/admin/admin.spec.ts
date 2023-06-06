import {
  randBoolean,
  randNumber,
  randProductDescription,
  randProductMaterial,
  randProductName
} from "@ngneat/falso";
import { expect, test } from "@playwright/test";

import { AdminLoginPage } from "../../src/pages/admin/login.page";

const credentials = {
  email: "test@test.com",
  password: "test"
};

test("admin", async ({ page }) => {
  const adminLoginPage = new AdminLoginPage(page);
  await adminLoginPage.goTo();
  const adminOrdersPage = await adminLoginPage.logIn(credentials);

  const adminProductsPage = await adminOrdersPage.openProducts();
  const newProductPage = await adminProductsPage.openNewProduct();

  const newProduct = {
    title: randProductName(),
    subtitle: randProductDescription(),
    handle: randNumber().toString(),
    material: randProductMaterial(),
    description: randProductDescription(),
    discountable: randBoolean()
  };

  const productPage = await newProductPage.publish(newProduct);
  expect(await productPage.title.textContent()).toBe(newProduct.title);
  expect(await productPage.status.textContent()).toBe("Published");
});
