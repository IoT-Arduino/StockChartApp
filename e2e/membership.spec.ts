import { test, expect, chromium } from '@playwright/test'

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
    Ticker: 'AAP',
    Name: 'Advance Auto Parts Inc.',
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
]

test.describe('Ck Membership', () => {
  //  データ入力
  test('Input Data', async () => {
    const { BASE_URL } = process.env
    const browser = await chromium.launch()
    const context = await browser.newContext({
      locale: 'en-US',
    })
    const page = await context.newPage()

    //
    await page.goto(`${BASE_URL}`)

    await page.goto('auth/signin')

    await page.type("input[type='email']", 'taketoshi.sakayama+test@gmail.com') // dummy email
    await page.type("input[type='password']", 'abcd1234')
    await page.click('data-testid=login-submit')

    // 会員ページに自動遷移
    await expect(page.locator('body')).toContainText('taketoshi.sakayama+test@gmail.com') // dummy email

    for (const data of stockList) {
      await page.goto(`/stocks/${data.Ticker}`)
      console.log(data.Ticker)
      // Comment入力
      await page.click('text=Data Input（Members Only）')
      await page.type('data-testid=commentMemoInput', 'comment情報メモ')
      await page.fill('data-testid=commentDateInput', '2022-05-27')
      await page.click('data-testid=addComment')
      await expect(page.locator('data-testid=tabSection')).toContainText('2022-05-27')

      // Bookmark
      await page.click('text=BookMark')

      // Marker入力
      await page.click('text=Data Input（Members Only）')
      await page.type('data-testid=markerMemoInput', 'Marker情報メモ')
      await page.fill('data-testid=markerDateInput', '2022-05-26')
      await page.click('data-testid=addMarker')
      await expect(page.locator('data-testid=tabSection')).toContainText('2022-05-26')

      // await page.screenshot({ path: `e2e/images/${data.Ticker}.png` })
    }

    await context.close()
    await browser.close()
  })

  // 入力不可ステイタス確認、1個削除後、入力可ステイタス確認
  test('Check 入力不可ステイタス', async () => {
    const { BASE_URL } = process.env
    const browser = await chromium.launch() // ブラウザで経過を見たいとき。　{ headless: false, slowMo: 5 }
    const context = await browser.newContext({
      locale: 'en-US',
    })
    const page = await context.newPage()

    // TestEndPointにする必要あり。
    await page.goto(`${BASE_URL}`)

    await page.goto('auth/signin')

    await page.type("input[type='email']", 'taketoshi.sakayama+test@gmail.com') // dummy email
    await page.type("input[type='password']", 'abcd1234') 
    await page.click('data-testid=login-submit')

    // 会員ページに自動遷移
    await expect(page.locator('body')).toContainText('taketoshi.sakayama+test@gmail.com')

    // 会員ページで入力不可確認
    await expect(page.locator('data-testid=canBookMarkInput')).toContainText(
      'Registration limit has been reached'
    )

    // 個別ページで入力不可確認　/stocks/A   stockList 0番目  marker & comment
    await page.goto(`/stocks/${stockList[0].Ticker}`)
    await page.click('text=Data Input（Members Only）')
    await expect(page.locator('data-testid=inputMarkerStatus')).toContainText('Input not allowed')

    // 個別ページで　1個データ削除
    //　Bookmark削除
    await page.click('text=BookMark')

    await page.click('text=Data Input（Members Only）')
    page.on('dialog', async (dialog) => {
      await dialog.accept()
    })
    //　Marker削除
    await page.click('data-testid=markerDelete')
    await page.click('text=OK')
    //　Comment削除
    await page.click('data-testid=commentDelete')
    await page.click('text=OK')

    // 個別ページで入力可確認　/stocks/A   marker & comment
    await page.click('text=Data Input（Members Only）')
    await expect(page.locator('data-testid=inputMarkerStatus')).toContainText('Inputtable')
    await expect(page.locator('data-testid=inputCommentStatus')).toContainText('Inputtable')

    // 会員ページで　可確認 bookmark,marker,comment
    await page.goto(`/member`)
    await expect(page.locator('data-testid=canBookMarkInput')).toContainText(
      'Registration is available.'
    )
    await expect(page.locator('data-testid=canMarkerInput')).toContainText(
      'Registration is available.'
    )
    await expect(page.locator('data-testid=canCommentInput')).toContainText(
      'Registration is available.'
    )

    await context.close()
    await browser.close()
  })

  // 後処理　データ削除　残り8個
  test(`Clean up Data`, async () => {
    const { BASE_URL } = process.env

    const browser = await chromium.launch()
    const context = await browser.newContext({
      locale: 'en-US',
    })

    const page = await context.newPage()
    await page.goto(`${BASE_URL}`)

    // Login
    await page.goto('auth/signin')
    await page.type("input[type='email']", 'taketoshi.sakayama+test@gmail.com') // dummy email
    await page.type("input[type='password']", 'abcd1234') 
    await page.click('data-testid=login-submit')

    // 会員ページに自動遷移
    await expect(page.locator('body')).toContainText('taketoshi.sakayama+test@gmail.com') // dummy email

    page.on('dialog', async (dialog) => {
      await dialog.accept()
    })

    for (let i = 0; i < stockList.length; i++) {
      // i = 0 だったら、スキップする。i=1以降処理する。
      if (i == 0) {
        continue
      } else {
        await page.goto(`/stocks/${stockList[i].Ticker}`)
        await expect(page.locator('h2')).toContainText(stockList[i].Ticker)

        await page.click('text=Data Input（Members Only）')
        // Marker削除
        await page.click('data-testid=markerDelete')
        await page.keyboard.press('Enter')
        // await page.click('text=OK')
        await expect(page.locator('data-testid=tabSection')).not.toContainText('2022-05-26')

        // Bookmark　削除
        await page.click('text=BookMark')

        //　Comment削除
        await page.click('data-testid=commentDelete')
        await page.keyboard.press('Enter')
        // await page.click('text=OK')
        await expect(page.locator('data-testid=tabSection')).not.toContainText('2022-05-27')
      }
    }

    await context.close()
    await browser.close()
  })
 
  // 会員ページで、データ登録が0であることを確認する。
  test('Logout', async () => {
    const { BASE_URL } = process.env
    const browser = await chromium.launch()
    const context = await browser.newContext({
      locale: 'en-US',
    })
    const page = await context.newPage()

    await page.goto(`${BASE_URL}`)

    await page.goto('auth/signin')

    await page.type("input[type='email']", 'taketoshi.sakayama+test@gmail.com') // dummy email
    await page.type("input[type='password']", 'abcd1234') 
    await page.click('data-testid=login-submit')

    await expect(page.locator('body')).toContainText('taketoshi.sakayama+test@gmail.com') // dummy email

    // データ登録が0であることを確認する。
    await expect(page.locator('td')).not.toBeVisible()

    await context.close()
    await browser.close()
  })
})
