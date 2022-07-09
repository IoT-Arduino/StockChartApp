import { test, expect } from '@playwright/test'

const { stockList } = require('../data/stockCode/US-StockListForTest');

stockList.forEach((data) => {
  test(`Check data is missing ${data.Ticker}`, async ({ page }) => {
    await page.goto(`/stocks/${data.Ticker}`)
    await expect(page.locator('#tabSection')).not.toContainText('--')
  })
})

// Localで動かすことを前提。