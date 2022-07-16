import { PlaywrightTestConfig, devices } from '@playwright/test'

 
const config: PlaywrightTestConfig = {
    testMatch: '/e2e/**/*.spec.ts',
    globalSetup: require.resolve('./global-setup'),
    // webServer: {
    //     command: 'npm run dev',
    //     url: 'http://localhost:3000',
    //     timeout: 120 * 1000,
    //   },
    use: {
        baseURL: 'https://stock-chart-app-git-develop-sa10shi.vercel.app',
        headless: true,
        ignoreHTTPSErrors: true,
        actionTimeout: 10_000
    },
    projects: [
        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']},
        },
        // {
        //     name: 'iphone12',
        //     use: {...devices["iPhone 12"]}
        // }
    ]
}
export default config;