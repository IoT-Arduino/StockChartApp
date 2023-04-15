import { test } from '@playwright/test'
import { LoginPage } from './page-objects/LoginPage'
import { MemberPage } from './page-objects/MemberPage'
import { StockIdPage } from './page-objects/StockIdPage'

const stockList = [
  {
    Ticker: 'A',
  }
]

test.describe('Ck Membership', async () => {
  let loginPage: LoginPage
  let memberPage: MemberPage
  let stockIdPage: StockIdPage
  const { BASE_URL } = process.env


  //  データ入力
  test.only('Input Data', async ({ page }) => {
    loginPage = new LoginPage(page)
    memberPage = new MemberPage(page)
    stockIdPage = new StockIdPage(page)
    await page.goto(`${BASE_URL}`)
    await page.goto('auth/signin')
    await loginPage.login()

    // 会員ページに自動遷移
    await memberPage.assertLoginEmail()

    for (const data of stockList) {
      await page.goto(`/stocks/${data.Ticker}`)
      console.log(data.Ticker)

      await stockIdPage.inputComment()
      await stockIdPage.clickBookMark()
      await stockIdPage.inputMarker()

      // await page.screenshot({ path: `e2e/images/${data.Ticker}.png` })
    }
  })

  //  データ削除
  test('Delete Data', async ({ page }) => {
    loginPage = new LoginPage(page)
    memberPage = new MemberPage(page)
    stockIdPage = new StockIdPage(page)
    await page.goto(`${BASE_URL}`)
    await page.goto('auth/signin')
    await loginPage.login()

    // 会員ページに自動遷移
    await memberPage.assertLoginEmail()

    for (const data of stockList) {
      await page.goto(`/stocks/${data.Ticker}`)
      console.log(data.Ticker)

      await stockIdPage.deleteComment()
      await stockIdPage.deleteMarker()

      // await page.screenshot({ path: `e2e/images/${data.Ticker}.png` })
    }
  })

})
