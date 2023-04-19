import { expect } from "@playwright/test";
import { generateProducts } from "../src/interfaces/product.interface";
import { MyBagPage } from "../src/pages/myBag.page";
import { test } from "../src/test/base.test";

const products = generateProducts(2);

test("Anonymous purchase", async ({ homePage }) => {
  for (const product of products) {
    await test.step(`Add ${product.amountToBuy} of ${product.name} to bag`, async () => {
      const storePage = await homePage.header.openStore();
      const productPage = await storePage.openListingByName(product.name);
      await productPage.addToCart(product);
    });
  }
  let myBagPage: MyBagPage;
  await test.step("Open My Bag", async () => {
    myBagPage = await homePage.header.openMyBag();
  });
  for (const product of products) {
    await test.step(`Verify total price for ${product.name}(s)`, async () => {
      expect
        .soft(await myBagPage.getTotalOfProductInBag(product))
        .toBe(product.price * product.amountToBuy);
    });
  }
  await test.step(`Fulfill order`, async () => {
    const checkoutPage = await myBagPage.goToCheckout();
    const orderConfirmedPage = await checkoutPage.completeCheckout();
    await expect
      .soft(orderConfirmedPage.successfulOrderConfirmation)
      .toBeVisible();
  });
});
