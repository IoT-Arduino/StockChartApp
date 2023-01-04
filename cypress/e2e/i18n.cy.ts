describe('Locale Test by Routing', () => {
  it('by url routing -  Ja', () => {
    cy.visit('/ja-JP/stocks')
    cy.get('h2').should('have.text', '米国代表500株式一覧')
    Cypress.session.clearAllSavedSessions()
  })

  it('by url routing -  en', () => {
    cy.visit('/stocks')
    cy.get('h2').should('have.text', 'US Stock500 List')
    Cypress.session.clearAllSavedSessions()
  })
})

// locale 変更ができない。JPがエラーになる。
describe.skip('Locale Test browser setting', () => {
  it('English Locale Test', () => {
    Cypress.session.clearAllSavedSessions()
    cy.visit('/', {
      onBeforeLoad(window) {
        Object.defineProperty(window.navigator, 'language', { value: 'en-US' })
        Object.defineProperty(window.navigator, 'languages', { value: ['en'] })
        Object.defineProperty(window.navigator, 'accept_languages', { value: ['en'] })
      },
      headers: {
        'Accept-Language': 'en',
      },
    })

    cy.visit('/stocks')
    cy.get('h2').should('have.text', 'US Stock500 List')
  })

  it('Japanese Locale Test', () => {
    Cypress.session.clearAllSavedSessions()
    cy.visit('/', {
      onBeforeLoad(window) {
        Object.defineProperty(window.navigator, 'language', { value: 'ja-JP' })
        Object.defineProperty(window.navigator, 'languages', { value: ['ja'] })
        Object.defineProperty(window.navigator, 'accept_languages', { value: ['ja'] })
      },
      headers: {
        'Accept-Language': 'ja',
      },
    })

    cy.visit('/stocks')
    cy.get('h2').should('have.text', '米国代表500株式一覧')
  })
})
