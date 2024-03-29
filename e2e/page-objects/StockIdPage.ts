import { expect, Locator, Page } from '@playwright/test'

export class StockIdPage {
  // Define Selectors
  readonly page: Page
  readonly tickerTitle: Locator
  readonly prevTicker: Locator
  readonly nextTicker: Locator
  readonly bookMark: Locator
  readonly markerDelete: Locator
  readonly commentDelete: Locator
  readonly inputCommentMemo: Locator
  readonly inputCommentDate: Locator
  readonly inputMarkerMemo: Locator
  readonly inputMarkerDate: Locator
  readonly addComment: Locator
  readonly addMarker: Locator
  readonly tabSection: Locator
  readonly inputMembersOnly: Locator
  readonly dialogOk: Locator
  readonly inputMarkerStatus: Locator
  readonly inputCommentStatus: Locator
  readonly commentList: Locator

  // Init Selectors
  constructor(page: Page) {
    this.page = page
    this.tickerTitle = page.locator('h2')
    this.prevTicker = page.locator('data-testid=prevTicker')
    this.nextTicker = page.locator('data-testid=nextTicker')
    // this.bookMark = page.locator('text=BookMark')
    this.bookMark = page.locator('data-testid=bookmarkCheck')
    this.markerDelete = page.locator('data-testid=markerDelete')
    this.commentDelete = page.locator('data-testid=commentDelete')
    this.dialogOk = page.locator('text=OK')
    this.inputCommentMemo = page.locator('data-testid=commentMemoInput')

    this.inputCommentDate = page.locator(
      '[data-testid="inputCommentForm"] input[placeholder="Please select date"]'
    )

    this.inputMarkerMemo = page.locator('data-testid=markerMemoInput')

    this.inputMarkerDate = page.locator(
      '[data-testid="inputMarkerForm"] input[placeholder="Please select date"]'
    )

    this.addComment = page.locator('data-testid=addComment')
    this.addMarker = page.locator('data-testid=addMarker')
    this.tabSection = page.locator('data-testid=tabSection')
    this.commentList = page.locator('data-testid=commentList')
    this.inputMembersOnly = page.locator('data-testid=memberOnlyTab')
    this.inputMarkerStatus = page.locator('data-testid=inputMarkerStatus')
    this.inputCommentStatus = page.locator('data-testid=inputCommentStatus')
  }

  async inputComment() {
    await this.inputMembersOnly.click()
    await this.inputCommentMemo.type('comment information memo')
    await this.inputCommentDate.waitFor()
    await this.inputCommentDate.click()
    await this.inputCommentDate.fill('05/26/2022')

    await this.addComment.click()
    await expect(this.commentList).toContainText('05/26/2022')
  }

  async inputMarker() {
    await this.inputMembersOnly.click()
    await this.inputMarkerMemo.type('Marker')
    await this.inputMarkerDate.fill('05/26/2022')
    await this.addMarker.click()
    await expect(this.tabSection).toContainText('05/2022')
  }

  async deleteComment() {
    await this.commentDelete.click()
    await this.dialogOk.click()
  }

  async deleteCommentWithConfirm() {
    await this.commentDelete.click()
    // await this.dialogOk.click()
    await this.page.keyboard.press('Enter')
    await expect(this.tabSection).not.toContainText('2022-05-27')
  }

  async deleteMarker() {
    await this.markerDelete.click()
    await this.dialogOk.click()
  }

  async deleteMarkerWithConfirm() {
    await this.markerDelete.click()
    // await this.dialogOk.click()
    await this.page.keyboard.press('Enter')
    await expect(this.tabSection).not.toContainText('2022-05-26')
  }

  async checkTickerTitle(ticker: string) {
    await expect(this.tickerTitle).toContainText(ticker)
  }

  async clickBookMark() {
    await this.bookMark.click()
  }

  async checkCanInput() {
    await this.inputMembersOnly.click()
    await expect(this.inputMarkerStatus).toContainText('Inputtable')
    await expect(this.inputCommentStatus).toContainText('Inputtable')
  }

  async checkCanNotInput() {
    await this.inputMembersOnly.click()
    await expect(this.inputMarkerStatus).toContainText('Input not allowed')
    await expect(this.inputCommentStatus).toContainText('Input not allowed')
  }
}
