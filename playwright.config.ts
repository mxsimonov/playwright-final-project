import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['dot'],
    ['json', { outputFile: 'test-results/test-results.json' }],
    [
      '@testomatio/reporter/lib/adapter/playwright.js',
      {
        apiKey: process.env.TESTOMATIO_KEY,
      },
    ],
    // ['@reportportal/agent-js-playwright',
    //   {
    //     apiKey: process.env.REPORTPORTAL_KEY,
    //     endpoint: 'http://localhost:8080/api/v1',
    //     project: 'playwright-final-project',
    //     launch: 'playwright-final-project',
    //     description: 'playwright-final-project',
    //   },
    // ]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,
    testIdAttribute: 'data-test',

    trace: 'on-first-retry',
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [

    { name: 'auth', testMatch: /.auth\.setup\.ts/ },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: process.env.AUTH_FILE },
      dependencies: ['auth']
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], storageState: process.env.AUTH_FILE },
      dependencies: ['auth']
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], storageState: process.env.AUTH_FILE },
      dependencies: ['auth']
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
