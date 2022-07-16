import { expect, Locator, Page } from '@playwright/test'

export class LoginPage  {
  // Define Selectors
  readonly page: Page
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
//   readonly errorMessage: Locator

  // Init Selectors
  constructor(page: Page) {
    this.page = page
    this.emailInput = page.locator('input[type="email"]')
    this.passwordInput = page.locator('input[type="password"]')
    this.submitButton = page.locator('data-testid=login-submit')
    // this.errorMessage = page.locator('.alert-error')
  }

  // Define login page methods
  async login() {
    await this.emailInput.type('taketoshi.sakayama+test@gmail.com')
    await this.passwordInput.type('abcd1234')
    await this.submitButton.click()
  }

//   async asserErrorMessage() {
//     await expect(this.errorMessage).toContainText('Invalid Login')
//   }

}