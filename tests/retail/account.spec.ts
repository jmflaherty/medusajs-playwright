import { expect } from "@playwright/test";

import { UserInterface } from "../../src/interfaces/user.interface";
import { AccountPage } from "../../src/pages/store/account/account.page";
import { test } from "../../src/test/base.test";

test("Register user", async ({ homePage }) => {
  let accountPage: AccountPage;
  let user: UserInterface;
  await test.step(`Register user`, async () => {
    const loginPage = await homePage.header.openAccount();
    const registerPage = await loginPage.openRegister();
    [accountPage, user] = await registerPage.register();
  });
  await test.step(`Verify user data correctness`, async () => {
    const profilePage = await accountPage.openProfile();
    await expect
      .soft(profilePage.name)
      .toHaveText(`${user.firstName} ${user.lastName}`);
    await expect.soft(profilePage.email).toHaveText(user.email);
    await expect.soft(profilePage.phone).toHaveText(user.phone);
    await expect
      .soft(profilePage.password)
      .toHaveText("The password is not shown for security reasons");
    await expect
      .soft(profilePage.billingAddres)
      .toHaveText("No billing address");
  });
});
