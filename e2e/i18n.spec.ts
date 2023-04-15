import { test, chromium, expect } from '@playwright/test'

test.describe('Ck i18n', () => {
  test('Stock List page should be displayed in English if the locale is en', async () => {

    const { BASE_URL } = process.env;

    const browser = await chromium.launch()
    const context = await browser.newContext({
      locale: 'en-US',
    })
    const page = await context.newPage()
    await page.goto(`${BASE_URL}/stocks`)
    const listTitle = page.locator('h2')
    await expect(listTitle).toHaveText('US Stock500 List')
    await context.close()
    await browser.close()
  })

  test('Stock List page should be displayed in Japanese if the locale is ja', async () => {
    const { BASE_URL } = process.env;

    const browser = await chromium.launch()
    const context = await browser.newContext({
      locale: 'ja-JP',
    })
    const page = await context.newPage()
    await page.goto(`${BASE_URL}/ja-JP/stocks`)
    const listTitle = page.locator('h2')
    await expect(listTitle).toContainText('米国代表500株式一覧')
    await context.close()
    await browser.close()
  })
})
