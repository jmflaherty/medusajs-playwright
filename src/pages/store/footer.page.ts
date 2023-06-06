import { Page, test } from "@playwright/test";

import { HomePage } from "./home.page";
import { StoreBasePage } from "./store.base.page";

export class FooterPage extends StoreBasePage {
  static pageName = "Footer";

  constructor(page: Page) {
    super(page);
  }

  footer = this.page.locator("//footer");
  titleButton = this.footer.locator("//a[text()='Acme']");
  githubButton = this.footer.locator("//a[text()='GitHub']");
  documentationButton = this.footer.locator("//a[text()='Documentation']");
  sourceCodeButton = this.footer.locator("//a[text()='Source code']");

  public async openHome(): Promise<HomePage> {
    return test.step(`${FooterPage.pageName} - Open Home`, async () => {
      await this.titleButton.click();
      await this.page.waitForURL("**/");
      return new HomePage(this.page);
    });
  }

  public async openGithubLink(): Promise<void> {
    return test.step(`${FooterPage.pageName} - Open GitHub Link`, async () => {
      await this.githubButton.click();
    });
  }

  public async openDocumentationLink(): Promise<void> {
    return test.step(`${FooterPage.pageName} - Open Documentation Link`, async () => {
      await this.documentationButton.click();
    });
  }

  public async openSourceCodeLink(): Promise<void> {
    return test.step(`${FooterPage.pageName} - Open Source Code Link`, async () => {
      await this.sourceCodeButton.click();
    });
  }
}
