import { test as base } from "@playwright/test";

import { HomePage } from "../pages/store/home.page";

export const test = base.extend<{ homePage: HomePage }>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goTo();
    await use(homePage);
  }
});
