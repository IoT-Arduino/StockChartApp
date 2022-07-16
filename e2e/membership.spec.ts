import { test, expect, chromium } from '@playwright/test'
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

test.describe.only('Ck Membership', async () => {
  let loginPage: LoginPage
  let memberPage: MemberPage
  let stockIdPage: StockIdPage
  const { BASE_URL } = process.env

  // test.beforeEach(async () => {
  //   const browser = await chromium.launch() // { headless: false, slowMo: 5 }
  //   const context = await browser.newContext({
  //     locale: 'en-US',
  //   })
  // });

  //  データ入力
  test('Input Data', async ({ page }) => {
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

  // 入力不可ステイタス確認、1個削除後、入力可ステイタス確認
  test('Check 入力不可ステイタス', async ({ page }) => {
    console.log('Check 入力不可ステイタス Start')
    loginPage = new LoginPage(page)
    memberPage = new MemberPage(page)
    stockIdPage = new StockIdPage(page)
    await page.goto(`${BASE_URL}`)
    await page.goto('auth/signin')
    await loginPage.login()

    // 会員ページに自動遷移
    await memberPage.assertLoginEmail()
    await memberPage.assertCanNotAddBookMark()
    // 個別ページで入力不可確認　/stocks/A   stockList 0番目
    await page.goto(`/stocks/${stockList[0].Ticker}`)
    await stockIdPage.checkCanNotInput()
    // 個別ページで　1個データ削除
    await stockIdPage.clickBookMark()
    await stockIdPage.inputMembersOnly.click()
    page.on('dialog', async (dialog) => {
      await dialog.accept()
    })
    await stockIdPage.deleteMarker()
    await stockIdPage.deleteComment()
    await stockIdPage.checkCanInput()
    // 会員ページで　可確認 bookmark,marker,comment
    await memberPage.assertCanDataInput()
    console.log('Check 入力不可ステイタス End')
  })

  // 後処理　データ削除　残り8個
  test(`Clean up Data`, async ({ page }) => {
    loginPage = new LoginPage(page)
    memberPage = new MemberPage(page)
    stockIdPage = new StockIdPage(page)
    await page.goto(`${BASE_URL}`)
    await page.goto('auth/signin')
    await loginPage.login()

    // 会員ページに自動遷移
    await memberPage.assertLoginEmail()

    page.on('dialog', async (dialog) => {
      await dialog.accept()
    })
    for (let i = 0; i < stockList.length; i++) {
      if (i == 0) {
        continue
      } else {
        await page.goto(`/stocks/${stockList[i].Ticker}`)
        console.log(stockList[i].Ticker)
        await stockIdPage.checkTickerTitle(stockList[i].Ticker)
        await stockIdPage.inputMembersOnly.click()
        await stockIdPage.deleteMarkerWithConfirm()
        await stockIdPage.clickBookMark()
        await stockIdPage.deleteCommentWithConfirm()
      }
    }
  })

  // 会員ページで、データ登録が0であることを確認する。
  test('Logout', async ({ page }) => {
    loginPage = new LoginPage(page)
    memberPage = new MemberPage(page)
    stockIdPage = new StockIdPage(page)
    await page.goto(`${BASE_URL}`)
    await page.goto('auth/signin')
    await loginPage.login()
    await memberPage.assertLoginEmail()
    await memberPage.assertNoDataRegistered()
  })
})
