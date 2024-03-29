const { stockList } = require('../fixtures/US-StockListForTest.js')

describe('Check data is missing', () => {
  it('test', () => {
    stockList.forEach((data: any) => {
      cy.visit(`/stocks/${data.Ticker}`)
      cy.get('[data-testid="tabSection"]').should('not.have.text', '--')
      console.log(data)
    })
  })
})
