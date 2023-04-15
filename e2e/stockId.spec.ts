import { test, expect } from '@playwright/test'

const { stockList } = require('../data/stockCode/US-StockListForTest');

stockList.forEach((data:any) => {
  test.skip(`Check data is missing ${data.Ticker}`, async ({ page }) => {
    await page.goto(`/stocks/${data.Ticker}`)
    await expect(page.locator('data-testid=tabSection')).not.toContainText('--')
  })
})

// Localで動かすことを前提のテスト。通常はskip、動かすときはonly