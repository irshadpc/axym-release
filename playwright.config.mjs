import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  /* The static dev server is single-threaded and every test walks the same
     heavy pages; over-parallelising turns server contention into flakes. */
  workers: 3,
  forbidOnly: !!process.env.CI,
  retries: 1,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'tests/report' }]],
  use: {
    baseURL: 'http://127.0.0.1:4173/axym-release/',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'node tests/serve.mjs',
    url: 'http://127.0.0.1:4173/axym-release/',
    reuseExistingServer: !process.env.CI,
    timeout: 20000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
