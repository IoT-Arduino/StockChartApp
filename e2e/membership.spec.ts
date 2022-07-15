import { test, expect, chromium } from '@playwright/test'

// const { NEXT_PUBLIC_API_ENDOPOINT } = process.env;


// const { stockList } = require('../data/stockCode/US-StockListForTest');

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

test.describe.only('Ck Membership', () => {
  test('Login', async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext({
      locale: 'en-US',
    })
    const page = await context.newPage()

    //
    await page.goto('http://localhost:3000')

    await page.goto('auth/signin')

    await page.type("input[type='email']", 'taketoshi.sakayama+test@gmail.com') // name change
    await page.type("input[type='password']", 'abcd1234')
    await page.click('data-testid=login-submit')

    // 会員ページに自動遷移
    await expect(page.locator('body')).toContainText('taketoshi.sakayama+test@gmail.com')// name change
  })

  //　データ入力（9個入力）
  stockList.forEach((data) => {
    test(`InputData ${data.Ticker}`, async () => {
      // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
      const browser = await chromium.launch()
      const context = await browser.newContext({
        locale: 'en-US',
      })
      const page = await context.newPage()

      await page.goto('http://localhost:3000')

      // Login
      await page.goto('auth/signin')
      await page.type("input[type='email']", 'taketoshi.sakayama+test@gmail.com') // name change
      await page.type("input[type='password']", 'abcd1234')
      await page.click('data-testid=login-submit')

      await page.goto(`/stocks/${data.Ticker}`)
      await expect(page.locator('h2')).toContainText(data.Ticker)

      //   test.setTimeout(10000);

      // Bookmark
      await page.click('text=BookMark')

      // Marker入力
      await page.click('text=Data Input（Members Only）')
      await page.type('data-testid=markerMemoInput', 'Marker情報メモ')
      await page.fill('data-testid=markerDateInput', '2022-05-26')
      await page.click('data-testid=addMarker')
      await expect(page.locator('data-testid=tabSection')).toContainText('2022-05-26')

      // Comment入力
      await page.click('text=Data Input（Members Only）')
      await page.type('data-testid=commentMemoInput', 'comment情報メモ')
      await page.fill('data-testid=commentDateInput', '2022-05-27')
      await page.click('data-testid=addComment')
      await expect(page.locator('data-testid=tabSection')).toContainText('2022-05-27')

      //   await page.screenshot({ path: "./picture2.png" });
    })
  })

  // 入力不可ステイタス確認、1個削除後、入力可ステイタス確認
  test('Check 入力不可ステイタス', async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext({
      locale: 'en-US',
    })
    const page = await context.newPage()

    // TestEndPointにする必要あり。
    await page.goto('http://localhost:3000')

    await page.goto('auth/signin')

    await page.type("input[type='email']", 'taketoshi.sakayama+test@gmail.com') // name change
    await page.type("input[type='password']", 'abcd1234') // name change
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

    //　Marker削除
    await page.click('data-testid=markerDelete')
    page.on('dialog', async (dialog) => {
      await dialog.accept()
    })
    await page.keyboard.press('Enter')

    //　Comment削除
    await page.click('data-testid=commentDelete')
    // page.on('dialog', async (dialog) => {
    //   await dialog.accept()
    // })
    await page.keyboard.press('Enter')

    // 個別ページで入力可確認　/stocks/A   marker & comment
    await page.click('text=Data Input（Members Only）')
    await expect(page.locator('data-testid=inputMarkerStatus')).toContainText('Inputtable')
    await expect(page.locator('data-testid=inputCommentStatus')).toContainText('Inputtable')

    // 会員ページで　可確認 bookmark,marker,comment
    await page.goto(`/member`)
    await expect(page.locator('data-testid=canBookMarkInput')).toContainText('Registration is available.')
    await expect(page.locator('data-testid=canMarkerInput')).toContainText('Registration is available.')
    await expect(page.locator('data-testid=canCommentInput')).toContainText('Registration is available.')
  })

  // 後処理　データ削除　残り8個
  stockList.forEach((data, i) => {
    test(`Clean up ${data.Ticker}`, async () => {
      // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
      const browser = await chromium.launch()
      const context = await browser.newContext({
        locale: 'en-US',
      })

      const page = await context.newPage()

      await page.goto('http://localhost:3000')

      // Login
      await page.goto('auth/signin')
      await page.type("input[type='email']", 'taketoshi.sakayama+test@gmail.com') // name change
      await page.type("input[type='password']", 'abcd1234') // name change
      await page.click('data-testid=login-submit')

      // 会員ページに自動遷移
      await expect(page.locator('body')).toContainText('taketoshi.sakayama+test@gmail.com') // name change

      // i = 0 だったら、スキップする。i=1以降処理する。
      if (i == 0) {
        await page.goto(`/stocks/${data.Ticker}`)
        await expect(page.locator('h2')).toContainText(data.Ticker)
      } else {
        await page.goto(`/stocks/${data.Ticker}`)
        await expect(page.locator('h2')).toContainText(data.Ticker)

        // Bookmark　削除
        await page.click('text=BookMark')

        // Marker削除
        await page.click('text=Data Input（Members Only）')
        await page.click('data-testid=markerDelete')
        page.on('dialog', async (dialog) => {
          await dialog.accept()
        })
        await page.keyboard.press('Enter')

        //　Comment削除
        await page.click('data-testid=commentDelete')
        // page.on('dialog', async (dialog) => {
        //   await dialog.accept()
        // })
        await page.keyboard.press('Enter')

        //   await page.screenshot({ path: "./picture2.png" });
      }
    })
  })

  // 会員ページで、データ登録が0であることを確認する。
  test('Logout', async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext({
      locale: 'en-US',
    })
    const page = await context.newPage()

    // 
    await page.goto('http://localhost:3000')

    await page.goto('auth/signin')

    await page.type("input[type='email']", 'taketoshi.sakayama+test@gmail.com') // name change
    await page.type("input[type='password']", 'abcd1234') // name change
    await page.click('data-testid=login-submit')

    await expect(page.locator('body')).toContainText('taketoshi.sakayama+test@gmail.com') // name change

    // データ登録が0であることを確認する。
    await expect(page.locator('td')).not.toBeVisible()


  })
})
