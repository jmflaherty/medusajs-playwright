import { expect } from "@playwright/test";
import { UserInterface } from "../src/interfaces/user.interface";
import { AccountPage } from "../src/pages/account/account.page";
import { test } from "../src/test/base.test";

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
    expect
      .soft(profilePage.name)
      .toHaveText(`${user.firstName} ${user.lastName}`);
    expect.soft(profilePage.email).toHaveText(user.email);
    expect.soft(profilePage.phone).toHaveText(user.phone);
    expect
      .soft(profilePage.password)
      .toHaveText("The password is not shown for security reasons");
    expect.soft(profilePage.billingAddres).toHaveText("No billing address");
  });
});
