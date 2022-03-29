/// <references types="cypress" />

const faker = require('faker-br')
const {mainPage, loginPage, dashboardPage} = require('../support/pages')

describe('Cadastro', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('Deve fazer cadastro do usuário', () => {

        let email = faker.internet.email()
        let pass = faker.internet.password()

      mainPage.acessLoginPage()
      loginPage.register(email, pass)
      dashboardPage.titleMain.should('be.visible')

    });
});