/// <reference types="cypress" />

const faker = require("faker-br");
const dashboardPage = require('../support/pages/dashboard.page')


describe('Checkout', () => {
    it('Checkout', () => {
        cy.visit('/#')
        cy.choseProduct('arcadio-gym-short','32','Black','1')
        cy.firstUpdateOrder()
        cy.secondUpdateOrder()
        cy.checkout()
        cy.get('.page-title').should('contain','Pedido recebido')
    });
});