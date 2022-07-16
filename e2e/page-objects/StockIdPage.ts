import { expect, Locator, Page } from '@playwright/test'

export class StockIdPage {
  // Define Selectors
  readonly page: Page
  readonly tickerTitle : Locator
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
  readonly inputMarkerStatus:Locator
  readonly inputCommentStatus:Locator

  // Init Selectors
  constructor(page: Page) {
    this.page = page
    this.tickerTitle = page.locator('h2')
    this.bookMark = page.locator('text=BookMark')
    this.markerDelete = page.locator('data-testid=markerDelete')
    this.commentDelete = page.locator('data-testid=commentDelete')
    this.dialogOk = page.locator('text=OK')
    this.inputCommentMemo = page.locator('data-testid=commentMemoInput')
    this.inputCommentDate = page.locator('data-testid=commentDateInput')
    this.inputMarkerMemo = page.locator('data-testid=markerMemoInput')
    this.inputMarkerDate = page.locator('data-testid=markerDateInput')
    this.addComment = page.locator('data-testid=addComment')
    this.addMarker = page.locator('data-testid=addMarker')
    this.tabSection = page.locator('data-testid=tabSection')
    this.inputMembersOnly = page.locator('text=Data Input（Members Only）')
    this.inputMarkerStatus = page.locator('data-testid=inputMarkerStatus')
    this.inputCommentStatus = page.locator('data-testid=inputCommentStatus')
  }

  async inputComment() {
    await this.inputMembersOnly.click()
    await this.inputCommentMemo.type('comment情報メモ')
    await this.inputCommentDate.fill('2022-05-27')
    await this.addComment.click()
    await expect(this.tabSection).toContainText('2022-05-27')
  }

  async inputMarker() {
    await this.inputMembersOnly.click()
    await this.inputMarkerMemo.type('Marker情報メモ')
    await this.inputMarkerDate.fill('2022-05-26')
    await this.addMarker.click()
    await expect(this.tabSection).toContainText('2022-05-26')
  }

  async deleteComment() {
    await this.commentDelete.click()
    await this.dialogOk.click()
  }

  async deleteCommentWithConfirm(){
    await this.commentDelete.click()
    // await this.dialogOk.click()
    await this.page.keyboard.press('Enter')
    await expect(this.tabSection).not.toContainText('2022-05-27')
  }


  async deleteMarker() {
    await this.markerDelete.click()
    await this.dialogOk.click()
  }

  async deleteMarkerWithConfirm(){
    await this.markerDelete.click()
    // await this.dialogOk.click()
    await this.page.keyboard.press('Enter')
    await expect(this.tabSection).not.toContainText('2022-05-26')
  }

  async checkTickerTitle(ticker:string){
    await expect(this.tickerTitle).toContainText(ticker)
  }

  async clickBookMark(){
    await this.bookMark.click()
  }

  async checkCanInput(){
    await this.inputMembersOnly.click()
    await expect(this.inputMarkerStatus).toContainText('Inputtable')
    await expect(this.inputCommentStatus).toContainText('Inputtable')
  }

  async checkCanNotInput(){
    await this.inputMembersOnly.click()
    await expect(this.inputMarkerStatus).toContainText('Input not allowed')
    await expect(this.inputCommentStatus).toContainText('Input not allowed')
  }
}
