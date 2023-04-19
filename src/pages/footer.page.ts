import { Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { HomePage } from "./home.page";

export class FooterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  footer = this.page.locator("//footer");
  titleButton = this.footer.locator("//a[text()='Acme']");
  githubButton = this.footer.locator("//a[text()='GitHub']");
  documentationButton = this.footer.locator("//a[text()='Documentation']");
  sourceCodeButton = this.footer.locator("//a[text()='Source code']");

  public async openHome(): Promise<HomePage> {
    await this.titleButton.click();
    await this.page.waitForURL("**/");
    return new HomePage(this.page);
  }

  public async openGithubLink(): Promise<void> {
    await this.githubButton.click();
  }

  public async openDocumentationLink(): Promise<void> {
    await this.documentationButton.click();
  }

  public async openSourceCodeLink(): Promise<void> {
    await this.sourceCodeButton.click();
  }
}
