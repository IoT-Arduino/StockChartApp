import { PlaywrightTestConfig, devices } from '@playwright/test'
 
const config: PlaywrightTestConfig = {
    testMatch: '/e2e/**/*.spec.ts',
    use: {
        baseURL: 'http://localhost:3000',
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