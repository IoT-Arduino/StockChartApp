import { expect, Locator, Page } from '@playwright/test'
import InputMarker from './../../components/InputMarkerState'

export class StockIdPage {
  // Define Selectors
  readonly page: Page
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

  // Init Selectors
  constructor(page: Page) {
    this.page = page
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
  }

  async inputComment() {
    await this.inputMembersOnly.click()
    await this.inputCommentMemo.type('comment情報メモ')
    await this.inputCommentDate.type('2022-05-27')
    await this.addComment.click()
    await expect(this.tabSection).toContainText('2022-05-27')
  }

  async InputMarker() {
    await this.inputMembersOnly.click()
    await this.inputMarkerMemo.type('Marker情報メモ')
    await this.inputMarkerDate.type('2022-05-26')
    await this.addMarker.click()
    await expect(this.tabSection).toContainText('2022-05-26')
  }

  async deleteComment() {
    await this.commentDelete.click()
    await this.dialogOk.click()
  }

  async deleteMarker() {
    await this.markerDelete.click()
    await this.dialogOk.click()
  }
}
