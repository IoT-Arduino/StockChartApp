import { expect, Locator, Page } from '@playwright/test'

export class MemberPage {
  // Define Selectors
  readonly page: Page
  readonly body: Locator
  readonly canBookMarkInput: Locator
  readonly canMarkerInput: Locator
  readonly canCommentInput: Locator
  readonly tableRowData: Locator

  // Init Selectors
  constructor(page: Page) {
    this.page = page
    this.body = page.locator('body')
    this.canBookMarkInput = page.locator('data-testid=canBookMarkInput')
    this.canMarkerInput = page.locator('data-testid=canMarkerInput')
    this.canCommentInput = page.locator('data-testid=canCommentInput')
    this.tableRowData = page.locator('td')
  }

  async assertCanBookMarkInput() {
    await expect(this.canBookMarkInput).toContainText('Registration is available.')
  }
  async assertCanMarkerInput() {
    await expect(this.canMarkerInput).toContainText('Registration is available.')
  }
  async assertCanCommentInput() {
    await expect(this.canCommentInput).toContainText('Registration is available.')
  }

  async assertCanDataInput() {
    await this.page.goto(`/member`)
    await expect(this.canBookMarkInput).toContainText('Registration is available.')
    await expect(this.canMarkerInput).toContainText('Registration is available.')
    await expect(this.canCommentInput).toContainText('Registration is available.')
  }

  async assertCanNotAddBookMark() {
    await expect(this.canBookMarkInput).toContainText('Registration limit has been reached')
  }

  async assertLoginEmail() {
    // await expect(this.body).toContainText('taketoshi.sakayama+test@gmail.com')
    await expect(this.page.locator('data-testid=memberEmail')).toContainText('taketoshi.sakayama+test@gmail.com')
  }

  async assertNoDataRegistered() {
    await expect(this.tableRowData).not.toBeVisible()
  }
}
