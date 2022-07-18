import { test, expect, chromium, firefox } from '@playwright/test'
import { LoginPage } from './page-objects/LoginPage'
import { MemberPage } from './page-objects/MemberPage'
import { StockIdPage } from './page-objects/StockIdPage'

const stockList = [
  {
    Ticker: 'A',
    Name: 'Agilent Technologies Inc. Common Stock',
  },
  {
    Ticker: 'AA',
    Name: 'Alcoa Corporation Common Stock ',
  },
  {
    Ticker: 'AAL',
    Name: 'American Airlines Group Inc. Common Stock',
  },
  {
    Ticker: 'AAPL',
    Name: 'Apple Inc. Common Stock',
  },
  {
    Ticker: 'ABBV',
    Name: 'AbbVie Inc. Common Stock',
  },
  {
    Ticker: 'ABC',
    Name: 'AmerisourceBergen Corporation Common Stock',
  },
  {
    Ticker: 'ABMD',
    Name: 'ABIOMED Inc. Common Stock',
  },
  {
    Ticker: 'ABNB',
    Name: 'Airbnb Inc. Class A Common Stock',
  },
  {
    Ticker: 'ABT',
    Name: 'Abbott Laboratories Common Stock',
  },
]

// Localで動かすことを前提のテスト。通常はskip、動かすときはonly

test.describe.skip(`Recording Short Video`, () => {
  let loginPage: LoginPage
  let memberPage: MemberPage
  let stockIdPage: StockIdPage
  const { BASE_URL } = process.env

  test(`Recording Short Video Loop`, async () => {
    const browser = await firefox.launch({ headless: false, slowMo: 1 }) // { headless: false, slowMo: 1 }
    const context = await browser.newContext({
      locale: 'en-US',
      recordVideo: {
        dir: './e2e/videos',
        size: { height: 711, width: 385 },
      },
      viewport: {
        height: 800,
        width: 450,
      },
    })
    const page = await context.newPage()
    loginPage = new LoginPage(page)
    memberPage = new MemberPage(page)
    stockIdPage = new StockIdPage(page)

    await page.goto(`${BASE_URL}`)
    await page.goto('auth/signin')
    await loginPage.login()

    // 会員ページに自動遷移
    await memberPage.assertLoginEmail()

    for (let i = 0; i < stockList.length; i++) {
      if (i == 0) {
        await page.goto(`/stocks/${stockList[i].Ticker}`)
        await page.waitForTimeout(3000)
        console.log(stockList[i].Ticker)
        // continue
      } else {
        // await page.screenshot({ path: `e2e/images/${stockList[i].Ticker}.png` })
        // deploy 後　消去。
        await page.locator('text=Next Ticker').click()
        // deploy 後　動作させる。
        //   await stockIdPage.nextTicker.click()
        console.log(stockList[i].Ticker)
        await page.waitForTimeout(3000)
      }
    }
    await context.close()
    await browser.close()
  })
})


