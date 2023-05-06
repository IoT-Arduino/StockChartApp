import { PlaywrightTestConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: '.env.local' })

const isProduction = process.env.NODE_ENV === 'production';
const baseURL = isProduction ? process.env.PRODUCTION_BASE_URL : process.env.DEVELOPMENT_BASE_URL;

const config: PlaywrightTestConfig = {
  testMatch: /e2e\/.*\.spec\.ts$/,
  // globalSetup: require.resolve('./global-setup'),
  use: {
    baseURL: baseURL,
    headless: false,
    ignoreHTTPSErrors: true,
    actionTimeout: 10_000,
  },
  reporter: [['html', { open: 'always' }]],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
}
export default config
