import { Page, test } from "@playwright/test";

import { AdminBasePage } from "./admin.base.page";

export class TelemetryPage extends AdminBasePage {
  static pageName = "Admin Telemetry";

  constructor(page: Page) {
    super(page);
  }

  telemetryContinue = this.page.$("//button[@text='Continue']");

  public async dissmissTelemetry() {
    return test.step(`${TelemetryPage.pageName} - Dismiss telemetry`, async () => {
      // ElementHandle used instead of a locator as it can return null
      // if it does not find an element, instead of failling the current test.
      await (await this.telemetryContinue)?.click({ force: true });
    });
  }
}
