import type { PlaywrightTestConfig } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: "./tests",
  /* Maximum time one test can run for. */
  timeout: process.env.CI ? 60 * 1000 : 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: process.env.CI ? 15 * 1000 : 5 * 1000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html", { open: "never" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: process.env.CI ? true : false,
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: process.env.CI ? 30 * 1000 : 15 * 1000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.STORE_URL
      ? process.env.STORE_URL
      : "http://localhost:8080",
    viewport: { width: 1920, height: 1080 },
    screenshot: "on",
    video: "off",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure"
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium"
      // use: {
      //   ...devices["Desktop Chrome"]
      // }
    },
    {
      name: "firefox"
      // use: {
      //   ...devices["Desktop Firefox"]
      // }
    },
    {
      name: "webkit"
      //   use: {
      //     ...devices["Desktop Safari"]
      //   }
    }
  ]
};

export default config;
