import { test, chromium, expect } from '@playwright/test'

test.describe('Ck i19n', () => {
  test.only('App should be displayed in English if the locale is en', async () => {

    const { FOO, BAR } = process.env;

    // FOO and BAR properties are populated.
    expect(FOO).toEqual('some data');

    console.log(FOO)


    const browser = await chromium.launch()
    const context = await browser.newContext({
      locale: 'en-US',
    })
    const page = await context.newPage()
    await page.goto('http://localhost:3000/en-US')
    const login = page.locator('h3')
    expect(login).toHaveText('marumaru')
  })

  test('App should be displayed in Japanese if the locale is ja', async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext({
      locale: 'ja-JP',
    })
    const page = await context.newPage()
    await page.goto('http://localhost:3000/ja-JP')
    const login = page.locator('h3')
    expect(login).toHaveText('多言語サイト')
  })
})
