/// <references types="cypress" />

class dashboardPage{
    get titleMain() {return cy.get('.page-title')}
}
    

module.exports = new dashboardPage()
    