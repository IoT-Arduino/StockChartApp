import { test, chromium } from '@playwright/test'
import { LoginPage } from './page-objects/LoginPage'
import { MemberPage } from './page-objects/MemberPage'
import { StockIdPage } from './page-objects/StockIdPage'

const stockList = [
  {
    Ticker: 'A',
  },
]

test.describe('Ck Membership', async () => {
  let loginPage: LoginPage
  let memberPage: MemberPage
  let stockIdPage: StockIdPage

  // test.beforeEach(async () => {
  //   const browser = await chromium.launch({ headless: false, slowMo: 5 }) // { headless: false, slowMo: 5 }
  //   const context = await browser.newContext({
  //     locale: 'en-US',
  //   })
  //   const page = await context.newPage()
  // })

  //  データ入力
  test('Input Data', async ({ page,baseURL }) => {
    loginPage = new LoginPage(page)
    memberPage = new MemberPage(page)
    stockIdPage = new StockIdPage(page)
    await page.goto(`${baseURL}`)
    await page.goto('/auth/signin')
    await loginPage.login()

    // 会員ページに自動遷移
    await memberPage.assertLoginEmail()

    for (const data of stockList) {
      await page.goto(`/stocks/${data.Ticker}`)
      await page.locator('data-testid=memberOnlyTab').click()

      await stockIdPage.inputComment()
      await stockIdPage.clickBookMark()
      await stockIdPage.inputMarker()
      // await page.screenshot({ path: `e2e/images/${data.Ticker}.png` })

      // Clean up data
      await stockIdPage.deleteComment()
      await stockIdPage.deleteMarker()
    }
  })
})
