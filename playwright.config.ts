import { defineConfig, devices } from '@playwright/test'

// HEADED=1 : fenêtre visible, actions ralenties (SLOWMO en ms), un seul worker.
const headed = process.env.HEADED === '1'

export default defineConfig({
  testDir: 'e2e',
  workers: headed ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5173',
    headless: !headed,
    launchOptions: { slowMo: headed ? Number(process.env.SLOWMO ?? 800) : 0 },
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'e2e',
      testMatch: '**/*.test.ts',
      testIgnore: '**/*.nondet.test.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'nondet',
      testMatch: '**/*.nondet.test.ts',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Le front seulement : le backend est un serveur séparé, à lancer à part.
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
  },
})
