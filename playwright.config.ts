import { PlaywrightTestConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: '.env.local' })

const isProduction = process.env.NODE_ENV === 'production';
const baseURL = isProduction ? process.env.NEXT_PUBLIC_BASE_URL : process.env.DEVELOPMENT_BASE_URL

const config: PlaywrightTestConfig = {
  testMatch: /e2e\/.*\.spec\.ts$/,
  // globalSetup: require.resolve('./e2e/config/globalSetup'),
  use: {
    baseURL: baseURL,
    headless: false,
    ignoreHTTPSErrors: true,
    actionTimeout: 10_000,
  },
  reporter: [['html', { outputDir: 'e2e/report', open: 'always' }]],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
}
export default config
