import { Locator, Page } from '@playwright/test'

export class LoginPage {
  // Define Selectors
  readonly page: Page
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator

  // Init Selectors
  constructor(page: Page) {
    this.page = page
    this.emailInput = page.locator('input[type="email"]')
    this.passwordInput = page.locator('input[type="password"]')
    this.submitButton = page.locator('data-testid=login-submit')
  }

  // Define login page methods
  async login() {
    await this.emailInput.type(process.env.TEST_LOGIN_ID!)
    await this.passwordInput.type(process.env.TEST_LOGIN_PASS!)
    await this.submitButton.click()
  }
}
